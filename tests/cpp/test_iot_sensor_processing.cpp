// Host-executed tests of the exact firmware helpers; no hardware/network access.
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <vector>
#include "sensor_config.h"
#include "sensor_processing.h"

static uint32_t clockMs = 0;
static uint32_t echoUs = 10000;
static uint16_t adcRaw = 2000;
static uint32_t adcMv = 1000;
static bool tdsOnlyInvalid = false;
static std::vector<int> triggerWrites;
static std::vector<uint32_t> triggerTimes;
static std::vector<unsigned> microDelays;
constexpr int LOW = 0;
constexpr int HIGH = 1;
uint32_t millis() { return clockMs; }
void digitalWrite(unsigned char pin, int state) {
  assert(pin == PIN_TRIG);
  triggerWrites.push_back(state);
}
void delayMicroseconds(unsigned delayUs) { microDelays.push_back(delayUs); }
uint32_t pulseIn(unsigned char pin, int state, uint32_t timeoutUs) {
  assert(pin == PIN_ECHO && state == HIGH && timeoutUs == 25000);
  triggerTimes.push_back(clockMs);
  clockMs += echoUs ? echoUs / 1000 : timeoutUs / 1000;
  return echoUs;
}
uint16_t analogRead(unsigned char pin) {
  assert(pin == PIN_TURBIDITY || pin == PIN_TDS);
  return tdsOnlyInvalid && pin == PIN_TDS ? 0 : adcRaw;
}
uint32_t analogReadMilliVolts(unsigned char pin) {
  assert(pin == PIN_TURBIDITY || pin == PIN_TDS);
  return tdsOnlyInvalid && pin == PIN_TDS ? 0 : adcMv;
}
struct QuietSerial {
  void print(const char*) {}
  void println(const char*) {}
  template <typename... Args> void printf(const char*, Args...) {}
} Serial;
#include "sensor_runtime.h"

using namespace waterhall;
static bool closeTo(float actual, float expected) {
  return isfinite(actual) && fabsf(actual - expected) < 0.001f;
}

static void validity_confirmation() {
  ValidityConfirmation gate;
  gate.observe(true); gate.observe(true); assert(!gate.available);
  gate.observe(true); assert(gate.available);
  gate.observe(false); gate.observe(false); assert(gate.available);
  gate.observe(true); gate.observe(false); gate.observe(false); assert(gate.available);
  gate.observe(false); assert(!gate.available);
  gate.observe(true); gate.observe(true); assert(!gate.available);
  gate.observe(true); assert(gate.available);
}

static void runtime_individual_invalid_and_recovery() {
  echoUs = 583;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  assert(readSensors(clockMs).waterLevel == 100 && isfinite(readSensors(clockMs).tds));
  tdsOnlyInvalid = true;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  const SensorSnapshot missing = readSensors(clockMs);
  assert(missing.waterLevel == 100 && missing.turbiditySignalValid &&
         !missing.turbidityNtuCalibrated && isnan(missing.turbidity) && isnan(missing.tds));
  tdsOnlyInvalid = false;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  assert(isfinite(readSensors(clockMs).tds));
}

static void runtime_hc_noise_and_invalid_confirmation() {
  echoUs = 583;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  echoUs = 0; clockMs += 70; serviceSensors(clockMs);
  assert(readSensors(clockMs).waterLevel == 100);
  echoUs = 583; clockMs += 70; serviceSensors(clockMs);
  assert(readSensors(clockMs).waterLevel == 100);
  echoUs = 23324;  // Beyond the HC-SR04 400cm supported range.
  for (int i = 0; i < 3; ++i) { clockMs += 70; serviceSensors(clockMs); }
  assert(readSensors(clockMs).waterLevel == -1);
  assert(isnan(lastDistanceCm));
  assert(isfinite(readSensors(clockMs).tds) && readSensors(clockMs).turbiditySignalValid);
  echoUs = 583;
  for (int i = 0; i < 3; ++i) { clockMs += 70; serviceSensors(clockMs); }
  assert(readSensors(clockMs).waterLevel == 100);
}

static void echo_bounds() {
  assert(isnan(echoDistanceCm(0)));
  assert(isnan(echoDistanceCm(116)));
  assert(isfinite(echoDistanceCm(117)));
  assert(closeTo(echoDistanceCm(10000), 171.5f));
  assert(isfinite(echoDistanceCm(23323)));
  assert(isnan(echoDistanceCm(23324)));
  assert(isnan(echoDistanceCm(25000)));
  assert(isnan(echoDistanceCm(UINT32_MAX)));
}
static void geometry_and_clamps() {
  assert(waterPercentage(100, 100, 10) == 0);
  assert(waterPercentage(10, 100, 10) == 100);
  assert(waterPercentage(55, 100, 10) == 50);
  assert(waterPercentage(110, 100, 10) == 0);
  assert(waterPercentage(3, 100, 10) == 100);
}
static void geometry_missing_invalid() {
  assert(waterPercentage(55, NAN, NAN) == -1);
  assert(waterPercentage(NAN, 100, 10) == -1);
  assert(waterPercentage(55, 10, 100) == -1);
  assert(waterPercentage(55, 55, 55) == -1);
  assert(waterPercentage(55, 401, 10) == -1);
  assert(waterPercentage(55, 100, 1) == -1);
  assert(waterPercentage(INFINITY, 100, 10) == -1);
}
static void checkReservoirMapping(float distance, float depth, int percent) {
  assert(waterPercentage(distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) == percent);
  assert(closeTo(waterDepthCm(distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM), depth));
}
static void reservoir_mapping_full() { checkReservoirMapping(12.70f, 121.92f, 100); }
static void reservoir_mapping_75() { checkReservoirMapping(43.18f, 91.44f, 75); }
static void reservoir_mapping_half() { checkReservoirMapping(73.66f, 60.96f, 50); }
static void reservoir_mapping_25() { checkReservoirMapping(104.14f, 30.48f, 25); }
static void reservoir_mapping_empty() { checkReservoirMapping(134.62f, 0, 0); }
static void reservoir_edges_and_invalid() {
  checkReservoirMapping(12.20f, 121.92f, 100);
  checkReservoirMapping(135.12f, 0, 0);
  checkReservoirMapping(2, 121.92f, 100);
  checkReservoirMapping(400, 0, 0);
  for (float distance : {0.0f, -1.0f, NAN, INFINITY, 1.99f, 400.01f,
                         echoDistanceCm(0), echoDistanceCm(ECHO_TIMEOUT_US)}) {
    assert(waterPercentage(distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) == -1);
    assert(isnan(waterDepthCm(distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM)));
  }
}
static void reservoir_monotonic_direction() {
  int previous = 100;
  for (float distance = 2; distance <= 400; distance += 0.25f) {
    const int percent = waterPercentage(distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM);
    assert(percent >= 0 && percent <= previous);
    previous = percent;
  }
  assert(waterPercentage(20, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) == 94);
  assert(waterPercentage(30, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) == 86);
  assert(waterPercentage(25, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) == 90);
}
static void median_outliers() {
  SampleWindow<5> window;
  for (float value : {10.0f, 10.2f, 399.0f, 10.1f, 10.3f}) window.add(value, 100);
  assert(closeTo(window.median(101, 3), 10.2f));
  window.add(NAN, 102);
  assert(closeTo(window.median(103, 3), 10.25f));
}
static void majority_required() {
  SampleWindow<5> window;
  window.add(10, 100); window.add(11, 100);
  window.add(NAN, 100); window.add(INFINITY, 100); window.add(NAN, 100);
  assert(isnan(window.median(100, 3)));
  assert(isnan(window.median(100, 0)));
  assert(isnan(window.median(100, 6)));
}
static void invalid_replaces_previous() {
  SampleWindow<5> window;
  for (int i = 0; i < 5; ++i) window.add(10, 100);
  for (int i = 0; i < 3; ++i) window.add(NAN, 200);
  assert(isnan(window.median(200, 3)));
  for (int i = 0; i < 3; ++i) window.add(20, 300);
  assert(closeTo(window.median(300, 3), 20));
}
static void freshness_and_wrap() {
  SampleWindow<5> window;
  for (int i = 0; i < 5; ++i) window.add(10, UINT32_MAX - 100);
  assert(closeTo(window.median(100, 3), 10));
  assert(isnan(window.median(2000, 3)));
  SampleWindow<5> age;
  for (int i = 0; i < 5; ++i) age.add(10, 100);
  assert(isfinite(age.median(2100, 3)));
  assert(isnan(age.median(2101, 3)));
}
static void adc_range() {
  assert(validAdcSample(2000, 150));
  assert(validAdcSample(3000, 3100));
  assert(!validAdcSample(0, 0));
  assert(!validAdcSample(4095, 3000));
  assert(!validAdcSample(4, 1000));
  assert(!validAdcSample(4091, 2000));
  assert(!validAdcSample(2000, 149));
  assert(!validAdcSample(3000, 3101));
}
static void divider_reconstruction() {
  assert(closeTo(moduleVoltage(2.25f, 2), 4.5f));
  assert(closeTo(moduleVoltage(1.15f, 2), 2.3f));
  assert(closeTo(moduleVoltage(1.65f, TDS_DIVIDER_GAIN), 3.3f));
  assert(isnan(moduleVoltage(NAN, 2)));
  assert(isnan(moduleVoltage(3.3f, 2)));
  assert(isnan(moduleVoltage(1, 0)));
  assert(isnan(moduleVoltage(1, NAN)));
}
static void reference_interpolation() {
  // Deliberate unit fixtures, not real sensor calibration or production values.
  assert(closeTo(referenceValue(2.5f, 1, 1000, 4, 0, 10000), 500));
  assert(closeTo(referenceValue(2.5f, 4, 0, 1, 1000, 10000), 500));
  assert(closeTo(referenceValue(1, 1, 1000, 4, 0, 10000), 1000));
  assert(closeTo(referenceValue(4, 1, 1000, 4, 0, 10000), 0));
}
static void reference_rejection() {
  assert(isnan(referenceValue(0.9f, 1, 1000, 4, 0, 10000)));
  assert(isnan(referenceValue(4.1f, 1, 1000, 4, 0, 10000)));
  assert(isnan(referenceValue(2, NAN, NAN, NAN, NAN, 10000)));
  assert(isnan(referenceValue(2, 2, 10, 2, 20, 10000)));
  assert(isnan(referenceValue(2, 1, -10, 4, 20, 10000)));
  assert(isnan(referenceValue(2, 1, 10001, 4, 20, 10000)));
}
static void tds_reference() {
  assert(closeTo(sen0244Ppm(1, 1, 25), 367.475f));
  assert(sen0244Ppm(1, 1, 35) < sen0244Ppm(1, 1, 25));
  assert(closeTo(sen0244Ppm(1, 0.9f, 25), 330.7275f));
  assert(isnan(sen0244Ppm(NAN, 1, 25)));
  assert(isnan(sen0244Ppm(3, 1, 25)));
  assert(isnan(sen0244Ppm(1, 0, 25)));
  assert(isnan(sen0244Ppm(1, 1, NAN)));
  assert(isnan(sen0244Ppm(1, 1, 56)));
  assert(isnan(sen0244Ppm(2.3f, 2, 25)));
}
static void telemetry_rejection() {
  assert(validTelemetry(0, 0));
  assert(validTelemetry(10000, 100000));
  assert(!validTelemetry(NAN, 100));
  assert(!validTelemetry(1, NAN));
  assert(!validTelemetry(INFINITY, 100));
  assert(!validTelemetry(-1, 100));
  assert(!validTelemetry(1, 100001));
}

static void tds_calibration_gate_and_bounded_zero() {
  // Synthetic calibration fixtures only; no concentration is assigned to water.
  TdsReferenceCalibration reference = {false, 0.4f, 0, 1.4f, 500, 25};
  assert(isnan(calibratedTdsPpm(0.9f, reference, 2, true)));
  reference.approved = true;
  assert(closeTo(calibratedTdsPpm(0.4f, reference, 2, true), 0));
  assert(closeTo(calibratedTdsPpm(0.9f, reference, 2, true), 250));
  assert(closeTo(calibratedTdsPpm(1.4f, reference, 2, true), 500));
  assert(isnan(calibratedTdsPpm(0.39f, reference, 2, true)));
  assert(isnan(calibratedTdsPpm(1.41f, reference, 2, true)));
  assert(isnan(calibratedTdsPpm(NAN, reference, 2, true)));
}

static void tds_calibration_rejects_unverified_or_invalid_references() {
  const TdsReferenceCalibration valid = {true, 0.4f, 100, 1.4f, 500, 25};
  for (int field = 0; field < 9; ++field) {
    TdsReferenceCalibration reference = valid;
    if (field == 0) reference.volts1 = NAN;
    if (field == 1) reference.ppm1 = NAN;
    if (field == 2) reference.volts2 = NAN;
    if (field == 3) reference.ppm2 = NAN;
    if (field == 4) reference.measuredTemperatureC = NAN;
    if (field == 5) reference.ppm2 = 50;  // Unsupported decreasing TDS response.
    if (field == 6) reference.volts2 = 0.4005f;  // Indistinguishable anchors.
    if (field == 7) reference.volts1 = 0.1f;  // Cannot calibrate from ADC floor.
    if (field == 8) reference.volts2 = 2.0f;  // Outside preserved 0dB window.
    assert(isnan(calibratedTdsPpm(0.9f, reference, 2, true)));
  }
  assert(isnan(calibratedTdsPpm(0.9f, valid, NAN, true)));
  assert(isnan(calibratedTdsPpm(0.9f, valid, 0, true)));
  TdsReferenceCalibration missing = {TDS_REFERENCE_CALIBRATION_APPROVED,
      TDS_REFERENCE_1_VOLTS, TDS_REFERENCE_1_PPM, TDS_REFERENCE_2_VOLTS,
      TDS_REFERENCE_2_PPM, TDS_CALIBRATION_MEASURED_TEMPERATURE_C};
  assert(!missing.approved && isnan(calibratedTdsPpm(0.9f, missing, 2, true)));
}
static void legacy_demo_turbidity() {
  assert(closeTo(legacyDemoTurbidityNtu(1.262f), 34.76f));
  assert(closeTo(legacyDemoTurbidityNtu(2.5f), 8.0f));
  assert(closeTo(legacyDemoTurbidityNtu(3.3f), 0.5f));
  assert(legacyDemoTurbidityNtu(1.1f) > legacyDemoTurbidityNtu(1.3f));
  assert(isnan(legacyDemoTurbidityNtu(NAN)));
  assert(isnan(legacyDemoTurbidityNtu(-1)));
  assert(isnan(legacyDemoTurbidityNtu(3.31f)));
}
static void turbidity_measured_voltage_path_and_legacy_bias() {
  // Real captured ADC-voltage medians; the outputs below explain the old
  // equation, not the samples' true NTU. Raw ADC is an adjacent conversion.
  const float baseline = moduleVoltage(0.816f, TURBIDITY_DIVIDER_GAIN);
  const float cloudy = moduleVoltage(0.603f, TURBIDITY_DIVIDER_GAIN);
  const float returned = moduleVoltage(0.812f, TURBIDITY_DIVIDER_GAIN);
  assert(closeTo(baseline, 1.35864f));
  assert(closeTo(cloudy, 1.003995f));
  assert(closeTo(returned, 1.35198f));
  assert(closeTo(legacyDemoTurbidityNtu(baseline), 32.8272f));
  assert(closeTo(legacyDemoTurbidityNtu(cloudy), 39.9201f));
  assert(closeTo(legacyDemoTurbidityNtu(returned), 32.9604f));
  assert(isnan(calibratedTurbidityNtu(baseline, turbidityReferenceCalibration,
                                    TURBIDITY_DIVIDER_GAIN)));
}
static void retry_backoff() {
  RetrySchedule schedule;
  assert(SEND_INTERVAL_MS == 10000 && MIN_COMPLETION_GAP_MS == 10000);
  assert(schedule.due(0));
  uint32_t now = 100;
  schedule.finished(now, true);
  assert(!schedule.due(10099)); assert(schedule.due(10100));
  for (uint32_t expected : {60000U, 120000U, 240000U, 300000U, 300000U}) {
    now += schedule.interval;
    schedule.finished(now, false);
    assert(schedule.interval == expected);
    assert(!schedule.due(now + expected - 1)); assert(schedule.due(now + expected));
  }
  schedule.finished(now + schedule.interval, true); assert(schedule.interval == 10000);
}
static void retry_slow_request_no_burst() {
  RetrySchedule schedule;
  schedule.finished(3500, true, 0);
  assert(!schedule.due(13499) && schedule.due(13500));
  schedule.finished(21500, true, 13500);  // An eight-second request.
  assert(!schedule.due(31499) && schedule.due(31500));
  schedule.finished(33500, false, 31500);
  assert(!schedule.due(93499) && schedule.due(93500));
  schedule.finished(94500, true, 93500);
  assert(!schedule.due(104499) && schedule.due(104500));
  assert(86400000U / SEND_INTERVAL_MS < 20000);
  assert(60000U / SEND_INTERVAL_MS <= 60);
}
static void retry_clock_wrap() {
  RetrySchedule schedule;
  schedule.finished(UINT32_MAX - 100, true);
  assert(!schedule.due(100));
  assert(!schedule.due(9898));
  assert(schedule.due(9899));
}
static void geometry_and_wiring_configuration() {
  assert(!PRODUCTION_TELEMETRY_ENABLED || SENSOR_WIRING_CONFIRMED);
  assert(closeTo(SENSOR_TO_EMPTY_DISTANCE_CM, 134.62f) && closeTo(SENSOR_TO_FULL_DISTANCE_CM, 12.70f));
  assert(isnan(TURBIDITY_REFERENCE_1_NTU) && isnan(TDS_REFERENCE_1_PPM));
  assert(!TDS_USE_SEN0244_REFERENCE);
  assert(FULL_DISTANCE_CM >= MIN_DISTANCE_CM && EMPTY_DISTANCE_CM <= MAX_DISTANCE_CM);
  assert(closeTo(EMPTY_DISTANCE_CM - FULL_DISTANCE_CM, 121.92f));
  assert(PIN_TRIG == 18 && PIN_ECHO == 19 && PIN_TURBIDITY == 34 && PIN_TDS == 35);
  assert(closeTo(TURBIDITY_DIVIDER_GAIN, 1.665f) && closeTo(TDS_DIVIDER_GAIN, 2));
}
static void runtime_trigger_and_timeout() {
  echoUs = 0;
  assert(isnan(readDistanceCm()));
  assert(triggerWrites.size() == 3);
  assert(triggerWrites[0] == LOW && triggerWrites[1] == HIGH && triggerWrites[2] == LOW);
  assert(microDelays.size() == 2 && microDelays[0] == 4 && microDelays[1] == 10);
  assert(clockMs == 25);
}
static void runtime_echo_diagnostics() {
  echoUs = 0;
  assert(isnan(readDistanceCm()));
  assert(lastEchoDurationUs == 0 && echoTimeoutCount == 1 && echoInvalidRangeCount == 0);
  for (uint32_t duration : {116U, 23324U, 25000U}) {
    echoUs = duration;
    assert(isnan(readDistanceCm()));
    assert(lastEchoDurationUs == duration && echoTimeoutCount == 1);
  }
  assert(echoInvalidRangeCount == 3);
  // A below-full but electrically valid echo remains valid and clamps to full.
  echoUs = 583;
  const float distance = readDistanceCm();
  assert(isfinite(distance) && waterPercentage(distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) == 100);
  assert(lastEchoDurationUs == 583 && echoTimeoutCount == 1 && echoInvalidRangeCount == 3);
}
static void runtime_sampling_and_calibration_gate() {
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  assert(triggerTimes.size() >= 5);
  for (size_t i = 1; i < triggerTimes.size(); ++i)
    assert(triggerTimes[i] - triggerTimes[i - 1] >= 65);
  const SensorSnapshot snapshot = readSensors(clockMs, false);
  assert(closeTo(snapshot.distance, 171.5f) && snapshot.waterLevel == 0 && closeTo(snapshot.waterDepth, 0));
  assert(closeTo(snapshot.turbidityAdc, 1) && closeTo(snapshot.turbidityVoltage, 1.665f));
  assert(closeTo(snapshot.tdsAdc, 1) && closeTo(snapshot.tdsVoltage, 2));
  assert(!validTelemetry(snapshot.turbidity, snapshot.tds));
  printSensors(snapshot);
  clockMs += 2001;
  assert(isnan(readSensors(clockMs, false).turbidityAdc));
}
static void runtime_disconnect_and_recovery() {
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  assert(isfinite(readSensors(clockMs, false).turbidityAdc));
  adcRaw = 4095; adcMv = 3300; echoUs = 0;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  SensorSnapshot snapshot = readSensors(clockMs, false);
  assert(isnan(snapshot.distance) && snapshot.waterLevel == -1);
  assert(isnan(snapshot.turbidityAdc) && isnan(snapshot.tdsAdc));
  adcRaw = 2000; adcMv = 1000; echoUs = 10000;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  snapshot = readSensors(clockMs, false);
  assert(isfinite(snapshot.distance) && isfinite(snapshot.turbidityAdc));
}
static void runtime_demo_profile() {
  echoUs = 583;  // Approximately 10cm, not invented physical calibration.
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  SensorSnapshot sample = readSensors(clockMs, true);
  assert(sample.waterLevel == 100);
  assert(closeTo(sample.turbidityVoltage, 1.665f));
  assert(closeTo(sample.tdsVoltage, 2.0f));
  assert(sample.turbiditySignalValid && !sample.turbidityNtuCalibrated && isnan(sample.turbidity));
  assert(isnan(sample.turbidityDiagnosticNtu));
  assert(closeTo(sample.tds, sen0244Ppm(sample.tdsVoltage, 1, 25)));
  assert(!validTelemetry(sample.turbidity, sample.tds));
  assert(!validTelemetry(readSensors(clockMs, false).turbidity, readSensors(clockMs, false).tds));
  adcRaw = 4095; adcMv = 3300; echoUs = 0;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  sample = readSensors(clockMs, true);
  assert(sample.waterLevel == -1 && !validTelemetry(sample.turbidity, sample.tds));
}

static void runtime_demo_level_bounds() {
  // Calibration endpoints clamp; invalid physical echoes remain unavailable.
  for (uint32_t duration : {116U, 23324U, 0U}) {  // below 2cm, above 400cm, timeout
    echoUs = duration;
    for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
    const SensorSnapshot sample = readSensors(clockMs, true);
    assert(sample.waterLevel == -1);
    assert(sample.turbiditySignalValid && !sample.turbidityNtuCalibrated && isnan(sample.turbidity));
  }
  echoUs = 583;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  assert(readSensors(clockMs, true).waterLevel == 100);
  for (uint32_t duration : {175U, 2041U, 10000U}) {  // ~3cm, ~35cm, ~171.5cm
    echoUs = duration;
    for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
    const SensorSnapshot sample = readSensors(clockMs, true);
    assert(sample.waterLevel == waterPercentage(sample.distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM));
    assert(isfinite(sample.waterDepth));
    // Switching the analog conversion mode must not switch the water scale.
    assert(readSensors(clockMs, false).waterLevel == sample.waterLevel);
  }
}

static void runtime_demo_tracks_changed_physical_inputs() {
  echoUs = 583; adcRaw = 600; adcMv = 600;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  const SensorSnapshot before = readSensors(clockMs, true);
  echoUs = 1166; adcRaw = 750; adcMv = 750;
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  const SensorSnapshot after = readSensors(clockMs, true);
  assert(before.waterLevel == 100 && after.waterLevel == 94);
  assert(after.waterDepth < before.waterDepth);
  assert(after.distance > before.distance);
  assert(closeTo(before.turbidityAdc, 0.6f) && closeTo(after.turbidityAdc, 0.75f));
  assert(closeTo(before.tdsVoltage, 1.2f) && closeTo(after.tdsVoltage, 1.5f));
  assert(isnan(before.turbidityDiagnosticNtu) && isnan(after.turbidityDiagnosticNtu));
  assert(after.turbidityVoltage != before.turbidityVoltage && after.tds > before.tds);
  assert(isnan(before.turbidity) && isnan(after.turbidity));
  assert(before.turbiditySignalValid && after.turbiditySignalValid);
}

static void turbidity_reference_gate_and_bounds() {
  TurbidityReferenceCalibration reference = {false, 0.999f, 8, 1.665f, 0};
  assert(isnan(calibratedTurbidityNtu(1.332f, reference, 1.665f)));
  reference.approved = true;
  assert(closeTo(calibratedTurbidityNtu(1.332f, reference, 1.665f), 4));
  assert(closeTo(calibratedTurbidityNtu(1.665f, reference, 1.665f), 0));
  assert(isnan(calibratedTurbidityNtu(0.998f, reference, 1.665f)));
  assert(isnan(calibratedTurbidityNtu(1.666f, reference, 1.665f)));
  reference.volts1 = NAN;
  assert(isnan(calibratedTurbidityNtu(1.332f, reference, 1.665f)));
  reference = {true, 0.1f, 8, 1.665f, 0};
  assert(isnan(calibratedTurbidityNtu(1.332f, reference, 1.665f)));
  // A constant output is not a two-concentration calibration.
  reference = {true, 0.999f, 0, 1.665f, 0};
  assert(isnan(calibratedTurbidityNtu(1.332f, reference, 1.665f)));
  reference = {true, 1.665f, 8, 1.665f, 0};
  assert(isnan(calibratedTurbidityNtu(1.665f, reference, 1.665f)));
  // Synthetic rising-response references: no assumed curve direction.
  reference = {true, 0.999f, 0, 1.665f, 8};
  assert(closeTo(calibratedTurbidityNtu(1.332f, reference, 1.665f), 4));
  reference.ntu2 = NAN;
  assert(isnan(calibratedTurbidityNtu(1.332f, reference, 1.665f)));
  reference = {true, 0.999f, -1, 1.665f, 8};
  assert(isnan(calibratedTurbidityNtu(1.332f, reference, 1.665f)));
  // An actual 5V module can output above 3.3V behind the protective divider.
  // The legacy curve's artificial 3.3V module cutoff is not inherited.
  reference = {true, 3.33f, 10, 4.1625f, 0.1f};
  assert(closeTo(calibratedTurbidityNtu(3.74625f, reference, 1.665f), 5.05f));
  assert(isnan(calibratedTurbidityNtu(3.74625f, reference, NAN)));
  assert(isnan(calibratedTurbidityNtu(NAN, reference, 1.665f)));
}

static void turbidity_runtime_separate_signal_calibration_and_age() {
  for (int i = 0; i < 50; ++i) { clockMs += 20; serviceSensors(clockMs); }
  const SensorSnapshot unapproved = readSensors(clockMs, true);
  assert(unapproved.turbiditySignalValid && !unapproved.turbidityNtuCalibrated);
  assert(isfinite(unapproved.turbidityAdc) && isnan(unapproved.turbidityDiagnosticNtu));
  assert(isnan(unapproved.turbidity) && unapproved.turbiditySampleAgeMs < 500);
  TurbidityReferenceCalibration reference = {true, 0.999f, 8, 1.665f, 0};
  SensorSnapshot approved = readSensors(clockMs, true, tdsReferenceCalibration, reference);
  assert(approved.turbiditySignalValid && approved.turbidityNtuCalibrated);
  assert(closeTo(approved.turbidity, 0));  // Certified fixture zero, never a sentinel.
  assert(approved.tds == unapproved.tds && approved.waterLevel == unapproved.waterLevel);
  clockMs += 2001;
  approved = readSensors(clockMs, true, tdsReferenceCalibration, reference);
  assert(!approved.turbiditySignalValid && !approved.turbidityNtuCalibrated);
  assert(isnan(approved.turbidity) && approved.turbiditySampleAgeMs == UINT32_MAX);
}

static void local_index_measured_direction_and_invalid() {
  const float clear = 0.836f, cloudy = 0.645f, gain = 1.665f;
  assert(closeTo(localTurbidityIndex(clear * gain, gain, clear, cloudy), 0));
  assert(closeTo(localTurbidityIndex(cloudy * gain, gain, clear, cloudy), 10));
  assert(closeTo(localTurbidityIndex(0.830f * gain, gain, clear, cloudy), .314136f));
  assert(closeTo(localTurbidityIndex(0.837f * gain, gain, clear, cloudy), 0));
  assert(closeTo(localTurbidityIndex(0.7405f * gain, gain, clear, cloudy), 5));
  assert(isnan(localTurbidityIndex(NAN, gain, clear, cloudy)));
  assert(isnan(localTurbidityIndex(0.1f * gain, gain, clear, cloudy)));
  assert(isnan(localTurbidityIndex(clear * gain, gain, clear, clear)));
  assert(isnan(localTurbidityIndex(clear * gain, gain, cloudy, clear)));
  for (float v = 0.15f; v < clear - .02f; v += 0.01f)
    assert(localTurbidityIndex(v * gain, gain, clear, cloudy) > localTurbidityIndex((v + 0.01f) * gain, gain, clear, cloudy));
}

int main(int argc, char** argv) {
  struct Case { const char* name; void (*run)(); };
  const Case cases[] = {
    {"local_index_measured_direction_and_invalid", local_index_measured_direction_and_invalid},
    {"turbidity_reference_gate_and_bounds", turbidity_reference_gate_and_bounds},
    {"turbidity_measured_voltage_path_and_legacy_bias", turbidity_measured_voltage_path_and_legacy_bias},
    {"turbidity_runtime_separate_signal_calibration_and_age", turbidity_runtime_separate_signal_calibration_and_age},
    {"validity_confirmation", validity_confirmation},
    {"runtime_individual_invalid_and_recovery", runtime_individual_invalid_and_recovery},
    {"runtime_hc_noise_and_invalid_confirmation", runtime_hc_noise_and_invalid_confirmation},
    {"echo_bounds", echo_bounds}, {"geometry_and_clamps", geometry_and_clamps},
    {"geometry_missing_invalid", geometry_missing_invalid}, {"median_outliers", median_outliers},
    {"reservoir_mapping_full", reservoir_mapping_full}, {"reservoir_mapping_75", reservoir_mapping_75},
    {"reservoir_mapping_half", reservoir_mapping_half}, {"reservoir_mapping_25", reservoir_mapping_25},
    {"reservoir_mapping_empty", reservoir_mapping_empty},
    {"reservoir_edges_and_invalid", reservoir_edges_and_invalid},
    {"reservoir_monotonic_direction", reservoir_monotonic_direction},
    {"majority_required", majority_required}, {"invalid_replaces_previous", invalid_replaces_previous},
    {"freshness_and_wrap", freshness_and_wrap}, {"adc_range", adc_range},
    {"divider_reconstruction", divider_reconstruction}, {"reference_interpolation", reference_interpolation},
    {"reference_rejection", reference_rejection}, {"tds_reference", tds_reference},
    {"tds_calibration_gate_and_bounded_zero", tds_calibration_gate_and_bounded_zero},
    {"tds_calibration_rejects_unverified_or_invalid_references", tds_calibration_rejects_unverified_or_invalid_references},
    {"telemetry_rejection", telemetry_rejection}, {"retry_backoff", retry_backoff},
    {"retry_slow_request_no_burst", retry_slow_request_no_burst},
    {"legacy_demo_turbidity", legacy_demo_turbidity},
    {"retry_clock_wrap", retry_clock_wrap}, {"geometry_and_wiring_configuration", geometry_and_wiring_configuration},
    {"runtime_trigger_and_timeout", runtime_trigger_and_timeout},
    {"runtime_echo_diagnostics", runtime_echo_diagnostics},
    {"runtime_sampling_and_calibration_gate", runtime_sampling_and_calibration_gate},
    {"runtime_disconnect_and_recovery", runtime_disconnect_and_recovery},
    {"runtime_demo_profile", runtime_demo_profile},
    {"runtime_demo_level_bounds", runtime_demo_level_bounds},
    {"runtime_demo_tracks_changed_physical_inputs", runtime_demo_tracks_changed_physical_inputs},
  };
  if (argc != 2) return 2;
  for (const auto& test : cases) if (strcmp(argv[1], test.name) == 0) {
    test.run(); puts(test.name); return 0;
  }
  return 2;
}
