"""Direct Worker portal startup with isolated accounts and actual Chrome."""
import os

import pytest
from playwright.sync_api import expect
from test_browser import browser_page, sign_in

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1',
                               reason='Opt-in real browser regression')


def test_logged_out_worker_opens_login_directly(browser_page):
    page, origin, (_, _, _), errors = browser_page
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(origin + '/index.html?role=worker')
    expect(page.locator('#web-portal-title')).to_have_text('Worker Portal')
    expect(page.locator('#view-login')).to_be_visible()
    expect(page.locator('#view-dashboard')).to_be_hidden()
    expect(page.locator('#app-bottom-nav')).to_be_hidden()
    assert page.locator('#hero-title').count() == 0
    assert page.request.get(origin + '/api/all-data?role=worker').status == 401
    assert errors == []


def test_worker_session_restores_on_direct_portal_reopen(browser_page):
    page, origin, (_, _, password), errors = browser_page
    sign_in(page, origin, password)
    token = page.evaluate("localStorage.getItem('waterhall_jwt')")
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") == token
    state = page.context.storage_state()
    context = page.context.browser.new_context(storage_state=state,
        viewport={'width': 390, 'height': 844},
        user_agent='Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/140 Mobile Safari/537.36')
    reopened = context.new_page()
    reopened.on('pageerror', lambda error: errors.append(str(error)))
    try:
        reopened.goto(origin + '/index.html?role=worker')
        expect(reopened.locator('#view-dashboard')).to_be_visible()
        expect(reopened.locator('#view-login')).to_be_hidden()
        assert reopened.evaluate("localStorage.getItem('waterhall_jwt')") == token
        for target in ['view-dashboard', 'view-directory', 'view-billing',
                       'view-announcements', 'view-profile']:
            reopened.locator(f'#app-bottom-nav [data-target="{target}"]').click()
            expect(reopened.locator('#' + target)).to_be_visible()
        reopened.locator('#btn-logout').click()
        expect(reopened.locator('#view-login')).to_be_visible()
        reopened.goto(origin + '/index.html?role=worker')
        expect(reopened.locator('#view-login')).to_be_visible()
        expect(reopened.locator('#view-dashboard')).to_be_hidden()
        assert reopened.evaluate("localStorage.getItem('waterhall_jwt')") is None
        assert errors == []
    finally:
        context.close()
