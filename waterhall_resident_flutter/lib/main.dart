// ignore_for_file: deprecated_member_use
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WATERHALL',
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
  String _ipAddress = "192.168.254.140";
  String _role = "resident"; // Hardcoded to resident
  bool _isLoading = true;
  bool _initialized = false;
  bool _serverError = false;
  Timer? _errorTimer;

  void _startErrorTimer() {
    _errorTimer?.cancel();
    _errorTimer = Timer(const Duration(seconds: 30), () {
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
    _loadSettingsAndInitWebView();
  }

  Future<void> _loadSettingsAndInitWebView() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _ipAddress = prefs.getString("server_ip") ?? "192.168.254.140";
      _role = "resident"; // Always resident
    });

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..enableZoom(false)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            _errorTimer?.cancel();
            setState(() {
              _isLoading = true;
              _serverError = false;
            });
          },
          onPageFinished: (String url) {
            if (_errorTimer == null || !_errorTimer!.isActive) {
              setState(() {
                _isLoading = false;
              });
            }
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint("Web Resource Error: ${error.description}");
            // isForMainFrame is only available in some platform implementations or webview_flutter 4.x
            // So we just trigger the timer on any error while loading the main page.
            if (_isLoading) {
              _startErrorTimer();
            }
          },
        ),
      );

    _controller.loadRequest(Uri.parse(_getAppUrl()));

    setState(() {
      _initialized = true;
    });
  }

  String _getAppUrl() {
    return "http://$_ipAddress:8000/index.html?role=$_role";
  }

  void _showSettingsDialog() {
    final ipController = TextEditingController(text: _ipAddress);
    String tempRole = _role;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setDialogState) {
            return AlertDialog(
              title: const Text("⚙️ Connection Settings"),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: ipController,
                    decoration: const InputDecoration(
                      labelText: "PC Local Server IP",
                      hintText: "e.g. 192.168.1.15",
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.datetime,
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text("Cancel"),
                ),
                ElevatedButton(
                  onPressed: () async {
                    final cleanIp = ipController.text.trim();
                    if (cleanIp.isNotEmpty) {
                      final prefs = await SharedPreferences.getInstance();
                      await prefs.setString("server_ip", cleanIp);
                      await prefs.setString("app_role", "resident");

                      setState(() {
                        _ipAddress = cleanIp;
                        _role = "resident";
                        _isLoading = true;
                        _serverError = false;
                      });

                      _errorTimer?.cancel();
                      await _controller.clearCache();
                      await _controller.clearLocalStorage();
                      _controller.loadRequest(Uri.parse(_getAppUrl()));
                      if (context.mounted) Navigator.pop(context);
                    }
                  },
                  child: const Text("Save & Connect"),
                ),
              ],
            );
          },
        );
      },
    );
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
          // Close the app if we cannot go back
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
                          const Icon(Icons.cloud_off, size: 100, color: Colors.blueGrey),
                          const SizedBox(height: 24),
                          const Text(
                            "Server Offline",
                            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.blueGrey),
                          ),
                          const SizedBox(height: 24),
                          const Text(
                            "Sorry, the server is shut down. Meanwhile, monitor the app if you want to get an update for your bill.\n\nThank you for your understanding.",
                            textAlign: TextAlign.center,
                            style: TextStyle(color: Colors.white70, fontSize: 16, height: 1.5),
                          ),
                          const SizedBox(height: 40),
                          ElevatedButton.icon(
                            onPressed: () {
                              setState(() {
                                _isLoading = true;
                                _serverError = false;
                              });
                              _errorTimer?.cancel();
                              _controller.loadRequest(Uri.parse(_getAppUrl()));
                            },
                            icon: const Icon(Icons.refresh),
                            label: const Text("Retry Connection"),
                            style: ElevatedButton.styleFrom(
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
                  color: Colors.black54, // Blocks touches and dims the background
                  child: const Center(child: CircularProgressIndicator()),
                ),

              // Floating Settings Gear button in top-right
              Positioned(
                top: 16,
                right: 16,
                child: Opacity(
                  opacity: 0.85,
                  child: FloatingActionButton.small(
                    onPressed: _showSettingsDialog,
                    backgroundColor: const Color(0xCC1E293B),
                    foregroundColor: Colors.white,
                    child: const Icon(Icons.settings, size: 20),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
