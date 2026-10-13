"""Display-only announcement timestamp compatibility; disposable fixtures only."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import uuid

import pytest

from backend.db_adapter import get_db
from test_browser import browser_page

HELPER = Path(__file__).resolve().parents[1] / 'web/ui-display.js'
ADMIN_STAMP = '2026-10-13 12:50:07.924681+00'
SYSTEM_STAMP = '2026-10-13 13:26:25'


@pytest.mark.parametrize('stamp,expected', [
    (ADMIN_STAMP, 'Oct 13, 2026 • 8:50 PM'),
    ('2026-10-13 20:50:07.924681+08', 'Oct 13, 2026 • 8:50 PM'),
    ('2026-10-13 08:50:07.924681-04', 'Oct 13, 2026 • 8:50 PM'),
    ('2026-10-13T12:50:07.924681+00:00', 'Oct 13, 2026 • 8:50 PM'),
    ('2026-10-13T12:50:07Z', 'Oct 13, 2026 • 8:50 PM'),
    (SYSTEM_STAMP, 'Oct 13, 2026 • 9:26 PM'),
    (None, 'Unknown date'),
    ('', 'Unknown date'),
    ('invalid legacy date', 'Unknown date'),
    ('2026-13-13 12:50:07+00', 'Unknown date'),
])
def test_announcement_timestamp_display_local_time_and_legacy_fallback(stamp, expected):
    script = """
const fs=require('fs'),vm=require('vm'),input=JSON.parse(fs.readFileSync(0,'utf8'));
const context={window:{}};vm.runInNewContext(fs.readFileSync(input.helper,'utf8'),context);
process.stdout.write(JSON.stringify(context.window.WaterHallDisplay.formatTimestamp(input.stamp,'Unknown date')));
"""
    result = subprocess.run([shutil.which('node'), '-e', script],
        input=json.dumps({'helper': str(HELPER), 'stamp': stamp}), text=True,
        capture_output=True, check=True, encoding='utf-8', env={**os.environ, 'TZ': 'Asia/Manila'})
    assert json.loads(result.stdout) == expected


def test_announcement_api_preserves_timestamp_field_and_value(system):
    client, headers, _ = system
    response = client.post('/api/announcements/add', headers=headers['admin'],
        json={'message': 'Admin timestamp regression', 'target_audience': 'Everyone',
              'operation_id': str(uuid.uuid4())})
    assert response.status_code == 200
    with get_db() as db:
        db.execute('SELECT timestamp FROM announcements WHERE id = ?', (response.json['id'],))
        assert db.fetchone()['timestamp']
        # Reproduce the exact production PostgreSQL TEXT representation.
        db.execute('UPDATE announcements SET timestamp = ? WHERE id = ?',
            (ADMIN_STAMP, response.json['id']))
    for role in ('admin', 'worker', 'HH-1'):
        announcement = client.get('/api/announcements', headers=headers[role]).json['announcements'][0]
        assert announcement['timestamp'] == ADMIN_STAMP
        assert announcement['message'] == 'Admin timestamp regression'
        assert announcement['author'] == 'admin'
        assert announcement['target_audience'] == 'Everyone'
        assert client.get('/api/all-data', headers=headers[role]).json['announcements'][0] == announcement


@pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in Chrome regression')
@pytest.mark.parametrize('role', ['worker', 'resident'])
def test_announcement_banner_history_and_system_dates_in_mobile_ui(browser_page, role):
    from playwright.sync_api import expect
    page, origin, (_, _, password), errors = browser_page
    with get_db() as db:
        for message, author, stamp in [
            ('Missing legacy timestamp', 'Admin', None),
            ('Invalid legacy timestamp', 'Admin', 'invalid legacy date'),
            ('System sensor timestamp', 'System Sensor Alert', SYSTEM_STAMP),
            ('Admin timestamp regression', 'Admin', ADMIN_STAMP),
        ]:
            db.execute('INSERT INTO announcements (message, author, target_audience, timestamp) VALUES (?, ?, ?, ?)',
                (message, author, 'Everyone', stamp))
    # Exercise the same local timezone as production phones in both WebView UIs.
    # The fixture owns the browser; use a fresh context with Manila local time.
    browser = page.context.browser
    context = browser.new_context(timezone_id='Asia/Manila', viewport={'width': 390, 'height': 844})
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    try:
        page.goto(origin + '/index.html?role=' + role)
        page.locator('#employee-id').fill('worker' if role == 'worker' else 'HH-1')
        page.locator('#login-password').fill(password)
        page.locator('#btn-login').click()
        page.locator('#view-dashboard' if role == 'worker' else '#view-resident-home').wait_for(state='visible')
        expect(page.locator('#' + role + '-announcement-tag')).to_contain_text('Oct 13, 2026 • 8:50 PM')
        nav = '#app-bottom-nav' if role == 'worker' else '#resident-bottom-nav'
        page.locator(nav + ' [data-target="view-announcements"]').click()
        history = page.locator('#announcement-history .announcement-history-card')
        for message, expected in [
            ('Admin timestamp regression', 'Oct 13, 2026 • 8:50 PM'),
            ('System sensor timestamp', 'Oct 13, 2026 • 9:26 PM'),
            ('Missing legacy timestamp', 'Unknown date'),
            ('Invalid legacy timestamp', 'Unknown date'),
        ]:
            expect(history.filter(has_text=message).locator('.announcement-meta')).to_contain_text(expected)
        assert 'Unknown date' not in history.filter(has_text='Admin timestamp regression').inner_text()
        assert not errors
    finally:
        context.close()
