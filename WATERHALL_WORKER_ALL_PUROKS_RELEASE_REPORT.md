# Worker all-purok release — 2026-10-17

Authorized Workers retain their individual accounts and permitted operations across Puroks 1–8. Worker assignment text and the implicit Purok 1 registration default are removed. Household puroks remain intact.

## Existing workflow and compatibility

- Worker registration is the existing **Admin → User Directory → Register Worker** flow (`POST /api/workers/add`). It issues a distinct EMP identifier with the existing `Collector` role. It remains Admin-only; Workers and Residents cannot provision staff.
- This release base has no public Worker self-registration, separate pending/review/approval/rejection flow, staff edit/activation screen, or staff status column. Those workflows are **not applicable**, rather than invented or claimed as tested. An Admin's explicit provisioning remains the existing authorization step. Resident pending/rejected approval rules are unchanged.
- Existing operational endpoints already authorize by role, not assigned purok. The release tests exercise both Workers across all eight puroks, server-side attribution, independent history, billing concurrency, collection replay and Resident isolation.
- Only `Admin` and `Collector` map to staff privileges. Unsupported role values do not become Workers. The existing database role constraint is retained; deleted accounts cannot reuse operational tokens. No new activation/status model is introduced.
- Duplicate normalized staff contacts are rejected under the existing serialized registration transaction. Multiple distinct Workers can still register concurrently with unique EMP identifiers. Admin success feedback now requires a valid registration receipt.
- Production `users.assigned_zone` is already nullable. New Worker inserts explicitly store NULL instead of invoking its legacy Purok 1 default. Existing assignment values are preserved; the legacy API `zone` field remains compatible. **No database migration is required or applied.**

## Files

- `backend/accounts.py`: no assignment on new Workers; serialized duplicate-contact protection.
- `backend/security.py`: explicit staff role allowlist.
- `backend/server.py`: same role mapping at login; no invented zone fallback.
- `admin_web/app.js`: remove Worker assignment cell; validate creation receipt.
- `admin_web/index.html`: remove Worker assignment header; version the changed Admin script.
- `admin_web/recovery-tools.js`: support four-column Worker rows while preserving five-column Resident rows and all Reset Password actions. This necessary dependency was caught by the pre-release browser checks.
- `web/app.dart`: remove Worker assignment session/display assumptions; neutral terminal/profile; include all eight puroks in optional dashboard categorization; household puroks stay authoritative.
- `web/app.js`: regenerate the hosted bundle from that Dart source.
- `web/index.html`: neutral Worker profile text; version the hosted script.
- `web/service-worker.js`: bump only the shell cache version for the hosted update.
- `tests/test_worker_all_puroks.py`: provisioning, roles, all-purok billing/collections, attribution, concurrency and duplicate protections.
- `tests/test_worker_all_puroks_browser.py`: Admin responsiveness/registration receipts; all-purok substring search, legacy sessions, offline cache/reload/billing/synchronization.
- This report.

## Verification

- Focused backend: **74 passed, 0 failed, 0 skipped**.
- Backend regression: **105 passed, 0 failed, 3 skipped**. Skips: PostgreSQL import integration (not part of this release), and two opt-in Worker entry browser cases from the non-browser invocation. Both opt-in Worker entry cases were subsequently executed in Chrome and passed. Native startup tests also passed.
- PostgreSQL: **14 passed, 0 failed, 0 skipped** in unique disposable schemas. Schemas were removed afterward. Before/after fingerprints of public users, households, puroks, contact claims, meters, bills and collections were identical. No production accounts or transactions were created for testing.
- Worker Flutter: **27 passed**; analysis **No issues found**. Native source, package, versions, signing and APKs are unchanged.
- Dart web compile: **PASS** (`dart compile js -O2 --no-source-maps web/app.dart -o web/app.js`). Rebuilding the unmodified base with these settings reproduced the deployed baseline bundle exactly.
- Dart web analysis: **0 errors, 0 warnings**, the same seven informational legacy API deprecations as the unmodified base.
- Browser: **96 distinct cases covered successfully, no unresolved failures/skips**, including the **46-case final Admin/Worker rerun** and **2 direct Worker entry/session checks**. Eight pre-release table/reset failures were corrected by updating the column-dependent helper, then passed in that final rerun. The other 52 cases in the broader run passed; four of those were also rerun. Coverage includes all-eight-purok substring search, cached offline creation/reload/sync, owner isolation, registration receipt validation, Resident workflows, freshness expiry/recovery and responsive reset controls at 320?1920 px.
- Static deployment packaging: **PASS**; eight exact asset comparisons, no private configuration copied.
- Staged secret/path audit and `git diff --check`: **PASS**. No credentials, ignored headers, signing files, databases or APKs staged. The broader repository scanner's seven findings are unchanged example-header template literals outside this release; they do not match the private configuration.
- Preservation audit: **306 pre-existing workspace files**, original local HEAD and original index unchanged. Protected landing/native/IoT/storage/billing/notification source remains identical to the release base.
- Production is verified separately after the containing commit is pushed: require Vercel READY, exact commit/assets and safe manual UI checks. Post-deployment results are saved in the project release evidence folder.

## Offline, mobile and preserved scope

The SQLite implementation, owner-scoped native bridge, existing queues, synchronization engine, billing formulas, collection policy, ownership checks and transaction history are unchanged. Existing saved Worker sessions containing an obsolete `selected_zone` key remain usable; the key is ignored without clearing local storage or pending operations.

This is a hosted WebView asset update. Existing Worker **1.3.1+8** and Resident **1.3.1+7** APKs are retained; neither requires rebuilding. Fully close and reopen Worker online to load the updated hosted assets. A web deployment does not install an Android package.

No IoT firmware, sensor processing/calibration/thresholds, telemetry schema/history, notification code, Resident logic, native mobile code, locked landing HTML/CSS/photos, or unrelated source changes are included. The original dirty workspace is preserved by releasing from an isolated worktree based on production `origin/main`.

## Rollback

If a release defect is confirmed, restore the preceding verified Vercel deployment / revert this focused commit through a normal follow-up commit. No schema rollback or production-data rewrite is required. Legacy assignment values remain available. Do not erase offline queues or reset accounts as a rollback step.

## Production acceptance

The release is not considered verified solely from a push. Require Vercel READY on the exact commit, matching hosted assets, healthy API readiness, unauthenticated operational requests rejected, locked landing hashes unchanged, and a safe signed-in Admin / existing Worker app check. Do not create real Workers, reset passwords, change real bills, or alter production account statuses solely for testing.
