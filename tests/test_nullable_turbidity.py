"""Focused proposal checks, using disposable test databases only."""
import datetime
from types import SimpleNamespace
import pytest
from backend import db_adapter, server

DEVICE = {'X-IoT-Secret': server.IOT_DEVICE_SECRET}
BASE = {'water_level_percentage': 78, 'turbidity_ntu': None, 'tds_ppm': None}

@pytest.mark.parametrize('endpoint', ['/api/iot/telemetry', '/api/iot/update'])
@pytest.mark.parametrize('key', ['turbidity_ntu', 'turbidity'])
@pytest.mark.parametrize('tds', [None, 0, 137])
def test_explicit_null_turbidity_persists_other_sensors(system, endpoint, key, tds):
    client, headers, _ = system
    payload = {'water_level_percentage': 78, key: None, 'tds_ppm': tds}
    result = client.post(endpoint, json=payload, headers=DEVICE)
    assert result.status_code == 200 and result.json['turbidity_ntu'] is None
    with db_adapter.get_db() as db:
        db.execute('SELECT water_level_percentage,turbidity_ntu,tds_ppm FROM reservoir_quality_readings ORDER BY reading_id DESC LIMIT 1')
        assert dict(db.fetchone()) == {**BASE, 'tds_ppm': tds}
        db.execute('SELECT COUNT(*) AS n FROM announcements')
        assert db.fetchone()['n'] == 0
    for role in ['admin', 'HH-1', 'worker']:
        latest = client.get('/api/iot/latest', headers=headers[role])
        assert latest.status_code == 200 and latest.json['turbidity_ntu'] is None and latest.json['turbidity'] is None
        assets = client.get('/api/all-data', headers=headers[role]).json['centralAssets']
        assert assets['main_tank_level'] == 78 and assets['tds_ppm'] == tds and assets['has_reading']
        assert assets['turbidity'] is None and assets['turbidity_status'] == 'unknown'
        assert assets['turbidity_desc'] == 'Awaiting turbidity readings'

@pytest.mark.parametrize('value', [0, 5, 10000, '12.3'])
def test_numeric_turbidity_validation_and_zero_unchanged(system, value):
    client, headers, _ = system
    result = client.post('/api/iot/telemetry', json={**BASE, 'turbidity_ntu': value}, headers=DEVICE)
    assert result.status_code == 200 and result.json['turbidity_ntu'] == float(value)
    assets = client.get('/api/all-data', headers=headers['admin']).json['centralAssets']
    assert assets['turbidity'] == float(value)
    assert assets['turbidity_status'] == 'unknown'
    assert assets['calibration_required'] and not assets['turbidity_ntu_calibrated']

@pytest.mark.parametrize('value', [-1, 10001, True, False, '', 'unavailable', float('nan'), float('inf')])
def test_non_null_invalid_turbidity_still_rejected(system, value):
    client, _, _ = system
    assert client.post('/api/iot/telemetry', json={**BASE, 'turbidity_ntu': value}, headers=DEVICE).status_code == 400
    with db_adapter.get_db() as db:
        db.execute('SELECT COUNT(*) AS n FROM reservoir_quality_readings')
        assert db.fetchone()['n'] == 0

def test_missing_turbidity_and_device_auth_unchanged(system):
    client, _, _ = system
    assert client.post('/api/iot/telemetry', json={'water_level_percentage': 78, 'tds_ppm': None}, headers=DEVICE).status_code == 400
    assert client.post('/api/iot/telemetry', json=BASE).status_code == 401
    assert client.post('/api/iot/telemetry', json=BASE, headers={'X-IoT-Secret': 'incorrect'}).status_code == 401

def test_all_null_is_honest_unknown_not_zero(system):
    client, headers, _ = system
    result = client.post('/api/iot/telemetry', json={**BASE, 'water_level_percentage': None}, headers=DEVICE)
    assert result.status_code == 200
    assets = client.get('/api/all-data', headers=headers['admin']).json['centralAssets']
    assert assets['main_tank_level'] is None and assets['turbidity'] is None and assets['tds_ppm'] is None
    assert assets['has_reading'] and assets['last_updated']

def test_null_turbidity_keeps_low_water_alert_and_hourly_cooldown(system, monkeypatch):
    client, _, _ = system
    instant = [datetime.datetime(2026, 10, 9, tzinfo=datetime.timezone.utc)]
    class Clock(datetime.datetime):
        @classmethod
        def now(cls, tz=None):
            return instant[0].astimezone(tz) if tz else instant[0].replace(tzinfo=None)
    monkeypatch.setattr(server, 'datetime', SimpleNamespace(datetime=Clock, timedelta=datetime.timedelta, timezone=datetime.timezone))
    pushes = []
    monkeypatch.setattr(server, 'send_web_push', lambda **kwargs: pushes.append(kwargs))
    for _ in range(12):
        result = client.post('/api/iot/telemetry', json={**BASE, 'water_level_percentage': 15}, headers=DEVICE)
        assert result.status_code == 200
        instant[0] += datetime.timedelta(seconds=10)
    with db_adapter.get_db() as db:
        db.execute('SELECT message FROM announcements')
        rows = db.fetchall()
        assert len(rows) == 1 and 'LOW WATER ALERT' in rows[0]['message']
    assert len(pushes) == 1
    instant[0] += datetime.timedelta(hours=1)
    assert client.post('/api/iot/telemetry', json={**BASE, 'water_level_percentage': 15}, headers=DEVICE).status_code == 200
    assert len(pushes) == 2
