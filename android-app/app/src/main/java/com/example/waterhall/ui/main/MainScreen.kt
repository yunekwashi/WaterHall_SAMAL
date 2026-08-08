package com.example.waterhall.ui.main

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
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
  
  // Read saved IP, default to "172.31.1.213"
  var ipAddress by remember { mutableStateOf(sharedPref.getString("server_ip", "172.31.1.213") ?: "172.31.1.213") }
  
  var showDialog by remember { mutableStateOf(false) }
  val webViewRef = remember { mutableStateOf<WebView?>(null) }

  var serverError by remember { mutableStateOf(false) }
  var isLoading by remember { mutableStateOf(true) }
  var triggerErrorTimer by remember { mutableStateOf(false) }

  // Handle system back press to navigate back inside the WebView
  BackHandler(enabled = webViewRef.value?.canGoBack() == true && !serverError) {
    webViewRef.value?.goBack()
  }

  // Construct URL based on IP and flavor role parameter
  fun getUrlForIp(ip: String): String {
    val role = com.example.waterhall.BuildConfig.ROLE
    return "http://$ip:8000/index.html?role=$role"
  }

  Box(modifier = Modifier.fillMaxSize()) {
    
    if (triggerErrorTimer) {
        LaunchedEffect(Unit) {
            kotlinx.coroutines.delay(30000)
            serverError = true
            isLoading = false
            triggerErrorTimer = false
        }
    }

    if (serverError) {
        // Professional Error Screen
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF0F172A)), // dark slate background
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier.padding(32.dp)
            ) {
                Text(
                    text = "⚠️",
                    fontSize = 60.sp
                )
                Spacer(modifier = Modifier.height(24.dp))
                Text(
                    text = "Server Offline",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF94A3B8)
                )
                Spacer(modifier = Modifier.height(24.dp))
                Text(
                    text = "Sorry, the server is shut down. Meanwhile, monitor the app if you want to get an update for your bill.\n\nThank you for your understanding.",
                    color = Color.White.copy(alpha = 0.7f),
                    fontSize = 16.sp,
                    textAlign = TextAlign.Center,
                    lineHeight = 24.sp
                )
                Spacer(modifier = Modifier.height(40.dp))
                Button(
                    onClick = {
                        serverError = false
                        isLoading = true
                        triggerErrorTimer = false
                        webViewRef.value?.loadUrl(getUrlForIp(ipAddress))
                    }
                ) {
                    Text("Retry Connection")
                }
            }
        }
    } else {
        AndroidView(
          factory = { ctx ->
            WebView(ctx).apply {
              webViewClient = object : WebViewClient() {
                  override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                      super.onPageStarted(view, url, favicon)
                      isLoading = true
                      serverError = false
                      triggerErrorTimer = false
                  }
                  
                  override fun onPageFinished(view: WebView?, url: String?) {
                      super.onPageFinished(view, url)
                      // If it loaded successfully without triggering an error
                      if (!triggerErrorTimer && !serverError) {
                          isLoading = false
                      }
                  }
                  
                  override fun onReceivedError(
                      view: WebView?,
                      request: WebResourceRequest?,
                      error: WebResourceError?
                  ) {
                      super.onReceivedError(view, request, error)
                      if (request?.isForMainFrame == true) {
                          triggerErrorTimer = true
                      }
                  }
                  
                  // For older devices (API < 23)
                  @Deprecated("Deprecated in Java")
                  override fun onReceivedError(
                      view: WebView?,
                      errorCode: Int,
                      description: String?,
                      failingUrl: String?
                  ) {
                      super.onReceivedError(view, errorCode, description, failingUrl)
                      triggerErrorTimer = true
                  }
              }
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
    }

    // Full screen loading overlay block
    if (isLoading && !serverError) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.5f)),
            contentAlignment = Alignment.Center
        ) {
            CircularProgressIndicator(color = Color.White)
        }
    }

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
              
              serverError = false
              isLoading = true
              triggerErrorTimer = false
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
