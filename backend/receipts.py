"""Read-only paid-bill receipts; no payment, rate or account mutations."""
import datetime
import re
from decimal import Decimal

from flask import abort
from backend.db_adapter import get_db
from backend.security import identifier


def read(args):
    if set(args) - {'billing_month', 'purok', 'search', 'house_id', 'view', 'page', 'limit'}:
        abort(400, description='Unknown receipt filter')
    month = args.get('billing_month', '')
    if not re.fullmatch(r'[0-9]{4}-(0[1-9]|1[0-2])', month) or not 2000 <= int(month[:4]) <= 2100:
        abort(400, description='Choose a valid billing month')
    view = args.get('view', 'receipts')
    if view not in ('recipients', 'receipts'):
        abort(400, description='Invalid receipt view')
    values = []
    for key, default, maximum in [('page', '1', 100000), ('limit', '25', 50)]:
        raw = args.get(key, default)
        if not re.fullmatch(r'[1-9][0-9]{0,5}', raw) or int(raw) > maximum:
            abort(400, description='Invalid receipt pagination')
        values.append(int(raw))
    page, limit = values
    purok, search = args.get('purok', 'All'), args.get('search', '').strip()
    if len(purok) > 80 or len(search) > 100 or '\x00' in purok + search:
        abort(400, description='Invalid receipt filter')
    where = "b.payment_status='Paid' AND b.total_amount IS NOT NULL AND b.total_amount >= 0 AND b.billed_at LIKE ?"
    params = [month + '%']
    if purok != 'All':
        where += ' AND p.purok_name=?'
        params.append(purok)
    if args.get('house_id'):
        where += ' AND h.household_id=?'
        params.append(identifier(args['house_id'], 'HH-'))
    if search:
        where += " AND LOWER(h.family_head_name) LIKE LOWER(?) ESCAPE '!'"
        params.append('%' + search.replace('!', '!!').replace('%', '!%').replace('_', '!_') + '%')
    joins = '''FROM billing_records b JOIN water_meters m ON m.meter_id=b.meter_id
        JOIN households h ON h.household_id=m.household_id
        LEFT JOIN puroks p ON p.purok_id=h.purok_id
        LEFT JOIN users u ON u.user_id=b.collected_by'''
    with get_db() as db:
        # Each page's count and records share one PostgreSQL snapshot.
        if db.is_pg:
            db.execute('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY')
        else:
            db.execute('BEGIN')
        count = 'COUNT(DISTINCT h.household_id)' if view == 'recipients' else 'COUNT(*)'
        db.execute(f'SELECT {count} AS n {joins} WHERE {where}', tuple(params))
        total = db.fetchone()['n']
        if view == 'recipients':
            db.execute(f'''SELECT h.household_id,h.family_head_name,COUNT(*) AS receipt_count {joins}
                WHERE {where} GROUP BY h.household_id,h.family_head_name
                ORDER BY LOWER(h.family_head_name),h.household_id LIMIT ? OFFSET ?''', tuple(params + [limit, (page - 1) * limit]))
            rows = [{'house_id': f"HH-{r['household_id']}", 'name': r['family_head_name'], 'receipt_count': r['receipt_count']} for r in db.fetchall()]
        else:
            db.execute(f'''SELECT b.bill_id,b.total_amount,b.payment_date,h.household_id,h.family_head_name,
                m.serial_number,u.username AS received_by {joins} WHERE {where}
                ORDER BY b.bill_id DESC LIMIT ? OFFSET ?''', tuple(params + [limit, (page - 1) * limit]))
            rows = []
            for r in db.fetchall():
                amount = Decimal(str(r['total_amount']))
                if not amount.is_finite():
                    abort(409, description='A paid record needs review before printing')
                date = r['payment_date']
                try:
                    datetime.datetime.fromisoformat(date.replace('Z', '+00:00'))
                except (TypeError, ValueError, AttributeError):
                    date = None  # Legacy missing data must not become a fabricated date.
                rows.append({'bill_id': f"BILL-{r['bill_id']}", 'house_id': f"HH-{r['household_id']}",
                    'name': r['family_head_name'], 'account_number': r['serial_number'], 'billing_month': month,
                    'amount_paid': format(amount.quantize(Decimal('.01')), '.2f'), 'payment_date': date,
                    'received_by': r['received_by'], 'status': 'Paid', 'transactions': []})
            if rows:
                ids = [int(r['bill_id'][5:]) for r in rows]
                db.execute('SELECT bill_id,transaction_id,payment_method FROM payment_collections WHERE bill_id IN (' + ','.join('?' for _ in ids) + ') ORDER BY collection_id', tuple(ids))
                by_id = {r['bill_id']: r for r in rows}
                for tx in db.fetchall():
                    by_id[f"BILL-{tx['bill_id']}"]['transactions'].append({'reference': tx['transaction_id'], 'method': tx['payment_method']})
    return {'status': 'success', 'billing_month': month, 'page': page, 'limit': limit,
            'total': total, 'has_more': page * limit < total, view: rows}
