"""UI-only release checks in Chrome, using disposable databases and actual APIs."""
import datetime
import os
from pathlib import Path

import pytest
from playwright.sync_api import expect
from backend.db_adapter import get_db
from backend.server import IOT_DEVICE_SECRET
from test_browser import browser_page

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome UI checks')
DEVICE = {'X-IoT-Secret': IOT_DEVICE_SECRET}


@pytest.fixture
def ui_page(browser_page):
    original, origin, system, _ = browser_page
    context = original.context.browser.new_context(timezone_id='Asia/Shanghai')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    yield page, origin, system, errors
    context.close()


def login(ui, role):
    page, origin, (_, _, password), _ = ui
    if role == 'admin':
        page.goto(origin + '/admin/')
        page.locator('#login-username').fill('admin')
        page.locator('#login-password').fill(password)
        page.locator('#btn-login').click()
        expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
        page.locator('[data-tab="tab-assets"]').click()
    else:
        page.goto(origin + '/index.html?role=' + role)
        page.locator('#employee-id').fill('HH-1' if role == 'resident' else 'worker')
        page.locator('#login-password').fill(password)
        page.locator('#btn-login').click()
        expect(page.locator('#view-resident-home' if role == 'resident' else '#view-dashboard')).to_be_visible()


def selectors(role):
    if role == 'admin':
        return '#admin-water-level', '#admin-turbidity', '#admin-tds', '#admin-water-tank'
    return f'#{role}-tank-val', f'#{role}-turb-val', f'#{role}-tds-val', f'#{role}-water-tank'


def post(page, origin, level, tds):
    reply = page.request.post(origin + '/api/iot/telemetry', headers=DEVICE,
                              data={'water_level_percentage': level, 'turbidity_ntu': 2.31, 'tds_ppm': tds})
    assert reply.status == 200


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
@pytest.mark.parametrize('width', [320, 390, 768, 1280])
def test_tank_levels_numeric_and_null_tds_through_existing_poll(ui_page, role, width):
    page, origin, _, errors = ui_page
    page.set_viewport_size({'width': width, 'height': 844})
    post(page, origin, 0, None)
    page.clock.install()
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=2))
    login(ui_page, role)
    level, turb, tds, tank = selectors(role)
    for percent in [0, 25, 50, 75, 100]:
        post(page, origin, percent, None)
        # The DB records wall time; keep the fixed browser clock after each new row.
        page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=2))
        page.clock.fast_forward(60000)
        expect(page.locator(level)).to_have_text(f'{percent}%')
        expect(page.locator(turb)).to_have_text('2.31 NTU' if role == 'admin' else '2.3')
        expect(page.locator(tds)).to_have_text('Awaiting data' if role == 'admin' else 'N/A')
        expect(page.locator(tank)).to_have_attribute('aria-valuenow', str(percent))
        ratio = page.locator(tank).evaluate('e => e.querySelector(".tank-water").getBoundingClientRect().height / e.clientHeight')
        assert abs(ratio - percent / 100) < 0.015
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        if role != 'admin':
            card = page.locator(tank).locator('xpath=ancestor::section')
            assert card.evaluate('root => [...root.querySelectorAll("*")].every(e => {const r=e.getBoundingClientRect();return !r.width || !r.height || (r.left>=-1 && r.right<=innerWidth+1);})')
        if width == 390:
            output = os.getenv('UI_SCREENSHOT_OUTPUT')
            if output:
                Path(output).mkdir(parents=True, exist_ok=True)
                card = page.locator('#tab-assets .glass-panel') if role == 'admin' else page.locator(tank).locator('xpath=ancestor::section')
                card.screenshot(path=str(Path(output) / f'{role}-{percent}.png'))
    # Numeric zero is a reading, never an unavailable sentinel.
    for numeric in [0, 137]:
        post(page, origin, 75, numeric)
        page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=2))
        page.clock.fast_forward(60000)
        expect(page.locator(tds)).to_have_text(f'{numeric} ppm' if role == 'admin' else str(numeric))
        if role != 'admin':
            expect(page.locator(tds + ' + small')).to_be_visible()
    assert errors == []


@pytest.mark.parametrize('role', ['resident', 'worker'])
def test_cached_stale_state_on_failed_poll_keeps_session(ui_page, role):
    page, origin, _, errors = ui_page
    post(page, origin, 75, None)
    page.clock.install()
    login(ui_page, role)
    _, _, _, tank = selectors(role)
    expect(page.locator(tank)).to_have_attribute('aria-valuenow', '75')
    page.route('**/api/all-data*', lambda route: route.abort())
    page.clock.fast_forward(661000)
    expect(page.locator(f'#{role}-safety-status')).not_to_have_text('NO ALERT')
    expect(page.locator(f'#{role}-telemetry-freshness')).not_to_contain_text('Current')
    expect(page.locator(tank)).not_to_have_attribute('aria-valuenow', '75')
    assert page.evaluate("localStorage.getItem('waterhall_jwt') !== null")
    assert errors == []


@pytest.mark.parametrize('role', ['resident', 'worker'])
def test_announcement_preview_and_history_format_without_realert(ui_page, role):
    page, _, _, errors = ui_page
    with get_db() as db:
        db.execute("INSERT INTO announcements (id,message,author,target_audience,timestamp) VALUES (100,'Original water quality alert text.','System Sensor Alert','Everyone','2026-10-07T14:04:50.941513+00:00')")
    login(ui_page, role)
    expect(page.locator(f'#{role}-announcement-tag')).to_contain_text('Oct 7, 2026 • 10:04 PM')
    expect(page.locator(f'#{role}-announcement-message')).to_have_text('Original water quality alert text.')
    nav = '#resident-bottom-nav' if role == 'resident' else '#app-bottom-nav'
    page.locator(nav + ' [data-target="view-announcements"]').click()
    expect(page.locator('.announcement-meta')).to_contain_text('System Sensor Alert')
    expect(page.locator('.announcement-meta')).to_contain_text('Oct 7, 2026 • 10:04 PM')
    assert '2026-10-07T' not in page.locator('#announcement-history').inner_text()
    assert errors == []


@pytest.mark.parametrize('zone,expected', [('Asia/Shanghai','Oct 7, 2026 • 10:04 PM'),
                                          ('UTC','Oct 7, 2026 • 2:04 PM'),
                                          ('America/New_York','Oct 7, 2026 • 10:04 AM')])
def test_shared_timestamp_formatter_offsets_fractional_and_naive_utc(browser_page, zone, expected):
    original, origin, _, _ = browser_page
    context = original.context.browser.new_context(timezone_id=zone)
    page = context.new_page()
    page.goto(origin + '/admin/')
    values = ['2026-10-07T14:04:50.941513+00:00', '2026-10-07 14:04:50.000',
              '2026-10-07T22:04:50+08:00', '2026-10-07T14:04:50Z', '2026-10-07T14:04:50+0000']
    assert page.evaluate('xs => xs.map(x => WaterHallDisplay.formatTimestamp(x))', values) == [expected] * len(values)
    assert page.evaluate('xs => xs.map(x => WaterHallDisplay.formatTimestamp(x))', [None, '', 'not-a-date']) == ['Awaiting data'] * 3
    context.close()
