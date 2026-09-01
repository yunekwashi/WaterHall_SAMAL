# WATERHALL Mobile Wrapper & Web App Overhaul Walkthrough

We have successfully split the water management client into two independent, role-segregated apps and implemented a brand new **Flutter Wrapper App** with customizable IP connections!

---

## 🛠️ Changes Implemented

### 1. Unified Login Design (Perfect Admin Layout Followed) [NEW]
*   **Design Alignment:** Replaced the separate login designs for Worker and Resident portals in `web/index.html` and `web/styles.css` with a card-container layout matching the perfect Admin Portal layout.
*   **Clean Field Layout:** Removed user and lock icon SVGs from the input wrappers. All labels are structured above clean, borderless, semi-translucent inputs.
*   **Password Visibility Toggle:** Integrated an eye show/hide toggle button onto the Worker & Resident password inputs, controlled dynamically via event listeners inside `web/app.dart`.
*   **Centered Card Style Logo:** Centered the logo with a standard width of `140px` and custom border-radius, displaying uppercase, letter-spaced role titles (`Worker Portal` or `Resident Portal`) underneath.
*   **Unified Gold Action Button:** Styled the login button with full-width golden color matching the Admin Portal.
*   **Responsive Forgot Password Modal:** Verified the forgot password modal trigger and inputs are fully functional and responsive on both mobile and admin sites.

---

### 2. Robust Server Offline Lock (Admin Website)
*   **Complete UI Lockout:** Implemented a body-level CSS rule `body.server-offline > *:not(#admin-offline-overlay) { display: none !important; }` in `admin_web/styles.css`.
*   **State Toggle:** Configured `admin_web/app.js` to add the `server-offline` class to the `body` immediately when the server health check fails, and remove it only when a connection is restored. This completely hides the sidebar, login, and dashboard views, preventing any access/leakage of cached data when the server is off.

---

### 3. Table Column Alignment (Assigned Column Removal)
*   **Logs Table Alignment:** Removed the `Assigned To` (technician ID) column from the Recent Field Maintenance Logs table on the Admin Dashboard (`admin_web/index.html` and `admin_web/app.js`). This aligns the admin ticket log with the simplified worker ticket log.

---

### 4. Admin Website Autofill Removal & Recovery Flow
*   **Autofill Removal:** Cleaned up `admin_web/index.html` by removing default `value="admin"` and `value="waterhall2026"` attributes from login inputs, forcing manual credential entry like a standard website.
*   **Registered Recovery Contact Info:** Modified registration modals (Resident & Worker) to collect the user's **Contact Number** on creation, mapping them to `contact_no` columns.
*   **Interactive Recovery Flow:** Created an **Account Recovery Modal** on both the Admin Website and the mobile client portal.
*   **Security Recovery Backend:** Added the `/api/recover-account` endpoint in `server.py` to match the role, username, and contact number (verifying it by normalizing formatting) before securely updating the user's hashed password.

---

### 5. Robust Account & Password Security
*   **Disabled Global Default Password Fallback:** Removed the insecure `or password == 'waterhall2026'` override from the server backend (`server.py`). The system no longer permits accessing any account via this fallback.
*   **Enforced Unique Password Verification:** Both worker logins (`users` table) and resident logins (`households` table) now strictly authenticate using Werkzeug's `check_password_hash` against the account's assigned unique password.
*   **Strict Client-Side Cleanups:** Cleaned up the mock credential bypasses inside `web/db.dart` (`validateWorker` and `validateResident`) to match exact passwords, eliminating mock vulnerabilities.

---

### 6. Removal of "By Purok" Restriction (Worker App)
*   **Simplified Worker Login:** Removed the "Zone Assignment" select dropdown container from the worker login screen in `web/index.html`.
*   **Removed Tactical Map Widget:** Removed the "Assigned Patrol Zones" section, map widget, and card grids from the worker dashboard. Since there are only a few workers, they manage the entire service area.
*   **Updated Profile Metric:** Removed the assigned zone label from the profile and updated the "Assigned Meters" count metric to show **Total Managed Meters** across the entire barangay.

---

### 7. Resident Reports Schema & Organization
To store and retrieve resident reports in the exact hierarchy requested (**Resident ➡️ Household Number ➡️ Message ➡️ Photo**), we query the SQLite database using a relational join:
*   **Resident Name:** Pulled from `households.family_head_name`.
*   **Household Number:** Pulled from `maintenance_logs.house_id` (joined on `households.household_id`).
*   **Message:** Pulled from `maintenance_logs.description` (automatically formatted as `[Category Option] Details`).
*   **Photo:** Saved directly as raw base64 data in `maintenance_logs.photo_base64`.

---

### 8. Dropdown & Photo Evidence Reporting (Resident Portal)
To simplify reporting for residents and make notifications to technicians more formal and action-ready, the issue logging interface has been enhanced:
*   **Problem Category Select Dropdown:** Added a structured dropdown selector with emoji indicators (e.g. `💧 Water Leak (High flow/flooding)`, `📉 Low Water Pressure`, `🧪 Cloudy / Discolored Water`, `📟 Broken Water Meter`).
*   **Evidence Attachment Input:** Integrated a dashed photo container where residents can select and preview an image (e.g., of a pipe leak or cloudy glass) using native file selection.
*   **Base64 Database Storage:** The image is converted to a base64 string on the client and stored in the database's new `photo_base64` column inside the `maintenance_logs` table.
*   **Inline Tech Previews:** The uploaded photo is rendered inline inside the `log-card` list when technicians view a household's history, and displayed as a clickable thumbnail on the Admin Dashboard under the recent tickets table.

---

### 9. Unified Profile Logout Card
To improve the user experience and align with the requested design mockup, we replaced the generic text logout buttons in both apps with a premium card-based layout:
*   **Design Match:** The new card features a dark navy background (`#0d2c40`), subtle borders, and smooth flex alignment.
*   **Dynamic Avatar:** A 3D-shaded blue gradient circle displaying the initials of the currently logged-in user (e.g. `BT` for Bob Tester).
*   **User Details:** Clearly displays the user's name and role (`System Administrator` for techs, `Resident Citizen` for residents).
*   **Integrated Action Icon:** A red exit icon on the right side of the card triggers the logout process when clicked.

---

### 10. Strict Non-Zoomable App Styling
To give the WebView wrappers a premium, native, app-like feel, zooming and scaling have been completely disabled across three layers:
*   **Flutter WebView controller level:** Added `..enableZoom(false)` to both apps (`waterhall_flutter/lib/main.dart` and `waterhall_resident_flutter/lib/main.dart`).
*   **HTML Viewport meta level:** Updated the viewport tag in `web/index.html` to block user scaling:
    `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`
*   **CSS gesture control level:** Configured `touch-action: pan-x pan-y;` on the `body` class in `web/styles.css` to disable pinch and double-tap zoom gestures.

---

## 🚀 How to Run the Flutter Project Later
1.  Install Flutter SDK on your PC.
2.  Open your terminal in the `waterhall_flutter/` or `waterhall_resident_flutter/` folder.
3.  Run:
    ```bash
    flutter pub get
    flutter run
    ```
4.  To compile a release APK for your phone:
    ```bash
    flutter build apk
    ```
