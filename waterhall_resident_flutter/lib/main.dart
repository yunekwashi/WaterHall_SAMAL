// ignore_for_file: deprecated_member_use
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'config.dart';
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
      title: 'WATERHALL Resident Portal',
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
                            "Service Offline",
                            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            "Unable to reach the WaterHall cloud server at this time.\n\n"
                            "Please ensure your device is connected to the internet, or tap retry to connect once the service is restored.",
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
