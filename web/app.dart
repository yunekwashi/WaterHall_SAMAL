import 'dart:html';
import 'dart:convert';
import 'dart:async';
import 'db.dart';

void main() {
  document.addEventListener('DOMContentLoaded', (event) {
    AppController().init();
  });
}

class AppController {
  // State Variables
  Map<String, dynamic>? currentWorker;
  String activeTab = 'view-dashboard';
  String? activeHouseholdId;
  String? currentResidentId;

  // Cached UI Elements
  late Element loginView;
  late Element dashView;
  late Element dirView;
  late Element assetsView;
  late Element profileView;
  late Element billingView;
  late Element residentView;
  late Element bottomNav;
  late Element? floatingRoleSwitchBtn;
  late Element? floatingRoleSwitchText;

  late Map<String, Element> views;

  Future<void> init() async {
    // Cache elements
    loginView = document.getElementById('view-login')!;
    dashView = document.getElementById('view-dashboard')!;
    dirView = document.getElementById('view-directory')!;
    assetsView = document.getElementById('view-assets')!;
    profileView = document.getElementById('view-profile')!;
    billingView = document.getElementById('view-billing')!;
    residentView = document.getElementById('view-resident')!;
    bottomNav = document.getElementById('app-bottom-nav')!;
    floatingRoleSwitchBtn = document.getElementById('btn-floating-role-switch');
    floatingRoleSwitchText = document.getElementById('floating-role-switch-text');

    views = {
      'view-dashboard': dashView,
      'view-directory': dirView,
      'view-assets': assetsView,
      'view-profile': profileView,
      'view-billing': billingView,
      'view-resident': residentView
    };

    // Check URL parameters for role specialization
    final uri = Uri.parse(window.location.href);
    final role = uri.queryParameters['role'];

    if (role == 'resident') {
      final zoneContainer = document.getElementById('zone-assignment-container');
      if (zoneContainer != null) {
        zoneContainer.style.display = 'none';
      }
      final empIdInput = document.getElementById('employee-id') as InputElement?;
      if (empIdInput != null) {
        empIdInput.placeholder = "e.g. TAG-2026-0041";
      }
      final labelEl = document.querySelector('label[for="employee-id"]');
      if (labelEl != null) {
        labelEl.text = "Resident Account Number";
      }
      final loginErrorMsg = document.getElementById('login-error-msg');
      if (loginErrorMsg != null) {
        loginErrorMsg.innerHtml = "Invalid Resident credentials. Use <strong>TAG-2026-0041</strong>.";
      }
    } else if (role == 'worker') {
      final empIdInput = document.getElementById('employee-id') as InputElement?;
      if (empIdInput != null) {
        empIdInput.placeholder = "e.g. EMP-304";
      }
      final labelEl = document.querySelector('label[for="employee-id"]');
      if (labelEl != null) {
        labelEl.text = "Employee Credentials / ID";
      }
      final loginErrorMsg = document.getElementById('login-error-msg');
      if (loginErrorMsg != null) {
        loginErrorMsg.innerHtml = "Invalid Worker credentials. Use <strong>EMP-304</strong>.";
      }
    }

    // Live Clock Setup
    void updateClock() {
      final timeEl = document.getElementById('phone-time');
      if (timeEl != null) {
        final now = DateTime.now();
        int hours = now.hour;
        final minutes = now.minute.toString().padLeft(2, '0');
        final ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours != 0 ? hours : 12; // 12 instead of 0
        timeEl.text = '$hours:$minutes $ampm';
      }
    }
    updateClock();
    Timer.periodic(Duration(seconds: 10), (timer) => updateClock());

    // Initialize DB seed
    await db.init();

    // Background Auto-Refresh Telemetry Loop (Every 5 seconds)
    // Automatically fetches server data (levels, quality, leaks) and updates resident/worker screen
    Timer.periodic(Duration(seconds: 5), (timer) async {
      if (currentWorker != null || currentResidentId != null) {
        await db.refreshData();
        if (currentResidentId != null) {
          renderResidentDashboard();
        } else {
          if (activeTab == 'view-dashboard') {
            renderDashboard();
          } else if (activeTab == 'view-directory') {
            renderDirectory();
          } else if (activeTab == 'view-assets') {
            renderAssets();
          }
        }
      }
    });

    // Check existing session
    final savedWorker = window.localStorage['waterhall_session'];
    final savedResident = window.localStorage['waterhall_resident_session'];
    if (savedWorker != null) {
      try {
        currentWorker = Map<String, dynamic>.from(json.decode(savedWorker));
        showApp(currentWorker!);
      } catch (e) {
        window.localStorage.remove('waterhall_session');
      }
    } else if (savedResident != null) {
      showResidentPortal(savedResident);
    }

    // Bind Event Listeners
    bindEvents();
  }

  void bindEvents() {
    // Authentication Handlers
    final loginBtn = document.getElementById('btn-login') as ButtonElement?;
    final empIdInput = document.getElementById('employee-id') as InputElement?;
    final zoneSelect = document.getElementById('zone-assignment') as SelectElement?;
    final loginErrorMsg = document.getElementById('login-error-msg');

    loginBtn?.onClick.listen((e) {
      final empId = empIdInput?.value?.trim() ?? '';
      final selectedZone = zoneSelect?.value ?? '';

      if (empId.isEmpty) {
        showLoginError("Credentials are required.", loginErrorMsg);
        return;
      }

      // Get role from URL query param
      final uri = Uri.parse(window.location.href);
      final role = uri.queryParameters['role'];

      if (role == 'resident') {
        // 2. Try validating as resident
        final households = db.getHouseholds();
        try {
          final resident = households.firstWhere((h) =>
              h['house_id'].toString().toLowerCase() == empId.toLowerCase() ||
              h['account_number'].toString().toLowerCase() == empId.toLowerCase());
          
          window.localStorage.remove('waterhall_session'); // Clear worker session
          currentWorker = null;
          showResidentPortal(resident['house_id']);
          if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';
          showToast('Logged in as Resident: ${resident['owner_name']}');
          return;
        } catch (_) {}
      } else if (role == 'worker') {
        // 1. Try validating as worker
        final worker = db.validateWorker(empId, selectedZone);
        if (worker != null) {
          currentWorker = worker;
          window.localStorage['waterhall_session'] = json.encode(worker);
          window.localStorage.remove('waterhall_resident_session'); // Clear resident session
          if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';
          showApp(worker);
          showToast('Logged in as Tech: ${worker['name']}');
          return;
        }
      } else {
        // Unified default behavior (both allowed)
        final worker = db.validateWorker(empId, selectedZone);
        if (worker != null) {
          currentWorker = worker;
          window.localStorage['waterhall_session'] = json.encode(worker);
          window.localStorage.remove('waterhall_resident_session'); // Clear resident session
          if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';
          showApp(worker);
          showToast('Logged in as Tech: ${worker['name']}');
          return;
        }

        final households = db.getHouseholds();
        try {
          final resident = households.firstWhere((h) =>
              h['house_id'].toString().toLowerCase() == empId.toLowerCase() ||
              h['account_number'].toString().toLowerCase() == empId.toLowerCase());
          
          window.localStorage.remove('waterhall_session'); // Clear worker session
          currentWorker = null;
          showResidentPortal(resident['house_id']);
          if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';
          showToast('Logged in as Resident: ${resident['owner_name']}');
          return;
        } catch (_) {}
      }

      // 3. Fallback: invalid credentials
      showLoginError('Credentials "$empId" not recognized. Check details.', loginErrorMsg);
    });

    final logoutBtn = document.getElementById('btn-logout') as ButtonElement?;
    logoutBtn?.onClick.listen((e) {
      window.localStorage.remove('waterhall_session');
      currentWorker = null;

      // Reset navigation
      bottomNav.style.display = 'none';
      if (floatingRoleSwitchBtn != null) floatingRoleSwitchBtn!.style.display = 'none';

      // Hide all views, show login
      views.values.forEach((v) => v.classes.remove('active'));
      loginView.classes.add('active');
      activeTab = 'view-login';

      // Reset inputs
      if (empIdInput != null) empIdInput.value = '';

      showToast("Signed out of Tech session");
    });

    // Resident Logout
    final residentLogoutBtn = document.getElementById('btn-resident-logout') as ButtonElement?;
    residentLogoutBtn?.onClick.listen((e) {
      window.localStorage.remove('waterhall_resident_session');
      bottomNav.style.display = 'none';
      if (floatingRoleSwitchBtn != null) floatingRoleSwitchBtn!.style.display = 'none';

      // Hide all views, show login
      views.values.forEach((v) => v.classes.remove('active'));
      loginView.classes.add('active');
      activeTab = 'view-login';

      // Reset inputs
      if (empIdInput != null) empIdInput.value = '';

      showToast("Signed out of Resident Portal");
    });


    // Tab Navigation Handlers
    final navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach((tab) {
      tab.onClick.listen((e) {
        e.preventDefault();
        final target = tab.getAttribute('data-target') ?? '';
        switchTab(target);
      });
    });

    // Directory Search & Filter Listeners
    final searchInput = document.getElementById('dir-search') as InputElement?;
    final purokFilter = document.getElementById('filter-purok') as SelectElement?;
    final statusFilter = document.getElementById('filter-status') as SelectElement?;

    searchInput?.onInput.listen((e) => renderDirectory());
    purokFilter?.onChange.listen((e) => renderDirectory());
    statusFilter?.onChange.listen((e) => renderDirectory());

    // Household Detail Modal Close Button
    final closeModalBtn = document.getElementById('btn-close-modal');
    closeModalBtn?.onClick.listen((e) => closeHouseholdModal());

    // Modal background click to close
    final detailModal = document.getElementById('house-detail-modal');
    detailModal?.onClick.listen((e) {
      if (e.target == detailModal) {
        closeHouseholdModal();
      }
    });

    // Handle flow leak simulator toggle inside modal
    final modalLeakToggle = document.getElementById('modal-leak-toggle') as CheckboxInputElement?;
    modalLeakToggle?.onChange.listen((e) {
      if (activeHouseholdId == null) return;
      final newStatus = (modalLeakToggle.checked ?? false) ? 'leak' : 'normal';

      final updated = db.updateHouseholdLeak(activeHouseholdId!, newStatus);
      if (updated != null) {
        final modalFlowRateEl = document.getElementById('modal-flow-rate');
        if (modalFlowRateEl != null) {
          modalFlowRateEl.text = (updated['flow_rate'] as num).toStringAsFixed(2);
        }
        updateLeakToggleLabel(newStatus);
        showToast(newStatus == 'leak' ? "Simulated Leak ALERT activated!" : "Simulated Normal flow rate restored.");
        renderModalLogs(activeHouseholdId!);

        // Auto-set checkout "resolved" status based on toggle
        final logResolvedCheck = document.getElementById('log-resolved') as CheckboxInputElement?;
        if (logResolvedCheck != null) {
          logResolvedCheck.checked = (newStatus == 'normal');
        }
      }
    });

    // Log maintenance report handler
    final submitLogBtn = document.getElementById('btn-submit-log') as ButtonElement?;
    submitLogBtn?.onClick.listen((e) {
      if (activeHouseholdId == null || currentWorker == null) return;

      final descInput = document.getElementById('log-desc') as TextAreaElement?;
      final descText = descInput?.value?.trim() ?? '';
      final logResolvedCheck = document.getElementById('log-resolved') as CheckboxInputElement?;
      final resolvedChecked = logResolvedCheck?.checked ?? true;

      if (descText.isEmpty) {
        showToast("Please detail the maintenance actions taken.");
        return;
      }

      // Add log
      final newLog = {
        'house_id': activeHouseholdId,
        'worker_id': currentWorker!['worker_id'],
        'purok': currentWorker!['selected_zone'],
        'description': descText,
        'status_resolved': resolvedChecked
      };

      db.addMaintenanceLog(newLog);

      // If marked resolved, update household status
      if (resolvedChecked) {
        db.updateHouseholdLeak(activeHouseholdId!, 'normal');
        if (modalLeakToggle != null) modalLeakToggle.checked = false;
        updateLeakToggleLabel('normal');
      }

      // Update UI elements in modal
      final h = db.getHousehold(activeHouseholdId!);
      if (h != null) {
        final modalFlowRateEl = document.getElementById('modal-flow-rate');
        if (modalFlowRateEl != null) {
          modalFlowRateEl.text = (h['flow_rate'] as num).toStringAsFixed(2);
        }
      }

      if (descInput != null) descInput.value = '';
      showToast("Maintenance Log committed to database!");

      renderModalLogs(activeHouseholdId!);
      renderDashboard();
    });

    // Asset status sliders
    final sliderTank = document.getElementById('slider-tank') as RangeInputElement?;
    final sliderPH = document.getElementById('slider-ph') as RangeInputElement?;
    final sliderTurbidity = document.getElementById('slider-turbidity') as RangeInputElement?;

    final simTankVal = document.getElementById('sim-tank-val');
    final simPHVal = document.getElementById('sim-ph-val');
    final simTurbidityVal = document.getElementById('sim-turbidity-val');

    sliderTank?.onInput.listen((e) {
      final val = int.tryParse(sliderTank.value ?? '') ?? 68;
      if (simTankVal != null) simTankVal.text = '$val%';
      updateAssetTelemetry({'main_tank_level': val});
    });

    sliderPH?.onInput.listen((e) {
      final val = double.tryParse(sliderPH.value ?? '') ?? 5.8;
      if (simPHVal != null) simPHVal.text = val.toStringAsFixed(1);
      updateAssetTelemetry({'ph_level': val});
    });

    sliderTurbidity?.onInput.listen((e) {
      final val = double.tryParse(sliderTurbidity.value ?? '') ?? 6.2;
      if (simTurbidityVal != null) simTurbidityVal.text = '${val.toStringAsFixed(1)} NTU';
      updateAssetTelemetry({'turbidity': val});
    });

    // Profile Actions
    final menuWorkorders = document.getElementById('menu-view-logs');
    menuWorkorders?.onClick.listen((e) {
      if (currentWorker == null) return;
      final purokFilterEl = document.getElementById('filter-purok') as SelectElement?;
      final statusFilterEl = document.getElementById('filter-status') as SelectElement?;
      if (purokFilterEl != null) purokFilterEl.value = currentWorker!['selected_zone'];
      if (statusFilterEl != null) statusFilterEl.value = 'leak';
      switchTab('view-directory');
      showToast("Showing leaks in your assigned patrol zone ${currentWorker!['selected_zone']}");
    });

    final menuEmergency = document.getElementById('menu-emergency-call');
    menuEmergency?.onClick.listen((e) {
      showToast("Dispatching radio ping to Barangay Office...", 3500);
    });

    // Resident Ticket Submit Handler
    final residentSubmitLogBtn = document.getElementById('btn-resident-submit-log') as ButtonElement?;
    residentSubmitLogBtn?.onClick.listen((e) {
      if (currentResidentId == null) return;

      final descInput = document.getElementById('resident-log-desc') as TextAreaElement?;
      final descText = descInput?.value?.trim() ?? '';

      if (descText.isEmpty) {
        showToast("Please describe the issue (e.g. low pressure, minor leak).");
        return;
      }

      final household = db.getHousehold(currentResidentId!);
      if (household == null) return;

      final log = {
        'house_id': currentResidentId,
        'worker_id': 'unassigned',
        'purok': household['purok'],
        'description': '$descText (RESIDENT REPORTED)',
        'status_resolved': false
      };

      db.addMaintenanceLog(log);

      if (descInput != null) descInput.value = '';
      showToast("Alert ticket dispatched to field technicians!");

      renderDashboard();
    });
  }

  void showLoginError(String msg, Element? errorEl) {
    if (errorEl != null) {
      errorEl.innerHtml = msg;
      errorEl.style.display = 'block';
    }
  }

  void showApp(Map<String, dynamic> worker) {
    // Hide login
    loginView.classes.remove('active');

    // Show nav
    bottomNav.style.display = 'flex';

    // Show quick switch
    if (floatingRoleSwitchBtn != null) {
      floatingRoleSwitchBtn!.style.display = 'flex';
      floatingRoleSwitchBtn!.classes.remove('resident-mode');
      if (floatingRoleSwitchText != null) floatingRoleSwitchText!.text = 'Customer Mode';
    }

    switchTab('view-dashboard');

    renderDashboard();
    renderDirectory();
    renderAssets();
    renderProfile();
    initBillingView();
  }

  void switchTab(String targetViewId) {
    activeTab = targetViewId;

    final navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach((tab) {
      if (tab.getAttribute('data-target') == targetViewId) {
        tab.classes.add('active');
      } else {
        tab.classes.remove('active');
      }
    });

    views.forEach((key, view) {
      if (key == targetViewId) {
        view.classes.add('active');
      } else {
        view.classes.remove('active');
      }
    });

    // Refresh telemetry and states on tab focus
    if (targetViewId == 'view-dashboard') {
      renderDashboard();
    } else if (targetViewId == 'view-directory') {
      renderDirectory();
    } else if (targetViewId == 'view-assets') {
      renderAssets();
    } else if (targetViewId == 'view-profile') {
      renderProfile();
    } else if (targetViewId == 'view-billing') {
      renderBillingView(null);
    }
  }

  // --- Dashboard Controller ---
  void renderDashboard() {
    if (currentWorker == null) return;

    final dashTitle = document.getElementById('dash-worker-title');
    if (dashTitle != null) {
      dashTitle.text = 'Field Terminal: ${currentWorker!['selected_zone']}';
    }

    final households = db.getHouseholds();
    final assets = db.getCentralAssets();
    final logs = db.getMaintenanceLogs();

    final activeLeaks = households.where((h) => h['current_leak_status'] == 'leak').toList();

    int qualityAlertCount = 0;
    final List<Map<String, String>> qualityAlerts = [];
    if (assets['ph_status'] == 'warning') {
      qualityAlertCount++;
      qualityAlerts.add({'type': 'quality', 'name': 'Central Reservoir pH Alert', 'desc': assets['ph_desc']});
    }
    if (assets['turbidity_status'] == 'warning') {
      qualityAlertCount++;
      qualityAlerts.add({'type': 'quality', 'name': 'Central Turbidity Alert', 'desc': assets['turbidity_desc']});
    }

    final totalAlerts = activeLeaks.length + qualityAlertCount;

    final alertCountEl = document.getElementById('dash-alert-count');
    if (alertCountEl != null) {
      alertCountEl.text = totalAlerts.toString();
    }

    final alertWidget = document.getElementById('dashboard-alert-widget');
    final alertListEl = document.getElementById('dash-alert-list');

    if (alertWidget != null && alertListEl != null) {
      alertListEl.innerHtml = '';

      if (totalAlerts == 0) {
        alertWidget.style.borderColor = 'var(--alert-green)';
        final title = alertWidget.querySelector('.alert-widget-title') as HtmlElement?;
        if (title != null) title.style.color = 'var(--alert-green)';
        alertListEl.innerHtml = '''
          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">
            <div class="alert-item-icon">
              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <div class="alert-item-text" style="color: var(--text-on-dark)">No active leaks or water quality issues in Brgy. Tagpopongan.</div>
          </div>
        ''';
      } else {
        alertWidget.style.borderColor = 'var(--amber-safety)';
        final title = alertWidget.querySelector('.alert-widget-title') as HtmlElement?;
        if (title != null) title.style.color = 'var(--amber-safety)';

        // Add leaks
        activeLeaks.forEach((leak) {
          final item = document.createElement('div');
          item.className = 'alert-item leak';
          item.style.cursor = 'pointer';
          item.innerHtml = '''
            <div class="alert-item-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
            </div>
            <div class="alert-item-text">
              <strong>${leak['owner_name']} (${leak['purok']})</strong><br>
              Leak alert: Flow rate at ${(leak['flow_rate'] as num).toStringAsFixed(2)} L/s constant.
            </div>
          ''';
          item.onClick.listen((e) {
            openHouseholdModal(leak['house_id']);
          });
          alertListEl.append(item);
        });

        // Add quality alerts
        qualityAlerts.forEach((qa) {
          final item = document.createElement('div');
          item.className = 'alert-item quality';
          item.style.cursor = 'pointer';
          item.innerHtml = '''
            <div class="alert-item-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>
            </div>
            <div class="alert-item-text">
              <strong>${qa['name']}</strong><br>
              ${qa['desc']}
            </div>
          ''';
          item.onClick.listen((e) {
            switchTab('view-assets');
          });
          alertListEl.append(item);
        });
      }
    }

    // Update Interactive SVG Map Pins
    final puroks = ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6'];
    puroks.asMap().forEach((i, pur) {
      final pinId = 'pin-p${i + 1}';
      final pinEl = document.getElementById(pinId);
      if (pinEl != null) {
        final pinBg = pinEl.querySelector('.pin-bg');
        final hasLeak = households.any((h) => h['purok'] == pur && h['current_leak_status'] == 'leak');

        if (pinBg != null) {
          if (hasLeak) {
            pinBg.setAttribute('fill', 'var(--alert-red)');
            pinBg.setAttribute('stroke', '#FFF');
            pinBg.setAttribute('stroke-width', '1.5');
          } else {
            pinBg.setAttribute('fill', 'var(--alert-green)');
            pinBg.removeAttribute('stroke');
          }
        }

        pinEl.style.cursor = 'pointer';
        // Remove old listener if any by cloning (in Dart, replace with clone to easily strip event listeners)
        final newPin = pinEl.clone(true) as Element;
        pinEl.replaceWith(newPin);
        newPin.onClick.listen((e) {
          final purokFilterEl = document.getElementById('filter-purok') as SelectElement?;
          final statusFilterEl = document.getElementById('filter-status') as SelectElement?;
          if (purokFilterEl != null) purokFilterEl.value = pur;
          if (statusFilterEl != null) statusFilterEl.value = 'all';
          switchTab('view-directory');
        });
      }
    });

    // Render Zone Cards Grid
    final zoneGrid = document.getElementById('dashboard-zone-grid');
    if (zoneGrid != null) {
      zoneGrid.innerHtml = '';

      puroks.forEach((pur) {
        final totalMeters = households.where((h) => h['purok'] == pur).length;
        final zoneLeaks = households.where((h) => h['purok'] == pur && h['current_leak_status'] == 'leak').length;
        final isAssigned = (currentWorker!['selected_zone'] == pur);

        final card = document.createElement('div');
        card.className = 'zone-card ${isAssigned ? 'assigned' : ''}';
        card.innerHtml = '''
          <div class="zone-card-header">
            <span class="zone-name">$pur</span>
            ${isAssigned ? '<span class="zone-badge">ASSIGNED</span>' : ''}
          </div>
          <div class="zone-stats">
            <span>Meters: <strong>$totalMeters</strong></span>
            <span class="zone-leak-count">${zoneLeaks > 0 ? '$zoneLeaks Leaks' : 'Clear'}</span>
          </div>
        ''';
        card.onClick.listen((e) {
          final purokFilterEl = document.getElementById('filter-purok') as SelectElement?;
          final statusFilterEl = document.getElementById('filter-status') as SelectElement?;
          if (purokFilterEl != null) purokFilterEl.value = pur;
          if (statusFilterEl != null) statusFilterEl.value = 'all';
          switchTab('view-directory');
        });
        zoneGrid.append(card);
      });
    }

    // Activity Logs Glance
    final logCountEl = document.getElementById('dash-log-count');
    final logListEl = document.getElementById('dash-log-list');

    if (logListEl != null) {
      logListEl.innerHtml = '';
      final recentLogs = logs.take(3).toList();
      if (logCountEl != null) {
        logCountEl.text = '${logs.length} logged';
      }

      if (recentLogs.isEmpty) {
        logListEl.innerHtml = '<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>';
      } else {
        recentLogs.forEach((log) {
          final hh = households.firstWhere((h) => h['house_id'] == log['house_id'], orElse: () => <String, dynamic>{});
          final ownerName = hh.isNotEmpty ? hh['owner_name'] : 'Unknown Household';
          
          final card = document.createElement('div');
          card.className = 'log-card ${log['status_resolved'] == true ? 'resolved' : 'pending'}';

          // Format date
          final logDate = DateTime.parse(log['date'] as String).toLocal();
          final formattedDate = _formatDateTime(logDate);

          card.innerHtml = '''
            <div class="log-card-header">
              <span>$ownerName</span>
              <span style="font-size:10px; color:var(--text-muted)">$formattedDate</span>
            </div>
            <div class="log-card-desc">${log['description']}</div>
          ''';
          logListEl.append(card);
        });
      }
    }
  }

  // Helper date formatter
  String _formatDateTime(DateTime dt) {
    final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    final hour = dt.hour % 12 == 0 ? 12 : dt.hour % 12;
    final minute = dt.minute.toString().padLeft(2, '0');
    final ampm = dt.hour >= 12 ? 'PM' : 'AM';
    return '${months[dt.month - 1]} ${dt.day} $hour:$minute $ampm';
  }

  // --- Directory & Search Controller ---
  void renderDirectory() {
    final households = db.getHouseholds();
    
    final searchInput = document.getElementById('dir-search') as InputElement?;
    final purokFilter = document.getElementById('filter-purok') as SelectElement?;
    final statusFilter = document.getElementById('filter-status') as SelectElement?;
    
    final query = searchInput?.value?.toLowerCase().trim() ?? '';
    final selectedPurok = purokFilter?.value ?? 'all';
    final selectedStatus = statusFilter?.value ?? 'all';

    final emptyState = document.getElementById('dir-empty-state');
    final dirListEl = document.getElementById('dir-household-list');

    if (dirListEl == null) return;
    dirListEl.innerHtml = '';

    final filtered = households.where((h) {
      final matchesSearch = h['owner_name'].toString().toLowerCase().contains(query) ||
          h['account_number'].toString().toLowerCase().contains(query) ||
          h['house_id'].toString().toLowerCase().contains(query);
      
      final matchesPurok = (selectedPurok == 'all' || h['purok'] == selectedPurok);
      final matchesStatus = (selectedStatus == 'all' || h['current_leak_status'] == selectedStatus);

      return matchesSearch && matchesPurok && matchesStatus;
    }).toList();

    if (filtered.isEmpty) {
      if (emptyState != null) emptyState.style.display = 'block';
    } else {
      if (emptyState != null) emptyState.style.display = 'none';

      filtered.forEach((h) {
        final card = document.createElement('div');
        card.className = 'household-card ${h['current_leak_status'] == 'leak' ? 'has-leak' : ''}';

        card.innerHtml = '''
          <div class="household-info">
            <span class="household-name">${h['owner_name']}</span>
            <div class="household-meta">
              <span class="household-purok">${h['purok']}</span>
              <span class="household-acct">${h['account_number']}</span>
            </div>
            <div class="household-usage">Usage this Month: <strong>${h['current_m3_usage']} m³</strong></div>
          </div>
          <div class="household-status-section">
            <span class="status-indicator ${h['current_leak_status']}">
              ${h['current_leak_status'] == 'leak'
                ? '<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak'
                : '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
              }
            </span>
            <span class="household-flow">Flow: <span>${(h['flow_rate'] as num).toStringAsFixed(2)} L/s</span></span>
          </div>
        ''';

        card.onClick.listen((e) {
          openHouseholdModal(h['house_id']);
        });

        dirListEl.append(card);
      });
    }
  }

  // --- Household Detail Modal Drawer Controller ---
  void openHouseholdModal(String id) {
    activeHouseholdId = id;
    final h = db.getHousehold(id);
    if (h == null) return;

    // Fill textual fields
    final modalOwnerName = document.getElementById('modal-owner-name');
    final modalAcctNum = document.getElementById('modal-acct-num');
    final modalCurrentM3 = document.getElementById('modal-current-m3');
    final modalFlowRate = document.getElementById('modal-flow-rate');

    if (modalOwnerName != null) modalOwnerName.text = h['owner_name'];
    if (modalAcctNum != null) modalAcctNum.text = '${h['house_id']} | ${h['account_number']}';
    if (modalCurrentM3 != null) modalCurrentM3.text = (h['current_m3_usage'] as num).toStringAsFixed(1);
    if (modalFlowRate != null) modalFlowRate.text = (h['flow_rate'] as num).toStringAsFixed(2);

    // Set Leak toggle state
    final modalLeakToggle = document.getElementById('modal-leak-toggle') as CheckboxInputElement?;
    if (modalLeakToggle != null) {
      modalLeakToggle.checked = (h['current_leak_status'] == 'leak');
    }
    updateLeakToggleLabel(h['current_leak_status']);

    // Render historical consumption chart
    renderSVGChart(List<num>.from(h['monthly_history']), 'chart-container');

    // Render historical logs
    renderModalLogs(id);

    // Reset log input fields
    final logDesc = document.getElementById('log-desc') as TextAreaElement?;
    final logResolved = document.getElementById('log-resolved') as CheckboxInputElement?;

    if (logDesc != null) logDesc.value = '';
    if (logResolved != null) {
      logResolved.checked = (h['current_leak_status'] == 'leak');
    }

    // Show modal container
    final detailModal = document.getElementById('house-detail-modal');
    if (detailModal != null) {
      detailModal.classes.add('active');
    }
  }

  void closeHouseholdModal() {
    final detailModal = document.getElementById('house-detail-modal');
    if (detailModal != null) {
      detailModal.classes.remove('active');
    }
    activeHouseholdId = null;

    // Refresh lists
    renderDashboard();
    renderDirectory();
  }

  void updateLeakToggleLabel(String status) {
    final leakTitleEl = document.getElementById('modal-leak-title');
    final leakDescEl = document.getElementById('modal-leak-desc');
    if (leakTitleEl == null || leakDescEl == null) return;

    if (status == 'leak') {
      leakTitleEl.text = "Leak State Sim: HIGH CONSTANT FLOW";
      leakTitleEl.style.color = 'var(--alert-red)';
      leakDescEl.text = "Meter detects flow rate exceeds safety coefficient threshold.";
    } else {
      leakTitleEl.text = "Flow State Sim: NORMAL FLOW";
      leakTitleEl.style.color = 'var(--alert-green)';
      leakDescEl.text = "Meter flow matches normal residential consumption metrics.";
    }
  }

  // --- Dynamic SVG Chart Renderer ---
  void renderSVGChart(List<num> history, String containerId) {
    final container = document.getElementById(containerId);
    if (container == null) return;
    container.innerHtml = '';

    if (history.isEmpty) {
      container.innerHtml = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>';
      return;
    }

    // Chart dimensions
    const width = 340;
    const height = 100;
    const padding = 20;

    const chartW = width - (padding * 2);
    const chartH = height - (padding * 2);

    // Calculate scale
    final maxVal = (history.reduce((a, b) => a > b ? a : b) * 1.1).clamp(10.0, 1000.0);
    const minVal = 0.0;

    final months = ['Mar', 'Apr', 'May', 'Jun'];

    final points = history.asMap().entries.map((entry) {
      final idx = entry.key;
      final val = entry.value;
      final x = padding + (idx / (history.length - 1)) * chartW;
      final y = padding + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      return {'x': x, 'y': y, 'val': val, 'label': months[idx]};
    }).toList();

    // Line Path
    final linePath = points.map((p) => '${(p['x'] as num).toStringAsFixed(1)},${(p['y'] as num).toStringAsFixed(1)}').join(' ');

    // Area Path
    final areaPath = 'M ${ (points[0]['x'] as num).toStringAsFixed(1) },${(height - padding).toStringAsFixed(1)} ' +
        points.map((p) => 'L ${(p['x'] as num).toStringAsFixed(1)},${(p['y'] as num).toStringAsFixed(1)}').join(' ') +
        ' L ${(points[points.length - 1]['x'] as num).toStringAsFixed(1)},${(height - padding).toStringAsFixed(1)} Z';

    final gradientId = containerId == 'resident-chart-container' ? 'res-chart-grad' : 'chart-area-grad';
    final strokeColor = containerId == 'resident-chart-container' ? '#3B82F6' : 'var(--amber-safety)';
    final gradientColor = containerId == 'resident-chart-container' ? '#3B82F6' : 'var(--amber-safety)';

    var svgHtml = '''
      <svg width="100%" height="100%" viewBox="0 0 $width $height" style="overflow:visible">
        <defs>
          <linearGradient id="$gradientId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="$gradientColor" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="$gradientColor" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        
        <line x1="$padding" y1="$padding" x2="${width - padding}" y2="$padding" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="$padding" y1="${padding + (chartH / 2)}" x2="${width - padding}" y2="${padding + (chartH / 2)}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="$padding" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#CBD5E1" stroke-width="1.5"/>
        
        <path d="$areaPath" fill="url(#$gradientId)" />
        <polyline points="$linePath" fill="none" stroke="$strokeColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ''';

    points.forEach((p) {
      svgHtml += '''
        <text x="${p['x']}" y="${height - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">${p['label']}</text>
        <line x1="${p['x']}" y1="${p['y']}" x2="${p['x']}" y2="${height - padding}" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />
        <circle cx="${p['x']}" cy="${p['y']}" r="4" fill="var(--white)" stroke="$strokeColor" stroke-width="2" />
        <text x="${p['x']}" y="${(p['y'] as num) - 8}" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">${p['val']}m³</text>
      ''';
    });

    svgHtml += '</svg>';
    container.innerHtml = svgHtml;
  }

  // --- Modal Historical Logs Renderer ---
  void renderModalLogs(String houseId) {
    final historicalLogsEl = document.getElementById('modal-historical-logs');
    if (historicalLogsEl == null) return;
    historicalLogsEl.innerHtml = '';

    final logs = db.getMaintenanceLogs().where((l) => l['house_id'] == houseId).toList();

    if (logs.isEmpty) {
      historicalLogsEl.innerHtml = '<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>';
    } else {
      logs.forEach((log) {
        final item = document.createElement('div');
        item.className = 'log-card ${log['status_resolved'] == true ? 'resolved' : 'pending'}';

        final logDate = DateTime.parse(log['date'] as String).toLocal();
        final formatted = '${logDate.month}/${logDate.day}/${logDate.year} @ ${_pad(logDate.hour)}:${_pad(logDate.minute)}';

        item.innerHtml = '''
          <div class="log-card-header">
            <span>Tech: <strong>${log['worker_id']}</strong></span>
            <span style="font-size:10px; color:var(--text-muted)">$formatted</span>
          </div>
          <div class="log-card-desc">${log['description']}</div>
          <div style="font-size: 9px; font-weight:700; color:${log['status_resolved'] == true ? 'var(--alert-green)' : 'var(--amber-safety)'}; margin-top:4px; text-transform:uppercase">
            Status: ${log['status_resolved'] == true ? 'Resolved (Flow Restored)' : 'In Progress (Active Monitoring)'}
          </div>
        ''';
        historicalLogsEl.append(item);
      });
    }
  }

  String _pad(int val) => val.toString().padLeft(2, '0');

  // --- Asset Status & Hardware Simulator ---
  void updateAssetTelemetry(Map<String, dynamic> updates) {
    db.updateCentralAssets(updates);
    renderAssets();
  }

  void renderAssets() {
    final assets = db.getCentralAssets();

    final sliderTank = document.getElementById('slider-tank') as RangeInputElement?;
    final sliderPH = document.getElementById('slider-ph') as RangeInputElement?;
    final sliderTurbidity = document.getElementById('slider-turbidity') as RangeInputElement?;

    final simTankVal = document.getElementById('sim-tank-val');
    final simPHVal = document.getElementById('sim-ph-val');
    final simTurbidityVal = document.getElementById('sim-turbidity-val');

    if (document.activeElement != sliderTank && sliderTank != null) {
      sliderTank.value = assets['main_tank_level'].toString();
      if (simTankVal != null) simTankVal.text = '${assets['main_tank_level']}%';
    }

    if (document.activeElement != sliderPH && sliderPH != null) {
      sliderPH.value = assets['ph_level'].toString();
      if (simPHVal != null) simPHVal.text = (assets['ph_level'] as num).toStringAsFixed(1);
    }

    if (document.activeElement != sliderTurbidity && sliderTurbidity != null) {
      sliderTurbidity.value = assets['turbidity'].toString();
      if (simTurbidityVal != null) simTurbidityVal.text = '${(assets['turbidity'] as num).toStringAsFixed(1)} NTU';
    }

    // 1. Tank Level Progress
    final tankPercentEl = document.getElementById('asset-tank-percent');
    final tankFillEl = document.getElementById('asset-tank-fill');
    final tankBannerEl = document.getElementById('asset-tank-banner');

    final mainTankLevel = assets['main_tank_level'] as int;

    if (tankPercentEl != null) tankPercentEl.text = '$mainTankLevel%';
    if (tankFillEl != null) tankFillEl.style.height = '$mainTankLevel%';

    if (tankBannerEl != null && tankFillEl != null) {
      if (mainTankLevel < 30) {
        tankBannerEl.text = "CRITICAL: Low Water Reserve. High pressure risk in Zone 4 & 5!";
        tankBannerEl.className = "reservoir-status-banner low";
        tankFillEl.style.background = 'linear-gradient(180deg, #F87171 0%, #DC2626 100%)';
      } else if (mainTankLevel < 50) {
        tankBannerEl.text = "WARNING: Moderate Reserve. Stabilizing flow valves recommended.";
        tankBannerEl.className = "reservoir-status-banner";
        tankBannerEl.style.backgroundColor = 'var(--alert-amber-bg)';
        tankBannerEl.style.borderColor = 'rgba(249, 115, 22, 0.3)';
        tankBannerEl.style.color = 'var(--amber-safety)';
        tankFillEl.style.background = 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)';
      } else {
        tankBannerEl.text = "Reservoir Status: Normal Operating Pressure";
        tankBannerEl.className = "reservoir-status-banner";
        tankBannerEl.style.backgroundColor = 'var(--alert-green-bg)';
        tankBannerEl.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        tankBannerEl.style.color = 'var(--alert-green)';
        tankFillEl.style.background = 'linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)';
      }
    }

    // 2. pH Acidity Level
    final phValEl = document.getElementById('asset-ph-val');
    final phBadgeEl = document.getElementById('asset-ph-badge');
    final phPointerEl = document.getElementById('asset-ph-pointer');
    final phDescEl = document.getElementById('asset-ph-desc');

    final phLevel = assets['ph_level'] as num;

    if (phValEl != null) phValEl.text = phLevel.toStringAsFixed(1);

    if (phPointerEl != null) {
      double phPos = ((phLevel - 4) / 6) * 100;
      phPos = phPos.clamp(0.0, 100.0);
      phPointerEl.style.left = '$phPos%';
    }

    if (phBadgeEl != null) {
      phBadgeEl.text = assets['ph_status'].toString().toUpperCase();
      phBadgeEl.className = 'quality-badge ${assets['ph_status']}';
    }
    if (phDescEl != null) phDescEl.text = assets['ph_desc'];

    // 3. Turbidity Level
    final turbValEl = document.getElementById('asset-turbidity-val');
    final turbBadgeEl = document.getElementById('asset-turbidity-badge');
    final turbFillEl = document.getElementById('asset-turbidity-fill');
    final turbDescEl = document.getElementById('asset-turbidity-desc');

    final turbidity = assets['turbidity'] as num;

    if (turbValEl != null) turbValEl.text = turbidity.toStringAsFixed(1);

    if (turbFillEl != null) {
      double turbPercent = (turbidity / 12) * 100;
      turbPercent = turbPercent.clamp(0.0, 100.0);
      turbFillEl.style.width = '$turbPercent%';

      if (assets['turbidity_status'] == 'warning') {
        turbFillEl.style.backgroundColor = 'var(--amber-safety)';
      } else {
        turbFillEl.style.backgroundColor = 'var(--alert-green)';
      }
    }

    if (turbBadgeEl != null) {
      turbBadgeEl.text = assets['turbidity_status'].toString().toUpperCase();
      turbBadgeEl.className = 'quality-badge ${assets['turbidity_status']}';
    }
    if (turbDescEl != null) turbDescEl.text = assets['turbidity_desc'];
  }

  // --- Profile View Controller ---
  void renderProfile() {
    if (currentWorker == null) return;

    final workerNameEl = document.getElementById('worker-name');
    final workerRoleEl = document.getElementById('worker-role');
    final workerZoneLbl = document.getElementById('worker-zone-lbl');
    final workerAvatarEl = document.getElementById('worker-avatar');

    if (workerNameEl != null) workerNameEl.text = currentWorker!['name'];
    if (workerRoleEl != null) workerRoleEl.text = currentWorker!['role'];
    if (workerZoneLbl != null) workerZoneLbl.text = 'Assigned Zone: ${currentWorker!['selected_zone']}';

    if (workerAvatarEl != null) {
      final List<String> parts = currentWorker!['name'].toString().split(' ');
      final initials = parts.map((n) => n.isNotEmpty ? n[0] : '').join('').substring(0, parts.length.clamp(1, 2));
      workerAvatarEl.text = initials.toUpperCase();
    }

    final households = db.getHouseholds();
    final zoneCount = households.where((h) => h['purok'] == currentWorker!['selected_zone']).length;
    final myLogs = db.getMaintenanceLogs().where((l) => l['worker_id'] == currentWorker!['worker_id'] && l['status_resolved'] == true).length;

    final profileStatTotal = document.getElementById('profile-stat-total');
    final profileStatLogs = document.getElementById('profile-stat-logs');

    if (profileStatTotal != null) profileStatTotal.text = zoneCount.toString();
    if (profileStatLogs != null) profileStatLogs.text = myLogs.toString();
  }

  // --- Billing View Controller ---
  String? selectedBillHouseId;

  void initBillingView() {
    final billMeterSearch = document.getElementById('bill-meter-search') as InputElement?;
    final billMeterResults = document.getElementById('bill-meter-results');
    final billCurrInput = document.getElementById('bill-curr-input') as InputElement?;
    final btnSaveBill = document.getElementById('btn-save-bill') as ButtonElement?;

    if (billMeterSearch == null) return;

    billMeterSearch.onFocus.listen((e) => showBillingSearchResults());
    billMeterSearch.onInput.listen((e) => showBillingSearchResults());

    billCurrInput?.onInput.listen((e) => updateBillCalculations());

    document.onClick.listen((e) {
      final target = e.target as Element?;
      if (target != null && !billMeterSearch.contains(target) && billMeterResults != null && !billMeterResults.contains(target)) {
        billMeterResults.style.display = 'none';
      }
    });

    btnSaveBill?.onClick.listen((e) => saveWaterBill());

    // Seed default first item
    final households = db.getHouseholds();
    if (households.isNotEmpty) {
      selectedBillHouseId = households[0]['house_id'];
      billMeterSearch.value = '${households[0]['owner_name']} (${households[0]['account_number']})';
    }
  }

  void showBillingSearchResults() {
    final billMeterSearch = document.getElementById('bill-meter-search') as InputElement?;
    final billMeterResults = document.getElementById('bill-meter-results');
    if (billMeterSearch == null || billMeterResults == null) return;

    final query = billMeterSearch.value?.toLowerCase().trim() ?? '';
    final households = db.getHouseholds();

    final matches = households.where((h) {
      return h['owner_name'].toString().toLowerCase().contains(query) ||
          h['account_number'].toString().toLowerCase().contains(query);
    }).toList();

    billMeterResults.innerHtml = '';

    if (matches.isEmpty) {
      billMeterResults.innerHtml = '<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>';
      billMeterResults.style.display = 'block';
      return;
    }

    matches.forEach((h) {
      final item = document.createElement('div');
      item.className = 'search-result-item';
      item.text = '${h['owner_name']} (${h['account_number']})';
      item.onClick.listen((e) {
        billMeterSearch.value = '${h['owner_name']} (${h['account_number']})';
        billMeterResults.style.display = 'none';
        renderBillingView(h['house_id']);
      });
      billMeterResults.append(item);
    });

    billMeterResults.style.display = 'block';
  }

  void renderBillingView(String? houseId) {
    if (houseId != null) {
      selectedBillHouseId = houseId;
    }

    if (selectedBillHouseId == null) return;

    final household = db.getHousehold(selectedBillHouseId!);
    if (household == null) return;

    final billPrevReading = document.getElementById('bill-prev-reading');
    final billCurrInput = document.getElementById('bill-curr-input') as InputElement?;

    final historyBills = db.getBillingHistoryForHousehold(selectedBillHouseId!);
    double prevReading = 0.0;

    if (historyBills.isNotEmpty) {
      prevReading = (historyBills[0]['current_reading'] as num).toDouble();
    } else {
      final List<num> hist = List<num>.from(household['monthly_history']);
      prevReading = hist.length >= 2 ? hist[hist.length - 2].toDouble() : (household['current_m3_usage'] as num).toDouble() - 2.5;
    }

    if (billPrevReading != null) billPrevReading.text = prevReading.toStringAsFixed(1);

    if (houseId != null && billCurrInput != null) {
      billCurrInput.value = (household['current_m3_usage'] as num).toStringAsFixed(1);
    }

    updateBillCalculations();
    renderBillingHistoryList(selectedBillHouseId!);
  }

  void updateBillCalculations() {
    if (selectedBillHouseId == null) return;

    final billPrevReading = document.getElementById('bill-prev-reading');
    final billCurrInput = document.getElementById('bill-curr-input') as InputElement?;

    final prevVal = double.tryParse(billPrevReading?.text ?? '') ?? 0.0;
    final currVal = double.tryParse(billCurrInput?.value ?? '') ?? 0.0;

    double consumption = currVal - prevVal;
    if (consumption < 0.0) consumption = 0.0;

    final billCalcConsumption = document.getElementById('bill-calc-consumption');
    if (billCalcConsumption != null) billCalcConsumption.text = consumption.toStringAsFixed(1);

    const baseCharge = 120.00;
    double excessCharge = 0.00;
    if (consumption > 10.0) {
      excessCharge = (consumption - 10.0) * 15.00;
    }

    final billCalcExcess = document.getElementById('bill-calc-excess');
    if (billCalcExcess != null) billCalcExcess.text = excessCharge.toStringAsFixed(2);

    const maintenanceFee = 50.00;
    final totalDue = baseCharge + excessCharge + maintenanceFee;

    final billCalcTotal = document.getElementById('bill-calc-total');
    if (billCalcTotal != null) billCalcTotal.text = totalDue.toStringAsFixed(2);

    // Double billing safeguard
    final isBilled = db.hasBeenBilledThisMonth(selectedBillHouseId!, "June 2026");
    final billingAlertBanner = document.getElementById('billing-alert-banner');
    final btnSaveBill = document.getElementById('btn-save-bill') as ButtonElement?;

    if (billingAlertBanner != null) {
      if (isBilled) {
        billingAlertBanner.innerHtml = '''
          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
          <span>DOUBLE-BILLING BLOCKED: Bill already registered for June 2026.</span>
        ''';
        billingAlertBanner.className = "reservoir-status-banner low";
        billingAlertBanner.style.backgroundColor = "var(--alert-red-bg)";
        billingAlertBanner.style.borderColor = "rgba(239, 68, 68, 0.3)";
        billingAlertBanner.style.color = "var(--alert-red)";

        if (btnSaveBill != null) {
          btnSaveBill.disabled = true;
          btnSaveBill.style.opacity = "0.5";
          btnSaveBill.style.cursor = "not-allowed";
          final txtSpan = btnSaveBill.querySelector('span');
          if (txtSpan != null) txtSpan.text = "Register Blocked (Billed)";
        }
      } else {
        billingAlertBanner.innerHtml = '''
          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <span>CLEAR: Safe to bill June 2026. No duplicates found.</span>
        ''';
        billingAlertBanner.className = "reservoir-status-banner";
        billingAlertBanner.style.backgroundColor = "var(--alert-green-bg)";
        billingAlertBanner.style.borderColor = "rgba(16, 185, 129, 0.3)";
        billingAlertBanner.style.color = "var(--alert-green)";

        if (btnSaveBill != null) {
          btnSaveBill.disabled = false;
          btnSaveBill.style.opacity = "1";
          btnSaveBill.style.cursor = "pointer";
          final txtSpan = btnSaveBill.querySelector('span');
          if (txtSpan != null) txtSpan.text = "Register & Save Bill";
        }
      }
    }
  }

  void saveWaterBill() {
    if (selectedBillHouseId == null || currentWorker == null) return;

    final isBilled = db.hasBeenBilledThisMonth(selectedBillHouseId!, "June 2026");
    if (isBilled) {
      showToast("Operation blocked to prevent double-billing!");
      return;
    }

    final billPrevReading = document.getElementById('bill-prev-reading');
    final billCurrInput = document.getElementById('bill-curr-input') as InputElement?;
    final billCalcConsumption = document.getElementById('bill-calc-consumption');
    final billCalcExcess = document.getElementById('bill-calc-excess');

    final prevVal = double.tryParse(billPrevReading?.text ?? '') ?? 0.0;
    final currVal = double.tryParse(billCurrInput?.value ?? '') ?? 0.0;
    final consumption = double.tryParse(billCalcConsumption?.text ?? '') ?? 0.0;
    final excessCharge = double.tryParse(billCalcExcess?.text ?? '') ?? 0.0;
    final totalDue = 120.00 + excessCharge + 50.00;

    final household = db.getHousehold(selectedBillHouseId!);
    if (household == null) return;

    final record = {
      'house_id': selectedBillHouseId,
      'account_number': household['account_number'],
      'billing_month': 'June 2026',
      'previous_reading': prevVal,
      'current_reading': currVal,
      'consumption': consumption,
      'water_charge': 120.00 + excessCharge,
      'maintenance_fee': 50.00,
      'total_due': totalDue,
      'billed_by': currentWorker!['worker_id']
    };

    db.addBillingRecord(record);

    showToast("June 2026 bill registered for ${household['owner_name']}!");
    updateBillCalculations();
    renderBillingHistoryList(selectedBillHouseId!);
    renderProfile();
  }

  void renderBillingHistoryList(String houseId) {
    final billingHistoryList = document.getElementById('billing-history-list');
    if (billingHistoryList == null) return;

    billingHistoryList.innerHtml = '';
    final history = db.getBillingHistoryForHousehold(houseId);

    if (history.isEmpty) {
      billingHistoryList.innerHtml = '<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>';
    } else {
      history.forEach((bill) {
        final item = document.createElement('div');
        item.className = 'bill-record-card ${bill['status']}';

        final billDate = DateTime.parse(bill['date'] as String).toLocal();
        final formattedDate = '${billDate.month}/${billDate.day}/${billDate.year} ${_pad(billDate.hour)}:${_pad(billDate.minute)}';

        item.innerHtml = '''
          <div class="bill-record-header">
            <span>Cycle: ${bill['billing_month']}</span>
            <span style="color:${bill['status'] == 'Paid' ? 'var(--alert-green)' : 'var(--amber-safety)'}">${bill['status'].toString().toUpperCase()}</span>
          </div>
          <div class="bill-record-details">
            <span>Readings: ${(bill['previous_reading'] as num).toStringAsFixed(1)} → ${(bill['current_reading'] as num).toStringAsFixed(1)} m³</span>
            <strong>₱${(bill['total_due'] as num).toStringAsFixed(2)}</strong>
          </div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">
            <span>Bill ID: ${bill['bill_id']}</span>
            <span>Tech: ${bill['billed_by']}</span>
          </div>
        ''';
        billingHistoryList.append(item);
      });
    }
  }

  // --- UI Toast Notification Helper ---
  Timer? toastTimer;
  void showToast(String text, [int duration = 2500]) {
    final toast = document.getElementById('app-toast');
    final toastText = document.getElementById('toast-text');

    if (toast != null && toastText != null) {
      toastText.text = text;
      toast.classes.add('show');

      if (toastTimer != null) {
        toastTimer!.cancel();
      }

      toastTimer = Timer(Duration(milliseconds: duration), () {
        toast.classes.remove('show');
      });
    }
  }

  // --- Resident Portal Controller ---
  void showResidentPortal(String houseId) {
    currentResidentId = houseId;
    window.localStorage['waterhall_resident_session'] = houseId;

    views.values.forEach((v) => v.classes.remove('active'));
    bottomNav.style.display = 'none';

    if (floatingRoleSwitchBtn != null) {
      floatingRoleSwitchBtn!.style.display = 'flex';
      floatingRoleSwitchBtn!.classes.add('resident-mode');
      if (floatingRoleSwitchText != null) floatingRoleSwitchText!.text = 'Tech Mode';
    }

    residentView.classes.add('active');
    activeTab = 'view-resident';

    renderResidentDashboard();
  }

  void renderResidentDashboard() {
    if (currentResidentId == null) return;

    final household = db.getHousehold(currentResidentId!);
    if (household == null) return;

    final assets = db.getCentralAssets();
    final resTankVal = document.getElementById('resident-tank-val');
    final resPHVal = document.getElementById('resident-ph-val');
    final resTurbVal = document.getElementById('resident-turb-val');
    final resSafetyStatus = document.getElementById('resident-safety-status');

    if (resTankVal != null) resTankVal.text = '${assets['main_tank_level']}%';
    if (resPHVal != null) resPHVal.text = (assets['ph_level'] as num).toStringAsFixed(1);
    if (resTurbVal != null) resTurbVal.text = (assets['turbidity'] as num).toStringAsFixed(1);

    if (resSafetyStatus != null) {
      if (assets['ph_status'] == 'warning' || assets['turbidity_status'] == 'warning') {
        resSafetyStatus.text = 'ALERT';
        resSafetyStatus.style.color = 'var(--alert-red)';
      } else {
        resSafetyStatus.text = 'SAFE';
        resSafetyStatus.style.color = 'var(--alert-green)';
      }
    }

    final resProfileName = document.getElementById('resident-profile-name');
    final resProfileMeta = document.getElementById('resident-profile-meta');

    if (resProfileName != null) resProfileName.text = household['owner_name'];
    if (resProfileMeta != null) {
      resProfileMeta.text = 'Meter ID: ${household['house_id']} | ${household['account_number']} | ${household['purok']}';
    }

    // Leak Flag Warning
    final leakFlagEl = document.getElementById('resident-leak-flag');
    if (leakFlagEl != null) {
      if (household['current_leak_status'] == 'leak') {
        leakFlagEl.innerHtml = '''
          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
          <span>Leak Alert Warning: High constant flow rate registered. Please inspect on-site faucets.</span>
        ''';
        leakFlagEl.className = "reservoir-status-banner low";
        leakFlagEl.style.backgroundColor = "var(--alert-red-bg)";
        leakFlagEl.style.borderColor = "rgba(239, 68, 68, 0.3)";
        leakFlagEl.style.color = "var(--alert-red)";
      } else {
        leakFlagEl.innerHtml = '''
          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <span>Normal Flow Clearance: IoT sensors verify secure line pressure. No leak detected.</span>
        ''';
        leakFlagEl.className = "reservoir-status-banner";
        leakFlagEl.style.backgroundColor = "var(--alert-green-bg)";
        leakFlagEl.style.borderColor = "rgba(16, 185, 129, 0.2)";
        leakFlagEl.style.color = "var(--alert-green)";
      }
    }

    // Statement calculations
    final bills = db.getBillingHistoryForHousehold(currentResidentId!);
    Map<String, dynamic>? juneBill;
    try {
      juneBill = bills.firstWhere((b) => b['billing_month'] == 'June 2026');
    } catch (_) {}

    double prevReading = 0.0;
    double currReading = 0.0;
    double consumption = 0.0;
    double excessCharge = 0.0;
    double totalDue = 0.0;
    String statusText = 'Pending Payment';
    String statusClass = 'warning';

    if (juneBill != null) {
      prevReading = (juneBill['previous_reading'] as num).toDouble();
      currReading = (juneBill['current_reading'] as num).toDouble();
      consumption = (juneBill['consumption'] as num).toDouble();
      excessCharge = consumption > 10.0 ? (consumption - 10.0) * 15.00 : 0.00;
      totalDue = (juneBill['total_due'] as num).toDouble();
      statusText = juneBill['status'];
      statusClass = juneBill['status'] == 'Paid' ? 'normal' : 'warning';
    } else {
      // Estimate based on telemetry
      final List<num> hist = List<num>.from(household['monthly_history']);
      prevReading = hist.length >= 2 ? hist[hist.length - 2].toDouble() : (household['current_m3_usage'] as num).toDouble() - 2.5;
      currReading = (household['current_m3_usage'] as num).toDouble();
      consumption = currReading - prevReading;
      if (consumption < 0.0) consumption = 0.0;
      excessCharge = consumption > 10.0 ? (consumption - 10.0) * 15.00 : 0.00;
      totalDue = 120.00 + excessCharge + 50.00;
      statusText = 'Unbilled (Draft)';
      statusClass = 'warning';
    }

    final resPrevReading = document.getElementById('resident-prev-reading');
    final resCurrReading = document.getElementById('resident-curr-reading');
    final resCalcConsumption = document.getElementById('resident-calc-consumption');
    final resCalcExcess = document.getElementById('resident-calc-excess');
    final resCalcTotal = document.getElementById('resident-calc-total');
    final resBillStatus = document.getElementById('resident-bill-status');

    if (resPrevReading != null) resPrevReading.text = prevReading.toStringAsFixed(1);
    if (resCurrReading != null) resCurrReading.text = currReading.toStringAsFixed(1);
    if (resCalcConsumption != null) resCalcConsumption.text = consumption.toStringAsFixed(1);
    if (resCalcExcess != null) resCalcExcess.text = excessCharge.toStringAsFixed(2);
    if (resCalcTotal != null) resCalcTotal.text = totalDue.toStringAsFixed(2);

    if (resBillStatus != null) {
      resBillStatus.text = statusText.toUpperCase();
      resBillStatus.className = 'quality-badge $statusClass';
    }

    renderSVGChart(List<num>.from(household['monthly_history']), 'resident-chart-container');
    renderResidentLedgerList(bills);
  }

  void renderResidentLedgerList(List<Map<String, dynamic>> history) {
    final listEl = document.getElementById('resident-history-list');
    if (listEl == null) return;
    listEl.innerHtml = '';

    if (history.isEmpty) {
      listEl.innerHtml = '<div style="font-size:11px;color:var(--text-muted);padding:4px">No billing history available.</div>';
      return;
    }

    history.forEach((bill) {
      final item = document.createElement('div');
      item.className = 'bill-record-card ${bill['status']}';

      final billDate = DateTime.parse(bill['date'] as String).toLocal();
      final formatted = '${billDate.month}/${billDate.day}/${billDate.year} ${_pad(billDate.hour)}:${_pad(billDate.minute)}';

      item.innerHtml = '''
        <div class="bill-record-header">
          <span>Cycle: ${bill['billing_month']}</span>
          <span style="color:${bill['status'] == 'Paid' ? 'var(--alert-green)' : 'var(--amber-safety)'}">${bill['status'].toString().toUpperCase()}</span>
        </div>
        <div class="bill-record-details">
          <span>Usage: ${(bill['previous_reading'] as num).toStringAsFixed(1)} → ${(bill['current_reading'] as num).toStringAsFixed(1)} m³ (${(bill['consumption'] as num).toStringAsFixed(1)} m³)</span>
          <strong>₱${(bill['total_due'] as num).toStringAsFixed(2)}</strong>
        </div>
        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">
          Bill Ref ID: ${bill['bill_id']} | Issued: $formatted
        </div>
      ''';
      listEl.append(item);
    });
  }
}
