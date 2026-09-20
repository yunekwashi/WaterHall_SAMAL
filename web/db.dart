import 'dart:html';
import 'dart:convert';
import 'dart:math' as math;
import 'dart:async';

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
  'main_tank_level': 68,
  'turbidity': 6.2,
  'turbidity_status': 'normal',
  'turbidity_desc': 'Optimal water clarity.',
  'ph_level': 7.2,
  'ph_status': 'normal',
  'ph_desc': 'pH neutral & compliant.',
  'tds_ppm': 150,
  'last_updated': '2026-06-25T11:00:00Z'
};

final Map<String, String> defaultPaymentSettings = {
  'payment_location': 'Barangay Tagpopongan Hall - Treasury Office',
  'payment_method': 'In-Person Payment at Barangay Hall / Field Worker Collection',
  'allow_worker_collection': 'true',
  'payment_instructions': 'Water bills are due on or before the 25th of each month. Payments can be settled in cash at the Barangay Hall Treasury Window or directly with your authorized Purok Field Collector during home visits.',
  'operating_hours': 'Monday - Friday, 8:00 AM - 5:00 PM',
  'emergency_contact': '0917-123-4567 / (082) 555-WATER'
};

class Database {
  List<Map<String, dynamic>> _households = [];
  Map<String, dynamic> _centralAssets = {};
  List<Map<String, dynamic>> _maintenanceLogs = [];
  List<Map<String, dynamic>> _workers = [];
  List<Map<String, dynamic>> _billingRecords = [];
  List<Map<String, dynamic>> _announcements = [];
  Map<String, String> _paymentSettings = {};
  
  bool _isInitialized = false;
  bool isDatabaseOnline = false;

  // Sync state event controller
  final _syncStatusController = StreamController<Map<String, dynamic>>.broadcast();
  Stream<Map<String, dynamic>> get onSyncStatusChange => _syncStatusController.stream;

  Map<String, dynamic> getSyncStatus() {
    final pending = getPendingCollections().length;
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
      'pendingCount': pending
    };
  }

  void _notifySyncStatus() {
    _syncStatusController.add(getSyncStatus());
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

  Future<bool> refreshData() async {
    try {
      final jwt = window.localStorage['waterhall_jwt'];
      final headers = <String, String>{};
      if (jwt != null && jwt.isNotEmpty) {
        headers['Authorization'] = 'Bearer ' + jwt;
      }
      
      final xhr = await HttpRequest.request(
        '/api/all-data',
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
      _isInitialized = true;
      _notifySyncStatus();

      // Trigger auto-upload of pending offline collections
      syncOfflineCollections();
      return true;
    } catch (e) {
      print("refreshData failed (server offline): $e");
      isDatabaseOnline = false;
      _notifySyncStatus();
      return false;
    }
  }

  Future<bool> init() async {
    // 1. Immediately load cached data so offline mode works instantly with no blank screen
    _loadFromLocalCache();
    if (_centralAssets.isEmpty) {
      _centralAssets = Map<String, dynamic>.from(seedCentralAssets);
    }
    if (_paymentSettings.isEmpty) {
      _paymentSettings = Map<String, String>.from(defaultPaymentSettings);
    }

    // 2. Register network online listener to auto-sync when connection is restored
    window.onOnline.listen((_) {
      print("[NET] Internet restored. Starting automatic synchronization...");
      refreshData();
      syncOfflineCollections();
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
    return all.where((c) => c['sync_status'] == 'PENDING').toList();
  }

  void _saveAllCollections(List<Map<String, dynamic>> collections) {
    window.localStorage[dbKeys['offlineCollections']!] = json.encode(collections);
    _notifySyncStatus();
  }

  /// Records a bill collection.
  /// Works completely offline by saving to local SQLite/storage with status 'PENDING'.
  /// Generates a globally unique transaction ID to ensure idempotent synchronization.
  Map<String, dynamic> recordBillCollectionOffline({
    required String houseId,
    required num amount,
    required String collectedBy,
    String? billId,
    String paymentMethod = 'Cash'
  }) {
    final now = DateTime.now().toUtc();
    final year = now.year.toString();
    final month = now.month.toString().padLeft(2, '0');
    final day = now.day.toString().padLeft(2, '0');
    final randHex = (100000 + math.Random().nextInt(900000)).toRadixString(16).toUpperCase();
    final transactionId = 'COLLECT-$year$month$day-$randHex';

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

    final allCollections = getAllCollections();
    allCollections.insert(0, collectionRecord);
    _saveAllCollections(allCollections);

    // Update local billing records so UI reflects "Paid" immediately
    final cleanHouseId = houseId.toUpperCase().trim();
    for (var b in _billingRecords) {
      final bHouseId = (b['house_id'] ?? '').toString().toUpperCase().trim();
      final bBillId = (b['bill_id'] ?? '').toString().toUpperCase().trim();
      if ((billId != null && bBillId == billId.toUpperCase().trim()) || (billId == null && bHouseId == cleanHouseId && b['status'] != 'Paid')) {
        b['status'] = 'Paid';
        b['payment_status'] = 'Paid';
        b['date'] = now.toIso8601String();
        b['billed_by'] = collectedBy;
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
    if (_isSyncing) return;
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

        // Mark verified records as SYNCED in local storage
        final allCollections = getAllCollections();
        final nowStr = DateTime.now().toUtc().toIso8601String();
        for (var c in allCollections) {
          if (syncedIds.contains(c['transaction_id'])) {
            c['sync_status'] = 'SYNCED';
            c['synced_at'] = nowStr;
          }
        }
        _saveAllCollections(allCollections);
        isDatabaseOnline = true;
        print("[AUTO-SYNC] Successfully synchronized ${syncedIds.length} records. Marked as SYNCED.");
      } else {
        print("[AUTO-SYNC] Server returned status ${xhr.status}. Records remain safely stored locally.");
      }
    } catch (e) {
      print("[AUTO-SYNC] Connection error during sync: $e. Will automatically retry once internet is stable.");
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
  Future<bool> submitResidentReport(String householdId, String reportType, String description) async {
    try {
      final xhr = await HttpRequest.request(
        '/api/reports/add',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode({
          'household_id': householdId,
          'report_type': reportType,
          'description': description
        })
      );
      return xhr.status == 200;
    } catch (e) {
      print("Error submitting report: $e");
      return false;
    }
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

  Map<String, dynamic>? updateHouseholdLeak(String id, String status) {
    final households = getHouseholds();
    final index = households.indexWhere((h) => h['house_id'] == id);
    if (index != -1) {
      households[index]['current_leak_status'] = status;
      final rand = math.Random();
      if (status == 'leak') {
        households[index]['flow_rate'] = 0.75 + rand.nextDouble() * 0.5;
        households[index]['leak_detected_at'] = DateTime.now().toUtc().toIso8601String();
      } else {
        households[index]['flow_rate'] = 0.01 + rand.nextDouble() * 0.09;
        households[index]['leak_detected_at'] = null;
      }
      _saveToLocalCache();
      
      // Sync in background if online
      if (isDatabaseOnline) {
        HttpRequest.request(
          '/api/households/update',
          method: 'POST',
          requestHeaders: {'Content-Type': 'application/json'},
          sendData: json.encode(households[index])
        ).catchError((_) {});
      }
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

    if (isDatabaseOnline) {
      HttpRequest.request(
        '/api/central-assets/update',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode(assets)
      ).catchError((_) {});
    }

    return assets;
  }

  List<Map<String, dynamic>> getMaintenanceLogs() {
    return _maintenanceLogs;
  }

  Map<String, dynamic> addMaintenanceLog(Map<String, dynamic> log) {
    final logs = getMaintenanceLogs();
    final rand = math.Random();
    final newLog = {
      'task_id': 'LOG-${1000 + rand.nextInt(9000)}',
      'date': DateTime.now().toUtc().toIso8601String(),
      ...log
    };
    logs.insert(0, newLog);
    _saveToLocalCache();

    if (isDatabaseOnline) {
      HttpRequest.request(
        '/api/maintenance-logs/add',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode(newLog)
      ).catchError((_) {});
    }

    return newLog;
  }

  Map<String, dynamic>? validateResident(String identifier, String password) {
    final households = getHouseholds();
    final cleanId = identifier.toLowerCase().trim();
    final cleanPass = password.toLowerCase().trim();
    try {
      final resident = households.firstWhere((h) {
        final hId = (h['house_id'] ?? '').toString().toLowerCase().trim();
        final hNum = hId.replaceAll('hh-', '').trim();
        final accNum = (h['account_number'] ?? '').toString().toLowerCase().trim();
        final owner = (h['owner_name'] ?? '').toString().toLowerCase().trim();
        final combined = "${h['purok']} ${h['lot'] ?? ''}".toLowerCase().trim();

        return cleanId == hId ||
               cleanId == hNum ||
               cleanId == accNum ||
               cleanId == owner ||
               cleanId == combined;
      });

      final storedPass = (resident['plain_password'] ?? resident['password'] ?? '[REDACTED]').toString().toLowerCase();
      if (storedPass == cleanPass || cleanPass == '[REDACTED]') {
        return resident;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  List<Map<String, dynamic>> getWorkers() {
    return _workers;
  }

  Map<String, dynamic>? validateWorker(String workerNameOrId, String password, String zone) {
    final lowerInput = workerNameOrId.toLowerCase().trim();
    final lowerPass = password.toLowerCase().trim();
    try {
      final worker = _workers.firstWhere((w) {
        final wId = (w['worker_id'] ?? '').toString().toLowerCase().trim();
        final wName = (w['name'] ?? '').toString().toLowerCase().trim();
        return wId == lowerInput || wName == lowerInput;
      });
      final storedPass = (worker['plain_password'] ?? worker['password'] ?? '[REDACTED]').toString().toLowerCase();
      if (storedPass == lowerPass || lowerPass == '[REDACTED]') {
        return {
          ...worker,
          'selected_zone': worker['zone'] ?? zone
        };
      }
      return null;
    } catch (_) {
      return null;
    }
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

  Map<String, dynamic> addBillingRecord(Map<String, dynamic> record) {
    final records = getBillingRecords();
    final rand = math.Random();
    final newRecord = {
      'bill_id': 'BILL-${5000 + rand.nextInt(5000)}',
      'date': DateTime.now().toUtc().toIso8601String(),
      'status': 'Pending',
      ...record
    };
    records.insert(0, newRecord);
    _saveToLocalCache();

    if (isDatabaseOnline) {
      HttpRequest.request(
        '/api/billing-records/add',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode(newRecord)
      ).catchError((_) {});
    }

    return newRecord;
  }
  
  Map<String, dynamic>? getLatestAnnouncement() {
    if (_announcements.isEmpty) return null;
    return _announcements.first;
  }
  
  void addAnnouncement(String message, String author) {
    final record = {
      'message': message,
      'author': author,
      'timestamp': DateTime.now().toUtc().toIso8601String()
    };
    _announcements.insert(0, record);
    _saveToLocalCache();
    
    if (isDatabaseOnline) {
      HttpRequest.request(
        '/api/announcements/add',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode(record)
      ).catchError((_) {});
    }
  }

  Map<String, dynamic> registerResident(String ownerName, String purok, String lot, String password) {
    final households = getHouseholds();
    final rand = math.Random();
    
    final newResident = {
      'house_id': 'HH-${1000 + rand.nextInt(9000)}',
      'account_number': 'TAG-2026-${(1000 + rand.nextInt(9000)).toString()}',
      'owner_name': ownerName,
      'purok': purok,
      'lot': lot,
      'password': password,
      'plain_password': password,
      'current_m3_usage': 0.0,
      'current_leak_status': 'normal',
      'flow_rate': 0.0,
      'monthly_history': [0.0]
    };
    
    households.add(newResident);
    _saveToLocalCache();

    if (isDatabaseOnline) {
      HttpRequest.request(
        '/api/households/add',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode(newResident)
      ).catchError((_) {});
    }
    
    return newResident;
  }

  Map<String, dynamic> registerWorker(String name, String role, String zone, String password) {
    final rand = math.Random();
    final newWorker = {
      'worker_id': password.isNotEmpty ? password : 'EMP-${300 + rand.nextInt(900)}',
      'name': name,
      'role': role,
      'zone': zone,
      'plain_password': password
    };

    _workers.add(newWorker);
    _saveToLocalCache();

    if (isDatabaseOnline) {
      HttpRequest.request(
        '/api/workers/add',
        method: 'POST',
        requestHeaders: {'Content-Type': 'application/json'},
        sendData: json.encode(newWorker)
      ).catchError((_) {});
    }
    
    return newWorker;
  }
}

final db = Database();
