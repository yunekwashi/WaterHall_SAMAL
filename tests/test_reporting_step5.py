"""Comprehensive automated test suite for Step 5:
WaterHall Reporting and Export Functionality (PDF, XLSX, CSV, Print).
"""
import io
import json
import zipfile
import pypdf
import pytest
from backend import db_adapter


def test_export_authorization_rbac(system):
    """Ensure strict RBAC: only Admin can export records; unauthenticated and unauthorized roles rejected."""
    client, headers, _ = system

    # 1. Unauthenticated request -> 401
    res = client.post('/api/reports/export', json={'report_type': 'billing', 'format': 'csv'})
    assert res.status_code == 401

    # 2. Field worker request -> 403 Forbidden
    res = client.post('/api/reports/export', json={'report_type': 'billing', 'format': 'csv'}, headers=headers['worker'])
    assert res.status_code == 403

    # 3. Resident citizen request -> 403 Forbidden
    res = client.post('/api/reports/export', json={'report_type': 'billing', 'format': 'csv'}, headers=headers['HH-1'])
    assert res.status_code == 403

    # 4. Admin request -> 200 OK
    res = client.post('/api/reports/export', json={'report_type': 'billing', 'format': 'csv'}, headers=headers['admin'])
    assert res.status_code == 200


def test_billing_export_formats_and_headers(system):
    """Verify Billing export in CSV, XLSX, and PDF formats with proper headers and filenames."""
    client, headers, _ = system

    for fmt, expected_mime in [
        ('csv', 'text/csv; charset=utf-8'),
        ('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
        ('pdf', 'application/pdf')
    ]:
        res = client.post('/api/reports/export', json={'report_type': 'billing', 'format': fmt}, headers=headers['admin'])
        assert res.status_code == 200
        assert expected_mime in res.headers.get('Content-Type', '')
        assert 'attachment;' in res.headers.get('Content-Disposition', '')
        assert f'WaterHall_Billing_Records' in res.headers.get('Content-Disposition', '')
        assert res.headers.get('Content-Disposition', '').endswith(f'.{fmt}"')

        data = res.data
        assert len(data) > 0

        if fmt == 'csv':
            text = data.decode('utf-8')
            assert 'Bill ID' in text
            assert 'Household ID' in text
            assert 'Consumption (m3)' in text
            assert 'Total Amount (PHP)' in text
            assert 'BILL-1' in text
            assert 'HH-1' in text
        elif fmt == 'xlsx':
            with zipfile.ZipFile(io.BytesIO(data)) as z:
                sheet = z.read('xl/worksheets/sheet1.xml').decode('utf-8')
                assert 'BILL-1' in sheet or 'BILL' in sheet
        elif fmt == 'pdf':
            reader = pypdf.PdfReader(io.BytesIO(data))
            assert len(reader.pages) >= 1
            extracted = reader.pages[0].extract_text()
            assert 'BILLING' in extracted.upper()
            assert 'WATERHALL' in extracted.upper()


def test_collections_audit_export(system):
    """Verify payment collections audit ledger export across CSV, XLSX, and PDF."""
    client, headers, _ = system

    # Add a confirmed payment collection to the database
    with db_adapter.get_db() as db:
        db.execute('''
            INSERT INTO payment_collections
            (transaction_id, bill_id, household_id, amount_collected, collection_date, collected_by, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', ('TX-TEST-AUDIT-99', 1, 1, 170.00, '2026-03-15T14:30:00Z', 'admin', 'Cash'))

    for fmt in ['csv', 'xlsx', 'pdf']:
        res = client.post('/api/reports/export', json={'report_type': 'collections', 'format': fmt}, headers=headers['admin'])
        assert res.status_code == 200
        data = res.data
        if fmt == 'csv':
            text = data.decode('utf-8')
            assert 'TX-TEST-AUDIT-99' in text
            assert '170.00' in text
            assert 'Cash' in text
        elif fmt == 'xlsx':
            with zipfile.ZipFile(io.BytesIO(data)) as z:
                sheet = z.read('xl/worksheets/sheet1.xml').decode('utf-8')
                assert 'TX-TEST-AUDIT-99' in sheet
        elif fmt == 'pdf':
            reader = pypdf.PdfReader(io.BytesIO(data))
            assert len(reader.pages) >= 1
            text = reader.pages[0].extract_text()
            assert 'TX-TEST-AUDIT-99' in text


def test_resident_directory_export_and_sensitive_field_exclusion(system):
    """Verify Directory export excludes all password hashes, credentials, and recovery codes."""
    client, headers, password = system

    res = client.post('/api/reports/export', json={'report_type': 'directory', 'format': 'csv'}, headers=headers['admin'])
    assert res.status_code == 200
    csv_text = res.data.decode('utf-8')

    # Non-sensitive fields must be present
    assert 'Resident One' in csv_text
    assert 'HH-1' in csv_text
    assert 'Purok 1' in csv_text
    assert 'METER-1' in csv_text

    # SENSITIVE SECURITY FIELDS MUST NEVER APPEAR IN THE EXPORT
    assert password not in csv_text
    assert 'scrypt:' not in csv_text
    assert 'pbkdf2:' not in csv_text
    assert 'password_hash' not in csv_text.lower()
    assert 'jwt' not in csv_text.lower()

    # Also verify in XLSX package
    res_xlsx = client.post('/api/reports/export', json={'report_type': 'directory', 'format': 'xlsx'}, headers=headers['admin'])
    with zipfile.ZipFile(io.BytesIO(res_xlsx.data)) as z:
        for fname in z.namelist():
            part = z.read(fname).decode('utf-8', errors='ignore')
            assert password not in part
            assert 'scrypt:' not in part
            assert 'pbkdf2:' not in part


def test_citizen_incident_reports_export(system):
    """Verify citizen reports export with category, status, and photo flag."""
    client, headers, _ = system

    with db_adapter.get_db() as db:
        db.execute('''
            INSERT INTO resident_reports (household_id, report_type, description, status, photo_base64)
            VALUES (?, ?, ?, ?, ?)
        ''', ('HH-1', 'Leak', 'Burst pipe near meter box', 'Pending', 'data:image/png;base64,iVBORw0KGgo='))

    res = client.post('/api/reports/export', json={'report_type': 'incident_reports', 'format': 'csv'}, headers=headers['admin'])
    assert res.status_code == 200
    csv_text = res.data.decode('utf-8')
    assert 'Burst pipe near meter box' in csv_text
    assert 'Leak' in csv_text
    assert 'Pending' in csv_text
    assert 'Yes' in csv_text  # Photo Attached indicator


def test_filtering_records_by_purok_and_status(system):
    """Verify that filter parameters restrict the exported dataset accurately."""
    client, headers, _ = system

    # 1. Filter by existing Purok 1 -> records returned
    res = client.post('/api/reports/export', json={
        'report_type': 'billing',
        'format': 'csv',
        'filters': {'purok': 'Purok 1'}
    }, headers=headers['admin'])
    assert res.status_code == 200
    assert 'BILL-1' in res.data.decode('utf-8')

    # 2. Filter by non-matching Purok 8 -> empty dataset
    res2 = client.post('/api/reports/export', json={
        'report_type': 'billing',
        'format': 'csv',
        'filters': {'purok': 'Purok 8'}
    }, headers=headers['admin'])
    assert res2.status_code == 200
    text2 = res2.data.decode('utf-8')
    assert 'BILL-1' not in text2
    assert 'No records found matching the specified filters' in text2


def test_empty_dataset_handling_across_all_formats(system):
    """Verify that an empty dataset produces valid files without crashing or 500 error."""
    client, headers, _ = system

    empty_filters = {'purok': 'Purok Does Not Exist'}

    # CSV
    res_csv = client.post('/api/reports/export', json={
        'report_type': 'billing', 'format': 'csv', 'filters': empty_filters
    }, headers=headers['admin'])
    assert res_csv.status_code == 200
    assert 'No records found matching the specified filters' in res_csv.data.decode('utf-8')

    # XLSX
    res_xlsx = client.post('/api/reports/export', json={
        'report_type': 'billing', 'format': 'xlsx', 'filters': empty_filters
    }, headers=headers['admin'])
    assert res_xlsx.status_code == 200
    with zipfile.ZipFile(io.BytesIO(res_xlsx.data)) as z:
        sheet = z.read('xl/worksheets/sheet1.xml').decode('utf-8')
        assert 'No records found' in sheet

    # PDF
    res_pdf = client.post('/api/reports/export', json={
        'report_type': 'billing', 'format': 'pdf', 'filters': empty_filters
    }, headers=headers['admin'])
    assert res_pdf.status_code == 200
    reader = pypdf.PdfReader(io.BytesIO(res_pdf.data))
    assert len(reader.pages) >= 1
    assert 'No records found' in reader.pages[0].extract_text()


def test_csv_and_formula_injection_protection(system):
    """Verify that dangerous spreadsheet formula prefixes (=, +, -, @, tab) are sanitized."""
    client, headers, _ = system

    malicious_desc = "=cmd|'/c calc'!A0"
    malicious_name = "@SUM(A1:A10)"

    with db_adapter.get_db() as db:
        db.execute('''
            INSERT INTO resident_reports (household_id, report_type, description, status)
            VALUES (?, ?, ?, ?)
        ''', ('HH-1', malicious_name, malicious_desc, 'Pending'))

    # CSV check
    res_csv = client.post('/api/reports/export', json={'report_type': 'incident_reports', 'format': 'csv'}, headers=headers['admin'])
    assert res_csv.status_code == 200
    csv_text = res_csv.data.decode('utf-8')
    # Must be sanitized with leading single quote to neutralize formula execution
    assert f"'{malicious_desc}" in csv_text
    assert f"'{malicious_name}" in csv_text

    # XLSX check
    res_xlsx = client.post('/api/reports/export', json={'report_type': 'incident_reports', 'format': 'xlsx'}, headers=headers['admin'])
    assert res_xlsx.status_code == 200
    with zipfile.ZipFile(io.BytesIO(res_xlsx.data)) as z:
        sheet = z.read('xl/worksheets/sheet1.xml').decode('utf-8')
        assert '<f>' not in sheet  # Must NEVER contain formula element
        assert f"'{malicious_desc}" in sheet


def test_get_method_query_parameters(system):
    """Verify GET method with query parameters works identically for browser links/direct downloads."""
    client, headers, _ = system

    res = client.get('/api/reports/export?report_type=billing&format=csv&purok=Purok%201', headers=headers['admin'])
    assert res.status_code == 200
    assert 'BILL-1' in res.data.decode('utf-8')


def test_invalid_report_type_or_format_returns_400(system):
    """Verify invalid parameters return 400 Bad Request."""
    client, headers, _ = system

    # Invalid report type
    res = client.post('/api/reports/export', json={'report_type': 'invalid_type', 'format': 'csv'}, headers=headers['admin'])
    assert res.status_code == 400

    # Invalid format
    res = client.post('/api/reports/export', json={'report_type': 'billing', 'format': 'exe'}, headers=headers['admin'])
    assert res.status_code == 400
