# GitHub sensitive-data cleanup request draft

**GITHUB SERVER-SIDE PURGE: MANUAL FOLLOW-UP REQUIRED**

Prepared for the repository owner to submit privately to
[GitHub Support](https://support.github.com/contact). This draft has **not** been
sent, and no server-side purge has been confirmed. Do not attach secret values,
database files, old bundles or screenshots containing private records.

## Repository and completed cleanup

- Owner/name: `yunekwashi/WaterHall_SAMAL`.
- Repository: `https://github.com/yunekwashi/WaterHall_SAMAL.git`.
- Repository ID: `1280348507`; existing public repository retained.
- Authorized branch replacement completed at
  `2026-09-24T17:50:29.559545+00:00` (25 September locally).
- The only branch, `refs/heads/main`, changed from
  `ee096f488c88edaf384192f401b64f01af69b2c6` to
  `b880a18a16680780ee6d7f6bd023b408068b5231` using an explicit expected-SHA lease.
  A subsequent documentation-only fast-forward records the verification results.
- Remote default branch remains `main`. No tags, other branches, advertised PR
  refs, pull requests (all states), or forks were found before/after replacement.
- A fresh HTTPS clone matched the sanitized local tree/history and passed current
  source, all-history and all-reachable-blob scans. Normal branch/tag history is clean.
- The original first changed commit recorded by git-filter-repo is
  `9ccb56cbed1c5fe53e5b52a2b0b6933ca1dccf0e`; its rewritten counterpart is
  `262ea63cae1dc5cd92926949e0b9d8e5e72c4490`.
- Number of known affected pull requests: **0**. No orphaned LFS objects were
  reported; this repository was not using Git LFS in the inspected history.

## Sensitive material removed

The published history contained Wi-Fi identifiers/passwords, JWT/Flask signing
defaults, a default account password, and private SQLite/database/API response
exports containing household/account information and password hashes. Credentials
were redacted and private datasets removed throughout rewritten history,
including older filenames and generated browser bundles containing legacy data.

Affected private-data paths included `waterhall.db`, `database/waterhall.db`,
`database/database_contents.txt`, `database_contents.txt`, `test_data/*.json`,
and the root-level `api_test.json`, `api_test2.json`, `assets_extra.json`,
`response.json`. Legacy `out.js`, `build_artifacts/out.js` and historical
`web/app.js` were removed; only the verified current browser bundle was restored.

A local IDE snapshot separately contained previous IoT/VAPID private material.
That local ref was removed; those values were not established as published in
the old remote `main`. Do not represent that local finding as proven GitHub exposure.

## Evidence that server-side follow-up remains necessary

After successful branch replacement:

- Authenticated `GET /repos/yunekwashi/WaterHall_SAMAL/git/commits/ee096f488c88edaf384192f401b64f01af69b2c6`
  still returned **HTTP 200** at `2026-09-24T17:50:53.530963+00:00`.
- A public **HEAD-only** request to the old commit's GitHub web route returned
  **HTTP 200** at `2026-09-24T17:51:38.446152+00:00`. Its body/diff was not retrieved.
- The old commit is absent from every advertised branch/tag and the fresh clone.
  These observations show retained object/web-route accessibility; they do not
  establish permanent deletion or reveal the provider's internal retention state.
- Historical GitHub Actions records still reference old commits, including run
  `35736037003` for the former remote tip. Review retention of those run records
  and logs as part of the assessment. The repository's current artifact and
  Actions-cache listings are empty. Historical logs were not inspected for
  sensitive content or deleted by this cleanup.

Please assess and purge retained sensitive commit objects and cached views,
perform server-side garbage collection, and confirm whether any hidden refs or
repository-network copies retain the affected data. If internal pull-request
references exist despite the empty public/API listing, please identify and
dereference the affected refs as appropriate. No known fork owners need contact
at the time of inspection; outside clones/backups cannot be enumerated by us.

## Rotation and limits

All affected credentials remain **MANUAL ROTATION REQUIRED**. None was marked
rotated by this task. The operator must complete
[CREDENTIAL_ROTATION_CHECKLIST.md](CREDENTIAL_ROTATION_CHECKLIST.md) separately.
The private household/account data exposure cannot be undone by credential rotation.

GitHub documents that old objects can remain through cached views, PRs and forks
after a rewrite, and that Support determines eligibility for sensitive-data
removal. Rotation remains necessary even if Support purges retained objects.
See [GitHub's sensitive-data removal guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

Before submitting, the owner should update the private ticket with rotation
completion dates and any affected private-data details Support specifically
requests through a secure channel. Do not commit those details to this repository.
