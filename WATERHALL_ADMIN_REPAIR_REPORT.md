# WaterHall Admin Controlled Repair Report

## Baseline

- Branch: `main`.
- Latest commit: `e28b1fbdc2ded97ca4b2c85cefabed707b7b5b87`.
- Initial modified files: `admin_web/app.js`, `admin_web/index.html`, `admin_web/styles.css`, `iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino`, and `waterhall_resident_flutter/android/gradle/verification-metadata.xml`.
- Initial untracked file: `WATERHALL_SYNC_REPORT.md`.
- Pre-existing changes: Admin layout/table-sanitization repairs; ESP32 SNTP/TLS time gate; resident Android dependency verification metadata. All were preserved.
- Previous audit: 120 selected backend/contract tests passed, 10 deselected. Admin browser run: 2 passed, 3 failed; the login-timing failure passed unchanged in isolation.
- Safety: test fixtures explicitly remove production database URLs and use temporary SQLite. `TEST_DATABASE_URL` is unset for every test run. No real payment or notification is authorized.
- Baseline hashes cover 201 existing files, including the workspace database and local device configuration. Baseline copies/diff are stored outside the repository for comparison.
- Current IoT contract remains Water Level (JSN-SR04T), Turbidity and TDS: `water_level_percentage`, `turbidity_ntu`, `tds_ppm`. pH and Flow remain legacy/out of scope.

## Phase A — H1

Root cause: token identity alone did not guard delayed response bodies or superseded requests; `fetchData` also lifted lockdown independently. Delayed loader callbacks could affect a newer request.

Files/functions: `admin_web/app.js` (`apiFetch`, request invalidation/session ownership helpers, health/readiness/retry/heartbeat/startup/login/logout, `fetchData`, `loadRegistrations`, loader helpers); `tests/test_admin_repairs.py`.

Behavior: session and request generations make obsolete responses inert before rendering or state changes. Current verified health/recovery owns lockdown removal. Loader callbacks have separate foreground ownership so background refresh cannot strand the overlay.

Tests: new isolated browser regressions **6 passed** (66.20s); existing Admin portal/login/XSS/cancellation/Chart checks **12 passed, 18 deselected** (81.59s). `git diff --check` passed and the incremental diff was reviewed before Phase B.

During development, the first run had 3 failures (two CSP-incompatible test predicates and a loader timing regression); a second run had 1 fixture race (silent refresh skipped behind the heartbeat). Corrected the predicates/setup and loader ownership; the final targeted run passed all 6.

Final diff review extended the same ownership checks to account creation/deletion, announcement error feedback and export-body completion. Three isolated tests first reproduced old account responses clearing a newer draft, an export downloading after session replacement, and an old action health callback terminating the replacement session (**3 failed, 27 deselected**, 91.71s). After adding only token/generation checks around those asynchronous continuations, the same cases passed (**3 passed, 27 deselected**, 66.30s). Account operations, export generators and recovery architecture were preserved.

## Phase B — H2

Root cause: closing the payment modal nulled `pendingPaymentBill` before the success message read it.

Files/functions: `admin_web/app.js`, payment confirmation handler; `tests/test_admin_repairs.py`.

Change: snapshot the bill context before the request, prefer authoritative response bill ID/amount, close the modal, refresh, and show confirmation only for the current session. One POST; no settlement/backend calculation changes.

Tests/results: isolated payment browser regression **1 passed, 6 deselected** (12.38s); existing payment/RBAC/duplicate/concurrency/historical billing and portal tests **22 passed** (55.27s). No synthetic worker collection was created. Diff/check reviewed before Phase C. Initial test setup used Playwright visibility for an opacity-based modal and the wrong billing tbody ID; corrected the test to assert the existing visual/interaction close state and actual ID.

## Phase C — Authentication Lifecycle

M1: stored/fresh sessions reveal Admin only after a current successful Admin-protected all-data response. Invalid, expired and non-Admin tokens return to login.

M2: reused the offline purge as `clearAdminSession` for manual logout and authentication failures. Corrected actual table IDs; cleared private tables/data/charts/modals/payment context/account name/form/password values/metrics. Rate and registration callbacks cannot restore stale state after termination.

M8: recognize known JWT-decoder 422 messages, including malformed headers/payload/signature; preserve unrelated form-validation 422 responses. No JWT verification or backend authentication changes.

Files: `admin_web/app.js`, new `tests/test_admin_repairs.py`, existing `tests/test_browser.py` (accept registration confirmation, allow 15s login, exercise verified retry without racing automatic heartbeat recovery).

Tests/results: **13 repair browser tests passed** (273.70s); existing portal + all Admin browser cases **14 passed, 16 deselected** (140.02s); portal/security regression **31 passed** (137.13s). Covered fresh/stored valid/malformed/expired/non-Admin sessions, private modal/data cleanup, relogin, 401, generic validation 422, replacement, lockdown and payment. Diff check and exact changes reviewed before Phase D.

## Phase D — Data Reliability

M3: a healthy process with failed all-data no longer appears freshly synchronized. Reused the existing banner for safe stale/data-load feedback, kept cached data/authentication, validated core array payloads, and added retry controls (including startup retry behind login). Genuine failed health retains the existing offline flow.

M4: registration loading runs independently after main sections render and catches failures locally. Separate registration status retains cached rows with a warning. API response ownership also checks registration request generation before handling authentication failures.

Files: `admin_web/app.js`, `admin_web/index.html`, `admin_web/styles.css` (warning wrapping/empty status only), `tests/test_admin_repairs.py`.

Tests/results: HTTP 500, invalid JSON/payload, startup retry, and delayed registration failure **5 passed, 13 deselected** (51.84s). Superseded registration 401 **1 passed, 18 deselected** (12.57s). Earlier repairs and existing Admin regression **27 passed, 22 deselected** (229.04s). Incremental HTML/CSS and JavaScript changes reviewed; diff check passed before Phase E.

## Phase E — Admin Correctness

M5: added the existing household-to-Purok LEFT JOIN pattern to the all-data collection query, preserving its 50-row limit/order/RBAC. Renderer shows unknown Purok as an em dash.

M6: collection chart uses authoritative `payment_date`, UTC calendar grouping for the latest five months including current/zero months, and recorded `total_due`. Undated/invalid legacy payments are excluded rather than assigned an invented collection month. Other dashboard totals unchanged.

M7: payment settings have dirty/revision state. Refresh preserves unsaved/unfocused drafts. Successful save obtains a current protected all-data response and uses server values; newer edits during save remain dirty. Failed follow-up refresh retains the draft and data warning.

M9: HTTP/network incident failures show generic safe feedback; successful resolution and server outage handling preserved.

M10: explicit `no-print` markers hide only directory/billing/report/review action columns; collection dates, announcement content and maintenance status remain printable. Asset cache versions advanced.

Files: `admin_web/app.js`, `admin_web/index.html`, `admin_web/styles.css`, `backend/server.py`, `tests/test_admin_portal.py`, `tests/test_admin_repairs.py`, `tests/test_admin_payment_processing_step3.py` (accept Action header attributes).

Targeted results: **6 passed, 28 deselected** (72.01s), covering actual/unknown Purok and unchanged role scope, calendar totals, draft/save races, incident errors/success, 35 navigation/overflow checks at 1920/1366/768/390/320px, and print columns. Backend/payment/export/portal regression **33 passed** (62.41s). Its initial run had one outdated exact-header assertion and 32 passes; corrected the assertion and reran successfully. Earlier browser regression **11 passed, 34 deselected** (126.55s). Exact changes and diff check reviewed before Phase F.

Final broad browser verification found a 390px dashboard overflow (**31 passed, 1 failed, 16 deselected**, 540.94s). It passed in isolation, so production CSS was not changed until a delayed-resize probe reproduced the cause: a 931.3px canvas inside a 316px chart body, with page width 968px at a 390px viewport (**1 failed, 1 passed, 29 deselected**, 48.64s). A single `.chart-body > canvas { max-width: 100%; }` constraint now bounds the existing canvas while Chart.js services its resize callback. No chart options, colors or data changed. Combined responsive/print, delayed chart resize and late-action checks then passed (**5 passed, 26 deselected**, 92.85s). Final asset versions are CSS 23 and JavaScript 26.

The resumed broad run passed every viewport, chart, functional and race case but failed one print-test style read (**36 passed, 1 failed, 16 deselected**, 605.24s). The per-cell reads could race heartbeat registration-row replacement and inspect a detached cell (empty computed `display`). Changed only the test to inspect all current print cells synchronously in one DOM operation, requiring a nonempty set of connected cells and the same `display: none` result. No production behavior/CSS was changed for that test failure. Responsive/print plus delayed-chart verification then passed (**2 passed, 30 deselected**, 37.59s); the full Admin suite was rerun afterward.

## Server / Application Performance Investigation

### Scope and measurement method

Phase F used sequential local loopback HTTP against the existing temporary SQLite fixture, three samples per endpoint/scenario, and headless Chrome. There was no production traffic, load generator, remote database, Redis or deployment change. Instrumentation lives only in opt-in `tests/test_admin_performance.py`; it measures request UTC start, Flask processing, DB connection/execute/fetch/transaction work, JSON serialization, payload bytes and client receipt time. No request bodies, credentials or JWTs are recorded.

The endpoint table below uses medians from the first warm HTTP run, UTC 2026-10-03 16:53:01.453–16:53:02.865. DB time includes execute and fetch/conversion, excludes connection creation. Columns are measured independently; medians need not sum. Browser timings include loopback/browser/test instrumentation overhead and are not production network measurements.

Raw evidence is retained outside the repository in `C:/Users/Windows/AppData/Local/Temp/waterhall-admin-repair-rrt4n_lg/performance/`: `endpoints.json`, `endpoints-auth-detail.json`, `browser-before.json`, `browser-after.json`, `registration-waterfall.json`, `rendering-unchanged-before.json`, `rendering-unchanged-after.json`, and screenshots. Aggregates remain in this report.

### Endpoint timings

Times in milliseconds; normal fixture has 2 households/1 bill.

| Endpoint | Backend time | DB time | Payload bytes | Total HTTP time | SQL queries / connections | Normal call frequency | Bottleneck / status |
|---|---:|---:|---:|---:|---:|---|---|
| GET /api/health | 0.76 | 0.00 | 53 | 12.44 | 0 / 0 | Startup, login check, each 3.5s heartbeat, recovery/error checks | Cheap process check; CONFIRMED no DB work |
| GET /api/ready | 4.83 | 0.87 | 19 | 12.45 | 1 / 1 | Health fallback only | Connection/schema readiness; not normal polling traffic |
| POST /api/login | 279.24 | 2.44 | 520 | 288.35 | 6 / 1 | User sign-in only | Password/security work; hash contract preserved |
| GET /api/all-data?role=admin | 14.83 | 7.60 | 1,551 | 29.67 | 14 / 2 | Authenticated startup, idle heartbeat, action/retry refresh | Small fixture fast; per-meter query growth CONFIRMED |
| GET /api/residents/registrations | 6.06 | 1.94 | 509 | 17.90 | 2 / 2 | After successful main data load | Non-blocking after M4 |
| GET /api/settings/payment | 9.88 | 2.13 | 65 | 14.91 | 2 / 2 | Existing endpoint; not a separate startup request | Auth lookup + settings read |
| GET /api/config | 1.27 | 0.00 | 76 | 5.62 | 0 / 0 | Not requested by Admin startup | No measured bottleneck |
| GET /api/collections/history | 7.64 | 3.14 | 38 | 13.46 | 2 / 2 | Not a separate Admin startup request; data comes in all-data | Bounded audit read |
| All-data, 50 households/601 bills | 50.33 | 31.06 | 246,630 | 77.61 | 62 / 2 | Bounded synthetic local scale sample | N+1/history and growing payload; CONFIRMED locally |
| Registrations, 50 households | 10.03 | 2.49 | 12,248 | 14.74 | 2 / 2 | Same local scale sample | Fixed query count |

Normal all-data connection creation median was 2.73ms, serialization 0.19ms; large all-data connection creation 2.46ms, serialization 3.80ms. These are SQLite measurements, not PostgreSQL connection or NUMERIC conversion measurements.

A separate instrumented login run directly measured password verification: 347.45ms median of 384.22ms backend processing, 8.16ms SQL execution and 3.18ms connection creation. Run-to-run CPU timing varies. This confirms password verification dominates local login processing; no hash/security weakening was made.

### Actual request sequence and UI timeline

Startup health precedes sign-in/stored-session load. Fresh sign-in checks health, then POSTs login, then protected all-data. Main data parsing/rendering completes before independent registration loading. Registration failure does not block other sections. Required health and authorization checks remain sequential. No navigation-only API requests were observed for five tab switches.

One measured after sample, with times relative to login click:

| Event | Start–finish ms | Blocking relationship |
|---|---|---|
| Startup health before click | Page time 322.9–403.6 | Startup check; user clicked at page time 995.5 |
| Login health check | 0.2–170.4 | Required before login |
| Login request / parsed auth response | 170.5–512.9 | Required authentication |
| All-data request / parsed response | 515.0–564.8 | Required protected Admin validation |
| Main DOM/chart rendering | 564.8–606.9 | Current successful data rendered |
| Registration request / parsed response | 606.9–677.7 | Independent; main UI already rendered |
| Existing loader fade completes / Admin ready | 1,137.8 | 500ms fade retained; former 600ms hold removed |

This is one complete measured trace, not a sum of medians. Normal browser render medians before/after were approximately 39/32ms for dashboard (including chart), 9.3/8.5ms for directory, 1.1/1.2ms for the one-bill table, and 9.7/9.1ms for table sanitization. Nested chart/sanitizer times overlap parent render times and must not be added again.

### Duplicate requests and heartbeat

| Request | Trigger / frequency | Can overlap? | Change / impact |
|---|---|---|---|
| Health | Startup/login/retry plus 3.5s heartbeat | Separate user/startup checks can overlap; heartbeat prevents another heartbeat while active | Keep all required checks; 6s health, 5s readiness fallback unchanged |
| All-data | Heartbeat and foreground/action refresh | Silent main fetch skips in-flight work; foreground supersedes prior request | Heartbeat now also checks whether data was active or changed during its health wait |
| Registrations | Successful main data load | Slow independent loads can overlap/supersede across refreshes | H1 ownership makes old results inert; no speculative cross-session coalescing introduced |
| Post-action refresh | Existing mutations | Some background refresh calls coalesce with active loading; foreground payment/settings refresh supersedes | No mutation request or settlement is cached/dropped by the performance changes |
| Navigation/chart refresh | Tab switch / current data rendering | Tab navigation sends no data request; charts render from all-data | Keep current navigation/Chart behavior |
| Online/offline | Browser connectivity events and retry | Health probes can overlap | Existing session-generation guards preserved |

Before, one of three normal browser traces issued two all-data and two registration requests in a short login burst: heartbeat started while main fetch was active and re-fetched after it completed. After the guard, all three traces issued one of each. Deterministic tests cover a foreground request already active at health start and one started/finished during that health request. Required health interval and offline detection are unchanged.

Healthy idle polling remains approximately 17.1 heartbeat opportunities/minute. For the small fixture one ordinary cycle has 2,113 measured JSON bytes across health/main/registrations and 16 SQL queries; the large fixture has 258,931 JSON bytes and 64 queries. These are payload/query counts, exclude transport headers/compression, and are not a production throughput claim.

### Database and serverless observations

- CONFIRMED: all-data performs one monthly-history query per metered household, each limited to the last four bills. Query counts grew from 14 to 62 for 2 to 50 meters. `principal()` reuses the fresh account lookup only within the request; two DB connections are still created for auth plus main data.
- CONFIRMED: bills, households, users, reports, announcements and maintenance reads are unbounded; sensor history is limited to 1 and collection history to 50. The dashboard shows five maintenance entries but the API contract returns all. Household monthly histories duplicate a subset of billing consumption values needed by existing consumers. No caps/contract changes were introduced.
- CONFIRMED locally: SQLite EXPLAIN for monthly history reports `SCAN billing_records`. PK/unique indexes support identity/serial/transaction lookups; the repository does not create a billing `(meter_id, bill_id)` index. Recommend examining the same query on a disposable PostgreSQL dataset before approving an index or batching change. No index/schema edits occurred.
- CONFIRMED: the adapter opens/closes connections per `get_db()` and commits on successful exit, including reads. PostgreSQL connection setup includes verified TLS; no application pool is defined. Actual remote connection time is NOT MEASURED.
- CONFIRMED locally: fresh Python module import took 2,243–2,732ms (median 2,486ms). Flask/extensions/crypto/push/Pillow imports and the login-security dummy password hash initialize on import. DB migration is explicit, not run per request/import. S3 client creation is lazy and occurs for configured photo operations; fixtures did not use S3.
- POSSIBLE in production: serverless cold process/module import and remote DB/TLS setup may add latency. Vercel cold start as the cause of the reported delay is NOT SUPPORTED by these local measurements. Configuration and Redis were left unchanged.
- NOT MEASURED: production WAN latency, PostgreSQL NUMERIC/date conversion, actual production indexes, Redis overhead, Vercel cold/warm distribution or physical device delays.

### Evidence-based changes and before/after

Only `admin_web/app.js` behavior changed for performance: remove the 600ms loader hold; avoid a redundant heartbeat data fetch; reuse billing/directory DOM rows when freshly received table inputs are byte-equivalent. Table comparison state resets with session generation; changed records still render. Every protected data request and server authorization remains in place. No authentication, mutation, billing or sync caching was added. Performance measurements used asset version 25; final action ownership guards advance JS to version 26.

| Metric | Before | After | Change / evidence |
|---|---:|---:|---|
| Normal click → Admin ready, median of 3 | 2,081.2ms | 1,266.4ms | 814.8ms less locally; overall includes variable request/CPU timing |
| Main render → loader hidden, median of 3 | 1,112.3ms | 526.7ms | 585.6ms less; confirms removal of the 600ms hold while retaining fade |
| Login-burst all-data calls in 3 traces | 2, 1, 1 | 1, 1, 1 | Burst duplication removed; health checks retained |
| Controlled 250ms registration body delay → main render | 433.0ms after all-data | 51.1ms after all-data | Baseline source served only in isolated browser; M4 makes rendering independent |
| Repeated unchanged 50-household/601-bill refresh processing | 988.9 / 1,018.5ms | 70.1 / 68.7ms | Medians 1,003.7 → 69.4ms; same three response calls retained |
| First 601-bill render | 836.6ms | 1,181.4ms | No initial-render improvement claimed; CPU varies and initial rows must render |

Large refresh timing uses a browser-only identical-response fixture to isolate parse/render work, not a remote-network benchmark. A separate real protected-API test confirms unchanged rows remain attached, changed resident/bill data rebuilds, Paid status appears and all requested refreshes occur. Comparison state is purged on logout/lockdown/session replacement.

The initial large direct-render probe measured 1,063ms median: billing 961ms, directory 85ms, chart 8ms, with DOMPurify work nested in table renderers. The patch targets repeated billing/directory rebuilds, not the security sanitizer or required initial rendering.

Performance targeted verification: **4 passed, 26 deselected** (60.98s), including browser measurement, both heartbeat timing races and unchanged/changed real API table behavior. Endpoint/hash/index detail **1 passed, 2 deselected** (15.39s); registration waterfall **1 passed, 2 deselected** (15.53s). Early profiling harness attempts failed on static file passthrough and a Playwright route callback argument; fixed only the harness and reran successfully. Production code was not adjusted to satisfy those setup failures.

### Classification and remaining performance risks

Measured local delay is **FRONTEND REQUEST WATERFALL / UI LOADER WAIT**, **FRONTEND RENDERING** for large repeated tables, **DUPLICATE REQUESTS** in the observed heartbeat race, and **BACKEND PROCESSING** for secure password verification. Database query growth is confirmed at synthetic scale; production NETWORK / DATABASE / SERVERLESS STARTUP attribution remains **UNKNOWN**.

Initial large-table rendering, unbounded historical payloads and N+1 query growth remain. Pagination/export changes are deferred by the repair scope. Slow registration calls can still supersede before completion; current session/request guards prevent stale private rendering. General API timeout covers fetch-to-headers; body-read timeout behavior is an existing limitation. Production performance needs low-volume authorized tracing and a disposable PostgreSQL comparison before database/deployment changes.

## Deferred Findings

- M11 XLSX contact typing: separate reporting review; no export-generator changes authorized here.
- M12 PDF truncation: separate reporting review; no PDF redesign authorized here.
- M13 payment-method persistence: requires separate persistence/schema review; no schema changes authorized.
- M14 password whitespace behavior: explicitly deferred; preserve current password handling.
- Missing/optional features: search, pagination, profile editor, reassignment, deactivation, announcement editing, notification inbox, structured due dates, and export date ranges remain outside scope.

## Regression Results

Final safe backend regression after resuming the current working tree: **121 passed, 0 failed, 10 deselected, 0 skipped** (463.76s). This is the previous comparable 120-test baseline plus the authoritative collection Purok regression.

Final Admin browser regression after the print-test correction: **37 passed, 0 failed, 16 deselected, 0 skipped** (306.26s). This includes the five existing Admin cases and 32 repair cases. Production files were unchanged during resumed verification; the only test correction was the synchronous print-cell inspection explained in Phase E.

Combined final regression: **158 passed, 0 failed, 26 deselected, 0 skipped**. Race subset: **11 passed, 0 failed** (included in the 37 browser cases, not additional tests): eight H1/session/request cases, two heartbeat-overlap cases and one settings-save/draft race. Responsive checks covered seven sections at 1920, 1366, 768, 390 and 320px, plus warning wrapping, explicit print columns and delayed Chart.js resize containment.

Final outcomes: **H1 PASS; H2 PASS; authentication lifecycle PASS; data reliability PASS; Admin correctness PASS; measured performance changes PASS**. Fresh/stored login, invalid/expired token cleanup, logout/relogin, lockdown/recovery, supersession/cancellation, one-payment confirmation/duplicate rejection, registration isolation, actual/unknown collection Purok, payment-calendar totals, unsaved/newer settings drafts, incident feedback, current account forms/broadcast/CSV download, unchanged-table reuse and changed-data rebuilding all passed. No JavaScript page errors were reported by those browser assertions.

Backend command:

```powershell
$env:RUN_BROWSER_TESTS='0'
$env:RUN_ADMIN_PERF='0'
$env:PYTHONDONTWRITEBYTECODE='1'
Remove-Item Env:TEST_DATABASE_URL -ErrorAction SilentlyContinue
.\.venv-tls312\Scripts\python.exe -m pytest -q -p no:cacheprovider --tb=short tests/test_admin_portal.py tests/test_admin_payment_processing_step3.py tests/test_reporting_step5.py tests/test_registration.py tests/test_security.py tests/test_finalization.py tests/test_iot_telemetry.py tests/test_operations.py -k 'not production and not development_postgres and not sqlite_import'
```

Admin browser command:

```powershell
$env:RUN_BROWSER_TESTS='1'
$env:RUN_ADMIN_PERF='0'
$env:PYTHONDONTWRITEBYTECODE='1'
Remove-Item Env:TEST_DATABASE_URL -ErrorAction SilentlyContinue
.\.venv-tls312\Scripts\python.exe -m pytest -q -p no:cacheprovider --tb=short tests/test_browser.py tests/test_admin_repairs.py -k admin
```

Final XML evidence is stored outside the repository beside the preserved baseline as `final-backend.xml` and `final-browser.xml`. The backend filter excludes 10 configuration/import cases to match the prior safe baseline; the Admin filter excludes the 16 non-Admin browser cases. Earlier phase/targeted/profile runs are documented individually above and are not added again to the final totals. Final source hashes are compared with those captured before the resumed test run.

Not run: production requests/stress tests, remote PostgreSQL integration/tracing, physical-device measurements or Flutter builds. No production safety assumption was made; all executed mutations/profile seeds used temporary local fixtures. The local profile cases were already executed successfully during Phase F and were not repeated merely to inflate regression totals.

## Git Diff Summary

Recovered the current working tree after the interruption using `git status --short`, `git diff --stat` and `git diff`; resumed the existing repair rather than the older Sync scan. The interrupted final browser attempt had no completed XML result and was rerun against the preserved final source.

The repair adds changes to seven existing files and creates three files. Relative to the protected repair baseline, the existing-file incremental diff is 393 added / 116 removed lines: `app.js` +334/-97, `index.html` +11/-9, `styles.css` +16/-3, `backend/server.py` +2/-1, payment test +2/-1, portal tests +21/-0, and browser tests +7/-5. The cumulative Git diff also contains pre-existing Admin layout changes, 29 firmware additions and 112 Resident metadata additions; those are not new firmware/Resident repair work.

Reviewed every repair file and the existing protected changes. No unrelated formatting, dependency upgrades, production credentials, runtime measurement/debug hooks, routes, schema, `db_adapter.py`, deployment configuration or sensor-contract changes were introduced. The sole backend change is the M5 read join/field. All 201 baseline file hashes were compared after the tests: only the seven expected repair files differ; the other 194, including the workspace database, local device configuration, Worker files, pre-existing Resident/ESP32 work and `WATERHALL_SYNC_REPORT.md`, match exactly. Final source hashes also match those captured before the last browser run. `git diff --check` passed; the new test/report files have no trailing whitespace. Branch/HEAD remain the baseline values and the staging area is empty.

Pre-existing files, separately preserved:

- `admin_web/app.js`, `admin_web/index.html`, `admin_web/styles.css`: prior layout, spacing, responsive containers and table-sanitization changes; extended only for the approved functional repairs and measured chart overflow.
- `iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino`: existing SNTP/TLS time synchronization changes; byte-for-byte unchanged from the repair baseline.
- `waterhall_resident_flutter/android/gradle/verification-metadata.xml`: existing Gradle verification additions; byte-for-byte unchanged from the repair baseline.
- `WATERHALL_SYNC_REPORT.md`: existing untracked report; unchanged and not used as the current repair result.

## Files Modified

- `admin_web/app.js`: session/request ownership, payment confirmation, protected session restoration/cleanup, data error/retry and independent registrations, payment-calendar chart, actual Purok display, settings drafts, incident feedback, explicit print cells and measured loader/heartbeat/table-render improvements.
- `admin_web/index.html`: existing banner status/retry, startup data retry, registration-specific status, print-action markers and asset cache versions.
- `admin_web/styles.css`: warning/status wrapping, explicit print exclusion and responsive chart containment; existing branding/layout preserved.
- `backend/server.py`: only the authoritative Purok field/LEFT JOIN in the bounded collection read.
- `tests/test_admin_portal.py`: real collection Purok/unknown relationship and unchanged role filtering regression.
- `tests/test_admin_payment_processing_step3.py`: Action header assertion accepts the explicit print class.
- `tests/test_browser.py`: correct Admin confirmation setup, login wait and recovery race handling.
- `tests/test_admin_repairs.py` (new): isolated Admin browser functional/session/race/responsive/print regressions.
- `tests/test_admin_performance.py` (new): opt-in local sequential measurement harness; no runtime debug instrumentation.
- `WATERHALL_ADMIN_REPAIR_REPORT.md` (new): repair, measurements, verification and scope record.

## Database Changes

No schema, index, workspace database or production data changes. The only database-related code adjustment is the M5 collection SELECT/LEFT JOIN in `backend/server.py`. Tests and profiles write only isolated temporary SQLite fixtures; `TEST_DATABASE_URL` was unset.

## Worker Changes

None.

## Resident Changes

None; preserve pre-existing resident Gradle metadata changes.

## ESP32 Changes

None; preserve pre-existing firmware changes.

## Deployment Changes

None. No branch changes, staging, commits, pushes, or deployment.

## Remaining Risks

- Initial rendering of a large billing table still takes approximately a second in the 601-bill local fixture. Unbounded historical responses, per-meter history queries and remote connection/import costs require separate review; production PostgreSQL/Vercel/WAN latency was not measured.
- Registrations can be slow or fail independently; the portal now makes that state visible and guards obsolete responses. General API timeout still covers fetch-to-headers rather than the entire body read.
- Legacy paid bills with no valid payment date are excluded from the collection calendar; the repair does not invent dates or rewrite historical records.
- M11–M14 and optional features remain deferred as listed above. No safely actionable visual issue is intentionally left unfixed; final responsive verification is recorded in Regression Results.

## Recommended Next Step

Review the working-tree diff and this report before separately authorizing any commit, deployment, deferred feature or database performance change. Work stops here for review; nothing was staged, committed, pushed or deployed.
