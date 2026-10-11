#pragma once
#include "sensor_processing.h"

namespace waterhall {
// 104 capacitor and gain-2 divider, GPIO35 0dB, Oct 11 tap/salted/tap capture.
// Local signal comparison only. Neither anchor is a known ppm reference.
constexpr float TDS_INDEX_BASELINE_ADC_VOLTS = 0.332f;
constexpr float TDS_INDEX_SALTED_ADC_VOLTS = 0.459f;
inline float localTdsIndex(float filteredAdcVolts) {
  if (!isfinite(filteredAdcVolts) || filteredAdcVolts < 0.100f ||
      filteredAdcVolts > 0.950f) return NAN;
  const float value = 10.0f * (filteredAdcVolts - TDS_INDEX_BASELINE_ADC_VOLTS) /
      (TDS_INDEX_SALTED_ADC_VOLTS - TDS_INDEX_BASELINE_ADC_VOLTS);
  return value < 0 ? 0 : value;  // No upper display clamp.
}
inline uint32_t tdsSampleAgeMs(const SampleWindow<9>& samples, uint32_t now) {
  size_t valid = 0;
  uint32_t oldest = 0;
  for (size_t i = 0; i < samples.count; ++i) {
    const uint32_t age = uint32_t(now - samples.times[i]);
    if (!isfinite(samples.values[i]) || age > SAMPLE_MAX_AGE_MS) continue;
    ++valid;
    if (age > oldest) oldest = age;
  }
  return valid >= 7 ? oldest : UINT32_MAX;
}
}
