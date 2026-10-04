"""Validated business operations used by the existing Flask route URLs."""
import datetime
import json
from decimal import Decimal

from flask import abort, jsonify, request, Response
from backend.db_adapter import get_db
from backend.security import principal, require_role, text, number, identifier, timestamp
from backend.photos import save_photo, report_photo_metadata, read_report_photo
from backend.operations import begin, finish
from backend.notifications import enqueue
from backend import billing


REPORT_METADATA_COLUMNS = """r.report_id, r.household_id, r.report_type, r.description,
    r.status, r.created_at, r.resolved_at,
    CASE WHEN r.photo_base64 IS NOT NULL AND r.photo_base64 <> '' THEN 1 ELSE 0 END AS has_photo"""


def handle_reports():
    who = principal()
    if request.method == 'GET':
        with get_db() as db:
            own_filter = ' WHERE r.household_id IN (?, ?)' if who['role'] == 'resident' else ''
            params = (who['id'], who['id'][3:]) if who['role'] == 'resident' else ()
            db.execute(f"""SELECT {REPORT_METADATA_COLUMNS}, h.family_head_name, p.purok_name FROM resident_reports r
                LEFT JOIN households h ON r.household_id = ('HH-' || h.household_id) OR r.household_id = CAST(h.household_id AS TEXT)
                LEFT JOIN puroks p ON h.purok_id = p.purok_id{own_filter} ORDER BY r.report_id DESC LIMIT 50""", params)
            reports = db.fetchall()
            return jsonify(status='success', reports=[report_photo_metadata(r) for r in reports])
    data = request.get_json()
    supplied = data.get('household_id')
    hh = identifier(who['id'] if who['role'] == 'resident' else supplied, 'HH-')
    if who['role'] == 'resident' and supplied is not None and identifier(supplied, 'HH-') != hh:
        abort(403, description='You may only report for your own household')
    kind = text(data.get('report_type'), 'report type', 80)
    description = text(data.get('description'), 'description', 4000)
    with get_db() as db:
        operation, replay = begin(db, data)
        if replay is not None:
            return jsonify(replay)
        db.execute('SELECT household_id FROM households WHERE household_id = ?', (hh,))
        if not db.fetchone():
            abort(404, description='Household not found')
        photo = save_photo(data.get('photo_base64'))
        db.execute('INSERT INTO resident_reports (household_id, report_type, description, photo_base64) VALUES (?, ?, ?, ?)',
                   (f'HH-{hh}', kind, description, photo))
        result = finish(db, operation, {'status': 'success', 'report_id': db.lastrowid})
    return jsonify(result)


def get_report_photo(report_id):
    who = principal()
    report_id = identifier(report_id)
    with get_db() as db:
        # Check ownership before selecting the potentially large private evidence.
        db.execute('SELECT household_id FROM resident_reports WHERE report_id = ?', (report_id,))
        report = db.fetchone()
        if not report:
            abort(404, description='Report not found')
        if who['role'] == 'resident' and str(report['household_id']) not in (who['id'], who['id'][3:]):
            abort(403, description='You may only view evidence for your own household')
        # Admin and Worker retain their existing report access policy.
        db.execute('SELECT photo_base64 FROM resident_reports WHERE report_id = ?', (report_id,))
        photo = db.fetchone()
    raw, mime = read_report_photo(photo['photo_base64'] if photo else None)
    return Response(raw, mimetype=mime, headers={'Content-Disposition': f'inline; filename="report-{report_id}.jpg"'})


def update_report_status():
    data = request.get_json()
    report_id = identifier(data.get('report_id'))
    status = data.get('status')
    if status not in ('Pending', 'Investigating', 'Resolved'):
        abort(400, description='Invalid report status')
    resolved = datetime.datetime.now(datetime.timezone.utc).isoformat() if status == 'Resolved' else None
    with get_db() as db:
        db.execute('UPDATE resident_reports SET status = ?, resolved_at = ? WHERE report_id = ?', (status, resolved, report_id))
        if not db.rowcount:
            abort(404, description='Report not found')
    return jsonify(status='success', new_status=status)


def update_central_assets():
    data = request.get_json()
    level = int(number(data.get('main_tank_level'), 'water level', 0, 100))
    turbidity = number(data.get('turbidity'), 'turbidity', 0, 10000)
    tds = int(number(data.get('tds_ppm', data.get('tds')), 'TDS', 0, 100000))
    with get_db() as db:
        db.execute('INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, tds_ppm) VALUES (?, ?, ?)',
                   (level, turbidity, tds))
    return jsonify(status='success')


def update_household_status():
    data = request.get_json()
    hh = identifier(data.get('house_id'), 'HH-')
    status = data.get('current_leak_status')
    if status not in ('normal', 'leak', 'maintenance'):
        abort(400, description='Invalid leak status')
    date = timestamp(data['leak_detected_at']) if data.get('leak_detected_at') else None
    with get_db() as db:
        db.execute('UPDATE households SET current_leak_status = ?, leak_detected_at = ? WHERE household_id = ?', (status, date, hh))
        if not db.rowcount:
            abort(404, description='Household not found')
    return jsonify(status='success', house_id=f'HH-{hh}')


def add_maintenance_log():
    data = request.get_json()
    who = require_role('worker', 'admin')
    hh = identifier(data.get('house_id'), 'HH-')
    description = text(data.get('description'), 'description', 4000)
    date = timestamp(data.get('date'))
    resolved = data.get('status_resolved', True)
    if not isinstance(resolved, bool):
        abort(400, description='status_resolved must be a boolean')
    with get_db() as db:
        operation, replay = begin(db, data)
        if replay is not None:
            return jsonify(replay)
        db.execute('SELECT p.purok_name FROM households h JOIN puroks p ON p.purok_id = h.purok_id WHERE h.household_id = ?', (hh,))
        home = db.fetchone()
        if not home:
            abort(404, description='Household not found')
        photo = save_photo(data.get('photo_base64'))
        db.execute('''INSERT INTO maintenance_logs (house_id, worker_id, purok, description, status_resolved, date, photo_base64)
            VALUES (?, ?, ?, ?, ?, ?, ?)''', (f'HH-{hh}', who['id'], home['purok_name'], description, int(resolved), date, photo))
        result = finish(db, operation, {'status': 'success', 'task_id': db.lastrowid})
    return jsonify(result)


def add_billing_record():
    data = request.get_json()
    who = require_role('worker', 'admin')
    hh = identifier(data.get('house_id'), 'HH-')
    previous = billing.decimal_value(data.get('previous_reading'), 'Previous reading', 3)
    current = billing.decimal_value(data.get('current_reading'), 'Current reading', 3)
    date = timestamp(data.get('date'))
    with get_db() as db:
        operation, replay = begin(db, data)
        if replay is not None:
            return jsonify(replay)
        config = billing.read_config(db, lock=True)
        snapshot = billing.calculate(config, previous, current)
        if data.get('billing_config_version', config['version']) != config['version']:
            abort(409, description='Billing rates changed. Review the current rates before retrying.')
        total = Decimal(snapshot['total_due'])
        if data.get('total_due') is not None and billing.decimal_value(data['total_due'], 'Total due') != total:
            abort(409, description='Bill total does not match current rates. Refresh and review before billing.')
        db.execute('SELECT meter_id, last_reading FROM water_meters WHERE household_id = ?' + (' FOR UPDATE' if db.is_pg else ''), (hh,))
        meter = db.fetchone()
        if not meter:
            abort(404, description='Meter not found')
        meter_last = Decimal(str(meter['last_reading'] if meter['last_reading'] is not None else 0))
        if abs(meter_last - previous) > Decimal('.0005'):
            abort(409, description='Meter reading changed; refresh before billing')
        cycle = text(data.get('billing_month'), 'billing cycle', 20, 0) if data.get('billing_month') else date[:7]
        db.execute('SELECT bill_id FROM billing_records WHERE meter_id = ? AND billed_at LIKE ?', (meter['meter_id'], cycle + '%'))
        if db.fetchone():
            abort(409, description='This meter already has a bill for the selected month')
        billed_at = date if date.startswith(cycle) else f"{cycle}-01T00:00:00Z"
        db.execute('''INSERT INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount,
            payment_status, billed_at, billed_by, is_synced, billing_snapshot) VALUES (?, ?, ?, ?, ?, 'Unpaid', ?, ?, 1, ?)''',
            (meter['meter_id'], float(previous), float(current), float(Decimal(snapshot['consumption'])),
             str(total), billed_at, who['record']['user_id'], json.dumps(snapshot)))
        bill_id = db.lastrowid
        db.execute('UPDATE water_meters SET last_reading = ? WHERE meter_id = ?', (float(current), meter['meter_id']))
        result = finish(db, operation, {'status': 'success', 'bill_id': f'BILL-{bill_id}', 'billing_breakdown': snapshot})
    return jsonify(result)


def add_announcement():
    who = require_role('admin', 'worker')
    data = request.get_json()
    message = text(data.get('message'), 'message', 2000)
    author = who['record']['full_name']
    audience = data.get('target_audience', data.get('audience', 'Everyone'))
    if audience not in ('Everyone', 'Residents only', 'Workers only'):
        abort(400, description='Invalid target audience')
    with get_db() as db:
        operation, replay = begin(db, data)
        if replay is not None:
            return jsonify(replay)
        db.execute('INSERT INTO announcements (message, author, target_audience) VALUES (?, ?, ?)', (message, author, audience))
        announcement_id = db.lastrowid
        enqueue(title=f'WaterHall Announcement ({author})', body=message,
                target_audience=audience, tag=f'announcement-{announcement_id}', db=db)
        result = finish(db, operation, {'status': 'success', 'target_audience': audience, 'id': announcement_id})
    return jsonify(result)
