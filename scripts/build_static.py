"""Copy an allowlist to Vercel's public directory; never publish repository data."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'


def build():
    for folder, destination in [('web', PUBLIC), ('admin_web', PUBLIC / 'admin')]:
        for source in (ROOT / folder).rglob('*'):
            if not source.is_file() or source.suffix.lower() not in {'.html', '.js', '.css', '.png', '.jpg', '.ico', '.json'}:
                continue
            if source.name == 'shopping_list.html':
                continue
            target = destination / source.relative_to(ROOT / folder)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
    print('Public web and admin assets prepared.')


if __name__ == '__main__':
    build()
