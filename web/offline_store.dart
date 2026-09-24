import 'dart:convert';
import 'dart:html';
import 'dart:js' as js;
import 'dart:js_util' as js_util;
import 'dart:math';

String operationId() {
  final random = Random.secure();
  return List.generate(24, (_) => random.nextInt(256).toRadixString(16).padLeft(2, '0')).join();
}

String? currentAccount() {
  try {
    final token = window.localStorage['waterhall_jwt']!;
    return json.decode(utf8.decode(base64Url.decode(base64Url.normalize(token.split('.')[1]))))['sub'] as String;
  } catch (_) { return null; }
}

bool hasUsableSession() {
  try {
    final token = window.localStorage['waterhall_jwt']!;
    final claims = json.decode(utf8.decode(base64Url.decode(base64Url.normalize(token.split('.')[1]))));
    return claims['exp'] * 1000 > DateTime.now().millisecondsSinceEpoch;
  } catch (_) { return false; }
}

Future<dynamic> nativeCall(String method, Map<String, dynamic> data) async {
  if (!js.context.hasProperty('WaterHallStorage')) return null;
  return await js_util.promiseToFuture(js_util.callMethod(js_util.globalThis, 'waterhallNativeCall', [method, js_util.jsify(data)]));
}

Future<void> nativeSession(String? token) async {
  if (js.context.hasProperty('waterhallSetNativeSession')) {
    await js_util.promiseToFuture(js_util.callMethod(js_util.globalThis, 'waterhallSetNativeSession', [token]));
  }
}

Future<void> _queueWrites = Future<void>.value();

Future<void> mutateQueue(String type, void Function(List<Map<String, dynamic>>) change) {
  final owner = currentAccount();
  final write = _queueWrites.then((_) async {
    if (owner == null || currentAccount() != owner) throw StateError('Session changed before local save');
    final key = type == 'collections' ? 'waterhall_offline_collections' : 'waterhall_unsynced_actions';
    final rows = (json.decode(window.localStorage[key] ?? '[]') as List).map((row) => Map<String, dynamic>.from(row)).toList();
    change(rows);
    await _persistQueue(type, rows);
  });
  _queueWrites = write.catchError((_) {});
  return write;
}

Future<void> _persistQueue(String type, List<Map<String, dynamic>> rows) async {
  final owner = currentAccount();
  if (owner == null) throw StateError('Sign in before recording an operation');
  // The native app stores only the active account's rows in this transaction.
  final own = rows.where((r) => (r['owner'] ?? r['collected_by']) == owner).toList();
  await nativeCall('save', {'type': type, 'rows': own});
  window.localStorage[type == 'collections' ? 'waterhall_offline_collections' : 'waterhall_unsynced_actions'] = json.encode(rows);
}

Future<void> restoreQueues() async {
  if (currentAccount() == null) return;
  await nativeSession(window.localStorage['waterhall_jwt']);
  for (final type in ['collections', 'actions']) {
    final result = await nativeCall('load', {'type': type});
    if (result == null) continue;
    final rows = json.decode(result as String) as List;
    final key = type == 'collections' ? 'waterhall_offline_collections' : 'waterhall_unsynced_actions';
    final legacy = json.decode(window.localStorage[key] ?? '[]') as List;
    // Import existing localStorage records without dropping pending native rows.
    final merged = <String, Map<String, dynamic>>{};
    for (final item in [...legacy, ...rows]) {
      final row = Map<String, dynamic>.from(item);
      merged[(row['transaction_id'] ?? row['operation_id']).toString()] = row;
    }
    if (currentAccount() != null) await mutateQueue(type, (current) {
      for (final row in current) {
        merged.putIfAbsent((row['transaction_id'] ?? row['operation_id']).toString(), () => row);
      }
      current..clear()..addAll(merged.values);
    });
  }
}
