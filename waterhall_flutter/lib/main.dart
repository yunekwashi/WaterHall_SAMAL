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
  String _role = "worker"; // "worker" or "resident"
  bool _isLoading = true;
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    _loadSettingsAndInitWebView();
  }

  Future<void> _loadSettingsAndInitWebView() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _ipAddress = prefs.getString("server_ip") ?? "192.168.254.140";
      _role = prefs.getString("app_role") ?? "worker";
    });

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint("Web Resource Error: ${error.description}");
          },
        ),
      )
      ..loadRequest(Uri.parse(_getAppUrl()));

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
                  const SizedBox(height: 16),
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("App Interface Mode:", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                  const SizedBox(height: 8),
                  RadioListTile<String>(
                    title: const Text("Worker Portal"),
                    value: "worker",
                    groupValue: tempRole,
                    contentPadding: EdgeInsets.zero,
                    onChanged: (val) {
                      if (val != null) {
                        setDialogState(() {
                          tempRole = val;
                        });
                      }
                    },
                  ),
                  RadioListTile<String>(
                    title: const Text("Resident Portal"),
                    value: "resident",
                    groupValue: tempRole,
                    contentPadding: EdgeInsets.zero,
                    onChanged: (val) {
                      if (val != null) {
                        setDialogState(() {
                          tempRole = val;
                        });
                      }
                    },
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
                      await prefs.setString("app_role", tempRole);

                      setState(() {
                        _ipAddress = cleanIp;
                        _role = tempRole;
                        _isLoading = true;
                      });

                      _controller.loadRequest(Uri.parse(_getAppUrl()));
                      if (mounted) Navigator.pop(context);
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
          Navigator.of(context).pop();
        }
      },
      child: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              if (_initialized)
                WebViewWidget(controller: _controller)
              else
                const Center(child: CircularProgressIndicator()),
              
              if (_isLoading)
                const Center(child: CircularProgressIndicator()),

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
