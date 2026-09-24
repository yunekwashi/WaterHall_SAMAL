"""Compatibility runner for the isolated WaterHall integration/security suite."""
from pathlib import Path
import subprocess
import sys

if __name__ == '__main__':
    root = Path(__file__).resolve().parents[0]
    raise SystemExit(subprocess.call([sys.executable, '-m', 'pytest', 'tests', '-q'], cwd=root))
