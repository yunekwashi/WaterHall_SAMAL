import os
import secrets
import pytest
from playwright.sync_api import expect
from test_browser import browser_page
from test_mobile_release import login
from test_mobile_workflow import seed_bills
from backend.db_adapter import get_db

pytestmark=pytest.mark.skipif(os.getenv('RUN_BROWSER_TESTS')!='1',reason='Opt-in Chrome tests')


def test_worker_search_modes_all_substrings_and_selected_target(browser_page):
    page,origin,(_,_,password),errors=browser_page
    with get_db() as db:
        db.execute("UPDATE households SET family_head_name='Rey Ann Santos' WHERE household_id=1")
        db.execute("UPDATE households SET family_head_name='Maria Cruz' WHERE household_id=2")
        for n in [10,11,21,31]:
            db.execute("INSERT INTO households (household_id,purok_id,family_head_name,registration_date,password_hash) VALUES (?,1,?,'2026-01-01',(SELECT password_hash FROM households WHERE household_id=1))",(n,f'Carla Reyes {n}'))
    page.set_viewport_size({'width':360,'height':740})
    login(page,origin,password,'worker')
    page.locator('[data-target="view-billing"]').click()
    search=page.locator('#bill-meter-search')
    assert page.locator('.bill-search-field input').count()==1
    assert page.locator('.bill-search-field').evaluate("e=>getComputedStyle(e).borderTopWidth")=='0px'
    for q,n in [('R',6),('rey',5),('AN',1)]:
        search.fill(q)
        expect(page.locator('#bill-meter-results button')).to_have_count(n)
    page.locator('#bill-meter-results button').click()
    expect(page.locator('#bill-selected-details')).to_contain_text('HH-1')
    page.locator('#bill-search-id').click()
    expect(search).to_have_value('')
    expect(page.locator('#bill-selected-details')).to_contain_text('HH-1')
    for q,n in [('1',5),('HH-1',3),('21',1)]:
        search.fill(q); expect(page.locator('#bill-meter-results button')).to_have_count(n)
    search.fill('missing'); expect(page.locator('#bill-meter-results')).to_have_text('No households found')
    search.fill('HH-1'); page.locator('#bill-meter-results button').first.click()
    expect(page.locator('#bill-meter-results')).to_be_hidden()
    assert errors==[]


def test_worker_history_offline_sync_restart_no_duplicate_account_isolation(browser_page):
    page,origin,(_,_,password),errors=browser_page
    page.set_viewport_size({'width':360,'height':740})
    login(page,origin,password,'worker')
    page.context.set_offline(True)
    page.locator('[data-target="view-billing"]').click()
    page.locator('#bill-curr-input').fill('20')
    page.locator('#btn-save-bill').click()
    page.locator('[data-target="view-transactions"]').click()
    assert page.locator('#view-transactions').evaluate("e=>!!e.closest('.view-container')")
    expect(page.locator('#transaction-list')).to_contain_text('Pending Sync')
    expect(page.locator('#transaction-list')).to_contain_text('Resident One')
    expect(page.locator('#db-offline-overlay')).to_be_hidden()
    expect(page.locator('#worker-sync-status-text')).to_have_text('Offline Mode')
    page.context.set_offline(False)
    page.wait_for_function("()=>JSON.parse(localStorage.getItem('waterhall_unsynced_actions')||'[]').length===0")
    expect(page.locator('#transaction-list')).to_contain_text('Synced')
    expect(page.locator('#transaction-list')).to_contain_text('Unpaid')
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(1)
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert page.locator('#transaction-list').evaluate('e=>[...e.querySelectorAll("*")].every(x=>x.getBoundingClientRect().right<=innerWidth+1)')
    page.reload(); page.locator('[data-target="view-transactions"]').click()
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(1)
    page.locator('#transaction-filter').select_option('Pending Sync')
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(0)
    page.locator('#transaction-filter').select_option('Synced')
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(1)
    page.locator('[data-target="view-profile"]').click()
    page.locator('#btn-logout').click()
    page.locator('#employee-id').fill('other-worker');page.locator('#login-password').fill(password);page.locator('#btn-login').click()
    page.locator('#view-dashboard').wait_for(state='visible')
    page.locator('[data-target="view-transactions"]').click()
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(0)
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM billing_records'); assert db.fetchone()['n']==2
    assert errors==[]


def test_worker_history_older_failed_and_name_filter(browser_page):
    page,origin,(_,_,password),errors=browser_page
    seed_bills()
    login(page,origin,password,'worker')
    page.locator('[data-target="view-transactions"]').click()
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(25)
    page.locator('#transaction-more').click()
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(6)
    page.locator('#transaction-previous').click()
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(25)
    page.locator('#transaction-search').fill('missing')
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(0)
    page.locator('#transaction-search').fill('ONE')
    expect(page.locator('#transaction-list .bill-record-card')).to_have_count(25)
    page.evaluate("""()=>{localStorage.setItem('waterhall_unsynced_actions',JSON.stringify([{owner:'worker',operation_id:'local-failed-operation',endpoint:'/api/billing-records/add',sync_error:'Needs review',body:{bill_id:'PENDING-local',house_id:'HH-1',family_head_name:'Resident One',date:new Date().toISOString(),total_due:170}}]));}""")
    page.locator('#transaction-filter').select_option('Failed Sync')
    expect(page.locator('#transaction-list')).to_contain_text('Failed Sync')
    assert errors==[]


@pytest.mark.parametrize('supports_history',[False,True])
def test_existing_and_upgraded_native_bridge_preserve_bill_sync(browser_page,supports_history):
    page,origin,(_,_,password),errors=browser_page
    page.add_init_script("""(() => {
      const supported = SUPPORT;
      window.waterhallBillHistoryStorage=supported;
      window.nativeCalls=[];
      window.WaterHallStorage={postMessage:raw=>{
        const req=JSON.parse(raw);nativeCalls.push(req);
        let result={ok:true,data:null};
        if(req.data.type==='bill_history'&&!supported) result={ok:false};
        else if(req.method==='save') localStorage.setItem('native-test-'+req.data.type,JSON.stringify(req.data.rows));
        else if(req.method==='load') result.data=localStorage.getItem('native-test-'+req.data.type)||'[]';
        setTimeout(()=>waterhallNativeReply(req.id,result),0);
      }};
    })();""".replace('SUPPORT','true' if supports_history else 'false'))
    login(page,origin,password,'worker')
    page.locator('[data-target="view-billing"]').click();page.locator('#bill-curr-input').fill('20');page.locator('#btn-save-bill').click()
    page.locator('[data-target="view-transactions"]').click()
    expect(page.locator('#transaction-list')).to_contain_text('Synced')
    assert page.evaluate("()=>JSON.parse(localStorage.getItem('waterhall_unsynced_actions')||'[]').length") == 0
    if supports_history:
        page.evaluate("localStorage.removeItem('waterhall_bill_history')")
        page.reload();page.locator('[data-target="view-transactions"]').click()
        expect(page.locator('#transaction-list .bill-record-card')).to_have_count(1)
    else:
        assert page.evaluate("()=>nativeCalls.filter(r=>r.data.type==='bill_history').length")==0
    assert errors==[]


def test_worker_keyboard_hides_and_restores_six_tabs(browser_page):
    page,origin,(_,_,password),errors=browser_page
    page.set_viewport_size({'width':360,'height':740});login(page,origin,password,'worker')
    page.locator('[data-target="view-billing"]').click();page.locator('#bill-meter-search').focus()
    page.evaluate('waterhallKeyboardChanged(true)')
    expect(page.locator('#app-bottom-nav')).to_be_hidden()
    page.set_viewport_size({'width':360,'height':440})
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.evaluate('waterhallKeyboardChanged(false)');page.locator('#bill-meter-search').blur()
    page.set_viewport_size({'width':360,'height':740})
    expect(page.locator('#app-bottom-nav')).to_be_visible()
    assert page.locator('#app-bottom-nav a').count()==6
    assert errors==[]


@pytest.mark.parametrize('role,account',[('worker','worker'),('resident','HH-1')])
@pytest.mark.parametrize('width',[320,390])
def test_recovery_open_cancel_keyboard_validation_success(browser_page,role,account,width):
    page,origin,(client,headers,password),errors=browser_page
    page.set_viewport_size({'width':width,'height':740});page.goto(origin+'/index.html?role='+role)
    page.locator('#btn-web-forgot-password').click()
    expect(page.locator('#web-modal-forgot-pw')).to_be_visible()
    expect(page.locator('#web-recover-role')).to_have_value(role)
    page.set_viewport_size({'width':width,'height':440})
    rect=page.locator('#btn-web-recover-submit').bounding_box()
    assert rect['x']>=0 and rect['x']+rect['width']<=width and rect['y']+rect['height']<=440
    page.locator('#btn-web-recover-cancel').click()
    expect(page.locator('#web-modal-forgot-pw')).to_be_hidden()
    page.locator('#btn-web-forgot-password').click()
    page.locator('#btn-web-recover-submit').click()
    assert page.locator('#web-recover-username').evaluate('e=>e.validity.valueMissing')
    page.locator('#web-recover-username').fill(account)
    page.locator('#web-recover-contact').fill('invalid-code-that-is-long-enough-123456')
    new=secrets.token_urlsafe(24);page.locator('#web-recover-new-password').fill(new)
    page.locator('#btn-web-recover-submit').click()
    expect(page.locator('#web-recover-error')).to_contain_text('Invalid or expired')
    code=client.post('/api/admin/recovery-codes',headers=headers['admin'],json={'role':role,'username':account}).json['recovery_code']
    page.locator('#web-recover-contact').fill(code)
    page.locator('#btn-web-recover-submit').click()
    expect(page.locator('#web-recover-success')).to_contain_text('Password reset')
    expect(page.locator('#web-modal-forgot-pw')).to_be_hidden(timeout=5000)
    page.set_viewport_size({'width':width,'height':740})
    page.locator('#employee-id').fill(account);page.locator('#login-password').fill(new);page.locator('#btn-login').click()
    expect(page.locator('#view-dashboard' if role=='worker' else '#view-resident-home')).to_be_visible()
    assert errors==[]


@pytest.mark.parametrize('role',['worker','resident'])
def test_recovery_network_error_and_duplicate_submit(browser_page,role):
    page,origin,_,errors=browser_page
    page.goto(origin+'/index.html?role='+role);page.locator('#btn-web-forgot-password').click()
    page.locator('#web-recover-username').fill('worker' if role=='worker' else 'HH-1')
    page.locator('#web-recover-contact').fill('invalid-code-that-is-long-enough-123456')
    page.locator('#web-recover-new-password').fill(secrets.token_urlsafe(24))
    calls=[]
    def fail(route):calls.append(1);route.abort()
    page.route('**/api/recover-account',fail)
    page.evaluate("document.getElementById('web-recovery-form').requestSubmit();document.getElementById('web-recovery-form').requestSubmit();")
    expect(page.locator('#web-recover-error')).to_contain_text('Unable to reach')
    assert len(calls)==1
    page.locator('#btn-web-recover-cancel').click();expect(page.locator('#web-modal-forgot-pw')).to_be_hidden()
    assert errors==[]


def test_admin_production_issuance_ui(browser_page):
    page,origin,(_,_,password),errors=browser_page
    page.goto(origin+'/admin/');page.locator('#login-username').fill('admin');page.locator('#login-password').fill(password);page.locator('#btn-login').click()
    page.locator('[data-tab="tab-directory"]').click()
    page.locator('#issue-recovery-role').select_option('worker');page.locator('#issue-recovery-account').fill('worker')
    page.locator('#issue-recovery-submit').click();expect(page.locator('#issue-recovery-result')).to_contain_text('One-use code:')
    page.locator('#issue-recovery-clear').click();expect(page.locator('#issue-recovery-result')).to_be_hidden()
    assert errors==[]
