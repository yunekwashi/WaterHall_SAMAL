# WaterHall Resident connectivity and Admin receipts release

Date: 2026-10-20 (Asia/Manila). Production base: 735ffcca7db5ea62a61026332f26e59d13445e00.

## Resident correction
The shared web client used a Worker-specific Offline Mode/SQLite banner for Resident network failures. The native Resident wrapper could also clear a main-page error when its page-finished callback ran. Resident now has its own Internet Error screen, the requested wording and Retry, bounded request/loading time, and a distinct server-unavailable state. Required authenticated data must load successfully before recovery; public readiness is used only when logged out. Sessions and report drafts survive a network outage. Expiry keeps the existing secure login flow.

The existing 60-second foreground poll, sensor freshness handling and unchanged-card rendering optimization remain intact. Recovery does not reload the document or repeat credential submissions. Worker SQLite, durable queues, collection/account ownership, sync, all-eight-puroks access, startup and APK are unchanged.

Native cold-page errors require a Resident APK update. Hosted assets cover in-page connectivity and cached current-shell recovery. Resident 1.3.2+8 uses the same package and signing certificate as 1.3.1+7, with the production HTTPS origin. Native Retry reuses the controller; auth/photo/notification channels remain intact.

## Read-only Admin receipts
Billing now has one Print dropdown: Print Billing Table, Print Receipt by Name, and Print All Receipts. CSV/Excel/PDF controls remain unchanged. Billing Table prints a filtered copy of the existing markup using the selected billing month, purok and payment status; it does not change the live table. All Receipts opens the existing scoped preview directly. The dialog supports full/partial/case-insensitive name search, explicit household selection for duplicate names, All within the chosen billing month and purok scope, record count, preview and bulk confirmation. Print revalidates the selected records; changed records require review again. Logout/session changes clear the preview.

GET /api/admin/receipts is authenticated and Admin-only. It validates filters and returns bounded pages (25 default, maximum 50). It reads existing Paid billing_records joined to water_meters, households, puroks and receiver users. Existing payment_collections supply recorded transaction IDs/methods. No duplicate storage, migration, rate recomputation, settlement or transaction mutation is introduced. Missing legacy dates/receiver/collection details show Not recorded; bill references are labelled Bill reference, not an invented official receipt number. Existing WaterHall print branding is retained.

## Verified checks
- SQLite backend/security/registration/billing regression: 134 passed.
- Isolated PostgreSQL receipt/payment checks: 28 passed; disposable schemas removed. Public account/household/purok/contact/meter/bill/collection fingerprints unchanged. No production migration.
- Chrome browser coverage: 48 passed. Two optional mobile performance measurement cases require MOBILE_PERF_OUTPUT and were skipped. Coverage includes name/All receipt selection, exact stored amounts, PDF output, 320px/desktop preview, record-change and logout guards, Resident network/backend/expiry/draft recovery, existing Worker offline/sync/all-puroks behavior, shared notification handling and all-client freshness.
- Resident Flutter: 37 passed; final native recheck 4 passed; analyzer: no issues.
- Worker Flutter: 27 passed; analyzer: no issues; no Worker rebuild.
- Web Dart production compile and static packaging: PASS. The same compiler/flags reproduced the deployed baseline bundle before regenerating it. Existing legacy dart:html/dart:js deprecations and an unchanged non-null assertion warning remain; no new analyzer errors.
- Receipt browser harness corrected its print stub and normalized Chrome PDF extraction's hyphen/minus representation. Visual QA corrected new-dialog small-screen action overlap. Resident regression checks caught and verified unchanged-card and automatic-poll recovery before release.
- Signed Resident release build/package/origin/signature: PASS; APK details below.

## Artifact
- Resident: 1.3.2+8
- Package: com.example.waterhall.flutter.resident
- File: WaterHall-Resident-1.3.2+8.apk
- SHA256: 819e204becbdef01f35202ac2ba45dd4ef4aecbf36faef851de117d38407c19d
- Signature matches previous release: yes
- Worker APK unchanged: yes

## Scope and release verification
Staged secret/private-file audit and git diff --check are mandatory before commit. Existing dirty checkout, index and local branch are preserved using an isolated production-based checkout. Landing HTML/CSS/photos, sensor code/calibration, database schema, billing mutation rules and notification logic are protected. Production asset hashes, exact Vercel READY commit, readiness/auth guards and manual results are recorded in the permanent release evidence folder after push.

Physical phone and signed-in production UI verification must not be claimed until actually confirmed. At commit preparation they are pending. No real payments or accounts are created/changed for smoke testing.

Rollback: restore the previous verified Vercel deployment or revert this focused commit. No database rollback is needed. A native correction should be shipped as a higher-version signed update; do not uninstall or downgrade the phone app and discard its data.

## Exact files
- WATERHALL_RESIDENT_CONNECTIVITY_RECEIPTS_RELEASE_REPORT.md
- admin_web/app.js
- admin_web/index.html
- admin_web/receipts.css
- admin_web/receipts.js
- backend/receipts.py
- backend/server.py
- tests/test_receipts.py
- tests/test_receipts_browser.py
- tests/test_resident_connection_browser.py
- waterhall_resident_flutter/lib/main.dart
- waterhall_resident_flutter/pubspec.lock
- waterhall_resident_flutter/pubspec.yaml
- waterhall_resident_flutter/test/resident_connection_test.dart
- web/app.dart
- web/app.js
- web/db.dart
- web/index.html
- web/resident-connection.css
- web/resident_connection.dart
- web/service-worker.js

## Admin Print dropdown follow-up (2026-10-20)
The prior generic table-print callback ignored the export filters. The focused follow-up uses a print-only copy of the existing table, with original displayed values and WaterHall print styling. Receipt format, search, duplicate-household handling, paid-record rules and bulk confirmation remain unchanged. The single dropdown supports keyboard navigation, Escape/outside dismissal, scroll-aware positioning and 320/390/768/1280px layouts. Cache versions for its CSS/JS advance to v2.

Current follow-up checks: 25 backend receipt/export regressions passed; 16 browser tests passed, including PDF output, selected month/status/purok, empty selection, exact stored amounts, unchanged live table/payment snapshots, direct All preview, bulk confirmation, duplicate-name selection, keyboard and logout cleanup. No backend, schema, mobile, firmware or landing changes are included. Both APKs remain byte-identical; no rebuild is needed. Resident 1.3.2+8 physical phone verification is explicitly PENDING per the user.
