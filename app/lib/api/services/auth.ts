import { apiClient } from "@/app/lib/api/client";
import type { ApiLoginPayload } from "@/app/lib/types/api-types";

export interface LoginResponse {
  token: string;
  role?: string;
  name?: string;
  data?: {
    role?: string;
    name?: string;
  };
}

/** POST /login — login admin/owner (public, tanpa auth) */
export async function loginAdmin(payload: ApiLoginPayload): Promise<LoginResponse> {
  const res = await apiClient.post("/login", payload);
  return res.data as LoginResponse;
}
