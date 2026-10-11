"""Shared browser helper contracts, independent of the local timezone or sensors."""
import json
from pathlib import Path
import shutil
import subprocess

import pytest

HELPER = Path(__file__).resolve().parents[1] / 'web' / 'ui-display.js'
NOW = 1791720000000  # 2026-10-11T12:00:00Z
BASE = {'has_reading': True, 'last_updated': '2026-10-11T12:00:00Z',
        'main_tank_level': 78, 'turbidity_index': 8, 'turbidity_index_status': 'Elevated',
        'tds_ppm': None}


def evaluate(data, now=NOW):
    script = """
const fs = require('fs'), vm = require('vm');
const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(input.helper, 'utf8'), context);
const display = context.window.WaterHallDisplay, before = JSON.stringify(input.data);
const fresh = display.telemetryFreshness(input.data, input.now);
const index = display.turbidityIndexState(input.data, input.now);
process.stdout.write(JSON.stringify({fresh, index, threshold: display.TELEMETRY_STALE_AFTER_MS,
  unchanged: before === JSON.stringify(input.data)}));
"""
    result = subprocess.run([shutil.which('node'), '-e', script], input=json.dumps(
        {'helper': str(HELPER), 'data': data, 'now': now}), text=True,
        capture_output=True, check=True)
    return json.loads(result.stdout)


@pytest.mark.parametrize('age_ms,fresh', [(0, True), (30000, True), (60000, True),
                                         (60001, False), (61000, False), (-1, False)])
def test_shared_inclusive_boundary(age_ms, fresh):
    result = evaluate(BASE, NOW + age_ms)
    assert result['threshold'] == 60000
    assert result['fresh']['fresh'] is fresh
    assert result['index'] == ({'value': 8, 'status': 'Elevated'} if fresh else
                              {'value': None, 'status': 'Unavailable'})
    assert result['unchanged']


@pytest.mark.parametrize('stamp', ['2026-10-11 12:00:00', '2026-10-11T12:00:00Z',
    '2026-10-11T12:00:00.000000+00:00', '2026-10-11T20:00:00+08:00',
    '2026-10-11T08:00:00-04:00', '2026-10-11T20:00:00+0800',
    ' 2026-10-11T12:00:00Z '])
def test_naive_utc_and_aware_timestamps_share_the_same_instant(stamp):
    result = evaluate({**BASE, 'last_updated': stamp})
    assert result['fresh']['fresh'] and result['fresh']['ageMs'] == 0
    assert result['unchanged']


@pytest.mark.parametrize('stamp', [None, '', 'not-a-date', '2026-10-11',
    '2026-02-30T12:00:00Z', '2026-13-11T12:00:00Z', '2026-10-11T24:00:00Z',
    '2026-10-11T12:60:00Z', '2026-10-11T12:00:60Z', '2026-10-11T12:00:00+25:00'])
def test_missing_or_malformed_timestamp_fails_closed(stamp):
    result = evaluate({**BASE, 'last_updated': stamp})
    assert not result['fresh']['fresh']
    assert result['index'] == {'value': None, 'status': 'Unavailable'}
    assert result['unchanged']


@pytest.mark.parametrize('changes', [{'has_reading': False}, {'is_fresh': False}])
def test_server_unavailable_flags_are_respected(changes):
    assert not evaluate({**BASE, **changes})['fresh']['fresh']


def test_latest_endpoint_timestamp_and_partial_nulls_preserve_the_payload():
    packet = {**BASE, 'recorded_at': BASE['last_updated'], 'main_tank_level': None,
              'tds_ppm': 0}
    del packet['last_updated']
    result = evaluate(packet)
    assert result['fresh']['fresh'] and result['index']['value'] == 8
    assert result['unchanged'] and packet['tds_ppm'] == 0


def test_fresh_all_null_sensors_are_not_invented():
    packet = {**BASE, 'main_tank_level': None, 'turbidity_index': None,
              'turbidity_index_status': 'Unavailable'}
    result = evaluate(packet)
    assert result['fresh']['fresh']
    assert result['index'] == {'value': None, 'status': 'Unavailable'}
    assert result['unchanged'] and packet['tds_ppm'] is None
