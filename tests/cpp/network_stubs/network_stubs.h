// Isolated host substitutes for the Arduino/RTOS/network boundary only.
// The test includes the actual firmware and runs its sensor loop while modeled
// network operations wait. No hardware, credentials, or production requests.
#pragma once
#include <algorithm>
#include <cstdarg>
#include <cstdio>
#include <cstring>
#include <ctime>
#include <iomanip>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>
#include <stdint.h>

class String {
 public:
  std::string value;
  String(const char* text = "") : value(text) {}
  String(const std::string& text) : value(text) {}
  String(int number) : value(std::to_string(number)) {}
  String(float number, unsigned digits = 2) {
    std::ostringstream out; out << std::fixed << std::setprecision(digits) << number;
    value = out.str();
  }
  const char* c_str() const { return value.c_str(); }
  bool startsWith(const char* prefix) const { return value.rfind(prefix, 0) == 0; }
  int indexOf(const char* part) const {
    const size_t pos = value.find(part); return pos == std::string::npos ? -1 : int(pos);
  }
  int indexOf(char part) const {
    const size_t pos = value.find(part); return pos == std::string::npos ? -1 : int(pos);
  }
  void remove(unsigned from, size_t count = std::string::npos) { value.erase(from, count); }
  String substring(unsigned from, unsigned to) const { return value.substr(from, to - from); }
  String& operator+=(const String& other) { value += other.value; return *this; }
  friend String operator+(const String& a, const String& b) { return a.value + b.value; }
};

static uint32_t clockMs = 0, stopAt = 0, physicalChangeAt = UINT32_MAX;
static bool samplingAllowed = false, insideSampling = false, validTime = true;
static uint32_t modeledRecoveryAt = UINT32_MAX;
static unsigned ntpConfigurations = 0;
static uint32_t echoUs = 583;
static uint16_t turbidityRaw = 600, tdsRaw = 600;
static uint32_t modeledTurbidityMv = 600, modeledTdsMv = 600;
static std::vector<uint32_t> echoTimes, analogTimes;
static void advanceSensorTime(uint32_t duration);
constexpr int LOW = 0, HIGH = 1, OUTPUT = 1, INPUT = 0, ADC_0db = 0, ADC_11db = 3;
static int configuredAdcBits = 0, configuredTurbidityAttenuation = -1, configuredTdsAttenuation = -1;
static bool turbidityAdcAttached = false, tdsAdcAttached = false;
inline uint32_t millis() { return clockMs; }
inline void delay(uint32_t duration) {
  if (!samplingAllowed || insideSampling) clockMs += duration;
  else advanceSensorTime(duration);
}
inline void delayMicroseconds(unsigned) {}
inline void pinMode(unsigned char, int) {}
inline void digitalWrite(unsigned char, int) {}
inline int digitalRead(unsigned char) { return HIGH; }
inline void analogReadResolution(int bits) { configuredAdcBits = bits; }
inline void analogSetPinAttenuation(unsigned char pin, int attenuation) {
  // Arduino ESP32 3.3.12 ignores this call until analogRead attaches the pin.
  if (pin == 34) { if (turbidityAdcAttached) configuredTurbidityAttenuation = attenuation; }
  else if (pin == 35) { if (tdsAdcAttached) configuredTdsAttenuation = attenuation; }
  else throw std::runtime_error("Unexpected ADC pin configuration");
}
inline uint32_t pulseIn(unsigned char, int, uint32_t timeout) {
  echoTimes.push_back(clockMs);
  if (!echoUs) clockMs += timeout / 1000;
  return echoUs;
}
inline uint16_t analogRead(unsigned char pin) {
  if (pin == 34 && !turbidityAdcAttached) {
    turbidityAdcAttached = true; configuredTurbidityAttenuation = ADC_11db;
  } else if (pin == 35 && !tdsAdcAttached) {
    tdsAdcAttached = true; configuredTdsAttenuation = ADC_11db;
  }
  return pin == 34 ? turbidityRaw : tdsRaw;
}
inline uint32_t analogReadMilliVolts(unsigned char pin) {
  (void)analogRead(pin);
  if (pin == 35 && configuredTdsAttenuation == ADC_0db)
    throw std::runtime_error("Mixed attenuation cannot use the core's shared 11dB calibration");
  if (pin == 34) analogTimes.push_back(clockMs);
  return pin == 34 ? modeledTurbidityMv : modeledTdsMv;
}
inline time_t waterhall_test_time(time_t*) { return validTime ? 1800000000 : 0; }
inline void configTime(long, int, const char*, const char*) { ++ntpConfigurations; }

struct FakeSerial {
  std::string input, output;
  void begin(unsigned) {}
  int available() const { return int(input.size()); }
  char read() { const char ch = input.front(); input.erase(0, 1); return ch; }
  void print(const char* text) { output += text; }
  void print(const String& text) { output += text.value; }
  template <typename T> void println(const T&) {}
  void println(const char* text) { output += text; output += '\n'; }
  void println(const String& text) { output += text.value; output += '\n'; }
  void printf(const char* format, ...) {
    char text[1024]; va_list args; va_start(args, format);
    vsnprintf(text, sizeof(text), format, args); va_end(args); output += text;
  }
} Serial;

constexpr int WIFI_STA = 1, WL_CONNECTED = 3, ARDUINO_EVENT_WIFI_STA_DISCONNECTED = 1;
using WiFiEvent_t = int;
struct WiFiEventInfo_t { struct { unsigned reason; } wifi_sta_disconnected; };
struct IPAddress { String toString() const { return "192.0.2.1"; } };
struct FakeWiFi {
  bool started = false, connected = false, unavailable = false;
  uint32_t connectDelay = 0, connectAt = 0;
  unsigned disconnects = 0;
  template <typename T> void onEvent(T, int) {}
  void mode(int) {}
  void disconnect(bool, bool) { connected = started = false; ++disconnects; }
  void begin(const char*, const char*) { started = true; connectAt = clockMs + connectDelay; }
  int status() {
    if (started && !unavailable && clockMs >= connectAt) connected = true;
    return connected ? WL_CONNECTED : 0;
  }
  IPAddress localIP() const { return {}; }
  bool hostByName(const char*, IPAddress&) { return true; }
} WiFi;
struct WiFiClient {
  bool connect(const char*, int, int) { return true; }
  void stop() {}
};
struct WiFiClientSecure {
  bool trusted = false;
  void setCACert(const char* root) { trusted = root && *root; }
  void setHandshakeTimeout(int seconds) { if (seconds != 15) throw std::runtime_error("TLS timeout changed"); }
  int lastError(char* output, size_t length) { if (length) *output = '\0'; return 0; }
};
constexpr int HTTPC_ERROR_CONNECTION_REFUSED = -1;
static int modeledResponse = 200;
static uint32_t modeledHttpDelay = 3500;
static unsigned tlsBegins = 0;
static std::vector<std::string> payloads;
static std::vector<uint32_t> postStarts;
static std::vector<int> postResponses;
struct HTTPClient {
  bool reuse = false, trusted = false;
  std::string credential;
  void setReuse(bool enabled) { reuse = enabled; }
  bool begin(WiFiClientSecure& client, const String& url) {
    trusted = client.trusted && url.startsWith("https://"); ++tlsBegins; return trusted;
  }
  bool begin(WiFiClient&, const String&) { throw std::runtime_error("Insecure production HTTP"); }
  void addHeader(const char* name, const char* value) {
    if (strcmp(name, "X-IoT-Secret") == 0) credential = value;
  }
  void setTimeout(int ms) { if (ms != 8000) throw std::runtime_error("HTTP timeout changed"); }
  void setConnectTimeout(int ms) { if (ms != 8000) throw std::runtime_error("TCP timeout changed"); }
  int POST(const String& body) {
    if (!trusted || credential.size() < 32) throw std::runtime_error("Missing verified TLS/auth");
    payloads.push_back(body.value); postStarts.push_back(clockMs);
    advanceSensorTime(modeledHttpDelay); postResponses.push_back(modeledResponse);
    return modeledResponse;
  }
  String getString() const { return modeledResponse == 200 ? "{\"status\":\"success\"}" : "{}"; }
  String errorToString(int) const { return "modeled timeout"; }
  void end() { credential.clear(); }
};

using BaseType_t = int;
using QueueHandle_t = struct TestQueue*;
using TaskHandle_t = void*;
constexpr int pdTRUE = 1, pdPASS = 1, eSetBits = 0;
struct TestQueue { size_t size; std::vector<unsigned char> bytes; bool present = false; };
inline QueueHandle_t xQueueCreate(unsigned length, size_t size) {
  if (length != 1) throw std::runtime_error("Telemetry backlog");
  return new TestQueue{size, std::vector<unsigned char>(size), false};
}
inline int xQueueOverwrite(QueueHandle_t queue, const void* value) {
  memcpy(queue->bytes.data(), value, queue->size); queue->present = true; return pdTRUE;
}
inline int xQueuePeek(QueueHandle_t queue, void* value, unsigned) {
  if (!queue || !queue->present) return 0;
  memcpy(value, queue->bytes.data(), queue->size); return pdTRUE;
}
static uint32_t notifications = 0;
inline int xTaskCreatePinnedToCore(void (*)(void*), const char*, unsigned stack,
    void*, unsigned, TaskHandle_t* task, int core) {
  if (stack < 8192 || core != 0) throw std::runtime_error("Network task configuration");
  *task = reinterpret_cast<void*>(1); return pdPASS;
}
inline void xTaskNotify(TaskHandle_t, uint32_t value, int) { notifications |= value; }
inline void xTaskNotifyWait(uint32_t, uint32_t, uint32_t* value, unsigned) {
  *value = notifications; notifications = 0;
}
struct TestStop {};
inline void vTaskDelay(uint32_t ms) {
  advanceSensorTime(ms);
  if (clockMs >= stopAt) throw TestStop{};
}
#define pdMS_TO_TICKS(ms) (ms)
