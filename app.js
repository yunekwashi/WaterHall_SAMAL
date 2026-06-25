// WaterHall Field Monitor - Main Application Controller

document.addEventListener('DOMContentLoaded', () => {
  // --- State Variables ---
  let currentWorker = null;
  let activeTab = 'view-dashboard';
  let activeHouseholdId = null;

  // Cache elements
  const loginView = document.getElementById('view-login');
  const dashView = document.getElementById('view-dashboard');
  const dirView = document.getElementById('view-directory');
  const assetsView = document.getElementById('view-assets');
  const profileView = document.getElementById('view-profile');
  const billingView = document.getElementById('view-billing');
  const bottomNav = document.getElementById('app-bottom-nav');
  
  const views = {
    'view-dashboard': dashView,
    'view-directory': dirView,
    'view-assets': assetsView,
    'view-profile': profileView,
    'view-billing': billingView
  };

  // --- Initial Setup & Live Clock ---
  function updateClock() {
    const timeEl = document.getElementById('phone-time');
    if (timeEl) {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 12 instead of 0
      timeEl.textContent = `${hours}:${minutes} ${ampm}`;
    }
  }
  updateClock();
  setInterval(updateClock, 10000); // Update every 10 seconds

  // Initialize DB seed
  if (window.dbClient) {
    window.dbClient.init();
  }

  // Check existing session
  const savedWorker = localStorage.getItem('waterhall_session');
  if (savedWorker) {
    try {
      currentWorker = JSON.parse(savedWorker);
      showApp(currentWorker);
    } catch (e) {
      localStorage.removeItem('waterhall_session');
    }
  }

  // --- Authentication Handlers ---
  const loginBtn = document.getElementById('btn-login');
  const empIdInput = document.getElementById('employee-id');
  const zoneSelect = document.getElementById('zone-assignment');
  const loginErrorMsg = document.getElementById('login-error-msg');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const empId = empIdInput.value.trim();
      const selectedZone = zoneSelect.value;
      
      if (!empId) {
        showLoginError("Employee ID is required.");
        return;
      }

      const worker = window.dbClient.validateWorker(empId, selectedZone);
      if (worker) {
        currentWorker = worker;
        localStorage.setItem('waterhall_session', JSON.stringify(worker));
        loginErrorMsg.style.display = 'none';
        showApp(worker);
        showToast(`Logged in as ${worker.name}`);
      } else {
        showLoginError(`ID "${empId}" not recognized. Access restricted to registered field techs.`);
      }
    });
  }

  function showLoginError(msg) {
    loginErrorMsg.innerHTML = msg;
    loginErrorMsg.style.display = 'block';
  }

  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('waterhall_session');
      currentWorker = null;
      
      // Reset navigation
      bottomNav.style.display = 'none';
      
      // Hide all views, show login
      Object.values(views).forEach(v => v.classList.remove('active'));
      loginView.classList.add('active');
      activeTab = 'view-login';
      
      // Reset inputs
      empIdInput.value = 'EMP-304';
      
      showToast("Signed out of session");
    });
  }

  function showApp(worker) {
    // Hide login
    loginView.classList.remove('active');
    
    // Show nav
    bottomNav.style.display = 'flex';
    
    // Set Dashboard as active
    switchTab('view-dashboard');
    
    // Load data
    renderDashboard();
    renderDirectory();
    renderAssets();
    renderProfile();
    initBillingView();
  }

  // --- Tab Navigation Handlers ---
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tab.getAttribute('data-target');
      switchTab(target);
    });
  });

  function switchTab(targetViewId) {
    activeTab = targetViewId;
    
    // Update active tab styling
    navTabs.forEach(t => {
      if (t.getAttribute('data-target') === targetViewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Toggle view visibility
    Object.keys(views).forEach(key => {
      if (key === targetViewId) {
        views[key].classList.add('active');
      } else {
        views[key].classList.remove('active');
      }
    });

    // Refresh telemetry and states on tab focus
    if (targetViewId === 'view-dashboard') {
      renderDashboard();
    } else if (targetViewId === 'view-directory') {
      renderDirectory();
    } else if (targetViewId === 'view-assets') {
      renderAssets();
    } else if (targetViewId === 'view-profile') {
      renderProfile();
    } else if (targetViewId === 'view-billing') {
      renderBillingView();
    }
  }

  // --- Dashboard Controller ---
  function renderDashboard() {
    if (!currentWorker) return;
    
    // Set header
    const dashTitle = document.getElementById('dash-worker-title');
    dashTitle.textContent = `Field Terminal: ${currentWorker.selected_zone}`;

    const households = window.dbClient.getHouseholds();
    const assets = window.dbClient.getCentralAssets();
    const logs = window.dbClient.getMaintenanceLogs();

    // 1. Calculate active alerts
    const activeLeaks = households.filter(h => h.current_leak_status === 'leak');
    
    let qualityAlertCount = 0;
    const qualityAlerts = [];
    if (assets.ph_status === 'warning') {
      qualityAlertCount++;
      qualityAlerts.push({ type: 'quality', name: 'Central Reservoir pH Alert', desc: assets.ph_desc });
    }
    if (assets.turbidity_status === 'warning') {
      qualityAlertCount++;
      qualityAlerts.push({ type: 'quality', name: 'Central Turbidity Alert', desc: assets.turbidity_desc });
    }

    const totalAlerts = activeLeaks.length + qualityAlertCount;
    
    // Update count badge
    const alertCountEl = document.getElementById('dash-alert-count');
    alertCountEl.textContent = totalAlerts;

    const alertWidget = document.getElementById('dashboard-alert-widget');
    const alertListEl = document.getElementById('dash-alert-list');
    alertListEl.innerHTML = '';

    if (totalAlerts === 0) {
      alertWidget.style.borderColor = 'var(--alert-green)';
      alertWidget.querySelector('.alert-widget-title').style.color = 'var(--alert-green)';
      alertListEl.innerHTML = `
        <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">
          <div class="alert-item-icon">
            <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
          <div class="alert-item-text" style="color: var(--text-on-dark)">No active leaks or water quality issues in Brgy. Tagpopongan.</div>
        </div>
      `;
    } else {
      alertWidget.style.borderColor = 'var(--amber-safety)';
      alertWidget.querySelector('.alert-widget-title').style.color = 'var(--amber-safety)';
      
      // Add leaks
      activeLeaks.forEach(leak => {
        const item = document.createElement('div');
        item.className = 'alert-item leak';
        item.style.cursor = 'pointer';
        item.innerHTML = `
          <div class="alert-item-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
          </div>
          <div class="alert-item-text">
            <strong>${leak.owner_name} (${leak.purok})</strong><br>
            Leak alert: Flow rate at ${leak.flow_rate.toFixed(2)} L/s constant.
          </div>
        `;
        item.addEventListener('click', () => {
          openHouseholdModal(leak.house_id);
        });
        alertListEl.appendChild(item);
      });

      // Add water quality alerts
      qualityAlerts.forEach(qa => {
        const item = document.createElement('div');
        item.className = 'alert-item quality';
        item.style.cursor = 'pointer';
        item.innerHTML = `
          <div class="alert-item-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>
          </div>
          <div class="alert-item-text">
            <strong>${qa.name}</strong><br>
            ${qa.desc}
          </div>
        `;
        item.addEventListener('click', () => {
          switchTab('view-assets');
        });
        alertListEl.appendChild(item);
      });
    }

    // 2. Update Interactive SVG Map Pins
    const puroks = ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6'];
    puroks.forEach((pur, i) => {
      const pinId = `pin-p${i+1}`;
      const pinEl = document.getElementById(pinId);
      if (pinEl) {
        const pinBg = pinEl.querySelector('.pin-bg');
        const hasLeak = households.some(h => h.purok === pur && h.current_leak_status === 'leak');
        
        if (hasLeak) {
          pinBg.setAttribute('fill', 'var(--alert-red)');
          // Add pulse keyframe visual using stroke width
          pinBg.setAttribute('stroke', '#FFF');
          pinBg.setAttribute('stroke-width', '1.5');
        } else {
          pinBg.setAttribute('fill', 'var(--alert-green)');
          pinBg.removeAttribute('stroke');
        }

        // Make pins click-navigable
        pinEl.style.cursor = 'pointer';
        // Remove old listener if any by cloning (simple way to reset listeners)
        const newPin = pinEl.cloneNode(true);
        pinEl.parentNode.replaceChild(newPin, pinEl);
        newPin.addEventListener('click', () => {
          // Pre-filter directory to this Purok and navigate
          document.getElementById('filter-purok').value = pur;
          document.getElementById('filter-status').value = 'all';
          switchTab('view-directory');
        });
      }
    });

    // 3. Render Zone Selection Cards
    const zoneGrid = document.getElementById('dashboard-zone-grid');
    zoneGrid.innerHTML = '';

    puroks.forEach(pur => {
      const totalMeters = households.filter(h => h.purok === pur).length;
      const zoneLeaks = households.filter(h => h.purok === pur && h.current_leak_status === 'leak').length;
      const isAssigned = (currentWorker.selected_zone === pur);
      
      const card = document.createElement('div');
      card.className = `zone-card ${isAssigned ? 'assigned' : ''}`;
      card.innerHTML = `
        <div class="zone-card-header">
          <span class="zone-name">${pur}</span>
          ${isAssigned ? '<span class="zone-badge">ASSIGNED</span>' : ''}
        </div>
        <div class="zone-stats">
          <span>Meters: <strong>${totalMeters}</strong></span>
          <span class="zone-leak-count">${zoneLeaks > 0 ? `${zoneLeaks} Leaks` : 'Clear'}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        document.getElementById('filter-purok').value = pur;
        document.getElementById('filter-status').value = 'all';
        switchTab('view-directory');
      });
      zoneGrid.appendChild(card);
    });

    // 4. Activity Logs Glance
    const logCountEl = document.getElementById('dash-log-count');
    const logListEl = document.getElementById('dash-log-list');
    logListEl.innerHTML = '';

    // Show top 3 recent logs
    const recentLogs = logs.slice(0, 3);
    logCountEl.textContent = `${logs.length} logged`;

    if (recentLogs.length === 0) {
      logListEl.innerHTML = `<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>`;
    } else {
      recentLogs.forEach(log => {
        const hh = households.find(h => h.house_id === log.house_id);
        const ownerName = hh ? hh.owner_name : 'Unknown Household';
        const card = document.createElement('div');
        card.className = `log-card ${log.status_resolved ? 'resolved' : 'pending'}`;
        
        // Format Date
        const logDate = new Date(log.date);
        const formattedDate = logDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) + ' ' + logDate.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'});

        card.innerHTML = `
          <div class="log-card-header">
            <span>${ownerName}</span>
            <span style="font-size:10px; color:var(--text-muted)">${formattedDate}</span>
          </div>
          <div class="log-card-desc">${log.description}</div>
        `;
        logListEl.appendChild(card);
      });
    }
  }

  // --- Directory & Search Controller ---
  const searchInput = document.getElementById('dir-search');
  const purokFilter = document.getElementById('filter-purok');
  const statusFilter = document.getElementById('filter-status');
  const emptyState = document.getElementById('dir-empty-state');
  const dirListEl = document.getElementById('dir-household-list');

  // Register filters
  searchInput.addEventListener('input', renderDirectory);
  purokFilter.addEventListener('change', renderDirectory);
  statusFilter.addEventListener('change', renderDirectory);

  function renderDirectory() {
    const households = window.dbClient.getHouseholds();
    const query = searchInput.value.toLowerCase().trim();
    const selectedPurok = purokFilter.value;
    const selectedStatus = statusFilter.value;

    dirListEl.innerHTML = '';
    
    // Filter logic
    const filtered = households.filter(h => {
      const matchesSearch = h.owner_name.toLowerCase().includes(query) || h.account_number.toLowerCase().includes(query) || h.house_id.toLowerCase().includes(query);
      const matchesPurok = selectedPurok === 'all' || h.purok === selectedPurok;
      const matchesStatus = selectedStatus === 'all' || h.current_leak_status === selectedStatus;
      
      return matchesSearch && matchesPurok && matchesStatus;
    });

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      
      filtered.forEach(h => {
        const card = document.createElement('div');
        card.className = `household-card ${h.current_leak_status === 'leak' ? 'has-leak' : ''}`;
        
        card.innerHTML = `
          <div class="household-info">
            <span class="household-name">${h.owner_name}</span>
            <div class="household-meta">
              <span class="household-purok">${h.purok}</span>
              <span class="household-acct">${h.account_number}</span>
            </div>
            <div class="household-usage">Usage this Month: <strong>${h.current_m3_usage} m³</strong></div>
          </div>
          <div class="household-status-section">
            <span class="status-indicator ${h.current_leak_status}">
              ${h.current_leak_status === 'leak' 
                ? '<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak' 
                : '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
              }
            </span>
            <span class="household-flow">Flow: <span>${h.flow_rate.toFixed(2)} L/s</span></span>
          </div>
        `;

        card.addEventListener('click', () => {
          openHouseholdModal(h.house_id);
        });

        dirListEl.appendChild(card);
      });
    }
  }

  // --- Household Detail Modal Drawer Controller ---
  const detailModal = document.getElementById('house-detail-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const modalLeakToggle = document.getElementById('modal-leak-toggle');
  const submitLogBtn = document.getElementById('btn-submit-log');
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeHouseholdModal);
  }

  // Close modal when clicking background overlay itself
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      closeHouseholdModal();
    }
  });

  function openHouseholdModal(id) {
    activeHouseholdId = id;
    const h = window.dbClient.getHousehold(id);
    if (!h) return;

    // Fill textual fields
    document.getElementById('modal-owner-name').textContent = h.owner_name;
    document.getElementById('modal-acct-num').textContent = `${h.house_id} | ${h.account_number}`;
    document.getElementById('modal-current-m3').textContent = h.current_m3_usage.toFixed(1);
    document.getElementById('modal-flow-rate').textContent = h.flow_rate.toFixed(2);

    // Set Leak toggle state
    modalLeakToggle.checked = (h.current_leak_status === 'leak');
    updateLeakToggleLabel(h.current_leak_status);

    // Render historical consumption SVG graph
    renderSVGChart(h.monthly_history);

    // Render historical logs
    renderModalLogs(id);

    // Reset log input form fields
    document.getElementById('log-desc').value = '';
    document.getElementById('log-resolved').checked = (h.current_leak_status === 'leak'); // auto-check resolved if it has a leak currently

    // Show modal container
    detailModal.classList.add('active');
  }

  function closeHouseholdModal() {
    detailModal.classList.remove('active');
    activeHouseholdId = null;
    
    // Refresh lists
    renderDashboard();
    renderDirectory();
  }

  // Handle flow leak simulator toggle inside modal
  modalLeakToggle.addEventListener('change', (e) => {
    if (!activeHouseholdId) return;
    const newStatus = e.target.checked ? 'leak' : 'normal';
    
    const updated = window.dbClient.updateHouseholdLeak(activeHouseholdId, newStatus);
    if (updated) {
      document.getElementById('modal-flow-rate').textContent = updated.flow_rate.toFixed(2);
      updateLeakToggleLabel(newStatus);
      showToast(newStatus === 'leak' ? "Simulated Leak ALERT activated!" : "Simulated Normal flow rate restored.");
      renderModalLogs(activeHouseholdId);
      
      // Auto-set checkout "resolved" status based on toggle
      document.getElementById('log-resolved').checked = (newStatus === 'normal');
    }
  });

  function updateLeakToggleLabel(status) {
    const leakTitleEl = document.getElementById('modal-leak-title');
    const leakDescEl = document.getElementById('modal-leak-desc');
    if (status === 'leak') {
      leakTitleEl.textContent = "Leak State Sim: HIGH CONSTANT FLOW";
      leakTitleEl.style.color = 'var(--alert-red)';
      leakDescEl.textContent = "Meter detects flow rate exceeds safety coefficient threshold.";
    } else {
      leakTitleEl.textContent = "Flow State Sim: NORMAL FLOW";
      leakTitleEl.style.color = 'var(--alert-green)';
      leakDescEl.textContent = "Meter flow matches normal residential consumption metrics.";
    }
  }

  // --- Dynamic SVG Chart Renderer ---
  function renderSVGChart(history) {
    const container = document.getElementById('chart-container');
    container.innerHTML = '';

    if (!history || history.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>`;
      return;
    }

    // Chart dimensions
    const width = 340;
    const height = 100;
    const padding = 20;

    const chartW = width - (padding * 2);
    const chartH = height - (padding * 2);

    // Calculate Y scale
    const maxVal = Math.max(...history, 10) * 1.1; // pad 10%
    const minVal = 0;

    // Build data coordinate points
    const months = ['Mar', 'Apr', 'May', 'Jun']; // seed historical log months
    const points = history.map((val, idx) => {
      const x = padding + (idx / (history.length - 1)) * chartW;
      const y = padding + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      return { x, y, val, label: months[idx] || `M${idx+1}` };
    });

    // Create polyline path coordinates
    const linePath = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    
    // Area coordinates under the line
    const areaPath = `M ${points[0].x.toFixed(1)},${(height - padding).toFixed(1)} ` +
                     points.map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') +
                     ` L ${points[points.length - 1].x.toFixed(1)},${(height - padding).toFixed(1)} Z`;

    // Render SVG
    let svgHtml = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="overflow:visible">
        <defs>
          <!-- Chart Gradient -->
          <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--amber-safety)" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="var(--amber-safety)" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        
        <!-- Y Gridlines & axis -->
        <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="${padding}" y1="${padding + (chartH/2)}" x2="${width - padding}" y2="${padding + (chartH/2)}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#CBD5E1" stroke-width="1.5"/>
        
        <!-- Area under curve -->
        <path d="${areaPath}" fill="url(#chart-area-grad)" />
        
        <!-- Main Line -->
        <polyline points="${linePath}" fill="none" stroke="var(--amber-safety)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    `;

    // Draw coordinate dots and tooltips
    points.forEach((p, idx) => {
      svgHtml += `
        <!-- Label Month -->
        <text x="${p.x}" y="${height - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">${p.label}</text>
        
        <!-- Hover indicator line -->
        <line x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${height - padding}" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />
        
        <!-- Point Dot -->
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--white)" stroke="var(--amber-safety)" stroke-width="2" />
        
        <!-- Usage value tag -->
        <text x="${p.x}" y="${p.y - 8}" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">${p.val}m³</text>
      `;
    });

    svgHtml += `</svg>`;
    container.innerHTML = svgHtml;
  }

  // --- Modal Historical Logs Renderer ---
  function renderModalLogs(houseId) {
    const historicalLogsEl = document.getElementById('modal-historical-logs');
    historicalLogsEl.innerHTML = '';

    const logs = window.dbClient.getMaintenanceLogs().filter(l => l.house_id === houseId);

    if (logs.length === 0) {
      historicalLogsEl.innerHTML = `<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>`;
    } else {
      logs.forEach(log => {
        const item = document.createElement('div');
        item.className = `log-card ${log.status_resolved ? 'resolved' : 'pending'}`;
        
        const logDate = new Date(log.date);
        const formatted = logDate.toLocaleDateString() + ' @ ' + logDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        item.innerHTML = `
          <div class="log-card-header">
            <span>Tech: <strong>${log.worker_id}</strong></span>
            <span style="font-size:10px; color:var(--text-muted)">${formatted}</span>
          </div>
          <div class="log-card-desc">${log.description}</div>
          <div style="font-size: 9px; font-weight:700; color:${log.status_resolved ? 'var(--alert-green)' : 'var(--amber-safety)'}; margin-top:4px; text-transform:uppercase">
            Status: ${log.status_resolved ? 'Resolved (Flow Restored)' : 'In Progress (Active Monitoring)'}
          </div>
        `;
        historicalLogsEl.appendChild(item);
      });
    }
  }

  // Log maintenance report handler
  if (submitLogBtn) {
    submitLogBtn.addEventListener('click', () => {
      if (!activeHouseholdId || !currentWorker) return;

      const descInput = document.getElementById('log-desc');
      const descText = descInput.value.trim();
      const resolvedChecked = document.getElementById('log-resolved').checked;

      if (!descText) {
        showToast("Please detail the maintenance actions taken.");
        return;
      }

      // Add log
      const newLog = {
        house_id: activeHouseholdId,
        worker_id: currentWorker.worker_id,
        purok: currentWorker.selected_zone,
        description: descText,
        status_resolved: resolvedChecked
      };

      window.dbClient.addMaintenanceLog(newLog);

      // If marked resolved, update household status
      if (resolvedChecked) {
        window.dbClient.updateHouseholdLeak(activeHouseholdId, 'normal');
        modalLeakToggle.checked = false;
        updateLeakToggleLabel('normal');
      }

      // Update UI elements in modal
      const h = window.dbClient.getHousehold(activeHouseholdId);
      document.getElementById('modal-flow-rate').textContent = h.flow_rate.toFixed(2);
      
      descInput.value = '';
      showToast("Maintenance Log committed to database!");
      
      renderModalLogs(activeHouseholdId);
      renderDashboard();
    });
  }


  // --- Asset Status & Hardware Simulator ---
  const sliderTank = document.getElementById('slider-tank');
  const sliderPH = document.getElementById('slider-ph');
  const sliderTurbidity = document.getElementById('slider-turbidity');

  const simTankVal = document.getElementById('sim-tank-val');
  const simPHVal = document.getElementById('sim-ph-val');
  const simTurbidityVal = document.getElementById('sim-turbidity-val');

  // Input Slider Handlers
  if (sliderTank) {
    sliderTank.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      simTankVal.textContent = `${val}%`;
      updateAssetTelemetry({ main_tank_level: val });
    });
  }

  if (sliderPH) {
    sliderPH.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      simPHVal.textContent = `${val.toFixed(1)}`;
      updateAssetTelemetry({ ph_level: val });
    });
  }

  if (sliderTurbidity) {
    sliderTurbidity.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      simTurbidityVal.textContent = `${val.toFixed(1)} NTU`;
      updateAssetTelemetry({ turbidity: val });
    });
  }

  function updateAssetTelemetry(updates) {
    window.dbClient.updateCentralAssets(updates);
    renderAssets();
  }

  function renderAssets() {
    const assets = window.dbClient.getCentralAssets();
    if (!assets) return;

    // Sync Sliders if needed (prevents desync on loads)
    if (document.activeElement !== sliderTank) {
      sliderTank.value = assets.main_tank_level;
      simTankVal.textContent = `${assets.main_tank_level}%`;
    }
    if (document.activeElement !== sliderPH) {
      sliderPH.value = assets.ph_level;
      simPHVal.textContent = `${assets.ph_level.toFixed(1)}`;
    }
    if (document.activeElement !== sliderTurbidity) {
      sliderTurbidity.value = assets.turbidity;
      simTurbidityVal.textContent = `${assets.turbidity.toFixed(1)} NTU`;
    }

    // 1. Tank Level Progress
    const tankPercentEl = document.getElementById('asset-tank-percent');
    const tankFillEl = document.getElementById('asset-tank-fill');
    const tankBannerEl = document.getElementById('asset-tank-banner');

    tankPercentEl.textContent = `${assets.main_tank_level}%`;
    tankFillEl.style.height = `${assets.main_tank_level}%`;

    // Pressure alerts based on tank levels
    if (assets.main_tank_level < 30) {
      tankBannerEl.textContent = "CRITICAL: Low Water Reserve. High pressure risk in Zone 4 & 5!";
      tankBannerEl.className = "reservoir-status-banner low";
      tankFillEl.style.background = 'linear-gradient(180deg, #F87171 0%, #DC2626 100%)'; // Red water
    } else if (assets.main_tank_level < 50) {
      tankBannerEl.textContent = "WARNING: Moderate Reserve. Stabilizing flow valves recommended.";
      tankBannerEl.className = "reservoir-status-banner";
      tankBannerEl.style.backgroundColor = 'var(--alert-amber-bg)';
      tankBannerEl.style.borderColor = 'rgba(249, 115, 22, 0.3)';
      tankBannerEl.style.color = 'var(--amber-safety)';
      tankFillEl.style.background = 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)'; // Orange water
    } else {
      tankBannerEl.textContent = "Reservoir Status: Normal Operating Pressure";
      tankBannerEl.className = "reservoir-status-banner";
      tankBannerEl.style.backgroundColor = 'var(--alert-green-bg)';
      tankBannerEl.style.borderColor = 'rgba(16, 185, 129, 0.2)';
      tankBannerEl.style.color = 'var(--alert-green)';
      tankFillEl.style.background = 'linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)'; // Blue water
    }

    // 2. pH Acidity Level
    const phValEl = document.getElementById('asset-ph-val');
    const phBadgeEl = document.getElementById('asset-ph-badge');
    const phPointerEl = document.getElementById('asset-ph-pointer');
    const phDescEl = document.getElementById('asset-ph-desc');

    phValEl.textContent = assets.ph_level.toFixed(1);
    
    // pH scale spans from pH 4 to 10 (range = 6 units)
    let phPos = ((assets.ph_level - 4) / 6) * 100;
    phPos = Math.max(0, Math.min(100, phPos)); // clamp
    phPointerEl.style.left = `${phPos}%`;

    phBadgeEl.textContent = assets.ph_status.toUpperCase();
    phBadgeEl.className = `quality-badge ${assets.ph_status}`;
    phDescEl.textContent = assets.ph_desc;

    // 3. Turbidity Level
    const turbValEl = document.getElementById('asset-turbidity-val');
    const turbBadgeEl = document.getElementById('asset-turbidity-badge');
    const turbFillEl = document.getElementById('asset-turbidity-fill');
    const turbDescEl = document.getElementById('asset-turbidity-desc');

    turbValEl.textContent = assets.turbidity.toFixed(1);

    // Turbidity scale spans 0 to 12 NTU (normal limit is < 5 NTU)
    let turbPercent = (assets.turbidity / 12) * 100;
    turbPercent = Math.max(0, Math.min(100, turbPercent));
    turbFillEl.style.width = `${turbPercent}%`;

    turbBadgeEl.textContent = assets.turbidity_status.toUpperCase();
    turbBadgeEl.className = `quality-badge ${assets.turbidity_status}`;
    
    if (assets.turbidity_status === 'warning') {
      turbFillEl.style.backgroundColor = 'var(--amber-safety)';
    } else {
      turbFillEl.style.backgroundColor = 'var(--alert-green)';
    }
    
    turbDescEl.textContent = assets.turbidity_desc;
  }


  // --- Profile View Controller ---
  function renderProfile() {
    if (!currentWorker) return;

    // Update Profile visuals
    document.getElementById('worker-name').textContent = currentWorker.name;
    document.getElementById('worker-role').textContent = currentWorker.role;
    document.getElementById('worker-zone-lbl').textContent = `Assigned Zone: ${currentWorker.selected_zone}`;

    // Update Avatar initials
    const initials = currentWorker.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    document.getElementById('worker-avatar').textContent = initials;

    // Stats calculations
    const households = window.dbClient.getHouseholds();
    const zoneCount = households.filter(h => h.purok === currentWorker.selected_zone).length;

    const myLogs = window.dbClient.getMaintenanceLogs().filter(l => l.worker_id === currentWorker.worker_id && l.status_resolved).length;

    document.getElementById('profile-stat-total').textContent = zoneCount;
    document.getElementById('profile-stat-logs').textContent = myLogs;
  }

  // Profile Action Items click listeners
  const menuWorkorders = document.getElementById('menu-view-logs');
  if (menuWorkorders) {
    menuWorkorders.addEventListener('click', () => {
      // Pre-filter directory to their own zone and leaks, and show
      document.getElementById('filter-purok').value = currentWorker.selected_zone;
      document.getElementById('filter-status').value = 'leak';
      switchTab('view-directory');
      showToast(`Showing leaks in your assigned patrol zone ${currentWorker.selected_zone}`);
    });
  }

  const menuEmergency = document.getElementById('menu-emergency-call');
  if (menuEmergency) {
    menuEmergency.addEventListener('click', () => {
      showToast("Dispatching radio ping to Barangay Office...", 3500);
    });
  }
  // --- Water Bill Calculator & Double-Billing Safeguard Controller ---
  const billMeterSearch = document.getElementById('bill-meter-search');
  const billMeterResults = document.getElementById('bill-meter-results');
  const billPrevReading = document.getElementById('bill-prev-reading');
  const billCurrInput = document.getElementById('bill-curr-input');
  
  const billCalcConsumption = document.getElementById('bill-calc-consumption');
  const billCalcExcess = document.getElementById('bill-calc-excess');
  const billCalcTotal = document.getElementById('bill-calc-total');
  
  const btnSaveBill = document.getElementById('btn-save-bill');
  const billingAlertBanner = document.getElementById('billing-alert-banner');
  const billingHistoryList = document.getElementById('billing-history-list');

  let selectedBillHouseId = null;

  function initBillingView() {
    if (!billMeterSearch) return;

    // Attach Autocomplete event listeners
    billMeterSearch.addEventListener('focus', showBillingSearchResults);
    billMeterSearch.addEventListener('input', showBillingSearchResults);
    billCurrInput.addEventListener('input', updateBillCalculations);
    
    // Clicking outside closes the results popup
    document.addEventListener('click', (e) => {
      if (billMeterSearch && !billMeterSearch.contains(e.target) && billMeterResults && !billMeterResults.contains(e.target)) {
        billMeterResults.style.display = 'none';
      }
    });

    btnSaveBill.addEventListener('click', saveWaterBill);

    // Seed default first select item
    const households = window.dbClient.getHouseholds();
    if (households.length > 0) {
      selectedBillHouseId = households[0].house_id;
      billMeterSearch.value = `${households[0].owner_name} (${households[0].account_number})`;
    }
  }

  function showBillingSearchResults() {
    const query = billMeterSearch.value.toLowerCase().trim();
    const households = window.dbClient.getHouseholds();
    
    // Filter matching households
    const matches = households.filter(h => {
      return h.owner_name.toLowerCase().includes(query) || h.account_number.toLowerCase().includes(query);
    });

    billMeterResults.innerHTML = '';
    
    if (matches.length === 0) {
      billMeterResults.innerHTML = `<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>`;
      billMeterResults.style.display = 'block';
      return;
    }

    matches.forEach(h => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.textContent = `${h.owner_name} (${h.account_number})`;
      item.addEventListener('click', () => {
        billMeterSearch.value = `${h.owner_name} (${h.account_number})`;
        billMeterResults.style.display = 'none';
        renderBillingView(h.house_id);
      });
      billMeterResults.appendChild(item);
    });

    billMeterResults.style.display = 'block';
  }

  function renderBillingView(houseId) {
    if (houseId) {
      selectedBillHouseId = houseId;
    }
    
    if (!selectedBillHouseId) return;

    const household = window.dbClient.getHousehold(selectedBillHouseId);
    if (!household) return;

    // 1. Calculate Previous Reading: Use last bill's current reading if available, or index - 2 of monthly_history
    const historyBills = window.dbClient.getBillingHistoryForHousehold(selectedBillHouseId);
    let prevReading = 0;
    
    if (historyBills.length > 0) {
      prevReading = historyBills[0].current_reading;
    } else {
      const hist = household.monthly_history;
      prevReading = hist[hist.length - 2] || (household.current_m3_usage - 2.5);
    }
    
    billPrevReading.textContent = prevReading.toFixed(1);
    
    // 2. Pre-fill Current Reading Input with the live telemetry reading in DB if selected new
    if (houseId) {
      billCurrInput.value = household.current_m3_usage.toFixed(1);
    }

    // 3. Update computations & check duplicate billing block
    updateBillCalculations();

    // 4. Render Bill history list
    renderBillingHistoryList(selectedBillHouseId);
  }

  function updateBillCalculations() {
    if (!selectedBillHouseId) return;

    const prevVal = parseFloat(billPrevReading.textContent) || 0;
    const currVal = parseFloat(billCurrInput.value) || 0;
    
    // Consumption calculation
    let consumption = currVal - prevVal;
    if (consumption < 0) {
      consumption = 0;
    }
    billCalcConsumption.textContent = consumption.toFixed(1);

    // Rate calculations:
    const baseCharge = 120.00;
    let excessCharge = 0.00;
    if (consumption > 10) {
      excessCharge = (consumption - 10) * 15.00;
    }
    billCalcExcess.textContent = excessCharge.toFixed(2);

    const maintenanceFee = 50.00;
    const totalDue = baseCharge + excessCharge + maintenanceFee;
    billCalcTotal.textContent = totalDue.toFixed(2);

    // Double-Billing Prevention check
    const isBilled = window.dbClient.hasBeenBilledThisMonth(selectedBillHouseId, "June 2026");
    
    if (isBilled) {
      billingAlertBanner.innerHTML = `
        <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
        <span>DOUBLE-BILLING BLOCKED: Bill already registered for June 2026.</span>
      `;
      billingAlertBanner.className = "reservoir-status-banner low";
      billingAlertBanner.style.backgroundColor = "var(--alert-red-bg)";
      billingAlertBanner.style.borderColor = "rgba(239, 68, 68, 0.3)";
      billingAlertBanner.style.color = "var(--alert-red)";
      
      btnSaveBill.disabled = true;
      btnSaveBill.style.opacity = "0.5";
      btnSaveBill.style.cursor = "not-allowed";
      btnSaveBill.querySelector('span').textContent = "Register Blocked (Billed)";
    } else {
      billingAlertBanner.innerHTML = `
        <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>CLEAR: Safe to bill June 2026. No duplicates found.</span>
      `;
      billingAlertBanner.className = "reservoir-status-banner";
      billingAlertBanner.style.backgroundColor = "var(--alert-green-bg)";
      billingAlertBanner.style.borderColor = "rgba(16, 185, 129, 0.3)";
      billingAlertBanner.style.color = "var(--alert-green)";
      
      btnSaveBill.disabled = false;
      btnSaveBill.style.opacity = "1";
      btnSaveBill.style.cursor = "pointer";
      btnSaveBill.querySelector('span').textContent = "Register & Save Bill";
    }
  }

  function saveWaterBill() {
    if (!selectedBillHouseId || !currentWorker) return;

    // Safety check again
    const isBilled = window.dbClient.hasBeenBilledThisMonth(selectedBillHouseId, "June 2026");
    if (isBilled) {
      showToast("Operation blocked to prevent double-billing!");
      return;
    }

    const prevVal = parseFloat(billPrevReading.textContent) || 0;
    const currVal = parseFloat(billCurrInput.value) || 0;
    const consumption = parseFloat(billCalcConsumption.textContent) || 0;
    const excessCharge = parseFloat(billCalcExcess.textContent) || 0;
    const totalDue = 120.00 + excessCharge + 50.00;

    const household = window.dbClient.getHousehold(selectedBillHouseId);

    const record = {
      house_id: selectedBillHouseId,
      account_number: household.account_number,
      billing_month: 'June 2026',
      previous_reading: prevVal,
      current_reading: currVal,
      consumption: consumption,
      water_charge: 120.00 + excessCharge,
      maintenance_fee: 50.00,
      total_due: totalDue,
      billed_by: currentWorker.worker_id
    };

    // Add to Database
    window.dbClient.addBillingRecord(record);
    
    showToast(`June 2026 bill registered for ${household.owner_name}!`);
    
    // Refresh calculations (this will trigger the duplicate warnings block)
    updateBillCalculations();
    
    // Refresh history
    renderBillingHistoryList(selectedBillHouseId);

    // Refresh profile count
    renderProfile();
  }

  function renderBillingHistoryList(houseId) {
    if (!billingHistoryList) return;
    
    billingHistoryList.innerHTML = '';
    const history = window.dbClient.getBillingHistoryForHousehold(houseId);

    if (history.length === 0) {
      billingHistoryList.innerHTML = `<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>`;
    } else {
      history.forEach(bill => {
        const item = document.createElement('div');
        item.className = `bill-record-card ${bill.status}`;
        
        const billDate = new Date(bill.date);
        const formattedDate = billDate.toLocaleDateString() + ' ' + billDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        item.innerHTML = `
          <div class="bill-record-header">
            <span>Cycle: ${bill.billing_month}</span>
            <span style="color:${bill.status === 'Paid' ? 'var(--alert-green)' : 'var(--amber-safety)'}">${bill.status.toUpperCase()}</span>
          </div>
          <div class="bill-record-details">
            <span>Readings: ${bill.previous_reading.toFixed(1)} → ${bill.current_reading.toFixed(1)} m³</span>
            <strong>₱${bill.total_due.toFixed(2)}</strong>
          </div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">
            <span>Bill ID: ${bill.bill_id}</span>
            <span>Tech: ${bill.billed_by}</span>
          </div>
        `;
        billingHistoryList.appendChild(item);
      });
    }
  }

  // --- UI Toast Notification Helper ---
  let toastTimer = null;
  function showToast(text, duration = 2500) {
    const toast = document.getElementById('app-toast');
    const toastText = document.getElementById('toast-text');
    
    if (toast && toastText) {
      toastText.textContent = text;
      toast.classList.add('show');
      
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
      
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, duration);
    }
  }

});
