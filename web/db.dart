import 'dart:html';
import 'dart:convert';
import 'dart:math' as math;

const dbKeys = {
  'households': 'waterhall_households',
  'centralAssets': 'waterhall_central_assets',
  'maintenanceLogs': 'waterhall_maintenance_logs',
  'workers': 'waterhall_workers',
  'billingRecords': 'waterhall_billing_records'
};

final List<Map<String, dynamic>> seedBillingRecords = [
  {
    'bill_id': 'BILL-5001',
    'house_id': 'HH-101',
    'account_number': 'TAG-2026-0041',
    'billing_month': 'June 2026',
    'previous_reading': 15.8,
    'current_reading': 18.4,
    'consumption': 2.6,
    'water_charge': 120.00,
    'maintenance_fee': 50.00,
    'total_due': 170.00,
    'billed_by': 'EMP-304',
    'date': '2026-06-24T18:45:00Z',
    'status': 'Pending'
  },
  {
    'bill_id': 'BILL-5002',
    'house_id': 'HH-101',
    'account_number': 'TAG-2026-0041',
    'billing_month': 'May 2026',
    'previous_reading': 14.1,
    'current_reading': 15.8,
    'consumption': 1.7,
    'water_charge': 120.00,
    'maintenance_fee': 50.00,
    'total_due': 170.00,
    'billed_by': 'EMP-304',
    'date': '2026-05-24T10:15:00Z',
    'status': 'Paid'
  },
  {
    'bill_id': 'BILL-5003',
    'house_id': 'HH-102',
    'account_number': 'TAG-2026-0105',
    'billing_month': 'May 2026',
    'previous_reading': 11.5,
    'current_reading': 12.1,
    'consumption': 0.6,
    'water_charge': 120.00,
    'maintenance_fee': 50.00,
    'total_due': 170.00,
    'billed_by': 'EMP-304',
    'date': '2026-05-24T10:30:00Z',
    'status': 'Paid'
  }
];

final List<Map<String, dynamic>> seedWorkers = [
  { 'worker_id': 'EMP-301', 'name': 'Jose Rizal', 'role': 'Lead Field Tech', 'zone': 'Purok 1' },
  { 'worker_id': 'EMP-304', 'name': 'Juan Luna', 'role': 'Field Technician', 'zone': 'Purok 2' },
  { 'worker_id': 'EMP-308', 'name': 'Andres Bonifacio', 'role': 'Zone Inspector', 'zone': 'Purok 5' }
];

final List<Map<String, dynamic>> seedHouseholds = [
  {
    'house_id': 'HH-101',
    'owner_name': 'Maria C. Santos',
    'purok': 'Purok 1',
    'account_number': 'TAG-2026-0041',
    'current_leak_status': 'leak',
    'current_m3_usage': 18.4,
    'flow_rate': 0.85,
    'monthly_history': [12.4, 14.1, 15.8, 18.4],
    'leak_detected_at': '2026-06-24T18:30:00Z'
  },
  {
    'house_id': 'HH-102',
    'owner_name': 'Ramon P. Del Rosario',
    'purok': 'Purok 1',
    'account_number': 'TAG-2026-0105',
    'current_leak_status': 'normal',
    'current_m3_usage': 12.1,
    'flow_rate': 0.05,
    'monthly_history': [11.8, 12.0, 11.5, 12.1],
    'leak_detected_at': null
  },
  {
    'house_id': 'HH-103',
    'owner_name': 'Elena F. Garcia',
    'purok': 'Purok 2',
    'account_number': 'TAG-2026-0312',
    'current_leak_status': 'leak',
    'current_m3_usage': 24.8,
    'flow_rate': 0.98,
    'monthly_history': [15.2, 16.0, 19.5, 24.8],
    'leak_detected_at': '2026-06-25T02:15:00Z'
  },
  {
    'house_id': 'HH-104',
    'owner_name': 'Delfin S. Alcantara',
    'purok': 'Purok 2',
    'account_number': 'TAG-2026-0421',
    'current_leak_status': 'normal',
    'current_m3_usage': 9.3,
    'flow_rate': 0.02,
    'monthly_history': [8.5, 9.0, 9.1, 9.3],
    'leak_detected_at': null
  },
  {
    'house_id': 'HH-105',
    'owner_name': 'Clara M. Aquino',
    'purok': 'Purok 3',
    'account_number': 'TAG-2026-0810',
    'current_leak_status': 'normal',
    'current_m3_usage': 15.6,
    'flow_rate': 0.08,
    'monthly_history': [14.0, 15.2, 14.9, 15.6],
    'leak_detected_at': null
  },
  {
    'house_id': 'HH-106',
    'owner_name': 'Manuel L. Roxas',
    'purok': 'Purok 3',
    'account_number': 'TAG-2026-0925',
    'current_leak_status': 'normal',
    'current_m3_usage': 21.0,
    'flow_rate': 0.11,
    'monthly_history': [19.2, 20.1, 20.8, 21.0],
    'leak_detected_at': null
  },
  {
    'house_id': 'HH-107',
    'owner_name': 'Felipe A. Agoncillo',
    'purok': 'Purok 4',
    'account_number': 'TAG-2026-1102',
    'current_leak_status': 'leak',
    'current_m3_usage': 32.5,
    'flow_rate': 1.45,
    'monthly_history': [18.4, 21.0, 25.1, 32.5],
    'leak_detected_at': '2026-06-25T08:45:00Z'
  },
  {
    'house_id': 'HH-108',
    'owner_name': 'Gregoria de Jesus',
    'purok': 'Purok 4',
    'account_number': 'TAG-2026-1349',
    'current_leak_status': 'normal',
    'current_m3_usage': 14.2,
    'flow_rate': 0.04,
    'monthly_history': [13.1, 13.9, 14.0, 14.2],
    'leak_detected_at': null
  },
  {
    'house_id': 'HH-109',
    'owner_name': 'Antonio N. Luna',
    'purok': 'Purok 5',
    'account_number': 'TAG-2026-1509',
    'current_leak_status': 'normal',
    'current_m3_usage': 11.0,
    'flow_rate': 0.06,
    'monthly_history': [10.5, 10.9, 11.2, 11.0],
    'leak_detected_at': null
  },
  {
    'house_id': 'HH-110',
    'owner_name': 'Leonor Rivera',
    'purok': 'Purok 6',
    'account_number': 'TAG-2026-1772',
    'current_leak_status': 'normal',
    'current_m3_usage': 13.7,
    'flow_rate': 0.05,
    'monthly_history': [12.8, 13.2, 13.4, 13.7],
    'leak_detected_at': null
  }
];

final Map<String, dynamic> seedCentralAssets = {
  'main_tank_level': 68,
  'ph_level': 5.8,
  'ph_status': 'warning',
  'ph_desc': 'Acidic pH detected. Add neutralizing agent.',
  'turbidity': 6.2,
  'turbidity_status': 'warning',
  'turbidity_desc': 'Slightly high turbidity. Filter check recommended.',
  'last_updated': '2026-06-25T11:00:00Z'
};

final List<Map<String, dynamic>> seedMaintenanceLogs = [
  {
    'task_id': 'LOG-1001',
    'house_id': 'HH-102',
    'worker_id': 'EMP-304',
    'purok': 'Purok 1',
    'description': 'Replaced main brass pipe fitting. Leak resolved.',
    'date': '2026-06-23T09:30:00Z',
    'status_resolved': true
  },
  {
    'task_id': 'LOG-1002',
    'house_id': 'HH-104',
    'worker_id': 'EMP-304',
    'purok': 'Purok 2',
    'description': 'Inspected meter calibration. Flow rate verified normal.',
    'date': '2026-06-24T14:20:00Z',
    'status_resolved': true
  }
];

class Database {
  void init() {
    if (window.localStorage[dbKeys['households']!] == null) {
      window.localStorage[dbKeys['households']!] = json.encode(seedHouseholds);
    }
    if (window.localStorage[dbKeys['centralAssets']!] == null) {
      window.localStorage[dbKeys['centralAssets']!] = json.encode(seedCentralAssets);
    }
    if (window.localStorage[dbKeys['maintenanceLogs']!] == null) {
      window.localStorage[dbKeys['maintenanceLogs']!] = json.encode(seedMaintenanceLogs);
    }
    if (window.localStorage[dbKeys['workers']!] == null) {
      window.localStorage[dbKeys['workers']!] = json.encode(seedWorkers);
    }
    if (window.localStorage[dbKeys['billingRecords']!] == null) {
      window.localStorage[dbKeys['billingRecords']!] = json.encode(seedBillingRecords);
    }
  }

  List<Map<String, dynamic>> getHouseholds() {
    init();
    final data = window.localStorage[dbKeys['households']!];
    return List<Map<String, dynamic>>.from(json.decode(data!));
  }

  Map<String, dynamic>? getHousehold(String id) {
    final households = getHouseholds();
    try {
      return households.firstWhere((h) => h['house_id'] == id);
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
      window.localStorage[dbKeys['households']!] = json.encode(households);
      return households[index];
    }
    return null;
  }

  Map<String, dynamic> getCentralAssets() {
    init();
    final data = window.localStorage[dbKeys['centralAssets']!];
    return Map<String, dynamic>.from(json.decode(data!));
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

    window.localStorage[dbKeys['centralAssets']!] = json.encode(assets);
    return assets;
  }

  List<Map<String, dynamic>> getMaintenanceLogs() {
    init();
    final data = window.localStorage[dbKeys['maintenanceLogs']!];
    return List<Map<String, dynamic>>.from(json.decode(data!));
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
    window.localStorage[dbKeys['maintenanceLogs']!] = json.encode(logs);
    return newLog;
  }

  Map<String, dynamic>? validateWorker(String workerId, String zone) {
    init();
    final data = window.localStorage[dbKeys['workers']!];
    final List<Map<String, dynamic>> workers = List<Map<String, dynamic>>.from(json.decode(data!));
    try {
      final worker = workers.firstWhere((w) => w['worker_id'].toString().toLowerCase() == workerId.toLowerCase());
      return {
        ...worker,
        'selected_zone': zone
      };
    } catch (_) {
      return null;
    }
  }

  List<Map<String, dynamic>> getBillingRecords() {
    init();
    final data = window.localStorage[dbKeys['billingRecords']!];
    if (data == null) return [];
    return List<Map<String, dynamic>>.from(json.decode(data));
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
    window.localStorage[dbKeys['billingRecords']!] = json.encode(records);
    return newRecord;
  }
}

final db = Database();
