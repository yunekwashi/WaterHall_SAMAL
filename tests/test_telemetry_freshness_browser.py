"""Whole-device expiry and recovery on each real client; no physical/production writes."""
import datetime
import os

import pytest
from playwright.sync_api import expect
from backend.db_adapter import get_db
from test_browser import browser_page
from test_monitoring_ui import ui_page, login, selectors, DEVICE
from test_turbidity_index import packet
from backend import turbidity_index as index

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome')


def assert_snapshot(page, role, assets, fresh):
    level, turb, tds, tank = selectors(role)
    unavailable = 'Awaiting data' if role == 'admin' else 'N/A'
    numeric_level = fresh and isinstance(assets.get('main_tank_level'), (int, float))
    numeric_tds = fresh and isinstance(assets.get('tds_index'), (int, float)) and assets.get('tds_index_status') in ('Normal', 'Elevated')
    numeric_index = fresh and assets.get('turbidity_index') is not None and assets.get('turbidity_index_status') in ('Normal', 'Elevated')
    expect(page.locator(level)).to_have_text(f"{assets['main_tank_level']}%" if numeric_level else unavailable)
    expect(page.locator(tds)).to_have_text(f"{assets['tds_index']:.2f}" if numeric_tds else unavailable)
    expect(page.locator(turb)).to_have_text(f"{assets['turbidity_index']:.2f}" if numeric_index else
        'Unavailable' if role == 'admin' and fresh else unavailable)
    state = assets['turbidity_index_status'] if numeric_index else 'Awaiting data' if role == 'admin' and not fresh else 'Unavailable'
    expect(page.locator('#admin-turbidity-status' if role == 'admin' else f'#{role}-safety-status')).to_have_text(state)
    tanks = [tank, '#summary-water-tank'] if role == 'admin' else [tank]
    for target in tanks:
        if numeric_level:
            expect(page.locator(target)).to_have_attribute('aria-valuenow', str(assets['main_tank_level']))
        else:
            expect(page.locator(target)).to_have_class('water-tank tank-unavailable')
            assert page.locator(target).get_attribute('aria-valuenow') is None
            assert page.locator(target).evaluate("e => e.style.getPropertyValue('--water-level')") == '0%'
    if role == 'admin':
        for summary, source in [('#summary-level', level), ('#summary-turbidity', turb), ('#summary-tds', tds), ('#summary-turbidity-status', '#admin-turbidity-status')]:
            expect(page.locator(summary)).to_have_text(page.locator(source).inner_text())


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
def test_timestamp_boundaries_partial_nulls_and_unavailable_state(ui_page, role):
    page, origin, _, errors = ui_page
    page.set_viewport_size({'width': 390, 'height': 844})
    now = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0)
    base = {'has_reading': True, 'main_tank_level': 78, 'turbidity_index': 8.25,
            'turbidity_index_status': 'Elevated', 'tds_ppm': None,
            'last_updated': now.isoformat()}
    current = dict(base)
    def all_data(route):
        response = route.fetch()
        assert response.status == 200
        body = response.json()
        body['centralAssets'] = dict(current)
        route.fulfill(response=response, json=body)
    page.route('**/api/all-data*', all_data)
    page.clock.install()
    page.clock.set_fixed_time(now)
    login(ui_page, role)
    cases = [
        ('age 0', {}, True),
        ('age 30', {'last_updated': (now-datetime.timedelta(seconds=30)).isoformat()}, True),
        ('age exactly 60', {'last_updated': (now-datetime.timedelta(seconds=60)).isoformat()}, True),
        ('age 60.001', {'last_updated': (now-datetime.timedelta(seconds=60, milliseconds=1)).isoformat()}, False),
        ('timezone aware', {'last_updated': now.astimezone(datetime.timezone(datetime.timedelta(hours=8))).isoformat()}, True),
        ('naive UTC', {'last_updated': now.replace(tzinfo=None).isoformat(' ')}, True),
        ('missing time', {'last_updated': None}, False),
        ('malformed time', {'last_updated': 'not-a-date'}, False),
        ('future time', {'last_updated': (now+datetime.timedelta(seconds=1)).isoformat()}, False),
        ('partial water null', {'main_tank_level': None}, True),
        ('invalid index', {'turbidity_index': None, 'turbidity_index_status': 'Unavailable'}, True),
        ('all null', {'main_tank_level': None, 'turbidity_index': None, 'turbidity_index_status': 'Unavailable'}, True),
        ('numeric TDS index zero remains valid', {'tds_index': 0, 'tds_index_status': 'Normal'}, True),
        ('stale numeric TDS index is hidden', {'tds_index': 10, 'tds_index_status': 'Elevated', 'last_updated': (now-datetime.timedelta(seconds=61)).isoformat()}, False),
        ('fresh recovery with null TDS', {}, True),
    ]
    for name, changes, fresh in cases:
        current.clear(); current.update({**base, **changes})
        with page.expect_response(lambda response: '/api/all-data' in response.url and response.request.method == 'GET') as fetched:
            page.clock.fast_forward(60000)
        fetched.value.finished()
        assert_snapshot(page, role, current, fresh)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), name
    assert errors == []


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
def test_cached_data_expires_without_poll_and_recovers_on_existing_poll(ui_page, role):
    page, origin, _, errors = ui_page
    page.set_viewport_size({'width': 390, 'height': 844})
    def ingest(level, tds):
        response = page.request.post(origin+'/api/iot/telemetry', headers=DEVICE,
            data=packet(index.CLOUDY_ADC_VOLTS, water_level_percentage=level, tds_ppm=tds))
        assert response.status == 200
        return response.json()
    ingest(78, 137); ingest(78, 137)
    with get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings ORDER BY reading_id')
        stored = db.fetchall()
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        alerts = db.fetchone()['n']
    page.clock.install()
    login(ui_page, role)
    assets = {'main_tank_level': 78, 'tds_ppm': 137, 'turbidity_index': 10,
              'turbidity_index_status': 'Elevated'}
    assert_snapshot(page, role, assets, True)
    date = '#admin-reading-time' if role == 'admin' else f'#{role}-reading-time'
    previous_date = page.locator(date).inner_text()
    page.route('**/api/all-data*', lambda route: route.abort())
    page.clock.fast_forward(61000)
    assert_snapshot(page, role, assets, False)
    expect(page.locator('#admin-telemetry-freshness' if role == 'admin' else f'#{role}-telemetry-freshness')).to_have_text('IoT offline.')
    expect(page.locator(date)).to_have_text(previous_date)
    assert page.evaluate('jwtToken !== null' if role == 'admin' else "localStorage.getItem('waterhall_jwt') !== null")
    with get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings ORDER BY reading_id')
        assert db.fetchall() == stored  # No deletion, overwriting or nullification.
    page.unroute('**/api/all-data*')
    ingest(74, None); ingest(74, None)
    page.clock.set_fixed_time(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(seconds=2))
    with page.expect_response(lambda response: '/api/all-data' in response.url and response.request.method == 'GET') as fetched:
        page.clock.fast_forward(60000)
    fetched.value.finished()
    recovered = {**assets, 'main_tank_level': 74, 'tds_ppm': None}
    assert_snapshot(page, role, recovered, True)
    expect(page.locator('#admin-telemetry-freshness' if role == 'admin' else f'#{role}-telemetry-freshness')).to_have_text('Current sensor readings.')
    with get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings ORDER BY reading_id')
        assert db.fetchall()[:len(stored)] == stored
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == alerts == 1  # Existing cooldown, no new alert from expiry/recovery.
    assert errors == []
