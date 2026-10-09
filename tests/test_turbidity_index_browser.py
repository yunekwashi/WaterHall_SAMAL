"""All actual dashboards, existing polling, local index and truthful stale/null UI."""
import datetime
import os
from pathlib import Path

import pytest
from playwright.sync_api import expect
from test_browser import browser_page
from test_monitoring_ui import ui_page, login, selectors, DEVICE
from test_turbidity_index import packet, approved_local_index
from backend import turbidity_index as index

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in real Chrome regression')


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
@pytest.mark.parametrize('width', [320, 1280])
def test_index_clear_cloudy_return_invalid_and_polling(ui_page, role, width):
    page, origin, _, errors = ui_page
    page.set_viewport_size({'width': width, 'height': 844})
    def ingest(volts, **changes):
        result = page.request.post(origin+'/api/iot/telemetry', headers=DEVICE, data=packet(volts, **changes))
        assert result.status == 200
    def advance():
        page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
        with page.expect_response(lambda reply: '/api/all-data' in reply.url and reply.request.method == 'GET') as fetched:
            page.clock.fast_forward(60000)
        fetched.value.finished()
    ingest(index.CLEAR_ADC_VOLTS)
    page.clock.install()
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
    login(ui_page, role)
    level, turb, tds, tank = selectors(role)
    status = '#admin-turbidity-status' if role == 'admin' else f'#{role}-safety-status'
    expect(page.locator(turb)).to_have_text('0.00')
    expect(page.locator(status)).to_have_text('Normal')
    # Two actual authenticated POSTs confirm elevation, existing client polling changes UI.
    # API fixtures use the latest measured anchors/return; physical capture
    # approval remains a separate gate outside browser tests.
    for volts, expected, state in [(index.CLOUDY_ADC_VOLTS, '10.00', 'Elevated'), (.830, '0.31', 'Normal')]:
        ingest(volts); ingest(volts); advance()
        expect(page.locator(turb)).to_have_text(expected)
        expect(page.locator(status)).to_have_text(state)
        expect(page.locator(level)).to_have_text('78%')
        expect(page.locator(tank)).to_have_attribute('aria-valuenow','78')
        expect(page.locator(tds)).to_have_text('Awaiting data' if role=='admin' else 'N/A')
    ingest(.830, turbidity_raw_adc=4095, turbidity_signal_valid=False, turbidity_index=None)
    advance()
    expect(page.locator(turb)).to_have_text('Unavailable')
    expect(page.locator(status)).to_have_text('Unavailable')
    expect(page.locator(level)).to_have_text('78%')
    # Historical/unverified NTU must never be relabeled as a local index.
    assert page.request.post(origin+'/api/iot/telemetry', headers=DEVICE,
        data={'water_level_percentage':78,'turbidity_ntu':34.9,'tds_ppm':None}).status == 200
    advance()
    expect(page.locator(turb)).to_have_text('Unavailable')
    ingest(index.CLEAR_ADC_VOLTS); advance()
    expect(page.locator(turb)).to_have_text('0.00')
    expect(page.locator(status)).to_have_text('Normal')
    card = page.locator('#tab-assets .glass-panel') if role=='admin' else page.locator(tank).locator('xpath=ancestor::section')
    expect(card).to_contain_text('Turbidity Index')
    expect(card).to_contain_text('Provisional')
    expect(card).to_contain_text('Baseline drift remains unresolved')
    assert not card.locator('small').filter(has_text='NTU').count()
    assert 'do not certify drinking-water safety' in card.inner_text()
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    date = page.locator('#admin-reading-time' if role=='admin' else f'#{role}-reading-time').inner_text()
    assert '2026-' not in date and ('AM' in date or 'PM' in date)
    output = os.getenv('UI_SCREENSHOT_OUTPUT')
    if output:
        Path(output).mkdir(parents=True, exist_ok=True)
        card.screenshot(path=str(Path(output)/f'index-{role}-{width}.png'))
    # Stale cached index becomes unavailable while the original session survives.
    page.route('**/api/all-data*',lambda route:route.abort())
    page.route('**/api/iot/latest*',lambda route:route.abort())
    # set_fixed_time freezes Date.now even as timers advance; explicitly age the
    # wall clock so this is a real stale-cache check rather than a frozen date.
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=123))
    page.clock.fast_forward(121000)
    expect(page.locator(turb)).to_have_text('Unavailable')
    expect(page.locator(status)).to_have_text('Unavailable')
    assert errors == []
