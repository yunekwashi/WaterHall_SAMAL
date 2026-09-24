# WaterHall pre-deployment checklist

The existing GitHub repository's normal reachable history has been replaced and
verified. No deployment has been performed. An unchecked item is not certified.

## Repository and credentials

- [ ] Rotate the Wi-Fi password exposed in Git history; update affected devices.
- [ ] Replace any deployed JWT/Flask key or account password based on old defaults.
- [ ] Rotate the previous IoT credential and update both service and ESP32 config.
- [ ] Rotate VAPID keys found in a local Git snapshot; re-register subscriptions.
- [ ] Review historical database/dump/test-response exposure as private user data.
- [x] Protect hardened source and rewrite local history under user authorization.
- [x] Replace and independently verify the existing GitHub history under authorization.
- [ ] Review [GITHUB_REMOTE_CLEANUP_REPORT.md](GITHUB_REMOTE_CLEANUP_REPORT.md),
      complete [credential rotation](CREDENTIAL_ROTATION_CHECKLIST.md), submit
      [GitHub Support follow-up](GITHUB_SUPPORT_CLEANUP.md), and coordinate old clones.
- [ ] Repeat current-tree/history scans if additional changes are made after this audit.
- [x] Complete the explicitly authorized GitHub history replacement and verification.
- [ ] Verify `.env`, `device_config.h`, database data, signing keys, APKs and secret
      VAPID files remain ignored. Keep their local backups secure.
- [ ] Run the documented tests and dependency audit in a clean checkout.
- [ ] Configure GitHub secret scanning, branch protection, and required CI checks.
- [ ] Configure SonarCloud credentials/project, or disable its optional workflow.

## Production services

- [ ] Production PostgreSQL created with connection pooling and least-privilege user.
- [ ] `DATABASE_URL` configured with verified TLS and appropriate CA trust.
- [ ] Backups enabled and restoration rehearsed; retention/privacy policy defined.
- [ ] Shared Redis created and `RATELIMIT_STORAGE_URI` configured with TLS.
- [ ] Independent random JWT secret generated and configured.
- [ ] Independent random Flask secret generated and configured.
- [ ] Independent random IoT device secret generated and configured.
- [ ] Exact production HTTPS origins configured; no CORS wildcard.
- [ ] `APP_ENV=production`; debug disabled; missing configuration fails closed.
- [ ] Persistent photo storage selected: PostgreSQL capacity, or private S3 bucket,
      credentials, encryption, signed-read permissions, retention and orphan cleanup.
- [ ] Database migration/import rehearsed on a copy and totals/relations verified.
- [ ] Production migrations explicitly executed before accepting traffic.
- [ ] Default/demo/imported accounts reviewed; compromised passwords reset.
- [ ] First Admin securely created; identity-verification/recovery procedure assigned.

## Vercel and client configuration

- [ ] Correct repository root and Flask framework selected; Python version supported.
- [ ] Dart UI compiled and checked-in `web/app.js` matches reviewed source.
- [ ] `public/` build contains only expected static assets; `/admin/` and `/api` route correctly.
- [ ] Preview uses separate credentials/data; preview endpoints tested without production impact.
- [ ] Production HTTPS origin confirmed; mobile `SERVER_BASE_URL` configured once per build.
- [ ] Android release signing key created, backed up and stored outside Git.
- [ ] Release builds reject HTTP; system certificate validation confirmed on devices.
- [ ] Gradle dependency verification/checksums reviewed for the release toolchain.
- [ ] Rebuilt apps installed; no stale APK or installer configuration distributed.
- [ ] ESP32 production URL and matching device credential configured privately.
- [ ] ESP32 CA certificate and time synchronization tested; local HTTP disabled.
- [ ] Sensor calibration, bounds, threshold behavior and absent-pH display verified physically.

## Notifications and operational acceptance

- [ ] VAPID public/private keys and operator email configured, or push intentionally disabled.
- [ ] `CRON_SECRET` configured; authenticated scheduler created at adequate frequency.
- [ ] Push subscribe/unsubscribe, expired subscriptions, retries and recipient scoping tested.
- [ ] Queue age/failed outbox jobs monitored; alarm escalation independent of push documented.
- [ ] Worker native SQLite tested on a physical device: airplane mode, process kill/relaunch,
      restart, account switch, disk-full failure, token expiry and reconnect.
- [ ] Lost sync response/retry does not duplicate collections; conflicts retain pending work.
- [ ] Offline pending cash operations reconciled before device replacement/uninstall.
- [ ] Resident telemetry polling and alerts tested from a real ESP32 through production services.
- [ ] Admin/Worker/Resident authorization and cross-household access denial tested directly.
- [ ] Photo validation, private reads and capacity tested with configured cloud storage.
- [ ] Production CORS, CSP, HSTS and API no-store headers verified.
- [ ] `/api/health` and database `/api/ready` confirmed without sensitive output.
- [ ] Expected user/device load tested, including shared-IP rate limits and DB connection limits.
- [ ] Log redaction, monitoring, retention and incident-response ownership confirmed.
- [ ] Final approval obtained for actual deployment and rollout.
