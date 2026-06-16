import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiGaleriPayload } from "@/app/lib/types/api-types";

/** POST /galeri — unggah foto galeri (memerlukan Bearer token, multipart) */
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

/** GET /galeri — returns empty array on 404 (backend may not be ready) */
export async function fetchGaleriList() {
  try {
    const res = await apiClient.get("/galeri");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}
