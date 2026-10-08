// Host substitute for the ESP-IDF boundary; never used on the ESP32.
#pragma once
#include "../network_stubs.h"
using esp_err_t = int;
constexpr esp_err_t ESP_OK = 0, ESP_ERR_NOT_SUPPORTED = 1, ESP_ERR_INVALID_STATE = 2;
constexpr int ADC_UNIT_1 = 0, ADC_ATTEN_DB_0 = 0, ADC_BITWIDTH_12 = 12;
struct TestAdcCalibration { int unit, attenuation, bits; };
using adc_cali_handle_t = TestAdcCalibration*;
static int modeledCalibrationFailure = 0;
static int lastCalibrationRaw = -1;
inline esp_err_t adc_cali_raw_to_voltage(adc_cali_handle_t handle, int raw, int* voltage) {
  if (!handle || handle->unit != ADC_UNIT_1 || handle->attenuation != ADC_ATTEN_DB_0 ||
      handle->bits != ADC_BITWIDTH_12 || configuredTdsAttenuation != ADC_0db || raw != tdsRaw)
    throw std::runtime_error("TDS calibration must match its initialized range and same raw sample");
  lastCalibrationRaw = raw;
  if (modeledCalibrationFailure == 3) return ESP_ERR_INVALID_STATE;
  *voltage = modeledCalibrationFailure == 4 ? -1 : static_cast<int>(modeledTdsMv);
  return ESP_OK;
}
