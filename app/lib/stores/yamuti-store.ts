import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAnakAsuh } from "@/app/lib/api/services/anak-asuh";
import { createDonasi } from "@/app/lib/api/services/donasi";
import { approveKunjungan, createKunjungan } from "@/app/lib/api/services/kunjungan";
import { fetchPrograms } from "@/app/lib/api/services/programs";
import { apiClient } from "@/app/lib/api/client";
import type {
  ApprovalRequest,
  DonaturSummary,
  FinanceTransaction,
  InventoryItem,
  Orphan,
  OrphanGender,
  OrphanStatus,
  OwnerAdmin,
  PendingDonation,
  Program,
  VisitBooking,
} from "@/app/lib/types/entities";
import {
  calcProgress,
  formatRupiah,
  generateId,
  generateNumericId,
  programToListItem,
} from "@/app/lib/utils/crud-helpers";

interface YamutiStore {
  programs: Program[];
  pendingDonations: PendingDonation[];
  donatur: DonaturSummary[];
  orphans: Orphan[];
  inventory: InventoryItem[];
  transactions: FinanceTransaction[];
  bookings: VisitBooking[];
  admins: OwnerAdmin[];
  approvalRequests: ApprovalRequest[];

  fetchPrograms: () => Promise<void>;
  fetchOrphans: () => Promise<void>;

  getProgramById: (id: string) => Program | undefined;
  addProgram: (data: Omit<Program, "id" | "target" | "collected" | "progress">) => string;
  updateProgram: (id: string, data: Partial<Program>) => void;
  deleteProgram: (id: string) => void;

  verifyDonation: (id: string) => void;
  rejectDonation: (id: string) => void;
  addPendingDonation: (donation: Omit<PendingDonation, "id">) => Promise<void>;

  getOrphanById: (id: number) => Orphan | undefined;
  addOrphan: (data: Omit<Orphan, "id">) => Promise<number>;
  updateOrphan: (id: number, data: Partial<Orphan>) => void;
  deleteOrphan: (id: number) => void;

  getInventoryById: (id: number) => InventoryItem | undefined;
  addInventory: (data: Omit<InventoryItem, "id">) => Promise<number>;
  updateInventory: (id: number, data: Partial<InventoryItem>) => void;
  deleteInventory: (id: number) => void;

  addTransaction: (data: Omit<FinanceTransaction, "id" | "amount">) => number;
  deleteTransaction: (id: number) => void;

  getBookingById: (id: number) => VisitBooking | undefined;
  addBooking: (data: Omit<VisitBooking, "id">) => Promise<number>;
  updateBooking: (id: number, data: Partial<VisitBooking>) => void;
  deleteBooking: (id: number) => void;

  getAdminById: (id: string) => OwnerAdmin | undefined;
  addAdmin: (data: Omit<OwnerAdmin, "id">) => string;
  updateAdmin: (id: string, data: Partial<OwnerAdmin>) => void;
  deleteAdmin: (id: string) => void;

  approveRequest: (id: string) => Promise<void>;
  rejectRequest: (id: string) => void;
}

function buildProgram(
  data: Omit<Program, "id" | "target" | "collected" | "progress"> & { id?: string }
): Program {
  const list = programToListItem({
    title: data.title,
    targetAmount: data.targetAmount,
    collectedAmount: data.collectedAmount,
  });
  return {
    ...data,
    id: data.id ?? generateId("prog-"),
    ...list,
  };
}

export const useYamutiStore = create<YamutiStore>()(
  persist(
    (set, get) => ({
      programs: [],
      pendingDonations: [],
      donatur: [],
      orphans: [],
      inventory: [],
      transactions: [],
      bookings: [],
      admins: [],
      approvalRequests: [],

      /** GET /programs — route belum tersedia, mengembalikan array kosong */
      fetchPrograms: async () => {
        try {
          const programs = await fetchPrograms();
          if (programs.length > 0) {
            set({ programs });
          }
        } catch (error) {
          console.error("Gagal mengambil data program dari API:", error);
        }
      },

      /** GET /anak-asuh */
      fetchOrphans: async () => {
        try {
          const orphans = await fetchAnakAsuh();
          set({ orphans });
        } catch (error) {
          console.error("Gagal mengambil data anak asuh dari API:", error);
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
            const merged = { ...p, ...data };
            return buildProgram(merged);
          }),
        }));
      },

      deleteProgram: (id) => {
        set((s) => ({ programs: s.programs.filter((p) => p.id !== id) }));
      },

      verifyDonation: (id) => {
        set((s) => ({
          pendingDonations: s.pendingDonations.filter((d) => d.id !== id),
        }));
      },

      rejectDonation: (id) => {
        set((s) => ({
          pendingDonations: s.pendingDonations.filter((d) => d.id !== id),
        }));
      },

      /** POST /donasi */
      addPendingDonation: async (donation) => {
        const cleanAmount = parseInt(donation.jumlah.replace(/[^0-9]/g, "")) || 0;
        try {
          await createDonasi({
            nama_donatur: donation.nama,
            no_whatsapp: "081234567890",
            gross_amount: cleanAmount,
            payment_type: donation.tipe.toLowerCase(),
          });
        } catch (error) {
          console.error("Gagal menambah donasi via API:", error);
        }

        set((s) => ({
          pendingDonations: [
            { ...donation, id: generateId("don-") },
            ...s.pendingDonations,
          ],
        }));
      },

      getOrphanById: (id) => get().orphans.find((o) => o.id === id),

      /** POST /anak-asuh */
      addOrphan: async (data) => {
        const id = generateNumericId(get().orphans);

        try {
          await apiClient.post("/anak-asuh", {
            nama: data.name,
            tanggal_lahir: "2015-01-01",
            status: data.status,
            kategori_bayi: data.age <= 2,
          });
          set((s) => ({ orphans: [{ ...data, id }, ...s.orphans] }));
        } catch (error) {
          console.error("Gagal menambah anak asuh via API:", error);
          set((s) => ({ orphans: [{ ...data, id }, ...s.orphans] }));
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

      getInventoryById: (id) => get().inventory.find((i) => i.id === id),

      /** POST /mutasi-barang */
      addInventory: async (data) => {
        const id = generateNumericId(get().inventory);

        try {
          await apiClient.post("/mutasi-barang", {
            inventaris_id: id.toString(),
            tipe: "masuk",
            jumlah: parseInt(data.stock) || 1,
            keterangan: "Penambahan inventory",
          });
          set((s) => ({ inventory: [...s.inventory, { ...data, id }] }));
        } catch (error) {
          console.error("Gagal menambah inventory via API:", error);
          set((s) => ({ inventory: [...s.inventory, { ...data, id }] }));
        }

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

      addTransaction: (data) => {
        const id = generateNumericId(get().transactions);
        const item: FinanceTransaction = {
          ...data,
          id,
          amount: formatRupiah(data.amountRaw),
        };
        set((s) => ({ transactions: [item, ...s.transactions] }));
        return id;
      },

      deleteTransaction: (id) => {
        set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
      },

      getBookingById: (id) => get().bookings.find((b) => b.id === id),

      /** POST /kunjungan */
      addBooking: async (data) => {
        const id = generateNumericId(get().bookings);

        try {
          await createKunjungan({
            nama_pengunjung: data.visitor,
            nomor_telepon: "08123456789",
            tujuan_kunjungan: data.type,
            slot_waktu: new Date(data.date).toISOString(),
          });
          set((s) => ({ bookings: [...s.bookings, { ...data, id }] }));
        } catch (error) {
          console.error("Gagal menambah kunjungan via API:", error);
          set((s) => ({ bookings: [...s.bookings, { ...data, id }] }));
        }

        return id;
      },

      updateBooking: (id, data) => {
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...data } : b)),
        }));
      },

      deleteBooking: (id) => {
        set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) }));
      },

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

      /** POST /kunjungan/{id}/approve */
      approveRequest: async (id) => {
        try {
          await approveKunjungan(id);
        } catch (error) {
          console.error("Gagal approve kunjungan via API:", error);
        }
        set((s) => ({
          approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
        }));
      },

      rejectRequest: (id) => {
        set((s) => ({
          approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
        }));
      },
    }),
    { name: "yamuti-crud" }
  )
);

export type ProgramFormInput = {
  title: string;
  category: string;
  location: string;
  description: string;
  targetAmount: number;
  deadline: string;
};

export function programFormToEntity(
  data: ProgramFormInput,
  extras?: Partial<Program>
): Omit<Program, "id" | "target" | "collected" | "progress"> {
  return {
    title: data.title,
    category: data.category,
    location: data.location,
    description: data.description,
    targetAmount: data.targetAmount,
    collectedAmount: extras?.collectedAmount ?? 0,
    deadline: data.deadline,
    image: extras?.image,
  };
}

export type OrphanFormInput = {
  name: string;
  age: number;
  gender: OrphanGender;
  status: OrphanStatus;
  notes?: string;
};
