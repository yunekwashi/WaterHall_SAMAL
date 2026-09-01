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
  'announcements': 'waterhall_announcements'
};

final List<Map<String, dynamic>> seedBillingRecords = [];
final List<Map<String, dynamic>> seedWorkers = [];
final List<Map<String, dynamic>> seedHouseholds = [];

final Map<String, dynamic> seedCentralAssets = {
  'main_tank_level': 68,
  'turbidity': 6.2,
  'turbidity_status': 'normal',
  'turbidity_desc': 'Optimal water clarity.',
  'ph_level': 7.2,
  'ph_status': 'normal',
  'ph_desc': 'pH neutral & compliant.',
  'last_updated': '2026-06-25T11:00:00Z'
};

final List<Map<String, dynamic>> seedMaintenanceLogs = [];

class Database {
  List<Map<String, dynamic>> _households = [];
  Map<String, dynamic> _centralAssets = {};
  List<Map<String, dynamic>> _maintenanceLogs = [];
  List<Map<String, dynamic>> _workers = [];
  List<Map<String, dynamic>> _billingRecords = [];
  List<Map<String, dynamic>> _announcements = [];
  bool _isInitialized = false;
  bool isDatabaseOnline = false;

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
      // Dart HttpRequest.request throws on non-2xx, so reaching here means success
      final data = json.decode(xhr.responseText!) as Map<String, dynamic>;
      
      _households = List<Map<String, dynamic>>.from(data['households']);
      _centralAssets = Map<String, dynamic>.from(data['centralAssets']);
      _maintenanceLogs = List<Map<String, dynamic>>.from(data['maintenanceLogs']);
      _workers = List<Map<String, dynamic>>.from(data['workers']);
      _billingRecords = List<Map<String, dynamic>>.from(data['billingRecords']);
      if (data.containsKey('announcements')) {
        _announcements = List<Map<String, dynamic>>.from(data['announcements']);
      }
      
      isDatabaseOnline = true;
      _isInitialized = true;
      syncUnsyncedData();
      return true;
    } catch (e) {
      print("refreshData failed: $e");
      isDatabaseOnline = false;
      return false;
    }
  }

  Future<bool> init() async {
    // Register network online listener to auto-sync when connection is restored
    window.onOnline.listen((_) {
      syncUnsyncedData();
    });

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
      // Success — server is online
      final data = json.decode(xhr.responseText!) as Map<String, dynamic>;
      
      _households = List<Map<String, dynamic>>.from(data['households']);
      _centralAssets = Map<String, dynamic>.from(data['centralAssets']);
      _maintenanceLogs = List<Map<String, dynamic>>.from(data['maintenanceLogs']);
      _workers = List<Map<String, dynamic>>.from(data['workers']);
      _billingRecords = List<Map<String, dynamic>>.from(data['billingRecords']);
      if (data.containsKey('announcements')) {
        _announcements = List<Map<String, dynamic>>.from(data['announcements']);
      }

      _isInitialized = true;
      isDatabaseOnline = true;
      print("Database initialized successfully from server.");
      syncUnsyncedData();
      return true;
    } catch (e) {
      print("Database init failed (server offline): $e");
      // Load minimal fallback so UI doesn't crash when rendering empty assets
      if (_centralAssets.isEmpty) {
        _centralAssets = Map<String, dynamic>.from(seedCentralAssets);
      }
      _isInitialized = true; // Mark initialized so the app doesn't hang
      isDatabaseOnline = false;
      return false;
    }
  }

  // --- Offline Action Queue Logic ---
  
  List<Map<String, dynamic>> _getUnsyncedActions() {
    final raw = window.localStorage['waterhall_unsynced_actions'];
    if (raw == null) return [];
    try {
      final decoded = json.decode(raw) as List;
      return decoded.map((item) => Map<String, dynamic>.from(item)).toList();
    } catch (_) {
      return [];
    }
  }

  void _saveUnsyncedActions(List<Map<String, dynamic>> actions) {
    window.localStorage['waterhall_unsynced_actions'] = json.encode(actions);
  }

  void _syncWithServer(String path, Map<String, dynamic> data) {
    final actions = _getUnsyncedActions();
    actions.add({'path': path, 'data': data});
    _saveUnsyncedActions(actions);
    
    // Attempt to upload immediately in the background
    syncUnsyncedData();
  }

  bool _isSyncing = false;
  Future<void> syncUnsyncedData() async {
    if (_isSyncing) return;
    _isSyncing = true;
    
    final actions = _getUnsyncedActions();
    if (actions.isEmpty) {
      _isSyncing = false;
      return;
    }
    
    print("Found ${actions.length} unsynced offline operations. Starting auto-upload...");
    final remainingActions = List<Map<String, dynamic>>.from(actions);
    
    for (final action in actions) {
      final String path = action['path'] as String;
      final Map<String, dynamic> data = Map<String, dynamic>.from(action['data']);
      
      try {
        final xhr = await HttpRequest.request(
          path,
          method: 'POST',
          sendData: json.encode(data),
          requestHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (window.localStorage['waterhall_jwt'] ?? '')
          }
        );
        if (xhr.status == 200) {
          remainingActions.remove(action);
          print("Successfully uploaded offline record for $path");
        } else {
          print("Sync failed for $path with status: ${xhr.status}. Postponing sync.");
          break; // Stop loop, keep in queue
        }
      } catch (e) {
        print("Network error sync for $path: $e. Node remains offline.");
        break; // Stop loop, keep in queue (e.g. still offline)
      }
    }
    
    _saveUnsyncedActions(remainingActions);
    _isSyncing = false;
  }

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
      _syncWithServer('/api/households/update', households[index]);
      return households[index];
    }
    return null;
  }

  Map<String, dynamic> getCentralAssets() {
    return _centralAssets;
  }

  Map<String, dynamic> updateCentralAssets(Map<String, dynamic> updates) {
    final assets = getCentralAssets();
    // Merge updates
    updates.forEach((key, value) {
      assets[key] = value;
    });
    assets['last_updated'] = DateTime.now().toUtc().toIso8601String();

    final num phLevel = assets['ph_level'];
    if (phLevel < 6.5 || phLevel > 8.5) {
      assets['ph_status'] = 'warning';
      assets['ph_desc'] = phLevel < 6.5 ? 'Acidic pH. Check lime feeder.' : 'Alkaline pH. Run acid neutralizing wash.';
    } else {
      assets['ph_status'] = 'normal';
      assets['ph_desc'] = 'pH levels normal.';
    }

    final num turbidity = assets['turbidity'];
    if (turbidity > 5.0) {
      assets['turbidity_status'] = 'warning';
      assets['turbidity_desc'] = 'Elevated turbidity. Check backwash filters.';
    } else {
      assets['turbidity_status'] = 'normal';
      assets['turbidity_desc'] = 'Turbidity levels normal.';
    }

    _syncWithServer('/api/central-assets/update', assets);
    window.localStorage[dbKeys['centralAssets']!] = json.encode(assets);
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
    _syncWithServer('/api/maintenance-logs/add', newLog);
    window.localStorage[dbKeys['maintenanceLogs']!] = json.encode(logs);
    return newLog;
  }

  Map<String, dynamic>? validateResident(String identifier, String password) {
    if (!isDatabaseOnline) return null;
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

      if (resident['password'] != null && resident['password'].toString().toLowerCase() == cleanPass) {
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
    if (!isDatabaseOnline) return null;
    final lowerInput = workerNameOrId.toLowerCase().trim();
    try {
      final worker = _workers.firstWhere((w) {
        final wId = (w['worker_id'] ?? '').toString().toLowerCase().trim();
        final wName = (w['name'] ?? '').toString().toLowerCase().trim();
        return wId == lowerInput || wName == lowerInput;
      });
      return {
        ...worker,
        'selected_zone': worker['zone'] ?? 'Purok 1'
      };
    } catch (_) {
      return null;
    }
  }

  List<Map<String, dynamic>> getBillingRecords() {
    return _billingRecords;
  }

  List<Map<String, dynamic>> getBillingHistoryForHousehold(String houseId) {
    final records = getBillingRecords();
    final filtered = records.where((r) => r['house_id'] == houseId).toList();
    filtered.sort((a, b) => DateTime.parse(b['date'] as String).compareTo(DateTime.parse(a['date'] as String)));
    return filtered;
  }

  bool hasBeenBilledThisMonth(String houseId, String monthYear) {
    final records = getBillingRecords();
    return records.any((r) => r['house_id'] == houseId && r['billing_month'].toString().toLowerCase() == monthYear.toLowerCase());
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
    _syncWithServer('/api/billing-records/add', newRecord);
    window.localStorage[dbKeys['billingRecords']!] = json.encode(records);
    return newRecord;
  }
  
  // --- Announcements ---
  
  Map<String, dynamic>? getLatestAnnouncement() {
    if (_announcements.isEmpty) return null;
    // Assuming the newest is first or last, we can sort or just take first
    return _announcements.first;
  }
  
  void addAnnouncement(String message, String author) {
    final record = {
      'message': message,
      'author': author,
      'timestamp': DateTime.now().toUtc().toIso8601String()
    };
    _announcements.insert(0, record);
    window.localStorage[dbKeys['announcements']!] = json.encode(_announcements);
    
    _syncWithServer('/api/announcements/add', record);
  }

  // --- Registration ---

  Map<String, dynamic> registerResident(String ownerName, String purok, String lot, String password) {
    final households = getHouseholds();
    final rand = math.Random();
    
    // Check if purok/lot combo already exists
    if (households.any((h) => h['purok'] == purok && h['lot'] == lot)) {
      throw Exception("Lot $lot in $purok is already registered.");
    }
    
    final newResident = {
      'house_id': 'HH-${1000 + rand.nextInt(9000)}',
      'account_number': 'TAG-2026-${(1000 + rand.nextInt(9000)).toString()}',
      'owner_name': ownerName,
      'purok': purok,
      'lot': lot,
      'password': password,
      'monthly_consumption_m3': 0.0,
      'status': 'Normal',
      'total_due': 0.0
    };
    
    households.add(newResident);
    _syncWithServer('/api/households/add', newResident);
    window.localStorage[dbKeys['households']!] = json.encode(households);
    
    return newResident;
  }

  Map<String, dynamic> registerWorker(String name, String role, String zone, String password) {
    final rand = math.Random();
    final newWorker = {
      'worker_id': 'EMP-${300 + rand.nextInt(900)}', // Password also serves as worker_id theoretically, but user said "password same as at the worker it can register it self". Wait, the prompt says "password same as at the worker". Usually the worker password IS their worker_id! Let's just use the password as their worker_id!
      'name': name,
      'role': role,
      'zone': zone
    };
    
    // In our logic, the worker password IS their worker_id. So let's ensure worker_id = password.
    newWorker['worker_id'] = password.isNotEmpty ? password : 'EMP-${300 + rand.nextInt(900)}';

    _workers.add(newWorker);
    _syncWithServer('/api/workers/add', newWorker);
    window.localStorage[dbKeys['workers']!] = json.encode(_workers);
    
    return newWorker;
  }
}

final db = Database();
