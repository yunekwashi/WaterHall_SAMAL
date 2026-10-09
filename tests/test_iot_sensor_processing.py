"""Run the firmware's actual C++ filtering/calibration/error paths on the host."""
import os
from pathlib import Path
import shutil
import subprocess

import pytest

ROOT = Path(__file__).resolve().parents[1]
CASES = [
    'local_index_measured_direction_and_invalid',
    'turbidity_reference_gate_and_bounds',
    'turbidity_measured_voltage_path_and_legacy_bias',
    'turbidity_runtime_separate_signal_calibration_and_age',
    'validity_confirmation', 'runtime_individual_invalid_and_recovery',
    'runtime_hc_noise_and_invalid_confirmation',
    'echo_bounds', 'geometry_and_clamps', 'geometry_missing_invalid',
    'reservoir_mapping_full', 'reservoir_mapping_75', 'reservoir_mapping_half',
    'reservoir_mapping_25', 'reservoir_mapping_empty', 'reservoir_edges_and_invalid',
    'reservoir_monotonic_direction',
    'median_outliers', 'majority_required', 'invalid_replaces_previous',
    'freshness_and_wrap', 'adc_range', 'divider_reconstruction',
    'reference_interpolation', 'reference_rejection', 'tds_reference',
    'tds_calibration_gate_and_bounded_zero',
    'tds_calibration_rejects_unverified_or_invalid_references',
    'telemetry_rejection', 'retry_backoff', 'retry_clock_wrap', 'retry_slow_request_no_burst',
    'geometry_and_wiring_configuration', 'runtime_trigger_and_timeout', 'runtime_echo_diagnostics',
    'runtime_sampling_and_calibration_gate', 'runtime_disconnect_and_recovery',
    'legacy_demo_turbidity', 'runtime_demo_profile', 'runtime_demo_level_bounds',
    'runtime_demo_tracks_changed_physical_inputs',
]


@pytest.fixture(scope='module')
def sensor_test_executable(tmp_path_factory):
    output = tmp_path_factory.mktemp('iot-native')
    source = ROOT / 'tests/cpp/test_iot_sensor_processing.cpp'
    include = ROOT / 'iot/waterhall_esp32_reservoir'
    executable = output / ('sensor-tests.exe' if os.name == 'nt' else 'sensor-tests')
    compiler = shutil.which('g++') or shutil.which('clang++')
    if compiler:
        command = [compiler, '-std=c++17', '-Wall', '-Wextra', '-Werror',
                   '-I', str(include), str(source), '-o', str(executable)]
    elif os.name == 'nt':
        installations = Path(os.environ.get('ProgramFiles', 'C:/Program Files')) / 'Microsoft Visual Studio'
        scripts = sorted(installations.glob('*/*/VC/Auxiliary/Build/vcvars64.bat'))
        if not scripts:
            pytest.fail('C++ compiler required for actual firmware helper tests')
        batch = output / 'build.cmd'
        batch.write_text(
            f'@echo off\ncall "{scripts[-1]}" >nul\nif errorlevel 1 exit /b 1\n'
            f'cl /nologo /EHsc /std:c++17 /W4 /WX /I"{include}" '
            f'/Fe"{executable}" /Fo"{output / "sensor-tests.obj"}" "{source}"\n',
            encoding='utf-8')
        command = ['cmd.exe', '/d', '/c', str(batch)]
    else:
        pytest.fail('C++ compiler required for actual firmware helper tests')
    result = subprocess.run(command, capture_output=True, text=True, timeout=90)
    assert result.returncode == 0, result.stdout + result.stderr
    return executable


@pytest.mark.parametrize('case', CASES)
def test_firmware_sensor_processing(sensor_test_executable, case):
    result = subprocess.run([str(sensor_test_executable), case],
                            capture_output=True, text=True, timeout=10)
    assert result.returncode == 0, result.stdout + result.stderr
    assert result.stdout.strip() == case
