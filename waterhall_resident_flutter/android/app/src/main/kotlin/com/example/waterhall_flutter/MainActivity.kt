package com.example.waterhall_flutter

import android.Manifest
import android.app.NotificationManager
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.Settings
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    private var pending: MethodChannel.Result? = null
    private val setupPrefs by lazy { getSharedPreferences("waterhall_permissions", MODE_PRIVATE) }
    private fun permissionState(permission: String): String {
        if (checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED) return "allowed"
        return if (setupPrefs.getBoolean(permission, false) && !shouldShowRequestPermissionRationale(permission)) "settings" else "requestable"
    }
    private fun statuses(): Map<String, String> {
        val notifications = if (Build.VERSION.SDK_INT >= 33) permissionState(Manifest.permission.POST_NOTIFICATIONS)
            else if ((getSystemService(NOTIFICATION_SERVICE) as NotificationManager).areNotificationsEnabled()) "allowed" else "settings"
        val packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_PERMISSIONS)
        val cameraDeclared = packageInfo.requestedPermissions?.contains(Manifest.permission.CAMERA) == true
        val gallery = Intent(Intent.ACTION_GET_CONTENT).apply { type = "image/*" }
        return mapOf("installation" to if (packageInfo.lastUpdateTime > packageInfo.firstInstallTime) "upgrade" else "fresh",
            "notifications" to notifications,
            "camera" to if (cameraDeclared) permissionState(Manifest.permission.CAMERA) else "not_applicable",
            "photos" to if (cameraDeclared && gallery.resolveActivity(packageManager) != null) "available" else "not_applicable")
    }
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "waterhall/permissions").setMethodCallHandler { call, result ->
            when (call.method) {
                "status" -> result.success(statuses())
                "settings" -> {
                    startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:$packageName")))
                    result.success(null)
                }
                "request" -> {
                    val key = call.arguments as? String
                    val permission = when (key) {
                        "notifications" -> if (Build.VERSION.SDK_INT >= 33) Manifest.permission.POST_NOTIFICATIONS else null
                        "camera" -> Manifest.permission.CAMERA
                        else -> null
                    }
                    if (pending != null) result.error("busy", "Finish the current permission request.", null)
                    else if (permission == null || statuses()[key] != "requestable") result.success(null)
                    else {
                        pending = result
                        setupPrefs.edit().putBoolean(permission, true).apply()
                        requestPermissions(arrayOf(permission), 8701)
                    }
                }
                else -> result.notImplemented()
            }
        }
    }
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 8701) {
            val result = pending
            pending = null
            result?.success(null)
        }
    }
}
