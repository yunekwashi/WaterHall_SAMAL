"""Validated business operations used by the existing Flask route URLs."""
import datetime

from flask import abort, jsonify, request
from backend.db_adapter import get_db
from backend.security import principal, require_role, text, number, identifier, timestamp
from backend.photos import save_photo, photo_for_client
from backend.operations import begin, finish
from backend.notifications import enqueue


def handle_reports():
    who = principal()
    if request.method == 'GET':
        with get_db() as db:
            db.execute("""SELECT r.*, h.family_head_name, p.purok_name FROM resident_reports r
                LEFT JOIN households h ON r.household_id = ('HH-' || h.household_id) OR r.household_id = CAST(h.household_id AS TEXT)
                LEFT JOIN puroks p ON h.purok_id = p.purok_id ORDER BY r.report_id DESC""")
            reports = db.fetchall()
            if who['role'] == 'resident':
                reports = [r for r in reports if str(r['household_id']) in (who['id'], who['id'][3:])]
            for report in reports[:50]:
                report['photo_base64'] = photo_for_client(report.get('photo_base64'))
            return jsonify(status='success', reports=reports[:50])
    data = request.get_json()
    hh = identifier(data.get('household_id'), 'HH-')
    if who['role'] == 'resident' and f'HH-{hh}' != who['id']:
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
    ph = number(data.get('ph_level'), 'pH', 0, 14)
    tds = int(number(data.get('tds_ppm', data.get('tds')), 'TDS', 0, 100000))
    with get_db() as db:
        db.execute('INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, ph_level, tds_ppm) VALUES (?, ?, ?, ?)',
                   (level, turbidity, ph, tds))
    return jsonify(status='success')


def update_household_status():
    data = request.get_json()
    hh = identifier(data.get('house_id'), 'HH-')
    status = data.get('current_leak_status')
    if status not in ('normal', 'leak', 'maintenance'):
        abort(400, description='Invalid leak status')
    flow = number(data.get('flow_rate', 0), 'flow rate', 0, 100000)
    date = timestamp(data['leak_detected_at']) if data.get('leak_detected_at') else None
    with get_db() as db:
        db.execute('UPDATE households SET current_leak_status = ?, flow_rate = ?, leak_detected_at = ? WHERE household_id = ?', (status, flow, date, hh))
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
    previous = number(data.get('previous_reading'), 'previous reading')
    current = number(data.get('current_reading'), 'current reading', previous)
    consumption = round(current - previous, 3)
    # Existing WaterHall tariff is also shown in the web billing form.
    total = round(120 + max(0, consumption - 10) * 15 + 50, 2)
    if abs(number(data.get('total_due'), 'total due') - total) > .01:
        abort(400, description='Bill total does not match the configured tariff')
    date = timestamp(data.get('date'))
    with get_db() as db:
        operation, replay = begin(db, data)
        if replay is not None:
            return jsonify(replay)
        db.execute('SELECT meter_id, last_reading FROM water_meters WHERE household_id = ?' + (' FOR UPDATE' if db.is_pg else ''), (hh,))
        meter = db.fetchone()
        if not meter:
            abort(404, description='Meter not found')
        if abs(float(meter['last_reading']) - previous) > .001:
            abort(409, description='Meter reading changed; refresh before billing')
        db.execute('SELECT bill_id FROM billing_records WHERE meter_id = ? AND billed_at LIKE ?', (meter['meter_id'], date[:7] + '%'))
        if db.fetchone():
            abort(409, description='This meter already has a bill for the selected month')
        db.execute('''INSERT INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount,
            payment_status, billed_at, billed_by, is_synced) VALUES (?, ?, ?, ?, ?, 'Unpaid', ?, ?, 1)''',
            (meter['meter_id'], previous, current, consumption, total, date, who['record']['user_id']))
        bill_id = db.lastrowid
        db.execute('UPDATE water_meters SET last_reading = ? WHERE meter_id = ?', (current, meter['meter_id']))
        result = finish(db, operation, {'status': 'success', 'bill_id': f'BILL-{bill_id}'})
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
