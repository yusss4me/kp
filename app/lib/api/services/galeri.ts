import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiGaleriPayload } from "@/app/lib/types/api-types";

/**
 * @api {post} /galeri POST Unggah Galeri
 * @description Mengunggah foto baru ke galeri (memerlukan Bearer token, multipart).
 * 
 * @param {ApiGaleriPayload} payload - Data galeri beserta file foto.
 * 
 * @returns {Promise<any>} Berisi status sukses dan data galeri yang diunggah.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function uploadGaleri(payload: ApiGaleriPayload) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("file", payload.file);

  const res = await apiClient.post("/galeri", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * @api {get} /galeri GET Daftar Galeri
 * @description Mengambil daftar semua foto galeri.
 * 
 * @returns {Promise<any[]>} Berisi array data galeri, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchGaleriList() {
  try {
    const res = await apiClient.get("/galeri");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {get} /galeri/:id GET Detail Galeri
 * @description Mengambil detail data galeri berdasarkan ID.
 * 
 * @param {string|number} id - ID unik item galeri.
 * 
 * @returns {Promise<any>} Berisi data detail galeri.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
export async function fetchGaleriById(id: string | number) {
  const res = await apiClient.get(`/galeri/${id}`);
  const body = res.data as { data?: unknown } | unknown;
  return (body as { data?: unknown }).data || body;
}

/**
 * @api {delete} /galeri/:id DELETE Hapus Galeri
 * @description Menghapus data galeri secara permanen berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik item galeri yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika ID tidak ditemukan atau gagal dihapus.
 */
export async function deleteGaleri(id: string | number) {
  const res = await apiClient.delete(`/galeri/${id}`);
  return res.data;
}
