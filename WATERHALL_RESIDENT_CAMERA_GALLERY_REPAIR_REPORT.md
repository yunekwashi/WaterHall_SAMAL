# WaterHall Resident Camera/Gallery Controlled Repair

## Initial State

Continued the current working tree on `main`, HEAD `e28b1fbdc2ded97ca4b2c85cefabed707b7b5b87`. Inspected `git status --short`, `git diff --stat`, and the current diff before editing. Nothing was reverted, staged, committed, pushed, or deployed.

Protected baseline and test evidence are outside the repository in `C:/Users/Windows/AppData/Local/Temp/waterhall-resident-repair-nh8tuc_c`. The baseline contains hashes for 203 existing files and the initial diff. The completed Admin report remains authoritative for the earlier Admin work.

Pre-existing tracked changes, all preserved:

- `admin_web/app.js`, `admin_web/index.html`, `admin_web/styles.css`: completed Admin functional/layout repairs.
- `backend/server.py`: completed Admin authoritative collection-Purok read join.
- `tests/test_admin_payment_processing_step3.py`, `tests/test_admin_portal.py`, `tests/test_browser.py`: existing Admin regression changes.
- `iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino`: user ESP32 clock/TLS work.
- `waterhall_resident_flutter/android/gradle/verification-metadata.xml`: user Gradle checksum additions.

Pre-existing untracked files, all preserved:

- `WATERHALL_ADMIN_REPAIR_REPORT.md`
- `WATERHALL_SYNC_REPORT.md`
- `tests/test_admin_performance.py`
- `tests/test_admin_repairs.py`

## Existing Architecture

The Resident APK is a Flutter WebView wrapper. `MainActivity` is the existing `FlutterActivity`; it does not implement a separate file chooser. The WebView loads the configured origin at `/index.html?role=resident`. `web/app.dart` is the editable web source, and `web/app.js` is its generated JavaScript.

Camera: `btn-resident-camera-trigger` / `btn-resident-photo-replace-camera` -> `openPhotoPicker(..., camera)` -> `NativePhotoPicker.postMessage({request_id, source})` -> Flutter `_handleNativePhotoPickerRequest` -> `image_picker.pickImage(ImageSource.camera)` -> bounded bytes -> `waterhallPhotoPickerResult(request_id, data_url, file_name, error)` -> preview and `_reportPhoto`.

Gallery follows the same path with `gallery` and `ImageSource.gallery`. Browsers without the native channel retain the existing hidden file inputs. There is one native picker architecture, with its existing request-ID callback.

Submission: Resident-owned draft -> existing authenticated `Database.apiRequest` -> `POST /api/reports/add`, JSON containing `operation_id`, `household_id`, `report_type`, `description`, `photo_base64` -> authenticated principal/ownership validation -> image validation/re-encoding/storage -> report insertion and idempotency response in the database transaction -> GET `/api/reports` or Admin `/api/all-data` -> unchanged Admin Citizen Reports image and full-image popup.

## Root Cause ? Camera

The Camera button, source name, channel name, and callback already matched in the current code. No physical-device launch failure was verified. The shared evidence preview was hidden by `enforceLoginGate()` (`display: none`) and never made visible when a photo was selected. A regression test reproduced a decoded image present in the DOM but hidden after login.

Native failures previously collapsed permission denials and picker exceptions into one generic message. There was no mounted/page-generation guard around a late native result and no `retrieveLostData()` path for an Android activity/process restart. Picker MIME metadata or filenames could describe the original rather than the resized bytes.

## Camera Fix

Restored preview visibility. Kept the existing `image_picker`, native channel, navigation-origin restriction, and 1920x1920 / quality-85 picker settings. Added bounded photo processing with format detection from returned bytes, a pre-read 2 MiB check, actionable permission/camera-unavailable feedback, an active-picker guard, mounted/page-generation result guards, and Android lost-data recovery tied to a restored Resident draft. Exceptions do not log images, tokens, or payloads.

## Root Cause ? Gallery

Gallery shared the hidden-preview defect. Invalid browser replacement files previously called `clearSelectedPhoto()`, discarding existing evidence. A pending picker request was not invalidated by logout, allowing a late callback to affect cleared state. The web callback accepted image strings without decoding them before replacing the preview.

No physical-device Gallery launch failure was verified; channel/source/callback names already matched.

## Gallery Fix

The same native helper handles Gallery. Browser and native results are decoded and checked before replacing existing evidence. Cancellation, permission errors, corrupt images, unsupported images, and oversized replacements preserve the category, message, and previous photo. Selection versions and session/request IDs reject stale callbacks. Remove Photo continues to work. Browser fallback resets the file input so selecting the same file can fire a change event.

## Android Permissions

Installed Flutter: 3.44.8, Dart 3.12.2. Locked dependencies: `image_picker` 1.2.3, `image_picker_android` 0.8.13+23, `webview_flutter_android` 4.13.0. The freshly merged debug manifest confirms min SDK 24 and target SDK 36.

The existing manifest already declares CAMERA, an optional camera feature, and image-capture/content-selection query intents. The installed Android picker requests CAMERA at runtime when declared. Gallery uses Android Photo Picker on Android 13+, with the plugin's content-selection fallback on older supported devices. No READ_EXTERNAL_STORAGE, READ_MEDIA_IMAGES, or MANAGE_EXTERNAL_STORAGE permission was added. Manifest, Gradle configuration, lockfiles, plugin versions, and MainActivity were left unchanged.

Sources: installed plugin source/README and [official image_picker documentation](https://pub.dev/packages/image_picker/versions/1.2.3). Permission rejection now offers Settings/Gallery guidance without an automatic retry loop. Permission dialogs and permanent-denial behavior still require a real phone check.

## Image Preview

Selected evidence uses the existing preview card and ImageElement. The preview becomes visible and must decode before replacing prior evidence. Supported formats remain JPEG, PNG, and WebP. Base64 data and file sizes are bounded at 2 MiB; decoded images above the existing backend 12-million-pixel threshold are rejected. Picking/decoding must finish before submission.

The existing category, message, photo, and retry operation ID are saved as an account-owned Resident draft in existing WebView localStorage. Input saves are debounced; a picker launch or submission saves immediately. A restored pending native picker invokes `retrieveLostData()` through the existing bridge. Drafts remain across ordinary reload/network failures. Logout/expired sessions clear private draft/photo state and invalidate late results. Storage-quota failure gives explicit feedback and retains the current screen state; restart recovery is not promised when storage is full.

## Report Submission

Confirmed root cause: `submitResidentReport()` returned true after `queueAction()`, while queue synchronization caught server errors. The UI therefore cleared a report even after HTTP 500. The initial regression reproduced this loss.

Resident submission now uses the existing authenticated API wrapper directly and requires backend `status=success` plus `report_id`. It clears the draft/photo only after that acknowledgement. Failures retain the draft/photo with useful feedback. The Resident draft retains the same operation ID for an unchanged retry, including after reload; an isolated test simulated a committed report with a lost acknowledgement, then retried and verified exactly one database row. A synchronous in-flight guard blocks duplicate taps. Report controls are locked during submission; Sign Out remains available. Older results cannot clear a new session's draft or unlock its active submission.

No automatic new Resident report is enqueued or retried by this form. Existing account-owned queues, including older pending reports, are preserved. Worker queue, SQLite, sync, collection, billing, and announcement behavior were not edited. API routes and JSON field names remain unchanged; identity and household ownership are still enforced by the backend.

## Backend Image Validation

The only backend code change is applying Pillow `ImageOps.exif_transpose()` before thumbnailing and stripping metadata. The initial orientation regression proved that EXIF orientation 6 was removed while the image remained 18x12; after the fix the stored JPEG is 12x18 with metadata removed.

Existing MIME/header allowlist, strict Base64 decoding, 2 MiB input limit, decompression-bomb/pixel protection, actual decoded-format validation, thumbnailing, JPEG re-encoding, and sanitization remain. Invalid images produce no report or idempotency record. No image limit was increased, and no SVG/executable format was enabled.

## Backend Image Persistence

Metadata and image references are stored in the existing `resident_reports` record. Default `PHOTO_STORAGE=database` stores the sanitized JPEG data URL in `photo_base64`; production configuration requires PostgreSQL and forbids SQLite fallback. Optional `PHOTO_STORAGE=s3` stores a private object and the `s3:reports/<random>.jpg` reference; retrieval generates a five-minute presigned URL. No upload directory or serverless-local file is used for report evidence.

Verified with isolated fixtures: actual POST plus authenticated retrieval, correct category/description/household/status/image, idempotent replay, account isolation, Admin retrieval, a fresh test client/connection, and a new backend process reading the same isolated database and matching the image hash. S3 behavior was tested with a private-storage mock, including reference retrieval and no additional object on replay. Failed storage creates no report/reference. This verifies code behavior, not a real cloud bucket or production PostgreSQL.

Existing S3/database cross-system failure risk remains: successful S3 upload followed by database failure can leave an orphan object. No production cleanup or migration was attempted.

## Vercel Compatibility

A 2 MiB input encodes to approximately 2.8 MB before small JSON metadata, within the existing Flask 3 MiB request cap. Vercel documents a 4.5 MB request/response cap: [Vercel Functions limits](https://vercel.com/docs/functions/limitations).

An isolated current-code envelope probe generated a 2,017,102-byte JPEG and submitted three reports successfully. Each JSON request was 2,689,638 bytes. Admin `/api/all-data` then returned **10,793,762 bytes**. That response exceeds Vercel's cap even though every individual upload was valid. Durable storage alone does not guarantee successful production retrieval at this volume.

The existing production-compatible option is private S3 references with the existing PHOTO_STORAGE/S3 configuration. Database-only deployments must address the response envelope before large photo volumes. No new service, production storage, configuration, upload API, deployment, or schema was provisioned or changed. Existing inline records also require an explicitly authorized storage migration if their combined responses exceed the platform limit.

## Admin Citizen Reports

No Admin file was changed by this task. Camera and Gallery browser bridge tests each submitted evidence, loaded the unchanged Admin portal, verified the exact sanitized stored image in Citizen Reports, decoded its dimensions, and opened the same image in the full-image popup. The existing Admin repair files/report were hash-preserved. Existing dashboard, session/race, payment-success, registration, table/form, chart, and responsive tests are included in the focused final browser suite.

## Automated Tests

Final scoped browser suite: **62 passed, 0 failed, 0 skipped, 25 deselected**, completed in 637.79 seconds. This includes **37 existing Admin regressions**, **24 Resident photo/report cases** (23 new, one existing), and **one shared native-auth regression**. The unchanged 11 Admin race tests are included within those 37 Admin cases, not added to the count.

Command: `python -m pytest -x -q --tb=short --show-capture=no -p no:cacheprovider tests/test_browser.py tests/test_admin_repairs.py tests/test_resident_photo_repair.py -k "(admin or resident or native_auth_serialization) and not resident_backend_preserves and not resident_valid_photo_persistence and not resident_invalid_photo_creates and not resident_s3 and not resident_photo_survives_backend_process"`

RUN_BROWSER_TESTS=1, RUN_ADMIN_PERF=0, PYTHONDONTWRITEBYTECODE=1, and TEST_DATABASE_URL removed. The existing browser fixture uses ephemeral loopback Flask and headless Chrome; its collected JavaScript errors were empty in passing cases. Browser bridge results and Flutter picker injection are automated substitutes for native UI, not physical-device capture.

Unique passing final scoped checks: **209** (132 backend, 62 browser, 15 Flutter). Scoped failures: **0**. Skipped: **0**. Main final selections deselected **35** cases (backend 10, browser 25); the separately selected photo backend run also reports its own 21 deselections. These selection counts are not additional failures or unique untested-case totals. Two out-of-scope baseline browser failures are reported separately below, without claiming an entirely green repository suite.

Completed final backend command (isolated development SQLite fixtures; TEST_DATABASE_URL removed; no PostgreSQL schema/prod endpoints):

`python -m pytest -q -p no:cacheprovider tests/test_admin_portal.py tests/test_admin_payment_processing_step3.py tests/test_reporting_step5.py tests/test_registration.py tests/test_security.py tests/test_finalization.py tests/test_iot_telemetry.py tests/test_operations.py -k "not production and not development_postgres and not sqlite_import"`

Result: **121 passed, 0 failed, 0 skipped, 10 deselected**. Additional photo backend command selected `backend or valid_photo or invalid_photo or s3 or process_restart` from `tests/test_resident_photo_repair.py`: **11 passed, 0 failed, 0 skipped, 21 deselected** at that stage. The unchanged final photo/backend implementation therefore has 132 passing backend tests across these two selections.

Focused runs: preview/orientation 2 passed; submission plus existing photo report 4 passed; native cancellation/error/retry/recovery cases passed; corrected Admin full-image integration 2 passed; logout, expiry, late submission, and Worker/Admin announcement receipt 4 passed.

Initial expected root-cause tests: 3 failures (hidden preview, HTTP-500 draft loss, EXIF orientation). Those regressions were fixed. Early native test fixtures used XFile.fromData's name argument, which is ignored on IO; corrected fixtures use a path. Early Admin integration tests attempted new_page on an owned Playwright context; corrected to a separate browser page. Two analyzer informational findings were corrected. These were transient development failures, not final pass claims.

An initially broadened browser run was stopped for investigation; it is not counted as a completed final suite. A later run was stopped to narrow the upload control lock and keep Sign Out enabled. Their incomplete totals are not counted.

Two existing broader browser tests fail identically with the saved pre-repair JavaScript, served by a temporary external test plugin without restoring any workspace file:

- `test_worker_offline_collection_reconnect_and_reload`: its seeded configuration leaves Worker collection disabled; clicking the correctly disabled collection button times out.
- `test_public_routes_and_mobile_registration_approval`: its first assertion expects the older heading containing `water service`; the current unchanged landing page uses the WaterHall capstone title.

Baseline verification result: **0 passed, 2 failed, 0 skipped, 19 deselected**. These out-of-scope test assumptions were not repaired. The focused final suite does not claim they pass. Registration/backend tests and the existing Admin registration regression remain included in the safe scoped suite.

Not run: physical Android Camera/Gallery/permission/activity-kill tests, production cloud persistence, production PostgreSQL/Redis/Vercel integration, release APK build, and opt-in Admin performance profiles. No claim of device or production verification is made.

## Flutter Analyze

`flutter analyze --no-pub`: **PASS**, no issues found on the final native code (32.4 seconds). No Flutter/plugin upgrade or dependency changes were performed. `flutter test --no-pub`: **15 passed, 0 failed** (13 new picker cases plus 2 existing tests).

## Resident APK Build

`flutter build apk --debug --no-pub`: **PASS**, assembleDebug completed in 936.4 seconds.

Artifact: `waterhall_resident_flutter/build/app/outputs/flutter-apk/app-debug.apk` (163,276,923 bytes).
SHA-256: `fde5ed62db4567d0f7012be340cbdf4ad9c4c693ec03756a6b3ebe68a78f7e24`.

This is a development APK using the existing emulator default `http://10.0.2.2:8000`. The WebView loads web assets from its configured server; those repaired assets must be served by the test workspace for device verification. A physical phone requires the existing documented SERVER_BASE_URL build option pointing to an authorized test origin. No production URL was invented, signing credential altered, or release build claimed.

Build warnings concern workmanager's future Kotlin-plugin compatibility, Android SDK XML tooling version mismatch, and obsolete Java 8 source/target settings in dependencies. They did not prevent the build; no dependency/build configuration was changed to suppress them. `adb devices` returned no connected device.

## Performance

No phone timing or before/after speedup is claimed. Existing picker dimensions/quality/limits were retained. The local envelope probe measured current POST processing at 1496.02 / 894.38 / 547.12 ms, and current Admin retrieval at 168.56 ms, while the machine was building/testing. These include Flask, validation/re-encoding, storage and insertion; they are not separately measured network, Android picker launch, decode, bridge-transfer, production database, or cloud-storage times. The useful finding is the measured response-size blocker above. No transport redesign or blind performance optimization was attempted.

## Files Modified

New repair files/changes only:

- `waterhall_resident_flutter/lib/main.dart`: reuse the existing picker through a bounded helper; activity-loss recovery, busy/disposal/page-generation guards, safe result delivery.
- `waterhall_resident_flutter/lib/report_photo_picker.dart`: injectable picker operation, actual-byte MIME detection, limits, cancellation, permission/error feedback and recovery.
- `waterhall_resident_flutter/test/report_photo_picker_test.dart`: native picker source/result/error/size/recovery tests with injected files.
- `web/app.dart`: visible validated evidence preview, cancellation/replacement preservation, account-owned draft recovery, session/selection/submission guards and acknowledgement-only clearing.
- `web/db.dart`: Resident report submission waits for authenticated backend success; generic/Worker queue implementation unchanged.
- `web/app.js`: regenerated from Dart with the README command `dart compile js web/app.dart -O2 --no-source-maps -o web/app.js`; broad generated symbol churn is compiler output, not manual Worker edits.
- `backend/photos.py`: apply phone EXIF orientation before metadata stripping; existing validation/storage contract preserved.
- `tests/test_resident_photo_repair.py`: scoped browser/backend regressions and persistence integration checks using synthetic isolated data.
- `WATERHALL_RESIDENT_CAMERA_GALLERY_REPAIR_REPORT.md`: this repair report.

## Out-of-Scope Files

Worker application files, Worker SQLite/sync/collection code, ESP32 firmware, telemetry, billing/payment rules, backend routes/auth architecture, database adapter/schema, deployment/Vercel configuration, production environment/data, Admin sources and existing tests/reports were not modified by this repair. Native notification service, Resident Android manifest/Gradle/lockfiles/config, MainActivity and signing configuration were left unchanged. All pre-existing modified/untracked files listed above were preserved.

Current IoT contract remains Water Level ? JSN-SR04T, Turbidity, TDS. pH and Flow remain legacy/out of scope.

## Real Device Tests Required

Use a development/test backend and synthetic report data. Serve the current repaired web files. For a physical phone, rebuild the debug APK with `--dart-define=SERVER_BASE_URL=<authorized-development-origin>`; the default build above is for the Android emulator. A production release instead requires the existing documented HTTPS origin and signing configuration; no production action was performed here.

Camera checklist:

1. Install the appropriate development APK; log in as a test Resident. Open Support, choose a category, type a message.
2. Tap Camera. Confirm the actual Android camera opens. Grant camera permission; capture and confirm a portrait and landscape photo.
3. Verify a readable, correctly oriented preview and retained category/message. Test Retake, cancel, permission denial/permanent denial, Settings recovery, and Gallery alternative.
4. Submit once; verify success only after server response. Open Admin Citizen Reports and the full-image popup; confirm the same scene, category, message, Resident and status. Refresh/restart and retrieve again.
5. Try a slow/offline server and rapid duplicate taps; ensure the draft/photo survive and an unchanged retry creates one record. Sign out during a delayed request; ensure old results do not affect another account.
6. Exercise Android activity/process destruction while Camera is open using a test device; return/restart and verify account-owned draft and lost-image recovery. No actual device lifecycle destruction was simulated in the APK build.

Gallery checklist:

1. Log in as a test Resident; choose a category and type a message. Tap Gallery and verify the Android picker opens.
2. Select JPEG/PNG/WebP from device/cloud-backed providers; verify readable preview, correct orientation and retained fields.
3. Replace with Gallery, choose the same photo, cancel replacement, select corrupt/unsupported/oversized evidence, and Remove Photo. Verify previous evidence/draft survives canceled or rejected replacement.
4. Submit and verify Admin receives/opens the same stored evidence after refresh/restart. Test no-photo submission, network/server failure, expiry/logout cleanup and unchanged idempotent retry.
5. Repeat with Android 13+ Photo Picker and, if supported devices are available, the older content-selection fallback. Check denied-access feedback and cloud-provider/read errors. Test activity-loss recovery.

## Remaining Risks

- Real device camera launch/capture, gallery/provider selection, permission UI, orientation across actual camera implementations, and Android process-loss recovery are NOT YET VERIFIED.
- Production PostgreSQL/S3/Vercel persistence and retrieval are NOT YET VERIFIED; mocks/isolated database tests are not production evidence.
- Inline database image responses exceed Vercel's cap at the measured large-photo volume; this is a verified production retrieval limitation.
- Existing S3 upload-then-DB-failure orphan-object risk remains.
- A full localStorage quota prevents durable draft restoration; current in-memory fields are retained and the UI warns to keep the screen open.
- Two broader pre-existing browser test assumptions fail as described; Worker/public-page behavior was not changed to make them pass.
- Existing build-tool warnings remain; dependency upgrades are outside this repair.

## Production Blockers

Production has not been inspected or changed. Before declaring production persistence verified, confirm the existing deployment's PostgreSQL/private storage configuration and test authorized synthetic evidence through capture, storage, retrieval, refresh and cold-start boundaries. At the measured inline-photo volume, select/configure the existing private S3 path or explicitly authorize a separate storage/retrieval repair and any migration of existing inline records. This task stops before cloud provisioning, production configuration, data migration or deployment.

## Recommended Next Step

Run the Camera and Gallery checklists on a connected Android test device against the current test workspace, then verify an explicitly authorized production-compatible storage configuration. No next development task was started.

## Final Scope Verification

Final git status, full new-source/test diff review, diff statistics, and `git diff --check` completed. Diff check passes; Git's LF/CRLF notices are not whitespace errors. The 8 repair code/test files matched their saved final hashes throughout the final scoped suite; the generated JavaScript matches an independent compilation byte for byte. All 203 baseline files were checked: only the five intended existing files changed (photos.py, Resident main.dart, web app.dart/app.js/db.dart); no baseline file was deleted and no unrelated file changed. All pre-existing modified/untracked files were preserved byte for byte, including the Admin repairs/reports/tests, ESP32 and Resident Gradle metadata. Workspace database and private IoT config hashes remain unchanged. Added files are exactly the picker helper, its Flutter tests, the scoped Python tests and this report. Test images are synthetic in-memory fixtures; no uploaded image files or real image payloads/secrets were added. There are no staged changes. Branch and HEAD remain the initial main/e28b1fbdc2ded97ca4b2c85cefabed707b7b5b87.

- BACKEND MODIFIED: YES ? EXIF orientation correction only; no route/auth/billing/schema changes.
- ADMIN MODIFIED BY THIS REPAIR: NO.
- WORKER MODIFIED BY THIS REPAIR: NO ? shared web source edits are confined to Resident report state/handlers; generated JS includes compiler symbol churn.
- ESP32 MODIFIED BY THIS REPAIR: NO.
- DATABASE SCHEMA MODIFIED: NO.
- PRODUCTION DATABASE DATA MODIFIED: NO.
- VERCEL CONFIG MODIFIED: NO.
- COMMITTED: NO.
- PUSHED: NO.
- DEPLOYED: NO.
- REAL DEVICE CAMERA TEST: NOT YET VERIFIED.
- REAL DEVICE GALLERY TEST: NOT YET VERIFIED.
- PRODUCTION IMAGE PERSISTENCE: NOT YET VERIFIED; the database-inline Vercel response envelope is a confirmed limitation requiring an existing storage option/configuration or separately authorized retrieval work.

Controlled repair code, automated tests, APK and report are complete. Stop here; no other repair or feature was started.
