# WaterHall

WaterHall manages households, metering, billing, field collections, service reports,
announcements, and reservoir telemetry. This repository contains the Flask API,
Admin website, shared Dart browser UI, separate Worker and Resident Flutter
WebView apps, and ESP32 firmware.

**The existing GitHub repository now has verified clean reachable history.**
Review [GITHUB_REMOTE_CLEANUP_REPORT.md](GITHUB_REMOTE_CLEANUP_REPORT.md) for the
completed update, [GITHUB_SUPPORT_CLEANUP.md](GITHUB_SUPPORT_CLEANUP.md) for retained
GitHub object/cache follow-up, and [CREDENTIAL_ROTATION_CHECKLIST.md](CREDENTIAL_ROTATION_CHECKLIST.md)
for required manual rotation. No deployment has been performed. Old clones must
be re-cloned or sanitized before they are used again.
See [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md) before deployment.

## Architecture

- `backend/server.py`: Flask application and route policy. `backend/config.py`
  reads environment configuration. Business operations, collections, photos,
  notifications, and validation live in focused modules under `backend/`.
- `backend/db_adapter.py`: parameterized SQLite development / PostgreSQL production
  adapter. `python -m backend.manage migrate` applies additive schema changes.
- `web/app.dart`, `web/db.dart`: shared Worker/Resident UI; `web/app.js` is the
  checked-in compiled browser artifact. Browser requests use same-origin `/api`.
- `admin_web/`: Admin-only management UI with server-enforced permissions.
- `waterhall_flutter/`: Worker Android wrapper, native SQLite pending queues,
  secure storage for the native notification token, local notifications.
- `waterhall_resident_flutter/`: Resident wrapper and local notifications.
- `iot/waterhall_esp32_reservoir/`: ESP32 sensor ingestion client with HTTPS and
  an independently configured device credential.

Production flow: GitHub source → Vercel static assets / Flask API → PostgreSQL.
Redis provides shared rate limits. Photos use PostgreSQL by default or private
S3-compatible object storage. An authenticated scheduler drains the push outbox.
ESP32 → authenticated HTTPS API → PostgreSQL → authenticated UI polling / alerts.

## Local Development

Use Python 3.12 or later (below 3.15); Vercel is configured for 3.12. From the
repository root in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
Copy-Item .env.example .env
```

Edit the ignored `.env`. Generate **separate** random keys for `SECRET_KEY`,
`JWT_SECRET_KEY`, and `IOT_DEVICE_SECRET`, for example by running
`python -c "import secrets; print(secrets.token_urlsafe(48))"` once per key and
privately saving each result. Do not copy the results into source or chat logs.
Never overwrite an existing `.env` without reviewing it.

Local SQLite is `database/waterhall.db` unless `DATABASE_PATH` is supplied. Back up
an existing database before migration. No accounts or sensor data are seeded:

```powershell
python -m backend.manage migrate
python -m backend.manage create-admin YOUR_ADMIN_USERNAME --name "Your name"
python -m backend.manage add-purok "Purok 1"
python -m backend.server
```

The administrator password is entered privately twice. Open
`http://127.0.0.1:8000/admin/`, or `/index.html?role=worker` and
`/index.html?role=resident` on that same origin. Create real Worker/Resident
accounts through the Admin portal with unique passwords of 12–128 characters.
Account creation is intentionally Admin-only; there is no public registration.
`scripts/run.bat` is an optional local-only launcher using port 8000.

To edit the Dart browser UI, install the Dart SDK and run:

```powershell
dart pub get
dart analyze web
dart compile js web/app.dart -O2 --no-source-maps -o web/app.js
python scripts/build_static.py
```

Commit the regenerated `web/app.js` with its Dart sources after review. Vercel
copies the checked-in assets; it does not install Dart or compile the UI. The
ignored `public/` output contains only explicitly allowed web assets.

## Environment Variables

Use `.env` locally and your platform secret manager in production. Empty example
values are not production defaults.

- `APP_ENV`: `development` locally; `production` in production. The platform-set
  `VERCEL` flag also enables production checks. Debug is always disabled there.
- `DATABASE_URL`: production PostgreSQL connection URL. Require
  `sslmode=verify-full` and the provider's trusted CA configuration. Use a pooled
  provider endpoint sized for concurrent function invocations. `POSTGRES_URL` is
  a legacy alias; prefer `DATABASE_URL` and do not set conflicting values.
- `DATABASE_PATH`: optional local SQLite path; ignored when PostgreSQL is selected.
  Production refuses SQLite and never falls back to a local file.
- `SECRET_KEY`, `JWT_SECRET_KEY`: distinct random secrets, at least 32 characters.
  Missing development values use temporary process-local keys (sessions expire
  on restart); production refuses missing/placeholder keys.
- `JWT_ACCESS_TOKEN_MINUTES`: session lifetime, default 480 minutes. Offline
  sessions require an unexpired previously issued token; choose the duration
  deliberately for field operations.
- `IOT_DEVICE_SECRET`: random device ingestion secret, at least 32 characters
  in production. Missing configuration disables telemetry writes even locally.
- `ALLOWED_ORIGINS`: comma-separated exact origins, no paths, trailing slash,
  credentials, or wildcards. Production entries must be HTTPS. Same-origin apps
  need no CORS allowlist entry. Empty denies cross-origin API access.
- `RATELIMIT_STORAGE_URI`: `memory://` for local development; production requires
  shared `redis://` or `rediss://`. Use TLS (`rediss://`) for a remote provider.
- `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_CLAIMS_EMAIL`: configure all three
  or leave all blank to disable Web Push. Email is a bare operator email, without
  `mailto:`. Run `python -m backend.manage generate-vapid` privately once to create
  keys. Only the public key is returned to browsers; keys are never auto-written.
- `CRON_SECRET`: random secret of at least 32 characters when production Web Push
  is enabled. Scheduler requests use `Authorization: Bearer <CRON_SECRET>`.
- `PHOTO_STORAGE`: `database` (default, durable PostgreSQL) or `s3`. The database
  option needs capacity planning; S3 is preferable for larger photo volumes.
- `S3_BUCKET`, `S3_REGION`: private photo bucket and region when using S3.
- `S3_ENDPOINT_URL`: optional HTTPS endpoint for S3-compatible storage.
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`: S3 credentials
  if not provided by the environment's workload identity. Grant only the required
  bucket read/write access. Configure bucket encryption, retention, and backups.
- `FLASK_RUN_HOST`: development bind address, default `127.0.0.1`. For a phone or
  ESP32 on a trusted LAN, explicitly use `0.0.0.0` and restrict the firewall.
- `PORT`: local listener port, default 8000. `FLASK_DEBUG`: development-only debug
  switch, default false. Neither controls Vercel routing.

Build/test settings: `SERVER_BASE_URL` is a Flutter `--dart-define`, not a Flask
variable. `TEST_DATABASE_URL` selects a disposable PostgreSQL database for tests;
tests create/drop only uniquely named test schemas. `RUN_BROWSER_TESTS=1` enables
the Chrome smoke tests. Never point integration tests at production.

## Database and migrations

Run `python -m backend.manage migrate` explicitly against the configured target,
before accepting traffic. Importing the app performs no migration, deletion, seed,
or filesystem write. Migration takes a PostgreSQL advisory lock, adds missing
columns/tables, normalizes legacy Boolean flags, and converts money to
`NUMERIC(14,2)` (rounding old values to cents). Take a backup and rehearse on a copy.
Old billing dates/actors that were never stored are shown as unknown; they are
not invented. New billing and payment dates are stored separately.

To move SQLite data, first create and migrate an **empty** PostgreSQL database,
then configure its `DATABASE_URL` and run:

```powershell
python -m backend.manage import-sqlite C:\path\to\backup-of-waterhall.db
```

The importer opens the source read-only, copies known columns transactionally,
preserves IDs/sequences, refuses a populated destination, and excludes plaintext
password fields and push subscriptions. It does not erase the source. Check row
counts, relations, amounts, and account roles afterward. Existing legacy plaintext
columns are not destructively dropped from your local database; inspect and
remediate a backed-up copy. Reset accounts that used development/default passwords.
Devices must re-register push subscriptions against the new environment.

Use a restricted runtime database identity, provider connection pooling, backups,
and a tested restore plan. Retain sync idempotency records while devices can still
replay offline work; deleting those records too early can reintroduce duplicates.

## Authentication, authorization, and recovery

JWTs are accepted only in the `Authorization: Bearer` header. No ambient auth
cookie/session is used, so cookie-based CSRF tokens are not applicable to these
JSON APIs. CORS restricts permitted browser origins; it is not authorization.
Every API route has a server policy. Database account state determines the role;
the frontend role query string never grants privileges. Residents receive only
their household's private data. Workers cannot manage accounts or Admin settings.
Passwords are hashed with Werkzeug. A credential fingerprint invalidates existing
JWTs after password changes. Deleted accounts and changed roles are rechecked.

An operator must independently verify identity, then privately issue a one-use
30-minute code with `python -m backend.manage issue-reset USERNAME --kind staff`
or `... issue-reset HH-123 --kind resident`. Enter that code in the recovery form.
Phone numbers alone no longer authorize resets. There is no automated email/SMS
delivery service configured.

Default rate protection is 240 requests/minute per source IP. Login is limited to
10/minute and 60/hour; recovery 5/minute; telemetry 60/minute and 20,000/day; Worker
collection sync 120/minute; announcements 6/minute and 60/hour. Creation routes
have additional limits. Tune shared-IP capacity after load testing. Vercel's
overwritten forwarding header is trusted only when running on Vercel.

## Worker Offline Mode

Worker offline → native `sqflite` database → pending queue → reconnect → bearer
API → server validation / PostgreSQL transaction → acknowledged operation IDs →
local synchronized state. The JavaScript bridge waits for SQLite commit before
confirming a save. Queues are separated by account. New IDs are random and stable
across retries; collection batches commit atomically. A reused ID with changed
content is rejected. A lost success response can be retried without double charging.
Billing, maintenance, reports, and announcements also have operation IDs.

Initial login and initial shell installation need connectivity. Cached sessions
work offline until JWT expiry. The service worker caches only the application
shell, never API responses or the Admin portal. Cached household data stays in
WebView local storage; native SQLite holds pending Worker operations. A regular
browser uses localStorage queues, **not** native SQLite. Browser storage clearing,
app uninstall, device loss, or disk exhaustion can destroy unsynced records.

Reconnect events and authenticated 10-second refreshes attempt synchronization.
The app marks a collection `Pending sync` until confirmed. Authentication failures,
conflicts, and rejected batches retain local operations. Reauthenticate as the
original collector after expiry; reconcile conflicting bills with an administrator
instead of editing IDs/repeatedly recording the same cash payment. Reconciliation
is a manual operational step; there is no automatic conflict merge. Offline
multi-device edits can conflict with work completed elsewhere.

Logout clears active cached private views and native auth; pending queues survive
for the owning account. Native notification tokens use secure storage; WebView
JWTs remain in localStorage. Native SQLite is application-private but not encrypted
with SQLCipher. Require device locks and managed devices; Android backup is disabled.

## Android apps

For each Flutter project: `flutter pub get`, `flutter analyze`, `flutter test`.
Use `flutter run --dart-define=SERVER_BASE_URL=<your-development-origin>` for a
device; Android emulator debug defaults to `http://10.0.2.2:8000`. Only debug allows
cleartext. Production has no invented URL and requires an explicit HTTPS origin.
The WebView and native bridges restrict navigation to the configured origin.

Before release, create your own signing key outside the repository and copy the
blank `android/key.properties.example` to ignored `android/key.properties`.
Populate the private signing values. Then run
`flutter build apk --release --dart-define=SERVER_BASE_URL=<your-HTTPS-origin>`.
Release builds refuse absent release signing; debug signing is not a release fallback.
Run Gradle builds sequentially on Windows to avoid shared-cache lock contention.
Both projects enforce dependency verification with checked-in SHA-256 metadata;
the Gradle distribution checksum is pinned from its official endpoint. The initial
dependency metadata was bootstrapped from resolved artifacts and is not independent
proof of their provenance. Review checksum additions and new release variants;
do not disable verification to bypass a mismatch. See the
[Gradle verification guidance](https://docs.gradle.org/current/userguide/dependency_verification.html).
Old APKs/installers may contain obsolete configuration: rebuild and reinstall.

## ESP32

Copy `device_config.example.h` to the ignored `device_config.h` beside the sketch.
Set the Wi-Fi credentials, `SERVER_BASE_URL`, matching `IOT_DEVICE_SECRET`, and a
trusted CA certificate. Keep any existing local configuration private. Production
uses HTTPS, CA verification and a synchronized clock; `setInsecure()` is not used.
`ALLOW_INSECURE_LOCAL_HTTP` is an explicit local testing option only. Do not ship it enabled.

Telemetry is validated and authenticated through `X-IoT-Secret`. Zero readings are
preserved; malformed, out-of-range, and nonfinite readings are rejected. The current
hardware has no pH probe, so firmware omits pH and the UI labels it unmeasured.
Calibrate installed sensors and validate thresholds physically before use. These
sensor indications do not establish drinking-water safety or replace laboratory
testing. See [the wiring guide](iot/WIRING_AND_SETUP_GUIDE.md).

## Realtime and notifications

The UI uses **polling**, not realtime streaming: the shared browser UI refreshes
about every 10 seconds. Native local notifications poll about every 15 seconds in
the foreground; Android background work is best-effort, about 15 minutes minimum
and subject to OS scheduling. The separate Admin UI also polls. `/api/events`
returns a polling capability response instead of relying on process-local SSE.

Announcements and threshold alerts persist in PostgreSQL. With VAPID configured,
push tasks enter a durable outbox in the same transaction. Schedule authenticated
GET `/api/jobs/push` calls, or use `python -m backend.manage drain-push` from a
trusted runner. Each invocation attempts at most 10 jobs; failed attempts are
retried across invocations up to five times, with expired subscriptions disabled.
Monitor `failed` jobs and queue age; provision the scheduler frequency for volume.
No cron frequency is hardcoded because plan limits and service selection differ.

Web Push needs an HTTPS browser/PWA, permission, and a supported push service.
Android WebViews do not necessarily support Web Push; their native polling/local
notifications remain available. Push delivery is at-least-once and can duplicate
after a process crash; notification tags reduce duplicate display. Neither push
nor mobile background scheduling guarantees instantaneous emergency delivery.

## Photos, headers, and errors

Authenticated reports accept JPEG, PNG or WebP, at most 2 MiB and 12 million pixels.
Images are decoded/re-encoded as JPEG with metadata removed and dimensions capped
at 1920. No user filenames become filesystem paths. The request limit is 3 MiB.
Private S3 objects use random names and five-minute signed read URLs; database
photos live in PostgreSQL. S3/DB transaction failures can leave orphan objects;
configure lifecycle cleanup and reconcile objects against stored references.

APIs return clean errors with no SQL/credentials/tracebacks. Server logs keep event
type and endpoint rather than request bodies. Production adds HSTS, CSP,
nosniff, frame protection, referrer and permission policies. CSP permits legacy
inline script/style; reducing that permission requires a later UI refactor.
Admin dynamic HTML is escaped/sanitized using vendored DOMPurify. Keep dependency
audits and stored-XSS regression checks in the release process.

## Tests and repository checks

```powershell
python -m pytest -q
$env:TEST_DATABASE_URL = '<disposable-PostgreSQL-URL>'
$env:RUN_BROWSER_TESTS = '1'
python -m pytest -q
python -m pip_audit -r requirements.txt --progress-spinner off
python scripts/audit_repository.py
python scripts/audit_git_history.py
```

Chrome is required for the opt-in browser tests (`channel='chrome'`). Tests use
temporary SQLite files or fresh PostgreSQL schemas, never the normal local data
file. Legacy test entrypoints delegate to this isolated suite. The current-tree
scanner checks the proposed Git index and unignored files. The history scanner
checks every reachable blob/path, including IDE tree refs. Also run Gitleaks with
`.gitleaks.toml` and `--log-opts=--all` on a full checkout; scan a source-only export
for the current tree. Scanners cannot prove all possible secret formats absent.
The readiness report records actual runs and remaining integration checks.

## Later deployment (not performed)

1. Complete the rotation checklist and GitHub Support follow-up. The existing
   remote's reachable history has been replaced and verified. Coordinate old
   clones/backups; never merge or push the old contaminated history back.
2. Create production PostgreSQL, shared Redis, and optionally a private photo bucket.
   Configure secrets, exact HTTPS origins, backups, and monitoring.
3. Rehearse migrations/import on a copy, then migrate the intended production DB
   and privately create the first Admin. Review imported development accounts.
4. After authorization to push, connect the repository root to Vercel's Flask
   framework. `pyproject.toml` selects `backend.server:app`; `vercel.json` copies
   public assets and keeps `/api` routed to Flask. Do not add legacy `builds`
   configuration or a persistent SQLite volume.
5. Configure all required production environment values in Vercel. Build a preview
   with separate nonproduction credentials/data, then test readiness, authorization,
   uploads, polling, push scheduler, Worker offline recovery, and ESP32 HTTPS.
6. Supply the confirmed production origin to mobile builds and ESP32 local config,
   set CA trust/signing, and physically test before rollout.

The configuration follows current [Vercel Flask documentation](https://vercel.com/docs/frameworks/backend/flask)
and [Python runtime documentation](https://vercel.com/docs/functions/runtimes/python).
See [Vercel request headers](https://vercel.com/docs/headers/request-headers) for the
trusted client-IP header and [cron authentication](https://vercel.com/docs/cron-jobs/manage-cron-jobs)
for scheduler authorization. A real Vercel preview deployment remains unverified.
