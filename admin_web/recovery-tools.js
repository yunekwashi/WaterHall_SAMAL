/* Admin-verified reset. Temporary passwords stay only in this visible result. */
(() => {
  const form = document.getElementById('admin-issue-recovery-form');
  const output = document.getElementById('issue-recovery-result');
  const clear = document.getElementById('issue-recovery-clear');
  const submit = document.getElementById('issue-recovery-submit');
  const role = document.getElementById('issue-recovery-role');
  const account = document.getElementById('issue-recovery-account');
  const verified = document.getElementById('reset-identity-verified');
  let timer, busy = false;
  function erase() { output.textContent = ''; output.hidden = true; clear.hidden = true; clearTimeout(timer); }
  function accounts() {
    const old = account.value;
    const rows = role.value === 'resident' ? (globalData.households || []) : (globalData.workers || []).filter(w => w.role === 'Collector');
    account.replaceChildren(new Option('Select the verified account', ''));
    for (const row of rows) {
      const id = role.value === 'resident' ? row.house_id : row.worker_id;
      const name = role.value === 'resident' ? row.owner_name : row.name;
      account.add(new Option(id + ' — ' + name, id));
    }
    if (Array.from(account.options).some(o => o.value === old)) account.value = old;
  }
  role.addEventListener('change', () => { account.value = ''; verified.checked = false; erase(); accounts(); });
  account.addEventListener('focus', accounts);
  account.addEventListener('change', () => { verified.checked = false; erase(); });
  clear.addEventListener('click', erase);
  window.addEventListener('storage', e => { if (e.key === 'admin_jwt') { erase(); form.reset(); } });
  const sessionTimer = setInterval(() => { if (!jwtToken) { erase(); form.reset(); } }, 500);
  window.addEventListener('pagehide', () => { clearInterval(sessionTimer); erase(); });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (busy || !form.reportValidity()) return;
    const selected = account.options[account.selectedIndex];
    if (!confirm('Reset password for ' + selected.textContent + '? This invalidates existing sessions. Proceed only after verifying identity.')) return;
    busy = true; submit.disabled = true; erase();
    const token = jwtToken;
    try {
      const res = await apiFetch('/api/admin/password-resets', {method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+token}, body:JSON.stringify({
        role:role.value, username:account.value, identity_verified:true, confirmed:true
      })});
      if (token !== jwtToken) return;
      const data = await res.json();
      if (token !== jwtToken) return;
      output.hidden = false;
      if (!res.ok) { output.textContent = data.msg || 'Unable to reset password.'; return; }
      output.textContent = 'Temporary password for ' + data.account_id + ': ' + data.temporary_password + ' — expires in 24 hours. Deliver privately to the verified owner. A new password is required at sign-in.';
      clear.hidden = false; verified.checked = false;
      timer = setTimeout(erase, 120000);
    } catch (_) {
      if (token === jwtToken) { output.hidden = false; output.textContent = 'Unable to reset password. Check your connection.'; }
    } finally { busy = false; submit.disabled = false; }
  });
})();
