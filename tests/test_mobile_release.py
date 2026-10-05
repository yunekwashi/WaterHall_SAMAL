"""Mobile WebView regressions against disposable databases and real Chromium."""
import json
import os
import time
from pathlib import Path

import pytest
from test_browser import browser_page
from playwright.sync_api import expect

pytestmark = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in browser regression')


def login(page, origin, password, role):
    page.goto(origin + '/index.html?role=' + role)
    page.locator('#employee-id').fill('HH-1' if role == 'resident' else 'worker')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-resident-home' if role == 'resident' else '#view-dashboard').wait_for(state='visible')


@pytest.mark.parametrize('role', ['resident', 'worker'])
def test_mobile_measurements(browser_page, role):
    page, origin, (_, _, password), errors = browser_page
    output = os.getenv('MOBILE_PERF_OUTPUT')
    if not output:
        pytest.skip('Set MOBILE_PERF_OUTPUT for measurements')
    path = Path(output)
    path.mkdir(parents=True, exist_ok=True)
    page.set_viewport_size({'width': 390, 'height': 844})
    requests = []
    page.on('request', lambda request: requests.append(request.url) if '/api/' in request.url else None)
    start = time.perf_counter()
    login(page, origin, password, role)
    startup = (time.perf_counter() - start) * 1000
    nav = '#resident-bottom-nav' if role == 'resident' else '#app-bottom-nav'
    target = 'view-resident-home' if role == 'resident' else 'view-dashboard'
    render = []
    for _ in range(5):
        t = time.perf_counter()
        page.locator(f'{nav} [data-target="{target}"]').click()
        page.locator('#' + target).wait_for(state='visible')
        render.append((time.perf_counter() - t) * 1000)
    page.screenshot(path=str(path / (role + '.png')))
    before = len([url for url in requests if '/api/all-data' in url])
    page.wait_for_timeout(31500)
    calls = len([url for url in requests if '/api/all-data' in url]) - before
    (path / (role + '.json')).write_text(json.dumps({'startup_to_authenticated_ms': startup,
        'navigation_render_ms': render, 'all_data_requests_in_31_5s': calls, 'page_errors': errors}, indent=2))
    assert errors == []


@pytest.mark.parametrize('role', ['resident', 'worker'])
@pytest.mark.parametrize('width', [360, 375, 390, 720])
def test_mobile_navigation_and_responsive_layout(browser_page, role, width):
    page, origin, (_, _, password), errors = browser_page
    page.set_viewport_size({'width': width, 'height': 844})
    login(page, origin, password, role)
    nav = '#resident-bottom-nav' if role == 'resident' else '#app-bottom-nav'
    targets = page.locator(nav + ' [data-target]').evaluate_all('(tabs) => tabs.map(t => t.dataset.target)')
    assert len(targets) == 5
    for target in targets:
        page.locator(f'{nav} [data-target="{target}"]').click()
        expect(page.locator('#' + target)).to_be_visible()
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        overflowing = page.locator('#' + target).evaluate('root => [...root.querySelectorAll("*")].filter(e => {const r=e.getBoundingClientRect(); return r.width && r.height && (r.right > innerWidth+1 || r.left < -1);}).map(e=>e.id||e.className)')
        assert overflowing == [], overflowing
        if width == 390:
            evidence = os.getenv('MOBILE_SCREENSHOT_OUTPUT')
            if evidence:
                Path(evidence).mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(Path(evidence) / (role + '-' + target + '.png')))
    if role == 'resident':
        expect(page.locator('#resident-profile-name')).to_have_text('Resident One')
        page.locator('#btn-resident-profile-logout').click()
        expect(page.locator('#view-login')).to_be_visible()
        assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
        expect(page.locator('#resident-profile-name')).to_have_text('--')
    else:
        assert page.get_by_text('My Active Workorders').count() == 0
        assert page.get_by_text('Tagpopongan Office Help').count() == 0
        expect(page.locator('#worker-name')).to_have_text('worker')
        expect(page.locator('#worker-announcement-input')).to_be_visible()
    assert errors == []


def test_cumulative_reading_guard_150_to_111_or_160(browser_page):
    from backend.db_adapter import get_db
    page, origin, (_, _, password), errors = browser_page
    with get_db() as db:
        db.execute('UPDATE water_meters SET last_reading = 150 WHERE meter_id = 1')
    login(page, origin, password, 'worker')
    page.locator('#app-bottom-nav [data-target="view-billing"]').click()
    expect(page.locator('#bill-prev-reading')).to_have_text('150.000')
    page.locator('#bill-curr-input').fill('111')
    expect(page.locator('#btn-save-bill')).to_be_disabled()
    expect(page.locator('#billing-alert-banner')).to_contain_text('cannot be lower')
    page.locator('#bill-curr-input').fill('160')
    expect(page.locator('#btn-save-bill')).to_be_enabled()
    expect(page.locator('#bill-calc-consumption')).to_have_text('10.000')
    expect(page.locator('#bill-calc-total')).to_have_text('170.00')
    assert errors == []


def test_shared_push_poll_durable_latest_only_and_account_scope(browser_page):
    from backend.db_adapter import get_db
    page, origin, (_, _, password), errors = browser_page
    with get_db() as db:
        db.execute("INSERT INTO announcements (id,message,author,target_audience) VALUES (100,'Historical','Admin','Residents only')")
    login(page, origin, password, 'resident')
    page.evaluate('async()=>{await navigator.serviceWorker.ready;}')
    worker = page.context.service_workers[0]
    # Exercise the actual service worker listeners without claiming physical tray behavior.
    worker.evaluate("""() => {self.delivered=[]; self.registration.showNotification=async(title,options)=>self.delivered.push({title,...options});}""")
    def message(scope, identifier, role='resident'):
        return worker.evaluate("""async p => {let done; const e=new Event('message'); Object.defineProperties(e,{data:{value:{type:'announcements',...p}},waitUntil:{value:x=>done=x}}); self.dispatchEvent(e); await done;}""",
            {'scope': scope, 'role': role, 'expiresAt': int(time.time() * 1000) + 3600000, 'latest': {'id': identifier, 'message': 'Notice ' + str(identifier)}})
    scope = origin + '|resident|HH-1'
    message(scope, 100)  # Silent fixed-upgrade baseline.
    assert worker.evaluate('self.delivered.length') == 0
    message(scope, 103)  # Missed 101/102 are never dispatched as phone alerts.
    message(scope, 103)
    assert worker.evaluate('self.delivered.map(n=>n.body)') == ['Notice 103']
    push = """async p => {let done; const e=new Event('push');Object.defineProperties(e,{data:{value:{json:()=>p}},waitUntil:{value:x=>done=x}});self.dispatchEvent(e);await done;}"""
    worker.evaluate(push, {'tag':'announcement-103','body':'Duplicate','recipient':{'owner':'HH-1','role':'resident'}})
    assert worker.evaluate('self.delivered.length') == 1
    message(origin + '|resident|HH-2', 200)
    worker.evaluate(push, {'tag':'announcement-201','body':'Old account','recipient':{'owner':'HH-1','role':'resident'}})
    assert worker.evaluate('self.delivered.length') == 1
    # Delayed logout for A must not clear B's active scope.
    worker.evaluate("""async scope => {let done;const e=new Event('message');Object.defineProperties(e,{data:{value:{type:'notification-logout',scope}},waitUntil:{value:x=>done=x}});self.dispatchEvent(e);await done;}""", scope)
    message(origin + '|resident|HH-2', 201)
    assert worker.evaluate('self.delivered.length') == 2
    assert worker.evaluate('self.delivered.every(n=>n.tag==="waterhall-announcement" && n.renotify===false)')
    # Restore A without clearing its checkpoint: historical 103 remains silent.
    message(scope, 103)
    assert worker.evaluate('self.delivered.length') == 2
    # An expired background scope cannot dispatch a later push.
    worker.evaluate("""async () => {const db=await notificationDb;await new Promise(resolve=>{const tx=db.transaction('state','readwrite');const store=tx.objectStore('state');const req=store.get('active');req.onsuccess=()=>store.put({...req.result,expiresAt:1},'active');tx.oncomplete=resolve;});}""")
    worker.evaluate(push, {'tag':'announcement-104','body':'Expired','recipient':{'owner':'HH-1','role':'resident'}})
    assert worker.evaluate('self.delivered.length') == 2
    assert errors == []


@pytest.mark.parametrize('role', ['resident', 'worker'])
def test_foreground_refresh_keeps_current_data_without_rebuilding_unchanged_cards(browser_page, role):
    page, origin, (_, _, password), errors = browser_page
    page.clock.install()
    login(page, origin, password, role)
    target = '#view-resident-home .assets-scroll' if role == 'resident' else '#view-dashboard .dashboard-scroll'
    page.locator(target).evaluate("root => {self.cardMutations=0;new MutationObserver(rows=>self.cardMutations+=rows.length).observe(root,{childList:true,subtree:true});}")
    with page.expect_response(lambda response: '/api/all-data?role=' + role in response.url):
        page.clock.fast_forward(61000)
    page.wait_for_timeout(200)
    assert page.evaluate('self.cardMutations') == 0
    assert errors == []


@pytest.mark.parametrize('operation', ['bill', 'collection'])
def test_worker_logout_during_local_commit_retains_queue_without_reopening_private_view(browser_page, operation):
    from backend.db_adapter import get_db
    page, origin, (_, _, password), errors = browser_page
    with get_db() as db:
        db.execute("UPDATE payment_settings SET setting_value='true' WHERE setting_key='allow_worker_collection'")
    login(page, origin, password, 'worker')
    page.context.set_offline(True)
    page.evaluate("""() => {window.WaterHallStorage={}; window.waterhallNativeCall=(method)=>method==='save'?new Promise(resolve=>window.finishCommit=()=>resolve(null)):Promise.resolve(null);}""")
    if operation == 'bill':
        page.locator('#app-bottom-nav [data-target="view-billing"]').click()
        page.locator('#bill-curr-input').fill('10')
        page.locator('#btn-save-bill').click()
    else:
        page.locator('#app-bottom-nav [data-target="view-directory"]').click()
        page.locator('.household-card').filter(has_text='Resident One').click()
        page.locator('#btn-open-collect-modal').click()
        page.locator('#collect-amount-input').fill('170')
        page.locator('#btn-collect-confirm').click()
        page.locator('#btn-collect-cancel').click()
    page.wait_for_function('typeof window.finishCommit === "function"')
    page.locator('#app-bottom-nav [data-target="view-profile"]').click()
    page.locator('#btn-logout').click()
    expect(page.locator('#view-login')).to_be_visible()
    page.evaluate('window.finishCommit()')
    key = 'waterhall_unsynced_actions' if operation == 'bill' else 'waterhall_offline_collections'
    page.wait_for_function('key=>JSON.parse(localStorage.getItem(key)||"[]").length===1', arg=key)
    expect(page.locator('#view-login')).to_be_visible()
    expect(page.locator('#modal-collect-payment')).to_be_hidden()
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
    rows = page.evaluate('key=>JSON.parse(localStorage.getItem(key))', key)
    assert (rows[0].get('owner') or rows[0].get('collected_by')) == 'worker'
    assert not errors
