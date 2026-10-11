// Backend timestamps without an offset are UTC, as stored by WaterHall.
// Share display-only formatting between Admin and the mobile WebView UI.
(function (root) {
  'use strict';
  const dateFormat = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  const timeFormat = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
  const TELEMETRY_STALE_AFTER_MS = 60000;
  function parseTimestamp(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    let stamp = value.trim().replace(' ', 'T');
    if (/^\d{4}-\d{2}-\d{2}$/.test(stamp)) stamp += 'T00:00:00';
    if (!/(?:Z|[+-]\d{2}:?\d{2})$/i.test(stamp)) stamp += 'Z';
    // Older Android WebViews accept millisecond, rather than microsecond, precision.
    stamp = stamp.replace(/(\.\d{3})\d+/, '$1');
    const date = new Date(stamp);
    return Number.isFinite(date.getTime()) ? date : null;
  }
  function formatTimestamp(value, fallback = 'Awaiting data') {
    const date = parseTimestamp(value);
    return date ? dateFormat.format(date) + ' • ' + timeFormat.format(date) : fallback;
  }
  function renderTank(id, value, available) {
    const tank = document.getElementById(id);
    if (!tank) return;
    const valid = available && typeof value === 'number' && Number.isFinite(value);
    const level = valid ? Math.min(100, Math.max(0, value)) : 0;
    tank.style.setProperty('--water-level', level + '%');
    tank.classList.toggle('tank-unavailable', !valid);
    tank.setAttribute('aria-valuetext', valid ? level + '% water level' : 'Water level unavailable');
    if (valid) tank.setAttribute('aria-valuenow', String(level));
    else tank.removeAttribute('aria-valuenow');
  }
  function telemetryFreshness(data, now = Date.now()) {
    data = data && typeof data === 'object' ? data : {};
    const stamp = data.last_updated ?? data.recorded_at;
    // Require a complete timestamp for live data; formatting historical dates
    // remains unchanged. Reject rollover dates such as February 30.
    const parts = typeof stamp === 'string' && /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/i.exec(stamp.trim());
    const date = parts && Number(parts[2]) >= 1 && Number(parts[2]) <= 12 &&
      Number(parts[3]) >= 1 && Number(parts[3]) <= new Date(Date.UTC(Number(parts[1]), Number(parts[2]), 0)).getUTCDate() &&
      Number(parts[4]) < 24 && Number(parts[5]) < 60 && Number(parts[6]) < 60
      ? parseTimestamp(stamp) : null;
    const ageMs = date && Number.isFinite(now) ? now - date.getTime() : null;
    const fresh = data.has_reading !== false && data.is_fresh !== false &&
      ageMs !== null && ageMs >= 0 && ageMs <= TELEMETRY_STALE_AFTER_MS;
    return {fresh, hasReading: data.has_reading !== false && (data.has_reading === true || date !== null), ageMs};
  }
  function turbidityIndexState(data, now = Date.now()) {
    const fresh = telemetryFreshness(data, now).fresh;
    const value = data.turbidity_index;
    const valid = fresh &&
      typeof value === 'number' && Number.isFinite(value) && value >= 0 &&
      ['Normal', 'Elevated'].includes(data.turbidity_index_status);
    return {value: valid ? value : null, status: valid ? data.turbidity_index_status : 'Unavailable'};
  }
  root.WaterHallDisplay = Object.freeze({parseTimestamp, formatTimestamp, renderTank,
    TELEMETRY_STALE_AFTER_MS, telemetryFreshness, turbidityIndexState});
})(window);
