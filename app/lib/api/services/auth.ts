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

/** POST /login — login admin/owner (public, tanpa auth) */
export async function loginAdmin(payload: ApiLoginPayload): Promise<LoginResponse> {
  const res = await apiClient.post("/login", payload);
  return res.data as LoginResponse;
}

/** POST /donatur/login — login khusus donatur */
export async function loginDonatur(payload: ApiLoginPayload): Promise<LoginResponse> {
  const res = await apiClient.post("/login", payload);
  return res.data as LoginResponse;
}

/** POST /donatur/register — pendaftaran donatur baru */
export interface RegisterDonaturPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterDonaturResponse {
  message?: string;
  data?: {
    token?: string;
    user?: LoginUser;
  };
}

export async function registerDonatur(payload: RegisterDonaturPayload): Promise<RegisterDonaturResponse> {
  const res = await apiClient.post("/daftar", payload);
  return res.data as RegisterDonaturResponse;
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
  const res = await apiClient.post("/forgot-password", payload);
  return res.data as ForgotPasswordResponse;
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
  const res = await apiClient.post("/reset-password", payload);
  return res.data as ResetPasswordResponse;
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
  const res = await apiClient.get("/profile");
  const body = res.data as ProfileResponse;
  // Normalize: backend may wrap in `data` or `user` key
  return body.data || body.user || body;
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
  const res = await apiClient.put("/profile", payload);
  const body = res.data as UpdateProfileResponse;
  return (body.data || body.user || body) as ProfileData;
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
  const res = await apiClient.put("/profile/password", payload);
  return res.data as ChangePasswordResponse;
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
  const res = await apiClient.post("/contact", payload);
  return res.data as ContactResponse;
}
