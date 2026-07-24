import os
import json
import sqlite3
from http.server import SimpleHTTPRequestHandler, HTTPServer

DB_FILE = 'waterhall.db'

# Seed data from db.dart
seed_billing_records = [
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
]

seed_workers = [
    { 'worker_id': 'EMP-301', 'name': 'Michael Balaga', 'role': 'Lead Field Tech', 'zone': 'Purok 1' },
    { 'worker_id': 'EMP-304', 'name': 'Ryiel Banggat', 'role': 'Field Technician', 'zone': 'Purok 2' },
    { 'worker_id': 'EMP-308', 'name': 'John Dave Chicote', 'role': 'Zone Inspector', 'zone': 'Purok 5' }
]

seed_households = [
    {
        'house_id': 'HH-101',
        'owner_name': 'Maria C. Santos',
        'purok': 'Purok 1',
        'account_number': 'TAG-2026-0041',
        'current_leak_status': 'leak',
        'current_m3_usage': 18.4,
        'flow_rate': 0.85,
        'monthly_history': json.dumps([12.4, 14.1, 15.8, 18.4]),
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
        'monthly_history': json.dumps([11.8, 12.0, 11.5, 12.1]),
        'leak_detected_at': None
    },
    {
        'house_id': 'HH-103',
        'owner_name': 'Elena F. Garcia',
        'purok': 'Purok 2',
        'account_number': 'TAG-2026-0312',
        'current_leak_status': 'leak',
        'current_m3_usage': 24.8,
        'flow_rate': 0.98,
        'monthly_history': json.dumps([15.2, 16.0, 19.5, 24.8]),
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
        'monthly_history': json.dumps([8.5, 9.0, 9.1, 9.3]),
        'leak_detected_at': None
    },
    {
        'house_id': 'HH-105',
        'owner_name': 'Clara M. Aquino',
        'purok': 'Purok 3',
        'account_number': 'TAG-2026-0810',
        'current_leak_status': 'normal',
        'current_m3_usage': 15.6,
        'flow_rate': 0.08,
        'monthly_history': json.dumps([14.0, 15.2, 14.9, 15.6]),
        'leak_detected_at': None
    },
    {
        'house_id': 'HH-106',
        'owner_name': 'Manuel L. Roxas',
        'purok': 'Purok 3',
        'account_number': 'TAG-2026-0925',
        'current_leak_status': 'normal',
        'current_m3_usage': 21.0,
        'flow_rate': 0.11,
        'monthly_history': json.dumps([19.2, 20.1, 20.8, 21.0]),
        'leak_detected_at': None
    },
    {
        'house_id': 'HH-107',
        'owner_name': 'Felipe A. Agoncillo',
        'purok': 'Purok 4',
        'account_number': 'TAG-2026-1102',
        'current_leak_status': 'leak',
        'current_m3_usage': 32.5,
        'flow_rate': 1.45,
        'monthly_history': json.dumps([18.4, 21.0, 25.1, 32.5]),
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
        'monthly_history': json.dumps([13.1, 13.9, 14.0, 14.2]),
        'leak_detected_at': None
    },
    {
        'house_id': 'HH-109',
        'owner_name': 'Antonio N. Luna',
        'purok': 'Purok 5',
        'account_number': 'TAG-2026-1509',
        'current_leak_status': 'normal',
        'current_m3_usage': 11.0,
        'flow_rate': 0.06,
        'monthly_history': json.dumps([10.5, 10.9, 11.2, 11.0]),
        'leak_detected_at': None
    },
    {
        'house_id': 'HH-110',
        'owner_name': 'Leonor Rivera',
        'purok': 'Purok 6',
        'account_number': 'TAG-2026-1772',
        'current_leak_status': 'normal',
        'current_m3_usage': 13.7,
        'flow_rate': 0.05,
        'monthly_history': json.dumps([12.8, 13.2, 13.4, 13.7]),
        'leak_detected_at': None
    }
]

seed_central_assets = {
    'main_tank_level': 68,
    'ph_level': 5.8,
    'ph_status': 'warning',
    'ph_desc': 'Acidic pH detected. Add neutralizing agent.',
    'turbidity': 6.2,
    'turbidity_status': 'warning',
    'turbidity_desc': 'Slightly high turbidity. Filter check recommended.',
    'last_updated': '2026-06-25T11:00:00Z'
}

seed_maintenance_logs = [
    {
        'task_id': 'LOG-1001',
        'house_id': 'HH-102',
        'worker_id': 'EMP-304',
        'purok': 'Purok 1',
        'description': 'Replaced main brass pipe fitting. Leak resolved.',
        'date': '2026-06-23T09:30:00Z',
        'status_resolved': 1 # SQLite stores boolean as 0/1
    },
    {
        'task_id': 'LOG-1002',
        'house_id': 'HH-104',
        'worker_id': 'EMP-304',
        'purok': 'Purok 2',
        'description': 'Inspected meter calibration. Flow rate verified normal.',
        'date': '2026-06-24T14:20:00Z',
        'status_resolved': 1
    }
]

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    c.execute("PRAGMA foreign_keys = OFF;")
    
    # Drop tables to start fresh if needed
    c.execute("DROP TABLE IF EXISTS leak_alerts;")
    c.execute("DROP TABLE IF EXISTS flow_readings;")
    c.execute("DROP TABLE IF EXISTS reservoir_quality_readings;")
    c.execute("DROP TABLE IF EXISTS billing_records;")
    c.execute("DROP TABLE IF EXISTS water_meters;")
    c.execute("DROP TABLE IF EXISTS households;")
    c.execute("DROP TABLE IF EXISTS puroks;")
    c.execute("DROP TABLE IF EXISTS users;")
    
    c.execute("PRAGMA foreign_keys = ON;")
    
    # 1. Users
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            full_name TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('Admin', 'Collector')),
            contact_no TEXT DEFAULT NULL
        )
    ''')
    
    # 2. Puroks
    c.execute('''
        CREATE TABLE IF NOT EXISTS puroks (
            purok_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_name TEXT NOT NULL UNIQUE,
            main_hose_sensor_mac TEXT DEFAULT NULL
        )
    ''')
    
    # 3. Households
    c.execute('''
        CREATE TABLE IF NOT EXISTS households (
            household_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_id INTEGER NOT NULL,
            family_head_name TEXT NOT NULL,
            total_family_members INTEGER DEFAULT 1,
            contact_no TEXT DEFAULT NULL,
            registration_date TEXT NOT NULL,
            CONSTRAINT fk_households_puroks 
                FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                ON DELETE RESTRICT ON UPDATE CASCADE
        )
    ''')
    
    # 4. Water Meters
    c.execute('''
        CREATE TABLE IF NOT EXISTS water_meters (
            meter_id INTEGER PRIMARY KEY AUTOINCREMENT,
            household_id INTEGER NOT NULL,
            serial_number TEXT NOT NULL UNIQUE,
            last_reading REAL DEFAULT 0.00,
            status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Broken', 'Disconnected')),
            CONSTRAINT fk_water_meters_households 
                FOREIGN KEY (household_id) REFERENCES households (household_id) 
                ON DELETE CASCADE ON UPDATE CASCADE
        )
    ''')
    
    # 5. Billing Records
    c.execute('''
        CREATE TABLE IF NOT EXISTS billing_records (
            bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
            meter_id INTEGER NOT NULL,
            previous_reading REAL NOT NULL,
            present_reading REAL NOT NULL,
            consumption_m3 REAL NOT NULL,
            total_amount REAL NOT NULL,
            payment_status TEXT NOT NULL DEFAULT 'Unpaid' CHECK (payment_status IN ('Paid', 'Unpaid')),
            payment_date TEXT DEFAULT NULL,
            collected_by INTEGER DEFAULT NULL,
            is_synced INTEGER NOT NULL DEFAULT 1 CHECK (is_synced IN (0, 1)),
            CONSTRAINT fk_billing_records_meters 
                FOREIGN KEY (meter_id) REFERENCES water_meters (meter_id) 
                ON DELETE RESTRICT ON UPDATE CASCADE,
            CONSTRAINT fk_billing_records_users 
                FOREIGN KEY (collected_by) REFERENCES users (user_id) 
                ON DELETE SET NULL ON UPDATE CASCADE
        )
    ''')
    
    # 6. Reservoir Quality Readings
    c.execute('''
        CREATE TABLE IF NOT EXISTS reservoir_quality_readings (
            reading_id INTEGER PRIMARY KEY AUTOINCREMENT,
            water_level_percentage INTEGER NOT NULL CHECK (water_level_percentage BETWEEN 0 AND 100),
            turbidity_ntu REAL NOT NULL,
            tds_ppm INTEGER NOT NULL,
            recorded_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 7. Flow Readings
    c.execute('''
        CREATE TABLE IF NOT EXISTS flow_readings (
            flow_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_id INTEGER NOT NULL,
            flow_rate_lpm REAL NOT NULL,
            recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_flow_readings_puroks 
                FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                ON DELETE CASCADE ON UPDATE CASCADE
        )
    ''')
    
    # 8. Leak Alerts
    c.execute('''
        CREATE TABLE IF NOT EXISTS leak_alerts (
            alert_id INTEGER PRIMARY KEY AUTOINCREMENT,
            purok_id INTEGER DEFAULT NULL,
            alert_type TEXT NOT NULL,
            alert_details TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Investigating', 'Resolved')),
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_leak_alerts_puroks 
                FOREIGN KEY (purok_id) REFERENCES puroks (purok_id) 
                ON DELETE SET NULL ON UPDATE CASCADE
        )
    ''')
    
    # Seed data if empty
    c.execute("SELECT COUNT(*) FROM households")
    if c.fetchone()[0] == 0:
        print("Initializing high-fidelity seed data...")
        # Users
        users_data = [
            (1, 'admin', 'hash_admin_123', 'Barangay Admin', 'Admin', '09171234567'),
            (2, 'collector1', 'hash_coll_123', 'Ryiel Banggat', 'Collector', '09187654321'),
            (3, 'collector2', 'hash_coll_456', 'Michael Balaga', 'Collector', '09198887777'),
            (4, 'collector3', 'hash_coll_789', 'John Dave Chicote', 'Collector', '09201112222')
        ]
        c.executemany("INSERT INTO users (user_id, username, password_hash, full_name, role, contact_no) VALUES (?, ?, ?, ?, ?, ?);", users_data)

        # Puroks
        puroks_data = [
            (1, 'Purok 1', '00:1A:2B:3C:4D:5E'),
            (2, 'Purok 2', '00:1A:2B:3C:4D:5F'),
            (3, 'Purok 3', '00:1A:2B:3C:4D:60'),
            (4, 'Purok 4', '00:1A:2B:3C:4D:61'),
            (5, 'Purok 5', '00:1A:2B:3C:4D:62'),
            (6, 'Purok 6', '00:1A:2B:3C:4D:63'),
            (7, 'Purok 7', '00:1A:2B:3C:4D:64'),
            (8, 'Purok 8', '00:1A:2B:3C:4D:65')
        ]
        c.executemany("INSERT INTO puroks (purok_id, purok_name, main_hose_sensor_mac) VALUES (?, ?, ?);", puroks_data)

        # Households
        households_data = [
            (101, 1, 'Maria C. Santos', 4, '09201110001', '2026-01-10'),
            (102, 1, 'Ramon P. Del Rosario', 3, '09201110002', '2026-01-12'),
            (103, 2, 'Elena F. Garcia', 5, '09201110003', '2026-01-15'),
            (104, 2, 'Delfin S. Alcantara', 2, '09201110004', '2026-01-20'),
            (105, 3, 'Clara M. Aquino', 6, '09201110005', '2026-02-05'),
            (106, 3, 'Manuel L. Roxas', 4, '09201110006', '2026-02-10'),
            (107, 4, 'Felipe A. Agoncillo', 5, '09201110007', '2026-02-15'),
            (108, 4, 'Gregoria de Jesus', 3, '09201110008', '2026-02-20'),
            (109, 5, 'Antonio N. Luna', 4, '09201110009', '2026-03-01'),
            (110, 6, 'Leonor Rivera', 2, '09201110010', '2026-03-05')
        ]
        c.executemany("INSERT INTO households (household_id, purok_id, family_head_name, total_family_members, contact_no, registration_date) VALUES (?, ?, ?, ?, ?, ?);", households_data)

        # Water Meters
        meters_data = [
            (1001, 101, 'TAG-2026-0041', 18.40, 'Active'),
            (1002, 102, 'TAG-2026-0105', 12.10, 'Active'),
            (1003, 103, 'TAG-2026-0312', 24.80, 'Active'),
            (1004, 104, 'TAG-2026-0421', 9.30, 'Active'),
            (1005, 105, 'TAG-2026-0810', 15.60, 'Active'),
            (1006, 106, 'TAG-2026-0925', 21.00, 'Active'),
            (1007, 107, 'TAG-2026-1102', 32.50, 'Active'),
            (1008, 108, 'TAG-2026-1349', 14.20, 'Active'),
            (1009, 109, 'TAG-2026-1509', 11.00, 'Active'),
            (1010, 110, 'TAG-2026-1772', 13.70, 'Active')
        ]
        c.executemany("INSERT INTO water_meters (meter_id, household_id, serial_number, last_reading, status) VALUES (?, ?, ?, ?, ?);", meters_data)

        # Billing Records
        billing_data = [
            (5001, 1001, 15.80, 18.40, 2.60, 170.00, 'Unpaid', None, 2, 1),
            (5002, 1001, 14.10, 15.80, 1.70, 170.00, 'Paid', '2026-05-24 10:15:00', 2, 1),
            (5003, 1002, 11.50, 12.10, 0.60, 170.00, 'Paid', '2026-05-24 10:30:00', 2, 1)
        ]
        c.executemany("INSERT INTO billing_records (bill_id, meter_id, previous_reading, present_reading, consumption_m3, total_amount, payment_status, payment_date, collected_by, is_synced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", billing_data)

        # Reservoir Quality Readings
        reservoir_data = [
            (68, 6.20, 150, '2026-06-25 11:00:00')
        ]
        c.executemany("INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, tds_ppm, recorded_at) VALUES (?, ?, ?, ?);", reservoir_data)

        # Flow Sensor Readings
        flow_data = [
            (1, 0.85, '2026-06-24 18:30:00'),
            (2, 0.05, '2026-06-24 18:30:00'),
            (3, 0.98, '2026-06-25 02:15:00'),
            (4, 1.45, '2026-06-25 08:45:00')
        ]
        c.executemany("INSERT INTO flow_readings (purok_id, flow_rate_lpm, recorded_at) VALUES (?, ?, ?);", flow_data)

        # Leak Alerts
        alerts_data = [
            (1, 1, 'Leak Detected', 'HH-101 flow anomaly check', 'Active', '2026-06-24 18:30:00'),
            (2, 2, 'Leak Detected', 'HH-103 flow anomaly check', 'Active', '2026-06-25 02:15:00'),
            (3, 4, 'Leak Detected', 'HH-107 flow anomaly check', 'Active', '2026-06-25 08:45:00')
        ]
        c.executemany("INSERT INTO leak_alerts (alert_id, purok_id, alert_type, alert_details, status, created_at) VALUES (?, ?, ?, ?, ?, ?);", alerts_data)

    conn.commit()
    conn.close()

class WaterHallServer(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent caching for debug
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

    def translate_path(self, path):
        # Strip query parameters and hash fragments so we find the actual file on disk
        path_clean = path.split('?')[0].split('#')[0]
        root = os.path.join(os.getcwd(), 'web')
        path_clean = path_clean.lstrip('/')
        return os.path.join(root, path_clean)

    def do_GET(self):
        path_clean = self.path.split('?')[0]
        if path_clean == '/api/all-data':
            self.get_all_data()
        else:
            # Fall back to serving static files
            if path_clean == '/' or path_clean == '':
                self.path = '/index.html'
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/households/update':
            self.update_household()
        elif self.path == '/api/central-assets/update':
            self.update_central_assets()
        elif self.path == '/api/maintenance-logs/add':
            self.add_maintenance_log()
        elif self.path == '/api/billing-records/add':
            self.add_billing_record()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

    def get_all_data(self):
        try:
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            
            # 1. Households Mapping
            c.execute('''
                SELECT 
                    h.household_id,
                    h.family_head_name,
                    p.purok_name,
                    p.purok_id,
                    m.serial_number,
                    m.last_reading,
                    m.status AS meter_status
                FROM households h
                JOIN puroks p ON h.purok_id = p.purok_id
                LEFT JOIN water_meters m ON h.household_id = m.household_id
            ''')
            rows = c.fetchall()
            
            c.execute("SELECT purok_id, alert_details, status, created_at FROM leak_alerts WHERE status != 'Resolved'")
            active_alerts = {row['purok_id']: dict(row) for row in c.fetchall()}
            
            default_histories = {
                101: [12.4, 14.1, 15.8, 18.4],
                102: [11.8, 12.0, 11.5, 12.1],
                103: [15.2, 16.0, 19.5, 24.8],
                104: [8.5, 9.0, 9.1, 9.3],
                105: [14.0, 15.2, 14.9, 15.6],
                106: [19.2, 20.1, 20.8, 21.0],
                107: [18.4, 21.0, 25.1, 32.5],
                108: [13.1, 13.9, 14.0, 14.2],
                109: [10.5, 10.9, 11.2, 11.0],
                110: [12.8, 13.2, 13.4, 13.7],
            }
            
            households = []
            for row in rows:
                hh_id = row['household_id']
                purok_id = row['purok_id']
                
                has_leak = False
                leak_time = None
                flow_rate = 0.05
                if purok_id in active_alerts:
                    alert = active_alerts[purok_id]
                    if f"HH-{hh_id}" in alert['alert_details'] or alert['alert_details'] == "":
                        has_leak = True
                        leak_time = alert['created_at']
                        flow_rate = 0.85 if hh_id == 101 else (0.98 if hh_id == 103 else (1.45 if hh_id == 107 else 0.75))
                
                households.append({
                    'house_id': f"HH-{hh_id}",
                    'owner_name': row['family_head_name'],
                    'purok': row['purok_name'],
                    'account_number': row['serial_number'] or f"TAG-2026-{hh_id:04d}",
                    'current_leak_status': 'leak' if has_leak else 'normal',
                    'current_m3_usage': row['last_reading'] or 0.0,
                    'flow_rate': flow_rate,
                    'monthly_history': default_histories.get(hh_id, [10.0, 11.0, 12.0, row['last_reading'] or 12.0]),
                    'leak_detected_at': leak_time
                })
                
            # 2. Central Assets Mapping
            extra_state = {'ph_level': 5.8, 'ph_status': 'warning', 'ph_desc': 'Acidic pH detected. Add neutralizing agent.'}
            if os.path.exists('assets_extra.json'):
                try:
                    with open('assets_extra.json', 'r') as f:
                        extra_state = json.load(f)
                except:
                    pass
                    
            c.execute("SELECT * FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1")
            row = c.fetchone()
            if row:
                central_assets = {
                    'main_tank_level': row['water_level_percentage'],
                    'ph_level': extra_state.get('ph_level', 5.8),
                    'ph_status': extra_state.get('ph_status', 'warning'),
                    'ph_desc': extra_state.get('ph_desc', 'Acidic pH detected. Add neutralizing agent.'),
                    'turbidity': row['turbidity_ntu'],
                    'turbidity_status': 'warning' if row['turbidity_ntu'] > 5.0 else 'normal',
                    'turbidity_desc': 'Slightly high turbidity. Filter check recommended.' if row['turbidity_ntu'] > 5.0 else 'Turbidity levels normal.',
                    'last_updated': row['recorded_at']
                }
            else:
                central_assets = {
                    'main_tank_level': 68,
                    'ph_level': 5.8,
                    'ph_status': 'warning',
                    'ph_desc': 'Acidic pH detected. Add neutralizing agent.',
                    'turbidity': 6.2,
                    'turbidity_status': 'warning',
                    'turbidity_desc': 'Slightly high turbidity. Filter check recommended.',
                    'last_updated': '2026-06-25T11:00:00Z'
                }
                
            # 3. Maintenance Logs Mapping
            maintenance_logs = []
            if os.path.exists('maintenance_logs.json'):
                try:
                    with open('maintenance_logs.json', 'r') as f:
                        maintenance_logs = json.load(f)
                except:
                    pass
            if not maintenance_logs:
                maintenance_logs = [
                    {
                        'task_id': 'LOG-1001',
                        'house_id': 'HH-102',
                        'worker_id': 'EMP-304',
                        'purok': 'Purok 1',
                        'description': 'Replaced main brass pipe fitting. Leak resolved.',
                        'date': '2026-06-23T09:30:00Z',
                        'status_resolved': True
                    },
                    {
                        'task_id': 'LOG-1002',
                        'house_id': 'HH-104',
                        'worker_id': 'EMP-304',
                        'purok': 'Purok 2',
                        'description': 'Inspected meter calibration. Flow rate verified normal.',
                        'date': '2026-06-24T14:20:00Z',
                        'status_resolved': True
                    }
                ]
                
            # 4. Workers Mapping
            c.execute("SELECT user_id, full_name, role, contact_no FROM users WHERE role = 'Collector'")
            role_zone_mapping = {
                'Juan Luna': ('Field Technician', 'Purok 2', 'EMP-304'),
                'Jose Rizal': ('Lead Field Tech', 'Purok 1', 'EMP-301'),
                'Andres Bonifacio': ('Zone Inspector', 'Purok 5', 'EMP-308'),
            }
            workers = []
            for row in c.fetchall():
                name = row['full_name']
                role, zone, emp_id = role_zone_mapping.get(name, ('Collector', 'Purok 1', f"EMP-{row['user_id'] + 300}"))
                workers.append({
                    'worker_id': emp_id,
                    'name': name,
                    'role': role,
                    'zone': zone
                })
                
            # 5. Billing Records Mapping
            c.execute('''
                SELECT 
                    b.bill_id,
                    b.previous_reading,
                    b.present_reading,
                    b.consumption_m3,
                    b.total_amount,
                    b.payment_status,
                    b.payment_date,
                    b.is_synced,
                    u.full_name AS collector_name,
                    m.serial_number,
                    m.household_id
                FROM billing_records b
                JOIN water_meters m ON b.meter_id = m.meter_id
                LEFT JOIN users u ON b.collected_by = u.user_id
            ''')
            billing_records = []
            name_to_emp = {
                'Juan Luna': 'EMP-304',
                'Jose Rizal': 'EMP-301',
                'Andres Bonifacio': 'EMP-308',
            }
            for row in c.fetchall():
                collector_emp = name_to_emp.get(row['collector_name'], 'EMP-304')
                month = "June 2026" if row['bill_id'] == 5001 else "May 2026"
                b_date = row['payment_date'] or "2026-06-24T18:45:00Z"
                billing_records.append({
                    'bill_id': f"BILL-{row['bill_id']}",
                    'house_id': f"HH-{row['household_id']}",
                    'account_number': row['serial_number'],
                    'billing_month': month,
                    'previous_reading': row['previous_reading'],
                    'current_reading': row['present_reading'],
                    'consumption': row['consumption_m3'],
                    'water_charge': row['total_amount'] - 50.0,
                    'maintenance_fee': 50.0,
                    'total_due': row['total_amount'],
                    'billed_by': collector_emp,
                    'date': b_date,
                    'status': 'Pending' if row['payment_status'] == 'Unpaid' else 'Paid'
                })
            
            conn.close()
            
            response_data = {
                'households': households,
                'centralAssets': central_assets,
                'maintenanceLogs': maintenance_logs,
                'workers': workers,
                'billingRecords': billing_records
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            payload = json.dumps(response_data).encode('utf-8')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            
        except Exception as e:
            self.send_error_response(e)

    def update_household(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            h = json.loads(post_data.decode('utf-8'))
            
            house_id_str = h['house_id']
            hh_id = int(house_id_str.replace("HH-", ""))
            status = h.get('current_leak_status', 'normal')
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            
            # Fetch purok_id
            c.execute("SELECT purok_id FROM households WHERE household_id = ?", (hh_id,))
            purok_row = c.fetchone()
            purok_id = purok_row[0] if purok_row else 1
            
            if status == 'leak':
                # Check if there is already an active alert
                c.execute("SELECT alert_id FROM leak_alerts WHERE status != 'Resolved' AND purok_id = ? AND alert_details LIKE ?", (purok_id, f"%HH-{hh_id}%"))
                alert_row = c.fetchone()
                if not alert_row:
                    import datetime
                    now_str = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
                    c.execute('''
                        INSERT INTO leak_alerts (purok_id, alert_type, alert_details, status, created_at)
                        VALUES (?, 'Leak Detected', ?, 'Active', ?)
                    ''', (purok_id, f"HH-{hh_id} flow anomaly check", now_str))
            else:
                # Mark alert as resolved
                c.execute("UPDATE leak_alerts SET status = 'Resolved' WHERE status != 'Resolved' AND purok_id = ? AND alert_details LIKE ?", (purok_id, f"%HH-{hh_id}%"))
                
            conn.commit()
            conn.close()
            
            self.send_success_response()
        except Exception as e:
            self.send_error_response(e)

    def update_central_assets(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            assets = json.loads(post_data.decode('utf-8'))
            
            # Save ph extra fields to JSON
            extra_fields = {
                'ph_level': assets.get('ph_level'),
                'ph_status': assets.get('ph_status'),
                'ph_desc': assets.get('ph_desc')
            }
            with open('assets_extra.json', 'w') as f:
                json.dump(extra_fields, f)
                
            # Insert into reservoir_quality_readings
            import datetime
            now_str = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''
                INSERT INTO reservoir_quality_readings (water_level_percentage, turbidity_ntu, tds_ppm, recorded_at)
                VALUES (?, ?, ?, ?)
            ''', (
                assets.get('main_tank_level', 68),
                assets.get('turbidity', 6.2),
                150,
                now_str
            ))
            conn.commit()
            conn.close()
            
            self.send_success_response()
        except Exception as e:
            self.send_error_response(e)

    def add_maintenance_log(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            log = json.loads(post_data.decode('utf-8'))
            
            # Load, append, and save to maintenance_logs.json
            logs = []
            if os.path.exists('maintenance_logs.json'):
                try:
                    with open('maintenance_logs.json', 'r') as f:
                        logs = json.load(f)
                except:
                    pass
            
            if 'task_id' not in log:
                import random
                log['task_id'] = f"LOG-{random.randint(1000, 9999)}"
            if 'date' not in log:
                import datetime
                log['date'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
                
            logs.insert(0, log)
            with open('maintenance_logs.json', 'w') as f:
                json.dump(logs, f)
                
            # If resolved, update leak alert
            if log.get('status_resolved'):
                house_id_str = log['house_id']
                hh_id = int(house_id_str.replace("HH-", ""))
                conn = sqlite3.connect(DB_FILE)
                c = conn.cursor()
                c.execute("UPDATE leak_alerts SET status = 'Resolved' WHERE status != 'Resolved' AND alert_details LIKE ?", (f"%HH-{hh_id}%",))
                conn.commit()
                conn.close()
                
            self.send_success_response()
        except Exception as e:
            self.send_error_response(e)

    def add_billing_record(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            b = json.loads(post_data.decode('utf-8'))
            
            house_id_str = b['house_id']
            hh_id = int(house_id_str.replace("HH-", ""))
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            
            # Fetch meter_id
            c.execute("SELECT meter_id FROM water_meters WHERE household_id = ?", (hh_id,))
            meter_row = c.fetchone()
            meter_id = meter_row[0] if meter_row else 1001
            
            # Fetch user_id for billed_by
            billed_by_str = b.get('billed_by', 'EMP-304')
            emp_to_name = {
                'EMP-304': 'Juan Luna',
                'EMP-301': 'Jose Rizal',
                'EMP-308': 'Andres Bonifacio',
            }
            worker_name = emp_to_name.get(billed_by_str, 'Juan Luna')
            c.execute("SELECT user_id FROM users WHERE full_name = ?", (worker_name,))
            user_row = c.fetchone()
            user_id = user_row[0] if user_row else 2
            
            payment_status = 'Unpaid' if b.get('status') == 'Pending' else 'Paid'
            
            c.execute('''
                INSERT OR REPLACE INTO billing_records (meter_id, previous_reading, present_reading, consumption_m3, total_amount, payment_status, payment_date, collected_by, is_synced)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
            ''', (
                meter_id,
                b.get('previous_reading'),
                b.get('current_reading'),
                b.get('consumption'),
                b.get('total_due'),
                payment_status,
                b.get('date'),
                user_id
            ))
            
            # Also update water_meters last_reading
            c.execute("UPDATE water_meters SET last_reading = ? WHERE meter_id = ?", (b.get('current_reading'), meter_id))
            
            conn.commit()
            conn.close()
            
            self.send_success_response()
        except Exception as e:
            self.send_error_response(e)

    def send_success_response(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'status': 'success'}).encode('utf-8'))

    def send_error_response(self, error):
        print("Server error:", error)
        self.send_response(500)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'status': 'error', 'message': str(error)}).encode('utf-8'))

def run(port=8000):
    init_db()
    server_address = ('', port)
    httpd = HTTPServer(server_address, WaterHallServer)
    print(f"Starting server with SQLite support on port {port}...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()

if __name__ == '__main__':
    run()
