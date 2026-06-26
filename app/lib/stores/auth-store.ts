import { create, type StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getErrorMessage } from "@/app/lib/stores/store-utils";

export type UserRole = "admin" | "super_admin" | "donatur";

interface AuthUser {
  email: string;
  role?: UserRole;
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
  nik?: string;
  no_hp?: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  setAuth: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  setRememberMe: (value: boolean) => void;
  loginApi: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  loginDonaturApi: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  registerDonaturApi: (name: string, email: string, password: string, password_confirmation: string, no_hp?: string, nik?: string, foto_identitas?: File | null) => Promise<{ success: boolean; error?: string }>;
  forgotPasswordApi: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPasswordApi: (token: string, email: string, password: string, passwordConfirmation: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  fetchProfileApi: () => Promise<{ success: boolean; error?: string }>;
  updateProfileApi: (data: { name?: string; no_hp?: string; foto_identitas?: File | null }) => Promise<{ success: boolean; message?: string; error?: string }>;
  changePasswordApi: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateUser: (data: Partial<AuthUser>) => void;
}

/**
 * Set httpOnly cookies via server API route.
 * This replaces the insecure document.cookie approach.
 */
async function setAuthCookies(token: string, role: string) {
  if (!token) {
    console.warn("[setAuthCookies] Skipped: token is empty/null");
    return;
  }

  try {
    const res = await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, role }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error("[setAuthCookies] Failed:", res.status, errorBody);
    }
  } catch (err) {
    console.error("[setAuthCookies] Network error:", err);
  }
}

/**
 * Clear httpOnly cookies via server API route.
 */
async function clearAuthCookies() {
  await fetch("/api/auth/clear-cookie", {
    method: "POST",
  });
}

/**
 * Custom storage that delegates to localStorage or sessionStorage
 * based on the rememberMe flag stored in localStorage.
 */
const REMEMBER_ME_KEY = "yamuti-remember-me";

const dynamicStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true";
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true";
    if (rememberMe) {
      localStorage.setItem(name, value);
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, value);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      rememberMe: true,

      setRememberMe: (value) => {
        // Persist the rememberMe choice in localStorage so it's accessible on hydration
        localStorage.setItem(REMEMBER_ME_KEY, String(value));
        set({ rememberMe: value });
      },

      setAuth: async (token, user) => {
        set({ token, user, isAuthenticated: true });
        // Set httpOnly cookies server-side via API route
        await setAuthCookies(token, user.role || "donatur");
      },

      logout: async () => {
        try {
          const { logoutUser } = await import("@/app/lib/api/services/auth");
          await logoutUser();
        } catch {
          // Continue with local logout even if backend call fails
        }
        set({ token: null, user: null, isAuthenticated: false });
        // Clear httpOnly cookies server-side via API route
        await clearAuthCookies();
      },

      hasRole: (role) => {
        const user = get().user;
        return user?.role === role;
      },

      loginApi: async (email, password, rememberMe = true) => {
        try {
          // Set rememberMe flag before login so storage is correct
          get().setRememberMe(rememberMe);

          const { loginAdmin } = await import("@/app/lib/api/services/auth");
          const data = await loginAdmin({ email, password, role: "admin" });

          const token =
            data?.token ||
            data?.access_token ||
            data?.data?.token ||
            data?.data?.access_token;

          if (!token) {
            console.error("Login API did not return a token:", data);
            return { success: false, error: "Server tidak mengembalikan token. Hubungi administrator." };
          }

          const userObj = data?.user || data?.data?.user;

          const roleFromApi =
            userObj?.role ||
            data?.role ||
            data?.data?.role;

          // DEBUG: lihat response role dari backend
          console.log("[LOGIN DEBUG] Full API response:", JSON.stringify(data, null, 2));
          console.log("[LOGIN DEBUG] userObj:", userObj);
          console.log("[LOGIN DEBUG] roleFromApi:", JSON.stringify(roleFromApi));

          let role: UserRole = "admin";
          if (roleFromApi === "super_admin" || roleFromApi === "owner") {
            role = "super_admin";
          } else if (roleFromApi === "donatur") {
            role = "donatur";
          } else if (roleFromApi === "admin") {
            role = "admin";
          }

          // Admin/Owner login should reject donatur role
          if (role === "donatur") {
            return { success: false, error: "Akun donatur tidak dapat login di sini. Silakan gunakan halaman login donatur." };
          }

          const name =
            userObj?.name ||
            data?.name ||
            data?.data?.name ||
            (role === "super_admin" ? "Super Admin" : "Administrator");

          const image = userObj?.photo || userObj?.image || userObj?.foto_identitas || data?.data?.photo || data?.data?.foto_identitas;

          await get().setAuth(token, { email, role, name, image });
          return { success: true };
        } catch (error: any) {
          console.error("Login Error:", error);
          const message = getErrorMessage(error, "Terjadi kesalahan pada server.");
          return { success: false, error: message };
        }
      },

      loginDonaturApi: async (email, password, rememberMe = true) => {
        try {
          // Set rememberMe flag before login so storage is correct
          get().setRememberMe(rememberMe);

          const { loginDonatur } = await import("@/app/lib/api/services/auth");
          const data = await loginDonatur({ email, password, role: "donatur" });

          const token =
            data?.token ||
            data?.access_token ||
            data?.data?.token ||
            data?.data?.access_token;

          if (!token) {
            console.error("Donatur Login API did not return a token:", data);
            return { success: false, error: "Server tidak mengembalikan token. Hubungi administrator." };
          }

          const userObj = data?.user || data?.data?.user;

          const roleFromApi =
            userObj?.role ||
            data?.role ||
            data?.data?.role;

          let role: UserRole = "donatur";
          if (roleFromApi === "super_admin" || roleFromApi === "owner") {
            role = "super_admin";
          } else if (roleFromApi === "admin") {
            role = "admin";
          } else if (roleFromApi === "donatur") {
            role = "donatur";
          }

          // Donatur login should only accept donatur role
          if (role !== "donatur") {
            return { success: false, error: "Akun admin/owner tidak dapat login di sini. Silakan gunakan halaman login admin." };
          }

          const name =
            userObj?.name ||
            data?.name ||
            data?.data?.name ||
            "Donatur";

          const image = userObj?.photo || userObj?.image || userObj?.foto_identitas || data?.data?.photo || data?.data?.foto_identitas;

          await get().setAuth(token, { email, role, name, image });
          return { success: true };
        } catch (error: any) {
          console.error("Donatur Login Error:", error);
          const message = getErrorMessage(error, "Terjadi kesalahan pada server.");
          return { success: false, error: message };
        }
      },

      registerDonaturApi: async (name, email, password, password_confirmation, no_hp, nik, foto_identitas) => {
        try {
          const { registerDonatur } = await import("@/app/lib/api/services/auth");
          
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("password_confirmation", password_confirmation);
          formData.append("role", "donatur");
          if (no_hp) formData.append("no_hp", no_hp);
          if (nik) formData.append("nik", nik);
          if (foto_identitas) formData.append("foto_identitas", foto_identitas);

          const data = await registerDonatur(formData);

          // Auto-login after registration if token is returned
          const token =
            (data as any)?.token ||
            (data as any)?.access_token ||
            (data as any)?.data?.token ||
            (data as any)?.data?.access_token;

          if (token) {
            const userObj = data?.data?.user || (data as any)?.user;
            await get().setAuth(token, {
              email,
              role: "donatur",
              name: userObj?.name || name,
            });
          }

          return { success: true };
        } catch (error: any) {
          console.error("Register Error:", error);
          const message = getErrorMessage(error, "Terjadi kesalahan pada server.");
          return { success: false, error: message };
        }
      },

      forgotPasswordApi: async (email) => {
        try {
          const { forgotPassword } = await import("@/app/lib/api/services/auth");
          const data = await forgotPassword({ email });
          return {
            success: true,
            message: data.message || "Instruksi reset password telah dikirim ke email Anda.",
          };
        } catch (error: any) {
          console.error("Forgot Password Error:", error);
          const message = error?.message || error.response?.data?.message || "Terjadi kesalahan. Pastikan email terdaftar.";
          return { success: false, error: message };
        }
      },

      resetPasswordApi: async (token, email, password, passwordConfirmation) => {
        try {
          const { resetPassword } = await import("@/app/lib/api/services/auth");
          const data = await resetPassword({
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
          });
          return {
            success: true,
            message: data.message || "Password berhasil diubah. Silakan login kembali.",
          };
        } catch (error: any) {
          console.error("Reset Password Error:", error);
          const message = error?.message || error.response?.data?.message || "Token tidak valid atau sudah kedaluwarsa.";
          return { success: false, error: message };
        }
      },

      fetchProfileApi: async () => {
        try {
          const { getCurrentUser } = await import("@/app/lib/api/services/auth");
          const data = await getCurrentUser();
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                name: data.name || currentUser.name,
                email: data.email || currentUser.email,
                // no_hp dari /auth/me disimpan ke phone
                phone: (data as any).no_hp || currentUser.phone,
                image: data.photo || data.image || (data as any).foto_identitas || currentUser.image,
              },
            });
          }
          return { success: true };
        } catch (error: any) {
          console.error("Fetch Profile Error:", error);
          const message = error?.message || error.response?.data?.message || "Gagal mengambil profil.";
          return { success: false, error: message };
        }
      },

      updateProfileApi: async (payload) => {
        try {
          const { updateProfile } = await import("@/app/lib/api/services/auth");
          const formData = new FormData();
          if (payload.name) formData.append("name", payload.name);
          if (payload.no_hp) formData.append("no_hp", payload.no_hp);
          if (payload.foto_identitas) formData.append("foto_identitas", payload.foto_identitas);

          const data = await updateProfile(formData);
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                name: data.name || currentUser.name,
                phone: data.phone || currentUser.phone || payload.no_hp,
                address: data.address || currentUser.address,
                image: data.photo || data.image || (data as any).foto_identitas || currentUser.image,
              },
            });
          }
          return { success: true, message: "Profil berhasil diperbarui." };
        } catch (error: any) {
          console.error("Update Profile Error:", error);
          const message = error?.message || error.response?.data?.message || "Gagal memperbarui profil.";
          return { success: false, error: message };
        }
      },

      changePasswordApi: async (currentPassword, newPassword) => {
        try {
          const { changePassword } = await import("@/app/lib/api/services/auth");
          const data = await changePassword({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: newPassword,
          });
          return { success: true, message: data.message || "Kata sandi berhasil diubah." };
        } catch (error: any) {
          console.error("Change Password Error:", error);
          const message = error?.message || error.response?.data?.message || "Gagal mengubah kata sandi.";
          return { success: false, error: message };
        }
      },

      updateUser: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },
    }),
    {
      name: "yamuti-auth",
      storage: createJSONStorage(() => dynamicStorage),
    }
  )
);
