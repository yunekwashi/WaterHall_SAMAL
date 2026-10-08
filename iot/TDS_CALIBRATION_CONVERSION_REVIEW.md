# WaterHall TDS conversion and calibration review

Review date: 2026-10-09 (UTC+8). This review continues from the current working tree and the completed physical trace in `WATERHALL_TDS_NULL_STAGE_TRACE_REPORT.md`.

**Decision: keep production TDS null. Reference calibration is required before enabling numeric ppm.** The salted-water signal is measurable, but neither the exact module transfer curve nor reference concentration has been established. No active firmware, configuration, backend, client, schema or secret was changed for this review. No flash, commit, push or deployment was performed.

## What the current code actually does

- `iot/waterhall_esp32_reservoir/sensor_config.h`: GPIO35, divider gain 2.0, low-range ADC profile, fixed assumed 25 C, reference factor 1.0. `TDS_USE_SEN0244_REFERENCE` is false; all four measured reference constants are NaN.
- `waterhall_esp32_reservoir.ino`: attaches GPIO35 before selecting 0dB, then uses a dedicated eFuse-backed ADC calibration handle. It does not substitute a guessed reference voltage when that calibration is unavailable. GPIO34's separate attenuation remains unchanged.
- `sensor_processing.h`: accepts TDS conversions only when raw ADC is greater than 4 and less than 4091 and the calibrated ADC estimate is 100–950 mV. `tdsModuleVoltage()` reconstructs nominal module voltage from the valid ADC voltage and the installed divider gain.
- `sensor_runtime.h`: uses the existing validity confirmation, fresh sample window and median. `TDS_PARTIAL_PRODUCTION` or `TDS_LOW_RANGE_BENCH` deliberately sets computed ppm to NaN even for valid filtered voltage.
- `waterhall_esp32_reservoir.ino`: finite, nonnegative ppm is rounded to the existing integer JSON value; an unset/invalid ppm becomes explicit `tds_ppm: null`. Numeric zero remains a valid number, not an unavailable sentinel.

Removing the partial-profile NaN condition is unsafe: the next branch tests `provisionalDemo || TDS_USE_SEN0244_REFERENCE`. The existing demo flag is true, so it would choose the SEN0244 equation even though confirmed-module selection is false. A TDS-specific approved calibration branch must bypass that demo shortcut, without changing Turbidity's demo behavior.

## Physical evidence and voltage reconstruction

The completed 95-second trace contained 375 observations: raw ADC 354–764, median 603; estimated ADC voltage 0.157–0.253 V, median 0.215 V; filtered ADC voltage 0.205–0.223 V, median 0.215 V. All observations were measurable, with no zero/clipping observations. Computed ppm stayed unset. Seven physical POSTs returned HTTP 200 and persisted null TDS. These are prior trace results, not a new physical capture during this review.

The preserved electrical path is:

`AO -> upper 2k resistor -> GPIO35 junction -> lower 2k resistor -> common GND`

Module supply remains 3V3. Nominal reconstruction is:

`module volts = chip-calibrated ADC millivolts / 1000 * 2.0`

Thus the latest filtered median corresponds to approximately **0.430 V nominal module output**, not a known ppm concentration. Gain is applied once, after filtering; the implementation does not use `raw / 4095 * 3.3` as a voltage estimate. At ±5% resistor tolerance, the physical divider gain could be approximately 1.905–2.105. There is no independent meter measurement of AO or the divider ratio; calibration with this exact installed path must account for its combined error. Keep gain 2.0 and the protection resistors unchanged.

The current usable ADC window corresponds to nominal module output **0.200–1.900 V**. Below-range, over-range, clipped, stale, insufficient or uncalibrated samples remain unavailable. A positive ADC code below the voltage window does not justify ppm, and ADC-floor behavior cannot distinguish very-low conductivity from a connection fault. Espressif documents the classic ESP32 0dB range used by these guards. [ESP32 ADC documentation](https://docs.espressif.com/projects/esp-idf/en/v4.4-beta1/esp32/api-reference/peripherals/adc.html)

## Manufacturer conversion: identified, not matched to this board

The actual board is the photographed generic blue **TDS BOARD V1.0**, with two left-hand two-pin sockets and an AO/GND/VCC header. Its exact manufacturer, probe cell constant, excitation circuit, output impedance, transfer curve and temperature behavior remain unverified. The seller description and version marking do not establish SEN0244 compatibility. The available photo and documentation search did not establish a matching manufacturer datasheet.

DFRobot documents its **SEN0244** as a specific product with 3.3–5.5 V supply, 0–2.3 V output and 0–1000 ppm range. Those specifications must not be attributed to the unidentified board. Also, the documented product's maximum output exceeds the current ADC window after a gain-2 divider: 2.3 V / 2 = 1.15 V, above the preserved 0.95 V guard. Even a confirmed SEN0244 would not have its entire documented range available under this profile. [DFRobot SEN0244 specifications](https://wiki.dfrobot.com/sen0244)

WaterHall's `sen0244Ppm()` matches DFRobot's basic example: compensate module voltage using `1 + 0.02 * (temperature - 25)`, apply the cubic with coefficients 133.42, -255.86 and 857.39, then multiply by 0.5 and the calibration factor. This establishes the equation's origin, not its applicability to this board. [DFRobot basic measurement example](https://wiki.dfrobot.com/sen0244/docs/20305)

The separate GravityTDS library instead applies temperature compensation to the calculated conductivity. The two algorithms agree at 25 C, but are not identical at other temperatures. For a **synthetic unit fixture**, 1.000 V at 35 C with factor 1.0 produces 307.01088 in WaterHall/basic-example math versus 306.22917 in library math. These are test expectations, not ppm assigned to any water sample. Do not mix a calibration factor derived with one temperature algorithm into the other. [DFRobot GravityTDS implementation](https://raw.githubusercontent.com/DFRobot/GravityTDS/master/GravityTDS.cpp)

Current temperature is a fixed **assumed 25 C**, not a reading. Current factor 1.0 is not a measured probe calibration. No numeric path should claim measured temperature compensation or final scientific accuracy. A measured calibration temperature and a reviewed operating-temperature policy are required; no temperature sensor is being added in this scope.

## Exact reference materials needed

Start with a commercial, documented **1413 µS/cm conductivity standard at 25 C**, plus a liquid thermometer. On DFRobot's explicit 0.5 conductivity-to-TDS scale, this is 706.5 ppm, conventionally rounded to **707 ppm**. Record the bottle's certified value, temperature basis, lot, expiry and scale; do not confuse µS/cm with mS/cm. DFRobot recommends this reference for its module. Its use here measures the unknown board; it does not establish that board's identity. [DFRobot calibration procedure](https://wiki.dfrobot.com/sen0244/docs/20304)

For the current unknown board's bounded empirical path, one reference is insufficient. Also obtain a documented **342 ppm NaCl reference on the stated 0.5 scale** as a second initial concentration. HM Digital documents this commercial calibration value and the scale used by its meters. Confirm the actual solution's label/certificate rather than assuming a different supplier's ppm scale. [HM Digital reference solutions](https://hmdigital.com/product-maintenance/), [HM Digital conversion-scale documentation](https://hmdigital.com/dm-3)

These two concentrations are initial reference choices, not guaranteed electrical bounds for this module. Both must produce stable, usable voltage with the existing wiring. Numeric interpolation would cover only their measured voltage interval. If a sample has measurable voltage below the lower anchor, it must remain null until a lower known reference brackets it; do not extrapolate or force it to 342 ppm.

An independent third known sample inside the chosen interval is needed to check whether local linear interpolation is defensible. Use a documented intermediate standard, or a sample independently measured by a calibrated EC/TDS meter with its temperature and conversion scale recorded. Use that meter to assign any additional lower reference needed to cover the observed sample range. Agree the acceptable uncertainty/residual before enabling output. Do not fit and validate against the same two anchors alone.

Plain tap water, a pinch of salt, distilled water assumed to be zero, and the existing ADC floor are **not** known calibration points. The previously used lightly salted sample proves response only. Reference standards and a thermometer are not currently available, so numeric enablement stops at this boundary.

## Smallest safe implementation after reference review

Use the existing bounded two-reference helper for this unidentified module, rather than importing a universal curve. The focused change would be:

1. In `sensor_config.h`, add a TDS-only calibration approval gate, default false. Populate existing TDS reference-voltage/ppm constants only from accepted physical measurements; keep missing constants NaN. Document the scale, measured temperature, usable interval and uncertainty.
2. In `sensor_runtime.h`, retain capture-only NaN. In the existing partial-production profile, permit a numeric result only through that explicit approved TDS branch, with finite fresh filtered module voltage and valid reference data. Call `referenceValue()` only within the validated interval. Keep NaN for all other cases, including default unapproved calibration; do not fall through to the demo polynomial.
3. Validate TDS references specifically: increasing reference concentration must correspond to the observed increasing voltage, anchors must be distinguishable from measured noise, and independent validation must support the local interpolation. The existing generic helper accepts either slope direction and cannot establish these physical facts itself.
4. Update the existing TDS startup/serial wording so it accurately distinguishes measurable voltage, calibrated/provisional numeric ppm, and unquantifiable/null. Leave HC-SR04, Turbidity, telemetry cadence and security unchanged.
5. Extend focused host tests to cover approved numeric output, unapproved/missing-reference null, zero as a valid calibrated number, ADC floor, clipping, stale readings, out-of-interval null, recovery and the exact production JSON. These tests cannot replace physical calibration validation.

No backend, database, client, route or polling change is needed: the existing released contract accepts both numeric and explicit-null TDS. Keep its existing serializer and partial-TDS transport guard. No new migration is required.

If the actual module is later verified compatible with SEN0244, the alternative is to reuse its documented equation with a reference-derived factor and independent validation, preserving ADC limits and an explicit TDS approval gate. At measured 25 C, the conditional factor is `known reference ppm / sen0244Ppm(measured module volts, 1, 25)`, provided the denominator is valid and nonzero. This equation has **not** been evaluated with a fabricated reference or applied to the current physical sample. Do not switch to that alternative just because the generic board's signal is nonzero.

## Checks executed for this review

- Existing project environment: 13 focused tests passed, 51 deselected in 50.75 seconds. The selected cases cover divider reconstruction, reference interpolation/rejection, manufacturer-example arithmetic, 0dB boundaries, invalid/recovery behavior, missing chip calibration, capture-only POST blocking, actual partial-production null payloads/cadence and build guards.
- Separate host compilation against the unchanged `sensor_processing.h`: 30 synthetic voltage/temperature/factor comparisons passed against the published basic-example arithmetic. The comparison also confirmed the library/basic-example temperature distinction. This is a math verification, not physical ppm calibration.
- The first test-launch attempt used the system Python, which lacks pytest; the completed run used the existing `.venv/Scripts/python.exe`. No dependency installation or environment change was needed.
- SHA-256 preservation check passed for all 266 pre-existing snapshotted files, including the ignored private device header. HEAD and the empty index are unchanged. The only new workspace file from this review is this document.
- Focused Gitleaks scan of this new public document passed with zero findings. `git diff --check` and the new document's whitespace check passed. These are scoped checks; no clean-tree claim is made about pre-existing work.

## Review outcome

**Measurable signal -> numeric ppm:** not yet validated; requires known references and the approved TDS-only conversion branch above.

**Unquantifiable signal -> null:** preserved and covered by passing focused tests. Measurable-but-uncalibrated signal also remains null, honestly.

**Physical TDS functionality:** previously demonstrated in salted water. **PPM calibration: MANUAL CALIBRATION REQUIRED.** Production partial telemetry continues using the unchanged flashed firmware and null TDS. No release action is authorized or performed by this review.
