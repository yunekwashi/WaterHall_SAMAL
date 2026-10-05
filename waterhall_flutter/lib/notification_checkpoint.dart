import 'package:sqflite/sqflite.dart';

/// SQLite serializes foreground/background claims across Flutter engines.
/// No JWT or announcement text is persisted here. Logout keeps account scopes.
class NotificationCheckpoint {
  NotificationCheckpoint({Database? database}) : _database = database;
  Database? _database;
  Future<Database> get database async => _database ??= await openDatabase(
        'waterhall_notifications.db',
        version: 1,
        onCreate: (db, _) => db.execute(
            'CREATE TABLE checkpoints (scope TEXT PRIMARY KEY, announcement_id INTEGER NOT NULL)'),
      );
  Future<int?> read(String scope) async {
    final rows = await (await database)
        .query('checkpoints', where: 'scope = ?', whereArgs: [scope]);
    return rows.isEmpty ? null : rows.first['announcement_id'] as int;
  }

  static Map<String, dynamic>? latest(List<dynamic> rows, String role) {
    Map<String, dynamic>? newest;
    for (final value in rows) {
      if (value is! Map) continue;
      final audience = value['target_audience'];
      if (audience != 'Everyone' &&
          audience !=
              (role == 'resident' ? 'Residents only' : 'Workers only')) {
        continue;
      }
      final id = value['id'];
      if (id is! int || id <= 0) {
        continue; // Never synthesize an event ID from the phone clock.
      }
      if (newest == null || id > newest['id']) {
        newest = Map<String, dynamic>.from(value);
      }
    }
    return newest;
  }

  Future<bool> process(
      {required String scope,
      required String role,
      required List<dynamic> rows,
      required Future<bool> Function() isCurrent,
      required Future<void> Function(Map<String, dynamic>) deliver}) async {
    final newest = latest(rows, role);
    final db = await database;
    final claimed = await db.transaction<Map<String, dynamic>?>((txn) async {
      if (!await isCurrent()) return null;
      final existing = await txn
          .query('checkpoints', where: 'scope = ?', whereArgs: [scope]);
      final id = newest?['id'] as int? ?? 0;
      if (existing.isEmpty) {
        await txn
            .insert('checkpoints', {'scope': scope, 'announcement_id': id});
        return null; // First install/upgrade: existing history is a silent baseline.
      }
      if (id <= (existing.first['announcement_id'] as int)) return null;
      await txn.update('checkpoints', {'announcement_id': id},
          where: 'scope = ?', whereArgs: [scope]);
      return newest;
    });
    // Claim first: a process death may omit one delivery, but cannot replay it.
    if (claimed == null || !await isCurrent()) return false;
    await deliver(claimed);
    return true;
  }

  Future<void> close() async {
    await _database?.close();
    _database = null;
  }
}
