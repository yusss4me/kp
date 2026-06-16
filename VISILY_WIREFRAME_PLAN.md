# Visily AI Wireframe Generation Plan: YAMUTI Management System

**Project Context:**
This is a web application for Yayasan Mutiara Titipan Ilahi (YAMUTI), a foundation/orphanage. The system has three main parts: 
1. **Public Website:** For visitors, donors, and guests.
2. **Admin Dashboard:** For operational staff to manage orphans, donations, visits, and content.
3. **Owner Dashboard:** For the foundation owner to monitor high-level reports and manage admins.

**Design Style/Theme Requirements:**
- **Aesthetic:** Clean, modern, trustworthy, and professional.
- **Color Palette:** Soft, welcoming colors (e.g., green, white, soft gray) representing charity and hope.
- **Layout:** Responsive. Dashboards should use a classic Sidebar (Left) + Top Header layout.

---

## 1. PUBLIC WEBSITE SCREENS

### Screen 1.1: Landing Page (Home)
- **Purpose:** Introduce the foundation and invite people to donate or visit.
- **Key Components:**
  - Top Navbar (Logo, Home, Explore, News, Visit, Donate Button).
  - Hero Section (Large emotional image, Headline, "Donate Now" primary button).
  - About Us / Explore Section (Brief history, mission).
  - Programs / Activities Section (Cards showing recent activities).
  - Footer (Contact info, address, social media links).

### Screen 1.2: Public Donation Page (Donasi)
- **Purpose:** Form for public users to submit a donation (Money or Goods).
- **Key Components:**
  - Top Navbar.
  - Form Container (Centered): 
    - Input: Name, WhatsApp Number.
    - Toggle: "Uang" (Money) or "Barang" (Goods).
    - Input: Nominal / Item Name.
    - File Upload: Transfer Receipt.
    - Textarea: Prayer/Message.
  - Submit Button.

### Screen 1.3: Public Visit Registration (Kunjungan)
- **Purpose:** Form for public users or institutions to request a visit.
- **Key Components:**
  - Form Container:
    - Inputs: Institution Name, PIC Name, WhatsApp, Date, Time, Purpose, Number of Guests.
  - Submit Request Button.

---

## 2. AUTHENTICATION SCREENS

### Screen 2.1: Login Page
- **Purpose:** Access point for Admins, Owners, and registered Donors.
- **Layout:** Split screen (Left: Beautiful image of the foundation, Right: Form).
- **Key Components:**
  - Input: Email, Password.
  - Link: "Forgot Password?".
  - Button: "Sign In".
  - Link: "Don't have an account? Register".

### Screen 2.2: Register Page
- **Purpose:** For public users/donors to create an account.
- **Key Components:**
  - Inputs: Full Name, Email, WhatsApp, Password, Confirm Password.
  - Button: "Sign Up".

---

## 3. DONOR / USER DASHBOARD SCREENS
*Screens for authenticated public users/donors to manage their profile and track their donations.*

### Screen 3.1: User Dashboard (Home)
- **Purpose:** Welcome page for logged-in donors, showing their impact.
- **Key Components:**
  - Top Navbar (with User Profile dropdown).
  - Welcome Banner ("Hello, [Name]").
  - Summary Cards (Total Donated, Number of Donations).
  - Recent Donations Table (Date, Nominal, Status).
  - "Donate Again" quick action button.

### Screen 3.2: User Profile Settings
- **Purpose:** Allow users to update their personal information.
- **Key Components:**
  - Form: Name, Email, WhatsApp Number, Address.
  - Password Change Section.
  - "Save Changes" Button.

---

## 4. ADMIN DASHBOARD SCREENS
*All screens here share a common layout: Left Sidebar Navigation and a Top Header (User Profile, Notifications).*

### Screen 4.1: Admin Dashboard (Overview)
- **Purpose:** Quick operational overview.
- **Key Components:**
  - 4 Summary Cards (Total Orphans, Pending Visits, Unverified Donations, Total Articles).
  - Recent Activities Table / Feed.

### Screen 3.2: Data Anak Asuh (Orphans Management)
- **Purpose:** View and manage the list of orphans.
- **Key Components:**
  - Page Title & "Add New Data" Button.
  - Search Bar & Filter (Status: Active/Alumni).
  - Data Table (Columns: Photo, Name, Age, Status, Entry Date, Actions: Edit/Delete).
  - Pagination.

### Screen 3.3: Form Tambah Anak Asuh (Add Orphan)
- **Purpose:** Form to input new orphan data.
- **Key Components:**
  - Form Layout (2 Columns):
    - Text Inputs: Full Name, Place of Birth.
    - Date Picker: Date of Birth, Entry Date.
    - Dropdown: Gender, Orphan Status.
    - File Upload: Profile Photo.
    - Textarea: Health History, Education.
  - Buttons: Cancel, Save.

### Screen 3.4: Manajemen Kunjungan (Visits Management)
- **Purpose:** Review visit requests from the public.
- **Key Components:**
  - Data Table (Columns: PIC, Institution, Date, Guests, Status).
  - Status Badges (Pending [Yellow], Approved [Green], Rejected [Red]).
  - Action Buttons (Approve, Reject, View Details).

### Screen 3.5: Manajemen Donasi (Donations Management)
- **Purpose:** Verify incoming donations.
- **Key Components:**
  - Data Table (Donator Name, Amount/Item, Proof Image Thumbnail, Status).
  - Action: "Verify Receipt" Button (opens a modal to view the image full size and approve).

### Screen 3.6: CMS / Berita (Articles Management)
- **Purpose:** Manage news and articles.
- **Key Components:**
  - List of Articles (Cards or Table).
  - "Write New Article" Button.
  - Form: Title input, Category dropdown, Cover Image Upload, WYSIWYG Rich Text Editor.

---

## 5. OWNER DASHBOARD SCREENS
*All screens here share the Left Sidebar + Top Header layout, but with different menu items.*

### Screen 5.1: Owner Dashboard & Financials
- **Purpose:** High-level overview of the foundation's health.
- **Key Components:**
  - Financial Summary Cards (Total Balance, Monthly Income, Monthly Expense).
  - Line Chart (Income vs Expense over 12 months).
  - Pie Chart (Donation sources/types).

### Screen 4.2: Manajemen Admin (Admin Management)
- **Purpose:** Add or remove operational admins.
- **Key Components:**
  - Data Table (Columns: Name, Email, Role, Status).
  - "Add Admin" Button.

### Screen 4.3: Add Admin Modal
- **Purpose:** Quick form to register a new admin.
- **Key Components:**
  - Modal Window.
  - Inputs: Name, Email, Password.
  - Dropdown: Role Assignment.
  - Buttons: Cancel, Create Admin.
