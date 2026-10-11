import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:waterhall_flutter/config.dart';
import 'package:waterhall_flutter/main.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';

class FakeWorkerWebView extends WebViewPlatform {
  late FakeController controller;
  late FakeNavigation navigation;

  @override
  PlatformWebViewController createPlatformWebViewController(
      PlatformWebViewControllerCreationParams params) {
    return controller = FakeController(params);
  }

  @override
  PlatformNavigationDelegate createPlatformNavigationDelegate(
      PlatformNavigationDelegateCreationParams params) {
    return navigation = FakeNavigation(params);
  }

  @override
  PlatformWebViewWidget createPlatformWebViewWidget(
          PlatformWebViewWidgetCreationParams params) =>
      FakeWidget(params);
}

class FakeController extends PlatformWebViewController {
  FakeController(super.params) : super.implementation();
  final requests = <Uri>[];
  final scripts = <String>[];
  final channels = <String>[];
  late FakeNavigation navigation;

  @override
  Future<void> loadRequest(LoadRequestParams params) async {
    requests.add(params.uri);
    navigation.started(params.uri.toString());
    navigation.finished(params.uri.toString());
  }

  @override
  Future<void> setPlatformNavigationDelegate(
      PlatformNavigationDelegate handler) async {
    navigation = handler as FakeNavigation;
  }

  @override
  Future<void> setJavaScriptMode(JavaScriptMode mode) async {}
  @override
  Future<void> setBackgroundColor(Color color) async {}
  @override
  Future<void> enableZoom(bool enabled) async {}
  @override
  Future<void> addJavaScriptChannel(JavaScriptChannelParams params) async {
    channels.add(params.name);
  }

  @override
  Future<void> runJavaScript(String code) async => scripts.add(code);
}

class FakeNavigation extends PlatformNavigationDelegate {
  FakeNavigation(super.params) : super.implementation();
  late PageEventCallback started, finished;
  late NavigationRequestCallback request;
  late WebResourceErrorCallback error;

  @override
  Future<void> setOnPageStarted(PageEventCallback callback) async {
    started = callback;
  }

  @override
  Future<void> setOnPageFinished(PageEventCallback callback) async {
    finished = callback;
  }

  @override
  Future<void> setOnNavigationRequest(
      NavigationRequestCallback callback) async {
    request = callback;
  }

  @override
  Future<void> setOnWebResourceError(WebResourceErrorCallback callback) async {
    error = callback;
  }
}

class FakeWidget extends PlatformWebViewWidget {
  FakeWidget(super.params) : super.implementation();
  @override
  Widget build(BuildContext context) => const SizedBox.expand();
}

void main() {
  late FakeWorkerWebView platform;
  setUp(() {
    platform = FakeWorkerWebView();
    WebViewPlatform.instance = platform;
  });

  Future<void> mount(WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: MainScreen()));
    await tester.pump();
    await tester.pump();
  }

  Future<void> dispose(WidgetTester tester) async {
    await tester.pumpWidget(const SizedBox.shrink());
    await tester.pump();
  }

  testWidgets(
      'fresh open loads public welcome; Continue uses the Worker portal',
      (tester) async {
    await mount(tester);
    expect(platform.controller.requests.single.toString(),
        '${AppConfig.serverBaseUrl}/landing.html');
    expect(platform.controller.scripts, isEmpty,
        reason: 'Public welcome must not clear or overwrite a stored session');
    expect(find.text('Continue to Worker Portal'), findsOneWidget);
    await tester.tap(find.text('Continue to Worker Portal'));
    await tester.pump();
    await tester.pump();
    expect(platform.controller.requests.last.toString(),
        '${AppConfig.serverBaseUrl}/index.html?role=worker');
    expect(platform.controller.scripts.single,
        contains('waterhallSetNativeSession'));
    expect(find.text('Continue to Worker Portal'), findsNothing);
    expect(platform.controller.channels,
        ['NativeNotificationChannel', 'WaterHallStorage', 'WaterHallAuth']);
    await dispose(tester);
  });

  testWidgets('back to welcome exposes Continue without rewriting auth',
      (tester) async {
    await mount(tester);
    await tester.tap(find.text('Continue to Worker Portal'));
    await tester.pump();
    await tester.pump();
    final count = platform.controller.scripts.length;
    platform.navigation.started('${AppConfig.serverBaseUrl}/landing.html');
    platform.navigation.finished('${AppConfig.serverBaseUrl}/landing.html');
    await tester.pump();
    expect(find.text('Continue to Worker Portal'), findsOneWidget);
    expect(platform.controller.scripts.length, count);
    await dispose(tester);
  });

  testWidgets('same-origin restriction and Admin exclusion stay enforced',
      (tester) async {
    await mount(tester);
    for (final path in ['/landing.html', '/index.html?role=worker']) {
      expect(
          await platform.navigation.request(NavigationRequest(
              url: '${AppConfig.serverBaseUrl}$path', isMainFrame: true)),
          NavigationDecision.navigate);
    }
    for (final url in [
      'https://unrelated.example/landing.html',
      '${AppConfig.serverBaseUrl}/admin/'
    ]) {
      expect(
          await platform.navigation
              .request(NavigationRequest(url: url, isMainFrame: true)),
          NavigationDecision.prevent);
    }
    await dispose(tester);
  });
}
