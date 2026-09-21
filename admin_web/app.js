let jwtToken = localStorage.getItem('admin_jwt');
let isServerOnline = false;
let globalData = {
  households: [],
  workers: [],
  billingRecords: [],
  announcements: [],
  maintenanceLogs: [],
  collectionsHistory: [],
  paymentSettings: {},
  residentReports: []
};
let charts = { collections: null, quality: null };

document.addEventListener('DOMContentLoaded', async () => {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEl = document.getElementById('current-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', dateOptions);

  // Bind offline retry button
  const retryBtn = document.getElementById('btn-admin-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', retryAdminConnection);
  }

  // Always verify server is alive first before displaying anything
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
    fetchData(false);
  }
});

async function checkServerHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('/api/health', { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);
    if (!res.ok) {
      isServerOnline = false;
      return false;
    }
    const data = await res.json().catch(() => null);
    isServerOnline = !!(data && data.status === 'ok');
    return isServerOnline;
  } catch (e) {
    isServerOnline = false;
    return false;
  }
}

/**
 * Automatically logs out the admin and purges all session/memory data.
 * Triggered whenever the backend server is turned off, disconnected, or unreachable.
 */
function performAutomaticLogoutDueToServerOffline() {
  const wasLoggedIn = !!jwtToken || !!localStorage.getItem('admin_jwt');

  // 1. Invalidate authentication credentials completely
  jwtToken = null;
  try {
    localStorage.removeItem('admin_jwt');
    sessionStorage.clear();
  } catch (_) {}

  // 2. Clear all sensitive in-memory data
  globalData = {
    households: [],
    workers: [],
    billingRecords: [],
    announcements: [],
    maintenanceLogs: [],
    collectionsHistory: [],
    paymentSettings: {},
    residentReports: []
  };

  // 3. Clear sensitive dashboard tables from DOM
  const tables = [
    'maintenance-tbody',
    'households-tbody',
    'workers-tbody',
    'billing-tbody',
    'collections-audit-tbody',
    'announcements-tbody',
    'reports-tbody'
  ];
  tables.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });

  // Reset user name display
  const authName = document.getElementById('auth-name');
  if (authName) authName.textContent = 'Admin';

  // 4. Destroy active chart instances
  if (charts.collections) {
    try { charts.collections.destroy(); } catch (_) {}
    charts.collections = null;
  }
  if (charts.quality) {
    try { charts.quality.destroy(); } catch (_) {}
    charts.quality = null;
  }

  // 5. Close any open modal dialogs
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.style.display = 'none';
    m.classList.remove('active');
  });

  // 6. Ensure login screen is staged behind the overlay
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) {
    loginScreen.style.display = 'flex';
  }
  const errEl = document.getElementById('login-error');
  if (errEl && wasLoggedIn) {
    errEl.textContent = 'Server was turned off. For security, your session was automatically logged out. Please log in again.';
    errEl.style.display = 'block';
  }
}

function showAdminOfflineOverlay() {
  isServerOnline = false;
  document.body.classList.add('server-offline');

  // Immediately execute automatic logout and data purge
  performAutomaticLogoutDueToServerOffline();

  const overlay = document.getElementById('admin-offline-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const statusText = document.getElementById('offline-status-text');
    if (statusText) statusText.textContent = 'Server is turned off. Access is locked.';
  }
}

function hideAdminOfflineOverlay() {
  isServerOnline = true;
  document.body.classList.remove('server-offline');
  const overlay = document.getElementById('admin-offline-overlay');
  if (overlay) overlay.style.display = 'none';
}

async function retryAdminConnection() {
  const btn = document.getElementById('btn-admin-retry');
  const statusText = document.getElementById('offline-status-text');
  if (btn) { btn.textContent = 'Contacting server...'; btn.disabled = true; }
  if (statusText) statusText.textContent = 'Testing connection to server...';

  const alive = await checkServerHealth();
  if (alive) {
    if (statusText) statusText.textContent = 'Server is running! Unlocking login...';
    hideAdminOfflineOverlay();
    showLogin();
    if (btn) {
      btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:8px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Retry Connection Now';
      btn.disabled = false;
    }
  } else {
    if (statusText) statusText.textContent = 'Server still offline. Verify backend server is started.';
    if (btn) {
      btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right:8px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Server Offline — Click to Retry';
      btn.disabled = false;
    }
  }
}

// Active Heartbeat & Real-Time Sync Loop (every 2.0 seconds)
setInterval(async () => {
  const alive = await checkServerHealth();

  if (!alive) {
    // If server went down, immediately lock the portal and log out
    if (isServerOnline || !document.body.classList.contains('server-offline')) {
      console.warn('[SECURITY] Backend server went offline. Locking Admin Portal and terminating session.');
      showAdminOfflineOverlay();
    }
  } else {
    // Server is online
    if (!isServerOnline || document.body.classList.contains('server-offline')) {
      console.info('[SYSTEM] Backend server restored. Lifting lockdown overlay.');
      hideAdminOfflineOverlay();
      showLogin(); // User was logged out; show login screen
    } else if (jwtToken && document.getElementById('login-screen')?.style.display === 'none') {
      fetchData(true);
    }
  }
}, 2000);

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
    // Connection error during login attempt
    console.error('Login request failed:', e);
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
  jwtToken = null;
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
    const titles = { 
      'tab-dashboard': 'System Overview', 
      'tab-directory': 'User Directory', 
      'tab-assets': 'IoT Control', 
      'tab-announcements': 'Public Announcements',
      'tab-billing': 'Billing & Collections Audit',
      'tab-payment-settings': 'Barangay Payment Configuration',
      'tab-reports': 'Citizen Incident Reports'
    };
    document.getElementById('page-title').textContent = titles[tabId] || 'Dashboard';
  });
});

async function fetchData(silent = false) {
  if (!jwtToken) {
    showLogin();
    if (!silent) hideLoader();
    return;
  }
  try {
    const res = await fetch('/api/all-data', {
      headers: { 'Authorization': 'Bearer ' + jwtToken }
    });

    if (res.status === 401) {
      localStorage.removeItem('admin_jwt');
      jwtToken = null;
      showLogin();
      if (!silent) hideLoader();
      return;
    }

    if (res.ok) {
      isServerOnline = true;
      hideAdminOfflineOverlay();
      const data = await res.json();
      globalData = data;
      renderDashboard(data);
      renderDirectory(data);
      renderAnnouncements(data.announcements || []);
      renderBilling(data.billingRecords || []);
      renderCollectionsHistory(data.collectionsHistory || []);
      renderPaymentSettings(data.paymentSettings || {});
      renderReports(data.residentReports || []);
    } else {
      // Non-ok response from server -> server in distress or down
      showAdminOfflineOverlay();
    }
    if (!silent) hideLoader();
  } catch (e) {
    // Network error: server turned off or disconnected
    console.warn('Backend server disconnected during fetchData:', e);
    showAdminOfflineOverlay();
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

  const labels = Object.keys(revByMonth).sort((a, b) => a.localeCompare(b)).slice(-5);
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
        '<td style="font-family:monospace;color:var(--text-muted);">' + h.account_number + '</td>' +
        '<td style="font-family:monospace;color:var(--text-muted);"><span class="pw-display">••••••••</span><button onclick="toggleRowPassword(this, \'' + (h.plain_password || '').replace(/'/g, "\\'") + '\')" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-left:8px;" title="Toggle Password">👁</button></td>' +
        '<td style="text-align:center;"><button onclick="deleteHousehold(\'' + h.house_id + '\')" style="background:none; border:none; color:var(--danger); cursor:pointer;" title="Remove Resident"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></td>';
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
      const deleteBtn = w.role === 'Admin' ? '' : '<button onclick="deleteWorker(\'' + w.worker_id + '\')" style="background:none; border:none; color:var(--danger); cursor:pointer;" title="Remove Worker"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>';
      tr.innerHTML =
        '<td><span class="badge worker">' + w.worker_id + '</span></td>' +
        '<td style="font-weight:600;">' + w.name + '</td>' +
        '<td>' + w.role + '</td>' +
        '<td style="font-family:monospace;color:var(--text-muted);"><span class="pw-display">••••••••</span><button onclick="toggleRowPassword(this, \'' + (w.plain_password || '').replace(/'/g, "\\'") + '\')" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-left:8px;" title="Toggle Password">👁</button></td>' +
        '<td style="text-align:center;">' + deleteBtn + '</td>';
      workTbody.appendChild(tr);
    });
  }
}

window.toggleRowPassword = function(btn, pw) {
  const span = btn.previousElementSibling;
  if (span.textContent === '••••••••') {
    span.textContent = pw;
    span.style.color = '#fff';
  } else {
    span.textContent = '••••••••';
    span.style.color = 'var(--text-muted)';
  }
};

window.deleteHousehold = async function(id) {
  if (confirm("Are you sure you want to remove this resident? This action cannot be undone.")) {
    try {
      const res = await fetch('/api/households/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + jwtToken }
      });
      if (res.ok) {
        fetchData(false);
      } else {
        const body = await res.json().catch(() => ({}));
        alert("Failed to delete resident.\nReason: " + (body.error || body.msg || res.status));
      }
    } catch (e) {
      console.warn('deleteHousehold failed, checking server:', e);
      const alive = await checkServerHealth();
      if (!alive) {
        showAdminOfflineOverlay();
      } else {
        alert("Error: " + e.message);
      }
    }
  }
};

window.deleteWorker = async function(id) {
  if (confirm("Are you sure you want to remove this worker? This action cannot be undone.")) {
    try {
      const res = await fetch('/api/workers/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + jwtToken }
      });
      if (res.ok) {
        fetchData(false);
      } else {
        const body = await res.json().catch(() => ({}));
        alert("Failed to delete worker.\nReason: " + (body.error || body.msg || res.status));
      }
    } catch (e) {
      console.warn('deleteWorker failed, checking server:', e);
      const alive = await checkServerHealth();
      if (!alive) {
        showAdminOfflineOverlay();
      } else {
        alert("Error: " + e.message);
      }
    }
  }
};

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

  try {
    const res = await fetch('/api/households/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
      body: JSON.stringify({ owner_name: name, contact: contact, password: password })
    });
    if (res.ok) {
      document.getElementById('modal-resident').classList.remove('active');
      document.getElementById('res-name').value = '';
      document.getElementById('res-contact').value = '';
      document.getElementById('res-password').value = '';
      fetchData(false);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.msg || 'Failed to add household');
    }
  } catch (e) {
    console.warn('Save resident failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!alive) {
      showAdminOfflineOverlay();
    } else {
      alert('Error saving resident: ' + e.message);
    }
  } finally {
    btn.textContent = 'Save Resident';
    btn.disabled = false;
  }
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

  try {
    const res = await fetch('/api/workers/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
      body: JSON.stringify({ name: name, worker_id: wid, contact: contact, password: password })
    });
    if (res.ok) {
      document.getElementById('modal-worker').classList.remove('active');
      document.getElementById('work-name').value = '';
      document.getElementById('work-id').value = '';
      document.getElementById('work-contact').value = '';
      document.getElementById('work-password').value = '';
      fetchData(false);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.msg || 'Failed to add worker');
    }
  } catch (e) {
    console.warn('Save worker failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!alive) {
      showAdminOfflineOverlay();
    } else {
      alert('Error saving worker: ' + e.message);
    }
  } finally {
    btn.textContent = 'Save Worker';
    btn.disabled = false;
  }
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
  try {
    await fetch('/api/central-assets/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
      body: JSON.stringify({
        main_tank_level: Number.parseInt(tank, 10),
        turbidity: Number.parseFloat(turb),
        ph_level: Number.parseFloat(ph)
      })
    });
    fetchData(true);
  } catch (e) {
    console.warn('Broadcast sim failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!alive) {
      showAdminOfflineOverlay();
    }
  }
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
    // Connection error during password recovery attempt
    console.error('Password recovery error:', err);
    alert('Connection error occurred.');
  } finally {
    btn.textContent = 'Reset Password';
    btn.disabled = false;
  }
});

function renderAnnouncements(announcements) {
  const tbody = document.getElementById('announcements-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!announcements || announcements.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding:32px;">No announcements broadcasted yet.</td></tr>';
    return;
  }
  announcements.forEach(item => {
    const tr = document.createElement('tr');
    const d = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now';
    const auth = item.author || 'Barangay Admin';
    const msg = item.message || '';
    tr.innerHTML =
      '<td style="color:var(--text-muted); font-size:13px;">' + d + '</td>' +
      '<td><span class="badge info" style="background:rgba(14,165,233,0.15); color:#38bdf8; border:1px solid rgba(14,165,233,0.3); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">' + auth + '</span></td>' +
      '<td style="font-weight:500; line-height:1.5;">' + msg + '</td>';
    tbody.appendChild(tr);
  });
}

document.getElementById('btn-admin-broadcast')?.addEventListener('click', async () => {
  const input = document.getElementById('admin-announcement-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) {
    alert('Please enter an announcement message.');
    return;
  }

  const btn = document.getElementById('btn-admin-broadcast');
  btn.textContent = 'Broadcasting...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/announcements/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        message: msg,
        author: 'Barangay Admin'
      })
    });

    if (res.ok) {
      input.value = '';
      alert('Announcement successfully broadcasted to all Worker and Resident apps!');
      fetchData(true);
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(errData.msg || 'Failed to broadcast announcement.');
    }
  } catch (err) {
    // Network or connection error while broadcasting announcement
    console.error('Broadcast error:', err);
    alert('Connection error occurred while broadcasting.');
  } finally {
    btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg> Broadcast Announcement';
    btn.disabled = false;
  }
});

// ==============================================================================
// Billing & Collections Renderers
// ==============================================================================
function renderBilling(records) {
  const tbody = document.getElementById('admin-billing-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!records || records.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:16px;">No billing statements recorded.</td></tr>';
    return;
  }
  records.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${b.bill_id}</strong></td>
      <td>${b.house_id}</td>
      <td><code>${b.account_number}</code></td>
      <td>${b.billing_month}</td>
      <td>${b.consumption} m³</td>
      <td><strong>₱${b.total_due.toFixed(2)}</strong></td>
      <td><span class="badge ${b.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${b.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCollectionsHistory(collections) {
  const tbody = document.getElementById('collections-history-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!collections || collections.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:16px;">No synchronized offline collections yet.</td></tr>';
    return;
  }
  collections.forEach(c => {
    const tr = document.createElement('tr');
    const amt = parseFloat(c.amount_collected || 0).toFixed(2);
    tr.innerHTML = `
      <td><code style="color:var(--accent-color);font-weight:700;">${c.transaction_id}</code></td>
      <td>${c.family_head_name || 'HH-' + c.household_id}</td>
      <td>${c.purok_name || 'Purok 1'}</td>
      <td><strong style="color:var(--success)">₱${amt}</strong></td>
      <td>${c.payment_method || 'Cash'}</td>
      <td>${c.collected_by}</td>
      <td><small style="color:var(--text-muted)">${c.collection_date}</small></td>
    `;
    tbody.appendChild(tr);
  });
}

// ==============================================================================
// Dynamic Payment Configuration (Admin Portal)
// ==============================================================================
function renderPaymentSettings(settings) {
  const locInput = document.getElementById('admin-set-location');
  const methodInput = document.getElementById('admin-set-method');
  const hoursInput = document.getElementById('admin-set-hours');
  const workerSelect = document.getElementById('admin-set-worker-collect');
  const instInput = document.getElementById('admin-set-instructions');

  if (locInput && settings.payment_location && document.activeElement !== locInput) {
    locInput.value = settings.payment_location;
  }
  if (methodInput && settings.payment_method && document.activeElement !== methodInput) {
    methodInput.value = settings.payment_method;
  }
  if (hoursInput && settings.operating_hours && document.activeElement !== hoursInput) {
    hoursInput.value = settings.operating_hours;
  }
  if (workerSelect && settings.allow_worker_collection && document.activeElement !== workerSelect) {
    workerSelect.value = settings.allow_worker_collection;
  }
  if (instInput && settings.payment_instructions && document.activeElement !== instInput) {
    instInput.value = settings.payment_instructions;
  }
}

document.getElementById('btn-save-payment-settings')?.addEventListener('click', async () => {
  const loc = document.getElementById('admin-set-location')?.value.trim();
  const method = document.getElementById('admin-set-method')?.value.trim();
  const hours = document.getElementById('admin-set-hours')?.value.trim();
  const worker = document.getElementById('admin-set-worker-collect')?.value;
  const inst = document.getElementById('admin-set-instructions')?.value.trim();

  const payload = {
    payment_location: loc || 'Barangay Tagpopongan Hall - Treasury Office',
    payment_method: method || 'In-Person Payment at Barangay Hall / Field Worker Collection',
    operating_hours: hours || 'Monday - Friday, 8:00 AM - 5:00 PM',
    allow_worker_collection: worker || 'true',
    payment_instructions: inst || 'Water bills are due on or before the 25th of each month.'
  };

  const btn = document.getElementById('btn-save-payment-settings');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/settings/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Payment configuration successfully saved to the online database!\nBoth Resident and Worker apps will now display the updated settings.');
      fetchData(true);
    } else {
      alert('Failed to update payment settings.');
    }
  } catch (e) {
    console.warn('Payment settings save failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!alive) {
      showAdminOfflineOverlay();
    } else {
      alert('Connection error occurred while saving payment settings.');
    }
  } finally {
    btn.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Save Payment Configuration';
    btn.disabled = false;
  }
});

// ==============================================================================
// Resident Incident Reports
// ==============================================================================
function renderReports(reports) {
  const tbody = document.getElementById('reports-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!reports || reports.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:16px;">No citizen incident reports filed.</td></tr>';
    return;
  }
  reports.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>REP-${r.report_id}</strong></td>
      <td>${r.family_head_name || r.household_id} (${r.purok_name || 'Purok 1'})</td>
      <td><span class="badge badge-warning">${r.report_type}</span></td>
      <td>${r.description}</td>
      <td><small style="color:var(--text-muted)">${r.created_at}</small></td>
      <td><span class="badge ${r.status === 'Resolved' ? 'badge-success' : 'badge-danger'}">${r.status}</span></td>
      <td>
        ${r.status !== 'Resolved' ? `<button class="btn" style="background:#10B981;color:white;padding:4px 10px;font-size:11px;" onclick="resolveReport(${r.report_id})">Mark Resolved</button>` : '<span style="color:var(--text-muted);font-size:11px;">Resolved</span>'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.resolveReport = async function(reportId) {
  try {
    const res = await fetch('/api/reports/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({ report_id: reportId, status: 'Resolved' })
    });
    if (res.ok) {
      fetchData(true);
    }
  } catch (e) {
    console.warn('Resolve report failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!alive) {
      showAdminOfflineOverlay();
    }
  }
};

