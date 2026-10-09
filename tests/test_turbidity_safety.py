"""Calibration-aware alert checks against disposable test databases only."""
import datetime
from types import SimpleNamespace

import pytest
from backend import db_adapter, server

DEVICE = {'X-IoT-Secret': server.IOT_DEVICE_SECRET}
BASE = {'water_level_percentage': 78, 'turbidity_ntu': 34.9, 'tds_ppm': None}
CALIBRATED = {'turbidity_signal_valid': True, 'turbidity_ntu_calibrated': True,
              'turbidity_provisional': False, 'turbidity_sample_age_ms': 350}

BLOCKED = [
    {}, {'calibration_required': False}, {'calibration_required': True},
    {**CALIBRATED, 'turbidity_signal_valid': False},
    {**CALIBRATED, 'turbidity_signal_valid': 1},
    {**CALIBRATED, 'turbidity_signal_valid': 'true'},
    {**CALIBRATED, 'turbidity_ntu_calibrated': False},
    {**CALIBRATED, 'turbidity_ntu_calibrated': 1},
    {**CALIBRATED, 'turbidity_ntu_calibrated': 'true'},
    {**CALIBRATED, 'turbidity_provisional': True},
    {**CALIBRATED, 'turbidity_provisional': 0},
    {**CALIBRATED, 'turbidity_sample_age_ms': None},
    {**CALIBRATED, 'turbidity_sample_age_ms': True},
    {**CALIBRATED, 'turbidity_sample_age_ms': '350'},
    {**CALIBRATED, 'turbidity_sample_age_ms': -1},
    {**CALIBRATED, 'turbidity_sample_age_ms': 2001},
    {**CALIBRATED, 'turbidity_sample_age_ms': float('nan')},
    {**CALIBRATED, 'turbidity_sample_age_ms': float('inf')},
]
BLOCKED += [{k: v for k, v in CALIBRATED.items() if k != omitted}
            for omitted in CALIBRATED]

@pytest.mark.parametrize('evidence', BLOCKED)
def test_untrusted_numeric_ntu_never_creates_quality_alert(system, monkeypatch, evidence):
    client, _, _ = system
    pushes = []
    monkeypatch.setattr(server, 'send_web_push', lambda **kwargs: pushes.append(kwargs))
    result = client.post('/api/iot/telemetry', json={**BASE, **evidence}, headers=DEVICE)
    assert result.status_code == 200
    # Numeric ingestion/history are backward compatible; only alert eligibility changes.
    with db_adapter.get_db() as db:
        db.execute('SELECT water_level_percentage,turbidity_ntu,tds_ppm FROM reservoir_quality_readings')
        assert dict(db.fetchone()) == BASE
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0
    assert pushes == []

@pytest.mark.parametrize('endpoint', ['/api/iot/telemetry', '/api/iot/update'])
@pytest.mark.parametrize('value', [None, 0, 5])
def test_null_zero_and_threshold_boundary_do_not_alert(system, endpoint, value):
    client, _, _ = system
    result = client.post(endpoint, json={**BASE, **CALIBRATED, 'turbidity_ntu': value}, headers=DEVICE)
    assert result.status_code == 200 and result.json['turbidity_ntu'] == value
    with db_adapter.get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0

@pytest.mark.parametrize('endpoint', ['/api/iot/telemetry', '/api/iot/update'])
def test_calibrated_fresh_quality_alert_retains_hourly_cooldown(system, monkeypatch, endpoint):
    client, _, _ = system
    instant = [datetime.datetime(2026, 10, 9, tzinfo=datetime.timezone.utc)]
    class Clock(datetime.datetime):
        @classmethod
        def now(cls, tz=None):
            return instant[0].astimezone(tz) if tz else instant[0].replace(tzinfo=None)
    monkeypatch.setattr(server, 'datetime', SimpleNamespace(datetime=Clock,
        timedelta=datetime.timedelta, timezone=datetime.timezone))
    pushes = []
    monkeypatch.setattr(server, 'send_web_push', lambda **kwargs: pushes.append(kwargs))
    # Other sensors still need calibration: per-turbidity evidence is independent.
    data = {**BASE, **CALIBRATED, 'calibration_required': True}
    for _ in range(12):
        assert client.post(endpoint, json=data, headers=DEVICE).status_code == 200
        instant[0] += datetime.timedelta(seconds=10)
    with db_adapter.get_db() as db:
        db.execute('SELECT message FROM announcements')
        rows = db.fetchall()
        assert len(rows) == 1 and 'WATER QUALITY ALERT' in rows[0]['message']
    assert len(pushes) == 1
    instant[0] += datetime.timedelta(hours=1)
    assert client.post(endpoint, json=data, headers=DEVICE).status_code == 200
    assert len(pushes) == 2

def test_untrusted_turbidity_does_not_block_low_water_alert(system, monkeypatch):
    client, _, _ = system
    pushes = []
    monkeypatch.setattr(server, 'send_web_push', lambda **kwargs: pushes.append(kwargs))
    assert client.post('/api/iot/telemetry', json={**BASE,
        'water_level_percentage': 15, 'turbidity_ntu_calibrated': False}, headers=DEVICE).status_code == 200
    with db_adapter.get_db() as db:
        db.execute('SELECT message FROM announcements')
        rows = db.fetchall()
        assert len(rows) == 1 and 'LOW WATER ALERT' in rows[0]['message']
    assert len(pushes) == 1


def test_extremely_large_age_is_ineligible_not_a_server_error(system):
    client, _, _ = system
    payload = {**BASE, **CALIBRATED, 'turbidity_sample_age_ms': 10 ** 500}
    assert client.post('/api/iot/telemetry', json=payload, headers=DEVICE).status_code == 200
    with db_adapter.get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0


@pytest.mark.parametrize('value', [None, 0, 34.9])
def test_unverified_stored_values_never_certify_quality_on_read(system, value):
    client, headers, _ = system
    # Legacy/provisional records retain real numeric history and valid level/TDS.
    with db_adapter.get_db() as db:
        db.execute('INSERT INTO reservoir_quality_readings '
                   '(water_level_percentage,turbidity_ntu,tds_ppm,recorded_at) VALUES (?,?,?,?)',
                   (15, value, 123, '2026-10-09 01:00:00'))
    for role in ('admin', 'HH-1', 'worker'):
        latest = client.get('/api/iot/latest', headers=headers[role]).json
        assert latest['water_level_percentage'] == 15 and latest['turbidity_ntu'] == value
        assert latest['tds_ppm'] == 123 and latest['calibration_required'] is True
        assert latest['turbidity_ntu_calibrated'] is latest['tds_ppm_calibrated'] is False
        assert 'do not certify drinking-water safety' in latest['measurement_disclaimer']
        assets = client.get('/api/all-data', headers=headers[role]).json['centralAssets']
        assert assets['main_tank_level'] == 15 and assets['turbidity'] == value
        assert assets['tds_ppm'] == 123 and assets['turbidity_status'] == 'unknown'
        assert assets['calibration_required'] is True
        poll = client.get('/api/notifications/poll', headers=headers[role]).json
        assert not poll['is_contaminated'] and poll['is_low_level']
        assert poll['telemetry']['turbidity_ntu'] == value


def test_no_reading_still_exposes_uncertified_status(system):
    client, headers, _ = system
    latest = client.get('/api/iot/latest', headers=headers['admin']).json
    assert latest['status'] == 'awaiting_sensor' and latest['recorded_at'] is None
    assert latest['calibration_required'] is True
    assets = client.get('/api/all-data', headers=headers['admin']).json['centralAssets']
    assert not assets['has_reading'] and assets['turbidity_status'] == 'unknown'
    assert assets['calibration_required'] is True
    poll = client.get('/api/notifications/poll', headers=headers['worker']).json
    assert not poll['is_contaminated'] and not poll['is_low_level']
