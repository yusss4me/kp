import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { OwnerAdmin } from "@/app/lib/types/entities";

export interface ApiAdminResponse {
  id: string | number;
  name?: string;
  nama?: string;
  email?: string;
  role?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export function mapAdmin(item: ApiAdminResponse): OwnerAdmin {
  return {
    id: String(item.id),
    name: item.name ?? item.nama ?? "—",
    email: item.email ?? "",
    role: item.role ?? "admin",
    status: (item.status as OwnerAdmin["status"]) ?? "Aktif",
  };
}

/** GET /admins — daftar admin (Owner only, memerlukan Bearer token) */
export async function fetchAdminsList(): Promise<OwnerAdmin[]> {
  try {
    const res = await apiClient.get("/admins");
    return unwrapList<ApiAdminResponse>(res.data).map(mapAdmin);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  role: string;
}

/** POST /admins — tambah admin baru (Owner only, memerlukan Bearer token) */
export async function createAdmin(payload: CreateAdminPayload) {
  const res = await apiClient.post("/admins", payload);
  return res.data;
}

/** GET /admins/{id} — detail admin (Owner only, memerlukan Bearer token) */
export async function fetchAdminById(id: string | number): Promise<OwnerAdmin> {
  const res = await apiClient.get(`/admins/${id}`);
  const body = res.data as { data?: ApiAdminResponse } | ApiAdminResponse;
  const item = (body as { data?: ApiAdminResponse }).data || (body as ApiAdminResponse);
  return mapAdmin(item);
}

export interface UpdateAdminPayload {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: string;
}

/** PUT /admins/{id} — update admin (Owner only, memerlukan Bearer token) */
export async function updateAdmin(id: string | number, payload: UpdateAdminPayload) {
  const res = await apiClient.put(`/admins/${id}`, payload);
  return res.data;
}

/** DELETE /admins/{id} — hapus admin (Owner only, memerlukan Bearer token) */
export async function deleteAdmin(id: string | number) {
  const res = await apiClient.delete(`/admins/${id}`);
  return res.data;
}
