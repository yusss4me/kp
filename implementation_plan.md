# Perbaikan Menyeluruh Kekurangan Proyek web-yamuti

Rencana implementasi untuk memperbaiki 16 temuan kekurangan dari analisis proyek. Fokus pada semua perbaikan yang dapat dilakukan di sisi frontend.

> [!IMPORTANT]
> Beberapa isu (integrasi penuh backend, HttpOnly cookie, CI/CD) memerlukan perubahan di sisi server atau infrastruktur. Isu-isu tersebut **tidak** termasuk dalam rencana ini namun akan didokumentasikan sebagai catatan.

## User Review Required

> [!WARNING]
> **Penghapusan dead code**: Rencana ini akan **menghapus** komponen-komponen yang tidak digunakan (68% molecules, beberapa atoms & organisms). Jika Anda ingin menyimpan komponen tersebut untuk pengembangan masa depan, beri tahu saya dan saya akan memindahkannya ke folder `_archive/` sebagai gantinya.

> [!IMPORTANT]
> **Middleware auth**: Setelah middleware aktif, halaman `/admin` dan `/owner` akan mengarahkan ke `/auth` jika belum login. Pastikan backend login endpoint (`POST /login`) berjalan normal.

---

## Proposed Changes

### Fase 1: Environment & Configuration

#### [MODIFY] [.env](file:///e:/kp/web-yamuti/.env)
- Tambahkan `NEXT_PUBLIC_API_URL=https://yamuti-backend.onrender.com/api`

#### [NEW] [.env.example](file:///e:/kp/web-yamuti/.env.example)
- Dokumentasikan variabel yang dibutuhkan

#### [MODIFY] [client.ts](file:///e:/kp/web-yamuti/app/lib/api/client.ts)
- Ganti hardcoded `baseURL` dengan `process.env.NEXT_PUBLIC_API_URL`

#### [NEW] [.editorconfig](file:///e:/kp/web-yamuti/.editorconfig)
- Standarisasi line ending (LF), indent, dan charset

---

### Fase 2: Keamanan — Auth Middleware & RBAC

#### [NEW] [middleware.ts](file:///e:/kp/web-yamuti/middleware.ts)
- Route protection: redirect ke `/auth` jika token tidak ada di cookie
- RBAC dasar: `/admin/*` hanya untuk role `admin`, `/owner/*` hanya untuk role `owner`

#### [MODIFY] [auth-store.ts](file:///e:/kp/web-yamuti/app/lib/stores/auth-store.ts)
- Tambahkan helper `hasRole()` dan `isLoggedIn()`
- Tetap simpan auth state di Zustand (informasi role/user), tapi tambahkan cookie sync agar middleware bisa membacanya

#### [MODIFY] [login-form.tsx](file:///e:/kp/web-yamuti/app/ui/templates/login-form.tsx)
- Set cookie saat login berhasil (agar middleware bisa baca)
- Hapus `alert("Login berhasil!")` → redirect langsung tanpa alert

#### [MODIFY] [admin/layout.tsx](file:///e:/kp/web-yamuti/app/admin/layout.tsx)
- Ambil user data dari auth store untuk display nama/role yang sebenarnya (bukan hardcoded)

#### [MODIFY] [owner/layout.tsx](file:///e:/kp/web-yamuti/app/owner/layout.tsx)
- Sama seperti admin layout — gunakan data dari auth store

---

### Fase 3: Confirmation Modal & Toast (Ganti alert/confirm)

#### [NEW] [confirmation-modal.tsx](file:///e:/kp/web-yamuti/app/ui/molecules/confirmation-modal.tsx)
- Komponen modal konfirmasi kustom dengan animasi backdrop
- Props: `isOpen`, `title`, `message`, `onConfirm`, `onCancel`, `variant` (danger/warning/info)

#### [NEW] [toast.tsx](file:///e:/kp/web-yamuti/app/ui/molecules/toast.tsx)
- Toast notification system sederhana (tanpa dependency tambahan)
- Mendukung: success, error, warning, info

#### [NEW] [toast-provider.tsx](file:///e:/kp/web-yamuti/app/ui/providers/toast-provider.tsx)
- Context provider untuk toast yang dipasang di root layout

#### [MODIFY] [layout.tsx](file:///e:/kp/web-yamuti/app/layout.tsx)
- Bungkus children dengan `ToastProvider`
- Ganti `lang="en"` → `lang="id"` (isu aksesibilitas)

#### [MODIFY] [donasi/page.tsx](file:///e:/kp/web-yamuti/app/admin/donasi/page.tsx)
- Ganti `confirm()` dengan `ConfirmationModal`

---

### Fase 4: TypeScript & Dead Code Cleanup

#### [MODIFY] [admin-program-form.tsx](file:///e:/kp/web-yamuti/app/ui/templates/admin-program-form.tsx)
- Ganti `UseFormReturn<any>` dan `(data: any)` dengan tipe yang spesifik (`ProgramFormInput`)

#### [MODIFY] [yamuti-store.ts](file:///e:/kp/web-yamuti/app/lib/stores/yamuti-store.ts)
- Ganti `(item: any)` di `fetchOrphans` mapping dengan tipe `ApiOrphanResponse`
- Perbaiki tanggal lahir hardcoded → hitung dari response API

#### [MODIFY] [owner-donations.tsx](file:///e:/kp/web-yamuti/app/ui/templates/owner-donations.tsx)
- Hapus duplikat interface `ApprovalRequest`, import dari `entities.ts`

#### [NEW] [api-types.ts](file:///e:/kp/web-yamuti/app/lib/types/api-types.ts)
- Definisikan tipe untuk response API backend: `ApiOrphanResponse`, `ApiLoginResponse`, dll.

#### Cleanup komponen tidak terpakai
- Pindahkan ~30+ komponen yang tidak digunakan ke `app/ui/_archive/` (mempertahankan untuk referensi, tidak menghapus permanen)

---

### Fase 5: Error Boundaries per Route

#### [NEW] [admin/error.tsx](file:///e:/kp/web-yamuti/app/admin/error.tsx)
- Error boundary spesifik untuk admin dashboard

#### [NEW] [owner/error.tsx](file:///e:/kp/web-yamuti/app/owner/error.tsx)
- Error boundary spesifik untuk owner dashboard

#### [NEW] [auth/error.tsx](file:///e:/kp/web-yamuti/app/auth/error.tsx)
- Error boundary spesifik untuk halaman auth

---

### Fase 6: SEO & Aksesibilitas

#### [MODIFY] [layout.tsx](file:///e:/kp/web-yamuti/app/layout.tsx)
- `lang="en"` → `lang="id"` (sudah dicover di Fase 3)
- Perkaya metadata global

#### [NEW] [admin/layout.tsx metadata](file:///e:/kp/web-yamuti/app/admin/layout.tsx)
- Tambahkan metadata unik untuk section admin (via file `metadata.ts` terpisah atau di layout)

#### [NEW] [owner/layout.tsx metadata](file:///e:/kp/web-yamuti/app/owner/layout.tsx)
- Metadata unik untuk section owner

#### [NEW] [auth/metadata](file:///e:/kp/web-yamuti/app/auth/layout.tsx)
- Metadata unik untuk halaman login/register

---

### Fase 7: Performa — Gambar Next.js

#### [MODIFY] [admin-program-form.tsx](file:///e:/kp/web-yamuti/app/ui/templates/admin-program-form.tsx)
- Ganti `<img>` → `<Image>` dari `next/image`

#### Scan & fix `<img>` di komponen lain
- Periksa dan ganti semua `<img>` tag yang bisa diganti dengan `<Image>`

---

### Fase 8: Loading States

#### [NEW] [admin/loading.tsx](file:///e:/kp/web-yamuti/app/admin/loading.tsx)
- Loading skeleton khusus admin dashboard

#### [NEW] [owner/loading.tsx](file:///e:/kp/web-yamuti/app/owner/loading.tsx)
- Loading skeleton khusus owner dashboard

---

## Isu yang TIDAK Diperbaiki (Memerlukan Backend)

| Isu | Alasan |
|-----|--------|
| Integrasi penuh semua endpoint API | Perlu memastikan semua endpoint backend siap & response schema konsisten |
| Token di HttpOnly cookie | Perlu endpoint backend yang set cookie (bukan client-side) |
| CI/CD pipeline | Perlu akses konfigurasi repository GitHub |
| Unit/integration/e2e test | Scope terlalu besar — disarankan sebagai proyek terpisah |
| Endpoint `POST /kunjungan/{id}/reject` | Perlu pengembangan di sisi backend |

---

## Verification Plan

### Automated Tests
```bash
pnpm build   # Pastikan tidak ada TypeScript error setelah semua perubahan
pnpm lint     # Pastikan ESLint pass
```

### Manual Verification
- Akses `/admin` tanpa login → harus redirect ke `/auth`
- Login → cek redirect berdasarkan role
- Hapus program → muncul Confirmation Modal (bukan native confirm)
- Login berhasil → toast notification (bukan alert)
- Cek `<html lang="id">` di inspector
- Cek metadata unik per halaman di view-source
