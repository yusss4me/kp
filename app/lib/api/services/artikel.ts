import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

/** POST /artikel — buat artikel baru (memerlukan Bearer token, multipart) */
export async function createArtikel(formData: FormData) {
  const res = await apiClient.post("/artikel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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

/** GET /broadcast/templates — returns empty array on 404 */
export async function fetchBroadcastTemplates() {
  try {
    const res = await apiClient.get("/broadcast/templates");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}
