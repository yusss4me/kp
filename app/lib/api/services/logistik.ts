import type { ApiMutasiBarangPayload } from "@/app/lib/types/api-types";
import {
  catatMutasiInventaris,
  fetchRiwayatMutasi,
  type CatatMutasiPayload,
} from "@/app/lib/api/services/inventaris";

/**
 * @api {post} /mutasi-barang POST Catat Mutasi Barang (Wrapper)
 * @description Wrapper fungsional untuk mencatat mutasi stok barang (masuk/keluar/rusak).
 * 
 * @param {ApiMutasiBarangPayload} payload - Data mutasi stok.
 * 
 * @returns {Promise<any>} Berisi status sukses dan data mutasi.
 */
export async function catatMutasiBarang(payload: ApiMutasiBarangPayload) {
  const mutasiPayload: CatatMutasiPayload = {
    inventaris_id: payload.inventaris_id,
    tipe: payload.tipe as "masuk" | "keluar" | "rusak",
    jumlah: payload.jumlah,
    keterangan: payload.keterangan,
  };
  return catatMutasiInventaris(mutasiPayload);
}

/**
 * @api {get} /inventaris/:id/mutasi GET Riwayat Mutasi Barang
 * @description Mengambil riwayat mutasi per item inventaris berdasarkan ID.
 * 
 * @param {string} inventarisId - ID unik barang inventaris.
 * 
 * @returns {Promise<any[]>} Berisi array riwayat mutasi barang.
 * @throws {Error} Jika terjadi kesalahan pada server.
 */
export async function fetchMutasiBarangList(inventarisId: string) {
  return fetchRiwayatMutasi(inventarisId);
}
