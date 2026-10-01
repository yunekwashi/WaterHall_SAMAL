"""Phase 6 presentation, policy, and route integrity checks that complement existing suites."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = ROOT / 'web' / 'index.html'
LANDING_HTML = ROOT / 'web' / 'landing.html'
ADMIN_HTML = ROOT / 'admin_web' / 'index.html'
APP_DART = ROOT / 'web' / 'app.dart'


def test_worker_directory_is_meter_reading_not_field_payment():
    html = INDEX_HTML.read_text(encoding='utf-8')
    assert 'Select a household to record a manual meter reading.' in html
    assert 'Select a household to record a payment.' not in html
    assert 'Field Collection Disabled' in html
    assert 'WaterHall does not send SMS' in html
    assert 'data-toggle-password="reg-password"' in html


def test_resident_statement_shows_unpaid_and_payment_date():
    dart = APP_DART.read_text(encoding='utf-8')
    assert "unpaid.isNotEmpty" in dart
    assert "resident-payment-date" in dart
    assert 'No billing history is on file for this household yet.' in dart


def test_landing_does_not_advertise_admin_or_role_portals():
    html = LANDING_HTML.read_text(encoding='utf-8')
    lower = html.lower()
    for token in ('role=resident', 'role=worker', '/admin/', 'admin login'):
        assert token not in lower
    assert 'WHAT WATERHALL PROVIDES' in html
    assert 'JSN-SR04T' in html
    assert 'limited to water level, turbidity, and TDS' in html


def test_admin_recovery_does_not_claim_sms(system):
    html = ADMIN_HTML.read_text(encoding='utf-8')
    assert 'WaterHall does not send SMS' in html
    client = system[0]
    res = client.get('/admin/')
    assert res.status_code == 200
    assert 'admin-offline-overlay' in res.data.decode('utf-8')
