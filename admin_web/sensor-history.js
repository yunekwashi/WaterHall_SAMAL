/* Read-only history: no heartbeat, live-state mutation or freshness conversion. */
(() => {
  const byId = id => document.getElementById(id);
  const tab = byId('tab-sensor-history');
  const period = byId('history-period');
  const rows = byId('sensor-history-tbody');
  const message = byId('history-message');
  let controller = null, generation = 0, busy = false;
  let cursors = [null], nextCursor = null;
  let applied = null;
  const timestampFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit'
  });

  function buttons() {
    byId('history-previous').disabled = busy || cursors.length < 2;
    byId('history-next').disabled = busy || !nextCursor;
    byId('history-apply').disabled = byId('history-refresh').disabled = busy;
  }
  function cancel() {
    generation++;
    controller?.abort();
    controller = null;
    busy = false;
    buttons();
  }
  function dates() {
    const custom = period.value === 'custom';
    for (const part of ['start', 'end']) {
      byId('history-' + part + '-group').hidden = !custom;
      byId('history-' + part).disabled = !custom;
    }
  }
  function reset() {
    cancel();
    rows.replaceChildren();
    cursors = [null]; nextCursor = null; applied = null;
    period.value = 'today';
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    byId('history-start').value = byId('history-end').value = today;
    dates();
    byId('history-page').textContent = 'Page 1 · 25 readings per page';
    message.textContent = "Open history to load today's readings.";
    tab.removeAttribute('aria-busy');
    buttons();
  }
  function filters() {
    const query = new URLSearchParams({filter: period.value, page_size: '25',
      utc_offset_minutes: String(-new Date().getTimezoneOffset())});
    if (period.value === 'custom') {
      query.set('start_date', byId('history-start').value);
      query.set('end_date', byId('history-end').value);
    }
    return query.toString();
  }
  function cell(row, value, status = false) {
    const td = document.createElement('td');
    if (status) {
      const badge = document.createElement('span');
      badge.className = 'badge' + (value === 'Normal' ? ' success' : value === 'Elevated' ? ' warning' : '');
      badge.textContent = value;
      td.append(badge);
    } else td.textContent = value;
    row.append(td);
  }
  function number(value, suffix = '') {
    return typeof value === 'number' && Number.isFinite(value) ?
      (suffix ? String(value) : value.toFixed(2)) + suffix : 'N/A';
  }
  async function load(query = filters(), proposed = [null]) {
    cancel();
    if (!isCurrentAdminSession(jwtToken, sessionGeneration)) return;
    const requestGeneration = generation;
    const token = jwtToken, session = sessionGeneration;
    const current = () => requestGeneration === generation && isCurrentAdminSession(token, session);
    const abort = new AbortController();
    controller = abort; busy = true; buttons();
    tab.setAttribute('aria-busy', 'true');
    rows.replaceChildren();
    message.textContent = 'Loading sensor readings…';
    const params = new URLSearchParams(query);
    if (proposed.at(-1)) params.set('cursor', proposed.at(-1));
    try {
      const response = await apiFetch('/api/iot/history?' + params, {
        headers: {Authorization: 'Bearer ' + token}, signal: abort.signal, isCurrent: current, timeout: 15000
      });
      const data = await readAdminResponse(response, abort, 15000);
      if (!current()) return;
      if (!response.ok) throw new Error(response.status === 400 ? data.msg : 'History could not load. Please retry.');
      const fragment = document.createDocumentFragment();
      for (const reading of data.readings) {
        const row = document.createElement('tr');
        const recorded = WaterHallDisplay.parseTimestamp(reading.recorded_at);
        cell(row, recorded ? timestampFormat.format(recorded) : 'N/A');
        cell(row, number(reading.water_level_percentage, '%'));
        cell(row, number(reading.turbidity_index));
        cell(row, reading.turbidity_status, true);
        cell(row, number(reading.tds_index));
        cell(row, reading.tds_status, true);
        fragment.append(row);
      }
      rows.replaceChildren(fragment);
      cursors = proposed; applied = query; nextCursor = data.next_cursor;
      byId('history-page').textContent = `Page ${cursors.length} · 25 readings per page`;
      message.textContent = data.readings.length ?
        `${data.start_date} through ${data.end_date} · ${data.readings.length} readings · newest first` :
        'No sensor readings for this date range.';
    } catch (error) {
      if (current() && !abort.signal.aborted) message.textContent = error.message || 'History could not load. Please retry.';
      else if (current()) message.textContent = 'History request timed out. Please retry.';
      if (current()) nextCursor = null;
    } finally {
      if (requestGeneration === generation) {
        busy = false; controller = null; tab.removeAttribute('aria-busy'); buttons();
      }
    }
  }
  period.addEventListener('change', dates);
  byId('sensor-history-filters').addEventListener('submit', event => {event.preventDefault(); load();});
  byId('history-refresh').addEventListener('click', () => load());
  byId('history-next').addEventListener('click', () => load(applied, [...cursors, nextCursor]));
  byId('history-previous').addEventListener('click', () => load(applied, cursors.slice(0, -1)));
  document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
    if (item.dataset.tab === 'tab-sensor-history') load();
    else { cancel(); tab.removeAttribute('aria-busy'); }
  }));
  window.WaterHallSensorHistory = {reset};
  reset();
})();
