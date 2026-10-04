"""Protected, bounded report evidence delivery; isolated DB and real Chrome only."""
import base64
import datetime
import io
import json
import os
import time
import uuid
from pathlib import Path

import pytest
from PIL import Image
from flask_jwt_extended import create_access_token

from backend.db_adapter import get_db
from backend.server import app
from backend import photos
from tests.test_browser import browser_page, expect
from tests.test_admin_repairs import login_admin

browser_test = pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS') != '1', reason='Opt-in browser test')


def photo_data():
    output = io.BytesIO()
    Image.new('RGB', (18, 12), 'blue').save(output, 'PNG')
    return 'data:image/png;base64,' + base64.b64encode(output.getvalue()).decode()


def create_report(system, photo=None):
    client, headers, _ = system
    response = client.post('/api/reports/add', headers=headers['HH-1'], json={
        'operation_id': uuid.uuid4().hex,
        'report_type': 'Leak', 'description': 'Protected evidence', 'photo_base64': photo})
    assert response.status_code == 200
    return response.json['report_id']


@pytest.mark.parametrize('viewer', ['admin', 'worker', 'other-worker', 'HH-1'])
def test_photo_existing_role_policy_and_exact_persistent_bytes(system, monkeypatch, viewer):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    report_id = create_report(system, photo_data())
    client, headers, _ = system
    with get_db() as db:
        db.execute('SELECT photo_base64 FROM resident_reports WHERE report_id = ?', (report_id,))
        stored = base64.b64decode(db.fetchone()['photo_base64'].split(',', 1)[1])
    response = client.get(f'/api/reports/{report_id}/photo', headers=headers[viewer])
    assert response.status_code == 200 and response.data == stored
    assert response.mimetype == 'image/jpeg'
    assert 'no-store' in response.headers['Cache-Control']
    assert response.headers['X-Content-Type-Options'] == 'nosniff'
    listed = client.get('/api/reports', headers=headers[viewer]).json['reports'][0]
    assert listed['has_photo'] is True and listed['photo_base64'] is None
    assert listed['photo_url'] == f'/api/reports/{report_id}/photo'
    assert 'data:image' not in json.dumps(listed) and 's3:' not in json.dumps(listed)


@pytest.mark.parametrize('credential,status', [('none', 401), ('invalid', 422), ('expired', 401), ('other_resident', 403), ('forged_role', 403), ('unknown_identity', 401)])
def test_photo_authorization_is_authoritative(system, monkeypatch, credential, status):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    report_id = create_report(system, photo_data())
    client, headers, _ = system
    auth = {} if credential == 'none' else {'Authorization': 'Bearer invalid-test-token'}
    if credential == 'other_resident':
        auth = headers['HH-2']
    elif credential in ('forged_role', 'unknown_identity', 'expired'):
        from flask_jwt_extended import decode_token
        with app.app_context():
            claims = decode_token(headers['HH-2']['Authorization'][7:])
            auth = {'Authorization': 'Bearer ' + create_access_token(
                identity='unknown' if credential == 'unknown_identity' else 'HH-2',
                additional_claims={'kind': claims['kind'], 'credential': claims['credential'], 'role': 'admin'},
                expires_delta=datetime.timedelta(seconds=-1) if credential == 'expired' else None)}
    response = client.get(f'/api/reports/{report_id}/photo', headers=auth)
    assert response.status_code == status
    assert response.mimetype == 'application/json' and not response.data.startswith(b'\xff\xd8')


@pytest.mark.parametrize('reference,status', [
    (None, 404), ('s3:reports/../../private.jpg', 404), ('https://unsafe.example/photo.jpg', 404),
    ('data:image/svg+xml;base64,PHN2Zz4=', 404), ('data:image/jpeg;base64,invalid!', 404),
    ('data:image/jpeg;base64,' + base64.b64encode(b'not an image').decode(), 404),
    ('data:image/jpeg;base64,' + base64.b64encode(bytes(photos.MAX_DELIVERY_BYTES + 1)).decode(), 413),
], ids=['missing', 'malformed_s3', 'external_url', 'svg', 'invalid_base64', 'invalid_image', 'oversized'])
def test_photo_invalid_persistent_references_are_bounded(system, monkeypatch, reference, status):
    client, headers, _ = system
    report_id = create_report(system)
    with get_db() as db:
        db.execute('UPDATE resident_reports SET photo_base64 = ? WHERE report_id = ?', (reference, report_id))
    monkeypatch.setattr(photos, '_s3', lambda: pytest.fail('Malformed references must not access storage'))
    assert client.get(f'/api/reports/{report_id}/photo', headers=headers['admin']).status_code == status
    assert len(client.get('/api/all-data?role=admin', headers=headers['admin']).data) < 5000
    assert client.get('/api/reports/999999/photo', headers=headers['admin']).status_code == 404


@pytest.mark.parametrize('failure,status', [('NoSuchKey', 404), ('AccessDenied', 503), ('oversized', 413)])
def test_private_s3_read_errors_and_bounded_stream(system, monkeypatch, failure, status):
    from botocore.exceptions import ClientError
    client, headers, _ = system
    report_id = create_report(system)
    reference = 's3:reports/' + 'a' * 32 + '.jpg'
    with get_db() as db:
        db.execute('UPDATE resident_reports SET photo_base64 = ? WHERE report_id = ?', (reference, report_id))
    monkeypatch.setenv('S3_BUCKET', 'isolated-test-only')
    stream = io.BytesIO(bytes(photos.MAX_DELIVERY_BYTES + 2))
    calls = []

    class Storage:
        def get_object(self, **kwargs):
            calls.append(kwargs)
            if failure != 'oversized':
                raise ClientError({'Error': {'Code': failure}}, 'GetObject')
            return {'Body': stream}

    monkeypatch.setattr(photos, '_s3', lambda: Storage())
    listed = client.get('/api/reports', headers=headers['admin']).json['reports'][0]
    assert listed['has_photo'] and listed['photo_url'] and calls == []
    assert client.get(listed['photo_url'], headers=headers['HH-2']).status_code == 403
    assert calls == []
    assert client.get(listed['photo_url'], headers=headers['admin']).status_code == status
    assert len(calls) == 1
    if failure == 'oversized':
        assert stream.closed


def test_photo_list_payload_and_upload_envelope_at_scale(system, monkeypatch):
    client, headers, _ = system
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    output = io.BytesIO()
    Image.effect_noise((1920, 1920), 100).convert('RGB').save(output, 'JPEG', quality=70)
    raw = output.getvalue()
    assert len(raw) <= photos.MAX_BYTES
    encoded = 'data:image/jpeg;base64,' + base64.b64encode(raw).decode()
    samples, uploads, delivered = [], [], []

    def sample(label):
        result = {'scenario': label, 'requests_for_list': 1}
        for path, name in [('/api/all-data?role=admin', 'all_data'), ('/api/reports', 'reports')]:
            start = time.perf_counter()
            response = client.get(path, headers=headers['admin'])
            result[name] = {'status': response.status_code, 'bytes': len(response.data),
                            'ms': round((time.perf_counter() - start) * 1000, 2)}
            assert response.status_code == 200 and len(response.data) < 100_000
            assert b'data:image' not in response.data
        samples.append(result)

    sample('0 photos')
    for number in range(1, 4):
        body = {'household_id': 'HH-1', 'report_type': 'Leak', 'description': 'Isolated image delivery evidence',
                'photo_base64': encoded, 'operation_id': 'baseline-photo-' + str(number)}
        serialized = json.dumps(body).encode()
        assert len(serialized) < app.config['MAX_CONTENT_LENGTH']
        start = time.perf_counter()
        created = client.post('/api/reports/add', headers=headers['HH-1'], data=serialized, content_type='application/json')
        assert created.status_code == 200
        uploads.append({'number': number, 'request_bytes': len(serialized), 'status': created.status_code,
                        'ms': round((time.perf_counter() - start) * 1000, 2)})
        start = time.perf_counter()
        photo = client.get(f"/api/reports/{created.json['report_id']}/photo", headers=headers['admin'])
        assert photo.status_code == 200 and len(photo.data) <= photos.MAX_DELIVERY_BYTES
        delivered.append({'report_id': created.json['report_id'], 'bytes': len(photo.data),
                          'ms': round((time.perf_counter() - start) * 1000, 2), 'requests': 1})
        with get_db() as db:
            db.execute('SELECT photo_base64 FROM resident_reports WHERE report_id = ?', (created.json['report_id'],))
            assert photo.data == base64.b64decode(db.fetchone()['photo_base64'].split(',', 1)[1])
        if number in (1, 3):
            sample(str(number) + ' photos')
    with get_db() as db:
        for index in range(100):
            db.execute("INSERT INTO resident_reports (household_id, report_type, description) VALUES ('HH-1', 'Leak', ?)",
                       ('Metadata-only isolated report ' + str(index),))
    sample('103 records, 3 photos')
    assert len(client.get('/api/all-data?role=admin', headers=headers['admin']).json['residentReports']) == 103
    assert len(client.get('/api/reports', headers=headers['admin']).json['reports']) == 50
    result = dict(input_image_bytes=len(raw), samples=samples, uploads=uploads, photos=delivered)
    if os.getenv('DELIVERY_PERF_OUTPUT'):
        Path(os.environ['DELIVERY_PERF_OUTPUT']).write_text(json.dumps(result, indent=2), encoding='utf-8')


@browser_test
@pytest.mark.parametrize('width,height', [(1920, 1080), (1366, 768), (768, 1024), (390, 844)])
def test_admin_lazy_photo_same_bytes_and_responsive_view(browser_page, monkeypatch, width, height):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    report_id = create_report(browser_page[2], photo_data())
    page = login_admin(browser_page)
    page.evaluate('''() => {
      const create = URL.createObjectURL.bind(URL);
      URL.createObjectURL = blob => {window.deliveredReportBlob = blob; return create(blob);};
    }''')
    page.set_viewport_size({'width': width, 'height': height})
    requests = []
    page.on('request', lambda req: requests.append(req) if req.url.endswith('/photo') else None)
    page.locator('[data-tab="tab-reports"]').click()
    button = page.locator('[data-view-report-photo]')
    expect(button).to_be_visible()
    assert requests == []
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    with page.expect_popup() as opened:
        button.click()
    popup = opened.value
    expect(popup.locator('img')).to_be_visible()
    popup.wait_for_function('() => document.querySelector("img").naturalWidth === 18')
    client, headers, _ = browser_page[2]
    actual = page.evaluate('async () => Array.from(new Uint8Array(await deliveredReportBlob.arrayBuffer()))')
    assert bytes(actual) == client.get(f'/api/reports/{report_id}/photo', headers=headers['admin']).data
    assert len(requests) == 1 and requests[0].headers.get('authorization', '').startswith('Bearer ')
    assert '?' not in requests[0].url and popup.evaluate('opener === null')
    assert popup.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.locator('#btn-logout').click()
    expect(page.locator('#login-screen')).to_be_visible()
    page.wait_for_function('() => typeof reportPhotoViews !== "undefined" && reportPhotoViews.size === 0')
    assert popup.is_closed()
    assert not browser_page[3]


@browser_test
@pytest.mark.parametrize('status', [403, 404, 413, 503, 'network'])
def test_admin_photo_error_is_actionable_and_retry_available(browser_page, monkeypatch, status):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    create_report(browser_page[2], photo_data())
    page = login_admin(browser_page)
    page.route('**/api/reports/*/photo', lambda route: route.abort() if status == 'network'
               else route.fulfill(status=status, json={'msg': 'Photo unavailable'}))
    page.locator('[data-tab="tab-reports"]').click()
    button = page.locator('[data-view-report-photo]')
    with page.expect_popup() as opened:
        button.click()
    expect(opened.value.locator('p')).not_to_contain_text('Loading')
    assert opened.value.locator('img').count() == 0
    expect(button).to_be_enabled()
    expect(page.locator('#login-screen')).to_be_hidden()
    assert not browser_page[3]


@browser_test
@pytest.mark.parametrize('status,message', [(401, 'Token has expired'), (422, 'Not enough segments')])
def test_admin_photo_invalid_session_closes_private_view(browser_page, monkeypatch, status, message):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    create_report(browser_page[2], photo_data())
    page = login_admin(browser_page)
    page.route('**/api/reports/*/photo', lambda route: route.fulfill(status=status, json={'msg': message}))
    page.locator('[data-tab="tab-reports"]').click()
    with page.expect_popup() as opened:
        page.locator('[data-view-report-photo]').click()
    expect(page.locator('#login-screen')).to_be_visible()
    assert opened.value.is_closed()
    assert page.evaluate('jwtToken') is None
    assert page.evaluate('reportPhotoViews.size') == 0
    assert not browser_page[3]


@browser_test
@pytest.mark.parametrize('stage', ['headers', 'body'])
@pytest.mark.parametrize('ending', ['logout', 'offline'])
def test_admin_late_photo_does_not_outlive_session(browser_page, monkeypatch, stage, ending):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    create_report(browser_page[2], photo_data())
    page = login_admin(browser_page)
    page.evaluate("""stage => {
      const original = fetch.bind(window);
      window.fetch = (url, options) => {
        if (!String(url).endsWith('/photo')) return original(url, options);
        const response = new Response(new Blob(['late private response'], {type:'image/jpeg'}));
        if (stage === 'body') {
          response.blob = () => new Promise(resolve => window.releasePhoto = () => resolve(new Blob(['late private response'], {type:'image/jpeg'})));
          return Promise.resolve(response);
        }
        return new Promise(resolve => window.releasePhoto = () => resolve(response));
      };
      window.photoURLs = [];
      window.photoFinished = false;
      const open = window.openReportPhoto;
      window.openReportPhoto = button => open(button).finally(() => window.photoFinished = true);
      const create = URL.createObjectURL.bind(URL);
      URL.createObjectURL = blob => {window.photoURLs.push(blob.size); return create(blob);};
    }""", stage)
    page.locator('[data-tab="tab-reports"]').click()
    with page.expect_popup() as opened:
        page.locator('[data-view-report-photo]').click()
    page.wait_for_function('() => typeof releasePhoto === "function"')
    if ending == 'logout':
        # Exercise the same cleanup without reloading away the held old callback.
        page.evaluate('clearAdminSession()')
    else:
        page.evaluate('showAdminOfflineOverlay()')
    page.evaluate('releasePhoto()')
    page.wait_for_function('() => photoFinished && reportPhotoViews.size === 0')
    assert opened.value.is_closed() and page.evaluate('photoURLs.length') == 0
    assert page.evaluate('jwtToken') is None
    assert not browser_page[3]
