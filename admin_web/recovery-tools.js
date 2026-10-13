/* Codes are returned once to an authenticated Admin, never persisted/logged. */
(() => {
  const form = document.getElementById('admin-issue-recovery-form');
  const output = document.getElementById('issue-recovery-result');
  const clear = document.getElementById('issue-recovery-clear');
  const submit = document.getElementById('issue-recovery-submit');
  let timer, busy = false;
  function erase() { output.textContent = ''; output.hidden = true; clear.hidden = true; clearTimeout(timer); }
  clear.addEventListener('click', erase);
  window.addEventListener('storage', e => { if (e.key === 'admin_jwt') erase(); });
  // Existing logout clears the token in this document rather than a storage event.
  const sessionTimer = setInterval(() => { if (!jwtToken) erase(); }, 500);
  window.addEventListener('pagehide', () => { clearInterval(sessionTimer); erase(); });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (busy || !form.reportValidity()) return;
    busy = true; submit.disabled = true; erase();
    const token = jwtToken;
    try {
      const res = await apiFetch('/api/admin/recovery-codes', {method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+token}, body:JSON.stringify({
        role:document.getElementById('issue-recovery-role').value,
        username:document.getElementById('issue-recovery-account').value.trim()
      })});
      if (token !== jwtToken) return;
      const data = await res.json();
      if (token !== jwtToken) return;
      output.hidden = false;
      if (!res.ok) { output.textContent = data.msg || 'Unable to issue code.'; return; }
      output.textContent = `One-use code: ${data.recovery_code} — expires in 30 minutes. Deliver privately after verifying identity.`;
      clear.hidden = false;
      timer = setTimeout(erase, 120000);
    } catch (_) {
      if (token === jwtToken) { output.hidden = false; output.textContent = 'Unable to issue code. Check your connection.'; }
    } finally { busy = false; submit.disabled = false; }
  });
})();
