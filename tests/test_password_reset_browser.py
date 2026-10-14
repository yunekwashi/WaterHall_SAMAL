"""Real Chrome checks for OTP-free recovery and mandatory password changes."""
import secrets
import pytest
from playwright.sync_api import expect
from tests.test_browser import browser_page, pytestmark
from tests.test_mobile_workflow_browser import login
from tests.test_password_reset import issue
from backend.db_adapter import get_db
from backend.server import limiter


@pytest.mark.parametrize('role',['worker','resident'])
@pytest.mark.parametrize('width',[320,390])
def test_otp_free_instructions_cancel_responsive(browser_page,role,width):
    page,origin,_,errors=browser_page
    page.set_viewport_size({'width':width,'height':440})
    page.goto(origin+'/index.html?role='+role)
    page.locator('#btn-web-forgot-password').click()
    modal=page.locator('#web-modal-forgot-pw')
    expect(modal).to_be_visible()
    expect(page.locator('#web-recovery-role')).to_contain_text(role.title())
    expect(modal).to_contain_text('Contact your WaterHall administrator')
    assert modal.locator('input,select,form').count()==0
    assert page.locator('#web-recover-contact,#web-recover-new-password').count()==0
    rect=page.locator('#btn-web-recover-cancel').bounding_box()
    assert rect['x']>=0 and rect['x']+rect['width']<=width and rect['y']+rect['height']<=440
    page.locator('#btn-web-recover-cancel').click();expect(modal).to_be_hidden()
    page.locator('#btn-web-forgot-password').click();page.keyboard.press('Escape');expect(modal).to_be_hidden()
    assert errors==[]


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
@pytest.mark.parametrize('width',[320,390])
def test_temporary_login_requires_password_before_portal(browser_page,role,account,width):
    page,origin,(client,headers,old),errors=browser_page;limiter.reset()
    temporary=issue(client,headers,role,account).json['temporary_password']
    page.set_viewport_size({'width':width,'height':740})
    page.goto(origin+'/index.html?role='+role)
    page.locator('#employee-id').fill(account);page.locator('#login-password').fill(temporary);page.locator('#btn-login').click()
    modal=page.locator('#web-modal-change-password');expect(modal).to_be_visible()
    expect(page.locator('#change-password-title')).to_have_text('Create New Password')
    expect(page.locator('#change-current-field')).to_be_hidden()
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
    expect(page.locator('#app-bottom-nav')).to_be_hidden();expect(page.locator('#resident-bottom-nav')).to_be_hidden()
    page.set_viewport_size({'width':width,'height':440})
    rect=page.locator('#btn-change-password-save').bounding_box()
    assert rect['x']>=0 and rect['x']+rect['width']<=width and rect['y']+rect['height']<=440
    new=' '+secrets.token_urlsafe(24)+' '  # Preserve valid password whitespace through save and login.
    page.locator('#change-new-password').fill(new);page.locator('#change-confirm-password').fill(new+'mismatch')
    page.locator('#btn-change-password-save').click();expect(page.locator('#change-password-error')).to_contain_text('do not match')
    page.locator('#change-confirm-password').fill(new)
    page.locator('#change-show-password').check()
    assert page.locator('#change-new-password').get_attribute('type')=='text'
    page.locator('#change-show-password').uncheck()
    assert page.locator('#change-new-password').get_attribute('type')=='password'
    page.locator('#btn-change-password-save').click();expect(modal).to_be_hidden()
    expect(page.locator('#login-error-msg')).to_contain_text('Password saved')
    page.set_viewport_size({'width':width,'height':740})
    page.locator('#employee-id').fill(account);page.locator('#login-password').fill(new);page.locator('#btn-login').click()
    expect(page.locator('#view-dashboard' if role=='worker' else '#view-resident-home')).to_be_visible()
    assert errors==[]


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_required_password_cancel_never_grants_access(browser_page,role,account):
    page,origin,(client,headers,_),errors=browser_page
    temporary=issue(client,headers,role,account).json['temporary_password']
    page.goto(origin+'/index.html?role='+role)
    page.locator('#employee-id').fill(account);page.locator('#login-password').fill(temporary);page.locator('#btn-login').click()
    expect(page.locator('#web-modal-change-password')).to_be_visible()
    page.locator('#btn-change-password-cancel').click()
    expect(page.locator('#web-modal-change-password')).to_be_hidden()
    expect(page.locator('#view-login')).to_be_visible()
    assert page.evaluate("localStorage.getItem('waterhall_jwt')") is None
    assert errors==[]


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_profile_change_requires_current_password(browser_page,role,account):
    page,origin,(_,_,old),errors=browser_page
    login(page,origin,old,role)
    page.locator('[data-target="view-profile"]' if role=='worker' else '[data-target="view-resident-profile"]').first.click()
    page.locator('#btn-'+role+'-change-password').click()
    expect(page.locator('#change-current-field')).to_be_visible()
    new=secrets.token_urlsafe(24)
    page.locator('#change-current-password').fill('incorrect-password')
    page.locator('#change-new-password').fill(new);page.locator('#change-confirm-password').fill(new)
    page.locator('#btn-change-password-save').click();expect(page.locator('#change-password-error')).to_contain_text('Current password is incorrect')
    page.locator('#change-current-password').fill(old)
    page.locator('#btn-change-password-save').click();expect(page.locator('#web-modal-change-password')).to_be_hidden()
    expect(page.locator('#view-login')).to_be_visible()
    assert errors==[]


@pytest.mark.parametrize('role',['worker','resident'])
def test_password_change_network_failure_duplicate_lock(browser_page,role):
    page,origin,(_,_,old),errors=browser_page
    login(page,origin,old,role)
    page.locator('[data-target="view-profile"]' if role=='worker' else '[data-target="view-resident-profile"]').first.click()
    page.locator('#btn-'+role+'-change-password').click()
    new=secrets.token_urlsafe(24)
    page.locator('#change-current-password').fill(old);page.locator('#change-new-password').fill(new);page.locator('#change-confirm-password').fill(new)
    calls=[]
    def fail(route):calls.append(1);route.abort()
    page.route('**/api/password/change',fail)
    page.evaluate("document.getElementById('web-change-password-form').requestSubmit();document.getElementById('web-change-password-form').requestSubmit();")
    expect(page.locator('#change-password-error')).to_contain_text('Unable to reach')
    assert len(calls)==1
    page.locator('#btn-change-password-cancel').click();expect(page.locator('#web-modal-change-password')).to_be_hidden()
    assert errors==[]


def test_admin_reset_identity_confirmation_private_result(browser_page):
    page,origin,(_,_,old),errors=browser_page
    page.goto(origin+'/admin/');page.locator('#login-username').fill('admin');page.locator('#login-password').fill(old);page.locator('#btn-login').click()
    page.locator('[data-tab="tab-directory"]').click()
    page.locator('#issue-recovery-role').select_option('worker')
    page.locator('#issue-recovery-account').select_option('worker')
    expect(page.locator('#issue-recovery-account')).to_contain_text('worker — worker')
    page.locator('#issue-recovery-submit').click()
    expect(page.locator('#reset-confirm-submit')).to_be_disabled()
    page.locator('#reset-confirm-cancel').click()
    expect(page.locator('#reset-confirm-modal')).to_be_hidden()
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM password_resets');assert db.fetchone()['n']==0
    page.locator('#issue-recovery-submit').click();page.locator('#reset-identity-verified').check()
    page.locator('#reset-confirm-submit').click()
    expect(page.locator('#reset-success-modal')).to_be_visible()
    output=page.locator('#reset-temporary-password').input_value()
    assert len(output)>=12 and output not in page.evaluate('JSON.stringify(localStorage)')
    page.locator('#reset-password-done').click();expect(page.locator('#reset-success-modal')).to_be_hidden()
    assert page.locator('#reset-temporary-password').input_value()==''
    assert errors==[]
