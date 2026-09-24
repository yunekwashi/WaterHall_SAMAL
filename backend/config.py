"""Environment-only configuration; production fails closed before serving requests."""
import os
import secrets
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / '.env', override=False)
PRODUCTION = os.getenv('APP_ENV', 'development') == 'production' or bool(os.getenv('VERCEL'))


def secret(name):
    value = os.getenv(name, '')
    if not value and not PRODUCTION:
        return secrets.token_urlsafe(48)
    if len(value) < 32 or value.lower().startswith(('change', 'example', 'replace')):
        raise RuntimeError(f'{name} must be a unique random secret of at least 32 characters')
    return value


SECRET_KEY = secret('SECRET_KEY')
JWT_SECRET_KEY = secret('JWT_SECRET_KEY')
DATABASE_URL = os.getenv('DATABASE_URL') or os.getenv('POSTGRES_URL', '')
DATABASE_PATH = os.getenv('DATABASE_PATH') or str(ROOT / 'database' / 'waterhall.db')
RATELIMIT_STORAGE_URI = os.getenv('RATELIMIT_STORAGE_URI', 'memory://')
IOT_DEVICE_SECRET = os.getenv('IOT_DEVICE_SECRET', '')
ALLOWED_ORIGINS = [v.strip() for v in os.getenv('ALLOWED_ORIGINS', '').split(',') if v.strip()]
for origin in ALLOWED_ORIGINS:
    parsed = urlparse(origin)
    if not parsed.hostname or parsed.username or parsed.path or parsed.query or parsed.fragment or '*' in origin:
        raise RuntimeError('ALLOWED_ORIGINS must contain exact origins without paths or wildcards')
    if parsed.scheme not in (('https',) if PRODUCTION else ('http', 'https')):
        raise RuntimeError('Production origins must use HTTPS')

if DATABASE_URL and not DATABASE_URL.startswith(('postgres://', 'postgresql://')):
    raise RuntimeError('DATABASE_URL must be a PostgreSQL URL')
if PRODUCTION:
    if not DATABASE_URL:
        raise RuntimeError('Production requires DATABASE_URL; SQLite fallback is forbidden')
    if RATELIMIT_STORAGE_URI == 'memory://' or not RATELIMIT_STORAGE_URI.startswith(('redis://', 'rediss://')):
        raise RuntimeError('Production requires shared Redis rate-limit storage')
    if len(IOT_DEVICE_SECRET) < 32:
        raise RuntimeError('Production requires IOT_DEVICE_SECRET of at least 32 characters')
