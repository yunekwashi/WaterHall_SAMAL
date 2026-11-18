"""User Directory pagination and search stay local to the authorized Admin response."""
import pytest
from playwright.sync_api import expect

from tests.test_browser import browser_page, pytestmark
from tests.test_admin_password_reset_browser import admin


def make_rows(prefix, count, name_key, extra):
    return [dict({
        name_key: f'{prefix} Person {number:02d}',
        **extra(number)
    }) for number in range(1, count + 1)]


@pytest.mark.parametrize('width', [390, 1280])
def test_user_directory_search_and_pagination_cover_entire_authorized_lists(browser_page, width):
    browser_page[0].set_viewport_size({'width': width, 'height': 900})
    page = admin(browser_page)
    residents = make_rows('Resident', 31, 'owner_name', lambda n: {
        'house_id': f'HH-{n:03d}', 'account_number': f'RES-{n:03d}',
        'meter_id': f'METER-{n:03d}', 'purok': f'Purok {(n % 8) + 1}'
    })
    workers = make_rows('Worker', 31, 'name', lambda n: {
        'worker_id': f'EMP-{n:03d}', 'username': f'worker-{n:03d}',
        'role': 'Collector', 'employee_id': f'EMP-{n:03d}'
    })
    registrations = make_rows('Applicant', 31, 'family_head_name', lambda n: {
        'house_id': f'REG-{n:03d}', 'contact_no': f'0917000{n:04d}',
        'purok_name': f'Purok {(n % 8) + 1}', 'account_status': 'pending',
        'account_number': f'APP-{n:03d}', 'resident_id': f'APP-{n:03d}'
    })
    page.evaluate("""([residents, workers, registrations]) => {
      renderedDirectoryData = null;
      renderDirectory({households: residents, workers, puroks: ['Purok 1']});
      directoryView.registrations.records = registrations;
      renderRegistrations();
    }""", [residents, workers, registrations])

    for section, tbody, search, page_size, previous, next_button, summary, target in [
        ('resident', '#resident-tbody', '#resident-directory-search', '#resident-directory-page-size', '#resident-directory-prev', '#resident-directory-next', '#resident-directory-summary', '031'),
        ('worker', '#worker-tbody', '#worker-directory-search', '#worker-directory-page-size', '#worker-directory-prev', '#worker-directory-next', '#worker-directory-summary', '031'),
        ('registration', '#registrations-tbody', '#registration-directory-search', '#registration-directory-page-size', '#registration-directory-prev', '#registration-directory-next', '#registration-directory-summary', '031'),
    ]:
        expect(page.locator(tbody + ' tr')).to_have_count(10)
        expect(page.locator(summary)).to_contain_text('31 matching records · Page 1 of 4')
        expect(page.locator(previous)).to_be_disabled()
        expect(page.locator(next_button)).to_be_enabled()
        page.locator(next_button).click()
        expect(page.locator(summary)).to_contain_text('Page 2 of 4')
        page.locator(page_size).select_option('25')
        expect(page.locator(tbody + ' tr')).to_have_count(25)
        expect(page.locator(summary)).to_contain_text('Page 1 of 2')
        page.locator(page_size).select_option('50')
        expect(page.locator(tbody + ' tr')).to_have_count(31)
        expect(page.locator(next_button)).to_be_disabled()
        page.locator(search).fill(target)
        expect(page.locator(tbody + ' tr')).to_have_count(1)
        expect(page.locator(summary)).to_contain_text('1 matching record · Page 1 of 1')
        page.locator(search).fill('  no-such-record  ')
        expect(page.locator(tbody)).to_contain_text('No matching records found.')
        page.locator(search).fill('   ')
        expect(page.locator(tbody + ' tr')).to_have_count(31)

    expect(page.locator('#resident-tbody [data-delete-household]')).to_have_count(31)
    expect(page.locator('#worker-tbody [data-delete-worker]')).to_have_count(31)
    expect(page.locator('#registrations-tbody [data-review-id]')).to_have_count(62)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert browser_page[3] == []
