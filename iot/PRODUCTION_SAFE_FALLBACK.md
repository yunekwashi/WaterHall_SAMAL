# Production safe fallback

Build the existing ESP32 sketch using ESP32 core 3.3.12 with these three C++ definitions:

```
-DWATERHALL_ENABLE_AUTOMATIC_TELEMETRY
-DWATERHALL_TDS_PARTIAL_PRODUCTION
-DWATERHALL_NULLABLE_TURBIDITY_PRODUCTION
```

Do not include capture-only, legacy numeric-contract, low-range demo-production,
or local Turbidity Index definitions. Network credentials and the production CA
stay in ignored `device_config.h`; never stage that header or build artifacts.

HC-SR04 retains its existing live distance/percentage conversion. The sampling
task stays separate from HTTPS and posts fresh snapshots automatically with a
minimum ten-second gap after each successful request; existing failure backoff
is preserved. Wi-Fi, NTP, DNS, TLS and X-IoT-Secret handling are unchanged.

Turbidity raw GPIO34 ADC, chip-calibrated voltage and nominal divider gain 1.665
remain available in serial diagnostics. Numeric NTU requires the explicit
`TURBIDITY_REFERENCE_CALIBRATION_APPROVED` gate and validated reference points.
Approval is off. Neither the unsupported demo equation nor the unapproved local
index is published. The outgoing `turbidity_ntu` is JSON null.

TDS retains GPIO35 0dB, 3.3V supply, 2k/2k divider, gain 2.0 and its existing
reference approval gate. Uncalibrated/below-range/unquantifiable ppm stays null.
Numeric zero remains a real reading in the backend, never an unavailable sentinel.

The already deployed nullable contract needs no new migration or backend/client
changes. Admin displays unavailable analog sensors as `Awaiting data`; Resident
and Worker display `N/A`, using their existing polling. Null analog values cannot
trigger numeric water-quality alerts. Existing low-water alerts and hourly
notification cooldown remain intact. Historical records are unchanged.

These measurements do not certify drinking-water safety. Turbidity repeatability
and NTU accuracy, TDS ppm accuracy and final installed water-level accuracy require
physical verification/calibration. No coefficients or normal values are fabricated.

Rollback: compile/flash a capture-only build from this source to stop POSTs while
retaining diagnostics. Do not restore the old unsupported numeric demo curve.
No database rollback or client release is needed for this firmware-only change.
