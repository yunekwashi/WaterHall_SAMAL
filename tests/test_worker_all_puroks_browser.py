"""All-purok Worker UI and cached operations, on disposable accounts only."""
import os

import pytest
from playwright.sync_api import expect

from backend.db_adapter import get_db
from test_browser import browser_page
from test_admin_password_reset_browser import admin
from test_mobile_release import login
from test_worker_all_puroks import eight_puroks

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome tests')


def fill_worker(page, password):
    page.locator('#btn-add-worker').click()
    page.locator('#work-name').fill('Future Worker')
    page.locator('#work-contact').fill('09171234567')
    page.locator('#work-password').fill(password)
    page.locator('#work-verify-password').fill(password)


@pytest.mark.parametrize('width', [360, 1280])
def test_admin_worker_directory_and_registration_without_purok(browser_page, width):
    page, _, (_, _, password), errors = browser_page
    page.set_viewport_size({'width': width, 'height': 850})
    admin(browser_page)
    table = page.locator('#worker-tbody').locator('..')
    assert table.locator('th').all_text_contents() == ['Emp ID', 'Name', 'Role', 'Action']
    assert page.locator('#worker-tbody tr').count() == 2
    assert page.locator('#worker-tbody tr').first.locator('td').count() == 4
    assert 'PUROK' in page.locator('#resident-tbody').locator('..').locator('thead').inner_text().upper()
    reset = page.locator('[data-reset-password="worker"]')
    assert reset.evaluate('e=>getComputedStyle(e).whiteSpace') == 'nowrap'
    fill_worker(page, password)
    assert 'purok' not in page.locator('#modal-worker').inner_text().lower()
    assert page.locator('#modal-worker').evaluate('e=>e.querySelector(".modal").getBoundingClientRect().right<=innerWidth+1')
    messages = []
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    with page.expect_response(lambda r: r.url.endswith('/api/workers/add')) as response:
        page.locator('#btn-work-save').click()
    assert response.value.status == 200
    assert 'zone' not in response.value.request.post_data_json
    expect(page.locator('#modal-worker')).to_be_hidden()
    expect(page.locator('#worker-tbody')).to_contain_text('EMP-001')
    assert any('registered successfully' in m and 'EMP-001' in m for m in messages)
    with get_db() as db:
        db.execute("SELECT assigned_zone FROM users WHERE username='EMP-001'")
        assert db.fetchone()['assigned_zone'] is None
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert errors == []


@pytest.mark.parametrize('receipt', [{}, {'status': 'success', 'role': 'Admin', 'worker_id': 'EMP-001'},
                                   {'status': 'success', 'role': 'Collector', 'worker_id': 'EMP-001', 'employee_id': 'EMP-002'}])
def test_unconfirmed_worker_registration_never_reports_success(browser_page, receipt):
    page, _, (_, _, password), errors = browser_page
    admin(browser_page)
    page.route('**/api/workers/add', lambda route: route.fulfill(status=200, json=receipt))
    fill_worker(page, password)
    messages = []
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    page.locator('#btn-work-save').click()
    expect(page.locator('#btn-work-save')).to_be_enabled()
    expect(page.locator('#modal-worker')).to_be_visible()
    assert messages and all('could not be confirmed' in m for m in messages)
    with get_db() as db:
        db.execute("SELECT COUNT(*) AS n FROM users WHERE role='Collector'")
        assert db.fetchone()['n'] == 2
    assert errors == []


def test_worker_searches_all_eight_puroks_with_legacy_session_and_offline_cache(browser_page, eight_puroks):
    page, origin, (_, _, password), errors = browser_page
    page.set_viewport_size({'width': 360, 'height': 800})
    login(page, origin, password, 'worker')
    page.evaluate("""()=>{const key='waterhall_session';const s=JSON.parse(localStorage.getItem(key));
        s.selected_zone='Purok 1';localStorage.setItem(key,JSON.stringify(s));}""")
    page.reload()
    expect(page.locator('#view-dashboard')).to_be_visible()
    page.locator('[data-target="view-profile"]').click()
    expect(page.locator('#worker-name')).to_have_text('worker')
    assert 'Assigned' not in page.locator('#view-profile').inner_text()
    assert page.locator('#worker-zone-lbl').count() == 0
    page.locator('[data-target="view-directory"]').click()
    expect(page.locator('.household-card')).to_have_count(9)
    for p in range(1, 9):
        expect(page.locator('#dir-household-list')).to_contain_text(f'Purok {p}')
    page.locator('[data-target="view-billing"]').click()
    search = page.locator('#bill-meter-search')
    assert page.locator('.bill-search-field input').count() == 1
    search.fill('rEY')
    expect(page.locator('#bill-meter-results button')).to_have_count(8)
    page.locator('#bill-search-id').click()
    search.fill('1')
    expect(page.locator('#bill-meter-results button')).to_have_count(8)
    search.fill('71')
    page.locator('#bill-meter-results button').click()
    expect(page.locator('#bill-selected-details')).to_contain_text('HH-71')
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM billing_records')
        assert db.fetchone()['n'] == 1  # Selection must not create a bill.
    page.evaluate('async()=>{await navigator.serviceWorker.ready}')
    page.context.set_offline(True)
    page.locator('#bill-curr-input').fill('1')
    page.locator('#btn-save-bill').click()
    page.locator('[data-target="view-transactions"]').click()
    expect(page.locator('#transaction-list')).to_contain_text('Pending Sync')
    expect(page.locator('#transaction-list')).to_contain_text('Rey Purok 8')
    page.reload()
    expect(page.locator('#view-dashboard')).to_be_visible()
    page.locator('[data-target="view-billing"]').click()
    page.locator('#bill-search-name').click()
    search.fill('rEY')
    expect(page.locator('#bill-meter-results button')).to_have_count(8)
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_unsynced_actions')).length") == 1
    page.context.set_offline(False)
    page.wait_for_function("()=>JSON.parse(localStorage.getItem('waterhall_unsynced_actions')||'[]').length===0")
    page.locator('[data-target="view-transactions"]').click()
    expect(page.locator('#transaction-list')).to_contain_text('Synced')
    expect(page.locator('#transaction-list')).to_contain_text('Rey Purok 8')
    with get_db() as db:
        db.execute("SELECT b.billed_by,u.user_id FROM billing_records b JOIN water_meters m ON b.meter_id=m.meter_id JOIN users u ON u.username='worker' WHERE m.household_id=71")
        row = db.fetchone()
        assert row['billed_by'] == row['user_id']
        db.execute('SELECT COUNT(*) AS n FROM billing_records')
        assert db.fetchone()['n'] == 2
    assert errors == []
