# Integrasi API (JAMstack)

Base URL: `NEXT_PUBLIC_API_URL` atau `https://yamuti-backend.onrender.com/api`

Referensi endpoint: `api-collection/api-collection/` (Bruno collection).

## Struktur

- `client.ts` — axios instance + JWT interceptor
- `services/` — fungsi pemanggilan HTTP per resource
- `hooks/` — React Query hooks untuk halaman client

## Endpoint (sesuai api-collection)

| Method | Route | Service | Keterangan |
|--------|-------|---------|------------|
| POST | `/auth/login` | `loginAdmin`, `loginDonatur` | Login (public) |
| POST | `/auth/register` | `registerDonatur` | Register donatur (public) |
| POST | `/auth/logout` | `logoutUser` | Logout (Bearer) |
| GET | `/auth/me` | `getCurrentUser` | Profil user aktif (Bearer) |
| GET | `/dashboard/summary` | `fetchDashboardSummary` | Ringkasan dashboard (Bearer) |
| GET | `/admins` | `fetchAdminsList` | Daftar admin (Bearer, Owner) |
| POST | `/admins` | `createAdmin` | Tambah admin (Bearer, Owner) |
| GET | `/admins/{id}` | `fetchAdminById` | Detail admin (Bearer, Owner) |
| PUT | `/admins/{id}` | `updateAdmin` | Update admin (Bearer, Owner) |
| DELETE | `/admins/{id}` | `deleteAdmin` | Hapus admin (Bearer, Owner) |
| GET | `/anak-asuh` | `fetchAnakAsuh` | Daftar anak asuh (Bearer) |
| POST | `/anak-asuh` | `createAnakAsuh` | Tambah anak asuh (Bearer) |
| GET | `/anak-asuh/{id}` | `fetchAnakAsuhById` | Detail anak asuh (Bearer) |
| PUT | `/anak-asuh/{id}` | `updateAnakAsuh` | Update anak asuh (Bearer) |
| DELETE | `/anak-asuh/{id}` | `deleteAnakAsuh` | Hapus anak asuh (Bearer) |
| GET | `/kampanye` | `fetchPrograms` | Daftar kampanye (public) |
| GET | `/kampanye/{id}` | `fetchProgramById` | Detail kampanye (public) |
| POST | `/kampanye` | `createKampanye` | Buat kampanye (Bearer, multipart) |
| PUT | `/kampanye/{id}` | `updateKampanye` | Update kampanye (Bearer, JSON/multipart) |
| DELETE | `/kampanye/{id}` | `deleteKampanye` | Hapus kampanye (Bearer) |
| GET | `/donasi` | `fetchDonasiList` | Daftar donasi (Bearer) |
| POST | `/donasi` | `createDonasi` | Buat donasi (public) |
| PATCH | `/donasi/{id}/verify` | `verifyDonasi` | Verifikasi donasi (Bearer) |
| GET | `/kunjungan` | `fetchKunjunganList` | Daftar kunjungan (Bearer) |
| POST | `/kunjungan` | `createKunjungan` | Ajukan kunjungan (public) |
| PATCH | `/kunjungan/{id}/status` | `updateKunjunganStatus` | Update status (Bearer) |
| GET | `/inventaris` | `fetchInventarisList` | Daftar inventaris (Bearer) |
| POST | `/inventaris` | `createInventaris` | Tambah barang (Bearer) |
| GET | `/inventaris/{id}` | `fetchInventarisById` | Detail barang (Bearer) |
| PUT | `/inventaris/{id}` | `updateInventaris` | Update barang (Bearer) |
| DELETE | `/inventaris/{id}` | `deleteInventaris` | Hapus barang (Bearer) |
| POST | `/inventaris/{id}/mutasi` | `catatMutasiInventaris` | Catat mutasi stok (Bearer) |
| GET | `/inventaris/{id}/mutasi` | `fetchRiwayatMutasi` | Riwayat mutasi (Bearer) |
| GET | `/artikel` | `fetchArtikelList` | Daftar artikel (Bearer) |
| POST | `/artikel` | `createArtikel` | Buat artikel (Bearer, JSON) |
| GET | `/artikel/{id}` | `fetchArtikelById` | Detail artikel (Bearer) |
| PUT | `/artikel/{id}` | `updateArtikel` | Update artikel (Bearer) |
| DELETE | `/artikel/{id}` | `deleteArtikel` | Hapus artikel (Bearer) |
| GET | `/kategori-artikel` | `fetchKategoriArtikel` | Daftar kategori (Bearer) |
| POST | `/kategori-artikel` | `createKategoriArtikel` | Buat kategori (Bearer) |
| PUT | `/kategori-artikel/{id}` | `updateKategoriArtikel` | Update kategori (Bearer) |
| DELETE | `/kategori-artikel/{id}` | `deleteKategoriArtikel` | Hapus kategori (Bearer) |
| GET | `/galeri` | `fetchGaleriList` | Daftar galeri (Bearer) |
| POST | `/galeri` | `uploadGaleri` | Upload foto (Bearer, multipart) |
| GET | `/galeri/{id}` | `fetchGaleriById` | Detail galeri (Bearer) |
| DELETE | `/galeri/{id}` | `deleteGaleri` | Hapus galeri (Bearer) |
| POST | `/broadcast/send` | `sendBroadcast` | Kirim broadcast (Bearer) |
| GET | `/keuangan/laporan` | `fetchLaporanKeuangan` | Laporan keuangan (Bearer) |
| GET | `/kas/saldo` | `fetchKasSaldo` | Saldo kas (Bearer) |

## Endpoint tambahan (belum di api-collection)

- `GET/PUT /profile`, `PUT /profile/password` — profil donatur
- `POST /forgot-password`, `POST /reset-password` — reset password
- `GET /transaksi-keuangan`, `POST /transaksi-keuangan` — transaksi kas
- `GET /donasi/riwayat/{donaturId}` — riwayat donasi per donatur
