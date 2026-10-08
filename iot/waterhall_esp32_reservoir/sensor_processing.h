#pragma once
#include <math.h>
#include <stddef.h>
#include <stdint.h>

namespace waterhall {
constexpr float MIN_DISTANCE_CM = 2.0f;
constexpr float MAX_DISTANCE_CM = 400.0f;
constexpr uint32_t ECHO_TIMEOUT_US = 25000;
constexpr uint32_t SAMPLE_MAX_AGE_MS = 2000;
constexpr uint32_t SEND_INTERVAL_MS = 10000;  // Conservative requested demo cadence.
constexpr uint32_t MIN_COMPLETION_GAP_MS = 10000;  // Wait 10 seconds after each POST.
constexpr uint32_t MIN_RETRY_INTERVAL_MS = 60000;  // Preserve conservative failure retries.
constexpr uint32_t MAX_RETRY_INTERVAL_MS = 300000;

// Count actual sensor conversions, never status requests or network snapshots.
// Three misses confirm unavailable; three valid samples permit recovery. Median
// windows additionally require 3 echoes / 7 ADC conversions before publication.
struct ValidityConfirmation {
  uint8_t validRun = 0;
  uint8_t invalidRun = 0;
  bool available = false;
  void observe(bool valid) {
    if (valid) {
      invalidRun = 0;
      if (validRun < 3) ++validRun;
      if (validRun == 3) available = true;
    } else {
      validRun = 0;
      if (invalidRun < 3) ++invalidRun;
      if (invalidRun == 3) available = false;
    }
  }
};

inline float echoDistanceCm(uint32_t durationUs) {
  // Sound speed at approximately 20 C; no ambient temperature sensor is fitted.
  const float distance = durationUs * 0.0343f / 2.0f;
  return durationUs && durationUs < ECHO_TIMEOUT_US &&
         distance >= MIN_DISTANCE_CM && distance <= MAX_DISTANCE_CM
             ? distance : NAN;
}

// Fixed memory, fresh samples only. Invalid samples replace older valid ones.
template <size_t N> struct SampleWindow {
  float values[N] = {};
  uint32_t times[N] = {};
  size_t count = 0;
  size_t next = 0;
  void clear() { count = 0; next = 0; }

  void add(float value, uint32_t now) {
    values[next] = value;
    times[next] = now;
    next = (next + 1) % N;
    if (count < N) ++count;
  }

  float median(uint32_t now, size_t minimumValid) const {
    float sorted[N];
    size_t valid = 0;
    if (minimumValid == 0 || minimumValid > N) return NAN;
    for (size_t i = 0; i < count; ++i) {
      if (!isfinite(values[i]) || uint32_t(now - times[i]) > SAMPLE_MAX_AGE_MS) continue;
      size_t j = valid;
      while (j && sorted[j - 1] > values[i]) {
        sorted[j] = sorted[j - 1];
        --j;
      }
      sorted[j] = values[i];
      ++valid;
    }
    if (valid < minimumValid) return NAN;
    return valid % 2 ? sorted[valid / 2]
                     : (sorted[valid / 2 - 1] + sorted[valid / 2]) / 2.0f;
  }
};

inline float waterDepthCm(float distance, float emptyCm, float fullCm) {
  if (!isfinite(distance) || !isfinite(emptyCm) || !isfinite(fullCm) ||
      fullCm < MIN_DISTANCE_CM || emptyCm > MAX_DISTANCE_CM || emptyCm <= fullCm ||
      distance < MIN_DISTANCE_CM || distance > MAX_DISTANCE_CM) return NAN;
  const float depth = emptyCm - distance;
  return depth < 0 ? 0 : depth > emptyCm - fullCm ? emptyCm - fullCm : depth;
}

inline int waterPercentage(float distance, float emptyCm, float fullCm) {
  const float depth = waterDepthCm(distance, emptyCm, fullCm);
  if (!isfinite(depth)) return -1;
  const float percentage = 100.0f * depth / (emptyCm - fullCm);
  return int(lroundf(percentage));
}

inline bool validAdcSample(uint16_t raw, uint32_t millivolts) {
  // ESP32 ADC_11db documented calibrated range: 150..3100 mV.
  // Near-zero / clipped readings cannot establish sensor presence or accuracy.
  return raw > 4 && raw < 4091 && millivolts >= 150 && millivolts <= 3100;
}

inline float moduleVoltage(float adcVolts, float dividerGain) {
  return isfinite(adcVolts) && adcVolts >= 0.15f && adcVolts <= 3.1f &&
         isfinite(dividerGain) && dividerGain >= 1.0f && dividerGain <= 10.0f
             ? adcVolts * dividerGain : NAN;
}

inline bool validTdsAdcSample(uint16_t raw, uint32_t millivolts, bool lowRange) {
  if (!lowRange) return validAdcSample(raw, millivolts);
  // ESP32 ADC_0db documented range: 100..950 mV. A positive raw code alone
  // does not establish a usable voltage or distinguish low signal from a fault.
  return raw > 4 && raw < 4091 && millivolts >= 100 && millivolts <= 950;
}

inline float tdsModuleVoltage(float adcVolts, float dividerGain, bool lowRange) {
  if (!lowRange) return moduleVoltage(adcVolts, dividerGain);
  return isfinite(adcVolts) && adcVolts >= 0.1f && adcVolts <= 0.95f &&
         isfinite(dividerGain) && dividerGain >= 1.0f && dividerGain <= 10.0f
             ? adcVolts * dividerGain : NAN;
}

inline const char* tdsAdcState(uint16_t raw, uint32_t millivolts, bool lowRange) {
  const uint32_t minimum = lowRange ? 100 : 150;
  const uint32_t maximum = lowRange ? 950 : 3100;
  if (raw >= 4091 || millivolts > maximum) return "CLIPPED_OR_OVER_RANGE";
  if (raw <= 4 || millivolts < minimum) return "LOW_SIGNAL_OR_FAULT_UNQUANTIFIED";
  return "MEASURABLE_UNCALIBRATED";
}

// Local two-reference interpolation, never an invented universal NTU curve.
// Values outside the measured reference interval are unavailable, not extrapolated.
inline float referenceValue(float voltage, float v1, float value1,
                            float v2, float value2, float maximumValue) {
  if (!isfinite(voltage) || !isfinite(v1) || !isfinite(v2) ||
      !isfinite(value1) || !isfinite(value2) || !isfinite(maximumValue) ||
      v1 < 0 || v2 < 0 || fabsf(v2 - v1) < 0.001f ||
      value1 < 0 || value2 < 0 || value1 > maximumValue || value2 > maximumValue)
    return NAN;
  const float low = v1 < v2 ? v1 : v2;
  const float high = v1 > v2 ? v1 : v2;
  if (voltage < low || voltage > high) return NAN;
  return value1 + (voltage - v1) * (value2 - value1) / (v2 - v1);
}

inline float sen0244Ppm(float voltage, float calibrationFactor, float temperatureC) {
  // SEN0244 manufacturer's reference polynomial; only for a confirmed compatible
  // module. A fixed 25 C reference is NOT measured temperature compensation.
  if (!isfinite(voltage) || voltage < 0 || voltage > 2.3f ||
      !isfinite(calibrationFactor) || calibrationFactor <= 0 ||
      !isfinite(temperatureC) || temperatureC < 0 || temperatureC > 55) return NAN;
  const float v = voltage / (1.0f + 0.02f * (temperatureC - 25.0f));
  const float ppm = ((133.42f * v - 255.86f) * v + 857.39f) * v *
                    0.5f * calibrationFactor;
  return isfinite(ppm) && ppm >= 0 && ppm <= 1000 ? ppm : NAN;
}

struct TdsReferenceCalibration {
  bool approved;
  float volts1;
  float ppm1;
  float volts2;
  float ppm2;
  float measuredTemperatureC;
};

// Bounded local calibration, not a universal curve for an unknown board.
// Temperature records the calibration basis; it is not a live temperature
// reading or automatic compensation. Approval includes that operating policy.
inline float calibratedTdsPpm(float moduleVolts,
                              const TdsReferenceCalibration& reference,
                              float dividerGain, bool lowRange) {
  if (!reference.approved || !isfinite(reference.measuredTemperatureC) ||
      reference.measuredTemperatureC < 0 || reference.measuredTemperatureC > 55 ||
      !isfinite(reference.volts1) || !isfinite(reference.volts2) ||
      !isfinite(reference.ppm1) || !isfinite(reference.ppm2) ||
      reference.volts2 <= reference.volts1 || reference.ppm2 <= reference.ppm1 ||
      !isfinite(dividerGain) || dividerGain < 1 || dividerGain > 10 ||
      !isfinite(tdsModuleVoltage(moduleVolts / dividerGain, dividerGain, lowRange)) ||
      !isfinite(tdsModuleVoltage(reference.volts1 / dividerGain, dividerGain, lowRange)) ||
      !isfinite(tdsModuleVoltage(reference.volts2 / dividerGain, dividerGain, lowRange)))
    return NAN;
  return referenceValue(moduleVolts, reference.volts1, reference.ppm1,
                        reference.volts2, reference.ppm2, 100000);
}

// Exact pre-existing readTurbidityNTU approximation from WaterHall commit
// faf9103, reused ONLY for an explicitly provisional consultant demonstration.
// No claim of manufacturer compatibility, calibrated NTU or water safety.
inline float legacyDemoTurbidityNtu(float voltage) {
  if (!isfinite(voltage) || voltage < 0 || voltage > 3.3f) return NAN;
  if (voltage >= 2.5f) {
    const float ntu = (3.3f - voltage) * 10.0f;
    return ntu < 0.5f ? 0.5f : ntu;
  }
  return 10.0f + (2.5f - voltage) * 20.0f;
}

inline bool validTelemetry(float turbidity, float tds) {
  return isfinite(turbidity) && turbidity >= 0 && turbidity <= 10000 &&
         isfinite(tds) && tds >= 0 && tds <= 100000;
}

struct RetrySchedule {
  uint32_t lastAttempt = 0;
  uint32_t lastCompletion = 0;
  uint32_t interval = SEND_INTERVAL_MS;
  bool attempted = false;
  bool due(uint32_t now) const {
    return !attempted || (uint32_t(now - lastAttempt) >= interval &&
                          uint32_t(now - lastCompletion) >= MIN_COMPLETION_GAP_MS);
  }
  void finished(uint32_t now, bool success, uint32_t startedAt) {
    // Both the start interval and completion gap apply; failures retain the
    // longer conservative wait from completion. Never catch up in a burst.
    lastAttempt = success ? startedAt : now;
    lastCompletion = now;
    attempted = true;
    interval = success ? SEND_INTERVAL_MS :
        (interval < MIN_RETRY_INTERVAL_MS ? MIN_RETRY_INTERVAL_MS :
         interval >= MAX_RETRY_INTERVAL_MS / 2 ? MAX_RETRY_INTERVAL_MS : interval * 2);
  }
  void finished(uint32_t now, bool success) { finished(now, success, now); }
};
}  // namespace waterhall
