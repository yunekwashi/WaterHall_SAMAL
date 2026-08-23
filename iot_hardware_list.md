# WATERHALL IoT Hardware Shopping List

Based on the telemetry your app is tracking, you need to build two main IoT nodes: one for the **Central Reservoir** (tracking Water Level and Turbidity) and multiple nodes (or a centralized node) for the **Household Meters** (tracking Water Flow/Leaks).

Here is the complete list of hardware components you need to purchase:

## 1. Microcontrollers & Connectivity
You need the "brains" of the operation to read the sensors and send the data over Wi-Fi to your Python server (`192.168.254.140`).
* **ESP32 Development Board** (Recommended) or **ESP8266 (NodeMCU)**
  * *Quantity:* 2 or more (1 for the Reservoir, 1+ for the Household Meters depending on your physical setup)
  * *Purpose:* Reads analog/digital signals from sensors and posts JSON data to your server over Wi-Fi.

## 2. Central Reservoir Sensors
This equipment will simulate and measure the main water tank's status.
* **Ultrasonic Distance Sensor (HC-SR04)** or **Waterproof Ultrasonic Sensor (JSN-SR04T)**
  * *Quantity:* 1
  * *Purpose:* Measures the distance to the water surface to calculate the **Water Level** percentage. The waterproof JSN-SR04T is highly recommended for real water tanks to prevent corrosion.
* **Turbidity Sensor Module (Analog)** (e.g., TS-300B)
  * *Quantity:* 1
  * *Purpose:* Measures the cloudiness/clarity of the water to provide the **Turbidity (NTU)** reading. It usually comes with a probe and a small signal conditioning board.

## 3. Household Water Meter Sensors (Leak Detection)
This equipment will measure the flow of water to individual houses to detect leaks (constant flow rates).
* **YF-S201 (1/2") or YF-B7 (1/2" Brass) Water Flow Sensor**
  * *Quantity:* 1 for every household you want to physically simulate (e.g., 2 to 4 for a good physical prototype).
  * *Purpose:* Uses a Hall effect sensor to measure the **Flow Rate (L/s)**. If the flow remains constant when it shouldn't, your backend flags it as a leak.

## 4. Electronics Prototyping Essentials
The supporting components required to wire everything together safely.
* **Jumper Wires** (Male-to-Male, Male-to-Female, Female-to-Female)
  * *Quantity:* 1 multi-pack
* **Breadboards** (Medium or Large)
  * *Quantity:* 2 or 3 (for prototyping before soldering)
* **Resistors (10k Ohms, 4.7k Ohms)**
  * *Quantity:* 1 small kit (useful for pull-up resistors on the flow sensors if needed).
* **Power Supply (5V Micro USB or Type-C Cable + Wall Adapter)**
  * *Quantity:* 1 per ESP32 board to power them constantly.

## 5. Plumbing & Physical Simulation Materials (Optional but Recommended for Defense)
To prove your capstone works during your final defense, you'll need a physical rig.
* **Small Plastic Containers/Tanks** (to act as the Central Reservoir)
* **PVC Pipes (1/2 inch) and Valves** (to route water through the flow sensors)
* **Small Submersible Water Pump (5V - 12V)** (to push water through your system to simulate flow)

**Connecting to the App:**
Once you have the parts, you will write a simple C++ script using the Arduino IDE for the ESP32. The script will read the sensors and send an HTTP `POST` request to `http://192.168.254.140:8000/api/all-data` (your Python server) with a JSON payload, exactly mimicking what the simulator sliders do right now!
