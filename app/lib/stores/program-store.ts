import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPrograms } from "@/app/lib/api/services/programs";
import type { Program } from "@/app/lib/types/entities";
import { generateId, programToListItem } from "@/app/lib/utils/crud-helpers";

interface ProgramStore {
  programs: Program[];
  isLoading: boolean;
  error: string | null;

  fetchPrograms: () => Promise<void>;
  getProgramById: (id: string) => Program | undefined;
  addProgram: (data: Omit<Program, "id" | "target" | "collected" | "progress">) => string;
  updateProgram: (id: string, data: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
}

function buildProgram(
  data: Omit<Program, "id" | "target" | "collected" | "progress"> & { id?: string }
): Program {
  const list = programToListItem({
    title: data.title,
    targetAmount: data.targetAmount,
    collectedAmount: data.collectedAmount,
  });
  return { ...data, id: data.id ?? generateId("prog-"), ...list };
}

export const useProgramStore = create<ProgramStore>()(
  persist(
    (set, get) => ({
      programs: [],
      isLoading: false,
      error: null,

      fetchPrograms: async () => {
        set({ isLoading: true, error: null });
        try {
          const programs = await fetchPrograms();
          if (programs.length > 0) set({ programs });
        } catch (error: any) {
          console.error("Gagal mengambil data program dari API:", error);
          set({ error: error?.response?.data?.message || error?.message || "Gagal mengambil data program" });
        } finally {
          set({ isLoading: false });
        }
      },

      getProgramById: (id) => get().programs.find((p) => p.id === id),

      addProgram: (data) => {
        const program = buildProgram({ ...data, collectedAmount: 0 });
        set((s) => ({ programs: [...s.programs, program] }));
        return program.id;
      },

      updateProgram: (id, data) => {
        set((s) => ({
          programs: s.programs.map((p) => {
            if (p.id !== id) return p;
            return buildProgram({ ...p, ...data });
          }),
        }));
      },

      deleteProgram: (id) => {
        set((s) => ({ programs: s.programs.filter((p) => p.id !== id) }));
      },
    }),
    { name: "yamuti-programs" }
  )
);
