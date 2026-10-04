"""Resident photo regressions; isolated fixtures, no device or production claims."""
import base64
import io
import os
import uuid
import hashlib

import pytest
from PIL import Image
from tests.test_browser import browser_page, expect
from backend.db_adapter import get_db

browser_test = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in browser test')


def photo_bytes(fmt='PNG'):
    output = io.BytesIO()
    Image.new('RGB', (18, 12), 'blue').save(output, fmt)
    return output.getvalue()


def login_report(page, origin, password):
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(origin + '/index.html?role=resident')
    page.locator('#employee-id').fill('HH-1')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-resident-home').wait_for(state='visible')
    page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
    page.locator('#resident-log-desc').fill('Photo repair evidence')


def select_photo(page):
    page.locator('#resident-photo-input').set_input_files({
        'name': 'evidence.png', 'mimeType': 'image/png', 'buffer': photo_bytes()})
    expect(page.locator('#resident-photo-name')).to_have_text('evidence.png')


@browser_test
def test_resident_selected_photo_is_visible(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    expect(page.locator('#resident-photo-preview img')).to_be_visible()
    assert page.locator('#resident-photo-preview img').evaluate('(img) => img.naturalWidth') == 18
    assert errors == []


@browser_test
def test_resident_rejected_report_keeps_draft(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    page.route('**/api/reports/add', lambda route: route.fulfill(status=500, json={'status': 'error'}))
    with page.expect_response(lambda response: '/api/reports/add' in response.url):
        page.locator('#btn-resident-submit-log').click()
    expect(page.locator('#btn-resident-submit-log')).to_be_enabled()
    expect(page.locator('#resident-log-desc')).to_have_value('Photo repair evidence')
    expect(page.locator('#resident-photo-preview img')).to_be_visible()
    assert errors == []


def test_resident_backend_preserves_photo_orientation(system, monkeypatch):
    client, headers, _ = system
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    raw = io.BytesIO()
    image = Image.new('RGB', (18, 12), 'blue')
    exif = image.getexif()
    exif[274] = 6
    image.save(raw, 'JPEG', exif=exif)
    result = client.post('/api/reports/add', headers=headers['HH-1'], json={
        'operation_id': uuid.uuid4().hex, 'report_type': 'Water Leak',
        'description': 'Rotated phone evidence',
        'photo_base64': 'data:image/jpeg;base64,' + base64.b64encode(raw.getvalue()).decode()})
    assert result.status_code == 200
    reports = client.get('/api/reports', headers=headers['HH-1']).json['reports']
    stored = client.get(reports[0]['photo_url'], headers=headers['HH-1']).data
    with Image.open(io.BytesIO(stored)) as saved:
        assert saved.size == (12, 18)
        assert len(saved.getexif()) == 0


@browser_test
@pytest.mark.parametrize('source', ['camera', 'gallery'])
@pytest.mark.parametrize('outcome', ['success', 'cancel', 'permission_error'])
def test_resident_native_picker_bridge(browser_page, source, outcome):
    page, origin, (client, headers, password), errors = browser_page
    page.add_init_script('window.photoRequests = []; window.NativePhotoPicker = {postMessage: msg => window.photoRequests.push(JSON.parse(msg))};')
    login_report(page, origin, password)
    select_photo(page)
    original = page.locator('#resident-photo-preview img').get_attribute('src')
    page.locator('#btn-resident-photo-replace-' + source).click()
    request = page.evaluate('window.photoRequests.at(-1)')
    assert request['source'] == source
    assert request['request_id']
    result = 'data:image/png;base64,' + base64.b64encode(photo_bytes()).decode() if outcome == 'success' else None
    error = 'Camera access was denied. Review Android Settings.' if outcome == 'permission_error' else None
    page.evaluate('(args) => window.waterhallPhotoPickerResult(...args)', [request['request_id'], result, 'native.png', error])
    if outcome != 'success':
        assert page.locator('#resident-photo-preview img').get_attribute('src') == original
        expect(page.locator('#resident-log-desc')).to_have_value('Photo repair evidence')
        # A canceled/failed picker must release its request lock.
        page.locator('#btn-resident-photo-replace-' + source).click()
        assert page.evaluate('window.photoRequests.length') == 2
    else:
        expect(page.locator('#resident-photo-name')).to_have_text('native.png')
        expect(page.locator('#resident-photo-preview img')).to_be_visible()
        with page.expect_response(lambda response: '/api/reports/add' in response.url):
            page.locator('#btn-resident-submit-log').click()
        expect(page.locator('#resident-log-desc')).to_have_value('')
        report = client.get('/api/reports', headers=headers['HH-1']).json['reports'][0]
        assert report['description'] == 'Photo repair evidence'
        assert report['status'] == 'Pending'
        assert report['photo_base64'] is None and report['has_photo']
        image = client.get(report['photo_url'], headers=headers['HH-1']).data
        # The Admin requests the same persistent photo only when opened.
        admin = page.context.browser.new_page()
        admin.on('pageerror', lambda err: errors.append(str(err)))
        photo_requests = []
        admin.on('request', lambda req: photo_requests.append(req) if '/photo' in req.url else None)
        admin.add_init_script('''const createPhotoURL = URL.createObjectURL.bind(URL);
          URL.createObjectURL = blob => {window.deliveredReportBlob = blob; return createPhotoURL(blob);};''')
        admin.goto(origin + '/admin/')
        admin.locator('#login-username').fill('admin')
        admin.locator('#login-password').fill(password)
        admin.locator('#btn-login').click()
        expect(admin.locator('#login-screen')).to_be_hidden(timeout=15000)
        admin.locator('[data-tab="tab-reports"]').click()
        evidence = admin.locator('#reports-tbody [data-view-report-photo]')
        expect(evidence).to_be_visible()
        assert photo_requests == []
        with admin.expect_popup() as opened:
            evidence.click()
        expect(opened.value.locator('img')).to_be_visible()
        opened.value.wait_for_function('() => document.querySelector("img").naturalWidth === 18')
        delivered = admin.evaluate('async () => Array.from(new Uint8Array(await deliveredReportBlob.arrayBuffer()))')
        assert bytes(delivered) == image
        assert len(photo_requests) == 1
    assert errors == []


@browser_test
@pytest.mark.parametrize('status', [400, 403, 413, 503, 'network'])
def test_resident_report_failures_preserve_photo(browser_page, status):
    page, origin, (_, _, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    page.route('**/api/reports/add', lambda route: route.abort() if status == 'network'
               else route.fulfill(status=status, json={'status': 'error'}))
    page.locator('#btn-resident-submit-log').click()
    expect(page.locator('#btn-resident-submit-log')).to_be_enabled(timeout=20000)
    expect(page.locator('#resident-log-desc')).to_have_value('Photo repair evidence')
    expect(page.locator('#resident-photo-preview img')).to_be_visible()
    assert page.evaluate("JSON.parse(localStorage.getItem('waterhall_unsynced_actions') || '[]').length") == 0
    assert errors == []


@browser_test
def test_resident_retry_after_lost_ack_and_reload_is_idempotent(browser_page):
    page, origin, (client, headers, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    sent = []

    def committed_but_lost_response(route):
        payload = route.request.post_data_json
        sent.append(payload['operation_id'])
        assert client.post('/api/reports/add', json=payload, headers=headers['HH-1']).status_code == 200
        route.fulfill(status=503, json={'status': 'error'})

    page.route('**/api/reports/add', committed_but_lost_response)
    page.evaluate("() => { const button = document.getElementById('btn-resident-submit-log'); button.click(); button.click(); }")
    expect(page.locator('#btn-resident-submit-log')).to_be_enabled(timeout=20000)
    assert len(sent) == 1
    page.unroute('**/api/reports/add')
    page.reload()
    page.locator('#view-resident-home').wait_for(state='visible')
    page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
    expect(page.locator('#resident-log-desc')).to_have_value('Photo repair evidence')
    expect(page.locator('#resident-photo-preview img')).to_be_visible()
    with page.expect_request(lambda request: '/api/reports/add' in request.url) as retried:
        page.locator('#btn-resident-submit-log').click()
    assert retried.value.post_data_json['operation_id'] == sent[0]
    expect(page.locator('#resident-log-desc')).to_have_value('')
    assert len(client.get('/api/reports', headers=headers['admin']).json['reports']) == 1
    assert page.evaluate("localStorage.getItem('waterhall_resident_report_draft')") is None
    assert errors == []


@browser_test
@pytest.mark.parametrize('kind', ['unsupported', 'corrupt', 'oversized'])
def test_resident_invalid_replacement_preserves_existing_photo(browser_page, kind):
    page, origin, (_, _, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    prior = page.locator('#resident-photo-preview img').get_attribute('src')
    raw = b'<svg/>' if kind == 'unsupported' else b'not an image' if kind == 'corrupt' else bytes(2 * 1024 * 1024 + 1)
    page.locator('#resident-gallery-input').set_input_files({
        'name': 'bad.svg' if kind == 'unsupported' else 'bad.png',
        'mimeType': 'image/svg+xml' if kind == 'unsupported' else 'image/png', 'buffer': raw})
    expect(page.locator('#toast-text')).to_contain_text('2 MiB' if kind == 'oversized' else 'JPEG')
    expect(page.locator('#resident-photo-name')).to_have_text('evidence.png')
    assert page.locator('#resident-photo-preview img').get_attribute('src') == prior
    expect(page.locator('#resident-log-desc')).to_have_value('Photo repair evidence')
    assert errors == []


@browser_test
def test_resident_lost_picker_recovery_uses_current_draft(browser_page):
    page, origin, (_, _, password), errors = browser_page
    page.add_init_script('window.photoRequests = []; window.NativePhotoPicker = {postMessage: msg => window.photoRequests.push(JSON.parse(msg))};')
    login_report(page, origin, password)
    page.locator('#btn-resident-camera-trigger').click()
    page.reload()
    page.locator('#view-resident-home').wait_for(state='visible')
    page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
    expect(page.locator('#resident-log-desc')).to_have_value('Photo repair evidence')
    request = page.evaluate('window.photoRequests.at(-1)')
    assert request['source'] == 'recover'
    photo = 'data:image/png;base64,' + base64.b64encode(photo_bytes()).decode()
    page.evaluate('(args) => window.waterhallPhotoPickerResult(...args)', [request['request_id'], photo, 'recovered.png', None])
    expect(page.locator('#resident-photo-name')).to_have_text('recovered.png')
    expect(page.locator('#resident-photo-preview img')).to_be_visible()
    assert errors == []


@browser_test
def test_resident_logout_discards_late_picker_callback(browser_page):
    page, origin, (_, _, password), errors = browser_page
    page.add_init_script('window.photoRequests = []; window.NativePhotoPicker = {postMessage: msg => window.photoRequests.push(JSON.parse(msg))};')
    login_report(page, origin, password)
    page.locator('#btn-resident-camera-trigger').click()
    request = page.evaluate('window.photoRequests.at(-1)')
    page.locator('#btn-resident-logout').click()
    expect(page.locator('#view-login')).to_be_visible()
    page.evaluate('(args) => window.waterhallPhotoPickerResult(...args)', [request['request_id'],
                  'data:image/png;base64,' + base64.b64encode(photo_bytes()).decode(), 'late.png', None])
    assert page.evaluate("localStorage.getItem('waterhall_resident_report_draft')") is None
    assert page.locator('#resident-photo-preview img').count() == 0
    page.locator('#employee-id').fill('HH-2')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-resident-home').wait_for(state='visible')
    page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
    expect(page.locator('#resident-log-desc')).to_have_value('')
    expect(page.locator('#resident-photo-pickers')).to_be_visible()
    assert errors == []


@browser_test
def test_resident_expired_session_clears_private_photo(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    page.route('**/api/reports/add', lambda route: route.fulfill(status=401, json={'msg': 'Token has expired'}))
    page.locator('#btn-resident-submit-log').click()
    expect(page.locator('#view-login')).to_be_visible()
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
    assert page.evaluate("localStorage.getItem('waterhall_resident_report_draft')") is None
    assert page.locator('#resident-photo-preview img').count() == 0
    assert errors == []


@browser_test
def test_resident_remove_photo_and_submit_without_photo(browser_page):
    page, origin, (client, headers, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    page.locator('#btn-resident-photo-remove').click()
    expect(page.locator('#resident-photo-preview-card')).to_be_hidden()
    expect(page.locator('#resident-photo-pickers')).to_be_visible()
    page.locator('#btn-resident-submit-log').click()
    expect(page.locator('#resident-log-desc')).to_have_value('')
    assert client.get('/api/reports', headers=headers['HH-1']).json['reports'][0]['photo_base64'] is None
    assert errors == []


@browser_test
def test_resident_late_submission_does_not_clear_new_session_draft(browser_page):
    page, origin, (_, _, password), errors = browser_page
    login_report(page, origin, password)
    select_photo(page)
    pending = []
    page.route('**/api/reports/add', lambda route: pending.append(route))
    page.locator('#btn-resident-submit-log').click()
    expect(page.locator('#btn-resident-submit-log')).to_be_disabled()
    page.locator('#btn-resident-logout').click()
    expect(page.locator('#view-login')).to_be_visible()
    page.locator('#employee-id').fill('HH-2')
    page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    page.locator('#view-resident-home').wait_for(state='visible')
    page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
    page.locator('#resident-log-desc').fill('New account draft')
    assert len(pending) == 1
    pending[0].fulfill(status=200, json={'status': 'success', 'report_id': 777})
    expect(page.locator('#btn-resident-submit-log')).to_be_enabled()
    expect(page.locator('#resident-log-desc')).to_have_value('New account draft')
    assert errors == []


@browser_test
def test_resident_receives_existing_worker_and_admin_announcements(browser_page):
    page, origin, (client, headers, password), errors = browser_page
    login_report(page, origin, password)
    for author in ['worker', 'admin']:
        message = author + ' maintenance notice'
        response = client.post('/api/announcements/add', headers=headers[author], json={
            'operation_id': uuid.uuid4().hex, 'message': message, 'target_audience': 'Residents only'})
        assert response.status_code == 200
        page.reload()
        page.locator('#view-resident-home').wait_for(state='visible')
        expect(page.locator('#resident-announcement-message')).to_contain_text(message)
        page.locator('#resident-bottom-nav [data-target="view-resident-ledger"]').click()
        expect(page.locator('#view-resident-ledger')).to_be_visible()
        page.locator('#resident-bottom-nav [data-target="view-resident-support"]').click()
        expect(page.locator('#view-resident-support')).to_be_visible()
    assert errors == []


def report_payload(photo=None):
    return {'operation_id': uuid.uuid4().hex, 'report_type': 'Water Leak',
            'description': 'Durable photo evidence', 'photo_base64': photo}


@pytest.mark.parametrize('fmt', ['JPEG', 'PNG', 'WEBP'])
def test_resident_valid_photo_persistence_and_ownership(system, monkeypatch, fmt):
    client, headers, _ = system
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    photo = 'data:image/' + fmt.lower() + ';base64,' + base64.b64encode(photo_bytes(fmt)).decode()
    body = report_payload(photo)
    created = client.post('/api/reports/add', headers=headers['HH-1'], json=body)
    assert created.status_code == 200
    assert client.post('/api/reports/add', headers=headers['HH-1'], json=body).json == created.json
    # New connection/client, same durable database record and image.
    from backend.server import app
    reports = app.test_client().get('/api/reports', headers=headers['HH-1']).json['reports']
    assert len(reports) == 1
    record = reports[0]
    assert record['report_id'] == created.json['report_id']
    assert record['household_id'] == 'HH-1'
    assert record['report_type'] == body['report_type']
    assert record['description'] == body['description']
    assert record['status'] == 'Pending'
    assert record['photo_base64'] is None and record['has_photo']
    response = client.get(record['photo_url'], headers=headers['HH-1'])
    assert response.status_code == 200
    with Image.open(io.BytesIO(response.data)) as image:
        assert image.format == 'JPEG'
        assert image.size == (18, 12)
        assert image.getpixel((3, 3))[2] > 240
    assert client.get('/api/reports', headers=headers['HH-2']).json['reports'] == []
    assert client.get('/api/all-data?role=admin', headers=headers['admin']).json['residentReports'][0] == record
    assert client.get(record['photo_url'], headers=headers['admin']).data == response.data
    assert client.get(record['photo_url'], headers=headers['HH-2']).status_code == 403
    assert client.get('/api/reports').status_code == 401
    assert client.post('/api/reports/add', json=report_payload(photo)).status_code == 401
    forged = {**report_payload(photo), 'household_id': 'HH-2'}
    assert client.post('/api/reports/add', headers=headers['HH-1'], json=forged).status_code == 403


@pytest.mark.parametrize('bad,status', [
    ('data:image/svg+xml;base64,PHN2Zz4=', 400),
    ('data:image/png;base64,not-valid!', 400),
    ('data:image/png;base64,' + base64.b64encode(b'not an image').decode(), 400),
    ('data:image/png;base64,' + base64.b64encode(bytes(2 * 1024 * 1024 + 1)).decode(), 413),
], ids=['svg', 'bad_base64', 'bad_bytes', 'oversized'])
def test_resident_invalid_photo_creates_no_report(system, bad, status):
    client, headers, _ = system
    assert client.post('/api/reports/add', json=report_payload(bad), headers=headers['HH-1']).status_code == status
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS count FROM resident_reports')
        assert db.fetchone()['count'] == 0
        db.execute('SELECT COUNT(*) AS count FROM sync_operations')
        assert db.fetchone()['count'] == 0


def test_resident_s3_failure_creates_no_report_or_reference(system, monkeypatch):
    from backend import photos
    from flask import abort
    client, headers, _ = system
    monkeypatch.setenv('PHOTO_STORAGE', 's3')
    monkeypatch.setenv('S3_BUCKET', 'isolated-test-only')

    class UnavailableStorage:
        def put_object(self, **kwargs):
            abort(503, description='Storage temporarily unavailable')

    monkeypatch.setattr(photos, '_s3', lambda: UnavailableStorage())
    photo = 'data:image/png;base64,' + base64.b64encode(photo_bytes()).decode()
    assert client.post('/api/reports/add', json=report_payload(photo), headers=headers['HH-1']).status_code == 503
    assert client.get('/api/reports', headers=headers['admin']).json['reports'] == []


def test_resident_s3_reference_is_retrievable_and_idempotent(system, monkeypatch):
    from backend import photos
    client, headers, _ = system
    monkeypatch.setenv('PHOTO_STORAGE', 's3')
    monkeypatch.setenv('S3_BUCKET', 'isolated-test-only')
    objects = {}

    class PrivateStorage:
        def put_object(self, **kwargs):
            assert kwargs['ServerSideEncryption'] == 'AES256'
            assert kwargs['ContentType'] == 'image/jpeg'
            objects[kwargs['Key']] = kwargs['Body']

        def generate_presigned_url(self, method, Params, ExpiresIn):
            assert method == 'get_object' and ExpiresIn == 300
            assert Params['Key'] in objects
            return 'https://storage.example.test/' + Params['Key'] + '?signed=test'

        def get_object(self, Bucket, Key):
            return {'Body': io.BytesIO(objects[Key])}

    monkeypatch.setattr(photos, '_s3', lambda: PrivateStorage())
    body = report_payload('data:image/png;base64,' + base64.b64encode(photo_bytes()).decode())
    first = client.post('/api/reports/add', json=body, headers=headers['HH-1'])
    assert first.status_code == 200
    assert client.post('/api/reports/add', json=body, headers=headers['HH-1']).json == first.json
    assert len(objects) == 1
    with get_db() as db:
        db.execute('SELECT photo_base64 FROM resident_reports')
        reference = db.fetchone()['photo_base64']
    assert reference.startswith('s3:reports/')
    stored = objects[reference[3:]]
    with Image.open(io.BytesIO(stored)) as image:
        assert image.size == (18, 12)
    listed = client.get('/api/reports', headers=headers['HH-1']).json['reports'][0]
    assert listed['photo_base64'] is None and listed['has_photo']
    assert client.get(listed['photo_url'], headers=headers['admin']).data == stored


def test_resident_photo_survives_backend_process_restart(system, monkeypatch):
    import subprocess
    import sys
    import json
    from backend import db_adapter
    client, headers, _ = system
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    body = report_payload('data:image/png;base64,' + base64.b64encode(photo_bytes()).decode())
    assert client.post('/api/reports/add', json=body, headers=headers['HH-1']).status_code == 200
    original = client.get('/api/reports', headers=headers['HH-1']).json['reports'][0]
    original_image = client.get(original['photo_url'], headers=headers['HH-1']).data
    environment = os.environ.copy()
    environment.update(DATABASE_PATH=db_adapter.DB_FILE, DATABASE_URL='', POSTGRES_URL='', APP_ENV='development')
    environment.pop('VERCEL', None)
    code = '''import json,sys,hashlib
from backend.server import app
headers=json.loads(sys.stdin.read())
response=app.test_client().get('/api/reports',headers=headers)
record=response.json['reports'][0]
photo=app.test_client().get(record['photo_url'],headers=headers)
print(json.dumps({'status':response.status_code,'id':record['report_id'],
 'photo_status':photo.status_code,'hash':hashlib.sha256(photo.data).hexdigest()}))'''
    result = subprocess.run([sys.executable, '-c', code], input=json.dumps(headers['HH-1']),
                            text=True, capture_output=True, env=environment, check=True, timeout=60)
    loaded = json.loads(result.stdout)
    assert loaded['status'] == 200
    assert loaded['id'] == original['report_id']
    assert loaded['photo_status'] == 200
    assert loaded['hash'] == hashlib.sha256(original_image).hexdigest()
