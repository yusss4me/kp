# Integrasi API (JAMstack)

Base URL: `NEXT_PUBLIC_API_URL` atau `https://yamuti-backend.onrender.com/api`

## Struktur

- `client.ts` — axios instance + JWT interceptor
- `services/` — fungsi pemanggilan HTTP per resource
- `hooks/` — React Query hooks untuk halaman client

## Endpoint aktif

| Method | Route | Service | Hook | Keterangan |
|--------|-------|---------|------|------------|
| POST | `/login` | `loginAdmin` | — | Login admin/owner (public) |
| GET | `/anak-asuh` | `fetchAnakAsuh` | `useAnakAsuh` | Daftar anak asuh (perlu token) |
| POST | `/anak-asuh` | `createAnakAsuh` | — | Tambah anak asuh (perlu token) |
| POST | `/donasi` | `createDonasi` | `useCreateDonasi` | Buat donasi (public) |
| POST | `/kunjungan` | `createKunjungan` | `useCreateKunjungan` | Ajukan kunjungan (public) |
| POST | `/kunjungan/:id/approve` | `approveKunjungan` | — | Setujui kunjungan (perlu token) |
| GET | `/kunjungan/:id` | `getKunjunganById` | — | Detail kunjungan |
| POST | `/mutasi-barang` | `catatMutasiBarang` | — | Catat mutasi barang (perlu token) |
| POST | `/artikel` | `createArtikel` | — | Buat artikel CMS (perlu token, multipart) |
| POST | `/galeri` | `uploadGaleri` | `useUploadGaleri` | Unggah foto galeri (perlu token, multipart) |

## Endpoint belum tersedia (dikomentari)

- `GET /programs` — 404
- `GET /donasi` — tidak ada di swagger
- `GET /kunjungan` — tidak ada di swagger
- `GET /artikel` — tidak ada di swagger
- `GET /galeri` — tidak ada di swagger
- `GET /mutasi-barang` — tidak ada di swagger
- `GET /inventaris` — tidak ada di swagger
- `GET /broadcast/templates` — 404
- `GET /donatur/profile`, `/wallet`, `/payment-methods`, `/favorites` — 404

Lihat komentar `// API:` di setiap halaman untuk penanda penggunaan.
