"""Read-only receipt selection on disposable SQLite/PostgreSQL data."""
import json
import pytest
from backend.db_adapter import get_db


@pytest.fixture
def receipt_data(system):
    with get_db() as db:
        db.execute("UPDATE households SET family_head_name='Same Resident'")
        for meter, amount, date, status in [(1, '170.25', '2026-10-03', 'Paid'), (2, '222.50', '2026-10-04', 'Paid'),
                                             (1, '99.00', '2026-09-03', 'Paid'), (2, '987.00', '2026-10-06', 'Unpaid')]:
            db.execute('''INSERT INTO billing_records (meter_id,previous_reading,present_reading,consumption_m3,total_amount,payment_status,payment_date,billed_at,collected_by)
                VALUES (?,0,10,10,?,?,?, ?, (SELECT user_id FROM users WHERE username='admin'))''',
                (meter, amount, status, date+'T01:02:00Z' if status == 'Paid' else None, date+'T00:00:00Z'))
    return system


def snapshot():
    with get_db() as db:
        result = []
        for table, pk in [('billing_records', 'bill_id'), ('payment_collections', 'collection_id'), ('users', 'user_id')]:
            db.execute(f'SELECT * FROM {table} ORDER BY {pk}')
            result.append([dict(r) for r in db.fetchall()])
        return result


def test_receipts_are_admin_only_and_read_only(receipt_data):
    client, headers, _ = receipt_data
    before = snapshot()
    path = '/api/admin/receipts?billing_month=2026-10'
    assert client.get(path).status_code == 401
    for role in ['worker', 'HH-1']:
        assert client.get(path, headers=headers[role]).status_code == 403
    data = client.get(path, headers=headers['admin']).json
    assert data['total'] == 2
    assert [r['amount_paid'] for r in data['receipts']] == ['222.50', '170.25']
    assert {r['house_id'] for r in data['receipts']} == {'HH-1', 'HH-2'}
    assert all(r['received_by'] == 'admin' and r['status'] == 'Paid' for r in data['receipts'])
    assert 'password' not in json.dumps(data).lower()
    assert snapshot() == before


@pytest.mark.parametrize('search', ['Same Resident', 'same', 'rESId'])
def test_recipient_full_partial_case_insensitive_search_with_duplicate_names(receipt_data, search):
    client, headers, _ = receipt_data
    response = client.get('/api/admin/receipts', query_string={'billing_month': '2026-10', 'view': 'recipients', 'search': search}, headers=headers['admin'])
    assert response.status_code == 200
    assert {r['house_id'] for r in response.json['recipients']} == {'HH-1', 'HH-2'}
    result = client.get('/api/admin/receipts?billing_month=2026-10&house_id=HH-2', headers=headers['admin']).json
    assert len(result['receipts']) == 1
    assert result['receipts'][0]['amount_paid'] == '222.50'


def test_receipt_month_purok_pagination_and_literal_search(receipt_data):
    client, headers, _ = receipt_data
    def read(**args):
        return client.get('/api/admin/receipts', query_string={'billing_month': '2026-10', **args}, headers=headers['admin']).json
    first, second = read(limit=1), read(limit=1, page=2)
    assert first['has_more'] and not second['has_more']
    assert first['receipts'][0]['bill_id'] != second['receipts'][0]['bill_id']
    assert read(purok='Purok 8')['total'] == 0
    assert read(view='recipients', search='%_')['total'] == 0
    previous = read(billing_month='2026-09')
    assert previous['total'] == 1 and previous['receipts'][0]['amount_paid'] == '99.00'


@pytest.mark.parametrize('args', [{}, {'billing_month': '2026-13'}, {'billing_month': "2026-10' OR 1=1"},
    {'billing_month': '2026-10', 'limit': '51'}, {'billing_month': '2026-10', 'page': '0'},
    {'billing_month': '2026-10', 'house_id': 'HH--1'}, {'billing_month': '2026-10', 'view': 'private'},
    {'billing_month': '2026-10', 'password': 'ignored'}, {'billing_month': '2026-10', 'search': 'x'*101}])
def test_invalid_receipt_scope_rejected(system, args):
    client, headers, _ = system
    assert client.get('/api/admin/receipts', query_string=args, headers=headers['admin']).status_code == 400


def test_zero_amount_and_missing_legacy_details_not_fabricated(receipt_data):
    client, headers, _ = receipt_data
    with get_db() as db:
        db.execute("UPDATE billing_records SET total_amount=0,payment_date='unknown',collected_by=NULL WHERE payment_status='Paid'")
    row = client.get('/api/admin/receipts?billing_month=2026-10&limit=1', headers=headers['admin']).json['receipts'][0]
    assert row['amount_paid'] == '0.00'
    assert row['payment_date'] is None and row['received_by'] is None
    assert row['transactions'] == []
