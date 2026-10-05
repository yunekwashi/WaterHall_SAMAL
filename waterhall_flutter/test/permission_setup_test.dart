import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:waterhall_flutter/permission_setup.dart';

class FakePermissions extends DevicePermissions {
  final requests = <String>[];
  final values = {
    'installation': 'fresh',
    'notifications': 'requestable',
    'camera': 'requestable',
    'photos': 'available'
  };
  bool deny = false;
  int active = 0, maxActive = 0, settingsCount = 0;
  @override
  Future<Map<String, String>> status() async => Map.of(values);
  @override
  Future<void> request(String key) async {
    active++;
    if (active > maxActive) maxActive = active;
    requests.add(key);
    await Future<void>.delayed(const Duration(milliseconds: 20));
    values[key] = deny ? 'settings' : 'allowed';
    active--;
  }

  @override
  Future<void> settings() async {
    settingsCount++;
  }
}

void main() {
  late FakePermissions permissions;
  setUp(() {
    SharedPreferences.setMockInitialValues({});
    permissions = FakePermissions();
  });
  Future<void> mount(WidgetTester tester, {bool photos = true}) async {
    tester.view.physicalSize = const Size(360, 844);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(MaterialApp(
        home: PermissionGate(
            photos: photos,
            permissions: permissions,
            child: const Text('Login'))));
    await tester.pumpAndSettle();
  }

  testWidgets(
      'fresh setup sequences Notifications Camera then OS-managed Photos',
      (tester) async {
    await mount(tester);
    await tester.ensureVisible(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    expect(permissions.requests, ['notifications', 'camera']);
    expect(permissions.maxActive, 1);
    expect(find.text('Available · Android manages access'), findsOneWidget);
    await tester.ensureVisible(find.text('Continue to WaterHall'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue to WaterHall'));
    await tester.pumpAndSettle();
    expect(find.text('Login'), findsOneWidget);
    expect(
        (await SharedPreferences.getInstance())
            .getBool('waterhall_permission_setup_v1'),
        true);
  });
  testWidgets('Worker has notifications only; no invented photo feature',
      (tester) async {
    await mount(tester, photos: false);
    await tester.ensureVisible(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    expect(permissions.requests, ['notifications']);
    expect(find.text('Camera'), findsNothing);
  });
  testWidgets(
      'restart/update completion avoids dialogs but reads real Android status',
      (tester) async {
    SharedPreferences.setMockInitialValues(
        {'waterhall_permission_setup_v1': true});
    await mount(tester);
    expect(find.text('Login'), findsOneWidget);
    expect(permissions.requests, isEmpty);
    expect((await permissions.status())['camera'], 'requestable');
  });
  testWidgets('existing grants skip setup on upgrade', (tester) async {
    permissions.values['installation'] = 'upgrade';
    permissions.values['notifications'] = 'allowed';
    permissions.values['camera'] = 'allowed';
    await mount(tester);
    expect(find.text('Login'), findsOneWidget);
    expect(permissions.requests, isEmpty);
  });
  testWidgets(
      'fresh install shows intro even when Android manages existing grants',
      (tester) async {
    permissions.values['notifications'] = 'allowed';
    permissions.values['camera'] = 'allowed';
    await mount(tester);
    expect(find.text('Set up WaterHall'), findsOneWidget);
    await tester.ensureVisible(find.text('Continue Setup'));
    await tester.tap(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    expect(permissions.requests, isEmpty);
    expect(find.text('Continue to WaterHall'), findsOneWidget);
  });
  testWidgets(
      'denial never loops; Settings recovery and continue remain available',
      (tester) async {
    permissions.deny = true;
    await mount(tester);
    await tester.ensureVisible(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue Setup'));
    await tester.pumpAndSettle();
    expect(permissions.requests, ['notifications', 'camera']);
    expect(find.text('Not Allowed'), findsNWidgets(2));
    await tester.ensureVisible(find.text('Open Settings').first);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Open Settings').first);
    await tester.pumpAndSettle();
    expect(permissions.settingsCount, 1);
    await tester.ensureVisible(find.text('Review permissions'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Review permissions'));
    await tester.pumpAndSettle();
    expect(permissions.requests, ['notifications', 'camera']);
  });
}
