"""OTP-free reset evidence; real updates to disposable databases only."""
import datetime
import hashlib
import secrets
from concurrent.futures import ThreadPoolExecutor
import pytest
from flask_jwt_extended import create_access_token, decode_token
from werkzeug.security import check_password_hash
from backend.db_adapter import get_db
from backend.server import app, limiter
from backend.security import claims_for
from backend.password_reset import marker


def issue(client, headers, role, account):
    return client.post('/api/admin/password-resets', headers=headers['admin'], json={
        'role': role, 'username': account, 'identity_verified': True, 'confirmed': True})


@pytest.mark.parametrize('role,account', [('worker','worker'),('resident','HH-1')])
def test_admin_temporary_login_mandatory_change_real_persistence(system, role, account, caplog):
    client, headers, old = system
    limiter.reset()
    caplog.set_level('INFO', logger='waterhall.password_reset.audit')
    with get_db() as db:
        db.execute('SELECT username,password_hash FROM users ORDER BY user_id')
        before_users = db.fetchall()
        db.execute('SELECT household_id,password_hash FROM households ORDER BY household_id')
        before_houses = db.fetchall()
    result = issue(client,headers,role,account)
    assert result.status_code == 200 and result.json['password_change_required']
    temporary = result.json['temporary_password']
    assert len(temporary) >= 12 and 'no-store' in result.headers['Cache-Control']
    assert result.json['expires_in_hours'] == 24
    assert client.get('/api/all-data',headers=headers[account]).status_code == 401
    assert client.post('/api/login',json={'username':account,'password':old}).status_code == 401
    signed = client.post('/api/login',json={'username':account,'password':temporary})
    assert signed.status_code == 200 and signed.json['role'] == role and signed.json['password_change_required']
    token = signed.json['access_token']; restricted = {'Authorization':'Bearer '+token}
    with app.app_context():
        claims = decode_token(token)
    assert claims['purpose'] == 'password_change' and claims['exp']-claims['iat'] == 900
    for endpoint in ['/api/all-data','/api/announcements','/api/iot/latest','/api/worker/transactions','/api/settings/payment']:
        assert client.get(endpoint,headers=restricted).status_code == 403
    assert client.post('/api/billing-records/add',headers=restricted,json={}).status_code == 403
    assert client.post('/api/password/change',json={'new_password':temporary,'confirm_password':temporary},headers=restricted).status_code == 400
    new = secrets.token_urlsafe(24)
    changed = client.post('/api/password/change',json={'new_password':new,'confirm_password':new},headers=restricted)
    assert changed.status_code == 200
    assert client.post('/api/password/change',json={'new_password':new,'confirm_password':new},headers=restricted).status_code == 401
    for bad in [old, temporary]:
        assert client.post('/api/login',json={'username':account,'password':bad}).status_code == 401
    final = client.post('/api/login',json={'username':account,'password':new})
    assert final.status_code == 200 and final.json['role'] == role and not final.json['password_change_required']
    assert client.get('/api/all-data',headers={'Authorization':'Bearer '+final.json['access_token']}).status_code == 200
    with get_db() as db:
        db.execute('SELECT username,password_hash FROM users ORDER BY user_id')
        users = db.fetchall()
        db.execute('SELECT household_id,password_hash FROM households ORDER BY household_id')
        houses = db.fetchall()
        db.execute('SELECT * FROM password_resets')
        resets = db.fetchall()
    for before,after in zip(before_users,users):
        if role == 'worker' and before['username'] == account:
            assert check_password_hash(after['password_hash'],new)
        else: assert after == before
    for before,after in zip(before_houses,houses):
        if role == 'resident' and before['household_id'] == 1:
            assert check_password_hash(after['password_hash'],new)
        else: assert after == before
    assert resets and all(r['used'] == 1 for r in resets)
    assert all(secret not in str(users)+str(houses)+str(resets)+caplog.text for secret in [old,temporary,new])
    assert 'temporary_password_issued' in caplog.text and 'password_changed' in caplog.text


@pytest.mark.parametrize('actor', [None,'worker','HH-1'])
def test_admin_reset_rejects_unauthorized_roles(system,actor):
    client,headers,_ = system
    res=client.post('/api/admin/password-resets',headers=headers.get(actor,{}),json={
        'role':'worker','username':'worker','identity_verified':True,'confirmed':True})
    assert res.status_code == (401 if actor is None else 403)


@pytest.mark.parametrize('body', [
    {'role':'worker','username':'admin','identity_verified':True,'confirmed':True},
    {'role':'admin','username':'admin','identity_verified':True,'confirmed':True},
    {'role':'resident','username':'HH-999','identity_verified':True,'confirmed':True},
    {'role':'worker','username':'missing','identity_verified':True,'confirmed':True},
    {'role':'worker','username':'worker','confirmed':True},
    {'role':'worker','username':'worker','identity_verified':True},
    {'role':'worker','username':'worker','identity_verified':'true','confirmed':True}])
def test_admin_reset_validation_never_changes_wrong_account(system,body):
    client,headers,old=system
    assert client.post('/api/admin/password-resets',headers=headers['admin'],json=body).status_code in (400,404)
    assert client.get('/api/all-data',headers=headers['worker']).status_code == 200


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_reissued_and_expired_temporary_password_rejected(system,role,account):
    client,headers,_=system;limiter.reset()
    first=issue(client,headers,role,account).json['temporary_password']
    second=issue(client,headers,role,account).json['temporary_password']
    assert client.post('/api/login',json={'username':account,'password':first}).status_code == 401
    assert client.post('/api/login',json={'username':account,'password':second}).status_code == 200
    with get_db() as db:
        db.execute("UPDATE password_resets SET expires_at = ? WHERE account_id = ? AND token_hash LIKE 'temporary:%'",
                   ((datetime.datetime.now(datetime.timezone.utc)-datetime.timedelta(seconds=1)).isoformat(),account))
    expired=client.post('/api/login',json={'username':account,'password':second})
    assert expired.status_code == 401 and 'expired' in expired.json['msg']


def test_legacy_code_issuance_cannot_lift_required_change(system):
    client,headers,_=system;limiter.reset()
    temp=issue(client,headers,'worker','worker').json['temporary_password']
    legacy=client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':'worker','username':'worker'})
    assert legacy.status_code == 200
    signed=client.post('/api/login',json={'username':'worker','password':temp})
    assert signed.json['password_change_required']
    restricted={'Authorization':'Bearer '+signed.json['access_token']}
    assert client.get('/api/all-data',headers=restricted).status_code == 403
    # Existing trusted code recovery still sets a real new password for old clients.
    new=secrets.token_urlsafe(24)
    assert client.post('/api/recover-account',json={'reset_token':legacy.json['recovery_code'],'new_password':temp}).status_code == 400
    assert client.post('/api/recover-account',json={'reset_token':legacy.json['recovery_code'],'new_password':new}).status_code == 200
    assert not client.post('/api/login',json={'username':'worker','password':new}).json['password_change_required']


def test_database_gate_cannot_be_bypassed_by_normal_scope_token(system):
    client,headers,_=system
    issue(client,headers,'worker','worker')
    with get_db() as db:
        db.execute("SELECT password_hash FROM users WHERE username='worker'")
        hashed=db.fetchone()['password_hash']
    with app.app_context():
        token=create_access_token(identity='worker',additional_claims=claims_for(hashed,'staff'))
    assert client.get('/api/all-data',headers={'Authorization':'Bearer '+token}).status_code == 403


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_normal_change_requires_current_password_and_is_self_only(system,role,account):
    client,headers,old=system
    new=secrets.token_urlsafe(24)
    body={'username':'other-worker','role':'admin','new_password':new,'confirm_password':new}
    assert client.post('/api/password/change',headers=headers[account],json=body).status_code == 400
    assert client.post('/api/password/change',headers=headers[account],json={**body,'current_password':old,'confirm_password':'different'}).status_code == 400
    assert client.post('/api/password/change',headers=headers[account],json={**body,'current_password':old}).status_code == 200
    assert client.get('/api/all-data',headers=headers[account]).status_code == 401
    assert client.get('/api/all-data',headers=headers['other-worker']).status_code == 200
    limiter.reset()
    assert client.post('/api/login',json={'username':account,'password':new}).status_code == 200


def test_reset_and_change_rate_limits(system):
    client,headers,old=system;limiter.reset()
    for _ in range(10): assert issue(client,headers,'worker','worker').status_code == 200
    assert issue(client,headers,'worker','worker').status_code == 429
    for _ in range(5):
        assert client.post('/api/password/change',headers=headers['HH-1'],json={}).status_code == 400
    assert client.post('/api/password/change',headers=headers['HH-1'],json={}).status_code == 429


def test_change_unauthenticated_identifier_alone_cannot_reset(system):
    client,headers,_=system
    body={'username':'worker','role':'worker','new_password':secrets.token_urlsafe(24)}
    assert client.post('/api/password/change',json=body).status_code == 401
    assert client.get('/api/all-data',headers=headers['worker']).status_code == 200


def test_concurrent_temporary_password_change_only_one_wins(system):
    client,headers,_=system;limiter.reset()
    temp=issue(client,headers,'worker','worker').json['temporary_password']
    token=client.post('/api/login',json={'username':'worker','password':temp}).json['access_token']
    choices=[secrets.token_urlsafe(24),secrets.token_urlsafe(24)]
    def change(value):
        with app.test_client() as concurrent:
            return value,concurrent.post('/api/password/change',headers={'Authorization':'Bearer '+token},
                json={'new_password':value,'confirm_password':value}).status_code
    with ThreadPoolExecutor(max_workers=2) as executor:
        results=list(executor.map(change,choices))
    assert sorted(status for _,status in results)==[200,401]
    winner=next(value for value,status in results if status==200)
    assert client.post('/api/login',json={'username':'worker','password':winner}).status_code==200
