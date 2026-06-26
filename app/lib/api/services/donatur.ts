import { apiClient } from "@/app/lib/api/client";

export interface Donatur {
  id: string | number;
  name: string;
  email: string;
  no_hp?: string;
  nik?: string;
  foto_identitas?: string;
  role: string;
}

export interface FetchDonaturResponse {
  data: Donatur[];
}

export interface FetchDonaturDetailResponse {
  data: Donatur;
}

/**
 * @api {get} /donatur GET Daftar Donatur
 * @description Mengambil daftar seluruh donatur (Admin CRM).
 * 
 * @returns {Promise<Donatur[]>} Array data donatur.
 * @throws {Error} Jika terjadi kesalahan.
 */
export async function fetchDonatur(): Promise<Donatur[]> {
  const res = await apiClient.get("/donatur");
  const body = res.data as FetchDonaturResponse;
  return body.data || res.data;
}

/**
 * @api {get} /donatur/:id GET Detail Donatur
 * @description Mengambil detail dari donatur spesifik.
 * 
 * @param {string|number} id ID Donatur
 * @returns {Promise<Donatur>} Data donatur.
 * @throws {Error} Jika tidak ditemukan.
 */
export async function fetchDonaturById(id: string | number): Promise<Donatur> {
  const res = await apiClient.get(`/donatur/${id}`);
  const body = res.data as FetchDonaturDetailResponse;
  return body.data || res.data;
}
