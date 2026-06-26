import { apiClient } from "@/app/lib/api/client";

export interface DashboardSummaryResponse {
  total_anak_asuh?: number;
  total_donasi_bulan_ini?: number;
  kunjungan_menunggu?: number;
  saldo_kas_terkini?: number;
  // Alternative backend field names
  total_anak?: number;
  total_donation?: number;
  pending_visits?: number;
  current_balance?: number;
}

/**
 * @api {get} /dashboard/summary GET Ringkasan Dashboard
 * @description Mengambil ringkasan statistik untuk Admin & Owner (memerlukan Bearer token).
 * 
 * @returns {Promise<DashboardSummaryResponse>} Berisi data ringkasan statistik (total anak, donasi, kunjungan, saldo).
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchDashboardSummary(): Promise<DashboardSummaryResponse> {
  const res = await apiClient.get("/dashboard/summary");
  const body = res.data as { data?: DashboardSummaryResponse } | DashboardSummaryResponse;
  return (body as { data?: DashboardSummaryResponse }).data || (body as DashboardSummaryResponse);
}
