"""Validated account creation and resident approval, using database transactions."""
import datetime
from flask import abort
from werkzeug.security import generate_password_hash
from backend.account_validation import name_key, normalize_contact
from backend.db_adapter import get_db
from backend.security import identifier, password, text


def registration_lock(db):
    if db.is_pg:
        db.execute('SELECT pg_advisory_xact_lock(84210422)')
    else:
        db.execute('BEGIN IMMEDIATE')


def fields(data):
    name = ' '.join(text(data.get('owner_name') or data.get('full_name') or data.get('name'), 'full name', 100, 2).split())
    try:
        contact = normalize_contact(data.get('contact') or data.get('contact_no'))
    except ValueError as error:
        abort(400, description=str(error))
    plain = password(data.get('password'))
    if plain != data.get('verify_password'):
        abort(400, description='Passwords do not match.')
    return name, contact, generate_password_hash(plain)


def create_resident(data, pending=False):
    name, contact, hashed = fields(data)
    purok = text(data.get('purok'), 'assigned purok', 50)
    status = 'pending' if pending else 'approved'
    with get_db() as db:
        registration_lock(db)
        db.execute('SELECT purok_id FROM puroks WHERE LOWER(purok_name) = LOWER(?)', (purok,))
        zone = db.fetchone()
        if not zone:
            abort(400, description='Unknown purok. Choose an assigned purok from the list.')
        db.execute('SELECT contact FROM resident_contact_claims WHERE contact = ?', (contact,))
        if db.fetchone():
            abort(409, description='Contact number is already registered. Sign in or contact the administrator.')
        db.execute('SELECT contact_no FROM households')
        for legacy in db.fetchall():
            try:
                duplicate = normalize_contact(legacy['contact_no']) == contact
            except ValueError:
                duplicate = False
            if duplicate:
                abort(409, description='Contact number is already registered. Contact the administrator.')
        db.execute('''INSERT INTO households (purok_id, family_head_name, registration_date, password_hash, contact_no, account_status)
                      VALUES (?, ?, ?, ?, ?, ?)''',
                   (zone['purok_id'], name, datetime.datetime.now(datetime.timezone.utc).isoformat(), hashed, contact, status))
        hh = db.lastrowid
        db.execute('INSERT INTO resident_contact_claims (contact, household_id) VALUES (?, ?)', (contact, hh))
        # Existing project convention; generated server-side while creation is serialized.
        candidate = hh
        while True:
            serial = f'TAG-2026-{candidate:04d}'
            db.execute('SELECT meter_id FROM water_meters WHERE serial_number = ?', (serial,))
            if not db.fetchone():
                break
            candidate += 1
        db.execute('INSERT INTO water_meters (household_id, serial_number, last_reading) VALUES (?, ?, 0)', (hh, serial))
    return {'status': 'success', 'house_id': f'HH-{hh}', 'resident_id': serial,
            'account_number': serial, 'account_status': status,
            'msg': 'Registration submitted. Wait for Admin approval before signing in.' if pending else 'Resident account created.'}


def create_worker(data):
    name, contact, hashed = fields(data)
    if data.get('role', 'Collector') != 'Collector':
        abort(400, description='Create administrators with the secure CLI')
    zone = text(data.get('zone') or data.get('assigned_zone') or 'Purok 1', 'assigned zone', 80)
    with get_db() as db:
        registration_lock(db)
        db.execute("SELECT username FROM users WHERE LOWER(username) LIKE 'emp-%'")
        existing = {r['username'].upper() for r in db.fetchall()}
        seq = 1
        while f'EMP-{seq:03d}' in existing:
            seq += 1
        worker = f'EMP-{seq:03d}'
        db.execute('''INSERT INTO users (username, password_hash, full_name, role, assigned_zone, contact_no)
                      VALUES (?, ?, ?, 'Collector', ?, ?)''', (worker, hashed, name, zone, contact))
    return {'status': 'success', 'worker_id': worker, 'employee_id': worker, 'role': 'Collector'}


def registrations():
    with get_db() as db:
        db.execute('''SELECT h.household_id, h.family_head_name, h.contact_no, h.registration_date,
                      h.account_status, p.purok_name FROM households h JOIN puroks p ON p.purok_id = h.purok_id
                      ORDER BY h.household_id DESC''')
        rows = db.fetchall()
    counts = {}
    contacts = {}
    for row in rows:
        key = name_key(row['family_head_name'])
        counts[key] = counts.get(key, 0) + 1
        try:
            phone = normalize_contact(row['contact_no'])
            contacts[phone] = contacts.get(phone, 0) + 1
        except ValueError:
            pass
    for row in rows:
        row['house_id'] = f"HH-{row['household_id']}"
        row['possible_same_name'] = counts[name_key(row['family_head_name'])] > 1
        try:
            row['possible_duplicate_contact'] = contacts.get(normalize_contact(row['contact_no']), 0) > 1
        except ValueError:
            row['possible_duplicate_contact'] = False
    return rows


def review_resident(data):
    hh = identifier(data.get('house_id'), 'HH-')
    status = data.get('status')
    if status not in ('approved', 'rejected'):
        abort(400, description='Choose approved or rejected.')
    with get_db() as db:
        db.execute("UPDATE households SET account_status = ? WHERE household_id = ? AND account_status = 'pending'", (status, hh))
        if not db.rowcount:
            abort(409, description='Registration is no longer pending. Refresh before reviewing.')
    return {'status': 'success', 'account_status': status}


def login_account(db, username):
    """Prefer generated identifiers; names work only when unambiguous."""
    db.execute('SELECT * FROM users WHERE LOWER(username) = LOWER(?)', (username,))
    user = db.fetchone()
    if user:
        return 'staff', user, user['username']
    clean = username.upper().removeprefix('HH-')
    hh = int(clean) if clean.isdigit() and len(clean) <= 10 else -1
    db.execute('''SELECT h.* FROM households h WHERE h.household_id = ? OR h.household_id IN
                  (SELECT household_id FROM water_meters WHERE LOWER(serial_number) = LOWER(?))''', (hh, username))
    residents = db.fetchall()
    if len(residents) == 1:
        row = residents[0]
        return 'resident', row, f"HH-{row['household_id']}"
    try:
        phone = normalize_contact(username)
    except ValueError:
        phone = None
    db.execute('SELECT * FROM households')
    matches = []
    key = name_key(username)
    for row in db.fetchall():
        contact = None
        try:
            contact = normalize_contact(row['contact_no'])
        except ValueError:
            pass
        if (phone and contact == phone) or (not phone and name_key(row['family_head_name']) == key):
            matches.append(('resident', row, f"HH-{row['household_id']}"))
    if not phone:
        db.execute('SELECT * FROM users')
        matches.extend(('staff', row, row['username']) for row in db.fetchall() if name_key(row['full_name']) == key)
    return matches[0] if len(matches) == 1 else ('unknown', None, key)
