import re
import json

with open('web/db.dart', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract seedHouseholds
match = re.search(r'(final List<Map<String, dynamic>> seedHouseholds = \[.*?\];)', content, re.DOTALL)
if match:
    old_code = match.group(1)
    
    # Process each household
    def repl(m):
        house_id = m.group(1)
        lot_num = int(house_id.split('-')[1]) - 100
        return f"'house_id': '{house_id}',\n    'lot': 'Lot {lot_num}',\n    'password': null,"
    
    new_code = re.sub(r"'house_id': '(HH-\d+)',", repl, old_code)
    content = content.replace(old_code, new_code)

# Replace validateWorker with new methods
new_methods = '''  Map<String, dynamic>? validateResident(String purokLot, String password) {
    final households = getHouseholds();
    try {
      final resident = households.firstWhere((h) {
        String combined = "${h['purok']} ${h['lot'] ?? ''}".toLowerCase().trim();
        return combined == purokLot.toLowerCase().trim() || h['account_number'].toString().toLowerCase() == purokLot.toLowerCase().trim();
      });

      if (resident['password'] == null || resident['password'] == '') {
        resident['password'] = password;
        _syncWithServer('/api/households/update', resident);
        window.localStorage[dbKeys['households']!] = json.encode(households);
        return resident;
      } else if (resident['password'] == password) {
        return resident;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  Map<String, dynamic>? validateWorker(String workerName, String password, String zone) {
    try {
      final worker = _workers.firstWhere((w) => 
          w['name'].toString().toLowerCase() == workerName.toLowerCase().trim() && 
          w['worker_id'].toString().toLowerCase() == password.toLowerCase().trim());
      return {
        ...worker,
        'selected_zone': zone
      };
    } catch (_) {
      return null;
    }
  }'''

content = re.sub(
    r'  Map<String, dynamic>\? validateWorker\(String workerId, String zone\) \{[\s\S]*?    \} catch \(\_\) \{\s*return null;\s*\}\s*\}',
    new_methods,
    content
)

with open('web/db.dart', 'w', encoding='utf-8') as f:
    f.write(content)
print('db.dart updated successfully.')
