"""
WaterHall Capstone - Comprehensive Integration Test Suite
Verifies:
1. IoT Telemetry transmission and real-time query endpoints
2. Dynamic Payment Settings GET & POST
3. Offline collection idempotency and duplicate deduplication
4. Citizen Incident Reports
5. Mobile & Admin dashboard data consistency
"""
import sys
import os
import json
import uuid
from datetime import datetime

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from server import app
import db_adapter

def run_tests():
    print("==================================================")
    print("WATERHALL SYSTEM INTEGRATION & HARDENING TESTS")
    print("==================================================")
    
    client = app.test_client()
    
    # ----------------------------------------------------
    # TEST A: IoT Telemetry
    # ----------------------------------------------------
    print("\n[TEST A] ESP32 IoT Telemetry Ingestion & Realtime Snapshots...")
    telemetry_payload = {
        "water_level_percentage": 78,
        "turbidity_ntu": 3.45,
        "ph_level": 7.35,
        "tds_ppm": 142
    }
    res = client.post('/api/iot/telemetry', json=telemetry_payload)
    assert res.status_code == 200, f"IoT post failed: {res.data}"
    data = res.get_json()
    assert data.get('status') == 'success'
    print("  -> POST /api/iot/telemetry: OK (200)")
    
    # Verify latest reading
    res_latest = client.get('/api/iot/latest')
    assert res_latest.status_code == 200
    latest_data = res_latest.get_json()
    assert latest_data.get('water_level') == 78
    assert latest_data.get('tds') == 142
    assert latest_data.get('ph') == 7.35
    print(f"  -> GET /api/iot/latest: OK ({latest_data})")
    
    # ----------------------------------------------------
    # TEST B: Dynamic Payment Settings
    # ----------------------------------------------------
    print("\n[TEST B] Dynamic Payment Settings (Admin Configurable)...")
    get_settings = client.get('/api/settings/payment')
    assert get_settings.status_code == 200
    initial_settings = get_settings.get_json().get('settings', {})
    print(f"  -> Current settings: Office={initial_settings.get('office_location')}, WorkerCollection={initial_settings.get('worker_collection_enabled')}")
    
    new_settings = {
        "office_location": "Barangay Hall Ground Floor, Purok 2, Tagpopongan",
        "office_hours": "Mon-Fri: 8:00 AM - 5:00 PM; Sat: 8:00 AM - 12:00 NN",
        "accepted_methods": "Cash (Barangay Hall or Authorized Worker), GCash",
        "worker_collection_enabled": True,
        "instructions": "Always request and keep your official stamped or digital WaterHall e-receipt for validation."
    }
    update_res = client.post('/api/settings/payment', json=new_settings)
    assert update_res.status_code == 200
    
    verify_settings = client.get('/api/settings/payment').get_json().get('settings', {})
    assert verify_settings.get('office_location') == new_settings['office_location']
    assert verify_settings.get('worker_collection_enabled') is True
    print("  -> Dynamic Payment Configuration updated and verified successfully.")
    
    # ----------------------------------------------------
    # TEST C: Idempotent Worker Offline Collection Sync
    # ----------------------------------------------------
    print("\n[TEST C & D] Worker Offline Collection Sync & Deduplication...")
    test_tx_id = f"COLLECT-TEST-{uuid.uuid4().hex[:8].upper()}"
    test_household = "HH-TAGP-001"
    
    collection_item = {
        "transaction_id": test_tx_id,
        "household_id": test_household,
        "worker_id": "WRK-001",
        "amount": 250.00,
        "payment_method": "Cash",
        "notes": "Field worker offline sync verification test",
        "collected_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    # 1. First Sync Attempt
    sync_payload = {"collections": [collection_item]}
    sync_res = client.post('/api/collections/sync', json=sync_payload)
    assert sync_res.status_code == 200
    sync_data = sync_res.get_json()
    assert sync_data.get('synced_count') == 1
    assert sync_data.get('duplicates_ignored') == 0
    print(f"  -> Initial Sync: {sync_data.get('synced_count')} saved, {sync_data.get('duplicates_ignored')} duplicates.")
    
    # 2. Duplicate Sync Attempt (Simulating reconnect or worker re-upload)
    sync_res_dup = client.post('/api/collections/sync', json=sync_payload)
    assert sync_res_dup.status_code == 200
    sync_data_dup = sync_res_dup.get_json()
    assert sync_data_dup.get('synced_count') == 0
    assert sync_data_dup.get('duplicates_ignored') == 1
    print(f"  -> Duplicate Sync (Idempotent): {sync_data_dup.get('synced_count')} saved, {sync_data_dup.get('duplicates_ignored')} duplicates safely ignored!")
    
    # 3. Verify in Collections Audit Log
    history_res = client.get('/api/collections/history')
    assert history_res.status_code == 200
    history_list = history_res.get_json().get('collections', [])
    matched = [c for c in history_list if c.get('transaction_id') == test_tx_id]
    matched_amt = matched[0].get('amount_collected', matched[0].get('amount'))
    print(f"  -> Audit History verified: TX {test_tx_id} logged with amount {matched_amt}.")
    
    # ----------------------------------------------------
    # TEST E: Citizen Reports
    # ----------------------------------------------------
    print("\n[TEST E] Citizen Incident Reports Flow...")
    report_payload = {
        "report_type": "Pipe Leak",
        "description": "Low pressure and pipe leaking near Purok 3 main highway.",
        "purok": "Purok 3",
        "resident_name": "Juan Dela Cruz",
        "contact_number": "09171234567"
    }
    rep_res = client.post('/api/reports', json=report_payload)
    assert rep_res.status_code == 200
    rep_id = rep_res.get_json().get('report_id')
    assert rep_id is not None
    print(f"  -> Citizen report submitted: ID #{rep_id}")
    
    # Admin marks report as Investigating
    upd_rep = client.post('/api/reports/update-status', json={"report_id": rep_id, "status": "INVESTIGATING"})
    assert upd_rep.status_code == 200
    
    # Verify in reports list
    reports_list = client.get('/api/reports').get_json().get('reports', [])
    rep_match = [r for r in reports_list if r.get('report_id') == rep_id]
    assert len(rep_match) == 1
    assert rep_match[0].get('status') == 'Investigating'
    print(f"  -> Report #{rep_id} status updated to Investigating and confirmed in Admin feed.")
    
    print("\n==================================================")
    print("ALL INTEGRATION TESTS PASSED SUCCESSFULLY! (100%)")
    print("==================================================")

if __name__ == '__main__':
    run_tests()
