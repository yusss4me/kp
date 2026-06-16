import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OwnerAdmin, DonaturSummary } from "@/app/lib/types/entities";
import { generateId } from "@/app/lib/utils/crud-helpers";

interface AdminStore {
  admins: OwnerAdmin[];
  donatur: DonaturSummary[];
  error: string | null;

  getAdminById: (id: string) => OwnerAdmin | undefined;
  addAdmin: (data: Omit<OwnerAdmin, "id">) => string;
  updateAdmin: (id: string, data: Partial<OwnerAdmin>) => void;
  deleteAdmin: (id: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      admins: [],
      donatur: [],
      error: null,

      getAdminById: (id) => get().admins.find((a) => a.id === id),

      addAdmin: (data) => {
        const id = generateId("admin-");
        set((s) => ({ admins: [...s.admins, { ...data, id }] }));
        return id;
      },

      updateAdmin: (id, data) => {
        set((s) => ({
          admins: s.admins.map((a) => (a.id === id ? { ...a, ...data } : a)),
        }));
      },

      deleteAdmin: (id) => {
        set((s) => ({ admins: s.admins.filter((a) => a.id !== id) }));
      },
    }),
    { name: "yamuti-admins" }
  )
);
