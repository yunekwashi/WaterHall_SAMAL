"""Copy an allowlist to Vercel's public directory; never publish repository data."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'


TEAM_PHOTOS = {
    'Michael Jon C. Balaga.jpg': 'michael-jon-balaga.jpg',
    'Ryiel S. Banggat.jpg': 'ryiel-s-banggat.jpg',
    'John Dave A. Chicote.jpg': 'john-dave-chicote.jpg',
}


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
    team_source = ROOT / 'Assets' / 'team'
    web_team = ROOT / 'web' / 'assets' / 'team'
    team_dest = PUBLIC / 'assets' / 'team'
    web_team.mkdir(parents=True, exist_ok=True)
    team_dest.mkdir(parents=True, exist_ok=True)
    for original, published in TEAM_PHOTOS.items():
        source = team_source / original
        if source.is_file():
            shutil.copy2(source, web_team / published)
            shutil.copy2(source, team_dest / published)
    print('Public web and admin assets prepared.')


if __name__ == '__main__':
    build()
