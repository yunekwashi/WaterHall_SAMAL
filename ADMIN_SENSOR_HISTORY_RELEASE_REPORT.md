# Admin Sensor Reading History

This release adds a separate Admin navigation section. The live Reservoir Measurements
card, polling, sensor conversion/status logic and 60-second freshness handling are unchanged.

## Existing data and API

- Reuses `public.reservoir_quality_readings`; no new storage, migration, backfill or history writes.
- Reads `recorded_at`, `water_level_percentage`, `turbidity_index_json.value/status`
  and `tds_index_json.value/status`. Legacy NTU/ppm values are never relabeled as indexes.
- Adds Admin-only `GET /api/iot/history` through the existing JWT/role policy.
- Returns only the six historical display fields, pagination and date bounds; no raw diagnostics.
- NULL readings render as `N/A` with `Unavailable` index status. Numeric zero stays numeric.
- Historical statuses are the recorded statuses, including hysteresis/debounce results;
  they are not recalculated using today's mappings or live freshness.

## Filters and pagination

- Today is the default. Yesterday and This Week (Monday–Sunday) use local calendar dates.
- Custom supports a single inclusive date or an inclusive range up to 93 days.
- The browser supplies its UTC offset; the API default is WaterHall's UTC+8.
- Default/UI page size 25; API accepts 1–50. Queries fetch at most page size + 1.
- Newest `recorded_at` first, then `reading_id` descending for equal timestamps.
- Keyset cursors are validated and bound to the selected UTC date bounds. New incoming rows
  do not shift subsequent pages or create offset-pagination duplicates.
- No history requests run on the dashboard heartbeat. Opening history, applying filters
  or Refresh loads readings. Previous/Next load one bounded page each.
- Local timestamps include seconds. Wide tables scroll inside their container on narrow screens.

## Scope

- `backend/sensor_history.py`: validation, read-only bounded queries and stored-field serialization.
- `backend/server.py`: module import, one Admin policy entry and one GET route.
- `admin_web/index.html`: navigation, separate history section and versioned feature assets.
- `admin_web/app.js`: history title and history cleanup during existing session invalidation.
- `admin_web/sensor-history.js`: isolated history requests, rendering, filters, paging and cancellation.
- `admin_web/sensor-history.css`: styles scoped to the new section.
- `tests/test_sensor_history.py`: authorization, bounds, dates, paging, NULL/zero and read-only tests.
- `tests/test_sensor_history_browser.py`: real Chrome layout, navigation, error/retry and session races.
- This report.

## Verification

The release was prepared in an isolated worktree based on production commit
`432197c335535d7a10b1d5140af50be4a904cf43`. Original dirty-tree files, index and HEAD
are checked against the pre-task SHA-256 snapshot; they are not included in the release.

Read-only production PostgreSQL verification matched 50 consecutive rows over two pages,
including NULLs and stored status JSON. The measured Today query execution was 0.627 ms;
median local-to-PostgreSQL query time over five samples was 55.98 ms. The existing table has
only its primary-key index; no timestamp index or other schema change is required at its
current size. Monitor query performance as the table grows.

Full backend regression: 443 passed, 208 opt-in checks skipped. Final focused history
backend checks: 14 passed. Browser checks include 320, 768, 1024 and 1440 pixel widths,
historical NULLs, local filters, paging, retries and delayed responses after session cleanup.
Browser regression runs: 103 passed / 5 failed in the main run, and 42 passed in the
session/modal/final-history run (139 distinct passing browser cases; six history cases
were rerun against the final files). The five failures are existing obsolete assertions:
three expect legacy ppm/unavailable presentation and two expect old Admin fallback wording.
All five reproduce on unchanged base commit `432197c`; no existing UI wording was altered
to satisfy them. The focused history tests pass. The deployment receipt is reported after release.

Release gates also check Python/JavaScript syntax, static packaging, source/staged scope,
private credential values, Gitleaks and `git diff --check`. Protected landing/mobile assets
are compared before and after deployment by SHA-256.

The whole tracked-source Gitleaks audit flags two pre-existing Wi-Fi declarations in
`iot/waterhall_esp32_reservoir/device_config.production.example.h`, lines 24–25. That file
is unchanged, is not staged, and is excluded from Vercel packaging. Focused-change and
deployable-file scans are separate release gates; no credential values appear in this report.

## Preservation and rollback

No ESP32, HC-SR04 calibration, Turbidity/TDS mapping or thresholds, notification logic,
Resident, Worker, shared `web/` assets, landing page, database schema or history changes.
Authentication implementation is unchanged; only the new route is enrolled in Admin authorization.

Rollback is promoting the preceding verified Vercel deployment or reverting this focused commit.
There is no database migration to roll back and no telemetry/history data to undo.
Production deployment and signed-in manual verification are performed after the local gates;
their exact commit hash, deployment ID and results are reported separately after completion.
