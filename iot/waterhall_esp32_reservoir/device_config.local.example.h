#pragma once
// ==============================================================================
// WATERHALL ESP32 - LOCAL / TEST CONFIGURATION TEMPLATE
// ==============================================================================
// Instructions:
// 1. Copy this file to "device_config.h" in this same directory:
//      cp device_config.local.example.h device_config.h
// 2. Set WIFI_SSID and WIFI_PASSWORD for your 2.4 GHz local test network.
// 3. Set SERVER_BASE_URL to your development PC's LAN IP address on port 8000
//    (e.g., "http://192.168.1.100:8000" - without trailing slash).
//    Do NOT use "localhost" or "127.0.0.1" (the ESP32 is a separate physical device).
// 4. Set IOT_DEVICE_SECRET to match your local backend's IOT_DEVICE_SECRET.
//    (Must be at least 32 characters).
// 5. Keep ALLOW_INSECURE_LOCAL_HTTP = true for local plaintext HTTP testing.
// 6. Flash using Arduino IDE.
//
// NOTE: "device_config.h" is ignored by Git. Never commit real credentials.
// ==============================================================================

// 2.4 GHz Wi-Fi Credentials (ESP32 does NOT support 5 GHz networks)
const char* WIFI_SSID = "YOUR_2.4GHZ_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Local Backend Endpoint (LAN IP of development machine running Flask server)
// Format: http://<LAN-IP>:8000 (No trailing slash)
const char* SERVER_BASE_URL = "http://192.168.1.100:8000";

// Pre-shared IoT ingestion secret (Must match IOT_DEVICE_SECRET in local .env)
const char* IOT_DEVICE_SECRET = "YOUR_LOCAL_32_CHAR_IOT_DEVICE_SECRET";

// Unused for local HTTP testing (leave empty string)
const char* ROOT_CA = "";

// Explicitly permit unencrypted HTTP over local isolated testing subnet
const bool ALLOW_INSECURE_LOCAL_HTTP = true;
