"use client";

import React, { useEffect, useState, createContext, useContext, useCallback, useRef } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/app/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  message: string;
  duration?: number; // ms, default 3500
}

interface ToastContextValue {
  show: (variant: ToastVariant, message: string, duration?: number) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook untuk memunculkan Toast dari komponen manapun.
 * Harus digunakan di dalam <ToastProvider>.
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * ToastProvider
 *
 * Bungkus layout atau halaman dengan komponen ini agar `useToast()`
 * dapat digunakan di semua komponen turunannya.
 *
 * @example
 * <ToastProvider>
 *   <YourPage />
 * </ToastProvider>
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counterRef = useRef(0);

  const show = useCallback((variant: ToastVariant, message: string, duration = 3500) => {
    const id = `toast-${Date.now()}-${counterRef.current++}`;
    setToasts((prev) => [...prev, { id, variant, message, duration }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {/* Toast Portal — ditampilkan di pojok kanan atas */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
        role="region"
        aria-label="Notifikasi"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Single Toast Item ────────────────────────────────────────────────────────

const ICONS: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const STYLES: Record<ToastVariant, string> = {
  success: "bg-white border-l-4 border-green-500 text-gray-800",
  error: "bg-white border-l-4 border-red-500 text-gray-800",
  info: "bg-white border-l-4 border-blue-500 text-gray-800",
};

const ICON_STYLES: Record<ToastVariant, string> = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-blue-500",
};

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  // Trigger slide-in animation after mount
  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300); // wait for slide-out animation
    }, toast.duration ?? 3500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [toast.id, toast.duration, onDismiss]);

  const Icon = ICONS[toast.variant];

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-2xl shadow-xl px-4 py-3 min-w-[260px] max-w-sm",
        "transition-all duration-300 ease-out",
        STYLES[toast.variant],
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0"
      )}
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", ICON_STYLES[toast.variant])} />
      <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
        aria-label="Tutup notifikasi"
      >
        <X size={14} />
      </button>
    </div>
  );
}
