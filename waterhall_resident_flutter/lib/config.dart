// ignore_for_file: deprecated_member_use
import 'dart:io';
import 'package:shared_preferences/shared_preferences.dart';

/// Configuration for WaterHall Resident Mobile App.
/// Eliminates manual IP configuration and provides automatic connection resolution.
class AppConfig {
  /// Default Cloud / Production Base URL (Vercel deployment)
  static const String defaultProductionUrl = "https://waterhall-samal.vercel.app";

  /// Build-time override via --dart-define=SERVER_BASE_URL=https://...
  static const String serverBaseUrl = String.fromEnvironment(
    'SERVER_BASE_URL',
    defaultValue: defaultProductionUrl,
  );

  /// Fixed, immutable role for this application: Resident only.
  static const String appRole = "resident";

  /// Candidate servers for automatic discovery during local development/offline testing
  static const List<String> candidateServers = [
    serverBaseUrl,
    "http://10.0.2.2:8000",       // Android Emulator host loopback
    "http://localhost:8000",      // Local desktop / web
    "http://192.168.254.140:8000",// Local network lab PC
  ];

  /// Resolves the active backend server URL automatically without user intervention.
  /// 1. Checks the last verified working URL from SharedPreferences.
  /// 2. If unreachable, probes candidates for a responsive /api/health endpoint.
  /// 3. Falls back to production URL.
  static Future<String> resolveActiveServer() async {
    final prefs = await SharedPreferences.getInstance();
    final cached = prefs.getString('active_server_url');

    // 1. Try cached server if available
    if (cached != null && cached.isNotEmpty) {
      if (await _pingServer(cached)) {
        return cached;
      }
    }

    // 2. Try configured production URL first
    if (await _pingServer(serverBaseUrl)) {
      await prefs.setString('active_server_url', serverBaseUrl);
      return serverBaseUrl;
    }

    // 3. Probe local development fallback candidates
    for (final candidate in candidateServers) {
      if (candidate == cached || candidate == serverBaseUrl) continue;
      if (await _pingServer(candidate)) {
        await prefs.setString('active_server_url', candidate);
        return candidate;
      }
    }

    // Default fallback to configured base URL
    return serverBaseUrl;
  }

  /// Fast health check with 1.5s timeout using native HttpClient
  static Future<bool> _pingServer(String baseUrl) async {
    HttpClient? client;
    try {
      final cleanBase = baseUrl.replaceAll(RegExp(r'/+$'), '');
      final uri = Uri.parse('$cleanBase/api/health');
      client = HttpClient()..connectionTimeout = const Duration(milliseconds: 1500);
      final request = await client.getUrl(uri);
      final response = await request.close().timeout(const Duration(milliseconds: 1500));
      return response.statusCode == 200;
    } catch (_) {
      return false;
    } finally {
      client?.close(force: true);
    }
  }
}
