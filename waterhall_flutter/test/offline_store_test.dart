import 'dart:convert';
import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:waterhall_flutter/offline_store.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  late Directory temp;
  setUp(() async {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
    temp = await Directory.systemTemp.createTemp('waterhall-offline-test-');
    await databaseFactory.setDatabasesPath(temp.path);
  });
  tearDown(() async => temp.delete(recursive: true));

  test('pending operations survive database close and remain account scoped', () async {
    final store = OfflineStore();
    final row = {'transaction_id': 'operation-one', 'collected_by': 'worker-one', 'sync_status': 'PENDING', 'amount_collected': 170};
    await store.save('worker-one', 'collections', [row]);
    await store.close();
    final restored = OfflineStore();
    expect(json.decode(await restored.load('worker-one', 'collections')), [row]);
    expect(json.decode(await restored.load('worker-two', 'collections')), isEmpty);
    await expectLater(restored.save('worker-two', 'collections', [row]), throwsArgumentError);
    expect(json.decode(await restored.load('worker-one', 'collections')), [row]);
    await restored.close();
  });

  test('acknowledged state persists and does not overwrite another account', () async {
    final store = OfflineStore();
    await store.save('one', 'actions', [{'owner': 'one', 'operation_id': 'first'}]);
    await store.save('two', 'actions', [{'owner': 'two', 'operation_id': 'second'}]);
    await store.save('one', 'actions', []);
    expect(json.decode(await store.load('one', 'actions')), isEmpty);
    expect((json.decode(await store.load('two', 'actions')) as List).single['operation_id'], 'second');
    await store.close();
  });
}
