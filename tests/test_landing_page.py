"""Tests for the WaterHall public landing page presentation, privacy, and static assets."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
LANDING_HTML = ROOT / 'web' / 'landing.html'
LANDING_CSS = ROOT / 'web' / 'landing.css'
PUBLIC_DIR = ROOT / 'public'
TEAM_DIR = ROOT / 'web' / 'assets' / 'team'


def test_landing_page_does_not_expose_private_portal_routes():
    """Privacy requirement: Landing page must NOT link to resident, worker, or admin portals."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    forbidden_tokens = [
        'role=resident',
        'role=worker',
        '/admin',
        'Resident portal',
        'Field Worker sign in',
        'Resident access',
        'Worker access',
        'Admin login',
        'Register in the Resident portal',
    ]
    for token in forbidden_tokens:
        assert token.lower() not in html.lower(), f"Forbidden private route/portal token exposed: {token}"


def test_landing_page_official_title_and_hero():
    """Requirement: Hero section must use the exact official capstone title and text."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'Simple. Secure. Convenient.' in html
    assert 'WaterHall: IoT-Enable Water Asset and Detection System For Brgy Tagpopongan Babak District Island Garden City Of Samal' in html
    assert 'WaterHall makes water billing, meter records, and community water service information easier to manage and access.' in html
    assert 'Learn More' in html


def test_landing_page_services_section():
    """Requirement: Services section contains exact 4 items and descriptions."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'OUR SERVICES' in html
    assert 'Water Services Made Easier' in html
    assert 'View Water Bills' in html
    assert 'Easily manage and organize water billing information and records.' in html
    assert 'Monitor Meter Records' in html
    assert 'Keep track of water meter readings and usage records.' in html
    assert 'Report Water Concerns' in html
    assert 'Record and manage concerns related to water services.' in html
    assert 'Stay Informed' in html
    assert 'Keep track of important water service announcements and updates.' in html


def test_landing_page_about_section():
    """Requirement: About section contains exact title and description."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'ABOUT WATERHALL' in html
    assert 'A Better Way to Manage Water Services' in html
    assert 'WaterHall is a web and offline mobile-based water meter billing and administrative records system designed to help improve water service management and make records easier to organize and access.' in html


def test_landing_page_how_it_works_section():
    """Requirement: How It Works section contains exact 4 sequential steps."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'HOW IT WORKS' in html
    assert 'Simple and Organized' in html
    assert 'Meter Reading' in html
    assert 'Water meter information is recorded.' in html
    assert 'Billing Record' in html
    assert 'Meter information is used to maintain billing records.' in html
    assert 'Record Management' in html
    assert 'Water service records are organized and maintained.' in html
    assert 'Updates & Concerns' in html
    assert 'Water service concerns and community updates are managed through the system.' in html


def test_landing_page_iot_sensor_scope():
    """Requirement: Strict IoT sensor scope. No pH sensor or flow sensor."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'JSN-SR04T' in html
    assert 'NOTE1 Turbidity Sensor Module' in html
    assert 'TDS' in html

    for forbidden in ['pH sensor', 'flow sensor', 'ph meter']:
        assert forbidden.lower() not in html.lower(), f"Forbidden sensor mentioned: {forbidden}"


def test_landing_page_project_team():
    """Team names come from Assets/team filenames. Roles are omitted unless a project source defines them."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'PROJECT TEAM' in html
    assert 'Meet the WaterHall Team' in html
    assert 'Michael Jon C. Balaga' in html
    assert 'Ryiel S. Banggat' in html
    assert 'John Dave A. Chicote' in html
    assert 'Lead System Developer' not in html
    assert 'User Interface Developer' not in html
    assert '/assets/team/michael-jon-balaga.jpg' in html
    assert '/assets/team/ryiel-s-banggat.jpg' in html
    assert '/assets/team/john-dave-chicote.jpg' in html


def test_landing_page_contact_and_footer():
    """Requirement: Contact and footer sections with exact details."""
    html = LANDING_HTML.read_text(encoding='utf-8')
    assert 'For inquiries about the WaterHall project, please coordinate with the project team or the appropriate Barangay Tagpopongan office.' in html
    assert 'WaterHall Development Team' in html
    assert 'Jose Maria College Foundation Inc.' in html
    assert 'BS Information Technology' in html
    assert 'Public information page for the WaterHall capstone project.' in html


def test_team_asset_files_exist_and_are_valid():
    """Team images exist in Assets/team, are published under web/assets/team, and copy into public/."""
    import importlib.util
    spec = importlib.util.spec_from_file_location('build_static', ROOT / 'scripts' / 'build_static.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.build()
    originals = ROOT / 'Assets' / 'team'
    mapping = {
        'michael-jon-balaga.jpg': 'Michael Jon C. Balaga.jpg',
        'ryiel-s-banggat.jpg': 'Ryiel S. Banggat.jpg',
        'john-dave-chicote.jpg': 'John Dave A. Chicote.jpg',
    }
    for filename, original in mapping.items():
        src = TEAM_DIR / filename
        pub = PUBLIC_DIR / 'assets' / 'team' / filename
        raw = originals / original
        assert raw.is_file(), f"Original team photo missing: {raw}"
        assert src.is_file(), f"Source image missing: {src}"
        assert src.stat().st_size > 20000, f"Source image truncated: {src}"
        assert src.stat().st_size == raw.stat().st_size
        assert pub.is_file(), f"Public static image missing: {pub}"
        assert pub.stat().st_size > 20000, f"Public static image truncated: {pub}"


def test_server_serves_landing_page_and_preserves_private_routes(system):
    """Integration: Flask serves landing page publicly; direct private routes continue working."""
    client = system[0]

    # Landing page served at root
    res_root = client.get('/')
    assert res_root.status_code == 200
    root_html = res_root.data.decode('utf-8')
    assert 'WaterHall: IoT-Enable Water Asset' in root_html
    assert 'role=resident' not in root_html
    assert '/admin/' not in root_html

    # Static CSS
    res_css = client.get('/landing.css')
    assert res_css.status_code == 200
    assert len(res_css.data) > 1000

    # Team image served
    res_img = client.get('/assets/team/michael-jon-balaga.jpg')
    assert res_img.status_code == 200
    assert res_img.content_type.startswith('image/')

    assert 'WHAT WATERHALL PROVIDES' in root_html
    assert 'JSN-SR04T' in root_html

    # Direct private routes MUST still work
    res_admin = client.get('/admin/')
    assert res_admin.status_code == 200
    assert 'admin-offline-overlay' in res_admin.data.decode('utf-8')

    res_resident = client.get('/index.html?role=resident')
    assert res_resident.status_code == 200
    assert len(res_resident.data) > 1000

    res_worker = client.get('/index.html?role=worker')
    assert res_worker.status_code == 200
    assert len(res_worker.data) > 1000
