# Integrasi API (JAMstack)

Base URL: `NEXT_PUBLIC_API_URL` atau `https://yamuti-backend.onrender.com/api`

## Struktur

- `client.ts` — axios instance + JWT interceptor
- `services/` — fungsi pemanggilan HTTP per resource
- `hooks/` — React Query hooks untuk halaman client

## Endpoint aktif

| Method | Route | Service | Keterangan |
|--------|-------|---------|------------|
| POST | `/login` | auth-store | Login |
| GET | `/anak-asuh` | `fetchAnakAsuh` | Daftar anak asuh (perlu token) |
| POST | `/anak-asuh` | yamuti-store | Tambah anak asuh |
| POST | `/donasi` | `createDonasi` | Buat donasi (public) |
| POST | `/kunjungan` | `createKunjungan` | Ajukan kunjungan (public) |
| POST | `/kunjungan/{id}/approve` | `approveKunjungan` | Setujui kunjungan |
| POST | `/mutasi-barang` | yamuti-store | Catat mutasi barang |
| POST | `/artikel` | `createArtikel` | Buat artikel CMS |

## Endpoint belum tersedia (dikomentari)

- `GET /programs` — 404
- `GET /donasi` — tidak ada di swagger
- `GET /kunjungan` — tidak ada di swagger
- `GET /artikel` — tidak ada di swagger
- `GET /inventaris` — tidak ada di swagger
- `GET /broadcast/templates` — 404
- `GET /donatur/profile`, `/wallet`, `/payment-methods`, `/favorites` — 404

Lihat komentar `// API:` di setiap halaman untuk penanda penggunaan.
