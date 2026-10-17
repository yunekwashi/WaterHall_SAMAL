"""Worker scope, provisioning and accountability on disposable databases only."""
import concurrent.futures
import uuid

import pytest

from backend.db_adapter import get_db
from backend.server import app


@pytest.fixture
def eight_puroks(system):
    homes = []
    with get_db() as db:
        db.execute("UPDATE users SET assigned_zone='Purok 1' WHERE username='worker'")
        db.execute("UPDATE users SET assigned_zone='Purok 8' WHERE username='other-worker'")
        for p, hh in enumerate([1, 10, 21, 31, 41, 51, 61, 71], 1):
            if p == 1:
                db.execute("UPDATE households SET family_head_name='Rey Purok 1' WHERE household_id=1")
            else:
                db.execute('INSERT INTO puroks (purok_name) VALUES (?)', (f'Purok {p}',))
                zone = db.lastrowid
                db.execute("INSERT INTO households (household_id,purok_id,family_head_name,registration_date,password_hash) VALUES (?,?,?,'2026-01-01',(SELECT password_hash FROM households WHERE household_id=1))",
                           (hh, zone, f'Rey Purok {p}'))
                db.execute('INSERT INTO water_meters (household_id,serial_number,last_reading) VALUES (?,?,0)', (hh, f'SCOPE-{p}'))
            homes.append(f'HH-{hh}')
    return homes


def worker_payload(password, contact='09171234567'):
    return dict(name='New Field Worker', contact=contact, role='Collector',
                password=password, verify_password=password)


@pytest.mark.parametrize('legacy', [{}, {'zone': 'Purok 8'}, {'assigned_zone': 'Purok 2'}])
def test_admin_registers_worker_without_assignment_and_preserves_legacy(system, legacy):
    client, headers, password = system
    with get_db() as db:
        db.execute("UPDATE users SET assigned_zone='Purok 8' WHERE username='worker'")
    result = client.post('/api/workers/add', headers=headers['admin'], json=worker_payload(password) | legacy)
    assert result.status_code == 200
    assert result.json['worker_id'] == result.json['employee_id'] == 'EMP-001'
    assert result.json['role'] == 'Collector'
    with get_db() as db:
        db.execute('SELECT assigned_zone FROM users WHERE username=?', ('EMP-001',))
        assert db.fetchone()['assigned_zone'] is None
        db.execute("SELECT assigned_zone FROM users WHERE username='worker'")
        assert db.fetchone()['assigned_zone'] == 'Purok 8'
    assert client.post('/api/login', json={'username': 'EMP-001', 'password': password}).json['role'] == 'worker'


def test_worker_registration_remains_admin_only_and_duplicate_safe(system):
    client, headers, password = system
    data = worker_payload(password)
    assert client.post('/api/workers/add', json=data).status_code == 401
    for who in ['worker', 'HH-1']:
        assert client.post('/api/workers/add', json=data, headers=headers[who]).status_code == 403
    assert client.post('/api/workers/add', json=data, headers=headers['admin']).status_code == 200
    assert client.post('/api/workers/add', json=data | {'contact': '+63 917 123 4567'}, headers=headers['admin']).status_code == 409
    assert client.post('/api/workers/add', json=data | {'contact': '09171234568'}, headers=headers['admin']).json['worker_id'] == 'EMP-002'
    with get_db() as db:
        db.execute("SELECT COUNT(*) AS n FROM users WHERE username LIKE 'EMP-%'")
        assert db.fetchone()['n'] == 2


@pytest.mark.parametrize('state', ['Pending', 'Rejected', 'Disabled', 'Inactive', 'Unknown'])
def test_non_authorized_staff_role_is_not_mapped_to_worker(state):
    from backend.security import staff_role
    assert staff_role(state) is None
    assert staff_role('Admin') == 'admin'
    assert staff_role('Collector') == 'worker'


def test_removed_worker_cannot_reuse_operational_token(system):
    client, headers, password = system
    with get_db() as db:
        db.execute("DELETE FROM users WHERE username='worker'")
    response = client.post('/api/login', json={'username': 'worker', 'password': password})
    assert response.status_code == 401
    assert 'access_token' not in response.json
    for path in ['/api/all-data', '/api/worker/transactions', '/api/settings/billing']:
        assert client.get(path, headers=headers['worker']).status_code == 401
    assert client.post('/api/billing-records/add', headers=headers['worker'], json={}).status_code == 401
    assert client.post('/api/collections/sync', headers=headers['worker'], json={}).status_code == 401
    assert client.get('/api/all-data', headers=headers['admin']).status_code == 200


@pytest.mark.parametrize('worker', ['worker', 'other-worker'])
def test_worker_lists_bills_and_collects_in_all_eight_puroks(system, eight_puroks, worker):
    client, headers, _ = system
    data = client.get('/api/all-data', headers=headers[worker]).json
    assert set(f'Purok {p}' for p in range(1, 9)) <= {h['purok'] for h in data['households']}
    for hh in eight_puroks:
        result = client.post('/api/billing-records/add', headers=headers[worker], json={
            'operation_id': uuid.uuid4().hex, 'house_id': hh, 'previous_reading': 0,
            'current_reading': 1, 'billing_month': '2026-02', 'date': '2026-02-05T00:00:00Z',
            'worker_id': 'other-worker' if worker == 'worker' else 'worker'})
        assert result.status_code == 200, result.json
        bill = result.json['bill_id']
        collection = {'transaction_id': uuid.uuid4().hex, 'house_id': hh, 'bill_id': bill,
                      'amount_collected': float(result.json['billing_breakdown']['total_due']),
                      'date': '2026-02-06T00:00:00Z', 'collected_by': worker}
        payment = client.post('/api/collections/sync', headers=headers[worker], json={'collections': [collection]})
        assert payment.status_code == 200, payment.json
        replay = client.post('/api/collections/sync', headers=headers[worker], json={'collections': [collection]})
        assert replay.json['duplicates_ignored'] == 1
        with get_db() as db:
            db.execute('SELECT b.billed_by,b.collected_by,u.user_id,b.payment_status FROM billing_records b JOIN users u ON u.username=? WHERE b.bill_id=?', (worker, int(bill[5:])))
            row = db.fetchone()
            assert row['billed_by'] == row['collected_by'] == row['user_id']
            assert row['payment_status'] == 'Paid'
    own = client.get('/api/worker/transactions?limit=50', headers=headers[worker]).json['records']
    other = 'other-worker' if worker == 'worker' else 'worker'
    assert {r['house_id'] for r in own} == set(eight_puroks)
    assert client.get('/api/worker/transactions', headers=headers[other]).json['records'] == []
    resident = client.get('/api/all-data', headers=headers['HH-1']).json
    assert [h['house_id'] for h in resident['households']] == ['HH-1']
    assert client.get('/api/residents/registrations', headers=headers[worker]).status_code == 403


def test_multiple_workers_cannot_double_bill_same_household_period(system, eight_puroks):
    _, headers, _ = system
    def bill(worker):
        with app.test_client() as client:
            return client.post('/api/billing-records/add', headers=headers[worker], json={
                'operation_id': uuid.uuid4().hex, 'house_id': eight_puroks[-1], 'previous_reading': 0,
                'current_reading': 1, 'billing_month': '2026-02', 'date': '2026-02-05T00:00:00Z'}).status_code
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        assert sorted(pool.map(bill, ['worker', 'other-worker'])) == [200, 409]


def test_concurrent_worker_registration_has_unique_ids_and_contact_claim(system):
    _, headers, password = system
    def register(contact):
        with app.test_client() as client:
            response = client.post('/api/workers/add', headers=headers['admin'], json=worker_payload(password, contact))
            return response.status_code, response.json
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        result = list(pool.map(register, ['09171234567', '09171234568']))
        assert {r[1]['worker_id'] for r in result} == {'EMP-001', 'EMP-002'}
        duplicate = list(pool.map(register, ['09171234569', '09171234569']))
    assert sorted(r[0] for r in duplicate) == [200, 409]
