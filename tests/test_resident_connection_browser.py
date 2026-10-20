import os
import pytest
from playwright.sync_api import expect
from test_browser import browser_page
from test_mobile_release import login

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome')


def test_resident_logged_out_internet_error_retry_requires_valid_backend(browser_page):
    page, origin, _, errors = browser_page
    page.set_viewport_size({'width': 360, 'height': 740})
    page.route('**/api/ready', lambda route: route.abort('internetdisconnected'))
    page.goto(origin + '/index.html?role=resident')
    screen = page.locator('#resident-connection-screen')
    expect(screen).to_be_visible()
    expect(screen).to_contain_text('Internet Error')
    expect(screen).to_contain_text('No internet connection. Please check your connection and try again.')
    expect(page.locator('#db-offline-overlay')).to_be_hidden()
    retry = page.locator('#resident-connection-retry')
    retry.click(); expect(retry).to_have_text('Retry'); expect(screen).to_be_visible()
    page.unroute('**/api/ready')
    page.route('**/api/ready', lambda route: route.fulfill(status=200, json={'status': 'unavailable'}))
    retry.click(); expect(screen).to_contain_text('Service Unavailable')
    page.unroute('**/api/ready'); retry.click()
    expect(screen).to_be_hidden(); expect(page.locator('#view-login')).to_be_visible()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert errors == []


def test_resident_login_network_failure_uses_gate_without_resubmitting_credentials(browser_page):
    page, origin, (_, _, password), errors = browser_page
    page.goto(origin + '/index.html?role=resident')
    expect(page.locator('#resident-connection-screen')).to_be_hidden()
    page.route('**/api/login', lambda route: route.abort('internetdisconnected'))
    page.locator('#employee-id').fill('HH-1'); page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#resident-connection-screen')).to_contain_text('Internet Error')
    page.locator('#resident-connection-retry').click()
    expect(page.locator('#resident-connection-screen')).to_be_hidden()
    expect(page.locator('#employee-id')).to_have_value('HH-1')
    expect(page.locator('#view-login')).to_be_visible()
    assert page.evaluate("localStorage.getItem('waterhall_jwt')===null")
    assert errors == []


def test_resident_loss_retry_recovery_keeps_session_active_tab_and_report_draft(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login(page, origin, password, 'resident')
    page.locator('[data-target="view-resident-support"]').click()
    draft = page.locator('#resident-log-desc'); draft.fill('Keep this unsent report draft')
    token = page.evaluate("localStorage.getItem('waterhall_jwt')")
    page.context.set_offline(True)
    screen = page.locator('#resident-connection-screen'); expect(screen).to_contain_text('Internet Error')
    expect(page.locator('#db-offline-overlay')).to_be_hidden()
    page.locator('#resident-connection-retry').click()
    expect(page.locator('#resident-connection-retry')).to_have_text('Retry')
    expect(screen).to_be_visible()
    assert draft.input_value() == 'Keep this unsent report draft'
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") == token
    page.context.set_offline(False)
    expect(screen).to_be_hidden(timeout=20000)
    expect(page.locator('#view-resident-support')).to_be_visible()
    expect(draft).to_have_value('Keep this unsent report draft')
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") == token
    assert errors == []


def test_resident_cached_start_offline_is_gated_not_live_offline_mode(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login(page, origin, password, 'resident')
    page.evaluate('async()=>{await navigator.serviceWorker.ready}')
    page.context.set_offline(True); page.reload()
    expect(page.locator('#resident-connection-screen')).to_contain_text('Internet Error')
    expect(page.locator('#db-offline-overlay')).to_be_hidden()
    assert page.evaluate("!!localStorage.getItem('waterhall_jwt')")
    page.context.set_offline(False)
    expect(page.locator('#resident-connection-screen')).to_be_hidden(timeout=20000)
    expect(page.locator('#view-resident-home')).to_be_visible()
    assert errors == []


def test_resident_backend_error_does_not_pass_on_health_only_and_auth_expiry_uses_login(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login(page, origin, password, 'resident')
    page.route('**/api/all-data*', lambda route: route.fulfill(status=503, json={'msg': 'unavailable'}))
    page.evaluate("dispatchEvent(new Event('online'))")
    screen = page.locator('#resident-connection-screen')
    expect(screen).to_contain_text('Service Unavailable')
    page.locator('#resident-connection-retry').click()
    expect(page.locator('#resident-connection-retry')).to_have_text('Retry')
    expect(screen).to_be_visible()
    page.unroute('**/api/all-data*')
    page.route('**/api/all-data*', lambda route: route.fulfill(status=401, json={'msg': 'expired'}))
    page.locator('#resident-connection-retry').click()
    expect(screen).to_be_hidden(); expect(page.locator('#view-login')).to_be_visible()
    expect(page.locator('#login-error-msg')).to_contain_text('Session expired')
    assert page.evaluate("localStorage.getItem('waterhall_jwt')===null")
    assert errors == []
