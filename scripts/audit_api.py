import re
import glob

endpoints = set()
for path in glob.glob('web/**/*.dart', recursive=True) + glob.glob('web/**/*.js', recursive=True) + glob.glob('admin_web/**/*.js', recursive=True):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        matches = re.findall(r'[\'"](/api/[a-zA-Z0-9_\-\/]+)[\'"]', content)
        for m in matches:
            endpoints.add(m)

print("Client Endpoints found:")
for ep in sorted(endpoints):
    print("  ", ep)

with open('backend/server.py', 'r', encoding='utf-8') as f:
    server_content = f.read()
    server_eps = set(re.findall(r'@app\.route\([\'"](/api/[a-zA-Z0-9_\-\/<>\:]+)[\'"]', server_content))

print("\nServer Endpoints implemented:")
for ep in sorted(server_eps):
    print("  ", ep)

print("\nEndpoints in Client but NOT in server.py:")
for ep in sorted(endpoints):
    matched = False
    for sep in server_eps:
        sep_regex = '^' + re.sub(r'<[^>]+>', r'[^/]+', sep) + '$'
        if re.match(sep_regex, ep):
            matched = True
            break
    if not matched:
        print("  MISSING:", ep)
