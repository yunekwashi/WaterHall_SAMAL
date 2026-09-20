import os
import sqlite3
import datetime
from werkzeug.security import generate_password_hash

# Try to import psycopg2 for PostgreSQL (when deployed to Vercel with Vercel Postgres / Neon / Supabase)
try:
    import psycopg2
    from psycopg2 import pool as pg_pool
    from psycopg2.extras import RealDictCursor
    HAS_PSYCOPG2 = True
except ImportError:
    HAS_PSYCOPG2 = False

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_FILE = os.path.join(BASE_DIR, 'database', 'waterhall.db')

# Ensure database directory exists
os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)

# PostgreSQL connection string from environment
POSTGRES_URL = os.environ.get('POSTGRES_URL') or os.environ.get('DATABASE_URL')
# Vercel Postgres URLs often use postgres:// which psycopg2 prefers as postgresql://
if POSTGRES_URL and POSTGRES_URL.startswith('postgres://'):
    POSTGRES_URL = POSTGRES_URL.replace('postgres://', 'postgresql://', 1)

_pg_connection_pool = None

def is_postgres():
    return bool(POSTGRES_URL and HAS_PSYCOPG2)

def get_pg_pool():
    global _pg_connection_pool
    if _pg_connection_pool is None and is_postgres():
        _pg_connection_pool = pg_pool.SimpleConnectionPool(1, 10, POSTGRES_URL)
    return _pg_connection_pool

class DBConnection:
    """Wrapper that normalizes SQLite and PostgreSQL connections and queries."""
    def __init__(self):
        self.is_pg = is_postgres()
        if self.is_pg:
            pool = get_pg_pool()
            if pool:
                self.conn = pool.getconn()
            else:
                self.conn = psycopg2.connect(POSTGRES_URL)
            self.cursor_obj = self.conn.cursor(cursor_factory=RealDictCursor)
        else:
            self.conn = sqlite3.connect(DB_FILE)
            self.conn.row_factory = sqlite3.Row
            self.cursor_obj = self.conn.cursor()
            self.cursor_obj.execute("PRAGMA foreign_keys = ON;")

    def _convert_query(self, query):
        if self.is_pg:
            # Convert SQLite placeholders '?' to PostgreSQL '%s'
            # Be careful not to replace ? inside strings if any, but our queries use standard parameterized ?
            return query.replace('?', '%s')
        else:
            return query

    def execute(self, query, params=None):
        q = self._convert_query(query)
        if params is None:
            return self.cursor_obj.execute(q)
        return self.cursor_obj.execute(q, params)

    def executemany(self, query, params_list):
        q = self._convert_query(query)
        return self.cursor_obj.executemany(q, params_list)

    def fetchone(self):
        row = self.cursor_obj.fetchone()
        if row is None:
            return None
        if self.is_pg:
            return dict(row)
        return dict(row)

    def fetchall(self):
        rows = self.cursor_obj.fetchall()
        if not rows:
            return []
        if self.is_pg:
            return [dict(r) for r in rows]
        return [dict(r) for r in rows]

    @property
    def lastrowid(self):
        if self.is_pg:
            # Handled via RETURNING in Postgres if needed, or cursor_obj.lastrowid
            return getattr(self.cursor_obj, 'lastrowid', None)
        return self.cursor_obj.lastrowid

    @property
    def rowcount(self):
        return self.cursor_obj.rowcount

    def commit(self):
        self.conn.commit()

    def rollback(self):
        try:
            self.conn.rollback()
        except Exception:
            pass

    def close(self):
        try:
            self.cursor_obj.close()
        except Exception:
            pass
        if self.is_pg and _pg_connection_pool:
            try:
                _pg_connection_pool.putconn(self.conn)
            except Exception:
                self.conn.close()
        else:
            self.conn.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.rollback()
        else:
            self.commit()
        self.close()

def get_db():
    return DBConnection()

def init_db():
    """Initializes schema on both PostgreSQL and SQLite."""
    use_pg = is_postgres()
    print(f"[DB ADAPTER] Initializing database (Mode: {'PostgreSQL' if use_pg else 'SQLite'})...")

    with get_db() as db:
        pk_auto = "SERIAL PRIMARY KEY" if use_pg else "INTEGER PRIMARY KEY AUTOINCREMENT"
        text_type = "TEXT"
        int_type = "INTEGER"
        real_type = "REAL"
        bool_type = "BOOLEAN" if use_pg else "INTEGER"

        # 1. Users table
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS users (
                user_id {pk_auto},
                username {text_type} NOT NULL UNIQUE,
                password_hash {text_type} NOT NULL,
                plain_password {text_type} DEFAULT NULL,
                full_name {text_type} NOT NULL,
                role {text_type} NOT NULL CHECK (role IN ('Admin', 'Collector')),
                contact_no {text_type} DEFAULT NULL,
                assigned_zone {text_type} DEFAULT 'Purok 1'
            );
        ''')

        # 2. Puroks
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS puroks (
                purok_id {pk_auto},
                purok_name {text_type} NOT NULL UNIQUE,
                main_hose_sensor_mac {text_type} DEFAULT NULL
            );
        ''')

        # 3. Households
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS households (
                household_id {pk_auto},
                purok_id {int_type} NOT NULL,
                family_head_name {text_type} NOT NULL,
                total_family_members {int_type} DEFAULT 1,
                contact_no {text_type} DEFAULT NULL,
                registration_date {text_type} NOT NULL,
                password_hash {text_type} NOT NULL,
                plain_password {text_type} DEFAULT NULL,
                current_leak_status {text_type} DEFAULT 'normal',
                flow_rate {real_type} DEFAULT 0.0,
                leak_detected_at {text_type} DEFAULT NULL,
                CONSTRAINT fk_households_puroks 
                    FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                    ON DELETE RESTRICT ON UPDATE CASCADE
            );
        ''')

        # 4. Water Meters
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS water_meters (
                meter_id {pk_auto},
                household_id {int_type} NOT NULL,
                serial_number {text_type} NOT NULL UNIQUE,
                last_reading {real_type} DEFAULT 0.00,
                status {text_type} NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Broken', 'Disconnected')),
                CONSTRAINT fk_water_meters_households 
                    FOREIGN KEY (household_id) REFERENCES households (household_id) 
                    ON DELETE CASCADE ON UPDATE CASCADE
            );
        ''')

        # 5. Billing Records
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS billing_records (
                bill_id {pk_auto},
                meter_id {int_type} NOT NULL,
                previous_reading {real_type} NOT NULL,
                present_reading {real_type} NOT NULL,
                consumption_m3 {real_type} NOT NULL,
                total_amount {real_type} NOT NULL,
                payment_status {text_type} NOT NULL DEFAULT 'Unpaid' CHECK (payment_status IN ('Paid', 'Unpaid')),
                payment_date {text_type} DEFAULT NULL,
                collected_by {int_type} DEFAULT NULL,
                is_synced {int_type} NOT NULL DEFAULT 1 CHECK (is_synced IN (0, 1)),
                CONSTRAINT fk_billing_records_meters 
                    FOREIGN KEY (meter_id) REFERENCES water_meters (meter_id) 
                    ON DELETE RESTRICT ON UPDATE CASCADE,
                CONSTRAINT fk_billing_records_users 
                    FOREIGN KEY (collected_by) REFERENCES users (user_id) 
                    ON DELETE SET NULL ON UPDATE CASCADE
            );
        ''')

        # 6. Reservoir Quality Readings
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS reservoir_quality_readings (
                reading_id {pk_auto},
                water_level_percentage {int_type} NOT NULL CHECK (water_level_percentage BETWEEN 0 AND 100),
                turbidity_ntu {real_type} NOT NULL,
                ph_level {real_type} DEFAULT 7.20,
                tds_ppm {int_type} NOT NULL,
                recorded_at {text_type} DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        # 7. Flow Readings
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS flow_readings (
                flow_id {pk_auto},
                purok_id {int_type} NOT NULL,
                flow_rate_lpm {real_type} NOT NULL,
                recorded_at {text_type} DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_flow_readings_puroks 
                    FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                    ON DELETE CASCADE ON UPDATE CASCADE
            );
        ''')

        # 8. Announcements
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS announcements (
                id {pk_auto},
                message {text_type} NOT NULL,
                author {text_type} NOT NULL,
                timestamp {text_type} DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        # 9. Maintenance Logs
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS maintenance_logs (
                task_id {pk_auto},
                house_id {text_type} NOT NULL,
                worker_id {text_type} NOT NULL,
                purok {text_type} NOT NULL,
                description {text_type} NOT NULL,
                status_resolved {bool_type} NOT NULL DEFAULT 1,
                date {text_type} DEFAULT CURRENT_TIMESTAMP,
                photo_base64 {text_type} DEFAULT NULL
            );
        ''')

        # 10. Payment Collections (Permanent store for synchronized collections with idempotent local transaction_id)
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS payment_collections (
                collection_id {pk_auto},
                transaction_id {text_type} NOT NULL UNIQUE,
                bill_id {int_type} DEFAULT NULL,
                household_id {int_type} NOT NULL,
                amount_collected {real_type} NOT NULL,
                collection_date {text_type} NOT NULL,
                collected_by {text_type} NOT NULL,
                payment_method {text_type} DEFAULT 'Cash',
                synced_at {text_type} DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        # 11. System / Payment Settings (Dynamic Admin-configurable settings)
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS payment_settings (
                setting_key {text_type} PRIMARY KEY,
                setting_value {text_type} NOT NULL,
                updated_at {text_type} DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        # 12. Resident Reports (Service & leak reports filed by residents)
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS resident_reports (
                report_id {pk_auto},
                household_id {text_type} NOT NULL,
                report_type {text_type} NOT NULL,
                description {text_type} NOT NULL,
                status {text_type} NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Investigating', 'Resolved')),
                created_at {text_type} DEFAULT CURRENT_TIMESTAMP,
                resolved_at {text_type} DEFAULT NULL
            );
        ''')

        # Seed Admin User if missing
        default_pw_hash = generate_password_hash(os.environ.get('DEFAULT_PASSWORD', '[REDACTED]'))
        db.execute("SELECT COUNT(*) AS cnt FROM users WHERE username = 'admin';")
        res = db.fetchone()
        count = res['cnt'] if res and 'cnt' in res else (list(res.values())[0] if res else 0)
        if count == 0:
            db.execute('''
                INSERT INTO users (username, password_hash, plain_password, full_name, role, contact_no, assigned_zone)
                VALUES ('admin', ?, '[REDACTED]', 'Barangay Admin', 'Admin', '09171234567', 'Purok 1');
            ''', (default_pw_hash,))

        # Seed Puroks
        db.execute("SELECT COUNT(*) AS cnt FROM puroks;")
        res = db.fetchone()
        count = res['cnt'] if res and 'cnt' in res else (list(res.values())[0] if res else 0)
        if count == 0:
            puroks_data = [
                ('Purok 1', '00:1A:2B:3C:4D:5E'), ('Purok 2', '00:1A:2B:3C:4D:5F'),
                ('Purok 3', '00:1A:2B:3C:4D:60'), ('Purok 4', '00:1A:2B:3C:4D:61'),
                ('Purok 5', '00:1A:2B:3C:4D:62'), ('Purok 6', '00:1A:2B:3C:4D:63'),
                ('Purok 7', '00:1A:2B:3C:4D:64'), ('Purok 8', '00:1A:2B:3C:4D:65')
            ]
            for p_name, p_mac in puroks_data:
                db.execute("INSERT INTO puroks (purok_name, main_hose_sensor_mac) VALUES (?, ?);", (p_name, p_mac))

        # Seed Initial Telemetry if empty
        db.execute("SELECT COUNT(*) AS cnt FROM reservoir_quality_readings;")
        res = db.fetchone()
        count = res['cnt'] if res and 'cnt' in res else (list(res.values())[0] if res else 0)
        if count == 0:
            db.execute('''
                INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, ph_level, tds_ppm, recorded_at)
                VALUES (68, 6.20, 7.20, 150, CURRENT_TIMESTAMP);
            ''')

        # Seed Default Payment Configuration if empty
        default_settings = [
            ('payment_location', 'Barangay Tagpopongan Hall - Treasury Office'),
            ('payment_method', 'In-Person Payment at Barangay Hall / Field Worker Collection'),
            ('allow_worker_collection', 'true'),
            ('payment_instructions', 'Water bills are due on or before the 25th of each month. Payments can be settled in cash at the Barangay Hall Treasury Window or directly with your authorized Purok Field Collector during visits.'),
            ('operating_hours', 'Monday - Friday, 8:00 AM - 5:00 PM'),
            ('emergency_contact', '0917-123-4567 / (082) 555-WATER')
        ]
        for key, val in default_settings:
            db.execute("SELECT COUNT(*) AS cnt FROM payment_settings WHERE setting_key = ?;", (key,))
            res = db.fetchone()
            c = res['cnt'] if res and 'cnt' in res else (list(res.values())[0] if res else 0)
            if c == 0:
                db.execute("INSERT INTO payment_settings (setting_key, setting_value) VALUES (?, ?);", (key, val))

        print("[DB ADAPTER] Database schema and initial seeds ready.")
