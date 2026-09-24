# WaterHall security and production preparation audit

**Phase-one record.** The history/readiness statements below describe the state
before the authorized follow-up cleanup. See
[GITHUB_READINESS_REPORT.md](GITHUB_READINESS_REPORT.md) for the current local
history verification and [CREDENTIAL_ROTATION_CHECKLIST.md](CREDENTIAL_ROTATION_CHECKLIST.md)
for confirmed exposures and manual rotation. This follow-up found private VAPID
material and the previous IoT credential in a local IDE tree snapshot ref;
ordinary commit-history inspection in this phase did not include that ref.

Completed locally on 25 September 2026. No commit, push, deployment, external
credential rotation, or destructive history rewrite was performed. The existing
working tree already had changes and untracked files; these were preserved and
integrated. This report describes the final workspace, not a clean-room rewrite
or a guarantee that no future vulnerability can exist.

**GitHub readiness: NOT SAFE TO PUSH THE EXISTING HISTORY.** The proposed current
source scan is clean for the checked patterns, but reachable commits still expose
credentials/defaults and private data. **Vercel: code prepared; external services,
secrets, migrations and deployment acceptance are still required.**

## 1. PROJECT ARCHITECTURE FOUND

Flask (`backend/server.py`) serves the API and local static routes. Production uses
PostgreSQL through a small DB adapter; local development can use SQLite. The
shared browser UI is Dart compiled to `web/app.js`; the Admin portal is plain
JavaScript/HTML. Two Flutter WebView wrappers provide Worker/Resident apps and
native local notifications. Worker pending writes now use native sqflite SQLite.
ESP32 sends sensor telemetry. UI updates are polling; Web Push uses VAPID.

`api/index.py` is a compatibility import shim. `bin/server.dart` is a legacy local
static preview helper, not the API or production entrypoint; its traversal and
source-file exposure checks were also hardened. Vercel selects
`backend.server:app` through `pyproject.toml` and publishes allowlisted assets.
There are no Node runtime dependencies or OAuth/OIDC provider integrations.

API route inventory follows. STAFF means Admin or Worker; AUTHENTICATED includes
resident ownership/audience filtering where applicable. Unknown APIs fail closed.
Role query parameters do not grant permissions. PUBLIC does not bypass input
validation/rate limits; telemetry and scheduler have independent credentials.

- `DELETE /api/households/<hh_id>` ? ADMIN
- `DELETE /api/workers/<worker_id>` ? ADMIN
- `GET /api/all-data` ? AUTHENTICATED
- `GET /api/announcements` ? AUTHENTICATED
- `GET /api/collections/history` ? STAFF
- `GET /api/config` ? PUBLIC
- `GET /api/events` ? AUTHENTICATED
- `GET /api/health` ? PUBLIC
- `GET /api/iot/latest` ? AUTHENTICATED
- `GET /api/jobs/push` ? CRON SECRET
- `GET /api/notifications/poll` ? AUTHENTICATED
- `GET /api/push/vapid-public-key` ? PUBLIC
- `GET /api/ready` ? PUBLIC
- `GET /api/settings/payment` ? AUTHENTICATED
- `GET, POST /api/reports` ? AUTHENTICATED
- `POST /api/announcements/add` ? STAFF
- `POST /api/billing-records/add` ? STAFF
- `POST /api/central-assets/update` ? ADMIN
- `POST /api/collections/sync` ? STAFF
- `POST /api/households/add` ? ADMIN
- `POST /api/households/update` ? STAFF
- `POST /api/iot/telemetry` ? DEVICE SECRET
- `POST /api/iot/update` ? DEVICE SECRET
- `POST /api/login` ? PUBLIC
- `POST /api/maintenance-logs/add` ? STAFF
- `POST /api/push/subscribe` ? AUTHENTICATED
- `POST /api/push/unsubscribe` ? AUTHENTICATED
- `POST /api/recover-account` ? PUBLIC
- `POST /api/reports/add` ? AUTHENTICATED
- `POST /api/reports/update-status` ? STAFF
- `POST /api/settings/payment` ? ADMIN
- `POST /api/workers/add` ? ADMIN

## 2. FILES MODIFIED

Tracked changes plus revised files that were already untracked at the start:

- [.github/workflows/sonarcloud.yml](.github/workflows/sonarcloud.yml)
- [.gitignore](.gitignore)
- [README.md](README.md)
- [admin_web/app.js](admin_web/app.js)
- [admin_web/index.html](admin_web/index.html)
- [api/requirements.txt](api/requirements.txt)
- [backend/db_adapter.py](backend/db_adapter.py)
- [backend/requirements.txt](backend/requirements.txt)
- [backend/server.py](backend/server.py)
- [backend/update_db.py](backend/update_db.py)
- [bin/server.dart](bin/server.dart)
- [docs/walkthrough.md](docs/walkthrough.md)
- [iot/WIRING_AND_SETUP_GUIDE.md](iot/WIRING_AND_SETUP_GUIDE.md)
- [iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino](iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino)
- [requirements.txt](requirements.txt)
- [scripts/run.bat](scripts/run.bat)
- [scripts/test_end_to_end.py](scripts/test_end_to_end.py)
- [scripts/verify_announcements_and_alerts.py](scripts/verify_announcements_and_alerts.py)
- [scripts/verify_offline_admin.py](scripts/verify_offline_admin.py)
- [sonar-project.properties](sonar-project.properties)
- [test_phase2.py](test_phase2.py)
- [vercel.json](vercel.json)
- [waterhall_flutter/android/app/build.gradle.kts](waterhall_flutter/android/app/build.gradle.kts)
- [waterhall_flutter/android/app/src/main/AndroidManifest.xml](waterhall_flutter/android/app/src/main/AndroidManifest.xml)
- [waterhall_flutter/android/app/src/main/res/xml/network_security_config.xml](waterhall_flutter/android/app/src/main/res/xml/network_security_config.xml)
- [waterhall_flutter/android/gradle.properties](waterhall_flutter/android/gradle.properties)
- [waterhall_flutter/android/gradle/verification-metadata.xml](waterhall_flutter/android/gradle/verification-metadata.xml)
- [waterhall_flutter/android/gradle/wrapper/gradle-wrapper.properties](waterhall_flutter/android/gradle/wrapper/gradle-wrapper.properties)
- [waterhall_flutter/lib/config.dart](waterhall_flutter/lib/config.dart)
- [waterhall_flutter/lib/main.dart](waterhall_flutter/lib/main.dart)
- [waterhall_flutter/lib/notification_service.dart](waterhall_flutter/lib/notification_service.dart)
- [waterhall_flutter/pubspec.lock](waterhall_flutter/pubspec.lock)
- [waterhall_flutter/pubspec.yaml](waterhall_flutter/pubspec.yaml)
- [waterhall_flutter/test/widget_test.dart](waterhall_flutter/test/widget_test.dart)
- [waterhall_resident_flutter/android/app/build.gradle.kts](waterhall_resident_flutter/android/app/build.gradle.kts)
- [waterhall_resident_flutter/android/app/src/main/AndroidManifest.xml](waterhall_resident_flutter/android/app/src/main/AndroidManifest.xml)
- [waterhall_resident_flutter/android/app/src/main/res/xml/network_security_config.xml](waterhall_resident_flutter/android/app/src/main/res/xml/network_security_config.xml)
- [waterhall_resident_flutter/android/gradle.properties](waterhall_resident_flutter/android/gradle.properties)
- [waterhall_resident_flutter/android/gradle/verification-metadata.xml](waterhall_resident_flutter/android/gradle/verification-metadata.xml)
- [waterhall_resident_flutter/android/gradle/wrapper/gradle-wrapper.properties](waterhall_resident_flutter/android/gradle/wrapper/gradle-wrapper.properties)
- [waterhall_resident_flutter/lib/config.dart](waterhall_resident_flutter/lib/config.dart)
- [waterhall_resident_flutter/lib/main.dart](waterhall_resident_flutter/lib/main.dart)
- [waterhall_resident_flutter/lib/notification_service.dart](waterhall_resident_flutter/lib/notification_service.dart)
- [waterhall_resident_flutter/pubspec.lock](waterhall_resident_flutter/pubspec.lock)
- [waterhall_resident_flutter/pubspec.yaml](waterhall_resident_flutter/pubspec.yaml)
- [waterhall_resident_flutter/test/widget_test.dart](waterhall_resident_flutter/test/widget_test.dart)
- [web/app.dart](web/app.dart)
- [web/app.js](web/app.js)
- [web/db.dart](web/db.dart)
- [web/index.html](web/index.html)
- [web/service-worker.js](web/service-worker.js)
- [web/shopping_list.html](web/shopping_list.html)

Only index tracking was removed for `database/waterhall.db`,
`database/database_contents.txt`, `test_data/api_test.json`,
`test_data/api_test2.json`, `test_data/assets_extra.json`, `test_data/response.json`,
and obsolete `build_artifacts/out.js`. Their local files remain. These deletions
are staged; implementation edits remain uncommitted. History still contains them.
No legitimate database records were deleted or altered in the original file.

## 3. FILES CREATED

New source, configuration examples, tests, vendored sanitizer/license, and docs:

- [.env.example](.env.example)
- [.github/workflows/tests.yml](.github/workflows/tests.yml)
- [.python-version](.python-version)
- [.vercelignore](.vercelignore)
- [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md)
- [SECURITY_AUDIT.md](SECURITY_AUDIT.md)
- [admin_web/vendor/DOMPurify-LICENSE](admin_web/vendor/DOMPurify-LICENSE)
- [admin_web/vendor/purify.min.js](admin_web/vendor/purify.min.js)
- [backend/collections.py](backend/collections.py)
- [backend/config.py](backend/config.py)
- [backend/manage.py](backend/manage.py)
- [backend/notifications.py](backend/notifications.py)
- [backend/operational_routes.py](backend/operational_routes.py)
- [backend/operations.py](backend/operations.py)
- [backend/photos.py](backend/photos.py)
- [backend/security.py](backend/security.py)
- [iot/waterhall_esp32_reservoir/device_config.example.h](iot/waterhall_esp32_reservoir/device_config.example.h)
- [pyproject.toml](pyproject.toml)
- [requirements-dev.txt](requirements-dev.txt)
- [scripts/audit_repository.py](scripts/audit_repository.py)
- [scripts/build_static.py](scripts/build_static.py)
- [tests/conftest.py](tests/conftest.py)
- [tests/test_browser.py](tests/test_browser.py)
- [tests/test_operations.py](tests/test_operations.py)
- [tests/test_security.py](tests/test_security.py)
- [waterhall_flutter/android/app/src/debug/res/xml/network_security_config.xml](waterhall_flutter/android/app/src/debug/res/xml/network_security_config.xml)
- [waterhall_flutter/android/key.properties.example](waterhall_flutter/android/key.properties.example)
- [waterhall_flutter/lib/offline_store.dart](waterhall_flutter/lib/offline_store.dart)
- [waterhall_flutter/test/offline_store_test.dart](waterhall_flutter/test/offline_store_test.dart)
- [waterhall_resident_flutter/android/app/src/debug/res/xml/network_security_config.xml](waterhall_resident_flutter/android/app/src/debug/res/xml/network_security_config.xml)
- [waterhall_resident_flutter/android/key.properties.example](waterhall_resident_flutter/android/key.properties.example)
- [web/native-store.js](web/native-store.js)
- [web/offline_store.dart](web/offline_store.dart)

Local ignored audit tools/build outputs were also generated: a Python audit
virtual environment, public static build output and both debug APKs. A private
ignored ESP32 `device_config.h` preserves the existing local device configuration;
its values are deliberately excluded from this report and Git. No production
`.env`, database URL, cloud hostname, signing key, or external service was invented.

## 4. SECURITY PROBLEMS FOUND

- Hardcoded JWT fallback and insecure default accounts; historical Wi-Fi secret
  and database/dump/test-response data tracked in Git.
- Authenticated residents/workers could reach administrative mutations; large
  shared data responses were not scoped to resident ownership.
- Account recovery trusted a phone number; old JWTs survived password changes.
- IoT ingestion could be unprotected; ESP32 disabled TLS verification.
- Worker ?SQLite? was browser localStorage; a noncaching service worker prevented
  dependable offline shell reload. Failed/repeated submissions could be lost or
  duplicated, and payments were locally represented as paid before confirmation.
- Upload persistence/validation, push recipient ownership and endpoint validation
  were insufficient. In-memory streams/rate limits/key generation did not fit
  multiple serverless instances or ephemeral storage.
- Dynamic Admin HTML had injection sinks; release Android allowed cleartext and
  debug signing; dependency verification had been disabled in local changes.
- Initialization seeded development data, migrations swallowed errors, legacy
  tests depended on real local data/default passwords, and health/error/config
  handling lacked clear production boundaries.
- Fixed pH, billing dates/actor, sample contacts and nonfunctional UI notices
  could misrepresent actual data or completed actions.

## 5. SECURITY PROBLEMS FIXED

Environment-only production secrets, exact-origin CORS, shared production rate
limits, server role/ownership policy, hashed one-use resets with token revocation,
authenticated/bounded telemetry, verified device TLS, validated image re-encoding,
private storage options, push endpoint/recipient validation, durable outbox,
transactional idempotent sync, real native SQLite acknowledgement, safe errors and
logs, security headers, Admin escaping/DOMPurify, locked dependency artifacts,
HTTPS-only release configuration and release signing requirements were implemented.

Development credentials/data are no longer seeded on startup. The static builder
uses an asset allowlist; local static handlers deny traversal/source exposure.
Unmeasured sensor values and missing legacy dates are displayed explicitly. The
Worker Collections selector was restored because its original controls were
unreachable; it is read-only household selection, with management kept Admin-only.
The inactive payment-reminder control and false radio-dispatch claim were removed
or replaced with configured contact information, rather than claiming an action occurred.

This fixes the current implementation, not historical exposure or external account
state. Rotations/history remediation in section 13 remain necessary.

## 6. DATABASE CHANGES

PostgreSQL is mandatory in production; there is no filesystem SQLite fallback.
Connections require `sslmode=verify-full`; runtime operations are parameterized,
committed/rolled back reliably and closed. Explicit migrations are repeatable and
locked, add missing columns/tables and never seed accounts. New schema stores
photos, recovery codes (hashed), operation results/request fingerprints and push
jobs. PostgreSQL money uses `NUMERIC(14,2)`; legacy conversion rounds to cents.

New bills have distinct billed/payment dates and biller/collector identity. Bill
amounts are server-calculated using the existing tariff, with meter concurrency
and monthly duplicate checks. Payment batches verify owner, household, amount and
bill state in one transaction, reject conflicting reuse, and acknowledge retries.

The SQLite-to-PostgreSQL importer is explicit, read-only at source, transactional,
ID/sequence-preserving and requires an empty destination. It excludes plaintext
password fields and old push subscriptions. Existing user data was not imported
into any external database. Migrations were rehearsed twice on a private temporary
copy of the actual SQLite file, preserving every existing table count and leaving
the original file byte-for-byte unchanged; the temporary private copy was removed.
Existing plaintext legacy columns are not destructively dropped from your data.

## 7. AUTHENTICATION/AUTHORIZATION CHANGES

JWT bearer headers only; database-backed roles and resident ownership checks.
A resident cannot use a frontend role string to gain Admin access. Passwords are
hashed; minimum new password length is 12. No cached-password login bypass is
used. Deleted accounts, changed roles and password fingerprints are checked per
protected request. Offline use requires a previously issued unexpired session.

Recovery uses an operator-issued 30-minute one-use code after independent identity
verification. Phone matching no longer resets an account. No email/SMS delivery
service is claimed. No ambient authentication cookie exists, so cookie CSRF tokens
are inapplicable; authenticated requests explicitly carry bearer headers. CORS
and frontend view gates supplement, but never replace, server authorization.

## 8. ESP32 CHANGES

Private device configuration moved to ignored `device_config.h` with a blank
example. The API origin is centralized; production uses HTTPS, trusted root CA,
time synchronization and `X-IoT-Secret`. Insecure TLS verification was removed and
the client lifetime now spans the HTTP request. Local HTTP requires explicit opt-in.
Fixed fictitious pH was removed because the installed sensor list has no pH probe.

The sketch compiled for `esp32:esp32:esp32`, core 3.3.12, using a temporary copy
with the blank example configuration. Program size: 1,039,112 bytes (79%);
global variables: 48,936 bytes (14%). No hardware was flashed. Live Wi-Fi, CA/time,
sensor calibration and end-to-end physical telemetry remain acceptance checks.

## 9. WORKER OFFLINE/SYNC CHANGES

Native sqflite SQLite persists per-account pending collections/actions. JavaScript
waits for the native transaction before confirming local saves; mutations are
serialized to avoid overwriting concurrent queue changes. A failed native write
keeps the collection dialog open and does not invent a saved operation. The shell
is service-worker cached; API/Admin responses are not cached there.

Pending IDs survive offline reload and retries; only server-confirmed IDs become
synchronized. Server retries replay committed results and reject mismatched payloads.
Account switches retain each owner's pending records; current cached private views
are cleared on logout. Server-confirmed payment status is distinguished from pending
sync. Browser-only mode still uses localStorage, accurately documented.

SQLite persistence/account isolation and browser offline reload/reconnect were
tested. Physical-device process death, OS/background restrictions, disk exhaustion,
loss/uninstall, expired sessions and multi-device conflict reconciliation still
need acceptance testing. No automatic financial conflict merge was invented.

## 10. REALTIME/PUSH NOTIFICATION CHANGES

Accurately documented polling: shared browser UI about 10 seconds; native foreground
notification polling about 15 seconds; background Workmanager is best-effort around
15 minutes minimum. The old process-local SSE endpoint returns polling capability.

VAPID comes only from environment configuration. Subscriptions are validated and
owned by the authenticated identity; resident roles cannot self-promote. Supported
push-service HTTPS hosts prevent arbitrary endpoint SSRF. Announcements and sensor
alerts queue durable, audience-scoped jobs transactionally. A secret-authenticated
scheduler/CLI drains bounded batches with leases, retries and stale-subscription
cleanup. Mocked delivery tests cover retries and HTTP 410 handling. Real Web Push,
mobile permission/background delivery and production scheduler remain untested.

## 11. VERCEL COMPATIBILITY CHANGES

Current Flask entrypoint configuration, Python version selection, allowlisted
`public/` assets, Admin rewrites and API no-store/security headers are prepared.
Persistent state lives in PostgreSQL/Redis/optional S3, never a writable deployment
directory. No cold-start migrations or auto-generated secret files remain.
SSE was replaced by documented polling and durable scheduled push dispatch.

The model was checked against the current official
[Vercel Flask](https://vercel.com/docs/frameworks/backend/flask) and
[Python runtime](https://vercel.com/docs/functions/runtimes/python) documentation.
No Vercel build, preview, service provisioning, cloud migration or deployment was
performed. Plan limits, actual routing and credentials still need acceptance.

## 12. TEST RESULTS

Final local evidence:

- SQLite/API suite, including the legacy `test_phase2.py` entrypoint: **25 passed,
  4 intentionally skipped** (three opt-in browser tests and PostgreSQL-only import).
- Disposable PostgreSQL 17.6 integration plus Chrome browser suite: **29 passed**.
  Covers role denial, household scoping, resets/revocation, telemetry bounds/zero/
  absent pH, upload re-encoding, transactional collection rollback/concurrent replay,
  idempotent bills/reports/announcements, push SSRF/ownership/retry, import sequences,
  repeated migrations, rate limiting, CORS/headers/static paths, stored-XSS, single
  photo submission, failed native commit, offline reload and reconnect.
- Browser-only checks: **3 passed**; Admin login/XSS also rerun successfully after
  adding Chart.js Subresource Integrity.
- Worker Flutter tests: **4 passed**; Resident Flutter tests: **2 passed**.
  Both Flutter analyses: **no issues** after removing one redundant test import.
- Dart web analysis: **no errors or warnings**, seven informational deprecation
  notices for existing `dart:html`, `dart:js`, and `dart:js_util` APIs. Browser JS
  compiled successfully. Local static-preview Dart analysis: no issues; root and
  four path/source-denial requests passed.
- Both Android **debug APKs built**; both Gradle builds passed again with strict
  SHA-256 artifact/metadata verification. Resident's initial concurrent build hit
  a shared-cache lock; the sequential rerun passed. Java/SDK and Workmanager/Kotlin
  future-compatibility warnings remain. Release builds/signing were not exercised.
- ESP32 firmware compile passed (section 8). No physical-device flashing/testing.
- `pip-audit -r requirements.txt`: **no known vulnerabilities found** at run time.
  This is a Python advisory check, not an exhaustive Flutter/Android supply-chain audit.
- Static builder and `git diff --check` passed. Existing app-separation checks
  passed. Legacy Admin static checks passed; their fixed-port live probes were
  unavailable (the isolated real browser suite tested the actual routes instead).
- Current-tree scanner: **zero findings** for its credential/private-file patterns.
  Separate history inspection covered **50 reachable commits** and found exposure.

The earlier phone-reset/seed/SSE-dependent tests were replaced by isolated tests,
not marked successful despite failures. Browser/native issues found during testing
were fixed and rerun. Tests used temporary SQLite or disposable PostgreSQL schemas.
Hosted GitHub CI has been prepared but not executed in this session.

## 13. SECRETS THAT MUST BE ROTATED

- **Wi-Fi password in committed firmware:** rotate it at the access point and update
  devices. Confirmed in historical firmware, including `d8e36e8` and descendants.
  Do not copy its value into tickets, commits or this report.
- **Hardcoded JWT/application defaults:** any running environment using an exposed
  fallback must receive independent fresh secrets, invalidating prior tokens.
  Historical backend/root server files contain the fallback (for example `3d04030`).
- **Default/development account passwords:** reset affected accounts before use.
  Historical initialization contained default-password logic (`cf68d3d`, `d8e36e8`,
  `3d04030`). Database/dump exposure also warrants resetting affected live accounts
  whose password hashes were included, even if their passwords were not defaults.
- **Prior IoT credential:** replace the credential previously embedded in local
  firmware before rollout. The known local literal was removed from tracked source;
  it was not proven committed. Updating files does not rotate a deployed credential.
- **VAPID:** the local key file was not found in inspected history. Generate new
  production keys; rotate existing keys if shared/exposed and re-register clients.
  No claim is made that every external copy or remote ref was inspected.

No external credentials were rotated. Ignore rules/current-file removal do not
remove committed history. Database snapshots and response dumps remain a separate
private-data exposure even after credential rotation.

## 14. MANUAL ACTIONS I STILL NEED TO PERFORM

Follow [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md) and the operational
commands in [README.md](README.md): rotate affected credentials; choose and explicitly
approve historical-data remediation; review the diff; configure protected GitHub
workflows; provision PostgreSQL/Redis and photo storage; privately set secrets and
origins; rehearse/import data and bootstrap Admin; configure push scheduler; confirm
production origin; configure mobile signing and ESP32 CA/credential; run physical
and preview acceptance tests before authorizing rollout. No real endpoint or
production service credential has been invented.

SonarCloud paths were corrected and its scan now skips absent credentials (such
as fork PRs); configure the intended project/token to enable it. Application IDs
remain existing `com.example...` identifiers; choose permanent package IDs before
public store distribution. Review institutional tariff/payment/contact defaults.

## 15. GITHUB READINESS

**Not safe to push the existing repository history yet.** Current source has no
findings in the final scan, private data files are removed from the proposed Git
index, and tests pass. However, 50 reachable commits were inspected and older
commits still contain the Wi-Fi credential, insecure defaults and database/dump
contents (including `ee096f4` and earlier history).

An authorized history-remediation plan or separately reviewed clean repository,
credential rotation, and verification of all intended refs are required before
publishing. Existing remote copies/clones may retain exposed data after a rewrite.
No rewrite, commit or push was performed. Staged index-only removals preserve the
local database/files and must be included in the reviewed future commit.

## 16. VERCEL READINESS

**Code prepared for Vercel. External deployment configuration still required.**
Production startup intentionally fails without required secret/PostgreSQL/Redis
configuration. Static assets, entrypoint, explicit migration path, durable photos,
authenticated telemetry, polling and scheduled push are prepared. Actual cloud
connections/TLS, migration/import, origins, scheduler, domain, mobile builds and
ESP32 configuration must be supplied and tested. This is not a deployed or
production-certified system, and the Git-history blocker must be handled first.

## 17. REMAINING RISKS

- Historical exposure is unresolved until credentials and all published/ref history
  are remediated. This audit's pattern scan cannot prove absence of every secret.
- Browser/WebView tokens and cached data remain in localStorage; CSP still permits
  legacy inline scripts/styles. DOMPurify and escaping reduce XSS risk but do not
  replace a future strict-CSP UI refactor. Chart.js is version/SRI-pinned.
- Native SQLite is device-private, not SQLCipher encrypted; disk/app loss can destroy
  unsynced work. Use device locks, inventory and cash reconciliation procedures.
- Offline conflicts require manual reconciliation. A rejected item keeps its batch
  pending; there is no automatic conflict merge or cross-device transaction editing.
- Live PostgreSQL/Redis TLS, private S3 permissions, VAPID delivery, Vercel preview,
  release signing, device process lifecycle and physical sensors are not validated.
- PostgreSQL migrations should be backed up/rehearsed; monetary conversion rounds
  existing values. Original legacy plaintext columns are preserved rather than
  destructively removed. Data import requires explicit review of old/demo accounts.
- Current `/api/all-data` reads are suitable for the existing small project but need
  pagination/query tuning and load testing at larger household/telemetry volume.
  Define data retention and keep replay-protection records long enough.
- Push is at-least-once; a crash may duplicate a notification. Polling/background
  scheduling is not guaranteed emergency delivery. Monitor failed jobs and queue age.
- S3 upload plus DB commit is not one distributed transaction; failed transactions
  can leave orphan private objects. Configure lifecycle/reconciliation controls.
- A shared IoT credential is supported; larger fleets need per-device provisioning,
  revocation and credential rotation procedures. Calibrate sensors; ?no alert? is
  not certification of potable water, and pH is currently unmeasured.
- Gradle checksums were bootstrapped from resolved artifacts and pin future changes;
  they are not independent provenance evidence. Release variants/toolchain upgrades
  may need reviewed checksum additions. Dart Web/Workmanager deprecations remain.
- User-facing institutional tariffs/settings were preserved; confirm operational
  policy and monitoring/backups before a real rollout.
