"""Compatibility entrypoint for explicit schema migrations."""
from backend.db_adapter import init_db

if __name__ == '__main__':
    init_db()
    print('Schema migrated. Use python -m backend.manage for account administration.')
