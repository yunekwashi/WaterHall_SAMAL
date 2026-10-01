"""Comprehensive tests for Step 3: Admin In-Office Payment Processing and Barangay Hall Settlement.
Tests:
- Admin payment confirmation
- Unauthorized Worker payment attempt
- Unauthorized Resident payment attempt
- Unauthenticated payment attempt
- Duplicate payment prevention
- Concurrent payment confirmation
- Correct payment audit information
- Preservation of existing unpaid bills
- Historical billing accuracy
- Admin table alignment and DOM elements
- Resident payment status consistency
- Barangay-only payment policy enforcement for worker collection
"""
import uuid
from concurrent.futures import ThreadPoolExecutor
from decimal import Decimal
from pathlib import Path
import pytest
from backend.db_adapter import get_db
from backend.server import app

ROOT = Path(__file__).resolve().parents[1]
ADMIN_INDEX_HTML = ROOT / 'admin_web' / 'index.html'
ADMIN_APP_JS = ROOT / 'admin_web' / 'app.js'
WEB_INDEX_HTML = ROOT / 'web' / 'index.html'
WEB_DB_DART = ROOT / 'web' / 'db.dart'
WEB_APP_DART = ROOT / 'web' / 'app.dart'

RATES = {
    'base_rate': '100.00',
    'included_m3': '10.000',
    'environmental_fee': '20.00',
    'excess_rate': '12.50'
}


def test_admin_table_alignment_and_elements():
    """Requirement: Add Action column and fix billing table alignment to 8 columns."""
    html = ADMIN_INDEX_HTML.read_text(encoding='utf-8')
    assert '<th style="text-align:center;">Action</th>' in html or '<th>Action</th>' in html
    assert 'modal-mark-paid' in html
    assert 'pay-modal-bill-id' in html
    assert 'pay-modal-household' in html
    assert 'pay-modal-cycle' in html
    assert 'pay-modal-amount' in html
    assert 'pay-modal-date' in html
    assert 'pay-modal-method' in html
    assert 'btn-pay-modal-confirm' in html

    js = ADMIN_APP_JS.read_text(encoding='utf-8')
    assert 'colspan="8"' in js
    assert 'btn-mark-paid' in js
    assert 'openMarkAsPaidModal' in js
    assert '/api/admin/billing/mark-paid' in js


def test_worker_field_collection_ui_disabled_notice():
    """Requirement: Disable worker field payment collections with policy notice."""
    html = WEB_INDEX_HTML.read_text(encoding='utf-8')
    assert 'Field Collection Disabled' in html or 'disabled' in html
    assert 'Barangay Policy Notice' in html

    dart_db = WEB_DB_DART.read_text(encoding='utf-8')
    assert "'allow_worker_collection': 'false'" in dart_db

    dart_app = WEB_APP_DART.read_text(encoding='utf-8')
    assert "Field payment collection is disabled" in dart_app


def test_admin_payment_confirmation(system):
    """Admin confirms in-person payment: updates bill to Paid and creates audit collection."""
    client, headers, _ = system
    # Bill 1 exists in fixture for meter 1 (amount 170.00, unpaid)
    payload = {
        'bill_id': 'BILL-1',
        'payment_method': 'Cash (Barangay Hall)',
        'payment_date': '2026-09-30T10:00:00Z'
    }
    response = client.post('/api/admin/billing/mark-paid', json=payload, headers=headers['admin'])
    assert response.status_code == 200, response.json
    res_data = response.json
    assert res_data['status'] == 'success'
    assert res_data['bill_id'] == 'BILL-1'
    assert res_data['payment_status'] == 'Paid'
    assert res_data['amount_paid'] == 170.0
    assert res_data['confirmed_by'] == 'admin'

    # Verify DB state: billing record updated, NO fake worker field collection created
    with get_db() as db:
        db.execute('SELECT payment_status, payment_date, collected_by FROM billing_records WHERE bill_id = 1')
        b = db.fetchone()
        assert b['payment_status'] == 'Paid'
        assert '2026-09-30' in b['payment_date']
        assert b['collected_by'] is not None

        # Check 1: In-office payments must NOT create fake field collection transactions
        db.execute('SELECT COUNT(*) AS count FROM payment_collections WHERE bill_id = 1')
        assert db.fetchone()['count'] == 0


def test_unauthorized_worker_payment_attempt(system):
    """Worker cannot access admin in-office mark-paid endpoint (HTTP 403)."""
    client, headers, _ = system
    payload = {'bill_id': 'BILL-1', 'payment_method': 'Cash'}
    response = client.post('/api/admin/billing/mark-paid', json=payload, headers=headers['worker'])
    assert response.status_code == 403


def test_unauthorized_resident_payment_attempt(system):
    """Resident cannot access admin in-office mark-paid endpoint (HTTP 403)."""
    client, headers, _ = system
    payload = {'bill_id': 'BILL-1', 'payment_method': 'Cash'}
    response = client.post('/api/admin/billing/mark-paid', json=payload, headers=headers['HH-1'])
    assert response.status_code == 403


def test_unauthenticated_payment_attempt(system):
    """Unauthenticated request must be rejected (HTTP 401)."""
    client, _, _ = system
    payload = {'bill_id': 'BILL-1'}
    response = client.post('/api/admin/billing/mark-paid', json=payload)
    assert response.status_code == 401


def test_duplicate_payment_prevention(system):
    """Marking an already paid bill must return HTTP 409 conflict."""
    client, headers, _ = system
    payload = {'bill_id': 'BILL-1'}
    first = client.post('/api/admin/billing/mark-paid', json=payload, headers=headers['admin'])
    assert first.status_code == 200

    second = client.post('/api/admin/billing/mark-paid', json=payload, headers=headers['admin'])
    assert second.status_code == 409
    assert 'already been paid' in second.json.get('msg', '').lower() or 'already' in second.json.get('msg', '').lower()


def test_concurrent_payment_confirmation(system):
    """Concurrent payment confirmation attempts: exactly one succeeds and one gets 409."""
    _, headers, _ = system
    payload = {'bill_id': 'BILL-1', 'payment_method': 'Cash (Barangay Hall)'}

    def pay(_):
        with app.test_client() as c:
            return c.post('/api/admin/billing/mark-paid', json=payload, headers=headers['admin']).status_code

    with ThreadPoolExecutor(max_workers=2) as executor:
        statuses = sorted(list(executor.map(pay, range(2))))

    assert statuses == [200, 409]


def test_correct_payment_audit_information(system):
    """Admin in-office payment attributes responsible admin on bill without corrupting worker collections audit."""
    client, headers, _ = system
    client.post('/api/admin/billing/mark-paid', json={'bill_id': 'BILL-1'}, headers=headers['admin'])

    # Bill shows paid_to admin in billing statements
    all_data = client.get('/api/all-data', headers=headers['admin']).json
    bill = next(b for b in all_data['billingRecords'] if b['bill_id'] == 'BILL-1')
    assert bill['status'] == 'Paid'
    assert bill['paid_to'] == 'admin'

    # Check 1: In-office payment is NOT misrepresented as a synchronized worker offline collection
    res = client.get('/api/collections/history', headers=headers['admin'])
    assert res.status_code == 200
    collections = res.json['collections']
    assert not any(c.get('bill_id') == 1 for c in collections)


def test_preservation_of_existing_unpaid_bills(system):
    """Paying Bill A must NOT automatically mark Bill B as paid; each bill is independent."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    # Create Bill 2 for HH-2
    b2 = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 10.0,
        'billing_month': '2026-08',
        'date': '2026-08-20T10:00:00Z'
    }
    res2 = client.post('/api/billing-records/add', json=b2, headers=headers['worker'])
    assert res2.status_code == 200
    bill2_id = res2.json['bill_id']

    # Create Bill 3 for HH-2 (next cycle)
    b3 = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 10.0,
        'current_reading': 20.0,
        'billing_month': '2026-09',
        'date': '2026-09-20T10:00:00Z'
    }
    res3 = client.post('/api/billing-records/add', json=b3, headers=headers['worker'])
    assert res3.status_code == 200
    bill3_id = res3.json['bill_id']

    # Admin marks Bill 2 as Paid
    pay_res = client.post('/api/admin/billing/mark-paid', json={'bill_id': bill2_id}, headers=headers['admin'])
    assert pay_res.status_code == 200

    # Fetch all data and verify Bill 2 is Paid, Bill 3 is still Unpaid
    all_data = client.get('/api/all-data', headers=headers['admin']).json
    records = {b['bill_id']: b for b in all_data['billingRecords']}
    assert records[bill2_id]['status'] == 'Paid'
    assert records[bill3_id]['status'] == 'Unpaid'


def test_historical_billing_accuracy_preserved(system):
    """Mark as Paid preserves readings, consumption, total_due, and snapshot immutability."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    b_payload = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 12.250,
        'billing_month': '2026-09',
        'date': '2026-09-25T10:00:00Z'
    }
    create_res = client.post('/api/billing-records/add', json=b_payload, headers=headers['worker'])
    assert create_res.status_code == 200, create_res.json
    bill_id = create_res.json['bill_id']

    # Get bill snapshot before payment
    before = client.get('/api/all-data', headers=headers['admin']).json
    bill_before = next(b for b in before['billingRecords'] if b['bill_id'] == bill_id)

    # Mark as Paid
    pay_res = client.post('/api/admin/billing/mark-paid', json={'bill_id': bill_id}, headers=headers['admin'])
    assert pay_res.status_code == 200

    # Get bill snapshot after payment
    after = client.get('/api/all-data', headers=headers['admin']).json
    bill_after = next(b for b in after['billingRecords'] if b['bill_id'] == bill_id)

    assert bill_after['status'] == 'Paid'
    assert bill_after['previous_reading'] == bill_before['previous_reading']
    assert bill_after['current_reading'] == bill_before['current_reading']
    assert bill_after['consumption'] == bill_before['consumption']
    assert bill_after['total_due'] == bill_before['total_due']
    assert bill_after['billing_breakdown'] == bill_before['billing_breakdown']


def test_resident_payment_status_consistency(system):
    """Resident sees updated payment status (Paid) upon querying their own statements."""
    client, headers, _ = system
    # HH-1 has BILL-1 (initially unpaid)
    data_before = client.get('/api/all-data', headers=headers['HH-1']).json
    assert any(b['bill_id'] == 'BILL-1' and b['status'] == 'Unpaid' for b in data_before['billingRecords'])

    # Admin marks BILL-1 as Paid
    res = client.post('/api/admin/billing/mark-paid', json={'bill_id': 'BILL-1'}, headers=headers['admin'])
    assert res.status_code == 200

    # Resident queries again: BILL-1 must now be Paid
    data_after = client.get('/api/all-data', headers=headers['HH-1']).json
    paid_bill = next(b for b in data_after['billingRecords'] if b['bill_id'] == 'BILL-1')
    assert paid_bill['status'] == 'Paid'
    assert paid_bill['payment_date'] != ''


def test_barangay_only_payment_policy_worker_disabled(system):
    """When allow_worker_collection is 'false', worker cannot submit new collections."""
    client, headers, _ = system
    # Admin enforces policy
    client.post('/api/settings/payment', json={'allow_worker_collection': 'false'}, headers=headers['admin'])

    coll_payload = {
        'collections': [{
            'transaction_id': uuid.uuid4().hex,
            'house_id': 'HH-1',
            'bill_id': 'BILL-1',
            'amount_collected': 170.0,
            'date': '2026-09-30T12:00:00Z',
            'collected_by': 'worker',
            'payment_method': 'Cash'
        }]
    }
    worker_res = client.post('/api/collections/sync', json=coll_payload, headers=headers['worker'])
    assert worker_res.status_code == 403
    assert 'disabled' in worker_res.json.get('msg', '').lower()
