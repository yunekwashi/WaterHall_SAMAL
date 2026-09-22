"""
Verification script for Worker and Resident Apps:
1. Elimination of manual IP entry and floating settings button.
2. Automatic connection resolution via AppConfig.
3. Strict isolation between Worker and Resident apps (Worker cannot access Resident side, and vice-versa).
"""
import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKER_FLUTTER = os.path.join(BASE_DIR, 'waterhall_flutter', 'lib', 'main.dart')
WORKER_CONFIG = os.path.join(BASE_DIR, 'waterhall_flutter', 'lib', 'config.dart')
RESIDENT_FLUTTER = os.path.join(BASE_DIR, 'waterhall_resident_flutter', 'lib', 'main.dart')
RESIDENT_CONFIG = os.path.join(BASE_DIR, 'waterhall_resident_flutter', 'lib', 'config.dart')
WEB_APP_DART = os.path.join(BASE_DIR, 'web', 'app.dart')

def verify_all():
    print("=" * 60)
    print("VERIFYING WORKER & RESIDENT APPS ARCHITECTURAL UPGRADE")
    print("=" * 60)

    # 1. Verify Worker Flutter App
    with open(WORKER_FLUTTER, 'r', encoding='utf-8') as f:
        wf = f.read()
    assert '_showSettingsDialog' not in wf, "Worker Flutter app still contains _showSettingsDialog!"
    assert 'Icons.settings' not in wf, "Worker Flutter app still contains Icons.settings button!"
    assert 'RadioListTile' not in wf, "Worker Flutter app still contains RadioListTile role switcher!"
    assert 'AppConfig.resolveActiveServer()' in wf, "Worker Flutter app missing auto-resolve server!"
    assert 'AppConfig.appRole' in wf, "Worker Flutter app missing AppConfig.appRole!"
    print("  [OK] Worker Flutter app: Settings gear, manual IP dialog, and role switchers removed.")

    with open(WORKER_CONFIG, 'r', encoding='utf-8') as f:
        wc = f.read()
    assert 'appRole = "worker"' in wc, "Worker config role is not 'worker'!"
    assert 'resolveActiveServer' in wc, "Worker config missing resolveActiveServer!"
    print("  [OK] Worker AppConfig: Fixed role 'worker', automatic server resolver active.")

    # 2. Verify Resident Flutter App
    with open(RESIDENT_FLUTTER, 'r', encoding='utf-8') as f:
        rf = f.read()
    assert '_showSettingsDialog' not in rf, "Resident Flutter app still contains _showSettingsDialog!"
    assert 'Icons.settings' not in rf, "Resident Flutter app still contains Icons.settings button!"
    assert 'AppConfig.resolveActiveServer()' in rf, "Resident Flutter app missing auto-resolve server!"
    assert 'AppConfig.appRole' in rf, "Resident Flutter app missing AppConfig.appRole!"
    print("  [OK] Resident Flutter app: Settings gear and manual IP dialog removed.")

    with open(RESIDENT_CONFIG, 'r', encoding='utf-8') as f:
        rc = f.read()
    assert 'appRole = "resident"' in rc, "Resident config role is not 'resident'!"
    assert 'resolveActiveServer' in rc, "Resident config missing resolveActiveServer!"
    print("  [OK] Resident AppConfig: Fixed role 'resident', automatic server resolver active.")

    # 3. Verify Web Core Role Isolation in web/app.dart
    with open(WEB_APP_DART, 'r', encoding='utf-8') as f:
        wad = f.read()

    # Session gate
    assert 'if (role == \'resident\')' in wad, "web/app.dart missing role-specific session restore!"
    assert 'This terminal is for Field Workers only. Residents must use the Resident App.' in wad, \
        "web/app.dart missing worker login rejection for resident accounts!"
    assert 'This portal is for Residents only. Field Workers must use the Worker App.' in wad, \
        "web/app.dart missing resident login rejection for worker accounts!"

    # View & tab boundary guards
    assert "role == 'worker' && (targetViewId == 'view-resident-home'" in wad, \
        "web/app.dart missing switchTab guard preventing worker from accessing resident tabs!"
    assert "role == 'resident' && (targetViewId == 'view-dashboard'" in wad, \
        "web/app.dart missing switchTab guard preventing resident from accessing worker tabs!"
    assert "Worker application is forbidden from loading Resident Portal" in wad, \
        "web/app.dart missing showResidentPortal security guard!"
    assert "Resident application is forbidden from loading Worker Portal" in wad, \
        "web/app.dart missing showApp security guard!"
    print("  [OK] web/app.dart: Strict cross-role isolation, login blockers, and view guards active.")

    print("=" * 60)
    print("ALL VERIFICATION CHECKS PASSED (100%)")
    print("=" * 60)

if __name__ == '__main__':
    verify_all()
