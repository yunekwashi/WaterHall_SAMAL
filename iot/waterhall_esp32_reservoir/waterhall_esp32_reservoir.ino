/*
 * ==============================================================================
 * WATERHALL - BARANGAY TAGPOPONGAN IOT RESERVOIR MONITORING NODE
 * ==============================================================================
 * Hardware: ESP32 DevKit V1 (30-pin / 38-pin)
 * Physical Sensors (Real Hardware Only):
 *   1. HC-SR04 Ultrasonic Distance Sensor (TRIG=GPIO18, divided ECHO=GPIO19)
 *   2. Analog Turbidity Sensor (divided AOUT=GPIO34 / ADC1_CH6)
 *   3. Analog TDS Sensor (divided AOUT=GPIO35 / ADC1_CH7; nominal gain 2.0)
 * Status LED: Built-in LED (GPIO2)
 *
 * NOTE: These three physical sensors are functionally verified on the bench.
 * There is NO pH sensor, NO pipe flow sensor (YF-S201), and NO temperature probe.
 * Water level returns NULL on invalid echo or unmeasured reservoir geometry.
 *
 * Backend Endpoint:
 *   POST <configured HTTPS origin>/api/iot/telemetry
 * ==============================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <time.h>
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <freertos/task.h>
#include "sensor_runtime.h"

#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
#include <esp_adc/adc_cali.h>
#include <esp_adc/adc_cali_scheme.h>
// Arduino 3.3.12 caches one voltage calibration per ADC unit using its global
// attenuation. Keep a separate 0dB handle so GPIO34's 11dB path is unchanged.
adc_cali_handle_t tdsLowRangeCalibration = nullptr;

bool readTdsLowRangeMillivolts(uint16_t raw, uint32_t& millivolts) {
  int converted = 0;
  millivolts = 0;
  if (!tdsLowRangeCalibration ||
      adc_cali_raw_to_voltage(tdsLowRangeCalibration, raw, &converted) != ESP_OK ||
      converted < 0) return false;
  millivolts = static_cast<uint32_t>(converted);
  return true;
}
#endif

// ==============================================================================
// 1. NETWORK & SERVER CONFIGURATION
// ==============================================================================
// Copy device_config.local.example.h (for testing) or device_config.production.example.h (for production)
// to the ignored device_config.h and configure it before flashing.
#include "device_config.h"
const String SERVER_URL = String(SERVER_BASE_URL) + "/api/iot/telemetry";

const unsigned long NTP_SYNC_TIMEOUT_MS = 15000;
const time_t MIN_VALID_UNIX_TIME = 1704067200;
bool timeSynchronized = false;
waterhall::RetrySchedule sendSchedule;
uint32_t lastDiagnostics = 0;
uint32_t lastPublish = 0;
struct TimedSensorSnapshot {
  SensorSnapshot sample;
  uint32_t observedAt;
};
QueueHandle_t latestSensors = nullptr;  // One overwrite-only item; never a backlog.
TaskHandle_t networkTask = nullptr;
constexpr uint32_t REQUEST_SEND = 1;
constexpr uint32_t REQUEST_WIFI_TEST = 2;
constexpr int TELEMETRY_NO_SAMPLE = -1;
constexpr int TELEMETRY_FAILED = 0;
constexpr int TELEMETRY_ACCEPTED = 1;

// ==============================================================================
// 5. SETUP & WIFI INITIALIZATION
// ==============================================================================
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("[BOOT] ESP32 started");
  Serial.println("[BOOT] Firmware: WaterHall HC-SR04 intended reservoir geometry / sensor validity");
  Serial.println("[BOOT] No synthetic telemetry; sensor_config.h controls hardware gates.");
  if (PROVISIONAL_DEMO_MODE)
    Serial.println("[DEMO] Existing NTU/ppm approximations; MANUAL CALIBRATION REQUIRED. Water level uses intended 4-ft / 5-in geometry; physical accuracy verification required.");
  Serial.printf("[WATER] Full distance: %.2f cm | Empty distance: %.2f cm | Max depth: %.2f cm\n",
                FULL_DISTANCE_CM, EMPTY_DISTANCE_CM, EMPTY_DISTANCE_CM - FULL_DISTANCE_CM);
  if (!SENSOR_WIRING_CONFIRMED) Serial.println("[HARDWARE] Wiring/voltage confirmation pending; all POSTs disabled.");
  if (BENCH_CAPTURE_ONLY) Serial.println("[HTTP] BENCH CAPTURE ONLY: ALL POSTs disabled.");
  else if (!PRODUCTION_TELEMETRY_ENABLED) Serial.println("[HTTP] Automatic POST disabled; serial 'send' requests ONE fresh real snapshot.");
  else Serial.printf("[HTTP] Automatic telemetry ENABLED; %lu ms minimum wait after each POST; failure backoff retained.\n",
                     (unsigned long)waterhall::MIN_COMPLETION_GAP_MS);
  Serial.println("\n==================================================");
  Serial.println(" WATERHALL IoT Reservoir Monitoring Station");
  Serial.println(" Barangay Tagpopongan, Island Garden City of Samal");
  Serial.println("==================================================");

  // Configure Pin Modes
  pinMode(PIN_STATUS_LED, OUTPUT);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  digitalWrite(PIN_TRIG, LOW);

  // Analog pins configuration (ESP32 ADC 12-bit resolution: 0 - 4095)
  analogReadResolution(12);
  analogSetPinAttenuation(PIN_TURBIDITY, ADC_11db);
#if defined(WATERHALL_TDS_LOW_RANGE_BENCH) || defined(WATERHALL_TDS_LOW_RANGE_PRODUCTION) || defined(WATERHALL_TDS_PARTIAL_PRODUCTION)
  // This core ignores per-pin attenuation until the channel is attached.
  // Discard the initialization conversion before selecting the TDS-only range.
  (void)analogRead(PIN_TDS);
  analogSetPinAttenuation(PIN_TDS, ADC_0db);
  adc_cali_line_fitting_efuse_val_t calibrationSource;
  if (adc_cali_scheme_line_fitting_check_efuse(&calibrationSource) == ESP_OK &&
      calibrationSource != ADC_CALI_LINE_FITTING_EFUSE_VAL_DEFAULT_VREF) {
    adc_cali_line_fitting_config_t calibrationConfig = {};
    calibrationConfig.unit_id = ADC_UNIT_1;
    calibrationConfig.atten = ADC_ATTEN_DB_0;
    calibrationConfig.bitwidth = ADC_BITWIDTH_12;
    // No assumed reference voltage fallback when chip calibration is absent.
    calibrationConfig.default_vref = 0;
    if (adc_cali_create_scheme_line_fitting(&calibrationConfig,
        &tdsLowRangeCalibration) != ESP_OK) tdsLowRangeCalibration = nullptr;
  }
  if (TDS_PARTIAL_PRODUCTION) Serial.println("[TDS] Partial production: 0dB retained; ppm requires approved references; unavailable sensors use null.");
  else Serial.println(TDS_LOW_RANGE_BENCH ?
      "[TDS] Capture-only 0dB range: 100..950mV; divider retained; ppm unset." :
      "[TDS] Production 0dB range: 100..950mV; divider retained; legacy ppm PROVISIONAL / MANUAL CALIBRATION REQUIRED.");
  Serial.println(tdsLowRangeCalibration ?
      "[TDS] Dedicated 0dB chip-calibrated ADC estimate available; not a meter measurement." :
      "[TDS] ADC calibration unavailable; raw capture only, voltage/ppm unset.");
#else
  analogSetPinAttenuation(PIN_TDS, ADC_11db);
#endif

  WiFi.onEvent([](WiFiEvent_t, WiFiEventInfo_t info) {
    unsigned int reason = info.wifi_sta_disconnected.reason;
    Serial.printf("[WIFI] Disconnected; reason code: %u\n", reason);
    if (reason == 201) Serial.println("[WIFI] FAIL: configured access point not found.");
    else if (reason == 202) Serial.println("[WIFI] FAIL: access point rejected authentication.");
    else if (reason == 15 || reason == 204) Serial.println("[WIFI] FAIL: authentication handshake timed out.");
  }, ARDUINO_EVENT_WIFI_STA_DISCONNECTED);

  // The loop owns all ADC/echo/filter state. The network task receives copies,
  // so Wi-Fi, NTP and HTTPS waits cannot stop sampling or race the filters.
  latestSensors = xQueueCreate(1, sizeof(TimedSensorSnapshot));
  if (!latestSensors || xTaskCreatePinnedToCore(telemetryWorker, "telemetry", 8192,
      nullptr, 1, &networkTask, 0) != pdPASS) {
    networkTask = nullptr;
    Serial.println("[HTTP] Network task unavailable; sampling continues, POSTs disabled.");
  }
}

void connectToWiFi() {
  Serial.println("\n[WIFI] Connecting...");
  WiFi.mode(WIFI_STA);
  // End a timed-out association before reconfiguring; otherwise the core can
  // reject WiFi.begin with "sta is connecting, cannot set config" on retries.
  WiFi.disconnect(false, false);
  delay(100);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 25) {
    delay(500);
    Serial.print(".");
    digitalWrite(PIN_STATUS_LED, !digitalRead(PIN_STATUS_LED)); // Toggle LED
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WIFI] Connected");
    Serial.print("[WIFI] IP: ");
    Serial.println(WiFi.localIP());
    digitalWrite(PIN_STATUS_LED, HIGH); // Steady ON when connected
    // Start SNTP only after Wi-Fi has an IP address.
    configTime(0, 0, "pool.ntp.org", "time.nist.gov");
    waitForTimeSync();
  } else {
    Serial.println("\n[WIFI] FAIL: no connection within 12.5 seconds. Will retry during telemetry loop.");
    digitalWrite(PIN_STATUS_LED, LOW);
  }
}

bool waitForTimeSync() {
  Serial.println("[TIME] Synchronizing...");
  unsigned long startTime = millis();
  while (millis() - startTime < NTP_SYNC_TIMEOUT_MS) {
    if (time(nullptr) >= MIN_VALID_UNIX_TIME) {
      timeSynchronized = true;
      Serial.printf("[TIME] Synchronized; UTC epoch: %lld\n", (long long)time(nullptr));
      return true;
    }
    delay(250);
  }

  timeSynchronized = time(nullptr) >= MIN_VALID_UNIX_TIME;
  if (timeSynchronized) {
    Serial.printf("[TIME] Synchronized; UTC epoch: %lld\n", (long long)time(nullptr));
  } else {
    Serial.println("[TIME] FAIL: synchronization timeout (15 seconds); HTTPS blocked.");
  }
  return timeSynchronized;
}

// ==============================================================================
// 6. MAIN LOOP & DATA TRANSMISSION
// ==============================================================================
void serviceSerial() {
  static char command[16] = {};
  static size_t length = 0;
  static bool overflow = false;
  while (Serial.available()) {
    const char ch = Serial.read();
    if (ch == '\r') continue;
    if (ch == '\n') {
      command[length] = '\0';
      if (!overflow && strcmp(command, "send") == 0 && networkTask)
        xTaskNotify(networkTask, REQUEST_SEND, eSetBits);
      else if (!overflow && strcmp(command, "wifi-test") == 0 && networkTask)
        xTaskNotify(networkTask, REQUEST_WIFI_TEST, eSetBits);
      else if (!overflow && strcmp(command, "status") == 0)
        printSensorStatus(readSensors(millis()), millis());
      length = 0;
      overflow = false;
    } else if (!overflow && length < sizeof(command) - 1) command[length++] = ch;
    else overflow = true;  // Discard oversized lines; never echo input/credentials.
  }
}

void loop() {
  serviceSensors(millis());
  serviceSerial();
  const uint32_t now = millis();
  if (latestSensors && uint32_t(now - lastPublish) >= 20) {
    lastPublish = now;
    const TimedSensorSnapshot latest = {readSensors(now), now};
    // Publish invalid snapshots too: never retain a disconnected sensor's value.
    xQueueOverwrite(latestSensors, &latest);
  }
  if (uint32_t(now - lastDiagnostics) >= 1000) {
    lastDiagnostics = now;
    printSensors(readSensors(now));
  }
  delay(2);  // Cooperative yield; intervals are scheduled with millis().
}

bool readLatestSensorSnapshot(SensorSnapshot& sample, uint32_t& observedAt) {
  TimedSensorSnapshot latest;
  if (!latestSensors || xQueuePeek(latestSensors, &latest, 0) != pdTRUE ||
      uint32_t(millis() - latest.observedAt) > waterhall::SAMPLE_MAX_AGE_MS)
    return false;
  sample = latest.sample;
  observedAt = latest.observedAt;
  // A fresh unavailable field is meaningful telemetry, including all-null
  // heartbeats. Never let one failed sensor freeze the other two in the database.
  return true;
}

void telemetryWorker(void*) {
  bool sendRequested = false;
  uint32_t lastSkipped = 0;
  sendSchedule.finished(millis(), true);  // Allow the first fresh sampling window.
  connectToWiFi();
  if (WiFi.status() != WL_CONNECTED || !timeSynchronized)
    sendSchedule.finished(millis(), false);
  for (;;) {
    uint32_t requests = 0;
    xTaskNotifyWait(0, UINT32_MAX, &requests, 0);
    if (requests & REQUEST_SEND) sendRequested = true;
    if (requests & REQUEST_WIFI_TEST) {
      Serial.println("[BENCH] One Wi-Fi disconnect requested; sampling remains active.");
      WiFi.disconnect(false, false);
    }
    const uint32_t now = millis();
    if (!BENCH_CAPTURE_ONLY && SENSOR_WIRING_CONFIRMED && (PRODUCTION_TELEMETRY_ENABLED || sendRequested) &&
        sendSchedule.due(now)) {
      SensorSnapshot fresh;
      uint32_t observedAt;
      if (readLatestSensorSnapshot(fresh, observedAt)) {
        const int result = sendTelemetry();
        if (result != TELEMETRY_NO_SAMPLE) {
          sendRequested = false;
          sendSchedule.finished(millis(), result == TELEMETRY_ACCEPTED, now);
        }
      } else if (uint32_t(now - lastSkipped) >= 5000) {
        lastSkipped = now;
        Serial.println("[HTTP] Waiting for a fresh snapshot; no stale or fabricated POST.");
      }
    }
    vTaskDelay(pdMS_TO_TICKS(20));
  }
}

int sendTelemetry() {
  if (BENCH_CAPTURE_ONLY) return TELEMETRY_FAILED;
  if (!SENSOR_WIRING_CONFIRMED) {
    Serial.println("[HTTP] Skipped: physical wiring/voltage limits are unconfirmed.");
    return false;
  }
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[WIFI] Lost connection. Reconnecting...");
    connectToWiFi();
    if (WiFi.status() != WL_CONNECTED) return false;
  }
  if (!timeSynchronized || time(nullptr) < MIN_VALID_UNIX_TIME) {
    // Wi-Fi can recover in the background after the initial association timed
    // out. Start SNTP here too, rather than waiting for an unstarted service.
    configTime(0, 0, "pool.ntp.org", "time.nist.gov");
    if (!waitForTimeSync()) return TELEMETRY_FAILED;
  }
  // 3. Send HTTP/HTTPS POST to WATERHALL Backend
  // Single network owner; keep a verified TLS connection only if the server
  // supports keep-alive. Failed requests close it before conservative retries.
  static HTTPClient http;
  bool beginOk = false;

  static WiFiClientSecure secureClient; // Must outlive any reusable connection.
  static WiFiClient standardClient;
  http.setReuse(true);
  if (String(SERVER_URL).startsWith("https://")) {
    if (strlen(ROOT_CA) == 0 || strlen(IOT_DEVICE_SECRET) < 32) {
      Serial.println("[TLS/AUTH] FAIL: provision the trusted root and device credential locally before sending.");
      return false;
    }
    Serial.println("[TLS] Production HTTPS enabled; certificate verification required.");
    Serial.println("[TLS] Certificate validation ready (system time valid).");
    secureClient.setCACert(ROOT_CA);
    secureClient.setHandshakeTimeout(15);
    beginOk = http.begin(secureClient, SERVER_URL);
  } else if (ALLOW_INSECURE_LOCAL_HTTP && String(SERVER_URL).startsWith("http://")) {
    beginOk = http.begin(standardClient, SERVER_URL);
  }

  if (!beginOk) {
    Serial.println("[HTTP] Failed to initialize connection to " + String(SERVER_URL));
    return false;
  }

  // Resolve explicitly so DNS failure is distinct from a TLS/TCP failure.
  String serverHost = String(SERVER_BASE_URL);
  serverHost.remove(0, serverHost.indexOf("://") + 3);
  int hostEnd = serverHost.indexOf('/');
  if (hostEnd >= 0) serverHost = serverHost.substring(0, hostEnd);
  hostEnd = serverHost.indexOf(':');
  if (hostEnd >= 0) serverHost = serverHost.substring(0, hostEnd);
  IPAddress serverIP;
  if (!WiFi.hostByName(serverHost.c_str(), serverIP)) {
    Serial.println("[DNS] FAIL: cannot resolve the configured server hostname.");
    http.end();
    return false;
  }
  Serial.println("[DNS] Resolved " + serverHost + " -> " + serverIP.toString());

  // Refresh after Wi-Fi/NTP/DNS waits from the queue, never from shared filters.
  SensorSnapshot sample;
  uint32_t observedAt;
  if (!readLatestSensorSnapshot(sample, observedAt)) {
    http.end();
    return TELEMETRY_NO_SAMPLE;
  }
  const int waterLevelPct = sample.waterLevel;  // Invalid/unmeasured level -> JSON null.
  const float turbidityNTU = sample.turbidity;
  // The focused deployed contract still requires real, valid turbidity.
  if (TDS_PARTIAL_PRODUCTION && !NULLABLE_TURBIDITY_PRODUCTION &&
      !(isfinite(turbidityNTU) && turbidityNTU >= 0 && turbidityNTU <= 10000)) {
    http.end();
    Serial.println("[HTTP] Skipped: partial-TDS contract requires valid turbidity.");
    return TELEMETRY_FAILED;
  }
  if (!NULLABLE_ANALOG_TELEMETRY_SUPPORTED &&
      !waterhall::validTelemetry(turbidityNTU, sample.tds)) {
    http.end();
    Serial.println("[HTTP] Skipped: deployed backend requires valid analog fields; no fabricated/cached values or unsupported null POST.");
    return TELEMETRY_FAILED;
  }
  String jsonPayload = "{";
  if (waterLevelPct >= 0) {
    jsonPayload += "\"water_level_percentage\":" + String(waterLevelPct) + ",";
  } else {
    jsonPayload += "\"water_level_percentage\":null,";
  }
  jsonPayload += "\"turbidity_ntu\":";
  jsonPayload += isfinite(turbidityNTU) && turbidityNTU >= 0 && turbidityNTU <= 10000
      ? String(turbidityNTU, 2) : String("null");
  jsonPayload += ",\"tds_ppm\":";
  jsonPayload += isfinite(sample.tds) && sample.tds >= 0 && sample.tds <= 100000
      ? String(int(lroundf(sample.tds))) : String("null");
  // Existing approximations and all reference interpolation remain provisional.
  // The focused released backend ignores calibration metadata; its existing
  // alert thresholds and cooldown remain unchanged.
  jsonPayload += ",\"calibration_required\":true";
  jsonPayload += "}";
  Serial.println("\n[HTTP] POST " + SERVER_URL);
  Serial.printf("[HTTP] Sample age: %lu ms | distance: %.2f cm\n",
                (unsigned long)uint32_t(millis() - observedAt), sample.distance);
  Serial.println("[HTTP] Payload: " + jsonPayload);

  http.addHeader("Content-Type", "application/json");
  if (strlen(IOT_DEVICE_SECRET) > 0) {
    http.addHeader("X-IoT-Secret", IOT_DEVICE_SECRET);
  }
  http.setTimeout(8000); // 8 second timeout for cloud / edge requests
  http.setConnectTimeout(8000);

  // Quick visual blink on transmit
  digitalWrite(PIN_STATUS_LED, LOW);
  int httpResponseCode = http.POST(jsonPayload);
  digitalWrite(PIN_STATUS_LED, HIGH);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.printf("[HTTP] Response code: %d\n", httpResponseCode);
    Serial.printf("[HTTP] Response: %s\n", response.c_str());
    if (String(SERVER_URL).startsWith("https://")) {
      Serial.println("[TLS] Certificate validation PASS; verified HTTPS response received.");
    }
    if (httpResponseCode == 200) Serial.println("[HTTP] Telemetry accepted");
    else if (httpResponseCode == 401 || httpResponseCode == 403) Serial.println("[AUTH] FAIL: device credential rejected.");
    else if (httpResponseCode == 400 || httpResponseCode == 422) Serial.println("[VALIDATION] FAIL: telemetry rejected.");
    else if (httpResponseCode >= 500) Serial.println("[BACKEND] FAIL: server error; inspect backend/database diagnostics.");
    else Serial.println("[HTTP] FAIL: unexpected status; no success claimed.");
  } else {
    Serial.printf("[HTTP] Error %d sending POST: %s\n", httpResponseCode, http.errorToString(httpResponseCode).c_str());
    if (String(SERVER_URL).startsWith("https://")) {
      char tlsError[160] = {};
      int tlsCode = secureClient.lastError(tlsError, sizeof(tlsError));
      Serial.printf("[TLS] Last error %d: %s\n", tlsCode, tlsError);
      if (httpResponseCode == HTTPC_ERROR_CONNECTION_REFUSED) {
        // Diagnostic TCP-only probe sends no HTTP data or credentials.
        bool tcpConnected = standardClient.connect(serverHost.c_str(), 443, 8000);
        Serial.println(tcpConnected ? "[TCP] Port 443 reachable; inspect the TLS error above."
                                    : "[TCP] FAIL: cannot reach port 443 within 8 seconds.");
        standardClient.stop();
      }
    }
  }

  http.setReuse(httpResponseCode == 200);
  http.end();
  return httpResponseCode == 200 ? TELEMETRY_ACCEPTED : TELEMETRY_FAILED;
}
