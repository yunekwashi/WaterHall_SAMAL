#pragma once
#include "adc_cali.h"
enum adc_cali_line_fitting_efuse_val_t {
  ADC_CALI_LINE_FITTING_EFUSE_VAL_EFUSE_VREF,
  ADC_CALI_LINE_FITTING_EFUSE_VAL_EFUSE_TP,
  ADC_CALI_LINE_FITTING_EFUSE_VAL_DEFAULT_VREF
};
struct adc_cali_line_fitting_config_t { int unit_id, atten, bitwidth; uint32_t default_vref; };
inline esp_err_t adc_cali_scheme_line_fitting_check_efuse(adc_cali_line_fitting_efuse_val_t* value) {
  *value = modeledCalibrationFailure == 1 ? ADC_CALI_LINE_FITTING_EFUSE_VAL_DEFAULT_VREF :
                                         ADC_CALI_LINE_FITTING_EFUSE_VAL_EFUSE_VREF;
  return ESP_OK;
}
inline esp_err_t adc_cali_create_scheme_line_fitting(const adc_cali_line_fitting_config_t* config,
                                                    adc_cali_handle_t* handle) {
  if (config->default_vref != 0 || config->unit_id != ADC_UNIT_1 ||
      config->atten != ADC_ATTEN_DB_0 || config->bitwidth != ADC_BITWIDTH_12)
    throw std::runtime_error("Unexpected TDS calibration or invented fallback reference");
  if (modeledCalibrationFailure == 2) return ESP_ERR_NOT_SUPPORTED;
  *handle = new TestAdcCalibration{config->unit_id, config->atten, config->bitwidth};
  return ESP_OK;
}
