import { create, type StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "admin" | "owner" | "donatur";

interface AuthUser {
  email: string;
  role?: UserRole;
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
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
  registerDonaturApi: (name: string, email: string, password: string, password_confirmation: string, no_whatsapp: string) => Promise<{ success: boolean; error?: string }>;
  forgotPasswordApi: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPasswordApi: (token: string, email: string, password: string, passwordConfirmation: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  fetchProfileApi: () => Promise<{ success: boolean; error?: string }>;
  updateProfileApi: (data: { name?: string; phone?: string; address?: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
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
    // If rememberMe is false, read from sessionStorage
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true";
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true";
    const storage = rememberMe ? localStorage : sessionStorage;
    // Always save the rememberMe flag in localStorage so it can be read on hydration
    if (rememberMe) {
      localStorage.setItem(name, value);
      // Also clear any sessionStorage version
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, value);
      // Clear any localStorage version
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string): void => {
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
          const data = await loginAdmin({ email, password });

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
          let role: UserRole = (roleFromApi as UserRole) || "admin";

          // Admin/Owner login should reject donatur role
          if (role === "donatur") {
            return { success: false, error: "Akun donatur tidak dapat login di sini. Silakan gunakan halaman login donatur." };
          }

          const name =
            userObj?.name ||
            data?.name ||
            data?.data?.name ||
            (role === "owner" ? "Owner" : "Administrator");

          await get().setAuth(token, { email, role, name });
          return { success: true };
        } catch (error: any) {
          console.error("Login Error:", error);
          const message = error?.message || error.response?.data?.message || "Terjadi kesalahan pada server.";
          return { success: false, error: message };
        }
      },

      loginDonaturApi: async (email, password, rememberMe = true) => {
        try {
          // Set rememberMe flag before login so storage is correct
          get().setRememberMe(rememberMe);

          const { loginDonatur } = await import("@/app/lib/api/services/auth");
          const data = await loginDonatur({ email, password });

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
          let role: UserRole = (roleFromApi as UserRole) || "donatur";

          // Donatur login should only accept donatur role
          if (role !== "donatur") {
            return { success: false, error: "Akun admin/owner tidak dapat login di sini. Silakan gunakan halaman login admin." };
          }

          const name =
            userObj?.name ||
            data?.name ||
            data?.data?.name ||
            "Donatur";

          await get().setAuth(token, { email, role, name });
          return { success: true };
        } catch (error: any) {
          console.error("Donatur Login Error:", error);
          const message = error?.message || error.response?.data?.message || "Terjadi kesalahan pada server.";
          return { success: false, error: message };
        }
      },

      registerDonaturApi: async (name, email, password, password_confirmation, no_whatsapp) => {
        try {
          const { registerDonatur } = await import("@/app/lib/api/services/auth");
          const data = await registerDonatur({ name, email, password, password_confirmation, no_whatsapp,  });

          // Auto-login after registration if token is returned
          const token = data?.token;
          if (token) {
            const userObj = data?.data?.user;
            await get().setAuth(token, {
              email,
              role: "donatur",
              name: userObj?.name || name,
            });
          }

          return { success: true };
        } catch (error: any) {
          console.error("Register Error:", error);
          const message = error?.message || error.response?.data?.message || "Terjadi kesalahan pada server.";
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
          const { fetchProfile } = await import("@/app/lib/api/services/auth");
          const data = await fetchProfile();
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                name: data.name || currentUser.name,
                email: data.email || currentUser.email,
                phone: data.phone || currentUser.phone,
                address: data.address || currentUser.address,
                image: data.photo || data.image || currentUser.image,
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
          const data = await updateProfile(payload);
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                name: data.name || currentUser.name,
                phone: data.phone || currentUser.phone,
                address: data.address || currentUser.address,
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
