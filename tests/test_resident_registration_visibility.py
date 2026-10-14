"""Persisted self-registrations must remain visible through routine Admin polling."""
from pathlib import Path
import os
import pytest
from playwright.sync_api import expect
from backend.db_adapter import get_db
from tests.test_browser import browser_page,pytestmark


@pytest.mark.parametrize('delay_ms',[0,6500])
def test_pending_registration_survives_slow_review_list_and_heartbeat(browser_page,delay_ms):
    page,origin,(client,headers,password),errors=browser_page
    payload=dict(owner_name='Isolated Pending Applicant',contact='09175557701',purok='Purok 1',password=password,verify_password=password)
    response=client.post('/api/residents/register',json=payload)
    assert response.status_code==201
    who=response.json['house_id']
    assert response.json['account_status']=='pending'
    assert any(r['house_id']==who for r in client.get('/api/residents/registrations',headers=headers['admin']).json['registrations'])
    if delay_ms:
        page.add_init_script('''{
          const original=window.fetch.bind(window); window.registrationListRequests=0;
          window.fetch=async (url,options) => {
            const response=await original(url,options);
            if (String(url).includes('/api/residents/registrations')) {
              registrationListRequests++;
              await new Promise(resolve => setTimeout(resolve,6500));
            }
            return response;
          };
        }''')
    page.goto(origin+'/admin/')
    page.locator('#login-username').fill('admin');page.locator('#login-password').fill(password)
    page.locator('#btn-login').click();expect(page.locator('#login-screen')).to_be_hidden()
    page.locator('[data-tab="tab-directory"]').click()
    try:
        expect(page.locator('#registrations-tbody')).to_contain_text('Isolated Pending Applicant',timeout=15000)
    finally:
        screenshots=os.getenv('REGISTRATION_SCREENSHOTS')
        if screenshots:
            Path(screenshots).mkdir(parents=True,exist_ok=True)
            page.locator('#registrations-tbody').locator('..').screenshot(path=str(Path(screenshots)/f'review-delay-{delay_ms}.png'))
    row=page.locator('#registrations-tbody tr').filter(has_text=who)
    expect(row).to_contain_text('pending')
    expect(row).to_contain_text('09175557701')
    expect(row).to_contain_text('Purok 1')
    expect(row.locator('[data-review-status="approved"]')).to_be_visible()
    expect(row.locator('[data-review-status="rejected"]')).to_be_visible()
    assert page.locator('#resident-tbody tr').count()==3
    assert errors==[]


def login_admin(surface):
    page,origin,(_,_,password),_=surface
    page.goto(origin+'/admin/')
    page.locator('#login-username').fill('admin');page.locator('#login-password').fill(password)
    page.locator('#btn-login').click();expect(page.locator('#login-screen')).to_be_hidden()
    page.locator('[data-tab="tab-directory"]').click()
    return page


@pytest.mark.parametrize('outcome',['approved','rejected'])
def test_review_refresh_supersedes_a_pre_review_snapshot(browser_page,outcome):
    page,_,(client,headers,password),errors=browser_page
    before=client.get('/api/all-data?role=admin',headers=headers['admin']).json['households']
    response=client.post('/api/residents/register',json=dict(owner_name='Review Race Applicant',contact='09175557702',purok='Purok 1',password=password,verify_password=password))
    who=response.json['house_id'];page=login_admin(browser_page)
    expect(page.locator('[data-review-id="'+who+'"]')).to_have_count(2)
    page.evaluate('''() => {
      const original=fetch.bind(window);let hold=true;
      window.fetch=async (url,options) => {
        const response=await original(url,options);
        if (String(url).includes('/api/residents/registrations') && hold) {
          hold=false;const body=await response.text();
          return await new Promise(resolve => {window.releaseRegistrationSnapshot=()=>resolve(new Response(body,{status:200}));});
        }
        return response;
      };
      loadRegistrations(true);
    }''')
    page.wait_for_function('() => typeof releaseRegistrationSnapshot==="function"')
    page.once('dialog',lambda dialog:dialog.accept())
    page.locator('[data-review-id="'+who+'"][data-review-status="'+outcome+'"]').click()
    expect(page.locator('#registration-review-status')).to_have_text('Registration '+outcome+'.')
    row=page.locator('#registrations-tbody tr').filter(has_text=who)
    expect(row).to_contain_text(outcome);page.evaluate('releaseRegistrationSnapshot()')
    expect(row).to_contain_text(outcome);assert row.locator('button').count()==0
    actual=client.get('/api/residents/registrations',headers=headers['admin']).json['registrations']
    assert next(r['account_status'] for r in actual if r['house_id']==who)==outcome
    after=client.get('/api/all-data?role=admin',headers=headers['admin']).json['households']
    assert [r for r in after if r['house_id']!=who]==before
    assert errors==[]


def registration_form(surface):
    page,origin,(_,_,password),_=surface
    page.goto(origin+'/index.html?role=resident')
    page.locator('#btn-open-register-modal').click()
    expect(page.locator('#reg-res-purok option')).to_have_count(1)
    for field,value in [('reg-res-name','Isolated Mobile Applicant'),('reg-contact','09175557703'),('reg-password',password),('reg-verify-password',password)]:
        page.locator('#'+field).fill(value)
    return page


@pytest.mark.parametrize('failure',[400,409,500,'network'])
def test_mobile_failed_registration_never_shows_success_or_clears_the_form(browser_page,failure):
    page=registration_form(browser_page)
    def fail(route):
        if failure=='network':route.abort('failed')
        else:route.fulfill(status=failure,json={'msg':'Registration rejected'})
    page.route('**/api/residents/register',fail)
    page.locator('#btn-submit-register').click()
    expect(page.locator('#btn-submit-register')).to_be_enabled()
    expect(page.locator('#register-status')).not_to_contain_text('Registration submitted.')
    expect(page.locator('#register-status')).not_to_contain_text('Submitting registration...')
    expect(page.locator('#reg-res-name')).to_have_value('Isolated Mobile Applicant')
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM households');assert db.fetchone()['n']==2
    assert browser_page[3]==[]


def test_mobile_pending_submit_is_single_and_success_matches_persisted_identity(browser_page):
    page=registration_form(browser_page);held=[]
    page.route('**/api/residents/register',lambda route:held.append(route))
    page.locator('#btn-submit-register').click();expect(page.locator('#btn-submit-register')).to_be_disabled()
    page.locator('#resident-register-form').dispatch_event('submit')
    assert len(held)==1
    expect(page.locator('#register-status')).to_have_text('Submitting registration...')
    held[0].continue_()
    expect(page.locator('#register-status')).to_contain_text('Wait for Admin approval')
    client,headers,_=browser_page[2]
    rows=client.get('/api/residents/registrations',headers=headers['admin']).json['registrations']
    record=next(r for r in rows if r['family_head_name']=='Isolated Mobile Applicant')
    assert record['account_status']=='pending'
    expect(page.locator('#register-status')).to_contain_text(record['house_id'])
    assert len(rows)==3 and browser_page[3]==[]


@pytest.mark.parametrize('http,receipt',[
    (200,{'status':'error','msg':'Registration not saved'}),
    (201,{'status':'success','account_status':'pending'}),
    (201,{'status':'success','account_status':'approved','house_id':'HH-3','account_number':'TAG-2026-0003','resident_id':'TAG-2026-0003'}),
    (201,{'status':'success','account_status':'pending','house_id':'HH-3','account_number':'TAG-2026-0003','resident_id':'TAG-2026-0999'}),
])
def test_mobile_requires_a_valid_created_pending_receipt_before_success(browser_page,http,receipt):
    page=registration_form(browser_page)
    page.route('**/api/residents/register',lambda route:route.fulfill(status=http,json=receipt))
    page.locator('#btn-submit-register').click()
    expect(page.locator('#btn-submit-register')).to_be_enabled()
    expect(page.locator('#register-status')).not_to_contain_text('Registration submitted.')
    expect(page.locator('#register-status')).to_contain_text('Registration was not confirmed')
    expect(page.locator('#reg-res-name')).to_have_value('Isolated Mobile Applicant')
    with get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM households');assert db.fetchone()['n']==2
    assert browser_page[3]==[]


@pytest.mark.parametrize('result',['empty','failure'])
def test_registration_empty_or_failed_list_has_an_explicit_state(browser_page,result):
    page=login_admin(browser_page)
    expect(page.locator('#registrations-tbody tr')).to_have_count(2)
    page.route('**/api/residents/registrations',lambda route:route.fulfill(status=200,json={'registrations':[]}) if result=='empty' else route.fulfill(status=500,json={'msg':'unavailable'}))
    page.evaluate('loadRegistrations(true)')
    if result=='empty':
        expect(page.locator('#registrations-tbody')).to_contain_text('No resident registrations.')
        expect(page.locator('#registration-load-status')).to_have_text('')
    else:
        expect(page.locator('#registration-load-status')).to_contain_text('could not refresh')
        expect(page.locator('#registrations-tbody tr')).to_have_count(2)
    assert browser_page[3]==[]
