# 🌊 WATERHALL IoT Hardware Assembly & Wiring Guide
**Barangay Tagpopongan Water Management System (IGACOS)**

---

## 📋 Components Checklist
1. **ESP32 DevKit V1** (30-pin or 38-pin version)
2. **JSN-SR04T Waterproof Ultrasonic Distance Sensor** (with driver board)
3. **Gravity Analog Turbidity Sensor** (probe + adapter module)
4. **Gravity Analog TDS Meter Sensor** (probe + adapter module)
5. **Jumper Wires** (Female-to-Male and Male-to-Male)
6. **5V Power Supply / USB Cable / Powerbank**
7. *(Recommended)* Two resistors for JSN-SR04T echo voltage divider: **1kΩ** and **2kΩ** (or direct connection if module supports 3.3V).

---

## ⚡ Master Pin Connection Table

| Sensor / Module | Sensor Pin | ESP32 Pin | Function / Notes |
| :--- | :--- | :--- | :--- |
| **JSN-SR04T Ultrasonic** | `VCC` | `VIN` or `5V` | Sensor requires 5V power |
| | `GND` | `GND` | Common Ground |
| | `TRIG` | `GPIO 18` | Trigger output pulse (3.3V logic) |
| | `ECHO` | `GPIO 19` | Echo input pulse (via 1k/2k divider or direct) |
| **Turbidity Sensor** | `VCC` | `5V` (or `3.3V`) | Power pin |
| | `GND` | `GND` | Common Ground |
| | `AOUT` / `Signal` | `GPIO 34` | **ADC1 Channel 6** (Analog In: 0 - 3.3V) |
| **TDS Meter Sensor** | `VCC` | `3.3V` (or `5V`) | Power pin |
| | `GND` | `GND` | Common Ground |
| | `AOUT` / `Signal` | `GPIO 35` | **ADC1 Channel 7** (Analog In: 0 - 3.3V) |

---

## ⚠️ Critical ESP32 Hardware Rules (Avoid Common Mistakes!)

1. **Why we use GPIO 34 and GPIO 35 for Analog Readings:**
   - The ESP32 has two Analog-to-Digital Converters: **ADC1** and **ADC2**.
   - **ADC2** (GPIO 0, 2, 4, 12-15, 25-27) is **turned off internally by the ESP32 whenever WiFi is transmitting data**.
   - Therefore, analog sensors **MUST** be connected to **ADC1 pins** (`GPIO 32, 33, 34, 35, 36, 39`). GPIO 34 and 35 are dedicated input-only ADC1 pins, making them 100% stable while WiFi is active.

2. **JSN-SR04T Echo Protection (Optional Voltage Divider):**
   - The JSN-SR04T driver board operates at 5V, so its `ECHO` pin outputs a 5V signal.
   - To protect the ESP32 3.3V GPIO 19, you can place a simple voltage divider:
     ```
     JSN-SR04T ECHO ---> [ 1kΩ Resistor ] ---> ESP32 GPIO 19
                                         |
                                  [ 2kΩ Resistor ]
                                         |
                                        GND
     ```
   - *Note:* Many modern JSN-SR04T v2.0/v3.0 boards support 3.3V - 5V directly.

3. **Turbidity Sensor Toggle Switch:**
   - The turbidity adapter module has a small slide switch labeled **"A / D"** (Analog / Digital).
   - Ensure this switch is flipped to **"A" (Analog)** so the ESP32 receives variable voltage measurements rather than high/low thresholds.

---

## 🛠️ Step-by-Step Setup in Arduino IDE

### Step 1: Install ESP32 Board Package
1. Open **Arduino IDE**.
2. Go to **File > Preferences**.
3. In **Additional Board Manager URLs**, paste:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
4. Click **OK**.
5. Go to **Tools > Board > Boards Manager...**, search for `esp32` by Espressif Systems, and click **Install**.

### Step 2: Open and Configure Sketch
1. Open the file: `iot/waterhall_esp32_reservoir/waterhall_esp32_reservoir.ino`.
2. Update your WiFi credentials near line 24:
   ```cpp
   const char* WIFI_SSID     = "Your_WiFi_Name";
   const char* WIFI_PASSWORD = "Your_WiFi_Password";
   ```
3. Update the server IP address (the computer running the WATERHALL Python server):
   ```cpp
   const char* SERVER_URL    = "http://192.168.254.140:8000/api/iot/telemetry";
   ```
   *(To find your computer's local IP, open PowerShell and type `ipconfig`).*

### Step 3: Flash to ESP32
1. Connect your ESP32 to your PC via Micro-USB / USB-C data cable.
2. Under **Tools > Board**, select **DOIT ESP32 DEVKIT V1** (or ESP32 Dev Module).
3. Under **Tools > Port**, select the COM port of your ESP32 (e.g., `COM3`, `COM4`).
4. Click **Upload** (Arrow icon).
   *(If it gets stuck on `Connecting......`, press and hold the **BOOT** button on the ESP32 board for 2 seconds until uploading begins).*

---

## 🧪 Verification & First Live Test

1. Open **Tools > Serial Monitor** in Arduino IDE and set the baud rate to **115200**.
2. Press the **EN / RESET** button on the ESP32.
3. You will see:
   ```text
   [WiFi] Connecting to [REDACTED] .....
   [WiFi] Connected successfully!
   [WiFi] ESP32 Assigned IP: 192.168.254.150
   [JSN-SR04T] Distance: 45.2 cm | Water Height: 154.8 cm | Level: 77%
   [TURBIDITY] Raw ADC: 3410 | Voltage: 2.75V | NTU: 5.50
   [TDS] Raw ADC: 1850 | Voltage: 1.49V | TDS: 142 ppm
   [HTTP] Transmitting JSON to http://192.168.254.140:8000/api/iot/telemetry
   [HTTP] Server Response [200]: {"message":"IoT sensor data ingested successfully","status":"success"}
   ```
4. Now, open the WATERHALL Web Portal:
   - Both the **Resident Portal** and **Worker Field Terminal** will automatically update their **Central Reservoir Telemetry** cards with the live readings every 5 seconds!
