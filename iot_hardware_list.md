# WATERHALL Capstone: Final IoT Shopping List

Because the system relies on **manual meter reading by field workers for billing** and **no leak detection**, you only need IoT hardware for the **Main Reservoir**. 

This makes the hardware incredibly affordable and easy to deploy. Below is the final, definitive list of everything you need to purchase for your real-world deployment by September 28.

### 1. The Microcontroller (The Brain)
You only need exactly **one** of these. It will read the sensors at the reservoir and send the data to your cloud server via Wi-Fi.
* **ESP32 Development Board (38-pin or 30-pin)**
  * *Quantity:* 1
  * *Estimated Cost:* ~₱250

### 2. Water Level Sensor
This measures how full the barangay's main water tank is.
* **JSN-SR04T Waterproof Ultrasonic Distance Sensor**
  * *Quantity:* 1
  * *Estimated Cost:* ~₱400
  * *Why waterproof?* Normal ultrasonic sensors (like the HC-SR04) will rust and short-circuit from the condensation inside a real water tank. You *must* use this waterproof version.

### 3. Water Quality Sensors
These ensure the water is safe before distribution.
* **Analog Turbidity Sensor Module (TS-300B or similar)**
  * *Quantity:* 1
  * *Estimated Cost:* ~₱500
  * *Purpose:* Measures how cloudy or dirty the water is (NTU).
* **Analog TDS Sensor (Total Dissolved Solids) - *Optional but highly recommended***
  * *Quantity:* 1
  * *Estimated Cost:* ~₱400
  * *Purpose:* Measures water purity (ppm) to populate the TDS reading on your dashboard.

### 4. Wiring & Electronics Essentials
You need these to safely connect the sensors to the ESP32 without soldering everything permanently.
* **Jumper Wires (Dupont Cables)**
  * *Quantity:* 1 multipack (Make sure to get a mix of Female-to-Female and Male-to-Female).
  * *Estimated Cost:* ~₱100
* **Breadboard (Medium/400-tie points)**
  * *Quantity:* 1
  * *Estimated Cost:* ~₱50
* **5V Power Supply**
  * *Quantity:* 1 (A standard Micro-USB or USB-C phone charger wall adapter and cable to keep the ESP32 powered 24/7).
  * *Estimated Cost:* ~₱150

---

### Grand Total Estimate: ~₱1,850 PHP

You can order all of these items today on Shopee, Lazada, or from local electronics stores (like e-Gizmo or MakerLab Electronics). 

Once they arrive, you will wire them up to the single ESP32 board, and we will write a simple C++ script to push the live data straight to your Flask backend!
