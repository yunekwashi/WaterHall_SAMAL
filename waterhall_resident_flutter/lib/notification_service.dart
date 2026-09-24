import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:workmanager/workmanager.dart';
import 'config.dart';
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
    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const InitializationSettings initSettings =
        InitializationSettings(android: androidSettings);

    await _notificationsPlugin.initialize(initSettings);

    final androidImpl = _notificationsPlugin.resolvePlatformSpecificImplementation<
        AndroidFlutterLocalNotificationsPlugin>();

    if (androidImpl != null) {
      await androidImpl.createNotificationChannel(_channel);
      await androidImpl.requestNotificationsPermission();
    }

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

  static Future<void> checkAndNotify({String role = 'resident'}) async {
    try {
      const secure = FlutterSecureStorage();
      final token = await secure.read(key: 'waterhall_jwt');
      if (token == null) return;
      final prefs = await SharedPreferences.getInstance();
      final serverUrl = await AppConfig.resolveActiveServer();
      final cleanUrl = serverUrl.replaceAll(RegExp(r'/+$'), '');

      final lastSeenId = prefs.getInt('last_seen_announcement_id') ?? 0;
      final pollUri = Uri.parse(
          '$cleanUrl/api/notifications/poll?role=$role&since_id=$lastSeenId');

      final response =
          await http.get(pollUri, headers: {'Authorization': 'Bearer $token'}).timeout(const Duration(seconds: 10));
      if (response.statusCode != 200) return;

      final data = json.decode(response.body);
      if (data == null) return;

      // 1. Check new announcements
      final newAnnouncements =
          data['new_announcements'] as List<dynamic>? ?? [];
      if (newAnnouncements.isNotEmpty) {
        int highestId = lastSeenId;
        for (final ann in newAnnouncements) {
          final id = (ann['id'] as num?)?.toInt() ??
              (DateTime.now().millisecondsSinceEpoch ~/ 1000);
          if (id > highestId) highestId = id;

          final msg = ann['message'] ?? '';
          final author = ann['author'] ?? 'Barangay WaterHall';
          final audience = ann['target_audience'] ?? 'Everyone';

          await showNotification(
            id,
            "Notice from $author ($audience)",
            msg,
          );
        }
        await prefs.setInt('last_seen_announcement_id', highestId);
      }

      // 2. Check emergency sensor states
      final isContaminated = data['is_contaminated'] == true;
      final isLowLevel = data['is_low_level'] == true;
      final telemetry = data['telemetry'] as Map<String, dynamic>? ?? {};

      final lastContaminationAlert =
          prefs.getString('last_contamination_alert');
      final lastLowLevelAlert = prefs.getString('last_low_level_alert');
      final nowStr =
          DateTime.now().toIso8601String().substring(0, 13); // hourly bucket

      if (isContaminated && lastContaminationAlert != nowStr) {
        final turb = telemetry['turbidity_ntu'] ?? 5.5;
        final ph = telemetry['ph_level'] ?? 7.0;
        await showNotification(
          99901,
          "⚠️ WATER QUALITY ALERT",
          "Water contamination detected (Turbidity: $turb NTU, pH: $ph). Follow local water authority guidance.",
        );
        await prefs.setString('last_contamination_alert', nowStr);
      }

      if (isLowLevel && lastLowLevelAlert != nowStr) {
        final wl = telemetry['water_level_percentage'] ?? 15;
        await showNotification(
          99902,
          "⚠️ CRITICAL RESERVOIR LEVEL",
          "Water supply level is critically low ($wl%). Please conserve water.",
        );
        await prefs.setString('last_low_level_alert', nowStr);
      }
    } catch (e) {
      debugPrint("Error checking notifications: $e");
    }
  }
}
