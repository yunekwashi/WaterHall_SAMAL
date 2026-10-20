import io
import os
import csv
import zipfile
import xml.etree.ElementTree as ET
import pytest
from pathlib import Path
from pypdf import PdfReader
from playwright.sync_api import expect
from test_browser import browser_page
from test_admin_password_reset_browser import admin
from test_receipts import receipt_data, snapshot
from backend.db_adapter import get_db

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome')


def open_billing(surface, month='2026-10', purok='All'):
    page = admin(surface)
    page.context.on('page', lambda output: output.on('pageerror', lambda error: surface[3].append(str(error))))
    page.wait_for_function('()=>hasAdminData')
    page.locator('[data-tab="tab-billing"]').click()
    page.locator('#export-filter-bill-month').fill(month)
    page.locator('#export-filter-bill-purok').select_option(purok)
    page.evaluate('''()=>{
      window.printCalls=0; window.print=()=>{window.printCalls++};
      window.realBrowserOpen=window.open.bind(window);
      window.open=(...args)=>{const output=window.realBrowserOpen(...args);
        if(output) output.print=()=>{window.printCalls++}; return output;};
    }''')
    return page


def open_receipts(surface, mode='name', month='2026-10', purok='All'):
    page = open_billing(surface, month, purok)
    page.locator('#btn-billing-print').click()
    page.locator('#btn-print-all-receipts' if mode == 'all' else '#btn-print-receipts').click()
    return page


@pytest.mark.parametrize('query', ['Same Resident', 'same', 'rESId'])
def test_receipt_name_search_duplicate_identity_preview_print_is_read_only(browser_page, receipt_data, query):
    before = snapshot(); page = open_receipts(browser_page)
    page.locator('#receipt-search').fill(query)
    expect(page.locator('#receipt-matches button')).to_have_count(2)
    page.locator('#receipt-matches [data-house-id="HH-2"]').click()
    page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(1)
    expect(page.locator('#receipt-preview')).to_contain_text('222.50')
    expect(page.locator('#receipt-preview')).to_contain_text('HH-2')
    page.locator('#receipt-print').click()
    page.wait_for_function('()=>window.printCalls===1')
    output = next(p for p in page.context.pages if p != page)
    output.emulate_media(media='print')
    pdf = PdfReader(io.BytesIO(output.pdf(format='A4')))
    text = '\n'.join(p.extract_text() for p in pdf.pages)
    assert '222.50' in text and 'HH-2' in text and 'TAGPOPONGAN' in text
    assert '987.00' not in text and '99.00' not in text
    output.emulate_media(media='screen')
    assert snapshot() == before
    assert browser_page[3] == []


@pytest.mark.parametrize('width', [320, 1280])
def test_all_receipts_period_count_bulk_confirmation_and_responsive_preview(browser_page, receipt_data, width):
    page = browser_page[0]; page.set_viewport_size({'width': width, 'height': 850})
    before = snapshot(); open_receipts(browser_page)
    page.locator('#receipt-mode').select_option('all')
    page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
    expect(page.locator('#receipt-message')).to_contain_text('2 receipts selected')
    expect(page.locator('#receipt-preview')).to_contain_text('2026-10')
    if os.getenv('TEST_ARTIFACT_DIR'):
        target = Path(os.environ['TEST_ARTIFACT_DIR']); target.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(target / f'receipt-preview-{width}.png'), full_page=True)
    expect(page.locator('#receipt-print')).to_be_disabled()
    page.locator('#receipt-bulk-confirm').scroll_into_view_if_needed()
    confirmation_box = page.locator('.receipt-confirmation').bounding_box()
    actions_box = page.locator('#receipt-modal .form-actions').bounding_box()
    assert actions_box['y'] >= confirmation_box['y'] + confirmation_box['height']
    page.locator('#receipt-bulk-confirm').check(); page.locator('#receipt-print').click()
    page.wait_for_function('()=>window.printCalls===1')
    output = next(p for p in page.context.pages if p != page)
    output.emulate_media(media='print')
    pdf = PdfReader(io.BytesIO(output.pdf(format='A4')))
    assert len(pdf.pages) == 2
    text = '\n'.join(p.extract_text() for p in pdf.pages)
    # Chrome's PDF font extraction represents the rendered hyphen as U+2212.
    assert all(x in text.replace('\u2212', '-') for x in ['170.25', '222.50', 'HH-1', 'HH-2', '2026-10']), repr(text)
    assert '987.00' not in text and '99.00' not in text
    output.emulate_media(media='screen')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.locator('#receipt-month').fill('2026-09')
    page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(1)
    expect(page.locator('#receipt-preview')).to_contain_text('99.00')
    assert snapshot() == before
    assert browser_page[3] == []


def test_changed_records_require_new_review_and_logout_clears_private_preview(browser_page, receipt_data):
    page = open_receipts(browser_page)
    page.locator('#receipt-mode').select_option('all'); page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
    page.locator('#receipt-bulk-confirm').check()
    with get_db() as db:
        db.execute("UPDATE billing_records SET payment_status='Unpaid' WHERE meter_id=2")
    page.locator('#receipt-print').click()
    expect(page.locator('#receipt-message')).to_contain_text('Records changed')
    assert page.evaluate('window.printCalls') == 0, page.locator('#receipt-message').inner_text()
    page.evaluate("document.getElementById('btn-logout').click()")
    expect(page.locator('#receipt-modal')).to_be_hidden()
    expect(page.locator('#receipt-preview')).to_be_empty()
    expect(page.locator('#receipt-print-area')).to_be_empty()
    assert browser_page[3] == []


@pytest.mark.parametrize('width', [320, 390, 768, 1280])
def test_single_six_action_print_dropdown_and_filtered_table(browser_page, receipt_data, width):
    page = browser_page[0]; page.set_viewport_size({'width': width, 'height': 850})
    before = snapshot(); open_billing(browser_page)
    page.locator('#export-filter-bill-status').select_option('Paid')
    expect(page.locator('#admin-billing-tbody tr')).to_have_count(5)
    original_table = page.locator('#admin-billing-tbody').inner_html()
    toolbar = page.locator('.export-toolbar').filter(has=page.locator('#btn-billing-print'))
    assert toolbar.locator('button:visible').all_text_contents() == ['Print ']
    assert page.locator('#tab-billing .export-buttons button:visible').all_text_contents() == ['Print ']
    expect(page.locator('#btn-print-col')).to_have_count(0)
    expect(page.locator('#btn-export-col-csv, #btn-export-col-xlsx, #btn-export-col-pdf')).to_have_count(0)
    expect(page.get_by_role('button', name='Receipts', exact=True)).to_have_count(0)
    trigger = page.locator('#btn-billing-print'); menu = page.locator('#billing-print-menu')
    trigger.click(); expect(trigger).to_have_attribute('aria-expanded', 'true')
    page.evaluate("document.querySelector('.main-content').dispatchEvent(new Event('scroll'))")
    expect(menu).to_be_visible()
    assert menu.get_by_role('menuitem').all_text_contents() == ['Export PDF', 'Export Excel (XLSX)', 'Export CSV', 'Print Billing Table', 'Print Receipt by Name', 'Print All Receipts']
    assert page.evaluate('window.printCalls') == 0
    box = menu.bounding_box()
    assert 0 <= box['x'] and box['x']+box['width'] <= width
    assert 0 <= box['y'] and box['y']+box['height'] <= 850
    for option in menu.get_by_role('menuitem').all():
        assert option.evaluate('e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}')
    if os.getenv('TEST_ARTIFACT_DIR'):
        target = Path(os.environ['TEST_ARTIFACT_DIR']); target.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(target / f'print-dropdown-{width}.png'))
    page.locator('#btn-print-billing-table').click()
    page.wait_for_function('()=>window.printCalls===1')
    expect(menu).to_be_hidden(); expect(trigger).to_have_attribute('aria-expanded', 'false')
    expect(page.locator('#receipt-modal')).to_be_hidden()
    assert not page.locator('body').evaluate("e=>e.classList.contains('receipt-printing')")
    page.emulate_media(media='print')
    text = '\n'.join(p.extract_text() for p in PdfReader(io.BytesIO(page.pdf(format='A4'))).pages)
    assert '170.25' in text and '222.50' in text
    assert '987.00' not in text and '99.00' not in text
    assert 'Print Receipt by Name' not in text and 'Print All Receipts' not in text
    assert 'Synchronized Field Collections' not in text
    assert page.locator('#admin-billing-tbody').inner_html() == original_table
    page.emulate_media(media='screen')
    assert snapshot() == before
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert browser_page[3] == []


@pytest.mark.parametrize('month,purok,count,amounts', [
    ('2026-10', 'All', 2, ['170.25', '222.50']),
    ('2026-09', 'All', 1, ['99.00']),
    ('2026-10', 'Purok 8', 0, [])])
def test_print_all_action_opens_scoped_preview_without_printing(browser_page, receipt_data, month, purok, count, amounts):
    before = snapshot(); page = open_receipts(browser_page, 'all', month, purok)
    expect(page.locator('#receipt-mode')).to_have_value('all')
    expect(page.locator('#receipt-month')).to_have_value(month)
    expect(page.locator('#receipt-search')).to_be_hidden()
    expect(page.locator('#receipt-message')).to_contain_text(f'{count} receipt')
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(count)
    for amount in amounts: expect(page.locator('#receipt-preview')).to_contain_text(amount)
    assert page.evaluate('window.printCalls') == 0
    if count > 1:
        expect(page.locator('#receipt-print')).to_be_disabled()
        expect(page.locator('#receipt-bulk-confirm')).not_to_be_checked()
        page.locator('#receipt-bulk-confirm').check()
        expect(page.locator('#receipt-print')).to_be_enabled()
    elif count == 0: expect(page.locator('#receipt-print')).to_be_disabled()
    else: expect(page.locator('#receipt-print')).to_be_enabled()
    page.locator('#receipt-cancel').click()
    expect(page.locator('#btn-billing-print')).to_be_focused()
    expect(page.locator('#receipt-modal')).to_be_hidden()
    assert snapshot() == before
    assert browser_page[3] == []


def test_print_dropdown_keyboard_dismissal_and_session_cleanup(browser_page, receipt_data):
    page = open_billing(browser_page); before = snapshot()
    trigger = page.locator('#btn-billing-print'); menu = page.locator('#billing-print-menu')
    trigger.focus(); trigger.press('ArrowDown')
    expect(page.locator('#btn-export-bill-pdf')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-export-bill-xlsx')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-export-bill-csv')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-print-billing-table')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-print-receipts')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-print-all-receipts')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-export-bill-pdf')).to_be_focused()
    page.keyboard.press('End'); expect(page.locator('#btn-print-all-receipts')).to_be_focused()
    page.keyboard.press('Home'); expect(page.locator('#btn-export-bill-pdf')).to_be_focused()
    page.keyboard.press('Escape'); expect(menu).to_be_hidden(); expect(trigger).to_be_focused()
    trigger.press('ArrowUp'); expect(page.locator('#btn-print-all-receipts')).to_be_focused()
    page.keyboard.press('Tab'); expect(menu).to_be_hidden()
    trigger.click(); page.mouse.click(4, 4); expect(menu).to_be_hidden()
    trigger.click(); trigger.click(); expect(menu).to_be_hidden()
    trigger.click(); assert page.evaluate('window.printCalls') == 0
    page.evaluate("document.getElementById('btn-logout').click()")
    expect(menu).to_be_hidden(); expect(trigger).to_have_attribute('aria-expanded', 'false')
    expect(page.locator('#login-screen')).to_be_visible()
    assert snapshot() == before
    assert browser_page[3] == []


@pytest.mark.parametrize('month,purok,expected', [('2026-09', 'All', '99.00'), ('2026-10', 'Purok 8', None)])
def test_billing_table_print_month_and_purok_scope_without_live_table_mutation(browser_page, receipt_data, month, purok, expected):
    before = snapshot(); page = open_billing(browser_page, month, purok)
    page.locator('#export-filter-bill-status').select_option('Paid')
    original = page.locator('#admin-billing-tbody').inner_html()
    page.locator('#btn-billing-print').click(); page.locator('#btn-print-billing-table').click()
    page.wait_for_function('()=>window.printCalls===1')
    expect(page.locator('#receipt-modal')).to_be_hidden()
    paper = page.locator('#receipt-print-area')
    if expected: expect(paper).to_contain_text(expected)
    else: expect(paper).to_contain_text('No billing statements match the selected filters.')
    expect(paper).not_to_contain_text('222.50'); expect(paper).not_to_contain_text('170.25')
    assert page.locator('#admin-billing-tbody').inner_html() == original
    page.evaluate("dispatchEvent(new Event('afterprint'))")
    expect(paper).to_be_empty()
    assert snapshot() == before and browser_page[3] == []


def downloaded_report_text(path, fmt):
    if fmt == 'pdf':
        return '\n'.join(page.extract_text() for page in PdfReader(path).pages)
    if fmt == 'xlsx':
        with zipfile.ZipFile(path) as workbook:
            assert workbook.testzip() is None
            assert '[Content_Types].xml' in workbook.namelist()
            root = ET.fromstring(workbook.read('xl/worksheets/sheet1.xml'))
            return ' '.join(root.itertext())
    with open(path, encoding='utf-8-sig', newline='') as stream:
        rows = list(csv.reader(stream))
    assert any('Bill ID' in row for row in rows)
    return '\n'.join(','.join(row) for row in rows)


@pytest.mark.parametrize('width', [390, 1280])
@pytest.mark.parametrize('fmt,mime', [('pdf', 'application/pdf'),
    ('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    ('csv', 'text/csv')])
def test_print_menu_downloads_real_filtered_files(browser_page, receipt_data, tmp_path, width, fmt, mime):
    page = browser_page[0]; page.set_viewport_size({'width': width, 'height': 850})
    before = snapshot(); open_billing(browser_page)
    for month, purok, included, excluded in [
        ('2026-10', 'All', ['BILL-2', 'BILL-3', '170.25', '222.50'], ['BILL-4', 'BILL-5', '987.00']),
        ('2026-09', 'Purok 1', ['BILL-4', '99.00'], ['BILL-2', 'BILL-3', 'BILL-5', '222.50']),
        ('2026-10', 'Purok 8', ['No records found matching the specified filters'], ['BILL-2', 'BILL-3', 'BILL-5'])]:
        page.locator('#export-filter-bill-month').fill(month)
        page.locator('#export-filter-bill-purok').select_option(purok)
        page.locator('#export-filter-bill-status').select_option('Paid')
        page.locator('#btn-billing-print').click()
        with page.expect_download() as download, page.expect_response('**/api/reports/export') as response:
            page.locator(f'#btn-export-bill-{fmt}').click()
        assert response.value.status == 200
        assert mime in response.value.headers['content-type']
        assert response.value.request.post_data_json == {'report_type': 'billing', 'format': fmt,
            'filters': {'billing_month': month, 'purok': purok, 'payment_status': 'Paid'}}
        assert download.value.failure() is None
        assert download.value.suggested_filename.startswith('WaterHall_Billing_Records')
        assert download.value.suggested_filename.endswith('.' + fmt)
        destination = tmp_path / f'{month}-{purok}.{fmt}'
        download.value.save_as(destination)
        text = downloaded_report_text(destination, fmt)
        assert all(value in text for value in included), text
        assert not any(value in text for value in excluded), text
        expect(page.locator('#billing-print-menu')).to_be_hidden()
        expect(page.locator(f'#btn-export-bill-{fmt}')).to_be_enabled()
        if os.getenv('TEST_ARTIFACT_DIR'):
            target = Path(os.environ['TEST_ARTIFACT_DIR']); target.mkdir(parents=True, exist_ok=True)
            (target / f'export-{width}-{month}-{purok}.{fmt}').write_bytes(destination.read_bytes())
    assert page.evaluate('window.printCalls') == 0
    assert snapshot() == before and browser_page[3] == []


@pytest.mark.parametrize('kind', ['table', 'name', 'all'])
def test_print_actions_invoke_native_browser_print(browser_page, receipt_data, kind):
    browser_page[0].add_init_script('window.realBrowserPrint=window.print.bind(window)')
    page = open_billing(browser_page); before = snapshot()
    # Use the native Chrome function, not only a counter stub. Headless Chrome
    # exposes beforeprint/afterprint; an OS print-dialog appearance remains manual.
    page.evaluate('''()=>{
      window.print=window.realBrowserPrint;
      window.nativePrintEvents=[];
      addEventListener('beforeprint',()=>window.nativePrintEvents.push({
        paper:document.getElementById('receipt-print-area').textContent,
        sheets:document.querySelectorAll('#receipt-print-area .receipt-sheet').length
      }));
      window.open=(...args)=>{const output=window.realBrowserOpen(...args);
        if(output) output.addEventListener('beforeprint',()=>window.nativePrintEvents.push({
          paper:output.document.body.textContent,
          sheets:output.document.querySelectorAll('.receipt-sheet').length
        })); return output;};
    }''')
    page.locator('#export-filter-bill-status').select_option('Paid')
    page.locator('#btn-billing-print').click()
    if kind == 'table': page.locator('#btn-print-billing-table').click()
    else:
        page.locator('#btn-print-all-receipts' if kind == 'all' else '#btn-print-receipts').click()
        if kind == 'name':
            page.locator('#receipt-search').fill('Same Resident')
            page.locator('#receipt-matches [data-house-id="HH-2"]').click()
            page.locator('#receipt-preview-button').click()
            expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(1)
        else:
            expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
            expect(page.locator('#receipt-print')).to_be_disabled()
            page.locator('#receipt-bulk-confirm').check()
        page.locator('#receipt-print').click()
    page.wait_for_function('()=>window.nativePrintEvents.length===1')
    event = page.evaluate('window.nativePrintEvents[0]')
    assert '222.50' in event['paper'] and '987.00' not in event['paper']
    assert event['sheets'] == {'table': 0, 'name': 1, 'all': 2}[kind]
    assert snapshot() == before and browser_page[3] == []


def test_print_menu_opens_before_billing_data_ready_and_receipts_still_load(browser_page, receipt_data):
    page = open_billing(browser_page); before = snapshot()
    page.evaluate('hasAdminData=false')
    page.locator('#btn-billing-print').click()
    expect(page.locator('#billing-print-menu')).to_be_visible()
    expect(page.locator('#btn-print-billing-table')).to_be_disabled()
    expect(page.locator('#billing-print-status')).to_contain_text('Billing table data is not ready')
    page.keyboard.press('End'); page.keyboard.press('ArrowUp')
    expect(page.locator('#btn-print-receipts')).to_be_focused()
    page.keyboard.press('ArrowUp')
    expect(page.locator('#btn-export-bill-csv')).to_be_focused()
    page.locator('#btn-print-all-receipts').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
    page.locator('#receipt-cancel').click()
    page.evaluate('hasAdminData=true')
    page.locator('#btn-billing-print').click()
    expect(page.locator('#btn-print-billing-table')).to_be_enabled()
    expect(page.locator('#billing-print-status')).to_be_hidden()
    assert snapshot() == before and browser_page[3] == []


def test_print_menu_scroll_short_viewport_and_reopen(browser_page, receipt_data):
    page = open_billing(browser_page)
    page.set_viewport_size({'width': 320, 'height': 360})
    trigger = page.locator('#btn-billing-print'); menu = page.locator('#billing-print-menu')
    trigger.click(); expect(menu).to_be_visible()
    box = menu.bounding_box()
    assert box['y'] >= 0 and box['y'] + box['height'] <= 360
    menu.hover(); page.mouse.wheel(0, 100)
    expect(menu).to_be_visible()
    page.keyboard.press('End')
    expect(page.locator('#btn-print-all-receipts')).to_be_focused()
    page.keyboard.press('Escape'); expect(menu).to_be_hidden()
    trigger.click(); expect(menu).to_be_visible()
    # Mobile uses document scrolling; desktop uses the main-content scroller.
    page.evaluate("()=>{document.querySelector('.main-content').scrollTop=0;window.scrollTo(0,0);}")
    expect(menu).to_be_hidden()
    trigger.click(); expect(menu).to_be_visible()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert browser_page[3] == []


@pytest.mark.parametrize('blank', ['', '   '])
def test_recipient_search_requires_non_whitespace_input(browser_page, receipt_data, blank):
    page = browser_page[0]; requests = []
    page.on('request', lambda request: requests.append(request.url) if 'view=recipients' in request.url else None)
    open_receipts(browser_page)
    expect(page.locator('#receipt-matches')).to_be_empty()
    page.locator('#receipt-search').fill(blank)
    page.wait_for_timeout(300)
    assert requests == []
    expect(page.locator('#receipt-preview-button')).to_be_disabled()
    expect(page.locator('#receipt-print')).to_be_disabled()
    expect(page.locator('#receipt-download')).to_be_disabled()
    expect(page.locator('#receipt-message')).to_contain_text('then choose Preview')
    page.locator('#receipt-search').fill('s')
    expect(page.locator('#receipt-matches button')).to_have_count(2)
    page.locator('#receipt-search').fill('')
    expect(page.locator('#receipt-matches')).to_be_empty()
    page.locator('#receipt-search').fill('No Such Recipient')
    expect(page.locator('#receipt-matches')).to_have_text('No matching recipients found.')
    assert browser_page[3] == []


@pytest.mark.parametrize('width', [390, 1280])
@pytest.mark.parametrize('kind,count,amounts', [('name', 1, ['222.50']), ('all', 2, ['170.25', '222.50'])])
def test_receipt_pdf_download_matches_verified_preview(browser_page, receipt_data, tmp_path, width, kind, count, amounts):
    page = browser_page[0]; page.set_viewport_size({'width': width, 'height': 850})
    before = snapshot(); open_receipts(browser_page, kind)
    if kind == 'name':
        page.locator('#receipt-search').fill('s')
        page.locator('#receipt-matches [data-house-id="HH-2"]').click()
        expect(page.locator('#receipt-preview-button')).to_be_enabled()
        expect(page.locator('#receipt-print')).to_be_disabled()
        expect(page.locator('#receipt-download')).to_be_disabled()
        expect(page.locator('#receipt-message')).to_contain_text('Choose Preview')
        page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(count)
    if kind == 'all':
        expect(page.locator('#receipt-download')).to_be_disabled()
        page.locator('#receipt-bulk-confirm').check()
    expect(page.locator('#receipt-print')).to_be_enabled()
    with page.expect_download() as downloaded:
        page.locator('#receipt-download').click()
    assert downloaded.value.failure() is None
    assert downloaded.value.suggested_filename == f'WaterHall_Receipts_2026-10_{"All" if kind == "all" else "HH-2"}.pdf'
    path = tmp_path / 'receipt.pdf'; downloaded.value.save_as(path)
    assert path.read_bytes().startswith(b'%PDF-')
    pdf = PdfReader(path); text = '\n'.join(p.extract_text() for p in pdf.pages)
    assert len(pdf.pages) == count
    assert all(value in text for value in amounts + ['Same Resident', 'HH-2', '2026-10', 'WaterHall', 'TAGPOPONGAN'])
    assert '987.00' not in text and '99.00' not in text
    assert 'Not recorded' in text  # Legacy missing transaction details remain explicit.
    if kind == 'name': assert '170.25' not in text
    if os.getenv('TEST_ARTIFACT_DIR'):
        target = Path(os.environ['TEST_ARTIFACT_DIR']); target.mkdir(parents=True, exist_ok=True)
        (target / f'receipt-{kind}-{width}.pdf').write_bytes(path.read_bytes())
        page.screenshot(path=str(target / f'receipt-output-{kind}-{width}.png'), full_page=True)
    assert snapshot() == before and browser_page[3] == []


def test_pdf_preserves_unicode_zero_amount_and_missing_date(browser_page, receipt_data, tmp_path):
    with get_db() as db:
        db.execute("UPDATE households SET family_head_name='Tañaña Dela Cruz' WHERE household_id=2")
        db.execute("UPDATE billing_records SET total_amount=0,payment_date=NULL,collected_by=NULL WHERE bill_id=3")
    before = snapshot(); page = open_receipts(browser_page)
    page.locator('#receipt-search').fill('tañ')
    page.locator('#receipt-matches [data-house-id="HH-2"]').click()
    page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(1)
    with page.expect_download() as downloaded: page.locator('#receipt-download').click()
    path = tmp_path / 'unicode.pdf'; downloaded.value.save_as(path)
    pdf = PdfReader(path); text = '\n'.join(p.extract_text() for p in pdf.pages)
    assert 'Tañaña Dela Cruz' in text and '₱0.00' in text and text.count('Not recorded') >= 3
    assert not pdf.attachments
    # jsPDF's default OpenAction is an inert page-fit destination array, not JS.
    catalog = pdf.trailer['/Root']
    assert isinstance(catalog.get('/OpenAction'), list)
    assert '/AA' not in catalog and '/JavaScript' not in catalog.get('/Names', {})
    if os.getenv('TEST_ARTIFACT_DIR'):
        (Path(os.environ['TEST_ARTIFACT_DIR']) / 'receipt-unicode.pdf').write_bytes(path.read_bytes())
    assert snapshot() == before and browser_page[3] == []


def test_receipt_selection_month_and_clear_invalidate_output(browser_page, receipt_data):
    page = open_receipts(browser_page)
    page.locator('#receipt-search').fill('same')
    page.locator('#receipt-matches [data-house-id="HH-2"]').click()
    expect(page.locator('#receipt-print')).to_be_disabled()
    page.locator('#receipt-preview-button').click()
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(1)
    with page.expect_popup() as popup: page.locator('#receipt-print').click()
    page.wait_for_function('()=>window.printCalls===1')
    page.locator('#receipt-search').fill('   ')
    expect(page.locator('#receipt-matches')).to_be_empty()
    expect(page.locator('#receipt-selected')).to_be_empty()
    expect(page.locator('#receipt-preview')).to_be_empty()
    expect(page.locator('#receipt-print')).to_be_disabled()
    expect(page.locator('#receipt-download')).to_be_disabled()
    assert popup.value.is_closed()
    page.locator('#receipt-search').fill('same')
    page.locator('#receipt-matches [data-house-id="HH-2"]').click()
    page.locator('#receipt-month').fill('2026-09')
    expect(page.locator('#receipt-selected')).to_be_empty()
    expect(page.locator('#receipt-preview-button')).to_be_disabled()
    expect(page.locator('#receipt-matches button')).to_have_count(1)
    expect(page.locator('#receipt-matches button')).to_have_attribute('data-house-id', 'HH-1')
    assert browser_page[3] == []


def test_cleared_query_cannot_receive_late_results(browser_page, receipt_data):
    page = open_receipts(browser_page)
    page.evaluate('''()=>{const original=window.fetch;window.fetch=async(...args)=>{
      const result=await original(...args);
      if(String(args[0]).includes('view=recipients')) await new Promise(resolve=>setTimeout(resolve,800));
      return result;};}''')
    page.locator('#receipt-search').fill('same'); page.wait_for_timeout(300)
    page.locator('#receipt-search').fill(''); page.wait_for_timeout(900)
    expect(page.locator('#receipt-matches')).to_be_empty()
    expect(page.locator('#receipt-preview-button')).to_be_disabled()
    assert browser_page[3] == []


def test_changed_paid_records_cannot_be_downloaded(browser_page, receipt_data):
    page = open_receipts(browser_page, 'all')
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
    page.locator('#receipt-bulk-confirm').check()
    downloads = []; page.on('download', lambda download: downloads.append(download))
    with get_db() as db: db.execute("UPDATE billing_records SET payment_status='Unpaid' WHERE meter_id=2")
    page.locator('#receipt-download').click()
    expect(page.locator('#receipt-message')).to_contain_text('Records changed')
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(1)
    assert downloads == [] and browser_page[3] == []


def test_popup_blocking_is_visible_and_pdf_still_works(browser_page, receipt_data, tmp_path):
    page = open_receipts(browser_page, 'all')
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
    page.locator('#receipt-bulk-confirm').check()
    page.evaluate('window.open=()=>null')
    page.locator('#receipt-print').click()
    expect(page.locator('#receipt-message')).to_contain_text('Allow popups for WaterHall')
    expect(page.locator('#receipt-download')).to_be_enabled()
    with page.expect_download() as downloaded: page.locator('#receipt-download').click()
    path = tmp_path / 'blocked-popup.pdf'; downloaded.value.save_as(path)
    assert len(PdfReader(path).pages) == 2
    assert page.evaluate('window.printCalls') == 0 and browser_page[3] == []


def test_print_window_reserved_before_slow_paid_record_verification(browser_page, receipt_data):
    page = open_receipts(browser_page, 'all')
    expect(page.locator('#receipt-preview .receipt-sheet')).to_have_count(2)
    page.locator('#receipt-bulk-confirm').check()
    page.evaluate('''()=>{const originalFetch=window.fetch,originalOpen=window.open;
      window.open=(...args)=>{window.outputActivation=navigator.userActivation.isActive;return originalOpen(...args);};
      window.fetch=async(...args)=>{const response=await originalFetch(...args);
        if(String(args[0]).includes('/api/admin/receipts?')) await new Promise(resolve=>setTimeout(resolve,6000));
        return response;};}''')
    with page.expect_popup() as popup: page.locator('#receipt-print').click()
    assert page.evaluate('window.outputActivation') is True
    expect(popup.value.get_by_role('status')).to_have_text('Verifying selected paid receipts…')
    expect(popup.value.get_by_role('button', name='Print Receipt')).to_be_disabled()
    expect(page.locator('#receipt-print')).to_be_disabled()
    page.wait_for_function('()=>window.printCalls===1', timeout=20000)
    expect(popup.value.locator('.receipt-sheet')).to_have_count(2)
    expect(popup.value.get_by_role('button', name='Print Receipt')).to_be_enabled()
    popup.value.get_by_role('button', name='Print Receipt').click()
    page.wait_for_function('()=>window.printCalls===2')
    assert browser_page[3] == []
