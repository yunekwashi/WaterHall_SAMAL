"""Durable push outbox; a protected scheduled request drains bounded work."""
import datetime
import json
import logging
import os

from backend.db_adapter import get_db
from backend.security import validate_push
from pywebpush import WebPushException, webpush

log = logging.getLogger(__name__)


def enqueue(title, body, target_audience='Everyone', tag=None, extra_data=None, db=None):
    if not os.getenv('VAPID_PRIVATE_KEY'):
        return {'status': 'skipped', 'reason': 'push_not_configured'}
    if db is None:
        with get_db() as connection:
            return enqueue(title, body, target_audience, tag, extra_data, connection)
    role = {'Residents only': 'resident', 'Workers only': 'worker'}.get(target_audience)
    query = 'SELECT sub_id FROM push_subscriptions WHERE is_active = 1'
    db.execute(query + (' AND role = ?' if role else ''), (role,) if role else None)
    subscriptions = db.fetchall()
    for sub in subscriptions:
        payload = {'sub_id': sub['sub_id'], 'notification': {
            'title': title, 'body': body, 'tag': tag, 'icon': '/logo.png',
            'data': extra_data or {'url': '/'}}}
        db.execute('INSERT INTO push_outbox (payload, target_audience) VALUES (?, ?)',
                   (json.dumps(payload), target_audience))
    return {'status': 'queued', 'count': len(subscriptions)}


def drain(limit=10):
    processed = 0
    for _ in range(limit):
        now = datetime.datetime.now(datetime.timezone.utc)
        with get_db() as db:
            if not db.is_pg:
                db.execute('BEGIN IMMEDIATE')
            db.execute("""SELECT * FROM push_outbox WHERE attempts < 5 AND
                (status = 'pending' OR (status = 'sending' AND lease_until < ?))
                ORDER BY id LIMIT 1""" + (' FOR UPDATE SKIP LOCKED' if db.is_pg else ''), (now.isoformat(),))
            job = db.fetchone()
            if not job:
                break
            db.execute("UPDATE push_outbox SET status = 'sending', attempts = attempts + 1, lease_until = ? WHERE id = ?",
                       ((now + datetime.timedelta(minutes=2)).isoformat(), job['id']))
        content = json.loads(job['payload'])
        with get_db() as db:
            db.execute('SELECT * FROM push_subscriptions WHERE sub_id = ? AND is_active = 1', (content['sub_id'],))
            subscription = db.fetchone()
        status, expired = 'sent', False
        if subscription:
            try:
                validate_push(subscription['endpoint'], subscription['p256dh'], subscription['auth'])
                webpush(subscription_info={'endpoint': subscription['endpoint'], 'keys': {
                    'p256dh': subscription['p256dh'], 'auth': subscription['auth']}},
                    data=json.dumps(content['notification']),
                    vapid_private_key=os.environ['VAPID_PRIVATE_KEY'],
                    vapid_claims={'sub': 'mailto:' + os.environ['VAPID_CLAIMS_EMAIL']}, timeout=5)
            except WebPushException as exc:
                code = getattr(getattr(exc, 'response', None), 'status_code', None)
                expired = code in (404, 410)
                status = 'sent' if expired else ('failed' if job['attempts'] >= 4 else 'pending')
                log.warning('Push delivery failed: outbox_id=%s status=%s', job['id'], code)
            except Exception:
                status = 'failed' if job['attempts'] >= 4 else 'pending'
                log.warning('Push delivery failed: outbox_id=%s', job['id'])
        with get_db() as db:
            db.execute('UPDATE push_outbox SET status = ?, lease_until = NULL WHERE id = ?', (status, job['id']))
            if expired:
                db.execute('UPDATE push_subscriptions SET is_active = 0 WHERE sub_id = ?', (subscription['sub_id'],))
        processed += 1
        if status == 'pending':
            break  # Backoff until next invocation rather than hot-looping retries.
    return processed
