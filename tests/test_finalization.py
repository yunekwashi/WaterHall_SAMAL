"""Software-finalization contracts; isolated SQLite fixtures, never production."""
import datetime
import json
import secrets
import uuid
from concurrent.futures import ThreadPoolExecutor

import pytest
from flask_jwt_extended import create_access_token
from backend import login_security
from backend.db_adapter import get_db, init_db
from backend.security import claims_for
from backend.server import app, limiter


def registration(**changes):
    secret = secrets.token_urlsafe(24)
    return dict(owner_name='Test Resident', contact='09175550101', purok='Purok 1',
                password=secret, verify_password=secret, **changes)


def bill(**changes):
    return dict(operation_id=uuid.uuid4().hex, house_id='HH-2', previous_reading=0,
                current_reading=12, date=datetime.datetime.now(datetime.timezone.utc).isoformat(), **changes)


RATES = {'base_rate': '100.00', 'included_m3': '10.000', 'environmental_fee': '20.00', 'excess_rate': '12.50'}


def test_self_registration_approval_and_identity_are_server_controlled(system):
    client, headers, _ = system
    data = registration()
    response = client.post('/api/residents/register', json={**data, 'role': 'admin', 'account_status': 'approved', 'house_id': 'HH-999'})
    assert response.status_code == 201, response.json
    who = response.json['house_id']
    assert who != 'HH-999' and response.json['account_status'] == 'pending'
    login = {'username': who, 'password': data['password']}
    assert client.post('/api/login', json=login).status_code == 403
    for actor in ('worker', 'HH-1'):
        assert client.post('/api/residents/review', json={'house_id': who, 'status': 'approved'}, headers=headers[actor]).status_code == 403
        assert client.get('/api/residents/registrations', headers=headers[actor]).status_code == 403
    rows = client.get('/api/residents/registrations', headers=headers['admin']).json['registrations']
    assert any(r['house_id'] == who and r['account_status'] == 'pending' for r in rows)
    # Even a correctly signed JWT may not bypass approval.
    with get_db() as db:
        db.execute('SELECT password_hash FROM households WHERE household_id = ?', (int(who[3:]),))
        hashed = db.fetchone()['password_hash']
    with app.app_context():
        token = create_access_token(identity=who, additional_claims=claims_for(hashed, 'resident'))
    assert client.get('/api/all-data', headers={'Authorization': 'Bearer ' + token}).status_code == 401
    assert client.post('/api/residents/review', json={'house_id': who, 'status': 'approved'}, headers=headers['admin']).status_code == 200
    assert client.post('/api/login', json=login).status_code == 200
    assert client.post('/api/login', json={'username': '+63 917 555 0101', 'password': data['password']}).status_code == 200
    assert client.post('/api/residents/review', json={'house_id': who, 'status': 'rejected'}, headers=headers['admin']).status_code == 409


def test_rejected_registration_cannot_login(system):
    client, headers, _ = system
    data = registration()
    who = client.post('/api/residents/register', json=data).json['house_id']
    assert client.post('/api/residents/review', json={'house_id': who, 'status': 'rejected'}, headers=headers['admin']).status_code == 200
    result = client.post('/api/login', json={'username': who, 'password': data['password']})
    assert result.status_code == 403 and 'rejected' in result.json['msg']


@pytest.mark.parametrize('phone', ['+63 917 555 0101', '639175550101', '0917-555-0101', '9175550101', '00639175550101'])
def test_normalized_contact_uniqueness(system, phone):
    client, headers, _ = system
    data = registration()
    assert client.post('/api/residents/register', json=data).status_code == 201
    assert client.post('/api/households/add', json={**data, 'contact': phone, 'owner_name': 'Different Name'}, headers=headers['admin']).status_code == 409


def test_same_name_flag_does_not_merge_or_reject_accounts(system):
    client, headers, _ = system
    data = registration()
    first = client.post('/api/residents/register', json=data).json
    second = client.post('/api/residents/register', json={**data, 'owner_name': '  TEST   RESIDENT ', 'contact': '09175550102'}).json
    assert first['house_id'] != second['house_id']
    rows = client.get('/api/residents/registrations', headers=headers['admin']).json['registrations']
    assert sum(r['possible_same_name'] for r in rows) == 2
    assert client.post('/api/login', json={'username': 'Test Resident', 'password': data['password']}).status_code == 401


@pytest.mark.parametrize('changes', [dict(contact='abc'), dict(contact=''), dict(purok='Missing'),
                                   dict(verify_password='not-the-password'), dict(owner_name=''), dict(password='short')])
def test_invalid_self_registration(system, changes):
    client, _, _ = system
    result = client.post('/api/residents/register', json={**registration(), **changes})
    assert result.status_code == 400 and 'access_token' not in result.json


def test_registration_concurrency_reserves_contact_once(system):
    data = registration()
    def send(_):
        with app.test_client() as client:
            return client.post('/api/residents/register', json=data).status_code
    with ThreadPoolExecutor(max_workers=2) as executor:
        assert sorted(executor.map(send, range(2))) == [201, 409]


@pytest.mark.parametrize('account', ['admin', 'worker', 'HH-1'])
def test_five_failures_lock_for_five_minutes_without_extension(system, monkeypatch, account):
    client, _, password = system
    limiter.reset()
    now = [1000000.0]
    monkeypatch.setattr(login_security, 'clock', lambda: now[0])
    for attempt in range(1, 6):
        response = client.post('/api/login', json={'username': account, 'password': 'wrong'})
        assert response.status_code == (429 if attempt == 5 else 401)
        assert response.json['attempts_remaining'] == 5 - attempt
    # New request/IP plus correct password cannot bypass persistent account lockout.
    now[0] += 60
    locked = client.post('/api/login', json={'username': account, 'password': password}, environ_overrides={'REMOTE_ADDR': '192.0.2.55'})
    assert locked.status_code == 429 and locked.json['retry_after'] == 240
    now[0] += 240
    assert client.post('/api/login', json={'username': account, 'password': password}).status_code == 200


@pytest.mark.parametrize('account', ['admin', 'worker', 'HH-1'])
def test_success_resets_consecutive_failures(system, account):
    client, _, password = system
    limiter.reset()
    for _ in range(4):
        assert client.post('/api/login', json={'username': account, 'password': 'wrong'}).status_code == 401
    assert client.post('/api/login', json={'username': account, 'password': password}).status_code == 200
    assert client.post('/api/login', json={'username': account, 'password': 'wrong'}).json['attempts_remaining'] == 4


def test_account_alias_cannot_reset_lockout_and_rate_limit_remains(system):
    client, _, password = system
    limiter.reset()
    for _ in range(5):
        client.post('/api/login', json={'username': 'HH-1', 'password': 'wrong'})
    for alias in ('Resident One', 'METER-1', '1'):
        assert client.post('/api/login', json={'username': alias, 'password': password}).status_code == 429
    # Distinct nonexistent accounts cannot evade the independent IP rate limiter.
    results = [client.post('/api/login', json={'username': 'unknown-' + str(n), 'password': 'wrong'}) for n in range(5)]
    assert results[-1].status_code == 429 and 'attempts_remaining' not in results[-1].json


def test_billing_configuration_admin_only_persistent_and_historical(system):
    client, headers, _ = system
    for actor in ('worker', 'HH-1'):
        assert client.post('/api/settings/billing', json=RATES, headers=headers[actor]).status_code == 403
    assert client.post('/api/settings/billing', json=RATES, headers=headers['admin']).status_code == 200
    assert client.get('/api/settings/billing', headers=headers['worker']).json['configuration']['base_rate'] == '100.00'
    payload = bill()
    result = client.post('/api/billing-records/add', json=payload, headers=headers['worker'])
    assert result.status_code == 200, result.json
    original = result.json['billing_breakdown']
    assert original['total_due'] == '145.00'
    assert client.post('/api/settings/billing', json={**RATES, 'base_rate': '200'}, headers=headers['admin']).status_code == 200
    # A completed operation replays its old response, even after rate changes.
    assert client.post('/api/billing-records/add', json=payload, headers=headers['worker']).json == result.json
    init_db()
    data = client.get('/api/all-data', headers=headers['admin']).json
    created = next(b for b in data['billingRecords'] if b['bill_id'] == result.json['bill_id'])
    assert created['total_due'] == 145 and created['billing_breakdown'] == original
    legacy = next(b for b in data['billingRecords'] if b['bill_id'] == 'BILL-1')
    assert legacy['total_due'] == 170 and legacy['billing_breakdown'] is None
    assert data['billingConfig']['base_rate'] == '200.00'


@pytest.mark.parametrize('field,value', [('base_rate', -1), ('environmental_fee', 'bad'), ('excess_rate', True),
                                       ('included_m3', 'NaN'), ('base_rate', 'Infinity'), ('excess_rate', '1.001')])
def test_invalid_billing_configuration(system, field, value):
    client, headers, _ = system
    assert client.post('/api/settings/billing', json={**RATES, field: value}, headers=headers['admin']).status_code == 400


@pytest.mark.parametrize('reading,total', [(0, '120.00'), (10, '120.00'), (12, '145.00'), (10.001, '120.01')])
def test_server_calculates_meter_consumption_and_tariff(system, reading, total):
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])
    result = client.post('/api/billing-records/add', json={**bill(), 'current_reading': reading}, headers=headers['worker'])
    assert result.status_code == 200, result.json
    assert result.json['billing_breakdown']['total_due'] == total


@pytest.mark.parametrize('changes,status', [({'current_reading': -1}, 400), ({'current_reading': 'bad'}, 400),
                                          ({'previous_reading': 10, 'current_reading': 9}, 400),
                                          ({'total_due': 1}, 409), ({'billing_config_version': -1}, 409)])
def test_invalid_meter_readings_and_client_amounts(system, changes, status):
    client, headers, _ = system
    result = client.post('/api/billing-records/add', json={**bill(), **changes}, headers=headers['worker'])
    assert result.status_code == status


def test_migration_keeps_legacy_data_and_requires_rate_confirmation(empty_database):
    with get_db() as db:
        db.execute('SELECT confirmed FROM billing_configuration')
        assert db.fetchone()['confirmed'] == 0
    init_db()
    init_db()
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM billing_configuration')
        assert db.fetchone()['n'] == 1
        db.execute('SELECT version FROM schema_migrations ORDER BY version')
        assert [r['version'] for r in db.fetchall()] == [1, 2]


def test_empty_billing_and_no_unsupported_telemetry(system):
    client, headers, _ = system
    data = client.get('/api/all-data', headers=headers['HH-2']).json
    assert data['billingRecords'] == []
    assert data['centralAssets']['has_reading'] is False
    assert data['centralAssets']['main_tank_level'] is None
    assert not {'ph_level', 'ph_status', 'flow_rate'} & data['centralAssets'].keys()
    assert 'flow_rate' not in data['households'][0]


def test_resident_report_derives_ownership(system):
    client, headers, _ = system
    response = client.post('/api/reports/add', json={'operation_id': uuid.uuid4().hex,
        'report_type': 'Leak', 'description': 'Pipe needs repair'}, headers=headers['HH-1'])
    assert response.status_code == 200
    assert client.get('/api/reports', headers=headers['HH-2']).json['reports'] == []


def test_legacy_contact_reservation_and_unconfirmed_rates(system):
    client, headers, _ = system
    with get_db() as db:
        db.execute("UPDATE households SET contact_no = '+63 917 555 0101'")
        db.execute('DELETE FROM schema_migrations WHERE version = 2')
        db.execute('UPDATE billing_configuration SET confirmed = 0')
    init_db()
    rows = client.get('/api/residents/registrations', headers=headers['admin']).json['registrations']
    assert len(rows) == 2 and all(row['possible_duplicate_contact'] for row in rows)
    assert client.post('/api/residents/register', json=registration()).status_code == 409
    result = client.post('/api/billing-records/add', json=bill(), headers=headers['worker'])
    assert result.status_code == 409
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM households')
        assert db.fetchone()['n'] == 2
        db.execute('SELECT total_amount, billing_snapshot FROM billing_records')
        row = db.fetchone()
        assert row['total_amount'] == 170 and row['billing_snapshot'] is None
