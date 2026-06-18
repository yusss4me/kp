import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiOrphanResponse } from "@/app/lib/types/api-types";
import type { Orphan } from "@/app/lib/types/entities";

export function mapOrphan(item: ApiOrphanResponse): Orphan {
  const birthDateStr = item.tanggal_lahir || item.birth_date;

  return {
    id: Number(item.id),
    name: item.nama_lengkap || item.nama || item.name || "—",
    birthDate: birthDateStr || "",
    status: item.status || "Baru",
    kategori_bayi: item.kategori_bayi || false,
  };
}

/** GET /anak-asuh — daftar anak asuh (memerlukan Bearer token) */
export async function fetchAnakAsuh(): Promise<Orphan[]> {
  const res = await apiClient.get("/anak-asuh");
  return unwrapList<ApiOrphanResponse>(res.data).map(mapOrphan);
}

/** POST /anak-asuh — payload sesuai api-collection */
export interface CreateAnakAsuhPayload {
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "L" | "P";
  status_yatim_piatu: string;
  tanggal_masuk: string;
}

/** POST /anak-asuh — tambah anak asuh baru (memerlukan Bearer token) */
export async function createAnakAsuh(payload: CreateAnakAsuhPayload) {
  const res = await apiClient.post("/anak-asuh", payload);
  return res.data;
}

/** GET /anak-asuh/{id} — detail anak asuh (memerlukan Bearer token) */
export async function fetchAnakAsuhById(id: string | number): Promise<Orphan> {
  const res = await apiClient.get(`/anak-asuh/${id}`);
  const body = res.data as { data?: ApiOrphanResponse } | ApiOrphanResponse;
  const item = (body as { data?: ApiOrphanResponse }).data || (body as ApiOrphanResponse);
  return mapOrphan(item);
}

/** PUT /anak-asuh/{id} — payload sesuai api-collection */
export interface UpdateAnakAsuhPayload {
  nama_lengkap?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: "L" | "P";
  status_yatim_piatu?: string;
  tanggal_masuk?: string;
}

/** PUT /anak-asuh/{id} — update anak asuh (memerlukan Bearer token) */
export async function updateAnakAsuh(id: string | number, payload: UpdateAnakAsuhPayload) {
  const res = await apiClient.put(`/anak-asuh/${id}`, payload);
  return res.data;
}

/** DELETE /anak-asuh/{id} — hapus anak asuh (memerlukan Bearer token) */
export async function deleteAnakAsuh(id: string | number) {
  const res = await apiClient.delete(`/anak-asuh/${id}`);
  return res.data;
}
