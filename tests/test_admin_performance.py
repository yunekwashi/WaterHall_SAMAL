"""Opt-in, sequential local profiling; no production URLs or persistent data."""
import datetime
import json
import os
from pathlib import Path
import subprocess
import sys
import threading
import time
import urllib.request

import pytest
from flask import g, has_request_context, request
from werkzeug.serving import make_server
from backend.db_adapter import DBConnection, get_db
from backend.server import app
from backend import login_security
from test_browser import browser_page

pytestmark = pytest.mark.skipif(os.getenv('RUN_ADMIN_PERF') != '1', reason='Opt-in isolated local profiling')


def save_measurement(name, value):
    directory = Path(os.environ['ADMIN_PERF_OUTPUT'])
    directory.mkdir(parents=True, exist_ok=True)
    (directory / name).write_text(json.dumps(value, indent=2), encoding='utf-8')


@pytest.fixture
def request_probe(monkeypatch):
    records = []

    def start():
        g.admin_perf = dict(start=time.perf_counter(), started_utc=datetime.datetime.now(datetime.timezone.utc).isoformat(),
                            query_ms=0, fetch_ms=0, connection_ms=0, transaction_ms=0, serialization_ms=0, password_ms=0, queries=0, connections=0)

    def finish(response):
        if not request.path.startswith('/api/'):
            return response
        item = dict(g.admin_perf)
        item.update(path=request.full_path.rstrip('?'), backend_ms=(time.perf_counter() - item.pop('start')) * 1000,
                    payload_bytes=len(response.get_data()), status=response.status_code)
        records.append(item)
        return response

    monkeypatch.setitem(app.before_request_funcs, None, [start] + app.before_request_funcs.get(None, []))
    monkeypatch.setitem(app.after_request_funcs, None, [finish] + app.after_request_funcs.get(None, []))

    def instrument(owner, name, metric, counter=None):
        original = getattr(owner, name)

        def wrapped(*args, **kwargs):
            began = time.perf_counter()
            try:
                return original(*args, **kwargs)
            finally:
                if has_request_context() and hasattr(g, 'admin_perf'):
                    g.admin_perf[metric] += (time.perf_counter() - began) * 1000
                    if counter:
                        g.admin_perf[counter] += 1
        monkeypatch.setattr(owner, name, wrapped)

    instrument(DBConnection, '__init__', 'connection_ms', 'connections')
    instrument(DBConnection, 'execute', 'query_ms', 'queries')
    instrument(DBConnection, 'fetchall', 'fetch_ms')
    instrument(DBConnection, 'fetchone', 'fetch_ms')
    for method in ['commit', 'rollback', 'close']:
        instrument(DBConnection, method, 'transaction_ms')
    instrument(app.json, 'response', 'serialization_ms')
    instrument(login_security, 'check_password_hash', 'password_ms')
    return records


def test_admin_local_endpoint_measurements(system, request_probe):
    assert not os.getenv('TEST_DATABASE_URL')
    _, headers, password = system
    server = make_server('127.0.0.1', 0, app, threaded=True)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    origin = 'http://127.0.0.1:' + str(server.server_port)
    samples = []

    def sample(path, dataset, body=None):
        began = time.perf_counter()
        message = urllib.request.Request(origin + path, data=json.dumps(body).encode() if body else None,
                                         headers={**headers['admin'], 'Content-Type':'application/json'})
        with urllib.request.urlopen(message, timeout=30) as response:
            payload = response.read()
            assert response.status == 200
        total = (time.perf_counter() - began) * 1000
        record = dict(next(item for item in reversed(request_probe) if item['path'] == path))
        record.update(total_ms=total, dataset=dataset, payload_bytes=len(payload))
        samples.append(record)

    try:
        for path in ['/api/health', '/api/ready', '/api/login', '/api/all-data?role=admin', '/api/residents/registrations',
                     '/api/settings/payment', '/api/config', '/api/collections/history']:
            for _ in range(3):
                sample(path, '2 households / 1 bill', {'username':'admin', 'password':password} if path == '/api/login' else None)
        # A bounded synthetic scale sample, built only in the temporary fixture.
        with get_db() as db:
            db.execute('SELECT password_hash FROM households LIMIT 1')
            hashed = db.fetchone()['password_hash']
            for index in range(3, 51):
                db.execute("INSERT INTO households (purok_id, family_head_name, registration_date, password_hash) VALUES (1, ?, '2026-01-01', ?)", (f'Profile household {index}', hashed))
                household = db.lastrowid
                db.execute('INSERT INTO water_meters (household_id, serial_number) VALUES (?, ?)', (household, f'PROFILE-{household}'))
            db.execute('SELECT meter_id FROM water_meters')
            meters = [row['meter_id'] for row in db.fetchall()]
            for meter in meters:
                for month in range(12):
                    db.execute('INSERT INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount) VALUES (?, 0, 10, 10, 170)', (meter,))
        for path in ['/api/all-data?role=admin', '/api/residents/registrations']:
            for _ in range(3):
                sample(path, '50 households / 601 bills')
    finally:
        server.shutdown()
        thread.join(timeout=5)
    with get_db() as db:
        db.execute("SELECT name, tbl_name, sql FROM sqlite_master WHERE type = 'index'")
        indexes = db.fetchall()
        db.execute('EXPLAIN QUERY PLAN SELECT consumption_m3 FROM billing_records WHERE meter_id = ? ORDER BY bill_id DESC LIMIT 4', (1,))
        history_plan = db.fetchall()
    imports = []
    for _ in range(3):
        child = subprocess.run([sys.executable, '-c', 'import time; t=time.perf_counter(); import backend.server; print((time.perf_counter()-t)*1000)'],
                               capture_output=True, text=True, check=True, timeout=30, env=os.environ.copy())
        imports.append(float(child.stdout.strip()))
    save_measurement(os.getenv('ADMIN_PERF_ENDPOINT_FILE', 'endpoints.json'), dict(samples=samples, local_fresh_import_ms=imports,
                                          sqlite_indexes=indexes, sqlite_history_plan=history_plan,
                                          note='Sequential loopback HTTP; SQLite fixtures; warm endpoint requests; no remote/production traffic.'))


TRACE_SCRIPT = """
window.adminPerf = {requests: [], renders: [], ready: null, clicked: null};
document.addEventListener('click', event => {
  if (event.target.closest('#btn-login')) adminPerf.clicked = performance.now();
}, true);
const measuredFetch = window.fetch.bind(window);
window.fetch = async (url, options) => {
  const item = {path:String(url), start:performance.now()};
  if (item.path.includes('/api/')) adminPerf.requests.push(item);
  const response = await measuredFetch(url, options);
  item.headers = performance.now(); item.status = response.status;
  const readJSON = response.json.bind(response);
  response.json = async () => {
    const data = await readJSON();
    if (item.path.includes('/api/residents/registrations') && window.adminRegistrationDelay)
      await new Promise(resolve => setTimeout(resolve, window.adminRegistrationDelay));
    item.body = performance.now(); return data;
  };
  return response;
};
document.addEventListener('DOMContentLoaded', () => {
  new MutationObserver(() => {
    if (document.getElementById('login-screen').style.display === 'none' &&
        document.getElementById('loading-overlay').style.display === 'none' && adminPerf.ready === null)
      adminPerf.ready = performance.now();
  }).observe(document.getElementById('loading-overlay'), {attributes:true, attributeFilter:['style']});
});
"""

RENDER_SCRIPT = """
for (const name of ['renderBillingConfig','renderReservoir','renderDashboard','renderCharts','renderDirectory',
                    'renderAnnouncements','renderBilling','renderCollectionsHistory','renderPaymentSettings','renderReports','setTableRowHtml']) {
  const original = window[name];
  window[name] = (...args) => {
    const start = performance.now();
    try { return original(...args); }
    finally { adminPerf.renders.push({name, start, end:performance.now()}); }
  };
}
"""


def test_admin_browser_load_measurements(browser_page, request_probe):
    from playwright.sync_api import expect
    page, origin, (_, _, password), errors = browser_page
    label = os.getenv('ADMIN_PERF_LABEL', 'before')
    source = Path('admin_web/app.js').read_text(encoding='utf-8')
    page.add_init_script(TRACE_SCRIPT)
    page.route('**/admin/app.js*', lambda route: route.fulfill(body=source + RENDER_SCRIPT, content_type='application/javascript'))
    traces = []
    for index in range(3):
        page.goto(origin + '/admin/')
        expect(page.locator('#admin-offline-overlay')).to_be_hidden(timeout=15000)
        page.locator('#login-username').fill('admin')
        page.locator('#login-password').fill(password)
        page.locator('#btn-login').click()
        expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
        expect(page.locator('#loading-overlay')).to_be_hidden(timeout=15000)
        page.wait_for_function('() => adminPerf.ready !== null')
        traces.append(page.evaluate('adminPerf'))
        page.evaluate("localStorage.removeItem('admin_jwt')")
    # Record navigation traffic; a periodic heartbeat may fall inside this window.
    before_navigation = page.evaluate('({time:performance.now(), count:adminPerf.requests.length})')
    for tab in ['directory','assets','billing','payment-settings','dashboard']:
        page.locator('[data-tab="tab-' + tab + '"]').click()
    navigation = page.evaluate('adminPerf.requests').copy()[before_navigation['count']:]
    for width, height in [(1366,768),(390,844)]:
        page.set_viewport_size({'width':width,'height':height})
        page.screenshot(path=str(Path(os.environ['ADMIN_PERF_OUTPUT']) / f'{label}-{width}.png'), full_page=True)
    rendering = page.evaluate("""async () => {
      const data = structuredClone(globalData);
      const household = data.households[0], bill = data.billingRecords[0];
      data.households = Array.from({length:50}, (_,i) => ({...household, house_id:'PROFILE-HH-'+i, owner_name:'Profile household '+i}));
      data.billingRecords = Array.from({length:601}, (_,i) => ({...bill, bill_id:'PROFILE-BILL-'+i}));
      const samples = [];
      const originalFetch = window.fetch;
      let requests = 0;
      window.fetch = (url, options) => {
        if (String(url).includes('/api/all-data')) {
          requests++;
          return Promise.resolve(new Response(JSON.stringify(data), {status:200, headers:{'Content-Type':'application/json'}}));
        }
        return originalFetch(url, options);
      };
      try {
        for (let i=0;i<3;i++) {
          adminPerf.renders = [];
          const start = performance.now();
          await fetchData(false);
          samples.push({total_ms:performance.now()-start, renders:structuredClone(adminPerf.renders)});
        }
      } finally {
        window.fetch = originalFetch;
      }
      return {households:50, bills:601, data_requests:requests, samples};
    }""")
    assert not errors
    save_measurement(f'browser-{label}.json', dict(traces=traces, backend=request_probe, navigation_requests=navigation))
    save_measurement(f'rendering-{label}.json', rendering)


def test_admin_registration_waterfall_measurements(browser_page):
    from playwright.sync_api import expect
    page, origin, (_, _, password), errors = browser_page
    audit_path = os.getenv('ADMIN_PERF_AUDIT_APP')
    if not audit_path or not Path(audit_path).is_file():
        pytest.skip('Provide ADMIN_PERF_AUDIT_APP to compare the preserved audit baseline')
    audit_source = Path(audit_path).read_text(encoding='utf-8')
    repaired_source = Path('admin_web/app.js').read_text(encoding='utf-8')
    page.add_init_script(TRACE_SCRIPT)
    results = []
    for label, source in [('audit', audit_source), ('repaired', repaired_source)]:
        def serve_script(route):
            route.fulfill(body=source + RENDER_SCRIPT, content_type='application/javascript')
        page.route('**/admin/app.js*', serve_script)
        page.goto(origin + '/admin/')
        expect(page.locator('#admin-offline-overlay')).to_be_hidden(timeout=15000)
        page.evaluate('window.adminRegistrationDelay = 250')
        page.locator('#login-username').fill('admin')
        page.locator('#login-password').fill(password)
        page.locator('#btn-login').click()
        expect(page.locator('#resident-tbody tr')).to_have_count(2, timeout=15000)
        page.wait_for_function("() => adminPerf.requests.some(item => item.path.includes('/api/residents/registrations') && item.body)")
        trace = page.evaluate('adminPerf')
        data = next(item for item in trace['requests'] if '/api/all-data' in item['path'] and item.get('body'))
        rendered = next(item for item in trace['renders'] if item['name'] == 'renderReports')
        results.append(dict(source=label, artificial_registration_delay_ms=250, data_body_to_main_render_ms=rendered['end'] - data['body']))
        page.evaluate("localStorage.removeItem('admin_jwt')")
        page.unroute('**/admin/app.js*')
    assert results[0]['data_body_to_main_render_ms'] > 250
    assert results[1]['data_body_to_main_render_ms'] < results[0]['data_body_to_main_render_ms']
    assert not errors
    save_measurement('registration-waterfall.json', results)
