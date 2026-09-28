# WaterHall PostgreSQL schema version 2 rehearsal

Date: 2026-09-28.

Status: **PASS - migration checks, 90 PostgreSQL/backend tests, and final data comparisons.**
This replaces the earlier PostgreSQL "NOT RUN" finding for the synthetic rehearsal
only. It does not authorize or verify a production migration.

## Target and isolation

- User-confirmed disposable Neon resource: `waterhall-rehearsal`.
- The supplied direct endpoint was validated against the private connection file.
- A read-only catalog check confirmed no existing non-system relations before the
  rehearsal created its schemas. No production URL, credentials, database, clone,
  branch, or data was used.
- PostgreSQL version: **18.6** (Neon, aarch64 Linux).
- Python version: **3.12.10** in the existing isolated environment.
- Connections used `sslmode=verify-full`, the certifi CA bundle, and
  `channel_binding=require`. Inherited application/database settings were excluded
  and `.env` loading disabled in the rehearsal and test subprocesses.
- The actual private filename ends in `neon-rehearsal-url.txt.txt`. It contains a
  `DATABASE_URL_UNPOOLED` assignment. It was read without changing or printing it.

## Genuine version-1 baseline

The historical adapter was loaded from Git commit
`698261e5d0429fa8ab3bb8ae5d89f226b8da44f9`, rather than constructing version 2 and
removing its marker. Historical source SHA-256:
`fa790bde5337c7e34f7f95a7a168537d86a127058f0c0ee65ea9fdbdb975f8f7`.

The baseline contained **17 tables, 28 rows, 109 constraints, 23 indexes, and 13
sequences**. All rows were generated synthetic fixtures:

- 2 staff accounts; 1 purok; 4 households; 4 water meters; 4 bills.
- 2 payment collections.
- 1 row each in reservoir readings, flow readings, announcements, maintenance,
  payment settings, resident reports, push subscriptions, password resets,
  completed sync operations, push outbox, and the version-1 migration ledger.

Households included duplicate normalized contacts, an invalid contact, and a
missing contact. Bills included paid/unpaid records, zero, cents, and the supported
upper monetary boundary. Existing manual readings, historical pH/flow data, and
completed collection/operation identifiers were included.

## Checkpoint and recovery rehearsal

**PASS.** A local logical checkpoint captured every fixture row, column definition,
constraint, index, and sequence state. Its SHA-256 is:
`5fa9d0356b6572a7dc7fe9a04f3e9e458a07d850315947fb02cedf99ac079585`.

The checkpoint was read back from disk, restored into a separate newly created
version-1 schema, and compared with the original state. All captured state matched.
The recovery schema was also used for a deliberate failed-migration rollback test.

This is a verified recovery mechanism for these synthetic fixtures, not a general
production PostgreSQL backup. It does not replace a production backup covering
roles, privileges, extensions, external storage, and any additional database objects.

## First version-2 migration

**PASS.** The actual CLI entry point `python -m backend.manage migrate` ran against
the isolated primary rehearsal schema with production TLS enforcement.

The resulting state was **20 tables, 31 rows, 125 constraints, 26 indexes, and the
same 13 sequence states**. No original row or ID was lost or duplicated.

Exact changes from the genuine version-1 baseline:

- `households.account_status`: non-null text, default `approved`, with a check
  restricting values to `pending`, `approved`, and `rejected`.
- `billing_records.billing_snapshot`: nullable text; all legacy snapshots remained
  NULL.
- `resident_contact_claims`: contact primary key and nullable household foreign key
  with `ON DELETE SET NULL`.
- `login_attempts`: identifier-digest primary key, failure counter, lock expiration,
  and update timestamp; no login-attempt rows seeded.
- `billing_configuration`: singleton ID restricted to 1, rates JSON, version, and
  confirmation flag. One row inserted at version 1 with `confirmed=0`.
- Initial unconfirmed sample rates: base `120.00`, included consumption `10.000`,
  environmental fee `50.00`, excess rate `15.00`.
- One normalized legacy contact reservation. Duplicate households were retained;
  the lowest existing household ID received the reservation. Original contact
  strings were unchanged; invalid and missing contacts were skipped.
- One version-2 migration marker. The version-1 marker and timestamp were retained.
- Three primary-key indexes; six structural constraints plus ten explicit NOT NULL
  catalog entries on PostgreSQL 18. Every new constraint was validated.

## Existing data preservation

**PASS.** All original column values and IDs matched the baseline, including staff,
households, billing records, collection transaction IDs/amounts, reports, telemetry,
maintenance, payment settings, and completed operations. All 109 original
constraints, 23 indexes, and 13 sequence states were preserved.

Existing households became approved. Legacy bills kept their original totals,
readings, payment state, references, and dates; no historical breakdown was invented.
The genuine version-1 money columns were already `NUMERIC(14,2)` and did not change.

## Legacy monetary and Boolean conversions

**PASS** for separate synthetic variants using `NUMERIC(18,4)` and `DOUBLE PRECISION`.
Both were converted to `NUMERIC(14,2)` with these observed results:

- Bill `1.005` became `1.01`.
- Bill `2.004` became `2.00`.
- Bill `-1.005` became `-1.01`.
- Bill `9999.999` became `10000.00`.
- Collection `12.345` became `12.35`.
- Collection `-1.005` became `-1.01`.

Negative amounts here were deliberate legacy edge-case fixtures, not newly accepted
application billing input. No unrelated record values changed.

The variants also verified Boolean-to-integer conversion for maintenance/subscription
flags and removal of a legacy pH default. Existing historical pH values were retained.
These conditional older operations mean the full migration command is not strictly
additive for every possible legacy database.

## Deliberate failure and rollback

**PASS.** The test harness injected PostgreSQL division-by-zero immediately before
the version-2 marker, after schema additions and backfill work. Injection was in
memory; no application migration code was modified.

Full captured schema, data, constraints, indexes, and sequence state matched the
pre-failure snapshot after rollback. This passed for the normal version-1 baseline,
the restored recovery schema, and both legacy monetary variants, including rollback
of type/default changes. Subsequent successful migration remained possible.

## Second-run idempotency

**PASS.** A second invocation of the migration CLI produced identical captured schema
and data, including migration timestamps, contact claims, rates/version/confirmation,
IDs, and sequence states. Both legacy conversion variants also passed rerun comparison.

## PostgreSQL backend tests

**90 passed, 0 failed, 0 skipped; exit code 0.** The selected suite was:

```text
tests/test_finalization.py
tests/test_operations.py
tests/test_security.py
tests/test_registration.py
```

Tests use their existing unique disposable PostgreSQL schema fixture. The PostgreSQL
SQLite-import test uses a newly generated synthetic SQLite source only. Real browser,
Flutter, physical-device, and production runtime tests are outside this rehearsal.

The PostgreSQL SQLite-import integration test that was previously skipped now passed.
Coverage includes registration/approval, contact uniqueness, login lockout, billing
snapshots/rates, authorization, TLS connection mocks, collections/idempotency,
reports/photos, push handling, and migration repeatability.

Final primary-data and recovery-checkpoint comparisons: **PASS**. The backend tests
did not change the primary rehearsal state or the restored version-1 checkpoint.

## Harness corrections and local checks

Three rehearsal-only compatibility corrections were necessary:

1. Accept the private file's `DATABASE_URL_UNPOOLED` assignment without dotenv
   interpolation or changing the file.
2. Percent-encode spaces in libpq URL connection options; HTML-form `+` encoding was
   rejected by PostgreSQL. The first attempt stopped before any table creation;
   its sole empty schema was checked and removed without CASCADE.
3. Verify PostgreSQL 18's explicit NOT NULL constraint catalog entries alongside the
   existing structural constraints. The migration had succeeded; this corrected
   the verifier's expectation.

Local preparation checks passed: historical source validation, synthetic fixture
serialization, four private-file formats, seven invalid-target rejections, stronger
TLS enforcement, and libpq schema-option encoding. The current-tree secret scan
reported zero findings.

## Production migration assessment and prerequisites

The tested version-1-to-version-2 migration is **safe under the rehearsed synthetic
conditions**. No migration defect was found, and the PostgreSQL backend tests passed.
Production migration is **not yet cleared** because its actual schema, data, backups,
and operational conditions were deliberately not accessed or verified.

Even after a fully passing rehearsal, the remaining production prerequisites are:

1. Separately authorize a production read-only preflight and confirm its actual
   PostgreSQL version, schema/types/defaults/constraints, schema search path, ownership,
   and migration privileges against the tested baseline.
2. Preview any monetary rounding, overflow/non-finite values, legacy contact issues,
   and unexpected schema drift without printing personal data or credentials.
3. Create and verify a production recovery checkpoint/backup with a usable retention
   window and a reviewed recovery procedure.
4. Schedule a controlled write pause and reviewed lock/statement timeouts appropriate
   to real table sizes. This small synthetic run does not measure production locking,
   traffic, migration duration, or recovery of writes made after a checkpoint.
5. Authorize the production migration separately and coordinate the compatible
   application rollout. Confirm official billing rates before enabling new bills.

No production inspection or migration, Git commit/push, Vercel change/deployment,
or APK build was performed. Both pre-existing AndroidManifest.xml edits were verified
byte-for-byte unchanged. HEAD remains `698261e`; the index is empty. No application
source was changed by this rehearsal. Local rehearsal files changed/created are
`scripts/rehearse_postgres_v2.py` and this report.

## Artifacts

Detailed synthetic snapshots and machine-readable results are kept outside the
repository in:

`C:\Users\Windows\AppData\Local\Temp\waterhall-pg-rehearsal-aq5e5w2z`

The disposable schemas `wh_rehearsal_52f877cea032_primary`,
`wh_rehearsal_52f877cea032_recovery`, `wh_rehearsal_52f877cea032_numeric`, and
`wh_rehearsal_52f877cea032_floating` are retained for review; they were not
automatically deleted. This report excludes database URLs, passwords, tokens,
connection credentials, and synthetic credential values.
