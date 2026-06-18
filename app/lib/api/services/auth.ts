import { apiClient } from "@/app/lib/api/client";
import type { ApiLoginPayload } from "@/app/lib/types/api-types";

export interface LoginUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token?: string;
  access_token?: string;
  user?: LoginUser;
  role?: string;
  name?: string;
  data?: {
    token?: string;
    access_token?: string;
    user?: LoginUser;
    role?: string;
    name?: string;
  };
}

/** POST /auth/login — login admin/owner (public, tanpa auth) */
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

/** POST /auth/login — login khusus donatur (same endpoint, role-checked in store) */
export async function loginDonatur(payload: ApiLoginPayload): Promise<LoginResponse> {
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

/** POST /auth/register — pendaftaran donatur baru */
export interface RegisterDonaturPayload {
  name: string;
  email: string;
  no_whatsapp: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterDonaturResponse {
  message?: string;
  data?: {
    user?: LoginUser;
  };
  token?: string;
}

export async function registerDonatur(payload: RegisterDonaturPayload): Promise<RegisterDonaturResponse> {
  try {
    const res = await apiClient.post("/auth/register", payload, { timeout: 15000 });
    return res.data as RegisterDonaturResponse;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /auth/register — network error or timeout");
      throw Object.assign(new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti."), { code: "ERR_NETWORK" });
    }
    throw error;
  }
}

/** POST /forgot-password — kirim email reset password */
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
  status?: string;
}

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

/** POST /reset-password — reset password dengan token dari email */
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

/** GET /profile — ambil profil user yang sedang login */
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

/** PUT /profile — update profil user */
export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  address?: string;
}

export interface UpdateProfileResponse {
  message?: string;
  data?: ProfileData;
  user?: ProfileData;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<ProfileData> {
  try {
    const res = await apiClient.put("/profile", payload, { timeout: 15000 });
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

/** PUT /profile/password — ubah kata sandi */
export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

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

/** POST /auth/logout — logout user (memerlukan Bearer token) */
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

/** GET /auth/me — ambil data user yang sedang login (memerlukan Bearer token) */
export interface CurrentUserResponse {
  id: string | number;
  name: string;
  email: string;
  role: string;
  no_whatsapp?: string;
  nik?: string;
  alamat?: string;
  photo?: string;
}

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

/** POST /contact — kirim pesan kontak */
export interface ContactPayload {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message?: string;
}

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
