import base64
import datetime
import hashlib
import io
import os
import secrets
import uuid
from concurrent.futures import ThreadPoolExecutor

import pytest
from PIL import Image
from backend.db_adapter import get_db, init_db
from backend.server import app, IOT_DEVICE_SECRET, limiter


def operation(**fields):
    return {'operation_id': uuid.uuid4().hex, **fields}


def collection(**fields):
    return {'transaction_id': uuid.uuid4().hex, 'house_id': 'HH-1', 'amount_collected': 170,
            'collected_by': 'worker', 'date': datetime.datetime.now(datetime.timezone.utc).isoformat(), **fields}


def test_login_roles_and_password_reset_revocation(system):
    client, headers, password = system
    assert client.post('/api/login', json={'username': 'admin', 'password': password}).json['role'] == 'admin'
    assert client.post('/api/login', json={'username': 'worker', 'password': password}).json['role'] == 'worker'
    assert client.post('/api/login', json={'username': 'worker', 'password': 'incorrect'}).status_code == 401
    assert client.post('/api/recover-account', json={'username': 'admin', 'contact_no': '123', 'new_password': 'bad'}).status_code == 400
    code = secrets.token_urlsafe(32)
    with get_db() as db:
        db.execute('INSERT INTO password_resets (token_hash, account_id, kind, expires_at) VALUES (?, ?, ?, ?)',
            (hashlib.sha256(code.encode()).hexdigest(), 'worker', 'staff', (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=5)).isoformat()))
    payload = {'reset_token': code, 'new_password': secrets.token_urlsafe(24)}
    assert client.post('/api/recover-account', json=payload).status_code == 200
    assert client.post('/api/recover-account', json=payload).status_code == 400
    assert client.get('/api/all-data', headers=headers['worker']).status_code == 401


@pytest.mark.parametrize('endpoint', ['/api/households/add', '/api/workers/add', '/api/settings/payment', '/api/central-assets/update'])
def test_admin_only(system, endpoint):
    client, headers, _ = system
    assert client.post(endpoint, json={}).status_code == 401
    for user in ['worker', 'HH-1']:
        assert client.post(endpoint, json={}, headers=headers[user]).status_code == 403


@pytest.mark.parametrize('endpoint', ['/api/collections/sync', '/api/billing-records/add', '/api/maintenance-logs/add', '/api/announcements/add', '/api/reports/update-status'])
def test_worker_routes_reject_residents(system, endpoint):
    client, headers, _ = system
    assert client.post(endpoint, json={}, headers=headers['HH-1']).status_code == 403


def test_every_api_route_has_policy(system):
    from backend.server import PUBLIC, STAFF, ADMIN, AUTHENTICATED
    known = PUBLIC | STAFF | ADMIN | AUTHENTICATED | {'iot_telemetry', 'drain_push'}
    for route in app.url_map.iter_rules():
        if route.rule.startswith('/api/'):
            assert route.endpoint in known, route.rule


def test_resident_scope_and_ignored_client_roles(system):
    client, headers, _ = system
    data = client.get('/api/all-data?role=worker', headers=headers['HH-1']).json
    assert [h['house_id'] for h in data['households']] == ['HH-1']
    assert data['workers'] == [] and data['collectionsHistory'] == []
    assert all(b['house_id'] == 'HH-1' for b in data['billingRecords'])
    assert client.get('/api/all-data?role=admin', headers=headers['worker']).status_code == 403


def test_telemetry_auth_validation_zero_and_alerts(system, monkeypatch):
    client, headers, _ = system
    payload = {'water_level_percentage': 0, 'turbidity_ntu': 6, 'ph_level': 7, 'tds_ppm': 0}
    assert client.post('/api/iot/telemetry', json=payload).status_code == 401
    device = {'X-IoT-Secret': IOT_DEVICE_SECRET}
    assert client.post('/api/iot/telemetry', json=payload, headers=device).status_code == 200
    assert client.post('/api/iot/telemetry', json=payload, headers=device).status_code == 200
    poll = client.get('/api/notifications/poll', headers=headers['HH-1']).json
    assert poll['is_low_level'] and poll['is_contaminated']
    assert len(poll['new_announcements']) == 2
    data = client.get('/api/all-data', headers=headers['HH-1']).json
    assert data['centralAssets']['main_tank_level'] == 0
    for value in [-1, 101, 'NaN', 'Infinity', None, True]:
        assert client.post('/api/iot/telemetry', json={**payload, 'water_level_percentage': value}, headers=device).status_code == 400
    monkeypatch.setattr('backend.server.IOT_DEVICE_SECRET', '')
    assert client.post('/api/iot/telemetry', json=payload, headers=device).status_code == 503


def test_collections_retry_conflict_and_atomicity(system):
    client, headers, _ = system
    item = collection()
    url = '/api/collections/sync'
    request = {'collections': [item]}
    first = client.post(url, json=request, headers=headers['worker'])
    assert first.status_code == 200, first.json
    repeat = client.post(url, json=request, headers=headers['worker'])
    assert repeat.json['synced_ids'] == [item['transaction_id']]
    assert repeat.json['duplicates_ignored'] == 1 and repeat.json['synced_count'] == 0
    conflict = client.post(url, json={'collections': [{**item, 'amount_collected': 1}]}, headers=headers['worker'])
    assert conflict.status_code == 409
    assert client.post(url, json=request, headers=headers['other-worker']).status_code == 403
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS count FROM payment_collections')
        assert db.fetchone()['count'] == 1
    assert client.post(url, json={'collections': [collection()]}, headers=headers['worker']).status_code == 409


def test_sync_batch_failure_rolls_back(system):
    client, headers, _ = system
    result = client.post('/api/collections/sync', json={'collections': [collection(), collection(house_id='HH-2', amount_collected=-1)]}, headers=headers['worker'])
    assert result.status_code == 400
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS count FROM payment_collections')
        assert db.fetchone()['count'] == 0
        db.execute('SELECT payment_status FROM billing_records WHERE bill_id=1')
        assert db.fetchone()['payment_status'] == 'Unpaid'


def test_concurrent_collection_replay(system):
    _, headers, _ = system
    payload = {'collections': [collection()]}
    def send(_):
        with app.test_client() as client:
            return client.post('/api/collections/sync', json=payload, headers=headers['worker'])
    with ThreadPoolExecutor(max_workers=2) as executor:
        results = list(executor.map(send, range(2)))
    assert [r.status_code for r in results] == [200, 200]
    assert sum(r.json['synced_count'] for r in results) == 1


def test_reports_photo_validation_and_idempotency(system):
    client, headers, _ = system
    output = io.BytesIO()
    Image.new('RGB', (10, 10), 'blue').save(output, 'PNG')
    payload = operation(household_id='HH-1', report_type='Leak', description='Pipe is leaking', photo_base64='data:image/png;base64,' + base64.b64encode(output.getvalue()).decode())
    first = client.post('/api/reports/add', json=payload, headers=headers['HH-1'])
    assert first.status_code == 200, first.json
    assert client.post('/api/reports/add', json=payload, headers=headers['HH-1']).json == first.json
    assert client.post('/api/reports/add', json={**payload, 'household_id': 'HH-2'}, headers=headers['HH-1']).status_code == 403
    bad = operation(household_id='HH-1', report_type='Leak', description='test', photo_base64='data:image/svg+xml;base64,PHN2Zz4=')
    assert client.post('/api/reports/add', json=bad, headers=headers['HH-1']).status_code == 400
    assert client.get('/api/reports').status_code == 401
    assert client.get('/api/reports', headers=headers['HH-2']).json['reports'] == []


def test_announcements_author_and_audience(system):
    client, headers, _ = system
    data = operation(message='Staff meeting', author='Pretend Admin', target_audience='Workers only')
    response = client.post('/api/announcements/add', json=data, headers=headers['worker'])
    assert response.status_code == 200, response.json
    assert client.get('/api/announcements?role=admin', headers=headers['HH-1']).json['announcements'] == []
    actual = client.get('/api/announcements', headers=headers['worker']).json['announcements']
    assert actual[0]['author'] == 'worker'


def test_push_ssrf_and_role_tampering(system):
    from cryptography.hazmat.primitives.asymmetric.ec import generate_private_key, SECP256R1
    from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
    client, headers, _ = system
    encode = lambda b: base64.urlsafe_b64encode(b).rstrip(b'=').decode()
    key = generate_private_key(SECP256R1()).public_key().public_bytes(Encoding.X962, PublicFormat.UncompressedPoint)
    data = {'endpoint': 'https://fcm.googleapis.com/fcm/send/test-only', 'keys': {'p256dh': encode(key), 'auth': encode(secrets.token_bytes(16))}, 'role': 'admin'}
    assert client.post('/api/push/subscribe', json={**data, 'endpoint': 'http://127.0.0.1/private'}, headers=headers['HH-1']).status_code == 400
    assert client.post('/api/push/subscribe', json=data, headers=headers['HH-1']).status_code == 200
    assert client.post('/api/push/subscribe', json={**data, 'keys': []}, headers=headers['HH-1']).status_code == 400
    assert client.post('/api/push/subscribe', json={**data, 'endpoint': 'https://fcm.googleapis.com:invalid/path'}, headers=headers['HH-1']).status_code == 400
    assert client.post('/api/push/subscribe', json=data, headers=headers['HH-2']).status_code == 409
    with get_db() as db:
        db.execute('SELECT role FROM push_subscriptions')
        assert db.fetchone()['role'] == 'resident'
    assert client.get('/api/jobs/push').status_code == 401


def test_headers_health_cors_migrations_and_static_paths(system):
    client, _, _ = system
    init_db()
    init_db()
    assert client.get('/api/ready').status_code == 200
    assert client.get('/api/health').json == {'status': 'ok', 'message': 'WaterHall API is running'}
    response = client.get('/api/health', headers={'Origin': 'https://evil.example'})
    assert 'Access-Control-Allow-Origin' not in response.headers
    assert response.headers['X-Content-Type-Options'] == 'nosniff'
    assert client.get('/api/health', headers={'Origin': 'https://allowed.example'}).headers['Access-Control-Allow-Origin'] == 'https://allowed.example'
    for path in ['/admin/../backend/server.py', '/api/missing', '/database/waterhall.db']:
        assert client.get(path).status_code == 404
    assert client.get('/').status_code == 200
    assert client.get('/admin/').status_code == 200


def test_login_rate_limit(system):
    client, _, _ = system
    limiter.reset()
    codes = [client.post('/api/login', json={'username': 'no-account', 'password': 'wrong'}).status_code for _ in range(11)]
    assert codes[-1] == 429


def test_billing_validated_idempotent_and_not_paid(system):
    client, headers, _ = system
    data = operation(house_id='HH-2', previous_reading=0, current_reading=12, total_due=200, date=datetime.datetime.now(datetime.timezone.utc).isoformat())
    first = client.post('/api/billing-records/add', json=data, headers=headers['worker'])
    assert first.status_code == 200, first.json
    assert client.post('/api/billing-records/add', json=data, headers=headers['worker']).json == first.json
    with get_db() as db:
        db.execute('SELECT payment_status, payment_date, billed_at FROM billing_records WHERE bill_id = ?', (int(first.json['bill_id'][5:]),))
        row = db.fetchone()
        assert row['payment_status'] == 'Unpaid' and row['payment_date'] is None and row['billed_at']
    duplicate = {**data, 'operation_id': uuid.uuid4().hex, 'previous_reading': 12, 'current_reading': 24}
    assert client.post('/api/billing-records/add', json=duplicate, headers=headers['worker']).status_code == 409
