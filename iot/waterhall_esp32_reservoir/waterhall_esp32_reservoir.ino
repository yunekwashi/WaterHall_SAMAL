/*
 * ==============================================================================
 * WATERHALL - BARANGAY TAGPOPONGAN IOT RESERVOIR MONITORING NODE
 * ==============================================================================
 * Hardware: ESP32 DevKit V1 (30-pin / 38-pin)
 * Sensors:
 *   1. JSN-SR04T Waterproof Ultrasonic Sensor (Water Level)
 *   2. Analog Turbidity Sensor (Turbidity NTU)
 *   3. Analog TDS Meter Sensor (Total Dissolved Solids ppm)
 *
 * Backend Endpoint:
 *   POST http://<SERVER_IP>:8000/api/iot/telemetry
 * ==============================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>

// ==============================================================================
// 1. NETWORK & SERVER CONFIGURATION
// ==============================================================================
const char* WIFI_SSID     = "[REDACTED]";      // Replace with your WiFi SSID
const char* WIFI_PASSWORD = "[REDACTED]";     // Replace with your WiFi Password

// IP Address of the computer running backend server.py
// Example: "http://192.168.1.100:8000/api/iot/telemetry"
const char* SERVER_URL    = "http://192.168.254.140:8000/api/iot/telemetry";

// Telemetry transmit interval (in milliseconds)
const unsigned long SEND_INTERVAL_MS = 5000; // Send every 5 seconds
unsigned long lastSendTime = 0;

// ==============================================================================
// 2. HARDWARE PIN DEFINITIONS
// NOTE: Use ADC1 pins (GPIO 32 - 39) for analog sensors because ADC2 is disabled
// when WiFi is actively transmitting!
// ==============================================================================
#define PIN_STATUS_LED    2     // Built-in Blue LED for status blinking

// JSN-SR04T Ultrasonic Sensor Pins
#define PIN_TRIG          18    // Digital Output to TRIG
#define PIN_ECHO          19    // Digital Input from ECHO (Use voltage divider if 5V)

// Analog Sensors (ADC1)
#define PIN_TURBIDITY     34    // Analog In from Turbidity Sensor (AOUT)
#define PIN_TDS           35    // Analog In from TDS Sensor (AOUT)

// ==============================================================================
// 3. PHYSICAL RESERVOIR TANK DIMENSIONS (Adjust in centimeters)
// ==============================================================================
// Distance from sensor to the bottom of the empty tank (e.g., 200 cm)
const float TANK_TOTAL_DEPTH_CM = 200.0;

// Dead-band distance from sensor head to maximum water capacity mark (e.g., 20 cm)
const float SENSOR_OFFSET_CM    = 20.0;

// Effective measurable water height
const float MAX_WATER_HEIGHT_CM = TANK_TOTAL_DEPTH_CM - SENSOR_OFFSET_CM;

// ==============================================================================
// 4. SENSOR READING FUNCTIONS
// ==============================================================================

// --- Read Water Level Percentage via JSN-SR04T ---
int readWaterLevelPercentage() {
  // Clear trigger pin
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(4);

  // Send 10-microsecond trigger pulse
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  // Measure pulse duration on echo pin (timeout after 30ms = approx 5 meters)
  long duration = pulseIn(PIN_ECHO, HIGH, 30000);

  if (duration == 0) {
    Serial.println("[JSN-SR04T] Warning: No echo pulse detected (out of range or sensor disconnected).");
    return 68; // Fallback baseline if disconnected during bench test
  }

  // Speed of sound: ~0.0343 cm/microsecond (divide by 2 for round-trip)
  float distanceCm = (duration * 0.0343) / 2.0;

  // Calculate water height
  float waterHeightCm = TANK_TOTAL_DEPTH_CM - distanceCm;
  if (waterHeightCm < 0) waterHeightCm = 0;
  if (waterHeightCm > MAX_WATER_HEIGHT_CM) waterHeightCm = MAX_WATER_HEIGHT_CM;

  int percentage = (int)((waterHeightCm / MAX_WATER_HEIGHT_CM) * 100.0);
  percentage = constrain(percentage, 0, 100);

  Serial.printf("[JSN-SR04T] Distance: %.1f cm | Water Height: %.1f cm | Level: %d%%\n", 
                distanceCm, waterHeightCm, percentage);
  return percentage;
}

// --- Read Turbidity in NTU ---
float readTurbidityNTU() {
  int rawADC = 0;
  // Average 10 consecutive readings for electrical noise immunity
  for (int i = 0; i < 10; i++) {
    rawADC += analogRead(PIN_TURBIDITY);
    delay(5);
  }
  rawADC /= 10;

  // Convert ESP32 12-bit ADC (0 - 4095) to Voltage (0 - 3.3V)
  float voltage = (rawADC / 4095.0) * 3.3;

  // Standard Analog Turbidity Sensor Curve Conversion:
  // Clean water corresponds to ~2.5V - 3.3V (low NTU < 5.0)
  // Turbid/dirty water drops voltage below 2.0V
  float ntu = 0.0;
  if (voltage >= 2.5) {
    // Linear approximation for clear-to-moderate water
    ntu = (3.3 - voltage) * 10.0;
    if (ntu < 0.5) ntu = 0.5; // Clear natural water baseline
  } else {
    // High turbidity
    ntu = 10.0 + (2.5 - voltage) * 20.0;
  }

  Serial.printf("[TURBIDITY] Raw ADC: %d | Voltage: %.2fV | NTU: %.2f\n", rawADC, voltage, ntu);
  return ntu;
}

// --- Read TDS (Total Dissolved Solids) in ppm ---
int readTDSppm() {
  int rawADC = 0;
  for (int i = 0; i < 10; i++) {
    rawADC += analogRead(PIN_TDS);
    delay(5);
  }
  rawADC /= 10;

  float voltage = (rawADC / 4095.0) * 3.3;

  // Temperature compensation formula (assumes 25°C default water temp)
  float compensationCoefficient = 1.0; 
  float compensationVoltage = voltage / compensationCoefficient;

  // Standard Gravity TDS formula:
  // TDS = (133.42 * V^3 - 255.86 * V^2 + 857.39 * V) * 0.5
  float tdsValue = (133.42 * pow(compensationVoltage, 3) - 
                    255.86 * pow(compensationVoltage, 2) + 
                    857.39 * compensationVoltage) * 0.5;

  if (tdsValue < 0) tdsValue = 0;
  int tdsInt = (int)tdsValue;

  Serial.printf("[TDS] Raw ADC: %d | Voltage: %.2fV | TDS: %d ppm\n", rawADC, voltage, tdsInt);
  return tdsInt;
}

// ==============================================================================
// 5. SETUP & WIFI INITIALIZATION
// ==============================================================================
void setup() {
  Serial.begin(115200);
  delay(1000);
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

  // Connect to WiFi
  connectToWiFi();
}

void connectToWiFi() {
  Serial.printf("\n[WiFi] Connecting to %s ", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 25) {
    delay(500);
    Serial.print(".");
    digitalWrite(PIN_STATUS_LED, !digitalRead(PIN_STATUS_LED)); // Toggle LED
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WiFi] Connected successfully!");
    Serial.print("[WiFi] ESP32 Assigned IP: ");
    Serial.println(WiFi.localIP());
    digitalWrite(PIN_STATUS_LED, HIGH); // Steady ON when connected
  } else {
    Serial.println("\n[WiFi] Connection failed. Will retry during telemetry loop.");
    digitalWrite(PIN_STATUS_LED, LOW);
  }
}

// ==============================================================================
// 6. MAIN LOOP & DATA TRANSMISSION
// ==============================================================================
void loop() {
  unsigned long currentMillis = millis();

  // Check if it is time to transmit telemetry
  if (currentMillis - lastSendTime >= SEND_INTERVAL_MS) {
    lastSendTime = currentMillis;

    // Check WiFi connection, attempt reconnect if dropped
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("[WiFi] Lost connection. Reconnecting...");
      connectToWiFi();
      if (WiFi.status() != WL_CONNECTED) {
        return; // Skip sending until connection restored
      }
    }

    // 1. Read all sensor values
    int waterLevelPct = readWaterLevelPercentage();
    float turbidityNTU = readTurbidityNTU();
    int tdsPPM         = readTDSppm();
    float phLevel      = 7.20; // Default or connect pH probe to GPIO 36 (VP)

    // 2. Format JSON Payload matching server schema
    String jsonPayload = "{";
    jsonPayload += "\"water_level_percentage\":" + String(waterLevelPct) + ",";
    jsonPayload += "\"turbidity_ntu\":" + String(turbidityNTU, 2) + ",";
    jsonPayload += "\"ph_level\":" + String(phLevel, 2) + ",";
    jsonPayload += "\"tds_ppm\":" + String(tdsPPM);
    jsonPayload += "}";

    Serial.println("\n[HTTP] Transmitting JSON to " + String(SERVER_URL));
    Serial.println("[HTTP] Payload: " + jsonPayload);

    // 3. Send HTTP POST to WATERHALL Backend
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    // Quick visual blink on transmit
    digitalWrite(PIN_STATUS_LED, LOW);
    int httpResponseCode = http.POST(jsonPayload);
    digitalWrite(PIN_STATUS_LED, HIGH);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.printf("[HTTP] Server Response [%d]: %s\n", httpResponseCode, response.c_str());
    } else {
      Serial.printf("[HTTP] Error sending POST: %s\n", http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  }
}
