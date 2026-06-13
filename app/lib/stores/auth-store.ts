import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "owner" | "donatur";

interface AuthUser {
  email: string;
  role?: UserRole;
  name?: string;
  image?: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  loginApi: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true });
        // Sync ke cookie agar middleware bisa membaca
        setCookie("yamuti-auth-token", token);
        setCookie("yamuti-auth-role", user.role || "donatur");
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        deleteCookie("yamuti-auth-token");
        deleteCookie("yamuti-auth-role");
      },

      hasRole: (role) => {
        const user = get().user;
        return user?.role === role;
      },

      loginApi: async (email, password) => {
        try {
          const { loginAdmin } = await import("@/app/lib/api/services/auth");
          const data = await loginAdmin({ email, password });
          
          const token = data?.token || "dummy_token_if_not_provided";
          const roleFromApi = data?.role || data?.data?.role;
          let role: UserRole = roleFromApi as UserRole;
          
          // Fallback for demo/testing if API doesn't return role
          if (!role) {
            role = email.includes("owner") ? "owner" : "admin";
          }
          
          const name = data?.name || data?.data?.name || (role === "owner" ? "Owner" : "Administrator");

          get().setAuth(token, { email, role, name });
          return { success: true };
        } catch (error: any) {
          console.error("Login Error:", error);
          const message = error.response?.data?.message || "Terjadi kesalahan pada server.";
          return { success: false, error: message };
        }
      },
    }),
    {
      name: "yamuti-auth",
    }
  )
);
