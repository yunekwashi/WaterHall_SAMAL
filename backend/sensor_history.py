"""Bounded, read-only history of stored operational readings (not live state)."""
import base64
import datetime as dt
import json
import math
import re

from werkzeug.exceptions import BadRequest

DEFAULT_PAGE_SIZE = 25
MAX_PAGE_SIZE = 50
MAX_RANGE_DAYS = 93
PARAMETERS = {'filter', 'start_date', 'end_date', 'utc_offset_minutes', 'page_size', 'cursor'}


def invalid(message):
    raise BadRequest(message)


def integer(value, name, low, high):
    if not re.fullmatch(r'-?\d{1,6}', value or ''):
        invalid(f'Invalid {name}')
    number = int(value)
    if not low <= number <= high:
        invalid(f'{name} must be between {low} and {high}')
    return number


def date(value):
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', value or ''):
        invalid('Dates must use YYYY-MM-DD')
    try:
        return dt.date.fromisoformat(value)
    except ValueError:
        invalid('Invalid date')


def finite(value):
    return type(value) in (int, float) and math.isfinite(value)


def stored_index(encoded):
    # Do not rerun current mapping, debounce, calibration or 60-second freshness.
    # Legacy NTU/ppm columns are never presented as operational indexes.
    try:
        record = json.loads(encoded) if encoded else None
    except (ValueError, TypeError):
        record = None
    if (isinstance(record, dict) and finite(record.get('value')) and record['value'] >= 0
            and record.get('status') in ('Normal', 'Elevated')):
        return record['value'], record['status']
    return None, 'Unavailable'


def serialize(row):
    turbidity, turbidity_status = stored_index(row.get('turbidity_index_json'))
    tds, tds_status = stored_index(row.get('tds_index_json'))
    return {'recorded_at': row['recorded_at'],
            'water_level_percentage': row['water_level_percentage'],
            'turbidity_index': turbidity, 'turbidity_status': turbidity_status,
            'tds_index': tds, 'tds_status': tds_status}


def history(db, args, now=None):
    if any(key not in PARAMETERS or len(args.getlist(key)) != 1 for key in args):
        invalid('Unknown or repeated history parameter')
    offset = integer(args.get('utc_offset_minutes', '480'), 'utc_offset_minutes', -840, 840)
    size = integer(args.get('page_size', str(DEFAULT_PAGE_SIZE)), 'page_size', 1, MAX_PAGE_SIZE)
    timezone = dt.timezone(dt.timedelta(minutes=offset))
    today = (now or dt.datetime.now(dt.timezone.utc)).astimezone(timezone).date()
    selected = args.get('filter', 'today')
    if selected == 'custom':
        start, end = date(args.get('start_date')), date(args.get('end_date'))
    else:
        if 'start_date' in args or 'end_date' in args:
            invalid('Date parameters require the custom filter')
        if selected == 'today':
            start = end = today
        elif selected == 'yesterday':
            start = end = today - dt.timedelta(days=1)
        elif selected == 'week':
            start = today - dt.timedelta(days=today.weekday())
            end = start + dt.timedelta(days=6)
        else:
            invalid('Invalid history filter')
    if end < start or (end - start).days >= MAX_RANGE_DAYS:
        invalid(f'Date range must be between 1 and {MAX_RANGE_DAYS} days')
    try:
        lower = dt.datetime.combine(start, dt.time(), timezone).astimezone(dt.timezone.utc)
        upper = dt.datetime.combine(end + dt.timedelta(days=1), dt.time(), timezone).astimezone(dt.timezone.utc)
        bounds = [lower.strftime('%Y-%m-%d %H:%M:%S'), upper.strftime('%Y-%m-%d %H:%M:%S')]
    except (ValueError, OverflowError):
        invalid('Date range is outside supported bounds')
    sql = '''SELECT reading_id, recorded_at, water_level_percentage,
                    turbidity_index_json, tds_index_json
             FROM reservoir_quality_readings
             WHERE recorded_at >= ? AND recorded_at < ?'''
    params = list(bounds)
    cursor = args.get('cursor')
    if cursor is not None:
        try:
            if not re.fullmatch(r'[A-Za-z0-9_-]{1,512}', cursor):
                raise ValueError()
            decoded = json.loads(base64.urlsafe_b64decode(cursor + '=' * (-len(cursor) % 4)))
            when, reading_id = decoded['at'], decoded['id']
            if (decoded['bounds'] != bounds or type(reading_id) is not int or not 1 <= reading_id <= 2147483647
                    or not isinstance(when, str)
                    or dt.datetime.strptime(when, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M:%S') != when
                    or not bounds[0] <= when < bounds[1]):
                raise ValueError()
        except (ValueError, TypeError, KeyError, UnicodeError):
            invalid('Invalid history cursor; restart from the first page')
        sql += ' AND (recorded_at < ? OR (recorded_at = ? AND reading_id < ?))'
        params.extend((when, when, reading_id))
    sql += ' ORDER BY recorded_at DESC, reading_id DESC LIMIT ?'
    params.append(size + 1)
    db.execute(sql, tuple(params))
    fetched = db.fetchall()
    rows, more = fetched[:size], len(fetched) > size
    next_cursor = None
    if more:
        last = rows[-1]
        encoded = json.dumps({'bounds': bounds, 'at': last['recorded_at'], 'id': last['reading_id']}, separators=(',', ':')).encode()
        next_cursor = base64.urlsafe_b64encode(encoded).decode().rstrip('=')
    return {'readings': [serialize(row) for row in rows], 'has_more': more,
            'next_cursor': next_cursor, 'page_size': size, 'filter': selected,
            'start_date': start.isoformat(), 'end_date': end.isoformat(),
            'utc_offset_minutes': offset}
