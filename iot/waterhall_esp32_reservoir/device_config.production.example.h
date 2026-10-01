#pragma once
// ==============================================================================
// WATERHALL ESP32 - PRODUCTION CONFIGURATION TEMPLATE
// ==============================================================================
// Instructions for Production Provisioning:
// 1. Copy this file to "device_config.h" in this same directory:
//      cp device_config.production.example.h device_config.h
// 2. Set WIFI_SSID and WIFI_PASSWORD to the production reservoir station network (2.4 GHz).
// 3. Set SERVER_BASE_URL to the production origin (e.g. "https://waterhall-samal.vercel.app").
// 4. Generate a NEW, unique, cryptographically random secret (32+ characters).
//    Set it in IOT_DEVICE_SECRET here AND in the production Vercel/cloud environment.
// 5. Populate ROOT_CA with the verified Root Certificate Authority PEM for the
//    production domain (e.g., Let's Encrypt ISRG Root X1 or DigiCert Global Root CA).
// 6. Keep ALLOW_INSECURE_LOCAL_HTTP = false. Plaintext HTTP is strictly rejected.
// 7. Flash final firmware using Arduino IDE.
//
// SECURITY CONSTRAINTS:
// - Never reuse development secrets in production.
// - Never disable TLS certificate verification (setInsecure is strictly forbidden).
// - "device_config.h" is ignored by Git. Never commit production secrets or CA certs.
// ==============================================================================

// 2.4 GHz Field / Station Wi-Fi Network Credentials
const char* WIFI_SSID = "PROD_2.4GHZ_WIFI_SSID";
const char* WIFI_PASSWORD = "PROD_WIFI_PASSWORD";

// Production Canonical Origin (Strict HTTPS, No trailing slash)
const char* SERVER_BASE_URL = "https://waterhall-samal.vercel.app";

// Production Pre-Shared Ingestion Secret (Minimum 32 random characters;
// MUST match IOT_DEVICE_SECRET configured in production server environment)
const char* IOT_DEVICE_SECRET = "REPLACE_WITH_NEW_32_CHAR_RANDOM_PRODUCTION_SECRET";

// Production Root CA Certificate (PEM format) for TLS verification.
// Example: Let's Encrypt ISRG Root X1 (or the relevant Root CA for the custom domain).
// The certificate MUST be verified against the production server before flashing.
const char* ROOT_CA = R"PEM(
-----BEGIN CERTIFICATE-----
REPLACE_WITH_VERIFIED_ROOT_CA_PEM_CERTIFICATE
-----END CERTIFICATE-----
)PEM";

// Insecure HTTP is strictly FORBIDDEN in production
const bool ALLOW_INSECURE_LOCAL_HTTP = false;
