#include <assert.h>
#include "network_stubs/network_stubs.h"
void telemetryWorker(void*);
int sendTelemetry();
void connectToWiFi();
bool waitForTimeSync();
#define time waterhall_test_time
#include "waterhall_test_firmware.inc"
#undef time

static void advanceSensorTime(uint32_t duration) {
  const uint32_t until = clockMs + duration;
  while (clockMs < until) {
    if (clockMs >= modeledRecoveryAt) {
      modeledResponse = 200; WiFi.unavailable = false; validTime = true;
    }
    if (clockMs >= physicalChangeAt) { tdsRaw = 900; modeledTdsMv = 900; }
    if (samplingAllowed) {
      insideSampling = true; loop(); insideSampling = false;
    } else ++clockMs;
  }
}
static void initialize() {
  setup(); samplingAllowed = true; advanceSensorTime(500);
  assert(latestSensors && networkTask && analogSampleCount >= 10);
}
static void runWorker(uint32_t duration) {
  stopAt = clockMs + duration;
  try { telemetryWorker(nullptr); } catch (const TestStop&) {}
}
static void assertContinuousSampling() {
  assert(echoTimes.size() > 100 && analogTimes.size() > 100);
  for (size_t i = 1; i < echoTimes.size(); ++i) assert(echoTimes[i] - echoTimes[i-1] <= 70);
  for (size_t i = 1; i < analogTimes.size(); ++i) assert(analogTimes[i] - analogTimes[i-1] <= 44);
  SensorSnapshot sample; uint32_t observedAt;
  assert(readLatestSensorSnapshot(sample, observedAt));
  assert(clockMs - observedAt <= 20 && isfinite(sample.distance));
}
static void http_failure_sampling() {
  initialize(); modeledResponse = 500; modeledHttpDelay = 8000;
  runWorker(15000); assert(payloads.size() == 1);
  assert(sendSchedule.interval == 60000); assertContinuousSampling();
}
static void http_timeout_sampling() {
  initialize(); modeledResponse = -11; modeledHttpDelay = 8000;
  runWorker(15000); assert(payloads.size() == 1);
  assert(sendSchedule.interval == 60000); assertContinuousSampling();
}
static void wifi_failure_sampling() {
  initialize(); WiFi.unavailable = true; runWorker(15000);
  assert(payloads.empty() && sendSchedule.interval == 60000);
  assertContinuousSampling();
}
static void ntp_failure_sampling() {
  initialize(); validTime = false; runWorker(18000);
  assert(payloads.empty() && tlsBegins == 0 && !timeSynchronized);
  assert(sendSchedule.interval == 60000); assertContinuousSampling();
}
static void latest_after_network_recovery() {
  initialize(); WiFi.connectDelay = 4000; physicalChangeAt = clockMs + 500;
  modeledHttpDelay = 0;
  assert(sendTelemetry() == TELEMETRY_ACCEPTED);
  const int expected = int(lroundf(waterhall::sen0244Ppm(1.8f, 1, 25)));
  assert(payloads.back().find("\"tds_ppm\":" + std::to_string(expected)) != std::string::npos);
  assert(tdsSamples.median(clockMs, 7) > 0.89f);
}
static void stale_never_posted_individual_nulls() {
  initialize(); WiFi.connected = true; timeSynchronized = true;
  TimedSensorSnapshot latest = {readSensors(clockMs), clockMs - 2001};
  xQueueOverwrite(latestSensors, &latest);
  assert(sendTelemetry() == TELEMETRY_NO_SAMPLE && payloads.empty());
  modeledHttpDelay = 0;
  const SensorSnapshot valid = readSensors(clockMs);
  for (int field = 0; field < 4; ++field) {
    latest.observedAt = clockMs; latest.sample = valid;
    if (field == 0 || field == 3) latest.sample.waterLevel = -1;
    if (field == 1 || field == 3) latest.sample.turbidity = NAN;
    if (field == 2 || field == 3) latest.sample.tds = NAN;
    xQueueOverwrite(latestSensors, &latest);
    assert(sendTelemetry() == TELEMETRY_ACCEPTED);
    const std::string& payload = payloads.back();
    assert(payload.find("nan") == std::string::npos);
    assert(payload.find("\"calibration_required\":true") != std::string::npos);
    assert((payload.find("\"water_level_percentage\":null") != std::string::npos) == (field == 0 || field == 3));
    assert((payload.find("\"turbidity_ntu\":null") != std::string::npos) == (field == 1 || field == 3));
    assert((payload.find("\"tds_ppm\":null") != std::string::npos) == (field == 2 || field == 3));
  }
  latest.sample = valid; xQueueOverwrite(latestSensors, &latest);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.size() == 5);
}
static void cadence_and_next_request_current() {
  initialize(); physicalChangeAt = clockMs + 15000;
  runWorker(27000); assert(payloads.size() == 2);
  assert(postStarts[1] - postStarts[0] >= modeledHttpDelay + 10000 &&
         postStarts[1] - postStarts[0] < modeledHttpDelay + 10100);
  assert(payloads[0] != payloads[1]); assertContinuousSampling();
}
static void legacy_contract_guard() {
  assert(PRODUCTION_TELEMETRY_ENABLED && !NULLABLE_ANALOG_TELEMETRY_SUPPORTED);
  initialize(); WiFi.connected = true; timeSynchronized = true; modeledHttpDelay = 0;
  const SensorSnapshot valid = readSensors(clockMs);
  TimedSensorSnapshot latest = {valid, clockMs};
  latest.sample.waterLevel = -1; xQueueOverwrite(latestSensors, &latest);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED);
  assert(payloads.back().find("\"water_level_percentage\":null") != std::string::npos);
  for (int field = 0; field < 3; ++field) {
    latest.sample = valid;
    if (field == 0 || field == 2) latest.sample.turbidity = NAN;
    if (field == 1 || field == 2) latest.sample.tds = NAN;
    xQueueOverwrite(latestSensors, &latest);
    assert(sendTelemetry() == TELEMETRY_FAILED && payloads.size() == 1);
  }
  latest.sample = valid; xQueueOverwrite(latestSensors, &latest);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.size() == 2);
  assert(payloads.back().find("\"water_level_percentage\":100") != std::string::npos);
  assert(Serial.output.find("no fabricated/cached values") != std::string::npos);
}
static void capture_blocks_production() {
  assert(BENCH_CAPTURE_ONLY && PRODUCTION_TELEMETRY_ENABLED);
  initialize();
  assert(sendTelemetry() == TELEMETRY_FAILED && payloads.empty());
  Serial.input = "send\n"; serviceSerial(); runWorker(30000);
  assert(payloads.empty()); assertContinuousSampling();
}
static void serial_commands_bounded() {
  initialize(); Serial.input = std::string(100, 'z') + "\nstatus\nwifi-test\n";
  serviceSerial(); assert(notifications == REQUEST_WIFI_TEST);
  assert(Serial.output.find(std::string(100, 'z')) == std::string::npos);
  assert(Serial.output.find("[SAMPLE]") != std::string::npos);
  Serial.input = "send\n"; serviceSerial(); assert(notifications & REQUEST_SEND);
}
static void http_failure_recovers_after_backoff() {
  initialize(); modeledResponse = 500; modeledHttpDelay = 8000;
  modeledRecoveryAt = clockMs + 40000; physicalChangeAt = clockMs + 20000;
  runWorker(90000);
  assert(postResponses.size() >= 2 && postResponses[0] == 500 && postResponses[1] == 200);
  assert(postStarts[1] - (postStarts[0] + 8000) >= 60000);
  assert(payloads[0] != payloads[1] && sendSchedule.interval == 10000);
  assertContinuousSampling();
}
static void wifi_failure_recovers_after_backoff() {
  initialize(); WiFi.unavailable = true; modeledRecoveryAt = clockMs + 20000;
  runWorker(80000);
  assert(!payloads.empty() && postResponses.front() == 200 && timeSynchronized);
  assert(postStarts.front() >= 72500 && sendSchedule.interval == 10000);
  assertContinuousSampling();
}
static void ntp_failure_recovers_after_backoff() {
  initialize(); validTime = false; modeledRecoveryAt = clockMs + 20000;
  runWorker(85000);
  assert(!payloads.empty() && postResponses.front() == 200 && timeSynchronized);
  assert(postStarts.front() >= 75000 && sendSchedule.interval == 10000);
  assertContinuousSampling();
}
static void wifi_autorecovery_initializes_ntp() {
  initialize(); WiFi.connected = true; timeSynchronized = false; modeledHttpDelay = 0;
  assert(ntpConfigurations == 0);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED);
  assert(ntpConfigurations > 0);  // A restored Wi-Fi link may precede any SNTP setup.
}
static void tds_low_range_boundaries() {
  assert(!waterhall::validTdsAdcSample(4, 120, true));
  assert(!waterhall::validTdsAdcSample(100, 99, true));
  assert(waterhall::validTdsAdcSample(100, 100, true));
  assert(waterhall::validTdsAdcSample(3800, 950, true));
  assert(!waterhall::validTdsAdcSample(3800, 951, true));
  assert(!waterhall::validTdsAdcSample(4091, 750, true));
  assert(!waterhall::validTdsAdcSample(100, 120, false));
  assert(waterhall::validTdsAdcSample(100, 150, false));
  assert(isnan(waterhall::tdsModuleVoltage(0.099f, 2, true)));
  assert(fabsf(waterhall::tdsModuleVoltage(0.1f, 2, true) - 0.2f) < 0.0001f);
  assert(fabsf(waterhall::tdsModuleVoltage(0.95f, 2, true) - 1.9f) < 0.0001f);
  assert(isnan(waterhall::tdsModuleVoltage(0.951f, 2, true)));
  assert(isnan(waterhall::tdsModuleVoltage(0.12f, 2, false)));
}
static void tds_low_range_raw_only_and_post_block() {
  assert(TDS_LOW_RANGE_BENCH && BENCH_CAPTURE_ONLY && PRODUCTION_TELEMETRY_ENABLED);
  assert(TDS_DIVIDER_GAIN == 2.0f);
  tdsRaw = 500; modeledTdsMv = 120;
  initialize();
  assert(configuredAdcBits == 12 && configuredTdsAttenuation == ADC_0db);
  assert(configuredTurbidityAttenuation == ADC_11db);
#ifdef WATERHALL_TDS_LOW_RANGE_BENCH
  assert(tdsLowRangeCalibration && lastCalibrationRaw == tdsRaw);
#endif
  const SensorSnapshot sample = readSensors(clockMs);
  assert(sample.waterLevel == 100 && isfinite(sample.turbidity));
  assert(fabsf(sample.turbidityAdc - 0.6f) < 0.0001f);
  assert(fabsf(sample.tdsAdc - 0.12f) < 0.0001f);
  assert(fabsf(sample.tdsVoltage - 0.24f) < 0.0001f && isnan(sample.tds));
  Serial.input = "status\nsend\n"; serviceSerial(); runWorker(30000);
  assert(payloads.empty() && sendTelemetry() == TELEMETRY_FAILED);
  assert(Serial.output.find("tds_db=0 tds_state=MEASURABLE_UNCALIBRATED") != std::string::npos);
  assertContinuousSampling();
}
static void tds_low_range_invalid_and_recovery() {
  tdsRaw = 500; modeledTdsMv = 120;
  initialize();
  for (int state = 0; state < 2; ++state) {
    tdsRaw = state ? 4095 : 30; modeledTdsMv = state ? 1000 : 90;
    advanceSensorTime(500);
    const SensorSnapshot invalid = readSensors(clockMs);
    assert(isnan(invalid.tdsAdc) && isnan(invalid.tdsVoltage) && isnan(invalid.tds));
    assert(invalid.waterLevel == 100 && isfinite(invalid.turbidity));
    Serial.input = "status\n"; serviceSerial();
    assert(Serial.output.find(state ? "CLIPPED_OR_OVER_RANGE" :
                             "LOW_SIGNAL_OR_FAULT_UNQUANTIFIED") != std::string::npos);
  }
  tdsRaw = 600; modeledTdsMv = 250; advanceSensorTime(500);
  assert(isfinite(readSensors(clockMs).tdsAdc) && isnan(readSensors(clockMs).tds));
  clockMs += 2101;  // Stop sensor servicing: fresh medians must expire.
  assert(isnan(readSensors(clockMs).tdsAdc) && isnan(readSensors(clockMs).tds));
}
static void tds_low_range_calibration_failure() {
#ifdef WATERHALL_TDS_LOW_RANGE_BENCH
  tdsRaw = 500; modeledTdsMv = 120; modeledCalibrationFailure = 1;
  initialize();
  assert(!tdsLowRangeCalibration && lastTdsRaw == 500);
  assert(isnan(readSensors(clockMs).tdsAdc) && isnan(lastTdsRawVoltage));
  assert(readSensors(clockMs).waterLevel == 100 && isfinite(readSensors(clockMs).turbidity));
  Serial.input = "status\nsend\n"; serviceSerial(); runWorker(500);
  assert(Serial.output.find("ADC_CALIBRATION_UNAVAILABLE") != std::string::npos);
  assert(payloads.empty() && sendTelemetry() == TELEMETRY_FAILED);
  modeledCalibrationFailure = 2; setup();  // Creation failure also stays raw-only.
  assert(!tdsLowRangeCalibration);
  modeledCalibrationFailure = 0; setup();
  assert(tdsLowRangeCalibration);
  for (int failure = 3; failure <= 4; ++failure) {
    modeledCalibrationFailure = failure; advanceSensorTime(500);
    assert(isnan(readSensors(clockMs).tdsAdc) && isnan(lastTdsRawVoltage));
    assert(readSensors(clockMs).waterLevel == 100 && isfinite(readSensors(clockMs).turbidity));
  }
  modeledCalibrationFailure = 0; advanceSensorTime(500);
  assert(isfinite(readSensors(clockMs).tdsAdc) && isnan(readSensors(clockMs).tds));
#endif
}
static void tds_low_range_production_live_and_invalid() {
#ifdef WATERHALL_TDS_LOW_RANGE_PRODUCTION
  assert(TDS_LOW_RANGE && !TDS_LOW_RANGE_BENCH && !BENCH_CAPTURE_ONLY);
  assert(PRODUCTION_TELEMETRY_ENABLED && !NULLABLE_ANALOG_TELEMETRY_SUPPORTED);
  tdsRaw = 135; modeledTdsMv = 106;
  initialize(); WiFi.connected = true; timeSynchronized = true; modeledHttpDelay = 0;
  assert(configuredTdsAttenuation == ADC_0db && configuredTurbidityAttenuation == ADC_11db);
  const SensorSnapshot tap = readSensors(clockMs);
  assert(fabsf(tap.tdsVoltage - 0.212f) < 0.0001f && isfinite(tap.tds));
  assert(sendTelemetry() == TELEMETRY_ACCEPTED);
  const std::string first = payloads.back();
  tdsRaw = 629; modeledTdsMv = 221; advanceSensorTime(500);
  assert(readSensors(clockMs).tds > tap.tds && sendTelemetry() == TELEMETRY_ACCEPTED);
  assert(payloads.back() != first);
  for (int state = 0; state < 3; ++state) {
    tdsRaw = state == 1 ? 4095 : 100;
    modeledTdsMv = state == 1 ? 1000 : 90;
    modeledCalibrationFailure = state == 2 ? 3 : 0;
    advanceSensorTime(500);
    assert(isnan(readSensors(clockMs).tds) && sendTelemetry() == TELEMETRY_FAILED);
    assert(payloads.size() == 2);  // Never post zero, cached ppm or unsupported null.
  }
  modeledCalibrationFailure = 0; tdsRaw = 137; modeledTdsMv = 107;
  advanceSensorTime(500);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.size() == 3);
  assert(payloads.back().find("\"calibration_required\":true") != std::string::npos);
  clockMs += 2101;
  assert(sendTelemetry() == TELEMETRY_NO_SAMPLE && payloads.size() == 3);
#endif
}
static void tds_low_range_production_cadence() {
#ifdef WATERHALL_TDS_LOW_RANGE_PRODUCTION
  tdsRaw = 135; modeledTdsMv = 106;
  initialize(); physicalChangeAt = clockMs + 15000;
  runWorker(27000);
  assert(payloads.size() == 2 && payloads[0] != payloads[1]);
  assert(postStarts[1] - postStarts[0] >= modeledHttpDelay + 10000);
  assertContinuousSampling();
#endif
}
static void tds_partial_production_posts_null_and_live_values() {
#ifdef WATERHALL_TDS_PARTIAL_PRODUCTION
  assert(TDS_PARTIAL_PRODUCTION && TDS_LOW_RANGE && NULLABLE_ANALOG_TELEMETRY_SUPPORTED);
  tdsRaw = 0; modeledTdsMv = 75;
  initialize(); WiFi.connected = true; timeSynchronized = true; modeledHttpDelay = 0;
  assert(configuredTdsAttenuation == ADC_0db && configuredTurbidityAttenuation == ADC_11db);
  assert(isnan(readSensors(clockMs).tds) && sendTelemetry() == TELEMETRY_ACCEPTED);
  const std::string first = payloads.back();
  assert(first.find("\"tds_ppm\":null") != std::string::npos);
  echoUs = 1400; turbidityRaw = 900; modeledTurbidityMv = 900;
  tdsRaw = 629; modeledTdsMv = 221; advanceSensorTime(1000);
  assert(isfinite(readSensors(clockMs).tdsAdc) && isnan(readSensors(clockMs).tds));
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.back() != first);
  assert(payloads.back().find("\"tds_ppm\":null") != std::string::npos);
  turbidityRaw = 0; modeledTurbidityMv = 75; advanceSensorTime(1000);
#ifdef WATERHALL_NULLABLE_TURBIDITY_PRODUCTION
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.size() == 3);
  assert(payloads.back().find("\"turbidity_ntu\":null") != std::string::npos);
  assert(payloads.back().find("\"water_level_percentage\":null") == std::string::npos);
  assert(payloads.back().find("\"tds_ppm\":null") != std::string::npos);
  echoUs = 0; advanceSensorTime(1000);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.size() == 4);
  assert(payloads.back().find("\"water_level_percentage\":null") != std::string::npos);
  turbidityRaw = 900; modeledTurbidityMv = 900; echoUs = 1400; advanceSensorTime(1000);
  assert(sendTelemetry() == TELEMETRY_ACCEPTED && payloads.size() == 5);
  assert(payloads.back().find("\"turbidity_ntu\":null") == std::string::npos);
#else
  assert(sendTelemetry() == TELEMETRY_FAILED && payloads.size() == 2);
#endif
  clockMs += 2101;
  assert(sendTelemetry() == TELEMETRY_NO_SAMPLE);
#endif
}
static void tds_partial_production_cadence() {
#ifdef WATERHALL_TDS_PARTIAL_PRODUCTION
  tdsRaw = 0; modeledTdsMv = 75;
  initialize(); runWorker(27000);
  assert(payloads.size() == 2);
  assert(postStarts[1] - postStarts[0] >= modeledHttpDelay + 10000);
  for (const auto& payload : payloads) assert(payload.find("\"tds_ppm\":null") != std::string::npos);
  assertContinuousSampling();
#endif
}

static void tds_approved_reference_numeric_null_and_recovery() {
#ifdef WATERHALL_TDS_PARTIAL_PRODUCTION
  // Known synthetic concentrations test the actual runtime/JSON path, never
  // a production POST or a calibration claim for the physical board.
  waterhall::TdsReferenceCalibration calibration = {true, 0.4f, 0, 1.4f, 500, 25};
  tdsRaw = 800; modeledTdsMv = 450;
  initialize(); WiFi.connected = true; timeSynchronized = true; modeledHttpDelay = 0;
  auto publish = [&]() {
    TimedSensorSnapshot latest = {readSensors(clockMs, true, calibration), clockMs};
    xQueueOverwrite(latestSensors, &latest);
    assert(sendTelemetry() == TELEMETRY_ACCEPTED);
    return payloads.back();
  };
  assert(isnan(readSensors(clockMs).tds));  // Default approval remains off.
  assert(publish().find("\"tds_ppm\":250") != std::string::npos);
  tdsRaw = 600; modeledTdsMv = 200; advanceSensorTime(1000);
  assert(publish().find("\"tds_ppm\":0,") != std::string::npos);
  for (int failure = 0; failure < 4; ++failure) {
    tdsRaw = failure == 0 ? 0 : failure == 1 ? 4095 : 800;
    modeledTdsMv = failure == 0 ? 75 : failure == 1 ? 1000 : failure == 2 ? 150 : 800;
    advanceSensorTime(1000);
    const std::string payload = publish();
    assert(payload.find("\"tds_ppm\":null") != std::string::npos);
    assert(payload.find("\"water_level_percentage\":null") == std::string::npos);
    assert(payload.find("\"turbidity_ntu\":null") == std::string::npos);
  }
  tdsRaw = 800; modeledTdsMv = 450; advanceSensorTime(1000);
  assert(publish().find("\"tds_ppm\":250") != std::string::npos);
  calibration.measuredTemperatureC = NAN;
  assert(publish().find("\"tds_ppm\":null") != std::string::npos);
  calibration.measuredTemperatureC = 25; calibration.approved = false;
  assert(publish().find("\"tds_ppm\":null") != std::string::npos);
  clockMs += 2101;
  assert(isnan(readSensors(clockMs, true, calibration).tdsAdc));
  assert(sendTelemetry() == TELEMETRY_NO_SAMPLE);
#endif
}
int main(int argc, char** argv) {
  struct Case { const char* name; void (*run)(); };
  const Case cases[] = {
    {"tds_partial_production_posts_null_and_live_values", tds_partial_production_posts_null_and_live_values},
    {"tds_partial_production_cadence", tds_partial_production_cadence},
    {"tds_approved_reference_numeric_null_and_recovery", tds_approved_reference_numeric_null_and_recovery},
    {"http_failure_sampling", http_failure_sampling}, {"http_timeout_sampling", http_timeout_sampling},
    {"wifi_failure_sampling", wifi_failure_sampling}, {"ntp_failure_sampling", ntp_failure_sampling},
    {"latest_after_network_recovery", latest_after_network_recovery},
    {"stale_never_posted_individual_nulls", stale_never_posted_individual_nulls},
    {"cadence_and_next_request_current", cadence_and_next_request_current},
    {"legacy_contract_guard", legacy_contract_guard},
    {"capture_blocks_production", capture_blocks_production},
    {"serial_commands_bounded", serial_commands_bounded},
    {"http_failure_recovers_after_backoff", http_failure_recovers_after_backoff},
    {"wifi_failure_recovers_after_backoff", wifi_failure_recovers_after_backoff},
    {"ntp_failure_recovers_after_backoff", ntp_failure_recovers_after_backoff},
    {"wifi_autorecovery_initializes_ntp", wifi_autorecovery_initializes_ntp},
    {"tds_low_range_boundaries", tds_low_range_boundaries},
    {"tds_low_range_raw_only_and_post_block", tds_low_range_raw_only_and_post_block},
    {"tds_low_range_invalid_and_recovery", tds_low_range_invalid_and_recovery},
    {"tds_low_range_calibration_failure", tds_low_range_calibration_failure},
    {"tds_low_range_production_live_and_invalid", tds_low_range_production_live_and_invalid},
    {"tds_low_range_production_cadence", tds_low_range_production_cadence},
  };
  if (argc != 2) return 2;
  for (const auto& test : cases) if (strcmp(argv[1], test.name) == 0) {
    test.run(); puts(test.name); return 0;
  }
  return 2;
}
