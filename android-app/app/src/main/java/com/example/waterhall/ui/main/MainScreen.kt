package com.example.waterhall.ui.main

import android.annotation.SuppressLint
import android.content.Context
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation3.runtime.NavKey

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun MainScreen(
  onItemClick: (NavKey) -> Unit = {},
  modifier: Modifier = Modifier,
) {
  val context = LocalContext.current
  val sharedPref = remember { context.getSharedPreferences("waterhall_prefs", Context.MODE_PRIVATE) }
  
  // Read saved IP, default to "192.168.254.140"
  var ipAddress by remember { mutableStateOf(sharedPref.getString("server_ip", "192.168.254.140") ?: "192.168.254.140") }
  
  var showDialog by remember { mutableStateOf(false) }
  val webViewRef = remember { mutableStateOf<WebView?>(null) }

  // Handle system back press to navigate back inside the WebView
  BackHandler(enabled = webViewRef.value?.canGoBack() == true) {
    webViewRef.value?.goBack()
  }

  // Construct URL based on IP and flavor role parameter
  fun getUrlForIp(ip: String): String {
    val role = com.example.waterhall.BuildConfig.ROLE
    return "http://$ip:8000/index.html?role=$role"
  }

  Box(modifier = Modifier.fillMaxSize()) {
    AndroidView(
      factory = { ctx ->
        WebView(ctx).apply {
          webViewClient = WebViewClient()
          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            loadWithOverviewMode = true
            useWideViewPort = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
          }
          loadUrl(getUrlForIp(ipAddress))
          webViewRef.value = this
        }
      },
      modifier = Modifier.fillMaxSize()
    )

    // IP Settings button positioned floating at top-right
    TextButton(
      onClick = { showDialog = true },
      modifier = Modifier
        .align(Alignment.TopEnd)
        .padding(top = 40.dp, end = 16.dp) // Offset slightly below status bar
        .background(Color(0xAA1E293B), shape = RoundedCornerShape(8.dp))
    ) {
      Text("⚙️ IP Settings", color = Color.White)
    }

    if (showDialog) {
      var tempIp by remember { mutableStateOf(ipAddress) }

      AlertDialog(
        onDismissRequest = { showDialog = false },
        title = { Text("Server Connection IP") },
        text = {
          OutlinedTextField(
            value = tempIp,
            onValueChange = { tempIp = it },
            label = { Text("PC Local Server IP") },
            placeholder = { Text("e.g. 192.168.1.15") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
          )
        },
        confirmButton = {
          Button(
            onClick = {
              ipAddress = tempIp.trim()
              sharedPref.edit().putString("server_ip", ipAddress).apply()
              webViewRef.value?.loadUrl(getUrlForIp(ipAddress))
              showDialog = false
            }
          ) {
            Text("Save & Reconnect")
          }
        },
        dismissButton = {
          TextButton(onClick = { showDialog = false }) {
            Text("Cancel")
          }
        }
      )
    }
  }
}
