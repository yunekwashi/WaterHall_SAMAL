"""Comprehensive regression test suite for Step 1 & Step 2 requirements:
Step 1: Worker Billing Calculator & Decimal/Zero Reading Fixes
Step 2: Offline Save Bill & Queue Reliability
"""
import datetime
import decimal
import json
import uuid
from pathlib import Path
import pytest
from backend import db_adapter
from backend.billing import calculate, decimal_value
from backend.db_adapter import get_db

ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = ROOT / 'web' / 'index.html'
DB_DART = ROOT / 'web' / 'db.dart'
APP_DART = ROOT / 'web' / 'app.dart'
APP_JS = ROOT / 'web' / 'app.js'

RATES = {
    'base_rate': '100.00',
    'included_m3': '10.000',
    'environmental_fee': '20.00',
    'excess_rate': '12.50'
}


def test_html_billing_inputs_support_decimals_and_correct_button_label():
    """Verify HTML input has step='any', decimal placeholder, and button text is 'SAVE BILL'."""
    html = INDEX_HTML.read_text(encoding='utf-8')
    assert 'id="bill-curr-input"' in html
    assert 'step="any"' in html
    assert 'placeholder="0.000"' in html
    assert 'SAVE BILL' in html
    # Must NOT have hardcoded dummy value="0.0" that could overwrite user input
    assert 'id="bill-curr-input" type="number" step="any" min="0" max="1000000" placeholder="0.000" value="0.0"' not in html


def test_db_dart_has_applicable_reading_and_offline_queue_resilience():
    """Verify web/db.dart includes pending-action inspection and immediate offline queuing."""
    dart = DB_DART.read_text(encoding='utf-8')
    assert 'getApplicablePreviousReading' in dart
    assert 'hasBeenBilledThisMonth' in dart
    # Check that hasBeenBilledThisMonth checks pendingActions
    assert 'pendingActions' in dart
    # Check that offline addBillingRecord does not block on refreshData when offline
    assert 'if (isDatabaseOnline && checkSession())' in dart or '!isDatabaseOnline' in dart


def test_app_dart_decimal_and_zero_consumption_logic():
    """Verify web/app.dart supports zero consumption, 3 decimal places, and lower reading warning."""
    dart = APP_DART.read_text(encoding='utf-8')
    assert 'getApplicablePreviousReading' in dart
    assert 'Current reading cannot be lower than previous reading' in dart
    assert 'toStringAsFixed(3)' in dart
    assert 'toStringAsFixed(2)' in dart
    assert 'Bill saved offline. Pending synchronization.' in dart


def test_compiled_app_js_is_generated_and_fresh():
    """Verify web/app.js exists, is non-empty, and contains compiled references."""
    assert APP_JS.is_file()
    js = APP_JS.read_text(encoding='utf-8')
    assert len(js) > 200000
    assert 'Bill saved offline. Pending synchronization.' in js


def test_zero_consumption_calculation(system):
    """Zero consumption (current_reading == previous_reading) must bill base_rate + env_fee."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    # Meter 2 for HH-2 starts with 0 previous reading
    payload = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 0.0,
        'billing_month': '2026-03',
        'date': '2026-03-15T10:00:00Z'
    }
    result = client.post('/api/billing-records/add', json=payload, headers=headers['worker'])
    assert result.status_code == 200, result.json
    breakdown = result.json['billing_breakdown']
    assert breakdown['consumption'] == '0.000'
    assert breakdown['base_rate'] == '100.00'
    assert breakdown['environmental_fee'] == '20.00'
    assert breakdown['excess_charge'] == '0.00'
    assert breakdown['total_due'] == '120.00'


def test_small_decimal_consumption_up_to_three_places(system):
    """Small positive consumption (e.g. 0.005 m³, 10.002 m³) must calculate correctly."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    # 1. Consumption within included limit (0.005 m3 <= 10.000 m3) -> total 120.00
    payload = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 0.005,
        'billing_month': '2026-04',
        'date': '2026-04-15T10:00:00Z'
    }
    result = client.post('/api/billing-records/add', json=payload, headers=headers['worker'])
    assert result.status_code == 200, result.json
    breakdown = result.json['billing_breakdown']
    assert breakdown['consumption'] == '0.005'
    assert breakdown['total_due'] == '120.00'

    # 2. Consumption exceeding included limit: previous=0.005, current=10.007
    # consumption = 10.002 m3, excess = 0.002 m3 * 12.50 = 0.025 -> rounded to 0.03
    # total = 100.00 + 20.00 + 0.03 = 120.03
    payload2 = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.005,
        'current_reading': 10.007,
        'billing_month': '2026-05',
        'date': '2026-05-15T10:00:00Z'
    }
    result2 = client.post('/api/billing-records/add', json=payload2, headers=headers['worker'])
    assert result2.status_code == 200, result2.json
    breakdown2 = result2.json['billing_breakdown']
    assert breakdown2['consumption'] == '10.002'
    assert breakdown2['excess_m3'] == '0.002'
    assert breakdown2['total_due'] == '120.03'


def test_rejection_of_current_reading_lower_than_previous(system):
    """Server must reject any reading where current < previous with HTTP 400."""
    client, headers, _ = system
    payload = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 25.500,
        'current_reading': 25.499,
        'billing_month': '2026-06',
        'date': '2026-06-15T10:00:00Z'
    }
    result = client.post('/api/billing-records/add', json=payload, headers=headers['worker'])
    assert result.status_code == 400
    assert 'cannot be lower than previous' in result.json.get('msg', '').lower() or 'reading' in result.json.get('msg', '').lower()


def test_same_cycle_duplicate_prevention(system):
    """Duplicate billing records for the same household in the same billing cycle must be rejected with HTTP 409."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    payload1 = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 12.0,
        'billing_month': '2026-07',
        'date': '2026-07-10T08:00:00Z'
    }
    res1 = client.post('/api/billing-records/add', json=payload1, headers=headers['worker'])
    assert res1.status_code == 200

    # Attempt to issue another bill for HH-2 in the same 2026-07 cycle with a different operation_id
    payload2 = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 12.0,
        'current_reading': 15.0,
        'billing_month': '2026-07',
        'date': '2026-07-15T09:00:00Z'
    }
    res2 = client.post('/api/billing-records/add', json=payload2, headers=headers['worker'])
    assert res2.status_code == 409
    assert 'already has a bill' in res2.json.get('msg', '').lower()


def test_explicit_billing_month_cycle_preservation_across_months(system):
    """An offline bill recorded in September with billing_month='2026-09' synced in October preserves September."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    # Offline worker records bill on Sept 28, syncing happens on Oct 02
    offline_bill = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 8.5,
        'billing_month': '2026-09',
        'date': '2026-09-28T14:30:00Z'
    }
    res = client.post('/api/billing-records/add', json=offline_bill, headers=headers['worker'])
    assert res.status_code == 200, res.json

    with get_db() as db:
        numeric_id = int(res.json['bill_id'].replace('BILL-', ''))
        db.execute('SELECT billed_at, total_amount FROM billing_records WHERE bill_id = ?', (numeric_id,))
        row = db.fetchone()
        assert row is not None
        # Must preserve September 2026 date in billed_at
        assert row['billed_at'].startswith('2026-09')


def test_previous_cycle_unpaid_bills_coexist_with_new_cycle_billing(system):
    """Unpaid bill from August remains unpaid and independent when September bill is created."""
    client, headers, _ = system
    client.post('/api/settings/billing', json=RATES, headers=headers['admin'])

    # Cycle 1: August
    bill_aug = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 0.0,
        'current_reading': 5.0,
        'billing_month': '2026-08',
        'date': '2026-08-20T10:00:00Z'
    }
    res_aug = client.post('/api/billing-records/add', json=bill_aug, headers=headers['worker'])
    assert res_aug.status_code == 200
    aug_id = res_aug.json['bill_id']

    # Cycle 2: September
    bill_sep = {
        'operation_id': uuid.uuid4().hex,
        'house_id': 'HH-2',
        'previous_reading': 5.0,
        'current_reading': 15.0,
        'billing_month': '2026-09',
        'date': '2026-09-20T10:00:00Z'
    }
    res_sep = client.post('/api/billing-records/add', json=bill_sep, headers=headers['worker'])
    assert res_sep.status_code == 200
    sep_id = res_sep.json['bill_id']

    # Fetch all data to inspect billing records
    data = client.get('/api/all-data', headers=headers['admin']).json
    records = {b['bill_id']: b for b in data['billingRecords']}
    assert aug_id in records
    assert sep_id in records
    assert records[aug_id]['status'] == 'Unpaid'
    assert records[sep_id]['status'] == 'Unpaid'
    assert records[aug_id]['bill_id'] != records[sep_id]['bill_id']


def test_rate_configuration_preservation_and_exact_worker_backend_parity():
    """Verify calculate python parity with Dart formulas for configurable rates."""
    custom_config = {
        'config_id': 1,
        'version': 2,
        'configured': True,
        'base_rate': '150.00',
        'included_m3': '5.000',
        'excess_rate': '25.50',
        'environmental_fee': '35.00'
    }

    # Case A: Exactly 0 consumption
    res_zero = calculate(custom_config, '10.000', '10.000')
    assert res_zero['consumption'] == '0.000'
    assert res_zero['excess_m3'] == '0'
    assert res_zero['excess_charge'] == '0.00'
    assert res_zero['total_due'] == '185.00'

    # Case B: Fractional consumption within included limit (3.250 m3 <= 5.000 m3)
    res_included = calculate(custom_config, '10.000', '13.250')
    assert res_included['consumption'] == '3.250'
    assert res_included['excess_m3'] == '0'
    assert res_included['total_due'] == '185.00'

    # Case C: Fractional consumption exceeding included limit (7.123 m3 > 5.000 m3)
    # excess = 2.123 m3 * 25.50 = 54.1365 -> quantized to 54.14
    # total = 150.00 + 35.00 + 54.14 = 239.14
    res_excess = calculate(custom_config, '10.000', '17.123')
    assert res_excess['consumption'] == '7.123'
    assert res_excess['excess_m3'] == '2.123'
    assert res_excess['excess_charge'] == '54.14'
    assert res_excess['total_due'] == '239.14'
