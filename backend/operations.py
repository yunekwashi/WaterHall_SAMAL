"""Idempotency records live in the same transaction as the mutation they protect."""
import hashlib
import json
from flask import abort, request
from backend.security import principal, text


def begin(db, data):
    operation_id = text(data.get('operation_id'), 'operation ID', 100, 16)
    actor = principal()['id']
    fingerprint = hashlib.sha256((request.path + json.dumps(data, sort_keys=True, separators=(',', ':'))).encode()).hexdigest()
    if not db.is_pg:
        db.execute('BEGIN IMMEDIATE')
    db.execute('''INSERT INTO sync_operations (operation_id, actor, request_hash, response_json)
                  VALUES (?, ?, ?, '{}') ON CONFLICT (operation_id) DO NOTHING''', (operation_id, actor, fingerprint))
    if db.rowcount:
        return operation_id, None
    db.execute('SELECT * FROM sync_operations WHERE operation_id = ?', (operation_id,))
    existing = db.fetchone()
    if existing['actor'] != actor or existing['request_hash'] != fingerprint:
        abort(409, description='Operation ID already used with different data')
    return operation_id, json.loads(existing['response_json'])


def finish(db, operation_id, response):
    db.execute('UPDATE sync_operations SET response_json = ? WHERE operation_id = ?', (json.dumps(response), operation_id))
    return response
