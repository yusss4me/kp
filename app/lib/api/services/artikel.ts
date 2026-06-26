import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

export interface CreateArtikelPayload {
  judul: string;
  konten: string;
  kategori_id: string;
  thumbnail?: File;
}

/**
 * @api {post} /artikel POST Buat Artikel Baru
 * @description Menambahkan data artikel baru beserta thumbnail ke server (memerlukan Bearer token).
 * 
 * @param {CreateArtikelPayload} payload - Data artikel dan file thumbnail yang akan diupload.
 * 
 * @returns {Promise<any>} Berisi status dan data artikel yang baru dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createArtikel(payload: CreateArtikelPayload) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("konten", payload.konten);
  formData.append("kategori_id", payload.kategori_id);
  if (payload.thumbnail) {
    formData.append("thumbnail", payload.thumbnail);
  }

  const res = await apiClient.post("/artikel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * @api {get} /artikel GET Daftar Artikel
 * @description Mengambil daftar semua artikel.
 * 
 * @returns {Promise<any[]>} Berisi array data artikel, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchArtikelList() {
  try {
    const res = await apiClient.get("/artikel");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {get} /artikel/:id GET Detail Artikel
 * @description Mengambil detail data artikel berdasarkan ID.
 * 
 * @param {string|number} id - ID unik artikel.
 * 
 * @returns {Promise<any>} Berisi data detail artikel.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
export async function fetchArtikelById(id: string | number) {
  const res = await apiClient.get(`/artikel/${id}`);
  const body = res.data as { data?: unknown } | unknown;
  return (body as { data?: unknown }).data || body;
}

/**
 * @api {put} /artikel/:id PUT Update Artikel
 * @description Memperbarui data artikel berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik artikel yang akan diperbarui.
 * @param {Partial<CreateArtikelPayload>} payload - Data perubahan untuk artikel.
 * 
 * @returns {Promise<any>} Berisi status dan data artikel yang telah diperbarui.
 * @throws {Error} Jika ID tidak ditemukan atau validasi gagal.
 */
export async function updateArtikel(
  id: string | number,
  payload: Partial<CreateArtikelPayload>
) {
  if (payload.thumbnail) {
    const formData = new FormData();
    if (payload.judul) formData.append("judul", payload.judul);
    if (payload.konten) formData.append("konten", payload.konten);
    if (payload.kategori_id) formData.append("kategori_id", payload.kategori_id);
    formData.append("thumbnail", payload.thumbnail);
    formData.append("_method", "PUT");
    
    const res = await apiClient.post(`/artikel/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  const res = await apiClient.put(`/artikel/${id}`, payload);
  return res.data;
}

/**
 * @api {delete} /artikel/:id DELETE Hapus Artikel
 * @description Menghapus data artikel secara permanen berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik artikel yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika ID tidak ditemukan atau gagal dihapus.
 */
export async function deleteArtikel(id: string | number) {
  const res = await apiClient.delete(`/artikel/${id}`);
  return res.data;
}

/* ===== Kategori Artikel ===== */

/**
 * @api {get} /kategori-artikel GET Daftar Kategori Artikel
 * @description Mengambil daftar semua kategori artikel.
 * 
 * @returns {Promise<any[]>} Berisi array data kategori artikel, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchKategoriArtikel() {
  try {
    const res = await apiClient.get("/kategori-artikel");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {get} /kategori-artikel/:id GET Detail Kategori Artikel
 * @description Mengambil detail data kategori artikel berdasarkan ID.
 * 
 * @param {string|number} id - ID unik kategori artikel.
 * 
 * @returns {Promise<any>} Berisi data detail kategori artikel.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
export async function fetchKategoriArtikelById(id: string | number) {
  const res = await apiClient.get(`/kategori-artikel/${id}`);
  const body = res.data as { data?: unknown } | unknown;
  return (body as { data?: unknown }).data || body;
}

/**
 * @api {post} /kategori-artikel POST Buat Kategori Artikel
 * @description Menambahkan data kategori artikel baru ke server.
 * 
 * @param {Object} payload - Data kategori artikel yang akan ditambahkan.
 * @param {string} payload.nama - Nama kategori artikel.
 * 
 * @returns {Promise<any>} Berisi status dan data kategori artikel yang baru dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createKategoriArtikel(payload: { nama: string }) {
  const res = await apiClient.post("/kategori-artikel", payload);
  return res.data;
}

/**
 * @api {put} /kategori-artikel/:id PUT Update Kategori Artikel
 * @description Memperbarui data kategori artikel berdasarkan ID.
 * 
 * @param {string|number} id - ID unik kategori artikel yang akan diperbarui.
 * @param {Object} payload - Data perubahan untuk kategori artikel.
 * @param {string} [payload.nama] - Nama kategori artikel baru.
 * 
 * @returns {Promise<any>} Berisi status dan data kategori artikel yang telah diperbarui.
 * @throws {Error} Jika ID tidak ditemukan atau validasi gagal.
 */
export async function updateKategoriArtikel(
  id: string | number,
  payload: { nama?: string }
) {
  const res = await apiClient.put(`/kategori-artikel/${id}`, payload);
  return res.data;
}

/**
 * @api {delete} /kategori-artikel/:id DELETE Hapus Kategori Artikel
 * @description Menghapus data kategori artikel secara permanen berdasarkan ID.
 * 
 * @param {string|number} id - ID unik kategori artikel yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika ID tidak ditemukan atau gagal dihapus.
 */
export async function deleteKategoriArtikel(id: string | number) {
  const res = await apiClient.delete(`/kategori-artikel/${id}`);
  return res.data;
}
