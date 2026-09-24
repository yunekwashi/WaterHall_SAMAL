"""Read-only scan of every reachable Git blob, including non-commit snapshot refs.

Outputs locations/categories, never matched values. Use Gitleaks alongside this
project-specific check for provider signatures, encoded and high-entropy values.
"""
import argparse
import io
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
REDACTED = '[REDACTED]'
SAFE_LITERALS = {'wrong', 'incorrect', 'bad', 'hash', 'hash-needs-reset', REDACTED}
PATTERNS = {
    'Wi-Fi SSID': r'''WIFI_SSID\s*=\s*['"]([^'"\r\n]+)['"]''',
    'Wi-Fi password': r'''WIFI_PASSWORD\s*=\s*['"]([^'"\r\n]+)['"]''',
    'IoT credential': r'''IOT_DEVICE_SECRET\s*=\s*['"]([^'"\r\n]+)['"]''',
    'JWT signing key': r'''JWT_SECRET_KEY[^\r\n=]{0,8}=\s*(?:os\.(?:environ\.get|getenv)\([^,\r\n]+,\s*)?['"]([^'"\r\n]+)['"]''',
    'Flask signing key': r'''(?<!JWT_)(?<!IOT_DEVICE_)SECRET_KEY[^\r\n=]{0,8}=\s*(?:os\.(?:environ\.get|getenv)\([^,\r\n]+,\s*)?['"]([^'"\r\n]+)['"]''',
    'Default password': r'''(?:environ\.get|getenv)\(\s*['"]DEFAULT_PASSWORD['"]\s*,\s*['"]([^'"\r\n]+)['"]''',
    'Literal password': r'''(?:DEFAULT_PASSWORD\s*=|generate_password_hash\(|['"](?:plain_password|password)['"]\s*:)\s*['"]([^'"\r\n]+)['"]''',
    'Private key value': r'''['"]private_key['"]\s*:\s*['"]([^'"\r\n]+)['"]''',
    'Credential connection URL': r'''(?:postgres(?:ql)?|mysql|rediss?)://[^\s:@]+:([^\s@]+)@''',
    'Private key block': r'''(-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)''',
    'Literal JWT': r'''\b(eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,})\b''',
    'Provider token': r'''\b((?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{32,}))\b''',
    'Stored password hash': r'''((?:scrypt|pbkdf2):[^\s'"<>]+\$[^\s'"<>]+\$[^\s'"<>]+)''',
}


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def private_path(name):
    path = Path(name)
    if name.endswith('.example') or path.name == 'device_config.example.h':
        return False
    return bool(re.search(
        r'(^|/)(\.env(?:\..*)?|device_config\.h|vapid_keys\.json|key\.properties|credentials\.json|service-account[^/]*\.json)$'
        r'|\.(db|sqlite3?|pem|key|p12|pfx|p8|jks|keystore|apk|aab|ipa|exe)$'
        r'|^(?:test_data|build_artifacts)/|^database/.*\.(?:json|txt|sql|dump)$'
        r'|(^|/)(?:api_test2?\.json|assets_extra\.json|response\.json|database_contents\.txt)$'
        r'|(^|/)(?:out\.js(?:\..*)?|__pycache__|\.venv[^/]*|node_modules)(?:/|$)', name, re.I))


def literals(content):
    """Yield actual candidates in memory only; public output must omit values."""
    for label, pattern in PATTERNS.items():
        for match in re.finditer(pattern, content):
            value = match.group(1)
            if value in SAFE_LITERALS or value.lower().startswith(('your_', 'your-', '[removed', '[redacted')):
                continue
            yield label, value, content[:match.start()].count('\n') + 1


def reachable_blobs():
    # --all includes refs that point directly to trees, which git log skips.
    objects = {}
    for line in git('rev-list', '--objects', '--all').decode().splitlines():
        oid, _, path = line.partition(' ')
        objects[oid] = path
    data = subprocess.run(['git', 'cat-file', '--batch'], cwd=ROOT,
        input=('\n'.join(objects) + '\n').encode(), capture_output=True, check=True).stdout
    stream = io.BytesIO(data)
    while header := stream.readline():
        oid, kind, size = header.decode().split()
        value = stream.read(int(size))
        assert stream.read(1) == b'\n'
        if kind == 'blob':
            yield oid, objects[oid], value


def all_paths():
    paths = set()
    commits = git('rev-list', '--all').decode().splitlines()
    refs = git('for-each-ref', '--format=%(objectname)').decode().splitlines()
    # Check every tree path, not only the first path attributed to a deduplicated blob.
    for ref in set(commits + refs):
        paths.update(git('ls-tree', '-r', '--name-only', ref).decode().splitlines())
    return paths


def scan(output=None):
    findings = []
    for path in sorted(all_paths()):
        if private_path(path):
            findings.append({'path': path, 'category': 'private/runtime path'})
    count = 0
    for oid, path, raw in reachable_blobs():
        count += 1
        if path.endswith('.pdf'):
            from pypdf import PdfReader
            pdf = PdfReader(io.BytesIO(raw))
            if pdf.attachments:
                findings.append({'path': path, 'blob': oid, 'category': 'PDF attachments require review'})
            content = '\n'.join(page.extract_text() or '' for page in pdf.pages)
        else:
            try:
                content = raw.decode('utf-8')
            except UnicodeError:
                continue
        for label, _, line in literals(content):
            findings.append({'path': path, 'blob': oid, 'line': line, 'category': label})
    result = {'commits': int(git('rev-list', '--count', '--all')),
              'refs': git('for-each-ref', '--format=%(refname)').decode().splitlines(),
              'blobs': count, 'findings': findings}
    if output:
        Path(output).write_text(json.dumps(result, indent=2), encoding='utf-8')
    for finding in findings:
        print(f"{finding['path']}:{finding.get('line', 0)}: {finding['category']}")
    print(f"Full reachable history: {result['commits']} commits, {len(result['refs'])} refs, {count} blobs, {len(findings)} findings.")
    return bool(findings)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--report', help='Optional redacted JSON report path')
    args = parser.parse_args()
    sys.exit(scan(args.report))
