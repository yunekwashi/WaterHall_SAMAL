"""Isolated databases only; the developer's database is never opened by tests."""
import os
import secrets
import tempfile
import uuid
from pathlib import Path

os.environ['APP_ENV'] = 'development'
os.environ.pop('VERCEL', None)
os.environ.pop('DATABASE_URL', None)
os.environ.pop('POSTGRES_URL', None)
os.environ['DATABASE_PATH'] = str(Path(tempfile.gettempdir()) / ('waterhall-test-' + uuid.uuid4().hex + '.db'))
os.environ['SECRET_KEY'] = secrets.token_urlsafe(48)
os.environ['JWT_SECRET_KEY'] = secrets.token_urlsafe(48)
os.environ['IOT_DEVICE_SECRET'] = secrets.token_urlsafe(48)
os.environ['RATELIMIT_STORAGE_URI'] = 'memory://'
os.environ['VAPID_PUBLIC_KEY'] = ''
os.environ['VAPID_PRIVATE_KEY'] = ''
os.environ['VAPID_CLAIMS_EMAIL'] = ''
os.environ['ALLOWED_ORIGINS'] = 'https://allowed.example'

import pytest
from werkzeug.security import generate_password_hash
from backend import db_adapter
from backend.server import app, limiter


@pytest.fixture()
def empty_database(tmp_path, monkeypatch):
    url = os.getenv('TEST_DATABASE_URL')
    schema = 'waterhall_test_' + uuid.uuid4().hex
    if url:
        import psycopg2
        from psycopg2 import sql
        from urllib.parse import urlencode
        with psycopg2.connect(url) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql.SQL('CREATE SCHEMA {}').format(sql.Identifier(schema)))
        test_url = url + ('&' if '?' in url else '?') + urlencode({'options': '-csearch_path=' + schema})
        monkeypatch.setattr(db_adapter, 'POSTGRES_URL', test_url)
    else:
        monkeypatch.setattr(db_adapter, 'POSTGRES_URL', '')
        monkeypatch.setattr(db_adapter, 'DB_FILE', str(tmp_path / 'test.db'))
    app.config.update(TESTING=True)
    limiter.reset()
    db_adapter.init_db()
    yield
    if url:
        with psycopg2.connect(url) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql.SQL('DROP SCHEMA {} CASCADE').format(sql.Identifier(schema)))


@pytest.fixture()
def system(empty_database):
    password = secrets.token_urlsafe(24)
    hashed = generate_password_hash(password)
    with db_adapter.get_db() as db:
        for name, role in [('admin', 'Admin'), ('worker', 'Collector'), ('other-worker', 'Collector')]:
            db.execute('INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)', (name, hashed, name, role))
        db.execute("INSERT INTO puroks (purok_name) VALUES ('Purok 1')")
        for name in ['Resident One', 'Resident Two']:
            db.execute("INSERT INTO households (purok_id, family_head_name, registration_date, password_hash) VALUES (1, ?, '2026-01-01', ?)", (name, hashed))
            household = db.lastrowid
            db.execute('INSERT INTO water_meters (household_id, serial_number) VALUES (?, ?)', (household, f'METER-{household}'))
        db.execute("INSERT INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount) VALUES (1, 0, 10, 10, 170)")
    client = app.test_client()
    headers = {}
    for user in ['admin', 'worker', 'other-worker', 'HH-1', 'HH-2']:
        result = client.post('/api/login', json={'username': user, 'password': password})
        assert result.status_code == 200, result.json
        headers[user] = {'Authorization': 'Bearer ' + result.json['access_token']}
    yield client, headers, password
