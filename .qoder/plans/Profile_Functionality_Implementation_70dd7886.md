# Profile Functionality Implementation

## Current Issues Identified

1. **Admin Profile** (`/admin/profile/page.tsx`): Uses hardcoded name, logout is a stub, and `className="hidden"` on the `AdminProfileHeader` and `AdminProfileMenuGroup` containers makes most content invisible.
2. **Owner Profile**: No profile page exists at all -- no `/owner/profile` route.
3. **Donatur Profile** (`/home/profil/page.tsx`): The "Keluar Akun" button in `ProfileTemplate` does not call `authStore.logout()`. Sub-pages (personal-info, security, contact) are all simulated with `alert()`.
4. **Routes**: `routes.owner` has no `profile` entry; `routes.user.aktivitas.profile.root()` is used by the donatur navbar flyout but the admin/owner sidebars don't link to their own profile pages.

---

## Task 1: Add Profile API Service

**File**: `app/lib/api/services/auth.ts`

Add two new functions:
- `fetchProfile()` -- `GET /profile` to fetch the authenticated user's full profile (name, email, phone, address, photo)
- `updateProfile(payload)` -- `PUT /profile` to update user profile data

Add corresponding types (`ProfileResponse`, `UpdateProfilePayload`).

---

## Task 2: Add Owner Profile Route Constant

**File**: `app/lib/constants/routes.ts`

Add `profile: { root: () => '/owner/profile' }` inside the `owner` object.

---

## Task 3: Fix Admin Profile Page

**Files**:
- `app/admin/profile/page.tsx` -- Connect to `useAuthStore` for real user name/email/image. Wire `onLogout` to `store.logout()` + redirect to `/auth`. Remove local stub state.
- `app/ui/templates/admin-profile.tsx` -- Pass through props properly; remove the hardcoded name in favor of props.
- `app/ui/organisms/admin-profile-header.tsx` -- Remove `className="hidden"` from the root Container so the header is visible. Fix stat cards visibility.
- `app/ui/organisms/AdminProfileMenuGroup.tsx` -- Remove `className="hidden"` from the menu section Containers so menu items are visible.

---

## Task 4: Create Owner Profile Page

**Files**:
- `app/owner/profile/page.tsx` (new) -- Reuse `AdminProfileTemplate` with owner-specific data from `useAuthStore`. Wire logout to `store.logout()` + redirect to `/auth`.
- Update `app/owner/layout.tsx` -- No changes needed; sidebar already shows user info. The Navbar's profile flyout will handle profile access.

---

## Task 5: Wire Logout in Donatur ProfileTemplate

**File**: `app/ui/templates/profile.tsx`

- Add `onLogout` prop to `ProfileTemplateProps`.
- Wire the "Keluar Akun" `Btn` to call `onLogout()`.

**File**: `app/home/profil/page.tsx`

- Pass `onLogout` handler that calls `useAuthStore.getState().logout()` then `router.push("/auth/donatur")`.

---

## Task 6: Fix Profile Sub-Pages

### 6a. Personal Info (`app/ui/templates/profile-personal-info.tsx`)
- Add `onSubmit` prop or connect to auth store to save name changes.
- Pre-fill form fields from `useAuthStore` user data instead of hardcoded defaults.
- On save, call `updateProfile` API (from Task 1) and update the auth store.

### 6b. Security / Change Password (`app/ui/templates/profile-security.tsx`)
- Convert to `"use client"` component with `useForm`.
- Add `current_password`, `new_password`, `password_confirmation` fields with Zod validation.
- On submit, call `PUT /profile/password` via API service.
- Show success/error messages inline.

### 6c. Contact Form (`app/ui/templates/profile-contact.tsx`)
- Replace simulated `alert()` with a real `POST /contact` API call.
- Show success/error toast inline instead of `alert()`.

### 6d. Notifications (`app/ui/templates/profile-notifications.tsx`)
- Convert to `"use client"`, persist notification preferences to localStorage.
- Use a simple Zustand slice or localStorage directly.

---

## Task 7: Update Navbar Profile Flyout for Admin/Owner

**File**: `app/ui/organisms/nav-bar.tsx`

The navbar already renders a `ProfileTemplate` flyout for all portals. The admin/owner layouts pass user data but use the donatur `PROFILE_MENU_GROUPS`. We need to:
- Accept a `profileMenuGroups` prop in `NavbarProps` (optional, defaults to donatur menu).
- Pass admin/owner-specific menu groups from `app/admin/layout.tsx` and `app/owner/layout.tsx`.

### Admin/Owner Profile Menu Constants

**File**: `app/lib/constants/profile-constants.tsx`

Add `ADMIN_PROFILE_MENU_GROUPS` and `OWNER_PROFILE_MENU_GROUPS` with relevant links (e.g., admin: manage programs, verify donations; owner: view reports, manage admins).

---

## Task 8: Verify Build

Run `pnpm build` to ensure no TypeScript or build errors.
