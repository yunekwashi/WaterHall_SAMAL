import base64
import os
import secrets
import sqlite3
import subprocess
import sys
import traceback
from unittest.mock import Mock
from urllib.parse import urlunsplit

import certifi
import psycopg2
import pytest
from psycopg2.extensions import parse_dsn
from backend import db_adapter, notifications
from backend.db_adapter import get_db, init_db
from backend.manage import import_sqlite


def test_production_requires_external_configuration():
    env = dict(os.environ, APP_ENV='production', DATABASE_URL='', POSTGRES_URL='')
    result = subprocess.run([sys.executable, '-c', 'import backend.config'], env=env, capture_output=True, text=True)
    assert result.returncode != 0
    assert 'Production requires DATABASE_URL' in result.stderr


@pytest.mark.parametrize('sslmode', ['require', 'disable', 'allow', 'prefer', 'verify-ca', 'verify-full', None])
def test_production_postgres_enforces_tls_over_url_and_environment(monkeypatch, sslmode):
    url = 'postgresql://test-user@database.example.invalid/waterhall?channel_binding=disable&sslrootcert=untrusted.crt'
    if sslmode is not None:
        url += '&sslmode=' + sslmode
    monkeypatch.setattr(db_adapter, 'POSTGRES_URL', url)
    monkeypatch.setattr(db_adapter.config, 'PRODUCTION', True)
    monkeypatch.setenv('PGSSLMODE', 'disable')
    monkeypatch.setenv('PGSSLROOTCERT', 'untrusted-environment.crt')
    monkeypatch.setenv('PGCHANNELBINDING', 'disable')
    native_connect = Mock(return_value=Mock())
    monkeypatch.setattr(psycopg2, '_connect', native_connect)
    connect = Mock(wraps=psycopg2.connect)
    monkeypatch.setattr(psycopg2, 'connect', connect)

    with get_db():
        pass

    connect.assert_called_once_with(
        url, connect_timeout=10, sslmode='verify-full',
        sslrootcert=certifi.where(), channel_binding='require',
    )
    # Exercise psycopg2's real DSN merge, stopping before the native network call.
    native_connect.assert_called_once()
    effective = parse_dsn(native_connect.call_args.args[0])
    assert effective['sslmode'] == 'verify-full'
    assert effective['sslrootcert'] == certifi.where()
    assert effective['channel_binding'] == 'require'
    assert db_adapter.POSTGRES_URL == url


def test_development_postgres_preserves_local_connection_options(monkeypatch):
    url = 'postgresql://test-user@localhost/waterhall?sslmode=disable'
    monkeypatch.setattr(db_adapter, 'POSTGRES_URL', url)
    monkeypatch.setattr(db_adapter.config, 'PRODUCTION', False)
    native_connect = Mock(return_value=Mock())
    monkeypatch.setattr(psycopg2, '_connect', native_connect)
    connect = Mock(wraps=psycopg2.connect)
    monkeypatch.setattr(psycopg2, 'connect', connect)

    with get_db():
        pass

    connect.assert_called_once_with(url, connect_timeout=10)
    effective = parse_dsn(native_connect.call_args.args[0])
    assert effective['sslmode'] == 'disable'
    assert 'sslrootcert' not in effective
    assert 'channel_binding' not in effective


@pytest.mark.parametrize('driver_error', [psycopg2.OperationalError, psycopg2.ProgrammingError, ValueError])
def test_postgres_connection_failure_is_closed_and_redacted(monkeypatch, caplog, capsys, driver_error):
    from backend.server import app
    private_value = secrets.token_urlsafe(32)
    url = urlunsplit(('postgresql', 'test-user:' + private_value + '@database.example.invalid',
                     '/waterhall', 'sslmode=require', ''))
    monkeypatch.setattr(db_adapter, 'POSTGRES_URL', url)
    monkeypatch.setattr(db_adapter.config, 'PRODUCTION', True)
    native_connect = Mock(side_effect=driver_error(f'TLS connection failed: {url} {private_value}'))
    monkeypatch.setattr(psycopg2, '_connect', native_connect)

    with pytest.raises(RuntimeError, match='^Unable to establish PostgreSQL connection$') as failure:
        get_db()
    native_connect.assert_called_once()  # No retry with weaker TLS.
    cli_traceback = ''.join(traceback.format_exception(failure.value))

    client = app.test_client()
    unavailable = client.get('/api/ready')
    assert unavailable.status_code == 503
    rejected = client.post('/api/login', json={'username': 'test-user', 'password': private_value})
    assert rejected.status_code == 500
    assert rejected.get_json() == {'msg': 'Unable to complete request'}
    assert native_connect.call_count == 3
    for call in native_connect.call_args_list:
        effective = parse_dsn(call.args[0])
        assert effective['sslmode'] == 'verify-full'
        assert effective['sslrootcert'] == certifi.where()
        assert effective['channel_binding'] == 'require'

    output = capsys.readouterr()
    visible = cli_traceback + caplog.text + output.out + output.err
    visible += unavailable.get_data(as_text=True) + rejected.get_data(as_text=True)
    assert private_value not in visible
    assert url not in visible
    assert 'database.example.invalid' not in visible


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
