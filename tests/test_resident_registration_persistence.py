"""Registration save/list invariants on disposable SQLite or PostgreSQL schemas."""
import pytest
from backend import db_adapter
from backend.db_adapter import get_db


def payload(password):
    return dict(owner_name='Isolated Pending Applicant',contact='09175557701',purok='Purok 1',password=password,verify_password=password)


def household_snapshot():
    with get_db() as db:
        db.execute('SELECT * FROM households ORDER BY household_id')
        return db.fetchall()


def test_public_registration_commits_pending_claim_and_meter_without_changing_existing_households(system):
    client,headers,password=system
    before=household_snapshot()
    response=client.post('/api/residents/register',json=payload(password))
    assert response.status_code==201 and response.json['status']=='success'
    assert response.json['account_status']=='pending'
    hh=int(response.json['house_id'][3:])
    with get_db() as db:
        db.execute('SELECT account_status,family_head_name FROM households WHERE household_id=?',(hh,))
        assert db.fetchone()==dict(account_status='pending',family_head_name='Isolated Pending Applicant')
        db.execute('SELECT household_id FROM resident_contact_claims WHERE contact=?',('09175557701',))
        assert db.fetchone()['household_id']==hh
        db.execute('SELECT serial_number FROM water_meters WHERE household_id=?',(hh,))
        assert db.fetchone()['serial_number']==response.json['account_number']
    rows=client.get('/api/residents/registrations',headers=headers['admin']).json['registrations']
    assert rows[0]['house_id']==response.json['house_id'] and rows[0]['account_status']=='pending'
    assert [r for r in household_snapshot() if r['household_id']!=hh]==before
    assert client.post('/api/residents/register',json=payload(password)).status_code==409
    assert len(household_snapshot())==len(before)+1


def test_failed_registration_insert_rolls_back_and_never_reports_success(system,monkeypatch):
    client,_,password=system;before=household_snapshot()
    execute=db_adapter.DBConnection.execute
    def fail_meter(self,query,params=None):
        if query.lstrip().startswith('INSERT INTO water_meters'):
            raise RuntimeError('Isolated commit-path failure')
        return execute(self,query,params)
    with monkeypatch.context() as patch:
        patch.setattr(db_adapter.DBConnection,'execute',fail_meter)
        response=client.post('/api/residents/register',json=payload(password))
    assert response.status_code==500 and response.json=={'msg':'Unable to complete request'}
    assert household_snapshot()==before
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM resident_contact_claims WHERE contact=?',('09175557701',))
        assert db.fetchone()['n']==0


@pytest.mark.parametrize('actor',[None,'worker','HH-1'])
def test_registration_review_list_and_actions_remain_admin_only(system,actor):
    client,headers,password=system
    response=client.post('/api/residents/register',json=payload(password));who=response.json['house_id']
    expected=401 if actor is None else 403
    assert client.get('/api/residents/registrations',headers=headers.get(actor,{})).status_code==expected
    for status in ['approved','rejected']:
        assert client.post('/api/residents/review',headers=headers.get(actor,{}),json={'house_id':who,'status':status}).status_code==expected
    with get_db() as db:
        db.execute('SELECT account_status FROM households WHERE household_id=?',(int(who[3:]),))
        assert db.fetchone()['account_status']=='pending'


def test_review_list_has_no_implicit_page_or_status_filter_hiding_pending_rows(system):
    client,headers,_=system
    with get_db() as db:
        db.execute('SELECT password_hash FROM households WHERE household_id=1');hashed=db.fetchone()['password_hash']
        for i in range(51):
            db.execute('''INSERT INTO households (purok_id,family_head_name,registration_date,password_hash,account_status)
              VALUES (1,?,'2026-10-13T12:00:00+00:00',?,'pending')''',(f'Isolated Application {i:02}',hashed))
    response=client.get('/api/residents/registrations',headers=headers['admin'])
    assert response.status_code==200
    rows=response.json['registrations']
    assert len(rows)==53 and sum(row['account_status']=='pending' for row in rows)==51
    ids=[row['household_id'] for row in rows];assert ids==sorted(ids,reverse=True)
