"""Controlled Admin recovery/range regressions in real Chrome, using random passwords."""
import json
import secrets

import pytest
from playwright.sync_api import expect
from werkzeug.security import generate_password_hash

from backend.db_adapter import get_db
from test_browser import browser_page, pytestmark
from test_admin_repairs import login_admin, hold_old_data


def clean_login(browser_page):
    page, origin, _, _ = browser_page
    page.goto(origin + '/admin/')
    expect(page.locator('#admin-offline-overlay')).to_be_hidden(timeout=15000)
    expect(page.locator('#login-screen')).to_be_visible()
    return page


def sign_in(page, username, password):
    page.locator('#login-username').fill(username)
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    page.wait_for_function('() => !isFetchingData')
    expect(page.locator('#loading-overlay')).to_be_hidden(timeout=15000)
    expect(page.locator('#auth-name')).to_have_text(username)


def two_admins(browser_page):
    plain = secrets.token_urlsafe(24)
    with get_db() as db:
        db.execute("UPDATE users SET username = 'Admin' WHERE username = 'admin'")
        db.execute('INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)',
                   ('Maikuuu', generate_password_hash(plain), 'Different display name', 'Admin'))
    return {'Admin': browser_page[2][2], 'Maikuuu': plain}


@pytest.mark.parametrize('stage', ['health', 'headers', 'body', 'error_body'])
@pytest.mark.parametrize('first,second', [('admin', 'admin'), ('Maikuuu', 'Admin'), ('Admin', 'Maikuuu')])
def test_admin_login_deadline_retry_and_late_response_ownership(browser_page, stage, first, second):
    passwords = two_admins(browser_page) if first != 'admin' else {'admin': browser_page[2][2]}
    page = clean_login(browser_page)
    client = browser_page[2][0]
    payload = client.post('/api/login', json={'username': first, 'password': passwords[first]}).json
    page.evaluate("""({stage, payload}) => {
      const originalFetch = window.fetch.bind(window), originalTimer = window.setTimeout;
      window.shortLoginDeadline = true;
      window.deadlineCallbacks = [];
      window.setTimeout = (fn, delay, ...args) => {
        if (delay === 30000 && shortLoginDeadline) deadlineCallbacks.push(() => fn(...args));
        return originalTimer(fn, delay, ...args);
      };
      let held = false;
      window.fetch = (url, options) => {
        const target = stage === 'health' ? '/api/health' : '/api/login';
        if (!held && String(url).includes(target)) {
          held = true;
          const response = new Response(JSON.stringify(stage === 'health' ? {status:'ok'} : payload),
            {status:stage === 'error_body' ? 401 : 200});
          if (stage === 'body' || stage === 'error_body') {
            response.json = () => new Promise(resolve => { window.releaseLogin = () => resolve(payload); });
            return Promise.resolve(response);
          }
          return new Promise(resolve => { window.releaseLogin = () => resolve(response); });
        }
        return originalFetch(url, options);
      };
    }""", {'stage': stage, 'payload': payload})
    page.locator('#login-username').fill(first)
    page.locator('#login-password').fill(passwords[first])
    page.locator('#btn-login').click()
    page.wait_for_function('() => typeof releaseLogin === "function"')
    # Fire the real 30-second deadline deterministically AFTER the requested stage stalls.
    page.evaluate('deadlineCallbacks[0]()')
    expect(page.locator('#login-error')).to_contain_text('timed out', timeout=10000)
    expect(page.locator('#btn-login')).to_be_enabled()
    expect(page.locator('#login-username')).to_be_editable()
    expect(page.locator('#login-password')).to_be_editable()
    expect(page.locator('#loading-overlay')).to_be_hidden()
    assert page.evaluate('jwtToken') is None
    page.evaluate('shortLoginDeadline = false')
    sign_in(page, second, passwords[second])
    token, chart = page.evaluate('[jwtToken, charts.collections.id]')
    page.evaluate('releaseLogin()')
    # Drain the old continuations, then verify all newer state stays owned.
    page.evaluate('async () => { await new Promise(resolve => setTimeout(resolve, 30)); }')
    assert page.evaluate('[jwtToken, charts.collections.id]') == [token, chart]
    expect(page.locator('#login-error')).to_be_hidden()
    expect(page.locator('#login-screen')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    assert not browser_page[3]


def test_admin_rejected_login_remains_immediately_usable(browser_page):
    page = clean_login(browser_page)
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(secrets.token_urlsafe(24))
    page.locator('#btn-login').click()
    expect(page.locator('#login-error')).to_contain_text('Invalid credentials')
    expect(page.locator('#btn-login')).to_be_enabled()
    page.locator('#login-username').fill('worker')
    page.locator('#login-password').fill(browser_page[2][2])
    page.locator('#btn-login').click()
    expect(page.locator('#login-error')).to_contain_text('administrator account is required')
    expect(page.locator('#btn-login')).to_be_enabled()
    assert page.evaluate('jwtToken') is None
    sign_in(page, 'admin', browser_page[2][2])
    assert not browser_page[3]


@pytest.mark.parametrize('stage', ['startup', 'refresh'])
def test_admin_data_body_timeout_retry_ignores_late_body(browser_page, stage):
    page, origin, (client, headers, _), errors = browser_page
    payload = client.get('/api/all-data?role=admin', headers=headers['admin']).json
    payload['households'][0]['owner_name'] = 'STALE TIMED OUT BODY'
    page.add_init_script("""(() => {
      const interval = window.setInterval;
      window.setInterval = (fn, delay, ...args) => delay === 3500 ? 0 : interval(fn, delay, ...args);
    })();""")
    script = """payload => {
      const originalFetch = window.fetch.bind(window), originalTimer = window.setTimeout;
      window.dataDeadlines = [];
      window.setTimeout = (fn, delay, ...args) => {
        if (delay === 30000) dataDeadlines.push(() => fn(...args));
        return originalTimer(fn, delay, ...args);
      };
      let held = false;
      window.fetch = (url, options) => {
        if (!held && String(url).includes('/api/all-data')) {
          held = true;
          const response = new Response('{}', {status:200});
          response.json = () => new Promise(resolve => { window.releaseTimedOutBody = () => resolve(payload); });
          return Promise.resolve(response);
        }
        return originalFetch(url, options);
      };
    }"""
    if stage == 'startup':
        page.add_init_script("localStorage.setItem('admin_jwt', " + json.dumps(headers['admin']['Authorization'][7:]) + ");")
        page.add_init_script('(' + script + ')(' + json.dumps(payload) + ')')
        page.goto(origin + '/admin/')
    else:
        login_admin(browser_page)
        page.evaluate(script, payload)
        page.evaluate('fetchData(false)')
    page.wait_for_function('() => typeof releaseTimedOutBody === "function"')
    page.evaluate('dataDeadlines.at(-1)()')
    page.wait_for_function('() => !isFetchingData')
    expect(page.locator('#loading-overlay')).to_be_hidden()
    expect(page.locator('#btn-login')).to_be_enabled()
    expect(page.locator('#admin-db-offline-banner')).to_be_visible()
    assert page.evaluate('jwtToken') is not None
    retry = '#btn-login-data-retry' if stage == 'startup' else '#btn-admin-data-retry'
    page.locator(retry).click()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    expect(page.locator('#admin-db-offline-banner')).to_be_hidden()
    page.wait_for_function('() => !isFetchingData')
    current = page.evaluate('[jwtToken, charts.collections.id, JSON.stringify(globalData)]')
    page.evaluate('releaseTimedOutBody()')
    page.evaluate('async () => { await new Promise(resolve => setTimeout(resolve, 30)); }')
    assert page.evaluate('[jwtToken, charts.collections.id, JSON.stringify(globalData)]') == current
    assert not errors


@pytest.mark.parametrize('first,second', [('Maikuuu', 'Admin'), ('Admin', 'Maikuuu')])
@pytest.mark.parametrize('stage', ['headers', 'body'])
def test_admin_cross_account_late_private_response(browser_page, first, second, stage):
    passwords = two_admins(browser_page)
    page = clean_login(browser_page)
    sign_in(page, first, passwords[first])
    hold_old_data(page, stage)
    page.evaluate('clearAdminSession()')
    expect(page.locator('#auth-name')).to_have_text('')
    assert page.evaluate('charts.collections') is None
    assert page.locator('#resident-tbody tr').count() == 0
    sign_in(page, second, passwords[second])
    token, chart = page.evaluate('[jwtToken, charts.collections.id]')
    page.evaluate('releaseOldData()')
    page.wait_for_function('() => oldDataFinished')
    expect(page.locator('#auth-name')).to_have_text(second)
    assert page.evaluate('[jwtToken, charts.collections.id]') == [token, chart]
    assert 'OLD PRIVATE RESPONSE' not in page.locator('#resident-tbody').inner_text()
    expect(page.locator('#login-screen')).to_be_hidden()
    assert not browser_page[3]


def test_admin_fresh_start_and_restored_page_purge_transient_private_state(browser_page):
    passwords = two_admins(browser_page)
    page = clean_login(browser_page)
    sign_in(page, 'Maikuuu', passwords['Maikuuu'])
    page.locator('#collection-range').select_option('12')
    token = page.evaluate('jwtToken')
    page.evaluate("""() => {
      window.dispatchEvent(new PageTransitionEvent('pagehide', {persisted:true}));
      document.getElementById('btn-login').disabled = true;
      document.getElementById('btn-login').textContent = 'Authenticating...';
      document.getElementById('login-error').textContent = 'Old timeout';
      document.getElementById('login-error').style.display = 'block';
      document.getElementById('admin-offline-overlay').style.display = 'flex';
      document.body.classList.add('server-offline');
      window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted:true}));
    }""")
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    expect(page.locator('#auth-name')).to_have_text('Maikuuu')
    expect(page.locator('#btn-login')).to_be_enabled()
    expect(page.locator('#login-error')).to_be_hidden()
    expect(page.locator('#admin-offline-overlay')).to_be_hidden()
    assert page.evaluate('jwtToken') == token
    assert page.locator('#collection-range').input_value() == 'this-month'
    page.reload()
    expect(page.locator('#login-screen')).to_be_hidden(timeout=15000)
    expect(page.locator('#auth-name')).to_have_text('Maikuuu')
    assert page.locator('#collection-range').input_value() == 'this-month'
    page.evaluate('clearAdminSession("Old session expiration")')
    page.reload()
    expect(page.locator('#login-screen')).to_be_visible()
    expect(page.locator('#btn-login')).to_be_enabled()
    expect(page.locator('#login-error')).to_be_hidden()
    expect(page.locator('#auth-name')).to_have_text('')
    assert page.evaluate('charts.collections') is None
    assert not browser_page[3]


def fixed_clock(page, iso):
    page.add_init_script("""(() => {
      const NativeDate = Date, fixed = """ + json.dumps(iso) + """;
      window.Date = class extends NativeDate {
        constructor(...args) { super(...(args.length ? args : [fixed])); }
        static now() { return new NativeDate(fixed).getTime(); }
      };
      const originalInterval = window.setInterval;
      window.setInterval = (fn, delay, ...args) => delay === 3500 ? 0 : originalInterval(fn, delay, ...args);
    })();""")


def test_admin_all_collection_calendar_ranges_and_cached_chart(browser_page):
    page = browser_page[0]
    fixed_clock(page, '2027-01-15T12:00:00Z')
    login_admin(browser_page)
    assert page.locator('#collection-range').input_value() == 'this-month'
    page.evaluate("""() => {
      const paid = (date, total) => ({status:'Paid',payment_date:date,total_due:total});
      renderCharts({billingRecords:[
        paid('2026-11-02',120), paid('2026-12-02T06:00:00Z',200),
        paid('2027-01-10 06:00:00',0.1), paid('2027-01-10T06:00:00Z',0.2),
        paid('2027-01-11T08:00:00+08:00',1250.4), paid('2026-03-01',333),
        {status:'Unpaid',payment_date:'2027-01-10',total_due:999},
        {status:'Pending',payment_date:'2027-01-10',total_due:999},
        paid(null,999),paid('invalid',999),paid('2027-01-16',999)
      ]});
      window.chartUpdates = 0;
      const original = charts.collections.update.bind(charts.collections);
      charts.collections.update = (...args) => { chartUpdates++; return original(...args); };
    }""")
    chart_id = page.evaluate('charts.collections.id')
    requests, navigations = [], []
    page.on('request', lambda request: requests.append(request.url) if '/api/' in request.url else None)
    page.on('framenavigated', lambda frame: navigations.append(frame.url))
    expected = {
        'this-month': ('This Month', [f'2027-01-{day:02d}' for day in range(1, 16)], {9:0.3,10:1250.4}),
        'last-month': ('Last Month', [f'2026-12-{day:02d}' for day in range(1, 32)], {1:200}),
        '2': ('Last 2 Months', ['2026-12','2027-01'], {0:200,1:1250.7}),
        '3': ('Last 3 Months', ['2026-11','2026-12','2027-01'], {0:120,1:200,2:1250.7}),
        '5': ('Last 5 Months', ['2026-09','2026-10','2026-11','2026-12','2027-01'], {2:120,3:200,4:1250.7}),
        '6': ('Last 6 Months', ['2026-08','2026-09','2026-10','2026-11','2026-12','2027-01'], {3:120,4:200,5:1250.7}),
        '12': ('Last 12 Months', [f'2026-{m:02d}' for m in range(2,13)]+['2027-01'], {1:333,9:120,10:200,11:1250.7}),
        'this-year': ('This Year', ['2027-01'], {0:1250.7}),
    }
    for value, (title, labels, amounts) in expected.items():
        before_updates = page.evaluate('chartUpdates')
        page.locator('#collection-range').select_option(value)
        actual = page.evaluate('({labels:charts.collections.data.labels, amounts:charts.collections.data.datasets[0].data, id:charts.collections.id})')
        assert actual == {'labels': labels, 'amounts':[amounts.get(i,0) for i in range(len(labels))], 'id':chart_id}
        expect(page.locator('#collection-chart-title')).to_have_text('Collection Overview — ' + title)
        assert page.evaluate('chartUpdates') == before_updates + 1
    assert requests == [] and navigations == []
    assert page.evaluate("Object.keys(Chart.instances).length") == 1
    assert page.evaluate('charts.collections.scales.y.min') >= 0
    assert page.evaluate("collectionPeso.format(0)") == '₱0'
    assert page.evaluate("collectionPeso.format(1250.7)") == '₱1,250.7'
    assert page.evaluate("charts.collections.options.plugins.tooltip.callbacks.label({parsed:{y:0.30000000000000004}})") == 'Collected Revenue: ₱0.3'
    assert not browser_page[3]


@pytest.mark.parametrize('date,previous_days,current_days', [
    ('2028-02-29T12:00:00Z',31,29), ('2028-03-01T12:00:00Z',29,1)])
def test_admin_collection_leap_calendar(browser_page, date, previous_days, current_days):
    page = browser_page[0]
    fixed_clock(page, date)
    login_admin(browser_page)
    assert len(page.evaluate('charts.collections.data.labels')) == current_days
    page.locator('#collection-range').select_option('last-month')
    assert len(page.evaluate('charts.collections.data.labels')) == previous_days
    assert page.evaluate('charts.collections.data.datasets[0].data.every(value => value === 0)')
    assert not browser_page[3]


def test_admin_collection_responsive_canvas_and_session_selection(browser_page, tmp_path):
    page = login_admin(browser_page)
    chart_id = page.evaluate('charts.collections.id')
    page.locator('#collection-range').select_option('3')
    page.evaluate('fetchData(false)')
    page.wait_for_function('() => !isFetchingData')
    assert page.locator('#collection-range').input_value() == '3'
    for width in (1920,1366,820,390):
        page.set_viewport_size({'width':width,'height':844})
        page.wait_for_function("() => document.getElementById('collectionsChart').getBoundingClientRect().width <= document.querySelector('.chart-body').getBoundingClientRect().width + 1")
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert page.evaluate('charts.collections.id') == chart_id
        select = page.locator('#collection-range').bounding_box()
        canvas = page.locator('#collectionsChart').bounding_box()
        assert select['x'] >= 0 and select['x'] + select['width'] <= width + 1
        assert select['y'] + select['height'] <= canvas['y'] + 1
        page.screenshot(path=str(tmp_path / f'collection-{width}.png'), full_page=True)
    assert not browser_page[3]
