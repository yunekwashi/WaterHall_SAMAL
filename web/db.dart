import 'dart:html';
import 'dart:convert';
import 'dart:async';
import 'offline_store.dart';

const sessionExpiredMessage = 'Session expired. Please sign in again.';

class ApiFailure implements Exception {
  final int? status;
  final bool sessionChanged;
  const ApiFailure({this.status, this.sessionChanged = false});
  bool get unavailable => status == null || status == 429 || status! >= 500;
  @override
  String toString() => 'API request was not completed.';
}

const dbKeys = {
  'households': 'waterhall_households',
  'centralAssets': 'waterhall_central_assets',
  'maintenanceLogs': 'waterhall_maintenance_logs',
  'workers': 'waterhall_workers',
  'billingRecords': 'waterhall_billing_records',
  'announcements': 'waterhall_announcements',
  'paymentSettings': 'waterhall_payment_settings',
  'offlineCollections': 'waterhall_offline_collections',
  'unsyncedActions': 'waterhall_unsynced_actions'
};

final Map<String, dynamic> seedCentralAssets = {
  'main_tank_level': 0, 'turbidity': 0, 'ph_level': 0, 'tds_ppm': 0,
  'turbidity_status': 'unknown', 'ph_status': 'unknown', 'has_reading': false,
  'turbidity_desc': 'Awaiting sensor readings', 'ph_desc': 'Awaiting sensor readings', 'last_updated': null
};

final Map<String, String> defaultPaymentSettings = {
  'payment_location': 'Barangay Tagpopongan Hall - Treasury Office',
  'payment_method': 'In-Person Payment at Barangay Hall / Field Worker Collection',
  'allow_worker_collection': 'true',
  'payment_instructions': 'Water bills are due on or before the 25th of each month. Payments can be settled in cash at the Barangay Hall Treasury Window or directly with your authorized Purok Field Collector during home visits.',
  'operating_hours': 'Monday - Friday, 8:00 AM - 5:00 PM',
  'emergency_contact': 'Not configured; contact the Barangay office'
};

class Database {
  List<Map<String, dynamic>> _households = [];
  Map<String, dynamic> _centralAssets = {};
  List<Map<String, dynamic>> _maintenanceLogs = [];
  List<Map<String, dynamic>> _workers = [];
  List<Map<String, dynamic>> _billingRecords = [];
  List<Map<String, dynamic>> _announcements = [];
  Map<String, String> _paymentSettings = {};
  
  bool isDatabaseOnline = false;
  String? lastSyncError;
  bool _refreshing = false;
  int _sessionVersion = 0;
  Future<void> _nativeAuthWrites = Future<void>.value();
  void Function(bool expired)? onSessionEnded;
  static const requestTimeout = Duration(seconds: 15);

  Future<void> _writeNativeAuth(String? token) {
    final write = _nativeAuthWrites.catchError((_) {}).then((_) => nativeSession(token));
    _nativeAuthWrites = write;
    return write;
  }

  Future<void> startSession(String token) async {
    final version = ++_sessionVersion;
    window.localStorage['waterhall_jwt'] = token;
    lastSyncError = null;
    try {
      await _writeNativeAuth(token);
      if (version != _sessionVersion || !checkSession()) throw const ApiFailure(sessionChanged: true);
    } catch (_) {
      if (version == _sessionVersion) await endSession(expired: true);
      throw const ApiFailure(sessionChanged: true);
    }
  }

  Future<void> endSession({bool expired = false}) async {
    ++_sessionVersion;
    isDatabaseOnline = false;
    window.localStorage.remove('waterhall_jwt');
    window.localStorage.remove('waterhall_session');
    window.localStorage.remove('waterhall_resident_session');
    clearPrivateCache(); // Deliberately retains both account-owned queues.
    lastSyncError = expired ? sessionExpiredMessage : null;
    onSessionEnded?.call(expired);
    _notifySyncStatus();
    try {
      await _writeNativeAuth(null);
    } catch (_) {
      // Local authorization is already cleared. Never log tokens/bridge payloads.
      lastSyncError = 'Unable to clear native session storage. Please restart the app.';
      _notifySyncStatus();
    }
  }

  bool checkSession() {
    if (hasUsableSession()) return true;
    if (window.localStorage.containsKey('waterhall_jwt') ||
        window.localStorage.containsKey('waterhall_session') ||
        window.localStorage.containsKey('waterhall_resident_session')) {
      unawaited(endSession(expired: true));
    }
    return false;
  }

  void _markOffline() {
    isDatabaseOnline = false;
    lastSyncError = 'Server unavailable. Pending operations remain saved and will retry.';
    _notifySyncStatus();
  }

  /// Abort the actual request on timeout; ignore responses from an ended session.
  Future<HttpRequest> apiRequest(String url, {String method = 'GET',
      Map<String, String>? requestHeaders, String? sendData, bool authenticated = true}) async {
    final uri = Uri.base.resolve(url);
    if (uri.origin != Uri.base.origin || !uri.path.startsWith('/api/')) throw const ApiFailure();
    if (authenticated && !checkSession()) throw const ApiFailure(sessionChanged: true);
    final version = _sessionVersion;
    final token = window.localStorage['waterhall_jwt'];
    final xhr = HttpRequest();
    final complete = Completer<HttpRequest>();
    final listeners = <StreamSubscription>[];
    Timer? deadline;
    void fail() {
      if (!complete.isCompleted) complete.completeError(const ApiFailure());
    }
    try {
      xhr.open(method, url);
      (requestHeaders ?? {}).forEach(xhr.setRequestHeader);
      if (authenticated) xhr.setRequestHeader('Authorization', 'Bearer $token');
      listeners.add(xhr.onLoad.listen((_) {
        if (!complete.isCompleted) complete.complete(xhr);
      }));
      listeners.add(xhr.onError.listen((_) => fail()));
      listeners.add(xhr.onAbort.listen((_) => fail()));
      deadline = Timer(requestTimeout, () { fail(); xhr.abort(); });
      xhr.send(sendData);
      final response = await complete.future;
      if (authenticated && (version != _sessionVersion || !checkSession())) {
        throw const ApiFailure(sessionChanged: true);
      }
      if (response.status == 401 && authenticated) {
        unawaited(endSession(expired: true));
        throw const ApiFailure(status: 401, sessionChanged: true);
      }
      if (response.status == null || response.status! < 200 || response.status! >= 300) {
        throw ApiFailure(status: response.status == 0 ? null : response.status);
      }
      return response;
    } catch (error) {
      if (version != _sessionVersion) throw const ApiFailure(sessionChanged: true);
      final failure = error is ApiFailure ? error : const ApiFailure();
      if (!failure.sessionChanged && failure.unavailable) _markOffline();
      throw failure;
    } finally {
      deadline?.cancel();
      for (final listener in listeners) { await listener.cancel(); }
    }
  }

  // Sync state event controller
  final _syncStatusController = StreamController<Map<String, dynamic>>.broadcast();
  Stream<Map<String, dynamic>> get onSyncStatusChange => _syncStatusController.stream;

  Map<String, dynamic> getSyncStatus() {
    final pending = getPendingCollections().length + pendingActions().length;
    String statusStr = 'online';
    if (!isDatabaseOnline) {
      statusStr = 'offline';
    } else if (_isSyncing) {
      statusStr = 'syncing';
    } else if (pending > 0) {
      statusStr = 'pending_sync';
    } else {
      statusStr = 'synced';
    }
    return {
      'status': statusStr,
      'isOnline': isDatabaseOnline,
      'isSyncing': _isSyncing || _syncingActions,
      'authenticated': hasUsableSession(),
      'reviewCount': getPendingCollections().where((c) => c['sync_error'] != null).length,
      'pendingCount': pending, 'error': lastSyncError
    };
  }

  void _notifySyncStatus() {
    _syncStatusController.add(getSyncStatus());
  }


  List<Map<String, dynamic>> allActions() {
    return (json.decode(window.localStorage[dbKeys['unsyncedActions']!] ?? '[]') as List).map((e) => Map<String, dynamic>.from(e)).toList();
  }
  List<Map<String, dynamic>> pendingActions() => allActions().where((e) => e['owner'] == currentAccount()).toList();

  Future<void> queueAction(String endpoint, Map<String, dynamic> body) async {
    if (!checkSession()) throw const ApiFailure(sessionChanged: true);
    final id = body['operation_id'] ?? operationId();
    body['operation_id'] = id;
    await mutateQueue('actions', (rows) => rows.add({'operation_id': id, 'owner': currentAccount(), 'endpoint': endpoint, 'body': body}));
    _notifySyncStatus();
    if (isDatabaseOnline) await syncActions();
  }

  bool _syncingActions = false;
  Future<void> syncActions() async {
    if (_syncingActions || !checkSession()) return;
    _syncingActions = true;
    final version = _sessionVersion;
    try {
      for (final action in pendingActions().take(100)) {
        if (version != _sessionVersion || !checkSession()) break;
        final xhr = await apiRequest(action['endpoint'] as String, method: 'POST',
          requestHeaders: {'Content-Type': 'application/json'},
          sendData: json.encode(action['body']));
        final response = json.decode(xhr.responseText ?? '{}');
        if (version != _sessionVersion || !checkSession()) break;
        if (xhr.status != 200 || response['status'] != 'success') break;
        await mutateQueue('actions', (rows) => rows.removeWhere((r) => r['operation_id'] == action['operation_id']));
        lastSyncError = null;
      }
    } catch (_) {
      if (version == _sessionVersion && hasUsableSession() && isDatabaseOnline) lastSyncError = 'Pending operations need review before they can sync.';
    } finally { _syncingActions = false; _notifySyncStatus(); }
  }

  void clearPrivateCache() {
    for (final entry in dbKeys.entries) {
      if (entry.key != 'offlineCollections' && entry.key != 'unsyncedActions') window.localStorage.remove(entry.value);
    }
    _households = []; _workers = []; _billingRecords = []; _maintenanceLogs = []; _announcements = [];
    _centralAssets = {}; _paymentSettings = {};
  }

  // --- Local Offline Cache Helpers ---
  void _loadFromLocalCache() {
    try {
      final rawH = window.localStorage[dbKeys['households']!];
      if (rawH != null) _households = List<Map<String, dynamic>>.from(json.decode(rawH));

      final rawA = window.localStorage[dbKeys['centralAssets']!];
      if (rawA != null) _centralAssets = Map<String, dynamic>.from(json.decode(rawA));

      final rawM = window.localStorage[dbKeys['maintenanceLogs']!];
      if (rawM != null) _maintenanceLogs = List<Map<String, dynamic>>.from(json.decode(rawM));

      final rawW = window.localStorage[dbKeys['workers']!];
      if (rawW != null) _workers = List<Map<String, dynamic>>.from(json.decode(rawW));

      final rawB = window.localStorage[dbKeys['billingRecords']!];
      if (rawB != null) _billingRecords = List<Map<String, dynamic>>.from(json.decode(rawB));

      final rawAnn = window.localStorage[dbKeys['announcements']!];
      if (rawAnn != null) _announcements = List<Map<String, dynamic>>.from(json.decode(rawAnn));

      final rawSet = window.localStorage[dbKeys['paymentSettings']!];
      if (rawSet != null) {
        _paymentSettings = Map<String, String>.from(json.decode(rawSet));
      } else {
        _paymentSettings = Map<String, String>.from(defaultPaymentSettings);
      }
    } catch (e) {
      print("Error loading local cache: $e");
    }
  }

  void _saveToLocalCache() {
    try {
      window.localStorage[dbKeys['households']!] = json.encode(_households);
      window.localStorage[dbKeys['centralAssets']!] = json.encode(_centralAssets);
      window.localStorage[dbKeys['maintenanceLogs']!] = json.encode(_maintenanceLogs);
      window.localStorage[dbKeys['workers']!] = json.encode(_workers);
      window.localStorage[dbKeys['billingRecords']!] = json.encode(_billingRecords);
      window.localStorage[dbKeys['announcements']!] = json.encode(_announcements);
      window.localStorage[dbKeys['paymentSettings']!] = json.encode(_paymentSettings);
    } catch (e) {
      print("Error saving local cache: $e");
    }
  }

  Future<bool> refreshData({String role = ''}) async {
    if (_refreshing || !checkSession()) return false;
    _refreshing = true;
    try {
      final url = role.isNotEmpty ? '/api/all-data?role=$role' : '/api/all-data';
      final xhr = await apiRequest(url);
      final data = json.decode(xhr.responseText!) as Map<String, dynamic>;
      
      _households = List<Map<String, dynamic>>.from(data['households']);
      _centralAssets = Map<String, dynamic>.from(data['centralAssets']);
      _maintenanceLogs = List<Map<String, dynamic>>.from(data['maintenanceLogs']);
      _workers = List<Map<String, dynamic>>.from(data['workers']);
      _billingRecords = List<Map<String, dynamic>>.from(data['billingRecords']);
      if (data.containsKey('announcements')) {
        _announcements = List<Map<String, dynamic>>.from(data['announcements']);
      }
      if (data.containsKey('paymentSettings')) {
        _paymentSettings = Map<String, String>.from(data['paymentSettings']);
      }
      
      _saveToLocalCache();
      isDatabaseOnline = true;
      _notifySyncStatus();

      // Upload durable actions before collections that may depend on new bills.
      await syncActions();
      if (isDatabaseOnline && checkSession()) unawaited(syncOfflineCollections());
      return isDatabaseOnline && hasUsableSession();
    } catch (e) {
      if (e is! ApiFailure || !e.sessionChanged) _markOffline();
      return false;
    } finally { _refreshing = false; }
  }

  Future<bool> init() async {
    checkSession();
    Timer.periodic(const Duration(seconds: 1), (_) => checkSession());
    window.onFocus.listen((_) => checkSession());
    // 1. Immediately load cached data so offline mode works instantly with no blank screen
    await restoreQueues();
    _loadFromLocalCache();
    if (_centralAssets.isEmpty) {
      _centralAssets = Map<String, dynamic>.from(seedCentralAssets);
    }
    if (_paymentSettings.isEmpty) {
      _paymentSettings = Map<String, String>.from(defaultPaymentSettings);
    }

// Availability, caching & CDN / offline sync: when connectivity returns, the app triggers
// a refresh and uploads any pending offline records to the backend.
    // 2. Register network online listener to auto-sync when connection is restored
    window.onOnline.listen((_) {
      print("[NET] Internet restored. Starting automatic synchronization...");
      refreshData();
    });

    window.onOffline.listen((_) {
      print("[NET] Internet disconnected. Entering offline mode.");
      isDatabaseOnline = false;
      _notifySyncStatus();
    });

    // 3. Attempt initial server sync
    return await refreshData();
  }

  // ==============================================================================
  // Offline SQLite / Local Transaction Store for Field Worker App
  // ==============================================================================
  List<Map<String, dynamic>> getAllCollections() {
    final raw = window.localStorage[dbKeys['offlineCollections']!];
    if (raw == null) return [];
    try {
      final decoded = json.decode(raw) as List;
      return decoded.map((item) => Map<String, dynamic>.from(item)).toList();
    } catch (_) {
      return [];
    }
  }

  List<Map<String, dynamic>> getPendingCollections() {
    final all = getAllCollections();
    return all.where((c) => c['sync_status'] == 'PENDING' && c['collected_by'] == currentAccount()).toList();
  }

  /// Records a bill collection.
  /// Works completely offline by saving to local SQLite/storage with status 'PENDING'.
  /// Generates a globally unique transaction ID to ensure idempotent synchronization.
  Future<Map<String, dynamic>> recordBillCollectionOffline({
    required String houseId,
    required num amount,
    required String collectedBy,
    String? billId,
    String paymentMethod = 'Cash'
  }) async {
    if (!checkSession()) throw const ApiFailure(sessionChanged: true);
    final now = DateTime.now().toUtc();
    final transactionId = operationId();

    final collectionRecord = {
      'transaction_id': transactionId,
      'bill_id': billId,
      'house_id': houseId,
      'amount_collected': amount,
      'date': now.toIso8601String(),
      'collected_by': collectedBy,
      'payment_method': paymentMethod,
      'sync_status': 'PENDING',
      'synced_at': null
    };

    await mutateQueue('collections', (rows) {
      if (rows.any((c) => c['house_id'] == houseId && c['collected_by'] == collectedBy && c['sync_status'] == 'PENDING')) {
        throw StateError('A collection for this household is already pending');
      }
      rows.insert(0, collectionRecord);
    });
    _notifySyncStatus();

    // Keep the amount pending until server confirmation.
    final cleanHouseId = houseId.toUpperCase().trim();
    for (var b in _billingRecords) {
      final bHouseId = (b['house_id'] ?? '').toString().toUpperCase().trim();
      final bBillId = (b['bill_id'] ?? '').toString().toUpperCase().trim();
      if ((billId != null && bBillId == billId.toUpperCase().trim()) || (billId == null && bHouseId == cleanHouseId && b['status'] != 'Paid')) {
        b['status'] = 'Pending sync';
        b['payment_status'] = 'Pending sync';
      }
    }
    _saveToLocalCache();

    print("[OFFLINE STORE] Collection recorded locally: $transactionId for $houseId (₱$amount). Status: PENDING.");
    
    // If online, immediately trigger background upload
    if (isDatabaseOnline) {
      syncOfflineCollections();
    } else {
      _notifySyncStatus();
    }

    return collectionRecord;
  }

  bool _isSyncing = false;
  Future<void> syncOfflineCollections() async {
    if (_isSyncing || !checkSession()) return;
    // Rotate attempted records so even 100 conflicts cannot starve newer work.
    final waiting = getPendingCollections()..sort((a, b) =>
      (a['last_sync_attempt'] ?? '').toString().compareTo((b['last_sync_attempt'] ?? '').toString()));
    final pending = waiting.take(100).toList();
    if (pending.isEmpty) {
      _notifySyncStatus();
      return;
    }

    _isSyncing = true;
    _notifySyncStatus();
    final version = _sessionVersion;
    try {
      final attempted = pending.map((c) => c['transaction_id']).toSet();
      await mutateQueue('collections', (rows) {
        for (final row in rows) {
          if (row['collected_by'] == currentAccount() && attempted.contains(row['transaction_id'])) {
            row['last_sync_attempt'] = DateTime.now().toUtc().toIso8601String();
          }
        }
      });
      await _syncCollectionBatch(pending, version);
      if (version == _sessionVersion && checkSession()) {
        lastSyncError = getPendingCollections().any((c) => c['sync_error'] != null)
            ? 'Some collections need review. Unacknowledged payments remain saved.' : null;
      }
    } catch (_) {
      if (version == _sessionVersion && hasUsableSession() && isDatabaseOnline) {
        lastSyncError = 'Sync not confirmed. Pending records remain saved for retry.';
      }
    } finally {
      _isSyncing = false;
      _notifySyncStatus();
    }
  }

  Future<void> _syncCollectionBatch(List<Map<String, dynamic>> records, int version) async {
    if (version != _sessionVersion || !checkSession()) throw const ApiFailure(sessionChanged: true);
    Set<String> acknowledged;
    try {
      final xhr = await apiRequest('/api/collections/sync', method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode({'collections': records}));
      final response = json.decode(xhr.responseText ?? '{}') as Map<String, dynamic>;
      final ids = response['synced_ids'];
      acknowledged = response['status'] == 'success' && ids is List
          ? ids.whereType<String>().toSet() : <String>{};
    } on ApiFailure catch (failure) {
      // Network/server failures may have committed: stop and retry the SAME IDs later.
      // Only deterministic record rejections are split, never 401/429/5xx/timeouts.
      if (failure.sessionChanged || ![400, 403, 404, 409, 422].contains(failure.status)) rethrow;
      if (records.length > 1) {
        final middle = records.length ~/ 2;
        await _syncCollectionBatch(records.sublist(0, middle), version);
        await _syncCollectionBatch(records.sublist(middle), version);
        return;
      }
      if (version != _sessionVersion || !checkSession()) throw const ApiFailure(sessionChanged: true);
      await _saveCollectionResult(records, <String>{},
          failure.status == 409 ? 'Bill or transaction conflict. Review before retrying.'
          : 'Collection rejected (HTTP ${failure.status}). Review before retrying.');
      return;
    }
    if (version != _sessionVersion || !checkSession()) throw const ApiFailure(sessionChanged: true);
    await _saveCollectionResult(records, acknowledged, 'Server did not acknowledge this collection. Retry required.');
    isDatabaseOnline = true;
  }

  Future<void> _saveCollectionResult(List<Map<String, dynamic>> sent, Set<String> acknowledged, String error) async {
    final sentIds = sent.map((c) => c['transaction_id']).toSet();
    await mutateQueue('collections', (rows) {
      for (final row in rows) {
        if (row['collected_by'] != currentAccount() || !sentIds.contains(row['transaction_id']) || row['sync_status'] != 'PENDING') continue;
        if (acknowledged.contains(row['transaction_id'])) {
          row['sync_status'] = 'SYNCED';
          row['synced_at'] = DateTime.now().toUtc().toIso8601String();
          row.remove('sync_error');
        } else {
          row['sync_error'] = error;
        }
      }
    });
    _notifySyncStatus();
  }

  // ==============================================================================
  // Payment Configuration (Admin Configurable)
  // ==============================================================================
  Map<String, String> getPaymentSettings() {
    return _paymentSettings;
  }

  Future<bool> updatePaymentSettings(Map<String, String> newSettings) async {
    _paymentSettings.addAll(newSettings);
    _saveToLocalCache();

    try {
      final headers = <String, String>{'Content-Type': 'application/json'};

      final xhr = await apiRequest(
        '/api/settings/payment',
        method: 'POST',
        requestHeaders: headers,
        sendData: json.encode(newSettings)
      );
      return xhr.status == 200;
    } catch (e) {
      print("Error saving payment settings to server: $e");
      return false;
    }
  }

  // ==============================================================================
  // Resident Incident / Service Reports
  // ==============================================================================
  Future<bool> submitResidentReport(String householdId, String reportType, String description, {String? photo}) async {
    try {
      await queueAction('/api/reports/add', {'household_id': householdId, 'report_type': reportType, 'description': description, 'photo_base64': photo});
      return true;
    } catch (_) { return false; }
  }

  // ==============================================================================
  // Core Data Getters
  // ==============================================================================
  List<Map<String, dynamic>> getHouseholds() {
    return _households;
  }

  Map<String, dynamic>? getHousehold(String id) {
    final households = getHouseholds();
    final clean = id.toLowerCase().trim();
    final numOnly = clean.replaceAll('hh-', '').trim();
    try {
      return households.firstWhere((h) {
        final hId = (h['house_id'] ?? '').toString().toLowerCase().trim();
        final hNum = hId.replaceAll('hh-', '').trim();
        final accNum = (h['account_number'] ?? '').toString().toLowerCase().trim();
        final owner = (h['owner_name'] ?? '').toString().toLowerCase().trim();
        final combined = "${h['purok']} ${h['lot'] ?? ''}".toLowerCase().trim();
        return clean == hId ||
               numOnly == hNum ||
               clean == accNum ||
               clean == owner ||
               clean == combined;
      });
    } catch (_) {
      return null;
    }
  }

  Future<Map<String, dynamic>?> updateHouseholdLeak(String id, String status) async {
    final households = getHouseholds();
    final index = households.indexWhere((h) => h['house_id'] == id);
    if (index != -1) {
      final updated = Map<String, dynamic>.from(households[index]);
      updated['current_leak_status'] = status;
      if (status == 'leak') {
        updated['leak_detected_at'] = DateTime.now().toUtc().toIso8601String();
      } else {
        updated['leak_detected_at'] = null;
      }
      await queueAction('/api/households/update', updated);
      households[index] = updated;
      _saveToLocalCache();

      return households[index];
    }
    return null;
  }

  Map<String, dynamic> getCentralAssets() {
    return _centralAssets;
  }

  Map<String, dynamic> updateCentralAssets(Map<String, dynamic> updates) {
    final assets = getCentralAssets();
    updates.forEach((key, value) {
      assets[key] = value;
    });
    assets['last_updated'] = DateTime.now().toUtc().toIso8601String();

    final num phLevel = assets['ph_level'] ?? 7.2;
    if (phLevel < 6.5 || phLevel > 8.5) {
      assets['ph_status'] = 'warning';
      assets['ph_desc'] = phLevel < 6.5 ? 'Acidic pH. Check lime feeder.' : 'Alkaline pH. Run acid neutralizing wash.';
    } else {
      assets['ph_status'] = 'normal';
      assets['ph_desc'] = 'pH levels normal.';
    }

    final num turbidity = assets['turbidity'] ?? 6.2;
    if (turbidity > 5.0) {
      assets['turbidity_status'] = 'warning';
      assets['turbidity_desc'] = 'Elevated turbidity. Check backwash filters.';
    } else {
      assets['turbidity_status'] = 'normal';
      assets['turbidity_desc'] = 'Turbidity levels normal.';
    }

    _saveToLocalCache();

    queueAction('/api/central-assets/update', assets);


    return assets;
  }

  List<Map<String, dynamic>> getMaintenanceLogs() {
    return _maintenanceLogs;
  }

  Future<Map<String, dynamic>> addMaintenanceLog(Map<String, dynamic> log) async {
    final logs = getMaintenanceLogs();
    final newLog = {
      'task_id': 'PENDING-${operationId()}',
      'date': DateTime.now().toUtc().toIso8601String(),
      ...log
    };
    await queueAction('/api/maintenance-logs/add', newLog);
    logs.insert(0, newLog);
    _saveToLocalCache();


    return newLog;
  }

  List<Map<String, dynamic>> getWorkers() {
    return _workers;
  }

  List<Map<String, dynamic>> getBillingRecords() {
    return _billingRecords;
  }

  List<Map<String, dynamic>> getBillingHistoryForHousehold(String houseId) {
    final records = getBillingRecords();
    final cleanHouse = houseId.toUpperCase().trim();
    final filtered = records.where((r) => (r['house_id'] ?? '').toString().toUpperCase().trim() == cleanHouse).toList();
    filtered.sort((a, b) {
      final dateA = a['date'] != null ? DateTime.tryParse(a['date'] as String) ?? DateTime(2026) : DateTime(2026);
      final dateB = b['date'] != null ? DateTime.tryParse(b['date'] as String) ?? DateTime(2026) : DateTime(2026);
      return dateB.compareTo(dateA);
    });
    return filtered;
  }

  bool hasBeenBilledThisMonth(String houseId, String monthYear) {
    final records = getBillingRecords();
    final cleanHouse = houseId.toUpperCase().trim();
    return records.any((r) => 
      (r['house_id'] ?? '').toString().toUpperCase().trim() == cleanHouse && 
      r['billing_month'].toString().toLowerCase() == monthYear.toLowerCase()
    );
  }

  Future<Map<String, dynamic>> addBillingRecord(Map<String, dynamic> record) async {
    final records = getBillingRecords();
    final newRecord = {
      'bill_id': 'PENDING-${operationId()}',
      'date': DateTime.now().toUtc().toIso8601String(),
      'status': 'Pending',
      ...record
    };
    await queueAction('/api/billing-records/add', newRecord);
    records.insert(0, newRecord);
    _saveToLocalCache();


    return newRecord;
  }
  
  Map<String, dynamic>? getLatestAnnouncement({String role = ''}) {
    if (_announcements.isEmpty) return null;
    if (role.isEmpty) return _announcements.first;

    for (final ann in _announcements) {
      final audience = (ann['target_audience'] as String?) ?? 'Everyone';
      if (role == 'resident') {
        if (audience == 'Everyone' || audience == 'Residents only') {
          return ann;
        }
      } else if (role == 'worker') {
        if (audience == 'Everyone' || audience == 'Workers only') {
          return ann;
        }
      } else {
        return ann;
      }
    }
    return null;
  }
  
  Future<void> addAnnouncement(String message, String author, {String targetAudience = 'Everyone'}) async {
    final record = {
      'message': message,
      'author': author,
      'target_audience': targetAudience,
      'timestamp': DateTime.now().toUtc().toIso8601String()
    };
    await queueAction('/api/announcements/add', record);
    _announcements.insert(0, record);
    _saveToLocalCache();

  }

  Future<Map<String, dynamic>> registerResident(String ownerName, String purok, String lot, String password) async {
    final response = await apiRequest('/api/households/add', method: 'POST', requestHeaders: {
      'Content-Type': 'application/json'},
      sendData: json.encode({'owner_name': ownerName, 'purok': purok, 'password': password}));
    await refreshData();
    return Map<String, dynamic>.from(json.decode(response.responseText!));
  }

  Future<Map<String, dynamic>> registerWorker(String name, String role, String zone, String password) async {
    final response = await apiRequest('/api/workers/add', method: 'POST', requestHeaders: {
      'Content-Type': 'application/json'},
      sendData: json.encode({'worker_id': 'EMP-${operationId().substring(0,12)}', 'name': name, 'role': 'Collector', 'zone': zone, 'password': password}));
    await refreshData();
    return Map<String, dynamic>.from(json.decode(response.responseText!));
  }

}

final db = Database();
