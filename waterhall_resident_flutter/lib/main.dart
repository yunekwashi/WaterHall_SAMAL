// ignore_for_file: deprecated_member_use
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image_picker_android/image_picker_android.dart';
import 'package:image_picker_platform_interface/image_picker_platform_interface.dart';
import 'config.dart';
import 'permission_setup.dart';
import 'report_photo_picker.dart';
import 'notification_service.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final picker = ImagePickerPlatform.instance;
  if (picker is ImagePickerAndroid) picker.useAndroidPhotoPicker = true;
  runApp(const MyApp());
  unawaited(NotificationService.initialize());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WATERHALL Resident Portal',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xff126789)),
        scaffoldBackgroundColor: const Color(0xfff3f7fa),
        useMaterial3: true,
      ),
      home: const PermissionGate(photos: true, child: MainScreen()),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> with WidgetsBindingObserver {
  late final WebViewController _controller;
  final ImagePicker _imagePicker = ImagePicker();
  static const _secure = FlutterSecureStorage();
  late final ReportPhotoPicker _reportPhotoPicker = ReportPhotoPicker(
    pickImage: (source) => _imagePicker.pickImage(
        source: source, imageQuality: 85, maxWidth: 1920, maxHeight: 1920),
    recoverImage: () async {
      final lost = await _imagePicker.retrieveLostData();
      if (lost.exception != null) throw lost.exception!;
      return lost.files?.firstOrNull;
    },
  );
  int _photoPageGeneration = 0;
  bool _photoPickerActive = false;
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

    WidgetsBinding.instance.addObserver(this);
    _startPolling();
  }

  void _startPolling() {
    _pollTimer?.cancel();
    _pollTimer = Timer.periodic(const Duration(seconds: 60), (_) {
      NotificationService.checkAndNotify(role: AppConfig.appRole);
    });
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _startPolling();
      NotificationService.checkAndNotify(role: AppConfig.appRole);
    } else {
      _pollTimer?.cancel();
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
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
          // UI rendering is not a notification event. All announcements and
          // water alerts use the authenticated, durable native polling owner.
          NotificationService.checkAndNotify(role: AppConfig.appRole);
        },
      )
      ..addJavaScriptChannel(
        'NativePhotoPicker',
        onMessageReceived: _handleNativePhotoPickerRequest,
      )
      ..addJavaScriptChannel('WaterHallAuth', onMessageReceived: (message) {
        _bridgeWrites = _bridgeWrites
            .catchError((_) {})
            .then((_) => _handleAuthMessage(message.message));
      })
      ..setNavigationDelegate(
        NavigationDelegate(
          onNavigationRequest: (request) {
            final target = Uri.tryParse(request.url);
            final origin = Uri.parse(_activeServerUrl);
            return target != null &&
                    target.origin == origin.origin &&
                    !target.path.startsWith('/admin')
                ? NavigationDecision.navigate
                : NavigationDecision.prevent;
          },
          onPageStarted: (String url) {
            _photoPageGeneration++;
            _startErrorTimer();
            setState(() {
              _isLoading = true;
              _serverError = false;
            });
          },
          onPageFinished: (String url) async {
            await _controller.runJavaScript(
                "if(window.waterhallSetNativeSession) window.waterhallSetNativeSession(localStorage.getItem('waterhall_jwt'));");
            _errorTimer?.cancel();
            if (mounted) {
              setState(() {
                _isLoading = false;
                _serverError = false;
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

  Future<void> _bridgeWrites = Future<void>.value();

  Future<void> _handleNativePhotoPickerRequest(
      JavaScriptMessage message) async {
    if (!mounted) return;
    final currentUrl = Uri.tryParse(await _controller.currentUrl() ?? '');
    if (!mounted) return;
    final appOrigin = Uri.tryParse(_activeServerUrl)?.origin;
    if (currentUrl?.origin != appOrigin ||
        currentUrl?.queryParameters['role'] != 'resident') {
      return;
    }

    late final Map<String, dynamic> request;
    try {
      request = json.decode(message.message) as Map<String, dynamic>;
    } catch (_) {
      return;
    }

    final requestId = request['request_id'];
    final sourceName = request['source'];
    if (requestId is! String || requestId.isEmpty || requestId.length > 100) {
      return;
    }
    if (sourceName is! String) return;
    if (_photoPickerActive) {
      try {
        await _sendPhotoPickerResult(requestId,
            error:
                'A photo picker is already open. Finish or cancel it first.');
      } catch (_) {
        debugPrint('Photo picker feedback unavailable.');
      }
      return;
    }
    final generation = _photoPageGeneration;
    _photoPickerActive = true;
    try {
      if (sourceName == 'camera' && !await _allowCamera()) {
        if (mounted && generation == _photoPageGeneration) {
          await _sendPhotoPickerResult(requestId);
        }
        return;
      }
      final result = await _reportPhotoPicker.pick(sourceName);
      if (!mounted || generation != _photoPageGeneration) return;
      await _sendPhotoPickerResult(requestId,
          dataUrl: result['data_url'],
          fileName: result['file_name'],
          error: result['error']);
    } catch (_) {
      debugPrint('Photo result could not reach the current page.');
    } finally {
      _photoPickerActive = false;
    }
  }

  Future<bool> _allowCamera() async {
    final permissions = DevicePermissions();
    final state = (await permissions.status())['camera'];
    if (state == 'allowed') return true;
    if (!mounted) return false;
    final retry = state == 'requestable';
    final choice = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
              title: const Text('Allow Camera access'),
              content: const Text(
                  'WaterHall needs Camera access to capture report evidence. You can also choose Gallery.'),
              actions: [
                TextButton(
                    onPressed: () => Navigator.pop(context, false),
                    child: const Text('Cancel')),
                TextButton(
                    onPressed: () => Navigator.pop(context, true),
                    child: Text(retry ? 'Allow Camera' : 'Open Settings')),
              ],
            ));
    if (choice != true) return false;
    if (retry) {
      await permissions.request('camera');
    } else {
      await permissions.settings();
    }
    return (await permissions.status())['camera'] == 'allowed';
  }

  Future<void> _sendPhotoPickerResult(
    String requestId, {
    String? dataUrl,
    String? fileName,
    String? error,
  }) async {
    if (!mounted) return;
    final jsRequestId = jsonEncode(requestId);
    final jsDataUrl = jsonEncode(dataUrl);
    final jsFileName = jsonEncode(fileName);
    final jsError = jsonEncode(error);
    await _controller.runJavaScript('''
      if (typeof window.waterhallPhotoPickerResult === 'function') {
        window.waterhallPhotoPickerResult($jsRequestId, $jsDataUrl, $jsFileName, $jsError);
      }
    ''');
  }

  Future<void> _handleAuthMessage(String message) async {
    try {
      final current = Uri.tryParse(await _controller.currentUrl() ?? '');
      if (current?.origin != Uri.parse(_activeServerUrl).origin) return;
      final data = json.decode(message) as Map<String, dynamic>;
      final token = data['token'] as String?;
      await NotificationService.sessionChanged(token);
      if (token == null || token.isEmpty) {
        await _secure.delete(key: 'waterhall_jwt');
      } else {
        await _secure.write(key: 'waterhall_jwt', value: token);
        unawaited(NotificationService.checkAndNotify(role: AppConfig.appRole));
      }
    } catch (_) {
      debugPrint('Native session update unavailable.');
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
                          const Icon(Icons.cloud_off,
                              size: 90, color: Colors.blueGrey),
                          const SizedBox(height: 24),
                          const Text(
                            "Service Offline",
                            style: TextStyle(
                                fontSize: 22,
                                fontWeight: FontWeight.bold,
                                color: Color(0xff183448)),
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            "Unable to reach the WaterHall cloud server at this time.\n\n"
                            "Please ensure your device is connected to the internet, or tap retry to connect once the service is restored.",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Color(0xff526877),
                                fontSize: 14,
                                height: 1.5),
                          ),
                          const SizedBox(height: 36),
                          ElevatedButton.icon(
                            onPressed: _retryConnection,
                            icon: const Icon(Icons.refresh),
                            label: const Text("Retry Connection"),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blue.shade700,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 24, vertical: 12),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                )
              else
                const Center(
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Icon(Icons.water_drop_rounded,
                      size: 48, color: Color(0xff126789)),
                  SizedBox(height: 16),
                  Text('Opening WaterHall...'),
                  SizedBox(height: 20),
                  CircularProgressIndicator()
                ])),
              if (_isLoading)
                Container(
                  color: Colors.white70,
                  child: const Center(child: CircularProgressIndicator()),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
