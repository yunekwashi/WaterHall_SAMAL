"""Canonical account identifiers; no I/O, credentials, or account enumeration."""
import re
import unicodedata


def normalize_contact(value):
    if not isinstance(value, str) or not re.fullmatch(r'[+0-9()\s-]{7,30}', value):
        raise ValueError('Use a valid Philippine mobile number (09… or +639…).')
    digits = re.sub(r'\D', '', value)
    if digits.startswith('0063'):
        digits = '0' + digits[4:]
    elif digits.startswith('63'):
        digits = '0' + digits[2:]
    elif len(digits) == 10 and digits.startswith('9'):
        digits = '0' + digits
    if not re.fullmatch(r'09[0-9]{9}', digits):
        raise ValueError('Use a valid Philippine mobile number (09… or +639…).')
    return digits


def name_key(value):
    return ' '.join(unicodedata.normalize('NFKC', value).casefold().split())
