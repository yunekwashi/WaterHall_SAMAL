# Admin receipt search, printing and PDF output — 2026-10-20

## Findings

- Empty By-name search previously called `search()` immediately. With an empty query,
  the existing API correctly omitted its name filter and returned eligible recipients.
  The UI now makes no recipient request until at least one non-whitespace character.
- Print was disabled until a successful Preview, not merely a recipient selection.
  The dialog did not explain that requirement. The user could not confirm whether a
  Preview had succeeded, so that manual failure cannot be attributed conclusively to
  popup blocking or a JavaScript exception. The valid-preview path invoked native
  Chrome printing in automated tests; a missing click listener/overlay was not found.
- The old handler waited for paid-record revalidation before calling `window.print()`
  in the modal's page. It offered no dedicated visible print view, user-gesture
  reservation or popup-blocked feedback. Those failure/recovery states are now tested.
- HTTPS verification also found a blank print-window resource wait. The final flow
  loads an explicit same-origin `receipt-print.html` and runs native printing in that
  document's own script/context. Its real `beforeprint` event updates the visible
  status; stylesheet/script/logo readiness is bounded instead of waiting indefinitely.
- No receipt PDF-download action existed. The Billing PDF export is a different report.

## Focused implementation

The existing six-action Billing Print dropdown is preserved. Within the receipt dialog:

- Blank/whitespace name input gives zero suggestions and no search request. One-letter,
  case-insensitive partial searching and duplicate household identifiers remain supported.
- Clearing input immediately aborts pending searches, hides matches and invalidates the
  selected household, preview and outputs. Late responses cannot restore stale results.
- No matches displays exactly `No matching recipients found.` Changing month or mode
  clears old matches/selection/output; All remains independent of name searching.
- Visible instructions explain: select a household, then Preview. Print Receipt and
  Download PDF stay disabled until a paid-record preview is verified. Both retain the
  existing bulk confirmation requirement for multiple receipts.
- **Print Receipt** reserves a dedicated read-only window synchronously during the click,
  then rechecks the selected paid records. Only an unchanged verified snapshot is rendered.
  The stylesheet/logo load before native printing is invoked. The window has a direct
  Print Receipt control and clear printer/Save-as-PDF instructions if automatic printing
  is suppressed. A blocked popup is reported visibly, with Download PDF still available.
- **Download PDF** repeats the same paid-record verification and compares it with Preview,
  then generates a real PDF locally from the same `receiptFields` function used for HTML.
  Names, household/meter, period, reference, amount, Manila payment date, receiver and
  transaction details retain their existing meaning. Missing legacy details stay
  `Not recorded`. No client-supplied amounts are sent to the backend or persisted.
- Changing/clearing scope, Cancel or ending the Admin session closes private print windows
  and disables stale output. If payment records change before output, the updated preview
  requires review again. No unpaid bill can become an official paid receipt.

PDF output uses locally hosted jsPDF 4.2.1 and embedded Roboto Regular with licenses and
provenance recorded in `admin_web/vendor/RECEIPT-PDF-SOURCES.md`. The official npm package
integrity was verified. No new backend package, route, business logic, schema or API
contract was introduced. The public logo is the only PDF resource fetched during output.
Receipt JS advances to `v=5` (receipt CSS remains `v=4`); PDF/print assets are separately versioned.

## Files

- `admin_web/index.html`
- `admin_web/receipts.js`
- `admin_web/receipt-pdf.js`
- `admin_web/receipt-print.css`
- `admin_web/receipt-print.html`
- `admin_web/receipt-print.js`
- `admin_web/vendor/jspdf-4.2.1.umd.min.js`
- `admin_web/vendor/jspdf-LICENSE.txt`
- `admin_web/vendor/receipt-font.js`
- `admin_web/vendor/receipt-font-LICENSE.txt`
- `admin_web/vendor/RECEIPT-PDF-SOURCES.md`
- `tests/test_receipts_browser.py`
- `WATERHALL_ADMIN_RECEIPT_OUTPUT_RELEASE_REPORT.md`

## Checks and evidence

Backend receipt/report regression: **25 passed**. Browser: **40 distinct cases passed**,
including the bounded print-resource-failure case. All 12 cases covering the changed
print path passed their final rerun. A production-origin HTTPS preflight also passed,
including real native `beforeprint` events and named/bulk PDF downloads. Final post-deploy
counts/status are recorded in the permanent release proof.
The original failed assertion and its passing rerun are retained: jsPDF's inert page-fit
destination is allowed; embedded JavaScript actions and attachments remain rejected.
No application logic changed to satisfy that assertion.

The permanent release evidence records actual results, committed file scope, secret/diff
checks, remote main, Vercel READY and deployed asset hashes. Browser cases cover empty and
whitespace input, one-letter/partial/case-insensitive matching, no-match text, selection
before/after Preview, live clearing, month changes and late search responses.

Real downloaded PDFs are parsed for correct fields, paid-only scope, zero amounts,
non-ASCII names, peso glyphs and missing dates. Single and bulk PDF pages are rendered and
visually inspected. Native Chrome `beforeprint` is observed for Billing Table and both
receipt paths. Popup blocking and a six-second verification delay are exercised. Receipt
windows close after selection invalidation. Desktop/mobile layouts and the original
six export/print actions are regression-tested. Database snapshots remain unchanged.

No production login attempts or financial writes are used for automated verification.
Production browser smoke uses public deployed assets and intercepted disposable API data.
Headless automation does not certify the physical Windows print-dialog appearance or a
printer job: the signed-in Admin Windows/Chrome check remains pending until confirmed.

Worker/Resident source and APKs, backend/authentication, billing/payment history, IoT,
freshness, notifications, shared hosted assets and the locked public landing page are
preserved. No mobile rebuild was performed. The previously deferred Resident phone
connectivity/Retry/session/draft verification remains pending.
