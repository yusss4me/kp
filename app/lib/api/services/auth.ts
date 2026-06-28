import { apiClient } from "@/app/lib/api/client";
import type { ApiLoginPayload } from "@/app/lib/types/api-types";

export interface LoginUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  photo?: string;
  image?: string;
  foto_identitas?: string;
}

export interface LoginResponse {
  token?: string;
  access_token?: string;
  user?: LoginUser;
  role?: string;
  name?: string;
  photo?: string;
  foto_identitas?: string;
  image?: string;
  data?: {
    token?: string;
    access_token?: string;
    user?: LoginUser;
    role?: string;
    name?: string;
    photo?: string;
    foto_identitas?: string;
    image?: string;
  };
}

/**
 * @api {post} /auth/login POST Login Admin
 * @description Melakukan proses otentikasi untuk admin/owner (public, tanpa auth).
 * 
 * @param {ApiLoginPayload} payload - Kredensial login (email dan password).
 * 
 * @returns {Promise<LoginResponse>} Berisi token akses dan data user.
 * @throws {Error} Jika kredensial salah atau terjadi kesalahan pada server.
 */
export async function loginAdmin(payload: ApiLoginPayload): Promise<LoginResponse> {
  try {
    const res = await apiClient.post("/auth/login", payload, { timeout: 15000 });
    return res.data as LoginResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /auth/login — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * @api {post} /auth/login POST Login Donatur
 * @description Melakukan proses otentikasi khusus untuk donatur.
 * 
 * @param {ApiLoginPayload} payload - Kredensial login (email dan password).
 * 
 * @returns {Promise<LoginResponse>} Berisi token akses dan data user donatur.
 * @throws {Error} Jika kredensial salah atau terjadi kesalahan pada server.
 */
export async function loginDonatur(payload: ApiLoginPayload): Promise<LoginResponse> {
  // try {
  const res = await apiClient.post("/auth/login", payload, { timeout: 15000 });
  return res.data as LoginResponse;
  // } catch (error: any) {
  //   if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
  //     console.warn("POST /auth/login — network error or timeout");
  //     throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
  //   }
  //   throw error;
  // }
}

/**
 * Data payload untuk registrasi donatur baru.
 */
export interface RegisterDonaturPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  no_hp?: string;
  nik?: string;
  alamat?: string;
  role?: string;
}

export interface RegisterDonaturResponse {
  message?: string;
  data?: {
    user?: LoginUser;
  };
  token?: string;
}

/**
 * @api {post} /auth/register POST Pendaftaran Donatur
 * @description Mendaftarkan akun donatur baru ke sistem.
 * 
 * @param {FormData} payload - Data registrasi donatur (termasuk foto_identitas).
 * 
 * @returns {Promise<RegisterDonaturResponse>} Berisi pesan sukses dan token.
 * @throws {Error} Jika validasi gagal atau terjadi kesalahan pada server.
 */
export async function registerDonatur(payload: FormData): Promise<RegisterDonaturResponse> {
  try {
    const res = await apiClient.post("/auth/register", payload, { 
      timeout: 15000,
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data as RegisterDonaturResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /auth/register — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * Data payload untuk permintaan reset password via email.
 */
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
  status?: string;
}

/**
 * @api {post} /forgot-password POST Lupa Password
 * @description Mengirimkan email berisi tautan token untuk reset password.
 * 
 * @param {ForgotPasswordPayload} payload - Data email pengguna.
 * 
 * @returns {Promise<ForgotPasswordResponse>} Berisi pesan status pengiriman email.
 * @throws {Error} Jika email tidak ditemukan atau server error.
 */
export async function forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
  try {
    const res = await apiClient.post("/forgot-password", payload, { timeout: 15000 });
    return res.data as ForgotPasswordResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /forgot-password — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * Data payload untuk mereset password baru menggunakan token.
 */
export interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResponse {
  message?: string;
  status?: string;
}

/**
 * @api {post} /reset-password POST Reset Password
 * @description Memperbarui password menggunakan token yang dikirim via email.
 * 
 * @param {ResetPasswordPayload} payload - Token dan password baru.
 * 
 * @returns {Promise<ResetPasswordResponse>} Berisi pesan sukses.
 * @throws {Error} Jika token tidak valid atau gagal memperbarui password.
 */
export async function resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
  try {
    const res = await apiClient.post("/reset-password", payload, { timeout: 15000 });
    return res.data as ResetPasswordResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /reset-password — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * Antarmuka untuk data profil pengguna.
 */
export interface ProfileData {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
  image?: string;
  role?: string;
}

export interface ProfileResponse {
  data?: ProfileData;
  user?: ProfileData;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
}

/**
 * @api {get} /profile GET Profil Pengguna
 * @description Mengambil data profil untuk user yang sedang login (memerlukan Bearer token).
 * 
 * @returns {Promise<ProfileData>} Berisi data rincian profil pengguna.
 * @throws {Error} Jika gagal memuat profil atau sesi habis.
 */
export async function fetchProfile(): Promise<ProfileData> {
  try {
    const res = await apiClient.get("/profile", { timeout: 15000 });
    const body = res.data as ProfileResponse;
    // Normalize: backend may wrap in `data` or `user` key
    return body.data || body.user || body;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("GET /profile — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * Data payload untuk memperbarui profil pengguna.
 */
export interface UpdateProfilePayload {
  name?: string;
  no_hp?: string;
}

export interface UpdateProfileResponse {
  message?: string;
  data?: ProfileData;
  user?: ProfileData;
}

/**
 * @api {put} /profile PUT Update Profil
 * @description Memperbarui data profil dasar pengguna (memerlukan Bearer token).
 * 
 * @param {FormData} payload - Data profil yang ingin diperbarui (termasuk foto_identitas).
 * 
 * @returns {Promise<ProfileData>} Berisi data profil terbaru.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function updateProfile(payload: FormData): Promise<ProfileData> {
  try {
    // Workaround for Laravel backend limitation on PUT requests with multipart/form-data
    payload.append("_method", "PUT");
    const res = await apiClient.post("/profile", payload, { 
      timeout: 15000,
      headers: { "Content-Type": "multipart/form-data" }
    });
    const body = res.data as UpdateProfileResponse;
    return (body.data || body.user || body) as ProfileData;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("PUT /profile — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * Data payload untuk mengubah kata sandi dari halaman profil.
 */
export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

/**
 * @api {put} /profile/password PUT Ubah Kata Sandi
 * @description Memperbarui kata sandi pengguna dengan memverifikasi kata sandi lama (memerlukan Bearer token).
 * 
 * @param {ChangePasswordPayload} payload - Kata sandi lama dan baru.
 * 
 * @returns {Promise<ChangePasswordResponse>} Berisi pesan sukses pengubahan kata sandi.
 * @throws {Error} Jika kata sandi lama salah atau validasi gagal.
 */
export async function changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
  try {
    const res = await apiClient.put("/profile/password", payload, { timeout: 15000 });
    return res.data as ChangePasswordResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("PUT /profile/password — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * @api {post} /auth/logout POST Logout
 * @description Mengakhiri sesi pengguna saat ini di server (memerlukan Bearer token).
 * 
 * @returns {Promise<{ message?: string }>} Berisi pesan sukses logout.
 * @throws {Error} Jika terjadi kesalahan pada server (menggunakan fallback offline).
 */
export async function logoutUser(): Promise<{ message?: string }> {
  try {
    const res = await apiClient.post("/auth/logout", {}, { timeout: 15000 });
    return res.data;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /auth/logout — network error or timeout");
      return { message: "Logout berhasil (offline)" };
    }
    throw error;
  }
}

/**
 * Data respons untuk detail pengguna saat ini.
 */
export interface CurrentUserResponse {
  id: string | number;
  name: string;
  email: string;
  role: string;
  no_whatsapp?: string;
  nik?: string;
  alamat?: string;
  photo?: string;
  image?: string;
}

/**
 * @api {get} /auth/me GET Current User
 * @description Mengambil data dasar user yang sedang login untuk keperluan inisialisasi sesi (memerlukan Bearer token).
 * 
 * @returns {Promise<CurrentUserResponse>} Berisi data pengguna saat ini.
 * @throws {Error} Jika token tidak valid atau sesi habis.
 */
export async function getCurrentUser(): Promise<CurrentUserResponse> {
  try {
    const res = await apiClient.get("/auth/me", { timeout: 15000 });
    const body = res.data as { data?: CurrentUserResponse } | CurrentUserResponse;
    return (body as { data?: CurrentUserResponse }).data || (body as CurrentUserResponse);
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("GET /auth/me — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * Data payload untuk formulir pengiriman pesan kontak.
 */
export interface ContactPayload {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message?: string;
}

/**
 * @api {post} /contact POST Kirim Kontak
 * @description Mengirimkan pesan pertanyaan atau masukan dari pengunjung (public).
 * 
 * @param {ContactPayload} payload - Data pengirim dan isi pesan.
 * 
 * @returns {Promise<ContactResponse>} Berisi pesan sukses terkirim.
 * @throws {Error} Jika pengiriman gagal.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  try {
    const res = await apiClient.post("/contact", payload, { timeout: 15000 });
    return res.data as ContactResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /contact — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/**
 * @api {get} /user/riwayat-donasi GET Riwayat Donasi
 * @description Mengambil riwayat donasi dari user yang sedang login.
 * 
 * @returns {Promise<any>} Berisi data riwayat donasi pengguna.
 */
export async function fetchRiwayatDonasi(): Promise<any> {
  const res = await apiClient.get("/user/riwayat-donasi", { timeout: 15000 });
  return res.data;
}

/**
 * @api {get} /user/riwayat-kunjungan GET Riwayat Kunjungan
 * @description Mengambil riwayat kunjungan dari user yang sedang login.
 * 
 * @returns {Promise<any>} Berisi data riwayat kunjungan pengguna.
 */
export async function fetchRiwayatKunjungan(): Promise<any> {
  const res = await apiClient.get("/user/riwayat-kunjungan", { timeout: 15000 });
  return res.data;
}
