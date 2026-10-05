"""Mobile push delivery regressions against isolated databases."""
import json
import pytest
from backend import notifications
from backend.db_adapter import get_db

@pytest.mark.parametrize('role,owner,audience', [('resident','HH-1','Residents only'),('worker','worker','Workers only')])
def test_offline_push_outbox_sends_latest_applicable_only(system, monkeypatch, role, owner, audience):
    monkeypatch.setenv('VAPID_PRIVATE_KEY', 'test-only-not-a-production-key')
    monkeypatch.setenv('VAPID_CLAIMS_EMAIL', 'test@example.invalid')
    monkeypatch.setattr(notifications,'validate_push',lambda *args:None)
    sent=[]
    monkeypatch.setattr(notifications,'webpush',lambda **kwargs:sent.append(json.loads(kwargs['data'])))
    other = 'Workers only' if role == 'resident' else 'Residents only'
    with get_db() as db:
        db.execute('INSERT INTO push_subscriptions (username,role,endpoint,p256dh,auth) VALUES (?,?,?,?,?)',(owner,role,'https://fcm.googleapis.com/fcm/send/test-only','test','test'))
        for identifier in [100,101,102,103]:
            db.execute('INSERT INTO announcements (id,message,author,target_audience) VALUES (?,?,?,?)',(identifier,'Notice '+str(identifier),'Admin',audience))
            notifications.enqueue('Notice',str(identifier),audience,'announcement-'+str(identifier),db=db)
        db.execute('INSERT INTO announcements (id,message,author,target_audience) VALUES (104,?,?,?)',('Other audience','Admin',other))
    assert notifications.drain(limit=10) == 4
    assert len(sent)==1 and sent[0]['tag']=='announcement-103'
    assert sent[0]['recipient']=={'owner':owner,'role':role}
    assert notifications.drain(limit=10)==0
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS count FROM announcements')
        assert db.fetchone()['count']==5
