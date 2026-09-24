import 'dart:convert';
import 'package:sqflite/sqflite.dart';

/// Device-local SQLite only. The server receives API requests, never this file.
class OfflineStore {
  Database? _database;
  Future<Database> get database async => _database ??= await openDatabase(
    'waterhall_worker_offline.db', version: 1,
    onCreate: (db, version) async {
      await db.execute('CREATE TABLE queue_state (owner TEXT NOT NULL, kind TEXT NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(owner, kind))');
    },
  );

  Future<void> save(String owner, String kind, List<dynamic> rows) async {
    if (owner.isEmpty || !['collections', 'actions'].contains(kind)) throw ArgumentError('Invalid queue');
    for (final row in rows) {
      if ((row['owner'] ?? row['collected_by']) != owner) throw ArgumentError('Wrong queue owner');
    }
    final db = await database;
    await db.transaction((txn) async {
      await txn.insert('queue_state', {'owner': owner, 'kind': kind, 'payload': json.encode(rows)}, conflictAlgorithm: ConflictAlgorithm.replace);
    });
  }

  Future<String> load(String owner, String kind) async {
    final rows = await (await database).query('queue_state', where: 'owner = ? AND kind = ?', whereArgs: [owner, kind]);
    return rows.isEmpty ? '[]' : rows.first['payload'] as String;
  }

  Future<void> close() async { await _database?.close(); _database = null; }
}
