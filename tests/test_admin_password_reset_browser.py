"""Admin management through real Chrome and disposable account data."""
import secrets
import os
from pathlib import Path

import pytest
from playwright.sync_api import expect
from backend.db_adapter import get_db
from tests.test_browser import browser_page, pytestmark


def admin(surface):
    page,origin,(_,_,password),_=surface
    page.goto(origin+'/admin/')
    page.locator('#login-username').fill('admin');page.locator('#login-password').fill(password)
    page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    page.locator('[data-tab="tab-directory"]').click()
    expect(page.locator('#reset-management')).to_be_visible()
    return page


def begin(page,role='worker',account='worker'):
    page.locator(f'[data-reset-role="{role}"][data-reset-password="{account}"]').click()
    expect(page.locator('#reset-confirm-modal')).to_be_visible()


def issue(page):
    page.locator('#reset-identity-verified').check()
    with page.expect_response(lambda response:response.url.endswith('/api/admin/password-resets')) as response:
        page.locator('#reset-confirm-submit').click()
    assert response.value.status==200
    expect(page.locator('#reset-success-modal')).to_be_visible()
    value=page.locator('#reset-temporary-password').input_value()
    assert value==response.value.json()['temporary_password'] and len(value)>=12
    return value


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_admin_dialog_to_released_mobile_password_lifecycle(browser_page,role,account):
    page,origin,(client,headers,old),errors=browser_page
    admin(browser_page);begin(page,role,account);temporary=issue(page)
    assert client.post('/api/login',json={'username':account,'password':old}).status_code==401
    assert client.get('/api/all-data',headers=headers[account]).status_code==401
    page.locator('#reset-password-done').click()
    page.goto(origin+'/index.html?role='+role)
    page.locator('#employee-id').fill(account);page.locator('#login-password').fill(temporary);page.locator('#btn-login').click()
    expect(page.locator('#web-modal-change-password')).to_be_visible()
    new=secrets.token_urlsafe(24)
    page.locator('#change-new-password').fill(new);page.locator('#change-confirm-password').fill(new)
    page.locator('#btn-change-password-save').click()
    expect(page.locator('#web-modal-change-password')).to_be_hidden()
    expect(page.locator('#login-error-msg')).to_contain_text('Password saved')
    assert client.post('/api/login',json={'username':account,'password':temporary}).status_code==401
    page.locator('#employee-id').fill(account);page.locator('#login-password').fill(new);page.locator('#btn-login').click()
    expect(page.locator('#view-dashboard' if role=='worker' else '#view-resident-home')).to_be_visible()
    assert errors==[]


@pytest.mark.parametrize('role,first,second',[('worker','worker','other-worker'),('resident','HH-1','HH-2')])
def test_admin_search_same_name_keeps_stable_account_identifier(browser_page,role,first,second):
    with get_db() as db:
        if role=='worker': db.execute("UPDATE users SET full_name='Same Person' WHERE role='Collector'")
        else:
            db.execute("UPDATE households SET family_head_name='Same Person'")
            db.execute("INSERT INTO water_meters (household_id,serial_number) VALUES (1,'SECOND-CODE')")
    page=admin(browser_page)
    page.locator('#issue-recovery-role').select_option(role)
    page.locator('#reset-account-search').fill('same PERSON')
    assert sorted(page.locator('#issue-recovery-account option').evaluate_all('(a)=>a.map(x=>x.value).filter(Boolean)'))==sorted([first,second])
    page.locator('#issue-recovery-account').select_option(second)
    expect(page.locator('#reset-selected-account')).to_contain_text(second)
    page.locator('#issue-recovery-submit').click()
    expect(page.locator('#reset-confirm-account')).to_contain_text(second)
    expect(page.locator('#reset-confirm-account')).to_contain_text('Same Person')
    page.locator('#reset-confirm-cancel').click()
    page.locator('#reset-account-search').fill(first)
    assert page.locator('#issue-recovery-account option').count()>=2
    if role=='resident':
        page.locator('#reset-account-search').fill('METER-1')
        assert page.locator('#issue-recovery-account option').evaluate_all('(a)=>a.map(x=>x.value).filter(Boolean)')==['HH-1']
        page.locator('#reset-account-search').fill('second-code')
        assert page.locator('#issue-recovery-account option').evaluate_all('(a)=>a.map(x=>x.value).filter(Boolean)')==['HH-1']


def test_admin_and_unapproved_residents_have_no_reset_action(browser_page):
    with get_db() as db: db.execute("UPDATE households SET account_status='pending' WHERE household_id=2")
    page=admin(browser_page)
    assert page.locator('[data-reset-password="admin"],[data-reset-password="HH-2"]').count()==0
    page.locator('#issue-recovery-role').select_option('worker')
    assert 'admin' not in page.locator('#issue-recovery-account').inner_text()
    page.locator('#issue-recovery-role').select_option('resident')
    page.locator('#issue-recovery-account').select_option('HH-2')
    expect(page.locator('#reset-selected-account')).to_contain_text('Pending')
    expect(page.locator('#issue-recovery-submit')).to_be_disabled()


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
def test_confirmation_cancel_acknowledgment_and_no_page_movement(browser_page,role,account):
    page=admin(browser_page);begin(page,role,account)
    expected_name='worker' if role=='worker' else 'Resident One'
    expect(page.locator('#reset-confirm-account')).to_contain_text(expected_name)
    expect(page.locator('#reset-confirm-account')).to_contain_text(account)
    expect(page.locator('#reset-confirm-account')).to_contain_text(role.title())
    scroll=page.locator('.main-content').evaluate('el=>el.scrollTop')
    expect(page.locator('#reset-confirm-submit')).to_be_disabled()
    page.locator('#reset-identity-verified').check();expect(page.locator('#reset-confirm-submit')).to_be_enabled()
    page.locator('#reset-confirm-cancel').click()
    expect(page.locator('#reset-confirm-modal')).to_be_hidden()
    assert page.locator('.main-content').evaluate('el=>el.scrollTop')==scroll
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM password_resets');assert db.fetchone()['n']==0


@pytest.mark.parametrize('method',['done','escape','backdrop','logout','timeout','pagehide','storage'])
def test_temporary_secret_cleared_on_every_exit(browser_page,method):
    page=browser_page[0]
    if method=='timeout': page.clock.install()
    admin(browser_page);begin(page);value=issue(page)
    assert page.locator('#reset-temporary-password').get_attribute('type')=='password'
    assert value not in page.evaluate('JSON.stringify(localStorage)+JSON.stringify(sessionStorage)+location.href')
    if method=='done':page.locator('#reset-password-done').click()
    elif method=='escape':page.keyboard.press('Escape')
    elif method=='backdrop':page.mouse.click(2,2)
    elif method=='logout':page.evaluate("document.getElementById('btn-logout').click()")
    elif method=='timeout':page.clock.fast_forward(120001)
    elif method=='pagehide':page.evaluate("dispatchEvent(new Event('pagehide'))")
    else:page.evaluate("dispatchEvent(new StorageEvent('storage',{key:'admin_jwt'}))")
    expect(page.locator('#reset-success-modal')).to_be_hidden()
    assert page.locator('#reset-temporary-password').input_value()==''
    assert not page.evaluate('document.body.classList.contains("password-reset-open")')
    if method=='pagehide':
        page.evaluate("dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))")
        begin(page);issue(page)
        page.evaluate('sessionGeneration += 1')
        expect(page.locator('#reset-success-modal')).to_be_hidden()
        assert page.locator('#reset-temporary-password').input_value()==''
    assert browser_page[3]==[]


def test_mask_show_hide_and_real_browser_copy(browser_page):
    page,origin,_,errors=browser_page
    page.context.grant_permissions(['clipboard-read','clipboard-write'],origin=origin)
    admin(browser_page);begin(page);value=issue(page)
    page.locator('#reset-password-toggle').click()
    assert page.locator('#reset-temporary-password').get_attribute('type')=='text'
    page.locator('#reset-password-toggle').click()
    assert page.locator('#reset-temporary-password').get_attribute('type')=='password'
    page.locator('#reset-password-copy').click()
    expect(page.locator('#reset-copy-status')).to_contain_text('copied')
    assert page.evaluate('navigator.clipboard.readText()')==value
    page.locator('#reset-password-done').click()
    assert page.locator('#reset-temporary-password').input_value()==''
    assert errors==[]


@pytest.mark.parametrize('failure',[400,403,404,409,429,500,'malformed','network'])
def test_reset_errors_never_leak_internals_or_show_false_success(browser_page,failure):
    page=admin(browser_page)
    def fail(route):
        if failure=='network':route.abort();return
        route.fulfill(status=200 if failure=='malformed' else failure,json={'msg':'private SQL stack trace not for display','status':'success'})
    page.route('**/api/admin/password-resets',fail)
    begin(page);page.locator('#reset-identity-verified').check();page.locator('#reset-confirm-submit').click()
    expect(page.locator('#reset-confirm-error')).to_be_visible()
    assert 'private SQL' not in page.locator('#reset-confirm-error').inner_text()
    expect(page.locator('#reset-success-modal')).to_be_hidden()
    assert page.locator('#reset-temporary-password').input_value()==''
    expect(page.locator('#reset-confirm-cancel')).to_be_enabled()
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM password_resets');assert db.fetchone()['n']==0


def test_expired_admin_session_clears_dialog(browser_page):
    page=admin(browser_page)
    page.route('**/api/admin/password-resets',lambda route:route.fulfill(status=401,json={'msg':'expired'}))
    begin(page);page.locator('#reset-identity-verified').check();page.locator('#reset-confirm-submit').click()
    expect(page.locator('#login-screen')).to_be_visible()
    expect(page.locator('#reset-confirm-modal')).to_be_hidden()
    assert page.locator('#reset-temporary-password').input_value()==''


@pytest.mark.parametrize('stage',['headers','body'])
def test_duplicate_submission_and_late_response_cannot_cross_sessions(browser_page,stage):
    page=admin(browser_page)
    value=secrets.token_urlsafe(18)
    page.evaluate('''args => {
      const original=fetch.bind(window); window.resetCalls=0;
      window.fetch=(url,options)=>{
        if (!String(url).endsWith('/api/admin/password-resets')) return original(url,options);
        resetCalls++;
        const body={status:'success',account_id:'worker',role:'worker',password_change_required:true,expires_in_hours:24,temporary_password:args.value};
        const response=new Response(JSON.stringify(body),{status:200,headers:{'Content-Type':'application/json'}});
        if(args.stage==='body'){
          response.json=()=>new Promise(resolve=>window.releaseReset=()=>resolve(body));
          return Promise.resolve(response);
        }
        return new Promise(resolve=>window.releaseReset=()=>resolve(response));
      };
    }''',{'stage':stage,'value':value})
    begin(page);page.locator('#reset-identity-verified').check()
    page.evaluate("document.getElementById('reset-confirm-submit').click();document.getElementById('reset-confirm-submit').click()")
    page.wait_for_function('typeof releaseReset === "function"')
    assert page.evaluate('resetCalls')==1
    expect(page.locator('#reset-confirm-cancel')).to_be_disabled()
    page.keyboard.press('Tab');page.keyboard.press('Escape')
    expect(page.locator('#reset-confirm-modal')).to_be_visible()
    # Manual logout reloads the document, destroying the held response by design.
    # Exercise the harder in-document expiry/re-login race instead.
    page.evaluate('clearAdminSession()')
    expect(page.locator('#reset-confirm-modal')).to_be_hidden()
    password=browser_page[2][2]
    page.locator('#login-username').fill('admin');page.locator('#login-password').fill(password);page.locator('#btn-login').click()
    expect(page.locator('#login-screen')).to_be_hidden()
    page.evaluate('releaseReset()')
    page.wait_for_timeout(100)
    expect(page.locator('#reset-success-modal')).to_be_hidden()
    assert page.locator('#reset-temporary-password').input_value()==''
    assert value not in page.evaluate('JSON.stringify(localStorage)')
    assert browser_page[3]==[]


def test_stalled_response_body_times_out_without_late_secret_display(browser_page):
    page=browser_page[0];page.clock.install();admin(browser_page)
    page.evaluate('''() => {
      const original=fetch.bind(window);
      window.fetch=(url,options)=>{
        if (!String(url).endsWith('/api/admin/password-resets')) return original(url,options);
        const response=new Response('{}',{status:200});
        response.json=()=>new Promise(resolve=>window.releaseReset=()=>resolve({}));
        return Promise.resolve(response);
      };
    }''')
    begin(page);page.locator('#reset-identity-verified').check();page.locator('#reset-confirm-submit').click()
    page.wait_for_function('typeof releaseReset === "function"')
    page.clock.fast_forward(30001)
    expect(page.locator('#reset-confirm-error')).to_be_visible()
    expect(page.locator('#reset-confirm-cancel')).to_be_enabled()
    page.evaluate('releaseReset()')
    expect(page.locator('#reset-success-modal')).to_be_hidden()
    assert page.locator('#reset-temporary-password').input_value()==''
    assert browser_page[3]==[]


@pytest.mark.parametrize('width,height',[(1920,1080),(1366,768),(900,700),(768,1024),(390,440),(320,480)])
def test_reset_dialog_responsive_and_keyboard_focus(browser_page,width,height):
    page=browser_page[0];page.set_viewport_size({'width':width,'height':height})
    admin(browser_page);begin(page)
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    modal=page.locator('#reset-confirm-modal .modal')
    bounds=modal.bounding_box()
    assert bounds['x']>=0 and bounds['x']+bounds['width']<=width
    assert bounds['y']>=0 and bounds['y']+bounds['height']<=height
    for id in ['reset-confirm-cancel','reset-confirm-submit']:
        button=page.locator('#'+id).bounding_box()
        assert button['y']>=0 and button['y']+button['height']<=height
    output=os.getenv('ADMIN_RESET_SCREENSHOTS')
    if output:
        Path(output).mkdir(parents=True,exist_ok=True)
        page.screenshot(path=str(Path(output)/f'confirm-{width}x{height}.png'))
    expect(page.locator('#reset-confirm-cancel')).to_be_focused()
    page.keyboard.press('Tab');expect(page.locator('#reset-identity-verified')).to_be_focused()
    page.locator('#reset-identity-verified').check()
    page.locator('#reset-confirm-submit').focus();page.keyboard.press('Tab')
    expect(page.locator('#reset-identity-verified')).to_be_focused()
    issue(page)
    for id in ['reset-password-toggle','reset-password-copy','reset-password-done']:
        button=page.locator('#'+id).bounding_box()
        assert button['y']>=0 and button['y']+button['height']<=height
    if output:
        page.screenshot(path=str(Path(output)/f'success-{width}x{height}.png'))
    page.locator('#reset-password-done').click()
    assert browser_page[3]==[]


def test_untrusted_name_is_text_and_focus_returns_after_directory_refresh(browser_page):
    value='<img src=x onerror="window.resetXss=true">'
    with get_db() as db: db.execute("UPDATE users SET full_name=? WHERE username='worker'",(value,))
    page=admin(browser_page);begin(page)
    expect(page.locator('#reset-confirm-account')).to_contain_text(value)
    assert page.locator('#reset-confirm-account img').count()==0
    assert page.evaluate('window.resetXss === undefined')
    page.evaluate('renderedDirectoryData=null;renderDirectory(globalData)')
    page.locator('#reset-confirm-cancel').click()
    expect(page.locator('[data-reset-password="worker"]')).to_be_focused()
    assert browser_page[3]==[]
