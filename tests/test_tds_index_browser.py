"""Actual three-dashboard rendering and unchanged poll/expiry mechanisms."""
import datetime
import os

import pytest
from playwright.sync_api import expect
from test_browser import browser_page
from test_monitoring_ui import ui_page, login
from test_tds_index import packet, DEVICE

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome')


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
@pytest.mark.parametrize('width', [320, 1280])
def test_anchors_status_null_stale_fresh_recovery(ui_page, role, width):
    page, origin, _, errors = ui_page
    page.set_viewport_size({'width': width, 'height': 844})
    def ingest(volts, **changes):
        reply = page.request.post(origin+'/api/iot/telemetry', headers=DEVICE, data=packet(volts, **changes))
        assert reply.status == 200
    def poll():
        page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
        with page.expect_response(lambda reply: '/api/all-data' in reply.url and reply.request.method == 'GET') as fetched:
            page.clock.fast_forward(60000)
        fetched.value.finished()
    ingest(.332)
    page.clock.install()
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
    login(ui_page, role)
    value = page.locator('#admin-tds' if role == 'admin' else f'#{role}-tds-val')
    status = page.locator('#admin-tds-status' if role == 'admin' else f'#{role}-tds-status')
    expect(value).to_have_text('0.00')
    expect(status).to_have_text('Normal')
    for volts, expected, state in [(.459, '10.00', 'Elevated'), (.335, '0.24', 'Normal'), (.6, '21.10', 'Elevated')]:
        ingest(volts); ingest(volts); poll()
        expect(value).to_have_text(expected)
        expect(status).to_have_text(state)
    ingest(.335, tds_raw_adc=4095, tds_signal_valid=False, tds_index=None); poll()
    fallback = 'Awaiting data' if role == 'admin' else 'N/A'
    expect(value).to_have_text(fallback)
    expect(status).to_have_text('Unavailable')
    ingest(.335); poll()
    expect(value).to_have_text('0.24')
    page.route('**/api/all-data*', lambda route: route.abort())
    page.route('**/api/iot/latest*', lambda route: route.abort())
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=61))
    page.clock.fast_forward(61000)
    expect(value).to_have_text(fallback)
    expect(status).to_have_text('Unavailable')
    page.unroute('**/api/all-data*'); page.unroute('**/api/iot/latest*')
    ingest(.332); poll()
    expect(value).to_have_text('0.00')
    expect(status).to_have_text('Normal')
    card = page.locator('#tab-assets .glass-panel') if role=='admin' else value.locator('xpath=ancestor::section')
    expect(card).to_contain_text('TDS Index')
    expect(card).to_contain_text('Provisional')
    assert not card.locator('small').filter(has_text='ppm').count()
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert errors == []
