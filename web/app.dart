import 'dart:html';
import 'dart:convert';
import 'dart:async';
import 'dart:js' as js;
import 'db.dart';
import 'offline_store.dart';

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
  EventSource? _sseSource;
  String? _reportPhoto;
  String? _pendingNativePhotoRequestId;
  int _photoRequestCounter = 0;
  int _photoSelectionVersion = 0;
  bool _processingReportPhoto = false;
  bool _submittingResidentReport = false;
  int _residentReportAttemptVersion = 0;
  String? _residentReportOperationId;
  void Function()? _restoreReportDraft;
  Timer? _reportDraftTimer;
  bool _refreshingView = false;
  static const _reportDraftKey = 'waterhall_resident_report_draft';

  // Cached UI Elements
  late Element loginView;
  late Element dashView;
  late Element dirView;
  late Element assetsView;
  late Element profileView;
  late Element billingView;
  late Element residentViewHome;
  late Element residentViewLedger;
  late Element residentViewSupport;
  late Element bottomNav;
  late Element residentBottomNav;
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
    residentViewHome = document.getElementById('view-resident-home')!;
    residentViewLedger = document.getElementById('view-resident-ledger')!;
    residentViewSupport = document.getElementById('view-resident-support')!;
    bottomNav = document.getElementById('app-bottom-nav')!;
    residentBottomNav = document.getElementById('resident-bottom-nav')!;
    floatingRoleSwitchBtn = document.getElementById('btn-floating-role-switch');
    floatingRoleSwitchText = document.getElementById('floating-role-switch-text');

    views = {
      'view-dashboard': dashView,
      'view-directory': dirView,
      'view-worker-resident-details': document.getElementById('view-worker-resident-details')!,
      'view-assets': assetsView,
      'view-profile': profileView,
      'view-billing': billingView,
      'view-announcements': document.getElementById('view-announcements')!,
      'view-resident-profile': document.getElementById('view-resident-profile')!,
      'view-resident-home': residentViewHome,
      'view-resident-ledger': residentViewLedger,
      'view-resident-support': residentViewSupport
    };

    // Check URL parameters for role specialization
    final uri = Uri.parse(window.location.href);
    final role = uri.queryParameters['role'];

    final portalTitle = document.getElementById('web-portal-title');
    if (role == 'resident') {
      if (portalTitle != null) portalTitle.text = 'Resident Portal';
      final empIdInput = document.getElementById('employee-id') as InputElement?;
      if (empIdInput != null) {
        empIdInput.placeholder = 'Resident ID, meter ID, contact or unique name';
      }
    } else {
      if (portalTitle != null) portalTitle.text = 'Worker Portal';
      final empIdInput = document.getElementById('employee-id') as InputElement?;
      if (empIdInput != null) {
        empIdInput.placeholder = "Enter employee ID";
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

    // Subscribe before initialization, including expiry of a restored session.
    document.getElementById('btn-resident-profile-logout')?.onClick.listen((_) => db.endSession());
    db.onSessionEnded = (expired) {
      _closeRealtimeStream();
      currentWorker = null;
      currentResidentId = null;
      _pendingNativePhotoRequestId = null;
      _photoSelectionVersion++;
      _processingReportPhoto = false;
      _residentReportAttemptVersion++;
      _submittingResidentReport = false;
      residentViewSupport.querySelectorAll('[disabled]').forEach((field) => field.attributes.remove('disabled'));
      _residentReportOperationId = null;
      _reportDraftTimer?.cancel();
      window.localStorage.remove(_reportDraftKey);
      activeHouseholdId = null;
      selectedBillHouseId = null;
      _reportPhoto = null;
      document.getElementById('collection-review-modal')?.remove();
      document.getElementById('modal-collect-payment')?.style.display = 'none';
      enforceLoginGate();
      if (expired) showLoginError(sessionExpiredMessage, document.getElementById('login-error-msg'));
    };
    db.onSyncStatusChange.listen((status) {
      _updateSyncStatusUI(status);
    });
    await db.init();
    _updateSyncStatusUI(db.getSyncStatus());

    // Foreground fallback only; reconnect and foreground resume refresh promptly.
    Timer.periodic(const Duration(seconds: 60), (_) => _refreshVisibleView());
    document.onVisibilityChange.listen((_) {
      if (document.visibilityState == 'visible') unawaited(_refreshVisibleView());
    });

    // Check existing session strictly isolated by application role (?role=resident or ?role=worker)
    final savedWorker = hasUsableSession() ? window.localStorage['waterhall_session'] : null;
    final savedResident = hasUsableSession() ? window.localStorage['waterhall_resident_session'] : null;

    if (role == 'resident') {
      // Resident App strictly restores ONLY resident sessions
      if (savedResident != null && savedResident.isNotEmpty) {
        showResidentPortal(savedResident);
        _initRealtimeStream('resident');
        _registerWebPush('resident');
      } else {
        enforceLoginGate();
      }
    } else {
      // Worker App strictly restores ONLY field worker sessions
      if (savedWorker != null && savedWorker.isNotEmpty) {
        try {
          currentWorker = Map<String, dynamic>.from(json.decode(savedWorker));
          showApp(currentWorker!);
          _initRealtimeStream('worker');
          _registerWebPush('worker');
        } catch (e) {
          window.localStorage.remove('waterhall_session');
          enforceLoginGate();
        }
      } else {
        enforceLoginGate();
      }
    }

    // Bind Event Listeners
    bindEvents();
    if (db.lastSyncError == sessionExpiredMessage) {
      showLoginError(sessionExpiredMessage, document.getElementById('login-error-msg'));
    }
  }

  Future<void> _refreshVisibleView() async {
    if (_refreshingView || document.visibilityState != 'visible' ||
        (currentWorker == null && currentResidentId == null)) return;
    _refreshingView = true;
    final token = window.localStorage['waterhall_jwt'];
    final previousVersion = db.dataVersion;
    try {
      await db.refreshData(role: currentResidentId != null ? 'resident' : 'worker');
      if (token != window.localStorage['waterhall_jwt'] || !db.checkSession() ||
          previousVersion == db.dataVersion) return;
      if (currentResidentId != null) renderResidentDashboard();
      else if (activeTab == 'view-dashboard') renderDashboard();
      else if (activeTab == 'view-directory') renderDirectory();
      if (activeTab == 'view-announcements') renderAnnouncementHistory();
    } finally { _refreshingView = false; _refreshTelemetryDisplay(); }
  }

  void _updateSyncStatusUI(Map<String, dynamic> status) {
    final pill = document.getElementById('worker-sync-status-pill');
    final textEl = document.getElementById('worker-sync-status-text');
    final offlineBanner = document.getElementById('db-offline-overlay');
    final offlineBannerText = document.getElementById('offline-banner-text');

    final String st = status['status'] ?? 'online';
    final int pendingCount = (status['pendingCount'] as int?) ?? 0;
    final bool isOnline = (status['isOnline'] as bool?) ?? true;
    final bool authenticated = status['authenticated'] == true;
    final int reviewCount = status['reviewCount'] as int? ?? 0;

    if (pill != null && textEl != null) {
      pill.classes.removeAll(['online', 'offline', 'pending_sync', 'syncing', 'synced']);
      pill.classes.add(st);

      if (!authenticated) {
        textEl.text = 'Sign in required';
      } else if (!isOnline) {
        textEl.text = 'Offline Mode';
      } else if (status['isSyncing'] == true) {
        textEl.text = 'Syncing...';
      } else if (pendingCount > 0) {
        textEl.text = reviewCount > 0 ? '$pendingCount Pending ($reviewCount need review)'
            : status['error'] != null ? '$pendingCount Pending: retry needed' : '$pendingCount Pending Sync';
      } else {
        textEl.text = 'Connected';
      }
    }

    if (offlineBanner != null) {
      if (authenticated && !isOnline) {
        offlineBanner.style.display = 'flex';
        if (offlineBannerText != null) {
          if (pendingCount > 0) {
            offlineBannerText.text = 'Offline Mode Active: $pendingCount collection(s) saved on this device waiting to sync.';
          } else {
            offlineBannerText.text = 'Offline Mode Active: Local SQLite database enabled. Field operations available.';
          }
        }
      } else {
        offlineBanner.style.display = 'none';
      }
    }
    var reviewButton = document.getElementById('btn-review-collections');
    if (reviewButton == null && pill?.parent != null) {
      final button = ButtonElement()..id = 'btn-review-collections'..text = 'Review pending operations';
      button.onClick.listen((_) => _showCollectionReview());
      pill!.parent!.append(button);
      reviewButton = button;
    }
    reviewButton?.style.display = authenticated && reviewCount > 0 ? 'inline-block' : 'none';
  }

  void _showCollectionReview() {
    if (!db.checkSession()) return;
    document.getElementById('collection-review-modal')?.remove();
    final modal = DivElement()..id = 'collection-review-modal'..className = 'modal-overlay';
    modal.style.display = 'flex';
    final card = DivElement()..className = 'offline-card';
    card.style..maxHeight = '80vh'..overflowY = 'auto';
    card.append(HeadingElement.h2()..text = 'Pending operation review');
    card.append(ParagraphElement()..text = 'These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.');
    for (final row in db.getPendingCollections().where((c) => c['sync_error'] != null)) {
      card.append(ParagraphElement()..text = '${row['house_id']} | ${row['amount_collected']} | ${row['transaction_id']}\n${row['sync_error']}');
    }
    for (final action in db.pendingActions().where((a) => a['sync_error'] != null)) {
      final body = action['body'] as Map;
      final kind = const {'/api/billing-records/add': 'Meter reading and bill', '/api/maintenance-logs/add': 'Maintenance report', '/api/reports/add': 'Service report', '/api/announcements/add': 'Announcement', '/api/households/update': 'Household status'}[action['endpoint']] ?? 'Saved operation';
      card.append(ParagraphElement()..text = "$kind | ${body['house_id'] ?? body['household_id'] ?? ''} | ${action['operation_id']}\n${action['sync_error']}");
    }
    final retry = ButtonElement()..text = 'Retry pending operations';
    retry.onClick.listen((_) async {
      retry.disabled = true;
      await db.syncActions();
      await db.syncOfflineCollections();
      if (db.checkSession()) _showCollectionReview();
    });
    card.append(retry);
    card.append(ButtonElement()..text = 'Close'..onClick.listen((_) => modal.remove()));
    modal.append(card);
    document.body!.append(modal);
  }

  void bindEvents() {
    _initRegistrationHandlers();
    _bindCollectionHandlers();

    // Authentication Handlers
    final loginBtn = document.getElementById('btn-login') as ButtonElement?;
    final empIdInput = document.getElementById('employee-id') as InputElement?;
    final passwordInput = document.getElementById('login-password') as InputElement?;
    final zoneSelect = document.getElementById('zone-assignment') as SelectElement?;
    final loginErrorMsg = document.getElementById('login-error-msg');

    final btnToggleWebPw = document.getElementById('btn-toggle-web-pw');
    btnToggleWebPw?.onClick.listen((e) {
      e.preventDefault();
      final pwInput = document.getElementById('login-password') as InputElement?;
      final eyeShow = document.getElementById('web-eye-show');
      final eyeHide = document.getElementById('web-eye-hide');
      if (pwInput != null) {
        if (pwInput.type == 'password') {
          pwInput.type = 'text';
          if (eyeShow != null) eyeShow.style.display = 'none';
          if (eyeHide != null) eyeHide.style.display = 'block';
          btnToggleWebPw.style.color = '#F4D03F';
        } else {
          pwInput.type = 'password';
          if (eyeShow != null) eyeShow.style.display = 'block';
          if (eyeHide != null) eyeHide.style.display = 'none';
          btnToggleWebPw.style.color = 'var(--text-muted)';
        }
      }
    });

    // Quick login buttons are intentionally disabled for security.
    // All authentication must go through /api/login with server-verified credentials.

    loginBtn?.onClick.listen((e) async {
      e.preventDefault();
      final empId = empIdInput?.value?.trim() ?? '';
      final password = passwordInput?.value?.trim() ?? '';
      final selectedZone = zoneSelect?.value ?? '';

      final uri = Uri.parse(window.location.href);
      final role = uri.queryParameters['role'];

      if (empId.isEmpty || password.isEmpty) {
        showLoginError("Both Username and Password are required.", loginErrorMsg);
        return;
      }

      // 1. Authenticate with Server API /api/login
      loginBtn.disabled = true;
      try {
        final xhr = await db.apiRequest(
          '/api/login',
          authenticated: false,
          method: 'POST',
          requestHeaders: {'Content-Type': 'application/json'},
          sendData: json.encode({'username': empId, 'password': password}),
        );

        final data = json.decode(xhr.responseText!) as Map<String, dynamic>;
        final token = data['access_token'] as String;
        final userRole = data['role'] as String;
        final id = data['id'] as String;
        final name = data['name'] as String;

        if (userRole == 'admin' || (role == 'resident' && userRole != 'resident') || (role != 'resident' && userRole != 'worker')) {
          showLoginError('Use the portal assigned to your account role.', loginErrorMsg);
          return;
        }
        db.clearPrivateCache();
      _reportPhoto = null;
        await db.startSession(token);
        await restoreQueues();

        // Refresh database with the newly authenticated token
        await db.refreshData();
        if (!db.checkSession() || window.localStorage['waterhall_jwt'] != token) return;

        if (userRole == 'resident') {
          // Guard: Worker App MUST NEVER authenticate or display the Resident Portal
          if (role == 'worker') {
            showLoginError('This terminal is for Field Workers only. Residents must use the Resident App.', loginErrorMsg);
            return;
          }
          window.localStorage.remove('waterhall_session');
          currentWorker = null;
          showResidentPortal(id);
          _initRealtimeStream('resident');
          _registerWebPush('resident');
          if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';
          showToast('Logged in as Resident: ' + name);
          return;
        } else {
          // Guard: Resident App MUST NEVER authenticate or display the Worker Portal
          if (role == 'resident') {
            showLoginError('This portal is for Residents only. Field Workers must use the Worker App.', loginErrorMsg);
            return;
          }
          currentWorker = {
            'worker_id': id,
            'name': name,
            'role': 'Collector',
            'selected_zone': selectedZone.isNotEmpty ? selectedZone : 'Purok 1',
          };
          window.localStorage['waterhall_session'] = json.encode(currentWorker);
          window.localStorage.remove('waterhall_resident_session');
          _initRealtimeStream('worker');
          _registerWebPush('worker');
          if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';
          showApp(currentWorker!);
          showToast('Logged in as Tech: ' + name);
          return;
        }
      } on ApiFailure catch (failure) {
        showLoginError(failure.userMessage ?? 'Unable to sign in. Check your connection and credentials.', loginErrorMsg);
        return;
      } catch (_) {
        // Never expose an HTTP response, credentials, or JWT in an error/log.
      } finally {
        loginBtn.disabled = false;
      }

      showLoginError(db.lastSyncError == sessionExpiredMessage ? sessionExpiredMessage
          : 'Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens.', loginErrorMsg);

    });

    final logoutBtn = document.getElementById('btn-logout') as ButtonElement?;
    logoutBtn?.onClick.listen((e) async {
      _closeRealtimeStream();
      await db.endSession();
      showToast("Signed out of Tech session");
    });

    // Resident Logout
    final residentLogoutBtn = document.getElementById('btn-resident-logout') as ButtonElement?;
    residentLogoutBtn?.onClick.listen((e) async {
      _closeRealtimeStream();
      await db.endSession();
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

    // Household Detail    // Close Household Modal is no longer needed since it's a separate tab
    final closeModalBtn = document.getElementById('btn-close-modal');
    closeModalBtn?.onClick.listen((e) {
      switchTab('view-directory');
      activeHouseholdId = null;
    });

    // Modal background click to close
    final detailModal = document.getElementById('house-detail-modal');
    detailModal?.onClick.listen((e) {
      if (e.target == detailModal) {
        // Removed closeHouseholdModal call as it's not a modal anymore
      }
    });

    // Handle flow leak simulator toggle inside modal
    final modalLeakToggle = document.getElementById('modal-leak-toggle') as CheckboxInputElement?;
    modalLeakToggle?.onChange.listen((e) async {
      if (activeHouseholdId == null) return;
      final newStatus = (modalLeakToggle.checked ?? false) ? 'leak' : 'normal';

      final updated = await db.updateHouseholdLeak(activeHouseholdId!, newStatus);
      if (updated != null) {
        final modalFlowRateEl = document.getElementById('modal-flow-rate');
        if (modalFlowRateEl != null) {
          modalFlowRateEl.text = 'Manual report';
        }
        updateLeakToggleLabel(newStatus);
        showToast(newStatus == 'leak' ? "Leak status saved for synchronization." : "Resolved status saved for synchronization.");
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
    submitLogBtn?.onClick.listen((e) async {
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
        'status_resolved': resolvedChecked,
        'date': DateTime.now().toUtc().toIso8601String()
      };

      await db.addMaintenanceLog(newLog);

      // If marked resolved, update household status
      if (resolvedChecked) {
        await db.updateHouseholdLeak(activeHouseholdId!, 'normal');
        final modalLeakToggle = document.getElementById('modal-leak-toggle') as CheckboxInputElement?;
        if (modalLeakToggle != null) modalLeakToggle.checked = false;
        updateLeakToggleLabel('normal');
      }

      // Update UI elements in modal
      final h = db.getHousehold(activeHouseholdId!);
      if (h != null) {
        final modalFlowRateEl = document.getElementById('modal-flow-rate');
        if (modalFlowRateEl != null) {
          modalFlowRateEl.text = 'Manual reading';
        }
      }

      if (descInput != null) descInput.value = '';
      showToast("Maintenance Log committed to database!");

      renderModalLogs(activeHouseholdId!);
      renderDashboard();
    });

    // Broadcast Announcement (Worker Profile)
    final btnBroadcast = document.getElementById('btn-broadcast-announcement') as ButtonElement?;
    btnBroadcast?.onClick.listen((e) async {
      if (currentWorker == null || btnBroadcast!.disabled) return;
      final inputEl = document.getElementById('worker-announcement-input') as TextAreaElement?;
      final audienceEl = document.getElementById('worker-announcement-audience') as SelectElement?;
      final msg = inputEl?.value?.trim() ?? '';
      final audience = audienceEl?.value ?? 'Everyone';

      if (msg.isEmpty) {
        showToast('Message cannot be empty');
        return;
      }

      final token = window.localStorage['waterhall_jwt'];
      btnBroadcast.disabled = true;
      try {
        await db.addAnnouncement(msg, currentWorker!['name'], targetAudience: audience);
        if (token != window.localStorage['waterhall_jwt']) return;
        if (inputEl != null) inputEl.value = '';
        showToast('Announcement queued for $audience. Pending items retry when online.');
      } catch (_) {
        if (token == window.localStorage['waterhall_jwt']) showToast('Announcement was not saved. Check storage and retry.');
      } finally { btnBroadcast.disabled = false; }
    });

    // --- Forgot Password Events ---
    final btnWebForgotPw = document.getElementById('btn-web-forgot-password');
    final modalWebForgotPw = document.getElementById('web-modal-forgot-pw');
    final btnWebRecoverCancel = document.getElementById('btn-web-recover-cancel');
    final btnWebRecoverSubmit = document.getElementById('btn-web-recover-submit');

    btnWebForgotPw?.onClick.listen((e) {
      e.preventDefault();
      if (modalWebForgotPw != null) {
        modalWebForgotPw.style.display = 'flex';
      }
    });

    btnWebRecoverCancel?.onClick.listen((e) {
      e.preventDefault();
      if (modalWebForgotPw != null) {
        modalWebForgotPw.style.display = 'none';
      }
    });

    btnWebRecoverSubmit?.onClick.listen((e) async {
      e.preventDefault();
      final roleSelect = document.getElementById('web-recover-role') as SelectElement?;
      final idInput = document.getElementById('web-recover-username') as InputElement?;
      final phoneInput = document.getElementById('web-recover-contact') as InputElement?;
      final newPwInput = document.getElementById('web-recover-new-password') as InputElement?;
      final errorEl = document.getElementById('web-recover-error');
      final successEl = document.getElementById('web-recover-success');

      if (errorEl != null) errorEl.style.display = 'none';
      if (successEl != null) successEl.style.display = 'none';

      final roleVal = roleSelect?.value ?? '';
      final idVal = idInput?.value?.trim() ?? '';
      final phoneVal = phoneInput?.value?.trim() ?? '';
      final newPwVal = newPwInput?.value?.trim() ?? '';

      if (idVal.isEmpty || phoneVal.isEmpty || newPwVal.isEmpty) {
        if (errorEl != null) {
          errorEl.text = 'All fields are required.';
          errorEl.style.display = 'block';
        }
        return;
      }

      try {
        final xhr = await db.apiRequest(
          '/api/recover-account',
          authenticated: false,
          method: 'POST',
          sendData: json.encode({
            'role': roleVal,
            'username': idVal,
            'reset_token': phoneVal,
            'new_password': newPwVal
          }),
          requestHeaders: {'Content-Type': 'application/json'}
        );

        if (xhr.status == 200) {
          final resp = json.decode(xhr.responseText ?? '{}');
          if (successEl != null) {
            successEl.text = resp['message'] ?? 'Password reset successfully!';
            successEl.style.display = 'block';
          }
          if (idInput != null) idInput.value = '';
          if (phoneInput != null) phoneInput.value = '';
          if (newPwInput != null) newPwInput.value = '';

          Future.delayed(Duration(seconds: 2), () {
            if (modalWebForgotPw != null) {
              modalWebForgotPw.style.display = 'none';
            }
            if (successEl != null) successEl.style.display = 'none';
          });
        }
      } catch (e) {
        if (errorEl != null) {
          errorEl.text = 'Verification failed. Please check details.';
          errorEl.style.display = 'block';
        }
      }
    });
  }

  void showLoginError(String msg, Element? errorEl) {
    if (errorEl != null) {
      errorEl.text = msg;
      errorEl.style.display = 'block';
    }
  }

  // ==============================================================================
  // Realtime Telemetry & Announcements (SSE with Automatic Polling Fallback)
  // ==============================================================================
  void _initRealtimeStream(String currentRole) {
    _closeRealtimeStream();
    // Authenticated foreground polling works across independent Vercel instances.
  }

  void _closeRealtimeStream() {
    if (_sseSource != null) {
      try {
        _sseSource!.close();
      } catch (_) {}
      _sseSource = null;
    }
  }

  void _registerWebPush(String role) {
    if (js.context.hasProperty('WaterHallPush')) js.context['WaterHallPush'].callMethod('registerSubscription', [role]);
  }

  void enforceLoginGate() {
    document.getElementById('announcement-history')?.children.clear();
    for (final id in ['resident-profile-name', 'resident-profile-account', 'resident-profile-avatar']) {
      document.getElementById(id)?.text = '--';
    }
    views.values.forEach((v) => v.classes.remove('active'));
    loginView.classes.add('active');
    loginView.style.display = 'flex';
    activeTab = 'view-login';
    bottomNav.style.display = 'none';
    residentBottomNav.style.display = 'none'; // ADDED: hide resident nav on logout
    if (floatingRoleSwitchBtn != null) {
      floatingRoleSwitchBtn!.style.display = 'none';
    }

    // 1. Clear login credentials and errors
    final empIdInput = document.getElementById('employee-id') as InputElement?;
    final passwordInput = document.getElementById('login-password') as InputElement?;
    final loginErrorMsg = document.getElementById('login-error-msg');
    if (empIdInput != null) empIdInput.value = '';
    if (passwordInput != null) passwordInput.value = '';
    if (loginErrorMsg != null) loginErrorMsg.style.display = 'none';

    // 2. Clear resident support fields
    final residentLogDesc = document.getElementById('resident-log-desc') as TextAreaElement?;
    if (residentLogDesc != null) residentLogDesc.value = '';
    final residentPhotoName = document.getElementById('resident-photo-name');
    if (residentPhotoName != null) residentPhotoName.text = 'No file chosen';
    final residentPhotoPreview = document.getElementById('resident-photo-preview');
    if (residentPhotoPreview != null) {
      residentPhotoPreview.style.display = 'none';
      residentPhotoPreview.style.backgroundImage = '';
      residentPhotoPreview.children.clear();
    }

    // 3. Clear worker directory, billing, and announcement fields
    final dirSearch = document.getElementById('dir-search') as InputElement?;
    if (dirSearch != null) dirSearch.value = '';
    final billMeterSearch = document.getElementById('bill-meter-search') as InputElement?;
    if (billMeterSearch != null) billMeterSearch.value = '';
    final billCurrInput = document.getElementById('bill-curr-input') as InputElement?;
    if (billCurrInput != null) billCurrInput.value = '';
    final workerAnnouncementInput = document.getElementById('worker-announcement-input') as TextAreaElement?;
    if (workerAnnouncementInput != null) workerAnnouncementInput.value = '';

    // 4. Reset logout card display placeholders
    final resLogoutName = document.getElementById('resident-logout-name');
    final resLogoutRole = document.getElementById('resident-logout-role');
    final resLogoutAvatar = document.getElementById('resident-logout-avatar');
    if (resLogoutName != null) resLogoutName.text = '---';
    if (resLogoutRole != null) resLogoutRole.text = '---';
    if (resLogoutAvatar != null) resLogoutAvatar.text = '--';
  }

  void showApp(Map<String, dynamic> worker) {
    final uri = Uri.parse(window.location.href);
    final role = uri.queryParameters['role'];
    if (role == 'resident') {
      print('[SECURITY] Resident application is forbidden from loading Worker Portal.');
      return;
    }

    // Hide login
    loginView.classes.remove('active');
    loginView.style.display = 'none';
    views.values.forEach((v) => v.classes.remove('active'));

    currentResidentId = null;
    window.localStorage.remove('waterhall_resident_session');

    // Show nav
    bottomNav.setAttribute('style', 'display: flex !important');
    residentBottomNav.setAttribute('style', 'display: none !important');

    // Show quick switch
    if (floatingRoleSwitchBtn != null) {
      floatingRoleSwitchBtn!.style.display = 'none'; // ALWAYS HIDDEN
    }

    currentWorker = worker;
    window.localStorage['waterhall_session'] = json.encode(worker);

    // Render logout card details
    final List<String> parts = worker['name'].toString().split(' ');
    final cleanParts = parts.where((p) => p.trim().isNotEmpty).toList();
    final initials = cleanParts.map((n) => n.isNotEmpty ? n[0] : '').join('');
    final safeInitials = initials.substring(0, initials.length < 2 ? initials.length : 2).toUpperCase();

    final workerLogoutName = document.getElementById('worker-logout-name');
    final workerLogoutRole = document.getElementById('worker-logout-role');
    final workerLogoutAvatar = document.getElementById('worker-logout-avatar');

    if (workerLogoutName != null) workerLogoutName.text = worker['name'];
    if (workerLogoutRole != null) workerLogoutRole.text = worker['role'] ?? 'Field Worker';
    if (workerLogoutAvatar != null) workerLogoutAvatar.text = safeInitials;

    switchTab('view-dashboard');

    renderDashboard();
    renderDirectory();
    renderAssets();
    renderProfile();
    initBillingView();
  }

  void switchTab(String targetViewId) {
    if (currentWorker == null && currentResidentId == null && targetViewId != 'view-login') {
      enforceLoginGate();
      return;
    }

    // Strict tab boundary enforcement: Worker cannot access Resident tabs, Resident cannot access Worker tabs
    final uri = Uri.parse(window.location.href);
    final role = uri.queryParameters['role'];
    if (role == 'worker' && (targetViewId == 'view-resident-home' || targetViewId == 'view-resident-ledger' || targetViewId == 'view-resident-support' || targetViewId == 'view-resident-profile')) {
      print('[SECURITY] Worker application is forbidden from switching to Resident tab $targetViewId.');
      return;
    }
    if (role == 'resident' && (targetViewId == 'view-dashboard' || targetViewId == 'view-billing' || targetViewId == 'view-profile' || targetViewId == 'view-directory' || targetViewId == 'view-assets' || targetViewId == 'view-worker-resident-details')) {
      print('[SECURITY] Resident application is forbidden from switching to Worker tab $targetViewId.');
      return;
    }

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
    } else if (targetViewId == 'view-announcements') {
      renderAnnouncementHistory();
    } else if (targetViewId == 'view-resident-profile') {
      renderResidentDashboard();
    } else if (targetViewId == 'view-assets') {
      renderAssets();
    } else if (targetViewId == 'view-profile') {
      renderProfile();
    } else if (targetViewId == 'view-billing') {
      if (selectedBillHouseId == null) {
        final households = db.getHouseholds();
        if (households.isNotEmpty) {
          selectedBillHouseId = households[0]['house_id'];
          final billMeterSearch = document.getElementById('bill-meter-search') as InputElement?;
          if (billMeterSearch != null) {
            billMeterSearch.value = '${households[0]['owner_name']} (${households[0]['account_number']})';
          }
        }
      }
      renderBillingView(selectedBillHouseId);
    } else if (targetViewId == 'view-resident-home' || targetViewId == 'view-resident-ledger' || targetViewId == 'view-resident-support') {
      renderResidentDashboard();
    }
  }

  // --- Dashboard Controller ---
  void renderDashboard() {
    if (currentWorker == null) return;

    final dashTitle = document.getElementById('dash-worker-title');
    if (dashTitle != null) {
      dashTitle.text = 'Field Terminal: ${currentWorker!['selected_zone']}';
    }

    final latestAnnouncement = db.getLatestAnnouncement(role: 'worker');
    if (db.isDatabaseOnline) _processAnnouncements(latestAnnouncement, 'worker');
    final workerBannerEl = document.getElementById('worker-announcement-banner');
    final workerMsgEl = document.getElementById('worker-announcement-message');
    final workerTagEl = document.getElementById('worker-announcement-tag');
    if (workerBannerEl != null && workerMsgEl != null) {
      if (latestAnnouncement != null && (latestAnnouncement['message'] as String).isNotEmpty) {
        final annMsg = latestAnnouncement['message'] as String;
        workerMsgEl.text = annMsg;
        if (workerTagEl != null) {
          final aud = latestAnnouncement['target_audience'] ?? 'Everyone';
          final auth = latestAnnouncement['author'] ?? 'Admin';
          workerTagEl.text = '$auth • ${_formatTimestamp(latestAnnouncement['timestamp'])} • $aud';
        }
        workerBannerEl.style.display = 'flex';

      } else {
        workerBannerEl.style.display = 'none';
      }
    }

    final households = db.getHouseholds();
    final assets = db.getCentralAssets();
    final logs = db.getMaintenanceLogs();

    // Populate Central Reservoir Telemetry for Worker Dashboard (Data Parity with Resident)
    final workerTankVal = document.getElementById('worker-tank-val');
    final workerSafetyStatus = document.getElementById('worker-safety-status');
    final workerTurbVal = document.getElementById('worker-turb-val');
    final workerTdsVal = document.getElementById('worker-tds-val');

    _renderTelemetry('worker', assets, workerTankVal, workerTurbVal, workerTdsVal, workerSafetyStatus);

    final activeLeaks = households.where((h) => h['current_leak_status'] == 'leak').toList();

    int qualityAlertCount = 0;
    final List<Map<String, String>> qualityAlerts = [];
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
            <div class="alert-item-text" style="color: var(--text-on-dark)">${assets['has_reading'] == false ? 'No leak reports. Water quality is awaiting sensor readings.' : 'No leak reports or configured water-quality alerts in the latest data.'}</div>
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
              Reported leak. Field inspection required.
            </div>
          ''';
          item.onClick.listen((e) {
            openWorkerResidentDetails(leak['house_id']);
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
            switchTab('view-dashboard');
            document.getElementById('worker-telemetry-freshness')?.scrollIntoView();
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
          final formattedDate = _formatTimestamp(log['date']);

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
  String _formatTimestamp(dynamic stamp) => js.context['WaterHallDisplay']
      .callMethod('formatTimestamp', [stamp?.toString() ?? '', 'Unknown date']).toString();


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
            <span class="household-flow">Meter: <span>${h['current_m3_usage']} m³</span></span>
          </div>
        ''';

        card.onClick.listen((e) {
          openWorkerResidentDetails(h['house_id']);
        });

        dirListEl.append(card);
      });
    }
  }

  // --- Worker Resident Details Controller ---
  void openWorkerResidentDetails(String id) {
    activeHouseholdId = id;
    final h = db.getHousehold(id);
    if (h == null) return;

    final nameEl = document.getElementById('worker-res-name');
    final acctEl = document.getElementById('worker-res-acct');
    final leakEl = document.getElementById('worker-res-leak-status');
    final m3El = document.getElementById('worker-res-consumption');
    final totalEl = document.getElementById('worker-res-total');

    if (nameEl != null) nameEl.text = h['owner_name'];
    if (acctEl != null) acctEl.text = h['account_number'];
    final allowCollection = db.getPaymentSettings()['allow_worker_collection'] == 'true';
    final collectButton = document.getElementById('btn-open-collect-modal') as ButtonElement?;
    collectButton?.disabled = !allowCollection;
    collectButton?.style.opacity = allowCollection ? '1' : '0.55';
    collectButton?.style.cursor = allowCollection ? 'pointer' : 'default';
    collectButton?.title = allowCollection ? 'Record an authorized collection' : 'Payments must be made at Barangay Hall.';
    document.getElementById('worker-collection-policy')?.text = allowCollection
        ? 'Field collection is enabled by Admin. Payments remain pending until the server confirms synchronization.'
        : 'Barangay policy: make payments in person at Barangay Hall. Field collection is disabled.';
    // Synchronized billing calculations matching Resident Portal
    final bills = db.getBillingHistoryForHousehold(id);
    Map<String, dynamic>? latestBill;
    if (bills.isNotEmpty) {
      latestBill = bills.first;
    }

    if (m3El != null) m3El.text = latestBill == null ? '--' : (latestBill['consumption'] as num).toStringAsFixed(3);
    if (totalEl != null) totalEl.text = latestBill == null ? 'No billing record' : (latestBill['total_due'] as num).toStringAsFixed(2);

    if (leakEl != null) {
      if (h['current_leak_status'] == 'leak') {
        leakEl.innerHtml = '<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>';
        leakEl.style.backgroundColor = 'var(--alert-red-bg)';
        leakEl.style.border = '1px solid var(--alert-red)';
      } else {
        leakEl.innerHtml = '<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>';
        leakEl.style.backgroundColor = 'var(--alert-green-bg)';
        leakEl.style.border = '1px solid rgba(16, 185, 129, 0.3)';
      }
    }

    // Switch view
    switchTab('view-worker-resident-details');

    // Bind back button
    document.getElementById('btn-back-to-dir')?.onClick.listen((e) {
      switchTab('view-directory');
      activeHouseholdId = null;
    });
  }



  void updateLeakToggleLabel(String status) {
    final leakTitleEl = document.getElementById('modal-leak-title');
    final leakDescEl = document.getElementById('modal-leak-desc');
    if (leakTitleEl == null || leakDescEl == null) return;

    if (status == 'leak') {
      leakTitleEl.text = "Leak status: LEAK REPORTED";
      leakTitleEl.style.color = 'var(--alert-red)';
      leakDescEl.text = "A leak has been reported. Inspect the water line on site.";
    } else {
      leakTitleEl.text = "Leak status: NO REPORT";
      leakTitleEl.style.color = 'var(--alert-green)';
      leakDescEl.text = "No leak is currently reported. This is not an automatic sensor assessment.";
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


    final points = history.asMap().entries.map((entry) {
      final idx = entry.key;
      final val = entry.value;
      final x = padding + (history.length == 1 ? 0.5 : idx / (history.length - 1)) * chartW;
      final y = padding + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      return {'x': x, 'y': y, 'val': val, 'label': '${idx + 1}'};
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

        final formatted = _formatTimestamp(log['date']);

        item.innerHtml = '''
          <div class="log-card-header">
            <span>Tech: <strong>${log['worker_id']}</strong></span>
            <span style="font-size:10px; color:var(--text-muted)">$formatted</span>
          </div>
          <div class="log-card-desc">${log['description']}</div>
          <div style="font-size: 9px; font-weight:700; color:${log['status_resolved'] == true ? 'var(--alert-green)' : 'var(--amber-safety)'}; margin-top:4px; text-transform:uppercase">
            Status: ${log['status_resolved'] == true ? 'Resolved' : 'In Progress (Active Monitoring)'}
          </div>
        ''';
        historicalLogsEl.append(item);
      });
    }
  }


  // Reservoir measurements are read-only; no simulated readings.
  void renderAssets() {}

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
      final cleanParts = parts.where((p) => p.trim().isNotEmpty).toList();
      final initials = cleanParts.map((n) => n.isNotEmpty ? n[0] : '').join('');
      final safeInitials = initials.substring(0, initials.length < 2 ? initials.length : 2).toUpperCase();
      workerAvatarEl.text = safeInitials;
    }

    final households = db.getHouseholds();
    final meterCount = households.length;
    final myLogs = db.getMaintenanceLogs().where((l) => l['worker_id'] == currentWorker!['worker_id'] && l['status_resolved'] == true).length;

    final profileStatTotal = document.getElementById('profile-stat-total');
    final profileStatLogs = document.getElementById('profile-stat-logs');

    if (profileStatTotal != null) profileStatTotal.text = meterCount.toString();
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

    // Seed default first item and load its actual readings immediately
    final households = db.getHouseholds();
    if (households.isNotEmpty) {
      selectedBillHouseId = households[0]['house_id'];
      billMeterSearch.value = '${households[0]['owner_name']} (${households[0]['account_number']})';
      renderBillingView(selectedBillHouseId);
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

    // Load applicable previous reading (respecting pending readings if any)
    final previous = db.getApplicablePreviousReading(selectedBillHouseId!);
    if (billPrevReading != null) {
      billPrevReading.text = previous == null ? '--' : previous.toStringAsFixed(3);
    }
    if (houseId != null && billCurrInput != null) {
      billCurrInput.value = '';
    }

    updateBillCalculations();
    renderBillingHistoryList(selectedBillHouseId!);
  }

  bool _savingBill = false;

  // Preview uses integer thousandths / cents. The backend remains authoritative.
  Map<String, dynamic>? _billDraft() {
    final config = db.getBillingConfig();
    final prevText = document.getElementById('bill-prev-reading')?.text ?? '';
    final currVal = (document.getElementById('bill-curr-input') as InputElement?)?.value?.trim() ?? '';
    if (prevText == '--' || prevText.isEmpty || currVal.isEmpty) return null;
    final previous = double.tryParse(prevText);
    final current = double.tryParse(currVal);
    if (config['configured'] != true || previous == null || current == null ||
        !previous.isFinite || previous < 0 || !current.isFinite || current < 0 || current < previous || current > 1000000) {
      return null;
    }

    // Decimal places check: support up to 3 decimal places
    final scaled = current * 1000;
    if ((scaled - scaled.round()).abs() > 0.0001) return null;

    final usedLiters = (current * 1000).round() - (previous * 1000).round();
    if (usedLiters < 0) return null;

    final includedLiters = (double.parse('${config['included_m3']}') * 1000).round();
    final excessLiters = (usedLiters - includedLiters).clamp(0, 1000000000);
    final excessRateCents = (double.parse('${config['excess_rate']}') * 100).round();
    final extraCents = (excessLiters * excessRateCents + 500) ~/ 1000;
    final baseCents = (double.parse('${config['base_rate']}') * 100).round();
    final feeCents = (double.parse('${config['environmental_fee']}') * 100).round();

    final totalDue = double.parse(((baseCents + feeCents + extraCents) / 100).toStringAsFixed(2));
    final consumption = double.parse((usedLiters / 1000).toStringAsFixed(3));
    final excessCharge = double.parse((extraCents / 100).toStringAsFixed(2));
    final curReading = double.parse(current.toStringAsFixed(3));
    final prevReading = double.parse(previous.toStringAsFixed(3));

    return {
      'previous_reading': prevReading,
      'current_reading': curReading,
      'consumption': consumption,
      'excess_charge': excessCharge,
      'total_due': totalDue,
      'billing_config_version': config['version']
    };
  }

  void updateBillCalculations() {
    final config = db.getBillingConfig();
    final draft = _billDraft();
    final now = DateTime.now();
    final month = '${now.year}-${now.month.toString().padLeft(2, '0')}';
    final isBilled = selectedBillHouseId != null && db.hasBeenBilledThisMonth(selectedBillHouseId!, month);
    void put(String id, String value) { document.getElementById(id)?.text = value; }
    put('bill-calc-base', config['configured'] == true ? '${config['base_rate']}' : '--');
    put('bill-calc-fee', config['configured'] == true ? '${config['environmental_fee']}' : '--');
    put('bill-preview-cycle', month);
    put('bill-included-volume', config['configured'] == true ? '${config['included_m3']} m³' : '--');
    put('bill-rate-description', config['configured'] == true ? "Includes ${config['included_m3']} m³; excess at PHP ${config['excess_rate']}/m³." : 'Admin must confirm billing rates before a bill can be recorded.');
    put('bill-calc-consumption', draft == null ? '0.000' : (draft['consumption'] as num).toStringAsFixed(3));
    put('bill-calc-excess', draft == null ? '0.00' : (draft['excess_charge'] as num).toStringAsFixed(2));
    put('bill-calc-total', draft == null ? '--' : (draft['total_due'] as num).toStringAsFixed(2));

    final currInputVal = (document.getElementById('bill-curr-input') as InputElement?)?.value?.trim() ?? '';
    final previous = double.tryParse(document.getElementById('bill-prev-reading')?.text ?? '');
    final current = double.tryParse(currInputVal);

    String alertMessage;
    if (isBilled) {
      alertMessage = 'A bill or pending bill already exists for this billing cycle ($month).';
    } else if (config['configured'] != true) {
      alertMessage = 'Admin must confirm billing rates before issuing new bills.';
    } else if (currInputVal.isEmpty) {
      alertMessage = 'Enter current reading at or above previous reading (up to 3 decimal places).';
    } else if (current == null || !current.isFinite || current < 0) {
      alertMessage = 'Enter a valid non-negative reading (up to 3 decimal places).';
    } else if (previous != null && current < previous) {
      alertMessage = 'Current reading cannot be lower than previous reading (${previous.toStringAsFixed(3)} m³).';
    } else if (draft == null) {
      alertMessage = 'Reading format invalid. Up to 3 decimal places supported.';
    } else {
      alertMessage = 'Draft: ${(draft['consumption'] as num).toStringAsFixed(3)} m³ | Total Due: ₱${(draft['total_due'] as num).toStringAsFixed(2)}';
    }
    put('billing-alert-banner', alertMessage);

    final button = document.getElementById('btn-save-bill') as ButtonElement?;
    if (button != null) {
      button.disabled = _savingBill || isBilled || draft == null;
      button.style.opacity = button.disabled ? '0.5' : '1';
    }
  }

  Future<void> saveWaterBill() async {
    if (_savingBill || selectedBillHouseId == null || currentWorker == null) return;
    final draft = _billDraft();
    final now = DateTime.now();
    final month = '${now.year}-${now.month.toString().padLeft(2, '0')}';
    final billDate = now.toUtc().toIso8601String();

    if (draft == null || db.hasBeenBilledThisMonth(selectedBillHouseId!, month)) return;
    final household = db.getHousehold(selectedBillHouseId!);
    if (household == null) return;

    _savingBill = true;
    updateBillCalculations();

    final token = window.localStorage['waterhall_jwt'];
    final isOnlineBeforeSave = db.isDatabaseOnline;
    try {
      final savedRecord = await db.addBillingRecord({
        ...draft,
        'house_id': selectedBillHouseId,
        'account_number': household['account_number'],
        'billing_month': month,
        'date': billDate,
        'billed_by': currentWorker!['worker_id']
      });

      if (token != window.localStorage['waterhall_jwt'] || currentWorker == null) return;

      if (isOnlineBeforeSave && savedRecord['is_synced'] == true) {
        showToast("Bill successfully saved.");
      } else {
        showToast("Bill saved offline. Pending synchronization.");
      }

      final billCurrInput = document.getElementById('bill-curr-input') as InputElement?;
      if (billCurrInput != null) billCurrInput.value = '';

      renderBillingView(selectedBillHouseId!);
      renderProfile();
    } catch (e) {
      if (token == window.localStorage['waterhall_jwt']) showToast('Unable to save the reading. Check storage and your session.');
    } finally {
      _savingBill = false;
      updateBillCalculations();
    }
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

        final formattedDate = _formatTimestamp(bill['date']);

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
            <span>$formattedDate (${bill['bill_id']})</span>
            <span>Tech: ${bill['billed_by']}</span>
          </div>
        ''';
        billingHistoryList.append(item);
      });
    }
  }

  void _processAnnouncements(Map<String, dynamic>? latest, String role) {
    if (js.context.hasProperty('WaterHallPush')) {
      js.context['WaterHallPush'].callMethod('processAnnouncements', [js.JsObject.jsify(latest == null ? [] : [latest]), role]);
    }
  }

  void renderAnnouncementHistory() {
    final role = currentResidentId == null ? 'worker' : 'resident';
    final list = document.getElementById('announcement-history');
    if (list == null) return;
    list.children.clear();
    final records = db.getAnnouncements(role: role);
    if (records.isEmpty) { list.append(ParagraphElement()..className = 'empty-state'..text = 'No announcements yet. New Barangay updates will appear here.'); return; }
    for (final record in records) {
      final card = DivElement()..className = 'announcement-history-card';
      final meta = ParagraphElement()..className = 'announcement-meta';
      meta.append(SpanElement()..className = 'announcement-author'..text = '${record['author']}');
      meta.append(SpanElement()..text = '• ${_formatTimestamp(record['timestamp'])}');
      card.append(meta);
      card.append(ParagraphElement()..text = '${record['message']}');
      list.append(card);
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
    final uri = Uri.parse(window.location.href);
    final role = uri.queryParameters['role'];
    if (role == 'worker') {
      print('[SECURITY] Worker application is forbidden from loading Resident Portal.');
      return;
    }

    currentResidentId = houseId;
    window.localStorage['waterhall_resident_session'] = houseId;
    currentWorker = null; // EXPLICITLY ENSURE worker is null
    window.localStorage.remove('waterhall_session'); // EXPLICITLY ENSURE worker session is clear

    loginView.classes.remove('active');
    loginView.style.display = 'none';
    views.values.forEach((v) => v.classes.remove('active'));

    // EXPLICITLY hide worker nav and show resident nav
    bottomNav.setAttribute('style', 'display: none !important');
    residentBottomNav.setAttribute('style', 'display: flex !important');

    if (floatingRoleSwitchBtn != null) {
      floatingRoleSwitchBtn!.style.display = 'none'; // NEVER show this to residents
    }

    // Populate Resident Logout Card
    final household = db.getHousehold(houseId);
    if (household != null) {
      final resLogoutName = document.getElementById('resident-logout-name');
      final resLogoutRole = document.getElementById('resident-logout-role');
      final resLogoutAvatar = document.getElementById('resident-logout-avatar');

      final ownerName = (household['owner_name'] ?? '').toString();
      if (resLogoutName != null) resLogoutName.text = ownerName.isNotEmpty ? ownerName : houseId;
      if (resLogoutRole != null) resLogoutRole.text = '${household['house_id']} • ${household['purok']}';

      if (resLogoutAvatar != null) {
        final List<String> parts = ownerName.split(' ');
        final cleanParts = parts.where((p) => p.trim().isNotEmpty).toList();
        final initials = cleanParts.map((n) => n.isNotEmpty ? n[0] : '').join('');
        final safeInitials = initials.substring(0, initials.length < 2 ? initials.length : 2).toUpperCase();
        resLogoutAvatar.text = safeInitials.isNotEmpty ? safeInitials : 'RES';
      }
    }

    switchTab('view-resident-home');
    _restoreReportDraft?.call();
  }

  void _refreshTelemetryDisplay() {
    if (!hasUsableSession()) return;
    final role = currentResidentId != null ? 'resident' : currentWorker != null ? 'worker' : null;
    if (role == null) return;
    _renderTelemetry(role, db.getCentralAssets(), document.getElementById('$role-tank-val'),
        document.getElementById('$role-turb-val'), document.getElementById('$role-tds-val'),
        document.getElementById('$role-safety-status'));
  }

  void _renderTelemetry(String role, Map<String, dynamic> assets, Element? level,
      Element? turbidity, Element? tds, Element? status) {
    final available = assets['has_reading'] != false;
    final rawDate = '${assets['last_updated'] ?? ''}';
    final normalized = RegExp(r'(Z|[+-]\d\d:\d\d)$').hasMatch(rawDate) ? rawDate : '${rawDate}Z';
    final recorded = DateTime.tryParse(normalized);
    final age = recorded == null ? null : DateTime.now().toUtc().difference(recorded.toUtc());
    final stale = age != null && (age.inMinutes >= 10 || age.isNegative);
    void reading(Element? element, dynamic value, int digits, [String unit = '']) {
      final valid = available && value is num && value.isFinite;
      final text = valid ? '${value.toStringAsFixed(digits)}$unit' : 'N/A';
      if (element?.text != text) element?.text = text;
      element?.parent?.querySelector('small')?.style.display = valid ? '' : 'none';
    }
    final rawLevel = assets['main_tank_level'];
    reading(level, rawLevel, 0, '%');
    reading(turbidity, assets['turbidity'], 1);
    reading(tds, assets['tds_ppm'], 0);
    final warning = assets['turbidity_status'] == 'warning';
    final statusText = !available ? 'AWAITING DATA' : stale ? 'STALE DATA' : warning ? 'QUALITY ALERT' : 'NO ALERT';
    if (status?.text != statusText) status?.text = statusText;
    status?.style.color = !available || stale ? 'var(--text-muted)' : warning ? 'var(--alert-red)' : 'var(--text-muted)';
    final updated = !available ? 'Awaiting current sensor readings.'
        : recorded == null ? 'Update time unavailable.'
        : stale ? 'Stale reading. Refresh when connected.' : 'Current sensor readings.';
    final freshness = document.getElementById('$role-telemetry-freshness');
    if (freshness?.text != updated) freshness?.text = updated;
    final dateElement = document.getElementById('$role-reading-time');
    final displayDate = _formatTimestamp(rawDate);
    if (dateElement?.text != displayDate) dateElement?.text = displayDate;
    js.context['WaterHallDisplay'].callMethod('renderTank', ['$role-water-tank', rawLevel, available && !stale && recorded != null]);
  }

  void renderResidentDashboard() {
    if (currentResidentId == null) return;

    final household = db.getHousehold(currentResidentId!);
    if (household == null) return;

    final latestAnnouncement = db.getLatestAnnouncement(role: 'resident');
    if (db.isDatabaseOnline) _processAnnouncements(latestAnnouncement, 'resident');
    final bannerEl = document.getElementById('resident-announcement-banner');
    final messageEl = document.getElementById('resident-announcement-message');
    final tagEl = document.getElementById('resident-announcement-tag');
    if (bannerEl != null && messageEl != null) {
      if (latestAnnouncement != null && (latestAnnouncement['message'] as String).isNotEmpty) {
        final annMsg = latestAnnouncement['message'] as String;
        messageEl.text = annMsg;
        if (tagEl != null) {
          final aud = latestAnnouncement['target_audience'] ?? 'Everyone';
          final auth = latestAnnouncement['author'] ?? 'Admin';
          tagEl.text = '$auth • ${_formatTimestamp(latestAnnouncement['timestamp'])} • $aud';
        }
        bannerEl.style.display = 'flex';

      } else {
        bannerEl.style.display = 'none';
      }
    }

    final assets = db.getCentralAssets();
    final resTankVal = document.getElementById('resident-tank-val');
    final resTurbVal = document.getElementById('resident-turb-val');
    final resTdsVal = document.getElementById('resident-tds-val');
    final resSafetyStatus = document.getElementById('resident-safety-status');

    _renderTelemetry('resident', assets, resTankVal, resTurbVal, resTdsVal, resSafetyStatus);

    final resProfileName = document.getElementById('resident-profile-name-home');
    final resProfileMeta = document.getElementById('resident-profile-meta-home');

    if (resProfileName != null) resProfileName.text = household['owner_name'];
    if (resProfileMeta != null) {
      resProfileMeta.text = 'Resident: ${household['house_id']} | Meter: ${household['account_number']} | ${household['purok']}';
    }

    // Populate Resident Support tab logout card
    final resLogoutName = document.getElementById('resident-logout-name');
    final resLogoutRole = document.getElementById('resident-logout-role');
    final resLogoutAvatar = document.getElementById('resident-logout-avatar');

    final ownerName = (household['owner_name'] ?? '').toString();
    document.getElementById('resident-profile-name')?.text = ownerName;
    document.getElementById('resident-profile-account')?.text = '${household['house_id']} · Meter ${household['account_number']} · ${household['purok']}';
    document.getElementById('resident-profile-avatar')?.text = ownerName.isEmpty ? 'R' : ownerName[0].toUpperCase();
    document.getElementById('resident-report-context')?.text = 'Reporting for ${household['house_id']} · ${household['purok']}';
    if (resLogoutName != null) resLogoutName.text = ownerName.isNotEmpty ? ownerName : household['house_id'];
    if (resLogoutRole != null) resLogoutRole.text = '${household['house_id']} • ${household['purok']}';

    if (resLogoutAvatar != null) {
      final List<String> parts = ownerName.split(' ');
      final cleanParts = parts.where((p) => p.trim().isNotEmpty).toList();
      final initials = cleanParts.map((n) => n.isNotEmpty ? n[0] : '').join('');
      final safeInitials = initials.substring(0, initials.length < 2 ? initials.length : 2).toUpperCase();
      resLogoutAvatar.text = safeInitials.isNotEmpty ? safeInitials : 'RES';
    }

    // Leak Flag Warning
    final leakFlagEl = document.getElementById('resident-leak-flag');
    if (leakFlagEl != null) {
      if (household['current_leak_status'] == 'leak') {
        leakFlagEl.innerHtml = '''
          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
          <span>A leak has been reported. Please contact the water service team.</span>
        ''';
        leakFlagEl.className = "reservoir-status-banner low";
        leakFlagEl.style.backgroundColor = "var(--alert-red-bg)";
        leakFlagEl.style.borderColor = "rgba(239, 68, 68, 0.3)";
        leakFlagEl.style.color = "var(--alert-red)";
      } else {
        leakFlagEl.innerHtml = '''
          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <span>No leak is currently reported. Report any water service concern in Support.</span>
        ''';
        leakFlagEl.className = "reservoir-status-banner";
        leakFlagEl.style.backgroundColor = "var(--alert-green-bg)";
        leakFlagEl.style.borderColor = "rgba(16, 185, 129, 0.2)";
        leakFlagEl.style.color = "var(--alert-green)";
      }
    }

    // Prefer an unpaid statement, then this month, then the most recent recorded bill.
    final bills = db.getBillingHistoryForHousehold(currentResidentId!);
    final month = DateTime.now().toUtc().toIso8601String().substring(0, 7);
    final unpaid = bills.where((b) => '${b['status']}'.toLowerCase() != 'paid').toList();
    final current = bills.where((b) => b['billing_month'] == month).toList();
    Map<String, dynamic>? statement;
    if (unpaid.isNotEmpty) {
      statement = unpaid.first;
    } else if (current.isNotEmpty) {
      statement = current.first;
    } else if (bills.isNotEmpty) {
      statement = bills.first;
    }
    final snapshot = statement?['billing_breakdown'] as Map?;
    void put(String id, String value) { document.getElementById(id)?.text = value; }
    String value(dynamic v, int digits) => v == null ? '--' : double.parse('$v').toStringAsFixed(digits);
    put('resident-bill-cycle', statement == null ? 'No recorded cycle' : '${statement['billing_month']}');
    put('resident-bill-status', statement == null ? 'No unpaid or current bill' : '${statement['status']}');
    put('resident-prev-reading', value(statement?['previous_reading'], 3));
    put('resident-curr-reading', value(statement?['current_reading'], 3));
    put('resident-calc-consumption', value(statement?['consumption'], 3));
    put('resident-calc-total', value(statement?['total_due'], 2));
    put('resident-calc-base', value(snapshot?['base_rate'], 2));
    put('resident-calc-fee', value(snapshot?['environmental_fee'], 2));
    put('resident-calc-excess', value(snapshot?['excess_charge'], 2));
    final paidAt = statement?['payment_date']?.toString() ?? '';
    put('resident-payment-date', (statement != null && '${statement['status']}'.toLowerCase() == 'paid' && paidAt.isNotEmpty) ? _formatTimestamp(paidAt) : 'Not paid');
    put('resident-rate-description', statement == null ? 'No billing record is on file yet. Amounts appear here after a Worker saves a meter reading.' : snapshot == null
      ? 'Legacy bill: original total preserved; rate breakdown unavailable.'
      : "Recorded rates: first ${snapshot['included_m3']} m³ included; excess PHP ${snapshot['excess_rate']}/m³.");

    renderSVGChart(List<num>.from(household['monthly_history']), 'resident-chart-container');
    renderResidentLedgerList(bills);

    // Render Dynamic Payment Guidelines from Online Database
    final settings = db.getPaymentSettings();
    final resLoc = document.getElementById('res-payment-location');
    final resMethod = document.getElementById('res-payment-method');
    final resHours = document.getElementById('res-payment-hours');
    final resInst = document.getElementById('res-payment-instructions');

    if (resLoc != null && settings.containsKey('payment_location')) {
      resLoc.text = settings['payment_location']!;
    }
    if (resMethod != null && settings.containsKey('payment_method')) {
      resMethod.text = settings['payment_method']!;
    }
    if (resHours != null && settings.containsKey('operating_hours')) {
      resHours.text = settings['operating_hours']!;
    }
    if (resInst != null && settings.containsKey('payment_instructions')) {
      resInst.text = settings['payment_instructions']!;
    }
  }

  void renderResidentLedgerList(List<Map<String, dynamic>> history) {
    final listEl = document.getElementById('resident-history-list');
    if (listEl == null) return;
    listEl.innerHtml = '';

    if (history.isEmpty) {
      listEl.innerHtml = '<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>';
      return;
    }

    history.forEach((bill) {
      final item = document.createElement('div');
      item.className = 'bill-record-card ${bill['status']}';

      final formatted = _formatTimestamp(bill['date']);

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
          Bill Ref ID: ${bill['bill_id']} | Issued: $formatted${bill['status'] == 'Paid' && (bill['payment_date'] ?? '').toString().isNotEmpty ? ' | Paid: ${_formatTimestamp(bill['payment_date'])}' : ''}
        </div>
      ''';
      final breakdown = bill['billing_breakdown'] as Map?;
      final detail = ParagraphElement()..style.fontSize = '11px';
      detail.text = breakdown == null ? 'Legacy bill: rate breakdown unavailable. Original total retained.'
        : "Recorded: base PHP ${breakdown['base_rate']} (includes ${breakdown['included_m3']} m³), excess ${breakdown['excess_m3']} m³ x PHP ${breakdown['excess_rate']} = PHP ${breakdown['excess_charge']}, environmental fee PHP ${breakdown['environmental_fee']}.";
      item.append(detail);
      listEl.append(item);
    });
  }

  void _initRegistrationHandlers() {
    final button = document.getElementById('btn-open-register-modal');
    final modal = document.getElementById('register-user-modal');
    final form = document.getElementById('resident-register-form') as FormElement?;
    final status = document.getElementById('register-status');
    final submit = document.getElementById('btn-submit-register') as ButtonElement?;
    if (Uri.base.queryParameters['role'] == 'resident') button?.style.display = 'block';
    document.querySelectorAll('[data-toggle-password]').forEach((node) {
      node.onClick.listen((event) {
        event.preventDefault();
        final buttonEl = node as ButtonElement;
        final input = document.getElementById(buttonEl.dataset['togglePassword'] ?? '') as InputElement?;
        if (input == null) return;
        final hidden = input.type == 'password';
        input.type = hidden ? 'text' : 'password';
        buttonEl.text = hidden ? 'Hide' : 'Show';
      });
    });
    document.getElementById('btn-close-register-modal')?.onClick.listen((_) { modal?.style.display = 'none'; });
    button?.onClick.listen((_) async {
      modal?.style.display = 'flex';
      status?.text = 'Loading available puroks...';
      try {
        final xhr = await db.apiRequest('/api/puroks', authenticated: false);
        final select = document.getElementById('reg-res-purok') as SelectElement;
        select.children.clear();
        for (final name in json.decode(xhr.responseText!)['puroks']) {
          select.append(OptionElement(data: '$name', value: '$name'));
        }
        status?.text = select.options.isEmpty ? 'No puroks configured. Contact the administrator.' : '';
      } catch (_) { status?.text = 'Registration needs an internet connection. Please retry.'; }
    });
    form?.onSubmit.listen((event) async {
      event.preventDefault();
      if (submit == null || submit.disabled || !form.checkValidity()) return;
      String read(String id) => (document.getElementById(id) as InputElement).value ?? '';
      if (read('reg-password') != read('reg-verify-password')) { status?.text = 'Passwords do not match.'; return; }
      submit.disabled = true;
      status?.text = 'Submitting registration...';
      try {
        final xhr = await db.apiRequest('/api/residents/register', method: 'POST', authenticated: false,
          requestHeaders: {'Content-Type': 'application/json'}, sendData: json.encode({
            'owner_name': read('reg-res-name').trim(), 'contact': read('reg-contact').trim(),
            'purok': (document.getElementById('reg-res-purok') as SelectElement).value,
            'password': read('reg-password'), 'verify_password': read('reg-verify-password')}));
        final data = json.decode(xhr.responseText!);
        form.reset();
        status?.text = 'Registration submitted. Resident ID: ${data['house_id']}. Meter ID: ${data['account_number']}. Wait for Admin approval before signing in.';
      } on ApiFailure catch (failure) {
        status?.text = failure.status == 409 ? 'This mobile number is already registered. Contact the administrator.' : failure.status == 400
          ? 'Check your name, Philippine mobile number, purok, and matching passwords (12-128 characters).'
          : 'Registration was not confirmed. Retry with the same contact, or ask Admin to check its status.';
      } catch (_) { status?.text = 'Unable to submit registration. Please try again.'; }
      finally { submit.disabled = false; }
    });
  }

  void _bindCollectionHandlers() {
    final btnOpen = document.getElementById('btn-open-collect-modal');
    final modal = document.getElementById('modal-collect-payment');
    final btnCancel = document.getElementById('btn-collect-cancel');
    final btnConfirm = document.getElementById('btn-collect-confirm') as ButtonElement?;
    final amountInput = document.getElementById('collect-amount-input') as InputElement?;
    final methodSelect = document.getElementById('collect-payment-method') as SelectElement?;

    btnOpen?.onClick.listen((e) {
      if (currentWorker == null || activeHouseholdId == null ||
          db.getPaymentSettings()['allow_worker_collection'] != 'true') {
        showToast('Field payment collection is disabled. Payments must be settled in person at Barangay Hall.');
        return;
      }
      (document.getElementById('collect-hh-name') as InputElement?)?.value = db.getHousehold(activeHouseholdId!)?['owner_name']?.toString() ?? activeHouseholdId!;
      amountInput?.value = '';
      modal?.style.display = 'flex';
    });

    btnCancel?.onClick.listen((e) {
      modal?.style.display = 'none';
    });

    btnConfirm?.onClick.listen((e) async {
      if (activeHouseholdId == null || currentWorker == null || btnConfirm.disabled) return;
      final amount = double.tryParse(amountInput?.value ?? '') ?? 0.0;
      if (amount <= 0) {
        showToast("Please enter a valid payment amount!");
        return;
      }

      final method = methodSelect?.value ?? 'Cash';
      final workerId = (currentWorker!['worker_id'] ?? currentWorker!['name'] ?? 'Collector').toString();
      final token = window.localStorage['waterhall_jwt'];
      final houseId = activeHouseholdId!;

      btnConfirm.disabled = true;
      try {
      // Confirm only after durable local commit.
      final record = await db.recordBillCollectionOffline(
        houseId: houseId,
        amount: amount,
        collectedBy: workerId,
        paymentMethod: method
      );

      if (token != window.localStorage['waterhall_jwt'] || currentWorker == null) return;

      modal?.style.display = 'none';
      showToast("Collection recorded! TxID: ${record['transaction_id']}");
      openWorkerResidentDetails(houseId);
      } catch (_) {
        if (token == window.localStorage['waterhall_jwt']) showToast('Collection not saved. Check device storage and existing pending payments.');
      } finally { btnConfirm.disabled = false; }
    });

    // Resident Service / Incident Report Submission Handler
    final galleryInput = document.getElementById('resident-gallery-input') as FileUploadInputElement?;
    final cameraInput = document.getElementById('resident-camera-input') as FileUploadInputElement?;
    final photoInput = document.getElementById('resident-photo-input') as FileUploadInputElement?;
    final reportCategory = document.getElementById('resident-issue-category') as SelectElement?;
    final reportDescription = document.getElementById('resident-log-desc') as TextAreaElement?;

    void saveDraft() {
      if (currentResidentId == null || !db.checkSession()) return;
      try {
        window.localStorage[_reportDraftKey] = json.encode({
          'owner': currentAccount(), 'category': reportCategory?.value,
          'description': reportDescription?.value, 'photo': _reportPhoto,
          'file_name': document.getElementById('resident-photo-name')?.text,
          'operation_id': _residentReportOperationId,
          'picker_pending': _pendingNativePhotoRequestId != null,
        });
      } catch (_) {
        showToast('Device storage is full. Keep this screen open to retain your draft.');
      }
    }

    void showSelectedPhoto(String dataUrl, String fileName) {
      _reportPhoto = dataUrl;
      document.getElementById('resident-photo-name')?.text = fileName;
      final preview = document.getElementById('resident-photo-preview');
      preview?.children.clear();
      preview?.style.display = 'block';
      final image = ImageElement(src: dataUrl)..alt = 'Selected evidence preview';
      preview?.append(image);
      document.getElementById('resident-photo-preview-card')?.style.display = 'block';
      document.getElementById('resident-photo-pickers')?.style.display = 'none';
    }

    Future<void> acceptPhoto(String dataUrl, String fileName) async {
      final version = ++_photoSelectionVersion;
      _processingReportPhoto = true;
      final token = window.localStorage['waterhall_jwt'];
      try {
        final match = RegExp(r'^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$').firstMatch(dataUrl);
        if (match == null) throw const FormatException();
        if (dataUrl.length > 2 * 1024 * 1024 * 4 ~/ 3 + 100 ||
            base64.decode(match.group(2)!).length > 2 * 1024 * 1024) {
          throw StateError('Photo too large');
        }
        final image = ImageElement();
        final loaded = Completer<void>();
        final onLoad = image.onLoad.listen((_) { if (!loaded.isCompleted) loaded.complete(); });
        final onError = image.onError.listen((_) { if (!loaded.isCompleted) loaded.completeError(const FormatException()); });
        try {
          image.src = dataUrl;
          await loaded.future.timeout(const Duration(seconds: 10));
          if (image.naturalWidth * image.naturalHeight > 12000000) throw const FormatException();
        } finally { await onLoad.cancel(); await onError.cancel(); }
        if (version != _photoSelectionVersion || token != window.localStorage['waterhall_jwt'] || currentResidentId == null) return;
        _residentReportOperationId = null;
        showSelectedPhoto(dataUrl, fileName);
        saveDraft();
      } catch (error) {
        if (version != _photoSelectionVersion || token != window.localStorage['waterhall_jwt'] || currentResidentId == null) return;
        showToast(error is StateError ? 'Photo must be at most 2 MiB.' : 'Invalid image. Use a JPEG, PNG or WebP photo.');
      } finally {
        if (version == _photoSelectionVersion) _processingReportPhoto = false;
      }
    }

    js.context['waterhallPhotoPickerResult'] = js.allowInterop((dynamic requestId, dynamic dataUrl, dynamic fileName, dynamic error) {
      if (currentResidentId == null || requestId == null || requestId != _pendingNativePhotoRequestId) return;
      _pendingNativePhotoRequestId = null;
      saveDraft();
      if (error is String && error.isNotEmpty) {
        showToast(error);
        return;
      }
      if (dataUrl is String && dataUrl.isNotEmpty) {
        unawaited(acceptPhoto(dataUrl, fileName is String && fileName.isNotEmpty ? fileName : 'Selected photo'));
      }
    });

    void openPhotoPicker(FileUploadInputElement? fallbackInput, String source) {
      if (currentResidentId == null || _submittingResidentReport || !db.checkSession()) return;
      if (!js.context.hasProperty('NativePhotoPicker')) {
        fallbackInput?.value = '';
        fallbackInput?.click();
        return;
      }
      if (_pendingNativePhotoRequestId != null) return;

      final requestId = '${DateTime.now().microsecondsSinceEpoch}-${++_photoRequestCounter}';
      _pendingNativePhotoRequestId = requestId;
      saveDraft();
      try {
        js.context['NativePhotoPicker'].callMethod('postMessage', [
          json.encode({'request_id': requestId, 'source': source})
        ]);
      } catch (_) {
        _pendingNativePhotoRequestId = null;
        saveDraft();
        showToast('Could not open the photo picker. Please try again.');
      }
    }

    void clearSelectedPhoto() {
      _photoSelectionVersion++;
      _processingReportPhoto = false;
      _reportPhoto = null;
      if (galleryInput != null) galleryInput.value = '';
      if (cameraInput != null) cameraInput.value = '';
      if (photoInput != null) photoInput.value = '';
      document.getElementById('resident-photo-name')?.text = 'No file chosen';
      final preview = document.getElementById('resident-photo-preview');
      preview?.children.clear();
      document.getElementById('resident-photo-preview-card')?.style.display = 'none';
      document.getElementById('resident-photo-pickers')?.style.display = 'flex';
    }

    Future<void> handleResidentPhotoFile(FileUploadInputElement? input) async {
      if (currentResidentId == null || _submittingResidentReport) return;
      final files = input?.files;
      if (files == null || files.isEmpty) return;
      final file = files.first;

      // Validate size (max 2 MiB)
      if (file.size > 2 * 1024 * 1024) {
        showToast('Photo must be at most 2 MiB.');
        return;
      }

      // Validate mime type (JPEG, PNG, WebP)
      final type = file.type.toLowerCase();
      final validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.contains(type)) {
        showToast('Use a JPEG, PNG or WebP photo.');
        return;
      }

      final token = window.localStorage['waterhall_jwt'];
      final version = ++_photoSelectionVersion;
      _processingReportPhoto = true;
      try {
        final reader = FileReader()..readAsDataUrl(file);
        await reader.onLoad.first.timeout(const Duration(seconds: 10));
        if (version != _photoSelectionVersion || token != window.localStorage['waterhall_jwt']) return;
        await acceptPhoto(reader.result as String, file.name);
      } catch (_) {
        if (version == _photoSelectionVersion && token == window.localStorage['waterhall_jwt']) showToast('Could not load selected photo.');
      } finally {
        if (version == _photoSelectionVersion) _processingReportPhoto = false;
      }
    }

    // Input change listeners
    galleryInput?.onChange.listen((_) => handleResidentPhotoFile(galleryInput));
    cameraInput?.onChange.listen((_) => handleResidentPhotoFile(cameraInput));
    photoInput?.onChange.listen((_) => handleResidentPhotoFile(photoInput));

    // Button triggers
    document.getElementById('btn-resident-gallery-trigger')?.onClick.listen((_) => openPhotoPicker(galleryInput, 'gallery'));
    document.getElementById('btn-resident-camera-trigger')?.onClick.listen((_) => openPhotoPicker(cameraInput, 'camera'));
    document.getElementById('btn-resident-photo-trigger')?.onClick.listen((_) => openPhotoPicker(galleryInput, 'gallery'));
    document.getElementById('btn-resident-photo-replace-gallery')?.onClick.listen((_) => openPhotoPicker(galleryInput, 'gallery'));
    document.getElementById('btn-resident-photo-replace-camera')?.onClick.listen((_) => openPhotoPicker(cameraInput, 'camera'));
    document.getElementById('btn-resident-photo-remove')?.onClick.listen((_) {
      if (_submittingResidentReport) return;
      _pendingNativePhotoRequestId = null;
      _residentReportOperationId = null;
      clearSelectedPhoto();
      saveDraft();
      showToast('Photo removed.');
    });

    void draftChanged(Event _) {
      _residentReportOperationId = null;
      _reportDraftTimer?.cancel();
      _reportDraftTimer = Timer(const Duration(milliseconds: 400), saveDraft);
    }
    reportDescription?.onInput.listen(draftChanged);
    reportCategory?.onChange.listen(draftChanged);
    _restoreReportDraft = () {
      if (currentResidentId == null) return;
      clearSelectedPhoto();
      try {
        final draft = json.decode(window.localStorage[_reportDraftKey] ?? '{}');
        if (draft['owner'] != currentAccount()) return;
        reportDescription?.value = draft['description'] as String? ?? '';
        if (draft['category'] is String) reportCategory?.value = draft['category'];
        _residentReportOperationId = draft['operation_id'] as String?;
        if (draft['photo'] is String) showSelectedPhoto(draft['photo'], draft['file_name'] as String? ?? 'Selected photo');
        if (draft['picker_pending'] == true) openPhotoPicker(null, 'recover');
      } catch (_) { showToast('Draft could not be restored. Please select your photo again.'); }
    };
    _restoreReportDraft?.call();

    final btnSubmitReport = document.getElementById('btn-resident-submit-log');
    btnSubmitReport?.onClick.listen((e) async {
      if (currentResidentId == null || _submittingResidentReport) return;
      if (_pendingNativePhotoRequestId != null || _processingReportPhoto) { showToast('Finish or cancel the photo picker first.'); return; }
      final catSelect = document.getElementById('resident-issue-category') as SelectElement?;
      final descText = document.getElementById('resident-log-desc') as TextAreaElement?;

      final cat = catSelect?.value ?? 'Water Leak';
      final desc = descText?.value?.trim() ?? '';
      if (desc.isEmpty) {
        showToast("Please provide details for the report!");
        return;
      }

      if (!db.checkSession()) return;
      final token = window.localStorage['waterhall_jwt'];
      _residentReportOperationId ??= operationId();
      _reportDraftTimer?.cancel();
      saveDraft();
      _submittingResidentReport = true;
      final attempt = ++_residentReportAttemptVersion;
      final controls = residentViewSupport.querySelectorAll('button, input, textarea, select')
          .where((element) => element.id != 'btn-resident-logout' && !element.attributes.containsKey('disabled')).toList();
      for (final control in controls) { control.setAttribute('disabled', ''); }
      try {
        final success = await db.submitResidentReport(currentResidentId!, cat, desc,
            photo: _reportPhoto, reportOperationId: _residentReportOperationId!);
        if (token != window.localStorage['waterhall_jwt'] || currentResidentId == null) return;
        if (!success) throw const ApiFailure();
        showToast('Report submitted successfully.');
        if (descText != null) descText.value = '';
        clearSelectedPhoto();
        _residentReportOperationId = null;
        window.localStorage.remove(_reportDraftKey);
      } on ApiFailure catch (failure) {
        if (failure.sessionChanged || token != window.localStorage['waterhall_jwt']) return;
        showToast(failure.status == 413 ? 'Photo is too large. Choose a smaller photo; your draft is retained.'
          : failure.status == 400 || failure.status == 422 ? 'Report or photo was rejected. Review your draft and retry.'
          : failure.status == 403 ? 'This account cannot submit this report. Your draft is retained.'
          : 'Report was not confirmed. Your draft and photo are retained; retry when connected.');
      } catch (_) {
        if (token == window.localStorage['waterhall_jwt']) showToast('Report was not confirmed. Your draft and photo are retained.');
      } finally {
        if (attempt == _residentReportAttemptVersion) {
          _submittingResidentReport = false;
          for (final control in controls) { control.attributes.remove('disabled'); }
        }
      }
    });

    // Offline banner retry button
    final btnRetry = document.getElementById('btn-retry-db-connection');
    btnRetry?.onClick.listen((e) async {
      showToast("Testing server connection...");
      final ok = await db.refreshData();
      if (ok) {
        showToast("Server connected! Online sync active.");
      } else {
        showToast("Server unreachable. Continuing in offline mode.");
      }
    });
  }
}
