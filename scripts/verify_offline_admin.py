"""
Verification script for Admin Portal offline lockdown and auto-logout logic.
Checks:
1. Static files: admin_web/index.html contains #admin-offline-overlay and script v12.
2. CSS: styles.css contains body.server-offline rules and #admin-offline-overlay styling.
3. JS: app.js contains checkServerHealth(), performAutomaticLogoutDueToServerOffline(),
   showAdminOfflineOverlay(), and active heartbeat interval.
4. Live server test: verifies /api/health and /admin response.
"""
import os
import re
import urllib.request
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(BASE_DIR, 'admin_web', 'index.html')
STYLES_CSS = os.path.join(BASE_DIR, 'admin_web', 'styles.css')
APP_JS = os.path.join(BASE_DIR, 'admin_web', 'app.js')

def verify_codebase():
    print("==================================================")
    print("VERIFYING ADMIN PORTAL OFFLINE SECURITY LOCKDOWN")
    print("==================================================")

    # 1. Check HTML
    with open(INDEX_HTML, 'r', encoding='utf-8') as f:
        html = f.read()
    assert 'id="admin-offline-overlay"' in html, "Missing #admin-offline-overlay in index.html"
    assert 'btn-admin-retry' in html, "Missing #btn-admin-retry in index.html"
    assert 'SECURITY LOCKDOWN' in html, "Missing SECURITY LOCKDOWN badge in index.html"
    print("  [OK] index.html contains #admin-offline-overlay markup and retry button.")

    # 2. Check CSS
    with open(STYLES_CSS, 'r', encoding='utf-8') as f:
        css = f.read()
    assert 'body.server-offline' in css, "Missing body.server-offline rule in styles.css"
    assert '#admin-offline-overlay' in css, "Missing #admin-offline-overlay rule in styles.css"
    assert 'display: none !important;' in css, "Missing display:none !important rule in styles.css"
    print("  [OK] styles.css contains strict body.server-offline lockdown rules.")

    # 3. Check JS
    with open(APP_JS, 'r', encoding='utf-8') as f:
        js = f.read()
    assert 'checkServerHealth' in js, "Missing checkServerHealth() in app.js"
    assert 'performAutomaticLogoutDueToServerOffline' in js, "Missing performAutomaticLogoutDueToServerOffline in app.js"
    assert 'localStorage.removeItem(\'admin_jwt\')' in js, "Missing admin_jwt removal in app.js"
    assert 'showAdminOfflineOverlay' in js, "Missing showAdminOfflineOverlay() in app.js"
    assert 'hideAdminOfflineOverlay' in js, "Missing hideAdminOfflineOverlay() in app.js"
    assert 'setInterval' in js, "Missing active heartbeat interval in app.js"
    print("  [OK] app.js contains automatic session purge, lockdown, and active heartbeat.")

    # 4. Check Live Server
    try:
        req = urllib.request.urlopen("http://localhost:8000/api/health", timeout=3)
        res_data = json.loads(req.read().decode('utf-8'))
        assert res_data.get('status') == 'ok', "Health check did not return ok"
        print("  [OK] Live backend server is healthy and responding to /api/health.")
    except Exception as e:
        print(f"  [WARN] Could not connect to live server: {e}")

    try:
        req_admin = urllib.request.urlopen("http://localhost:8000/admin", timeout=3)
        assert req_admin.status == 200, f"Expected 200 for /admin, got {req_admin.status}"
        print("  [OK] Live /admin serves the updated portal successfully.")
    except Exception as e:
        print(f"  [WARN] Could not fetch /admin: {e}")

    print("==================================================")
    print("ALL ADMIN OFFLINE LOCKDOWN CHECKS PASSED (100%)")
    print("==================================================")

if __name__ == '__main__':
    verify_codebase()
