import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { InventoryItem } from "@/app/lib/types/entities";

export interface ApiInventarisResponse {
  id: string | number;
  nama?: string;
  name?: string;
  kategori?: string;
  category?: string;
  stok?: number | string;
  stock?: number | string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export function mapInventaris(item: ApiInventarisResponse): InventoryItem {
  const stockRaw = item.stok ?? item.stock ?? 0;
  const stockNum = typeof stockRaw === "string" ? parseInt(stockRaw) || 0 : stockRaw;
  const status =
    stockNum > 10 ? "Cukup" : stockNum > 0 ? "Menipis" : "Habis";
  return {
    id: Number(item.id),
    name: item.nama ?? item.name ?? "—",
    category: item.kategori ?? item.category ?? "Umum",
    stock: String(stockRaw),
    status: (item.status as InventoryItem["status"]) ?? status,
  };
}

/** GET /inventaris — daftar barang inventaris (memerlukan Bearer token) */
export async function fetchInventarisList(): Promise<InventoryItem[]> {
  try {
    const res = await apiClient.get("/inventaris");
    return unwrapList<ApiInventarisResponse>(res.data).map(mapInventaris);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

export interface CreateInventarisPayload {
  nama: string;
  kategori?: string;
  stok?: number;
}

/** POST /inventaris — tambah master barang (memerlukan Bearer token) */
export async function createInventaris(payload: CreateInventarisPayload) {
  const res = await apiClient.post("/inventaris", payload);
  return res.data;
}

/** GET /inventaris/{id} — detail barang (memerlukan Bearer token) */
export async function fetchInventarisById(id: string | number): Promise<InventoryItem> {
  const res = await apiClient.get(`/inventaris/${id}`);
  const body = res.data as { data?: ApiInventarisResponse } | ApiInventarisResponse;
  const item = (body as { data?: ApiInventarisResponse }).data || (body as ApiInventarisResponse);
  return mapInventaris(item);
}

export interface UpdateInventarisPayload {
  nama?: string;
  kategori?: string;
  stok?: number;
}

/** PUT /inventaris/{id} — update barang (memerlukan Bearer token) */
export async function updateInventaris(id: string | number, payload: UpdateInventarisPayload) {
  const res = await apiClient.put(`/inventaris/${id}`, payload);
  return res.data;
}

/** DELETE /inventaris/{id} — hapus barang (memerlukan Bearer token) */
export async function deleteInventaris(id: string | number) {
  const res = await apiClient.delete(`/inventaris/${id}`);
  return res.data;
}
