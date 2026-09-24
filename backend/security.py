"""Shared validation and database-backed authorization (never client roles)."""
import base64
import hashlib
import math
import re
from datetime import datetime, timezone, timedelta
from urllib.parse import urlparse

from flask import abort, g
from flask_jwt_extended import get_jwt, get_jwt_identity
from backend.db_adapter import get_db


def text(value, field, maximum=200, minimum=1):
    if not isinstance(value, str) or not minimum <= len(value.strip()) <= maximum or '\x00' in value:
        abort(400, description=f'Invalid {field}')
    return value.strip()


def password(value):
    if not isinstance(value, str) or not 12 <= len(value) <= 128:
        abort(400, description='Password must contain 12 to 128 characters')
    return value


def number(value, field, minimum=0, maximum=1000000):
    try:
        result = float(value)
    except (TypeError, ValueError):
        abort(400, description=f'Invalid {field}')
    if isinstance(value, bool) or not math.isfinite(result) or not minimum <= result <= maximum:
        abort(400, description=f'Invalid {field}')
    return result


def identifier(value, prefix=''):
    raw = str(value)
    if prefix and raw.upper().startswith(prefix):
        raw = raw[len(prefix):]
    if not re.fullmatch(r'[1-9][0-9]{0,9}', raw):
        abort(400, description='Invalid record ID')
    return int(raw)


def timestamp(value):
    try:
        result = datetime.fromisoformat(text(value, 'date', 40).replace('Z', '+00:00'))
        result = result.replace(tzinfo=timezone.utc) if result.tzinfo is None else result
        if result > datetime.now(timezone.utc).replace(microsecond=0) + timedelta(minutes=5):
            raise ValueError()
        return result.astimezone(timezone.utc).isoformat()
    except ValueError:
        abort(400, description='Invalid date')


def principal():
    if hasattr(g, 'principal'):
        return g.principal
    identity = get_jwt_identity()
    claims = get_jwt()
    # Namespace and password fingerprint invalidate old/forged identity conventions,
    # deleted users, changed passwords, and stale roles.
    kind = claims.get('kind')
    with get_db() as db:
        if kind == 'resident' and isinstance(identity, str) and identity.startswith('HH-'):
            db.execute('SELECT household_id, password_hash, family_head_name FROM households WHERE household_id = ?', (identifier(identity, 'HH-'),))
            row = db.fetchone()
            role = 'resident'
        elif kind == 'staff':
            db.execute('SELECT user_id, username, password_hash, full_name, role FROM users WHERE username = ?', (identity,))
            row = db.fetchone()
            role = 'admin' if row and row['role'] == 'Admin' else 'worker'
        else:
            abort(401, description='Please sign in again')
    if not row or claims.get('credential') != hashlib.sha256(row['password_hash'].encode()).hexdigest():
        abort(401, description='Please sign in again')
    g.principal = {'id': identity, 'role': role, 'record': row}
    return g.principal


def require_role(*roles):
    who = principal()
    if who['role'] not in roles:
        abort(403, description='Insufficient permissions')
    return who


def claims_for(password_hash, kind):
    return {'kind': kind, 'credential': hashlib.sha256(password_hash.encode()).hexdigest()}


def validate_push(endpoint, p256dh, auth):
    try:
        parsed = urlparse(text(endpoint, 'push endpoint', 2048))
        port = parsed.port
    except ValueError:
        abort(400, description='Invalid push endpoint')
    # Prevent server-side requests to arbitrary/private URLs. Only browser push services.
    allowed = ('fcm.googleapis.com', 'updates.push.services.mozilla.com', 'web.push.apple.com')
    host = parsed.hostname or ''
    if (parsed.scheme != 'https' or parsed.username or parsed.password or port not in (None, 443)
            or parsed.fragment or not (host in allowed or host.endswith('.notify.windows.com'))):
        abort(400, description='Unsupported push service')
    try:
        pub = base64.urlsafe_b64decode(p256dh + '=' * (-len(p256dh) % 4))
        key = base64.urlsafe_b64decode(auth + '=' * (-len(auth) % 4))
        from cryptography.hazmat.primitives.asymmetric.ec import EllipticCurvePublicKey, SECP256R1
        EllipticCurvePublicKey.from_encoded_point(SECP256R1(), pub)
        if len(key) != 16:
            raise ValueError()
    except (ValueError, TypeError):
        abort(400, description='Invalid push keys')
