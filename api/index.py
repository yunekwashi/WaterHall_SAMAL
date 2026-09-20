import os
import sys

# Add project root to sys.path so backend modules can be imported
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from backend.server import app

# Expose app for Vercel WSGI runner
# Vercel will automatically detect `app`
