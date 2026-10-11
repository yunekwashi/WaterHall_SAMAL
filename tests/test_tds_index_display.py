"""Shared 60-second UI expiry; TDS does not independently recalculate status."""
import json
from pathlib import Path
import shutil
import subprocess

import pytest

HELPER = Path(__file__).resolve().parents[1] / 'web/ui-display.js'
NOW = 1791720000000


@pytest.mark.parametrize('age,change,expected', [
    (0, {}, {'value': 10, 'status': 'Elevated'}),
    (60000, {}, {'value': 10, 'status': 'Elevated'}),
    (60001, {}, {'value': None, 'status': 'Unavailable'}),
    (-1, {}, {'value': None, 'status': 'Unavailable'}),
    (0, {'tds_index': 0, 'tds_index_status': 'Normal'}, {'value': 0, 'status': 'Normal'}),
    (0, {'tds_index': None}, {'value': None, 'status': 'Unavailable'}),
    (0, {'tds_index': True}, {'value': None, 'status': 'Unavailable'}),
    (0, {'tds_index_status': 'unknown'}, {'value': None, 'status': 'Unavailable'}),
    (0, {'tds_index_status': 'Normal'}, {'value': 10, 'status': 'Normal'}),
    (0, {'last_updated': None}, {'value': None, 'status': 'Unavailable'}),
])
def test_shared_status_freshness_and_numeric_zero(age, change, expected):
    data = {'last_updated': '2026-10-11T12:00:00Z', 'has_reading': True,
            'tds_index': 10, 'tds_index_status': 'Elevated', **change}
    script = """
const fs=require('fs'),vm=require('vm'),input=JSON.parse(fs.readFileSync(0,'utf8'));
const context={window:{}};vm.runInNewContext(fs.readFileSync(input.helper,'utf8'),context);
const before=JSON.stringify(input.data),display=context.window.WaterHallDisplay;
const state=display.tdsIndexState(input.data,input.now);
const recovery=display.tdsIndexState(input.data,1791720000000);
process.stdout.write(JSON.stringify({state,recovery,unchanged:before===JSON.stringify(input.data)}));
"""
    reply = subprocess.run([shutil.which('node'), '-e', script], input=json.dumps(
        {'helper': str(HELPER), 'data': data, 'now': NOW+age}),
        capture_output=True, text=True, check=True)
    result = json.loads(reply.stdout)
    assert result['state'] == expected and result['unchanged']
    if age == 60001:
        assert result['recovery'] == {'value': 10, 'status': 'Elevated'}
