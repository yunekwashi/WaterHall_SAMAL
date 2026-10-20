/* Read-only paid-bill printing. No payment or transaction mutation requests. */
(() => {
  const create = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const openButton = document.getElementById('btn-print-receipts');
  const allButton = document.getElementById('btn-print-all-receipts');
  const printTrigger = document.getElementById('btn-billing-print');
  const printMenu = document.getElementById('billing-print-menu');
  const printOptions = Array.from(printMenu.querySelectorAll('[role="menuitem"]'));
  // Keep the menu clear of scrolling/backdrop-filter containers without changing them.
  document.body.append(printMenu);
  function closePrintMenu(restoreFocus = false) {
    printMenu.hidden = true; printTrigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) printTrigger.focus({preventScroll: true});
  }
  function positionPrintMenu() {
    if (printMenu.hidden) return false;
    const anchor = printTrigger.getBoundingClientRect();
    if (!anchor.width || anchor.bottom <= 0 || anchor.top >= innerHeight || anchor.right <= 0 || anchor.left >= innerWidth) {
      closePrintMenu(); return false;
    }
    const menu = printMenu.getBoundingClientRect();
    printMenu.style.left = Math.max(12, Math.min(anchor.right - menu.width, innerWidth - menu.width - 12)) + 'px';
    const below = anchor.bottom + 8;
    printMenu.style.top = (below + menu.height <= innerHeight - 12 ? below : Math.max(12, anchor.top - menu.height - 8)) + 'px';
    return true;
  }
  function showPrintMenu(last = false) {
    if (!jwtToken || !hasAdminData) return;
    printMenu.hidden = false;
    if (!positionPrintMenu()) return;
    printTrigger.setAttribute('aria-expanded', 'true');
    printOptions[last ? printOptions.length - 1 : 0].focus({preventScroll: true});
  }
  printTrigger.addEventListener('click', () => printMenu.hidden ? showPrintMenu() : closePrintMenu());
  printTrigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); showPrintMenu(event.key === 'ArrowUp');
    } else if (event.key === 'Escape') closePrintMenu(true);
  });
  printMenu.addEventListener('keydown', event => {
    const index = printOptions.indexOf(document.activeElement);
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % printOptions.length;
    else if (event.key === 'ArrowUp') next = (index + printOptions.length - 1) % printOptions.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = printOptions.length - 1;
    else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closePrintMenu(true); return; }
    else if (event.key === 'Tab') { closePrintMenu(true); return; }
    if (next !== undefined) { event.preventDefault(); printOptions[next].focus(); }
  });
  // Close before the existing table-print callback or either receipt action runs.
  printMenu.addEventListener('click', () => closePrintMenu(), true);
  document.addEventListener('pointerdown', event => {
    if (!printTrigger.contains(event.target) && !printMenu.contains(event.target)) closePrintMenu();
  });
  document.addEventListener('scroll', event => { if (!printMenu.contains(event.target)) positionPrintMenu(); }, true);
  window.addEventListener('resize', positionPrintMenu);

  const modal = create('div', undefined, 'modal-overlay receipt-modal');
  modal.id = 'receipt-modal'; modal.hidden = true;
  modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'receipt-title');
  const card = create('div', undefined, 'modal');
  const title = create('h2', 'Print receipts'); title.id = 'receipt-title';
  const note = create('p', 'Paid billing records only. Printing does not record or change a payment. Missing legacy details remain “Not recorded”.');
  const controls = create('div', undefined, 'receipt-controls');
  const field = (label, element) => { const wrap = create('label', label); wrap.append(element); controls.append(wrap); return element; };
  const month = field('Billing month', create('input')); month.type = 'month'; month.id = 'receipt-month';
  const mode = field('Recipient', create('select')); mode.id = 'receipt-mode';
  mode.append(new Option('By name', 'name'), new Option('All', 'all'));
  const name = field('Search recipient name', create('input')); name.type = 'search'; name.id = 'receipt-search'; name.autocomplete = 'off';
  const matches = create('div', undefined, 'receipt-matches'); matches.id = 'receipt-matches';
  const more = create('button', 'More matches', 'btn btn-secondary'); more.type = 'button'; more.hidden = true;
  const selected = create('p'); selected.id = 'receipt-selected';
  const message = create('p'); message.id = 'receipt-message'; message.setAttribute('role', 'status');
  const preview = create('div', undefined, 'receipt-preview'); preview.id = 'receipt-preview';
  const confirmation = create('label', undefined, 'receipt-confirmation'); confirmation.hidden = true;
  const check = create('input'); check.type = 'checkbox'; check.id = 'receipt-bulk-confirm';
  const confirmText = create('span'); confirmation.append(check, confirmText);
  const actions = create('div', undefined, 'form-actions');
  const cancel = create('button', 'Cancel', 'btn btn-secondary'); cancel.type = 'button'; cancel.id = 'receipt-cancel';
  const previewButton = create('button', 'Preview', 'btn'); previewButton.type = 'button'; previewButton.id = 'receipt-preview-button';
  const print = create('button', 'Print', 'btn'); print.type = 'button'; print.id = 'receipt-print'; print.disabled = true;
  actions.append(cancel, previewButton, print);
  card.append(title, note, controls, matches, more, selected, message, preview, confirmation, actions);
  modal.append(card); document.body.append(modal);
  const paper = create('div'); paper.id = 'receipt-print-area'; document.body.append(paper);
  let owner, controller, debounce, selectedHouse, snapshot, scope, busy = false, searchVersion = 0, matchPage = 1, purok = 'All';
  const current = () => owner && owner.token === jwtToken && owner.generation === sessionGeneration && !modal.hidden;
  const clearPaper = () => { document.body.classList.remove('receipt-printing', 'billing-table-printing'); paper.replaceChildren(); };
  const clearPreview = () => {
    snapshot = null; scope = null; preview.replaceChildren(); check.checked = false;
    confirmation.hidden = true; print.disabled = true; clearPaper();
  };
  const enabled = () => {
    previewButton.disabled = busy || !(mode.value === 'all' || selectedHouse);
    print.disabled = busy || !snapshot?.length || (snapshot.length > 1 && !check.checked);
    for (const element of [mode, month, name, check]) element.disabled = busy;
  };
  function close() {
    closePrintMenu();
    controller?.abort(); clearTimeout(debounce); searchVersion++;
    modal.hidden = true; modal.classList.remove('active');
    clearPreview(); matches.replaceChildren(); selectedHouse = null; selected.textContent = ''; name.value = ''; owner = null;
    busy = false; printTrigger.focus({preventScroll: true});
  }
  async function request(params) {
    if (!current()) throw new Error('Session changed');
    const own = owner;
    controller?.abort(); const abort = new AbortController(); controller = abort;
    const timeout = setTimeout(() => abort.abort(), 30000);
    try {
      const response = await apiFetch('/api/admin/receipts?' + new URLSearchParams(params), {
        headers: {Authorization: 'Bearer ' + own.token}, cache: 'no-store', signal: abort.signal
      });
      if (!response.ok) throw new Error('Receipts unavailable');
      const data = await response.json();
      if (!current() || owner !== own) throw new Error('Session changed');
      if (data.status !== 'success' || !Number.isSafeInteger(data.total) || data.total < 0) throw new Error('Invalid receipt response');
      return data;
    } finally { clearTimeout(timeout); }
  }
  function filters() {
    return {billing_month: month.value, purok, ...(mode.value === 'name' ? {house_id: selectedHouse?.house_id} : {})};
  }
  async function search(append = false) {
    if (!current() || mode.value !== 'name' || busy) return;
    const version = ++searchVersion;
    if (!append) { matchPage = 1; matches.replaceChildren(); }
    more.hidden = true;
    try {
      const data = await request({billing_month: month.value, purok, search: name.value.trim(), view: 'recipients', page: matchPage, limit: 25});
      if (version !== searchVersion || !current()) return;
      if (!Array.isArray(data.recipients)) throw new Error('Invalid recipients');
      for (const row of data.recipients) {
        const button = create('button', `${row.name} — ${row.house_id} (${row.receipt_count} receipts)`, 'btn btn-secondary');
        button.type = 'button'; button.dataset.houseId = row.house_id;
        button.addEventListener('click', () => {
          clearTimeout(debounce); searchVersion++;
          selectedHouse = row; selected.textContent = `${row.name} — ${row.house_id}`;
          matches.replaceChildren(); more.hidden = true; clearPreview(); message.textContent = ''; enabled();
        });
        matches.append(button);
      }
      more.hidden = !data.has_more;
      if (!data.total) matches.textContent = 'No eligible paid records match this name and period.';
    } catch (_) { if (current() && version === searchVersion) message.textContent = 'Unable to load recipients. Check the connection and try again.'; }
  }
  async function readAll(params) {
    const records = [], seen = new Set(); let total;
    for (let page = 1; ; page++) {
      const data = await request({...params, page, limit: 50});
      if (total !== undefined && total !== data.total) throw new Error('Records changed');
      total = data.total;
      if (!Array.isArray(data.receipts)) throw new Error('Invalid receipts');
      for (const row of data.receipts) {
        if (seen.has(row.bill_id) || !/^BILL-\d+$/.test(row.bill_id) || row.status !== 'Paid' ||
            row.billing_month !== params.billing_month || !/^[0-9]+\.[0-9]{2}$/.test(row.amount_paid)) throw new Error('Invalid paid record');
        seen.add(row.bill_id); records.push(row);
      }
      if (!data.has_more) break;
      if (!data.receipts.length) throw new Error('Incomplete receipts');
    }
    if (records.length !== total) throw new Error('Incomplete receipts');
    return records;
  }
  function receipt(row) {
    const sheet = create('section', undefined, 'receipt-sheet');
    const header = create('header', undefined, 'header');
    const logo = create('img'); logo.src = '/admin/logo.png'; logo.alt = 'WaterHall';
    header.append(logo, create('h3', 'WaterHall — Payment receipt'));
    const table = create('table');
    const transactions = row.transactions.map(tx => [tx.reference, tx.method].filter(Boolean).join(' / ')).join('; ');
    for (const [label, value] of [
      ['Recipient', row.name], ['Household', row.house_id], ['Meter / account', row.account_number],
      ['Billing period', row.billing_month], ['Bill reference', row.bill_id], ['Status', row.status],
      ['Amount paid', '₱' + row.amount_paid], ['Payment date', row.payment_date ? WaterHallDisplay.formatTimestamp(row.payment_date) : null],
      ['Received by', row.received_by], ['Collection transaction reference / method', transactions]
    ]) {
      const tr = create('tr'); tr.append(create('th', label), create('td', value || 'Not recorded')); table.append(tr);
    }
    sheet.append(header, table); return sheet;
  }
  function showPreview(records, params) {
    snapshot = records; scope = {...params}; check.checked = false;
    preview.replaceChildren(...records.map(receipt));
    message.textContent = `${records.length} receipt${records.length === 1 ? '' : 's'} selected · ${params.billing_month}`;
    confirmation.hidden = records.length <= 1;
    confirmText.textContent = `Confirm printing all ${records.length} selected receipts.`;
    enabled();
  }
  async function loadPreview() {
    if (busy || !current() || !(mode.value === 'all' || selectedHouse)) return;
    const own = owner;
    searchVersion++; clearTimeout(debounce); clearPreview(); busy = true; enabled(); message.textContent = 'Loading verified paid records…';
    try { const params = filters(); showPreview(await readAll(params), params); }
    catch (_) { if (current() && owner === own) { clearPreview(); message.textContent = 'Unable to verify receipts. Check the period/connection and preview again.'; } }
    finally { if (owner === own) { busy = false; enabled(); } }
  }
  function printBillingTable() {
    if (!jwtToken || !hasAdminData) return;
    clearPaper();
    const source = document.getElementById('admin-billing-tbody');
    const panel = source.closest('.glass-panel').cloneNode(true);
    const tbody = panel.querySelector('#admin-billing-tbody');
    const monthFilter = document.getElementById('export-filter-bill-month').value;
    const purokFilter = document.getElementById('export-filter-bill-purok').value;
    const statusFilter = document.getElementById('export-filter-bill-status').value;
    const households = new Map(globalData.households.map(row => [row.house_id, row]));
    const originalRows = new Map(Array.from(source.rows).map(row => [row.cells[0]?.textContent.trim(), row]));
    const records = globalData.billingRecords.filter(row =>
      (!monthFilter || row.billing_month === monthFilter) &&
      (statusFilter === 'All' || row.status === statusFilter) &&
      (purokFilter === 'All' || households.get(row.house_id)?.purok === purokFilter));
    // Copy verified displayed values; never reconstruct amounts or mutate the live table.
    if (records.some(row => !originalRows.has(row.bill_id))) return;
    tbody.replaceChildren(...records.map(row => originalRows.get(row.bill_id).cloneNode(true)));
    if (!records.length) {
      const tr = create('tr'), td = create('td', 'No billing statements match the selected filters.');
      td.colSpan = 8; tr.append(td); tbody.append(tr);
    }
    const header = document.querySelector('.main-content > .header').cloneNode(true);
    const context = create('p', `Billing month: ${monthFilter || 'All'} | Purok: ${purokFilter} | Status: ${statusFilter}`);
    for (const copy of [header, panel]) {
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    }
    paper.replaceChildren(header, context, panel);
    document.body.classList.add('billing-table-printing');
    try { window.print(); } catch (_) { clearPaper(); }
  }
  document.getElementById('btn-print-billing-table').addEventListener('click', printBillingTable);
  function openReceipts(kind) {
    if (!jwtToken || !hasAdminData) return;
    closePrintMenu(); controller?.abort(); clearTimeout(debounce); searchVersion++;
    owner = {token: jwtToken, generation: sessionGeneration}; selectedHouse = null; busy = false;
    mode.value = kind; name.value = ''; selected.textContent = ''; matches.replaceChildren(); more.hidden = true;
    name.closest('label').hidden = kind === 'all';
    month.value = document.getElementById('export-filter-bill-month').value || new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit'}).format(new Date());
    purok = document.getElementById('export-filter-bill-purok').value || 'All';
    clearPreview(); message.textContent = ''; modal.hidden = false; modal.classList.add('active'); enabled();
    if (kind === 'all') loadPreview().then(() => { if (current()) (confirmation.hidden ? previewButton : check).focus(); });
    else { name.focus(); search(); }
  }
  openButton.addEventListener('click', () => openReceipts('name'));
  allButton.addEventListener('click', () => openReceipts('all'));
  name.addEventListener('input', () => { searchVersion++; controller?.abort(); matches.replaceChildren(); more.hidden = true; selectedHouse = null; selected.textContent = ''; clearPreview(); enabled(); clearTimeout(debounce); debounce = setTimeout(() => search(), 200); });
  mode.addEventListener('change', () => { searchVersion++; controller?.abort(); selectedHouse = null; selected.textContent = ''; matches.replaceChildren(); more.hidden = true; name.closest('label').hidden = mode.value === 'all'; clearPreview(); enabled(); if (mode.value === 'name') search(); });
  month.addEventListener('change', () => { selectedHouse = null; selected.textContent = ''; clearPreview(); enabled(); if (mode.value === 'name') search(); });
  more.addEventListener('click', () => { matchPage++; search(true); });
  check.addEventListener('change', enabled); previewButton.addEventListener('click', loadPreview);
  print.addEventListener('click', async () => {
    if (print.disabled || !current()) return;
    const own = owner;
    busy = true; enabled();
    try {
      const fresh = await readAll(scope);
      if (JSON.stringify(fresh) !== JSON.stringify(snapshot)) { showPreview(fresh, scope); message.textContent += ' · Records changed; review and confirm again.'; return; }
      paper.replaceChildren(...fresh.map(receipt)); document.body.classList.add('receipt-printing'); window.print();
    } catch (_) { if (current() && owner === own) { clearPreview(); message.textContent = 'Printing stopped: receipts could not be verified. Preview again.'; } }
    finally { if (owner === own) { busy = false; enabled(); } }
  });
  cancel.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (!modal.hidden && e.key === 'Escape') close(); });
  window.addEventListener('afterprint', clearPaper);
  window.addEventListener('waterhall-admin-session-ending', close);
  window.addEventListener('pagehide', close);
  window.addEventListener('storage', e => { if (e.key === 'admin_jwt') close(); });
})();
