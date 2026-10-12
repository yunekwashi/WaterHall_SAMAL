"""History reads stored facts without recomputing live sensor or freshness state."""
import datetime as dt
import json

import pytest
from werkzeug.datastructures import MultiDict
from werkzeug.exceptions import BadRequest

from backend import sensor_history
from backend.db_adapter import get_db

NOW = dt.datetime(2026, 10, 12, 6, tzinfo=dt.timezone.utc)


def seed(at, water=80, turbidity=0, tds=2, status='Normal'):
    with get_db() as db:
        db.execute('''INSERT INTO reservoir_quality_readings
            (recorded_at, water_level_percentage, turbidity_ntu, tds_ppm,
             turbidity_index_json, tds_index_json) VALUES (?, ?, ?, ?, ?, ?)''',
            (at, water, None, None, json.dumps({'value': turbidity, 'status': status, 'raw_adc': 900}),
             json.dumps({'value': tds, 'status': status, 'raw_adc': 1100})))


def read(**args):
    with get_db() as db:
        return sensor_history.history(db, MultiDict(args), NOW)


def test_authorization(system):
    client, headers, _ = system
    assert client.get('/api/iot/history').status_code == 401
    for role in ['worker', 'other-worker', 'HH-1', 'HH-2']:
        assert client.get('/api/iot/history', headers=headers[role]).status_code == 403
    result = client.get('/api/iot/history', headers=headers['admin'])
    assert result.status_code == 200
    assert result.json['readings'] == []
    assert result.json['page_size'] == 25


@pytest.mark.parametrize('selected,expected', [
    ('today', ['2026-10-12 15:59:59', '2026-10-11 16:00:00']),
    ('yesterday', ['2026-10-11 15:59:59']),
    ('week', ['2026-10-12 16:00:00', '2026-10-12 15:59:59', '2026-10-11 16:00:00']),
])
def test_local_calendar_boundaries(empty_database, selected, expected):
    for at in ['2026-10-11 15:59:59', '2026-10-11 16:00:00',
               '2026-10-12 15:59:59', '2026-10-12 16:00:00']:
        seed(at)
    result = read(filter=selected, utc_offset_minutes='480')
    assert [r['recorded_at'] for r in result['readings']] == expected


def test_custom_single_and_inclusive_range(empty_database):
    seed('2026-10-10 16:00:00')
    seed('2026-10-12 15:59:59')
    seed('2026-10-12 16:00:00')
    result = read(filter='custom', start_date='2026-10-11', end_date='2026-10-12')
    assert len(result['readings']) == 2
    assert len(read(filter='custom', start_date='2026-10-11', end_date='2026-10-11')['readings']) == 1


def test_bounded_cursor_pagination_with_ties_and_new_insert(empty_database):
    for number in range(55):
        seed('2026-10-12 06:00:00', water=number)
    first = read()
    assert len(first['readings']) == 25 and first['has_more']
    assert [r['water_level_percentage'] for r in first['readings']] == list(range(54, 29, -1))
    seed('2026-10-12 06:00:01', water=99)
    second = read(cursor=first['next_cursor'])
    third = read(cursor=second['next_cursor'])
    assert [r['water_level_percentage'] for r in second['readings'] + third['readings']] == list(range(29, -1, -1))
    assert not third['has_more'] and third['next_cursor'] is None
    assert len(read(page_size='50')['readings']) == 50
    with pytest.raises(BadRequest):
        read(filter='yesterday', cursor=first['next_cursor'])


@pytest.mark.parametrize('water,turbidity,tds,status', [
    (None, None, None, 'Unavailable'), (0, 0, 0, 'Normal'),
    (82, 6.34, 2.83, 'Elevated'),
])
def test_exact_values_null_zero_and_historical_status(empty_database, water, turbidity, tds, status):
    seed('2026-10-12 00:00:00', water, turbidity, tds, status)
    row = read()['readings'][0]
    assert row == {'recorded_at': '2026-10-12 00:00:00', 'water_level_percentage': water,
                   'turbidity_index': turbidity, 'turbidity_status': status,
                   'tds_index': tds, 'tds_status': status}
    # Six-hour-old readings retain their recorded status and contain no internal diagnostics.
    assert 'raw_adc' not in json.dumps(row)


@pytest.mark.parametrize('turbidity,tds', [(None, 2.83), (6.34, None)])
def test_independently_unavailable_sensor_does_not_hide_valid_fields(empty_database, turbidity, tds):
    seed('2026-10-12 00:00:00', 82, turbidity, tds)
    row = read()['readings'][0]
    assert row['water_level_percentage'] == 82
    for sensor, value in [('turbidity', turbidity), ('tds', tds)]:
        assert row[sensor + '_index'] == value
        assert row[sensor + '_status'] == ('Unavailable' if value is None else 'Normal')


def test_legacy_values_are_not_indexes_or_zero_sentinels(empty_database):
    with get_db() as db:
        db.execute('''INSERT INTO reservoir_quality_readings
            (recorded_at, water_level_percentage, turbidity_ntu, tds_ppm, turbidity_index_json, tds_index_json)
            VALUES (?, ?, ?, ?, ?, ?)''', ('2026-10-12 00:00:00', None, 30, 500, 'broken', '{}'))
    row = read()['readings'][0]
    assert row['water_level_percentage'] is None
    for sensor in ['tds', 'turbidity']:
        assert row[sensor + '_index'] is None
        assert row[sensor + '_status'] == 'Unavailable'


def test_bad_parameters_and_parameterized_query(empty_database):
    invalid = [dict(filter='all'), dict(page_size='0'), dict(page_size='51'), dict(page_size='1.5'),
               dict(page_size='999999999'), dict(utc_offset_minutes='841'), dict(utc_offset_minutes='NaN'),
               dict(filter='custom'), dict(filter='custom', start_date='2026-02-30', end_date='2026-03-01'),
               dict(filter='custom', start_date='2026-10-12', end_date='2026-10-11'),
               dict(filter='custom', start_date='2026-01-01', end_date='2026-10-12'),
               dict(filter='custom', start_date="2026-01-01' OR 1=1--", end_date='2026-10-12'),
               dict(start_date='2026-10-12'), dict(cursor=''), dict(cursor='bm90IGpzb24'), dict(cursor='e30'),
               dict(cursor='a' * 513), dict(page='1'), dict(diagnostics='true')]
    for args in invalid:
        with pytest.raises(BadRequest):
            read(**args)
    with get_db() as db, pytest.raises(BadRequest):
        sensor_history.history(db, MultiDict([('page_size', '25'), ('page_size', '50')]), NOW)


def test_history_endpoint_does_not_mutate_data(system):
    client, headers, _ = system
    now = dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    seed(now)
    with get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings')
        before = db.fetchall()
    result = client.get('/api/iot/history', headers=headers['admin'])
    assert result.status_code == 200 and len(result.json['readings']) == 1
    with get_db() as db:
        db.execute('SELECT * FROM reservoir_quality_readings')
        assert db.fetchall() == before
    assert client.get('/api/iot/latest', headers=headers['admin']).status_code == 200
