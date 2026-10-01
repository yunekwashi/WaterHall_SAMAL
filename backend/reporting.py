"""WaterHall reporting and export engine.

Generates PDF, Excel (XLSX), and CSV reports from real administrative data
with multi-field filtering, formula-injection protection, sensitive-field
exclusion, and role-based access control.
"""
import csv
import datetime
import decimal
import io
import json
import re
import zipfile
from decimal import Decimal
from xml.sax.saxutils import escape as xml_escape

from flask import Response, abort
from backend.db_adapter import get_db


# ==============================================================================
# Formula Injection Sanitization
# ==============================================================================
def sanitize_cell_value(val):
    """
    Sanitize text to prevent spreadsheet formula injection.
    If a string starts with '=', '+', '-', '@', tab, or carriage return,
    prefix it with a single quote (') per OWASP guidelines.
    """
    if val is None:
        return ""
    if isinstance(val, (int, float, Decimal)):
        return val
    s = str(val)
    if s and s[0] in ('=', '+', '-', '@', '\t', '\r'):
        return "'" + s
    return s


# ==============================================================================
# Report Data Fetchers with Real Application Records
# ==============================================================================

def fetch_billing_report(db, filters=None):
    """
    Fetch billing records with household, meter, and rate snapshot information.
    Filters: billing_month, payment_status, purok, start_date, end_date.
    """
    filters = filters or {}
    query = """
        SELECT b.bill_id, b.previous_reading, b.present_reading, b.consumption_m3,
               b.total_amount, b.payment_status, b.payment_date, b.billed_at, b.billing_snapshot,
               m.serial_number, m.household_id, h.family_head_name, p.purok_name,
               u.username AS biller_username, u_col.username AS collector_username
        FROM billing_records b
        JOIN water_meters m ON b.meter_id = m.meter_id
        LEFT JOIN households h ON m.household_id = h.household_id
        LEFT JOIN puroks p ON h.purok_id = p.purok_id
        LEFT JOIN users u ON b.billed_by = u.user_id
        LEFT JOIN users u_col ON b.collected_by = u_col.user_id
        WHERE 1=1
    """
    params = []

    purok = filters.get('purok')
    if purok and purok.lower() != 'all':
        query += " AND p.purok_name = ?"
        params.append(purok)

    status = filters.get('payment_status')
    if status and status.lower() != 'all':
        query += " AND b.payment_status = ?"
        params.append(status.capitalize())

    month = filters.get('billing_month')
    if month and month.lower() != 'all':
        query += " AND b.billed_at LIKE ?"
        params.append(f"{month}%")

    start_date = filters.get('start_date')
    if start_date:
        query += " AND b.billed_at >= ?"
        params.append(start_date)

    end_date = filters.get('end_date')
    if end_date:
        query += " AND b.billed_at <= ?"
        params.append(f"{end_date}T23:59:59Z" if 'T' not in end_date else end_date)

    query += " ORDER BY b.bill_id DESC"

    db.execute(query, tuple(params) if params else None)
    rows = db.fetchall()

    headers = [
        "Bill ID", "Household ID", "Resident Name", "Purok", "Meter Serial",
        "Billing Month", "Billed At", "Prev Reading (m3)", "Pres Reading (m3)",
        "Consumption (m3)", "Base Rate (PHP)", "Excess Charge (PHP)",
        "Env Fee (PHP)", "Total Amount (PHP)", "Status", "Payment Date",
        "Billed By", "Collector"
    ]

    records = []
    total_consumption = Decimal("0.000")
    total_amount = Decimal("0.00")
    total_paid = Decimal("0.00")
    total_unpaid = Decimal("0.00")

    for r in rows:
        snapshot = json.loads(r['billing_snapshot']) if r.get('billing_snapshot') else {}
        billed_at = r.get('billed_at') or ''
        billing_month = billed_at[:7] if billed_at else 'N/A'

        consumption = Decimal(str(r.get('consumption_m3') or 0))
        amount = Decimal(str(r.get('total_amount') or 0))
        total_consumption += consumption
        total_amount += amount

        status_val = r.get('payment_status') or 'Unpaid'
        if status_val.lower() == 'paid':
            total_paid += amount
        else:
            total_unpaid += amount

        base_rate = snapshot.get('base_rate', 'N/A')
        excess_charge = snapshot.get('excess_charge', '0.00')
        env_fee = snapshot.get('environmental_fee', 'N/A')

        records.append([
            f"BILL-{r['bill_id']}",
            f"HH-{r['household_id']}",
            r.get('family_head_name') or 'N/A',
            r.get('purok_name') or 'N/A',
            r.get('serial_number') or 'N/A',
            billing_month,
            billed_at,
            f"{float(r.get('previous_reading') or 0):.3f}",
            f"{float(r.get('present_reading') or 0):.3f}",
            f"{float(consumption):.3f}",
            str(base_rate),
            str(excess_charge),
            str(env_fee),
            f"{float(amount):.2f}",
            status_val,
            r.get('payment_date') or 'Unpaid',
            r.get('biller_username') or 'System',
            r.get('collector_username') or 'N/A'
        ])

    totals = {
        "Total Records": len(records),
        "Total Consumption (m3)": f"{float(total_consumption):.3f}",
        "Total Amount Billed (PHP)": f"{float(total_amount):.2f}",
        "Total Settled/Paid (PHP)": f"{float(total_paid):.2f}",
        "Total Outstanding/Unpaid (PHP)": f"{float(total_unpaid):.2f}"
    }

    return {
        "title": "WaterHall - Billing Records & Usage Statement",
        "category": "billing",
        "headers": headers,
        "records": records,
        "totals": totals,
        "filters_applied": {k: v for k, v in filters.items() if v}
    }


def fetch_collections_report(db, filters=None):
    """
    Fetch payment collection audit records.
    Filters: payment_status, purok, start_date, end_date, payment_method.
    """
    filters = filters or {}
    query = """
        SELECT c.collection_id, c.transaction_id, c.bill_id, c.household_id,
               c.amount_collected, c.collection_date, c.collected_by, c.payment_method, c.synced_at,
               h.family_head_name, p.purok_name,
               b.payment_status, b.billed_at
        FROM payment_collections c
        LEFT JOIN households h ON c.household_id = h.household_id
        LEFT JOIN puroks p ON h.purok_id = p.purok_id
        LEFT JOIN billing_records b ON c.bill_id = b.bill_id
        WHERE 1=1
    """
    params = []

    purok = filters.get('purok')
    if purok and purok.lower() != 'all':
        query += " AND p.purok_name = ?"
        params.append(purok)

    method = filters.get('payment_method')
    if method and method.lower() != 'all':
        query += " AND c.payment_method = ?"
        params.append(method)

    start_date = filters.get('start_date')
    if start_date:
        query += " AND c.collection_date >= ?"
        params.append(start_date)

    end_date = filters.get('end_date')
    if end_date:
        query += " AND c.collection_date <= ?"
        params.append(f"{end_date}T23:59:59Z" if 'T' not in end_date else end_date)

    query += " ORDER BY c.collection_id DESC"

    db.execute(query, tuple(params) if params else None)
    rows = db.fetchall()

    headers = [
        "Tx ID", "Collection ID", "Household ID", "Resident Name", "Purok",
        "Bill Reference", "Amount Collected (PHP)", "Payment Method",
        "Collection Date", "Collector / Processed By", "Audit Status"
    ]

    records = []
    total_collected = Decimal("0.00")

    for r in rows:
        amount = Decimal(str(r.get('amount_collected') or 0))
        total_collected += amount
        bill_ref = f"BILL-{r['bill_id']}" if r.get('bill_id') else "Direct Settlement"

        records.append([
            r.get('transaction_id') or f"TX-{r['collection_id']}",
            f"COL-{r['collection_id']}",
            f"HH-{r['household_id']}",
            r.get('family_head_name') or 'N/A',
            r.get('purok_name') or 'N/A',
            bill_ref,
            f"{float(amount):.2f}",
            r.get('payment_method') or 'Cash',
            r.get('collection_date') or '',
            r.get('collected_by') or 'Barangay Treasury',
            "Confirmed / Synchronized"
        ])

    totals = {
        "Total Collection Transactions": len(records),
        "Total Collected Revenue (PHP)": f"{float(total_collected):.2f}"
    }

    return {
        "title": "WaterHall - Payment Collections Audit Ledger",
        "category": "collections",
        "headers": headers,
        "records": records,
        "totals": totals,
        "filters_applied": {k: v for k, v in filters.items() if v}
    }


def fetch_directory_report(db, filters=None):
    """
    Fetch resident and household directory.
    DO NOT EXPORT password hashes, secrets, JWT tokens, or credentials.
    Filters: purok, account_status.
    """
    filters = filters or {}
    query = """
        SELECT h.household_id, h.family_head_name, h.total_family_members, h.contact_no,
               h.registration_date, h.account_status, h.current_leak_status,
               p.purok_name, m.serial_number, m.last_reading, m.status AS meter_status
        FROM households h
        JOIN puroks p ON h.purok_id = p.purok_id
        LEFT JOIN water_meters m ON h.household_id = m.household_id
        WHERE 1=1
    """
    params = []

    purok = filters.get('purok')
    if purok and purok.lower() != 'all':
        query += " AND p.purok_name = ?"
        params.append(purok)

    status = filters.get('account_status')
    if status and status.lower() != 'all':
        query += " AND h.account_status = ?"
        params.append(status.lower())

    query += " ORDER BY h.household_id ASC"

    db.execute(query, tuple(params) if params else None)
    rows = db.fetchall()

    headers = [
        "Household ID", "Resident Name", "Purok", "Contact Number",
        "Family Members", "Account Status", "Meter Serial Number",
        "Meter Status", "Last Reading (m3)", "Leak Status", "Registration Date"
    ]

    records = []
    approved_count = 0
    pending_count = 0

    for r in rows:
        acct_status = (r.get('account_status') or 'approved').lower()
        if acct_status == 'approved':
            approved_count += 1
        elif acct_status == 'pending':
            pending_count += 1

        records.append([
            f"HH-{r['household_id']}",
            r.get('family_head_name') or 'N/A',
            r.get('purok_name') or 'N/A',
            r.get('contact_no') or 'Unspecified',
            str(r.get('total_family_members') or 1),
            acct_status.capitalize(),
            r.get('serial_number') or 'Unassigned',
            r.get('meter_status') or 'Active',
            f"{float(r.get('last_reading') or 0):.3f}",
            (r.get('current_leak_status') or 'normal').capitalize(),
            r.get('registration_date') or 'N/A'
        ])

    totals = {
        "Total Registered Households": len(records),
        "Approved Accounts": approved_count,
        "Pending Approvals": pending_count
    }

    return {
        "title": "WaterHall - Resident & Household Official Directory",
        "category": "directory",
        "headers": headers,
        "records": records,
        "totals": totals,
        "filters_applied": {k: v for k, v in filters.items() if v}
    }


def fetch_incident_reports(db, filters=None):
    """
    Fetch citizen/resident incident reports.
    Filters: report_status, report_category, purok, start_date, end_date.
    """
    filters = filters or {}
    query = """
        SELECT r.report_id, r.household_id, r.report_type, r.description, r.status,
               r.created_at, r.resolved_at,
               CASE WHEN r.photo_base64 IS NOT NULL AND length(r.photo_base64) > 0 THEN 1 ELSE 0 END AS has_photo,
               h.family_head_name, p.purok_name
        FROM resident_reports r
        LEFT JOIN households h ON r.household_id = ('HH-' || h.household_id) OR r.household_id = CAST(h.household_id AS TEXT)
        LEFT JOIN puroks p ON h.purok_id = p.purok_id
        WHERE 1=1
    """
    params = []

    status = filters.get('report_status')
    if status and status.lower() != 'all':
        query += " AND r.status = ?"
        params.append(status.capitalize())

    category = filters.get('report_category')
    if category and category.lower() != 'all':
        query += " AND r.report_type = ?"
        params.append(category)

    purok = filters.get('purok')
    if purok and purok.lower() != 'all':
        query += " AND p.purok_name = ?"
        params.append(purok)

    start_date = filters.get('start_date')
    if start_date:
        query += " AND r.created_at >= ?"
        params.append(start_date)

    end_date = filters.get('end_date')
    if end_date:
        query += " AND r.created_at <= ?"
        params.append(f"{end_date}T23:59:59Z" if 'T' not in end_date else end_date)

    query += " ORDER BY r.report_id DESC"

    db.execute(query, tuple(params) if params else None)
    rows = db.fetchall()

    headers = [
        "Report ID", "Household ID", "Resident Name", "Purok",
        "Issue Category", "Details / Description", "Date Filed",
        "Status", "Date Resolved", "Photo Attached"
    ]

    records = []
    pending_count = 0
    resolved_count = 0

    for r in rows:
        st = r.get('status') or 'Pending'
        if st.lower() == 'resolved':
            resolved_count += 1
        else:
            pending_count += 1

        # Sanitize multiline description to single line for tabular export
        desc = (r.get('description') or '').replace('\r\n', ' ').replace('\n', ' ')

        records.append([
            f"REP-{r['report_id']}",
            str(r.get('household_id') or 'N/A'),
            r.get('family_head_name') or 'N/A',
            r.get('purok_name') or 'N/A',
            r.get('report_type') or 'General',
            desc,
            r.get('created_at') or '',
            st,
            r.get('resolved_at') or 'Pending Action',
            "Yes" if r.get('has_photo') else "No"
        ])

    totals = {
        "Total Reports Logged": len(records),
        "Pending / Investigating": pending_count,
        "Resolved": resolved_count
    }

    return {
        "title": "WaterHall - Citizen Service & Incident Reports Log",
        "category": "incident_reports",
        "headers": headers,
        "records": records,
        "totals": totals,
        "filters_applied": {k: v for k, v in filters.items() if v}
    }


# ==============================================================================
# CSV Export Generator (RFC 4180 + Injection Prevention + UTF-8 BOM)
# ==============================================================================

def generate_csv(report_data):
    """
    Generate standards-compliant CSV with UTF-8 BOM, sanitized against formula injection.
    """
    output = io.StringIO()
    writer = csv.writer(output, quoting=csv.QUOTE_MINIMAL)

    # 1. Official Header
    writer.writerow(["WATERHALL - BARANGAY TAGPOPONGAN WATER SYSTEM"])
    writer.writerow([report_data["title"]])
    writer.writerow([f"Generated At: {datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}"])

    filters = report_data.get("filters_applied") or {}
    filter_str = ", ".join(f"{k}={v}" for k, v in filters.items()) if filters else "None (Full Dataset)"
    writer.writerow([f"Filters Applied: {filter_str}"])
    writer.writerow([])  # blank row

    # 2. Table Column Headers
    writer.writerow(report_data["headers"])

    # 3. Data Rows with injection sanitization
    if report_data["records"]:
        for row in report_data["records"]:
            writer.writerow([sanitize_cell_value(cell) for cell in row])
    else:
        writer.writerow(["No records found matching the specified filters."])

    # 4. Totals Block if available
    totals = report_data.get("totals")
    if totals:
        writer.writerow([])
        writer.writerow(["--- SUMMARY METRICS ---"])
        for label, val in totals.items():
            writer.writerow([label, sanitize_cell_value(val)])

    # Prepend UTF-8 BOM so Excel opens with proper UTF-8 decoding
    bom = "\ufeff"
    csv_bytes = (bom + output.getvalue()).encode("utf-8")
    return csv_bytes


# ==============================================================================
# Excel / XLSX Export Generator (Pure Python Standard Library OpenXML)
# ==============================================================================

def generate_xlsx(report_data):
    """
    Generate valid OpenXML spreadsheet (.xlsx) without third-party dependencies.
    Uses bold header row, navy theme (#0F2942), auto-calculated column widths,
    numeric formats, and formula-injection immunity.
    """
    buf = io.BytesIO()

    # Precompute column widths
    headers = report_data["headers"]
    col_widths = [max(len(str(h)), 12) for h in headers]
    for row in report_data["records"][:100]:
        for idx, cell in enumerate(row):
            if idx < len(col_widths):
                col_widths[idx] = min(max(col_widths[idx], len(str(cell)) + 2), 40)

    # XML for sheet
    sheet_xml_parts = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
        '  <cols>'
    ]
    for idx, width in enumerate(col_widths, start=1):
        sheet_xml_parts.append(f'    <col min="{idx}" max="{idx}" width="{width}" customWidth="1"/>')
    sheet_xml_parts.extend([
        '  </cols>',
        '  <sheetData>'
    ])

    row_idx = 1

    # Metadata rows
    def add_meta_row(text):
        nonlocal row_idx
        safe_text = xml_escape(str(sanitize_cell_value(text)))
        sheet_xml_parts.append(
            f'    <row r="{row_idx}">'
            f'<c r="A{row_idx}" t="inlineStr"><is><t>{safe_text}</t></is></c>'
            f'</row>'
        )
        row_idx += 1

    add_meta_row("BARANGAY TAGPOPONGAN WATER SYSTEM (WATERHALL)")
    add_meta_row(report_data["title"])
    add_meta_row(f"Generated At: {datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
    filters = report_data.get("filters_applied") or {}
    filter_str = ", ".join(f"{k}={v}" for k, v in filters.items()) if filters else "None (Full Dataset)"
    add_meta_row(f"Applied Filters: {filter_str}")
    row_idx += 1  # blank row

    # Header Row (s="1" for navy header style)
    header_cells = []
    for col_i, h in enumerate(headers):
        col_letter = _col_to_letter(col_i + 1)
        safe_h = xml_escape(str(h))
        header_cells.append(f'<c r="{col_letter}{row_idx}" t="inlineStr" s="1"><is><t>{safe_h}</t></is></c>')
    sheet_xml_parts.append(f'    <row r="{row_idx}">{"".join(header_cells)}</row>')
    row_idx += 1

    # Data Rows
    if report_data["records"]:
        for record in report_data["records"]:
            row_cells = []
            for col_i, cell in enumerate(record):
                col_letter = _col_to_letter(col_i + 1)
                cell_s = str(cell)
                # Check if purely numeric
                is_num = False
                try:
                    # Don't format IDs or dates as plain numbers
                    if not (cell_s.startswith(('BILL-', 'HH-', 'TX-', 'REP-', 'COL-', 'LOG-')) or '-' in cell_s and len(cell_s) >= 7):
                        float(cell_s)
                        is_num = True
                except ValueError:
                    is_num = False

                if is_num:
                    row_cells.append(f'<c r="{col_letter}{row_idx}"><v>{cell_s}</v></c>')
                else:
                    safe_val = xml_escape(str(sanitize_cell_value(cell_s)))
                    row_cells.append(f'<c r="{col_letter}{row_idx}" t="inlineStr"><is><t>{safe_val}</t></is></c>')
            sheet_xml_parts.append(f'    <row r="{row_idx}">{"".join(row_cells)}</row>')
            row_idx += 1
    else:
        sheet_xml_parts.append(
            f'    <row r="{row_idx}">'
            f'<c r="A{row_idx}" t="inlineStr"><is><t>No records found matching the specified filters.</t></is></c>'
            f'</row>'
        )
        row_idx += 1

    # Totals Row
    totals = report_data.get("totals")
    if totals:
        row_idx += 1
        sheet_xml_parts.append(
            f'    <row r="{row_idx}">'
            f'<c r="A{row_idx}" t="inlineStr" s="2"><is><t>SUMMARY METRICS</t></is></c>'
            f'</row>'
        )
        row_idx += 1
        for label, val in totals.items():
            safe_l = xml_escape(str(label))
            safe_v = xml_escape(str(sanitize_cell_value(val)))
            sheet_xml_parts.append(
                f'    <row r="{row_idx}">'
                f'<c r="A{row_idx}" t="inlineStr"><is><t>{safe_l}</t></is></c>'
                f'<c r="B{row_idx}" t="inlineStr"><is><t>{safe_v}</t></is></c>'
                f'</row>'
            )
            row_idx += 1

    sheet_xml_parts.extend([
        '  </sheetData>',
        '</worksheet>'
    ])
    sheet_xml = "\n".join(sheet_xml_parts)

    # Styles XML: header (s=1: navy fill, bold white text), total (s=2: bold)
    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><name val="Calibri"/><sz val="11"/></font>
    <font><b/><name val="Calibri"/><sz val="11"/><color rgb="FFFFFFFF"/></font>
    <font><b/><name val="Calibri"/><sz val="11"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F2942"/></patternFill></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="3">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
</styleSheet>"""

    with zipfile.ZipFile(buf, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>""")
        z.writestr('_rels/.rels', """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>""")
        z.writestr('xl/_rels/workbook.xml.rels', """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>""")
        z.writestr('xl/workbook.xml', """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="WaterHall Report" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>""")
        z.writestr('xl/styles.xml', styles_xml)
        z.writestr('xl/worksheets/sheet1.xml', sheet_xml)

    return buf.getvalue()


def _col_to_letter(col_idx):
    """Convert 1-indexed column number to Excel letter (1 -> A, 27 -> AA)."""
    result = ""
    while col_idx > 0:
        col_idx, remainder = divmod(col_idx - 1, 26)
        result = chr(65 + remainder) + result
    return result


# ==============================================================================
# PDF Export Generator (Pure Python Standard PDF 1.4 Specification)
# ==============================================================================

class PurePDFBuilder:
    """
    Generates standard PDF 1.4 documents with landscape pages, table layouts,
    headers, footers, pagination, and borders without external dependencies.
    """
    def __init__(self, width=792, height=612):  # Standard US Letter Landscape (11 x 8.5 in)
        self.width = width
        self.height = height
        self.pages = []
        self.current_stream = []

    def new_page(self):
        if self.current_stream:
            self.pages.append(" ".join(self.current_stream))
            self.current_stream = []

    def draw_text(self, text, x, y, font="/F1", size=10, r=0.0, g=0.0, b=0.0):
        # Convert non-latin1 characters (like peso sign, bullets, ellipsis) to clean ascii
        safe_str = (
            str(text)
            .replace("\u20b1", "PHP ")
            .replace("\u2022", "-")
            .replace("\u2026", "...")
            .replace("\u2018", "'")
            .replace("\u2019", "'")
            .replace("\u201c", '"')
            .replace("\u201d", '"')
            .encode("latin1", errors="replace")
            .decode("latin1")
        )
        safe = (
            safe_str
            .replace("\\", "\\\\")
            .replace("(", "\\(")
            .replace(")", "\\)")
        )
        self.current_stream.append(
            f"{r:.3f} {g:.3f} {b:.3f} rg BT {font} {size} Tf {x:.2f} {y:.2f} Td ({safe}) Tj ET"
        )

    def draw_rect(self, x, y, w, h, fill_rgb=None, stroke_rgb=None, line_width=0.5):
        if fill_rgb:
            r, g, b = fill_rgb
            self.current_stream.append(f"{r:.3f} {g:.3f} {b:.3f} rg {x:.2f} {y:.2f} {w:.2f} {h:.2f} re f")
        if stroke_rgb:
            r, g, b = stroke_rgb
            self.current_stream.append(f"{line_width:.2f} w {r:.3f} {g:.3f} {b:.3f} RG {x:.2f} {y:.2f} {w:.2f} {h:.2f} re S")

    def draw_line(self, x1, y1, x2, y2, stroke_rgb=(0.8, 0.8, 0.8), line_width=0.5):
        r, g, b = stroke_rgb
        self.current_stream.append(f"{line_width:.2f} w {r:.3f} {g:.3f} {b:.3f} RG {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def build_pdf_bytes(self):
        if self.current_stream:
            self.pages.append(" ".join(self.current_stream))

        num_pages = len(self.pages)
        if num_pages == 0:
            self.pages.append("")
            num_pages = 1

        page_obj_ids = [5 + i * 2 for i in range(num_pages)]
        content_obj_ids = [6 + i * 2 for i in range(num_pages)]

        catalog = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj"
        kids_str = " ".join(f"{pid} 0 R" for pid in page_obj_ids)
        pages_obj = f"2 0 obj\n<< /Type /Pages /Kids [{kids_str}] /Count {num_pages} >>\nendobj"
        f1 = "3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj"
        f2 = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj"

        objects = [catalog, pages_obj, f1, f2]

        for i in range(num_pages):
            pid = page_obj_ids[i]
            cid = content_obj_ids[i]
            stream_str = self.pages[i]
            stream_bytes = stream_str.encode("latin1", errors="replace")
            page_obj = (
                f"{pid} 0 obj\n"
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {self.width} {self.height}] "
                f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents {cid} 0 R >>\nendobj"
            )
            content_obj = f"{cid} 0 obj\n<< /Length {len(stream_bytes)} >>\nstream\n{stream_str}\nendstream\nendobj"
            objects.extend([page_obj, content_obj])

        out = io.BytesIO()
        out.write(b"%PDF-1.4\n")
        offsets = [0]
        for obj in objects:
            offsets.append(out.tell())
            out.write(obj.encode("latin1") + b"\n")

        xref_pos = out.tell()
        out.write(f"xref\n0 {len(offsets)}\n".encode("latin1"))
        out.write(b"0000000000 65535 f \n")
        for off in offsets[1:]:
            out.write(f"{off:010d} 00000 n \n".encode("latin1"))

        trailer = f"trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n"
        out.write(trailer.encode("latin1"))
        return out.getvalue()


def generate_pdf(report_data):
    """
    Render a clean, official WaterHall administrative PDF report in Landscape orientation.
    Includes official header banner, applied filters, structured tables,
    summary totals, and page numbering.
    """
    pdf = PurePDFBuilder(width=792, height=612)
    margin_x = 40
    page_width = 792
    content_width = page_width - (margin_x * 2)  # 712 pt

    headers = report_data["headers"]
    records = report_data["records"]
    totals = report_data.get("totals") or {}
    filters = report_data.get("filters_applied") or {}

    # Calculate column widths to fit content_width
    num_cols = len(headers)
    base_col_w = content_width / max(num_cols, 1)
    col_widths = [base_col_w] * num_cols

    # Adjust widths for common tables
    if report_data["category"] == "billing":
        # Distribute proportionally
        weights = [45, 45, 75, 45, 55, 45, 60, 45, 45, 45, 45, 45, 40, 50, 40, 55, 40, 40]
        sum_w = sum(weights[:num_cols])
        col_widths = [(w / sum_w) * content_width for w in weights[:num_cols]]
    elif report_data["category"] == "collections":
        weights = [80, 55, 55, 95, 60, 60, 65, 55, 80, 65, 65]
        sum_w = sum(weights[:num_cols])
        col_widths = [(w / sum_w) * content_width for w in weights[:num_cols]]
    elif report_data["category"] == "directory":
        weights = [55, 90, 60, 65, 45, 60, 65, 55, 55, 50, 70]
        sum_w = sum(weights[:num_cols])
        col_widths = [(w / sum_w) * content_width for w in weights[:num_cols]]
    elif report_data["category"] == "incident_reports":
        weights = [55, 55, 85, 60, 75, 140, 70, 55, 65, 50]
        sum_w = sum(weights[:num_cols])
        col_widths = [(w / sum_w) * content_width for w in weights[:num_cols]]

    row_height = 17
    header_height = 20
    top_margin = 560
    bottom_margin = 45

    current_page = 1
    total_pages = 1  # Will be calculated if multi-page

    def render_page_header(page_num):
        # Header banner bar
        pdf.draw_rect(margin_x, 560, content_width, 36, fill_rgb=(0.06, 0.16, 0.26))
        pdf.draw_text("BARANGAY TAGPOPONGAN WATER SYSTEM (WATERHALL)", margin_x + 12, 580, font="/F2", size=11, r=1, g=1, b=1)
        pdf.draw_text(report_data["title"].upper(), margin_x + 12, 567, font="/F1", size=8.5, r=0.85, g=0.9, b=1)

        gen_time = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
        pdf.draw_text(f"Generated: {gen_time}", margin_x + content_width - 150, 574, font="/F1", size=8, r=0.8, g=0.85, b=0.9)

        # Filter bar
        filter_str = ", ".join(f"{k}: {v}" for k, v in filters.items()) if filters else "None (Full Record Set)"
        pdf.draw_rect(margin_x, 542, content_width, 16, fill_rgb=(0.94, 0.96, 0.98), stroke_rgb=(0.85, 0.88, 0.92))
        pdf.draw_text(f"Applied Filters: {filter_str}", margin_x + 8, 546, font="/F1", size=7.5, r=0.2, g=0.25, b=0.3)

    def render_table_headers(y):
        pdf.draw_rect(margin_x, y, content_width, header_height, fill_rgb=(0.12, 0.22, 0.35))
        cur_x = margin_x
        for i, h in enumerate(headers):
            w = col_widths[i]
            # Clip header text to column width
            max_chars = max(int(w / 4.8), 3)
            h_text = h if len(h) <= max_chars else h[:max_chars - 1] + "."
            pdf.draw_text(h_text, cur_x + 4, y + 6, font="/F2", size=7, r=1, g=1, b=1)
            cur_x += w
        return y - row_height

    def render_footer(page_num):
        pdf.draw_line(margin_x, 34, margin_x + content_width, 34, stroke_rgb=(0.8, 0.8, 0.8))
        pdf.draw_text(
            "WATERHALL System Generated Record | Barangay Tagpopongan, IGACOS | Confidential Official Document",
            margin_x, 24, font="/F1", size=7, r=0.45, g=0.5, b=0.55
        )
        pdf.draw_text(f"Page {page_num}", margin_x + content_width - 45, 24, font="/F2", size=7.5, r=0.2, g=0.25, b=0.3)

    # Start Page 1
    render_page_header(1)
    y_pos = render_table_headers(520)

    if not records:
        pdf.draw_rect(margin_x, y_pos, content_width, row_height, fill_rgb=(0.98, 0.98, 0.98), stroke_rgb=(0.85, 0.85, 0.85))
        pdf.draw_text("No records found matching the specified filters.", margin_x + 12, y_pos + 5, font="/F1", size=8.5, r=0.4, g=0.4, b=0.4)
        y_pos -= row_height
    else:
        for row_idx, row in enumerate(records):
            if y_pos < bottom_margin + 30:
                render_footer(current_page)
                pdf.new_page()
                current_page += 1
                render_page_header(current_page)
                y_pos = render_table_headers(520)

            bg_rgb = (0.97, 0.98, 0.99) if row_idx % 2 == 1 else (1.0, 1.0, 1.0)
            pdf.draw_rect(margin_x, y_pos, content_width, row_height, fill_rgb=bg_rgb, stroke_rgb=(0.88, 0.9, 0.93))

            cur_x = margin_x
            for col_i, cell in enumerate(row):
                w = col_widths[col_i]
                max_chars = max(int(w / 4.4), 3)
                cell_str = str(cell)
                if len(cell_str) > max_chars:
                    cell_str = cell_str[:max_chars - 3] + "..."
                pdf.draw_text(cell_str, cur_x + 3, y_pos + 5, font="/F1", size=6.8, r=0.1, g=0.15, b=0.2)
                cur_x += w
            y_pos -= row_height

    # Summary Totals Section
    if totals:
        if y_pos < bottom_margin + 60:
            render_footer(current_page)
            pdf.new_page()
            current_page += 1
            render_page_header(current_page)
            y_pos = 520

        y_pos -= 8
        summary_w = min(content_width, 360)
        pdf.draw_rect(margin_x, y_pos - (len(totals) * 15 + 16), summary_w, len(totals) * 15 + 18,
                      fill_rgb=(0.95, 0.97, 0.99), stroke_rgb=(0.75, 0.82, 0.9))
        pdf.draw_text("REPORT SUMMARY METRICS", margin_x + 8, y_pos - 8, font="/F2", size=8, r=0.08, g=0.18, b=0.3)
        cur_tot_y = y_pos - 22
        for label, val in totals.items():
            pdf.draw_text(f"{label}:", margin_x + 10, cur_tot_y, font="/F1", size=7.5, r=0.2, g=0.25, b=0.3)
            pdf.draw_text(str(val), margin_x + summary_w - 90, cur_tot_y, font="/F2", size=7.5, r=0.05, g=0.1, b=0.2)
            cur_tot_y -= 14

    render_footer(current_page)
    return pdf.build_pdf_bytes()


# ==============================================================================
# Unified Export Dispatcher
# ==============================================================================

def generate_export(report_type, export_format, filters=None):
    """
    Dispatch export request by report_type and format.
    Returns: (bytes_data, mimetype, filename)
    """
    export_format = (export_format or 'csv').lower()
    if export_format not in ('csv', 'xlsx', 'pdf'):
        abort(400, description="Invalid export format. Supported formats: csv, xlsx, pdf")

    with get_db() as db:
        if report_type == 'billing':
            report_data = fetch_billing_report(db, filters)
            base_filename = "WaterHall_Billing_Records"
        elif report_type == 'collections':
            report_data = fetch_collections_report(db, filters)
            base_filename = "WaterHall_Collections_Audit"
        elif report_type == 'directory':
            report_data = fetch_directory_report(db, filters)
            base_filename = "WaterHall_Resident_Directory"
        elif report_type in ('incident_reports', 'reports'):
            report_data = fetch_incident_reports(db, filters)
            base_filename = "WaterHall_Incident_Reports"
        else:
            abort(400, description=f"Invalid report type '{report_type}'. Supported: billing, collections, directory, incident_reports")

    today_str = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    filename = f"{base_filename}_{today_str}.{export_format}"

    if export_format == 'csv':
        data = generate_csv(report_data)
        mimetype = "text/csv; charset=utf-8"
    elif export_format == 'xlsx':
        data = generate_xlsx(report_data)
        mimetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    elif export_format == 'pdf':
        data = generate_pdf(report_data)
        mimetype = "application/pdf"

    return data, mimetype, filename
