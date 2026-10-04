"""Admin repair regressions using the existing isolated Flask/Chrome fixture."""
import pytest
import datetime
import json
from playwright.sync_api import expect
from flask_jwt_extended import create_access_token
from backend.server import app

from test_browser import browser_page, pytestmark
from backend.db_adapter import get_db


def login_admin(browser_page):
    page, origin, (_, _, password), _ = browser_page
    page.goto(origin + '/admin/')
    expect(page.locator('#admin-offline-overlay')).to_be_hidden(timeout=15000)
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    page.wait_for_function('() => !isFetchingData', timeout=15000)
    expect(page.locator('#loading-overlay')).to_be_hidden(timeout=15000)
    return page


def hold_old_data(page, stage='headers'):
    # Ignore AbortSignal deliberately: ownership must also protect late body reads.
    page.evaluate("""stage => {
      const originalFetch = window.fetch.bind(window);
      const oldData = structuredClone(globalData);
      oldData.households[0].owner_name = 'OLD PRIVATE RESPONSE';
      let held = false;
      window.fetch = (url, options) => {
        if (String(url).includes('/api/all-data') && !held) {
          held = true;
          const response = new Response(JSON.stringify(oldData), {
            status: 200, headers: {'Content-Type': 'application/json'}
          });
          if (stage === 'body') {
            response.json = () => new Promise(resolve => {
              window.releaseOldData = () => resolve(oldData);
            });
            return Promise.resolve(response);
          }
          return new Promise(resolve => {
            window.releaseOldData = () => resolve(response);
          });
        }
        return originalFetch(url, options);
      };
      window.oldDataFinished = false;
      fetchData(false).finally(() => { window.oldDataFinished = true; });
    }""", stage)
    page.wait_for_function("() => typeof window.releaseOldData === 'function'")


@pytest.mark.parametrize('stage', ['headers', 'body'])
def test_admin_late_data_cannot_lift_lockdown(browser_page, stage):
    page = login_admin(browser_page)
    page.route('**/api/health*', lambda route: route.fulfill(status=503, json={'status': 'unavailable'}))
    page.route('**/api/ready*', lambda route: route.fulfill(status=503, json={'status': 'unavailable'}))
    hold_old_data(page, stage)
    page.evaluate('showAdminOfflineOverlay()')
    page.evaluate('releaseOldData()')
    page.wait_for_function('() => oldDataFinished')
    expect(page.locator('#admin-offline-overlay')).to_be_visible()
    assert page.evaluate("localStorage.getItem('admin_jwt')") is None
    assert page.evaluate('jwtToken') is None
    assert page.evaluate('globalData.households.length') == 0
    assert page.evaluate('renderedDirectoryData') is None
    assert page.evaluate('renderedBillingData') is None
    assert page.evaluate('charts.collections') is None
    assert page.locator('#resident-tbody tr').count() == 0
    assert page.evaluate("document.getElementById('login-screen').style.display") == 'flex'
    assert not browser_page[3]


@pytest.mark.parametrize('replacement', ['session', 'request'])
def test_admin_replacement_ignores_old_data(browser_page, replacement):
    page = login_admin(browser_page)
    hold_old_data(page, 'body')
    if replacement == 'session':
        _, _, (client, _, password), _ = browser_page
        token = client.post('/api/login', json={'username': 'admin', 'password': password}).json['access_token']
        page.evaluate("""token => {
          invalidateAdminRequests();
          jwtToken = token;
          localStorage.setItem('admin_jwt', token);
        }""", token)
    page.evaluate('fetchData(false)')
    page.wait_for_function('() => !isFetchingData')
    chart_id = page.evaluate('charts.collections.id')
    page.evaluate('releaseOldData()')
    page.wait_for_function('() => oldDataFinished')
    assert page.evaluate('charts.collections.id') == chart_id
    assert 'OLD PRIVATE RESPONSE' not in page.locator('#resident-tbody').inner_text()
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    assert not browser_page[3]


def test_admin_current_401_ends_session_without_unlocking_old_request(browser_page):
    page = login_admin(browser_page)
    page.route('**/api/all-data*', lambda route: route.fulfill(status=401, json={'msg': 'Token has expired'}))
    page.evaluate('fetchData(false)')
    expect(page.locator('#login-screen')).to_be_visible()
    expect(page.locator('#login-error')).to_contain_text('Session expired')
    assert page.evaluate("localStorage.getItem('admin_jwt')") is None
    assert not browser_page[3]


def test_admin_verified_retry_and_manual_logout(browser_page):
    page = login_admin(browser_page)
    page.evaluate('showAdminOfflineOverlay()')
    page.evaluate('retryAdminConnection()')
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    expect(page.locator('#login-screen')).to_be_visible()
    _, _, (_, _, password), _ = browser_page
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    page.wait_for_function('() => !isFetchingData')
    expect(page.locator('#loading-overlay')).to_be_hidden(timeout=15000)
    page.locator('#btn-logout').click()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden(timeout=15000)
    expect(page.locator('#login-screen')).to_be_visible()
    assert page.evaluate("localStorage.getItem('admin_jwt')") is None
    assert not browser_page[3]


def test_admin_payment_success_once_and_duplicate_rejected(browser_page):
    page = login_admin(browser_page)
    client, headers, _ = browser_page[2]
    settlements, messages = [], []
    page.on('request', lambda request: settlements.append(request) if '/api/admin/billing/mark-paid' in request.url else None)
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    page.locator('[data-tab="tab-billing"]').click()
    page.locator('[data-bill-id="BILL-1"]').click()
    page.locator('#btn-pay-modal-confirm').click()
    expect(page.locator('#modal-mark-paid')).to_have_class('modal-overlay', timeout=15000)
    page.wait_for_function("() => getComputedStyle(document.getElementById('modal-mark-paid')).opacity === '0'")
    assert page.evaluate("getComputedStyle(document.getElementById('modal-mark-paid')).pointerEvents") == 'none'
    expect(page.locator('#admin-billing-tbody')).to_contain_text('Paid', timeout=15000)
    page.wait_for_function('() => !isFetchingData')
    assert page.evaluate('pendingPaymentBill') is None
    assert len(settlements) == 1
    assert len(messages) == 1 and 'BILL-1' in messages[0] and '170.00' in messages[0]
    assert client.post('/api/admin/billing/mark-paid', headers=headers['admin'], json={'bill_id': 'BILL-1'}).status_code == 409
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM payment_collections')
        assert db.fetchone()['n'] == 0
    assert not browser_page[3]


@pytest.mark.parametrize('session', ['valid', 'malformed', 'expired', 'non_admin'])
def test_admin_stored_session_validated_by_server(browser_page, session):
    page, origin, (_, headers, _), errors = browser_page
    token = headers['worker' if session == 'non_admin' else 'admin']['Authorization'][7:]
    if session == 'malformed':
        token = 'malformed-test-token'
    elif session == 'expired':
        with app.app_context():
            token = create_access_token(identity='1', additional_claims={'role': 'admin'}, expires_delta=datetime.timedelta(seconds=-1))
    page.add_init_script("localStorage.setItem('admin_jwt', " + json.dumps(token) + ")")
    with page.expect_response(lambda response: '/api/all-data' in response.url):
        page.goto(origin + '/admin/')
    if session == 'valid':
        expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
        expect(page.locator('#resident-tbody tr')).to_have_count(2)
        assert page.evaluate('jwtToken') == token
    else:
        expect(page.locator('#login-error')).to_be_visible(timeout=15000)
        expect(page.locator('#login-screen')).to_be_visible()
        assert page.evaluate('jwtToken') is None
        assert page.evaluate("localStorage.getItem('admin_jwt')") is None
        assert page.locator('#resident-tbody tr').count() == 0
        assert page.evaluate('charts.collections') is None
    assert not errors


def test_admin_expiry_purges_private_ui_and_allows_relogin(browser_page):
    page = login_admin(browser_page)
    page.evaluate("""() => {
      renderCollectionsHistory([{transaction_id: 'PRIVATE', family_head_name: 'Previous user', household_id: 1}]);
      openMarkAsPaidModal({billId: 'BILL-1', houseId: 'HH-1', cycle: '2026-01', amount: 170, familyHead: 'Previous user'});
      document.getElementById('res-password').value = 'private-test-value';
      document.getElementById('admin-set-location').value = 'Private draft';
    }""")
    page.route('**/api/all-data*', lambda route: route.fulfill(status=401, json={'msg': 'Token has expired'}))
    page.evaluate('fetchData(false)')
    expect(page.locator('#login-screen')).to_be_visible()
    assert page.locator('.tab-content tbody tr').count() == 0
    assert page.locator('.modal-overlay.active').count() == 0
    assert page.evaluate('pendingPaymentBill') is None
    assert page.locator('#res-password').input_value() == ''
    assert page.locator('#admin-set-location').input_value() == ''
    assert page.locator('#pay-modal-household').inner_text() == ''
    assert page.evaluate('globalData.households.length') == 0
    page.unroute('**/api/all-data*')
    page.locator('#login-password').fill(browser_page[2][2])
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    page.evaluate("openMarkAsPaidModal({billId:'BILL-1',houseId:'HH-1',amount:170})")
    expect(page.locator('#modal-mark-paid')).to_have_class('modal-overlay active')
    assert not browser_page[3]


def test_admin_validation_422_keeps_session(browser_page):
    page = login_admin(browser_page)
    page.route('**/api/settings/billing', lambda route: route.fulfill(status=422, json={'msg': 'Base rate must be non-negative'}))
    status = page.evaluate("""async () => (await apiFetch('/api/settings/billing', {
      method: 'POST', headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + jwtToken}, body: '{}'
    })).status""")
    assert status == 422
    assert page.evaluate('jwtToken') is not None
    expect(page.locator('#login-screen')).to_be_hidden()
    assert not browser_page[3]


@pytest.mark.parametrize('failure', ['http500', 'invalid_json', 'invalid_shape'])
def test_admin_data_failure_preserves_session_cache_and_retry(browser_page, failure):
    page = login_admin(browser_page)
    before = page.evaluate('JSON.stringify(globalData)')
    if failure == 'http500':
        handler = lambda route: route.fulfill(status=500, json={'msg': 'Internal error'})
    elif failure == 'invalid_json':
        handler = lambda route: route.fulfill(status=200, content_type='application/json', body='broken JSON')
    else:
        handler = lambda route: route.fulfill(status=200, json={'households': []})
    page.route('**/api/all-data*', handler)
    page.evaluate('fetchData(false)')
    expect(page.locator('#admin-db-offline-banner')).to_be_visible()
    expect(page.locator('#admin-data-status')).to_contain_text('out of date')
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    expect(page.locator('#login-screen')).to_be_hidden()
    assert page.evaluate('JSON.stringify(globalData)') == before
    assert page.evaluate('jwtToken') is not None
    page.unroute('**/api/all-data*')
    page.locator('#btn-admin-data-retry').click()
    expect(page.locator('#admin-db-offline-banner')).to_be_hidden(timeout=15000)
    assert not browser_page[3]


def test_admin_initial_data_failure_can_retry_stored_session(browser_page):
    page, origin, (_, headers, _), errors = browser_page
    token = headers['admin']['Authorization'][7:]
    page.add_init_script("localStorage.setItem('admin_jwt', " + json.dumps(token) + ")")
    page.route('**/api/all-data*', lambda route: route.fulfill(status=500, json={'msg': 'Database unavailable'}))
    page.goto(origin + '/admin/')
    expect(page.locator('#btn-login-data-retry')).to_be_visible(timeout=15000)
    assert page.evaluate('jwtToken') == token
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    page.unroute('**/api/all-data*')
    page.locator('#btn-login-data-retry').click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    assert not errors


def test_admin_registrations_do_not_block_other_data(browser_page):
    page, origin, (_, _, password), errors = browser_page
    page.goto(origin + '/admin/')
    page.evaluate("""() => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = (url, options) => String(url).includes('/api/residents/registrations')
        ? new Promise(resolve => { window.failRegistrations = () => resolve(new Response('{}', {status: 500})); })
        : originalFetch(url, options);
    }""")
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    expect(page.locator('#resident-tbody tr')).to_have_count(2)
    assert page.evaluate('charts.collections !== null')
    assert page.evaluate('!isFetchingData')
    page.wait_for_function('() => typeof failRegistrations === "function"')
    page.evaluate('failRegistrations()')
    expect(page.locator('#registration-load-status')).to_contain_text('could not refresh', timeout=15000)
    expect(page.locator('#admin-db-offline-banner')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    assert not errors


def test_admin_superseded_registrations_cannot_expire_current_request(browser_page):
    page = login_admin(browser_page)
    page.evaluate("""() => {
      const originalFetch = window.fetch.bind(window);
      let held = false;
      window.fetch = (url, options) => {
        if (String(url).includes('/api/residents/registrations') && !held) {
          held = true;
          return new Promise(resolve => { window.expireOldRegistrations = () => resolve(new Response('{}', {status: 401})); });
        }
        return originalFetch(url, options);
      };
    }""")
    page.evaluate('fetchData(false)')
    page.wait_for_function('() => typeof expireOldRegistrations === "function"')
    page.evaluate('fetchData(false)')
    page.evaluate('expireOldRegistrations()')
    page.wait_for_function('() => !isFetchingData')
    expect(page.locator('#login-screen')).to_be_hidden()
    assert page.evaluate('jwtToken') is not None
    assert not browser_page[3]


def test_admin_collection_chart_uses_payment_calendar_and_recorded_totals(browser_page):
    page = login_admin(browser_page)
    result = page.evaluate("""() => {
      const now = new Date();
      const current = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 2)).toISOString();
      const previous = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 2)).toISOString();
      renderCharts({billingRecords: [
        {status:'Paid', billing_month:'2000-01', payment_date:current, total_due:123.45},
        {status:'Paid', billing_month:'2000-02', payment_date:previous, total_due:50},
        {status:'Unpaid', payment_date:current, total_due:999},
        {status:'Paid', billing_month:current.slice(0,7), payment_date:null, total_due:999},
        {status:'Paid', payment_date:'invalid', total_due:999}
      ]});
      return {labels:charts.collections.data.labels, values:charts.collections.data.datasets[0].data, month:current.slice(0,7)};
    }""")
    assert len(result['labels']) == 5 and result['labels'][-1] == result['month']
    assert result['values'] == [0, 0, 0, 50, 123.45]
    assert not browser_page[3]


def test_admin_payment_settings_draft_survives_refresh_and_save(browser_page):
    page = login_admin(browser_page)
    messages = []
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    page.locator('[data-tab="tab-payment-settings"]').click()
    page.locator('#admin-set-location').fill('  Test Treasury Window  ')
    page.locator('#admin-set-hours').click()
    page.evaluate('fetchData(false)')
    assert page.locator('#admin-set-location').input_value() == '  Test Treasury Window  '
    assert page.evaluate('paymentSettingsDirty')
    page.locator('#btn-save-payment-settings').click()
    expect(page.locator('#btn-save-payment-settings')).to_be_enabled(timeout=15000)
    assert not page.evaluate('paymentSettingsDirty')
    assert page.locator('#admin-set-location').input_value() == 'Test Treasury Window'
    with get_db() as db:
        db.execute("SELECT setting_value FROM payment_settings WHERE setting_key = 'payment_location'")
        assert db.fetchone()['setting_value'] == 'Test Treasury Window'
    assert len(messages) == 1
    assert not browser_page[3]


def test_admin_settings_newer_edits_survive_inflight_save(browser_page):
    page = login_admin(browser_page)
    page.on('dialog', lambda dialog: dialog.accept())
    page.locator('[data-tab="tab-payment-settings"]').click()
    page.locator('#admin-set-location').fill('First saved value')
    page.evaluate("""() => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = async (url, options) => {
        const response = await originalFetch(url, options);
        if (String(url).includes('/api/settings/payment') && options.method === 'POST')
          return new Promise(resolve => { window.releaseSettingsSave = () => resolve(response); });
        return response;
      };
    }""")
    page.locator('#btn-save-payment-settings').click()
    page.wait_for_function('() => typeof releaseSettingsSave === "function"')
    page.locator('#admin-set-location').fill('New unsaved draft')
    page.evaluate('releaseSettingsSave()')
    expect(page.locator('#btn-save-payment-settings')).to_be_enabled(timeout=15000)
    assert page.locator('#admin-set-location').input_value() == 'New unsaved draft'
    assert page.evaluate('paymentSettingsDirty')
    assert not browser_page[3]


def test_admin_incident_failures_are_visible_and_success_preserved(browser_page):
    page = login_admin(browser_page)
    with get_db() as db:
        db.execute("INSERT INTO resident_reports (household_id, report_type, description) VALUES ('HH-1', 'Leak', 'Test incident')")
        report_id = db.lastrowid
    messages = []
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    page.route('**/api/reports/update-status', lambda route: route.fulfill(status=409, json={'msg': 'SECRET_INTERNAL_TRACE'}))
    page.evaluate('id => resolveReport(id)', report_id)
    page.unroute('**/api/reports/update-status')
    page.route('**/api/reports/update-status', lambda route: route.abort('failed'))
    page.evaluate('id => resolveReport(id)', report_id)
    assert len(messages) == 2 and all('Unable to resolve' in message for message in messages)
    assert all('SECRET_INTERNAL_TRACE' not in message for message in messages)
    page.unroute('**/api/reports/update-status')
    page.evaluate('id => resolveReport(id)', report_id)
    page.locator('[data-tab="tab-reports"]').click()
    expect(page.locator('#reports-tbody')).to_contain_text('Resolved', timeout=15000)
    with get_db() as db:
        db.execute('SELECT status FROM resident_reports WHERE report_id = ?', (report_id,))
        assert db.fetchone()['status'] == 'Resolved'
    assert not browser_page[3]


def test_admin_responsive_navigation_and_explicit_print_columns(browser_page):
    page = login_admin(browser_page)
    tabs = ['dashboard', 'directory', 'assets', 'announcements', 'billing', 'payment-settings', 'reports']
    for width, height in [(1920,1080), (1366,768), (768,1024), (390,844), (320,800)]:
        page.set_viewport_size({'width':width, 'height':height})
        for tab in tabs:
            page.locator('[data-tab="tab-' + tab + '"]').click()
            expect(page.locator('#tab-' + tab)).to_be_visible()
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, tab, page.evaluate("""() => Array.from(document.querySelectorAll('body *')).filter(el =>
              !el.closest('.table-scroll') && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().right > innerWidth + 1
            ).slice(0, 20).map(el => ({tag:el.tagName, id:el.id, class:el.className, right:el.getBoundingClientRect().right, width:el.getBoundingClientRect().width}))"""))
        page.evaluate('showAdminDataError()')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, 'data error')
    page.evaluate("""() => {
      const data = structuredClone(globalData);
      data.maintenanceLogs = [{task_id:'T1',purok:'Purok 7',description:'Test task',status_resolved:true,date:'2026-01-01'}];
      renderDashboard(data);
      renderAnnouncements([{timestamp:'2026-01-01',author:'Admin',audience:'Everyone',message:'Printable content'}]);
      renderCollectionsHistory([{transaction_id:'T1',family_head_name:'Test',household_id:1,purok_name:'Purok 7',collection_date:'2026-01-01'}]);
    }""")
    page.emulate_media(media='print')
    for tab, tbody in [('dashboard','maintenance-tbody'), ('announcements','announcements-tbody'), ('billing','collections-history-tbody')]:
        page.locator('[data-tab="tab-' + tab + '"]').dispatch_event('click')
        assert page.locator('#' + tbody + ' td:last-child').evaluate('el => getComputedStyle(el).display') != 'none'
        assert page.locator('#' + tbody).locator('xpath=..').locator('th:last-child').evaluate('el => getComputedStyle(el).display') != 'none'
    # Inspect current cells in one DOM task: heartbeat can replace a tbody
    # between separate locator resolution and per-element style reads.
    print_cells = page.locator('th.no-print, td.no-print').evaluate_all("els => els.map(el => ({tag:el.tagName, display:getComputedStyle(el).display, connected:el.isConnected}))")
    assert print_cells and all(cell['connected'] and cell['display'] == 'none' for cell in print_cells), print_cells
    assert not browser_page[3]


@pytest.mark.parametrize('request_start', ['before_health', 'during_health'])
def test_admin_heartbeat_does_not_repeat_a_completed_refresh(browser_page, request_start):
    page = browser_page[0]
    page.add_init_script("""
      const originalInterval = window.setInterval.bind(window);
      window.setInterval = (callback, delay, ...args) => {
        if (delay === 3500) window.runAdminHeartbeat = callback;
        return originalInterval(callback, delay, ...args);
      };
    """)
    page = login_admin(browser_page)
    page.wait_for_function('() => !isHeartbeatRunning && !isFetchingData')
    if request_start == 'before_health':
        hold_old_data(page, 'body')
    page.evaluate("""() => {
      const originalFetch = window.fetch.bind(window);
      let held = false;
      window.extraDataRequests = 0;
      window.fetch = (url, options) => {
        if (String(url).includes('/api/health') && !held) {
          held = true;
          return new Promise(resolve => { window.releaseHeartbeatHealth = () => resolve(new Response('{"status":"ok"}', {status:200})); });
        }
        if (String(url).includes('/api/all-data')) window.extraDataRequests++;
        return originalFetch(url, options);
      };
      window.heartbeatFinished = false;
      runAdminHeartbeat().finally(() => { window.heartbeatFinished = true; });
    }""")
    page.wait_for_function('() => typeof releaseHeartbeatHealth === "function"')
    if request_start == 'before_health':
        page.evaluate('releaseOldData()')
        page.wait_for_function('() => oldDataFinished')
    else:
        page.evaluate('fetchData(false)')
    count = page.evaluate('extraDataRequests')
    page.evaluate('releaseHeartbeatHealth()')
    page.wait_for_function('() => heartbeatFinished')
    assert page.evaluate('extraDataRequests') == count
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    assert not browser_page[3]


def test_admin_unchanged_tables_reuse_dom_and_server_changes_render(browser_page):
    page = login_admin(browser_page)
    client, headers, _ = browser_page[2]
    requests = []
    page.on('request', lambda request: requests.append(request) if '/api/all-data' in request.url else None)
    page.evaluate("""() => {
      window.originalResidentRow = document.querySelector('#resident-tbody tr');
      window.originalBillingRow = document.querySelector('#admin-billing-tbody tr');
    }""")
    page.evaluate('fetchData(false)')
    assert page.evaluate("originalResidentRow === document.querySelector('#resident-tbody tr')")
    assert page.evaluate("originalBillingRow === document.querySelector('#admin-billing-tbody tr')")
    with get_db() as db:
        db.execute("UPDATE households SET family_head_name = 'Changed fixture name' WHERE household_id = 1")
    assert client.post('/api/admin/billing/mark-paid', headers=headers['admin'], json={'bill_id':'BILL-1'}).status_code == 200
    page.evaluate('fetchData(false)')
    assert not page.evaluate("originalResidentRow === document.querySelector('#resident-tbody tr')")
    assert not page.evaluate("originalBillingRow === document.querySelector('#admin-billing-tbody tr')")
    expect(page.locator('#resident-tbody')).to_contain_text('Changed fixture name')
    expect(page.locator('#admin-billing-tbody')).to_contain_text('Paid')
    assert len(requests) >= 2
    assert not browser_page[3]


@pytest.mark.parametrize('action', ['resident_body', 'export_body', 'delete_health'])
def test_admin_late_action_callbacks_leave_replacement_session_untouched(browser_page, action):
    page = login_admin(browser_page)
    messages, downloads = [], []
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    page.on('download', lambda download: downloads.append(download))
    page.evaluate("""action => {
      const originalFetch = window.fetch.bind(window);
      let held = false;
      window.fetch = (url, options) => {
        const path = String(url);
        if (action === 'delete_health' && path === '/api/households/1')
          return Promise.reject(new Error('Synthetic action failure'));
        if (!held && ((action === 'resident_body' && path === '/api/households/add') ||
                      (action === 'export_body' && path === '/api/reports/export') ||
                      (action === 'delete_health' && path === '/api/health'))) {
          held = true;
          const response = new Response('{}', {status:200});
          if (action === 'delete_health')
            return new Promise(resolve => { window.releaseOldAction = () => resolve(new Response('{"status":"ok"}', {status:200})); });
          const method = action === 'export_body' ? 'blob' : 'json';
          response[method] = () => new Promise(resolve => {
            window.releaseOldAction = () => resolve(action === 'export_body' ? new Blob(['private old export']) : {account_number:'OLD-PRIVATE-ACCOUNT'});
          });
          return Promise.resolve(response);
        }
        return originalFetch(url, options);
      };
      if (action === 'export_body') triggerReportExport('billing', 'csv');
      if (action === 'delete_health') deleteHousehold('1');
    }""", action)
    if action == 'resident_body':
        page.locator('[data-tab="tab-directory"]').click()
        page.locator('#btn-add-resident').click()
        for field, value in [('res-name','Old request'), ('res-contact','09123456789'), ('res-password','Isolated-test-password'), ('res-verify-password','Isolated-test-password')]:
            page.locator('#' + field).fill(value)
        page.locator('#btn-res-save').click()
    page.wait_for_function('() => typeof releaseOldAction === "function"')
    messages.clear()
    page.evaluate('invalidateAdminRequests()')
    page.evaluate('fetchData(false)')
    page.evaluate("document.getElementById('res-name').value = 'New session draft'")
    page.evaluate('releaseOldAction()')
    page.wait_for_timeout(650)
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    expect(page.locator('#login-screen')).to_be_hidden()
    assert page.evaluate('jwtToken') is not None
    assert page.locator('#res-name').input_value() == 'New session draft'
    assert not messages and not downloads
    assert not browser_page[3]


def test_admin_chart_stays_inside_panel_while_resize_callback_is_delayed(browser_page):
    page = login_admin(browser_page)
    page.set_viewport_size({'width':1920, 'height':1080})
    # Keep the real desktop canvas size while the responsive container shrinks,
    # modelling a busy browser that has not serviced Chart.js ResizeObserver yet.
    page.evaluate('isHeartbeatRunning = true; charts.collections.stop(); charts.collections.resize(); charts.collections.unbindEvents()')
    desktop_width = page.locator('#collectionsChart').evaluate('el => el.getBoundingClientRect().width')
    assert desktop_width > 600
    page.set_viewport_size({'width':390, 'height':844})
    dimensions = page.locator('#collectionsChart').evaluate('el => ({canvas:el.getBoundingClientRect().width, parent:el.parentElement.getBoundingClientRect().width, page:document.documentElement.scrollWidth, viewport:innerWidth})')
    assert dimensions['canvas'] <= dimensions['parent'], dimensions
    assert dimensions['page'] <= dimensions['viewport'], dimensions
    page.evaluate('charts.collections.bindEvents(); charts.collections.resize(); isHeartbeatRunning = false')
    assert page.evaluate('charts.collections.width > 0')
    assert not browser_page[3]


def test_admin_current_account_forms_broadcast_and_export_still_work(browser_page):
    page = login_admin(browser_page)
    password = browser_page[2][2]
    messages = []
    page.on('dialog', lambda dialog: (messages.append(dialog.message), dialog.accept()))
    page.locator('[data-tab="tab-directory"]').click()
    for kind, prefix, name, contact, tbody in [
        ('resident','res','Current test resident','09175558881','resident-tbody'),
        ('worker','work','Current test worker','09175558882','worker-tbody')
    ]:
        page.locator('#btn-add-' + kind).click()
        for field, value in [('name',name), ('contact',contact), ('password',password), ('verify-password',password)]:
            page.locator('#' + prefix + '-' + field).fill(value)
        page.locator('#btn-' + prefix + '-save').click()
        expect(page.locator('#' + tbody)).to_contain_text(name, timeout=15000)
        expect(page.locator('#btn-' + prefix + '-save')).to_be_enabled()
    page.locator('[data-tab="tab-announcements"]').click()
    page.locator('#admin-announcement-input').fill('Isolated current-session announcement')
    page.locator('#btn-admin-broadcast').click()
    expect(page.locator('#announcements-tbody')).to_contain_text('Isolated current-session announcement', timeout=15000)
    page.locator('[data-tab="tab-billing"]').click()
    with page.expect_download() as download:
        page.locator('#btn-export-bill-csv').click()
    assert download.value.suggested_filename.endswith('.csv')
    expect(page.locator('#btn-export-bill-csv')).to_be_enabled()
    assert len(messages) == 3 and all('successfully' in message for message in messages)
    assert not browser_page[3]
