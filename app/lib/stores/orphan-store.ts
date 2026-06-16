import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAnakAsuh, createAnakAsuh } from "@/app/lib/api/services/anak-asuh";
import type { Orphan, OrphanStatus } from "@/app/lib/types/entities";
import { generateNumericId } from "@/app/lib/utils/crud-helpers";

/** Helper: check if error is an auth failure (401/403) */
function isAuthError(error: any): boolean {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

/** Helper: check if error is a validation failure (422) */
function isValidationError(error: any): boolean {
  return error?.response?.status === 422;
}

/** Helper: extract user-friendly error message */
function getErrorMessage(error: any, fallback: string): string {
  if (isAuthError(error)) return "Sesi login Anda telah berakhir. Silakan login kembali.";
  if (isValidationError(error)) {
    const validationErrors = error?.response?.data?.errors;
    if (validationErrors && typeof validationErrors === "object") {
      return `Validasi gagal: ${Object.values(validationErrors).flat().join(", ")}`;
    }
    return error?.response?.data?.message || "Data yang dikirim tidak valid.";
  }
  return error?.response?.data?.message || error?.message || fallback;
}

interface OrphanStore {
  orphans: Orphan[];
  isLoading: boolean;
  error: string | null;

  fetchOrphans: () => Promise<void>;
  getOrphanById: (id: number) => Orphan | undefined;
  addOrphan: (data: Omit<Orphan, "id">) => Promise<number>;
  updateOrphan: (id: number, data: Partial<Orphan>) => void;
  deleteOrphan: (id: number) => void;
}

export const useOrphanStore = create<OrphanStore>()(
  persist(
    (set, get) => ({
      orphans: [],
      isLoading: false,
      error: null,

      fetchOrphans: async () => {
        set({ isLoading: true, error: null });
        try {
          const orphans = await fetchAnakAsuh();
          set({ orphans });
        } catch (error: any) {
          console.error("Gagal mengambil data anak asuh dari API:", error);
          set({ error: getErrorMessage(error, "Gagal mengambil data anak asuh") });
        } finally {
          set({ isLoading: false });
        }
      },

      getOrphanById: (id) => get().orphans.find((o) => o.id === id),

      addOrphan: async (data) => {
        const id = generateNumericId(get().orphans);
        const tanggal_lahir = data.birthDate
          ? new Date(data.birthDate).toISOString().split("T")[0]
          : data.birthDate;

        // Optimistic update with rollback
        const prev = get().orphans;
        set({ orphans: [{ ...data, id }, ...prev] });

        try {
          await createAnakAsuh({
            nama: data.name,
            tanggal_lahir,
            status: data.status,
            kategori_bayi: data.kategori_bayi ?? false,
          });
        } catch (error: any) {
          console.error("Gagal menambah anak asuh via API:", error);
          set({ error: getErrorMessage(error, "Gagal menambah anak asuh"), orphans: prev });
        }

        return id;
      },

      updateOrphan: (id, data) => {
        set((s) => ({
          orphans: s.orphans.map((o) => (o.id === id ? { ...o, ...data } : o)),
        }));
      },

      deleteOrphan: (id) => {
        set((s) => ({ orphans: s.orphans.filter((o) => o.id !== id) }));
      },
    }),
    { name: "yamuti-orphans" }
  )
);
