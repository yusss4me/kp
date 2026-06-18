import type { ApiMutasiBarangPayload } from "@/app/lib/types/api-types";
import {
  catatMutasiInventaris,
  fetchRiwayatMutasi,
  type CatatMutasiPayload,
} from "@/app/lib/api/services/inventaris";

/** POST /inventaris/{id}/mutasi — catat mutasi barang (memerlukan Bearer token) */
export async function catatMutasiBarang(payload: ApiMutasiBarangPayload) {
  const mutasiPayload: CatatMutasiPayload = {
    tipe: payload.tipe,
    jumlah: payload.jumlah,
    tanggal_mutasi: payload.tanggal_mutasi,
    keterangan: payload.keterangan,
  };
  return catatMutasiInventaris(payload.inventaris_id, mutasiPayload);
}

/** GET /inventaris/{id}/mutasi — riwayat mutasi per item inventaris */
export async function fetchMutasiBarangList(inventarisId: string) {
  return fetchRiwayatMutasi(inventarisId);
}
