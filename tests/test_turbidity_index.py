"""Actual local-index API/state/history checks with isolated databases only."""
import datetime
import json

import pytest
from backend import db_adapter, server, turbidity_index as index

DEVICE = {'X-IoT-Secret': server.IOT_DEVICE_SECRET}


@pytest.fixture(autouse=True)
def approved_local_index(monkeypatch):
    # Operational display is distinct from failed calibration approval.
    monkeypatch.setattr(index, 'OPERATIONAL_ENABLED', True)
    assert index.CALIBRATION_APPROVED is False


def packet(volts=index.CLEAR_ADC_VOLTS, **overrides):
    value = index.index_from_voltage(volts)
    return {'water_level_percentage': 78, 'turbidity_ntu': None, 'tds_ppm': None,
            'turbidity_index': round(value, 2) if value is not None else None,
            'turbidity_index_model': index.MODEL, 'turbidity_index_provisional': True,
            'turbidity_index_calibration_approved': False, 'turbidity_raw_adc': 985,
            'turbidity_adc_voltage': round(volts, 4), 'turbidity_module_voltage': round(volts * 1.665, 4),
            'turbidity_signal_valid': True, 'turbidity_sample_age_ms': 350,
            'turbidity_ntu_calibrated': False, 'calibration_required': True,
            **overrides}


def test_measured_mapping_noise_margin_and_direction():
    assert index.index_from_voltage(.836) == 0
    assert index.index_from_voltage(.645) == pytest.approx(10)
    assert index.index_from_voltage(.830) == pytest.approx(.31413612565)
    assert index.index_from_voltage(.7405) == pytest.approx(5)
    assert index.index_from_voltage(.824) < .7
    assert index.index_from_voltage(.715) > 6
    assert index.RECOVERY_THRESHOLD == 4.3
    assert index.WARNING_THRESHOLD - index.RECOVERY_THRESHOLD == pytest.approx(.7)
    assert .013 / .191 * 10 <= .7
    assert index.index_from_voltage(.15) > index.index_from_voltage(.2)
    for invalid in (None, True, '0.816', float('nan'), float('inf'), 10**500, .149, 3.101):
        assert index.index_from_voltage(invalid) is None


def test_exact_entry_recovery_debounce_and_cooldown(system, monkeypatch):
    client, headers, _ = system
    pushes = []
    monkeypatch.setattr(server, 'send_web_push', lambda **kw: pushes.append(kw))
    def post(value):
        volts = index.CLEAR_ADC_VOLTS - value * (index.CLEAR_ADC_VOLTS - index.CLOUDY_ADC_VOLTS) / 10
        reply = client.post('/api/iot/telemetry', json=packet(volts), headers=DEVICE)
        assert reply.status_code == 200
        return reply.json['turbidity_index_status']
    assert post(4.99) == 'Normal'
    assert post(5.0) == 'Normal'  # First confirmation, exact entry boundary.
    assert post(4.99) == 'Normal'  # Noise cancels pending entry.
    assert post(5.0) == 'Normal'
    assert post(5.0) == 'Elevated'
    for _ in range(12):
        assert post(6) == 'Elevated'
    assert post(4.31) == 'Elevated'
    assert post(4.30) == 'Elevated'
    assert post(4.31) == 'Elevated'  # Noise cancels pending recovery.
    assert post(4.30) == 'Elevated'
    assert post(4.30) == 'Normal'
    assert len(pushes) == 1
    assert 'not NTU' in pushes[0]['body'] and 'safety certification' in pushes[0]['body']
    poll = client.get('/api/notifications/poll', headers=headers['worker']).json
    assert not poll['is_contaminated'] and not poll['is_turbidity_elevated']
    with db_adapter.get_db() as db:
        db.execute('SELECT message FROM announcements')
        rows = db.fetchall()
        assert len(rows) == 1 and 'TURBIDITY INDEX ALERT' in rows[0]['message']


@pytest.mark.parametrize('changes', [
    {'turbidity_signal_valid': False}, {'turbidity_signal_valid': 1},
    {'turbidity_raw_adc': 0}, {'turbidity_raw_adc': 4095},
    {'turbidity_sample_age_ms': 2001}, {'turbidity_sample_age_ms': None},
    {'turbidity_adc_voltage': None}, {'turbidity_adc_voltage': .1},
    {'turbidity_module_voltage': 4}, {'turbidity_index': 9},
    {'turbidity_index': None},
])
def test_unusable_index_null_preserves_other_sensors(system, changes):
    client, headers, _ = system
    result = client.post('/api/iot/telemetry', json=packet(**changes), headers=DEVICE)
    assert result.status_code == 200
    assert result.json['water_level_percentage'] == 78 and result.json['tds_ppm'] is None
    assert result.json['turbidity_index'] is None and result.json['turbidity_index_status'] == 'Unavailable'
    assets = client.get('/api/all-data', headers=headers['admin']).json['centralAssets']
    assert assets['main_tank_level'] == 78 and assets['turbidity_index_status'] == 'Unavailable'
    with db_adapter.get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0


@pytest.mark.parametrize('changes', [
    {'turbidity_index': True}, {'turbidity_index': -1}, {'turbidity_index': float('nan')},
    {'turbidity_index': 101}, {'turbidity_index_model': 'unknown'},
    {'turbidity_sample_age_ms': float('inf')}, {'turbidity_raw_adc': True},
])
def test_malformed_index_rejected(system, changes):
    client, _, _ = system
    assert client.post('/api/iot/telemetry', json=packet(**changes), headers=DEVICE).status_code == 400


def test_index_separate_history_freshness_and_legacy_zero(system):
    client, headers, _ = system
    legacy = {'water_level_percentage': 0, 'turbidity_ntu': 34.9, 'tds_ppm': 0}
    assert client.post('/api/iot/telemetry', json=legacy, headers=DEVICE).status_code == 200
    result = client.get('/api/iot/latest', headers=headers['admin']).json
    assert result['turbidity_ntu'] == 34.9 and result['turbidity_index'] is None
    for _ in range(2):
        assert client.post('/api/iot/telemetry', json=packet(index.CLOUDY_ADC_VOLTS), headers=DEVICE).status_code == 200
    for role in ('admin', 'HH-1', 'worker'):
        latest = client.get('/api/iot/latest', headers=headers[role]).json
        assets = client.get('/api/all-data', headers=headers[role]).json['centralAssets']
        poll = client.get('/api/notifications/poll', headers=headers[role]).json
        assert latest['turbidity_ntu'] is None and latest['tds_ppm'] is None
        assert latest['turbidity_index'] == 10 and latest['turbidity_index_status'] == 'Elevated'
        assert assets['turbidity_status'] == 'warning' and assets['main_tank_level'] == 78
        assert not poll['is_contaminated'] and poll['is_turbidity_elevated']
        assert 'not NTU' in latest['turbidity_index_disclaimer']
    with db_adapter.get_db() as db:
        db.execute('SELECT turbidity_ntu,tds_ppm,turbidity_index_json FROM reservoir_quality_readings ORDER BY reading_id')
        rows = db.fetchall()
        assert rows[0] == {'turbidity_ntu': 34.9, 'tds_ppm': 0, 'turbidity_index_json': None}
        assert json.loads(rows[2]['turbidity_index_json'])['status'] == 'Elevated'
        db.execute('UPDATE reservoir_quality_readings SET recorded_at=? WHERE reading_id=(SELECT MAX(reading_id) FROM reservoir_quality_readings)',
                   ((datetime.datetime.now(datetime.timezone.utc)-datetime.timedelta(seconds=121)).isoformat(),))
    latest = client.get('/api/iot/latest', headers=headers['admin']).json
    assert latest['turbidity_index'] is None and latest['turbidity_index_status'] == 'Unavailable'
    assert latest['water_level_percentage'] == 78
    assert not client.get('/api/notifications/poll', headers=headers['HH-1']).json['is_turbidity_elevated']


def test_additive_migration_repeat_keeps_existing_history(system):
    client, _, _ = system
    assert client.post('/api/iot/telemetry', json=packet(), headers=DEVICE).status_code == 200
    with db_adapter.get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings')
        before = db.fetchall()
    db_adapter.init_db()
    db_adapter.init_db()
    with db_adapter.get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings')
        assert db.fetchall() == before


def test_corrupt_or_future_history_is_unavailable():
    assert index.public_metadata({'turbidity_index_json': 'bad', 'recorded_at': 'bad'})['turbidity_index'] is None
    data = packet()
    now = datetime.datetime.now(datetime.timezone.utc)
    record = index.prepare_record(data, None, now)
    row = {'turbidity_index_json': json.dumps(record), 'recorded_at': (now+datetime.timedelta(minutes=1)).isoformat()}
    assert index.public_metadata(row, now)['turbidity_index_status'] == 'Unavailable'


def test_disabled_operational_model_keeps_numeric_output_disabled(system, monkeypatch):
    monkeypatch.setattr(index, 'OPERATIONAL_ENABLED', False)
    client, headers, _ = system
    for volts in (.836, .645, .830):
        reply = client.post('/api/iot/telemetry', json=packet(volts), headers=DEVICE)
        assert reply.status_code == 200
        assert reply.json['turbidity_index'] is None
        assert reply.json['turbidity_index_status'] == 'Unavailable'
        assert reply.json['turbidity_index_calibration_approved'] is False
        assert reply.json['water_level_percentage'] == 78 and reply.json['tds_ppm'] is None
    latest = client.get('/api/iot/latest', headers=headers['admin']).json
    assert latest['turbidity_index'] is None
    with db_adapter.get_db() as db:
        db.execute('SELECT turbidity_index_json FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1')
        diagnostics = json.loads(db.fetchone()['turbidity_index_json'])
        assert diagnostics['adc_voltage'] == .830 and diagnostics['value'] is None
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0


def test_latest_measured_clear_return_recovers_without_offsets(system):
    client, _, _ = system
    for volts in (.836, .645, .645, .830, .830):
        reply = client.post('/api/iot/telemetry', json=packet(volts), headers=DEVICE)
        assert reply.status_code == 200
    assert reply.json['turbidity_index'] == .31
    assert reply.json['turbidity_index_status'] == 'Normal'


def test_provisional_output_preserves_failed_return_drift(system):
    client, headers, _ = system
    response = client.post('/api/iot/telemetry', json=packet(.921), headers=DEVICE)
    assert response.status_code == 200
    assert response.json['turbidity_index'] == 0
    assert response.json['turbidity_index_status'] == 'Normal'
    assert response.json['turbidity_index_provisional'] is True
    assert response.json['turbidity_index_calibration_approved'] is False
    assert response.json['turbidity_index_operational_enabled'] is True
    assert response.json['turbidity_index_baseline_drift_unresolved'] is True
    assert response.json['turbidity_ntu'] is None and response.json['tds_ppm'] is None
    with db_adapter.get_db() as db:
        db.execute('SELECT turbidity_index_json FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1')
        record = json.loads(db.fetchone()['turbidity_index_json'])
        assert record['baseline_offset_adc_volts'] == pytest.approx(.085)
        assert record['index_unclamped'] == pytest.approx(-4.45026178)
        assert record['adc_voltage'] == .921 and record['raw_adc'] == 985
        assert record['provisional'] is True and record['calibration_approved'] is False
    latest = client.get('/api/iot/latest', headers=headers['admin']).json
    assert 'unresolved' in latest['turbidity_index_disclaimer']
