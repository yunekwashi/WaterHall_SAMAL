"""Explicit administration commands. Run from the repository root as a trusted operator."""
import argparse
import base64
import datetime
import getpass
import hashlib
import json
import secrets
import sqlite3

from werkzeug.security import generate_password_hash
from backend.db_adapter import get_db, init_db, columns, is_postgres


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    commands.add_parser('migrate')
    admin = commands.add_parser('create-admin')
    admin.add_argument('username')
    admin.add_argument('--name', required=True)
    recovery = commands.add_parser('issue-reset')
    recovery.add_argument('account')
    recovery.add_argument('--kind', choices=['staff', 'resident'], required=True)
    commands.add_parser('generate-vapid')
    commands.add_parser('drain-push')
    zones = commands.add_parser('add-purok')
    zones.add_argument('name')
    migrate = commands.add_parser('import-sqlite')
    migrate.add_argument('source', help='Read-only SQLite source; PostgreSQL destination must be empty')
    args = parser.parse_args()
    if args.command == 'migrate':
        init_db()
        print('Schema migrations applied. No accounts or telemetry were seeded.')
    elif args.command == 'create-admin':
        import re
        if not re.fullmatch(r'[A-Za-z0-9_-]{1,60}', args.username) or args.username.upper().startswith('HH-'):
            parser.error('Invalid administrator username')
        password = getpass.getpass('New administrator password (12-128 characters): ')
        if not 12 <= len(password) <= 128 or password != getpass.getpass('Confirm password: '):
            parser.error('Invalid or mismatched password')
        with get_db() as db:
            db.execute('INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)',
                       (args.username, generate_password_hash(password), args.name, 'Admin'))
        print('Administrator created.')
    elif args.command == 'issue-reset':
        table, column = ('users', 'username') if args.kind == 'staff' else ('households', 'household_id')
        value = args.account if args.kind == 'staff' else int(args.account.removeprefix('HH-'))
        with get_db() as db:
            db.execute(f'SELECT {column} FROM {table} WHERE {column} = ?', (value,))
            if not db.fetchone():
                parser.error('Account not found')
            token = secrets.token_urlsafe(32)
            expires = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30)).isoformat()
            db.execute('UPDATE password_resets SET used = 1 WHERE account_id = ? AND kind = ?', (args.account, args.kind))
            db.execute('INSERT INTO password_resets (token_hash, account_id, kind, expires_at) VALUES (?, ?, ?, ?)',
                       (hashlib.sha256(token.encode()).hexdigest(), args.account, args.kind, expires))
        print('Verify the person independently, then privately deliver this one-use code (30 minutes):')
        print(token)
    elif args.command == 'generate-vapid':
        from cryptography.hazmat.primitives.asymmetric.ec import generate_private_key, SECP256R1
        from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
        private = generate_private_key(SECP256R1())
        encode = lambda raw: base64.urlsafe_b64encode(raw).rstrip(b'=').decode()
        print('Save these in your secret manager or ignored .env; do not commit the output.')
        print('VAPID_PUBLIC_KEY=' + encode(private.public_key().public_bytes(Encoding.X962, PublicFormat.UncompressedPoint)))
        print('VAPID_PRIVATE_KEY=' + encode(private.private_numbers().private_value.to_bytes(32, 'big')))
    elif args.command == 'add-purok':
        with get_db() as db:
            db.execute('INSERT INTO puroks (purok_name) VALUES (?) ON CONFLICT (purok_name) DO NOTHING', (args.name,))
        print('Purok configured.')
    elif args.command == 'drain-push':
        from backend.notifications import drain
        print('Processed', drain())
    elif args.command == 'import-sqlite':
        import_sqlite(args.source)


def import_sqlite(source):
    """Copy only known schema columns, omit legacy plaintext and subscriptions."""
    from pathlib import Path
    if not is_postgres():
        raise RuntimeError('Import destination must be PostgreSQL')
    tables = ['users', 'puroks', 'households', 'water_meters', 'billing_records',
              'reservoir_quality_readings', 'flow_readings', 'announcements',
              'maintenance_logs', 'payment_collections', 'payment_settings', 'resident_reports']
    source_db = sqlite3.connect(Path(source).resolve().as_uri() + '?mode=ro', uri=True)
    source_db.row_factory = sqlite3.Row
    try:
        with get_db() as target:
            target.execute('SELECT pg_advisory_xact_lock(84210421)')
            for table in tables:
                target.execute(f'SELECT COUNT(*) AS count FROM {table}')
                if target.fetchone()['count']:
                    raise RuntimeError('Import requires an empty destination; no data was changed')
            for table in tables:
                source_cols = {row['name'] for row in source_db.execute(f'PRAGMA table_info({table})')}
                cols = sorted((source_cols & columns(target, table)) - {'plain_password', 'password', 'passwd'})
                if not cols:
                    continue
                names = ', '.join(cols)
                marks = ', '.join('?' for _ in cols)
                for row in source_db.execute(f'SELECT {names} FROM {table}'):
                    target.execute(f'INSERT INTO {table} ({names}) VALUES ({marks})', tuple(row))
                target.execute("""SELECT column_name FROM information_schema.columns
                    WHERE table_schema = current_schema() AND table_name = ? AND column_default LIKE 'nextval%%'""", (table,))
                for serial in target.fetchall():
                    column = serial['column_name']
                    target.execute(f"SELECT setval(pg_get_serial_sequence(?, ?), COALESCE(MAX({column}), 1), COUNT(*) > 0) FROM {table}", (table, column))
        print('Import committed. Reset legacy passwords and re-register push subscriptions before opening access.')
    finally:
        source_db.close()


if __name__ == '__main__':
    main()
