"""Comprehensive automated tests for Resident and Worker registration."""
import secrets
from backend.db_adapter import get_db


def test_resident_valid_registration_and_automatic_id(system):
    client, headers, _ = system
    payload = {
        'owner_name': 'Maria Clara',
        'contact': '09171234567',
        'purok': 'Purok 1',
        'password': 'SecurePassword123!',
        'verify_password': 'SecurePassword123!'
    }
    res = client.post('/api/households/add', json=payload, headers=headers['admin'])
    assert res.status_code == 200, res.json
    data = res.json
    assert data['status'] == 'success'
    assert data['house_id'].startswith('HH-')
    assert data['account_number'].startswith('TAG-2026-')
    assert data['resident_id'] == data['account_number']


def test_resident_purok_assignment_and_contact_storage(system):
    client, headers, _ = system
    with get_db() as db:
        db.execute("INSERT INTO puroks (purok_name) VALUES ('Purok 2')")

    payload = {
        'owner_name': 'Crisostomo Ibarra',
        'contact': '09289876543',
        'purok': 'Purok 2',
        'password': 'CrisostomoPass2026!',
        'verify_password': 'CrisostomoPass2026!'
    }
    res = client.post('/api/households/add', json=payload, headers=headers['admin'])
    assert res.status_code == 200
    hh_id = int(res.json['house_id'].replace('HH-', ''))

    with get_db() as db:
        db.execute("SELECT h.*, p.purok_name FROM households h JOIN puroks p ON h.purok_id = p.purok_id WHERE h.household_id = ?", (hh_id,))
        row = db.fetchone()
        assert row is not None
        assert row['purok_name'] == 'Purok 2'
        assert row['contact_no'] == '09289876543'
        assert row['family_head_name'] == 'Crisostomo Ibarra'

    # Unknown purok rejection
    invalid_payload = {**payload, 'owner_name': 'Nobody', 'purok': 'Purok 99'}
    res_inv = client.post('/api/households/add', json=invalid_payload, headers=headers['admin'])
    assert res_inv.status_code == 400
    assert 'purok' in res_inv.json.get('msg', '').lower()


def test_resident_password_validation(system):
    client, headers, _ = system
    base = {
        'owner_name': 'Elias Salome',
        'contact': '09331112233',
        'purok': 'Purok 1'
    }

    # 1. Mismatched passwords
    res = client.post('/api/households/add', json={
        **base,
        'password': 'Password12345!',
        'verify_password': 'PasswordDifferent99!'
    }, headers=headers['admin'])
    assert res.status_code == 400
    assert 'passwords do not match' in res.json.get('msg', '').lower()

    # 2. Below minimum (11 chars)
    res = client.post('/api/households/add', json={
        **base,
        'password': 'Short12345!',
        'verify_password': 'Short12345!'
    }, headers=headers['admin'])
    assert res.status_code == 400
    assert '12 to 128' in res.json.get('msg', '')

    # 3. Exact 12 characters (minimum valid)
    res_12 = client.post('/api/households/add', json={
        **base,
        'password': 'ExactTwelve1!',
        'verify_password': 'ExactTwelve1!'
    }, headers=headers['admin'])
    assert res_12.status_code == 200

    # 4. Exactly 13 characters (user test case)
    res_13 = client.post('/api/households/add', json={
        **base,
        'owner_name': 'Thirteen Chars',
        'password': 'ThirteenChars!',
        'verify_password': 'ThirteenChars!'
    }, headers=headers['admin'])
    assert res_13.status_code == 200

    # 5. Exactly 128 characters (maximum valid)
    pw_128 = 'A' * 127 + '!'
    res_128 = client.post('/api/households/add', json={
        **base,
        'owner_name': 'Max Chars User',
        'password': pw_128,
        'verify_password': pw_128
    }, headers=headers['admin'])
    assert res_128.status_code == 200

    # 6. Above maximum (129 characters)
    pw_129 = 'A' * 128 + '!'
    res_129 = client.post('/api/households/add', json={
        **base,
        'owner_name': 'Too Long User',
        'password': pw_129,
        'verify_password': pw_129
    }, headers=headers['admin'])
    assert res_129.status_code == 400
    assert '12 to 128' in res_129.json.get('msg', '')


def test_resident_duplicate_and_server_side_id_enforcement(system):
    client, headers, _ = system
    # Client attempt to force an account_number should be ignored; server generates safe unique ID
    payload = {
        'owner_name': 'Forced Account Test',
        'contact': '09191234567',
        'purok': 'Purok 1',
        'account_number': 'FAKE-ACCOUNT-999',
        'password': 'ValidPassword123!',
        'verify_password': 'ValidPassword123!'
    }
    res = client.post('/api/households/add', json=payload, headers=headers['admin'])
    assert res.status_code == 200
    assert res.json['account_number'] != 'FAKE-ACCOUNT-999'
    assert res.json['account_number'].startswith('TAG-2026-')

    # Register another one: IDs must be distinct
    payload2 = {**payload, 'owner_name': 'Second Household'}
    res2 = client.post('/api/households/add', json=payload2, headers=headers['admin'])
    assert res2.status_code == 200
    assert res2.json['account_number'] != res.json['account_number']
    assert res2.json['house_id'] != res.json['house_id']


def test_resident_login_with_newly_created_account(system):
    client, headers, _ = system
    plain_pw = 'ResidentPass1234!'
    res = client.post('/api/households/add', json={
        'owner_name': 'Basilio Sisa',
        'contact': '09221234567',
        'purok': 'Purok 1',
        'password': plain_pw,
        'verify_password': plain_pw
    }, headers=headers['admin'])
    assert res.status_code == 200
    acc_num = res.json['account_number']
    hh_id = res.json['house_id']

    # Login via TAG-2026-XXXX serial number
    login_serial = client.post('/api/login', json={'username': acc_num, 'password': plain_pw})
    assert login_serial.status_code == 200
    assert login_serial.json['role'] == 'resident'

    # Login via HH-X identifier
    login_hh = client.post('/api/login', json={'username': hh_id, 'password': plain_pw})
    assert login_hh.status_code == 200
    assert login_hh.json['role'] == 'resident'

    # Login via Family Head Name
    login_name = client.post('/api/login', json={'username': 'Basilio Sisa', 'password': plain_pw})
    assert login_name.status_code == 200
    assert login_name.json['role'] == 'resident'

    # Login with wrong password rejected
    login_bad = client.post('/api/login', json={'username': acc_num, 'password': 'WrongPassword123!'})
    assert login_bad.status_code == 401


def test_worker_valid_registration_and_automatic_id(system):
    client, headers, _ = system
    payload = {
        'name': 'Apolinario Mabini',
        'contact': '09181234567',
        'role': 'Collector',
        'password': 'WorkerSecurePass123!',
        'verify_password': 'WorkerSecurePass123!'
    }
    res = client.post('/api/workers/add', json=payload, headers=headers['admin'])
    assert res.status_code == 200, res.json
    data = res.json
    assert data['status'] == 'success'
    assert data['worker_id'].startswith('EMP-')
    assert data['role'] == 'Collector'


def test_worker_sequential_employee_id_generation(system):
    client, headers, _ = system
    # Register 3 workers in sequence; IDs should be EMP-001, EMP-002, EMP-003
    ids = []
    for i in range(1, 4):
        payload = {
            'name': f'Field Worker {i}',
            'contact': f'0917000000{i}',
            'role': 'Collector',
            'password': 'WorkerPassword123!',
            'verify_password': 'WorkerPassword123!'
        }
        res = client.post('/api/workers/add', json=payload, headers=headers['admin'])
        assert res.status_code == 200
        ids.append(res.json['worker_id'])

    assert ids == ['EMP-001', 'EMP-002', 'EMP-003']
    assert len(set(ids)) == 3


def test_worker_contact_and_role_storage(system):
    client, headers, _ = system
    payload = {
        'name': 'Marcelo H. Del Pilar',
        'contact': '09198765432',
        'role': 'Collector',
        'zone': 'Purok 1',
        'password': 'MarceloPass1234!',
        'verify_password': 'MarceloPass1234!'
    }
    res = client.post('/api/workers/add', json=payload, headers=headers['admin'])
    assert res.status_code == 200
    wid = res.json['worker_id']

    with get_db() as db:
        db.execute("SELECT * FROM users WHERE username = ?", (wid,))
        row = db.fetchone()
        assert row is not None
        assert row['role'] == 'Collector'
        assert row['contact_no'] == '09198765432'
        assert row['full_name'] == 'Marcelo H. Del Pilar'
        # Password must be hashed, never plaintext
        assert 'MarceloPass1234!' not in row['password_hash']
        assert row['password_hash'].startswith('scrypt:') or row['password_hash'].startswith('pbkdf2:')

    # Rejection of invalid role
    bad_role = {**payload, 'name': 'Admin Attempt', 'role': 'Admin'}
    res_role = client.post('/api/workers/add', json=bad_role, headers=headers['admin'])
    assert res_role.status_code == 400

    # Rejection of invalid contact number format
    bad_contact = {**payload, 'name': 'Bad Contact', 'contact': 'invalid_phone'}
    res_contact = client.post('/api/workers/add', json=bad_contact, headers=headers['admin'])
    assert res_contact.status_code == 400


def test_worker_password_validation(system):
    client, headers, _ = system
    base = {
        'name': 'Melchora Aquino',
        'contact': '09201234567',
        'role': 'Collector'
    }

    # 1. Mismatched passwords
    res = client.post('/api/workers/add', json={
        **base,
        'password': 'WorkerPass1234!',
        'verify_password': 'WorkerPassMismatch!'
    }, headers=headers['admin'])
    assert res.status_code == 400
    assert 'passwords do not match' in res.json.get('msg', '').lower()

    # 2. Below minimum (11 chars)
    res = client.post('/api/workers/add', json={
        **base,
        'password': 'ShortPass1!',
        'verify_password': 'ShortPass1!'
    }, headers=headers['admin'])
    assert res.status_code == 400
    assert '12 to 128' in res.json.get('msg', '')

    # 3. Exact 13 characters
    res_13 = client.post('/api/workers/add', json={
        **base,
        'name': 'Thirteen Worker',
        'password': 'ThirteenChar!',
        'verify_password': 'ThirteenChar!'
    }, headers=headers['admin'])
    assert res_13.status_code == 200

    # 4. Above 128 characters
    pw_129 = 'B' * 128 + '!'
    res_129 = client.post('/api/workers/add', json={
        **base,
        'name': 'Too Long Worker',
        'password': pw_129,
        'verify_password': pw_129
    }, headers=headers['admin'])
    assert res_129.status_code == 400


def test_worker_login_with_newly_created_account(system):
    client, headers, _ = system
    plain_pw = 'WorkerLoginPass123!'
    res = client.post('/api/workers/add', json={
        'name': 'Gabriela Silang',
        'contact': '09211234567',
        'role': 'Collector',
        'password': plain_pw,
        'verify_password': plain_pw
    }, headers=headers['admin'])
    assert res.status_code == 200
    wid = res.json['worker_id']

    # Login via generated Employee ID
    login_id = client.post('/api/login', json={'username': wid, 'password': plain_pw})
    assert login_id.status_code == 200
    assert login_id.json['role'] == 'worker'
    assert login_id.json['id'] == wid

    # Login via full name
    login_name = client.post('/api/login', json={'username': 'Gabriela Silang', 'password': plain_pw})
    assert login_name.status_code == 200
    assert login_name.json['role'] == 'worker'

    # Login with wrong password rejected
    login_bad = client.post('/api/login', json={'username': wid, 'password': 'WrongPassword123!'})
    assert login_bad.status_code == 401


def test_regression_existing_logins_and_endpoints(system):
    client, headers, password = system

    # 1. Existing Admin login still works
    res_admin = client.post('/api/login', json={'username': 'admin', 'password': password})
    assert res_admin.status_code == 200
    assert res_admin.json['role'] == 'admin'

    # 2. Existing Worker login still works
    res_worker = client.post('/api/login', json={'username': 'worker', 'password': password})
    assert res_worker.status_code == 200
    assert res_worker.json['role'] == 'worker'

    # 3. Existing Resident login still works
    res_res = client.post('/api/login', json={'username': 'HH-1', 'password': password})
    assert res_res.status_code == 200
    assert res_res.json['role'] == 'resident'

    # 4. /api/health still works
    res_health = client.get('/api/health')
    assert res_health.status_code == 200
    assert res_health.json['status'] == 'ok'

    # 5. /api/ready still works
    res_ready = client.get('/api/ready')
    assert res_ready.status_code == 200
    assert res_ready.json['status'] == 'ready'

    # 6. /api/puroks works
    res_puroks = client.get('/api/puroks', headers=headers['admin'])
    assert res_puroks.status_code == 200
    assert 'Purok 1' in res_puroks.json['puroks']

    # 7. /api/all-data includes puroks
    res_data = client.get('/api/all-data', headers=headers['admin'])
    assert res_data.status_code == 200
    assert 'puroks' in res_data.json
    assert 'Purok 1' in res_data.json['puroks']
