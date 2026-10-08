// Backend timestamps without an offset are UTC, as stored by WaterHall.
// Share display-only formatting between Admin and the mobile WebView UI.
(function (root) {
  'use strict';
  const dateFormat = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  const timeFormat = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
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
  root.WaterHallDisplay = Object.freeze({parseTimestamp, formatTimestamp, renderTank});
})(window);
