import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:workmanager/workmanager.dart';
import 'config.dart';
import 'notification_checkpoint.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const String backgroundTaskName = "waterhall.background.check";

@pragma('vm:entry-point')
void callbackDispatcher() {
  Workmanager().executeTask((taskName, inputData) async {
    try {
      final role = inputData?['role'] ?? AppConfig.appRole;
      await NotificationService.checkAndNotify(role: role);
    } catch (e) {
      debugPrint("Workmanager background check failed: $e");
    }
    return Future.value(true);
  });
}

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notificationsPlugin =
      FlutterLocalNotificationsPlugin();

  static const AndroidNotificationChannel _channel = AndroidNotificationChannel(
    'waterhall_alerts_channel',
    'WaterHall System & Water Quality Alerts',
    description:
        'High-priority notifications for water contamination, reservoir levels, and barangay notices.',
    importance: Importance.max,
    playSound: true,
    enableVibration: true,
  );

  static Future<void> initialize() async {
    await _initializePlugin();

    try {
      await Workmanager().initialize(
        callbackDispatcher,
      );

      await Workmanager().registerPeriodicTask(
        "waterhall_periodic_notifications_${AppConfig.appRole}",
        backgroundTaskName,
        frequency: const Duration(minutes: 15),
        initialDelay: const Duration(minutes: 1),
        constraints: Constraints(
          networkType: NetworkType.connected,
        ),
        inputData: {'role': AppConfig.appRole},
        existingWorkPolicy: ExistingPeriodicWorkPolicy.keep,
      );
    } catch (e) {
      debugPrint("Workmanager init error: $e");
    }
  }

  static const announcementNotificationId = 99800;
  static final _checkpoint = NotificationCheckpoint();
  static Future<void>? _checking;
  static Future<void>? _pluginReady;
  static int _sessionGeneration = 0;
  static String? _sessionToken;
  static Future<void> sessionChanged(String? token) async {
    if (token == _sessionToken) return;
    _sessionToken = token;
    _sessionGeneration++;
    try {
      await _initializePlugin();
      await _notificationsPlugin.cancel(announcementNotificationId);
      await _notificationsPlugin.cancel(99901);
      await _notificationsPlugin.cancel(99902);
    } catch (_) {
      debugPrint('Notification cleanup unavailable.');
    }
  }

  static Future<void> checkAndNotify({String role = AppConfig.appRole}) {
    return _checking ??= _checkAndNotify(role: role).whenComplete(() {
      _checking = null;
    });
  }

  static Future<void> _initializePlugin() => _pluginReady ??= _setupPlugin();
  static Future<void> _setupPlugin() async {
    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const InitializationSettings initSettings =
        InitializationSettings(android: androidSettings);

    await _notificationsPlugin.initialize(initSettings);

    final androidImpl =
        _notificationsPlugin.resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>();

    if (androidImpl != null) {
      await androidImpl.createNotificationChannel(_channel);
    }
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getBool('waterhall_notification_owner_v1') != true) {
      // Remove legacy announcement IDs owned by this app on the fixed upgrade.
      await _notificationsPlugin.cancelAll();
      await prefs.setBool('waterhall_notification_owner_v1', true);
    }
  }

  static Future<void> showNotification(int id, String title, String body,
      {String? payload}) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'waterhall_alerts_channel',
      'WaterHall System & Water Quality Alerts',
      channelDescription:
          'High-priority notifications for water contamination, reservoir levels, and barangay notices.',
      importance: Importance.max,
      priority: Priority.high,
      playSound: true,
      enableVibration: true,
      styleInformation: BigTextStyleInformation(''),
    );

    const NotificationDetails platformDetails =
        NotificationDetails(android: androidDetails);

    await _notificationsPlugin.show(id, title, body, platformDetails,
        payload: payload);
  }

  static Future<void> _checkAndNotify({String role = 'resident'}) async {
    try {
      const secure = FlutterSecureStorage();
      final token = await secure.read(key: 'waterhall_jwt');
      if (token == null) return;
      final claims = json.decode(utf8.decode(
              base64Url.decode(base64Url.normalize(token.split('.')[1]))))
          as Map<String, dynamic>;
      final owner = claims['sub'] as String;
      if (claims['kind'] != role || role != AppConfig.appRole) return;
      if ((claims['exp'] as num) * 1000 <=
          DateTime.now().millisecondsSinceEpoch) {
        return;
      }
      final prefs = await SharedPreferences.getInstance();
      final serverUrl = await AppConfig.resolveActiveServer();
      final cleanUrl = serverUrl.replaceAll(RegExp(r'/+$'), '');

      final scope = '$cleanUrl|$role|$owner';
      final lastSeenId = await _checkpoint.read(scope);
      final pollUri = Uri.parse(
          '$cleanUrl/api/notifications/poll?since_id=${lastSeenId ?? 0}');
      final generation = _sessionGeneration;
      Future<bool> isCurrent() async =>
          generation == _sessionGeneration &&
          (claims['exp'] as num) * 1000 >
              DateTime.now().millisecondsSinceEpoch &&
          await secure.read(key: 'waterhall_jwt') == token;
      final response = await http.get(pollUri, headers: {
        'Authorization': 'Bearer $token'
      }).timeout(const Duration(seconds: 10));
      if (response.statusCode != 200 || !await isCurrent()) return;
      final data = json.decode(response.body) as Map<String, dynamic>;
      await _initializePlugin();
      await _checkpoint.process(
          scope: scope,
          role: role,
          rows: data['new_announcements'] as List<dynamic>? ?? [],
          isCurrent: isCurrent,
          deliver: (ann) async {
            if (!await isCurrent()) return;
            await showNotification(
                announcementNotificationId,
                'Notice from ${ann['author'] ?? 'Barangay WaterHall'}',
                '${ann['message'] ?? ''}');
          });
      if (!await isCurrent()) return;

      // 2. Check emergency sensor states
      final stamp = '${(data['telemetry'] as Map?)?['recorded_at'] ?? ''}';
      final recorded = DateTime.tryParse(
          RegExp(r'(Z|[+-]\d\d:\d\d)$').hasMatch(stamp) ? stamp : '${stamp}Z');
      final age = recorded == null
          ? null
          : DateTime.now().toUtc().difference(recorded.toUtc());
      final fresh = age != null && !age.isNegative && age.inMinutes < 10;
      final isContaminated = fresh && data['is_contaminated'] == true;
      final isLowLevel = fresh && data['is_low_level'] == true;
      final telemetry = data['telemetry'] as Map<String, dynamic>? ?? {};

      final lastContaminationAlert =
          prefs.getString('last_contamination_alert_$owner');
      final lastLowLevelAlert = prefs.getString('last_low_level_alert_$owner');
      final nowStr =
          DateTime.now().toIso8601String().substring(0, 13); // hourly bucket

      if (!await isCurrent()) return;
      if (isContaminated && lastContaminationAlert != nowStr) {
        final turb = telemetry['turbidity_ntu'];
        if (turb is! num) return;
        await showNotification(
          99901,
          "⚠️ WATER QUALITY ALERT",
          "Elevated turbidity ($turb NTU). Follow local water authority guidance.",
        );
        await prefs.setString('last_contamination_alert_$owner', nowStr);
      }

      if (!await isCurrent()) return;
      if (isLowLevel && lastLowLevelAlert != nowStr) {
        final wl = telemetry['water_level_percentage'];
        if (wl is! num) return;
        await showNotification(
          99902,
          "⚠️ CRITICAL RESERVOIR LEVEL",
          "Water supply level is critically low ($wl%). Please conserve water.",
        );
        await prefs.setString('last_low_level_alert_$owner', nowStr);
      }
    } catch (e) {
      debugPrint("Notification check unavailable.");
    }
  }
}
