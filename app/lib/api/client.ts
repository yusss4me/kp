import axios from "axios";
import { useAuthStore } from "@/app/lib/stores/auth-store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://yamuti-backend.onrender.com/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state so middleware will redirect on next navigation
      useAuthStore.getState().logout();
      console.warn("Unauthorized access — auth state cleared");
    }
    return Promise.reject(error);
  }
);
