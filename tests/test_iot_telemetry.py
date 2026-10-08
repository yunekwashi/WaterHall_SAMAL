"""Comprehensive automated test suite for ESP32 / IoT Telemetry Ingestion.
Verifies exact 3-sensor hardware alignment (water level, turbidity, TDS),
nullable water level handling (disconnection / timeout), authentication,
input bounds validation, alert generation, and firmware source integrity.
"""
import os
from pathlib import Path
import pytest
from backend import db_adapter
from backend.server import IOT_DEVICE_SECRET


def test_iot_telemetry_authentication(system):
    """Verify strict pre-shared secret authentication on /api/iot/telemetry."""
    client, _, _ = system
    payload = {'water_level_percentage': 80, 'turbidity_ntu': 2.5, 'tds_ppm': 110}

    # 1. Missing X-IoT-Secret header -> 401
    res = client.post('/api/iot/telemetry', json=payload)
    assert res.status_code == 401
    assert 'Unauthorized device' in res.json.get('msg', '')

    # 2. Invalid X-IoT-Secret header -> 401
    res = client.post('/api/iot/telemetry', json=payload, headers={'X-IoT-Secret': 'wrong-secret-token'})
    assert res.status_code == 401

    # 3. Valid secret -> 200 OK
    res = client.post('/api/iot/telemetry', json=payload, headers={'X-IoT-Secret': IOT_DEVICE_SECRET})
    assert res.status_code == 200
    assert res.json['status'] == 'success'


def test_iot_telemetry_standard_payload_persisted(system):
    """Verify ingestion of normal 3-sensor payload and persistence in reservoir_quality_readings."""
    client, _, _ = system
    payload = {'water_level_percentage': 72, 'turbidity_ntu': 3.45, 'tds_ppm': 138}

    res = client.post('/api/iot/telemetry', json=payload, headers={'X-IoT-Secret': IOT_DEVICE_SECRET})
    assert res.status_code == 200
    body = res.json
    assert body['status'] == 'success'
    assert body['water_level_percentage'] == 72
    assert body['turbidity_ntu'] == 3.45
    assert body['tds_ppm'] == 138

    with db_adapter.get_db() as db:
        db.execute("SELECT water_level_percentage, turbidity_ntu, tds_ppm FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        row = db.fetchone()
        assert row is not None
        assert row['water_level_percentage'] == 72
        assert abs(row['turbidity_ntu'] - 3.45) < 1e-4
        assert row['tds_ppm'] == 138


def test_iot_telemetry_nullable_water_level(system):
    """Verify that null water_level_percentage (sensor timeout / disconnected) is ingested and stored as NULL."""
    client, _, _ = system
    payload = {'water_level_percentage': None, 'turbidity_ntu': 2.1, 'tds_ppm': 105}

    res = client.post('/api/iot/telemetry', json=payload, headers={'X-IoT-Secret': IOT_DEVICE_SECRET})
    assert res.status_code == 200
    body = res.json
    assert body['status'] == 'success'
    assert body['water_level_percentage'] is None
    assert body['turbidity_ntu'] == 2.1
    assert body['tds_ppm'] == 105

    with db_adapter.get_db() as db:
        db.execute("SELECT water_level_percentage, turbidity_ntu, tds_ppm FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        row = db.fetchone()
        assert row is not None
        assert row['water_level_percentage'] is None
        assert abs(row['turbidity_ntu'] - 2.1) < 1e-4
        assert row['tds_ppm'] == 105

        # Ensure NO false low water alert announcement was triggered by null water level
        db.execute("SELECT COUNT(*) as cnt FROM announcements WHERE message LIKE '%LOW WATER ALERT%';")
        alert_cnt = db.fetchone()['cnt']
        assert alert_cnt == 0


def test_iot_telemetry_input_bounds_and_validation(system):
    """Verify strict rejection of out-of-range, NaN, inf, boolean, and negative telemetry values."""
    client, _, _ = system
    headers = {'X-IoT-Secret': IOT_DEVICE_SECRET}

    invalid_payloads = [
        ({'water_level_percentage': -1, 'turbidity_ntu': 2.0, 'tds_ppm': 100}, 'negative water level'),
        ({'water_level_percentage': 101, 'turbidity_ntu': 2.0, 'tds_ppm': 100}, 'water level > 100'),
        ({'water_level_percentage': 50, 'turbidity_ntu': -0.1, 'tds_ppm': 100}, 'negative turbidity'),
        ({'water_level_percentage': 50, 'turbidity_ntu': 15000, 'tds_ppm': 100}, 'turbidity > 10000'),
        ({'water_level_percentage': 50, 'turbidity_ntu': 2.0, 'tds_ppm': -10}, 'negative TDS'),
        ({'water_level_percentage': 50, 'turbidity_ntu': 2.0, 'tds_ppm': 150000}, 'TDS > 100000'),
        ({'water_level_percentage': float('nan'), 'turbidity_ntu': 2.0, 'tds_ppm': 100}, 'NaN water level'),
        ({'water_level_percentage': 50, 'turbidity_ntu': float('inf'), 'tds_ppm': 100}, 'infinite turbidity'),
        ({'water_level_percentage': True, 'turbidity_ntu': 2.0, 'tds_ppm': 100}, 'boolean water level'),
        ({'water_level_percentage': 50, 'turbidity_ntu': 'bad_str', 'tds_ppm': 100}, 'string turbidity'),
    ]

    for payload, case_desc in invalid_payloads:
        res = client.post('/api/iot/telemetry', json=payload, headers=headers)
        assert res.status_code == 400, f"Expected 400 for {case_desc}, got {res.status_code}"

    # Invalid non-dict JSON body
    res = client.post('/api/iot/telemetry', data='not json', headers={**headers, 'Content-Type': 'application/json'})
    assert res.status_code == 400


def test_iot_telemetry_no_extraneous_sensor_requirements(system):
    """Ensure that the physical reservoir node only requires 3 sensors (no pH, no flow, no temperature)."""
    client, _, _ = system
    # Minimal valid payload matching real ESP32 transmission
    payload = {'water_level_percentage': 85, 'turbidity_ntu': 1.8, 'tds_ppm': 95}
    res = client.post('/api/iot/telemetry', json=payload, headers={'X-IoT-Secret': IOT_DEVICE_SECRET})
    assert res.status_code == 200

    # Ensure response and database accept this without requiring ph_level or flow
    with db_adapter.get_db() as db:
        db.execute("SELECT reading_id, water_level_percentage, turbidity_ntu, tds_ppm, ph_level FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1;")
        row = db.fetchone()
        assert row['water_level_percentage'] == 85
        assert row['ph_level'] is None  # Unused / legacy nullable column remains NULL


def test_iot_telemetry_alerts(system):
    """Verify that elevated turbidity (>5 NTU) and low water level (<=20%) generate announcements."""
    client, _, _ = system
    headers = {'X-IoT-Secret': IOT_DEVICE_SECRET}

    # 1. Elevated turbidity (> 5.0 NTU)
    res = client.post('/api/iot/telemetry', json={'water_level_percentage': 50, 'turbidity_ntu': 8.5, 'tds_ppm': 120}, headers=headers)
    assert res.status_code == 200
    with db_adapter.get_db() as db:
        db.execute("SELECT message FROM announcements WHERE message LIKE '%WATER QUALITY ALERT%' ORDER BY id DESC LIMIT 1;")
        row = db.fetchone()
        assert row is not None
        assert '8.5 NTU' in row['message']

    # 2. Critically low water level (<= 20%)
    res = client.post('/api/iot/telemetry', json={'water_level_percentage': 15, 'turbidity_ntu': 2.0, 'tds_ppm': 110}, headers=headers)
    assert res.status_code == 200
    with db_adapter.get_db() as db:
        db.execute("SELECT message FROM announcements WHERE message LIKE '%LOW WATER ALERT%' ORDER BY id DESC LIMIT 1;")
        row = db.fetchone()
        assert row is not None
        assert '15%' in row['message']


def test_iot_latest_endpoint_with_null_and_valid_readings(system):
    """Verify /api/iot/latest correctly serializes both populated and null water levels."""
    client, headers, _ = system
    iot_headers = {'X-IoT-Secret': IOT_DEVICE_SECRET}

    # Telemetry with null water level
    client.post('/api/iot/telemetry', json={'water_level_percentage': None, 'turbidity_ntu': 1.5, 'tds_ppm': 88}, headers=iot_headers)

    res = client.get('/api/iot/latest', headers=headers['admin'])
    assert res.status_code == 200
    data = res.json
    assert data['water_level_percentage'] is None
    assert data['water_level'] is None
    assert abs(data['turbidity_ntu'] - 1.5) < 1e-4
    assert data['tds_ppm'] == 88


def test_firmware_source_no_fake_fallback():
    """Verify that the ESP32 firmware source code has no fake fallback (e.g. return 68;) and handles nulls."""
    ino_path = Path(__file__).resolve().parent.parent / 'iot' / 'waterhall_esp32_reservoir' / 'waterhall_esp32_reservoir.ino'
    assert ino_path.is_file(), f"Firmware file not found at {ino_path}"

    content = ino_path.read_text(encoding='utf-8')
    runtime_path = ino_path.with_name('sensor_runtime.h')
    sensor_source = content + (runtime_path.read_text(encoding='utf-8') if runtime_path.is_file() else '')

    # Strict check: no fake 68% return
    assert 'return 68;' not in sensor_source, "Found forbidden fake fallback 'return 68;' in firmware source!"

    # Verify sensor error returns -1
    assert 'return -1;' in sensor_source or ': -1;' in sensor_source, "Firmware must retain -1 on sensor timeout or disconnection"

    # Verify JSON payload handles null water level (escaped quotes in C++ string)
    assert r'\"water_level_percentage\":null' in content, "Firmware must transmit null water level when sensor is unavailable"
