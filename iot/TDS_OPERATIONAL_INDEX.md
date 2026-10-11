# Provisional operational TDS Index

This is a local electrical comparison for the current TDS BOARD V1.0, not a
ppm conversion, conductivity standard, or drinking-water safety certification.
The old unverified SEN0244/demo conversion remains disabled in this profile.

## Physical basis, October 11, 2026 (UTC+8)

GPIO35 is kept at 0dB with the existing 3.3V module supply, AO -> upper 2kΩ ->
GPIO35 junction, junction -> lower 2kΩ -> common ground, nominal gain 2.0, and
104/100nF ceramic capacitor from the junction to ground. Raw ADC and chip-calibrated
voltage diagnostics are preserved. These voltage estimates are not meter readings.

- Tap: 60.5s / 116 observations; ADC median 1102; filtered GPIO35 median 0.332V;
  filtered span 0.010V; corrected AO median 0.664V.
- Salted: 62.03s / 120 observations; ADC median 1654; filtered median 0.459V;
  filtered span 0.012V; corrected AO median 0.918V.
- Tap return: 62.02s / 120 observations; ADC median 1119.5; filtered median 0.335V;
  filtered span 0.011V; corrected AO median 0.670V.

All three captures had zero zero-count/clipping/below-range observations and unset
ppm. Filtered median return drift was +0.9036%, 3mV, or 2.3622% of the measured
tap-to-salted voltage step. Return median was inside the original filtered range.
This is one-cycle practical repeatability, not long-term/temperature qualification.
The tap return's original versus fresh same-source sample identity was not specified.
Salt concentration and temperature were not independently measured. A capacitor
benefit cannot be causally isolated from these captures and earlier differing samples.

## Mapping and status

`index = max(0, 10 * (filtered_GPIO35_V - 0.332) / 0.127)`

Examples: 0.332V -> 0; 0.459V -> 10; 0.335V -> 0.23622 (display 0.24).
There is no upper clamp: values above the salted reference may exceed 10.
The supported ADC range is 0.100..0.950V, giving an index up to about 48.66.
Neither measured anchor has an assigned ppm value. No temperature correction is
invented; temperature changes may change this local operational comparison.

The backend is the authoritative status source. Enter Elevated at >=5.0 after
two consecutive valid POSTs. Recover to Normal at <=4.0 after two consecutive
valid POSTs. Values in the hysteresis band retain the preceding confirmed state.
The largest measured filtered span, 0.012V / 0.127V * 10 = 0.9449 index units,
is rounded up to a 1.0-unit hysteresis margin. These are operational thresholds,
not health/safety standards. An initial qualifying POST can still show Normal
while the second confirmation is pending. Stale/invalid data clears pending state.

Missing/invalid/clipped/below-range signal or contributing samples older than
2000ms serialize as null. Genuine numeric index zero remains valid. Whole-device
telemetry older than 60 seconds becomes unavailable through the unchanged UI
expiry/polling paths; fresh recovery is automatic. Admin shows Awaiting data,
Resident/Worker N/A with Unavailable status. All show TDS Index / Provisional.

TDS status is display-only: no new push or broadcast is created. Existing
Turbidity 5.0/4.3/two-POST rules, alert cooldown, polling, authentication and
HC-SR04 calibration are unchanged.

## Production build and compatibility

Keep the four existing production defines and additionally set
`WATERHALL_LOCAL_TDS_INDEX`. The existing defines are
`WATERHALL_ENABLE_AUTOMATIC_TELEMETRY`, `WATERHALL_TDS_PARTIAL_PRODUCTION`,
`WATERHALL_NULLABLE_TURBIDITY_PRODUCTION`, `WATERHALL_LOCAL_TURBIDITY_INDEX`.
The new define requires the low-range partial-production profile and forces ppm
unset even if an unrelated demo/reference branch is enabled.

`backend/migrations/local_tds_index.sql` adds only nullable `tds_index_json TEXT`.
No existing ppm, NTU, water-level or history row is rewritten. Index payloads and
raw evidence are stored separately; existing numeric/null ppm ingestion remains
backward compatible and ppm is never relabeled as an index. Deploy the migration
and backend/web clients before flashing firmware that sends the new fields.

Rollback: restore the preceding backend/web release and flash its preceding
firmware profile without WATERHALL_LOCAL_TDS_INDEX. Retain the additive nullable
column and recorded history; no destructive reverse migration is needed.
The locked landing page, its assets and native app wrappers are outside scope.

## Release checks

- 199 backend/firmware/security/freshness regression checks passed. Two opt-in
  Worker browser checks were skipped there and passed in the browser run below.
- 10 display-helper checks passed, including the exact 60-second boundary.
- 60 browser checks passed: 58 dashboard/general checks plus two Worker startup
  checks. One obsolete no-reading status assertion was corrected to the already
  deployed `Unavailable` wording and its affected test rerun successfully.
- Production ESP32 compile passed: 1,052,468 bytes flash, 49,688 bytes RAM.
- The additive PostgreSQL migration passed twice in an isolated schema, retaining
  existing null/numeric ppm and history. Rollback retains its nullable column.
- Scoped secret scan and whitespace checks passed before staging/release.

Physical post-flash HTTP/database/client propagation remains a release gate;
automated browser fixtures do not substitute for that live verification.
