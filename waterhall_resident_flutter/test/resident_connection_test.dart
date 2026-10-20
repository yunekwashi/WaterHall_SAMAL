import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:waterhall_flutter/config.dart';
import 'package:waterhall_flutter/main.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';

class FakeResidentWebView extends WebViewPlatform {
  late FakeController controller;
  bool failLoads = false;
  int controllers = 0;
  late FakeNavigation navigation;

  @override
  PlatformWebViewController createPlatformWebViewController(
      PlatformWebViewControllerCreationParams params) {
    controllers++;
    return controller = FakeController(params, this);
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
  FakeController(super.params, this.platform) : super.implementation();
  final FakeResidentWebView platform;
  final requests = <Uri>[];
  final scripts = <String>[];
  final channels = <String>[];
  late FakeNavigation navigation;

  @override
  Future<void> loadRequest(LoadRequestParams params) async {
    requests.add(params.uri);
    navigation.started(params.uri.toString());
    if (platform.failLoads) {
      navigation.error(const WebResourceError(errorCode: -2, description: 'network unavailable', isForMainFrame: true, errorType: WebResourceErrorType.hostLookup));
    }
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
  late HttpResponseErrorCallback httpError;

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
  Future<void> setOnHttpError(HttpResponseErrorCallback callback) async { httpError = callback; }

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
  late FakeResidentWebView platform;
  setUp(() { platform = FakeResidentWebView(); WebViewPlatform.instance = platform; });
  Future<void> mount(WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: MainScreen()));
    await tester.pump(); await tester.pump();
  }
  Future<void> dispose(WidgetTester tester) async {
    await tester.pumpWidget(const SizedBox.shrink()); await tester.pump();
  }
  testWidgets('online Resident opens direct portal without Worker Offline Mode', (tester) async {
    await mount(tester);
    expect(platform.controller.requests.single.toString(), '${AppConfig.serverBaseUrl}/index.html?role=resident');
    expect(find.text('Internet Error'), findsNothing);
    expect(find.text('Offline Mode'), findsNothing);
    expect(platform.controller.channels, ['NativeNotificationChannel','NativePhotoPicker','WaterHallAuth']);
    await dispose(tester);
  });
  testWidgets('cold network failure stays Internet Error even after page-finished; retry reuses controller', (tester) async {
    platform.failLoads = true; await mount(tester);
    expect(find.text('Internet Error'), findsOneWidget);
    expect(find.text('No internet connection. Please check your connection and try again.'), findsOneWidget);
    expect(find.text('Retry'), findsOneWidget);
    await tester.tap(find.text('Retry')); await tester.pump(); await tester.pump();
    expect(find.text('Internet Error'), findsOneWidget);
    expect(platform.controllers, 1); expect(platform.controller.requests.length, 2);
    platform.failLoads = false;
    await tester.tap(find.text('Retry')); await tester.pump(); await tester.pump();
    expect(find.text('Internet Error'), findsNothing);
    expect(platform.controllers, 1); expect(platform.controller.requests.length, 3);
    expect(platform.controller.scripts.any((s)=>s.contains('waterhallSetNativeSession')), isTrue);
    await dispose(tester);
  });
  testWidgets('main HTTP failure differs from internet loss; subresource failures do not block app', (tester) async {
    await mount(tester);
    platform.navigation.error(const WebResourceError(errorCode: -2, description: 'image failed', isForMainFrame: false));
    await tester.pump(); expect(find.text('Internet Error'), findsNothing);
    platform.navigation.httpError(HttpResponseError(request: WebResourceRequest(uri: platform.controller.requests.single)));
    await tester.pump(); expect(find.text('Service Unavailable'), findsOneWidget);
    await dispose(tester);
  });
  testWidgets('no retry loop and stalled load ends with bounded error', (tester) async {
    await mount(tester);
    platform.navigation.started('${AppConfig.serverBaseUrl}/index.html?role=resident');
    await tester.pump(const Duration(seconds: 21));
    expect(find.text('Internet Error'), findsOneWidget);
    await tester.pump(const Duration(minutes: 2));
    expect(platform.controller.requests.length, 1);
    await dispose(tester);
  });
}
