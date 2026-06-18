import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

/** POST /artikel — payload sesuai api-collection */
export interface CreateArtikelPayload {
  judul: string;
  konten: string;
  kategori_id: string;
  status: string;
}

/** POST /artikel — buat artikel baru (memerlukan Bearer token) */
export async function createArtikel(payload: CreateArtikelPayload) {
  const res = await apiClient.post("/artikel", payload);
  return res.data;
}

/** GET /artikel — returns empty array on 404 (backend may not be ready) */
export async function fetchArtikelList() {
  try {
    const res = await apiClient.get("/artikel");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** GET /artikel/{id} — detail artikel */
export async function fetchArtikelById(id: string | number) {
  const res = await apiClient.get(`/artikel/${id}`);
  const body = res.data as { data?: unknown } | unknown;
  return (body as { data?: unknown }).data || body;
}

/** PUT /artikel/{id} — update artikel (memerlukan Bearer token) */
export async function updateArtikel(
  id: string | number,
  payload: Partial<CreateArtikelPayload>
) {
  const res = await apiClient.put(`/artikel/${id}`, payload);
  return res.data;
}

/** DELETE /artikel/{id} — hapus artikel (memerlukan Bearer token) */
export async function deleteArtikel(id: string | number) {
  const res = await apiClient.delete(`/artikel/${id}`);
  return res.data;
}

/* ===== Kategori Artikel ===== */

/** GET /kategori-artikel — returns empty array on 404 */
export async function fetchKategoriArtikel() {
  try {
    const res = await apiClient.get("/kategori-artikel");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** GET /kategori-artikel/{id} — detail kategori artikel */
export async function fetchKategoriArtikelById(id: string | number) {
  const res = await apiClient.get(`/kategori-artikel/${id}`);
  const body = res.data as { data?: unknown } | unknown;
  return (body as { data?: unknown }).data || body;
}

/** POST /kategori-artikel — buat kategori artikel */
export async function createKategoriArtikel(payload: { nama: string }) {
  const res = await apiClient.post("/kategori-artikel", payload);
  return res.data;
}

/** PUT /kategori-artikel/{id} — update kategori artikel */
export async function updateKategoriArtikel(
  id: string | number,
  payload: { nama?: string }
) {
  const res = await apiClient.put(`/kategori-artikel/${id}`, payload);
  return res.data;
}

/** DELETE /kategori-artikel/{id} — hapus kategori artikel */
export async function deleteKategoriArtikel(id: string | number) {
  const res = await apiClient.delete(`/kategori-artikel/${id}`);
  return res.data;
}
