// Mock Firestore Database Client using localStorage
// Optimized for field workers tracking meters, leaks, assets, and logs in Barangay Tagpopongan.

const DB_KEYS = {
  HOUSEHOLDS: 'waterhall_households',
  CENTRAL_ASSETS: 'waterhall_central_assets',
  MAINTENANCE_LOGS: 'waterhall_maintenance_logs',
  WORKERS: 'waterhall_workers',
  BILLING_RECORDS: 'waterhall_billing_records'
};

// Seed Data
const SEED_BILLING_RECORDS = [
  {
    bill_id: 'BILL-5001',
    house_id: 'HH-101',
    account_number: 'TAG-2026-0041',
    billing_month: 'June 2026',
    previous_reading: 15.8,
    current_reading: 18.4,
    consumption: 2.6,
    water_charge: 120.00,
    maintenance_fee: 50.00,
    total_due: 170.00,
    billed_by: 'EMP-304',
    date: '2026-06-24T18:45:00Z',
    status: 'Pending'
  },
  {
    bill_id: 'BILL-5002',
    house_id: 'HH-101',
    account_number: 'TAG-2026-0041',
    billing_month: 'May 2026',
    previous_reading: 14.1,
    current_reading: 15.8,
    consumption: 1.7,
    water_charge: 120.00,
    maintenance_fee: 50.00,
    total_due: 170.00,
    billed_by: 'EMP-304',
    date: '2026-05-24T10:15:00Z',
    status: 'Paid'
  },
  {
    bill_id: 'BILL-5003',
    house_id: 'HH-102',
    account_number: 'TAG-2026-0105',
    billing_month: 'May 2026',
    previous_reading: 11.5,
    current_reading: 12.1,
    consumption: 0.6,
    water_charge: 120.00,
    maintenance_fee: 50.00,
    total_due: 170.00,
    billed_by: 'EMP-304',
    date: '2026-05-24T10:30:00Z',
    status: 'Paid'
  }
];

const SEED_WORKERS = [
  { worker_id: 'EMP-301', name: 'Jose Rizal', role: 'Lead Field Tech', zone: 'Purok 1' },
  { worker_id: 'EMP-304', name: 'Juan Luna', role: 'Field Technician', zone: 'Purok 2' },
  { worker_id: 'EMP-308', name: 'Andres Bonifacio', role: 'Zone Inspector', zone: 'Purok 5' }
];

const SEED_HOUSEHOLDS = [
  {
    house_id: 'HH-101',
    owner_name: 'Maria C. Santos',
    purok: 'Purok 1',
    account_number: 'TAG-2026-0041',
    current_leak_status: 'leak', // 1st Leak
    current_m3_usage: 18.4,
    flow_rate: 0.85, // High constant flow
    monthly_history: [12.4, 14.1, 15.8, 18.4],
    leak_detected_at: '2026-06-24T18:30:00Z'
  },
  {
    house_id: 'HH-102',
    owner_name: 'Ramon P. Del Rosario',
    purok: 'Purok 1',
    account_number: 'TAG-2026-0105',
    current_leak_status: 'normal',
    current_m3_usage: 12.1,
    flow_rate: 0.05,
    monthly_history: [11.8, 12.0, 11.5, 12.1],
    leak_detected_at: null
  },
  {
    house_id: 'HH-103',
    owner_name: 'Elena F. Garcia',
    purok: 'Purok 2',
    account_number: 'TAG-2026-0312',
    current_leak_status: 'leak', // 2nd Leak
    current_m3_usage: 24.8,
    flow_rate: 0.98, // High constant flow
    monthly_history: [15.2, 16.0, 19.5, 24.8],
    leak_detected_at: '2026-06-25T02:15:00Z'
  },
  {
    house_id: 'HH-104',
    owner_name: 'Delfin S. Alcantara',
    purok: 'Purok 2',
    account_number: 'TAG-2026-0421',
    current_leak_status: 'normal',
    current_m3_usage: 9.3,
    flow_rate: 0.02,
    monthly_history: [8.5, 9.0, 9.1, 9.3],
    leak_detected_at: null
  },
  {
    house_id: 'HH-105',
    owner_name: 'Clara M. Aquino',
    purok: 'Purok 3',
    account_number: 'TAG-2026-0810',
    current_leak_status: 'normal',
    current_m3_usage: 15.6,
    flow_rate: 0.08,
    monthly_history: [14.0, 15.2, 14.9, 15.6],
    leak_detected_at: null
  },
  {
    house_id: 'HH-106',
    owner_name: 'Manuel L. Roxas',
    purok: 'Purok 3',
    account_number: 'TAG-2026-0925',
    current_leak_status: 'normal',
    current_m3_usage: 21.0,
    flow_rate: 0.11,
    monthly_history: [19.2, 20.1, 20.8, 21.0],
    leak_detected_at: null
  },
  {
    house_id: 'HH-107',
    owner_name: 'Felipe A. Agoncillo',
    purok: 'Purok 4',
    account_number: 'TAG-2026-1102',
    current_leak_status: 'leak', // 3rd Leak
    current_m3_usage: 32.5,
    flow_rate: 1.45, // High constant flow
    monthly_history: [18.4, 21.0, 25.1, 32.5],
    leak_detected_at: '2026-06-25T08:45:00Z'
  },
  {
    house_id: 'HH-108',
    owner_name: 'Gregoria de Jesus',
    purok: 'Purok 4',
    account_number: 'TAG-2026-1349',
    current_leak_status: 'normal',
    current_m3_usage: 14.2,
    flow_rate: 0.04,
    monthly_history: [13.1, 13.9, 14.0, 14.2],
    leak_detected_at: null
  },
  {
    house_id: 'HH-109',
    owner_name: 'Antonio N. Luna',
    purok: 'Purok 5',
    account_number: 'TAG-2026-1509',
    current_leak_status: 'normal',
    current_m3_usage: 11.0,
    flow_rate: 0.06,
    monthly_history: [10.5, 10.9, 11.2, 11.0],
    leak_detected_at: null
  },
  {
    house_id: 'HH-110',
    owner_name: 'Leonor Rivera',
    purok: 'Purok 6',
    account_number: 'TAG-2026-1772',
    current_leak_status: 'normal',
    current_m3_usage: 13.7,
    flow_rate: 0.05,
    monthly_history: [12.8, 13.2, 13.4, 13.7],
    leak_detected_at: null
  }
];

const SEED_CENTRAL_ASSETS = {
  main_tank_level: 68, // Reservoir level (0-100)
  ph_level: 5.8, // Abnormal (Warning, standard is 6.5 - 8.5)
  ph_status: 'warning',
  ph_desc: 'Acidic pH detected. Add neutralizing agent.',
  turbidity: 6.2, // Abnormal (Warning, standard is < 5.0 NTU)
  turbidity_status: 'warning',
  turbidity_desc: 'Slightly high turbidity. Filter check recommended.',
  last_updated: '2026-06-25T11:00:00Z'
};

const SEED_MAINTENANCE_LOGS = [
  {
    task_id: 'LOG-1001',
    house_id: 'HH-102',
    worker_id: 'EMP-304',
    purok: 'Purok 1',
    description: 'Replaced main brass pipe fitting. Leak resolved.',
    date: '2026-06-23T09:30:00Z',
    status_resolved: true
  },
  {
    task_id: 'LOG-1002',
    house_id: 'HH-104',
    worker_id: 'EMP-304',
    purok: 'Purok 2',
    description: 'Inspected meter calibration. Flow rate verified normal.',
    date: '2026-06-24T14:20:00Z',
    status_resolved: true
  }
];

// DB Operations wrapper
const db = {
  init() {
    if (!localStorage.getItem(DB_KEYS.HOUSEHOLDS)) {
      localStorage.setItem(DB_KEYS.HOUSEHOLDS, JSON.stringify(SEED_HOUSEHOLDS));
    }
    if (!localStorage.getItem(DB_KEYS.CENTRAL_ASSETS)) {
      localStorage.setItem(DB_KEYS.CENTRAL_ASSETS, JSON.stringify(SEED_CENTRAL_ASSETS));
    }
    if (!localStorage.getItem(DB_KEYS.MAINTENANCE_LOGS)) {
      localStorage.setItem(DB_KEYS.MAINTENANCE_LOGS, JSON.stringify(SEED_MAINTENANCE_LOGS));
    }
    if (!localStorage.getItem(DB_KEYS.WORKERS)) {
      localStorage.setItem(DB_KEYS.WORKERS, JSON.stringify(SEED_WORKERS));
    }
    if (!localStorage.getItem(DB_KEYS.BILLING_RECORDS)) {
      localStorage.setItem(DB_KEYS.BILLING_RECORDS, JSON.stringify(SEED_BILLING_RECORDS));
    }
  },

  // Households
  getHouseholds() {
    this.init();
    return JSON.parse(localStorage.getItem(DB_KEYS.HOUSEHOLDS));
  },

  getHousehold(id) {
    const households = this.getHouseholds();
    return households.find(h => h.house_id === id);
  },

  updateHouseholdLeak(id, status) {
    const households = this.getHouseholds();
    const index = households.findIndex(h => h.house_id === id);
    if (index !== -1) {
      households[index].current_leak_status = status;
      // Adjust simulation flow rates based on status toggle
      if (status === 'leak') {
        households[index].flow_rate = 0.75 + Math.random() * 0.5;
        households[index].leak_detected_at = new Date().toISOString();
      } else {
        households[index].flow_rate = 0.01 + Math.random() * 0.09;
        households[index].leak_detected_at = null;
      }
      localStorage.setItem(DB_KEYS.HOUSEHOLDS, JSON.stringify(households));
      return households[index];
    }
    return null;
  },

  // Central Assets
  getCentralAssets() {
    this.init();
    return JSON.parse(localStorage.getItem(DB_KEYS.CENTRAL_ASSETS));
  },

  updateCentralAssets(updates) {
    const assets = this.getCentralAssets();
    const updated = { ...assets, ...updates, last_updated: new Date().toISOString() };
    
    // Auto status calculations based on quality inputs
    if (updated.ph_level < 6.5 || updated.ph_level > 8.5) {
      updated.ph_status = 'warning';
      updated.ph_desc = updated.ph_level < 6.5 ? 'Acidic pH. Check lime feeder.' : 'Alkaline pH. Run acid neutralizing wash.';
    } else {
      updated.ph_status = 'normal';
      updated.ph_desc = 'pH levels normal.';
    }

    if (updated.turbidity > 5.0) {
      updated.turbidity_status = 'warning';
      updated.turbidity_desc = 'Elevated turbidity. Check backwash filters.';
    } else {
      updated.turbidity_status = 'normal';
      updated.turbidity_desc = 'Turbidity levels normal.';
    }

    localStorage.setItem(DB_KEYS.CENTRAL_ASSETS, JSON.stringify(updated));
    return updated;
  },

  // Maintenance Logs
  getMaintenanceLogs() {
    this.init();
    return JSON.parse(localStorage.getItem(DB_KEYS.MAINTENANCE_LOGS));
  },

  addMaintenanceLog(log) {
    const logs = this.getMaintenanceLogs();
    const newLog = {
      task_id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      ...log
    };
    logs.unshift(newLog); // Put new logs first
    localStorage.setItem(DB_KEYS.MAINTENANCE_LOGS, JSON.stringify(logs));
    return newLog;
  },

  // Workers / Authentication
  validateWorker(workerId, zone) {
    this.init();
    const workers = JSON.parse(localStorage.getItem(DB_KEYS.WORKERS));
    const worker = workers.find(w => w.worker_id.toUpperCase() === workerId.toUpperCase());
    if (worker) {
      // Allow working in other zones, but set the session to their selected zone
      return { ...worker, selected_zone: zone };
    }
    return null;
  },

  // Billing Records
  getBillingRecords() {
    this.init();
    return JSON.parse(localStorage.getItem(DB_KEYS.BILLING_RECORDS)) || [];
  },

  getBillingHistoryForHousehold(houseId) {
    const records = this.getBillingRecords();
    return records
      .filter(r => r.house_id === houseId)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // descending date order
  },

  hasBeenBilledThisMonth(houseId, monthYear) {
    const records = this.getBillingRecords();
    return records.some(r => r.house_id === houseId && r.billing_month.toLowerCase() === monthYear.toLowerCase());
  },

  addBillingRecord(record) {
    const records = this.getBillingRecords();
    const newRecord = {
      bill_id: 'BILL-' + Math.floor(5000 + Math.random() * 5000),
      date: new Date().toISOString(),
      status: 'Pending',
      ...record
    };
    records.unshift(newRecord);
    localStorage.setItem(DB_KEYS.BILLING_RECORDS, JSON.stringify(records));
    return newRecord;
  }
};

// Expose db to global window context
window.dbClient = db;
