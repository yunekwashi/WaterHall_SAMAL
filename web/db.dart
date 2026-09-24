import 'dart:html';
import 'dart:convert';
import 'dart:async';
import 'offline_store.dart';

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
      'isSyncing': _isSyncing,
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
    final id = body['operation_id'] ?? operationId();
    body['operation_id'] = id;
    await mutateQueue('actions', (rows) => rows.add({'operation_id': id, 'owner': currentAccount(), 'endpoint': endpoint, 'body': body}));
    _notifySyncStatus();
    if (isDatabaseOnline) await syncActions();
  }

  bool _syncingActions = false;
  Future<void> syncActions() async {
    if (_syncingActions || !hasUsableSession()) return;
    _syncingActions = true;
    try {
      for (final action in pendingActions().take(100)) {
        final xhr = await HttpRequest.request(action['endpoint'] as String, method: 'POST',
          requestHeaders: {'Content-Type': 'application/json', 'Authorization': 'Bearer ${window.localStorage['waterhall_jwt']}'},
          sendData: json.encode(action['body']));
        final response = json.decode(xhr.responseText ?? '{}');
        if (xhr.status != 200 || response['status'] != 'success') break;
        await mutateQueue('actions', (rows) => rows.removeWhere((r) => r['operation_id'] == action['operation_id']));
        lastSyncError = null;
      }
    } catch (_) {
      lastSyncError = 'Pending operations need a connection, renewed login, or conflict resolution.';
    } finally { _syncingActions = false; _notifySyncStatus(); }
  }

  void clearPrivateCache() {
    for (final entry in dbKeys.entries) {
      if (entry.key != 'offlineCollections' && entry.key != 'unsyncedActions') window.localStorage.remove(entry.value);
    }
    _households = []; _workers = []; _billingRecords = []; _maintenanceLogs = []; _announcements = [];
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
    if (_refreshing || !hasUsableSession()) return false;
    _refreshing = true;
    try {
      final jwt = window.localStorage['waterhall_jwt'];
      final headers = <String, String>{};
      if (jwt != null && jwt.isNotEmpty) {
        headers['Authorization'] = 'Bearer ' + jwt;
      }
      
      final url = role.isNotEmpty ? '/api/all-data?role=$role' : '/api/all-data';
      final xhr = await HttpRequest.request(
        url,
        method: 'GET',
        requestHeaders: headers
      );
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
      syncOfflineCollections();
      return true;
    } catch (e) {
      print("refreshData failed (server offline): $e");
      isDatabaseOnline = false;
      _notifySyncStatus();
      return false;
    } finally { _refreshing = false; }
  }

  Future<bool> init() async {
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
    return all.where((c) => c['sync_status'] == 'PENDING' && c['collected_by'] == currentAccount()).take(100).toList();
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
    if (_isSyncing || !hasUsableSession()) return;
    final pending = getPendingCollections();
    if (pending.isEmpty) {
      _notifySyncStatus();
      return;
    }

    _isSyncing = true;
    _notifySyncStatus();
    print("[AUTO-SYNC] Found ${pending.length} pending collections. Initiating idempotent upload to Vercel API...");

    try {
      final jwt = window.localStorage['waterhall_jwt'];
      final headers = <String, String>{
        'Content-Type': 'application/json'
      };
      if (jwt != null && jwt.isNotEmpty) {
        headers['Authorization'] = 'Bearer ' + jwt;
      }

      final payload = {
        'collections': pending
      };

      final xhr = await HttpRequest.request(
        '/api/collections/sync',
        method: 'POST',
        requestHeaders: headers,
        sendData: json.encode(payload)
      );

      if (xhr.status == 200) {
        final res = json.decode(xhr.responseText!) as Map<String, dynamic>;
        final syncedIds = List<String>.from(res['synced_ids'] ?? []);

        lastSyncError = null;
        // Mark verified records as SYNCED in local storage
        final nowStr = DateTime.now().toUtc().toIso8601String();
        await mutateQueue('collections', (allCollections) {
        for (var c in allCollections) {
          if (syncedIds.contains(c['transaction_id'])) {
            c['sync_status'] = 'SYNCED';
            c['synced_at'] = nowStr;
          }
        }
        });
        isDatabaseOnline = true;
        print("[AUTO-SYNC] Successfully synchronized ${syncedIds.length} records. Marked as SYNCED.");
      } else {
        print("[AUTO-SYNC] Server returned status ${xhr.status}. Records remain safely stored locally.");
      }
    } catch (e) {
      lastSyncError = "Sync not confirmed. Pending records are retained; sign in again or resolve bill conflicts.";
    } finally {
      _isSyncing = false;
      _notifySyncStatus();
    }
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
      final jwt = window.localStorage['waterhall_jwt'];
      final headers = <String, String>{'Content-Type': 'application/json'};
      if (jwt != null && jwt.isNotEmpty) {
        headers['Authorization'] = 'Bearer ' + jwt;
      }

      final xhr = await HttpRequest.request(
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
    final response = await HttpRequest.request('/api/households/add', method: 'POST', requestHeaders: {
      'Content-Type': 'application/json', 'Authorization': 'Bearer ${window.localStorage['waterhall_jwt']}'},
      sendData: json.encode({'owner_name': ownerName, 'purok': purok, 'password': password}));
    await refreshData();
    return Map<String, dynamic>.from(json.decode(response.responseText!));
  }

  Future<Map<String, dynamic>> registerWorker(String name, String role, String zone, String password) async {
    final response = await HttpRequest.request('/api/workers/add', method: 'POST', requestHeaders: {
      'Content-Type': 'application/json', 'Authorization': 'Bearer ${window.localStorage['waterhall_jwt']}'},
      sendData: json.encode({'worker_id': 'EMP-${operationId().substring(0,12)}', 'name': name, 'role': 'Collector', 'zone': zone, 'password': password}));
    await refreshData();
    return Map<String, dynamic>.from(json.decode(response.responseText!));
  }

}

final db = Database();
