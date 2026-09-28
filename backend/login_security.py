"""Consecutive-password lockout shared across Vercel instances and login aliases."""
import hashlib
import hmac
import math
import secrets
import time
from werkzeug.security import check_password_hash, generate_password_hash
from backend import config

_DUMMY_HASH = generate_password_hash(secrets.token_urlsafe(32))
MAX_FAILURES = 5
LOCK_SECONDS = 300


def clock():
    return time.time()


def attempt(db, account_key, supplied, password_hash):
    # HMAC avoids keeping raw unknown usernames/contact numbers in this table.
    digest = hmac.new(config.SECRET_KEY.encode(), account_key.encode(), hashlib.sha256).hexdigest()
    now = clock()
    if not db.is_pg:
        db.execute('BEGIN IMMEDIATE')
    db.execute('DELETE FROM login_attempts WHERE updated_at < ? AND (failures = 0 OR (locked_until > 0 AND locked_until < ?))', (now - 86400, now - 86400))
    db.execute('''INSERT INTO login_attempts (identifier_digest, failures, locked_until, updated_at)
                  VALUES (?, 0, 0, ?) ON CONFLICT (identifier_digest) DO NOTHING''', (digest, now))
    db.execute('SELECT * FROM login_attempts WHERE identifier_digest = ?' + (' FOR UPDATE' if db.is_pg else ''), (digest,))
    state = db.fetchone()
    if state['locked_until'] > now:
        return False, 0, math.ceil(state['locked_until'] - now)
    failures = 0 if state['locked_until'] else state['failures']
    valid = check_password_hash(password_hash or _DUMMY_HASH, supplied) and password_hash is not None
    if valid:
        db.execute('UPDATE login_attempts SET failures = 0, locked_until = 0, updated_at = ? WHERE identifier_digest = ?', (now, digest))
        return True, MAX_FAILURES, 0
    failures += 1
    locked = now + LOCK_SECONDS if failures >= MAX_FAILURES else 0
    db.execute('UPDATE login_attempts SET failures = ?, locked_until = ?, updated_at = ? WHERE identifier_digest = ?',
               (failures, locked, now, digest))
    return False, max(0, MAX_FAILURES - failures), LOCK_SECONDS if locked else 0
