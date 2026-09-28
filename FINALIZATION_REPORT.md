# WaterHall software finalization - local review handoff

Date: 2026-09-28. This report covers local source changes and isolated verification only.
No commit, push, deployment, release APK build, production database access, production
migration, signing change or Vercel environment change was performed.

## 1. BASELINE

Branch `main`, HEAD `698261e`. The only initial modifications were the two Android
manifests listed in section 35. Backend/browser baseline: 50 passed, 1 skipped.
Worker Flutter: 4 passed; Resident Flutter: 2 passed. Both Flutter analyzers were clean.
Shared Dart analysis had 7 existing deprecated browser-library notices, no errors/warnings.

## 2. ARCHITECTURE FOUND

Flask API and separate Admin website on Vercel; PostgreSQL/Neon in production and
SQLite for isolated local tests. Worker and Resident Flutter apps host the shared
Dart/web client in role-specific WebViews. Worker has an account-scoped native SQLite
bridge. JWT authorization is validated by the server. Existing durable push outbox,
optional Web Push, native notification polling and explicit migration CLI are retained.

## 3. FILES MODIFIED

See the exact final Git listing in section 34. Intentional changes cover backend account,
billing and telemetry behavior; shared client, Admin interface, native auth/notifications;
regressions, static root routing and documentation. `web/app.js` is generated exclusively
with the documented Dart compiler. Its large diff reflects optimized compilation of the
previously unoptimized generated file, not a handwritten JavaScript rewrite.

## 4. FILES CREATED

- `backend/account_validation.py`
- `backend/accounts.py`
- `backend/billing.py`
- `backend/login_security.py`
- `tests/test_finalization.py`
- `web/landing.html`
- `web/landing.css`
- `web/push-client.js`
- `FINALIZATION_REPORT.md`

## 5. DATABASE / MIGRATION CHANGES

Additive schema version 2 adds `households.account_status`,
`billing_records.billing_snapshot`, `resident_contact_claims`, `login_attempts` and
`billing_configuration`. Existing accounts default to approved. Legacy totals and
telemetry are retained. Existing contacts are reserved without merging duplicate
accounts. New rates start unconfirmed. Readiness now requires schema version 2.
Migration execution was limited to disposable test databases. Production still needs
an explicitly approved backup, PostgreSQL rehearsal and migration before using these
new endpoints. The existing command is `python -m backend.manage migrate`; it was
not run against any real project or production database.

## 6. PH REMOVAL

Removed from active Flask payloads/calculations, Worker/Resident screens, Admin
controls and native notifications. Tests assert that it is absent from active API
responses. The legacy `ph_level` database column remains unused to preserve history.
Documentation now describes only water level, turbidity and TDS.

## 7. FLOW-SENSOR REMOVAL / MANUAL METER WORKFLOW

Removed flow telemetry ingestion, displayed flow values, automatic sensor leak claims
and simulated controls. Legacy database columns/tables remain unused. Leak state is a
manual report. Billing uses stored meter register readings, never sensor flow or
invented consumption estimates. Outdated equipment-list assumptions were corrected;
no firmware was implemented.

## 8. RESIDENT SELF-REGISTRATION

Resident portal - Create Resident account collects full name, Philippine mobile
contact, configured purok and matching passwords. Server-generated Resident/meter IDs
are returned. Public registration creates a pending account and no JWT. The UI clearly
asks the applicant to wait for approval. Registration requires connectivity.

## 9. DUPLICATE PROTECTION

Contacts normalize to `09xxxxxxxxx`. A database primary-key reservation plus serialized
account creation protects concurrent requests; legacy imported contacts are checked too.
Same names remain allowed. Normalized same-name and legacy duplicate-contact flags
appear for Admin review. Ambiguous names cannot log in as an arbitrarily chosen account.
No merging or deletion occurs automatically.

## 10. PENDING APPROVAL

Admin Directory lists pending/approved/rejected registrations with approve/reject
controls. Only a pending account can transition through this workflow. Pending/rejected
accounts cannot sign in or reuse a correctly signed JWT to bypass approval. Workers do
not see pending/rejected households in their directory. Admin manual creation remains
available and creates an approved account.

## 11. WORKER ACCOUNT MANAGEMENT

Admin-only creation remains, with server-generated employee IDs, validated name/contact,
matching passwords and the Collector role. Public Worker signup and client-controlled
administrator escalation are unavailable. Existing manual account tests are retained.

## 12. FAILED LOGIN / 5-MINUTE LOCKOUT

Database-backed counters use HMAC account identifiers and transactional locking.
Five consecutive wrong passwords lock the account for 300 seconds. Correct passwords,
login aliases, refresh and IP changes do not bypass an active lock. Retrying does not
extend it. Successful login before lockout resets failures; expiration permits a new
attempt. Tests use a controlled clock for all three roles. General rate limits remain.

## 13. BILLING CONFIGURATION

Admin - Payment Configuration - Billing rates edits base rate, included m³,
environmental fee and excess rate. Validated non-negative decimal values and a version
are persisted in the database. Worker/Resident cannot change them. Initial sample values
are explicitly unconfirmed until Admin saves official rates. Client previews use cached
confirmed rates; the server independently calculates and validates every bill.

## 14. HISTORICAL BILL PROTECTION

New bills save applied rates, version, readings, consumption, excess and final amount.
Later rate changes cannot alter these snapshots. Legacy bills retain their original
amount and disclose that their historical breakdown is unavailable. Idempotent replays
return their original result even after a tariff change.

## 15. WATER METER / CONSUMPTION

Consumption is current minus previous manual reading. Negative, decreasing, invalid,
stale and duplicate-month readings are rejected. Client-provided totals cannot override
server amounts. The Worker preview uses the actual stored meter reading and leaves the
new reading blank. Billing cycles use the server's UTC calendar consistently. Meter replacement/correction needs a separately reviewed Admin
maintenance procedure; there is no silent bypass or automatic reset.

## 16. RESIDENT HOME

Shows the authenticated resident's ID, meter ID, purok, actual current-cycle bill,
readings, consumption, payment status and stored breakdown. No current bill produces
"No current billing record" and "Awaiting a recorded meter reading and bill," not an
estimated charge. Missing reservoir readings remain visibly unavailable.

## 17. RESIDENT LEDGER

Uses server records with cycle, status, reading range, consumption, total, bill reference
and issue date. Applied breakdowns are shown when available; legacy amounts are retained.
Empty history has an explicit empty state.

## 18. SUPPORT / REPORTS

Resident ownership derives from JWT identity; a supplied different household is rejected.
Existing idempotent report/photo handling is retained. JPEG/PNG/WebP content is validated
and re-encoded, with a 2 MiB decoded limit. Storage remains PostgreSQL or configured
private object storage. Admin report/evidence review and cross-account tests remain.

## 19. WORKER ONLINE MODE

Authenticated directory, manual readings, bill creation, collections, reports/maintenance
and announcements use the existing Flask API. Server acknowledgements determine accepted
operations. UI prevents duplicate submission while saving; errors preserve pending data.

## 20. WORKER OFFLINE MODE

Native SQLite persists account-owned collections/actions. Browser localStorage is the
web fallback. First online sign-in and cached data are required. Logout/expiry preserves
queues but clears authorization/private caches. Reconnection and active-client refresh
retry uploads. Conflicts remain pending for review while unrelated valid records proceed.
Only returned `synced_ids` mark collections synced; transaction IDs remain stable.
Native background notification polling does not upload the offline queue. Clearing app
data/uninstalling can remove local records and must wait until reconciliation.

## 21. EXISTING CLIENT RELIABILITY PATCH

Reviewed existing commit `6fb2ee5`: 15-second request deadlines, JWT/401 invalidation,
stale-session guards, collection batch splitting, explicit acknowledgements and queue
preservation. Added bounded optional push requests, immediate token capture for logout,
serialized native auth/storage writes, removal of duplicate Worker auth writes and
session checks during queue restoration. Failed saved actions now retain review details
without preventing unrelated actions from syncing. Review UI includes both queue types.

## 22. ANNOUNCEMENTS

Admin and Worker creation remain available. Server determines the author from the JWT
and validates the audience; Resident creation is denied. Role-targeted retrieval and
idempotent writes remain, with the existing durable notification outbox.

## 23. PUSH NOTIFICATIONS

Foreground shared UI polls; native foreground notifications poll approximately every
15 seconds. Android background polling is best-effort with a roughly 15-minute minimum
and OS restrictions. Optional Web Push depends on permissions, existing VAPID setup,
subscription and delivery worker. Mocked retry/expiry and browser logout race behavior
are tested. Actual background/closed/force-stopped phone delivery is NOT VERIFIED here.
Native alerts use actual supported readings with no invented fallback measurements.
No new provider was introduced.

## 24. ACCOUNT RECOVERY

Existing Admin-issued hashed, expiring, one-use recovery codes remain. Contact numbers
alone do not reset passwords. Successful password changes invalidate previous JWTs.
SMS implemented: **NO**. Recovery delivery requires an independently verified private
Admin process; no fake SMS workflow is shown.

## 25. PUBLIC LANDING PAGE

`/` serves the public landing page through Flask and the Vercel static rewrite.
Worker `/index.html?role=worker`, Resident `/index.html?role=resident`, and `/admin/`
remain compatible. Service-worker fallback distinguishes landing from the app shell.
No prominent Admin link is added. Official title, team and school are clearly marked
placeholders, awaiting verified details.

## 26. UI / UX CHANGES

Responsive landing page, Resident signup dialog, Admin registration review and billing
form, truthful no-data states and stored billing details. Fixed focus-triggered button
movement and invisible modal styling. Enabled browser zoom. Admin measurements use
separate values rather than a pie chart that mixes incompatible units. Local browser
screenshots are inspected; actual phone keyboard/accessibility checks remain manual.

## 27. AUTHENTICATION

Passwords remain hashed; JWT issuance/validation and credential fingerprint checks are
retained. Persistent lockout and approval checks add protection. Expiry/401 clears the
client session immediately. Native secure credential writes are serialized. Credentials
and full API response bodies are not placed in new logs or errors.

## 28. AUTHORIZATION

Explicit server endpoint policy enforces public, authenticated, Worker and Admin roles.
Approval/rates/account management require Admin. Reports and Resident data are scoped
to their owner. Client-supplied roles, sender identities and payment amounts are not trusted.

## 29. RATE LIMITING / THREAT MITIGATION

Existing global, login, recovery, upload and telemetry limits remain; public signup adds
6/minute and 30/hour limits. Production shared rate-limit storage remains required.
CORS, CSP, transport verification, upload restrictions and push endpoint validation
are preserved. No release cleartext permission or signing configuration was changed.

## 30. SECURITY REVIEW

Production PostgreSQL still forces `verify-full`, certifi CA roots and required channel
binding independently of integration-managed URL parameters. No production connection
was attempted. Current-tree secret scan: 0 findings after replacing synthetic password
literals with ephemeral test values. History scan: 15 pre-existing synthetic password
literal findings in registration tests across 58 reachable commits/4 refs; history was
not rewritten. Dependency audit: no known vulnerabilities in `requirements.txt`.
These automated checks do not replace a production runtime/physical-device review.

## 31. TEST RESULTS

Python 3.12.10 isolated environment. Complete backend + real Chrome suite:
**101 passed, 0 failed, 1 skipped** (697.82 seconds). This includes registration,
approval, three-role lockout, Decimal billing snapshots, authorization, TLS mocks,
photos/recovery/push outbox, session expiry, timeout, offline reconnect, conflict
isolation, explicit partial acknowledgements and duplicate-payment protection.
Worker Flutter: **4 passed**; Resident Flutter: **2 passed**.
PostgreSQL import integration `test_sqlite_import_preserves_ids_omits_plaintext_and_is_atomic`
was **NOT RUN** because no disposable local PostgreSQL instance is available and Docker
is unavailable. No production database was used. A follow-up run after display fixes
passed 3 targeted browser tests; the final generated bundle follow-up is recorded below.
Final generated-bundle follow-up: **4 passed, 0 failed, 8 deselected** (registration,
Admin review/rates/expiry, manual billing and conflict/partial-ack handling). These are
repeat verification runs, not additional unique test counts.

## 32. STATIC ANALYSIS RESULTS

Shared Dart: **0 errors, 0 warnings, 6 existing deprecation notices** for browser
libraries. Both Flutter analyzers: no issues. Changed Python modules parse/import
under Python 3.12.10. The seven baseline notices fell to six after an unused import
was removed; migrating the entire browser API stack is outside this patch.

## 33. BUILD RESULTS

Shared source compiled with `dart compile js web/app.dart -O2 --no-source-maps -o web/app.js`.
`python scripts/build_static.py` successfully prepared public/Admin static assets.
All copied web/Admin assets match their source bytes; static allowlist and root rewrite checks pass. No APK was built.

## 34. FINAL GIT STATUS

Branch `main`; HEAD remains `698261e`. Index empty. `git diff --check` passes.
All intentional edits are local and unstaged; no commit/push/deploy occurred.

```text
 M README.md
 M admin_web/app.js
 M admin_web/index.html
 M admin_web/styles.css
 M backend/db_adapter.py
 M backend/operational_routes.py
 M backend/security.py
 M backend/server.py
 M iot/WIRING_AND_SETUP_GUIDE.md
 M tests/conftest.py
 M tests/test_browser.py
 M tests/test_operations.py
 M tests/test_registration.py
 M tests/test_security.py
 M vercel.json
 M waterhall_flutter/android/app/src/main/AndroidManifest.xml
 M waterhall_flutter/lib/main.dart
 M waterhall_flutter/lib/notification_service.dart
 M waterhall_resident_flutter/android/app/src/main/AndroidManifest.xml
 M waterhall_resident_flutter/lib/main.dart
 M waterhall_resident_flutter/lib/notification_service.dart
 M web/app.dart
 M web/app.js
 M web/db.dart
 M web/index.html
 M web/native-store.js
 M web/offline_store.dart
 M web/service-worker.js
 M web/shopping_list.html
 M web/styles.css
?? FINALIZATION_REPORT.md
?? backend/account_validation.py
?? backend/accounts.py
?? backend/billing.py
?? backend/login_security.py
?? tests/test_finalization.py
?? web/landing.css
?? web/landing.html
?? web/push-client.js
```

## 35. PRE-EXISTING UNRELATED FILES

Both files remain modified, unstaged and byte-for-byte identical to their baseline:

- `waterhall_flutter/android/app/src/main/AndroidManifest.xml`
- `waterhall_resident_flutter/android/app/src/main/AndroidManifest.xml`

Their existing app-label edits were not altered or included in any commit.

## 36. APK REBUILD REQUIRED?

**YES - both apps.** Native notification logic and serialized secure-session handling
changed. Existing APKs do not contain these native fixes. Later approved builds must use
the HTTPS production `SERVER_BASE_URL` and proper private release signing. Signing
remains unconfigured; this task neither creates keys nor builds installation APKs.

## 37. MANUAL TESTING STILL REQUIRED

Use the checklist below in an approved test environment. Physical WebView/keyboard,
Android permissions, restart/suspension, real push delivery, approved PostgreSQL migration
rehearsal and the final signed installation packages require separate verification.

## 38. KNOWN LIMITATIONS / RISKS

Docker is unavailable and was not required. PostgreSQL integration is **NOT RUN** here;
SQLite tests and PostgreSQL connection mocks do not prove PostgreSQL runtime behavior.
No production endpoint/data was used to compensate. Schema migration and official-rate
confirmation are prerequisites for a later rollout. Existing local production URLs may
be stale after integration rotation and must not be reused. Browser JWT storage and
unencrypted local queue storage remain existing architectural constraints; use trusted,
locked devices. Foreground sync cannot guarantee upload while the app is closed.
Legacy bill breakdowns cannot be reconstructed safely. Project credits remain placeholders.

## 39. READY FOR MANUAL SYSTEM TESTING?

**YES, for local/manual software testing with test data.** This is not approval or
verification for a production rollout. PostgreSQL rehearsal/migration, confirmed billing
rates, physical-phone checks, verified project credits, private release signing and
subsequent approved APK builds remain outside this completed local verification.

# Manual system test checklist

Run with test accounts/data in an explicitly approved environment, never by casually
pointing this local verification at production. Compare authoritative records using
approved read-only inspection in that test database.

## Admin

- [ ] Sign in, verify dashboard, then verify logout clears private views.
- [ ] Create a Resident manually; verify generated IDs and immediate approved status.
- [ ] Create a Worker; verify contact/password validation and Collector-only role.
- [ ] Inspect pending signup, same-name flags and legacy duplicate-contact flags.
- [ ] Approve one signup; reject a separate test signup; confirm only approved login works.
- [ ] Enter official test billing rates; save, refresh and verify database persistence.
- [ ] Change rates after creating a bill; confirm its saved breakdown/total is unchanged.
- [ ] Review reports and real photo evidence; resolve a test report.
- [ ] Publish each announcement audience and verify the correct recipients.

## Resident

- [ ] Register from the Resident portal with valid name/contact/purok/password verification.
- [ ] Try another format of the same mobile contact; confirm duplicate rejection.
- [ ] Verify pending login, approval, approved login and rejected-account denial.
- [ ] Make five wrong-password attempts, try the correct password while locked, then wait five minutes.
- [ ] Verify Home identity/readings/cycle/status and exact saved bill breakdown.
- [ ] Verify no-bill and empty-Ledger states do not display invented charges.
- [ ] Submit a report with an actual allowed photo; verify one report and sanitized evidence.
- [ ] Confirm other residents cannot view it; check announcements and logout.
- [ ] Test Admin-issued recovery code expiration and one-use behavior; no SMS is expected.

## Worker online

- [ ] Sign in and verify approved-household access.
- [ ] Enter a manual meter reading; reject negative/decreasing/stale values.
- [ ] Verify base/included/excess/fee calculation against current configured rates.
- [ ] Save one bill; repeat for the same month and verify duplicate protection.
- [ ] Record a collection; compare server acknowledgement, Admin audit and test database.
- [ ] Create a targeted announcement and verify authenticated author/audience.
- [ ] Expire the session and verify sign-in prompt/private-cache clearing.

## Worker offline / reconnect

- [ ] First sign in and load data online, then disconnect Wi-Fi/mobile data.
- [ ] Record a supported reading/action/collection; verify durable pending state.
- [ ] Restart the app and verify the account's pending SQLite records survive.
- [ ] Confirm duplicate taps cannot create a second pending payment for the same household.
- [ ] Sign out/expire the JWT; verify pending data remains and needs the same account to sync.
- [ ] Reconnect and reopen the active app; sign in again if required and retry sync.
- [ ] Confirm each synced record has an explicit acknowledgement and one server transaction.
- [ ] Mix a conflict with valid records; verify valid records sync and the conflict stays reviewable.
- [ ] Interrupt a response after server acceptance; retry with the same ID and verify no duplicate.
- [ ] Review Admin and test PostgreSQL records through approved read-only inspection.
- [ ] Test suspend/reboot/closed-app behavior; do not assume notification polling uploads queues.

## Public website / mobile UI

- [ ] `/` opens the public WaterHall page, not the Worker login.
- [ ] Check desktop and narrow phone layouts, zoom, keyboard and touch targets.
- [ ] Verify Worker and Resident deep links open the correct portal.
- [ ] Verify `/admin/` remains the separate Admin website.
- [ ] Replace official title/team/school placeholders only with verified information.
- [ ] Test foreground/background/closed notification delivery with permission granted/denied.
- [ ] Validate future reservoir hardware separately using water level, turbidity and TDS only.
