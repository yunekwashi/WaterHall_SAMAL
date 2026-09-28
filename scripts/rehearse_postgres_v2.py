"""Opt-in synthetic PostgreSQL rehearsal; never reads .env or an inherited DB URL.

Requires an independently confirmed NEW Neon project, a private URL file outside
this repository, and matching host/database/role supplied by the operator. No
production cloning, deployment, application traffic, or automatic cleanup occurs.
--self-check validates local preparation only and never opens a database.
"""
import argparse
import ast
import copy
from decimal import Decimal, ROUND_HALF_UP
import hashlib
import importlib
import json
import os
from pathlib import Path
import re
import secrets
import subprocess
import sys
import tempfile
from urllib.parse import parse_qsl, quote, urlencode, urlsplit, urlunsplit
import uuid

ROOT = Path(__file__).resolve().parents[1]
V1_COMMIT = '698261e5d0429fa8ab3bb8ae5d89f226b8da44f9'
NEW_TABLES = {'resident_contact_claims', 'login_attempts', 'billing_configuration'}
STAMP = '2026-01-15 12:00:00'
TABLE_ORDER = [
    'users', 'puroks', 'households', 'water_meters', 'billing_records',
    'reservoir_quality_readings', 'flow_readings', 'announcements',
    'maintenance_logs', 'payment_collections', 'payment_settings',
    'resident_reports', 'push_subscriptions', 'password_resets',
    'sync_operations', 'push_outbox', 'schema_migrations',
]


class RehearsalError(Exception):
    """Messages contain only fixed, non-sensitive diagnostics."""


def require(condition, message):
    if not condition:
        raise RehearsalError(message)


def clean_environment():
    keep = {'SYSTEMROOT', 'WINDIR', 'PATH', 'PATHEXT', 'COMSPEC', 'TEMP', 'TMP',
            'USERPROFILE', 'APPDATA', 'LOCALAPPDATA'}
    env = {k: v for k, v in os.environ.items() if k.upper() in keep}
    env.update(PYTHON_DOTENV_DISABLED='1', PYTHONDONTWRITEBYTECODE='1',
               APP_ENV='production', SECRET_KEY=secrets.token_urlsafe(48),
               JWT_SECRET_KEY=secrets.token_urlsafe(48),
               IOT_DEVICE_SECRET=secrets.token_urlsafe(48),
               RATELIMIT_STORAGE_URI='redis://127.0.0.1:1/0',
               ALLOWED_ORIGINS='https://rehearsal.example.invalid',
               PGOPTIONS='-c lock_timeout=5s -c statement_timeout=120s '
                         '-c idle_in_transaction_session_timeout=60s')
    return env


def v1_source():
    result = subprocess.run(['git', 'show', V1_COMMIT + ':backend/db_adapter.py'],
                            cwd=ROOT, capture_output=True, check=False)
    require(result.returncode == 0, 'Historical version-1 source is unavailable.')
    source = result.stdout.decode('utf-8')
    ast.parse(source)
    require(all(name not in source for name in NEW_TABLES), 'Invalid version-1 source.')
    require('billing_snapshot' not in source and 'account_status' not in source,
            'Version-1 source already contains version-2 columns.')
    require('VALUES (1) ON CONFLICT' in source, 'Version-1 marker is missing.')
    return source


def checked_url(raw, host, database, role):
    import certifi
    from psycopg2.extensions import parse_dsn
    try:
        parts = urlsplit(raw)
        parsed = parse_dsn(raw)
    except Exception:
        raise RehearsalError('Invalid rehearsal connection input.') from None
    allowed = {'host', 'port', 'dbname', 'user', 'password', 'sslmode',
               'sslrootcert', 'channel_binding', 'connect_timeout', 'application_name'}
    require(parts.scheme in ('postgres', 'postgresql'), 'PostgreSQL URL required.')
    require(not parts.fragment and set(parsed) <= allowed, 'Unsupported connection options.')
    require(bool(re.fullmatch(r'ep-[a-z0-9-]+\.[a-z0-9.-]+\.neon\.tech', host))
            and '-pooler' not in host, 'Approved direct Neon hostname required.')
    require(parsed.get('host') == host and parsed.get('dbname') == database
            and parsed.get('user') == role, 'Approved rehearsal identity mismatch.')
    require(parsed.get('port', '5432') == '5432', 'Unexpected PostgreSQL port.')
    require(bool(parsed.get('password')), 'Dedicated rehearsal credentials required.')
    query = dict(parse_qsl(parts.query))
    query.update(sslmode='verify-full', sslrootcert=certifi.where(),
                 channel_binding='require', connect_timeout='10',
                 application_name='waterhall-synthetic-v2-rehearsal')
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query, quote_via=quote), ''))


def read_target_file(path):
    """Accept a bare URL or Neon's unpooled assignment without dotenv expansion."""
    raw = path.read_text(encoding='utf-8-sig').strip()
    assignment = re.fullmatch(r'DATABASE_URL_UNPOOLED\s*=\s*(.+)', raw)
    if assignment:
        raw = assignment[1].strip()
        if len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in ('\"', "'"):
            raw = raw[1:-1]
    require(raw.startswith(('postgresql://', 'postgres://')) and '\n' not in raw and '\r' not in raw,
            'Private target file must contain one URL or DATABASE_URL_UNPOOLED assignment.')
    return raw


def scoped_url(base, schema):
    require(bool(re.fullmatch(r'wh_rehearsal_[a-f0-9]{12}_[a-z]+', schema)),
            'Invalid isolated schema name.')
    parts = urlsplit(base)
    query = dict(parse_qsl(parts.query))
    query['options'] = ('-c search_path=' + schema + ' -c lock_timeout=5s '
                        '-c statement_timeout=120s -c idle_in_transaction_session_timeout=60s')
    # libpq URIs require percent-encoded spaces, not HTML-form '+' encoding.
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query, quote_via=quote), ''))


def encode(value):
    if isinstance(value, Decimal):
        return {'decimal': str(value)}
    raise TypeError('Unsupported checkpoint type')


def decode(value):
    return Decimal(value['decimal']) if set(value) == {'decimal'} else value


def serialized(value):
    return json.dumps(value, default=encode, sort_keys=True, separators=(',', ':'))


def fixture_rows():
    from werkzeug.security import generate_password_hash
    credential_hash = generate_password_hash(secrets.token_urlsafe(32))
    rows = {name: [] for name in TABLE_ORDER}
    for number, role in [(201, 'Admin'), (202, 'Collector')]:
        rows['users'].append(dict(user_id=number, username=f'synthetic-{number}',
                                 password_hash=credential_hash, full_name=f'Synthetic Staff {number}', role=role))
    rows['puroks'] = [dict(purok_id=301, purok_name='Synthetic Purok')]
    contacts = ['09170000001', '+63 917 000 0001', 'invalid-synthetic', None]
    amounts = ['170.00', '225.25', '0.00', '999999999999.99']
    for offset in range(4):
        hh, meter, bill = 401 + offset, 501 + offset, 601 + offset
        rows['households'].append(dict(household_id=hh, purok_id=301,
            family_head_name=f'Synthetic Resident {offset}', contact_no=contacts[offset],
            registration_date=STAMP, password_hash=credential_hash))
        rows['water_meters'].append(dict(meter_id=meter, household_id=hh,
            serial_number=f'SYNTHETIC-METER-{meter}', last_reading=12.5))
        rows['billing_records'].append(dict(bill_id=bill, meter_id=meter,
            previous_reading=10, present_reading=12.5, consumption_m3=2.5,
            total_amount=Decimal(amounts[offset]), payment_status='Paid' if offset < 2 else 'Unpaid',
            collected_by=202 if offset < 2 else None, payment_date=STAMP if offset < 2 else None,
            billed_at=STAMP, billed_by=202))
        if offset < 2:
            rows['payment_collections'].append(dict(collection_id=701 + offset,
                transaction_id=f'synthetic-collection-{offset}', bill_id=bill, household_id=hh,
                amount_collected=Decimal(amounts[offset]), collection_date=STAMP,
                collected_by='synthetic-202', synced_at=STAMP, request_hash='synthetic-fingerprint'))
    rows['reservoir_quality_readings'] = [dict(reading_id=801, water_level_percentage=75,
        turbidity_ntu=1.5, ph_level=7.25, tds_ppm=125, recorded_at=STAMP)]
    rows['flow_readings'] = [dict(flow_id=802, purok_id=301, flow_rate_lpm=2.5, recorded_at=STAMP)]
    rows['announcements'] = [dict(id=803, message='Synthetic announcement', author='synthetic-201', timestamp=STAMP)]
    rows['maintenance_logs'] = [dict(task_id=804, house_id='HH-401', worker_id='synthetic-202',
        purok='Synthetic Purok', description='Synthetic maintenance', status_resolved=0, date=STAMP)]
    rows['payment_settings'] = [dict(setting_key='synthetic-setting', setting_value='synthetic-value', updated_at=STAMP)]
    rows['resident_reports'] = [dict(report_id=805, household_id='HH-401', report_type='Leak',
        description='Synthetic report', created_at=STAMP)]
    rows['push_subscriptions'] = [dict(sub_id=806, household_id=401, username='HH-401', role='resident',
        endpoint='https://push.example.invalid/synthetic', p256dh='synthetic-non-key',
        auth=secrets.token_urlsafe(16), is_active=0, created_at=STAMP, updated_at=STAMP)]
    rows['password_resets'] = [dict(token_hash=hashlib.sha256(secrets.token_bytes(32)).hexdigest(),
        account_id='HH-401', kind='resident', expires_at=STAMP, used=1)]
    rows['sync_operations'] = [dict(operation_id='synthetic-completed-operation', actor='synthetic-202',
        request_hash='synthetic-fingerprint', response_json='{}', created_at=STAMP)]
    rows['push_outbox'] = [dict(id=807, payload='{}', target_audience='Everyone', status='sent', created_at=STAMP)]
    rows['schema_migrations'] = [dict(version=1, applied_at=STAMP)]
    return rows


class Rehearsal:
    def __init__(self, base, env, output, source):
        import psycopg2
        from psycopg2 import sql
        self.pg, self.sql = psycopg2, sql
        self.base, self.env, self.output, self.source = base, env, output, source
        self.prefix = 'wh_rehearsal_' + uuid.uuid4().hex[:12]
        self.adapter = importlib.import_module('backend.db_adapter')
        self.historical = {'__name__': 'waterhall_rehearsal_version_one'}
        exec(compile(source, '<verified-version-1-adapter>', 'exec'), self.historical)

    def connection(self, schema):
        return self.pg.connect(scoped_url(self.base, schema))

    def create_v1(self, suffix):
        schema = self.prefix + '_' + suffix
        connection = self.pg.connect(self.base)
        try:
            with connection, connection.cursor() as cur:
                cur.execute(self.sql.SQL('CREATE SCHEMA {}').format(self.sql.Identifier(schema)))
        finally:
            connection.close()
        self.historical['POSTGRES_URL'] = scoped_url(self.base, schema)
        self.historical['init_db']()
        return schema

    def insert_rows(self, schema, rows):
        connection = self.connection(schema)
        try:
            with connection, connection.cursor() as cur:
                for table in TABLE_ORDER:
                    # A newly created isolated v1 schema contains only this marker.
                    if table == 'schema_migrations':
                        cur.execute('DELETE FROM schema_migrations')
                    for row in rows[table]:
                        columns = list(row)
                        cur.execute(self.sql.SQL('INSERT INTO {} ({}) VALUES ({})').format(
                            self.sql.Identifier(table), self.sql.SQL(', ').join(map(self.sql.Identifier, columns)),
                            self.sql.SQL(', ').join(self.sql.Placeholder() for _ in columns)),
                            [row[column] for column in columns])
                # Explicit synthetic IDs must leave realistic next-ID sequence state.
                cur.execute("SELECT table_name,column_name FROM information_schema.columns "
                            "WHERE table_schema=%s AND column_default LIKE 'nextval%%' "
                            "ORDER BY table_name,column_name", (schema,))
                for table, column in cur.fetchall():
                    cur.execute(self.sql.SQL('SELECT setval(pg_get_serial_sequence(%s,%s), '
                                'COALESCE(MAX({}),1),COUNT(*)>0) FROM {}').format(
                                    self.sql.Identifier(column), self.sql.Identifier(table)), (table, column))
        finally:
            connection.close()

    def snapshot(self, schema):
        connection = self.connection(schema)
        try:
            with connection, connection.cursor() as cur:
                cur.execute('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY')
                cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema=%s "
                            "AND table_type='BASE TABLE' ORDER BY table_name", (schema,))
                tables = [row[0] for row in cur.fetchall()]
                state = {'tables': {}, 'constraints': [], 'indexes': [], 'sequences': {}}
                for table in tables:
                    cur.execute('SELECT column_name, data_type, is_nullable, column_default, '
                                'numeric_precision, numeric_scale FROM information_schema.columns '
                                'WHERE table_schema=%s AND table_name=%s ORDER BY ordinal_position', (schema, table))
                    definitions = [list(row) for row in cur.fetchall()]
                    cur.execute(self.sql.SQL('SELECT * FROM {}').format(self.sql.Identifier(table)))
                    records = [dict(zip([d[0] for d in definitions], row)) for row in cur.fetchall()]
                    state['tables'][table] = {'columns': definitions, 'rows': sorted(records, key=serialized)}
                cur.execute('SELECT t.relname, c.conname, c.contype, pg_get_constraintdef(c.oid), '
                            'c.convalidated FROM pg_constraint c JOIN pg_class t ON t.oid=c.conrelid '
                            'JOIN pg_namespace n ON n.oid=t.relnamespace WHERE n.nspname=%s '
                            'ORDER BY t.relname, c.conname', (schema,))
                state['constraints'] = [list(row) for row in cur.fetchall()]
                cur.execute('SELECT tablename, indexname, indexdef FROM pg_indexes '
                            'WHERE schemaname=%s ORDER BY tablename,indexname', (schema,))
                state['indexes'] = [list(row) for row in cur.fetchall()]
                cur.execute('SELECT sequencename, start_value, min_value, max_value, increment_by, '
                            'cycle, cache_size FROM pg_sequences WHERE schemaname=%s ORDER BY sequencename', (schema,))
                for name, *definition in cur.fetchall():
                    cur.execute(self.sql.SQL('SELECT last_value,is_called FROM {}').format(self.sql.Identifier(name)))
                    state['sequences'][name] = {'definition': definition, 'state': list(cur.fetchone())}
                # Normalize only schema-qualified metadata, never record values.
                for table in state['tables'].values():
                    table['columns'] = [[v.replace(schema, '<schema>') if isinstance(v, str) else v for v in r]
                                        for r in table['columns']]
                for key in ('constraints', 'indexes'):
                    state[key] = [[v.replace(schema, '<schema>') if isinstance(v, str) else v for v in r]
                                  for r in state[key]]
                return state
        finally:
            connection.close()

    def save(self, filename, state):
        path = self.output / filename
        path.write_text(serialized(state), encoding='utf-8')
        return hashlib.sha256(path.read_bytes()).hexdigest()

    def cli_migrate(self, schema):
        env = dict(self.env, DATABASE_URL=scoped_url(self.base, schema))
        result = subprocess.run([sys.executable, '-B', '-m', 'backend.manage', 'migrate'],
                                cwd=ROOT, env=env, capture_output=True, text=True, timeout=300)
        require(result.returncode == 0, 'Migration CLI failed; raw output suppressed.')

    def verify_v2(self, before, after):
        require(set(after['tables']) - set(before['tables']) == NEW_TABLES, 'Unexpected added tables.')
        require(set(before['tables']) <= set(after['tables']), 'Existing table missing.')
        additions = {'households': 'account_status', 'billing_records': 'billing_snapshot'}
        for table, prior in before['tables'].items():
            current = after['tables'][table]
            expected_columns = prior['columns'] + ({
                'households': [['account_status', 'text', 'NO', "'approved'::text", None, None]],
                'billing_records': [['billing_snapshot', 'text', 'YES', None, None, None]],
            }.get(table, []))
            require(current['columns'] == expected_columns, 'Unexpected existing column change.')
            if table == 'schema_migrations':
                require(sorted(row['version'] for row in current['rows']) == [1, 2], 'Invalid migration markers.')
                require(next(r for r in current['rows'] if r['version'] == 1) == prior['rows'][0],
                        'Version-1 marker changed.')
                continue
            old_columns = [d[0] for d in prior['columns']]
            projected = [{key: row[key] for key in old_columns} for row in current['rows']]
            require(sorted(projected, key=serialized) == prior['rows'], 'Existing record or ID changed.')
            if table in additions:
                expected = 'approved' if table == 'households' else None
                require(all(row[additions[table]] == expected for row in current['rows']), 'Incorrect new field values.')
        require(before['sequences'] == after['sequences'], 'Existing sequences changed.')
        require(all(row in after['constraints'] for row in before['constraints']), 'Existing constraint changed.')
        require(all(row in after['indexes'] for row in before['indexes']), 'Existing index changed.')
        expected_new_columns = {
            'resident_contact_claims': [('contact', 'text', 'NO'), ('household_id', 'integer', 'YES')],
            'login_attempts': [('identifier_digest', 'text', 'NO'), ('failures', 'integer', 'NO'),
                               ('locked_until', 'double precision', 'NO'), ('updated_at', 'double precision', 'NO')],
            'billing_configuration': [('config_id', 'integer', 'NO'), ('rates_json', 'text', 'NO'),
                                      ('version', 'integer', 'NO'), ('confirmed', 'integer', 'NO')],
        }
        for table, definition in expected_new_columns.items():
            require([tuple(row[:3]) for row in after['tables'][table]['columns']] == definition,
                    'New table definition mismatch.')
        added_constraints = [row for row in after['constraints'] if row not in before['constraints']]
        require(sorted((r[0], r[2]) for r in added_constraints if r[2] != 'n') == sorted([
            ('households', 'c'), ('resident_contact_claims', 'p'), ('resident_contact_claims', 'f'),
            ('login_attempts', 'p'), ('billing_configuration', 'p'), ('billing_configuration', 'c')]),
            'Unexpected new constraints.')
        # PostgreSQL 18 represents NOT NULL in pg_constraint as well as columns.
        not_null = {(row[0], row[3]) for row in added_constraints if row[2] == 'n'}
        expected_not_null = {('households', 'NOT NULL account_status')}
        expected_not_null.update((table, 'NOT NULL ' + column)
            for table, definitions in expected_new_columns.items()
            for column, _, nullable in definitions if nullable == 'NO')
        if any(row[2] == 'n' for row in before['constraints']):
            require(not_null == expected_not_null, 'Unexpected new NOT NULL constraints.')
        else:
            require(not not_null or not_null == expected_not_null, 'Unexpected NOT NULL metadata.')
        require(all(row[4] for row in added_constraints), 'New constraint not validated.')
        require(any('ON DELETE SET NULL' in row[3] for row in added_constraints
                    if row[0] == 'resident_contact_claims' and row[2] == 'f'), 'Contact deletion rule mismatch.')
        claims = after['tables']['resident_contact_claims']['rows']
        require(claims == [{'contact': '09170000001', 'household_id': 401}], 'Contact reservation mismatch.')
        require(after['tables']['login_attempts']['rows'] == [], 'Unexpected login failures seeded.')
        config = after['tables']['billing_configuration']['rows']
        require(len(config) == 1 and config[0]['config_id'] == 1 and config[0]['version'] == 1
                and config[0]['confirmed'] == 0, 'Unexpected initial billing configuration.')
        require(json.loads(config[0]['rates_json']) == {
            'base_rate': '120.00', 'included_m3': '10.000', 'environmental_fee': '50.00', 'excess_rate': '15.00'},
            'Unexpected sample tariff.')

    def failure_rollback(self, schema):
        before = self.snapshot(schema)
        original = self.adapter.DBConnection.execute
        def fail_at_final_marker(db, query, params=None):
            if 'INSERT INTO schema_migrations (version) VALUES (2)' in query:
                return original(db, 'SELECT 1 / 0')
            return original(db, query, params)
        self.adapter.POSTGRES_URL = scoped_url(self.base, schema)
        self.adapter.DBConnection.execute = fail_at_final_marker
        try:
            try:
                self.adapter.init_db()
            except self.pg.errors.DivisionByZero:
                pass
            else:
                raise RehearsalError('Failure injection did not execute.')
        finally:
            self.adapter.DBConnection.execute = original
        require(self.snapshot(schema) == before, 'Failed migration did not fully roll back.')

    def monetary_case(self, suffix, rows, sql_type):
        schema = self.create_v1(suffix)
        connection = self.connection(schema)
        try:
            with connection, connection.cursor() as cur:
                for table, column in [('billing_records', 'total_amount'), ('payment_collections', 'amount_collected')]:
                    cur.execute(self.sql.SQL('ALTER TABLE {} ALTER COLUMN {} TYPE ' + sql_type).format(
                        self.sql.Identifier(table), self.sql.Identifier(column)))
                for table, column in [('maintenance_logs', 'status_resolved'), ('push_subscriptions', 'is_active')]:
                    cur.execute(self.sql.SQL('ALTER TABLE {} ALTER COLUMN {} DROP DEFAULT').format(
                        self.sql.Identifier(table), self.sql.Identifier(column)))
                    cur.execute(self.sql.SQL('ALTER TABLE {} ALTER COLUMN {} TYPE BOOLEAN USING ({} <> 0)').format(
                        self.sql.Identifier(table), self.sql.Identifier(column), self.sql.Identifier(column)))
                    cur.execute(self.sql.SQL('ALTER TABLE {} ALTER COLUMN {} SET DEFAULT TRUE').format(
                        self.sql.Identifier(table), self.sql.Identifier(column)))
                cur.execute('ALTER TABLE reservoir_quality_readings ALTER COLUMN ph_level SET DEFAULT 7.0')
        finally:
            connection.close()
        variant = copy.deepcopy(rows)
        for row, amount in zip(variant['billing_records'], ['1.005', '2.004', '-1.005', '9999.999']):
            row['total_amount'] = Decimal(amount)
        for row, amount in zip(variant['payment_collections'], ['12.345', '-1.005']):
            row['amount_collected'] = Decimal(amount)
        variant['maintenance_logs'][0]['status_resolved'] = False
        variant['push_subscriptions'][0]['is_active'] = False
        self.insert_rows(schema, variant)
        before = self.snapshot(schema)
        self.save(suffix + '-before.json', before)
        # Fail late, after the type conversions too, and require exact restoration.
        self.failure_rollback(schema)
        self.cli_migrate(schema)
        after = self.snapshot(schema)
        expected = copy.deepcopy(before)
        changes = []
        for table, column in [('billing_records', 'total_amount'), ('payment_collections', 'amount_collected')]:
            for row in expected['tables'][table]['rows']:
                original = row[column]
                row[column] = Decimal(str(original)).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)
                changes.append({'table': table, 'before': str(original), 'after': str(row[column])})
        for table, column in [('maintenance_logs', 'status_resolved'), ('push_subscriptions', 'is_active')]:
            for row in expected['tables'][table]['rows']:
                row[column] = int(row[column])
        # Expected existing column definitions equal the genuine v1 definitions.
        for table in expected['tables']:
            expected['tables'][table]['columns'] = self.baseline['tables'][table]['columns']
        expected['indexes'] = self.baseline['indexes']
        expected['constraints'] = self.baseline['constraints']
        self.verify_v2(expected, after)
        self.cli_migrate(schema)
        require(self.snapshot(schema) == after, 'Legacy conversion rerun changed data/schema.')
        self.save(suffix + '-after.json', after)
        return {'result': 'PASS', 'rollback': 'PASS', 'rerun': 'PASS', 'rounding': changes}

    def run(self):
        rows = fixture_rows()
        primary = self.create_v1('primary')
        self.insert_rows(primary, rows)
        self.baseline = self.snapshot(primary)
        require(set(self.baseline['tables']) == set(TABLE_ORDER), 'Unexpected version-1 tables.')
        checkpoint_hash = self.save('baseline-checkpoint.json', self.baseline)
        (self.output / 'version-1-adapter.py').write_text(self.source, encoding='utf-8')
        # Restore the checkpoint from disk into another new schema and compare all state.
        restored = json.loads((self.output / 'baseline-checkpoint.json').read_text(encoding='utf-8'), object_hook=decode)
        require(hashlib.sha256((self.output / 'baseline-checkpoint.json').read_bytes()).hexdigest() == checkpoint_hash,
                'Checkpoint integrity check failed.')
        recovery = self.create_v1('recovery')
        self.insert_rows(recovery, {table: restored['tables'][table]['rows'] for table in TABLE_ORDER})
        require(self.snapshot(recovery) == restored, 'Checkpoint restore comparison failed.')
        report = {'baseline_commit': V1_COMMIT, 'checkpoint_sha256': checkpoint_hash,
                  'checkpoint_restore': 'PASS', 'baseline_counts': {
                      table: len(value['rows']) for table, value in self.baseline['tables'].items()}}
        self.save('progress.json', report)
        self.failure_rollback(primary)
        report['late_failure_rollback'] = 'PASS'
        self.cli_migrate(primary)
        first = self.snapshot(primary)
        self.verify_v2(self.baseline, first)
        report['first_migration'] = report['data_preservation'] = 'PASS'
        report['schema_changes'] = {
            'added_tables': sorted(NEW_TABLES),
            'added_columns': ['households.account_status', 'billing_records.billing_snapshot'],
            'added_constraints': [r for r in first['constraints'] if r not in self.baseline['constraints']],
            'existing_constraints_preserved': len(self.baseline['constraints']),
            'existing_sequences_preserved': len(self.baseline['sequences']),
        }
        self.save('first-migration.json', first)
        self.cli_migrate(primary)
        require(self.snapshot(primary) == first, 'Second migration changed schema/data.')
        report['second_migration_idempotency'] = 'PASS'
        self.save('progress.json', report)
        report['numeric_legacy'] = self.monetary_case('numeric', rows, 'NUMERIC(18,4)')
        report['float_legacy'] = self.monetary_case('floating', rows, 'DOUBLE PRECISION')
        self.save('progress.json', report)
        env = dict(self.env, TEST_DATABASE_URL=self.base)
        env.pop('DATABASE_URL', None)
        result = subprocess.run([sys.executable, '-B', '-m', 'pytest', '-q', '--tb=no',
            '-p', 'no:cacheprovider', 'tests/test_finalization.py', 'tests/test_operations.py',
            'tests/test_security.py', 'tests/test_registration.py'], cwd=ROOT, env=env,
            capture_output=True, text=True, timeout=1200)
        counts = re.findall(r'\b\d+ (?:passed|failed|error|errors|skipped|deselected)\b', result.stdout)
        report['postgres_tests'] = {'exit_code': result.returncode, 'counts': counts}
        require(self.snapshot(primary) == first, 'Backend tests changed the primary rehearsal data.')
        require(self.snapshot(recovery) == self.baseline, 'Recovery checkpoint changed.')
        report['final_comparison'] = 'PASS'
        self.save('result.json', report)
        require(result.returncode == 0, 'PostgreSQL backend tests failed; see sanitized result counts.')
        return report


def self_check():
    from unittest.mock import patch
    from psycopg2.extensions import parse_dsn
    import certifi
    source = v1_source()
    require(sys.version_info[:3] == (3, 12, 10), 'Python 3.12.10 is required.')
    rows = fixture_rows()
    require(set(rows) == set(TABLE_ORDER) and len(rows['households']) == 4, 'Fixture preparation failed.')
    require(json.loads(serialized(rows), object_hook=decode) == rows, 'Checkpoint encoding failed.')
    require('DATABASE_URL' not in clean_environment() and 'POSTGRES_URL' not in clean_environment()
            and 'TEST_DATABASE_URL' not in clean_environment(), 'Inherited URL isolation failed.')
    host = 'ep-synthetic-only.us-east-2.aws.neon.tech'
    raw = 'postgresql://synthetic:' + secrets.token_urlsafe(32) + '@' + host + '/synthetic'
    with patch('psycopg2.connect', side_effect=AssertionError('No network in self-check')):
        for contents in (raw, 'DATABASE_URL_UNPOOLED=' + raw,
                         'DATABASE_URL_UNPOOLED="' + raw + '"',
                         "DATABASE_URL_UNPOOLED='" + raw + "'"):
            with patch.object(Path, 'read_text', return_value=contents):
                require(read_target_file(Path('synthetic-input')) == raw, 'Private target reader self-check failed.')
        safe = checked_url(raw + '?sslmode=disable&channel_binding=disable', host, 'synthetic', 'synthetic')
        parsed = parse_dsn(safe)
        require(parsed['sslmode'] == 'verify-full' and parsed['channel_binding'] == 'require'
                and parsed['sslrootcert'] == certifi.where(), 'TLS enforcement self-check failed.')
        schema = 'wh_rehearsal_000000000000_selfcheck'
        options = parse_dsn(scoped_url(safe, schema))['options']
        require(options.startswith('-c search_path=' + schema + ' ')
                and '+' not in options, 'libpq schema-option encoding self-check failed.')
        for invalid, expected_host, database, role in [
            (raw, 'ep-different.us-east-2.aws.neon.tech', 'synthetic', 'synthetic'),
            (raw, host, 'different', 'synthetic'),
            (raw, host, 'synthetic', 'different'),
            (raw + '?hostaddr=127.0.0.1', host, 'synthetic', 'synthetic'),
            (raw + '?options=-csearch_path=public', host, 'synthetic', 'synthetic'),
            (raw.replace('ep-synthetic-only.', 'ep-synthetic-only-pooler.'),
             host.replace('ep-synthetic-only.', 'ep-synthetic-only-pooler.'), 'synthetic', 'synthetic'),
            ('invalid', host, 'synthetic', 'synthetic'),
        ]:
            try:
                checked_url(invalid, expected_host, database, role)
            except RehearsalError:
                pass
            else:
                raise RehearsalError('Invalid target was accepted by the guard.')
    require(all(row['password_hash'] for row in rows['users']), 'Synthetic credential hashing failed.')
    print('Preparation self-check: PASS; version-1 source and synthetic fixture validated; no database opened.')
    print('Guard checks: 7 invalid targets rejected; weaker TLS overridden; checkpoint round trip passed.')
    print('Version-1 source SHA-256:', hashlib.sha256(source.encode()).hexdigest())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--self-check', action='store_true')
    parser.add_argument('--target-file', type=Path)
    parser.add_argument('--expected-host')
    parser.add_argument('--expected-database')
    parser.add_argument('--expected-role')
    parser.add_argument('--confirm-new-empty-project', action='store_true')
    args = parser.parse_args()
    if args.self_check:
        self_check()
        return
    require(sys.version_info[:3] == (3, 12, 10), 'Python 3.12.10 is required.')
    require(args.confirm_new_empty_project and all([args.target_file, args.expected_host,
        args.expected_database, args.expected_role]), 'Explicit disposable-target configuration is required.')
    require(not args.target_file.resolve().is_relative_to(ROOT), 'Credential file must be outside the repository.')
    raw = read_target_file(args.target_file)
    base = checked_url(raw, args.expected_host, args.expected_database, args.expected_role)
    source = v1_source()
    env = clean_environment()
    env['DATABASE_URL'] = base
    os.environ.clear()
    os.environ.update(env)
    sys.path.insert(0, str(ROOT))
    import psycopg2
    connection = psycopg2.connect(base)
    try:
        with connection, connection.cursor() as cur:
            cur.execute('SET TRANSACTION READ ONLY')
            require(connection.info.ssl_in_use, 'TLS is required.')
            cur.execute('SELECT current_database(), current_user, version()')
            database, role, version = cur.fetchone()
            require((database, role) == (args.expected_database, args.expected_role), 'Database identity mismatch.')
            cur.execute("SELECT COUNT(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace "
                        "WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema' "
                        "AND c.relkind IN ('r','p','v','m','f','S')")
            require(cur.fetchone()[0] == 0, 'Target is not empty; stop without modifying it.')
    finally:
        connection.close()
    output = Path(tempfile.mkdtemp(prefix='waterhall-pg-rehearsal-'))
    print('Synthetic rehearsal artifacts:', output)
    (output / 'runtime.json').write_text(json.dumps({'postgresql_version': version,
        'python_version': sys.version.split()[0], 'synthetic_only': True}), encoding='utf-8')
    rehearsal = Rehearsal(base, env, output, source)
    report = rehearsal.run()
    report['postgresql_version'] = version
    rehearsal.save('result.json', report)
    print('PostgreSQL synthetic rehearsal: PASS. No production readiness claim is implied.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # Never print driver messages, DSNs, SQL parameters, test output, or tracebacks.
        message = str(error) if isinstance(error, RehearsalError) else 'Operation failed; private diagnostics suppressed.'
        print('STOP:', message)
        sys.exit(1)
