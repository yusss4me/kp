import axios from "axios";
import { useAuthStore } from "@/app/lib/stores/auth-store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://yamuti-backend.onrender.com/api";



export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor to attach JWT Bearer token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isLoggingOut = false;

// Response interceptor to handle token expiration/401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      const store = useAuthStore.getState();
      
      try {
        // Clear auth state (Zustand + cookies)
        await store.logout();
        console.warn('Unauthorized access — auth state cleared, redirecting to login');
      } catch (err) {
        console.error('Logout error during 401 handling:', err);
      } finally {
        // Redirect to the correct login page based on current route
        if (typeof window !== 'undefined') {
          const { pathname } = window.location;
          if (pathname.startsWith('/user')) {
            window.location.href = `/auth/donatur?redirect=${encodeURIComponent(pathname)}&reason=session_expired`;
          } else if (pathname.startsWith('/admin') || pathname.startsWith('/super_admin')) {
            window.location.href = `/auth?redirect=${encodeURIComponent(pathname)}&reason=session_expired`;
          } else {
             window.location.href = `/auth?reason=session_expired`;
          }
        }
        isLoggingOut = false;
      }
    }
    return Promise.reject(error);
  }
);
