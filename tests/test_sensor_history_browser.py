"""Real-browser history navigation, paging, responsive layout and session cleanup."""
import datetime as dt
import os
from pathlib import Path

import pytest
from playwright.sync_api import expect

from test_browser import browser_page
from test_sensor_history import seed

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in real browser tests')


def login(page, origin, password):
    page.goto(origin + '/admin/')
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#loading-overlay')).to_be_hidden()


@pytest.mark.parametrize('width', [320, 768, 1024, 1440])
def test_history_filters_paging_nulls_and_layout(browser_page, width):
    page, origin, (_, _, password), errors = browser_page
    page.set_viewport_size({'width': width, 'height': 900})
    now = dt.datetime.now(dt.timezone.utc)
    for number in range(27):
        seed((now - dt.timedelta(seconds=number)).strftime('%Y-%m-%d %H:%M:%S'),
             None if number == 0 else number, None if number == 0 else 0,
             None if number == 0 else 2.83, 'Unavailable' if number == 0 else 'Normal')
    seed((now - dt.timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'), 88, 6.34, 2.83, 'Elevated')
    login(page, origin, password)
    requests = []
    page.on('request', lambda req: requests.append(req.url) if '/api/iot/history?' in req.url else None)
    assert requests == []
    page.locator('[data-tab="tab-sensor-history"]').click()
    expect(page.locator('#sensor-history-tbody tr')).to_have_count(25)
    expect(page.locator('#page-title')).to_have_text('Sensor Reading History')
    first = page.locator('#sensor-history-tbody tr').first
    assert first.locator('td').all_text_contents()[1:] == ['N/A', 'N/A', 'Unavailable', 'N/A', 'Unavailable']
    assert page.locator('#sensor-history-tbody tr').nth(1).locator('td').all_text_contents()[1:] == ['1%', '0.00', 'Normal', '2.83', 'Normal']
    assert 'filter=today' in requests[-1] and 'page_size=25' in requests[-1]
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    if os.getenv('HISTORY_SCREENSHOT_DIR'):
        page.screenshot(path=str(Path(os.environ['HISTORY_SCREENSHOT_DIR']) / f'history-{width}.png'), full_page=True)
    page.locator('#history-next').click()
    expect(page.locator('#sensor-history-tbody tr')).to_have_count(2)
    expect(page.locator('#history-next')).to_be_disabled()
    page.locator('#history-previous').click()
    expect(page.locator('#sensor-history-tbody tr')).to_have_count(25)
    page.locator('#history-period').select_option('yesterday')
    page.locator('#history-apply').click()
    expect(page.locator('#sensor-history-tbody tr')).to_have_count(1)
    expect(page.locator('#sensor-history-tbody')).to_contain_text('88%')
    page.locator('#history-period').select_option('week')
    page.locator('#history-apply').click()
    expect(page.locator('#history-message')).to_contain_text('newest first')
    page.locator('#history-period').select_option('custom')
    today = page.evaluate("new Date().toLocaleDateString('en-CA')")
    page.locator('#history-start').fill(today)
    page.locator('#history-end').fill(today)
    page.locator('#history-apply').click()
    expect(page.locator('#sensor-history-tbody tr')).to_have_count(25)
    page.locator('[data-tab="tab-assets"]').click()
    expect(page.locator('#admin-water-level')).to_be_visible()
    page.locator('#btn-logout').click()
    expect(page.locator('#login-screen')).to_be_visible()
    assert page.locator('#sensor-history-tbody tr').count() == 0
    assert errors == []


def test_late_history_response_cannot_restore_logged_out_readings(browser_page):
    page, origin, (_, _, password), errors = browser_page
    seed(dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M:%S'))
    login(page, origin, password)
    page.evaluate('''() => {
      const original = window.fetch;
      window.fetch = (url, options) => String(url).includes('/api/iot/history?') ?
        new Promise(resolve => { window.finishHistory = () => resolve(new Response(JSON.stringify({
          readings: [{recorded_at:'2026-10-12 06:00:00',water_level_percentage:88,
            turbidity_index:1,turbidity_status:'Normal',tds_index:2,tds_status:'Normal'}],
          next_cursor:null,start_date:'2026-10-12',end_date:'2026-10-12'}),{status:200})); }) : original(url, options);
    }''')
    page.locator('[data-tab="tab-sensor-history"]').click()
    page.wait_for_function('typeof window.finishHistory === "function"')
    # Exercise the same cleanup without logout's page reload discarding the delayed transport.
    page.evaluate('clearAdminSession(); window.finishHistory()')
    page.wait_for_timeout(150)
    assert page.locator('#sensor-history-tbody tr').count() == 0
    assert errors == []


def test_history_error_retry_and_empty_state(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login(page, origin, password)
    page.route('**/api/iot/history?**', lambda route: route.fulfill(status=500, json={'msg':'Unable to complete request'}))
    page.locator('[data-tab="tab-sensor-history"]').click()
    expect(page.locator('#history-message')).to_have_text('History could not load. Please retry.')
    expect(page.locator('#history-refresh')).to_be_enabled()
    page.unroute('**/api/iot/history?**')
    page.locator('#history-refresh').click()
    expect(page.locator('#history-message')).to_have_text('No sensor readings for this date range.')
    assert errors == []
