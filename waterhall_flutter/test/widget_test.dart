import 'package:flutter_test/flutter_test.dart';
import 'package:waterhall_flutter/config.dart';

void main() {
  test('configured server is stable; resolver never probes or switches origins', () async {
    final first = await AppConfig.resolveActiveServer();
    final second = await AppConfig.resolveActiveServer();
    expect(first, second);
    expect(first, AppConfig.serverBaseUrl.replaceAll(RegExp(r'/+$'), ''));
    expect(Uri.parse(first).hasAuthority, isTrue);
  });
  test('application role is fixed', () { expect(AppConfig.appRole, 'worker'); });
}
