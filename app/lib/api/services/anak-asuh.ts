import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiOrphanResponse } from "@/app/lib/types/api-types";
import type { Orphan, OrphanStatus } from "@/app/lib/types/entities";

export function mapOrphan(item: ApiOrphanResponse): Orphan {
  const birthDateStr = item.tanggal_lahir || "";

  return {
    id: Number(item.id),
    name: item.nama || "—",
    birthDate: birthDateStr,
    status: (item.status as OrphanStatus) || "Baru",
    kategori_bayi: item.kategori_bayi || false,
  };
}

/**
 * @api {get} /anak-asuh GET Daftar Anak Asuh
 * @description Mengambil daftar anak asuh (memerlukan Bearer token).
 * 
 * @returns {Promise<Orphan[]>} Berisi array data anak asuh.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchAnakAsuh(): Promise<Orphan[]> {
  const res = await apiClient.get("/anak-asuh");
  return unwrapList<ApiOrphanResponse>(res.data).map(mapOrphan);
}

export interface CreateAnakAsuhPayload {
  nama: string;
  no_kk: string;
  no_akte: string;
  tempat_lahir: string;
  jenis_kelamin: "Laki-laki" | "Perempuan";
  tanggal_lahir: string;
  status: string;
  kategori_bayi: boolean;
}

/**
 * @api {post} /anak-asuh POST Tambah Anak Asuh
 * @description Menambahkan data anak asuh baru ke server (memerlukan Bearer token).
 * 
 * @param {FormData} payload - Data body anak asuh yang akan ditambahkan (termasuk foto_identitas).
 * 
 * @returns {Promise<any>} Berisi status, pesan, dan data anak asuh yang baru dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createAnakAsuh(payload: FormData) {
  const res = await apiClient.post("/anak-asuh", payload, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
}

/**
 * @api {get} /anak-asuh/:id GET Detail Anak Asuh
 * @description Mengambil detail data anak asuh berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik anak asuh.
 * 
 * @returns {Promise<Orphan>} Berisi data detail anak asuh.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
export async function fetchAnakAsuhById(id: string | number): Promise<Orphan> {
  const res = await apiClient.get(`/anak-asuh/${id}`);
  const body = res.data as { data?: ApiOrphanResponse } | ApiOrphanResponse;
  const item = (body as { data?: ApiOrphanResponse }).data || (body as ApiOrphanResponse);
  return mapOrphan(item);
}

export interface UpdateAnakAsuhPayload {
  nama?: string;
  no_kk?: string;
  no_akte?: string;
  tempat_lahir?: string;
  jenis_kelamin?: "Laki-laki" | "Perempuan";
  tanggal_lahir?: string;
  status?: string;
  kategori_bayi?: boolean;
}

/**
 * @api {put} /anak-asuh/:id PUT Update Anak Asuh
 * @description Memperbarui data anak asuh berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik anak asuh yang akan diperbarui.
 * @param {UpdateAnakAsuhPayload} payload - Data perubahan untuk anak asuh.
 * 
 * @returns {Promise<any>} Berisi status, pesan, dan data anak asuh yang telah diperbarui.
 * @throws {Error} Jika ID tidak ditemukan atau validasi gagal.
 */
export async function updateAnakAsuh(id: string | number, payload: UpdateAnakAsuhPayload) {
  const res = await apiClient.put(`/anak-asuh/${id}`, payload);
  return res.data;
}

/**
 * @api {delete} /anak-asuh/:id DELETE Hapus Anak Asuh
 * @description Menghapus sebuah data anak asuh secara permanen berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik anak asuh yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika ID tidak ditemukan atau gagal dihapus.
 */
export async function deleteAnakAsuh(id: string | number) {
  const res = await apiClient.delete(`/anak-asuh/${id}`);
  return res.data;
}
