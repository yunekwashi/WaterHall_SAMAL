# WaterHall credential rotation checklist

Updated 25 September 2026 after local and remote history cleanup.
**MANUAL ROTATION REQUIRED.** No credentials were generated or changed at a provider,
and none are marked rotated. Clean reachable history is now published in the
existing GitHub repository; retained server objects still need follow-up in
[GITHUB_SUPPORT_CLEANUP.md](GITHUB_SUPPORT_CLEANUP.md). All values below are
intentionally omitted or `[REDACTED]`.
Removing Git history does not revoke credentials or erase existing remote copies.

## Credentials confirmed in published source history

- [ ] **Wi-Fi: MANUAL ROTATION REQUIRED.** Two distinct network identifiers and
  two passwords occurred in firmware/history. Replace every still-used exposed
  password at the router, remove obsolete access, and update authorized devices.
  Review whether the network names disclose a private location/identity. Keep
  `WIFI_SSID` and `WIFI_PASSWORD` only in ignored `device_config.h`; neither belongs
  in Vercel environment variables. Network identities/passwords: `[REDACTED]`.
- [ ] **JWT: MANUAL ROTATION REQUIRED.** Two signing fallback values were found.
  Replace any installation using either value with a fresh, independent,
  cryptographically random `JWT_SECRET_KEY` (at least 32 random bytes). Configure
  it privately in each environment. Old access tokens must fail after cutover;
  require sign-in again. Historical signing keys: `[REDACTED]`.
- [ ] **Flask: MANUAL ROTATION REQUIRED.** One signing fallback value was found.
  Configure a new independent `SECRET_KEY`, invalidate old signed sessions, and
  verify every server instance uses the new value. Do not reuse the JWT key.
  Historical Flask key: `[REDACTED]`. Counts are distinct within each category;
  categories may overlap.
- [ ] **Default/admin and other exposed accounts: MANUAL ROTATION REQUIRED.**
  One actual default password occurred in seeds, tests and documentation.
  Database/data exports also exposed account records and password hashes;
  the byte-level review identified 25 distinct stored hashes. Reset all affected
  real accounts, especially Admin/Worker accounts, disable unused demo accounts,
  and replace reused passwords on other services. Do not restore an old default
  through a `DEFAULT_PASSWORD` environment variable. Default password: `[REDACTED]`.
  Use `python -m backend.manage create-admin` with its private password prompt for
  a new installation, or the documented identity-verified reset flow for existing
  accounts. Reset codes must be delivered privately, never committed or pasted
  into a public issue. Verify old credentials/tokens fail and review sign-in logs.

## Credentials confirmed in a local IDE snapshot ref

The reachable local snapshot contained these values even though they were not
found in the 50 published `main` commits. This establishes local Git exposure;
it does **not** establish that these two credentials were published to GitHub.
Rotate them before reuse because their custody is no longer reliable.

- [ ] **IoT: MANUAL ROTATION REQUIRED.** Replace the previous device credential
  `[REDACTED]` with a new independent random `IOT_DEVICE_SECRET` of at least
  32 random bytes. Configure the API environment and each authorized ESP32's
  ignored `device_config.h` consistently. Provision over a trusted channel;
  verify authenticated telemetry succeeds and the old credential is rejected.
- [ ] **VAPID: MANUAL ROTATION REQUIRED.** `database/vapid_keys.json` contained
  private signing material `[REDACTED]`. Replace the entire key pair before using
  it. Set `VAPID_PRIVATE_KEY`, `VAPID_PUBLIC_KEY`, and `VAPID_CLAIMS_EMAIL` privately.
  The public key alone is not confidential. The existing
  `python -m backend.manage generate-vapid` helper prints the pair: run it only
  in a private terminal and transfer its output directly to a secret manager
  or ignored local configuration. Re-register subscriptions under the new public
  key, retire old subscriptions, and test delivery. Do not commit generated output.

## Credentials not found exposed

No real PostgreSQL/database connection password, cloud/API-provider key,
standalone JWT bearer token, `.env` file, or PEM private-key file was identified
in the reviewed refs. This is a scan result, not a promise about external systems.
Local SQLite files contained private data and account hashes, not a PostgreSQL
service password. Do not label an unobserved database password as compromised.

- [ ] Review external hosting/provider settings separately. If an account's
  database/API credential was shared elsewhere or reused an exposed password,
  rotate that credential at its provider and update dependent services.
- [ ] At future deployment, privately supply `DATABASE_URL`,
  `RATELIMIT_STORAGE_URI`, and `CRON_SECRET`; optional S3 storage needs
  `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and, when applicable,
  `AWS_SESSION_TOKEN`. Use separate least-privilege preview/production credentials.
  Do not put credentials into build arguments, source files, GitHub issues or logs.
- [ ] Keep Android release signing keys/keystores and `key.properties` outside
  Git. No release signing key was discovered in this repository.

## Finish rotation and remote remediation

- [ ] Record the owner, completion date and validation result for each applicable
  rotation in a private operational record. Store secret-manager references,
  never actual values, in review notes.
- [ ] Protect retained local database/configuration files and private backups.
  History cleanup deliberately preserved the eight existing local private files.
- [ ] Review the historical household/account/response data exposure and any
  organizational incident-response obligations with the responsible operator.
- [x] Replace the existing GitHub repository's normal reachable history under
  explicit authorization and independently verify the clean result.
- [ ] Coordinate old clones/backups and submit the GitHub Support cleanup request.
  A completed push does not erase cached commit views or outside copies.
  Arrange re-cloning; do not merge old branches back into the cleaned repository.
- [ ] Review [GITHUB_REMOTE_CLEANUP_REPORT.md](GITHUB_REMOTE_CLEANUP_REPORT.md),
  rerun scans before future pushes, and finish all required rotations.
  Vercel deployment remains a later, separately authorized action.
