import 'package:flutter/foundation.dart';

/// One explicit server per build. No probing of unrelated LAN/cloud servers.
class AppConfig {
  static const String serverBaseUrl = String.fromEnvironment('SERVER_BASE_URL', defaultValue: kReleaseMode ? '' : 'http://10.0.2.2:8000');
  static const String appRole = "worker";
  static Future<String> resolveActiveServer() async {
    final uri = Uri.tryParse(serverBaseUrl);
    if (uri == null || !uri.hasAuthority || uri.userInfo.isNotEmpty || uri.query.isNotEmpty || uri.fragment.isNotEmpty || (uri.path.isNotEmpty && uri.path != '/') ||
        (kReleaseMode ? uri.scheme != 'https' : !['http', 'https'].contains(uri.scheme))) {
      throw StateError('Set SERVER_BASE_URL to the API origin; release builds require HTTPS.');
    }
    return serverBaseUrl.replaceAll(RegExp(r'/+$'), '');
  }
}
