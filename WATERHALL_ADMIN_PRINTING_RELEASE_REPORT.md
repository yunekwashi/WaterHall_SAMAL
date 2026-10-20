# Admin Billing & Collections printing correction — 2026-10-20

## Confirmed root cause

The production Billing & Collections tab contained two different Print controls.
The user confirmed the failing control was in **Synchronized Field Collections**.
Its `btn-print-col` listener called generic `window.print()`; it never opened the
Billing Statements dropdown. Only `btn-billing-print` owned the receipt dropdown.
Thus the control the user clicked could not perform the requested menu actions.
The dropdown also silently returned while `hasAdminData` was false. No event-binding,
stacking, hit-target or JavaScript exception was found on the tested Billing menu.

## Focused correction

Billing & Collections now has one visible Print trigger, beside the billing filters.
The old audit-log controls and standalone Billing CSV/XLSX/PDF controls are removed.
The dropdown contains exactly these six working actions:

1. **Export PDF** — existing authenticated export handler; filtered, downloadable PDF.
2. **Export Excel (XLSX)** — same handler; valid downloadable XLSX workbook.
3. **Export CSV** — same handler; valid downloadable CSV.
4. **Print Billing Table** — existing filtered print-only table and native browser print.
5. **Print Receipt by Name** — substring search, explicit household selection, preview and print.
6. **Print All Receipts** — selected-period eligible paid receipts, preview and bulk confirmation.

Exports and table printing use the current billing month, purok and payment-status
filters. Receipt eligibility remains paid-only regardless of the table status filter;
receipts retain month/purok scope, duplicate-name disambiguation and print-time
revalidation. Existing export/authentication handlers and all backend code are unchanged.
The collections audit table and its existing filters remain available.

Menu opening no longer silently waits for billing data. The table action is disabled
with an explicit loading message until that data is ready; exports/receipts fetch their
own authenticated records. Table consistency errors now produce a visible message.
Keyboard navigation skips disabled items, supports arrows/Home/End/Escape/Tab and
outside dismissal. The menu remains within the viewport while scrolling, with an
independent scroll area on short displays. Asset versions advance to `receipts.*?v=3`.

## Files changed

- `admin_web/index.html`
- `admin_web/receipts.js`
- `admin_web/receipts.css`
- `tests/test_receipts_browser.py`
- `WATERHALL_ADMIN_PRINTING_RELEASE_REPORT.md`

## Verification

- Receipt/report backend regressions: **25 passed**.
- Focused Chrome browser regressions: **27 distinct cases passed**.
  The full run passed 26 cases; the last test incorrectly scrolled the desktop element
  at a mobile breakpoint. After correcting only that test to scroll the document too,
  its targeted rerun passed. Both original and rerun evidence are retained.
- **18 actual downloads**: PDF/XLSX/CSV at 390px and 1280px, each covering October paid,
  September/purok filtering and an empty purok. File signatures/structure, MIME type,
  filenames and parsed billing contents verified. Unpaid/other-period records excluded.
- Table, named receipt and all-receipts actions each invoke **native Chrome printing**,
  observed with `beforeprint`; print-media PDFs also verify filtered amounts/receipt pages.
  Headless automation cannot certify the physical OS print-dialog appearance or printer.
- Responsive dropdown hit-testing and screenshots: 320, 390, 768 and 1280px; short-screen
  scrolling, keyboard navigation, loading state, logout cleanup, duplicate names,
  receipt confirmation and changed-paid-record revalidation verified.
- Disposable database snapshots unchanged by exports, preview and printing.
- JavaScript syntax, static asset build and `git diff --check`: **PASS**.

The release audit records the secret/private-file check before commit. Deployment
commit, remote main hash, READY state and hosted asset hashes are recorded in the
permanent `WATERHALL_RELEASE/reports/admin-print-six-actions-20261020/` evidence.

No production login attempts, payment writes, billing updates, account resets or schema
changes are part of this correction. Backend, IoT, freshness, notifications, shared
mobile assets, both APKs and locked landing-page sources/assets remain unchanged.

## Manual checks

Signed-in Admin production retest remains pending until the user confirms this release.
Reload once, select the billing filters, test all six actions and cancel printing afterward.
Resident 1.3.2+8 physical phone/network/Retry/session/draft verification remains **PENDING**,
explicitly deferred by the user; no mobile changes or rebuilds were made for this task.
