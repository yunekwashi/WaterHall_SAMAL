#pragma once
// Copy to device_config.h (ignored). Never commit real credentials.
const char* WIFI_SSID = "";
const char* WIFI_PASSWORD = "";
const char* SERVER_BASE_URL = ""; // Production HTTPS origin, without a trailing slash.
const char* IOT_DEVICE_SECRET = ""; // At least 32 random characters; match server environment.
const char* ROOT_CA = R"PEM()PEM"; // Trusted root CA for the production hostname's certificate.
const bool ALLOW_INSECURE_LOCAL_HTTP = false; // Explicit opt-in for isolated development only.
