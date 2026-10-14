/* Reuses the existing Admin reset API. Secrets live only in the open result. */
(() => {
  const $ = id => document.getElementById(id);
  const form = $('admin-issue-recovery-form'), role = $('issue-recovery-role');
  const account = $('issue-recovery-account'), search = $('reset-account-search');
  const start = $('issue-recovery-submit'), result = $('issue-recovery-result');
  const confirmModal = $('reset-confirm-modal'), successModal = $('reset-success-modal');
  const verify = $('reset-identity-verified'), submit = $('reset-confirm-submit');
  const cancel = $('reset-confirm-cancel'), secret = $('reset-temporary-password');
  let target = null, owner = null, opener = null, busy = false, timer;
  const sameSession = () => owner && owner.token === jwtToken && owner.generation === sessionGeneration;
  const eligible = row => row && (row.role === 'worker' || row.status === 'approved');

  function records() {
    const unique = new Map();
    for (const h of globalData.households || []) {
      const row = {id:String(h.house_id), name:String(h.owner_name || ''), role:'resident',
        status:String(h.account_status || 'unknown'), code:String(h.account_number || '')};
      const previous = unique.get(row.role + ':' + row.id);
      if (previous) row.code = Array.from(new Set([previous.code, row.code].filter(Boolean))).join(' / ');
      unique.set(row.role + ':' + row.id, row);
    }
    for (const w of globalData.workers || []) {
      if (w.role !== 'Collector') continue;
      const row = {id:String(w.worker_id), name:String(w.name || ''), role:'worker', status:'registered', code:''};
      unique.set(row.role + ':' + row.id, row);
    }
    return Array.from(unique.values());
  }

  function details(id, row) {
    const element = $(id);
    element.replaceChildren();
    for (const [label, value] of [
      ['Full name', row.name], ['Username', row.id],
      ['Role', row.role === 'worker' ? 'Worker (Collector)' : 'Resident'],
      ['Account ID', row.code ? row.id + ' / ' + row.code : row.id],
      ['Account status', row.status.charAt(0).toUpperCase() + row.status.slice(1)]
    ]) {
      const dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = label; dd.textContent = value;
      element.append(dt, dd);
    }
  }

  function selected() { return records().find(row => row.role === role.value && row.id === account.value); }
  function selectionChanged() {
    const row = selected();
    $('reset-selected-account').hidden = !row;
    if (row) details('reset-selected-account', row);
    start.disabled = !jwtToken || busy || !eligible(row);
  }

  function refreshAccounts() {
    const old = account.value, query = search.value.trim().toLowerCase();
    account.replaceChildren(new Option('Select an account', ''));
    const rows = records().filter(row => row.role === role.value &&
      [row.id, row.name, row.code].some(value => value.toLowerCase().includes(query)));
    for (const row of rows) account.add(new Option(row.id + ' — ' + row.name + ' (' + row.status + ')', row.id));
    if (rows.some(row => row.id === old)) account.value = old;
    account.disabled = !rows.length;
    selectionChanged();
  }

  function showMessage(message) { result.textContent = message; result.hidden = !message; }
  function close(restore = true) {
    clearTimeout(timer);
    const current = sameSession();
    const replacement = target && Array.from(document.querySelectorAll('[data-reset-password]')).find(button =>
      button.dataset.resetRole === target.role && button.dataset.resetPassword === target.id);
    for (const modal of [confirmModal, successModal]) {
      modal.hidden = true; modal.classList.remove('active');
    }
    secret.value = ''; secret.type = 'password';
    $('reset-password-toggle').textContent = 'Show Password';
    $('reset-password-toggle').setAttribute('aria-pressed', 'false');
    $('reset-copy-status').textContent = '';
    verify.checked = false; verify.disabled = false;
    submit.disabled = true; submit.textContent = 'Confirm Reset';
    cancel.disabled = false; $('reset-confirm-error').hidden = true;
    $('reset-confirm-account').replaceChildren(); $('reset-success-account').replaceChildren();
    document.body.classList.remove('password-reset-open');
    owner = null; target = null;
    if (restore && current) {
      const destination = opener?.isConnected && opener.getClientRects().length ? opener : replacement || start;
      if (destination.getClientRects().length) destination.focus({preventScroll:true});
    }
    opener = null;
    selectionChanged();
  }

  function show(modal) {
    modal.hidden = false; modal.style.removeProperty('display'); modal.classList.add('active');
    document.body.classList.add('password-reset-open');
  }

  function begin(row, button) {
    if (busy || !jwtToken || !eligible(row)) return;
    close(false);
    owner = {token:jwtToken, generation:sessionGeneration};
    target = {...row}; opener = button;
    showMessage(''); details('reset-confirm-account', target);
    show(confirmModal); cancel.focus({preventScroll:true});
  }

  role.addEventListener('change', () => { account.value = ''; refreshAccounts(); showMessage(''); });
  search.addEventListener('input', refreshAccounts);
  account.addEventListener('change', selectionChanged);
  account.addEventListener('focus', refreshAccounts);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (form.reportValidity()) begin(selected(), start);
  });
  verify.addEventListener('change', () => { submit.disabled = busy || !verify.checked || !sameSession(); });
  cancel.addEventListener('click', () => { if (!busy) close(); });
  $('reset-password-done').addEventListener('click', () => close());

  function errorMessage(status) {
    return ({
      400:'The selected account could not be verified. Review its details and try again.',
      401:'Your Admin session expired. Sign in again.',
      403:'Only an authorized administrator can reset passwords.',
      404:'This account no longer exists for the selected role. Refresh Admin data.',
      409:'This Resident must be approved before a password can be reset.',
      429:'Too many reset attempts. Wait a minute before trying again.'
    })[status] || 'The server could not confirm the reset. No password was received. Check your connection or retry later.';
  }

  submit.addEventListener('click', async () => {
    if (busy || !verify.checked || !sameSession() || !target) return;
    const current = records().find(row => row.role === target.role && row.id === target.id);
    if (!eligible(current) || current.name !== target.name || current.status !== target.status) {
      close(); showMessage('Account details changed. Review the current directory before resetting.'); return;
    }
    const requestOwner = owner, requested = {...target};
    busy = true; submit.disabled = true; cancel.disabled = true; verify.disabled = true;
    submit.textContent = 'Resetting…'; start.disabled = true; $('reset-confirm-error').hidden = true;
    confirmModal.focus({preventScroll:true});
    const isCurrent = () => owner === requestOwner && sameSession();
    let responseTimer;
    try {
      const response = await apiFetch('/api/admin/password-resets', {
        method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer ' + requestOwner.token},
        body:JSON.stringify({role:requested.role, username:requested.id, identity_verified:true, confirmed:true}),
        isCurrent
      });
      if (!isCurrent()) return;
      if (!response.ok) throw new Error(errorMessage(response.status));
      // apiFetch bounds response headers; also bound a stalled JSON body.
      const data = await Promise.race([
        response.json(),
        new Promise((_, reject) => { responseTimer = setTimeout(() => reject(new Error(errorMessage(500))), 30000); })
      ]);
      if (!isCurrent()) return;
      if (data.status !== 'success' || data.account_id !== requested.id || data.role !== requested.role ||
          data.password_change_required !== true || data.expires_in_hours !== 24 ||
          typeof data.temporary_password !== 'string' || data.temporary_password.length < 12) {
        throw new Error('The reset response could not be confirmed. No temporary password is available; perform another authorized reset if needed.');
      }
      confirmModal.hidden = true; confirmModal.classList.remove('active');
      details('reset-success-account', requested);
      secret.value = data.temporary_password; verify.checked = false;
      show(successModal); $('reset-password-done').focus({preventScroll:true});
      timer = setTimeout(() => { close(); showMessage('Temporary password display cleared. If it was not saved privately, perform another authorized reset.'); }, 120000);
    } catch (error) {
      if (!isCurrent()) return;
      const safe = [400,401,403,404,409,429].map(errorMessage);
      safe.push('The reset response could not be confirmed. No temporary password is available; perform another authorized reset if needed.');
      $('reset-confirm-error').textContent = safe.includes(error?.message) ? error.message : errorMessage(500);
      $('reset-confirm-error').hidden = false;
    } finally {
      clearTimeout(responseTimer);
      busy = false;
      if (isCurrent()) {
        verify.disabled = false; cancel.disabled = false;
        submit.disabled = !verify.checked; submit.textContent = 'Confirm Reset';
      }
      selectionChanged();
    }
  });

  $('reset-password-toggle').addEventListener('click', () => {
    if (!sameSession() || !secret.value) return;
    const visible = secret.type === 'password';
    secret.type = visible ? 'text' : 'password';
    $('reset-password-toggle').textContent = visible ? 'Hide Password' : 'Show Password';
    $('reset-password-toggle').setAttribute('aria-pressed', String(visible));
  });
  $('reset-password-copy').addEventListener('click', async () => {
    if (!sameSession() || !secret.value) return;
    const requestOwner = owner;
    try {
      await navigator.clipboard.writeText(secret.value);
      if (owner === requestOwner && sameSession()) $('reset-copy-status').textContent = 'Temporary password copied. Share it privately with the verified owner.';
    } catch (_) {
      if (owner === requestOwner && sameSession()) $('reset-copy-status').textContent = 'Copy was unavailable. Use Show Password to provide it privately.';
    }
  });

  for (const modal of [confirmModal, successModal]) {
    modal.addEventListener('click', event => { if (event.target === modal && !busy) close(); });
    modal.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); if (!busy) close(); }
      if (event.key !== 'Tab') return;
      const controls = Array.from(modal.querySelectorAll('button,input')).filter(el => !el.disabled && el.getClientRects().length);
      if (!controls.length) { event.preventDefault(); return; }
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    // The existing session purge hides overlays; erase secrets before the next paint.
    new MutationObserver(() => { if (owner && !sameSession()) close(false); })
      .observe(modal, {attributes:true, attributeFilter:['class','style']});
  }

  function directoryActions() {
    const indexed = new Map(records().map(row => [row.role + ':' + row.id, row]));
    for (const [id, kind] of [['resident-tbody','resident'],['worker-tbody','worker']]) {
      for (const tr of $(id).rows) {
        if (tr.cells.length !== 5 || tr.querySelector('[data-reset-password]')) continue;
        const row = indexed.get(kind + ':' + tr.cells[0].textContent.trim());
        if (!eligible(row)) continue;
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'btn btn-secondary';
        button.textContent = 'Reset Password'; button.dataset.resetPassword = row.id; button.dataset.resetRole = kind;
        button.setAttribute('aria-label', 'Reset password for ' + row.name + ' (' + row.id + ')');
        tr.cells[4].prepend(button);
      }
    }
    refreshAccounts();
  }
  for (const id of ['resident-tbody','worker-tbody']) {
    $(id).addEventListener('click', event => {
      const button = event.target.closest('[data-reset-password]');
      if (!button) return;
      const row = records().find(item => item.id === button.dataset.resetPassword && item.role === button.dataset.resetRole);
      begin(row, button);
    });
    new MutationObserver(directoryActions).observe($(id), {childList:true});
  }

  function end() {
    close(false); form.reset(); search.value = ''; account.replaceChildren(new Option('Select an account', ''));
    $('reset-selected-account').replaceChildren(); $('reset-selected-account').hidden = true;
    showMessage(''); start.disabled = true;
  }
  $('btn-logout').addEventListener('click', end);
  window.addEventListener('storage', event => { if (event.key === 'admin_jwt') end(); });
  window.addEventListener('pagehide', end);
  let sessionTimer;
  function watchSession() {
    if (!sessionTimer) sessionTimer = setInterval(() => { if (owner && !sameSession()) end(); }, 250);
  }
  watchSession();
  window.addEventListener('pageshow', watchSession);
  window.addEventListener('pagehide', () => { clearInterval(sessionTimer); sessionTimer = null; });
  directoryActions();
})();
