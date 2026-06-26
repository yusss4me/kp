import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

export interface CreateDonasiPayload {
  nama_donatur: string;
  no_whatsapp: string;
  gross_amount: number;
  kampanye_id: string;
}

/**
 * @api {post} /donasi POST Buat Donasi
 * @description Membuat donasi baru oleh donatur (public, tanpa auth).
 * 
 * @param {CreateDonasiPayload} payload - Data rincian donasi.
 * 
 * @returns {Promise<any>} Berisi status, pesan, dan data donasi yang dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createDonasi(payload: CreateDonasiPayload) {
  try {
    const res = await apiClient.post("/donasi", payload);
    return res.data;
  } catch (e: any) {
    if (e.response?.status === 401 || e.response?.status === 403) {
      throw e;
    }
    throw e;
  }
}

/**
 * @api {get} /donasi GET Daftar Donasi
 * @description Mengambil daftar semua donasi.
 * 
 * @returns {Promise<any[]>} Berisi array data donasi, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchDonasiList() {
  try {
    const res = await apiClient.get("/donasi");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {get} /donasi/riwayat/:donaturId GET Riwayat Donasi
 * @description Mengambil riwayat donasi berdasarkan ID donatur.
 * 
 * @param {string} donaturId - ID unik donatur.
 * 
 * @returns {Promise<any[]>} Berisi array riwayat donasi, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchDonasiRiwayat(donaturId: string) {
  try {
    const res = await apiClient.get(`/donasi/riwayat/${donaturId}`);
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {patch} /donasi/:id/verify PATCH Verifikasi Donasi
 * @description Memverifikasi bukti transfer untuk donasi tertentu (hanya admin).
 * 
 * @param {string} id - ID unik donasi yang akan diverifikasi.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan verifikasi.
 * @throws {Error} Jika ID tidak ditemukan atau gagal verifikasi.
 */
export async function verifyDonasi(id: string) {
  const res = await apiClient.patch(`/donasi/${id}/verify`);
  return res.data;
}
