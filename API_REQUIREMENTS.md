# Kebutuhan API & Kesepakatan Integrasi Front-end (Next.js) dan Back-end (Laravel)

Dokumen ini berisi daftar kebutuhan teknis dan kesepakatan format API yang dibutuhkan oleh tim Front-end (Next.js - JAMstack) dari tim Back-end (Laravel) untuk memastikan integrasi berjalan dengan lancar pada proyek YAMUTI Management System.

---

## 1. Dokumentasi API (API Contract)
Tim Front-end membutuhkan dokumentasi yang jelas dan selalu *up-to-date* untuk setiap endpoint yang dibuat.
- **Format yang Direkomendasikan:** Swagger / OpenAPI, Postman Collection, atau Scribe.
- **Informasi Wajib:**
  - Base URL & Endpoint Path.
  - HTTP Method (GET, POST, PUT, PATCH, DELETE).
  - Diperlukan Autentikasi (Token) atau tidak.
  - Request Headers (misal: `Accept: application/json`).
  - Request Body / Payload (beserta tipe data dan validasi yang berlaku).
  - Contoh Response Sukses dan Response Error.

## 2. Standarisasi Format Response JSON
Untuk memudahkan *parsing* dan *error handling* di Front-end, seluruh response API **harus** dibungkus dalam format standar yang konsisten, baik untuk *single object* maupun *collection* (array).

### 2.1. Format Response Sukses
Disarankan menggunakan standarisasi API Resource Laravel.
```json
{
  "status": "success",
  "message": "Deskripsi sukses (opsional)",
  "data": {
    "id": 1,
    "name": "Budi",
    "created_at": "2026-06-16T10:00:00Z"
  }
}
```

### 2.2. Format Response Error (Umum & Validasi)
Penting untuk memisahkan pesan error umum dengan error validasi input.
```json
{
  "status": "error",
  "message": "Pesan error utama (misal: Data tidak valid)",
  "errors": {
    "email": ["Format email tidak sesuai.", "Email sudah terdaftar."],
    "password": ["Password minimal 8 karakter."]
  }
}
```

## 3. Penanganan HTTP Status Codes
Front-end sangat bergantung pada HTTP Status Code untuk menentukan logika UI (*loading, success state, error state*). Pastikan Back-end mereturn status code yang tepat:
- `200 OK` : Permintaan berhasil.
- `201 Created` : Data baru berhasil dibuat (biasanya dari request POST).
- `400 Bad Request` : Format request dari klien salah.
- `401 Unauthorized` : Klien belum login atau token kedaluwarsa.
- `403 Forbidden` : Klien sudah login tetapi tidak memiliki hak akses (role tidak sesuai).
- `404 Not Found` : Data / Endpoint tidak ditemukan.
- `422 Unprocessable Entity` : Validasi input gagal (sangat sering digunakan di Laravel).
- `500 Internal Server Error` : Terjadi kesalahan logika di server.

## 4. Autentikasi dan Autorisasi
Karena arsitektur *Decoupled*, Front-end tidak menggunakan session/cookies bawaan web Laravel.
- **Sistem Auth:** Menggunakan Token-based authentication, disarankan menggunakan **Laravel Sanctum** (API Tokens) atau **JWT**.
- **Role & Permissions:** Pada response endpoint login atau profil user (`/api/me`), Back-end wajib mengirimkan data *role* atau *permissions* milik user tersebut. Hal ini berguna bagi Front-end untuk melakukan pembatasan halaman (Route Guard) dan menyembunyikan tombol tertentu (misal: tombol hapus hanya untuk Owner).

## 5. Konfigurasi CORS (Cross-Origin Resource Sharing)
Back-end **harus** mengizinkan request dari origin Front-end.
- Ubah konfigurasi di `config/cors.php` (Laravel).
- Tambahkan URL Front-end saat *development* (misal: `http://localhost:3000`) dan URL *production* ke dalam `allowed_origins`.
- Izinkan methods `GET, POST, PUT, PATCH, DELETE, OPTIONS`.
- Set `supports_credentials` ke `true` jika menggunakan mekanisme token berbasis cookie di masa depan (opsional).

## 6. Format Pagination, Searching, dan Filtering
Untuk halaman yang menampilkan tabel (seperti Data Anak Asuh, Data Kunjungan, dll):
- **Pagination:** Gunakan format standar *LengthAwarePaginator* bawaan Laravel (menyertakan meta data seperti `current_page`, `last_page`, `total`, `per_page`).
- **Parameter URL:** Sepakati nama parameter untuk *query string*. Contoh:
  `GET /api/anak-asuh?page=1&limit=10&search=budi&sort_by=nama&order=asc`
  - `page`: Halaman ke berapa.
  - `limit` / `per_page`: Jumlah data per halaman.
  - `search`: Kata kunci pencarian.
  - `sort_by` & `order`: Untuk pengurutan kolom.

### Contoh Format Response Pagination Laravel:
```json
{
  "status": "success",
  "data": [
    { "id": 1, "name": "Budi" },
    { "id": 2, "name": "Andi" }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50
  }
}
```

## 7. Penanganan Media dan Upload File
Untuk form yang menyertakan file (seperti pas foto anak asuh):
- **Endpoint:** Harus bisa menerima request berupa `multipart/form-data`.
- **Response URL:** Saat file berhasil di-upload atau saat mengambil data profil, Back-end **wajib** mengembalikan *full absolute public URL* (contoh: `https://api.yamuti.com/storage/images/foto.jpg`), bukan sekadar path relatif database (misal: `images/foto.jpg`). Hal ini agar tag `<img src="...">` di Next.js bisa langsung merender gambarnya tanpa perlu manipulasi string di Front-end.
