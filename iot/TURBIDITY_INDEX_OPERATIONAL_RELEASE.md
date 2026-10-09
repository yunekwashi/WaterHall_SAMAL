# Provisional operational Turbidity Index

The generic G/A/D/V Turbidity module has no verified manufacturer NTU curve.
The unsupported historical `60 - 20V` conversion is not called by production
firmware. This release is a local operational comparison, not scientific NTU
and not a drinking-water safety certification.

## Mapping and state

- Model: `local-clear-cloudy-20261009-v2`.
- `Index = max(0, 10 * (0.836 - Vadc) / 0.191)`.
- `Vadc` is the existing nine-observation chip-calibrated voltage median;
  at least seven fresh valid observations are required.
- Reconstructed module AO voltage: `Vadc * 1.665` (unchanged divider).
- Warning entry: **5.0**; recovery: **4.3**; two consecutive valid POSTs
  confirm either transition. An intermediate/noisy reading resets the pending
  transition. Index zero denotes voltage at or above the local reference,
  never zero NTU or proof of clean water.
- Recovery margin 0.7 is rounded up from the candidate clear-window noise
  span: `0.013 / 0.191 * 10 = 0.681` index units. It is an operational noise
  margin, not scientific uncertainty or a claim that drift is corrected.
- Invalid, clipped, missing, inconsistent or older-than-two-second sensor
  evidence produces null/Unavailable. Cached index display expires after
  120 seconds. Existing Admin 3.5-second and mobile 60-second API polling
  are unchanged; a display-only timer expires stale cached data.
- Existing one-hour announcement cooldown and notification deduplication are
  retained. Concurrent ingestion serializes index state/cooldown checks.
  Operational alerts explicitly say Provisional and do not claim NTU.

## Failed repeatability retained

The original candidate medians were clear 0.836 V, cloudy 0.645 V, return
0.830 V. The subsequent frozen final validation **failed repeatability**:

- Clear: 235 observations; raw ADC min/max/median 673/928/879;
  filtered voltage 0.835/0.844/0.841 V; zero/clipping counts 0/0.
- Cloudy: 234 observations; raw ADC 554/721/689; filtered voltage
  0.687/0.699/0.691 V; zero/clipping counts 0/0.
- Clear return: 236 observations; raw ADC 842/1070/978; filtered voltage
  0.910/0.925/0.921 V; zero/clipping counts 0/0.
- Cloudy median voltage shift: -17.84%; final clear-return drift: +9.51%
  relative to the final clear baseline (+0.080 V). The original 0.013 V
  return-drift limit was exceeded. No acceptance limits or anchors were
  adjusted to turn this failure into a pass.
- The return would display 0 because of the index floor. Its offset from
  the mapping's clear anchor is +0.085 V, and its unclamped index is -4.45.
  These diagnostics are retained in serial output and database index JSON.
  A Normal status means below the operational threshold only.

The user explicitly authorized provisional operational deployment despite this
failure. `OPERATIONAL_ENABLED` is separate from `CALIBRATION_APPROVED`;
calibration approval remains false. Baseline drift remains unresolved and may
affect classification. Raw responsiveness is not proof of quantitative NTU.
The complete frozen criteria and failed capture statistics are retained in
`calibration/turbidity_index_local_review.json`.

## Compatibility and rollout

The only database DDL is additive and repeatable:

```sql
BEGIN;
SET LOCAL lock_timeout = '5s';
ALTER TABLE reservoir_quality_readings
    ADD COLUMN IF NOT EXISTS turbidity_index_json TEXT;
COMMIT;
```

Existing NTU history is retained in `turbidity_ntu`; it is never relabeled as
the index. New physical index telemetry sends `turbidity_ntu: null`, TDS remains
null until separately calibrated/quantifiable, and valid water-level readings
continue through the existing partial telemetry contract. Auth, routes, HC-SR04
geometry, TDS supply/attenuation/divider, and deployment configuration are
unchanged. All three clients label the new metric Turbidity Index / Provisional.

Deploy the reviewed API/UI after the additive migration, then flash the matching
production firmware with automatic telemetry, partial TDS, nullable Turbidity,
and local-index flags. Private `device_config.h` is loaded only from ignored
local configuration and never staged or uploaded to Vercel.

Rollback: redeploy the previously verified safe-fallback commit
`775cdbfe9b4b3276efb91ab34c5a20577de7b073` and flash its verified fallback
firmware (automatic telemetry, partial TDS, nullable Turbidity, without the
local-index flag). Keep the added nullable column and all history intact;
do not drop or rewrite production rows. Rollback does not require changing
credentials, routes, polling, or thresholds.
