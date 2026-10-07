"""Citizen report lightbox interactions against isolated Flask and real Chrome."""
import pytest
from playwright.sync_api import expect

from backend.db_adapter import get_db
from tests.test_browser import browser_page, pytestmark
from tests.test_admin_repairs import login_admin
from tests.test_report_image_delivery import create_report, photo_data


def reports_page(browser_page, monkeypatch):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    report_id = create_report(browser_page[2], photo_data())
    no_photo_id = create_report(browser_page[2])
    page = login_admin(browser_page)
    page.locator('[data-tab="tab-reports"]').click()
    return page, report_id, no_photo_id


@pytest.mark.parametrize('close_method', ['button', 'backdrop', 'escape'])
def test_report_modal_repeated_close_focus_and_cleanup(browser_page, monkeypatch, close_method):
    page, report_id, _ = reports_page(browser_page, monkeypatch)
    requests = []
    page.on('request', lambda req: requests.append(req) if req.url.endswith('/photo') else None)
    page.evaluate('''() => {
      window.imageURLs = []; window.revokedImageURLs = [];
      const create = URL.createObjectURL.bind(URL), revoke = URL.revokeObjectURL.bind(URL);
      URL.createObjectURL = blob => {const url = create(blob); imageURLs.push(url); return url;};
      URL.revokeObjectURL = url => {revokedImageURLs.push(url); revoke(url);};
    }''')
    button = page.locator(f'[data-view-report-photo="{report_id}"]')
    for _ in range(3):
        button.click()
        expect(page.locator('#report-photo-image')).to_be_visible()
        expect(page.locator('#report-photo-close')).to_be_focused()
        page.locator('#report-photo-image').click()
        expect(page.locator('#report-photo-modal')).to_be_visible()
        assert page.locator('.main-content').evaluate('el => getComputedStyle(el).overflowY') == 'hidden'
        if close_method == 'button':
            page.locator('#report-photo-close').click()
        elif close_method == 'backdrop':
            page.mouse.click(2, 2)
        else:
            page.keyboard.press('Escape')
        expect(page.locator('#report-photo-modal')).to_be_hidden()
        expect(button).to_be_focused()
        assert page.evaluate('reportPhotoView === null')
        assert not page.evaluate('document.body.classList.contains("report-photo-open")')
    assert len(requests) == 3 and len(page.context.pages) == 1
    assert page.locator('#report-photo-modal').count() == 1
    assert page.evaluate('JSON.stringify(imageURLs) === JSON.stringify(revokedImageURLs)')
    assert not browser_page[3]


@pytest.mark.parametrize('width,height', [(1366, 768), (390, 844)])
def test_report_modal_preserves_table_filters_and_scroll(browser_page, monkeypatch, width, height):
    monkeypatch.setenv('PHOTO_STORAGE', 'database')
    report_id = create_report(browser_page[2], photo_data())
    with get_db() as db:
        for i in range(25):
            db.execute("INSERT INTO resident_reports (household_id, report_type, description) VALUES ('HH-1', 'Leak', ?)",
                       ('Unchanged report ' + str(i),))
    # Isolate modal-triggered requests from the independent normal heartbeat.
    browser_page[0].add_init_script('''(() => {
      const interval = window.setInterval.bind(window);
      window.backgroundIntervals = [];
      window.setInterval = (...args) => {
        const id = interval(...args); backgroundIntervals.push(id); return id;
      };
    })();''')
    page = login_admin(browser_page)
    page.evaluate('() => backgroundIntervals.forEach(id => clearInterval(id))')
    page.wait_for_function('() => !isFetchingData && !isHeartbeatRunning')
    page.set_viewport_size({'width': width, 'height': height})
    page.locator('[data-tab="tab-reports"]').click()
    page.locator('#export-filter-rep-status').select_option('Pending')
    page.locator('#export-filter-rep-category').select_option('Leak')
    button = page.locator(f'[data-view-report-photo="{report_id}"]')
    button.scroll_into_view_if_needed()
    page.evaluate('''() => {
      window.originalReportsRow = document.querySelector('#reports-tbody tr');
      window.reportsScroll = [scrollX, scrollY, document.querySelector('.main-content').scrollTop];
      window.reportTableHTML = document.querySelector('#reports-tbody').innerHTML;
    }''')
    url = page.url
    requests = []
    page.on('request', lambda req: requests.append(req.url))
    button.click()
    expect(page.locator('#report-photo-image')).to_be_visible()
    page.mouse.wheel(0, 500)
    page.keyboard.press('Escape')
    expect(button).to_be_focused()
    assert page.evaluate('[scrollX, scrollY, document.querySelector(".main-content").scrollTop]') == page.evaluate('reportsScroll')
    assert page.evaluate('originalReportsRow === document.querySelector("#reports-tbody tr")')
    assert page.locator('#reports-tbody').inner_html() == page.evaluate('reportTableHTML')
    assert page.locator('#export-filter-rep-status').input_value() == 'Pending'
    assert page.locator('#export-filter-rep-category').input_value() == 'Leak'
    expect(page.locator('#tab-reports')).to_be_visible()
    assert page.url == url
    assert not any('/api/all-data' in url for url in requests)
    assert not browser_page[3]


def test_report_no_photo_and_resolve_exports_print_unchanged(browser_page, monkeypatch):
    page, report_id, no_photo_id = reports_page(browser_page, monkeypatch)
    no_photo_row = page.locator('#reports-tbody tr').filter(has_text=f'REP-{no_photo_id}')
    assert no_photo_row.locator('[data-view-report-photo]').count() == 0
    expect(page.locator('#report-photo-modal')).to_be_hidden()
    no_photo_row.locator('td').nth(3).click()
    expect(page.locator('#report-photo-modal')).to_be_hidden()
    page.locator(f'[data-view-report-photo="{report_id}"]').click()
    expect(page.locator('#report-photo-image')).to_be_visible()
    page.keyboard.press('Escape')
    page.locator(f'[data-resolve-report="{report_id}"]').click()
    row = page.locator('#reports-tbody tr').filter(has_text=f'REP-{report_id}')
    expect(row.locator('.badge').last).to_have_text('Resolved')
    assert row.locator('[data-resolve-report]').count() == 0
    page.locator('#export-filter-rep-status').select_option('Resolved')
    page.locator('#export-filter-rep-category').select_option('Leak')
    for format in ['csv', 'xlsx', 'pdf']:
        with page.expect_request('**/api/reports/export') as requested, page.expect_download() as downloaded:
            page.locator(f'#btn-export-rep-{format}').click()
        assert requested.value.post_data_json == {
            'report_type': 'incident_reports', 'format': format,
            'filters': {'report_status': 'Resolved', 'report_category': 'Leak'}}
        assert downloaded.value.failure() is None
    page.evaluate('() => { window.printCalls = 0; window.print = () => printCalls++; }')
    page.locator('#btn-print-rep').click()
    assert page.evaluate('printCalls') == 1
    page.emulate_media(media='print')
    assert page.locator('#report-photo-modal').evaluate('el => getComputedStyle(el).display') == 'none'
    page.emulate_media(media='screen')
    page.locator('#btn-logout').click()
    expect(page.locator('#login-screen')).to_be_visible()
    assert page.evaluate('jwtToken') is None
    assert not browser_page[3]


@pytest.mark.parametrize('failure', ['decode', 'mime', 'oversized'])
def test_report_bad_image_shows_clean_modal_error(browser_page, monkeypatch, failure):
    page, _, _ = reports_page(browser_page, monkeypatch)
    page.route('**/api/reports/*/photo', lambda route: route.fulfill(
        status=200, content_type='text/html' if failure == 'mime' else 'image/jpeg',
        body=b'invalid image' if failure != 'oversized' else bytes(3 * 1024 * 1024 + 1)))
    page.locator('[data-view-report-photo]').click()
    expect(page.locator('#report-photo-status')).to_have_text('Unable to load image.')
    expect(page.locator('#report-photo-image')).to_be_hidden()
    expect(page.locator('#report-photo-modal')).to_be_visible()
    assert len(page.context.pages) == 1
    assert not browser_page[3]


def test_report_modal_focus_returns_after_existing_refresh(browser_page, monkeypatch):
    page, report_id, _ = reports_page(browser_page, monkeypatch)
    button = page.locator(f'[data-view-report-photo="{report_id}"]')
    button.click()
    expect(page.locator('#report-photo-image')).to_be_visible()
    page.evaluate('fetchData(false)')
    page.wait_for_function('() => !isFetchingData')
    page.keyboard.press('Escape')
    expect(button).to_be_focused()
    expect(page.locator('#tab-reports')).to_be_visible()
    assert not browser_page[3]


@pytest.mark.parametrize('stage', ['headers', 'body'])
def test_report_closed_old_request_cannot_replace_reopened_image(browser_page, monkeypatch, stage):
    page, report_id, _ = reports_page(browser_page, monkeypatch)
    page.evaluate('''stage => {
      const original = fetch.bind(window); let held = false;
      window.fetch = (url, options) => {
        if (!String(url).endsWith('/photo') || held) return original(url, options);
        held = true;
        const response = new Response(new Blob(['old private image'], {type:'image/jpeg'}));
        if (stage === 'body') {
          response.blob = () => new Promise(resolve => window.releaseOldPhoto = () => resolve(new Blob(['old private image'], {type:'image/jpeg'})));
          return Promise.resolve(response);
        }
        return new Promise(resolve => window.releaseOldPhoto = () => resolve(response));
      };
      window.oldPhotoFinished = false;
      const open = window.openReportPhoto;
      window.openReportPhoto = button => {
        const old = !held;
        return open(button).finally(() => { if (old) oldPhotoFinished = true; });
      };
    }''', stage)
    button = page.locator(f'[data-view-report-photo="{report_id}"]')
    button.click()
    page.wait_for_function('() => typeof releaseOldPhoto === "function"')
    page.keyboard.press('Escape')
    expect(button).to_be_enabled()
    button.click()
    expect(page.locator('#report-photo-image')).to_be_visible()
    src = page.locator('#report-photo-image').get_attribute('src')
    page.evaluate('releaseOldPhoto()')
    page.wait_for_function('() => oldPhotoFinished')
    assert page.locator('#report-photo-image').get_attribute('src') == src
    expect(page.locator('#report-photo-image')).to_be_visible()
    page.keyboard.press('Escape')
    assert not browser_page[3]
