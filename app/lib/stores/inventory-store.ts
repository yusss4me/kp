import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InventoryItem } from "@/app/lib/types/entities";
import { generateNumericId } from "@/app/lib/utils/crud-helpers";

interface InventoryStore {
  inventory: InventoryItem[];
  error: string | null;

  getInventoryById: (id: number) => InventoryItem | undefined;
  addInventory: (data: Omit<InventoryItem, "id">) => number;
  updateInventory: (id: number, data: Partial<InventoryItem>) => void;
  deleteInventory: (id: number) => void;
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      inventory: [],
      error: null,

      getInventoryById: (id) => get().inventory.find((i) => i.id === id),

      addInventory: (data) => {
        const id = generateNumericId(get().inventory);
        set((s) => ({ inventory: [...s.inventory, { ...data, id }] }));
        return id;
      },

      updateInventory: (id, data) => {
        set((s) => ({
          inventory: s.inventory.map((i) => (i.id === id ? { ...i, ...data } : i)),
        }));
      },

      deleteInventory: (id) => {
        set((s) => ({ inventory: s.inventory.filter((i) => i.id !== id) }));
      },
    }),
    { name: "yamuti-inventory" }
  )
);
