# WaterHall production safe fallback release

## Scope and final sensor behavior

Firmware-only release based on the preserved production source `7ea843f` in an
isolated worktree. Live HC-SR04 geometry, wiring, sampling and percentage conversion
remain unchanged. Unapproved Turbidity NTU/local index is disabled; raw GPIO34 ADC,
chip-calibrated voltage, filtering and divider gain 1.665 remain available internally
and through serial diagnostics. TDS retains GPIO35 0dB, 3.3V supply, 2k/2k divider,
gain 2.0 and its existing approval/null behavior. Both scientific calibration
approval flags remain false. No sensor values, coefficients or safety thresholds
were fabricated or normalized.

Actual outgoing physical payload example:

```json
{"water_level_percentage":62,"turbidity_ntu":null,"tds_ppm":null,"calibration_required":true}
```

Automatic telemetry is enabled in the flashed binary. The existing scheduler waits
at least ten seconds after request completion; measured successive response gaps
were at least 12.891 seconds including network request time. Failure backoff is
unchanged. No capture-only/local-index/legacy numeric-contract definitions are used.
Exact production build definitions and rollback are in `iot/PRODUCTION_SAFE_FALLBACK.md`.

## Files changed and reasons

- `iot/waterhall_esp32_reservoir/sensor_config.h`: explicit false Turbidity
  reference-calibration approval gate.
- `iot/waterhall_esp32_reservoir/sensor_runtime.h`: exclude the unsupported demo
  conversion from published Turbidity; retain diagnostics and return NaN until
  approved bounded reference calibration exists. Clarify unavailable serial output.
- `iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino`: replace the misleading
  demo boot banner with the NTU approval requirement and drinking-water disclaimer.
  Network handling, route, JSON keys, authentication and scheduler are unchanged.
- `iot/PRODUCTION_SAFE_FALLBACK.md`: production build profile, honest null behavior,
  physical limitations and capture-only rollback instructions.
- `tests/cpp/test_iot_sensor_processing.cpp`: verify raw diagnostics and unchanged
  HC/TDS behavior while the legacy demo flag cannot enable numeric Turbidity.
- `tests/cpp/test_iot_network_runtime.cpp`: cover nullable fallback transport and
  changing physical-input fixtures, preserve approved TDS tests, and verify old
  numeric-only profiles block rather than fabricate unsupported Turbidity values.
- `tests/test_iot_network_runtime.py`: run the existing approved-TDS serializer test
  in the both-null-compatible production profile.
- `tests/test_production_fallback_browser.py`: all three unchanged dashboards at
  mobile/desktop widths; actual local APIs and polling update water level while both
  analog fields remain unavailable.
- `WATERHALL_PRODUCTION_SAFE_FALLBACK_REPORT.md`: release results and limitations.

No backend, route, auth, client, schema, migration, deployment configuration or
notification code changes. PostgreSQL already has nullable water-level/Turbidity/TDS
columns, schema version 2. No migration was needed or applied; history is preserved.

## Verification completed

- Firmware/native regression: **71 passed** (actual sketch control flow, range,
  freshness, independent sampling during network waits, transport/profile guards,
  unchanged HC mapping, TDS approval/null and failure backoff).
- Backend/null/security regression: **57 passed**, isolated disposable test databases.
  Includes explicit-null persistence/response aliases, zero as a numeric reading,
  unchanged non-null bounds/auth, null-safe alerts and hourly cooldown.
- Chrome dashboard regression: **9 passed**, three existing roles with null sensors,
  changing live level through existing polling and no horizontal overflow at 320px
  and 1280px in the new focused tests.
- ESP32 core 3.3.12 compile: **PASS**, 1,049,100 bytes flash (80%); 49,688 bytes global
  RAM (15%). Public source hashes matched the flashed build. Private configuration
  was copied privately without changes and is excluded from Git and deployment.
- COM3 physical flash: **PASS**, esptool hash verification passed.
- Physical Wi-Fi/NTP/DNS/TLS/X-IoT-Secret: **PASS**; observed connection and clock sync,
  explicit DNS resolution, verified certificate responses, and accepted device auth.
- Physical automatic POSTs: **7 consecutive HTTP 200**, 95-second observation,
  no host `send` command, no reset, COM3 released. The automatic boot banner was
  missed; the compiled profile and autonomous POST sequence independently prove
  automatic mode. Firmware remains enabled after the capture.
- PostgreSQL: **PASS**. Read-only TLS-verified queries match every captured POST and
  preserved response timestamp to exactly one row with identical sensor values:
  rows **2306–2312**, October 9, 2026 **02:46:46–02:48:04 UTC**
  (**10:46:46–10:48:04 UTC+8**), water levels **62, 50, 63, 51, 63, 61, 50**;
  all seven rows have SQL NULL Turbidity and TDS.
- Alerts: **PASS**, zero new sensor announcements (11 before/after); historical
  quality-alert minimum spacing 3,601 seconds. Null analogs cannot drive numeric
  alerts; low-water behavior and hourly cooldown pass the unchanged backend tests.
- Preserved production API/UI: **PASS**, health/ready HTTP 200, unauthenticated
  latest telemetry HTTP 401, served Admin and shared client assets match production
  base source. No authentication/session or polling changes.
- Secrets/scope: **PASS**, gitleaks zero findings and exact private-credential scan.
  `git diff --check` passes in the release and original workspace. All pre-existing
  root tracked/nonignored files and ignored `device_config.h` remain byte-identical;
  root HEAD remains unchanged. Private config, credentials and binaries are not
  among intended files.

## Live propagation and publication

Automated local rendering/polling: Admin **PASS**, Resident **PASS**, Worker **PASS**.
Signed-in production browser access is unavailable in this session. Live manual
confirmation: Admin **PASS**, Resident **PASS**, Worker **PASS**, based on the user's
observations. Admin shows both unavailable analog sensors as `Awaiting data`;
Resident/Worker show both as `N/A`, with automatic live water-level/time updates.
Admin retains 3.5-second authenticated heartbeat/data polling; Resident/Worker retain
60-second visible-view polling. Expected display lag after a committed row is up to
the relevant polling interval plus request time, subject to existing foreground behavior.

Commit, push and Vercel publication results will be recorded after the live gate.
The existing backend/UI production architecture is preserved.

## Fresh raw Turbidity confirmation

After the user confirmed the sensor remained immersed, a second unchanged-firmware
30-second status-only capture started **10:51:42 UTC+8**, October 9, 2026:

- Observations: **118**; raw ADC **848 / 941 / 885** (min/max/median).
- Estimated adjacent-conversion ADC voltage **0.815 / 0.916 / 0.846 V**.
- Filtered ADC voltage **0.843 / 0.850 / 0.846 V**.
- Nominal gain **1.665** reconstructs filtered module AO to
  **1.403595 / 1.415250 / 1.408590 V**.
- Zero count **0**, clipping count **0**; every filtered raw signal was available.
- Numeric NTU/index remained unset; TDS remained null. Water level in the three
  accepted responses was live **81%**. Three further physical automatic requests
  returned **HTTP 200**, with matching PostgreSQL rows **2329–2331**. The first
  request began before this capture, so only the latter two include complete
  outgoing-payload/response pairs; the original seven-cycle proof is complete.
- No new sensor announcements; total remained **11**.

These are chip-calibrated ADC estimates, not independent meter measurements or an
NTU conversion. The optical sensor stays active even though its published trusted
numeric reading is intentionally null. The old unsupported curve is not re-enabled.

## Remaining physical/calibration limitations

Turbidity is electrically responsive but baseline-drift-prone; the previously held
local index is unapproved and is not part of this release. No manufacturer-backed
NTU curve or validated reference calibration exists. TDS response is measurable in
salted water but tap water can fall below quantifiable range; no approved ppm
reference calibration exists. Neither sensor outputs a scientific numeric reading.
Raw diagnostics remain real and available, not suppressed or replaced by zero.

HC-SR04 telemetry is live and numeric. Filtered distance varied 16.00–106.83cm during
this capture; the POST values above are the actual fresh values, not a stability or
reservoir installation accuracy certification. Physical placement/stability remains
an installation consideration; calibration constants were preserved.

These measurements do **not** certify drinking-water safety.

## Pre-existing work preserved separately

The original workspace's modified Admin/backend/web/IoT files, private header,
reports, and prepared calibration work are untouched. The held Turbidity Index
candidate is also untouched and excluded from this fallback release. The focused
production commit is created in the isolated worktree instead of combining or
replacing those dirty-tree changes.
