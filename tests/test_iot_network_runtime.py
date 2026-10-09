"""Exercise actual firmware control flow with isolated network/RTOS substitutes.

These deterministic failure tests model concurrent sampling while a network
operation waits. COM3 captures separately verify the real FreeRTOS scheduling.
"""
import os
import re
from pathlib import Path
import shutil
import subprocess

import pytest

ROOT = Path(__file__).resolve().parents[1]
CASES = [
    'http_failure_sampling', 'http_timeout_sampling', 'wifi_failure_sampling',
    'ntp_failure_sampling', 'latest_after_network_recovery',
    'stale_never_posted_individual_nulls', 'cadence_and_next_request_current',
    'serial_commands_bounded',
    'http_failure_recovers_after_backoff', 'wifi_failure_recovers_after_backoff',
    'ntp_failure_recovers_after_backoff', 'wifi_autorecovery_initializes_ntp',
]


@pytest.fixture(scope='module')
def network_test_executable(tmp_path_factory):
    output = tmp_path_factory.mktemp('iot-network-native')
    return build_network_test(output, ['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY'])


def build_network_test(output, definitions, expect_failure=False, approve_local_index_fixture=None):
    firmware = ROOT / 'iot/waterhall_esp32_reservoir'
    stubs = ROOT / 'tests/cpp/network_stubs'
    # Copy the exact sketch so its quoted private include resolves to a temporary
    # dummy header. The real ignored device_config.h is never read by these tests.
    (output / 'waterhall_test_firmware.inc').write_bytes(
        (firmware / 'waterhall_esp32_reservoir.ino').read_bytes())
    (output / 'device_config.h').write_text(
        'const char WIFI_SSID[] = "native-test";\n'
        'const char WIFI_PASSWORD[] = "native-test";\n'
        'const char SERVER_BASE_URL[] = "https://example.invalid";\n'
        f'const char IOT_DEVICE_SECRET[] = "{"x" * 32}";\n'
        'const char ROOT_CA[] = "native-test-root";\n'
        'constexpr bool ALLOW_INSECURE_LOCAL_HTTP = false;\n')
    # Test the public build switches. One isolated, explicitly approved fixture
    # exercises future numeric transport; the actual public approval stays false.
    for name in ('sensor_runtime.h', 'sensor_processing.h', 'sensor_config.h'):
        source_text = (firmware / name).read_text()
        if name == 'sensor_config.h' and approve_local_index_fixture is not None:
            source_text, changed = re.subn(r'(constexpr bool TURBIDITY_LOCAL_INDEX_OPERATIONAL_ENABLED = )(?:false|true)(;)',
                r'\g<1>' + ('true' if approve_local_index_fixture else 'false') + r'\g<2>', source_text)
            assert changed == 1
        (output / name).write_text(source_text)
    source = ROOT / 'tests/cpp/test_iot_network_runtime.cpp'
    executable = output / ('network-tests.exe' if os.name == 'nt' else 'network-tests')
    compiler = shutil.which('g++') or shutil.which('clang++')
    includes = [firmware, stubs, output]
    if compiler:
        command = [compiler, '-std=c++17', '-Wall', '-Wextra', '-Werror']
        command += ['-D' + definition for definition in definitions]
        command += [arg for path in includes for arg in ['-I', str(path)]]
        command += [str(source), '-o', str(executable)]
    elif os.name == 'nt':
        installations = Path(os.environ.get('ProgramFiles', 'C:/Program Files')) / 'Microsoft Visual Studio'
        scripts = sorted(installations.glob('*/*/VC/Auxiliary/Build/vcvars64.bat'))
        if not scripts:
            pytest.fail('C++ compiler required for firmware network failure tests')
        batch = output / 'build.cmd'
        include_flags = ' '.join(f'/I"{path}"' for path in includes)
        define_flags = ' '.join('/D' + definition for definition in definitions)
        batch.write_text(
            f'@echo off\ncall "{scripts[-1]}" >nul\nif errorlevel 1 exit /b 1\n'
            f'cl /nologo /EHsc /std:c++17 /W4 /WX {include_flags} {define_flags} '
            f'/Fe"{executable}" /Fo"{output / "network-tests.obj"}" "{source}"\n')
        command = ['cmd.exe', '/d', '/c', str(batch)]
    else:
        pytest.fail('C++ compiler required for firmware network failure tests')
    result = subprocess.run(command, capture_output=True, text=True, timeout=90)
    if expect_failure:
        return result
    assert result.returncode == 0, result.stdout + result.stderr
    return executable


@pytest.mark.parametrize('case', CASES)
def test_firmware_network_runtime(network_test_executable, case):
    result = subprocess.run([str(network_test_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


@pytest.mark.parametrize('case,definition', [
    ('legacy_contract_guard', 'WATERHALL_LEGACY_TELEMETRY_CONTRACT'),
    ('capture_blocks_production', 'WATERHALL_BENCH_CAPTURE_ONLY'),
])
def test_firmware_production_build_guards(tmp_path, case, definition):
    executable = build_network_test(tmp_path, ['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', definition])
    result = subprocess.run([str(executable), case], capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


@pytest.fixture(scope='module')
def tds_low_range_test_executable(tmp_path_factory):
    return build_network_test(tmp_path_factory.mktemp('tds-low-range-native'), [
        'WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_BENCH_CAPTURE_ONLY',
        'WATERHALL_TDS_LOW_RANGE_BENCH',
    ])


@pytest.mark.parametrize('case', [
    'tds_low_range_boundaries', 'tds_low_range_raw_only_and_post_block',
    'tds_low_range_invalid_and_recovery',
    'tds_low_range_calibration_failure',
])
def test_tds_low_range_capture(tds_low_range_test_executable, case):
    result = subprocess.run([str(tds_low_range_test_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


def test_tds_low_range_requires_capture_build(tmp_path):
    result = build_network_test(tmp_path, ['WATERHALL_TDS_LOW_RANGE_BENCH'], expect_failure=True)
    assert result.returncode != 0
    assert 'TDS low-range diagnosis requires WATERHALL_BENCH_CAPTURE_ONLY' in result.stdout + result.stderr


@pytest.fixture(scope='module')
def tds_low_range_production_executable(tmp_path_factory):
    return build_network_test(tmp_path_factory.mktemp('tds-low-range-production'), [
        'WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_LEGACY_TELEMETRY_CONTRACT',
        'WATERHALL_TDS_LOW_RANGE_PRODUCTION',
    ])


@pytest.mark.parametrize('case', [
    'tds_low_range_production_live_and_invalid', 'tds_low_range_production_cadence',
])
def test_tds_low_range_production(tds_low_range_production_executable, case):
    result = subprocess.run([str(tds_low_range_production_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


@pytest.mark.parametrize('definitions,message', [
    (['WATERHALL_LEGACY_TELEMETRY_CONTRACT'], 'requires automatic telemetry without capture mode'),
    (['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_BENCH_CAPTURE_ONLY'], 'requires automatic telemetry without capture mode'),
    (['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY'], 'requires the deployed numeric analog contract'),
])
def test_tds_low_range_production_build_guards(tmp_path, definitions, message):
    result = build_network_test(tmp_path, definitions + ['WATERHALL_TDS_LOW_RANGE_PRODUCTION'], expect_failure=True)
    assert result.returncode != 0
    assert message in result.stdout + result.stderr


@pytest.fixture(scope='module')
def tds_partial_production_executable(tmp_path_factory):
    return build_network_test(tmp_path_factory.mktemp('tds-partial-production'), [
        'WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_TDS_PARTIAL_PRODUCTION',
    ])


@pytest.mark.parametrize('case', [
    'tds_partial_production_posts_null_and_live_values', 'tds_partial_production_cadence',
])
def test_tds_partial_production(tds_partial_production_executable, case):
    result = subprocess.run([str(tds_partial_production_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


def test_tds_calibration_approved_path(tds_partial_production_executable):
    case = 'tds_approved_reference_numeric_null_and_recovery'
    result = subprocess.run([str(tds_partial_production_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


@pytest.mark.parametrize('definitions', [[], ['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY',
    'WATERHALL_LEGACY_TELEMETRY_CONTRACT'], ['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY',
    'WATERHALL_BENCH_CAPTURE_ONLY']])
def test_tds_partial_production_guards(tmp_path, definitions):
    result = build_network_test(tmp_path, definitions + ['WATERHALL_TDS_PARTIAL_PRODUCTION'], expect_failure=True)
    assert result.returncode != 0
    assert 'Partial TDS production requires automatic nullable telemetry without capture mode' in result.stdout + result.stderr


@pytest.fixture(scope='module')
def nullable_turbidity_production_executable(tmp_path_factory):
    return build_network_test(tmp_path_factory.mktemp('nullable-turbidity-production'), [
        'WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_TDS_PARTIAL_PRODUCTION',
        'WATERHALL_NULLABLE_TURBIDITY_PRODUCTION',
    ])


@pytest.mark.parametrize('case', [
    'tds_partial_production_posts_null_and_live_values', 'tds_partial_production_cadence',
])
def test_nullable_turbidity_production(nullable_turbidity_production_executable, case):
    result = subprocess.run([str(nullable_turbidity_production_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


@pytest.mark.parametrize('definitions', [[], ['WATERHALL_ENABLE_AUTOMATIC_TELEMETRY']])
def test_nullable_turbidity_requires_partial_production(tmp_path, definitions):
    result = build_network_test(tmp_path, definitions + ['WATERHALL_NULLABLE_TURBIDITY_PRODUCTION'], expect_failure=True)
    assert result.returncode != 0
    assert 'Nullable turbidity production requires the partial TDS production profile' in result.stdout + result.stderr


@pytest.mark.parametrize('case', [
    'turbidity_uncalibrated_signal_null_and_preserved_other_fields',
    'turbidity_calibrated_transport_ages_old_measurement_not_new_snapshot',
])
def test_turbidity_calibration_and_freshness_transport(nullable_turbidity_production_executable, case):
    result = subprocess.run([str(nullable_turbidity_production_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


def test_local_index_actual_transport(tmp_path):
    executable = build_network_test(tmp_path, [
        'WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_TDS_PARTIAL_PRODUCTION',
        'WATERHALL_NULLABLE_TURBIDITY_PRODUCTION', 'WATERHALL_LOCAL_TURBIDITY_INDEX'],
        approve_local_index_fixture=True)
    case = 'local_index_payload_direction_null_and_snapshot_safety'
    result = subprocess.run([str(executable), case], capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case


def test_unapproved_local_index_actual_transport(tmp_path):
    executable = build_network_test(tmp_path, [
        'WATERHALL_ENABLE_AUTOMATIC_TELEMETRY', 'WATERHALL_TDS_PARTIAL_PRODUCTION',
        'WATERHALL_NULLABLE_TURBIDITY_PRODUCTION', 'WATERHALL_LOCAL_TURBIDITY_INDEX'],
        approve_local_index_fixture=False)
    case = 'local_index_unapproved_never_publishes_numeric'
    result = subprocess.run([str(executable), case], capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case
