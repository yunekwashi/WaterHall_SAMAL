async function apiFetch(path, options = {}) {
  const token = jwtToken;
  const generation = sessionGeneration;
  const authorized = !!options.headers?.Authorization;
  const isCurrent = () => token === jwtToken && generation === sessionGeneration &&
    (!options.isCurrent || options.isCurrent());
  const controller = new AbortController();
  const timeoutMs = options.timeout || 30000;
  const timer = setTimeout(() => controller.abort(new DOMException('Request timeout', 'AbortError')), timeoutMs);

  let abortListener = null;
  if (options.signal) {
    if (options.signal.aborted) {
      controller.abort(options.signal.reason);
    } else {
      abortListener = () => controller.abort(options.signal.reason);
      options.signal.addEventListener('abort', abortListener, { once: true });
    }
  }

  try {
    const fetchOptions = { ...options, signal: controller.signal };
    delete fetchOptions.timeout;
    delete fetchOptions.isCurrent;
    const response = await fetch(path, fetchOptions);
    if (authorized && !isCurrent()) throw new Error('Session changed');
    if (controller.signal.aborted) throw controller.signal.reason;
    let invalidToken = response.status === 401;
    if (authorized && response.status === 422) {
      const body = await response.clone().json().catch(() => ({}));
      // JWT decoder messages only; unrelated form-validation 422s remain usable.
      invalidToken = typeof body.msg === 'string' && /^(Not enough segments|Signature verification failed|Invalid (header|payload|crypto) (string|padding)|Invalid token type|Invalid (subject|audience|issuer|claim format in token)|Subject must be a string|JWT ID must be a string|Algorithm not (specified|supported)|The specified alg value is not allowed|Token is not yet valid|Token has expired|Missing claim:)/i.test(body.msg);
      if (!isCurrent()) throw new Error('Session changed');
      if (controller.signal.aborted) throw controller.signal.reason;
    }
    if (authorized && invalidToken) {
      clearAdminSession('Session expired or invalid. Please sign in again.');
      throw new Error('Session expired');
    }
    return response;
  } finally {
    clearTimeout(timer);
    if (options.signal && abortListener) {
      try { options.signal.removeEventListener('abort', abortListener); } catch (_) {}
    }
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}

function setTableRowHtml(row, html) {
  // Standalone <td> fragments lose their cells when parsed outside a table.
  const fragment = DOMPurify.sanitize('<table><tbody><tr>' + html + '</tr></tbody></table>', {
    RETURN_DOM_FRAGMENT: true
  });
  const sanitizedRow = fragment.querySelector('tr');
  row.replaceChildren(...(sanitizedRow ? sanitizedRow.childNodes : []));
}
let jwtToken = localStorage.getItem('admin_jwt');
let sessionGeneration = 0;
let dataRequestGeneration = 0;
let loaderRequestGeneration = 0;
let isServerOnline = false;
let hasAdminData = false;
let renderedDirectoryData = null;
let renderedBillingData = null;
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
const reportPhotoViews = new Set();

function closeReportPhotoViews() {
  for (const view of reportPhotoViews) {
    view.controller.abort();
    if (view.url) URL.revokeObjectURL(view.url);
    view.popup.close();
  }
  reportPhotoViews.clear();
}

function invalidateAdminRequests() {
  closeReportPhotoViews();
  sessionGeneration++;
  dataRequestGeneration++;
  renderedDirectoryData = null;
  renderedBillingData = null;
  currentFetchController?.abort(new DOMException('Session ended', 'AbortError'));
  currentFetchController = null;
  isFetchingData = false;
}

function isCurrentAdminSession(token, generation) {
  return !!token && token === jwtToken && generation === sessionGeneration &&
    !document.body.classList.contains('server-offline');
}

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
  const generation = sessionGeneration;
  const serverAlive = await checkServerHealth();
  if (generation !== sessionGeneration) return;

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
  const generation = sessionGeneration;
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    isServerOnline = false;
    return false;
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(new DOMException('Health check timeout', 'AbortError')), 6000);
    const res = await fetch('/api/health', { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);
    if (!res.ok) {
      return await checkServerReadinessFallback(generation);
    }
    const data = await res.json().catch(() => null);
    if (generation !== sessionGeneration) return false;
    isServerOnline = !!(data && data.status === 'ok');
    if (!isServerOnline) {
      return await checkServerReadinessFallback(generation);
    }
    return true;
  } catch (e) {
    if (generation !== sessionGeneration) return false;
    return await checkServerReadinessFallback(generation);
  }
}

async function checkServerReadinessFallback(generation = sessionGeneration) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(new DOMException('Readiness check timeout', 'AbortError')), 5000);
    const res = await fetch('/api/ready', { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (generation !== sessionGeneration) return false;
      if (data && (data.status === 'ready' || data.status === 'ok')) {
        isServerOnline = true;
        return true;
      }
    }
    if (generation !== sessionGeneration) return false;
    isServerOnline = false;
    return false;
  } catch (_) {
    if (generation !== sessionGeneration) return false;
    isServerOnline = false;
    return false;
  }
}

window.addEventListener('offline', () => {
  console.warn('[SECURITY] Network offline event detected. Locking Admin Portal.');
  showAdminOfflineOverlay();
});

window.addEventListener('online', async () => {
  const generation = sessionGeneration;
  const alive = await checkServerHealth();
  if (generation !== sessionGeneration) return;
  if (alive) {
    hideAdminOfflineOverlay();
    showLogin();
  }
});

/**
 * Automatically logs out the admin and purges all session/memory data.
 * Triggered whenever the backend server is turned off, disconnected, or unreachable.
 */
function performAutomaticLogoutDueToServerOffline() {
  const wasLoggedIn = !!jwtToken || !!localStorage.getItem('admin_jwt');
  clearAdminSession(wasLoggedIn ? 'Server was turned off. For security, your session was automatically logged out. Please log in again.' : '');
}

function clearAdminSession(message = '') {
  invalidateAdminRequests();

  // 1. Invalidate authentication credentials completely
  jwtToken = null;
  const loginButton = document.getElementById('btn-login');
  if (loginButton) { loginButton.disabled = false; loginButton.textContent = 'Login to Dashboard'; }
  try {
    localStorage.removeItem('admin_jwt');
    sessionStorage.clear();
  } catch (_) {}

  ratesDirty = false;
  paymentSettingsDirty = false;
  paymentSettingsRevision++;
  hasAdminData = false;
  document.getElementById('billing-config-form')?.reset();
  // 2. Clear all sensitive in-memory data
  globalData = {
    households: [],
    workers: [],
    billingRecords: [],
    announcements: [],
    maintenanceLogs: [],
    collectionsHistory: [],
    paymentSettings: {},
    residentReports: [], puroks: [], billingConfig: {}, centralAssets: {}
  };

  // 3. Clear sensitive dashboard tables from DOM
  const tables = [
    'maintenance-tbody',
    'resident-tbody', 'worker-tbody', 'admin-billing-tbody',
    'collections-history-tbody',
    'announcements-tbody',
    'reports-tbody', 'registrations-tbody'
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
  pendingPaymentBill = null;
  document.querySelectorAll('.main-content input, .main-content textarea, .main-content select, .modal-overlay input, .modal-overlay textarea, .modal-overlay select').forEach(field => {
    if (field.tagName === 'SELECT') field.selectedIndex = 0;
    else field.value = '';
  });
  document.getElementById('login-password').value = '';
  document.getElementById('login-password').type = 'password';
  document.getElementById('eye-show').style.display = 'block';
  document.getElementById('eye-hide').style.display = 'none';
  document.getElementById('btn-toggle-pw').style.color = 'var(--text-muted)';
  for (const id of ['pay-modal-bill-id', 'pay-modal-household', 'pay-modal-cycle', 'pay-modal-date', 'pay-modal-amount', 'pay-modal-error', 'billing-config-status', 'registration-review-status']) {
    document.getElementById(id).textContent = '';
  }
  for (const id of ['stat-households', 'stat-workers', 'stat-bills']) document.getElementById(id).textContent = '0';
  for (const id of ['trend-households', 'trend-workers', 'trend-bills']) document.getElementById(id).textContent = '';
  renderReservoir({});
  for (const id of ['summary-level', 'summary-turbidity', 'summary-tds']) document.getElementById(id).textContent = 'Awaiting data';
  document.getElementById('admin-db-offline-banner').style.display = 'none';
  document.getElementById('btn-login-data-retry').style.display = 'none';
  document.getElementById('registration-load-status').textContent = '';

  // 6. Ensure login screen is staged behind the overlay
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) {
    loginScreen.style.display = 'flex';
  }
  const errEl = document.getElementById('login-error');
  if (errEl) {
    errEl.textContent = message;
    errEl.style.display = message ? 'block' : 'none';
  }
  showLogin();
}

function showAdminOfflineOverlay() {
  isServerOnline = false;
  document.body.classList.add('server-offline');

  // Immediately execute automatic logout and data purge
  performAutomaticLogoutDueToServerOffline();

  const overlay = document.getElementById('admin-offline-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const retryButton = document.getElementById('btn-admin-retry');
    if (retryButton) retryButton.disabled = false;
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
  const generation = sessionGeneration;
  const btn = document.getElementById('btn-admin-retry');
  const statusText = document.getElementById('offline-status-text');
  if (btn) { btn.textContent = 'Contacting server...'; btn.disabled = true; }
  if (statusText) statusText.textContent = 'Testing connection to server...';

  const alive = await checkServerHealth();
  if (generation !== sessionGeneration) return;
  if (alive) {
    consecutiveHealthFailures = 0;
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

// Active Heartbeat & Real-Time Sync Loop (every 3.5 seconds)
let isHeartbeatRunning = false;
let consecutiveHealthFailures = 0;

setInterval(async () => {
  if (isHeartbeatRunning) return;
  isHeartbeatRunning = true;
  try {
    const generation = sessionGeneration;
    const requestGeneration = dataRequestGeneration;
    const wasFetchingData = isFetchingData;
    const alive = await checkServerHealth();
    if (generation !== sessionGeneration) return;

    if (!alive) {
      consecutiveHealthFailures++;
      // Require 2 consecutive health failures to prevent transient network spikes from locking out
      if (consecutiveHealthFailures >= 2) {
        if (isServerOnline || !document.body.classList.contains('server-offline')) {
          console.warn('[SECURITY] Backend server went offline. Locking Admin Portal and terminating session.');
          showAdminOfflineOverlay();
        }
      }
    } else {
      consecutiveHealthFailures = 0;
      // Server is online
      if (!isServerOnline || document.body.classList.contains('server-offline')) {
        console.info('[SYSTEM] Backend server restored. Lifting lockdown overlay.');
        hideAdminOfflineOverlay();
        showLogin(); // User was logged out; show login screen
      } else if (jwtToken && document.getElementById('login-screen')?.style.display === 'none') {
        // Trigger background data sync only if no fetch is currently running
        if (!wasFetchingData && !isFetchingData && requestGeneration === dataRequestGeneration) {
          fetchData(true);
        }
      }
    }
  } finally {
    isHeartbeatRunning = false;
  }
}, 3500);

function showLogin() {
  const generation = sessionGeneration;
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('loading-overlay').style.opacity = '0';
  setTimeout(() => {
    if (generation === sessionGeneration) document.getElementById('loading-overlay').style.display = 'none';
  }, 500);
}

function hideLoader(isCurrent) {
  const generation = sessionGeneration;
  if (!isCurrent) isCurrent = () => generation === sessionGeneration;
  setTimeout(() => {
    if (!isCurrent()) return;
    document.getElementById('loading-overlay').style.opacity = '0';
    setTimeout(() => {
      if (isCurrent()) document.getElementById('loading-overlay').style.display = 'none';
    }, 500);
  }, 0);
}

document.getElementById('btn-login').addEventListener('click', async () => {
  let generation = sessionGeneration;
  const isCurrent = () => generation === sessionGeneration && !document.body.classList.contains('server-offline');
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

  // Strict check: if server is offline, abort immediately and lock portal
  const serverAlive = await checkServerHealth();
  if (generation !== sessionGeneration) return;
  if (!serverAlive) {
    btn.textContent = 'Login to Dashboard';
    btn.disabled = false;
    showAdminOfflineOverlay();
    return;
  }

  try {
    const res = await apiFetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    });
    if (!isCurrent()) return;
    if (res.ok) {
      const data = await res.json();
      if (!isCurrent()) return;
      if (data.role !== 'admin') {
        errEl.textContent = 'An administrator account is required.';
        errEl.style.display = 'block';
        return;
      }
      invalidateAdminRequests();
      generation = sessionGeneration;
      jwtToken = data.access_token;
      localStorage.setItem('admin_jwt', jwtToken);
      isServerOnline = true;
      document.getElementById('auth-name').textContent = data.name || 'Admin';
      document.getElementById('login-password').value = '';
      document.getElementById('loading-overlay').style.display = 'flex';
      document.getElementById('loading-overlay').style.opacity = '1';
      fetchData(false);
    } else {
      const errData = await res.json().catch(() => ({}));
      if (!isCurrent()) return;
      errEl.textContent = errData.msg || 'Invalid credentials. Please try again.';
      errEl.style.display = 'block';
    }
  } catch (e) {
    if (!isCurrent()) return;
    // Connection error during login attempt
    console.error('Login request failed:', e);
    const alive = await checkServerHealth();
    if (!isCurrent()) return;
    if (!alive) {
      errEl.textContent = 'Cannot connect to server. Is it running?';
      errEl.style.display = 'block';
      showAdminOfflineOverlay();
    } else {
      errEl.textContent = 'Login attempt was interrupted. Please check connection and try again.';
      errEl.style.display = 'block';
    }
  } finally {
    if (generation === sessionGeneration) {
      btn.textContent = 'Login to Dashboard';
      btn.disabled = false;
    }
  }
});

document.getElementById('btn-logout').addEventListener('click', () => {
  clearAdminSession();
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
      'tab-assets': 'Reservoir measurements',
      'tab-announcements': 'Public Announcements',
      'tab-billing': 'Billing & Collections Audit',
      'tab-payment-settings': 'Barangay Payment Configuration',
      'tab-reports': 'Citizen Incident Reports'
    };
    document.getElementById('page-title').textContent = titles[tabId] || 'Dashboard';
  });
});

let currentFetchController = null;
let isFetchingData = false;

function showAdminDataError() {
  const message = hasAdminData
    ? 'Admin data could not refresh. Displayed data may be out of date. Please retry.'
    : 'Admin data could not load. Please retry.';
  document.getElementById('admin-data-status').textContent = message;
  document.getElementById('admin-db-offline-banner').style.display = 'flex';
  if (document.getElementById('login-screen').style.display !== 'none') {
    const error = document.getElementById('login-error');
    error.textContent = message;
    error.style.display = 'block';
    document.getElementById('btn-login-data-retry').style.display = 'block';
  }
}

for (const id of ['btn-admin-data-retry', 'btn-login-data-retry']) {
  document.getElementById(id).addEventListener('click', () => fetchData(false));
}

async function fetchData(silent = false) {
  const sessionToken = jwtToken;
  const generation = sessionGeneration;
  if (document.body.classList.contains('server-offline')) return;
  if (!jwtToken) {
    showLogin();
    if (!silent) hideLoader();
    return;
  }

  // Prevent overlapping background fetches
  if (silent && isFetchingData) {
    return;
  }

  // If an interactive fetch is requested while one is running, abort the prior one gracefully
  if (!silent && currentFetchController) {
    currentFetchController.abort(new DOMException('Superseded by user request', 'AbortError'));
  }

  const fetchController = new AbortController();
  const requestGeneration = ++dataRequestGeneration;
  if (!silent) loaderRequestGeneration = requestGeneration;
  const isCurrent = () => isCurrentAdminSession(sessionToken, generation) &&
    requestGeneration === dataRequestGeneration;
  const ownsLoader = () => isCurrentAdminSession(sessionToken, generation) &&
    loaderRequestGeneration === requestGeneration;
  const canRender = () => isCurrent() && !fetchController.signal.aborted;
  currentFetchController = fetchController;
  isFetchingData = true;
  let loaded = false;

  try {
    const res = await apiFetch('/api/all-data?role=admin', {
      headers: { 'Authorization': 'Bearer ' + sessionToken },
      signal: fetchController.signal,
      timeout: 30000
    });

    if (!canRender()) return;
    if (res.ok) {
      const data = await res.json();
      if (!canRender()) return;
      if (!data || !['households', 'workers', 'billingRecords', 'maintenanceLogs', 'announcements', 'collectionsHistory', 'residentReports'].every(key => Array.isArray(data[key]))) {
        throw new Error('Invalid Admin data response');
      }
      globalData = data;
      renderBillingConfig(data.billingConfig || {});
      renderReservoir(data.centralAssets || {});
      renderDashboard(data);
      renderDirectory(data);
      renderAnnouncements(data.announcements || []);
      renderBilling(data.billingRecords || []);
      renderCollectionsHistory(data.collectionsHistory || []);
      renderPaymentSettings(data.paymentSettings || {});
      renderReports(data.residentReports || []);
      hasAdminData = true;
      loaded = true;
      document.getElementById('admin-db-offline-banner').style.display = 'none';
      document.getElementById('btn-login-data-retry').style.display = 'none';
      document.getElementById('login-error').style.display = 'none';
      loadRegistrations(canRender, fetchController.signal);
      // The protected Admin-only response validates a stored or fresh session.
      document.getElementById('login-screen').style.display = 'none';
    } else if (res.status === 403) {
      clearAdminSession('An administrator account is required. Please sign in again.');
    } else {
      // Non-ok response from server -> verify whether backend is truly down before showing offline overlay
      const alive = await checkServerHealth();
      if (!canRender()) return;
      if (!alive) {
        showAdminOfflineOverlay();
      } else {
        console.warn('Backend responded with HTTP ' + res.status + ', but health check passed.');
        showAdminDataError();
      }
    }
    if (!silent) hideLoader(ownsLoader);
    return loaded;
  } catch (e) {
    if (!isCurrent()) return;
    if (e.message === 'Session expired' || e.message === 'Session changed') {
      return;
    }

    // Check if error was caused by AbortController (replacement, timeout, or user navigation)
    const isAbort = e.name === 'AbortError' || fetchController.signal.aborted;
    if (isAbort) {
      console.info('fetchData request aborted/superseded without treating as server offline.');
      if (e.message === 'Request timeout') showAdminDataError();
      if (!silent) hideLoader(ownsLoader);
      return;
    }

    // Network error: verify if server is actually offline before logging out
    console.warn('Backend server error during fetchData:', e);
    const alive = await checkServerHealth();
    if (!isCurrent()) return;
    if (!alive) {
      showAdminOfflineOverlay();
    } else {
      console.info('Backend is alive (/api/health ok). Keeping admin session active despite transient fetchData error.');
      showAdminDataError();
    }
    if (!silent) hideLoader(ownsLoader);
  } finally {
    if (currentFetchController === fetchController) {
      currentFetchController = null;
      isFetchingData = false;
    }
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
        ? `<br><div style="margin-top:6px;"><img src="${escapeHtml(log.photo_base64)}" style="max-width:140px; max-height:90px; object-fit:cover; border-radius:6px; border:1px solid rgba(255,255,255,0.15); cursor:zoom-in;" data-report-photo="true" title="Click to view full image" /></div>`
        : '';

      setTableRowHtml(tr,
        '<td>' + escapeHtml(log.task_id) + '</td>' +
        '<td>' + escapeHtml(log.purok) + '</td>' +
        '<td>' + escapeHtml(log.description) + photoHtml + '</td>' +
        '<td>' + d + '</td>' +
        '<td>' + statusBadge + '</td>');
      tbody.appendChild(tr);
    });
  }
}

function renderCharts(data) {
  // Collections Line Chart
  const ctxColl = document.getElementById('collectionsChart').getContext('2d');
  if (charts.collections) charts.collections.destroy();

  // Five UTC calendar months, including the current month and zero receipts.
  const now = new Date();
  const labels = Array.from({length: 5}, (_, i) =>
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4 + i, 1)).toISOString().slice(0, 7));
  const revByMonth = Object.fromEntries(labels.map(month => [month, 0]));
  data.billingRecords.forEach(b => {
    if (b.status === 'Paid' && b.payment_date) {
      let timestamp = String(b.payment_date).replace(' ', 'T');
      if (/^\d{4}-\d{2}-\d{2}$/.test(timestamp)) timestamp += 'T00:00:00Z';
      else if (!/(Z|[+-]\d{2}:\d{2})$/i.test(timestamp)) timestamp += 'Z';
      const date = new Date(timestamp);
      if (Number.isNaN(date.getTime())) return;
      const month = date.toISOString().slice(0, 7);
      if (Object.hasOwn(revByMonth, month)) revByMonth[month] += Number(b.total_due);
    }
  });

  const revData = labels.map(l => revByMonth[l]);

  charts.collections = new Chart(ctxColl, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Collected Revenue',
        data: revData,
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

  // Measurements have different units; show values without a misleading part-to-whole chart.
  const ca = data.centralAssets || {has_reading: false};
  for (const [id, key, unit] of [['summary-level','main_tank_level','%'], ['summary-turbidity','turbidity',' NTU'], ['summary-tds','tds_ppm',' ppm']]) {
    document.getElementById(id).textContent = ca.has_reading && ca[key] != null ? String(ca[key]) + unit : 'Awaiting data';
  }
}

function renderDirectory(data) {
  const signature = JSON.stringify({households:data.households, workers:data.workers, puroks:data.puroks});
  if (signature === renderedDirectoryData) return;
  if (data.puroks && Array.isArray(data.puroks)) {
    populatePurokDropdown(data.puroks);
  }
  // Households
  const resTbody = document.getElementById('resident-tbody');
  resTbody.innerHTML = '';
  if (!data.households || data.households.length === 0) {
    resTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:32px;">No registered households yet. Click "+ Register Resident" to add one.</td></tr>';
  } else {
    data.households.forEach(h => {
      const tr = document.createElement('tr');
      setTableRowHtml(tr,
        '<td><span class="badge" style="background:rgba(255,255,255,0.08);color:#fff;">' + escapeHtml(h.house_id) + '</span></td>' +
        '<td style="font-weight:600;">' + escapeHtml(h.owner_name) + '</td>' +
        '<td style="font-family:monospace;color:var(--text-muted);">' + escapeHtml(h.account_number) + '</td>' +
        '<td style="color:var(--text-muted);">' + (h.purok || '—') + '</td>' +
        '<td class="no-print" style="text-align:center;"><button data-delete-household="' + escapeHtml(h.house_id) + '" style="background:none; border:none; color:var(--danger); cursor:pointer;" title="Remove Resident"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></td>');
      resTbody.appendChild(tr);
    });
  }

  // Workers
  const workTbody = document.getElementById('worker-tbody');
  workTbody.innerHTML = '';
  if (!data.workers || data.workers.length === 0) {
    workTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:32px;">No workers registered yet. Click "+ Register Worker" to add one.</td></tr>';
  } else {
    data.workers.forEach(w => {
      const tr = document.createElement('tr');
      const deleteBtn = w.role === 'Admin' ? '' : '<button data-delete-worker="' + escapeHtml(w.worker_id) + '" style="background:none; border:none; color:var(--danger); cursor:pointer;" title="Remove Worker"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>';
      setTableRowHtml(tr,
        '<td><span class="badge worker">' + escapeHtml(w.worker_id) + '</span></td>' +
        '<td style="font-weight:600;">' + escapeHtml(w.name) + '</td>' +
        '<td>' + escapeHtml(w.role) + '</td>' +
        '<td style="color:var(--text-muted);">' + (w.zone || '—') + '</td>' +
        '<td class="no-print" style="text-align:center;">' + deleteBtn + '</td>');
      workTbody.appendChild(tr);
    });
  }
  renderedDirectoryData = signature;
}



window.deleteHousehold = async function(id) {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  if (confirm("Are you sure you want to remove this resident? This action cannot be undone.")) {
    try {
      const res = await apiFetch('/api/households/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + jwtToken }
      });
      if (res.ok) {
        fetchData(false);
      } else {
        const body = await res.json().catch(() => ({}));
        if (!isCurrent()) return;
        alert("Failed to delete resident.\nReason: " + (body.error || body.msg || res.status));
      }
    } catch (e) {
      if (!isCurrent()) return;
      console.warn('deleteHousehold failed, checking server:', e);
      const alive = await checkServerHealth();
      if (!isCurrent()) return;
      if (!alive) {
        showAdminOfflineOverlay();
      } else {
        alert("Error: " + e.message);
      }
    }
  }
};

window.deleteWorker = async function(id) {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  if (confirm("Are you sure you want to remove this worker? This action cannot be undone.")) {
    try {
      const res = await apiFetch('/api/workers/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + jwtToken }
      });
      if (res.ok) {
        fetchData(false);
      } else {
        const body = await res.json().catch(() => ({}));
        if (!isCurrent()) return;
        alert("Failed to delete worker.\nReason: " + (body.error || body.msg || res.status));
      }
    } catch (e) {
      if (!isCurrent()) return;
      console.warn('deleteWorker failed, checking server:', e);
      const alive = await checkServerHealth();
      if (!isCurrent()) return;
      if (!alive) {
        showAdminOfflineOverlay();
      } else {
        alert("Error: " + e.message);
      }
    }
  }
};

function populatePurokDropdown(puroks) {
  const select = document.getElementById('res-purok');
  if (!select) return;
  const currentVal = select.value;
  select.innerHTML = '';
  const list = (puroks && puroks.length > 0) ? puroks : ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6', 'Purok 7', 'Purok 8'];
  list.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    if (p === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

// Register Resident Modal
document.getElementById('btn-add-resident').addEventListener('click', () => {
  if (globalData && globalData.puroks) {
    populatePurokDropdown(globalData.puroks);
  }
  document.getElementById('modal-resident').classList.add('active');
});
document.getElementById('btn-res-cancel').addEventListener('click', () => {
  document.getElementById('modal-resident').classList.remove('active');
});
document.getElementById('btn-res-save').addEventListener('click', async () => {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const name = document.getElementById('res-name').value.trim();
  const contact = document.getElementById('res-contact').value.trim();
  const purok = document.getElementById('res-purok').value.trim();
  const password = document.getElementById('res-password').value;
  const verifyPassword = document.getElementById('res-verify-password').value;

  if (!name) {
    alert('Full Name is required.');
    return;
  }
  if (!contact) {
    alert('Contact Number is required.');
    return;
  }
  if (!purok) {
    alert('Assigned Purok is required.');
    return;
  }
  if (!password || !verifyPassword) {
    alert('Both Password and Verify Password are required.');
    return;
  }
  if (password !== verifyPassword) {
    alert('Passwords do not match.');
    return;
  }
  if (password.length < 12 || password.length > 128) {
    alert('Password must contain 12 to 128 characters.');
    return;
  }

  const btn = document.getElementById('btn-res-save');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    const res = await apiFetch('/api/households/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
      body: JSON.stringify({ owner_name: name, contact: contact, purok: purok, password: password, verify_password: verifyPassword })
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (!isCurrent()) return;
      document.getElementById('modal-resident').classList.remove('active');
      document.getElementById('res-name').value = '';
      document.getElementById('res-contact').value = '';
      document.getElementById('res-password').value = '';
      document.getElementById('res-verify-password').value = '';
      fetchData(false);
      alert(`Household registered successfully!\nResident ID: ${data.account_number || data.house_id}`);
    } else {
      const err = await res.json().catch(() => ({}));
      if (!isCurrent()) return;
      alert(err.msg || 'Failed to add household');
    }
  } catch (e) {
    if (!isCurrent()) return;
    console.warn('Save resident failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!isCurrent()) return;
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
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const name = document.getElementById('work-name').value.trim();
  const contact = document.getElementById('work-contact').value.trim();
  const role = document.getElementById('work-role').value.trim();
  const password = document.getElementById('work-password').value;
  const verifyPassword = document.getElementById('work-verify-password').value;

  if (!name) {
    alert('Full Name is required.');
    return;
  }
  if (!contact) {
    alert('Contact Number is required.');
    return;
  }
  if (!role) {
    alert('Role is required.');
    return;
  }
  if (!password || !verifyPassword) {
    alert('Both Password and Verify Password are required.');
    return;
  }
  if (password !== verifyPassword) {
    alert('Passwords do not match.');
    return;
  }
  if (password.length < 12 || password.length > 128) {
    alert('Password must contain 12 to 128 characters.');
    return;
  }

  const btn = document.getElementById('btn-work-save');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    const res = await apiFetch('/api/workers/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtToken },
      body: JSON.stringify({ name: name, contact: contact, role: role, password: password, verify_password: verifyPassword })
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (!isCurrent()) return;
      document.getElementById('modal-worker').classList.remove('active');
      document.getElementById('work-name').value = '';
      document.getElementById('work-contact').value = '';
      document.getElementById('work-password').value = '';
      document.getElementById('work-verify-password').value = '';
      fetchData(false);
      alert(`Field worker registered successfully!\nEmployee ID: ${data.worker_id || data.employee_id}`);
    } else {
      const err = await res.json().catch(() => ({}));
      if (!isCurrent()) return;
      alert(err.msg || 'Failed to add worker');
    }
  } catch (e) {
    if (!isCurrent()) return;
    console.warn('Save worker failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!isCurrent()) return;
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
    const res = await apiFetch('/api/recover-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: role,
        username: username,
        reset_token: contact,
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
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:32px;">No announcements broadcasted yet.</td></tr>';
    return;
  }
  announcements.forEach(item => {
    const tr = document.createElement('tr');
    const d = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now';
    const auth = item.author || 'Barangay Admin';
    const msg = item.message || '';
    const audience = item.target_audience || 'Everyone';

    let audienceBadge = '<span class="badge" style="background:rgba(59,130,246,0.15); color:#60a5fa; border:1px solid rgba(59,130,246,0.3); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">Everyone</span>';
    if (audience === 'Workers only') {
      audienceBadge = '<span class="badge" style="background:rgba(245,158,11,0.15); color:#f59e0b; border:1px solid rgba(245,158,11,0.3); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">Workers only</span>';
    } else if (audience === 'Residents only') {
      audienceBadge = '<span class="badge" style="background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">Residents only</span>';
    }

    let authBadge = '<span class="badge info" style="background:rgba(14,165,233,0.15); color:#38bdf8; border:1px solid rgba(14,165,233,0.3); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">' + escapeHtml(auth) + '</span>';
    if (auth.toLowerCase().includes('sensor') || auth.toLowerCase().includes('alert')) {
      authBadge = '<span class="badge alert" style="background:rgba(239,68,68,0.15); color:#f87171; border:1px solid rgba(239,68,68,0.3); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600;">' + escapeHtml(auth) + '</span>';
    }

    setTableRowHtml(tr,
      '<td style="color:var(--text-muted); font-size:13px;">' + d + '</td>' +
      '<td>' + authBadge + '</td>' +
      '<td>' + audienceBadge + '</td>' +
      '<td style="font-weight:500; line-height:1.5;">' + escapeHtml(msg) + '</td>');
    tbody.appendChild(tr);
  });
}

document.getElementById('btn-admin-broadcast')?.addEventListener('click', async () => {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const input = document.getElementById('admin-announcement-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) {
    alert('Please enter an announcement message.');
    return;
  }

  const audienceSelect = document.getElementById('admin-announcement-audience');
  const audience = audienceSelect ? audienceSelect.value : 'Everyone';

  const btn = document.getElementById('btn-admin-broadcast');
  btn.textContent = 'Broadcasting...';
  btn.disabled = true;

  try {
    const res = await apiFetch('/api/announcements/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        operation_id: crypto.randomUUID(),
        message: msg,
        author: 'Barangay Admin',
        target_audience: audience
      })
    });

    if (res.ok) {
      input.value = '';
      alert(`Announcement successfully broadcasted to ${audience}!`);
      fetchData(true);
    } else {
      const errData = await res.json().catch(() => ({}));
      if (!isCurrent()) return;
      alert(errData.msg || 'Failed to broadcast announcement.');
    }
  } catch (err) {
    if (!isCurrent()) return;
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
// In-Office Admin Payment Processing Modal & Handlers
// ==============================================================================
let pendingPaymentBill = null;

function openMarkAsPaidModal({ billId, houseId, cycle, amount, familyHead }) {
  pendingPaymentBill = { billId, houseId, cycle, amount, familyHead };
  const modal = document.getElementById('modal-mark-paid');
  if (!modal) return;

  const billElem = document.getElementById('pay-modal-bill-id');
  const hhElem = document.getElementById('pay-modal-household');
  const cycleElem = document.getElementById('pay-modal-cycle');
  const dateElem = document.getElementById('pay-modal-date');
  const amtElem = document.getElementById('pay-modal-amount');
  const errDiv = document.getElementById('pay-modal-error');
  const confirmBtn = document.getElementById('btn-pay-modal-confirm');

  if (billElem) billElem.textContent = billId;
  if (hhElem) hhElem.textContent = familyHead ? `${familyHead} (${houseId})` : houseId;
  if (cycleElem) cycleElem.textContent = cycle || 'Current Cycle';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (dateElem) dateElem.textContent = dateStr;
  if (amtElem) amtElem.textContent = '₱' + parseFloat(amount).toFixed(2);

  if (errDiv) {
    errDiv.style.display = 'none';
    errDiv.textContent = '';
  }
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.textContent = 'Confirm Payment';
  }

  modal.classList.add('active');
}

function closeMarkAsPaidModal() {
  const modal = document.getElementById('modal-mark-paid');
  if (modal) modal.classList.remove('active');
  pendingPaymentBill = null;
}

document.getElementById('btn-pay-modal-cancel')?.addEventListener('click', closeMarkAsPaidModal);

document.getElementById('btn-pay-modal-confirm')?.addEventListener('click', async () => {
  if (!pendingPaymentBill) return;
  const bill = { ...pendingPaymentBill };
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const confirmBtn = document.getElementById('btn-pay-modal-confirm');
  const errDiv = document.getElementById('pay-modal-error');
  const methodSelect = document.getElementById('pay-modal-method');
  const paymentMethod = methodSelect ? methodSelect.value : 'Cash (Barangay Hall)';

  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Recording Payment...';
  }
  if (errDiv) errDiv.style.display = 'none';

  try {
    const res = await apiFetch('/api/admin/billing/mark-paid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        bill_id: bill.billId,
        payment_method: paymentMethod,
        payment_date: new Date().toISOString()
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (!isCurrent()) return;
      const billId = data.bill_id ?? bill.billId;
      const amount = data.amount_paid ?? bill.amount;
      closeMarkAsPaidModal();
      await fetchData();
      if (!isCurrent()) return;
      alert(`Payment for ${billId} (₱${parseFloat(amount).toFixed(2)}) has been officially confirmed and settled at Barangay Hall.`);
    } else {
      const err = await res.json().catch(() => ({ msg: 'Payment processing failed.' }));
      if (!isCurrent()) return;
      if (errDiv) {
        errDiv.textContent = err.msg || 'Unable to confirm payment. Please check server status.';
        errDiv.style.display = 'block';
      }
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Confirm Payment';
      }
    }
  } catch (err) {
    if (!isCurrent()) return;
    if (errDiv) {
      errDiv.textContent = 'Network or server error while recording payment.';
      errDiv.style.display = 'block';
    }
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Confirm Payment';
    }
  }
});

function renderBilling(records) {
  const signature = JSON.stringify(records || []);
  if (signature === renderedBillingData) return;
  const tbody = document.getElementById('admin-billing-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!records || records.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:16px;">No billing statements recorded.</td></tr>';
    renderedBillingData = signature;
    return;
  }
  records.forEach(b => {
    const tr = document.createElement('tr');
    const isPaid = b.status === 'Paid';
    const actionCell = isPaid
      ? `<span class="badge badge-success" style="opacity:0.85;display:inline-block;font-size:12px;padding:4px 10px;">Paid</span>`
      : `<button type="button" class="btn btn-sm btn-mark-paid" style="padding:6px 14px;font-size:12px;border-radius:8px;background:linear-gradient(135deg,#10B981,#059669);color:white;cursor:pointer;border:none;font-weight:700;box-shadow:0 2px 6px rgba(16,185,129,0.3);" data-bill-id="${escapeHtml(b.bill_id)}" data-house-id="${escapeHtml(b.house_id)}" data-cycle="${escapeHtml(b.billing_month || '')}" data-amount="${b.total_due.toFixed(2)}" data-family-head="${escapeHtml(b.family_head_name || '')}">Mark as Paid</button>`;

    setTableRowHtml(tr, `
      <td><strong>${escapeHtml(b.bill_id)}</strong></td>
      <td>${escapeHtml(b.family_head_name ? b.family_head_name + ' (' + b.house_id + ')' : b.house_id)}</td>
      <td><code>${escapeHtml(b.account_number)}</code></td>
      <td>${escapeHtml(b.billing_month)}</td>
      <td>${b.consumption} m³</td>
      <td><strong>₱${b.total_due.toFixed(2)}</strong></td>
      <td><span class="badge ${isPaid ? 'badge-success' : 'badge-warning'}">${escapeHtml(b.status)}</span></td>
      <td class="no-print" style="text-align:center;">${actionCell}</td>
    `);
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-mark-paid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const billId = btn.getAttribute('data-bill-id');
      const houseId = btn.getAttribute('data-house-id');
      const cycle = btn.getAttribute('data-cycle');
      const amount = btn.getAttribute('data-amount');
      const familyHead = btn.getAttribute('data-family-head');
      openMarkAsPaidModal({ billId, houseId, cycle, amount, familyHead });
    });
  });
  renderedBillingData = signature;
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
    setTableRowHtml(tr, `
      <td><code style="color:var(--accent-color);font-weight:700;">${escapeHtml(c.transaction_id)}</code></td>
      <td>${escapeHtml(c.family_head_name || 'HH-' + c.household_id)}</td>
      <td>${escapeHtml(c.purok_name || '—')}</td>
      <td><strong style="color:var(--success)">₱${amt}</strong></td>
      <td>${escapeHtml(c.payment_method || 'Cash')}</td>
      <td>${escapeHtml(c.collected_by)}</td>
      <td><small style="color:var(--text-muted)">${escapeHtml(c.collection_date)}</small></td>
    `);
    tbody.appendChild(tr);
  });
}

// ==============================================================================
// Dynamic Payment Configuration (Admin Portal)
// ==============================================================================
let paymentSettingsDirty = false;
let paymentSettingsRevision = 0;
for (const id of ['admin-set-location', 'admin-set-method', 'admin-set-hours', 'admin-set-worker-collect', 'admin-set-instructions']) {
  for (const event of ['input', 'change']) document.getElementById(id).addEventListener(event, () => {
    paymentSettingsDirty = true;
    paymentSettingsRevision++;
  });
}

function renderPaymentSettings(settings) {
  if (paymentSettingsDirty) return;
  const locInput = document.getElementById('admin-set-location');
  const methodInput = document.getElementById('admin-set-method');
  const hoursInput = document.getElementById('admin-set-hours');
  const workerSelect = document.getElementById('admin-set-worker-collect');
  const instInput = document.getElementById('admin-set-instructions');

  if (locInput && settings.payment_location != null) {
    locInput.value = settings.payment_location;
  }
  if (methodInput && settings.payment_method != null) {
    methodInput.value = settings.payment_method;
  }
  if (hoursInput && settings.operating_hours != null) {
    hoursInput.value = settings.operating_hours;
  }
  if (workerSelect && settings.allow_worker_collection != null) {
    workerSelect.value = String(settings.allow_worker_collection);
  }
  if (instInput && settings.payment_instructions != null) {
    instInput.value = settings.payment_instructions;
  }
}

document.getElementById('btn-save-payment-settings')?.addEventListener('click', async () => {
  const token = jwtToken;
  const generation = sessionGeneration;
  const revision = paymentSettingsRevision;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const loc = document.getElementById('admin-set-location')?.value.trim();
  const method = document.getElementById('admin-set-method')?.value.trim();
  const hours = document.getElementById('admin-set-hours')?.value.trim();
  const worker = document.getElementById('admin-set-worker-collect')?.value;
  const inst = document.getElementById('admin-set-instructions')?.value.trim();

  const payload = {
    payment_location: loc || 'Barangay Tagpopongan Hall - Treasury Office',
    payment_method: method || 'In-Person Payment at Barangay Hall / Field Worker Collection',
    operating_hours: hours || 'Monday - Friday, 8:00 AM - 5:00 PM',
    allow_worker_collection: worker || 'false',
    payment_instructions: inst || 'Water bills are due on or before the 25th of each month.'
  };

  const btn = document.getElementById('btn-save-payment-settings');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    const res = await apiFetch('/api/settings/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      if (!isCurrent()) return;
      const refreshed = await fetchData(false);
      if (!isCurrent()) return;
      if (refreshed && revision === paymentSettingsRevision) {
        paymentSettingsDirty = false;
        renderPaymentSettings(globalData.paymentSettings || {});
      }
      alert('Payment configuration successfully saved to the online database!\nBoth Resident and Worker apps will now display the updated settings.');
    } else {
      alert('Failed to update payment settings.');
    }
  } catch (e) {
    if (!isCurrent()) return;
    console.warn('Payment settings save failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!isCurrent()) return;
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
    setTableRowHtml(tr, `
      <td><strong>REP-${r.report_id}</strong></td>
      <td>${escapeHtml(r.family_head_name || r.household_id)} (${escapeHtml(r.purok_name || 'Purok 1')})</td>
      <td><span class="badge badge-warning">${escapeHtml(r.report_type)}</span></td>
      <td>${escapeHtml(r.description)}${r.has_photo ? `<br><button type="button" class="btn btn-secondary" data-view-report-photo="${escapeHtml(r.report_id)}" style="margin-top:6px;padding:4px 10px;font-size:11px;">View photo evidence</button>` : ''}</td>
      <td><small style="color:var(--text-muted)">${escapeHtml(r.created_at)}</small></td>
      <td><span class="badge ${r.status === 'Resolved' ? 'badge-success' : 'badge-danger'}">${escapeHtml(r.status)}</span></td>
      <td class="no-print">
        ${r.status !== 'Resolved' ? `<button class="btn" style="background:#10B981;color:white;padding:4px 10px;font-size:11px;" data-resolve-report="${r.report_id}">Mark Resolved</button>` : '<span style="color:var(--text-muted);font-size:11px;">Resolved</span>'}
      </td>
    `);
    tbody.appendChild(tr);
  });
}

async function openReportPhoto(button) {
  const reportId = button.dataset.viewReportPhoto;
  if (!/^[1-9][0-9]{0,9}$/.test(reportId) || button.disabled) return;
  const token = jwtToken;
  const generation = sessionGeneration;
  if (!isCurrentAdminSession(token, generation)) return;
  const popup = window.open('', '_blank');
  if (!popup) {
    alert('Allow pop-ups for WaterHall to view report photo evidence.');
    return;
  }
  popup.opener = null;
  popup.document.title = 'WaterHall report REP-' + reportId;
  const status = popup.document.createElement('p');
  status.textContent = 'Loading photo evidence…';
  popup.document.body.appendChild(status);
  const view = { popup, controller: new AbortController(), url: null };
  reportPhotoViews.add(view);
  const isCurrent = () => isCurrentAdminSession(token, generation) && reportPhotoViews.has(view) && !popup.closed;
  popup.addEventListener('pagehide', () => {
    view.controller.abort();
    if (view.url) URL.revokeObjectURL(view.url);
    reportPhotoViews.delete(view);
  }, { once: true });
  button.disabled = true;
  button.textContent = 'Loading photo…';
  try {
    const response = await apiFetch('/api/reports/' + reportId + '/photo', {
      headers: { Authorization: 'Bearer ' + token }, signal: view.controller.signal, isCurrent
    });
    if (!isCurrent()) return;
    if (!response.ok) throw new Error(response.status === 404 ? 'Photo evidence was not found.' :
      response.status === 403 ? 'You do not have permission to view this photo.' :
      'Photo evidence is unavailable. Close this window and try again.');
    const blob = await response.blob();
    if (!isCurrent()) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(blob.type) || blob.size > 3 * 1024 * 1024) {
      throw new Error('The photo response could not be displayed safely.');
    }
    view.url = URL.createObjectURL(blob);
    const photo = popup.document.createElement('img');
    photo.alt = 'Report REP-' + reportId + ' evidence';
    photo.style.maxWidth = '100%';
    photo.src = view.url;
    photo.addEventListener('error', () => {
      if (isCurrent()) popup.document.body.replaceChildren(Object.assign(popup.document.createElement('p'), {
        textContent: 'Photo evidence could not be displayed. Close this window and try again.'
      }));
    }, { once: true });
    popup.document.body.replaceChildren(photo);
  } catch (error) {
    if (isCurrent()) status.textContent = error.name === 'AbortError'
      ? 'Photo request timed out. Close this window and try again.'
      : error.message === 'Failed to fetch' ? 'Check your connection and try opening the photo again.' : error.message;
  } finally {
    if (isCurrentAdminSession(token, generation) && button.isConnected) {
      button.disabled = false;
      button.textContent = 'View photo evidence';
    }
  }
}

window.resolveReport = async function(reportId) {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  try {
    const res = await apiFetch('/api/reports/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({ report_id: reportId, status: 'Resolved' })
    });
    if (!isCurrent()) return;
    if (res.ok) fetchData(true);
    else alert('Unable to resolve this report. Refresh the current data and try again.');
  } catch (e) {
    if (!isCurrent()) return;
    console.warn('Resolve report failed, checking server:', e);
    const alive = await checkServerHealth();
    if (!isCurrent()) return;
    if (!alive) {
      showAdminOfflineOverlay();
    } else {
      alert('Unable to resolve this report. Check your connection and try again.');
    }
  }
};


// Only trusted code handles actions; never execute handlers from stored report text.
document.addEventListener('click', event => {
  const button = event.target.closest('[data-delete-household], [data-delete-worker], [data-resolve-report], [data-view-report-photo]');
  if (!button) return;
  if (button.dataset.deleteHousehold) window.deleteHousehold(button.dataset.deleteHousehold);
  if (button.dataset.deleteWorker) window.deleteWorker(button.dataset.deleteWorker);
  if (button.dataset.resolveReport) window.resolveReport(Number(button.dataset.resolveReport));
  if (button.dataset.viewReportPhoto) openReportPhoto(button);
});

document.addEventListener('click', event => {
  if (!event.target.matches('img[data-report-photo]')) return;
  const popup = window.open('', '_blank');
  if (popup) {
    popup.opener = null;
    const photo = popup.document.createElement('img');
    photo.src = event.target.src;
    photo.style.maxWidth = '100%';
    popup.document.body.appendChild(photo);
  }
});

const rateFields = ['base_rate', 'included_m3', 'environmental_fee', 'excess_rate'];
let ratesDirty = false;
document.getElementById('billing-config-form').addEventListener('input', () => { ratesDirty = true; });
function renderBillingConfig(config) {
  if (ratesDirty) return;
  for (const field of rateFields) document.getElementById('rate-' + field).value = config[field] ?? '';
  document.getElementById('billing-config-status').textContent = config.configured
    ? 'Confirmed rate version ' + config.version + '. Existing bills retain their recorded rates.'
    : 'Unconfirmed sample rates. Admin must enter and confirm the official rates.';
}
function renderReservoir(data) {
  const present = data.has_reading === true;
  for (const [id, key, unit] of [['admin-water-level', 'main_tank_level', '%'], ['admin-turbidity', 'turbidity', ' NTU'], ['admin-tds', 'tds_ppm', ' ppm'], ['admin-reading-time', 'last_updated', '']]) {
    document.getElementById(id).textContent = present && data[key] != null ? String(data[key]) + unit : 'Awaiting data';
  }
}
document.getElementById('billing-config-form').addEventListener('submit', async event => {
  event.preventDefault();
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const button = document.getElementById('save-billing-config');
  if (button.disabled || !event.target.reportValidity()) return;
  button.disabled = true;
  const status = document.getElementById('billing-config-status');
  try {
    const body = Object.fromEntries(rateFields.map(field => [field, document.getElementById('rate-' + field).value]));
    const response = await apiFetch('/api/settings/billing', {method: 'POST', headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + jwtToken}, body: JSON.stringify(body)});
    if (!isCurrent()) return;
    if (!response.ok) throw new Error('Rates were not saved. Check all four non-negative values.');
    const data = await response.json();
    if (!isCurrent()) return;
    ratesDirty = false;
    renderBillingConfig(data.configuration);
  } catch (_) { if (isCurrent()) status.textContent = 'Rates were not confirmed. Check your session, connection and values, then retry.'; }
  finally { button.disabled = false; }
});
async function loadRegistrations(isCurrentRequest = () => true, signal) {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation) && isCurrentRequest();
  try {
    const response = await apiFetch('/api/residents/registrations', {headers: {Authorization: 'Bearer ' + token}, signal, isCurrent});
    if (!isCurrent()) return;
    if (!response.ok) throw new Error('Registrations unavailable');
    const data = await response.json();
    if (!isCurrent()) return;
    if (!Array.isArray(data.registrations)) throw new Error('Invalid registrations response');
    document.getElementById('registrations-tbody').innerHTML = data.registrations.map(row => `<tr>
    <td>${escapeHtml(row.house_id)}</td><td>${escapeHtml(row.family_head_name)}${row.possible_same_name ? '<br><strong>Possible same name ? review</strong>' : ''}${row.possible_duplicate_contact ? '<br><strong>Legacy duplicate contact ? review</strong>' : ''}</td>
    <td>${escapeHtml(row.contact_no)}</td><td>${escapeHtml(row.purok_name)}</td><td>${escapeHtml(row.account_status)}</td>
    <td class="no-print">${row.account_status === 'pending' ? `<button type="button" class="btn" data-review-id="${escapeHtml(row.house_id)}" data-review-status="approved">Approve</button> <button type="button" data-review-id="${escapeHtml(row.house_id)}" data-review-status="rejected">Reject</button>` : 'Reviewed'}</td></tr>`).join('') || '<tr><td colspan="6">No resident registrations.</td></tr>';
    document.getElementById('registration-load-status').textContent = '';
  } catch (_) {
    if (isCurrent()) document.getElementById('registration-load-status').textContent = 'Registrations could not refresh. Any displayed registrations may be out of date. Retry by refreshing Admin data.';
  }
}
document.getElementById('registrations-tbody').addEventListener('click', async event => {
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const button = event.target.closest('[data-review-id]');
  if (!button || button.disabled) return;
  const action = button.dataset.reviewStatus === 'approved' ? 'approve' : 'reject';
  if (!window.confirm('Confirm you want to ' + action + ' registration ' + button.dataset.reviewId + '?')) return;
  const buttons = [...button.closest('tr').querySelectorAll('button')];
  buttons.forEach(item => item.disabled = true);
  const status = document.getElementById('registration-review-status');
  try {
    const response = await apiFetch('/api/residents/review', {method: 'POST', headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + jwtToken}, body: JSON.stringify({house_id: button.dataset.reviewId, status: button.dataset.reviewStatus})});
    if (!isCurrent()) return;
    status.textContent = response.ok ? 'Registration ' + button.dataset.reviewStatus + '.' : 'Review was not saved. Refresh and check the current status.';
    await fetchData(true);
  } catch (_) { if (isCurrent()) status.textContent = 'Review was not confirmed. Check connection and refresh before retrying.'; }
  finally { buttons.forEach(item => item.disabled = false); }
});

// --- Reporting & Export Functionality ---
async function triggerReportExport(reportType, format, filters = {}, triggerButton = null) {
  if (!jwtToken) {
    alert('Please sign in as Administrator to export records.');
    return;
  }
  const token = jwtToken;
  const generation = sessionGeneration;
  const isCurrent = () => isCurrentAdminSession(token, generation);
  const originalText = triggerButton ? triggerButton.textContent : '';
  if (triggerButton) {
    triggerButton.textContent = 'Generating...';
    triggerButton.disabled = true;
  }
  try {
    const response = await apiFetch('/api/reports/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        report_type: reportType,
        format: format,
        filters: filters
      })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.description || ('Export failed with status ' + response.status));
    }
    const blob = await response.blob();
    if (!isCurrent()) return;
    const disposition = response.headers.get('Content-Disposition') || '';
    let filename = '';
    const match = disposition.match(/filename="?([^"]+)"?/);
    if (match && match[1]) {
      filename = match[1];
    } else {
      const today = new Date().toISOString().split('T')[0];
      filename = `WaterHall_${reportType}_${today}.${format}`;
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    if (!isCurrent()) return;
    console.error('Export error:', err);
    alert('Export error: ' + (err.message || 'Could not download report file.'));
  } finally {
    if (triggerButton) {
      triggerButton.textContent = originalText;
      triggerButton.disabled = false;
    }
  }
}

function initReportingEventListeners() {
  // Directory exports
  const btnDirCsv = document.getElementById('btn-export-dir-csv');
  const btnDirXlsx = document.getElementById('btn-export-dir-xlsx');
  const btnDirPdf = document.getElementById('btn-export-dir-pdf');
  const btnDirPrint = document.getElementById('btn-print-dir');

  const getDirFilters = () => ({
    purok: document.getElementById('export-filter-dir-purok')?.value || 'All',
    account_status: document.getElementById('export-filter-dir-status')?.value || 'All'
  });

  if (btnDirCsv) btnDirCsv.addEventListener('click', () => triggerReportExport('directory', 'csv', getDirFilters(), btnDirCsv));
  if (btnDirXlsx) btnDirXlsx.addEventListener('click', () => triggerReportExport('directory', 'xlsx', getDirFilters(), btnDirXlsx));
  if (btnDirPdf) btnDirPdf.addEventListener('click', () => triggerReportExport('directory', 'pdf', getDirFilters(), btnDirPdf));
  if (btnDirPrint) btnDirPrint.addEventListener('click', () => window.print());

  // Collections exports
  const btnColCsv = document.getElementById('btn-export-col-csv');
  const btnColXlsx = document.getElementById('btn-export-col-xlsx');
  const btnColPdf = document.getElementById('btn-export-col-pdf');
  const btnColPrint = document.getElementById('btn-print-col');

  const getColFilters = () => ({
    purok: document.getElementById('export-filter-col-purok')?.value || 'All',
    payment_method: document.getElementById('export-filter-col-method')?.value || 'All'
  });

  if (btnColCsv) btnColCsv.addEventListener('click', () => triggerReportExport('collections', 'csv', getColFilters(), btnColCsv));
  if (btnColXlsx) btnColXlsx.addEventListener('click', () => triggerReportExport('collections', 'xlsx', getColFilters(), btnColXlsx));
  if (btnColPdf) btnColPdf.addEventListener('click', () => triggerReportExport('collections', 'pdf', getColFilters(), btnColPdf));
  if (btnColPrint) btnColPrint.addEventListener('click', () => window.print());

  // Billing exports
  const btnBillCsv = document.getElementById('btn-export-bill-csv');
  const btnBillXlsx = document.getElementById('btn-export-bill-xlsx');
  const btnBillPdf = document.getElementById('btn-export-bill-pdf');
  const btnBillPrint = document.getElementById('btn-print-bill');

  const getBillFilters = () => ({
    purok: document.getElementById('export-filter-bill-purok')?.value || 'All',
    payment_status: document.getElementById('export-filter-bill-status')?.value || 'All',
    billing_month: document.getElementById('export-filter-bill-month')?.value || 'All'
  });

  if (btnBillCsv) btnBillCsv.addEventListener('click', () => triggerReportExport('billing', 'csv', getBillFilters(), btnBillCsv));
  if (btnBillXlsx) btnBillXlsx.addEventListener('click', () => triggerReportExport('billing', 'xlsx', getBillFilters(), btnBillXlsx));
  if (btnBillPdf) btnBillPdf.addEventListener('click', () => triggerReportExport('billing', 'pdf', getBillFilters(), btnBillPdf));
  if (btnBillPrint) btnBillPrint.addEventListener('click', () => window.print());

  // Incident reports exports
  const btnRepCsv = document.getElementById('btn-export-rep-csv');
  const btnRepXlsx = document.getElementById('btn-export-rep-xlsx');
  const btnRepPdf = document.getElementById('btn-export-rep-pdf');
  const btnRepPrint = document.getElementById('btn-print-rep');

  const getRepFilters = () => ({
    report_status: document.getElementById('export-filter-rep-status')?.value || 'All',
    report_category: document.getElementById('export-filter-rep-category')?.value || 'All'
  });

  if (btnRepCsv) btnRepCsv.addEventListener('click', () => triggerReportExport('incident_reports', 'csv', getRepFilters(), btnRepCsv));
  if (btnRepXlsx) btnRepXlsx.addEventListener('click', () => triggerReportExport('incident_reports', 'xlsx', getRepFilters(), btnRepXlsx));
  if (btnRepPdf) btnRepPdf.addEventListener('click', () => triggerReportExport('incident_reports', 'pdf', getRepFilters(), btnRepPdf));
  if (btnRepPrint) btnRepPrint.addEventListener('click', () => window.print());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReportingEventListeners);
} else {
  initReportingEventListeners();
}
