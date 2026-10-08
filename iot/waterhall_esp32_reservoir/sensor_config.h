#pragma once
#include <math.h>

// NONSECRET hardware/calibration configuration. Network credentials stay in the
// ignored device_config.h. Do not enable these gates before physical verification.
// User confirmed the protective-divider wiring; voltages remain unmetered.
constexpr bool SENSOR_WIRING_CONFIRMED = true;
#ifdef WATERHALL_BENCH_CAPTURE_ONLY
constexpr bool BENCH_CAPTURE_ONLY = true;  // No manual or automatic POSTs in this build.
#else
constexpr bool BENCH_CAPTURE_ONLY = false;
#endif
#ifdef WATERHALL_ENABLE_AUTOMATIC_TELEMETRY
constexpr bool PRODUCTION_TELEMETRY_ENABLED = true;
#else
// Capture builds stay off; enable only the explicitly verified production build.
constexpr bool PRODUCTION_TELEMETRY_ENABLED = false;
#endif
#ifdef WATERHALL_LEGACY_TELEMETRY_CONTRACT
// The deployed schema still requires both analog values. Do not send unsupported
// nulls or replace them with cached/fabricated numbers; retain nullable mode below.
constexpr bool NULLABLE_ANALOG_TELEMETRY_SUPPORTED = false;
#else
constexpr bool NULLABLE_ANALOG_TELEMETRY_SUPPORTED = true;
#endif

// Focused nullable-TDS transport: retain low-range diagnostics, leave ppm unset.
#ifdef WATERHALL_TDS_PARTIAL_PRODUCTION
constexpr bool TDS_PARTIAL_PRODUCTION = true;
static_assert(PRODUCTION_TELEMETRY_ENABLED && !BENCH_CAPTURE_ONLY &&
              NULLABLE_ANALOG_TELEMETRY_SUPPORTED,
              "Partial TDS production requires automatic nullable telemetry without capture mode");
#else
constexpr bool TDS_PARTIAL_PRODUCTION = false;
#endif

// Enable only after the explicit-null turbidity API and migration are verified.
#ifdef WATERHALL_NULLABLE_TURBIDITY_PRODUCTION
constexpr bool NULLABLE_TURBIDITY_PRODUCTION = true;
static_assert(TDS_PARTIAL_PRODUCTION,
              "Nullable turbidity production requires the partial TDS production profile");
#else
constexpr bool NULLABLE_TURBIDITY_PRODUCTION = false;
#endif

// GPIO35-only range. Keep the installed divider/gain and reject clipping.
// Diagnostic builds keep ppm unset; production explicitly opts into the
// existing provisional conversion without changing the electrical ADC path.
#ifdef WATERHALL_TDS_LOW_RANGE_BENCH
constexpr bool TDS_LOW_RANGE_BENCH = true;
static_assert(BENCH_CAPTURE_ONLY,
              "TDS low-range diagnosis requires WATERHALL_BENCH_CAPTURE_ONLY");
#else
constexpr bool TDS_LOW_RANGE_BENCH = false;
#endif
#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
constexpr bool TDS_LOW_RANGE = true;
#else
constexpr bool TDS_LOW_RANGE = false;
#endif
#ifdef WATERHALL_TDS_LOW_RANGE_PRODUCTION
static_assert(PRODUCTION_TELEMETRY_ENABLED && !BENCH_CAPTURE_ONLY,
              "TDS low-range production requires automatic telemetry without capture mode");
static_assert(!NULLABLE_ANALOG_TELEMETRY_SUPPORTED,
              "TDS low-range production requires the deployed numeric analog contract");
#endif

// Explicit consultant-demo opt-in. Reuses only this project's pre-existing
// approximations; it is NOT a confirmed module curve or reference calibration.
// Leave off for normal operation until proper reference calibration exists.
constexpr bool PROVISIONAL_DEMO_MODE = true;
#ifdef WATERHALL_TDS_LOW_RANGE_PRODUCTION
static_assert(PROVISIONAL_DEMO_MODE,
              "Uncalibrated TDS production requires explicit provisional conversion");
#endif

constexpr unsigned char PIN_STATUS_LED = 2;  // Existing onboard LED only.
constexpr unsigned char PIN_TRIG = 18;
constexpr unsigned char PIN_ECHO = 19;
constexpr unsigned char PIN_TURBIDITY = 34;  // ADC1_CH6, input only.
constexpr unsigned char PIN_TDS = 35;        // ADC1_CH7, input only.

// User-specified intended reservoir geometry: 4 ft water depth, with the sensor
// face 5 inches above the full waterline. Verify the installed geometry in field.
constexpr float FULL_DISTANCE_CM = 12.70f;
constexpr float EMPTY_DISTANCE_CM = 134.62f;
constexpr float SENSOR_TO_EMPTY_DISTANCE_CM = EMPTY_DISTANCE_CM;
constexpr float SENSOR_TO_FULL_DISTANCE_CM = FULL_DISTANCE_CM;

// REQUIRED corrected bench wiring: turbidity upper 1k + 330 ohm / lower 2k.
// User-reported TDS wiring: AO -> upper 2k -> GPIO35 junction -> lower 2k -> GND.
// At AO = 3.3 V and +/-5% resistors, junction <= 1.733 V (calculation only).
// Even at assumed AO <= 5.25 V, junction <= 2.757 V; voltage is NOT verified.
// Module output voltage = calibrated ADC voltage * (Rtop + Rbottom) / Rbottom.
// Gain follows nominal installed resistor values; refine only after measurement.
constexpr float TURBIDITY_DIVIDER_GAIN = 1.665f;
constexpr float TDS_DIVIDER_GAIN = 2.0f;

// Generic turbidity board: fill TWO measured module-output voltages and certified
// NTU references. Interpolation is provisional and valid only between these points.
// No generic/unsupported NTU equation or assumed clear-water NTU is used.
constexpr float TURBIDITY_REFERENCE_1_VOLTS = NAN;
constexpr float TURBIDITY_REFERENCE_1_NTU = NAN;
constexpr float TURBIDITY_REFERENCE_2_VOLTS = NAN;
constexpr float TURBIDITY_REFERENCE_2_NTU = NAN;

// Generic TDS board: default to measured reference points, as above (ppm units).
// The SEN0244 reference curve is opt-in ONLY after model/compatibility confirmation.
constexpr bool TDS_USE_SEN0244_REFERENCE = false;
constexpr float TDS_REFERENCE_1_VOLTS = NAN;
constexpr float TDS_REFERENCE_1_PPM = NAN;
constexpr float TDS_REFERENCE_2_VOLTS = NAN;
constexpr float TDS_REFERENCE_2_PPM = NAN;
// Approval requires two known references, an independent response check and a
// recorded liquid temperature with this exact board/probe/divider. Defaults
// cannot turn measurable-but-uncalibrated voltage into a ppm number.
constexpr bool TDS_REFERENCE_CALIBRATION_APPROVED = false;
constexpr float TDS_CALIBRATION_MEASURED_TEMPERATURE_C = NAN;
constexpr float TDS_CALIBRATION_FACTOR = 1.0f;  // Uncalibrated reference factor.
constexpr float TDS_REFERENCE_TEMPERATURE_C = 25.0f;  // Assumed, NOT measured.
