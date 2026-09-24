import os
import json
import datetime
import hashlib
import hmac
import logging
import re
from backend import config
from backend.security import principal, require_role, claims_for, text, password, number, identifier, timestamp, validate_push
from backend.photos import save_photo, photo_for_client
from backend.collections import synchronize
from backend.notifications import enqueue, drain
from backend import operational_routes
from flask import Flask, jsonify, request, send_from_directory, send_file, abort
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.security import generate_password_hash, check_password_hash

try:
    from pywebpush import webpush, WebPushException
    HAS_WEBPUSH = True
except ImportError:
    HAS_WEBPUSH = False

# Database adapter (Supports PostgreSQL on Vercel/Cloud and SQLite locally)
try:
    from backend.db_adapter import get_db, init_db, is_postgres
except ImportError:
    from db_adapter import get_db, init_db, is_postgres

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = Flask(__name__, static_folder=None)
app.static_folder = os.path.join(BASE_DIR, 'web')

# ==============================================================================
# VAPID / Web Push Configuration
# ==============================================================================
VAPID_PUBLIC_KEY = os.environ.get('VAPID_PUBLIC_KEY', '').strip()
VAPID_PRIVATE_KEY = os.environ.get('VAPID_PRIVATE_KEY', '').strip()
VAPID_CLAIMS_EMAIL = os.environ.get('VAPID_CLAIMS_EMAIL', '').strip()
if any((VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_CLAIMS_EMAIL)) and not all((VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_CLAIMS_EMAIL)):
    raise RuntimeError('Configure all three VAPID variables or leave all blank')
if config.PRODUCTION and VAPID_PRIVATE_KEY and len(os.getenv('CRON_SECRET', '')) < 32:
    raise RuntimeError('Push requires a CRON_SECRET of at least 32 characters')

def ensure_vapid_keys():
    """Keys are explicitly configured; never create files during application startup."""
    return bool(VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY)

send_web_push = enqueue

# ==============================================================================
# Authentication & OAuth flow (JWT-based auth, not OAuth/OIDC)
# This project validates credentials, creates JWT access tokens, and requires them
# on protected endpoints. There is no OAuth/OIDC provider flow implemented here.
# ==============================================================================
app.config.update(
    SECRET_KEY=config.SECRET_KEY, JWT_SECRET_KEY=config.JWT_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRES=datetime.timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_MINUTES', '480'))),
    JWT_TOKEN_LOCATION=['headers'], MAX_CONTENT_LENGTH=3 * 1024 * 1024, DEBUG=False,
)
# Only Authorization: Bearer is accepted. There is no ambient cookie/session
# authentication, so cookie CSRF tokens do not apply to these JSON APIs.
IOT_DEVICE_SECRET = config.IOT_DEVICE_SECRET
CORS(app, resources={r'/api/*': {'origins': config.ALLOWED_ORIGINS}}, supports_credentials=False)
logging.basicConfig(level=logging.INFO, format='%(levelname)s %(name)s %(message)s')

# Availability, caching & CDN behavior: API responses are intentionally not cached,
# while static assets are allowed to cache short-term. This reduces stale live data.
@app.after_request
def add_cache_headers(response):
    if request.path.endswith('.html') or request.path in ['/', '/admin', '/admin/']:
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    elif request.path.endswith(('.css', '.js', '.png', '.jpg', '.svg')):
        response.headers["Cache-Control"] = "public, max-age=3600"
    else:
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'camera=(self), microphone=(), geolocation=()'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
    if config.PRODUCTION:
        response.headers['Strict-Transport-Security'] = 'max-age=31536000'
    return response

jwt = JWTManager(app)

def rate_limit_address():
    # Vercel overwrites this header at its edge. Never trust it on local/direct servers.
    if os.getenv('VERCEL'):
        import ipaddress
        try:
            return str(ipaddress.ip_address(request.headers.get('X-Vercel-Forwarded-For', '').split(',')[0].strip()))
        except ValueError:
            pass
    return get_remote_address()

limiter = Limiter(rate_limit_address, app=app, default_limits=['240 per minute'],
                  storage_uri=config.RATELIMIT_STORAGE_URI)
# Migrations run with `python -m backend.manage migrate`, never at cold start.
PUBLIC = {'health_check', 'readiness', 'login', 'recover_account', 'get_vapid_public_key', 'runtime_config'}
STAFF = {'sync_offline_collections', 'get_collections_history', 'update_report_status',
         'update_household_status', 'add_maintenance_log', 'add_billing_record', 'add_announcement'}
ADMIN = {'update_payment_settings', 'update_central_assets', 'add_household', 'add_worker',
         'delete_household', 'delete_worker'}
AUTHENTICATED = {'get_all_data', 'get_latest_iot', 'get_payment_settings', 'handle_reports',
                 'get_announcements', 'poll_notifications', 'subscribe_push', 'unsubscribe_push', 'sse_events'}

@app.before_request
def enforce_api_policy():
    if not request.path.startswith('/api/') or request.method == 'OPTIONS':
        return None
    if request.endpoint is None or request.endpoint in ('static', 'serve_static'):
        abort(404)
    if request.method in ('POST', 'PUT', 'PATCH'):
        if not isinstance(request.get_json(), dict):
            abort(400, description='JSON object required')
    if request.endpoint in PUBLIC or request.endpoint in ('iot_telemetry', 'drain_push'):
        return None
    verify_jwt_in_request()
    if request.endpoint in ADMIN:
        require_role('admin')
    elif request.endpoint in STAFF:
        require_role('admin', 'worker')
    elif request.endpoint in AUTHENTICATED:
        principal()
    else:
        abort(403)
    if request.endpoint == 'get_all_data' and request.args.get('role') == 'admin':
        require_role('admin')

@app.errorhandler(Exception)
def clean_error(error):
    from werkzeug.exceptions import HTTPException
    if isinstance(error, HTTPException):
        return jsonify(msg=error.description), error.code
    import sqlite3
    import psycopg2
    if isinstance(error, (sqlite3.IntegrityError, psycopg2.IntegrityError)):
        return jsonify(msg='Conflicting record or invalid reference'), 409
    # SQL/driver exceptions can contain private values; log only event/type.
    app.logger.error('Request failed: endpoint=%s error_type=%s', request.endpoint, type(error).__name__)
    return jsonify(msg='Unable to complete request'), 500

@app.route('/api/ready')
def readiness():
    try:
        with get_db() as db:
            db.execute('SELECT version FROM schema_migrations WHERE version = 1')
            if not db.fetchone():
                raise RuntimeError('Schema not ready')
        return jsonify(status='ready')
    except Exception:
        app.logger.warning('Database readiness check failed')
        return jsonify(status='unavailable'), 503

@app.route('/api/config')
def runtime_config():
    return jsonify(realtime_mode='polling', poll_interval_seconds=10, push_enabled=ensure_vapid_keys())

@app.route('/api/jobs/push', methods=['GET'])
@limiter.exempt
def drain_push():
    credential = os.getenv('CRON_SECRET', '')
    if not credential or not hmac.compare_digest(request.headers.get('Authorization', ''), 'Bearer ' + credential):
        abort(401)
    return jsonify(processed=drain())

# ==============================================================================
# Static File Serving
# ==============================================================================
def safe_serve_file(base_folder, requested_path, default_file='index.html'):
    if os.path.splitext(requested_path)[1].lower() not in ('.html', '.js', '.css', '.png', '.jpg', '.ico', '.json', '.svg', '.webp'):
        abort(404)
    base_dir = os.path.abspath(base_folder)
    target_path = os.path.abspath(os.path.join(base_dir, requested_path))
    if os.path.commonpath([base_dir, target_path]) == base_dir and os.path.isfile(target_path):
        rel_path = os.path.relpath(target_path, base_dir).replace(os.sep, '/')
        return send_from_directory(base_dir, rel_path)
    abort(404)

@app.route('/')
def serve_index():
    return send_file(os.path.join(os.path.abspath(app.static_folder), 'index.html'))

@app.route('/<path:path>')
def serve_static(path):
    return safe_serve_file(app.static_folder, path)

@app.route('/admin')
@app.route('/admin/')
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
        "message": "WaterHall API is running"
    })

# Authentication & OAuth flow: user login verifies username/password and issues a JWT.
# This is the actual login flow used by the app; it checks both worker and resident records.
@app.route('/api/login', methods=['POST'])
@limiter.limit("10 per minute; 60 per hour")
def login():
    data = request.get_json() or {}
    username = str(data.get('username', '')).strip()
    password = data.get('password', '')
    if not isinstance(password, str) or len(password) > 128 or len(username) > 200:
        abort(400, description='Invalid credentials')

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    with get_db() as db:
        # 1. Check worker in users table
        db.execute("SELECT * FROM users WHERE LOWER(TRIM(username)) = LOWER(TRIM(?)) OR LOWER(TRIM(full_name)) = LOWER(TRIM(?));", (username, username))
        user = db.fetchone()

        if user and check_password_hash(user['password_hash'], password):
            access_token = create_access_token(identity=user['username'], additional_claims=claims_for(user['password_hash'], 'staff'))
            return jsonify(access_token=access_token, role=('admin' if user['role'] == 'Admin' else 'worker'), id=user['username'], name=user['full_name'])

        # 2. Check resident in households table
        clean_id = username.upper().replace('HH-', '').replace('HH', '').strip()
        hh_id_val = int(clean_id) if clean_id.isdigit() else -1

        db.execute("""
            SELECT h.*, m.serial_number FROM households h
            LEFT JOIN water_meters m ON h.household_id = m.household_id
            WHERE h.household_id = ?
               OR LOWER(TRIM(h.family_head_name)) = LOWER(TRIM(?))
               OR LOWER(TRIM(m.serial_number)) = LOWER(TRIM(?))
;
        """, (hh_id_val, username, username))
        resident = db.fetchone()

        if resident and check_password_hash(resident['password_hash'], password):
            hh_str = f"HH-{resident['household_id']}"
            access_token = create_access_token(identity=hh_str, additional_claims=claims_for(resident['password_hash'], 'resident'))
            return jsonify(access_token=access_token, role='resident', id=hh_str, name=resident['family_head_name'])

    app.logger.warning("Authentication failed")
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/recover-account', methods=['POST'])
@limiter.limit("5 per minute")
def recover_account():
    data = request.get_json()
    token = text(data.get('reset_token'), 'recovery code', 128, 32)
    new_hash = generate_password_hash(password(data.get('new_password')))
    digest = hashlib.sha256(token.encode()).hexdigest()
    with get_db() as db:
        if not db.is_pg:
            db.execute('BEGIN IMMEDIATE')
        db.execute('SELECT * FROM password_resets WHERE token_hash = ?' + (' FOR UPDATE' if db.is_pg else ''), (digest,))
        reset = db.fetchone()
        if not reset or reset['used'] or reset['expires_at'] < datetime.datetime.now(datetime.timezone.utc).isoformat():
            abort(400, description='Invalid or expired recovery code')
        if reset['kind'] == 'resident':
            db.execute('UPDATE households SET password_hash = ? WHERE household_id = ?', (new_hash, identifier(reset['account_id'], 'HH-')))
        else:
            db.execute('UPDATE users SET password_hash = ? WHERE username = ?', (new_hash, reset['account_id']))
        db.execute('UPDATE password_resets SET used = 1 WHERE token_hash = ?', (digest,))
    return jsonify(status='success', msg='Password reset. Please sign in again.')

@app.route('/api/all-data', methods=['GET'])
@jwt_required()
def get_all_data():
    with get_db() as db:
        db.execute('''
            SELECT h.household_id, h.family_head_name, h.current_leak_status, h.flow_rate, h.leak_detected_at,
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
                db.execute("SELECT consumption_m3 FROM billing_records WHERE meter_id = ? ORDER BY bill_id DESC LIMIT 4;", (meter_id,))
                hist_rows = db.fetchall()
                monthly_history = [hr['consumption_m3'] for hr in reversed(hist_rows)]

            households.append({
                'house_id': f"HH-{hh_id}",
                'owner_name': row['family_head_name'],
                'purok': row['purok_name'],
                'account_number': row['serial_number'] or 'Unassigned',
                'current_m3_usage': row['last_reading'] or 0.0,
                'current_leak_status': row['current_leak_status'] or 'normal',
                'flow_rate': row['flow_rate'] or 0.0,
                'leak_detected_at': row['leak_detected_at'],
                'monthly_history': monthly_history
            })

        db.execute("SELECT * FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        row = db.fetchone()
        if row:
            ph_known = row.get('ph_level') is not None
            ph_val = float(row.get('ph_level') or 0)
            turb_val = float(row.get('turbidity_ntu', 0))
            tds_val = int(row.get('tds_ppm', 0))
            water_level = int(row.get('water_level_percentage', 0))

            ph_warn = ph_known and (ph_val < 6.5 or ph_val > 8.5)
            turb_warn = turb_val > 5.0

            central_assets = {
                'main_tank_level': water_level,
                'turbidity': turb_val,
                'ph_level': ph_val,
                'tds_ppm': tds_val,
                'turbidity_status': 'warning' if turb_warn else 'normal',
                'turbidity_desc': 'Elevated turbidity. Check backwash filters.' if turb_warn else 'Turbidity levels normal.',
                'ph_status': ('warning' if ph_warn else 'normal') if ph_known else 'unknown',
                'ph_desc': 'pH not measured' if not ph_known else ('Acidic pH. Check lime feeder.' if ph_val < 6.5 else 'Alkaline pH. Run acid neutralizing wash.') if ph_warn else 'pH neutral & compliant.',
                'last_updated': row.get('recorded_at'), 'has_reading': True
            }
        else:
            central_assets = {'main_tank_level': 0, 'turbidity': 0, 'ph_level': 0,
                              'tds_ppm': 0, 'turbidity_status': 'unknown', 'ph_status': 'unknown',
                              'turbidity_desc': 'Awaiting sensor readings', 'ph_desc': 'Awaiting sensor readings',
                              'last_updated': None, 'has_reading': False}

        db.execute("SELECT * FROM maintenance_logs ORDER BY date DESC;")
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
                'photo_base64': photo_for_client(m_row.get('photo_base64'))
            })

        db.execute("SELECT user_id, username, full_name, role, assigned_zone FROM users;")
        workers = []
        for w_row in db.fetchall():
            if w_row['role'] == 'Collector':
                workers.append({
                    'worker_id': w_row['username'],
                    'name': w_row['full_name'],
                    'role': w_row['role'],
                    'zone': w_row.get('assigned_zone', 'Purok 1')
                })

        db.execute('''
            SELECT b.bill_id, b.previous_reading, b.present_reading, b.consumption_m3, b.total_amount, b.payment_status, b.payment_date, b.billed_at,
                   u.username AS biller_username, m.serial_number, m.household_id
            FROM billing_records b
            JOIN water_meters m ON b.meter_id = m.meter_id
            LEFT JOIN users u ON b.billed_by = u.user_id
            ORDER BY b.bill_id DESC;
        ''')
        billing_records = []
        for b_row in db.fetchall():
            dt = b_row.get('billed_at')
            month_str = dt[:7] if dt else 'Unknown (legacy record)'

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
                'billed_by': b_row.get('biller_username') or 'Unknown',
                'date': dt or '',
                'status': b_row['payment_status']
            })

        role = principal()['role']
        if role == 'resident':
            db.execute("SELECT id, message, author, target_audience, timestamp FROM announcements WHERE target_audience IN ('Everyone', 'Residents only') ORDER BY id DESC;")
        elif role == 'worker':
            db.execute("SELECT id, message, author, target_audience, timestamp FROM announcements WHERE target_audience IN ('Everyone', 'Workers only') ORDER BY id DESC;")
        else:
            db.execute("SELECT id, message, author, target_audience, timestamp FROM announcements ORDER BY id DESC;")
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
        db.execute("SELECT * FROM resident_reports ORDER BY report_id DESC;")
        resident_reports = db.fetchall()

        who = principal()
        if who['role'] == 'resident':
            own = who['id']
            households = [h for h in households if h['house_id'] == own]
            billing_records = [b for b in billing_records if b['house_id'] == own]
            maintenance_logs = [m for m in maintenance_logs if m['house_id'] == own]
            resident_reports = [r for r in resident_reports if str(r['household_id']) in (own, own[3:])]
            workers = []
            collections_history = []
        elif who['role'] == 'worker':
            collections_history = [c for c in collections_history if c['collected_by'] == who['id']]
        for report in resident_reports:
            report['photo_base64'] = photo_for_client(report.get('photo_base64'))
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
@limiter.limit("60 per minute; 20000 per day", override_defaults=True)
def iot_telemetry():
    """Direct HTTP POST endpoint for ESP32 microcontroller with JSN-SR04T, Turbidity, and TDS sensors."""
    if not IOT_DEVICE_SECRET:
        abort(503, description='Device ingestion is not configured')
    if not hmac.compare_digest(request.headers.get('X-IoT-Secret', ''), IOT_DEVICE_SECRET):
        app.logger.warning('Telemetry authentication failed')
        abort(401, description='Unauthorized device')
    data = request.get_json()
    water_level = int(number(data.get('water_level_percentage', data.get('tank_level')), 'water level', 0, 100))
    turbidity = number(data.get('turbidity_ntu', data.get('turbidity')), 'turbidity', 0, 10000)
    raw_ph = data.get('ph_level', data.get('ph'))
    ph = number(raw_ph, 'pH', 0, 14) if raw_ph is not None else None
    ph_label = f'{ph:.1f}' if ph is not None else 'not measured'
    tds = int(number(data.get('tds_ppm', data.get('tds')), 'TDS', 0, 100000))
    if data.get('flow_rate_lpm') is not None:
        data['flow_rate_lpm'] = number(data['flow_rate_lpm'], 'flow rate', 0, 100000)
        data['purok_id'] = identifier(data.get('purok_id'))
    if data.get('house_id') or data.get('household_id'):
        identifier(data.get('house_id') or data.get('household_id'), 'HH-')
        data['flow_rate'] = number(data.get('flow_rate', data.get('flow_rate_lpm', 0)), 'flow rate', 0, 100000)

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

        # Automated emergency system alerts for contamination or critically low water level
        now_dt = datetime.datetime.now(datetime.timezone.utc)
        one_hour_ago = (now_dt - datetime.timedelta(hours=1)).strftime('%Y-%m-%d %H:%M:%S')

        # 1. Contamination Alert Check (Turbidity > 5.0 NTU or pH < 6.5 or pH > 8.5)
        if turbidity > 5.0 or (ph is not None and (ph < 6.5 or ph > 8.5)):
            db.execute("""
                SELECT COUNT(*) as cnt FROM announcements
                WHERE author = 'System Sensor Alert'
                  AND message LIKE '%WATER QUALITY ALERT%'
                  AND timestamp >= ?;
            """, (one_hour_ago,))
            recent_alert = db.fetchone()
            alert_count = recent_alert['cnt'] if recent_alert and 'cnt' in recent_alert else (list(recent_alert.values())[0] if recent_alert else 0)
            if alert_count == 0:
                alert_msg = f"⚠️ WATER QUALITY ALERT: Water contamination detected (Turbidity: {turbidity:.1f} NTU, pH: {ph_label}). Water may be unsafe for direct drinking. Follow local water authority guidance before using this supply."
                db.execute("""
                    INSERT INTO announcements (message, author, target_audience, timestamp)
                    VALUES (?, 'System Sensor Alert', 'Everyone', ?);
                """, (alert_msg, now_str))

                # Queue durable push notification for contamination
                send_web_push(
                    title="⚠️ Water Quality Warning",
                    body=f"Water turbidity ({turbidity:.1f} NTU) or pH ({ph_label}) is abnormal. Follow local water authority guidance.",
                    target_audience='Everyone',
                    tag='alert-water-quality',
                    extra_data={'url': '/', 'type': 'critical'}, db=db
                )

        # 2. Critically Low Water Level Check (<= 20%)
        if water_level <= 20:
            db.execute("""
                SELECT COUNT(*) as cnt FROM announcements
                WHERE author = 'System Sensor Alert'
                  AND message LIKE '%LOW WATER ALERT%'
                  AND timestamp >= ?;
            """, (one_hour_ago,))
            recent_alert = db.fetchone()
            alert_count = recent_alert['cnt'] if recent_alert and 'cnt' in recent_alert else (list(recent_alert.values())[0] if recent_alert else 0)
            if alert_count == 0:
                alert_msg = f"⚠️ LOW WATER ALERT: Central reservoir is critically low at {water_level}%. Supply reduction may occur. Please conserve water."
                db.execute("""
                    INSERT INTO announcements (message, author, target_audience, timestamp)
                    VALUES (?, 'System Sensor Alert', 'Everyone', ?);
                """, (alert_msg, now_str))

                # Queue durable push notification for low water
                send_web_push(
                    title="⚠️ Water Level Warning",
                    body=f"Central reservoir water level is critically low ({water_level}%). Please conserve water.",
                    target_audience='Everyone',
                    tag='alert-low-water',
                    extra_data={'url': '/', 'type': 'warning'}, db=db
                )

    # Dashboards poll committed sensor readings.

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
            return jsonify(status='awaiting_sensor', recorded_at=None), 200
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

# Access control & authorization: protected admin/update routes require a valid JWT.
@app.route('/api/settings/payment', methods=['POST'])
@jwt_required()
def update_payment_settings():
    """Allows Administrator to update payment methods, locations, and guidelines."""
    data = request.get_json(silent=True) or {}
    allowed = {'payment_location', 'payment_method', 'allow_worker_collection', 'payment_instructions', 'operating_hours', 'emergency_contact'}
    if not data or set(data) - allowed:
        abort(400, description='Unknown payment setting')
    if 'allow_worker_collection' in data and str(data['allow_worker_collection']).lower() not in ('true', 'false'):
        abort(400, description='Invalid collection setting')
    for value in data.values():
        text(str(value), 'setting value', 2000)
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        for key, val in data.items():
            if not isinstance(key, str) or not key.strip():
                continue
            val_str = str(val).strip().lower() if isinstance(val, bool) else str(val).strip()
            # Upsert setting
            db.execute("SELECT setting_key FROM payment_settings WHERE setting_key = ?;", (key,))
            if db.fetchone():
                db.execute("UPDATE payment_settings SET setting_value = ?, updated_at = ? WHERE setting_key = ?;", (val_str, now_str, key))
            else:
                db.execute("INSERT INTO payment_settings (setting_key, setting_value, updated_at) VALUES (?, ?, ?);", (key, val_str, now_str))

    return jsonify({"status": "success", "message": "Payment settings updated successfully."})

# Access control & authorization: field-worker syncs must also present a valid JWT,
# and the backend avoids duplicate uploads through transaction_id checks.
@app.route('/api/collections/sync', methods=['POST'])
@jwt_required()
@limiter.limit('120 per minute', override_defaults=True)
def sync_offline_collections():
    return jsonify(synchronize(request.get_json()))

@app.route('/api/collections/history', methods=['GET'])
@jwt_required()
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
        if principal()['role'] != 'admin':
            records = [r for r in records if r['collected_by'] == principal()['id']]
        return jsonify({"status": "success", "collections": records})

# ==============================================================================
# Resident Reports Endpoints
# ==============================================================================
@app.route('/api/reports', methods=['GET', 'POST'])
@app.route('/api/reports/add', methods=['POST'])
def handle_reports():
    return operational_routes.handle_reports()

@app.route('/api/reports/update-status', methods=['POST'])
@jwt_required()
def update_report_status():
    return operational_routes.update_report_status()

# ==============================================================================
# Existing Operational Endpoints
# ==============================================================================
@app.route('/api/central-assets/update', methods=['POST'])
@jwt_required()
def update_central_assets():
    return operational_routes.update_central_assets()

@app.route('/api/households/update', methods=['POST'])
@jwt_required()
def update_household_status():
    return operational_routes.update_household_status()

@app.route('/api/maintenance-logs/add', methods=['POST'])
@jwt_required()
def add_maintenance_log():
    return operational_routes.add_maintenance_log()

@app.route('/api/billing-records/add', methods=['POST'])
@jwt_required()
def add_billing_record():
    return operational_routes.add_billing_record()

@app.route('/api/announcements', methods=['GET'])
def get_announcements():
    role = principal()['role']
    with get_db() as db:
        if role == 'resident':
            db.execute("SELECT id, message, author, target_audience, timestamp FROM announcements WHERE target_audience IN ('Everyone', 'Residents only') ORDER BY id DESC LIMIT 50;")
        elif role == 'worker':
            db.execute("SELECT id, message, author, target_audience, timestamp FROM announcements WHERE target_audience IN ('Everyone', 'Workers only') ORDER BY id DESC LIMIT 50;")
        else:
            db.execute("SELECT id, message, author, target_audience, timestamp FROM announcements ORDER BY id DESC LIMIT 50;")
        rows = [dict(r) for r in db.fetchall()]
        return jsonify({'status': 'success', 'announcements': rows})

@app.route('/api/announcements/add', methods=['POST'])
@jwt_required()
@limiter.limit("6 per minute; 60 per hour")
def add_announcement():
    return operational_routes.add_announcement()

@app.route('/api/notifications/poll', methods=['GET'])
def poll_notifications():
    role = principal()['role']
    since_id = request.args.get('since_id', 0, type=int)

    with get_db() as db:
        if role == 'worker':
            db.execute("""
                SELECT id, message, author, target_audience, timestamp
                FROM announcements
                WHERE id > ? AND target_audience IN ('Everyone', 'Workers only')
                ORDER BY id DESC LIMIT 10;
            """, (since_id,))
        else:
            db.execute("""
                SELECT id, message, author, target_audience, timestamp
                FROM announcements
                WHERE id > ? AND target_audience IN ('Everyone', 'Residents only')
                ORDER BY id DESC LIMIT 10;
            """, (since_id,))
        new_announcements = [dict(r) for r in db.fetchall()]

        # Latest telemetry for urgent status checks
        db.execute("SELECT water_level_percentage, turbidity_ntu, ph_level, tds_ppm, recorded_at FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        telemetry = db.fetchone()
        telemetry_dict = dict(telemetry) if telemetry else {}

        is_contaminated = False
        is_low_level = False
        if telemetry_dict:
            turb = telemetry_dict.get('turbidity_ntu') or 0.0
            ph = telemetry_dict.get('ph_level')
            wl = telemetry_dict.get('water_level_percentage', 100)
            if turb > 5.0 or (ph is not None and (ph < 6.5 or ph > 8.5)):
                is_contaminated = True
            if wl <= 20:
                is_low_level = True

        return jsonify({
            'status': 'success',
            'has_updates': len(new_announcements) > 0,
            'new_announcements': new_announcements,
            'latest_announcement': new_announcements[0] if new_announcements else None,
            'is_contaminated': is_contaminated,
            'is_low_level': is_low_level,
            'telemetry': telemetry_dict
        })

# ==============================================================================
# Realtime SSE Streaming & Web Push Notification Endpoints
# ==============================================================================
@app.route('/api/events', methods=['GET'])
def sse_events():
    return jsonify(status='polling', message='Use authenticated polling; in-process streams do not span serverless instances'), 409

@app.route('/api/push/vapid-public-key', methods=['GET'])
def get_vapid_public_key():
    """Returns the application server public key for browser pushManager subscription."""
    ensure_vapid_keys()
    return jsonify({
        'status': 'success',
        'public_key': VAPID_PUBLIC_KEY
    })

@app.route('/api/push/subscribe', methods=['POST'])
@jwt_required()
def subscribe_push():
    """Registers or refreshes a browser push subscription for the authenticated resident or worker."""
    identity = str(get_jwt_identity())
    data = request.get_json(silent=True) or {}
    endpoint = text(data.get('endpoint'), 'endpoint', 2048)
    keys = data.get('keys') or {}
    if not isinstance(keys, dict):
        abort(400, description='Invalid push keys')
    p256dh = text(keys.get('p256dh') or data.get('p256dh'), 'push key', 200)
    auth = text(keys.get('auth') or data.get('auth'), 'push auth', 100)
    role = principal()['role']
    validate_push(endpoint, p256dh, auth)

    if not endpoint or not p256dh or not auth:
        return jsonify({'status': 'error', 'message': 'Missing endpoint or key material'}), 400

    clean_id = identity.upper().replace('HH-', '').replace('HH', '').strip()
    hh_id = int(clean_id) if clean_id.isdigit() else None
    now_str = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        db.execute("SELECT sub_id, username FROM push_subscriptions WHERE endpoint = ?;", (endpoint,))
        existing = db.fetchone()
        if existing:
            if existing['username'] != identity:
                abort(409, description='Subscription belongs to another account; unsubscribe first')
            db.execute("""
                UPDATE push_subscriptions
                SET username = ?, role = ?, household_id = ?, p256dh = ?, auth = ?, is_active = 1, updated_at = ?
                WHERE sub_id = ?;
            """, (identity, role, hh_id, p256dh, auth, now_str, existing['sub_id']))
        else:
            db.execute("""
                INSERT INTO push_subscriptions (household_id, username, role, endpoint, p256dh, auth, is_active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?);
            """, (hh_id, identity, role, endpoint, p256dh, auth, now_str, now_str))

    return jsonify({'status': 'success', 'message': 'Push subscription registered successfully'})

@app.route('/api/push/unsubscribe', methods=['POST'])
@jwt_required()
def unsubscribe_push():
    """Deactivates a push subscription when user logs out or disables notifications."""
    identity = str(get_jwt_identity())
    data = request.get_json(silent=True) or {}
    endpoint = text(data.get('endpoint', ''), 'endpoint', 2048, 0)

    with get_db() as db:
        if endpoint:
            db.execute("""
                UPDATE push_subscriptions
                SET is_active = 0, updated_at = CURRENT_TIMESTAMP
                WHERE endpoint = ? AND username = ?;
            """, (endpoint, identity))
        else:
            db.execute("""
                UPDATE push_subscriptions
                SET is_active = 0, updated_at = CURRENT_TIMESTAMP
                WHERE username = ?;
            """, (identity,))

    return jsonify({'status': 'success', 'message': 'Push subscription deactivated'})

@app.route('/api/households/add', methods=['POST'])
@jwt_required()
@limiter.limit("20 per minute")
def add_household():
    data = request.get_json() or {}
    if data.get('contact') is not None:
        text(data['contact'], 'contact number', 30, 0)
    if data.get('account_number') is not None:
        text(data['account_number'], 'account number', 80)
    with get_db() as db:
        try:
            purok_name = data.get('purok', 'Purok 1')
            db.execute("SELECT purok_id FROM puroks WHERE LOWER(purok_name) = LOWER(?);", (purok_name,))
            row = db.fetchone()
            if not row:
                abort(400, description='Unknown purok')
            purok_id = row['purok_id']

            plain_pw = password(data.get('password'))
            pass_hash = generate_password_hash(plain_pw)

            db.execute('''
                INSERT INTO households (purok_id, family_head_name, registration_date, password_hash, contact_no)
                VALUES (?, ?, ?, ?, ?);
            ''', (purok_id, text(data.get('owner_name'), 'owner name'), datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d'), pass_hash, data.get('contact')))

            hh_id = db.lastrowid
            serial_number = data.get('account_number') or f'TAG-2026-{hh_id:04d}'
            db.execute('''
                INSERT INTO water_meters (household_id, serial_number, last_reading)
                VALUES (?, ?, ?);
            ''', (hh_id, serial_number, 0.0))
        except Exception as e:
            raise

    return jsonify({'status': 'success', 'house_id': f'HH-{hh_id}', 'account_number': serial_number})

@app.route('/api/workers/add', methods=['POST'])
@jwt_required()
@limiter.limit("10 per minute")
def add_worker():
    data = request.get_json() or {}
    if data.get('contact') is not None:
        text(data['contact'], 'contact number', 30, 0)
    if data.get('account_number') is not None:
        text(data['account_number'], 'account number', 80)
    with get_db() as db:
        try:
            plain_pw = password(data.get('password'))
            pass_hash = generate_password_hash(plain_pw)
            assigned_zone = text(data.get('zone') or data.get('assigned_zone') or 'Purok 1', 'assigned zone', 80)
            role = data.get('role', 'Collector')
            if role != 'Collector':
                abort(400, description='Create administrators with the secure CLI')
            if not re.fullmatch(r'[A-Za-z0-9_-]{1,60}', str(data.get('worker_id', ''))) or str(data.get('worker_id', '')).upper().startswith('HH-'):
                abort(400, description='Invalid worker ID')

            db.execute('''
                INSERT INTO users (username, password_hash, full_name, role, assigned_zone, contact_no)
                VALUES (?, ?, ?, ?, ?, ?);
            ''', (text(data.get('worker_id'), 'worker ID', 60), pass_hash, text(data.get('name'), 'name'), role, assigned_zone, data.get('contact')))
        except Exception as e:
            raise

    return jsonify({'status': 'success'})

@app.route('/api/households/<hh_id>', methods=['DELETE'])
@jwt_required()
def delete_household(hh_id):
    identifier(hh_id, 'HH-')
    if isinstance(hh_id, str) and hh_id.upper().startswith('HH-'):
        hh_id_val = hh_id[3:]
    else:
        hh_id_val = hh_id

    with get_db() as db:
        try:
            db.execute("SELECT household_id FROM households WHERE household_id = ?;", (hh_id_val,))
            if not db.fetchone():
                return jsonify({"msg": "Household not found"}), 404

            db.execute('SELECT collection_id FROM payment_collections WHERE household_id = ? LIMIT 1', (hh_id_val,))
            if db.fetchone():
                abort(409, description='Household has payment history and cannot be deleted')
            db.execute('SELECT bill_id FROM billing_records WHERE meter_id IN (SELECT meter_id FROM water_meters WHERE household_id = ?) LIMIT 1', (hh_id_val,))
            if db.fetchone():
                abort(409, description='Household has billing history and cannot be deleted')
            db.execute("DELETE FROM water_meters WHERE household_id = ?;", (hh_id_val,))
            db.execute("DELETE FROM households WHERE household_id = ?;", (hh_id_val,))
            return jsonify({'status': 'success'})
        except Exception as e:
            raise

@app.route('/api/workers/<worker_id>', methods=['DELETE'])
@jwt_required()
def delete_worker(worker_id):
    with get_db() as db:
        try:
            db.execute("DELETE FROM users WHERE username = ? AND role != 'Admin';", (worker_id,))
            if db.rowcount == 0:
                return jsonify({"msg": "Worker not found or cannot delete Admin"}), 404
        except Exception as e:
            raise
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    is_debug = os.environ.get('FLASK_DEBUG', 'false').lower() in ('true', '1')
    host = os.environ.get('FLASK_RUN_HOST', '127.0.0.1')
    print(f"Starting Flask server on {host}:8000 (Mode: {'PostgreSQL' if is_postgres() else 'SQLite'})...")
    app.run(host=host, port=int(os.getenv('PORT', '8000')), debug=(is_debug and not config.PRODUCTION))
