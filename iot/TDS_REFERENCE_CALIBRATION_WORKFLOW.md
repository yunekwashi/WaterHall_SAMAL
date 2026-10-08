# TDS reference calibration workflow

The current production profile deliberately sends null TDS. The GPIO35 0dB
path, 3V3 supply, 2k/2k protection divider and nominal gain 2.0 stay unchanged.
Do not enable a number merely because salted water produces measurable ADC.

## Available hooks and safe defaults

In `waterhall_esp32_reservoir/sensor_config.h`:

- `TDS_REFERENCE_CALIBRATION_APPROVED = false`
- `TDS_REFERENCE_1_VOLTS`, `TDS_REFERENCE_1_PPM`, `TDS_REFERENCE_2_VOLTS`,
  `TDS_REFERENCE_2_PPM` and `TDS_CALIBRATION_MEASURED_TEMPERATURE_C` are NaN.

The partial-production profile uses the bounded reference branch only after
approval. The demo flag cannot select a polynomial in this branch. Capture-only
builds always leave ppm unset. No reference values have been populated or approved.

Approved reference processing rejects missing data, reversed/indistinguishable
anchors, missing recorded temperature, electrically unusable reference voltages,
out-of-interval samples and invalid ADC. Existing validity confirmation and
freshness checks still apply. An accepted calibrated zero remains numeric zero;
ADC-floor zero never becomes zero ppm.

## Reference materials

Obtain a documented 1413 microS/cm standard at 25 C and a liquid thermometer.
This corresponds to 706.5 ppm, usually rounded to 707, only on the explicitly
selected 0.5 conductivity-to-TDS scale. DFRobot recommends this standard for its
SEN0244; that recommendation does not identify the generic TDS BOARD V1.0.
[DFRobot calibration procedure](https://wiki.dfrobot.com/sen0244/docs/20304)

For the unidentified module, also obtain a documented 342 ppm NaCl reference
with its stated conversion scale, plus an independent intermediate known sample
or a calibrated EC/TDS meter to validate local interpolation. Standards must
bracket the samples to be quantified. A further lower known reference is needed
if measurable sample voltage falls below the lower anchor. Do not extrapolate.
[HM Digital reference solutions](https://hmdigital.com/product-maintenance/)

Do not assign concentrations to tap water, a pinch of salt, presumed zero-TDS
water or the ADC floor. Preserve reference labels/certificates, lot, expiry,
temperature basis and conversion scale in the calibration record.

## Physical procedure once references are available

1. Keep the exact board, probe socket, supply, divider and GPIO setup unchanged.
   Hold immersion depth and orientation fixed, with electronics dry. Do not add
   a capacitor or alter wiring between calibration captures.
2. Verify the liquid temperature using a thermometer. References and validation
   samples must share the reviewed temperature basis. The existing fixed 25 C
   value is an assumption, not a live temperature measurement.
3. Rinse with separate clean water, immerse in the lower known reference, wait
   for settling, and capture 60 seconds using the existing serial `status`
   command. Record raw ADC, estimated ADC voltage and fresh filtered voltage.
4. Repeat in the higher reference, then rinse and return to the lower reference
   for another 60 seconds. Reserve original samples and prevent carryover.
5. Require stable, non-clipped, usable readings and distinguishable increasing
   module voltage as reference concentration increases. Do not use below-range
   or stale ADC estimates as anchors. Investigate failed return repeatability.
6. Derive each reference module-voltage anchor from the filtered ADC estimate
   times 2.0. These are chip-calibrated nominal estimates, not meter-certified
   AO measurements. Keeping the same path lets local calibration include its
   combined divider/ADC/probe error.
7. Capture an independent known sample inside the interval, without using it to
   fit the two anchors. Compare the predicted result with its documented value;
   agree acceptance uncertainty before approval. Reject an unsupported linear
   response rather than tuning results to pass.
8. Document the validated voltage/concentration interval and temperature policy.
   The hook records calibration temperature but performs no automatic temperature
   compensation. With no live temperature input, output remains a bounded
   conductivity-derived estimate under those assumptions, not final chemical
   TDS accuracy or water-safety certification.
9. Only after review, populate the four existing reference constants and measured
   calibration temperature, then set the approval gate true. Run focused firmware
   tests and compile before any separately approved flash. Existing backend,
   schema, clients and telemetry fields need no TDS conversion changes.
10. Verify actual numeric/null payloads and persistence, including return to a
    below-range sample. The current unapproved release must remain null.

## Calibration record to fill with real measurements

- Board/probe identification and wiring photograph
- Reference solution identities, certificate values, scale, lot and expiry
- Measured temperatures and operating-temperature assumptions
- Each 60-second raw/filtered capture and zero/clipping/stale counts
- Lower/higher module-voltage medians and return difference
- Independent sample value, predicted value, error and accepted uncertainty
- Approved voltage/ppm interval, reviewer and date

No populated calibration record exists yet. Certified references and a
thermometer are still required. The optional 100 nF capacitor is a separate
power-off noise experiment; it is not a substitute for reference calibration.

## Exact equation and current approval status

Let `Vadc` be the fresh filtered chip-calibrated GPIO35 voltage and
`Vmodule = 2.0 * Vadc`. The stored reference points are `(V1, P1)` and
`(V2, P2)`, with increasing usable voltage and documented concentration.
The bounded local equation is:

`m = (P2 - P1) / (V2 - V1)`

`b = P1 - m * V1`

`ppm = m * Vmodule + b`

The implementation evaluates the equivalent reference-point interpolation,
`P1 + (Vmodule - V1) * (P2 - P1) / (V2 - V1)`. It does not assume this local
linear relationship fits the board before an independent reference validates it.
The production serializer rounds an approved nonnegative result to integer ppm.

Current coefficients: **unset**, because all reference constants are NaN.
Current validated ppm range: **none**. After approval, the range is only
`P1..P2` and the corresponding `V1..V2`, restricted to the existing usable
0dB ADC window. There is no extrapolation, clamp-to-reference, demo estimate,
or automatic temperature compensation in this approved-reference path.

Record for each reference: its certified concentration/EC and conversion scale,
measured liquid temperature, settling time, 60-second raw ADC min/max/median,
zero/clipping counts, chip-calibrated ADC voltage min/max/median, fresh filtered
ADC voltage min/max/median, and nominal module-voltage median (`2.0 * filtered
ADC median`). Include the return capture, same-path wiring details, and each
independent validation sample's known value and prediction error. Supply those
values before coefficients can be calculated and reviewed.

The physical sequence is tap -> known reference(s) -> response-only salted
sample -> rinsed original tap return, with a separate known intermediate
validation sample. Salted water of unknown concentration is never a reference.
The reference stages cannot be physically completed without the standards and
thermometer. Automated fixtures test measurable approved numeric output, return
to ADC-floor null, clipping, stale data and unapproved null; they do not certify
physical calibration. Current production TDS numeric output: **NOT APPROVED**.
