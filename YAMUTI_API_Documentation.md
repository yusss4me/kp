# YAMUTI REST API Documentation
*Base URL (Production)*: `https://yamuti-backend.onrender.com/api`

Dokumentasi ini ditujukan bagi Tim Frontend. Seluruh *endpoint* mengembalikan *response* berformat JSON. Sebagian besar *endpoint* memerlukan Autentikasi menggunakan *Bearer Token* (Sanctum).

---

## 1. Authentication (`/auth`)

### Register (Publik)
- **Endpoint:** `POST /auth/register`
- **Body:** `name`, `email`, `password`, `password_confirmation`, `no_whatsapp`, `nik`, `alamat`.

### Login
- **Endpoint:** `POST /auth/login`
- **Body:**
  ```json
  {
    "email": "admin@yamuti.org",
    "password": "password"
  }
  ```

### Get Current User
- **Endpoint:** `GET /auth/me`
- **Headers:** `Authorization: Bearer <token>`

### Logout
- **Endpoint:** `POST /auth/logout`
- **Headers:** `Authorization: Bearer <token>`

---

## 2. Dashboard (`/dashboard`)

### Summary Dashboard (Admin & Owner)
- **Endpoint:** `GET /dashboard/summary`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Mengembalikan total anak asuh, total donasi bulan ini, kunjungan menunggu, dan saldo kas terkini.

---

## 3. Manajemen Admin (`/admins`)

### Kelola Akses Admin & Owner (Owner Only)
- **GET** `/admins` (List data)
- **POST** `/admins` (Tambah admin baru, sertakan `role`)
- **GET** `/admins/{id}` (Detail admin)
- **PUT** `/admins/{id}` (Update admin & role)
- **DELETE** `/admins/{id}` (Hapus admin)

---

## 4. Anak Asuh (`/anak-asuh`)

**Headers:** `Authorization: Bearer <token>`

### Kelola Data Anak Asuh
- **GET** `/anak-asuh` (Daftar anak asuh, dukung paginasi `?per_page=15`)
- **POST** `/anak-asuh` (Tambah anak asuh, format JSON)
- **GET** `/anak-asuh/{id}` (Detail)
- **PUT** `/anak-asuh/{id}` (Update)
- **DELETE** `/anak-asuh/{id}` (Hapus)

---

## 5. Donasi & Keuangan (`/donasi` & `/keuangan`)

### Buat Donasi Baru (Public - Tidak Butuh Token)
- **Endpoint:** `POST /donasi`
- **Body:** `nama_donatur`, `no_whatsapp`, `gross_amount` (uang), `nama_barang` (barang), dsb.
- **Response:** Mengembalikan `snap_token` (Midtrans) jika tipe uang.

### Manajemen Donasi (Admin)
- **GET** `/donasi` (Riwayat/List)
- **PATCH** `/donasi/{id}/verify` (Admin memverifikasi bukti donasi manual atau mengubah status menjadi PAID).

### Laporan Keuangan & Kas
- **GET** `/transaksi-keuangan` (Riwayat Transaksi)
- **POST** `/transaksi-keuangan` (Tambah Pemasukan/Pengeluaran Kas)
- **GET** `/keuangan/laporan` (Filter berdasarkan `?bulan=06&tahun=2026&jenis=pemasukan`)
- **GET** `/kas/saldo` (Cek saldo kas saat ini)

---

## 6. Kunjungan / Tamu (`/kunjungan`)

### Ajukan Kunjungan Baru (Public)
- **Endpoint:** `POST /kunjungan`
- **Body:** `nama_pengunjung`, `nomor_telepon`, `tujuan_kunjungan`, `slot_waktu`.

### Update Status Kunjungan (Admin Only)
- **Endpoint:** `PATCH /kunjungan/{id}/status`
- **Body:**
  ```json
  {
    "status": "APPROVED" // atau "REJECTED", "COMPLETED"
  }
  ```
*(Catatan: Ini akan otomatis mengirimkan pesan WhatsApp notifikasi jika status APPROVED/REJECTED).*

---

## 7. Logistik & Inventaris (`/inventaris`)

### Kelola Barang
- **GET** `/inventaris`
- **POST** `/inventaris` (Tambah master barang)
- **GET / PUT / DELETE** `/inventaris/{id}`

### Mutasi Barang Keluar/Masuk
- **Endpoint:** `POST /mutasi-barang`
- **Body:** `inventaris_id`, `tipe` (masuk/keluar), `jumlah`, `keterangan`.

---

## 8. Broadcast & Artikel CMS

### Broadcast WhatsApp / Email
- **Endpoint:** `POST /broadcast/send`
- **Body:**
  ```json
  {
    "pesan": "Isi pesan notifikasi...",
    "target_penerima": "donatur" // donatur, umum, semua
  }
  ```

### Artikel CMS
- **GET / POST** `/artikel` (Dukung format `multipart/form-data` untuk `thumbnail`)
- **GET / PUT / DELETE** `/artikel/{id}`
- **GET / POST / DELETE** `/kategori-artikel`

---

## Format Response Error Global
Jika terjadi *error* atau validasi *frontend* gagal, *backend* akan merespons dengan struktur:
```json
{
  "success": false,
  "message": "Validasi Gagal",
  "data": {
    "gross_amount": [
      "The gross amount field is required."
    ]
  }
}
```
