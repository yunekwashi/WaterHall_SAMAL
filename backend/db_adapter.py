"""Small, parameterized PostgreSQL / SQLite adapter with explicit migrations."""
import re
from decimal import Decimal
import sqlite3
from pathlib import Path
from backend import config

DB_FILE = config.DATABASE_PATH
POSTGRES_URL = config.DATABASE_URL


def is_postgres():
    return bool(POSTGRES_URL)


class DBConnection:
    def __init__(self):
        self.is_pg = is_postgres()
        self._lastrowid = None
        if self.is_pg:
            import psycopg2
            from psycopg2.extras import RealDictCursor
            from urllib.parse import urlparse, parse_qs
            if config.PRODUCTION and parse_qs(urlparse(POSTGRES_URL).query).get('sslmode') != ['verify-full']:
                raise RuntimeError('Production DATABASE_URL must use sslmode=verify-full')
            self.conn = psycopg2.connect(POSTGRES_URL, connect_timeout=10)
            self.cursor_obj = self.conn.cursor(cursor_factory=RealDictCursor)
        else:
            if config.PRODUCTION:
                raise RuntimeError('SQLite is not allowed in production')
            Path(DB_FILE).parent.mkdir(parents=True, exist_ok=True)
            self.conn = sqlite3.connect(DB_FILE, timeout=15)
            self.conn.row_factory = sqlite3.Row
            self.cursor_obj = self.conn.cursor()
            self.cursor_obj.execute('PRAGMA foreign_keys = ON')

    def execute(self, query, params=None):
        self._lastrowid = None
        returning = False
        if self.is_pg:
            ids = {'users': 'user_id', 'puroks': 'purok_id', 'households': 'household_id',
                   'water_meters': 'meter_id', 'billing_records': 'bill_id',
                   'resident_reports': 'report_id', 'announcements': 'id',
                   'maintenance_logs': 'task_id', 'payment_collections': 'collection_id',
                   'push_subscriptions': 'sub_id', 'push_outbox': 'id'}
            match = re.match(r'\s*INSERT INTO (\w+)', query, re.I)
            if match and match[1].lower() in ids and 'RETURNING' not in query.upper():
                query = query.rstrip().rstrip(';') + ' RETURNING ' + ids[match[1].lower()]
                returning = True
            if params is not None:
                query = query.replace('%', '%%').replace('?', '%s')
        result = self.cursor_obj.execute(query, params) if params is not None else self.cursor_obj.execute(query)
        if returning:
            row = self.cursor_obj.fetchone()
            self._lastrowid = next(iter(row.values())) if row else None
        return result

    def executemany(self, query, params_list):
        for params in params_list:
            self.execute(query, params)

    def fetchone(self):
        row = self.cursor_obj.fetchone()
        return {k: float(v) if isinstance(v, Decimal) else v for k, v in dict(row).items()} if row is not None else None

    def fetchall(self):
        return [{k: float(v) if isinstance(v, Decimal) else v for k, v in dict(row).items()} for row in self.cursor_obj.fetchall()]

    @property
    def lastrowid(self):
        return self._lastrowid if self.is_pg else self.cursor_obj.lastrowid

    @property
    def rowcount(self):
        return self.cursor_obj.rowcount

    def commit(self):
        self.conn.commit()

    def rollback(self):
        self.conn.rollback()

    def close(self):
        self.cursor_obj.close()
        self.conn.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        try:
            if exc_type:
                self.rollback()
            else:
                self.commit()
        finally:
            self.close()


def get_db():
    return DBConnection()


def columns(db, table):
    if db.is_pg:
        db.execute('SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ?', (table,))
        return {r['column_name'] for r in db.fetchall()}
    db.execute(f'PRAGMA table_info({table})')
    return {r['name'] for r in db.fetchall()}


def init_db():
    """Explicit, repeatable non-destructive migration; never seeds users or telemetry."""
    use_pg = is_postgres()
    with get_db() as db:
        if use_pg:
            db.execute('SELECT pg_advisory_xact_lock(84210421)')
        else:
            db.execute('BEGIN IMMEDIATE')
        pk_auto = 'SERIAL PRIMARY KEY' if use_pg else 'INTEGER PRIMARY KEY AUTOINCREMENT'
        text_type, int_type, real_type, bool_type = 'TEXT', 'INTEGER', 'DOUBLE PRECISION' if use_pg else 'REAL', 'INTEGER'
        money_type = 'NUMERIC(14,2)' if use_pg else 'REAL'
        # 1. Users table
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS users (
                user_id {pk_auto},
                username {text_type} NOT NULL UNIQUE,
                password_hash {text_type} NOT NULL,
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
                total_amount {money_type} NOT NULL,
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
                ph_level {real_type} DEFAULT NULL,
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
                target_audience {text_type} NOT NULL DEFAULT 'Everyone',
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
                amount_collected {money_type} NOT NULL,
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

        # 13. Push Subscriptions (Web Push / VAPID for browser & PWA notifications)
        db.execute(f'''
            CREATE TABLE IF NOT EXISTS push_subscriptions (
                sub_id {pk_auto},
                household_id {int_type} DEFAULT NULL,
                username {text_type} NOT NULL,
                role {text_type} NOT NULL,
                endpoint {text_type} NOT NULL UNIQUE,
                p256dh {text_type} NOT NULL,
                auth {text_type} NOT NULL,
                is_active {bool_type} NOT NULL DEFAULT 1,
                created_at {text_type} DEFAULT CURRENT_TIMESTAMP,
                updated_at {text_type} DEFAULT CURRENT_TIMESTAMP
            );
        ''')
        db.execute("CREATE INDEX IF NOT EXISTS idx_push_sub_role ON push_subscriptions (role, is_active)")

        if use_pg:
            for table, field in [('maintenance_logs', 'status_resolved'), ('push_subscriptions', 'is_active')]:
                db.execute('SELECT data_type FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ? AND column_name = ?', (table, field))
                if db.fetchone()['data_type'] == 'boolean':
                    db.execute(f'ALTER TABLE {table} ALTER COLUMN {field} DROP DEFAULT')
                    db.execute(f'ALTER TABLE {table} ALTER COLUMN {field} TYPE INTEGER USING ({field}::int)')
                    db.execute(f'ALTER TABLE {table} ALTER COLUMN {field} SET DEFAULT 1')
            for table, field in [('billing_records', 'total_amount'), ('payment_collections', 'amount_collected')]:
                db.execute('SELECT data_type, numeric_precision, numeric_scale FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = ? AND column_name = ?', (table, field))
                column = db.fetchone()
                if (column['data_type'], column['numeric_precision'], column['numeric_scale']) != ('numeric', 14, 2):
                    db.execute(f'ALTER TABLE {table} ALTER COLUMN {field} TYPE NUMERIC(14,2) USING ROUND({field}::numeric, 2)')
            db.execute('ALTER TABLE reservoir_quality_readings ALTER COLUMN ph_level DROP DEFAULT')

        additions = {
            'billing_records': {'billed_at': 'TEXT', 'billed_by': 'INTEGER'},
            'announcements': {'target_audience': "TEXT NOT NULL DEFAULT 'Everyone'"},
            'resident_reports': {'photo_base64': 'TEXT'},
            'payment_collections': {'request_hash': 'TEXT'},
        }
        for table, fields in additions.items():
            existing = columns(db, table)
            for field, declaration in fields.items():
                if field not in existing:
                    db.execute(f'ALTER TABLE {table} ADD COLUMN {field} {declaration}')
        db.execute(f"""CREATE TABLE IF NOT EXISTS password_resets (
            token_hash TEXT PRIMARY KEY, account_id TEXT NOT NULL, kind TEXT NOT NULL,
            expires_at TEXT NOT NULL, used INTEGER NOT NULL DEFAULT 0)""")
        db.execute(f"""CREATE TABLE IF NOT EXISTS sync_operations (
            operation_id TEXT PRIMARY KEY, actor TEXT NOT NULL, request_hash TEXT NOT NULL,
            response_json TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)""")
        db.execute(f"""CREATE TABLE IF NOT EXISTS push_outbox (
            id {pk_auto}, payload TEXT NOT NULL, target_audience TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
            lease_until TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)""")
        db.execute('CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT DEFAULT CURRENT_TIMESTAMP)')
        db.execute('INSERT INTO schema_migrations (version) VALUES (1) ON CONFLICT (version) DO NOTHING')
