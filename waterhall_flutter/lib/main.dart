// ignore_for_file: deprecated_member_use
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'config.dart';
import 'offline_store.dart';
import 'notification_service.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await NotificationService.initialize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WATERHALL Field Worker',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue, brightness: Brightness.dark),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  late final WebViewController _controller;
  static const _secure = FlutterSecureStorage();
  final OfflineStore _offlineStore = OfflineStore();
  String _activeServerUrl = AppConfig.serverBaseUrl;
  bool _isLoading = true;
  bool _initialized = false;
  bool _serverError = false;
  Timer? _errorTimer;
  Timer? _pollTimer;

  void _startErrorTimer() {
    _errorTimer?.cancel();
    _errorTimer = Timer(const Duration(seconds: 20), () {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _serverError = true;
        });
      }
    });
  }

  @override
  void initState() {
    super.initState();
    _initAppConnection();

    // Check notifications periodically while app is running
    _pollTimer = Timer.periodic(const Duration(seconds: 15), (timer) {
      NotificationService.checkAndNotify(role: AppConfig.appRole);
    });
  }

  @override
  void dispose() {
    _errorTimer?.cancel();
    _pollTimer?.cancel();
    super.dispose();
  }

  Future<void> _initAppConnection() async {
    setState(() {
      _isLoading = true;
      _serverError = false;
    });

    final resolvedUrl = await AppConfig.resolveActiveServer();

    setState(() {
      _activeServerUrl = resolvedUrl;
    });

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..enableZoom(false)
      ..addJavaScriptChannel(
        'NativeNotificationChannel',
        onMessageReceived: (JavaScriptMessage message) {
          try {
            final data = json.decode(message.message);
            NotificationService.showNotification(
              DateTime.now().millisecondsSinceEpoch ~/ 1000,
              data['title'] ?? 'WaterHall Notice',
              data['body'] ?? '',
            );
          } catch (e) {
            debugPrint("Native notification channel error: $e");
          }
        },
      )
      ..addJavaScriptChannel('WaterHallStorage', onMessageReceived: (message) => _handleStorage(message.message))
      ..addJavaScriptChannel('WaterHallAuth', onMessageReceived: (message) async {
        final current = Uri.tryParse(await _controller.currentUrl() ?? '');
        if (current?.origin != Uri.parse(_activeServerUrl).origin) return;
        final data = json.decode(message.message) as Map<String, dynamic>;
        final token = data['token'] as String?;
        if (token == null || token.isEmpty) {
          await _secure.delete(key: 'waterhall_jwt');
        } else {
          await _secure.write(key: 'waterhall_jwt', value: token);
        }
      })
      ..setNavigationDelegate(
        NavigationDelegate(
          onNavigationRequest: (request) {
            final target = Uri.tryParse(request.url);
            final origin = Uri.parse(_activeServerUrl);
            return target != null && target.origin == origin.origin && !target.path.startsWith('/admin')
                ? NavigationDecision.navigate : NavigationDecision.prevent;
          },
          onPageStarted: (String url) {
            _errorTimer?.cancel();
            setState(() {
              _isLoading = true;
              _serverError = false;
            });
          },
          onPageFinished: (String url) async {
            await _controller.runJavaScript("if(window.waterhallSetNativeSession) window.waterhallSetNativeSession(localStorage.getItem('waterhall_jwt'));");
            if (_errorTimer == null || !_errorTimer!.isActive) {
              setState(() {
                _isLoading = false;
              });
            }
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint("Web Resource Error: ${error.description}");
            if (_isLoading && error.isForMainFrame == true) {
              _startErrorTimer();
            }
          },
        ),
      );

    await _controller.loadRequest(Uri.parse(_getAppUrl()));

    setState(() {
      _initialized = true;
    });
  }


  Future<void> _handleStorage(String message) async {
    final current = Uri.tryParse(await _controller.currentUrl() ?? '');
    if (current?.origin != Uri.parse(_activeServerUrl).origin || current!.path.startsWith('/admin')) return;
    Map<String, dynamic>? request;
    try {
      request = json.decode(message) as Map<String, dynamic>;
      final data = request['data'] as Map<String, dynamic>;
      dynamic result;
      if (request['method'] == 'auth') {
        final token = data['token'] as String?;
        if (token == null || token.isEmpty) {
          await _secure.delete(key: 'waterhall_jwt');
        } else {
          await _secure.write(key: 'waterhall_jwt', value: token);
        }
      } else {
        final token = await _secure.read(key: 'waterhall_jwt');
        if (token == null) throw StateError('No active session');
        final claims = json.decode(utf8.decode(base64Url.decode(base64Url.normalize(token.split('.')[1]))));
        final owner = claims['sub'] as String;
        if (request['method'] == 'save') {
          await _offlineStore.save(owner, data['type'] as String, data['rows'] as List<dynamic>);
        } else if (request['method'] == 'load') {
          result = await _offlineStore.load(owner, data['type'] as String);
        } else {
          throw StateError('Unknown storage operation');
        }
      }
      await _controller.runJavaScript('window.waterhallNativeReply(${json.encode(request['id'])}, ${json.encode({'ok': true, 'data': result})});');
    } catch (_) {
      if (request != null) await _controller.runJavaScript('window.waterhallNativeReply(${json.encode(request['id'])}, {"ok":false});');
    }
  }

  String _getAppUrl() {
    final cleanUrl = _activeServerUrl.replaceAll(RegExp(r'/+$'), '');
    return "$cleanUrl/index.html?role=${AppConfig.appRole}";
  }

  Future<void> _retryConnection() async {
    setState(() {
      _isLoading = true;
      _serverError = false;
    });
    _errorTimer?.cancel();

    final resolved = await AppConfig.resolveActiveServer();
    setState(() {
      _activeServerUrl = resolved;
    });

    await _controller.loadRequest(Uri.parse(_getAppUrl()));
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        if (_initialized && await _controller.canGoBack()) {
          await _controller.goBack();
        } else {
          if (context.mounted) {
            Navigator.of(context).pop();
          }
        }
      },
      child: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              if (_initialized && !_serverError)
                WebViewWidget(controller: _controller)
              else if (_serverError)
                Container(
                  color: Theme.of(context).scaffoldBackgroundColor,
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(32.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.cloud_off, size: 90, color: Colors.blueGrey),
                          const SizedBox(height: 24),
                          const Text(
                            "Server Offline",
                            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            "Cannot establish a connection to the WaterHall backend server.\n\n"
                            "Field workers can continue using local offline mode for collections once the terminal cache is loaded, or retry connecting when the server is online.",
                            textAlign: TextAlign.center,
                            style: TextStyle(color: Colors.white70, fontSize: 14, height: 1.5),
                          ),
                          const SizedBox(height: 36),
                          ElevatedButton.icon(
                            onPressed: _retryConnection,
                            icon: const Icon(Icons.refresh),
                            label: const Text("Retry Connection"),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blue.shade700,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                )
              else
                const Center(child: CircularProgressIndicator()),

              if (_isLoading)
                Container(
                  color: Colors.black54,
                  child: const Center(child: CircularProgressIndicator()),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
