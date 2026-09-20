import os
import json
import datetime
from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf.csrf import CSRFProtect
from werkzeug.security import generate_password_hash, check_password_hash

# Database adapter (Supports PostgreSQL on Vercel/Cloud and SQLite locally)
try:
    from backend.db_adapter import get_db, init_db, is_postgres
except ImportError:
    from db_adapter import get_db, init_db, is_postgres

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = Flask(__name__, static_folder=os.path.join(BASE_DIR, 'web'), static_url_path='')  # NOSONAR (python:S4502)

# ==============================================================================
# Configuration & Extensions
# ==============================================================================
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or os.urandom(24).hex()
app.config['WTF_CSRF_ENABLED'] = True
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', '[REDACTED]')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=24)

ALLOWED_ORIGINS = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'http://localhost:5000',
    r"http://192\.168\.\d+\.\d+(:\d+)?",
    r"http://10\.\d+\.\d+\.\d+(:\d+)?",
    r"http://172\.(1[6-9]|2\d|3[01])\.\d+\.\d+(:\d+)?",
    r"https://.*\.vercel\.app"
]
CORS(app, resources={r"/api/*": {"origins": "*"}})
csrf = CSRFProtect(app)

@app.after_request
def add_cache_headers(response):
    if request.path.endswith('.html') or request.path in ['/', '/admin', '/admin/']:
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    elif request.path.endswith(('.css', '.js', '.png', '.jpg', '.svg')):
        response.headers["Cache-Control"] = "public, max-age=3600"
    else:
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    return response

jwt = JWTManager(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["10000 per day", "5000 per hour"]
)

# Initialize database schema automatically
try:
    init_db()
except Exception as _e:
    print(f"[SERVER] Notice initializing database: {_e}")

# ==============================================================================
# Static File Serving
# ==============================================================================
def safe_serve_file(base_folder, requested_path, default_file='index.html'):
    base_dir = os.path.abspath(base_folder)
    target_path = os.path.abspath(os.path.join(base_dir, requested_path))
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
    return send_file(os.path.join(os.path.abspath(os.path.join(BASE_DIR, 'admin_web')), 'index.html'))

@app.route('/admin/<path:path>')
def serve_admin_static(path):
    return safe_serve_file(os.path.join(BASE_DIR, 'admin_web'), path)

# ==============================================================================
# Core System API Endpoints
# ==============================================================================
@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Server is running perfectly.",
        "database_mode": "PostgreSQL" if is_postgres() else "SQLite"
    })

@app.route('/api/login', methods=['POST'])
@limiter.limit("60 per minute")
def login():
    data = request.get_json() or {}
    username = str(data.get('username', '')).strip()
    password = str(data.get('password', '')).strip()
    
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
        
    with get_db() as db:
        # 1. Check worker in users table
        db.execute("SELECT * FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(?)) OR LOWER(TRIM(full_name)) = LOWER(TRIM(?));", (username, username))
        user = db.fetchone()
        
        if user and check_password_hash(user['password_hash'], password):
            access_token = create_access_token(identity=user['username'])
            return jsonify(access_token=access_token, role='worker', id=user['username'], name=user['full_name'])
                
        # 2. Check resident in households table
        clean_id = username.upper().replace('HH-', '').replace('HH', '').strip()
        hh_id_val = int(clean_id) if clean_id.isdigit() else -1
            
        db.execute("""
            SELECT h.*, m.serial_number FROM households h
            LEFT JOIN water_meters m ON h.household_id = m.household_id
            WHERE h.household_id = ?
               OR LOWER(TRIM(h.family_head_name)) = LOWER(TRIM(?))
               OR LOWER(TRIM(m.serial_number)) = LOWER(TRIM(?))
               OR LOWER(TRIM(h.family_head_name)) LIKE LOWER(TRIM(?));
        """, (hh_id_val, username, username, f'%{username}%'))
        resident = db.fetchone()
        
        if resident and check_password_hash(resident['password_hash'], password):
            hh_str = f"HH-{resident['household_id']}"
            access_token = create_access_token(identity=hh_str)
            return jsonify(access_token=access_token, role='resident', id=hh_str, name=resident['family_head_name'])
                
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
        
    with get_db() as db:
        try:
            def normalize_contact(num):
                if not num: return ""
                clean = "".join(filter(str.isdigit, str(num)))
                if clean.startswith("63"):
                    clean = "0" + clean[2:]
                return clean
                
            target_contact_clean = normalize_contact(contact_no)
            new_hash = generate_password_hash(new_password)
            
            if role in ('admin', 'worker'):
                db.execute("SELECT user_id, contact_no FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(?));", (username,))
                user = db.fetchone()
                if user:
                    user_id, db_contact = user['user_id'], user['contact_no']
                    if db_contact and normalize_contact(db_contact) == target_contact_clean:
                        db.execute("UPDATE users SET password_hash = ?, plain_password = ? WHERE user_id = ?;", (new_hash, new_password, user_id))
                        return jsonify({"status": "success", "msg": "Password reset successful!"})
                
            elif role == 'resident':
                clean_id = username.upper().replace('HH-', '').replace('HH', '').strip()
                hh_id_val = int(clean_id) if clean_id.isdigit() else -1
                db.execute("SELECT household_id, contact_no FROM households WHERE household_id = ?;", (hh_id_val,))
                hh = db.fetchone()
                if hh:
                    hh_id, db_contact = hh['household_id'], hh['contact_no']
                    if db_contact and normalize_contact(db_contact) == target_contact_clean:
                        db.execute("UPDATE households SET password_hash = ?, plain_password = ? WHERE household_id = ?;", (new_hash, new_password, hh_id))
                        return jsonify({"status": "success", "msg": "Password reset successful!"})
                        
            return jsonify({"msg": "No matching account found with that ID and contact number."}), 404
        except Exception as e:
            return jsonify({"msg": "Error during recovery", "error": str(e)}), 500

@app.route('/api/all-data', methods=['GET'])
@jwt_required(optional=True)
def get_all_data():
    with get_db() as db:
        db.execute('''
            SELECT h.household_id, h.family_head_name, h.plain_password, h.current_leak_status, h.flow_rate, h.leak_detected_at,
                   p.purok_name, m.serial_number, m.last_reading, m.meter_id
            FROM households h
            JOIN puroks p ON h.purok_id = p.purok_id
            LEFT JOIN water_meters m ON h.household_id = m.household_id;
        ''')
        rows = db.fetchall()
        
        households = []
        for row in rows:
            hh_id = row['household_id']
            meter_id = row['meter_id']
            
            monthly_history = []
            if meter_id:
                db.execute("SELECT consumption_m3 FROM billing_records WHERE meter_id = ? ORDER BY payment_date DESC LIMIT 4;", (meter_id,))
                hist_rows = db.fetchall()
                monthly_history = [hr['consumption_m3'] for hr in reversed(hist_rows)]
            if not monthly_history:
                monthly_history = [row['last_reading'] or 0.0]
                
            households.append({
                'house_id': f"HH-{hh_id}",
                'owner_name': row['family_head_name'],
                'plain_password': row['plain_password'] or '(default)',
                'purok': row['purok_name'],
                'account_number': row['serial_number'] or f"TAG-2026-{hh_id:04d}",
                'current_m3_usage': row['last_reading'] or 0.0,
                'current_leak_status': row['current_leak_status'] or 'normal',
                'flow_rate': row['flow_rate'] or 0.0,
                'leak_detected_at': row['leak_detected_at'],
                'monthly_history': monthly_history
            })
            
        db.execute("SELECT * FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        row = db.fetchone()
        if row:
            ph_val = float(row.get('ph_level', 7.2) or 7.2)
            turb_val = float(row.get('turbidity_ntu', 6.2) or 6.2)
            tds_val = int(row.get('tds_ppm', 150) or 150)
            water_level = int(row.get('water_level_percentage', 68) or 68)

            ph_warn = ph_val < 6.5 or ph_val > 8.5
            turb_warn = turb_val > 5.0

            central_assets = {
                'main_tank_level': water_level,
                'turbidity': turb_val,
                'ph_level': ph_val,
                'tds_ppm': tds_val,
                'turbidity_status': 'warning' if turb_warn else 'normal',
                'turbidity_desc': 'Elevated turbidity. Check backwash filters.' if turb_warn else 'Turbidity levels normal.',
                'ph_status': 'warning' if ph_warn else 'normal',
                'ph_desc': ('Acidic pH. Check lime feeder.' if ph_val < 6.5 else 'Alkaline pH. Run acid neutralizing wash.') if ph_warn else 'pH neutral & compliant.',
                'last_updated': row.get('recorded_at') or 'Just now'
            }
        else:
            central_assets = {
                'main_tank_level': 68,
                'turbidity': 6.2,
                'ph_level': 7.2,
                'tds_ppm': 150,
                'turbidity_status': 'warning',
                'turbidity_desc': 'Slightly high turbidity.',
                'ph_status': 'normal',
                'ph_desc': 'pH neutral & compliant.',
                'last_updated': '2026-06-25T11:00:00Z'
            }
            
        db.execute("SELECT * FROM maintenance_logs ORDER BY date DESC LIMIT 20;")
        maintenance_logs = []
        for m_row in db.fetchall():
            maintenance_logs.append({
                'task_id': f"LOG-{m_row['task_id']}",
                'house_id': m_row['house_id'],
                'worker_id': m_row['worker_id'],
                'purok': m_row['purok'],
                'description': m_row['description'],
                'date': m_row['date'],
                'status_resolved': bool(m_row['status_resolved']),
                'photo_base64': m_row.get('photo_base64')
            })
            
        db.execute("SELECT user_id, username, plain_password, full_name, role, assigned_zone FROM users;")
        workers = []
        for w_row in db.fetchall():
            if w_row['username'] != 'admin':
                workers.append({
                    'worker_id': w_row['username'],
                    'name': w_row['full_name'],
                    'plain_password': w_row['plain_password'] or '(default)',
                    'role': w_row['role'],
                    'zone': w_row.get('assigned_zone', 'Purok 1')
                })
                
        db.execute('''
            SELECT b.bill_id, b.previous_reading, b.present_reading, b.consumption_m3, b.total_amount, b.payment_status, b.payment_date,
                   u.username AS collector_username, m.serial_number, m.household_id
            FROM billing_records b
            JOIN water_meters m ON b.meter_id = m.meter_id
            LEFT JOIN users u ON b.collected_by = u.user_id
            ORDER BY b.bill_id DESC LIMIT 50;
        ''')
        billing_records = []
        for b_row in db.fetchall():
            dt = b_row.get('payment_date')
            month_str = dt[:7] if dt else "June 2026"
            
            billing_records.append({
                'bill_id': f"BILL-{b_row['bill_id']}",
                'house_id': f"HH-{b_row['household_id']}",
                'account_number': b_row['serial_number'],
                'billing_month': month_str,
                'previous_reading': b_row['previous_reading'],
                'current_reading': b_row['present_reading'],
                'consumption': b_row['consumption_m3'],
                'water_charge': b_row['total_amount'] - 50.0,
                'maintenance_fee': 50.0,
                'total_due': b_row['total_amount'],
                'billed_by': b_row.get('collector_username') or 'EMP-304',
                'date': b_row.get('payment_date') or "2026-06-24T18:45:00Z",
                'status': b_row['payment_status']
            })
        
        db.execute("SELECT message, author, timestamp FROM announcements ORDER BY id DESC;")
        announcements = db.fetchall()

        # Load dynamic payment settings
        db.execute("SELECT setting_key, setting_value FROM payment_settings;")
        payment_settings = {s['setting_key']: s['setting_value'] for s in db.fetchall()}

        # Load recent synced collections for audit
        db.execute('''
            SELECT c.*, h.family_head_name 
            FROM payment_collections c
            LEFT JOIN households h ON c.household_id = h.household_id
            ORDER BY c.collection_id DESC LIMIT 50;
        ''')
        collections_history = db.fetchall()

        # Load resident reports
        db.execute("SELECT * FROM resident_reports ORDER BY report_id DESC LIMIT 50;")
        resident_reports = db.fetchall()
        
        return jsonify({
            'households': households,
            'centralAssets': central_assets,
            'maintenanceLogs': maintenance_logs,
            'workers': workers,
            'billingRecords': billing_records,
            'announcements': announcements,
            'paymentSettings': payment_settings,
            'collectionsHistory': collections_history,
            'residentReports': resident_reports
        })

# ==============================================================================
# IoT Real-time Telemetry Endpoints (ESP32 Integration)
# ==============================================================================
@app.route('/api/iot/telemetry', methods=['POST'])
@app.route('/api/iot/update', methods=['POST'])
@csrf.exempt
def iot_telemetry():
    """Direct HTTP POST endpoint for ESP32 microcontroller with JSN-SR04T, Turbidity, and TDS sensors."""
    data = request.get_json(silent=True) or {}

    try:
        raw_wl = data.get('water_level_percentage', data.get('tank_level', 68))
        water_level = int(float(raw_wl)) if raw_wl is not None else 68
        water_level = max(0, min(100, water_level))
    except (ValueError, TypeError):
        water_level = 68

    try:
        raw_turb = data.get('turbidity_ntu', data.get('turbidity', 6.2))
        turbidity = round(float(raw_turb), 2) if raw_turb is not None else 6.2
    except (ValueError, TypeError):
        turbidity = 6.2

    try:
        raw_ph = data.get('ph_level', data.get('ph', 7.2))
        ph = round(float(raw_ph), 2) if raw_ph is not None else 7.2
    except (ValueError, TypeError):
        ph = 7.2

    try:
        raw_tds = data.get('tds_ppm', data.get('tds', 150))
        tds = int(float(raw_tds)) if raw_tds is not None else 150
    except (ValueError, TypeError):
        tds = 150

    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        db.execute('''
            INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, ph_level, tds_ppm, recorded_at)
            VALUES (?, ?, ?, ?, ?);
        ''', (water_level, turbidity, ph, tds, now_str))

        flow_lpm = data.get('flow_rate_lpm')
        purok_id = data.get('purok_id', 1)
        if flow_lpm is not None:
            try:
                flow_val = float(flow_lpm)
                db.execute('INSERT INTO flow_readings (purok_id, flow_rate_lpm, recorded_at) VALUES (?, ?, ?);',
                           (purok_id, flow_val, now_str))
            except (ValueError, TypeError):
                pass

        # Optional household telemetry
        house_id = data.get('household_id') or data.get('house_id')
        if house_id:
            clean_id = str(house_id).upper().replace('HH-', '').replace('HH', '').strip()
            if clean_id.isdigit():
                hh_id = int(clean_id)
                hh_flow = float(data.get('flow_rate', flow_lpm or 0.0))
                is_leak = data.get('leak') or (data.get('current_leak_status') == 'leak') or (hh_flow > 0.5)
                leak_status = 'leak' if is_leak else 'normal'
                leak_time = now_str if leak_status == 'leak' else None
                db.execute('''
                    UPDATE households
                    SET current_leak_status = ?, flow_rate = ?, leak_detected_at = ?
                    WHERE household_id = ?;
                ''', (leak_status, hh_flow, leak_time, hh_id))

    return jsonify({
        'status': 'success',
        'recorded_at': now_str,
        'water_level_percentage': water_level,
        'turbidity_ntu': turbidity,
        'ph_level': ph,
        'tds_ppm': tds,
        'message': 'IoT sensor data ingested successfully'
    })

@app.route('/api/iot/latest', methods=['GET'])
def get_latest_iot():
    """Returns the latest sensor reading snapshot for real-time subscribers."""
    with get_db() as db:
        db.execute("SELECT * FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        row = db.fetchone()
        if not row:
            return jsonify({
                "water_level_percentage": 68,
                "water_level": 68,
                "turbidity_ntu": 6.2,
                "turbidity": 6.2,
                "ph_level": 7.2,
                "ph": 7.2,
                "tds_ppm": 150,
                "tds": 150,
                "recorded_at": datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
            })
        result = dict(row)
        result['water_level'] = result.get('water_level_percentage')
        result['turbidity'] = result.get('turbidity_ntu')
        result['ph'] = result.get('ph_level')
        result['tds'] = result.get('tds_ppm')
        return jsonify(result)

# ==============================================================================
# Dynamic Payment Configuration Endpoints (Admin Controlled)
# ==============================================================================
@app.route('/api/settings/payment', methods=['GET'])
def get_payment_settings():
    """Fetches payment settings configured by the Barangay Admin."""
    with get_db() as db:
        db.execute("SELECT setting_key, setting_value, updated_at FROM payment_settings;")
        rows = db.fetchall()
        settings = {}
        for r in rows:
            k = r['setting_key']
            v = r['setting_value']
            if isinstance(v, str):
                if v.lower() == 'true':
                    v = True
                elif v.lower() == 'false':
                    v = False
            settings[k] = v
        return jsonify({
            "status": "success",
            "settings": settings
        })

@app.route('/api/settings/payment', methods=['POST'])
@csrf.exempt
def update_payment_settings():
    """Allows Administrator to update payment methods, locations, and guidelines."""
    data = request.get_json(silent=True) or {}
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        for key, val in data.items():
            if not isinstance(key, str) or not key.strip():
                continue
            val_str = str(val).strip()
            # Upsert setting
            db.execute("SELECT setting_key FROM payment_settings WHERE setting_key = ?;", (key,))
            if db.fetchone():
                db.execute("UPDATE payment_settings SET setting_value = ?, updated_at = ? WHERE setting_key = ?;", (val_str, now_str, key))
            else:
                db.execute("INSERT INTO payment_settings (setting_key, setting_value, updated_at) VALUES (?, ?, ?);", (key, val_str, now_str))

    return jsonify({"status": "success", "message": "Payment settings updated successfully."})

# ==============================================================================
# Idempotent Offline Synchronization Engine (Field Worker App)
# ==============================================================================
@app.route('/api/collections/sync', methods=['POST'])
@csrf.exempt
def sync_offline_collections():
    """
    Idempotent synchronization endpoint for Field Worker App.
    Accepts batch collection records created offline.
    Uses local unique transaction_id to prevent any duplicate payments.
    """
    data = request.get_json(silent=True) or {}
    collections = data.get('collections', [])
    if not collections and isinstance(data, list):
        collections = data

    synced_ids = []
    duplicates_ignored = 0
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        for item in collections:
            tx_id = item.get('transaction_id')
            if not tx_id:
                continue

            # Idempotency check: verify if transaction was already committed
            db.execute("SELECT collection_id FROM payment_collections WHERE transaction_id = ?;", (tx_id,))
            existing = db.fetchone()
            if existing:
                duplicates_ignored += 1
                continue

            # Parse parameters
            raw_hh = item.get('house_id', item.get('household_id', 1))
            clean_hh = str(raw_hh).upper().replace('HH-', '').replace('HH', '').strip()
            hh_id = int(clean_hh) if clean_hh.isdigit() else 1

            try:
                amount = float(item.get('amount_collected', item.get('amount', 0.0)))
            except (ValueError, TypeError):
                amount = 0.0

            c_date = item.get('date') or item.get('collection_date') or item.get('collected_at') or now_str
            collector = str(item.get('collected_by', item.get('worker_id', 'Collector'))).strip()
            pay_method = str(item.get('payment_method', 'Cash')).strip()
            
            raw_bill = item.get('bill_id')
            bill_id_val = None
            if raw_bill:
                clean_bill = str(raw_bill).upper().replace('BILL-', '').strip()
                if clean_bill.isdigit():
                    bill_id_val = int(clean_bill)

            # Insert into permanent payment_collections ledger
            db.execute('''
                INSERT INTO payment_collections 
                (transaction_id, bill_id, household_id, amount_collected, collection_date, collected_by, payment_method, synced_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            ''', (tx_id, bill_id_val, hh_id, amount, c_date, collector, pay_method, now_str))

            # Update corresponding billing_record to 'Paid'
            if bill_id_val:
                db.execute('''
                    UPDATE billing_records
                    SET payment_status = 'Paid', payment_date = ?, is_synced = 1
                    WHERE bill_id = ?;
                ''', (c_date, bill_id_val))
            else:
                db.execute('''
                    UPDATE billing_records
                    SET payment_status = 'Paid', payment_date = ?, is_synced = 1
                    WHERE meter_id IN (SELECT meter_id FROM water_meters WHERE household_id = ?)
                      AND payment_status = 'Unpaid';
                ''', (c_date, hh_id))

            synced_ids.append(tx_id)

    return jsonify({
        "status": "success",
        "synced_count": len(synced_ids),
        "duplicates_ignored": duplicates_ignored,
        "synced_ids": synced_ids,
        "message": f"Successfully synchronized {len(synced_ids)} collection record(s) ({duplicates_ignored} duplicates ignored)."
    })

@app.route('/api/collections/history', methods=['GET'])
@jwt_required(optional=True)
def get_collections_history():
    """Returns collection audit log."""
    with get_db() as db:
        db.execute('''
            SELECT c.*, h.family_head_name, p.purok_name
            FROM payment_collections c
            LEFT JOIN households h ON c.household_id = h.household_id
            LEFT JOIN puroks p ON h.purok_id = p.purok_id
            ORDER BY c.collection_id DESC LIMIT 100;
        ''')
        records = db.fetchall()
        return jsonify({"status": "success", "collections": records})

# ==============================================================================
# Resident Reports Endpoints
# ==============================================================================
@app.route('/api/reports', methods=['GET', 'POST'])
@app.route('/api/reports/add', methods=['POST'])
@csrf.exempt
def handle_reports():
    if request.method == 'GET':
        with get_db() as db:
            db.execute('''
                SELECT r.*, h.family_head_name, p.purok_name 
                FROM resident_reports r
                LEFT JOIN households h ON r.household_id = ('HH-' || h.household_id) OR r.household_id = CAST(h.household_id AS TEXT)
                LEFT JOIN puroks p ON h.purok_id = p.purok_id
                ORDER BY r.report_id DESC LIMIT 50;
            ''')
            return jsonify({"status": "success", "reports": db.fetchall()})

    data = request.get_json(silent=True) or {}
    hh_id = str(data.get('household_id', data.get('resident_name', 'HH-1'))).strip()
    r_type = str(data.get('report_type', 'General')).strip()
    desc = str(data.get('description', '')).strip()

    if not desc:
        return jsonify({"msg": "Description is required"}), 400

    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        db.execute('''
            INSERT INTO resident_reports (household_id, report_type, description, status, created_at)
            VALUES (?, ?, ?, 'Pending', ?);
        ''', (hh_id, r_type, desc, now_str))
        r_id = db.lastrowid

    return jsonify({"status": "success", "report_id": r_id, "message": "Report submitted successfully."})

@app.route('/api/reports/update-status', methods=['POST'])
@jwt_required(optional=True)
@csrf.exempt
def update_report_status():
    data = request.get_json(silent=True) or {}
    r_id = data.get('report_id')
    raw_status = str(data.get('status', 'Resolved')).strip()
    status_map = {
        'pending': 'Pending',
        'investigating': 'Investigating',
        'resolved': 'Resolved'
    }
    new_status = status_map.get(raw_status.lower(), 'Resolved')
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        db.execute('''
            UPDATE resident_reports
            SET status = ?, resolved_at = ?
            WHERE report_id = ?;
        ''', (new_status, now_str, r_id))

    return jsonify({"status": "success", "message": "Report status updated.", "new_status": new_status})

# ==============================================================================
# Existing Operational Endpoints
# ==============================================================================
@app.route('/api/central-assets/update', methods=['POST'])
@jwt_required(optional=True)
def update_central_assets():
    assets = request.get_json(silent=True) or {}
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    tds_val = assets.get('tds_ppm', assets.get('tds', 150))
    with get_db() as db:
        db.execute('INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, ph_level, tds_ppm, recorded_at) VALUES (?, ?, ?, ?, ?);',
                  (assets.get('main_tank_level', 68), assets.get('turbidity', 6.2), assets.get('ph_level', 7.2), tds_val, now_str))
    return jsonify({'status': 'success'})

@app.route('/api/households/update', methods=['POST'])
@jwt_required(optional=True)
def update_household_status():
    data = request.get_json(silent=True) or {}
    house_id = str(data.get('house_id', '')).upper().replace('HH-', '').replace('HH', '').strip()
    if not house_id.isdigit():
        return jsonify({'msg': 'Invalid household ID'}), 400

    hh_id = int(house_id)
    leak_status = data.get('current_leak_status', 'normal')
    flow_rate = float(data.get('flow_rate', 0.0))
    leak_detected_at = data.get('leak_detected_at')

    with get_db() as db:
        db.execute('''
            UPDATE households
            SET current_leak_status = ?, flow_rate = ?, leak_detected_at = ?
            WHERE household_id = ?;
        ''', (leak_status, flow_rate, leak_detected_at, hh_id))
    return jsonify({'status': 'success', 'house_id': f'HH-{hh_id}'})

@app.route('/api/maintenance-logs/add', methods=['POST'])
@jwt_required(optional=True)
def add_maintenance_log():
    log = request.get_json(silent=True) or {}
    date_str = log.get('date', datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'))
    with get_db() as db:
        db.execute('''
            INSERT INTO maintenance_logs (house_id, worker_id, purok, description, status_resolved, date, photo_base64)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        ''', (log.get('house_id'), log.get('worker_id'), log.get('purok'), log.get('description'), 
              1 if log.get('status_resolved', True) else 0, date_str, log.get('photo_base64')))
    return jsonify({'status': 'success'})

@app.route('/api/billing-records/add', methods=['POST'])
@jwt_required(optional=True)
def add_billing_record():
    b = request.get_json(silent=True) or {}
    clean_id = str(b.get('house_id', '')).upper().replace("HH-", "").replace("HH", "").strip()
    hh_id = int(clean_id) if clean_id.isdigit() else 1
    
    with get_db() as db:
        db.execute("SELECT meter_id FROM water_meters WHERE household_id = ?;", (hh_id,))
        meter_row = db.fetchone()
        meter_id = meter_row['meter_id'] if meter_row else 1001
        
        billed_by_str = b.get('billed_by', 'EMP-304')
        db.execute("SELECT user_id FROM users WHERE username = ?;", (billed_by_str,))
        user_row = db.fetchone()
        user_id = user_row['user_id'] if user_row else 2
        
        payment_status = 'Unpaid' if b.get('status') == 'Pending' else 'Paid'
        db.execute('''
            INSERT INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount, payment_status, payment_date, collected_by, is_synced)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1);
        ''', (meter_id, b.get('previous_reading'), b.get('current_reading'), b.get('consumption'), b.get('total_due'), payment_status, b.get('date'), user_id))
        db.execute("UPDATE water_meters SET last_reading = ? WHERE meter_id = ?;", (b.get('current_reading'), meter_id))
        
    return jsonify({'status': 'success'})

@app.route('/api/announcements/add', methods=['POST'])
@jwt_required(optional=True)
def add_announcement():
    data = request.get_json()
    if not data or not data.get('message') or not data.get('author'):
        return jsonify({"msg": "Missing data"}), 400
    with get_db() as db:
        db.execute("INSERT INTO announcements (message, author) VALUES (?, ?);", (data['message'], data['author']))
    return jsonify({'status': 'success'})

@app.route('/api/households/add', methods=['POST'])
@jwt_required(optional=True)
def add_household():
    data = request.get_json() or {}
    with get_db() as db:
        try:
            purok_name = data.get('purok', 'Purok 1')
            db.execute("SELECT purok_id FROM puroks WHERE LOWER(purok_name) = LOWER(?);", (purok_name,))
            row = db.fetchone()
            purok_id = row['purok_id'] if row else 1
            
            plain_pw = data.get('password', '[REDACTED]')
            pass_hash = generate_password_hash(plain_pw)
            
            db.execute('''
                INSERT INTO households (purok_id, family_head_name, registration_date, password_hash, plain_password, contact_no)
                VALUES (?, ?, ?, ?, ?, ?);
            ''', (purok_id, data.get('owner_name', 'Unnamed Household'), datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d'), pass_hash, plain_pw, data.get('contact')))
            
            hh_id = db.lastrowid or 1
            serial_number = data.get('account_number') or f'TAG-2026-{hh_id:04d}'
            db.execute('''
                INSERT INTO water_meters (household_id, serial_number, last_reading)
                VALUES (?, ?, ?);
            ''', (hh_id, serial_number, 0.0))
        except Exception as e:
            return jsonify({"msg": "Error adding household", "error": str(e)}), 500
            
    return jsonify({'status': 'success', 'house_id': f'HH-{hh_id}', 'account_number': serial_number})

@app.route('/api/workers/add', methods=['POST'])
@jwt_required(optional=True)
def add_worker():
    data = request.get_json() or {}
    with get_db() as db:
        try:
            plain_pw = data.get('password', '[REDACTED]')
            pass_hash = generate_password_hash(plain_pw)
            assigned_zone = data.get('zone') or data.get('assigned_zone') or 'Purok 1'
            role = data.get('role', 'Collector')
            if role not in ['Admin', 'Collector']:
                role = 'Collector'
                
            db.execute('''
                INSERT INTO users (username, password_hash, plain_password, full_name, role, assigned_zone, contact_no)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            ''', (data.get('worker_id'), pass_hash, plain_pw, data.get('name'), role, assigned_zone, data.get('contact')))
        except Exception as e:
            return jsonify({"msg": "Error adding worker", "error": str(e)}), 500
            
    return jsonify({'status': 'success'})

@app.route('/api/households/<hh_id>', methods=['DELETE'])
@jwt_required(optional=True)
def delete_household(hh_id):
    if isinstance(hh_id, str) and hh_id.upper().startswith('HH-'):
        hh_id_val = hh_id[3:]
    else:
        hh_id_val = hh_id

    with get_db() as db:
        try:
            db.execute("SELECT household_id FROM households WHERE household_id = ?;", (hh_id_val,))
            if not db.fetchone():
                return jsonify({"msg": "Household not found"}), 404

            db.execute('''
                DELETE FROM billing_records
                WHERE meter_id IN (
                    SELECT meter_id FROM water_meters WHERE household_id = ?
                );
            ''', (hh_id_val,))

            db.execute("DELETE FROM water_meters WHERE household_id = ?;", (hh_id_val,))
            db.execute("DELETE FROM households WHERE household_id = ?;", (hh_id_val,))
            return jsonify({'status': 'success'})
        except Exception as e:
            return jsonify({"msg": "Error deleting household", "error": str(e)}), 500

@app.route('/api/workers/<worker_id>', methods=['DELETE'])
@jwt_required(optional=True)
def delete_worker(worker_id):
    with get_db() as db:
        try:
            db.execute("DELETE FROM users WHERE username = ? AND role != 'Admin';", (worker_id,))
            if db.rowcount == 0:
                return jsonify({"msg": "Worker not found or cannot delete Admin"}), 404
        except Exception as e:
            return jsonify({"msg": "Error deleting worker", "error": str(e)}), 500
    return jsonify({'status': 'success'})

# Register API endpoint views internally for stateless JWT / Bearer token requests
for _ep, _view in app.view_functions.items():
    if _view and hasattr(_view, '__module__') and hasattr(_view, '__name__'):
        csrf._exempt_views.add(f"{_view.__module__}.{_view.__name__}")

if __name__ == '__main__':
    init_db()
    is_debug = os.environ.get('FLASK_DEBUG', 'false').lower() in ('true', '1')
    host = os.environ.get('FLASK_RUN_HOST', '0.0.0.0')
    print(f"Starting Flask server on {host}:8000 (Mode: {'PostgreSQL' if is_postgres() else 'SQLite'})...")
    app.run(host=host, port=8000, debug=is_debug)
