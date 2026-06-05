# Analisis Kekurangan Proyek — web-yamuti

> **Tanggal Analisis:** 3 Juni 2026  
> **Versi Stack:** Next.js 16.2.2 · React 19.2.4 · TypeScript · TailwindCSS v4 · Zustand v5

---

## Ringkasan Eksekutif

Proyek **web-yamuti** adalah aplikasi manajemen yayasan berbasis web yang dibangun untuk mendukung operasional donasi, anak asuh, inventaris, keuangan, kunjungan, dan CMS. Secara keseluruhan, arsitektur frontend sudah terstruktur menggunakan Atomic Design, namun terdapat sejumlah kekurangan signifikan di lapisan data, keamanan, kualitas kode, dan kelengkapan fungsionalitas yang perlu ditangani sebelum produksi.

---

## 1. Arsitektur & Manajemen State

### 1.1 Seluruh Data Utama Masih Berupa Mock / Data Lokal

**Lokasi:** [`app/lib/stores/yamuti-store.ts`](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts) · [`app/constants/mockData.ts`](file:///e:/kp/web-yamuti/app/constants/mockData.ts)

**Masalah:**  
Hampir seluruh data operasional (program donasi, keuangan, inventaris, kunjungan, admin, dll.) menggunakan data statis berupa konstanta mock. Hanya satu endpoint backend yang benar-benar diintegrasikan (`/anak-asuh` GET), sementara semua operasi CRUD lainnya hanya berjalan di memori browser (Zustand + localStorage).

```ts
// yamuti-store.ts — Data hanya di memori, tidak tersinkron ke server
programs: SEED_PROGRAMS,
pendingDonations: [...MOCK_ADMIN_DONATIONS],
transactions: SEED_TRANSACTIONS,
```

**Dampak:**
- Data tidak persisten antar perangkat/pengguna berbeda.
- Admin A dan Admin B yang login ke akun yang sama akan melihat data berbeda.
- Data hilang saat localStorage dibersihkan.

**Rekomendasi:**  
Ganti semua operasi CRUD dengan API call nyata ke backend (`yamuti-backend.onrender.com`). Gunakan `@tanstack/react-query` (sudah terinstal) untuk server state management, bukan Zustand untuk data server.

---

### 1.2 Penggunaan `persist` pada Zustand untuk Data Server

**Lokasi:** [`app/lib/stores/yamuti-store.ts` L138-L339](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts#L138-L339)

**Masalah:**  
Store `yamuti-mock-crud` menggunakan middleware `persist` yang menyimpan semua data (termasuk daftar anak asuh, donasi, inventaris) ke `localStorage`. Ini berarti data server disimpan di browser pengguna, bukan diambil dari server setiap sesi.

**Dampak:**
- Inkonsistensi data antar sesi dan perangkat.
- Jika ada update dari server, browser tidak akan mengetahuinya.
- Potensi data lama (stale) ditampilkan ke pengguna.

**Rekomendasi:**  
Pisahkan store menjadi dua: (a) **UI State** (filter aktif, modal terbuka, dll.) yang boleh di-persist, dan (b) **Server State** yang dikelola sepenuhnya oleh React Query.

---

### 1.3 Optimistic Update Tanpa Rollback

**Lokasi:** [`app/lib/stores/yamuti-store.ts` L219-L231](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts#L219-L231)

**Masalah:**  
Beberapa operasi menggunakan pola optimistic update (update UI terlebih dulu, lalu kirim ke API), namun tidak ada mekanisme rollback jika API call gagal.

```ts
addOrphan: (data) => {
  const id = generateNumericId(get().orphans);
  set((s) => ({ orphans: [...s.orphans, { ...data, id }] })); // UI diupdate dulu
  apiClient.post("/anak-asuh", { ... }).catch(err => 
    console.error("Gagal menambah anak asuh:", err) // Error hanya di-log, tidak ada rollback!
  );
  return id;
},
```

**Dampak:**
- Jika API gagal, UI menampilkan data yang tidak ada di server (data "hantu").
- Pengguna tidak mendapat notifikasi bahwa operasi gagal.

**Rekomendasi:**  
Tambahkan rollback state ketika API call gagal, atau gunakan React Query Mutation yang menyediakan mekanisme `onError` rollback bawaan.

---

### 1.4 `@tanstack/react-query` Terpasang tapi Tidak Digunakan

**Lokasi:** [`package.json`](file:///e:/kp/web-yamuti/package.json) L13

**Masalah:**  
Library `@tanstack/react-query` sudah terdaftar sebagai dependency, namun tidak ada penggunaannya di seluruh kodebase. Tidak ada `QueryClientProvider` di root layout.

**Dampak:**
- Dependency tidak berguna menambah bundle size.
- Fitur caching, loading state, refetch otomatis, dan error handling yang disediakan React Query tidak dimanfaatkan.

**Rekomendasi:**  
Implementasikan React Query untuk semua fetch data dari server, atau hapus dependency ini jika tidak akan digunakan.

---

## 2. Integrasi Backend & API

### 2.1 Banyak Fitur di OpenAPI Spec Tidak Terimplementasi di Frontend

**Lokasi:** [`YAMUTI_OpenAPI_Swagger.yaml`](file:///e:/kp/web-yamuti/YAMUTI_OpenAPI_Swagger.yaml)

**Masalah:**  
OpenAPI spec mendefinisikan endpoint: `POST /donasi`, `POST /kunjungan`, `POST /mutasi-barang`, `POST /artikel`, `POST /galeri`. Namun sebagian besar tidak digunakan. Contoh: Halaman donasi masih mengandalkan data mock, bukan `POST /donasi`. Begitu pula `/artikel` dan `/galeri` untuk CMS.

**Dampak:**
- Integrasi backend–frontend sangat minim.
- Fitur yang kelihatan berjalan di UI sebenarnya tidak terhubung ke backend.

**Rekomendasi:**  
Buat service layer (misal `app/lib/services/`) yang memetakan setiap endpoint API ke fungsi yang dapat dipanggil dari komponen.

---

### 2.2 Mapping Data API Tidak Konsisten

**Lokasi:** [`app/lib/stores/yamuti-store.ts` L159-L166](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts#L159-L166)

**Masalah:**  
Saat data anak asuh di-fetch dari backend, mapping dilakukan secara kasar dengan nilai default yang hardcoded:

```ts
const apiOrphans = res.data.data.map((item: any) => ({
  id: item.id,
  name: item.nama,
  age: 10,           // ← Hardcoded! Bukan dari API
  gender: "Laki-laki", // ← Hardcoded!
  status: item.status,
  notes: "Di-fetch dari backend" // ← Tidak informatif
}));
```

**Dampak:**
- Semua anak asuh ditampilkan berumur 10 tahun dan berjenis kelamin "Laki-laki" terlepas dari data aslinya.
- Data yang ditampilkan ke pengguna tidak akurat.

**Rekomendasi:**  
Sesuaikan mapping dengan schema response API yang sebenarnya. Tambahkan logika kalkulasi umur dari `tanggal_lahir`.

---

### 2.3 Placeholder Hardcoded di API Call

**Lokasi:** [`app/lib/stores/yamuti-store.ts` L225-L229](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts#L225-L229)

**Masalah:**  
```ts
apiClient.post("/anak-asuh", {
  nama: data.name,
  tanggal_lahir: "2015-01-01", // ← Placeholder, bukan dari input pengguna!
  status: data.status,
  kategori_bayi: data.age <= 2
});
```

**Dampak:**
- Semua anak asuh baru yang ditambahkan akan tersimpan dengan tanggal lahir 1 Januari 2015 di database.
- Data di backend tidak akurat dan menyebabkan inkonsistensi.

**Rekomendasi:**  
Tambahkan field `tanggal_lahir` ke form input anak asuh (`AdminOrphanFormTemplate`).

---

### 2.4 Endpoint `rejectRequest` Tidak Memanggil API

**Lokasi:** [`app/lib/stores/yamuti-store.ts` L332-L336](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts#L332-L336)

**Masalah:**  
Fungsi `rejectRequest` hanya menghapus item dari state lokal tanpa memanggil endpoint backend apapun. Sementara `approveRequest` memanggil `/kunjungan/{id}/approve`.

**Dampak:**
- Penolakan kunjungan tidak tercatat di server.
- Status di backend tidak berubah ketika owner menolak permintaan.

**Rekomendasi:**  
Tambahkan endpoint `POST /kunjungan/{id}/reject` di backend dan panggil dari `rejectRequest`.

---

## 3. Keamanan & Autentikasi

### 3.1 Tidak Ada Route Protection / Middleware Auth

**Lokasi:** [`app/admin/layout.tsx`](file:///e:/kp/web-yamuti/app/admin/layout.tsx) · [`app/owner/layout.tsx`](file:///e:/kp/web-yamuti/app/owner/layout.tsx)

**Masalah:**  
Halaman `/admin/*` dan `/owner/*` tidak memiliki perlindungan apapun. Siapapun yang tahu URL-nya dapat mengakses dashboard admin tanpa login. Tidak ada `middleware.ts` di root project, dan layout admin tidak memeriksa status autentikasi.

**Dampak:**
- **Risiko keamanan kritis.** Seluruh fitur manajemen (data anak asuh, keuangan, inventaris) dapat diakses tanpa autentikasi.

**Rekomendasi:**  
Buat `middleware.ts` di root project untuk memeriksa JWT token di cookie/header sebelum mengizinkan akses ke rute yang dilindungi:

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin') 
    || request.nextUrl.pathname.startsWith('/owner');
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}
```

---

### 3.2 Token JWT Disimpan di localStorage (Bukan HttpOnly Cookie)

**Lokasi:** [`app/lib/stores/auth-store.ts`](file:///e:/kp/web-yamuti/app/lib/stores/auth-store.ts)

**Masalah:**  
Token autentikasi disimpan via Zustand `persist` yang menggunakan `localStorage`. Ini membuat token rentan terhadap serangan **XSS (Cross-Site Scripting)**.

**Dampak:**
- Jika ada celah XSS di aplikasi, token JWT dapat dicuri oleh skrip berbahaya.
- Praktik yang tidak sesuai standar keamanan web modern.

**Rekomendasi:**  
Simpan token di **HttpOnly cookie** yang tidak dapat diakses JavaScript. Gunakan Next.js Server Actions atau API Route untuk mengelola autentikasi.

---

### 3.3 Role-Based Access Control Tidak Diimplementasikan

**Lokasi:** [`app/lib/stores/auth-store.ts` L6](file:///e:/kp/web-yamuti/app/lib/stores/auth-store.ts#L6)

**Masalah:**  
Meskipun field `role` ada di interface `AuthUser`, tidak ada logika yang memeriksa role untuk mengontrol akses fitur. Seorang donatur yang berhasil login secara teori dapat mengakses `/admin`.

**Dampak:**
- Tidak ada pemisahan hak akses antara Admin, Owner, dan Donatur.

**Rekomendasi:**  
Implementasikan RBAC di middleware dan di level komponen. Buat helper `hasRole(role: string)` yang dapat digunakan di seluruh aplikasi.

---

### 3.4 Penggunaan `alert()` di Alur Login

**Lokasi:** [`app/ui/templates/login-form.tsx` L56](file:///e:/kp/web-yamuti/app/ui/templates/login-form.tsx#L56)

**Masalah:**  
```ts
alert("Login berhasil!"); // Menggunakan native browser alert
```

**Dampak:**
- Pengalaman pengguna buruk dan tidak konsisten dengan desain aplikasi.
- `alert()` memblokir thread JavaScript.
- Tidak profesional untuk aplikasi produksi.

**Rekomendasi:**  
Ganti dengan toast notification atau komponen notifikasi yang sudah ada dalam design system.

---

### 3.5 Penggunaan `confirm()` untuk Konfirmasi Hapus

**Lokasi:** [`app/admin/donasi/page.tsx` L15](file:///e:/kp/web-yamuti/app/admin/donasi/page.tsx#L15)

**Masalah:**  
```ts
if (confirm("Hapus program ini? Tindakan tidak dapat dibatalkan.")) {
```

**Dampak:**
- Sama dengan `alert()`, menggunakan native browser API yang tidak bisa didesain ulang.
- Tampilan tidak konsisten dengan antarmuka aplikasi.

**Rekomendasi:**  
Ganti dengan modal konfirmasi kustom (`<ConfirmationModal />`).

---

## 4. Kualitas Kode & TypeScript

### 4.1 Penggunaan Tipe `any` yang Berlebihan

**Lokasi:** [`app/ui/templates/admin-program-form.tsx` L18-L19](file:///e:/kp/web-yamuti/app/ui/templates/admin-program-form.tsx#L18-L19) · [`app/lib/stores/yamuti-store.ts` L159](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts#L159)

**Masalah:**  
```ts
form: UseFormReturn<any>;   // Bukan tipe yang spesifik
onSubmit: (data: any) => void;
const apiOrphans = res.data.data.map((item: any) => ({ ... }));
```

**Dampak:**
- Kehilangan manfaat type-safety TypeScript.
- Potensi runtime error yang tidak terdeteksi saat kompilasi.
- Sulit di-refactor karena IDE tidak dapat memberikan saran yang akurat.

**Rekomendasi:**  
Definisikan tipe yang tepat untuk semua interface form dan response API.

---

### 4.2 Duplikasi Tipe `ApprovalRequest`

**Lokasi:** [`app/lib/types/entities.ts` L72-L78](file:///e:/kp/web-yamuti/app/lib/types/entities.ts#L72-L78) · [`app/ui/templates/owner-donations.tsx` L26-L32](file:///e:/kp/web-yamuti/app/ui/templates/owner-donations.tsx#L26-L32)

**Masalah:**  
Interface `ApprovalRequest` didefinisikan dua kali: sekali di `entities.ts` (sumber kebenaran tipe) dan sekali lagi langsung di dalam file template `owner-donations.tsx`.

**Dampak:**
- Jika salah satu diubah, perubahan tidak otomatis tereflek ke yang lain.
- Dapat menyebabkan inkonsistensi tipe yang sulit dilacak.

**Rekomendasi:**  
Hapus definisi duplikat di `owner-donations.tsx` dan import dari `entities.ts`.

---

### 4.3 Inkonsistensi Line Ending (CRLF vs LF)

**Lokasi:** [`app/auth/layout.tsx`](file:///e:/kp/web-yamuti/app/auth/layout.tsx) · [`app/constants/mockData.ts`](file:///e:/kp/web-yamuti/app/constants/mockData.ts) · [`app/ui/templates/login-form.tsx`](file:///e:/kp/web-yamuti/app/ui/templates/login-form.tsx)

**Masalah:**  
Sebagian file menggunakan CRLF (`\r\n`, Windows) dan sebagian menggunakan LF (`\n`, Unix). Tidak ada file `.editorconfig` atau konfigurasi Prettier yang mengatur ini.

**Dampak:**
- Git diff menjadi tidak bersih (setiap baris terdeteksi sebagai perubahan).
- Berpotensi menyebabkan masalah saat kolaborasi di sistem operasi berbeda.

**Rekomendasi:**  
Tambahkan `.editorconfig` dan konfigurasi `endOfLine` di Prettier. Jalankan `git config core.autocrlf false`.

---

### 4.4 Tidak Ada File `.env.example`

**Lokasi:** Root project

**Masalah:**  
Terdapat file `.env` namun tidak ada `.env.example`. Tidak diketahui variabel lingkungan apa saja yang dibutuhkan selain yang sudah hardcoded (`baseURL` API hardcoded di `client.ts`).

**Dampak:**
- Developer baru kesulitan melakukan setup lokal.
- URL backend hardcoded di kode sumber bukan praktik yang baik untuk multi-environment.

**Rekomendasi:**  
Pindahkan `baseURL` ke `NEXT_PUBLIC_API_URL` di `.env`. Buat `.env.example` yang mendokumentasikan semua variabel yang diperlukan.

---

### 4.5 Data Dummy Hardcoded di Utility Function

**Lokasi:** [`app/lib/utils/orphan-detail.ts` L7-L8](file:///e:/kp/web-yamuti/app/lib/utils/orphan-detail.ts#L7-L8)

**Masalah:**  
```ts
const target = 5_000_000;  // Target donasi hardcoded
const raised = Math.min(target - 1, 500_000 + orphan.id * 200_000); // Kalkulasi palsu!
```

**Dampak:**
- Data "jumlah donasi terkumpul" untuk setiap anak asuh adalah kalkulasi palsu berdasarkan ID, bukan data nyata.
- Menyesatkan pengguna yang melihat halaman detail anak asuh.

---

### 4.6 Nama File Tidak Konsisten

**Lokasi:** Folder [`app/ui/organisms/`](file:///e:/kp/web-yamuti/app/ui/organisms/)

**Masalah:**  
Penamaan file tidak konsisten: ada `DashboardHeader.tsx` (PascalCase), `navBar.tsx` (camelCase), `Landing-Footer.tsx` (kebab-PascalCase mix), `cta-section.tsx` (kebab-case), `activityCalender.tsx` (typo: "Calender" bukan "Calendar").

**Dampak:**
- Inkonsistensi menyulitkan navigasi dan pencarian file.
- "Calender" adalah typo yang dapat membingungkan.

**Rekomendasi:**  
Standarisasi semua nama file komponen menggunakan `kebab-case.tsx` atau `PascalCase.tsx`. Perbaiki typo "Calender" menjadi "Calendar".

---

## 5. UI/UX & Komponen

### 5.1 Banyak Komponen Dibuat tapi Tidak Digunakan

**Lokasi:** [`UI_COMPONENTS_TRACKER.md`](file:///e:/kp/web-yamuti/UI_COMPONENTS_TRACKER.md)

**Masalah:**  
Berdasarkan tracker komponen, banyak komponen yang sudah dibuat namun belum digunakan (`Terpakai: [ ]`):

- **Atoms:** `activityBadge`, `backdrops`, `calenderDay`, `table` (4 dari 16)
- **Molecules:** `ListItem`, `QuickActionCard`, `RecipientSelector`, `activitySwitcher`, `buttonList`, `calenderHeader`, `campaignCard`, `card`, `donationCard`, `donationSwitcher`, `form-fields`, `label-button`, `label`, `landing-iconCard`, `list`, `milestoneCard`, `modal`, `owner-adminCard`, `owner-reportCard`, `profile-header`, `search-group`, `summaty-card`, `taskCard`, `visitingCard` (24 dari 35 — lebih dari 68%!)
- **Organisms:** 18+ komponen tidak terpakai

**Dampak:**
- Dead code menambah kompleksitas proyek.
- Bundle size lebih besar dari yang diperlukan.
- Developer bingung komponen mana yang "canonical" untuk suatu kasus.

**Rekomendasi:**  
Hapus komponen yang tidak digunakan atau pindahkan ke folder `app/ui/_archive/` untuk referensi.

---

### 5.2 Template Profile Memiliki Bug Terdokumentasi

**Lokasi:** [`UI_COMPONENTS_TRACKER.md` L125](file:///e:/kp/web-yamuti/UI_COMPONENTS_TRACKER.md#L125)

**Masalah:**  
```
| profile  | [x] | [x] | [ ] |   ← Error: [x]
```

Template `profile.tsx` memiliki bug yang sudah terdeteksi namun belum diperbaiki.

**Dampak:**
- Halaman profil pengguna berpotensi tidak berfungsi dengan benar.

**Rekomendasi:**  
Investigasi dan perbaiki bug di `profile.tsx` segera.

---

### 5.3 Kategori Input Masih Berupa Text, Bukan Select/Dropdown

**Lokasi:** [`app/ui/templates/admin-program-form.tsx` L82-L88](file:///e:/kp/web-yamuti/app/ui/templates/admin-program-form.tsx#L82-L88)

**Masalah:**  
Field "Kategori" pada form program adalah input teks bebas, bukan dropdown. Ini memungkinkan admin memasukkan kategori yang tidak konsisten (misal: "Bencana", "bencana", "Bencana Alam").

**Dampak:**
- Inkonsistensi data kategori di database.
- Filter/grouping berdasarkan kategori menjadi tidak akurat.

**Rekomendasi:**  
Ganti dengan komponen `<Select>` yang menampilkan pilihan kategori yang sudah didefinisikan.

---

### 5.4 Fungsi Pencarian dan Filter di Halaman Owner Tidak Berfungsi

**Lokasi:** [`app/ui/templates/owner-donations.tsx` L176-L191](file:///e:/kp/web-yamuti/app/ui/templates/owner-donations.tsx#L176-L191)

**Masalah:**  
Input pencarian dan tombol filter sudah dirender di UI, namun tidak ada state atau handler yang mengimplementasikan logika filternya. Ini adalah fitur "palsu" (dummy UI).

```tsx
<input type="text" placeholder="Cari program..." ... />
// Tidak ada onChange handler, tidak ada state, tidak ada efek filter
<button className="...">
  <Filter size={20} />
</button>
// Tidak ada onClick handler
```

**Dampak:**
- Pengguna mencoba mencari program tetapi tidak ada yang terjadi.
- Menurunkan kepercayaan pengguna terhadap aplikasi.

---

### 5.5 Tombol "Detail", "Pratinjau", "Audit", "Laporan PDF", "Analitik" Tidak Berfungsi

**Lokasi:** [`app/ui/templates/owner-donations.tsx`](file:///e:/kp/web-yamuti/app/ui/templates/owner-donations.tsx)

**Masalah:**  
Beberapa tombol di template owner dirender tetapi tidak memiliki `onClick` handler atau navigasi apapun:
- Tombol "Detail" pada antrian persetujuan
- Tombol "Audit" pada tabel program
- Tombol "Laporan PDF"
- Tombol "Analitik"
- Tombol "Pratinjau Halaman" di form program

**Dampak:**
- Fitur yang dijanjikan oleh UI tidak dapat digunakan.

---

### 5.6 Halaman-Halaman Owner Masih Placeholder

**Lokasi:** [`app/constants/mockData.ts` L260-L265](file:///e:/kp/web-yamuti/app/constants/mockData.ts#L260-L265)

**Masalah:**  
Beberapa halaman owner (`/owner/reports`, `/owner/settings`, `/owner/foundation`) masih menggunakan template placeholder yang hanya menampilkan teks "sedang disiapkan".

**Dampak:**
- Fitur manajemen laporan, pengaturan sistem, dan konfigurasi yayasan belum dapat digunakan oleh owner.

---

### 5.7 Lang Attribute Tidak Konsisten

**Lokasi:** [`app/layout.tsx` L29](file:///e:/kp/web-yamuti/app/layout.tsx#L29)

**Masalah:**  
```tsx
<html lang="en" ...>
```

Aplikasi ini berbahasa Indonesia penuh, namun atribut `lang` pada HTML diset ke `"en"` (English).

**Dampak:**
- Screen reader akan membacakan teks Indonesia dengan aksen/suara bahasa Inggris.
- Buruk untuk aksesibilitas (a11y).
- Kurang baik untuk SEO (mesin pencari mengira konten berbahasa Inggris).

**Rekomendasi:**  
Ganti menjadi `<html lang="id">`.

---

## 6. Performa & SEO

### 6.1 Metadata SEO Terlalu Generik

**Lokasi:** [`app/layout.tsx` L16-L20](file:///e:/kp/web-yamuti/app/layout.tsx#L16-L20)

**Masalah:**  
Hanya ada satu metadata global untuk seluruh aplikasi. Halaman-halaman individual (admin, owner, donasi) tidak memiliki metadata uniknya sendiri.

**Dampak:**
- Semua halaman akan memiliki judul dan deskripsi yang sama di hasil pencarian Google.
- SEO suboptimal.

**Rekomendasi:**  
Tambahkan `export const metadata` atau `generateMetadata()` di setiap route segment penting.

---

### 6.2 Gambar Menggunakan `<img>` Biasa, Bukan `<Image>` Next.js

**Lokasi:** [`app/ui/templates/admin-program-form.tsx` L148](file:///e:/kp/web-yamuti/app/ui/templates/admin-program-form.tsx#L148)

**Masalah:**  
```tsx
<img src={programImage} alt="Preview" className="..." />
```

Beberapa tempat menggunakan tag `<img>` HTML biasa alih-alih komponen `<Image>` dari Next.js.

**Dampak:**
- Tidak ada optimasi gambar otomatis (WebP, lazy loading, placeholder blur).
- Performa halaman lebih lambat.
- Potensi layout shift (CLS).

**Rekomendasi:**  
Gunakan `<Image>` dari `next/image` untuk semua gambar yang ukurannya diketahui.

---

### 6.3 Tidak Ada Error Boundary yang Memadai

**Lokasi:** [`app/error.tsx`](file:///e:/kp/web-yamuti/app/error.tsx)

**Masalah:**  
Hanya ada satu error boundary global di root. Tidak ada error boundary di level segment/fitur (admin, owner, dll.).

**Dampak:**
- Jika satu halaman admin crash, seluruh aplikasi terpengaruh.
- Pengguna mendapat tampilan error yang kurang informatif.

**Rekomendasi:**  
Tambahkan `error.tsx` di setiap route segment kritis (`app/admin/error.tsx`, `app/owner/error.tsx`).

---

### 6.4 Tidak Ada Loading State yang Memadai untuk Fetch Data

**Lokasi:** [`app/admin/anak-asuh/page.tsx`](file:///e:/kp/web-yamuti/app/admin/anak-asuh/page.tsx)

**Masalah:**  
`fetchOrphans()` adalah async operation, namun halaman tidak menampilkan loading state atau skeleton saat data sedang dimuat. Meski ada komponen `skeleton.tsx`, ia tidak diintegrasikan ke semua halaman yang melakukan fetch.

**Dampak:**
- Pengguna melihat halaman kosong atau data lama saat data sedang dimuat.
- Pengalaman pengguna kurang mulus.

---

## 7. Pengujian & Pemeliharaan

### 7.1 Tidak Ada Satu pun Unit Test / Integration Test

**Masalah:**  
Tidak ada folder `__tests__`, tidak ada file `*.test.ts`, `*.spec.ts`, atau `*.test.tsx` di seluruh proyek. Tidak ada dependency testing framework di `package.json` (Jest, Vitest, Playwright, dll.).

**Dampak:**
- Tidak ada jaminan kualitas kode secara otomatis.
- Refactor menjadi berisiko tinggi karena tidak ada safety net.
- Regresi sulit terdeteksi.

**Rekomendasi:**  
Tambahkan minimal:
- Unit test untuk utility functions (`crud-helpers.ts`, `orphan-detail.ts`)
- Integration test untuk store operations
- E2E test untuk alur kritis (login, tambah program, donasi)

---

### 7.2 Tidak Ada CI/CD Pipeline

**Masalah:**  
Tidak ada folder `.github/workflows/`, tidak ada konfigurasi CI/CD untuk menjalankan lint, build, dan test secara otomatis ketika ada perubahan kode.

**Dampak:**
- Kode yang bermasalah dapat masuk ke branch utama tanpa terdeteksi.
- Proses deployment manual dan berpotensi error.

**Rekomendasi:**  
Buat GitHub Actions workflow minimal untuk: lint check, TypeScript check, build test.

---

### 7.3 ESLint Tidak Terkonfigurasi Secara Optimal

**Lokasi:** [`eslint.config.mjs`](file:///e:/kp/web-yamuti/eslint.config.mjs)

**Masalah:**  
ESLint tersedia namun tidak ada rule tambahan untuk mencegah penggunaan `any`, `console.log` di produksi, atau pola kode yang tidak diinginkan.

**Rekomendasi:**  
Tambahkan rule: `@typescript-eslint/no-explicit-any: "error"` dan `no-console: "warn"`.

---

### 7.4 Dokumentasi README Minim

**Lokasi:** [`README.md`](file:///e:/kp/web-yamuti/README.md)

**Masalah:**  
README hanya berisi instruksi default Next.js. Tidak ada dokumentasi tentang arsitektur proyek, cara setup, deskripsi fitur, struktur folder, atau cara berkontribusi.

**Rekomendasi:**  
Tulis README yang mencakup: deskripsi proyek, prerequisites, langkah setup, struktur folder, panduan kontribusi, dan daftar fitur.

---

## Ringkasan Prioritas

| # | Kategori | Masalah | Prioritas |
|---|----------|---------|-----------|
| 1 | Keamanan | Tidak ada route protection di `/admin` dan `/owner` | 🔴 Kritis |
| 2 | Keamanan | Token JWT disimpan di localStorage | 🔴 Kritis |
| 3 | Data | Data utama masih mock, tidak dari backend | 🔴 Kritis |
| 4 | Data | Mapping data API yang tidak akurat (hardcoded) | 🔴 Kritis |
| 5 | Fungsionalitas | Operasi tanpa rollback menyebabkan data ghost | 🟠 Tinggi |
| 6 | Fungsionalitas | Banyak tombol/fitur UI tidak berfungsi | 🟠 Tinggi |
| 7 | Fungsionalitas | Role-based access control tidak ada | 🟠 Tinggi |
| 8 | Kode | Penggunaan `any` yang berlebihan | 🟡 Sedang |
| 9 | Kode | Komponen tidak terpakai (68% molecules) | 🟡 Sedang |
| 10 | Kode | Inkonsistensi CRLF/LF dan penamaan file | 🟡 Sedang |
| 11 | UX | `alert()` dan `confirm()` native browser | 🟡 Sedang |
| 12 | Aksesibilitas | `lang="en"` padahal konten bahasa Indonesia | 🟡 Sedang |
| 13 | Performa | Gambar tidak menggunakan `<Image>` Next.js | 🟡 Sedang |
| 14 | Testing | Tidak ada unit/integration/e2e test | 🟡 Sedang |
| 15 | DevOps | Tidak ada CI/CD pipeline | 🟢 Rendah |
| 16 | Dokumentasi | README minim, tidak ada `.env.example` | 🟢 Rendah |

---

*Dokumen ini dihasilkan dari analisis statis terhadap seluruh kodebase proyek web-yamuti pada 3 Juni 2026.*
