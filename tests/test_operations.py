import base64
import os
import secrets
import sqlite3
import subprocess
import sys

import pytest
from backend import db_adapter, notifications
from backend.db_adapter import get_db, init_db
from backend.manage import import_sqlite


def test_production_requires_external_configuration():
    env = dict(os.environ, APP_ENV='production', DATABASE_URL='', POSTGRES_URL='')
    result = subprocess.run([sys.executable, '-c', 'import backend.config'], env=env, capture_output=True, text=True)
    assert result.returncode != 0
    assert 'Production requires DATABASE_URL' in result.stderr


def test_absent_ph_is_not_fabricated(system):
    from backend.server import IOT_DEVICE_SECRET
    client, headers, _ = system
    result = client.post('/api/iot/telemetry', json={'water_level_percentage': 50, 'turbidity_ntu': 1, 'tds_ppm': 30}, headers={'X-IoT-Secret': IOT_DEVICE_SECRET})
    assert result.status_code == 200
    assert client.get('/api/all-data', headers=headers['HH-1']).json['centralAssets']['ph_status'] == 'unknown'
    with get_db() as db:
        db.execute('SELECT ph_level FROM reservoir_quality_readings')
        assert db.fetchone()['ph_level'] is None


def test_sqlite_import_preserves_ids_omits_plaintext_and_is_atomic(empty_database, tmp_path, monkeypatch):
    if not db_adapter.is_postgres():
        pytest.skip('PostgreSQL import integration')
    source = tmp_path / 'legacy.db'
    with sqlite3.connect(source) as db:
        db.execute('CREATE TABLE users (user_id INTEGER PRIMARY KEY, username TEXT, password_hash TEXT, full_name TEXT, role TEXT, plain_password TEXT)')
        db.execute('INSERT INTO users VALUES (7, ?, ?, ?, ?, ?)', ('legacy', 'hash-needs-reset', 'Legacy account', 'Collector', secrets.token_urlsafe(16)))
    before = source.read_bytes()
    import_sqlite(source)
    assert source.read_bytes() == before
    with get_db() as db:
        assert 'plain_password' not in db_adapter.columns(db, 'users')
        db.execute('SELECT user_id FROM users')
        assert db.fetchone()['user_id'] == 7
        db.execute('INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)', ('next', 'hash', 'Next', 'Collector'))
        assert db.lastrowid == 8
    with pytest.raises(RuntimeError, match='empty destination'):
        import_sqlite(source)
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS count FROM users')
        assert db.fetchone()['count'] == 2


def test_push_outbox_retry_and_expired_subscription(system, monkeypatch):
    from cryptography.hazmat.primitives.asymmetric.ec import generate_private_key, SECP256R1
    from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
    from pywebpush import WebPushException
    from requests import Response
    client, headers, _ = system
    encode = lambda value: base64.urlsafe_b64encode(value).rstrip(b'=').decode()
    pub = generate_private_key(SECP256R1()).public_key().public_bytes(Encoding.X962, PublicFormat.UncompressedPoint)
    subscription = {'endpoint': 'https://fcm.googleapis.com/fcm/send/test-only', 'keys': {'p256dh': encode(pub), 'auth': encode(secrets.token_bytes(16))}}
    assert client.post('/api/push/subscribe', json=subscription, headers=headers['HH-1']).status_code == 200
    monkeypatch.setenv('VAPID_PRIVATE_KEY', secrets.token_urlsafe(32))
    monkeypatch.setenv('VAPID_CLAIMS_EMAIL', 'test@example.invalid')
    notifications.enqueue('Alert', 'Test notification')
    def transient(**kwargs):
        raise WebPushException('Temporary failure')
    monkeypatch.setattr(notifications, 'webpush', transient)
    assert notifications.drain() == 1
    with get_db() as db:
        db.execute('SELECT status, attempts FROM push_outbox')
        assert db.fetchone() == {'status': 'pending', 'attempts': 1}
    def expired(**kwargs):
        response = Response()
        response.status_code = 410
        raise WebPushException('Expired', response=response)
    monkeypatch.setattr(notifications, 'webpush', expired)
    assert notifications.drain() == 1
    with get_db() as db:
        db.execute('SELECT is_active FROM push_subscriptions')
        assert db.fetchone()['is_active'] == 0
        db.execute('SELECT status FROM push_outbox')
        assert db.fetchone()['status'] == 'sent'
