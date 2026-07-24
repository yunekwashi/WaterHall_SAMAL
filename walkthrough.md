# WATERHALL Mobile Wrapper & Web App Overhaul Walkthrough

We have successfully split the water management client into two independent, role-segregated apps and implemented a brand new **Flutter Wrapper App** with customizable IP connections!

---

## 🛠️ Changes Implemented

### 1. Flutter Mobile App Wrapper ([NEW] [`waterhall-flutter/`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/waterhall-flutter))
We created a clean Flutter project structure so you can show a working Flutter codebase to your professor:
*   **[`pubspec.yaml`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/waterhall-flutter/pubspec.yaml):** Configured dependencies:
    *   `webview_flutter`: For rendering the web apps.
    *   `shared_preferences`: For storing the server's IP address.
*   **[`lib/main.dart`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/waterhall-flutter/lib/main.dart):**
    *   **Full-Screen WebView Container:** Automatically launches the app dashboard via the configured server IP.
    *   **Interactive Connection Settings Dialog:** Tapping the settings gear icon (⚙️) on the top-right prompts a dialog box where the user can enter the server PC's current local IP address and toggle between **Worker Portal** and **Resident Portal** modes inside a single install!
    *   **Persistent Storage:** Saves changes to local storage, keeping settings active across restarts.
*   **Android Configurations:** Included internet/cleartext configurations inside `AndroidManifest.xml` and Gradle configs inside `build.gradle` to build target binaries smoothly.
*   **[`README.md`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/waterhall-flutter/README.md):** Added step-by-step setup guides to install Flutter and run/build the project.

---

### 2. Android build flavors (Kotlin/Compose Wrapper)
*   **Worker Flavor (`waterhall-worker.apk`):** Pointed the WebView to `/index.html?role=worker`. Hides nothing on the login page but only accepts technician logins.
*   **Resident Flavor (`waterhall-resident.apk`):** Pointed the WebView to `/index.html?role=resident`. Hides the Purok options from citizens and only accepts resident account logins.
*   **IP Settings dialog:** Includes a floating configuration gear button at the top-right of the Kotlin Compose screens to reload URLs dynamically and save IP settings inside Android `SharedPreferences`.

---

### 3. Database Custom Technicians Seeding
*   Updated seed records in [`server.py`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/server.py) and [`web/db.dart`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/web/db.dart) to reflect your actual names:
    *   `EMP-301` ➡️ **Michael Balaga** (Lead Field Tech)
    *   `EMP-304` ➡️ **Ryiel Banggat** (Field Technician)
    *   `EMP-308` ➡️ **John Dave Chicote** (Zone Inspector)
*   Reset database and verified the correct records reside in the SQLite `users` table.

---

## 🚀 How to Run the Flutter Project Later
1.  Install Flutter SDK on your PC (see guidelines in the [`README.md`](file:///c:/Users/Windows/Documents/capstone/WATER-HALL_DART/waterhall-flutter/README.md)).
2.  Open your terminal in the `waterhall-flutter/` folder.
3.  Run:
    ```bash
    flutter pub get
    flutter run
    ```
4.  To compile a release APK for your phone:
    ```bash
    flutter build apk
    ```
