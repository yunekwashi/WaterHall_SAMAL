"""Account-owned, read-only bill history and authenticated recovery issuance."""
import datetime
import hashlib
import secrets

from flask import abort, jsonify, request
from backend.db_adapter import get_db
from backend.security import identifier, require_role, text


def transaction_history():
    who = require_role('worker')
    raw = request.args.get('before')
    before = identifier(raw) if raw else None
    try:
        limit = int(request.args.get('limit', '25'))
    except ValueError:
        abort(400, description='Invalid page size')
    if not 1 <= limit <= 50:
        abort(400, description='Page size must be 1 to 50')
    query = request.args.get('q', '').strip()
    if len(query) > 100:
        abort(400, description='Search is too long')
    with get_db() as db:
        filters = ['b.billed_by = ?']
        args = [who['record']['user_id']]
        if before:
            filters.append('b.bill_id < ?')
            args.append(before)
        if query:
            filters.append("LOWER(h.family_head_name) LIKE ? ESCAPE '\\'")
            args.append('%' + query.lower().replace('\\', '\\\\').replace('%', '\\%').replace('_', '\\_') + '%')
        # The operation response already holds the canonical bill ID. Ownership
        # is enforced independently by billed_by; legacy unowned bills are excluded.
        bill_ref = "s.response_json::jsonb->>'bill_id'" if db.is_pg else "json_extract(s.response_json, '$.bill_id')"
        db.execute(f'''SELECT b.bill_id, b.previous_reading, b.present_reading,
            b.consumption_m3, b.total_amount, b.payment_status, b.billed_at,
            m.serial_number, m.household_id, h.family_head_name,
            (SELECT s.operation_id FROM sync_operations s WHERE s.actor = ?
             AND {bill_ref} = ('BILL-' || b.bill_id) LIMIT 1) AS operation_id
            FROM billing_records b JOIN water_meters m ON b.meter_id = m.meter_id
            JOIN households h ON h.household_id = m.household_id
            WHERE {' AND '.join(filters)} ORDER BY b.bill_id DESC LIMIT ?''',
            [who['id'], *args, limit + 1])
        rows = db.fetchall()
    more = len(rows) > limit
    rows = rows[:limit]
    result = [dict(bill_id=f"BILL-{r['bill_id']}", operation_id=r['operation_id'],
        house_id=f"HH-{r['household_id']}", family_head_name=r['family_head_name'],
        account_number=r['serial_number'], previous_reading=r['previous_reading'],
        current_reading=r['present_reading'], consumption=r['consumption_m3'],
        total_due=r['total_amount'], status=r['payment_status'], date=r['billed_at'],
        sync_status='Synced') for r in rows]
    return jsonify(records=result, next_cursor=rows[-1]['bill_id'] if more else None)


def issue_recovery():
    require_role('admin')
    data = request.get_json()
    role = data.get('role')
    account = text(data.get('username'), 'account ID', 60)
    if role not in ('worker', 'resident'):
        abort(400, description='Choose Worker or Resident')
    kind = 'resident' if role == 'resident' else 'staff'
    with get_db() as db:
        if role == 'resident':
            account = f"HH-{identifier(account, 'HH-')}"
            db.execute('SELECT household_id FROM households WHERE household_id = ?', (identifier(account, 'HH-'),))
        else:
            db.execute("SELECT user_id FROM users WHERE username = ? AND role = 'Collector'", (account,))
        if not db.fetchone():
            abort(404, description='Account not found for this role')
        # Serialize issuance for the same account without changing the schema.
        if db.is_pg:
            db.execute('SELECT pg_advisory_xact_lock(hashtext(?))', (kind + ':' + account,))
        else:
            db.execute('BEGIN IMMEDIATE')
        code = secrets.token_urlsafe(32)
        expires = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30)).isoformat()
        db.execute('UPDATE password_resets SET used = 1 WHERE account_id = ? AND kind = ?', (account, kind))
        db.execute('INSERT INTO password_resets (token_hash, account_id, kind, expires_at) VALUES (?, ?, ?, ?)',
            (hashlib.sha256(code.encode()).hexdigest(), account, kind, expires))
    response = jsonify(status='success', recovery_code=code, expires_at=expires, expires_in_minutes=30)
    response.headers['Cache-Control'] = 'no-store'
    return response
