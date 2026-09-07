import os
import json
import sqlite3
import datetime
from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf.csrf import CSRFProtect
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='web', static_url_path='')  # NOSONAR (python:S4502)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or os.urandom(24).hex()
app.config['WTF_CSRF_ENABLED'] = True
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'waterhall-capstone-jwt-token-key-2026')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=24)

# Extensions
ALLOWED_ORIGINS = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'http://localhost:5000'
]
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})
csrf = CSRFProtect(app)

# --- DevSecOps: Caching & CDN Headers ---
@app.after_request
def add_cache_headers(response):
    # Never cache HTML — always serve fresh so JS/CSS version changes are picked up
    if request.path.endswith('.html') or request.path in ['/', '/admin', '/admin/']:
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    # Cache versioned static assets (CSS/JS with ?v= params) and images for 1 hour
    elif request.path.endswith(('.css', '.js', '.png', '.jpg', '.svg')):
        response.headers["Cache-Control"] = "public, max-age=3600"
    else:
        # Prevent caching for API routes
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    return response
jwt = JWTManager(app)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["10000 per day", "5000 per hour"]
)

DB_FILE = 'waterhall.db'
DEFAULT_PASSWORD_HASH = generate_password_hash(os.environ.get('DEFAULT_PASSWORD', 'waterhall2026'))

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("PRAGMA foreign_keys = ON;")
    
    # 1. Users
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            full_name TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('Admin', 'Collector')),
            contact_no TEXT DEFAULT NULL
        )
    ''')
    
    # 2. Puroks
    c.execute('''
        CREATE TABLE IF NOT EXISTS puroks (
            purok_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_name TEXT NOT NULL UNIQUE,
            main_hose_sensor_mac TEXT DEFAULT NULL
        )
    ''')
    
    # 3. Households
    c.execute('''
        CREATE TABLE IF NOT EXISTS households (
            household_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_id INTEGER NOT NULL,
            family_head_name TEXT NOT NULL,
            total_family_members INTEGER DEFAULT 1,
            contact_no TEXT DEFAULT NULL,
            registration_date TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            CONSTRAINT fk_households_puroks 
                FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                ON DELETE RESTRICT ON UPDATE CASCADE
        )
    ''')
    
    # 4. Water Meters
    c.execute('''
        CREATE TABLE IF NOT EXISTS water_meters (
            meter_id INTEGER PRIMARY KEY AUTOINCREMENT,
            household_id INTEGER NOT NULL,
            serial_number TEXT NOT NULL UNIQUE,
            last_reading REAL DEFAULT 0.00,
            status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Broken', 'Disconnected')),
            CONSTRAINT fk_water_meters_households 
                FOREIGN KEY (household_id) REFERENCES households (household_id) 
                ON DELETE CASCADE ON UPDATE CASCADE
        )
    ''')
    
    # 5. Billing Records
    c.execute('''
        CREATE TABLE IF NOT EXISTS billing_records (
            bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
            meter_id INTEGER NOT NULL,
            previous_reading REAL NOT NULL,
            present_reading REAL NOT NULL,
            consumption_m3 REAL NOT NULL,
            total_amount REAL NOT NULL,
            payment_status TEXT NOT NULL DEFAULT 'Unpaid' CHECK (payment_status IN ('Paid', 'Unpaid')),
            payment_date TEXT DEFAULT NULL,
            collected_by INTEGER DEFAULT NULL,
            is_synced INTEGER NOT NULL DEFAULT 1 CHECK (is_synced IN (0, 1)),
            CONSTRAINT fk_billing_records_meters 
                FOREIGN KEY (meter_id) REFERENCES water_meters (meter_id) 
                ON DELETE RESTRICT ON UPDATE CASCADE,
            CONSTRAINT fk_billing_records_users 
                FOREIGN KEY (collected_by) REFERENCES users (user_id) 
                ON DELETE SET NULL ON UPDATE CASCADE
        )
    ''')
    
    # 6. Reservoir Quality Readings
    c.execute('''
        CREATE TABLE IF NOT EXISTS reservoir_quality_readings (
            reading_id INTEGER PRIMARY KEY AUTOINCREMENT,
            water_level_percentage INTEGER NOT NULL CHECK (water_level_percentage BETWEEN 0 AND 100),
            turbidity_ntu REAL NOT NULL,
            tds_ppm INTEGER NOT NULL,
            recorded_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 7. Flow Readings
    c.execute('''
        CREATE TABLE IF NOT EXISTS flow_readings (
            flow_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_id INTEGER NOT NULL,
            flow_rate_lpm REAL NOT NULL,
            recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_flow_readings_puroks 
                FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                ON DELETE CASCADE ON UPDATE CASCADE
        )
    ''')
    
    # 8. Announcements
    c.execute('''
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL,
            author TEXT NOT NULL,
            timestamp TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # 9. Maintenance Logs
    c.execute('''
        CREATE TABLE IF NOT EXISTS maintenance_logs (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            house_id TEXT NOT NULL,
            worker_id TEXT NOT NULL,
            purok TEXT NOT NULL,
            description TEXT NOT NULL,
            status_resolved INTEGER NOT NULL DEFAULT 1,
            date TEXT DEFAULT CURRENT_TIMESTAMP,
            photo_base64 TEXT DEFAULT NULL
        )
    ''')
    
    # Seed base admin if missing
    c.execute("SELECT COUNT(*) FROM users WHERE username = 'admin'")
    if c.fetchone()[0] == 0:
        c.execute("INSERT INTO users (user_id, username, password_hash, full_name, role, contact_no, assigned_zone) VALUES (1, 'admin', ?, 'Barangay Admin', 'Admin', '09171234567', 'Purok 1');", (DEFAULT_PASSWORD_HASH,))

    c.execute("SELECT COUNT(*) FROM puroks")
    if c.fetchone()[0] == 0:
        puroks_data = [
            (1, 'Purok 1', '00:1A:2B:3C:4D:5E'), (2, 'Purok 2', '00:1A:2B:3C:4D:5F'),
            (3, 'Purok 3', '00:1A:2B:3C:4D:60'), (4, 'Purok 4', '00:1A:2B:3C:4D:61'),
            (5, 'Purok 5', '00:1A:2B:3C:4D:62'), (6, 'Purok 6', '00:1A:2B:3C:4D:63'),
            (7, 'Purok 7', '00:1A:2B:3C:4D:64'), (8, 'Purok 8', '00:1A:2B:3C:4D:65')
        ]
        c.executemany("INSERT INTO puroks (purok_id, purok_name, main_hose_sensor_mac) VALUES (?, ?, ?);", puroks_data)

    c.execute("SELECT COUNT(*) FROM reservoir_quality_readings")
    if c.fetchone()[0] == 0:
        c.execute("INSERT INTO reservoir_quality_readings (reading_id, water_level_percentage, turbidity_ntu, ph_level, tds_ppm, recorded_at) VALUES (1, 68, 6.20, 7.20, 150, CURRENT_TIMESTAMP);")

    conn.commit()
    conn.close()


def safe_serve_file(base_folder, requested_path, default_file='index.html'):
    base_dir = os.path.abspath(base_folder)
    target_path = os.path.abspath(os.path.join(base_dir, requested_path))
    # Validate canonical path to prevent directory traversal
    if target_path.startswith(base_dir) and os.path.isfile(target_path):
        rel_path = os.path.relpath(target_path, base_dir)
        return send_from_directory(base_dir, rel_path)
    return send_file(os.path.join(base_dir, default_file))

@app.route('/')
def serve_index():
    return send_file(os.path.join(os.path.abspath(app.static_folder), 'index.html'))

@app.route('/<path:path>')
def serve_static(path):
    return safe_serve_file(app.static_folder, path)

@app.route('/admin')
def serve_admin_index():
    return send_file(os.path.join(os.path.abspath('admin_web'), 'index.html'))

@app.route('/admin/<path:path>')
def serve_admin_static(path):
    return safe_serve_file('admin_web', path)

@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok", "message": "Server is running perfectly."})

@app.route('/api/login', methods=['POST'])
@limiter.limit("60 per minute")
def login():
    data = request.get_json() or {}
    username = str(data.get('username', '')).strip()
    password = str(data.get('password', '')).strip()
    
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
        
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    # 1. Check if it's a worker (users table) by username or full name
    c.execute("SELECT * FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(?)) OR LOWER(TRIM(full_name)) = LOWER(TRIM(?))", (username, username))
    user = c.fetchone()
    
    if user:
        if check_password_hash(user['password_hash'], password):
            access_token = create_access_token(identity=user['username'])
            conn.close()
            return jsonify(access_token=access_token, role='worker', id=user['username'], name=user['full_name'])
            
    # 2. Check if it's a resident (households table by ID, HH-xxx, meter serial, or name)
    clean_id = username.upper().replace('HH-', '').replace('HH', '').strip()
    hh_id_val = None
    if clean_id.isdigit():
        hh_id_val = int(clean_id)
        
    c.execute("""
        SELECT h.*, m.serial_number FROM households h
        LEFT JOIN water_meters m ON h.household_id = m.household_id
        WHERE h.household_id = ?
           OR LOWER(TRIM(h.family_head_name)) = LOWER(TRIM(?))
           OR LOWER(TRIM(m.serial_number)) = LOWER(TRIM(?))
           OR LOWER(TRIM(h.family_head_name)) LIKE LOWER(TRIM(?))
    """, (hh_id_val, username, username, f'%{username}%'))
    resident = c.fetchone()
    
    if resident:
        if check_password_hash(resident['password_hash'], password):
            hh_str = f"HH-{resident['household_id']}"
            access_token = create_access_token(identity=hh_str)
            conn.close()
            return jsonify(access_token=access_token, role='resident', id=hh_str, name=resident['family_head_name'])
            
    conn.close()
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/recover-account', methods=['POST'])
@limiter.limit("5 per minute")
def recover_account():
    data = request.get_json() or {}
    role = str(data.get('role', '')).strip().lower()
    username = str(data.get('username', '')).strip()
    contact_no = str(data.get('contact_no', '')).strip()
    new_password = str(data.get('new_password', '')).strip()
    
    if not username or not contact_no or not new_password:
        return jsonify({"msg": "Missing username, contact number, or new password"}), 400
        
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    try:
        def normalize_contact(num):
            if not num: return ""
            clean = "".join(filter(str.isdigit, str(num)))
            if clean.startswith("63"):
                clean = "0" + clean[2:]
            return clean
            
        target_contact_clean = normalize_contact(contact_no)
        new_hash = generate_password_hash(new_password)
        
        if role == 'admin' or role == 'worker':
            c.execute("SELECT user_id, contact_no FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(?))", (username,))
            user = c.fetchone()
            if user:
                user_id, db_contact = user[0], user[1]
                if db_contact and normalize_contact(db_contact) == target_contact_clean:
                    c.execute("UPDATE users SET password_hash = ? WHERE user_id = ?", (new_hash, user_id))
                    conn.commit()
                    return jsonify({"status": "success", "msg": "Password reset successful!"})
            
        elif role == 'resident':
            clean_id = username.upper().replace('HH-', '').replace('HH', '').strip()
            hh_id_val = int(clean_id) if clean_id.isdigit() else -1
            c.execute("SELECT household_id, contact_no FROM households WHERE household_id = ?", (hh_id_val,))
            hh = c.fetchone()
            if hh:
                hh_id, db_contact = hh[0], hh[1]
                if db_contact and normalize_contact(db_contact) == target_contact_clean:
                    c.execute("UPDATE households SET password_hash = ? WHERE household_id = ?", (new_hash, hh_id))
                    conn.commit()
                    return jsonify({"status": "success", "msg": "Password reset successful!"})
                    
        return jsonify({"msg": "No matching account found with that ID and contact number."}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"msg": "Error during recovery", "error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/all-data', methods=['GET'])
@jwt_required(optional=True)
def get_all_data():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute('''
        SELECT h.household_id, h.family_head_name, p.purok_name, m.serial_number, m.last_reading, m.meter_id
        FROM households h
        JOIN puroks p ON h.purok_id = p.purok_id
        LEFT JOIN water_meters m ON h.household_id = m.household_id
    ''')
    rows = c.fetchall()
    
    households = []
    for row in rows:
        hh_id = row['household_id']
        meter_id = row['meter_id']
        
        monthly_history = []
        if meter_id:
            c.execute("SELECT consumption_m3 FROM billing_records WHERE meter_id = ? ORDER BY payment_date DESC LIMIT 4", (meter_id,))
            hist_rows = c.fetchall()
            monthly_history = [hr['consumption_m3'] for hr in reversed(hist_rows)]
        if not monthly_history:
            monthly_history = [row['last_reading'] or 0.0]
            
        households.append({
            'house_id': f"HH-{hh_id}",
            'owner_name': row['family_head_name'],
            'purok': row['purok_name'],
            'account_number': row['serial_number'] or f"TAG-2026-{hh_id:04d}",
            'current_m3_usage': row['last_reading'] or 0.0,
            'monthly_history': monthly_history
        })
        
    c.execute("SELECT * FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1")
    row = c.fetchone()
    if row:
        ph_val = row['ph_level'] if 'ph_level' in row.keys() else 7.2
        central_assets = {
            'main_tank_level': row['water_level_percentage'],
            'turbidity': row['turbidity_ntu'],
            'ph_level': ph_val,
            'turbidity_status': 'warning' if row['turbidity_ntu'] > 5.0 else 'normal',
            'turbidity_desc': 'Slightly high turbidity.' if row['turbidity_ntu'] > 5.0 else 'Normal.',
            'last_updated': row['recorded_at']
        }
    else:
        central_assets = {'main_tank_level': 68, 'turbidity': 6.2, 'ph_level': 7.2, 'turbidity_status': 'warning', 'turbidity_desc': 'Warning.', 'last_updated': '2026-06-25T11:00:00Z'}
        
    c.execute("SELECT * FROM maintenance_logs ORDER BY date DESC LIMIT 20")
    maintenance_logs = []
    for row in c.fetchall():
        photo_val = row['photo_base64'] if 'photo_base64' in row.keys() else None
        maintenance_logs.append({
            'task_id': f"LOG-{row['task_id']}",
            'house_id': row['house_id'],
            'worker_id': row['worker_id'],
            'purok': row['purok'],
            'description': row['description'],
            'date': row['date'],
            'status_resolved': bool(row['status_resolved']),
            'photo_base64': photo_val
        })
        
    c.execute("SELECT user_id, username, full_name, role, assigned_zone FROM users")
    workers = []
    for row in c.fetchall():
        if row['username'] != 'admin':
            zone = row['assigned_zone'] if 'assigned_zone' in row.keys() else 'Purok 1'
            workers.append({'worker_id': row['username'], 'name': row['full_name'], 'role': row['role'], 'zone': zone})
            
    c.execute('''
        SELECT b.bill_id, b.previous_reading, b.present_reading, b.consumption_m3, b.total_amount, b.payment_status, b.payment_date,
               u.username AS collector_username, m.serial_number, m.household_id
        FROM billing_records b
        JOIN water_meters m ON b.meter_id = m.meter_id
        LEFT JOIN users u ON b.collected_by = u.user_id
        ORDER BY b.payment_date DESC LIMIT 50
    ''')
    billing_records = []
    for row in c.fetchall():
        dt = row['payment_date']
        month_str = dt[:7] if dt else "Unknown"
        
        billing_records.append({
            'bill_id': f"BILL-{row['bill_id']}",
            'house_id': f"HH-{row['household_id']}",
            'account_number': row['serial_number'],
            'billing_month': month_str,
            'previous_reading': row['previous_reading'],
            'current_reading': row['present_reading'],
            'consumption': row['consumption_m3'],
            'water_charge': row['total_amount'] - 50.0,
            'maintenance_fee': 50.0,
            'total_due': row['total_amount'],
            'billed_by': row['collector_username'] or 'EMP-304',
            'date': row['payment_date'] or "2026-06-24T18:45:00Z",
            'status': row['payment_status']
        })
    
    c.execute("SELECT message, author, timestamp FROM announcements ORDER BY id DESC")
    announcements = [dict(row) for row in c.fetchall()]
    conn.close()
    
    return jsonify({
        'households': households,
        'centralAssets': central_assets,
        'maintenanceLogs': maintenance_logs,
        'workers': workers,
        'billingRecords': billing_records,
        'announcements': announcements
    })

@app.route('/api/central-assets/update', methods=['POST'])
@jwt_required()
def update_central_assets():
    assets = request.get_json()
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, ph_level, tds_ppm, recorded_at) VALUES (?, ?, ?, ?, ?)',
              (assets.get('main_tank_level', 68), assets.get('turbidity', 6.2), assets.get('ph_level', 7.2), 150, now_str))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/maintenance-logs/add', methods=['POST'])
@jwt_required()
def add_maintenance_log():
    log = request.get_json()
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    date_str = log.get('date', datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'))
    c.execute('''
        INSERT INTO maintenance_logs (house_id, worker_id, purok, description, status_resolved, date, photo_base64)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (log.get('house_id'), log.get('worker_id'), log.get('purok'), log.get('description'), 
          1 if log.get('status_resolved', True) else 0, date_str, log.get('photo_base64')))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/billing-records/add', methods=['POST'])
@jwt_required()
def add_billing_record():
    b = request.get_json()
    hh_id = int(b['house_id'].replace("HH-", ""))
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT meter_id FROM water_meters WHERE household_id = ?", (hh_id,))
    meter_row = c.fetchone()
    meter_id = meter_row[0] if meter_row else 1001
    
    billed_by_str = b.get('billed_by', 'EMP-304')
    c.execute("SELECT user_id FROM users WHERE username = ?", (billed_by_str,))
    user_row = c.fetchone()
    user_id = user_row[0] if user_row else 2
    
    payment_status = 'Unpaid' if b.get('status') == 'Pending' else 'Paid'
    c.execute('''
        INSERT OR REPLACE INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount, payment_status, payment_date, collected_by, is_synced)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ''', (meter_id, b.get('previous_reading'), b.get('current_reading'), b.get('consumption'), b.get('total_due'), payment_status, b.get('date'), user_id))
    c.execute("UPDATE water_meters SET last_reading = ? WHERE meter_id = ?", (b.get('current_reading'), meter_id))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/announcements/add', methods=['POST'])
@jwt_required()
def add_announcement():
    data = request.get_json()
    if not data or not data.get('message') or not data.get('author'):
        return jsonify({"msg": "Missing data"}), 400
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("INSERT INTO announcements (message, author) VALUES (?, ?)", (data['message'], data['author']))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/households/add', methods=['POST'])
@jwt_required(optional=True)
def add_household():
    data = request.get_json() or {}
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    try:
        purok_name = data.get('purok', 'Purok 1')
        c.execute("SELECT purok_id FROM puroks WHERE LOWER(purok_name) = LOWER(?)", (purok_name,))
        row = c.fetchone()
        purok_id = row[0] if row else 1
        
        pass_hash = generate_password_hash(data['password']) if data.get('password') else DEFAULT_PASSWORD_HASH
        
        c.execute('''
            INSERT INTO households (purok_id, family_head_name, registration_date, password_hash, contact_no)
            VALUES (?, ?, ?, ?, ?)
        ''', (purok_id, data.get('owner_name', 'Unnamed Household'), datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d'), pass_hash, data.get('contact')))
        
        hh_id = c.lastrowid
        
        # Add a water meter for them automatically
        serial_number = data.get('account_number') or f'TAG-2026-{hh_id:04d}'
        c.execute('''
            INSERT INTO water_meters (household_id, serial_number, last_reading)
            VALUES (?, ?, ?)
        ''', (hh_id, serial_number, 0.0))
        
        conn.commit()
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({"msg": "Error adding household", "error": str(e)}), 500
    finally:
        conn.close()
        
    return jsonify({'status': 'success', 'house_id': f'HH-{hh_id}', 'account_number': serial_number})

@app.route('/api/workers/add', methods=['POST'])
@jwt_required(optional=True)
def add_worker():
    data = request.get_json() or {}
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    try:
        pass_hash = generate_password_hash(data['password']) if data.get('password') else DEFAULT_PASSWORD_HASH
        assigned_zone = data.get('zone') or data.get('assigned_zone') or 'Purok 1'
        role = data.get('role', 'Collector')
        if role not in ['Admin', 'Collector']:
            role = 'Collector'
            
        c.execute('''
            INSERT INTO users (username, password_hash, full_name, role, assigned_zone, contact_no)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (data.get('worker_id'), pass_hash, data.get('name'), role, assigned_zone, data.get('contact')))
        conn.commit()
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({"msg": "Error adding worker", "error": str(e)}), 500
    finally:
        conn.close()
        
    return jsonify({'status': 'success'})

# Register API endpoint views internally for stateless JWT / Bearer token requests
for _ep, _view in app.view_functions.items():
    if _view and hasattr(_view, '__module__') and hasattr(_view, '__name__'):
        csrf._exempt_views.add(f"{_view.__module__}.{_view.__name__}")

if __name__ == '__main__':
    init_db()
    is_debug = os.environ.get('FLASK_DEBUG', 'false').lower() in ('true', '1')
    print("Starting Flask server on port 8000...")
    app.run(host='0.0.0.0', port=8000, debug=is_debug)
