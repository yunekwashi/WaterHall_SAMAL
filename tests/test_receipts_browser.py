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


def open_receipts(surface):
    page = admin(surface)
    page.locator('[data-tab="tab-billing"]').click()
    page.locator('#export-filter-bill-month').fill('2026-10')
    page.locator('#btn-print-receipts').click()
    page.evaluate('()=>{window.printCalls=0; window.print=()=>{window.printCalls++};}')
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
