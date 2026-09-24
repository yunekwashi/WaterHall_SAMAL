"""Atomic payment synchronization, including safe acknowledgements after retries."""
import hashlib
import json
from decimal import Decimal

from flask import abort
from backend.db_adapter import get_db
from backend.security import identifier, number, require_role, text, timestamp


def synchronize(data):
    actor = require_role('worker', 'admin')
    records = data.get('collections')
    if not isinstance(records, list) or not 1 <= len(records) <= 100:
        abort(400, description='collections must contain 1 to 100 records')
    acknowledged, duplicates = [], 0
    with get_db() as db:
        if not db.is_pg:
            db.execute('BEGIN IMMEDIATE')
        for record in records:
            if not isinstance(record, dict):
                abort(400, description='Invalid collection')
            tx = text(record.get('transaction_id'), 'transaction ID', 100)
            hh = identifier(record.get('house_id', record.get('household_id')), 'HH-')
            amount = Decimal(str(number(record.get('amount_collected', record.get('amount')), 'amount', .01)))
            if amount != amount.quantize(Decimal('.01')):
                abort(400, description='Amount may have at most two decimal places')
            date = timestamp(record.get('date') or record.get('collection_date') or record.get('collected_at'))
            collector = record.get('collected_by', record.get('worker_id'))
            if collector != actor['id']:
                abort(403, description='Collection belongs to another worker; sign in as its owner')
            method = record.get('payment_method', 'Cash')
            if method not in ('Cash', 'GCash', 'Bank Transfer'):
                abort(400, description='Invalid payment method')
            bill = identifier(record['bill_id'], 'BILL-') if record.get('bill_id') else None
            canonical = [actor['id'], hh, bill, str(amount.quantize(Decimal('.01'))), date, method]
            digest = hashlib.sha256(json.dumps(canonical).encode()).hexdigest()
            # Serialize collections against a household, even when different devices use
            # different operation IDs. A second payment cannot settle an already-paid bill.
            db.execute('SELECT household_id FROM households WHERE household_id = ?' + (' FOR UPDATE' if db.is_pg else ''), (hh,))
            if not db.fetchone():
                abort(404, description='Household not found')
            db.execute('SELECT request_hash, collected_by FROM payment_collections WHERE transaction_id = ?', (tx,))
            old = db.fetchone()
            if old:
                if old['request_hash'] != digest or old['collected_by'] != actor['id']:
                    abort(409, description='Transaction ID already used with different data')
                duplicates += 1
                acknowledged.append(tx)
                continue
            if actor['role'] == 'worker':
                db.execute("SELECT setting_value FROM payment_settings WHERE setting_key = 'allow_worker_collection'")
                setting = db.fetchone()
                if setting and setting['setting_value'].lower() != 'true':
                    abort(403, description='Worker collection is disabled')
            sql = """SELECT b.bill_id, b.total_amount, b.payment_status FROM billing_records b
                     JOIN water_meters m ON m.meter_id = b.meter_id WHERE m.household_id = ?"""
            params = [hh]
            if bill:
                sql += ' AND b.bill_id = ?'
                params.append(bill)
            else:
                sql += " AND b.payment_status = 'Unpaid'"
            db.execute(sql, params)
            bills = db.fetchall()
            if not bills or any(b['payment_status'] != 'Unpaid' for b in bills):
                abort(409, description='No matching unpaid bill')
            due = sum(Decimal(str(b['total_amount'])).quantize(Decimal('.01')) for b in bills)
            if amount != due:
                abort(409, description='Amount must equal the selected unpaid bill total; refresh bills before retrying')
            db.execute('''INSERT INTO payment_collections
                (transaction_id, bill_id, household_id, amount_collected, collection_date, collected_by, payment_method, request_hash)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT (transaction_id) DO NOTHING''',
                (tx, bill, hh, float(amount), date, actor['id'], method, digest))
            if db.rowcount == 0:
                abort(409, description='Transaction ID conflict; retry the original operation')
            for selected in bills:
                db.execute("UPDATE billing_records SET payment_status = 'Paid', payment_date = ?, collected_by = ?, is_synced = 1 WHERE bill_id = ?",
                           (date, actor['record']['user_id'], selected['bill_id']))
            acknowledged.append(tx)
    # The context has committed before any operation is acknowledged to the device.
    return {'status': 'success', 'synced_ids': acknowledged,
            'synced_count': len(acknowledged) - duplicates, 'duplicates_ignored': duplicates}
