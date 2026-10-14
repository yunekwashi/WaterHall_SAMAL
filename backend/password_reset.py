"""Admin-verified recovery using existing hashed credentials/reset storage.

Reserved temporary: records mark the current credential as change-required.
They are not recovery codes and can never satisfy the legacy code endpoint.
"""
import datetime
import hashlib
import logging
import secrets

from flask import abort, jsonify, request
from flask_jwt_extended import get_jwt
from werkzeug.security import check_password_hash, generate_password_hash

from backend.db_adapter import get_db
from backend.security import identifier, password, principal, require_role, text

audit = logging.getLogger('waterhall.password_reset.audit')
TEMPORARY_HOURS = 24


def marker(password_hash):
    return 'temporary:' + hashlib.sha256(password_hash.encode()).hexdigest()


def temporary_state(db, account, kind, password_hash):
    # The marker follows the current password hash, independently of legacy
    # code invalidation. Issuing an old-style code cannot lift the restriction.
    db.execute('SELECT expires_at FROM password_resets WHERE token_hash = ? AND account_id = ? AND kind = ?',
               (marker(password_hash), account, kind))
    return db.fetchone()


def expired(state):
    return bool(state and state['expires_at'] <= datetime.datetime.now(datetime.timezone.utc).isoformat())


def issue_temporary_password():
    who = require_role('admin')
    data = request.get_json()
    if data.get('identity_verified') is not True or data.get('confirmed') is not True:
        abort(400, description='Verify account ownership and confirm the reset first')
    role = data.get('role')
    account = text(data.get('username'), 'account ID', 60)
    if role not in ('worker', 'resident'):
        abort(400, description='Choose Worker or Resident')
    kind = 'resident' if role == 'resident' else 'staff'
    table, field = ('households', 'household_id') if role == 'resident' else ('users', 'username')
    value = identifier(account, 'HH-') if role == 'resident' else account
    if role == 'resident':
        account = f'HH-{value}'
    with get_db() as db:
        if not db.is_pg:
            db.execute('BEGIN IMMEDIATE')
        db.execute(f'SELECT * FROM {table} WHERE {field} = ?' + (' FOR UPDATE' if db.is_pg else ''), (value,))
        row = db.fetchone()
        if not row or (role == 'worker' and row['role'] != 'Collector'):
            abort(404, description='Account not found for this role')
        if role == 'resident' and row['account_status'] != 'approved':
            abort(409, description='Resident must be approved before password recovery')
        temporary = secrets.token_urlsafe(18)
        hashed = generate_password_hash(temporary)
        expires_at = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=TEMPORARY_HOURS)).isoformat()
        db.execute(f'UPDATE {table} SET password_hash = ? WHERE {field} = ?', (hashed, value))
        db.execute('UPDATE password_resets SET used = 1 WHERE account_id = ? AND kind = ?', (account, kind))
        db.execute('INSERT INTO password_resets (token_hash, account_id, kind, expires_at) VALUES (?, ?, ?, ?)',
                   (marker(hashed), account, kind, expires_at))
    audit.info('temporary_password_issued actor=%s role=%s account=%s at=%s result=success',
               who['id'], role, account, datetime.datetime.now(datetime.timezone.utc).isoformat())
    response = jsonify(status='success', temporary_password=temporary, account_id=account,
                       role=role, password_change_required=True, expires_at=expires_at,
                       expires_in_hours=TEMPORARY_HOURS)
    response.headers['Cache-Control'] = 'no-store'
    return response


def change_password():
    who = principal()
    data = request.get_json()
    new_password = password(data.get('new_password'))
    if data.get('confirm_password') != new_password:
        abort(400, description='Passwords do not match')
    kind = who['kind']
    table, field = ('households', 'household_id') if kind == 'resident' else ('users', 'username')
    value = identifier(who['id'], 'HH-') if kind == 'resident' else who['id']
    with get_db() as db:
        if not db.is_pg:
            db.execute('BEGIN IMMEDIATE')
        db.execute(f'SELECT password_hash FROM {table} WHERE {field} = ?' + (' FOR UPDATE' if db.is_pg else ''), (value,))
        row = db.fetchone()
        # Recheck after taking the lock: a concurrent Admin reset/change must win.
        if not row or get_jwt().get('credential') != hashlib.sha256(row['password_hash'].encode()).hexdigest():
            abort(401, description='Please sign in again')
        state = temporary_state(db, who['id'], kind, row['password_hash'])
        if expired(state):
            abort(401, description='Temporary password expired. Contact your administrator.')
        if not state:
            current = data.get('current_password')
            if not isinstance(current, str) or len(current) > 128 or not check_password_hash(row['password_hash'], current):
                abort(400, description='Current password is incorrect')
        if check_password_hash(row['password_hash'], new_password):
            abort(400, description='Choose a different password')
        db.execute(f'UPDATE {table} SET password_hash = ? WHERE {field} = ?', (generate_password_hash(new_password), value))
        db.execute('UPDATE password_resets SET used = 1 WHERE account_id = ? AND kind = ?', (who['id'], kind))
    audit.info('password_changed role=%s account=%s', who['role'], who['id'])
    return jsonify(status='success', msg='Password saved. Sign in with your new password.')
