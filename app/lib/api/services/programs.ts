import type { Program } from "@/app/lib/types/entities";
import { calcProgress, formatRupiah } from "@/app/lib/utils/crud-helpers";
import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

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
    image: item.thumbnail ?? item.thumbnail_url,
    target: formatRupiah(targetAmount),
    collected: formatRupiah(collectedAmount),
    progress: calcProgress(collectedAmount, targetAmount),
  };
}

/** GET /kampanye — daftar kampanye (public, optional ?status=Aktif) */
export async function fetchPrograms(status?: string): Promise<Program[]> {
  try {
    const params = status ? `?status=${encodeURIComponent(status)}` : "";
    const res = await apiClient.get(`/kampanye/${params}`);
    return unwrapList<ApiKampanye>(res.data).map(mapProgram);
  } catch (error: any) {
    // Gracefully handle 404 when backend route is not yet available
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** GET /kampanye/{id} — detail kampanye (public, supports id or slug) */
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
  deskripsi: string;
  target_donasi: number;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  thumbnail?: File;
}

/** POST /kampanye — buat kampanye baru (admin, multipart/form-data for thumbnail) */
export async function createKampanye(payload: KampanyeFormInput) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("target_donasi", String(payload.target_donasi));
  formData.append("tanggal_mulai", payload.tanggal_mulai);
  formData.append("tanggal_berakhir", payload.tanggal_berakhir);
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

/** PUT /kampanye/{id} — update kampanye (admin, multipart/form-data) */
export async function updateKampanye(id: string, payload: Partial<KampanyeFormInput>) {
  const formData = new FormData();
  if (payload.judul) formData.append("judul", payload.judul);
  if (payload.deskripsi) formData.append("deskripsi", payload.deskripsi);
  if (payload.target_donasi !== undefined) formData.append("target_donasi", String(payload.target_donasi));
  if (payload.tanggal_mulai) formData.append("tanggal_mulai", payload.tanggal_mulai);
  if (payload.tanggal_berakhir) formData.append("tanggal_berakhir", payload.tanggal_berakhir);
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);

  // Laravel uses POST + _method=PUT for multipart uploads
  formData.append("_method", "PUT");
  const res = await apiClient.post(`/kampanye/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/** DELETE /kampanye/{id} — hapus kampanye (admin) */
export async function deleteKampanye(id: string) {
  const res = await apiClient.delete(`/kampanye/${id}`);
  return res.data;
}
