"""Admin reset safeguards on disposable SQLite/PostgreSQL accounts only."""
import datetime
from concurrent.futures import ThreadPoolExecutor

import pytest
from backend.db_adapter import get_db
from backend.password_reset import marker
from backend.server import app, limiter
from tests.test_password_reset import issue


@pytest.mark.parametrize('role,account', [('worker','worker'), ('resident','HH-1')])
def test_concurrent_admin_resets_only_latest_temporary_credential_works(system, role, account):
    client, headers, old = system
    limiter.reset()
    def reset(_):
        with app.test_client() as other:
            response=issue(other,headers,role,account)
            assert response.status_code==200
            return response.json['temporary_password']
    with ThreadPoolExecutor(max_workers=2) as pool:
        temporary=list(pool.map(reset,range(2)))
    assert len(set(temporary))==2
    logins=[client.post('/api/login',json={'username':account,'password':value}) for value in temporary]
    assert sorted(response.status_code for response in logins)==[200,401]
    assert next(response for response in logins if response.status_code==200).json['password_change_required'] is True
    assert client.post('/api/login',json={'username':account,'password':old}).status_code==401
    assert client.get('/api/all-data',headers=headers[account]).status_code==401
    assert client.get('/api/all-data',headers=headers['other-worker']).status_code==200
    kind='resident' if role=='resident' else 'staff'
    with get_db() as db:
        if role=='resident': db.execute('SELECT password_hash FROM households WHERE household_id=1')
        else: db.execute("SELECT password_hash FROM users WHERE username='worker'")
        current=db.fetchone()['password_hash']
        db.execute('SELECT token_hash FROM password_resets WHERE account_id=? AND kind=?',(account,kind))
        markers=db.fetchall()
    assert len(markers)==2 and sum(row['token_hash']==marker(current) for row in markers)==1


def test_admin_reset_audit_has_actor_target_role_utc_time_and_no_secret(system,caplog):
    client,headers,_=system
    caplog.set_level('INFO',logger='waterhall.password_reset.audit')
    response=issue(client,headers,'worker','worker')
    assert response.status_code==200
    record=next(r for r in caplog.records if r.name=='waterhall.password_reset.audit' and 'temporary_password_issued' in r.message)
    assert 'actor=admin role=worker account=worker' in record.message and 'result=success' in record.message
    timestamp=record.message.split(' at=')[1].split()[0]
    assert datetime.datetime.fromisoformat(timestamp).utcoffset()==datetime.timedelta(0)
    assert response.json['temporary_password'] not in caplog.text
    assert 'no-store' in response.headers['Cache-Control']


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_admin_reset_never_changes_same_name_other_account(system,role,account):
    client,headers,old=system
    with get_db() as db:
        if role=='worker':
            db.execute("UPDATE users SET full_name='Same Name' WHERE role='Collector'")
            db.execute("SELECT password_hash FROM users WHERE username='other-worker'")
        else:
            db.execute("UPDATE households SET family_head_name='Same Name'")
            db.execute('SELECT password_hash FROM households WHERE household_id=2')
        before=db.fetchone()['password_hash']
    assert issue(client,headers,role,account).status_code==200
    with get_db() as db:
        if role=='worker': db.execute("SELECT password_hash FROM users WHERE username='other-worker'")
        else: db.execute('SELECT password_hash FROM households WHERE household_id=2')
        assert db.fetchone()['password_hash']==before
    other='other-worker' if role=='worker' else 'HH-2'
    assert client.post('/api/login',json={'username':other,'password':old}).status_code==200
