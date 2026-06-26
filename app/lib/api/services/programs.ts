import type { Program } from "@/app/lib/types/entities";
import { calcProgress, formatRupiah } from "@/app/lib/utils/crud-helpers";
import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import { getImageUrl } from "@/app/lib/utils/image";

/**
 * Backend Kampanye entity shape — maps to frontend Program entity.
 * Endpoint: /kampanye (not /programs).
 */
interface ApiKampanye {
  id: string | number;
  judul?: string;
  slug?: string;
  deskripsi?: string;
  kategori?: string;
  lokasi?: string;
  target_donasi?: number;
  tanggal_mulai?: string;
  tanggal_berakhir?: string;
  tanggal_akhir?: string;
  thumbnail?: string;
  thumbnail_url?: string;
  status?: string;
  /** Computed: total donasi terkumpul for this kampanye */
  donasi_sum_gross_amount?: number;
  collected_amount?: number;
  collectedAmount?: number;
}

export function mapProgram(item: ApiKampanye): Program {
  const targetAmount = item.target_donasi ?? 0;
  const collectedAmount =
    item.donasi_sum_gross_amount ?? item.collected_amount ?? item.collectedAmount ?? 0;

  return {
    id: String(item.id),
    title: item.judul ?? "Program",
    category: item.kategori ?? "Umum",
    location: item.lokasi ?? "—",
    description: item.deskripsi ?? "",
    targetAmount,
    collectedAmount,
    deadline: item.tanggal_berakhir ?? item.tanggal_akhir ?? "",
    image: getImageUrl(item.thumbnail_url || item.thumbnail),
    target: formatRupiah(targetAmount),
    collected: formatRupiah(collectedAmount),
    progress: calcProgress(collectedAmount, targetAmount),
  };
}

/**
 * @api {get} /kampanye GET Daftar Kampanye
 * @description Mengambil daftar kampanye program donasi (public).
 * 
 * @param {string} [status] - Opsional filter berdasarkan status (contoh: "Aktif").
 * 
 * @returns {Promise<Program[]>} Berisi array data program kampanye.
 * @throws {Error} Jika terjadi kesalahan pada server.
 */
export async function fetchPrograms(status?: string): Promise<Program[]> {
  try {
    const res = await apiClient.get("/kampanye", {
      params: status ? { status } : undefined,
    });
    return unwrapList<ApiKampanye>(res.data).map(mapProgram);
  } catch (error: any) {
    // Gracefully handle 404 when backend route is not yet available
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {get} /kampanye/:id GET Detail Kampanye
 * @description Mengambil detail data kampanye berdasarkan ID atau slug (public).
 * 
 * @param {string} id - ID atau slug kampanye.
 * 
 * @returns {Promise<Program | null>} Berisi data detail program atau null jika tidak ditemukan.
 * @throws {Error} Jika terjadi kesalahan pada server.
 */
export async function fetchProgramById(id: string): Promise<Program | null> {
  try {
    const res = await apiClient.get(`/kampanye/${id}`);
    const body = res.data as { data?: ApiKampanye } | ApiKampanye;
    const item = (body as { data?: ApiKampanye }).data || (body as ApiKampanye);
    return item ? mapProgram(item) : null;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}

export interface KampanyeFormInput {
  judul: string;
  deskripsi?: string;
  target_donasi: number;
  tanggal_mulai?: string;
  tanggal_berakhir?: string;
  thumbnail?: File;
}

/**
 * @api {post} /kampanye POST Buat Kampanye
 * @description Membuat kampanye donasi baru dengan unggahan thumbnail (hanya admin, multipart/form-data).
 * 
 * @param {KampanyeFormInput} payload - Data kampanye dan file thumbnail.
 * 
 * @returns {Promise<any>} Berisi status dan data kampanye yang baru dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createKampanye(payload: KampanyeFormInput) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  if (payload.deskripsi) {
    formData.append("deskripsi", payload.deskripsi);
  }
  formData.append("target_donasi", String(payload.target_donasi));
  if (payload.tanggal_mulai) {
    formData.append("tanggal_mulai", payload.tanggal_mulai);
  }
  if (payload.tanggal_berakhir) {
    formData.append("tanggal_berakhir", payload.tanggal_berakhir);
  }
  if (payload.thumbnail) {
    formData.append("thumbnail", payload.thumbnail);
  }

  try {
    const res = await apiClient.post("/kampanye", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}

/**
 * @api {put} /kampanye/:id PUT Update Kampanye
 * @description Memperbarui data kampanye berdasarkan ID (hanya admin). Mendukung pembaruan gambar via PUT (override method).
 * 
 * @param {string} id - ID unik kampanye yang akan diperbarui.
 * @param {Partial<KampanyeFormInput>} payload - Data perubahan untuk kampanye.
 * 
 * @returns {Promise<any>} Berisi status dan data kampanye yang diperbarui.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function updateKampanye(id: string, payload: Partial<KampanyeFormInput>) {
  if (payload.thumbnail) {
    const formData = new FormData();
    if (payload.judul) formData.append("judul", payload.judul);
    if (payload.deskripsi) formData.append("deskripsi", payload.deskripsi);
    if (payload.target_donasi !== undefined) formData.append("target_donasi", String(payload.target_donasi));
    if (payload.tanggal_mulai) formData.append("tanggal_mulai", payload.tanggal_mulai);
    if (payload.tanggal_berakhir) formData.append("tanggal_berakhir", payload.tanggal_berakhir);
    formData.append("thumbnail", payload.thumbnail);
    formData.append("_method", "PUT");
    const res = await apiClient.post(`/kampanye/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  const body: Record<string, string | number> = {};
  if (payload.judul) body.judul = payload.judul;
  if (payload.deskripsi) body.deskripsi = payload.deskripsi;
  if (payload.target_donasi !== undefined) body.target_donasi = payload.target_donasi;
  if (payload.tanggal_mulai) body.tanggal_mulai = payload.tanggal_mulai;
  if (payload.tanggal_berakhir) body.tanggal_berakhir = payload.tanggal_berakhir;

  const res = await apiClient.put(`/kampanye/${id}`, body);
  return res.data;
}

/**
 * @api {delete} /kampanye/:id DELETE Hapus Kampanye
 * @description Menghapus kampanye secara permanen berdasarkan ID (hanya admin).
 * 
 * @param {string} id - ID unik kampanye yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika gagal menghapus atau server error.
 */
export async function deleteKampanye(id: string) {
  const res = await apiClient.delete(`/kampanye/${id}`);
  return res.data;
}
