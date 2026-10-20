import io
import os
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
    page.wait_for_function('()=>hasAdminData')
    page.locator('[data-tab="tab-billing"]').click()
    page.locator('#export-filter-bill-month').fill(month)
    page.locator('#export-filter-bill-purok').select_option(purok)
    page.evaluate('()=>{window.printCalls=0; window.print=()=>{window.printCalls++};}')
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
    page.emulate_media(media='print')
    pdf = PdfReader(io.BytesIO(page.pdf(format='A4')))
    text = '\n'.join(p.extract_text() for p in pdf.pages)
    assert '222.50' in text and 'HH-2' in text and 'TAGPOPONGAN' in text
    assert '987.00' not in text and '99.00' not in text
    page.emulate_media(media='screen'); page.evaluate("dispatchEvent(new Event('afterprint'))")
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
    page.emulate_media(media='print')
    pdf = PdfReader(io.BytesIO(page.pdf(format='A4')))
    assert len(pdf.pages) == 2
    text = '\n'.join(p.extract_text() for p in pdf.pages)
    # Chrome's PDF font extraction represents the rendered hyphen as U+2212.
    assert all(x in text.replace('\u2212', '-') for x in ['170.25', '222.50', 'HH-1', 'HH-2', '2026-10']), repr(text)
    assert '987.00' not in text and '99.00' not in text
    page.emulate_media(media='screen'); page.evaluate("dispatchEvent(new Event('afterprint'))")
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
def test_single_print_dropdown_preserves_exports_and_filtered_table(browser_page, receipt_data, width):
    page = browser_page[0]; page.set_viewport_size({'width': width, 'height': 850})
    before = snapshot(); open_billing(browser_page)
    page.locator('#export-filter-bill-status').select_option('Paid')
    expect(page.locator('#admin-billing-tbody tr')).to_have_count(5)
    original_table = page.locator('#admin-billing-tbody').inner_html()
    toolbar = page.locator('.export-toolbar').filter(has=page.locator('#btn-billing-print'))
    assert toolbar.locator('button:visible').all_text_contents() == ['CSV', 'Excel (XLSX)', 'PDF', 'Print ']
    expect(page.get_by_role('button', name='Receipts', exact=True)).to_have_count(0)
    trigger = page.locator('#btn-billing-print'); menu = page.locator('#billing-print-menu')
    trigger.click(); expect(trigger).to_have_attribute('aria-expanded', 'true')
    page.evaluate("document.querySelector('.main-content').dispatchEvent(new Event('scroll'))")
    expect(menu).to_be_visible()
    assert menu.get_by_role('menuitem').all_text_contents() == ['Print Billing Table', 'Print Receipt by Name', 'Print All Receipts']
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
    expect(page.locator('#btn-print-billing-table')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-print-receipts')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-print-all-receipts')).to_be_focused()
    page.keyboard.press('ArrowDown'); expect(page.locator('#btn-print-billing-table')).to_be_focused()
    page.keyboard.press('End'); expect(page.locator('#btn-print-all-receipts')).to_be_focused()
    page.keyboard.press('Home'); expect(page.locator('#btn-print-billing-table')).to_be_focused()
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
