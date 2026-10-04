"""Tests for Admin Portal offline lockdown, heartbeat, fetchData concurrency, and Chart.js local vendoring."""
import json
import re
from pathlib import Path
import pytest
from backend.db_adapter import get_db

ROOT = Path(__file__).resolve().parents[1]
ADMIN_WEB = ROOT / 'admin_web'
INDEX_HTML = ADMIN_WEB / 'index.html'
APP_JS = ADMIN_WEB / 'app.js'
STYLES_CSS = ADMIN_WEB / 'styles.css'
CHART_JS = ADMIN_WEB / 'vendor' / 'chart.umd.min.js'
VERCEL_JSON = ROOT / 'vercel.json'
SERVER_PY = ROOT / 'backend' / 'server.py'


def test_chart_js_is_vendored_locally_without_sourcemap():
    """Requirement: Chart.js must be vendored locally with sourceMappingURL removed."""
    assert CHART_JS.is_file(), f"Vendored Chart.js file not found at {CHART_JS}"
    content = CHART_JS.read_text(encoding='utf-8')
    assert len(content) > 50000, "Vendored Chart.js is too small or truncated"
    assert 'Chart' in content, "Vendored Chart.js does not contain Chart definition"
    assert 'sourceMappingURL' not in content, "Vendored Chart.js must not contain sourceMappingURL to avoid CSP connect-src violations"


def test_index_html_loads_local_chart_js_and_not_cdn():
    """Requirement: index.html must load Chart.js from local /admin/vendor path, not CDN."""
    html = INDEX_HTML.read_text(encoding='utf-8')
    assert '/admin/vendor/chart.umd.min.js' in html, "index.html must reference /admin/vendor/chart.umd.min.js"
    assert 'https://cdn.jsdelivr.net/npm/chart.js' not in html, "index.html must not reference Chart.js via cdn.jsdelivr.net"


def test_csp_connect_src_is_strict_and_not_weakened():
    """Requirement: CSP must remain strict (connect-src 'self') without weakening for source maps."""
    vercel_data = json.loads(VERCEL_JSON.read_text(encoding='utf-8'))
    csp_header = None
    for item in vercel_data.get('headers', []):
        for h in item.get('headers', []):
            if h.get('key') == 'Content-Security-Policy':
                csp_header = h.get('value')
                break
    assert csp_header, "Content-Security-Policy not found in vercel.json"
    assert "connect-src 'self'" in csp_header, "CSP in vercel.json must retain connect-src 'self'"
    assert "connect-src 'self' https://cdn.jsdelivr.net" not in csp_header, "CSP must not weaken connect-src to include cdn.jsdelivr.net"

    server_code = SERVER_PY.read_text(encoding='utf-8')
    assert "connect-src 'self'" in server_code, "CSP in server.py must retain connect-src 'self'"
    assert "cdn.jsdelivr.net" not in server_code.split("connect-src")[1].split(";")[0], "server.py connect-src must not include cdn"


def test_app_js_aborted_fetch_does_not_trigger_offline_lockdown():
    """Requirement: AbortError during fetchData must NOT trigger offline lockdown, JWT clearing, or forced logout."""
    js = APP_JS.read_text(encoding='utf-8')
    
    # Verify isAbort check is present in fetchData catch block
    assert 'isAbort' in js or 'e.name === \'AbortError\'' in js, "fetchData must detect AbortError"
    assert 'fetchController.signal.aborted' in js, "fetchData must check if fetchController was aborted"
    
    # Verify that when aborted, it returns cleanly without calling showAdminOfflineOverlay()
    match = re.search(r'if\s*\((?:isAbort|e\.name === [\'"]AbortError[\'"])[^)]*\)\s*\{([^}]+)\}', js)
    assert match, "Abort check block not found in app.js"
    abort_body = match.group(1)
    assert 'showAdminOfflineOverlay' not in abort_body, "AbortError block must NOT call showAdminOfflineOverlay"
    assert 'performAutomaticLogoutDueToServerOffline' not in abort_body, "AbortError block must NOT call performAutomaticLogoutDueToServerOffline"
    assert 'localStorage.removeItem' not in abort_body, "AbortError block must NOT clear localStorage"


def test_app_js_offline_mode_only_triggered_when_health_check_fails():
    """Requirement: Only trigger offline mode / lockdown when an actual health check fails."""
    js = APP_JS.read_text(encoding='utf-8')
    # In fetchData, an error must check checkServerHealth before triggering showAdminOfflineOverlay
    assert 'const alive = await checkServerHealth();' in js, "fetchData must verify server health before triggering offline overlay"
    assert 'if (!alive)' in js, "Offline overlay must be conditional on !alive"


def test_app_js_in_flight_concurrency_control_prevents_overlapping_fetches():
    """Requirement: Concurrency guards must prevent overlapping background fetches and heartbeat loops."""
    js = APP_JS.read_text(encoding='utf-8')
    assert 'let isFetchingData = false;' in js, "isFetchingData guard flag must be declared"
    assert 'let currentFetchController = null;' in js, "currentFetchController must be declared"
    assert 'let isHeartbeatRunning = false;' in js, "isHeartbeatRunning guard flag must be declared"
    assert 'if (silent && isFetchingData)' in js, "Silent background poll must be skipped if fetch is already in flight"
    assert 'if (isHeartbeatRunning) return;' in js, "Heartbeat tick must return if already running"


def test_app_js_api_fetch_preserves_caller_signal():
    """Requirement: apiFetch must respect caller AbortSignal rather than overwriting it."""
    js = APP_JS.read_text(encoding='utf-8')
    assert 'options.signal' in js, "apiFetch must inspect options.signal"
    assert 'addEventListener(\'abort\'' in js or 'controller.abort' in js, "apiFetch must wire caller abort signal"


def test_app_js_check_server_health_includes_ready_fallback():
    """Requirement: checkServerHealth should have a resilient timeout and readiness fallback to handle serverless cold starts."""
    js = APP_JS.read_text(encoding='utf-8')
    assert 'checkServerReadinessFallback' in js, "checkServerHealth must include readiness fallback"
    assert '/api/ready' in js, "checkServerHealth fallback must probe /api/ready"


def test_admin_assets_served_by_backend(system):
    """Integration check: Flask server correctly serves the local admin assets and health endpoints."""
    client = system[0]
    
    # 1. Health and ready are 200
    res_health = client.get('/api/health')
    assert res_health.status_code == 200
    assert res_health.json['status'] == 'ok'

    res_ready = client.get('/api/ready')
    assert res_ready.status_code == 200
    assert res_ready.json['status'] == 'ready'

    # 2. Admin index.html
    res_admin = client.get('/admin/')
    assert res_admin.status_code == 200
    html = res_admin.data.decode('utf-8')
    assert '/admin/vendor/chart.umd.min.js' in html
    assert 'admin-offline-overlay' in html

    # 3. Local Chart.js vendor asset
    res_chart = client.get('/admin/vendor/chart.umd.min.js')
    assert res_chart.status_code == 200
    chart_body = res_chart.data.decode('utf-8')
    assert 'Chart' in chart_body
    assert 'sourceMappingURL' not in chart_body

    # 4. Admin app.js
    res_app = client.get('/admin/app.js')
    assert res_app.status_code == 200
    app_body = res_app.data.decode('utf-8')
    assert 'isFetchingData' in app_body
    assert 'checkServerHealth' in app_body


def test_admin_all_data_uses_authoritative_collection_purok(system):
    client, headers, _ = system
    with get_db() as db:
        db.execute("INSERT INTO puroks (purok_name) VALUES ('Purok 7')")
        purok = db.lastrowid
        db.execute('UPDATE households SET purok_id = ? WHERE household_id = 1', (purok,))
        for transaction, household, collector in [('ACTUAL', 1, 'worker'), ('UNKNOWN', 9999, 'other-worker')]:
            db.execute('INSERT INTO payment_collections (transaction_id, household_id, amount_collected, collection_date, collected_by) VALUES (?, ?, 170, ?, ?)', (transaction, household, '2026-01-01', collector))
    response = client.get('/api/all-data?role=admin', headers=headers['admin'])
    assert response.status_code == 200
    records = {row['transaction_id']: row for row in response.json['collectionsHistory']}
    assert records['ACTUAL']['purok_name'] == 'Purok 7'
    assert records['UNKNOWN']['purok_name'] is None
    reference = client.get('/api/collections/history', headers=headers['admin']).json['collections']
    assert records['ACTUAL']['purok_name'] == next(row for row in reference if row['transaction_id'] == 'ACTUAL')['purok_name']
    worker = client.get('/api/all-data', headers=headers['worker']).json['collectionsHistory']
    assert [row['transaction_id'] for row in worker] == ['ACTUAL']
    assert client.get('/api/all-data', headers=headers['HH-1']).json['collectionsHistory'] == []
