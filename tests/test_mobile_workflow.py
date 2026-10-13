"""Requested mobile workflow tests; disposable fixtures only."""
import datetime
import hashlib
import json
import secrets
import uuid
import pytest
from backend.db_adapter import get_db
from backend.server import limiter


def seed_bills(count=31):
    with get_db() as db:
        db.execute("SELECT user_id FROM users WHERE username='worker'")
        owner = db.fetchone()['user_id']
        for i in range(count):
            db.execute("""INSERT INTO billing_records
                (meter_id, previous_reading, present_reading, consumption_m3, total_amount,
                 payment_status, billed_at, billed_by) VALUES (1, ?, ?, 1, 170, 'Unpaid', ?, ?)""",
                (i, i+1, f'2026-01-{i % 28 + 1:02}T00:00:00Z', owner))
        bill = db.lastrowid
        operation = uuid.uuid4().hex
        db.execute('INSERT INTO sync_operations (operation_id,actor,request_hash,response_json) VALUES (?,?,?,?)',
            (operation, 'worker', 'test', json.dumps({'status':'success','bill_id':f'BILL-{bill}'})))
    return bill, operation


def test_history_owned_cursor_and_read_only(system):
    client, headers, _ = system
    latest, operation = seed_bills()
    first = client.get('/api/worker/transactions', headers=headers['worker'])
    assert first.status_code == 200
    assert len(first.json['records']) == 25
    row = first.json['records'][0]
    assert row['bill_id'] == f'BILL-{latest}' and row['operation_id'] == operation
    assert row['sync_status'] == 'Synced' and row['status'] == 'Unpaid'
    assert row['house_id'] == 'HH-1' and row['account_number'] == 'METER-1'
    second = client.get(f"/api/worker/transactions?before={first.json['next_cursor']}", headers=headers['worker']).json
    assert len(second['records']) == 6 and second['next_cursor'] is None
    assert len({r['bill_id'] for r in first.json['records']+second['records']}) == 31
    assert client.get('/api/worker/transactions', headers=headers['other-worker']).json['records'] == []
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM billing_records')
        assert db.fetchone()['n'] == 32  # includes one unowned legacy row, excluded


@pytest.mark.parametrize('query,expected', [('one',31),('ONE',31),('dent',31),('missing',0),('%',0),('_',0)])
def test_history_name_substring_literal_wildcards(system,query,expected):
    client, headers, _ = system
    seed_bills()
    res=client.get('/api/worker/transactions', query_string={'q':query,'limit':50},headers=headers['worker'])
    assert res.status_code == 200 and len(res.json['records']) == expected


@pytest.mark.parametrize('query', ['limit=0','limit=51','limit=bad','before=bad','before=-1','q='+'x'*101])
def test_history_validation(system,query):
    client, headers, _ = system
    assert client.get('/api/worker/transactions?'+query,headers=headers['worker']).status_code == 400


@pytest.mark.parametrize('account', [None,'admin','HH-1'])
def test_history_authorization(system,account):
    client, headers, _ = system
    assert client.get('/api/worker/transactions',headers=headers.get(account,{})).status_code == (401 if account is None else 403)


@pytest.mark.parametrize('role,account', [('worker','worker'),('resident','HH-1')])
def test_admin_recovery_single_use_account_binding_and_revocation(system,role,account):
    client, headers, old = system
    res=client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':role,'username':account})
    assert res.status_code == 200 and res.json['expires_in_minutes'] == 30
    assert 'no-store' in res.headers['Cache-Control']
    code=res.json['recovery_code']; new=secrets.token_urlsafe(24)
    with get_db() as db:
        db.execute('SELECT * FROM password_resets')
        reset=db.fetchone()
    assert reset['token_hash']==hashlib.sha256(code.encode()).hexdigest()
    assert abs((datetime.datetime.fromisoformat(reset['expires_at'])-datetime.datetime.now(datetime.timezone.utc)).total_seconds()-1800)<5
    body={'role':role,'username':account,'reset_token':code,'new_password':new}
    assert client.post('/api/recover-account',json={**body,'username':'HH-2' if role=='resident' else 'other-worker'}).status_code==400
    assert client.post('/api/recover-account',json={**body,'role':'worker' if role=='resident' else 'resident'}).status_code==400
    assert client.post('/api/recover-account',json=body).status_code==200
    assert client.post('/api/recover-account',json=body).status_code==400
    assert client.get('/api/all-data',headers=headers[account]).status_code==401
    assert client.post('/api/login',json={'username':account,'password':old}).status_code==401
    assert client.post('/api/login',json={'username':account,'password':new}).status_code==200


def test_recovery_expired_invalid_reissued_and_limits(system):
    client, headers, _ = system
    def issue():return client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':'worker','username':'worker'}).json['recovery_code']
    old=issue(); code=issue(); new=secrets.token_urlsafe(24)
    body={'role':'worker','username':'worker','reset_token':old,'new_password':new}
    assert client.post('/api/recover-account',json=body).status_code==400
    with get_db() as db:
        db.execute('UPDATE password_resets SET expires_at=? WHERE token_hash=?',
            ((datetime.datetime.now(datetime.timezone.utc)-datetime.timedelta(seconds=1)).isoformat(),hashlib.sha256(code.encode()).hexdigest()))
    assert client.post('/api/recover-account',json={**body,'reset_token':code}).status_code==400
    assert client.post('/api/recover-account',json={**body,'reset_token':secrets.token_urlsafe(32)}).status_code==400
    for _ in range(3): client.post('/api/recover-account',json=body)
    assert client.post('/api/recover-account',json=body).status_code==429


@pytest.mark.parametrize('account', [None,'worker','HH-1'])
def test_issuance_admin_only(system,account):
    client, headers, _ = system
    assert client.post('/api/admin/recovery-codes',headers=headers.get(account,{}),json={'role':'worker','username':'worker'}).status_code==(401 if account is None else 403)


@pytest.mark.parametrize('role,account', [('admin','admin'),('worker','admin'),('worker','missing'),('resident','HH-99')])
def test_issuance_wrong_account_or_role(system,role,account):
    client, headers, _ = system
    assert client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':role,'username':account}).status_code in (400,404)


def test_issuance_rate_limit(system):
    client,headers,_=system
    for _ in range(10):
        assert client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':'worker','username':'worker'}).status_code==200
    assert client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':'worker','username':'worker'}).status_code==429
