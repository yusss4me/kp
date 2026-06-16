import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiMutasiBarangPayload } from "@/app/lib/types/api-types";

/** POST /mutasi-barang — catat mutasi barang (memerlukan Bearer token) */
export async function catatMutasiBarang(payload: ApiMutasiBarangPayload) {
  const res = await apiClient.post("/mutasi-barang", payload);
  return res.data;
}

/** GET /mutasi-barang — returns empty array on 404 (backend may not be ready) */
export async function fetchMutasiBarangList() {
  try {
    const res = await apiClient.get("/mutasi-barang");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}
