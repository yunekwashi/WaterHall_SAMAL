import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:waterhall_flutter/notification_checkpoint.dart';

void main() {
  late NotificationCheckpoint checkpoint;
  late Directory directory;
  late String path;
  final delivered = <int>[];
  const scope = 'https://waterhall.example|resident|household:1';
  List<Map<String, dynamic>> rows(List<int> ids,
          [String audience = 'Everyone']) =>
      ids
          .map((id) => {
                'id': id,
                'message': 'Announcement $id',
                'target_audience': audience
              })
          .toList();
  Future<bool> process(List<dynamic> values,
          {String owner = scope,
          String role = 'resident',
          Future<bool> Function()? current}) =>
      checkpoint.process(
          scope: owner,
          role: role,
          rows: values,
          isCurrent: current ?? () async => true,
          deliver: (ann) async {
            delivered.add(ann['id'] as int);
          });
  setUp(() async {
    sqfliteFfiInit();
    directory =
        await Directory.systemTemp.createTemp('waterhall-notifications-test-');
    path = '${directory.path}/notifications.db';
    final db = await databaseFactoryFfi.openDatabase(path,
        options: OpenDatabaseOptions(
            version: 1,
            onCreate: (db, _) => db.execute(
                'CREATE TABLE checkpoints (scope TEXT PRIMARY KEY, announcement_id INTEGER NOT NULL)')));
    checkpoint = NotificationCheckpoint(database: db);
    delivered.clear();
  });
  tearDown(() async {
    await checkpoint.close();
    await directory.delete(recursive: true);
  });
  test('first install and first upgrade baseline are silent', () async {
    expect(await process(rows([1, 2, 3])), false);
    expect(await checkpoint.read(scope), 3);
    expect(delivered, isEmpty);
  });
  test('new event once; repeated push and polling never replay', () async {
    await process(rows([3]));
    await process(rows([4]));
    await process(rows([4]));
    await process(rows([4, 3]));
    expect(delivered, [4]);
  });
  test('offline backlog notifies only newest applicable event', () async {
    await process(rows([100]));
    await process(rows([101, 102, 103]));
    await process(rows([101, 102, 103]));
    expect(delivered, [103]);
    expect(await checkpoint.read(scope), 103);
  });
  test('audience filtered before latest selection', () async {
    await process(rows([299]));
    await process([
      ...rows([300], 'Residents only'),
      ...rows([301], 'Workers only')
    ]);
    expect(delivered, [300]);
  });
  test('worker excludes resident-only events', () async {
    await process(rows([299]), owner: 'worker:1', role: 'worker');
    await process([
      ...rows([300], 'Residents only'),
      ...rows([301], 'Workers only')
    ], owner: 'worker:1', role: 'worker');
    expect(delivered, [301]);
  });
  test('account switch has separate silent baseline', () async {
    await process(rows([100]));
    await process(rows([101]));
    await process(rows([101]), owner: 'resident:2');
    await process(rows([102]), owner: 'resident:2');
    await process(rows([102]));
    expect(delivered, [101, 102, 102]);
  });
  test('stale account response cannot claim or notify', () async {
    await process(rows([100]));
    await process(rows([101]), current: () async => false);
    expect(await checkpoint.read(scope), 100);
    expect(delivered, isEmpty);
  });
  test('logout after claim prevents display', () async {
    await process(rows([100]));
    var checks = 0;
    await process(rows([101]), current: () async => ++checks == 1);
    expect(delivered, isEmpty);
  });
  test('foreground and background transactions claim only once', () async {
    await process(rows([100]));
    await Future.wait([
      process(rows([101])),
      process(rows([101])),
      process(rows([101]))
    ]);
    expect(delivered, [101]);
  });
  test('process death / APK update / same account login preserve checkpoint',
      () async {
    await process(rows([100]));
    await process(rows([101]));
    await checkpoint.close();
    checkpoint = NotificationCheckpoint(
        database: await databaseFactoryFfi.openDatabase(path));
    await process(rows([101]));
    await process(rows([102]));
    expect(delivered, [101, 102]);
  });
  test('empty baseline accepts first genuinely new event', () async {
    await process([]);
    await process(rows([1]));
    expect(delivered, [1]);
  });
  test('invalid IDs never use device timestamps', () async {
    await process([
      {'message': 'No ID', 'target_audience': 'Everyone'}
    ]);
    expect(await checkpoint.read(scope), 0);
    expect(delivered, isEmpty);
  });
}
