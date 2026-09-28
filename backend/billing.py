"""Admin-configured decimal tariffs and immutable per-bill calculation snapshots."""
import json
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from flask import abort

FIELDS = ('base_rate', 'included_m3', 'environmental_fee', 'excess_rate')
LEGACY_SAMPLES = {'base_rate': '120.00', 'included_m3': '10.000', 'environmental_fee': '50.00', 'excess_rate': '15.00'}


def decimal_value(value, field, places=2):
    try:
        if isinstance(value, bool):
            raise ValueError()
        result = Decimal(str(value))
        quantum = Decimal(10) ** -places
        if not result.is_finite() or result < 0 or result > 1000000 or result != result.quantize(quantum):
            raise ValueError()
        return result.quantize(quantum)
    except (InvalidOperation, ValueError, TypeError):
        abort(400, description=f'{field} must be a non-negative number with at most {places} decimal places.')


def read_config(db, lock=False):
    db.execute('SELECT * FROM billing_configuration WHERE config_id = 1' + (' FOR UPDATE' if lock and db.is_pg else ''))
    row = db.fetchone()
    data = json.loads(row['rates_json'])
    return {**data, 'version': row['version'], 'configured': bool(row['confirmed'])}


def update_config(db, data):
    if set(data) != set(FIELDS):
        abort(400, description='Provide base rate, included consumption, environmental fee, and excess rate.')
    rates = {key: str(decimal_value(data[key], key.replace('_', ' '), 3 if key == 'included_m3' else 2)) for key in FIELDS}
    db.execute('UPDATE billing_configuration SET rates_json = ?, version = version + 1, confirmed = 1 WHERE config_id = 1', (json.dumps(rates),))
    return read_config(db)


def calculate(config, previous, current):
    if not config['configured']:
        abort(409, description='Admin must confirm billing rates before issuing new bills.')
    previous = decimal_value(previous, 'Previous reading', 3)
    current = decimal_value(current, 'Current reading', 3)
    if current < previous:
        abort(400, description='Current reading cannot be below previous reading. Ask Admin about meter correction.')
    usage = current - previous
    excess = max(Decimal(0), usage - Decimal(config['included_m3']))
    extra = (excess * Decimal(config['excess_rate'])).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)
    total = Decimal(config['base_rate']) + extra + Decimal(config['environmental_fee'])
    if total > Decimal('999999999999.99'):
        abort(400, description='Calculated bill exceeds the supported amount.')
    return {**config, 'previous_reading': str(previous), 'current_reading': str(current),
            'consumption': str(usage), 'excess_m3': str(excess), 'excess_charge': str(extra), 'total_due': str(total)}
