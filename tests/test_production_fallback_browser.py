"""Production fallback through unchanged dashboards, APIs and automatic polling."""
import datetime
import os
import pytest
from playwright.sync_api import expect
from test_browser import browser_page
from test_monitoring_ui import ui_page, login, selectors, DEVICE

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome checks')


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
@pytest.mark.parametrize('width', [320, 1280])
def test_live_level_with_both_uncalibrated_sensors_null(ui_page, role, width):
    page, origin, _, errors = ui_page
    page.set_viewport_size({'width': width, 'height': 844})
    def ingest(level):
        response = page.request.post(origin + '/api/iot/telemetry', headers=DEVICE,
            data={'water_level_percentage': level, 'turbidity_ntu': None,
                  'tds_ppm': None, 'calibration_required': True})
        assert response.status == 200
    ingest(78)
    page.clock.install()
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=2))
    login(ui_page, role)
    level, turb, tds, tank = selectors(role)
    for percent in [78, 75, 80]:
        ingest(percent)
        page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=2))
        page.clock.fast_forward(60000)
        expect(page.locator(level)).to_have_text(f'{percent}%')
        expect(page.locator(tank)).to_have_attribute('aria-valuenow', str(percent))
        for sensor in [turb, tds]:
            expect(page.locator(sensor)).to_have_text('Awaiting data' if role == 'admin' else 'N/A')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert errors == []
