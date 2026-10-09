"""Local optical comparison index. This is deliberately not an NTU conversion."""
import datetime
import json
import math

MODEL = 'local-clear-cloudy-20261009-v2'
CLEAR_ADC_VOLTS = 0.836
CLOUDY_ADC_VOLTS = 0.645
# Repeatability failed. The user explicitly authorized a provisional operational
# display; this does not approve calibration or scientific NTU accuracy.
CALIBRATION_APPROVED = False
OPERATIONAL_ENABLED = True
BASELINE_DRIFT_UNRESOLVED = True
DIVIDER_GAIN = 1.665
WARNING_THRESHOLD = 5.0
# Largest latest clear-window filtered span: 0.013 / 0.191 * 10 = 0.681
# index units. Round up to 0.7 for hysteresis; keep entry exactly 5.0.
RECOVERY_THRESHOLD = 4.3
CONFIRM_POSTS = 2
MAX_SAMPLE_AGE_MS = 2000
# Two existing 60-second mobile polling intervals, without changing polling.
MAX_READING_AGE_MS = 120000
DISCLAIMER = ('Provisional operational Turbidity Index, not NTU. Baseline drift remains '
              'unresolved. Normal means below the operational warning threshold; '
              'measurements do not certify drinking-water safety.')


def finite_number(value):
    return type(value) in (int, float) and math.isfinite(value) if not isinstance(value, int) or abs(value) < 10**100 else False


def index_from_voltage(adc_volts):
    if not finite_number(adc_volts) or not 0.150 <= adc_volts <= 3.100:
        return None
    return max(0.0, 10.0 * (CLEAR_ADC_VOLTS - adc_volts) / (CLEAR_ADC_VOLTS - CLOUDY_ADC_VOLTS))


def decode_record(encoded):
    try:
        record = json.loads(encoded) if encoded else None
    except (TypeError, ValueError):
        return None
    return record if isinstance(record, dict) and record.get('model') == MODEL else None


def usable_signal(record):
    """Validate the electrical/freshness evidence independently of NTU accuracy."""
    if not isinstance(record, dict) or record.get('model') != MODEL:
        return False
    value = record.get('value')
    raw = record.get('raw_adc')
    volts = record.get('adc_voltage')
    module = record.get('module_voltage')
    age = record.get('sample_age_ms')
    expected = index_from_voltage(volts)
    return (record.get('signal_valid') is True
            and type(raw) is int and 4 < raw < 4091
            and finite_number(age) and 0 <= age <= MAX_SAMPLE_AGE_MS
            and expected is not None and finite_number(value) and 0 <= value <= 100
            and abs(value - expected) <= 0.025
            and finite_number(module) and abs(module - volts * DIVIDER_GAIN) <= 0.003)


def reading_is_fresh(timestamp, sample_age_ms=0, now=None):
    try:
        recorded = datetime.datetime.fromisoformat(str(timestamp).replace('Z', '+00:00'))
        if recorded.tzinfo is None:
            recorded = recorded.replace(tzinfo=datetime.timezone.utc)
        age_ms = ((now or datetime.datetime.now(datetime.timezone.utc)) - recorded).total_seconds() * 1000
        return 0 <= age_ms <= MAX_READING_AGE_MS - sample_age_ms
    except (TypeError, ValueError, OverflowError):
        return False


def prepare_record(data, previous_row, now):
    if 'turbidity_index' not in data:
        return None  # Legacy NTU history is never reinterpreted as an index.
    record = {'model': data.get('turbidity_index_model'), 'value': data['turbidity_index'],
              'signal_valid': data.get('turbidity_signal_valid'),
              'raw_adc': data.get('turbidity_raw_adc'),
              'adc_voltage': data.get('turbidity_adc_voltage'),
              'module_voltage': data.get('turbidity_module_voltage'),
              'sample_age_ms': data.get('turbidity_sample_age_ms'),
              'status': 'Unavailable', 'elevated': False, 'pending': 0}
    # Preserve unclamped electrical drift even when the display index floors at zero.
    volts = record['adc_voltage']
    record.update(provisional=True, calibration_approved=False,
                  baseline_drift_unresolved=BASELINE_DRIFT_UNRESOLVED,
                  baseline_offset_adc_volts=volts - CLEAR_ADC_VOLTS if finite_number(volts) else None,
                  index_unclamped=10 * (CLEAR_ADC_VOLTS - volts) / (CLEAR_ADC_VOLTS - CLOUDY_ADC_VOLTS)
                                  if finite_number(volts) else None)
    # Invalid/unavailable data cannot inherit a prior available measurement.
    if not OPERATIONAL_ENABLED or not usable_signal(record):
        record['value'] = None
        return record
    previous = decode_record(previous_row['turbidity_index_json']) if previous_row else None
    if not (usable_signal(previous) and reading_is_fresh(previous_row['recorded_at'], previous['sample_age_ms'], now)):
        previous = None
    elevated = previous.get('elevated') is True if previous else False
    pending = previous.get('pending', 0) if previous else 0
    if type(pending) is not int or not 0 <= pending < CONFIRM_POSTS:
        pending = 0
    transition = record['value'] <= RECOVERY_THRESHOLD if elevated else record['value'] >= WARNING_THRESHOLD
    pending = pending + 1 if transition else 0
    if pending >= CONFIRM_POSTS:
        elevated = not elevated
        pending = 0
    record.update(status='Elevated' if elevated else 'Normal', elevated=elevated, pending=pending)
    return record


def public_metadata(row, now=None):
    record = decode_record(row.get('turbidity_index_json')) if row else None
    available = (OPERATIONAL_ENABLED and usable_signal(record)
                 and reading_is_fresh(row.get('recorded_at'), record['sample_age_ms'], now)
                 and record.get('status') in ('Normal', 'Elevated'))
    return {'turbidity_index': record['value'] if available else None,
            'turbidity_index_status': record['status'] if available else 'Unavailable',
            'turbidity_index_model': MODEL, 'turbidity_index_unit': 'local index',
            'turbidity_index_calibration_approved': CALIBRATION_APPROVED,
            'turbidity_index_operational_enabled': OPERATIONAL_ENABLED,
            'turbidity_index_provisional': True,
            'turbidity_index_baseline_drift_unresolved': BASELINE_DRIFT_UNRESOLVED,
            'turbidity_index_warning_threshold': WARNING_THRESHOLD,
            'turbidity_index_recovery_threshold': RECOVERY_THRESHOLD,
            'turbidity_index_stale_after_ms': MAX_READING_AGE_MS,
            'turbidity_index_disclaimer': DISCLAIMER}
