# WaterHall Production Image Delivery and Controlled Release

## Scope and protected state

Continued the current `main` working tree at `e28b1fbdc2ded97ca4b2c85cefabed707b7b5b87`. Inspected status, diff statistics and changes before editing. Preserved the completed Admin repair and Resident Camera/Gallery repair. No reset, restore, clean, stash, history rewrite, remote change or credential change occurred.

Baseline hashes, patch, measurements, test XML and build logs are outside the repository: `C:/Users/Windows/AppData/Local/Temp/waterhall-production-release-b7kqvdkx`. Of 207 baseline files, only six existing files changed during this task: Admin JavaScript/HTML, report operations, photo delivery, server routing/listing and Resident photo regression tests. The other 201 baseline files, including the local database, Worker files, private device configuration and existing Resident native code, retain their exact hashes. Two new files are the image-delivery tests and this report.

Unrelated pre-existing changes preserved and excluded from release staging:

- `iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino`: user NTP/time-synchronization changes.
- `waterhall_resident_flutter/android/gradle/verification-metadata.xml`: user dependency checksum additions; preserved during APK builds.
- `WATERHALL_SYNC_REPORT.md`: older scan; not the current repair report.

Current planned IoT hardware: **Water Level — HC-SR04; Turbidity; TDS**. pH and Flow remain out of scope. Firmware conversion is a separate task; no firmware was edited here. Earlier repair reports are preserved historical records.

## Root cause and storage discovered

Report metadata and evidence are stored in `resident_reports`. The existing `photo_base64` TEXT column holds either a sanitized JPEG data URL or a private `s3:reports/<uuid>.jpg` reference. PostgreSQL is the configured production database architecture; local isolated tests use SQLite. No BLOB/BYTEA column, filesystem image store or schema migration was introduced.

Both `/api/reports` and `/api/all-data` selected `r.*` and called `photo_for_client()` for each report. Database storage therefore returned every full Base64 image inside the list JSON. Three valid 2,017,102-byte input images were sanitized to 2,697,846-byte JPEGs; their Base64 representation inflated the Admin response to **10,793,771 bytes**.

Vercel documents a 4.5 MB Function request/response limit. [Vercel Function limitations](https://vercel.com/docs/functions/limitations)

### Private S3 status

**AVAILABLE-BUT-NOT-CONFIGURED in the inspected local environment. Production configuration could not be inspected.**

The existing implementation supports private encrypted `put_object`, a stored `s3:` reference and a short-lived signed read. This task reuses its object keys and storage client; it does not create another storage architecture or cloud account. New Citizen Report reads proxy one object after backend authorization instead of returning signed URLs in lists.

The inspected process environment and ignored local environment configuration contain none of these names: `PHOTO_STORAGE`, `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`. Default storage remains `database`. `PHOTO_STORAGE=s3` requires `S3_BUCKET` and working AWS/compatible credentials; region/custom HTTPS endpoint are deployment-specific. Session credentials are optional when another supported credential source is available. Missing configuration was not invented or changed.

No local Vercel credential/project binding, Vercel connector or accessible browser session was available for production environment inspection. Production readiness confirms database availability, not the presence or absence of S3. No secret values were printed.

## Production-safe solution

- Both report lists explicitly select metadata and a small SQL `has_photo` result; full image TEXT is not fetched into list rows. Responses include `has_photo`, protected `photo_url`, and the compatible `photo_base64` key set to `null`.
- `/api/reports` retains its 50-record limit and ordering. Resident ownership filtering now occurs in SQL before the limit. `/api/all-data` retains its existing complete metadata record set.
- New `GET /api/reports/<report_id>/photo` requires the existing Bearer JWT and database-backed principal. It checks ownership before reading private evidence. Residents can read their own household only. Admin and Worker retain their existing report access policy.
- Binary JPEG/PNG/WebP responses reproduce the exact sanitized persistent bytes, with no-store caching and nosniff. No JWT is placed in a URL, public evidence URL is introduced, or unauthenticated storage redirect occurs.
- Delivery is bounded to **3 MiB (3,145,728 bytes)**. Inline references are length-checked before decoding. Private S3 streams read at most limit + 1 and close. Malformed keys, external URLs, unsupported/corrupt images, missing objects and oversized legacy evidence fail safely.
- Citizen Reports retains its existing table, colors, typography and navigation. A “View photo evidence” button replaces automatic inline image downloads. A click opens the existing style of image window, displays loading/error feedback and requests only that image. Popup blockers receive actionable feedback.
- Session invalidation closes photo windows, revokes object URLs and rejects late headers/body results. Expired/invalid JWTs use the existing Admin cleanup. New photo handling cannot restore an old session or render old private evidence.
- Existing upload validation, 2 MiB input limit, 12 MP decoded-image limit, EXIF orientation correction, 1920-pixel bounding, JPEG quality 85, persistence transaction and idempotent acknowledgement remain. No new temporary image persistence, database data migration or native picker rewrite occurred.
- Existing Worker maintenance-photo behavior is unchanged. Its separate inline-photo payload risk remains outside Citizen Reports scope.

## Before/after measurements

Measurements use isolated local SQLite fixtures and Flask test-client responses, including actual serialized JSON. Times are single local samples, affected by CPU/load; they are not production latency claims. Sizes are bytes, with decimal MB/KB when summarized.

- **0 photos:** Admin all-data 1,551 → 1,551 bytes; 18.01 → 27.47 ms. Report list 34 → 34 bytes; 4.61 → 4.99 ms.
- **1 photo:** Admin all-data 3,598,957 → 1,860 bytes; 34.91 → 17.16 ms. Report list 3,597,440 → 343 bytes; 34.10 → 10.45 ms.
- **3 photos:** Admin all-data **10,793,771 → 2,480 bytes (10.794 MB → 2.480 KB)**; 84.19 → 42.19 ms. Report list **10,792,254 → 963 bytes**; 79.72 → 31.78 ms.
- **103 reports, 3 photos:** Admin all-data 10,819,659 → 31,868 bytes; 90.91 → 36.38 ms. The existing 50-row report-list window contains the latest metadata-only records: 12,987 → 14,737 bytes; 35.69 → 5.48 ms.
- Each large image response is **2,697,846 bytes (2.698 MB)**; measured retrievals 89.21, 155.12 and 86.30 ms. The stored image remains byte-identical.
- Listing uses one request to the chosen list endpoint and zero evidence requests. Opening one photo adds one authenticated image request. Other established Admin health/registration polling remains unchanged.
- Large-photo JSON uploads were **2,689,649 bytes**, all HTTP 200. A maximum-size valid padded PNG plus 4,000 Unicode description characters produced **2,844,330 bytes**, HTTP 200, below the unchanged Flask 3,145,728-byte cap. Camera and Gallery share the preserved 2 MiB native byte checks; Base64/envelope overhead is included in these measurements.

Preserved Admin performance evidence, from its completed repair: median readiness 2,081.2 → 1,266.4 ms; render-to-loader-hidden 1,112.3 → 526.7 ms; repeated unchanged 50-household/601-bill refresh 1,003.7 → 69.4 ms. Current regression tests recheck both heartbeat overlap races and unchanged/changed table rendering. Those earlier timing samples are historical, not repeated production measurements.

## Tests and release gates

- Safe backend regression: **152 passed, 0 failed, 5 skipped, 41 deselected**, 302.88 seconds. The five skips are opt-in browser cases covered by the separate browser run. Ten production/PostgreSQL/import cases remain excluded by the established safe suite.
- Final additional photo-authentication selection: **6 passed, 0 failed**, 18.27 seconds. Five overlap the backend run; one adds expired-JWT retrieval. **Unique backend checks: 153.**
- Initial delivery backend run: 20 passed; original Resident backend photo selection: 11 passed. These overlap final totals and are not added again.
- Initial delivery browser run: **13 passed, 0 failed**, 193.81 seconds. Final combined Admin/Resident/browser results are recorded below after completion.
- Final combined browser regression: **77 passed, 0 failed, 0 skipped, 46 deselected**, 611.62 seconds. Includes 37 preserved Admin cases, 24 Resident cases, one shared native-auth case and 15 new delivery cases. The existing 11 Admin race cases and four new photo header/body/logout/offline races pass; these 15 races are included in the browser total.
- **Unique scoped checks: 245 passed (153 backend, 77 browser, 15 Flutter); zero scoped regressions.** Repeated targeted runs are not added to this total.
- Resident Flutter: **15 passed, 0 failed**, with the production `SERVER_BASE_URL` Dart define.
- Resident `flutter analyze --no-pub`: **PASS, no issues**, 132.2 seconds.
- Fresh `dart compile js web/app.dart -O2 --no-source-maps`: **PASS; byte-identical to preserved `web/app.js` (386,405 bytes)**. No generated JavaScript was manually rewritten.
- Existing static build executed against an isolated source copy: **PASS**; Admin HTML/JS/CSS and Resident/Worker generated JS match release sources; no private/runtime file was published. Workspace sources were untouched by this build check.
- Production release APK pre-deployment build: **PASS**, 172.2 seconds, explicit `--dart-define=SERVER_BASE_URL=https://waterhall-samal.vercel.app`. Gradle's effective encoded Dart define was decoded and verified. Compiled ARM64 code contains the production origin and excludes `http://10.0.2.2:8000`. Signing/dependency/deployment configuration remains unchanged.
- Security coverage: no JWT, malformed JWT, expired JWT, forged role, unknown identity, other household, private S3 ownership, nonexistent photo/object, malformed S3 key, external URL reference, corrupt/unsupported evidence, delivery bound, invalid/oversized upload and storage failure without a successful report reference.
- Persistence coverage: JPEG/PNG/WebP upload → sanitized JPEG → exact bytes on retrieval; new database connection/client; backend process restart; idempotent replay; private S3 reference retrieval using isolated storage mocks. No live S3 service or production photo write was tested.
- Browser coverage includes same image, loading/errors/retry, desktop/laptop/tablet/mobile, session cleanup and late photo results; preserved Admin H1/H2, auth, registration isolation, collection Purok, repeated refresh, chart containment, tables, forms, navigation, CSV and print behavior.

### Existing limitations, not hidden test regressions

The full repository is not claimed green. Two previously verified baseline browser failures remain outside this repair: Worker offline collection fixture policy conflict, and landing headline text expectation. They were previously reproduced with the preserved pre-Resident JavaScript and were not edited to conceal failure.

Current-tree secret audit reports seven findings in unchanged IoT example files. GitHub logs for baseline commit `e28b1fb` report the exact same seven findings and fail at `scripts/audit_repository.py`, before tests. Baseline Sonar checks also failed. Those files/workflows are preserved and excluded from release changes. The explicit release-file secret/data scan and diff checks are recorded with the final gate; a whole-repository audit PASS is not claimed.

## Approved release files and reasons

Completed Admin repair, preserved:

- `admin_web/styles.css`: established alignment, spacing, responsive containment and chart fixes; unchanged by this task.
- `admin_web/app.js`: established H1/H2, auth/session, data correctness and repeated-refresh repairs; this task adds lazy Citizen Report evidence and private-view cleanup only.
- `admin_web/index.html`: established table/chart/status/layout repairs; this task advances JavaScript cache version to 27.
- `backend/server.py`: established authoritative collection-Purok join; this task changes report metadata projection and registers protected image retrieval.
- `tests/test_admin_payment_processing_step3.py`: existing semantic Action-header regression.
- `tests/test_admin_portal.py`: existing authoritative Purok/role-filtering regression.
- `tests/test_browser.py`: existing Admin confirmation, wait and recovery fixture fixes.
- `tests/test_admin_repairs.py`: existing Admin functional/session/race/responsive regressions.
- `tests/test_admin_performance.py`: existing opt-in isolated performance harness.
- `WATERHALL_ADMIN_REPAIR_REPORT.md`: preserved completed Admin evidence.

Completed Resident repair, preserved:

- `waterhall_resident_flutter/lib/main.dart`: existing guarded Camera/Gallery/lost-data WebView bridge; unchanged by this task.
- `waterhall_resident_flutter/lib/report_photo_picker.dart`: existing bounded native picker helper; unchanged.
- `waterhall_resident_flutter/test/report_photo_picker_test.dart`: existing native helper tests; unchanged.
- `web/app.dart`: existing Resident preview, draft, session and acknowledged submission repair; unchanged.
- `web/db.dart`: existing direct acknowledged/idempotent Resident report API call; unchanged.
- `web/app.js`: exact generated artifact of those Dart sources; unchanged by this task.
- `backend/photos.py`: preserves Resident EXIF correction and existing upload/persistence logic; adds bounded private photo read and list metadata helper.
- `tests/test_resident_photo_repair.py`: preserves all prior photo assertions; now retrieves private binary evidence before checking image contents/ownership/restart and verifies Admin lazy opening.
- `WATERHALL_RESIDENT_CAMERA_GALLERY_REPAIR_REPORT.md`: preserved completed Resident evidence.

Production delivery additions:

- `backend/operational_routes.py`: explicit report metadata projection and authoritative individual-photo access.
- `tests/test_report_image_delivery.py`: payload/size/security/persistence/browser/session regressions and isolated measurements.
- `WATERHALL_PRODUCTION_RELEASE_REPORT.md`: current release evidence and final manual-test instructions.

No APK, environment file, database, ignored device configuration, temporary evidence, cache/build directory or unrelated file belongs to staging.

## Release outcome

Final browser gate: **PASS**.
Final approved-file/secret/diff gate: **PASS**. Exactly 22 approved files; zero secret/private-path findings within them. `git diff --check` passes. Remote `main` still matches the protected baseline before staging; no merge/history rewrite is needed.
Commit: PENDING.
Push: PENDING.
Vercel deployment: PENDING.
Post-deployment production checks: PENDING.
Post-deployment APK build: PENDING.

Existing GitHub `origin` and `main` are unchanged. GitHub's baseline commit status and Production deployment status confirm the existing Vercel project is connected to this branch. The authorized release uses a normal non-force Git push and that existing deployment connection, without Vercel project/environment changes. [GitHub deployment API](https://docs.github.com/en/rest/deployments/deployments?apiVersion=2026-03-10)

Pre-deployment non-destructive smoke checks: production `/api/health` HTTP 200/ok; `/api/ready` HTTP 200/ready; Admin and Resident pages HTTP 200.

## Manual production and physical-phone confirmation

**Production photo E2E: MANUAL TEST REQUIRED. Real phone Camera: MANUAL TEST REQUIRED. Real phone Gallery: MANUAL TEST REQUIRED.** No dedicated safe production test account/data mechanism was available. No fake production incident was created, and no real report was modified/deleted for testing.

1. Install the production APK identified in the final outcome. Sign in with the intended approved Resident account.
2. Open Report, choose category, enter an appropriate real report message, choose Camera, take a photo, verify the preview and submit. Confirm success appears after server acknowledgement.
3. Sign into Admin at `https://waterhall-samal.vercel.app/admin/`, open Citizen Reports, find that report and click “View photo evidence.” Confirm the same image opens. Close/reopen it and repeat after app restart to confirm persistence.
4. Repeat using Gallery and the Android picker. Confirm preview, acknowledgement and the same Admin image.
5. Use only intended reports or a user-approved dedicated test account. Any test-record cleanup requires separately authorized normal application actions.

Remaining verified risks: unbounded metadata/history and household monthly-history query growth from the earlier Admin report; unchanged Worker maintenance inline photos can still enlarge all-data; existing legacy evidence above the safe delivery cap returns an actionable error instead of exceeding the platform payload limit; production S3 configuration and live PostgreSQL/photo E2E are unverified; real native permission/activity behavior needs the user's physical phone.

Worker app modified by this task: **NO**. ESP32 modified by this task: **NO**. Database schema modified: **NO**. Production data manually modified: **NO**. Native Resident picker modified again by this task: **NO**. Secrets added to release: **NO**. pH/Flow introduced: **NO**. Deployment configuration modified: **NO**.
