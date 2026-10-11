"""Provisional local TDS comparison. Never a ppm or health/safety conversion."""
import datetime
import json

from backend.turbidity_index import finite_number

MODEL = 'local-tap-salted-20261011-v1'
BASELINE_ADC_VOLTS = 0.332
SALTED_ADC_VOLTS = 0.459
DIVIDER_GAIN = 2.0
WARNING_THRESHOLD = 5.0
# Largest observed filtered span: .012 / .127 * 10 = .945 index units.
# Round up to a 1.0-unit noise margin; this is an operational threshold only.
RECOVERY_THRESHOLD = 4.0
CONFIRM_POSTS = 2
MAX_SAMPLE_AGE_MS = 2000
MAX_READING_AGE_MS = 60000
DISCLAIMER = ('Provisional operational TDS Index, not ppm. Normal means below '
              'the local operational threshold, not a health/safety standard. '
              'Measurements do not certify drinking-water safety.')


def index_from_voltage(volts):
    if not finite_number(volts) or not 0.100 <= volts <= 0.950:
        return None
    return max(0.0, 10.0 * (volts - BASELINE_ADC_VOLTS) /
               (SALTED_ADC_VOLTS - BASELINE_ADC_VOLTS))


def decode_record(encoded):
    try:
        record = json.loads(encoded) if encoded else None
    except (TypeError, ValueError):
        return None
    return record if isinstance(record, dict) and record.get('model') == MODEL else None


def usable_signal(record):
    if not isinstance(record, dict) or record.get('model') != MODEL:
        return False
    expected = index_from_voltage(record.get('adc_voltage'))
    raw, value = record.get('raw_adc'), record.get('value')
    age, module = record.get('sample_age_ms'), record.get('module_voltage')
    return (record.get('signal_valid') is True and type(raw) is int and 4 < raw < 4091
            and finite_number(age) and 0 <= age <= MAX_SAMPLE_AGE_MS
            and expected is not None and finite_number(value) and value >= 0
            and abs(value - expected) <= 0.025
            and finite_number(module)
            and abs(module - record['adc_voltage'] * DIVIDER_GAIN) <= 0.003)


def reading_is_fresh(timestamp, now=None):
    try:
        recorded = datetime.datetime.fromisoformat(str(timestamp).replace('Z', '+00:00'))
        if recorded.tzinfo is None:
            recorded = recorded.replace(tzinfo=datetime.timezone.utc)
        age_ms = ((now or datetime.datetime.now(datetime.timezone.utc)) - recorded).total_seconds() * 1000
        return 0 <= age_ms <= MAX_READING_AGE_MS
    except (TypeError, ValueError, OverflowError):
        return False


def prepare_record(data, previous_row, now):
    if 'tds_index' not in data:
        return None  # Historic ppm is never reinterpreted as an index.
    record = {'model': data.get('tds_index_model'), 'value': data['tds_index'],
              'raw_adc': data.get('tds_raw_adc'), 'adc_voltage': data.get('tds_adc_voltage'),
              'module_voltage': data.get('tds_module_voltage'),
              'signal_valid': data.get('tds_signal_valid'),
              'sample_age_ms': data.get('tds_sample_age_ms'),
              'status': 'Unavailable', 'elevated': False, 'pending': 0,
              'provisional': True, 'ppm_calibration_approved': False}
    volts = record['adc_voltage']
    record['index_unclamped'] = (10 * (volts - BASELINE_ADC_VOLTS) /
                                 (SALTED_ADC_VOLTS - BASELINE_ADC_VOLTS)
                                 if finite_number(volts) else None)
    if not usable_signal(record):
        record['value'] = None
        return record
    previous = decode_record(previous_row.get('tds_index_json')) if previous_row else None
    if not (usable_signal(previous) and reading_is_fresh(previous_row['recorded_at'], now)):
        previous = None
    elevated = previous.get('elevated') is True if previous else False
    pending = previous.get('pending', 0) if previous else 0
    if type(pending) is not int or not 0 <= pending < CONFIRM_POSTS:
        pending = 0
    transition = record['value'] <= RECOVERY_THRESHOLD if elevated else record['value'] >= WARNING_THRESHOLD
    pending = pending + 1 if transition else 0
    if pending >= CONFIRM_POSTS:
        elevated, pending = not elevated, 0
    record.update(status='Elevated' if elevated else 'Normal', elevated=elevated, pending=pending)
    return record


def public_metadata(row, now=None):
    record = decode_record(row.get('tds_index_json')) if row else None
    available = (usable_signal(record) and reading_is_fresh(row.get('recorded_at'), now)
                 and record.get('status') in ('Normal', 'Elevated'))
    return {'tds_index': record['value'] if available else None,
            'tds_index_status': record['status'] if available else 'Unavailable',
            'tds_index_model': MODEL, 'tds_index_provisional': True,
            'tds_index_unit': 'local index', 'tds_index_warning_threshold': WARNING_THRESHOLD,
            'tds_index_recovery_threshold': RECOVERY_THRESHOLD,
            'tds_index_confirm_posts': CONFIRM_POSTS,
            'tds_index_pending_posts': record.get('pending', 0) if available else 0,
            'tds_index_calibration_approved': False,
            'tds_index_stale_after_ms': MAX_READING_AGE_MS,
            'tds_index_disclaimer': DISCLAIMER}
