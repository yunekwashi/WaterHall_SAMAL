"""Conservative current-tree secret/data checks. Prints locations, never credential values.

This does not replace a history scan, provider secret scanning, or human review.
Run before staging and again on the proposed commit.
"""
from pathlib import Path
import re
import subprocess
import sys

from audit_git_history import private_path, literals

ROOT = Path(__file__).resolve().parents[1]


def audit():
    files = subprocess.check_output(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], cwd=ROOT).decode().split('\0')
    findings = []
    # Detect literal private keys, bearer credentials, DSNs with embedded passwords,
    # and common provider key formats. JWT field names or API auth code are legitimate.
    patterns = {
        'private key': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
        'embedded database password': re.compile(r'postgres(?:ql)?://[^\s:@]+:[^\s@]+@'),
        'provider credential': re.compile(r'\b(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{32,})\b'),
        'literal JWT': re.compile(r'\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b'),
        'literal password/secret': re.compile(r'''(?i)(?:WIFI_PASSWORD|IOT_DEVICE_SECRET|JWT_SECRET_KEY)\s*=\s*["']([^"']{8,})["']'''),
    }
    for name in sorted(set(files)):
        path = ROOT / name
        if not name or not path.is_file():
            continue
        if private_path(name):
            findings.append((name, 0, 'private/generated file in proposed tree'))
        if path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.ico', '.ttf', '.woff', '.woff2', '.pdf'}:
            continue
        try:
            lines = path.read_text(encoding='utf-8').splitlines()
        except UnicodeError:
            continue
        for lineno, line in enumerate(lines, 1):
            for label, pattern in patterns.items():
                if pattern.search(line):
                    findings.append((name, lineno, label))
        for label, _, lineno in literals('\n'.join(lines)):
            finding = (name, lineno, label)
            if finding not in findings:
                findings.append(finding)
    for name, line, reason in findings:
        print(f'{name}:{line}: {reason}')
    print(f'Current-tree scan: {len(set(files)) - 1} entries, {len(findings)} findings. History requires separate review.')
    return bool(findings)


if __name__ == '__main__':
    sys.exit(audit())
