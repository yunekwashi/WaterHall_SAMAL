# WaterHall Worker welcome startup repair

Verified October 11, 2026. Worker APK **1.2.1+4** is built, signed, installed by the user, and manually verified on the phone against the existing production domain.

## Root cause and release comparison

The user's clarified target is the **public WaterHall welcome page**, followed by entry into the Worker portal. Before this repair, the Worker wrapper loaded /index.html?role=worker directly. This is the shared private portal: a fresh/logged-out/expired session correctly shows login; a valid stored Worker session restores Home. That startup route bypassed the public welcome page.

The same startup URL is present in the last mobile release faf9103 (1.1.0+2), UI release a866045 (1.2.0+3), and production release 3eb8f25. Native startup, shared authentication/session restoration and role mapping are unchanged across those releases. History does **not** establish a recent UI change that introduced this URL. The undesired start comes from the native entry choice, rather than a new authentication redirect.

Read-only production checks confirm /index.html?role=worker returns HTTP 200 without redirection; its HTML, compiled JS and service worker match 3eb8f25 after line-ending normalization. /landing.html returns the correct existing public welcome page. The bare / currently serves the shared portal on Vercel, so the fix deliberately uses the explicit verified /landing.html path. No public-site routing change is made.

## Files changed

- waterhall_flutter/lib/main.dart: start at /landing.html; show a native **Continue to Worker Portal** button there; continue to the existing /index.html?role=worker URL. Returning to welcome restores the button. Retry retains the current page type. Welcome does not invoke the portal's native auth synchronization.
- waterhall_flutter/pubspec.yaml: Worker version **1.2.1+4**; make already-resolved WebView platform interface 2.15.1 an explicit test dependency.
- waterhall_flutter/pubspec.lock: only dependency classification changes from transitive to direct dev; package versions/checksums remain unchanged.
- waterhall_flutter/test/worker_startup_test.dart: tests welcome-first loading, portal handoff, auth preservation on welcome/back, and existing same-origin/Admin navigation restrictions.
- tests/test_worker_entry.py: real Chrome tests for welcome, logged-out protected portal, valid-session restoration in a recreated phone-sized WebView context, all five Worker tabs, and logout/reopen.
- WATERHALL_WORKER_LANDING_REPAIR_REPORT.md: this report.

Existing first-install permission setup remains. After setup, Worker opens welcome. Continue restores a usable Worker session or requires normal login. No protected page is exposed to logged-out users.

## Tests and build

- Reproduction against old native entry: **2 expected startup-test failures, 1 navigation restriction pass**.
- Worker Flutter suite: **25 passed**; startup, permission setup, offline store, notification checkpoint and configuration tests, with the production origin supplied explicitly.
- Worker flutter analyze: **PASS**, no issues.
- Existing browser navigation/layout and Worker session-end/queue preservation: **11 passed**. Covers Home, Households, Billing, Updates, Profile; Resident layout regressions; logout, expiry and HTTP 401.
- New Worker entry browser tests plus existing public landing tests: **12 passed**. Total browser/source regression cases: **23 passed**.
- Headless production Chrome at phone width: public welcome and logged-out Worker route **PASS**, HTTP 200, no page JavaScript errors. No production business-data test writes.
- Signed release build: **PASS**. Command: flutter build apk --release --no-pub --dart-define=SERVER_BASE_URL=https://waterhall-samal.vercel.app. Existing strict Gradle dependency verification retained. Existing SDK/Kotlin/Java deprecation warnings remain.
- APK signature verification and comparison with Worker 1.2.0+3: **PASS**, same certificate.
- APK package/version/label: **PASS**, com.example.waterhall_flutter, version 1.2.1/build 4, WaterHall Worker.
- All three APK ABIs contain production origin, welcome path and Continue label; emulator origin excluded: **PASS**.
- APK archive contains no private config/key files: **PASS**.
- Focused source gitleaks scan: **PASS**, zero findings.
- Scoped and full working-tree git diff --check: **PASS**.
- Git index unchanged; nothing staged, including secrets/private configuration.

## APK and rollout

New APK: C:\Users\Windows\Documents\capstone\WATER-HALL_DART\WATERHALL_RELEASE\apps\WaterHall-Worker-1.2.1+4.apk

Size: 50,225,876 bytes.

SHA-256: 928081b579c33e04595958527983100427aa35ee7562002db0f516a507dd491d

A matching .apk.sha256 file is beside the APK. Previous APKs are preserved.

**Phone verification: PASS — user-confirmed manual acceptance.** On October 11, 2026, the user replied “Installed: all checks pass” after being asked to install this APK as an update and verify public welcome → Continue to Worker Portal → Home with a valid session or login when logged out, plus Home, Households, Billing, Updates and Profile.

The user performed the installation and phone checks. No Android device was attached to this workstation; these results are manual confirmation, not automated device testing. Logout/expiry protection is also covered by the passing browser regressions.

This is an APK-only repair; it requires no manual web deployment. At initial APK delivery, production was 3eb8f25 / deployment dpl_32NrezU3nYyQp48eZXHUKdxT6tNP, READY when inspected, and no commit or push had been performed. On October 11, 2026, after the user confirmed phone acceptance, the user authorized publishing only these six repair files to main. Publication uses an isolated checkout based on current origin/main, preserving the unrelated dirty working tree. Git-triggered Vercel deployment status is checked after the push and reported separately; shared production web/backend files are unchanged.

## Preserved scope and remaining issues

All pre-existing tracked/untracked source files outside the five intended implementation/test files are byte-identical to the starting snapshot. Dirty changes in .gitignore, previous reports, admin_web/app.js, backend files, IoT firmware/configuration/examples/guides, existing tests, and web/app.dart/web/app.js are preserved. The ignored device header, release signing configuration/keystore and previous Worker APK are hash-verified unchanged. Root HEAD remains a1df4affedd2ba8d0bf4a6fba9949ed7cb24264c.

Shared web assets, Resident, Admin, backend/auth/routes, PostgreSQL schema/data/history, sensor firmware/calibration, operational Turbidity Index, null-TDS rendering, telemetry refresh, polling and notification logic are unchanged. Tests use disposable databases.

No remaining blocker for the requested Worker welcome startup repair. Phone installation and requested navigation/authentication checks are manually confirmed. Bare-origin public routing remains unchanged; Worker welcome uses the verified explicit page.

Evidence directory: C:\Users\Windows\AppData\Local\Temp\waterhall-worker-startup-20261011-171706
