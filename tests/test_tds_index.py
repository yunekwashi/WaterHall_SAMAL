"""Local TDS operational comparison; disposable DBs, never production samples."""
import datetime
import json

import pytest
from backend import db_adapter, server, tds_index as index
from test_turbidity_index import packet as turbidity_packet

DEVICE = {'X-IoT-Secret': server.IOT_DEVICE_SECRET}


def packet(volts=.332, **overrides):
    value = index.index_from_voltage(volts)
    return {**turbidity_packet(), 'tds_ppm': None,
            'tds_index': round(value, 2) if value is not None else None,
            'tds_index_model': index.MODEL, 'tds_index_provisional': True,
            'tds_index_calibration_approved': False, 'tds_raw_adc': 1102,
            'tds_adc_voltage': round(volts, 4), 'tds_module_voltage': round(volts * 2, 4),
            'tds_signal_valid': True, 'tds_sample_age_ms': 400, **overrides}


@pytest.mark.parametrize('volts,expected', [(.332, 0), (.459, 10), (.335, .23622047244),
    (.3955, 5), (.3828, 4), (.3, 0), (.6, 21.1023622047)])
def test_physical_anchors_direction_no_upper_clamp(volts, expected):
    assert index.index_from_voltage(volts) == pytest.approx(expected)


@pytest.mark.parametrize('volts', [None, True, '0.332', float('nan'), float('inf'),
    10**500, .099, .951])
def test_invalid_voltage_unavailable(volts):
    assert index.index_from_voltage(volts) is None


def test_exact_thresholds_debounce_independence_and_no_new_broadcast(system):
    client, headers, _ = system
    def post(value):
        reply = client.post('/api/iot/telemetry', json=packet(.332 + value * .127 / 10), headers=DEVICE)
        assert reply.status_code == 200
        assert reply.json['tds_ppm'] is None
        assert reply.json['turbidity_index_status'] == 'Normal'
        return reply.json['tds_index_status']
    assert post(4.99) == 'Normal'
    assert post(5) == 'Normal'
    assert post(4.99) == 'Normal'
    assert post(5) == 'Normal'
    assert post(5) == 'Elevated'
    assert post(4.01) == 'Elevated'
    assert post(4) == 'Elevated'
    assert post(4.01) == 'Elevated'
    assert post(4) == 'Elevated'
    assert post(4) == 'Normal'
    for _ in range(20):
        post(10)
    with db_adapter.get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0
    for role in ('admin', 'HH-1', 'worker'):
        assets = client.get('/api/all-data', headers=headers[role]).json['centralAssets']
        assert assets['tds_index'] == 10 and assets['tds_index_status'] == 'Elevated'
        assert assets['main_tank_level'] == 78 and assets['tds_ppm'] is None
        assert assets['tds_index_calibration_approved'] is False


@pytest.mark.parametrize('change', [{'tds_signal_valid': False}, {'tds_signal_valid': 1},
    {'tds_raw_adc': 0}, {'tds_raw_adc': 4095}, {'tds_sample_age_ms': 2001},
    {'tds_sample_age_ms': None}, {'tds_adc_voltage': None}, {'tds_adc_voltage': .099},
    {'tds_module_voltage': 1.5}, {'tds_index': None}, {'tds_index': 9}])
def test_null_invalid_never_inherits_previous_signal(system, change):
    client, _, _ = system
    for _ in range(2):
        assert client.post('/api/iot/telemetry', json=packet(.459), headers=DEVICE).status_code == 200
    reply = client.post('/api/iot/telemetry', json=packet(**change), headers=DEVICE)
    assert reply.status_code == 200
    assert reply.json['tds_index'] is None and reply.json['tds_index_status'] == 'Unavailable'
    assert reply.json['water_level_percentage'] == 78 and reply.json['turbidity_index'] == 0
    reply = client.post('/api/iot/telemetry', json=packet(), headers=DEVICE)
    assert reply.json['tds_index'] == 0 and reply.json['tds_index_status'] == 'Normal'


@pytest.mark.parametrize('change', [{'tds_index': True}, {'tds_index': -1},
    {'tds_index': float('nan')}, {'tds_index_model': 'unknown'},
    {'tds_sample_age_ms': float('inf')}, {'tds_raw_adc': True}])
def test_malformed_metadata_rejected(system, change):
    client, _, _ = system
    assert client.post('/api/iot/telemetry', json=packet(**change), headers=DEVICE).status_code == 400


def test_history_numeric_ppm_zero_and_additive_schema(system):
    client, headers, _ = system
    legacy = {'water_level_percentage': 0, 'turbidity_ntu': 0, 'tds_ppm': 0}
    assert client.post('/api/iot/telemetry', json=legacy, headers=DEVICE).status_code == 200
    latest = client.get('/api/iot/latest', headers=headers['admin']).json
    assert latest['tds_ppm'] == 0 and latest['tds_index'] is None
    assert client.post('/api/iot/telemetry', json=packet(.335), headers=DEVICE).status_code == 200
    with db_adapter.get_db() as db:
        db.execute('SELECT tds_ppm,tds_index_json FROM reservoir_quality_readings ORDER BY reading_id')
        rows = db.fetchall()
        assert rows[0] == {'tds_ppm': 0, 'tds_index_json': None}
        record = json.loads(rows[1]['tds_index_json'])
        assert record['value'] == .24 and record['raw_adc'] == 1102
        assert record['adc_voltage'] == .335 and record['module_voltage'] == .670


def test_stale_fresh_recovery_and_authoritative_backend_status(system):
    client, headers, _ = system
    for _ in range(2):
        reply = client.post('/api/iot/telemetry', json=packet(.459, tds_index_status='Normal'), headers=DEVICE)
    assert reply.json['tds_index_status'] == 'Elevated'
    with db_adapter.get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1')
        row = db.fetchone()
    now = datetime.datetime.fromisoformat(str(row['recorded_at'])).replace(tzinfo=datetime.timezone.utc)
    assert index.public_metadata(row, now + datetime.timedelta(seconds=60))['tds_index'] == 10
    assert index.public_metadata(row, now + datetime.timedelta(seconds=60, milliseconds=1))['tds_index'] is None
    with db_adapter.get_db() as db:
        db.execute('UPDATE reservoir_quality_readings SET recorded_at=?',
                   ((now-datetime.timedelta(seconds=61)).isoformat(),))
    assert client.get('/api/iot/latest', headers=headers['admin']).json['tds_index_status'] == 'Unavailable'
    reply = client.post('/api/iot/telemetry', json=packet(.335), headers=DEVICE)
    assert reply.json['tds_index'] == .24 and reply.json['tds_index_status'] == 'Normal'
