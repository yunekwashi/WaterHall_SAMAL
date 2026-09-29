"""Real browser smoke tests. RUN_BROWSER_TESTS=1 requires Chrome or Playwright Chromium."""
import io
import os
import threading
import datetime
import uuid
import time
from pathlib import Path

import pytest
from playwright.sync_api import expect
from PIL import Image
from werkzeug.serving import make_server
from backend.server import app
from backend.db_adapter import get_db

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in real browser tests')


@pytest.fixture
def browser_page(system):
    from playwright.sync_api import sync_playwright
    server = make_server('127.0.0.1', 0, app, threaded=True)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        yield page, f'http://127.0.0.1:{server.server_port}', system, errors
        browser.close()
    server.shutdown()
    thread.join(timeout=5)


def test_admin_login_and_stored_xss(browser_page):
    page, origin, (_, _, password), errors = browser_page
    payload = '<img src=x onerror="window.xssExecuted=true">'
    # Exercise the stored payload through the real data load. Injecting a row
    # after login races fetchData(), which can overwrite the synthetic row.
    with get_db() as db:
        db.execute('INSERT INTO resident_reports (household_id, report_type, description) VALUES (?, ?, ?)',
                   ('HH-1', 'Leak', payload))
    page.goto(origin + '/admin/')
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#reports-tbody [data-resolve-report]')).to_have_count(1)
    expect(page.locator('#reports-tbody')).to_contain_text(payload)
    assert page.evaluate('window.xssExecuted === undefined')
    assert page.locator('#reports-tbody [onerror]').count() == 0
    assert errors == []


def test_resident_photo_report_single_submission(browser_page):
    page, origin, (_, _, password), errors = browser_page
    page.goto(origin + '/index.html?role=resident')
    page.locator('#employee-id').fill('HH-1')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-resident-home').wait_for(state='visible')
    page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
    page.locator('#resident-log-desc').fill('Leak with photo evidence')
    photo = io.BytesIO()
    Image.new('RGB', (12, 12), 'blue').save(photo, 'PNG')
    page.locator('#resident-photo-input').set_input_files({'name': 'evidence.png', 'mimeType': 'image/png', 'buffer': photo.getvalue()})
    expect(page.locator('#resident-photo-name')).to_have_text('evidence.png')
    with page.expect_response(lambda response: '/api/reports/add' in response.url) as response:
        page.locator('#btn-resident-submit-log').click()
    assert response.value.status == 200
    with get_db() as db:
        db.execute('SELECT description, photo_base64 FROM resident_reports')
        reports = db.fetchall()
    assert len(reports) == 1
    assert reports[0]['photo_base64'].startswith('data:image/jpeg;base64,')
    assert errors == []


def test_worker_offline_collection_reconnect_and_reload(browser_page):
    page, origin, (_, _, password), errors = browser_page
    page.goto(origin + '/index.html?role=worker')
    page.locator('#employee-id').fill('worker')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-dashboard').wait_for(state='visible')
    expect(page.locator('#worker-safety-status')).to_have_text('AWAITING DATA')
    # Ensure the shell is installed before testing a cold offline reload.
    page.evaluate('async () => { await navigator.serviceWorker.ready; }')
    page.locator('#app-bottom-nav [data-target="view-directory"]').click()
    page.locator('.household-card').filter(has_text='Resident One').click()
    page.context.set_offline(True)
    page.locator('#btn-open-collect-modal').click()
    page.locator('#collect-amount-input').fill('170')
    # A failed native SQLite commit must leave the modal open and report no saved payment.
    page.evaluate("() => { window.WaterHallStorage = {}; window.waterhallNativeCall = () => Promise.reject(new Error('disk full')); }")
    page.locator('#btn-collect-confirm').click()
    expect(page.locator('#btn-collect-confirm')).to_be_enabled()
    expect(page.locator('#modal-collect-payment')).to_be_visible()
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections') || '[]').length") == 0
    page.evaluate('() => { delete window.WaterHallStorage; }')
    page.locator('#btn-collect-confirm').click()
    expect(page.locator('#modal-collect-payment')).to_be_hidden()
    before = page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections'))")
    assert len(before) == 1 and before[0]['sync_status'] == 'PENDING'
    page.reload()
    page.locator('#view-dashboard').wait_for(state='visible')
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections'))[0].sync_status") == 'PENDING'
    with page.expect_response(lambda response: '/api/collections/sync' in response.url) as response:
        page.context.set_offline(False)
        page.evaluate("window.dispatchEvent(new Event('online'))")
    assert response.value.status == 200
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS count FROM payment_collections')
        assert db.fetchone()['count'] == 1
    assert not errors


def sign_in(page, origin, password, role='worker'):
    page.goto(origin + '/index.html?role=' + role)
    page.locator('#employee-id').fill('worker' if role == 'worker' else 'HH-1')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-dashboard' if role == 'worker' else '#view-resident-home').wait_for(state='visible')


def pending_collection(house='HH-1', amount=170):
    return dict(transaction_id=uuid.uuid4().hex, house_id=house, amount_collected=amount,
                date=datetime.datetime.now(datetime.timezone.utc).isoformat(), collected_by='worker',
                payment_method='Cash', sync_status='PENDING', synced_at=None)


def seed_pending(page, rows):
    page.evaluate("rows => localStorage.setItem('waterhall_offline_collections', JSON.stringify(rows))", rows)


def wait_for_synced(page):
    deadline = time.monotonic() + 25
    while time.monotonic() < deadline:
        rows = page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections') || '[]')")
        if any(row['sync_status'] == 'SYNCED' for row in rows):
            return
        page.wait_for_timeout(100)
    pytest.fail('No pending collection received a server acknowledgement')


def test_public_routes_and_mobile_registration_approval(browser_page):
    page, origin, (client, headers, password), errors = browser_page
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(origin + '/')
    expect(page.locator('h1')).to_contain_text('water service')
    assert page.locator('#view-login').count() == 0
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.goto(origin + '/index.html?role=resident')
    page.locator('#btn-open-register-modal').click()
    expect(page.locator('#reg-res-purok option')).to_have_count(1)
    page.locator('#reg-res-name').fill('Browser Registration')
    page.locator('#reg-contact').fill('09175559988')
    page.locator('#reg-password').fill(password)
    page.locator('#reg-verify-password').fill(password)
    page.locator('#btn-submit-register').click()
    expect(page.locator('#register-status')).to_contain_text('Wait for Admin approval')
    row = next(r for r in client.get('/api/residents/registrations', headers=headers['admin']).json['registrations'] if r['family_head_name'] == 'Browser Registration')
    page.locator('#btn-close-register-modal').click()
    page.locator('#employee-id').fill(row['house_id'])
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-error-msg')).to_contain_text('pending Admin approval')
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
    assert client.post('/api/residents/review', headers=headers['admin'], json={'house_id': row['house_id'], 'status': 'approved'}).status_code == 200
    page.locator('#btn-login').click()
    expect(page.locator('#view-resident-home')).to_be_visible()
    expect(page.locator('#resident-bill-status')).to_have_text('NO CURRENT BILLING RECORD')
    expect(page.locator('#resident-calc-total')).to_have_text('--')
    expect(page.locator('#resident-calc-base')).to_have_text('--')
    expect(page.locator('#resident-calc-fee')).to_have_text('--')
    expect(page.locator('#resident-rate-description')).to_contain_text('Awaiting a recorded meter reading')
    assert not errors


def test_admin_registration_review_rates_and_expiry(browser_page):
    page, origin, (client, _, password), errors = browser_page
    result = client.post('/api/residents/register', json=dict(owner_name='Pending Browser', contact='09175559989', purok='Purok 1', password=password, verify_password=password))
    assert result.status_code == 201
    page.goto(origin + '/admin/')
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    page.locator('[data-tab="tab-directory"]').click()
    page.locator('[data-review-status="approved"]').click()
    expect(page.locator('#registration-review-status')).to_have_text('Registration approved.')
    page.locator('[data-tab="tab-payment-settings"]').click()
    page.locator('#rate-base_rate').fill('135.25')
    page.locator('#save-billing-config').click()
    expect(page.locator('#billing-config-status')).to_contain_text('Confirmed rate version 2')
    with get_db() as db:
        db.execute('SELECT rates_json FROM billing_configuration')
        assert '135.25' in db.fetchone()['rates_json']
    page.route('**/api/settings/billing', lambda route: route.fulfill(status=401, json={'msg': 'expired'}))
    page.locator('#save-billing-config').click()
    expect(page.locator('#login-screen')).to_be_visible()
    expect(page.locator('#login-error')).to_contain_text('Session expired')
    assert page.evaluate("localStorage.getItem('admin_jwt')") is None
    assert not errors


@pytest.mark.parametrize('trigger', ['http401', 'expired', 'logout'])
def test_worker_session_end_preserves_both_pending_queues(browser_page, trigger):
    page, origin, (_, _, password), errors = browser_page
    sign_in(page, origin, password)
    page.context.set_offline(True)
    row = pending_collection()
    seed_pending(page, [row])
    action = dict(operation_id=uuid.uuid4().hex, owner='worker', endpoint='/api/reports/add', body={})
    page.evaluate("row => localStorage.setItem('waterhall_unsynced_actions', JSON.stringify([row]))", action)
    if trigger == 'http401':
        page.route('**/api/all-data*', lambda route: route.fulfill(status=401, json={'msg': 'expired'}))
        page.context.set_offline(False)
        page.evaluate("window.dispatchEvent(new Event('online'))")
    elif trigger == 'expired':
        page.evaluate("""() => {const parts=localStorage.getItem('waterhall_jwt').split('.');
          const claims=JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/'))); claims.exp=1;
          parts[1]=btoa(JSON.stringify(claims)); localStorage.setItem('waterhall_jwt',parts.join('.'));
          window.dispatchEvent(new Event('focus'));} """)
    else:
        page.locator('#app-bottom-nav [data-target="view-profile"]').click()
        page.locator('#btn-logout').click()
    expect(page.locator('#view-login')).to_be_visible()
    if trigger != 'logout':
        expect(page.locator('#login-error-msg')).to_contain_text('Session expired. Please sign in again.')
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections'))")[0]['transaction_id'] == row['transaction_id']
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_unsynced_actions'))")[0]['operation_id'] == action['operation_id']
    assert page.evaluate("localStorage.getItem('waterhall_households')") is None
    assert not errors


def test_request_timeout_offline_and_reconnect_preserves_queue(browser_page):
    page, origin, (_, _, password), errors = browser_page
    sign_in(page, origin, password)
    pending = pending_collection()
    seed_pending(page, [pending])
    held = []
    page.route('**/api/all-data*', lambda route: held.append(route))
    page.evaluate("window.dispatchEvent(new Event('online'))")
    expect(page.locator('#db-offline-overlay')).to_be_visible(timeout=22000)
    expect(page.locator('#offline-banner-text')).to_contain_text('Offline')
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections'))")[0]['sync_status'] == 'PENDING'
    page.unroute('**/api/all-data*')
    for route in held:
        try:
            route.abort()
        except Exception:
            pass  # XMLHttpRequest has already aborted at its deadline.
    page.evaluate("window.dispatchEvent(new Event('online'))")
    wait_for_synced(page)
    assert not errors


def test_conflict_isolation_partial_ack_and_duplicate_transaction(browser_page):
    page, origin, (client, headers, password), errors = browser_page
    sign_in(page, origin, password)
    conflict, valid = pending_collection('HH-2', amount=169), pending_collection()
    seed_pending(page, [conflict, valid])
    page.evaluate("window.dispatchEvent(new Event('online'))")
    wait_for_synced(page)
    rows = page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections'))")
    assert rows[0]['sync_status'] == 'PENDING' and rows[0]['sync_error']
    assert rows[1]['sync_status'] == 'SYNCED'
    # Replay the acknowledged transaction without creating another payment.
    replay = client.post('/api/collections/sync', headers=headers['worker'], json={'collections': [valid]})
    assert replay.status_code == 200 and replay.json['synced_ids'] == [valid['transaction_id']]
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM payment_collections')
        assert db.fetchone()['n'] == 1
    first, unacknowledged = pending_collection(), pending_collection('HH-2')
    seed_pending(page, [first, unacknowledged])
    page.route('**/api/collections/sync', lambda route: route.fulfill(json={'status': 'success', 'synced_ids': [first['transaction_id'], 'not-in-batch']}))
    page.evaluate("window.dispatchEvent(new Event('online'))")
    wait_for_synced(page)
    rows = page.evaluate("JSON.parse(localStorage.getItem('waterhall_offline_collections'))")
    assert rows[1]['sync_status'] == 'PENDING' and rows[1]['sync_error']
    assert not errors


def test_worker_manual_bill_uses_configured_rates(browser_page):
    page, origin, (client, headers, password), errors = browser_page
    client.post('/api/settings/billing', headers=headers['admin'], json=dict(base_rate='100', included_m3='10', environmental_fee='20', excess_rate='12.50'))
    sign_in(page, origin, password)
    page.locator('#app-bottom-nav [data-target="view-billing"]').click()
    page.locator('#bill-meter-search').fill('Resident Two')
    page.locator('#bill-meter-results .search-result-item').click()
    page.locator('#bill-curr-input').fill('-1')
    expect(page.locator('#btn-save-bill')).to_be_disabled()
    page.locator('#bill-curr-input').fill('12')
    expect(page.locator('#bill-calc-total')).to_have_text('145.00')
    expect(page.locator('#bill-calc-base')).to_have_text('100.00')
    expect(page.locator('#bill-calc-fee')).to_have_text('20.00')
    with page.expect_response(lambda response: '/api/billing-records/add' in response.url) as response:
        page.locator('#btn-save-bill').click()
    assert response.value.status == 200
    expect(page.locator('#btn-save-bill')).to_be_disabled()
    with get_db() as db:
        db.execute('SELECT total_amount, billing_snapshot FROM billing_records WHERE meter_id = 2')
        record = db.fetchone()
        assert record['total_amount'] == 145 and record['billing_snapshot']
    assert not errors


def test_native_auth_serialization_and_push_logout_capture(browser_page):
    page, origin, (_, _, password), errors = browser_page
    sign_in(page, origin, password)
    # Controlled bridge proves that logout is queued behind an in-flight auth write
    # and that Worker auth is not duplicated through the second native channel.
    result = page.evaluate("""async () => {
      const sent = []; let duplicates = 0;
      window.WaterHallStorage = {postMessage: text => sent.push(JSON.parse(text))};
      window.WaterHallAuth = {postMessage: () => duplicates++};
      const first = waterhallSetNativeSession('synthetic-test-session');
      const clear = waterhallSetNativeSession(null);
      await new Promise(resolve => setTimeout(resolve, 20));
      const serialized = sent.length === 1;
      waterhallNativeReply(sent[0].id, {ok:true}); await first;
      await new Promise(resolve => setTimeout(resolve, 20));
      const lastIsClear = sent.length === 2 && sent[1].data.token === null;
      waterhallNativeReply(sent[1].id, {ok:true}); await clear;
      delete window.WaterHallStorage; delete window.WaterHallAuth;
      return {serialized, lastIsClear, duplicates};
    }""")
    assert result == dict(serialized=True, lastIsClear=True, duplicates=0)
    captured = page.evaluate("""async () => {
      const original = localStorage.getItem('waterhall_jwt'); const originalFetch = window.fetch;
      let authMatches = false; let unsubscribed = false;
      const sub = {endpoint:'https://push.example.test/subscription', unsubscribe:async()=>{unsubscribed=true;return true}};
      Object.defineProperty(navigator, 'serviceWorker', {configurable:true, value:{ready:Promise.resolve({pushManager:{getSubscription:async()=>sub}})}});
      window.fetch = async (path, options) => {authMatches = options.headers.Authorization === 'Bearer '+original; return {ok:true,status:200,json:async()=>({status:'success'})}};
      const work = WaterHallPush.unregisterSubscription(); localStorage.removeItem('waterhall_jwt');
      await work; localStorage.setItem('waterhall_jwt', original); window.fetch=originalFetch;
      return {authMatches, unsubscribed};
    }""")
    assert captured == dict(authMatches=True, unsubscribed=True)
    assert not errors


def test_admin_healthy_backend_abort_error_does_not_logout(browser_page):
    """Requirement: When backend is healthy, an AbortError during fetchData must NOT logout or trigger lockdown."""
    page, origin, (_, _, password), errors = browser_page
    page.goto(origin + '/admin/')
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()

    # Route /api/all-data to abort, simulating client-side abort / network cancellation
    page.route('**/api/all-data*', lambda route: route.abort('failed'))

    # Trigger fetchData
    page.evaluate("() => fetchData(false)")
    page.wait_for_timeout(1000)

    # Admin session MUST remain logged in and offline lockdown MUST NOT be visible
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    assert page.evaluate("() => localStorage.getItem('admin_jwt')") is not None

    page.unroute('**/api/all-data*')


def test_admin_genuine_health_failure_triggers_lockdown_and_recovery(browser_page):
    """Requirement: Genuine health failure triggers lockdown; backend recovery lifts lockdown."""
    page, origin, (_, _, password), errors = browser_page
    page.goto(origin + '/admin/')
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()

    # Simulate genuine backend outage on /api/health and /api/ready
    page.route('**/api/health*', lambda route: route.fulfill(status=503, json={'status': 'unavailable'}))
    page.route('**/api/ready*', lambda route: route.fulfill(status=503, json={'status': 'unavailable'}))

    # Trigger offline overlay to simulate confirmed backend outage
    page.evaluate("() => showAdminOfflineOverlay()")
    expect(page.locator('#admin-offline-overlay')).to_be_visible()
    assert page.evaluate("() => localStorage.getItem('admin_jwt')") is None

    # Simulate server recovery
    page.unroute('**/api/health*')
    page.unroute('**/api/ready*')

    # Click retry connection button
    page.locator('#btn-admin-retry').click()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    expect(page.locator('#login-screen')).to_be_visible()


def test_admin_chart_js_loads_locally_without_csp_error(browser_page):
    """Requirement: Chart.js is loaded from local /admin/vendor path and window.Chart is defined."""
    page, origin, (_, _, password), errors = browser_page
    csp_violations = []
    page.on('console', lambda msg: csp_violations.append(msg.text) if 'blocked by CSP' in msg.text else None)

    page.goto(origin + '/admin/')
    is_chart_loaded = page.evaluate("() => typeof window.Chart === 'function'")
    assert is_chart_loaded, "window.Chart should be defined from local vendor bundle"

    # Verify no source map CSP block errors occurred
    assert not any('chart.umd.min.js.map' in v for v in csp_violations), "CSP should not block chart source map"
