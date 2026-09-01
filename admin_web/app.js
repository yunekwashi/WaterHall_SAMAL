let jwtToken = localStorage.getItem('admin_jwt');
let isServerOnline = false;

document.addEventListener('DOMContentLoaded', async () => {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

  // Always verify server is alive first
  const serverAlive = await checkServerHealth();

  if (!serverAlive) {
    showAdminOfflineOverlay();
    hideLoader();
    return;
  }

  hideAdminOfflineOverlay();

  if (!jwtToken) {
    showLogin();
  } else {
    try {
      const res = await fetch('/api/all-data', {
        headers: { 'Authorization': 'Bearer ' + jwtToken }
      });
      if (res.ok) {
        document.getElementById('login-screen').style.display = 'none';
        const data = await res.json();
        globalData = data;
        renderDashboard(data);
        renderDirectory(data);
        hideLoader();
      } else {
        localStorage.removeItem('admin_jwt');
        jwtToken = null;
        showLogin();
      }
    } catch (e) {
      showAdminOfflineOverlay();
      hideLoader();
    }
  }
});

async function checkServerHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch('/api/health', { signal: controller.signal });
    clearTimeout(timeoutId);
    isServerOnline = res.ok;
    return res.ok;
  } catch (e) {
    isServerOnline = false;
    return false;
  }
}

function showAdminOfflineOverlay() {
  isServerOnline = false;
  document.body.classList.add('server-offline');
  let overlay = document.getElementById('admin-offline-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-offline-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(10,15,30,0.97);backdrop-filter:blur(10px);display:flex;justify-content:center;align-items:center;z-index:999999;';
    overlay.innerHTML = `
      <div style="background:#111827;border:1px solid rgba(239,68,68,0.3);border-radius:16px;padding:40px;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
        <svg width="56" height="56" fill="#EF4444" viewBox="0 0 24 24" style="margin-bottom:16px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <h2 style="color:#F9FAFB;font-size:22px;font-weight:700;margin-bottom:10px;">Database Server Offline</h2>
        <p style="color:#D1D5DB;font-size:14px;line-height:1.6;margin-bottom:24px;">
          Cannot connect to the WATERHALL backend server.<br>
          The admin panel is locked until the server is running.
        </p>
        <button id="btn-admin-retry" style="background:linear-gradient(135deg,#2E86C1,#1B4F72);color:white;border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;width:100%;">
          Retry Connection
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('btn-admin-retry').addEventListener('click', retryAdminConnection);
  }
  overlay.style.display = 'flex';
}

function hideAdminOfflineOverlay() {
  isServerOnline = true;
  document.body.classList.remove('server-offline');
  const overlay = document.getElementById('admin-offline-overlay');
  if (overlay) overlay.style.display = 'none';
  const banner = document.getElementById('admin-db-offline-banner');
  if (banner) banner.style.display = 'none';
}

async function retryAdminConnection() {
  const btn = document.getElementById('btn-admin-retry');
  if (btn) { btn.textContent = 'Checking...'; btn.disabled = true; }

  const alive = await checkServerHealth();
  if (alive) {
    hideAdminOfflineOverlay();
    location.reload();
  } else {
    if (btn) { btn.textContent = 'Server Still Offline — Retry'; btn.disabled = false; }
  }
}

// Real-time synchronization polling every 2.5 seconds
setInterval(async () => {
  if (!isServerOnline) {
    const alive = await checkServerHealth();
    if (alive) {
      hideAdminOfflineOverlay();
      if (jwtToken) fetchData(true);
    }
    return;
  }
  if (jwtToken && document.getElementById('login-screen') && document.getElementById('login-screen').style.display === 'none') {
    fetchData(true);
  }
}, 2500);

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('loading-overlay').style.opacity = '0';
  setTimeout(() => { document.getElementById('loading-overlay').style.display = 'none'; }, 500);
}

function hideLoader() {
  setTimeout(() => {
    document.getElementById('loading-overlay').style.opacity = '0';
    setTimeout(() => { document.getElementById('loading-overlay').style.display = 'none'; }, 500);
  }, 600);
}

document.getElementById('btn-login').addEventListener('click', async () => {
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value.trim();
  const btn = document.getElementById('btn-login');
  const errEl = document.getElementById('login-error');

  if (!u || !p) {
    errEl.textContent = 'Please enter username and password.';
    errEl.style.display = 'block';
    return;
  }

  btn.textContent = 'Authenticating...';
  btn.disabled = true;
  errEl.style.display = 'none';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    });
    if (res.ok) {
      const data = await res.json();
      jwtToken = data.access_token;
      localStorage.setItem('admin_jwt', jwtToken);
      isServerOnline = true;
      document.getElementById('auth-name').textContent = data.name || 'Admin';
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('loading-overlay').style.display = 'flex';
      document.getElementById('loading-overlay').style.opacity = '1';
      fetchData(false);
    } else {
      const errData = await res.json().catch(() => ({}));
      errEl.textContent = errData.msg || 'Invalid credentials. Please try again.';
      errEl.style.display = 'block';
    }
  } catch (e) {
    errEl.textContent = 'Cannot connect to server. Is it running?';
    errEl.style.display = 'block';
    showAdminOfflineOverlay();
  } finally {
    btn.textContent = 'Login to Dashboard';
    btn.disabled = false;
  }
});

document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('admin_jwt');
  location.reload();
});

function togglePassword() {
  var input = document.getElementById('login-password');
  var eyeShow = document.getElementById('eye-show');
  var eyeHide = document.getElementById('eye-hide');
  var btn = document.getElementById('btn-toggle-pw');
  if (input.type === 'password') {
    input.type = 'text';
    eyeShow.style.display = 'none';
    eyeHide.style.display = 'block';
    btn.style.color = 'var(--primary)';
  } else {
    input.type = 'password';
    eyeShow.style.display = 'block';
    eyeHide.style.display = 'none';
    btn.style.color = 'var(--text-muted)';
  }
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    e.currentTarget.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const tabId = e.currentTarget.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    const titles = { 'tab-dashboard': 'System Overview', 'tab-directory': 'User Directory', 'tab-assets': 'IoT Control' };
    document.getElementById('page-title').textContent = titles[tabId] || 'Dashboard';
  });
});

let globalData = {};
let charts = { collections: null, quality: null };

async function fetchData(silent = false) {
  try {
    const res = await fetch('/api/all-data', {
      headers: { 'Authorization': 'Bearer ' + jwtToken }
    });

    if (res.status === 401) {
      localStorage.removeItem('admin_jwt');
      location.reload();
      return;
    }

    if (res.ok) {
      isServerOnline = true;
      hideAdminOfflineOverlay();
      const data = await res.json();
      globalData = data;
      renderDashboard(data);
      renderDirectory(data);
    } else {
      showAdminOfflineOverlay();
    }
    if (!silent) hideLoader();
  } catch (e) {
    showAdminOfflineOverlay();
    console.error('Error fetching data:', e);
    if (!silent) hideLoader();
  }
}

function renderDashboard(data) {
  document.getElementById('stat-households').textContent = data.households.length;
  document.getElementById('stat-workers').textContent = data.workers.length;

  let pendingBillsCount = 0;
  let pendingAmount = 0;
  data.billingRecords.forEach(b => {
    if (b.status === 'Unpaid' || b.status === 'Pending') {
      pendingBillsCount++;
      pendingAmount += b.total_due;
    }
  });
  document.getElementById('stat-bills').textContent = '\u20b1' + pendingAmount.toLocaleString();
  document.getElementById('trend-bills').textContent = pendingBillsCount + ' Unpaid';
  document.getElementById('trend-bills').className = pendingBillsCount > 0 ? 'stat-trend trend-down' : 'stat-trend trend-up';

  document.getElementById('trend-households').textContent = data.households.length + ' Registered';
  document.getElementById('trend-households').className = 'stat-trend trend-neutral';
  document.getElementById('trend-workers').textContent = data.workers.length + ' Active';
  document.getElementById('trend-workers').className = 'stat-trend trend-neutral';

  renderCharts(data);

  // Maintenance Logs
  const tbody = document.getElementById('maintenance-tbody');
  tbody.innerHTML = '';
  if (!data.maintenanceLogs || data.maintenanceLogs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:32px;">No maintenance logs recorded yet.</td></tr>';
  } else {
    data.maintenanceLogs.slice(0, 5).forEach(log => {
      const tr = document.createElement('tr');
      const statusBadge = log.status_resolved
        ? '<span class="badge success">Resolved</span>'
        : '<span class="badge warning">Pending</span>';
      const d = log.date ? new Date(log.date).toLocaleDateString() : 'N/A';
      
      const photoHtml = log.photo_base64
        ? `<br><div style="margin-top:6px;"><img src="${log.photo_base64}" style="max-width:140px; max-height:90px; object-fit:cover; border-radius:6px; border:1px solid rgba(255,255,255,0.15); cursor:zoom-in;" onclick="const w=window.open(); w.document.write('<img src=\x22'+this.src+'\x22 style=\x22max-width:100%; max-height:100vh; display:block; margin:auto;\x22 />')" title="Click to view full image" /></div>`
        : '';

      tr.innerHTML =
        '<td>' + log.task_id + '</td>' +
        '<td>' + log.purok + '</td>' +
        '<td>' + log.description + photoHtml + '</td>' +
        '<td>' + d + '</td>' +
        '<td>' + statusBadge + '</td>';
      tbody.appendChild(tr);
    });
  }
}

function renderCharts(data) {
  // Collections Line Chart
  const ctxColl = document.getElementById('collectionsChart').getContext('2d');
  if (charts.collections) charts.collections.destroy();

  const revByMonth = {};
  data.billingRecords.forEach(b => {
    if (b.status === 'Paid') {
      if (!revByMonth[b.billing_month]) revByMonth[b.billing_month] = 0;
      revByMonth[b.billing_month] += b.total_due;
    }
  });

  const labels = Object.keys(revByMonth).sort().slice(-5);
  const revData = labels.map(l => revByMonth[l]);

  charts.collections = new Chart(ctxColl, {
    type: 'line',
    data: {
      labels: labels.length > 0 ? labels : ['No Data'],
      datasets: [{
        label: 'Collected Revenue',
        data: revData.length > 0 ? revData : [0],
        borderColor: '#F4D03F',
        backgroundColor: 'rgba(244, 208, 63, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#BDC9D4' } },
        x: { grid: { display: false }, ticks: { color: '#BDC9D4' } }
      }
    }
  });

  // Quality Doughnut Chart
  const ctxQual = document.getElementById('qualityChart').getContext('2d');
  if (charts.quality) charts.quality.destroy();

  const ca = data.centralAssets || { main_tank_level: 68, turbidity: 6.2, ph_level: 7.2 };
  charts.quality = new Chart(ctxQual, {
    type: 'doughnut',
    data: {
      labels: ['Water Level %', 'Turbidity NTU', 'pH Level'],
      datasets: [{
        data: [ca.main_tank_level, ca.turbidity, ca.ph_level],
        backgroundColor: ['#3498DB', '#10B981', '#F4D03F'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#BDC9D4', padding: 16, font: { size: 12 } } }
      }
    }
  });
}

function renderDirectory(data) {
  // Households
  const resTbody = document.getElementById('resident-tbody');
  resTbody.innerHTML = '';
  if (!data.households || data.households.length === 0) {
    resTbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:32px;">No registered households yet. Click "+ Register Resident" to add one.</td></tr>';
  } else {
    data.households.forEach(h => {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="badge" style="background:rgba(255,255,255,0.08);color:#fff;">' + h.house_id + '</span></td>' +
        '<td style="font-weight:600;">' + h.owner_name + '</td>' +
        '<td style="font-family:monospace;color:var(--text-muted);">' + h.account_number + '</td>';
      resTbody.appendChild(tr);
    });
  }

  // Workers
  const workTbody = document.getElementById('worker-tbody');
  workTbody.innerHTML = '';
  if (!data.workers || data.workers.length === 0) {
    workTbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:32px;">No workers registered yet. Click "+ Register Worker" to add one.</td></tr>';
  } else {
    data.workers.forEach(w => {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="badge worker">' + w.worker_id + '</span></td>' +
        '<td style="font-weight:600;">' + w.name + '</td>' +
        '<td>' + w.role + '</td>';
      workTbody.appendChild(tr);
    });
  }
}

// Register Resident Modal
document.getElementById('btn-add-resident').addEventListener('click', () => {
  document.getElementById('modal-resident').classList.add('active');
});
document.getElementById('btn-res-cancel').addEventListener('click', () => {
  document.getElementById('modal-resident').classList.remove('active');
});
document.getElementById('btn-res-save').addEventListener('click', async () => {
  const name = document.getElementById('res-name').value.trim();
  const contact = document.getElementById('res-contact').value.trim();
  const password = document.getElementById('res-password').value.trim();
  if (!name || !password) {
    alert('Both Name and Password are required.');
    return;
  }
  const btn = document.getElementById('btn-res-save');
  btn.textContent = 'Saving...';
  btn.disabled = true;
  await fetch('/api/households/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
    body: JSON.stringify({ owner_name: name, contact: contact, password: password })
  });
  document.getElementById('modal-resident').classList.remove('active');
  document.getElementById('res-name').value = '';
  document.getElementById('res-contact').value = '';
  document.getElementById('res-password').value = '';
  btn.textContent = 'Save Resident';
  btn.disabled = false;
  fetchData(false);
});

// Register Worker Modal
document.getElementById('btn-add-worker').addEventListener('click', () => {
  document.getElementById('modal-worker').classList.add('active');
});
document.getElementById('btn-work-cancel').addEventListener('click', () => {
  document.getElementById('modal-worker').classList.remove('active');
});
document.getElementById('btn-work-save').addEventListener('click', async () => {
  const name = document.getElementById('work-name').value.trim();
  const wid = document.getElementById('work-id').value.trim();
  const contact = document.getElementById('work-contact').value.trim();
  const password = document.getElementById('work-password').value.trim();
  if (!name || !wid || !password) {
    alert('Name, Employee ID, and Password are required.');
    return;
  }
  const btn = document.getElementById('btn-work-save');
  btn.textContent = 'Saving...';
  btn.disabled = true;
  await fetch('/api/workers/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
    body: JSON.stringify({ name: name, worker_id: wid, contact: contact, password: password })
  });
  document.getElementById('modal-worker').classList.remove('active');
  document.getElementById('work-name').value = '';
  document.getElementById('work-id').value = '';
  document.getElementById('work-contact').value = '';
  document.getElementById('work-password').value = '';
  btn.textContent = 'Save Worker';
  btn.disabled = false;
  fetchData(false);
});

// IoT Simulator Sliders
const sliders = ['tank', 'turbidity', 'ph'];
let simTimeout;

sliders.forEach(s => {
  const el = document.getElementById('slider-' + s);
  const valEl = document.getElementById('sim-' + s + '-val');
  el.addEventListener('input', (e) => {
    const val = e.target.value;
    if (s === 'tank') valEl.textContent = val + '%';
    if (s === 'turbidity') valEl.textContent = val + ' NTU';
    if (s === 'ph') valEl.textContent = val;
    clearTimeout(simTimeout);
    simTimeout = setTimeout(() => broadcastSim(), 600);
  });
});

async function broadcastSim() {
  const tank = document.getElementById('slider-tank').value;
  const turb = document.getElementById('slider-turbidity').value;
  const ph = document.getElementById('slider-ph').value;
  await fetch('/api/central-assets/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
    body: JSON.stringify({
      main_tank_level: parseInt(tank),
      turbidity: parseFloat(turb),
      ph_level: parseFloat(ph)
    })
  });
  fetchData(true);
}

// Account Password Recovery Handlers
document.getElementById('btn-forgot-password').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('modal-forgot-pw').style.display = 'flex';
});

document.getElementById('btn-recover-cancel').addEventListener('click', () => {
  document.getElementById('modal-forgot-pw').style.display = 'none';
  document.getElementById('recover-username').value = '';
  document.getElementById('recover-contact').value = '';
  document.getElementById('recover-new-password').value = '';
});

document.getElementById('btn-recover-submit').addEventListener('click', async () => {
  const role = document.getElementById('recover-role').value;
  const username = document.getElementById('recover-username').value.trim();
  const contact = document.getElementById('recover-contact').value.trim();
  const newPassword = document.getElementById('recover-new-password').value.trim();

  if (!username || !contact || !newPassword) {
    alert('All recovery fields are required.');
    return;
  }

  const btn = document.getElementById('btn-recover-submit');
  btn.textContent = 'Resetting...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/recover-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: role,
        username: username,
        contact_no: contact,
        new_password: newPassword
      })
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.msg || 'Password updated successfully!');
      document.getElementById('modal-forgot-pw').style.display = 'none';
      document.getElementById('recover-username').value = '';
      document.getElementById('recover-contact').value = '';
      document.getElementById('recover-new-password').value = '';
    } else {
      alert(data.msg || 'Failed to verify recovery details.');
    }
  } catch (err) {
    alert('Connection error occurred.');
  } finally {
    btn.textContent = 'Reset Password';
    btn.disabled = false;
  }
});
