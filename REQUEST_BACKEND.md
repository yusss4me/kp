# Daftar Request API & Parameter Data ke Tim Back-end

Berdasarkan struktur folder Next.js (seperti `app/admin`, `app/owner`, dan publik), berikut adalah rancangan route API dan parameter yang dibutuhkan oleh Front-end kepada tim Back-end (Laravel).

---

## 1. Modul Autentikasi (`/api/auth`)
Digunakan untuk fungsionalitas login/logout pada folder `app/auth`.
- **`POST /api/auth/login`**
  - **Body Payload:** `email` (string), `password` (string)
  - **Expected Response:** Token (Sanctum/JWT), data profil user (`id`, `name`, `role: owner/admin`).
- **`POST /api/auth/logout`**
  - **Headers:** `Authorization: Bearer {token}`
- **`GET /api/auth/me`**
  - **Fungsi:** Mengambil profil user yang sedang login beserta role-nya.
- **`POST /api/auth/register`** (Untuk pendaftaran pengguna publik/donatur)
  - **Body Payload:** `name`, `email`, `password`, `password_confirmation`, `no_whatsapp`.
- **`POST /api/auth/forgot-password`** (Lupa Password)
  - **Body Payload:** `email` (Untuk mengirimkan link reset/OTP via email).
- **`POST /api/auth/reset-password`** (Reset Password)
  - **Body Payload:** `email`, `password`, `password_confirmation`, `token`.

## 2. Modul Anak Asuh (`/api/anak-asuh`)
Digunakan untuk halaman manajemen data anak asuh di `app/admin/anak-asuh`.
- **`GET /api/anak-asuh`** (List data)
  - **Query Params:** `page`, `limit`, `search` (berdasarkan nama), `status` (aktif/alumni), `sort_by`.
- **`GET /api/anak-asuh/{id}`** (Detail data)
- **`POST /api/anak-asuh`** (Tambah data)
  - **Body (FormData):** `nama_lengkap`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `status_yatim_piatu`, `tanggal_masuk`, `foto` (file upload), `riwayat_kesehatan`, `pendidikan_terakhir`.
- **`PUT/PATCH /api/anak-asuh/{id}`** (Edit data)
- **`DELETE /api/anak-asuh/{id}`** (Hapus data - opsional/soft delete)

## 3. Modul Kunjungan / Tamu (`/api/kunjungan`)
Digunakan di halaman form publik (`app/kunjungan`) dan halaman manajemen admin (`app/admin/kunjungan`).
- **`POST /api/kunjungan`** (Bisa diakses publik untuk pendaftaran)
  - **Body Payload:** `nama_instansi_perwakilan`, `penanggung_jawab`, `no_whatsapp`, `tanggal_rencana`, `waktu_kunjungan`, `tujuan_kunjungan`, `jumlah_peserta`.
- **`GET /api/kunjungan`** (Daftar kunjungan untuk admin)
  - **Query Params:** `page`, `limit`, `search`, `status` (menunggu/disetujui/selesai), `tanggal_kunjungan`.
- **`PATCH /api/kunjungan/{id}/status`** (Admin menyetujui/menolak/selesai)
  - **Body Payload:** `status` ('approved', 'rejected', 'completed'), `catatan_admin`.

## 4. Modul Donasi & Keuangan (`/api/donasi` & `/api/keuangan`)
Untuk `app/admin/donasi`, `app/admin/keuangan`, `app/owner/donations`, dan form donasi publik (`app/donasi`).
- **`POST /api/donasi`** (Form donatur publik)
  - **Body (FormData):** `nama_donatur`, `no_whatsapp`, `nominal` (jika uang) / `nama_barang` (jika barang), `bukti_transfer` (file upload), `pesan_doa`.
- **`GET /api/donasi`** (Manajemen data donasi)
  - **Query Params:** `page`, `limit`, `status` (pending/success/failed), `tipe_donasi` (uang/barang).
- **`PATCH /api/donasi/{id}/verify`** (Admin memverifikasi bukti donasi)
- **`GET /api/keuangan/laporan`** (Untuk Owner melihat cash flow)
  - **Query Params:** `bulan`, `tahun`, `jenis` (pemasukan/pengeluaran).

## 5. Modul Inventaris Panti (`/api/inventaris`)
Digunakan untuk halaman `app/admin/inventaris`.
- **`GET /api/inventaris`**
- **`POST /api/inventaris`**
  - **Body Payload:** `nama_barang`, `kategori`, `jumlah`, `kondisi` (baik/rusak), `tanggal_diperoleh`.

## 6. Modul Broadcast / Berita / CMS (`/api/cms` & `/api/broadcast`)
Untuk halaman publik `app/news` dan manajemen admin `app/admin/cms`, `app/admin/broadcast`.
- **`GET /api/artikel`** (Publik dan Admin)
- **`POST /api/artikel`** (Admin CMS)
  - **Body (FormData):** `judul`, `konten` (HTML/Rich text), `kategori`, `thumbnail` (file upload), `status_publish`.
- **`POST /api/broadcast/send`** (Kirim pesan masal)
  - **Body Payload:** `pesan`, `target_penerima` (donatur/umum/semua).

## 7. Modul Manajemen Admin / Owner (`/api/admins`)
Digunakan secara eksklusif untuk halaman Owner (`app/owner/admins`).
- **`GET /api/admins`** (Daftar admin panti)
- **`POST /api/admins`** (Menambah admin baru)
  - **Body Payload:** `name`, `email`, `password`, `no_whatsapp`, `role`.
- **`PUT/PATCH /api/admins/{id}`** (Edit akses/data admin)
- **`DELETE /api/admins/{id}`** (Hapus akses admin)

## 8. Modul Laporan / Dashboard (`/api/dashboard`)
Digunakan di halaman dashboard utama Admin dan Owner untuk chart/statistik data.
- **`GET /api/dashboard/summary`**
  - **Expected Response:** Total Anak Asuh, Total Donasi Bulan Ini, Total Kunjungan (Menunggu Persetujuan), Saldo Kas Terkini.
