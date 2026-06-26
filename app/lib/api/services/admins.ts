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

/**
 * @api {get} /admins GET Daftar Admin
 * @description Mengambil daftar admin (Owner only, memerlukan Bearer token).
 * 
 * @returns {Promise<OwnerAdmin[]>} Berisi array data admin.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
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

/**
 * @api {post} /admins POST Tambah Admin Baru
 * @description Menambahkan data admin baru ke server (Owner only, memerlukan Bearer token).
 * 
 * @param {CreateAdminPayload} payload - Data body admin yang akan ditambahkan.
 * 
 * @returns {Promise<any>} Berisi status, pesan, dan data admin yang baru dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createAdmin(payload: CreateAdminPayload) {
  const res = await apiClient.post("/admins", payload);
  return res.data;
}

/**
 * @api {get} /admins/:id GET Detail Admin
 * @description Mengambil detail data admin berdasarkan ID (Owner only, memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik admin.
 * 
 * @returns {Promise<OwnerAdmin>} Berisi data detail admin.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
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

/**
 * @api {put} /admins/:id PUT Update Admin
 * @description Memperbarui data admin berdasarkan ID (Owner only, memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik admin yang akan diperbarui.
 * @param {UpdateAdminPayload} payload - Data perubahan untuk admin.
 * 
 * @returns {Promise<any>} Berisi status, pesan, dan data admin yang telah diperbarui.
 * @throws {Error} Jika ID tidak ditemukan atau validasi gagal.
 */
export async function updateAdmin(id: string | number, payload: UpdateAdminPayload) {
  const res = await apiClient.put(`/admins/${id}`, payload);
  return res.data;
}

/**
 * @api {delete} /admins/:id DELETE Hapus Admin
 * @description Menghapus data admin secara permanen berdasarkan ID (Owner only, memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik admin yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika ID tidak ditemukan atau gagal dihapus.
 */
export async function deleteAdmin(id: string | number) {
  const res = await apiClient.delete(`/admins/${id}`);
  return res.data;
}
