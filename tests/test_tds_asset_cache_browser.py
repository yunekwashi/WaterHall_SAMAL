"""Warm previous script URLs before loading the new portal: no cache clearing."""
import os

import pytest
from flask import make_response, request
from playwright.sync_api import expect
from backend import server
from test_browser import browser_page
from test_monitoring_ui import ui_page, login
from test_tds_index import packet, DEVICE

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome')


@pytest.mark.parametrize('role', ['admin', 'resident', 'worker'])
def test_previous_cached_scripts_cannot_hide_fresh_tds_index(ui_page, monkeypatch, role):
    page, origin, _, errors = ui_page
    serve_web = server.app.view_functions['serve_static']
    serve_admin = server.app.view_functions['serve_admin_static']
    legacy_hits = []

    def stale_script(path, original):
        if path == 'tds-cache-seed.html':
            controller = '/admin/app.js?v=32-index' if role == 'admin' else '/app.js?v=1.2.3-index-provisional'
            return make_response('<script src="/ui-display.js?v=1.2.3-index-provisional"></script>'
                                 '<script src="' + controller + '"></script>')
        if path in ('app.js', 'ui-display.js') and request.args.get('v') in ('32-index', '1.2.3-index-provisional'):
            legacy_hits.append(request.full_path)
            response = make_response('window.cachedPreTdsIndexScript = true;')
            response.mimetype = 'application/javascript'
            return response  # Existing after_request gives this a 3600-second cache.
        return original(path)

    monkeypatch.setitem(server.app.view_functions, 'serve_static', lambda path: stale_script(path, serve_web))
    monkeypatch.setitem(server.app.view_functions, 'serve_admin_static', lambda path: stale_script(path, serve_admin))
    page.goto(origin + '/tds-cache-seed.html')
    assert page.evaluate('window.cachedPreTdsIndexScript === true')
    assert len(legacy_hits) == 2
    assert page.request.post(origin + '/api/iot/telemetry', headers=DEVICE, data=packet(.335)).status == 200
    login(ui_page, role)
    value = page.locator('#admin-tds' if role == 'admin' else f'#{role}-tds-val')
    status = page.locator('#admin-tds-status' if role == 'admin' else f'#{role}-tds-status')
    expect(value).to_have_text('0.24')
    expect(status).to_have_text('Normal')
    assert page.evaluate('typeof WaterHallDisplay.tdsIndexState') == 'function'
    assert len(legacy_hits) == 2
    assert errors == []
