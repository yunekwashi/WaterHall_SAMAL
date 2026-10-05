import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Completion is UX state. Android remains the authority for every grant.
class DevicePermissions {
  static const channel = MethodChannel('waterhall/permissions');
  Future<Map<String, String>> status() async {
    final values = await channel.invokeMapMethod<String, String>('status');
    return values ?? {};
  }

  Future<void> request(String permission) =>
      channel.invokeMethod('request', permission);
  Future<void> settings() => channel.invokeMethod('settings');
}

class PermissionGate extends StatefulWidget {
  const PermissionGate(
      {super.key, required this.child, required this.photos, this.permissions});
  final Widget child;
  final bool photos;
  final DevicePermissions? permissions;
  @override
  State<PermissionGate> createState() => _PermissionGateState();
}

class _PermissionGateState extends State<PermissionGate>
    with WidgetsBindingObserver {
  late final DevicePermissions _permissions =
      widget.permissions ?? DevicePermissions();
  Map<String, String> _status = {};
  bool _ready = false, _complete = false, _busy = false, _attempted = false;
  String? _error;
  static const completionKey = 'waterhall_permission_setup_v1';
  List<String> get _steps => [
        'notifications',
        if (widget.photos) ...['camera', 'photos']
      ];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _load();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed && !_complete) _refresh();
  }

  Future<void> _refresh() async {
    try {
      final status = await _permissions.status();
      if (mounted) {
        setState(() {
          _status = status;
          _error = null;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _error =
              'Permission status is unavailable. You can continue and review Settings later.';
        });
      }
    }
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    await _refresh();
    final alreadyAllowed =
        _steps.every((p) => ['allowed', 'available'].contains(_status[p]));
    final complete = prefs.getBool(completionKey) == true ||
        (alreadyAllowed && _status['installation'] == 'upgrade');
    if (complete) await prefs.setBool(completionKey, true);
    if (mounted) {
      setState(() {
        _complete = complete;
        _ready = true;
      });
    }
  }

  Future<void> _setup() async {
    if (_busy) return;
    setState(() {
      _busy = true;
      _attempted = true;
    });
    try {
      for (final step in _steps) {
        await _refresh();
        if (_status[step] == 'requestable') {
          await _permissions
              .request(step); // One result before the next dialog.
          await _refresh();
        }
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _error =
              'Setup could not finish. Review permissions or continue for now.';
        });
      }
    } finally {
      if (mounted) {
        setState(() {
          _busy = false;
        });
      }
    }
  }

  Future<void> _continue() async {
    if (_busy) return;
    await (await SharedPreferences.getInstance()).setBool(completionKey, true);
    if (mounted) {
      setState(() {
        _complete = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_ready && _complete) return widget.child;
    return Scaffold(
      backgroundColor: const Color(0xfff3f7fa),
      body: SafeArea(
          child: Center(
              child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Icon(Icons.water_drop_rounded,
                    size: 52, color: Color(0xff126789)),
                const SizedBox(height: 12),
                const Text('WATERHALL',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 2)),
                const SizedBox(height: 32),
                const Text('Set up WaterHall',
                    style:
                        TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                const Text(
                    'A few permissions help you stay informed and use mobile features. You decide what to allow.',
                    style: TextStyle(fontSize: 16, height: 1.5)),
                const SizedBox(height: 24),
                _tile(
                    'notifications',
                    Icons.notifications_outlined,
                    'Notifications',
                    'Receive announcements and water service updates.'),
                if (widget.photos) ...[
                  _tile('camera', Icons.photo_camera_outlined, 'Camera',
                      'Capture photo evidence for a service report.'),
                  _tile(
                      'photos',
                      Icons.photo_library_outlined,
                      'Photos & Storage',
                      'Choose one image with Android’s secure photo picker. Full library access is not needed.'),
                ],
                if (_error != null)
                  Padding(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      child: Text(_error!)),
                const SizedBox(height: 24),
                FilledButton(
                    onPressed: _ready && !_busy
                        ? (_attempted ? _continue : _setup)
                        : null,
                    child: Padding(
                        padding: const EdgeInsets.all(14),
                        child: Text(_busy
                            ? 'Setting up…'
                            : _attempted
                                ? 'Continue to WaterHall'
                                : 'Continue Setup'))),
                if (_attempted && !_busy)
                  TextButton(
                      onPressed: _setup,
                      child: const Text('Review permissions')),
                TextButton(
                    onPressed: _ready && !_busy ? _continue : null,
                    child: const Text('Continue for now')),
                const SizedBox(height: 12),
                const Text('Barangay Tagpopongan • Island Garden City of Samal',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: Color(0xff526877))),
              ],
            )),
      ))),
    );
  }

  Widget _tile(String key, IconData icon, String title, String description) {
    final status = _status[key];
    final allowed = status == 'allowed' || status == 'available';
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 0,
      color: Colors.white,
      child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Icon(icon, color: const Color(0xff126789)),
            const SizedBox(width: 14),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text(title,
                      style: const TextStyle(
                          fontSize: 17, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 6),
                  Text(description,
                      style: const TextStyle(fontSize: 14, height: 1.45)),
                  const SizedBox(height: 8),
                  Text(
                      allowed
                          ? (status == 'available'
                              ? 'Available · Android manages access'
                              : 'Allowed')
                          : _attempted
                              ? 'Not Allowed'
                              : 'Ready to set up',
                      style: TextStyle(
                          color: allowed
                              ? const Color(0xff18775b)
                              : const Color(0xff526877),
                          fontWeight: FontWeight.w600)),
                  if (status == 'settings')
                    TextButton(
                        onPressed: _busy ? null : _permissions.settings,
                        child: const Text('Open Settings')),
                ])),
            if (allowed)
              const Icon(Icons.check_circle,
                  color: Color(0xff18775b), size: 20),
          ])),
    );
  }
}
