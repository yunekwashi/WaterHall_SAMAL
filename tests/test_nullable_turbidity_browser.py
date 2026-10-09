"""Nullable turbidity proposal through unchanged dashboards and polling."""
import datetime
import os
import pytest
from playwright.sync_api import expect
from test_browser import browser_page
from test_monitoring_ui import ui_page, login, selectors, DEVICE

pytestmark=pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS')!='1',reason='Opt-in actual Chrome checks')

@pytest.mark.parametrize('role',['admin','resident','worker'])
def test_null_turbidity_keeps_other_sensors_then_recovers(ui_page,role):
    page,origin,_,errors=ui_page
    def ingest(turbidity,tds):
        result=page.request.post(origin+'/api/iot/telemetry',headers=DEVICE,
            data={'water_level_percentage':78,'turbidity_ntu':turbidity,'tds_ppm':tds})
        assert result.status==200
    ingest(None,137)
    page.clock.install()
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
    login(ui_page,role)
    level,turb,tds,tank=selectors(role)
    expect(page.locator(level)).to_have_text('78%')
    expect(page.locator(tank)).to_have_attribute('aria-valuenow','78')
    expect(page.locator(turb)).to_have_text('Unavailable')
    expect(page.locator(tds)).to_have_text('137 ppm' if role=='admin' else '137')
    for value in [0,2.31,None]:
        ingest(value,None)
        page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
        page.clock.fast_forward(60000)
        # The new local index is a separate quantity; legacy NTU is never relabeled.
        expected='Unavailable'
        expect(page.locator(turb)).to_have_text(expected)
        expect(page.locator(level)).to_have_text('78%')
        expect(page.locator(tds)).to_have_text('Awaiting data' if role=='admin' else 'N/A')
    assert errors==[]
