#pragma once
#include "sensor_config.h"
#include "sensor_processing.h"

#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
bool readTdsLowRangeMillivolts(uint16_t raw, uint32_t& millivolts);
bool lastTdsVoltageEstimateValid = false;
#endif

waterhall::SampleWindow<5> distanceSamples;
waterhall::SampleWindow<9> turbiditySamples;
waterhall::SampleWindow<9> tdsSamples;
uint16_t lastTurbidityRaw = 0;
uint16_t lastTdsRaw = 0;
uint32_t lastTdsRawMillivolts = 0;
uint32_t lastAnalogSample = 0;
uint32_t lastEchoSample = 0;
uint32_t echoSampleCount = 0;
uint32_t lastEchoDurationUs = 0;
uint32_t echoTimeoutCount = 0;
uint32_t echoInvalidRangeCount = 0;
uint32_t analogSampleCount = 0;
float lastTurbidityAdcVoltage = NAN;
float lastTdsAdcVoltage = NAN;
float lastTurbidityRawVoltage = NAN;
float lastTdsRawVoltage = NAN;
float lastDistanceCm = NAN;
waterhall::ValidityConfirmation distanceValidity;
waterhall::ValidityConfirmation turbidityValidity;
waterhall::ValidityConfirmation tdsValidity;

bool configuredDistanceValid(float distance) {
  // Full/empty are calibration endpoints, not electrical distance-validity
  // bounds. Plausible echoes beyond either endpoint clamp to 100% or 0%.
  return isfinite(distance) && distance >= waterhall::MIN_DISTANCE_CM &&
      distance <= waterhall::MAX_DISTANCE_CM;
}

struct SensorSnapshot {
  int waterLevel;
  float distance;
  float turbidityAdc;
  float tdsAdc;
  float turbidityVoltage;
  float tdsVoltage;
  float turbidity;
  float tds;
  float waterDepth;
};

float readDistanceCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(4);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  lastEchoDurationUs = pulseIn(PIN_ECHO, HIGH, waterhall::ECHO_TIMEOUT_US);
  const float distance = waterhall::echoDistanceCm(lastEchoDurationUs);
  if (lastEchoDurationUs == 0) ++echoTimeoutCount;
  else if (!isfinite(distance)) ++echoInvalidRangeCount;
  return distance;
}

void serviceSensors(uint32_t now) {
  // HC-SR04 datasheet requires more than 60 ms between triggers.
  if (uint32_t(now - lastEchoSample) >= 65) {
    lastEchoSample = now;
    const float distance = readDistanceCm();
    lastDistanceCm = distance;
    const bool wasAvailable = distanceValidity.available;
    distanceValidity.observe(configuredDistanceValid(distance));
    if (wasAvailable && !distanceValidity.available) distanceSamples.clear();
    distanceSamples.add(distance, millis());
    ++echoSampleCount;
  }
  now = millis();
  if (uint32_t(now - lastAnalogSample) >= 40) {
    lastAnalogSample = now;
    // raw and calibrated mV are separate adjacent ADC conversions.
    lastTurbidityRaw = analogRead(PIN_TURBIDITY);
    const uint32_t turbidityMv = analogReadMilliVolts(PIN_TURBIDITY);
    lastTdsRaw = analogRead(PIN_TDS);
#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
    uint32_t tdsMv = 0;
    lastTdsVoltageEstimateValid = readTdsLowRangeMillivolts(lastTdsRaw, tdsMv);
#else
    const uint32_t tdsMv = analogReadMilliVolts(PIN_TDS);
#endif
    lastTdsRawMillivolts = tdsMv;
    ++analogSampleCount;
    // Diagnostic ADC estimates include zero/clipping; they never make a sample
    // valid and are not independent electrical measurements of the wiring.
    lastTurbidityRawVoltage = turbidityMv / 1000.0f;
    lastTdsRawVoltage = tdsMv / 1000.0f;
#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
    if (!lastTdsVoltageEstimateValid) lastTdsRawVoltage = NAN;
#endif
    lastTurbidityAdcVoltage = waterhall::validAdcSample(lastTurbidityRaw, turbidityMv)
        ? turbidityMv / 1000.0f : NAN;
    lastTdsAdcVoltage = waterhall::validTdsAdcSample(lastTdsRaw, tdsMv, TDS_LOW_RANGE)
        ? tdsMv / 1000.0f : NAN;
    const bool turbidityWasAvailable = turbidityValidity.available;
    const bool tdsWasAvailable = tdsValidity.available;
    turbidityValidity.observe(isfinite(lastTurbidityAdcVoltage));
    tdsValidity.observe(isfinite(lastTdsAdcVoltage));
    if (turbidityWasAvailable && !turbidityValidity.available) turbiditySamples.clear();
    if (tdsWasAvailable && !tdsValidity.available) tdsSamples.clear();
    turbiditySamples.add(lastTurbidityAdcVoltage, now);
    tdsSamples.add(lastTdsAdcVoltage, now);
  }
}

// One complete line per requested status: less UART overhead than repeating the
// full calibration notes at 10 Hz. MCU counts distinguish actual sensor samples
// from repeated host observations. All fields remain real, uncalibrated readings.
void printSensorStatus(const SensorSnapshot& sample, uint32_t now) {
  const char* tdsState = analogSampleCount
      ? waterhall::tdsAdcState(lastTdsRaw, lastTdsRawMillivolts, TDS_LOW_RANGE)
      : "NO_SAMPLE_YET";
#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
  if (analogSampleCount && !lastTdsVoltageEstimateValid) tdsState = "ADC_CALIBRATION_UNAVAILABLE";
#endif
  Serial.printf("[SAMPLE] ms=%lu echo_n=%lu analog_n=%lu hc_raw=%.2f hc=%.2f "
                "turb_raw=%u turb_v=%.3f turb=%.3f tds_raw=%u tds_v=%.3f tds=%.3f "
                "level=%d ntu=%.2f ppm=%.0f turb_mod=%.3f tds_mod=%.3f depth=%.2f "
                "tds_db=%u tds_state=%s echo_us=%lu echo_timeout_n=%lu "
                "echo_invalid_n=%lu hc_available=%u\n",
                (unsigned long)now, (unsigned long)echoSampleCount,
                (unsigned long)analogSampleCount, lastDistanceCm, sample.distance,
                lastTurbidityRaw, lastTurbidityRawVoltage, sample.turbidityAdc,
                lastTdsRaw, lastTdsRawVoltage, sample.tdsAdc,
                sample.waterLevel, sample.turbidity, sample.tds,
                lastTurbidityRawVoltage * TURBIDITY_DIVIDER_GAIN,
                lastTdsRawVoltage * TDS_DIVIDER_GAIN, sample.waterDepth,
                TDS_LOW_RANGE ? 0u : 11u,
                tdsState, (unsigned long)lastEchoDurationUs,
                (unsigned long)echoTimeoutCount, (unsigned long)echoInvalidRangeCount,
                distanceValidity.available ? 1u : 0u);
}

const waterhall::TdsReferenceCalibration tdsReferenceCalibration = {
    TDS_REFERENCE_CALIBRATION_APPROVED, TDS_REFERENCE_1_VOLTS, TDS_REFERENCE_1_PPM,
    TDS_REFERENCE_2_VOLTS, TDS_REFERENCE_2_PPM, TDS_CALIBRATION_MEASURED_TEMPERATURE_C};

SensorSnapshot readSensors(uint32_t now, bool provisionalDemo = PROVISIONAL_DEMO_MODE,
    const waterhall::TdsReferenceCalibration& tdsReference = tdsReferenceCalibration) {
  SensorSnapshot sample;
  sample.distance = distanceSamples.median(now, 3);
  sample.waterDepth = distanceValidity.available
      ? waterhall::waterDepthCm(sample.distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) : NAN;
  sample.waterLevel = distanceValidity.available
      ? waterhall::waterPercentage(sample.distance, EMPTY_DISTANCE_CM, FULL_DISTANCE_CM) : -1;
  sample.turbidityAdc = turbidityValidity.available ? turbiditySamples.median(now, 7) : NAN;
  sample.tdsAdc = tdsValidity.available ? tdsSamples.median(now, 7) : NAN;
  sample.turbidityVoltage = waterhall::moduleVoltage(sample.turbidityAdc, TURBIDITY_DIVIDER_GAIN);
  sample.tdsVoltage = waterhall::tdsModuleVoltage(sample.tdsAdc, TDS_DIVIDER_GAIN,
                                                TDS_LOW_RANGE);
  sample.turbidity = TURBIDITY_REFERENCE_CALIBRATION_APPROVED
      ? waterhall::referenceValue(sample.turbidityVoltage,
      TURBIDITY_REFERENCE_1_VOLTS, TURBIDITY_REFERENCE_1_NTU,
      TURBIDITY_REFERENCE_2_VOLTS, TURBIDITY_REFERENCE_2_NTU, 10000) : NAN;
  // This polynomial already existed in WaterHall's readTDSppm. Demo opt-in
  // does not assert that the unknown generic module is a SEN0244.
  // In the partial-production profile, only reviewed reference calibration can
  // supply ppm. The legacy demo flag must never bypass that approval gate.
  sample.tds = TDS_LOW_RANGE_BENCH ? NAN : tdsReference.approved
      ? waterhall::calibratedTdsPpm(sample.tdsVoltage, tdsReference, TDS_DIVIDER_GAIN, TDS_LOW_RANGE)
      : TDS_PARTIAL_PRODUCTION ? NAN : (provisionalDemo || TDS_USE_SEN0244_REFERENCE)
      ? waterhall::sen0244Ppm(sample.tdsVoltage, TDS_CALIBRATION_FACTOR, TDS_REFERENCE_TEMPERATURE_C)
      : waterhall::referenceValue(sample.tdsVoltage, TDS_REFERENCE_1_VOLTS,
          TDS_REFERENCE_1_PPM, TDS_REFERENCE_2_VOLTS, TDS_REFERENCE_2_PPM, 100000);
  return sample;
}

void printSensors(const SensorSnapshot& sample) {
  Serial.printf("[HC-SR04] Echo duration: %lu us | Timeouts: %lu | Invalid/out-of-range: %lu\n",
                (unsigned long)lastEchoDurationUs, (unsigned long)echoTimeoutCount,
                (unsigned long)echoInvalidRangeCount);
  if (isfinite(lastDistanceCm)) Serial.printf("[HC-SR04] Raw distance: %.1f cm\n", lastDistanceCm);
  else Serial.println("[HC-SR04] Raw distance: unavailable (timeout/out of range)");
  if (isfinite(sample.distance)) Serial.printf("[HC-SR04] Filtered distance: %.1f cm\n", sample.distance);
  else Serial.println("[HC-SR04] Filtered distance: unavailable (need 3 fresh valid echoes)");
  if (isfinite(sample.waterDepth)) Serial.printf("[WATER] Depth: %.1f cm\n", sample.waterDepth);
  else Serial.println("[WATER] Depth: unavailable");
  if (sample.waterLevel >= 0) Serial.printf("[WATER] Level: %d %% (intended geometry; physical accuracy verification required)\n", sample.waterLevel);
  else Serial.println("[WATER] Level: unavailable; fresh valid echo required");
  Serial.printf("[TURBIDITY] Raw ADC: %u | ADC Voltage: %.3f V | Module Voltage: %.3f V | ",
                lastTurbidityRaw, sample.turbidityAdc, sample.turbidityVoltage);
  if (isfinite(sample.turbidity)) Serial.printf("NTU: %.2f (approved bounded reference estimate)\n",
      sample.turbidity);
  else Serial.println("NTU: unavailable (invalid/stale signal or unapproved reference calibration)");
  Serial.printf("[TDS] Raw ADC: %u | ADC Voltage: %.3f V | Module Voltage: %.3f V | ",
                lastTdsRaw, sample.tdsAdc, sample.tdsVoltage);
  if (TDS_LOW_RANGE_BENCH)
    Serial.println("ppm: unset (raw/voltage diagnosis only; MANUAL CALIBRATION REQUIRED)");
  else if (isfinite(sample.tds)) Serial.printf("ppm: %.0f (%s; calibration limits apply)\n",
      sample.tds, TDS_REFERENCE_CALIBRATION_APPROVED ? "approved bounded reference estimate" : "legacy provisional approximation");
  else if (TDS_PARTIAL_PRODUCTION)
    Serial.println("ppm: unset (unquantifiable or reference approval required; MANUAL CALIBRATION REQUIRED)");
  else Serial.println("ppm: unavailable (invalid ADC or module/reference calibration required)");
  if (TDS_PARTIAL_PRODUCTION || TDS_REFERENCE_CALIBRATION_APPROVED)
    Serial.println("[TDS] Temperature: no live measurement/compensation; reference operating policy required");
  else if (PROVISIONAL_DEMO_MODE || TDS_USE_SEN0244_REFERENCE)
    Serial.printf("[TDS] Temperature compensation: fixed %.1f C reference, NOT measured\n", TDS_REFERENCE_TEMPERATURE_C);
  else Serial.println("[TDS] Temperature compensation: absent; references must match test temperature");
}
