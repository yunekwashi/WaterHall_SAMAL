"""Real browser smoke tests. RUN_BROWSER_TESTS=1 requires Chrome or Playwright Chromium."""
import io
import os
import threading
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
    page.goto(origin + '/admin/')
    page.locator('#login-username').fill('admin')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    page.evaluate("""() => renderReports([{report_id:1, household_id:'HH-1', report_type:'Leak',
        description:'<img src=x onerror="window.xssExecuted=true">', status:'Pending', created_at:'2026-09-01'}])""")
    assert page.evaluate('window.xssExecuted === undefined')
    assert page.locator('#reports-tbody [onerror]').count() == 0
    assert page.locator('#reports-tbody [data-resolve-report]').count() == 1
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
