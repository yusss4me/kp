import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAnakAsuh, createAnakAsuh } from "@/app/lib/api/services/anak-asuh";
import { createDonasi } from "@/app/lib/api/services/donasi";
import { approveKunjungan, createKunjungan } from "@/app/lib/api/services/kunjungan";
import { fetchPrograms } from "@/app/lib/api/services/programs";
import { catatMutasiBarang } from "@/app/lib/api/services/logistik";
import type {
  ApprovalRequest,
  DonaturSummary,
  FinanceTransaction,
  FundDistribution,
  InventoryItem,
  Orphan,
  OrphanGender,
  OrphanStatus,
  OwnerAdmin,
  PendingDonation,
  Program,
  VisitBooking,
  FoundationProfile,
  News,
} from "@/app/lib/types/entities";
import {
  calcProgress,
  formatRupiah,
  generateId,
  generateNumericId,
  programToListItem,
} from "@/app/lib/utils/crud-helpers";
import { getErrorMessage } from "./store-utils";
import { useNotificationStore } from "./notification-store";

interface YamutiStore {
  programs: Program[];
  pendingDonations: PendingDonation[];
  donatur: DonaturSummary[];
  orphans: Orphan[];
  inventory: InventoryItem[];
  transactions: FinanceTransaction[];
  distributions: FundDistribution[];
  bookings: VisitBooking[];
  admins: OwnerAdmin[];
  approvalRequests: ApprovalRequest[];
  foundationProfile: FoundationProfile | null;
  news: News[];
  isLoading: boolean;
  error: string | null;

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
  getDistributions: () => FundDistribution[];

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

  updateFoundationProfile: (data: FoundationProfile) => void;
  
  getNewsById: (id: string) => News | undefined;
  addNews: (data: Omit<News, "id">) => string;
  updateNews: (id: string, data: Partial<News>) => void;
  deleteNews: (id: string) => void;
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
      distributions: [],
      bookings: [],
      admins: [],
      approvalRequests: [],
      foundationProfile: null,
      news: [],
      isLoading: false,
      error: null,

      /** GET /programs — route belum tersedia, mengembalikan array kosong */
      fetchPrograms: async () => {
        set({ isLoading: true, error: null });
        try {
          const programs = await fetchPrograms();
          if (programs.length > 0) {
            set({ programs });
          }
        } catch (error: any) {
          console.error("Gagal mengambil data program dari API:", error);
          set({ error: getErrorMessage(error, "Gagal mengambil data program") });
        } finally {
          set({ isLoading: false });
        }
      },

      /** GET /anak-asuh */
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

      getProgramById: (id) => get().programs.find((p) => p.id === id),

      addProgram: (data) => {
        const program = buildProgram({ ...data, collectedAmount: 0 });
        set((s) => ({ programs: [...s.programs, program] }));
        useNotificationStore.getState().addNotification({
          title: "Program Baru Ditambahkan",
          message: `Program "${data.title}" berhasil ditambahkan.`,
          type: "program",
          link: `/admin/explore`,
        });
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

      /** POST /donasi — optimistic with rollback */
      addPendingDonation: async (donation) => {
        const cleanAmount = parseInt(donation.jumlah.replace(/[^0-9]/g, "")) || 0;
        const newDonation = { ...donation, id: generateId("don-") };

        // Optimistic update
        const prev = get().pendingDonations;
        set((s) => ({ pendingDonations: [newDonation, ...s.pendingDonations] }));

        try {
          const donasiPayload: Parameters<typeof createDonasi>[0] = {
            nama_donatur: donation.nama,
            no_whatsapp: "081234567890",
            payment_type: donation.tipe.toLowerCase(),
          };
          // Pass gross_amount for money donations
          if (donation.tipe.toLowerCase() !== "barang") {
            donasiPayload.gross_amount = cleanAmount;
          }
          // Pass nama_barang for goods donations
          if (donation.nama_barang) {
            donasiPayload.nama_barang = donation.nama_barang;
          }
          // Pass kampanye_id if donating to a specific campaign
          if (donation.kampanye_id) {
            donasiPayload.kampanye_id = donation.kampanye_id;
          }
          await createDonasi(donasiPayload);
          useNotificationStore.getState().addNotification({
            title: "Donasi Baru Diterima",
            message: `Donasi dari ${donation.nama} sebesar Rp ${cleanAmount.toLocaleString("id-ID")} berhasil dicatat.`,
            type: "donation",
          });
        } catch (error: any) {
          console.error("Gagal menambah donasi via API:", error);
          // Rollback on failure
          set({ error: getErrorMessage(error, "Gagal menambah donasi"), pendingDonations: prev });
        }
      },

      getOrphanById: (id) => get().orphans.find((o) => o.id === id),

      /** POST /anak-asuh — optimistic with rollback */
      addOrphan: async (data) => {
        const id = generateNumericId(get().orphans);
        const tanggal_lahir = data.birthDate
          ? new Date(data.birthDate).toISOString().split("T")[0]
          : data.birthDate;

        // Optimistic update
        const prev = get().orphans;
        set((s) => ({ orphans: [{ ...data, id }, ...s.orphans] }));

        try {
          await createAnakAsuh({
            nama_lengkap: data.name,
            tempat_lahir: "Tasikmalaya",
            tanggal_lahir,
            jenis_kelamin: "L",
            status_yatim_piatu: "Yatim Piatu",
            tanggal_masuk: new Date().toISOString().split("T")[0],
          });
        } catch (error: any) {
          console.error("Gagal menambah anak asuh via API:", error);
          // Rollback on failure
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

      getInventoryById: (id) => get().inventory.find((i) => i.id === id),

      /** POST /mutasi-barang — currently local-only; backend GET /inventaris not yet available */
      addInventory: async (data) => {
        const id = generateNumericId(get().inventory);

        // NOTE: POST /mutasi-barang requires an existing inventaris_id from the backend.
        // Since there is no POST /inventaris endpoint yet, we store locally only.
        // Once the backend supports inventory creation, re-enable the API call below.
        /*
        try {
          await catatMutasiBarang({
            inventaris_id: id.toString(),
            tipe: "masuk",
            jumlah: parseInt(data.stock) || 1,
            keterangan: `Penambahan barang: ${data.name}`,
          });
          set((s) => ({ inventory: [...s.inventory, { ...data, id }] }));
        } catch (error: any) {
          console.error("Gagal menambah inventory via API:", error);
          set({ error: getErrorMessage(error, "Gagal menambah inventory") });
          set((s) => ({ inventory: [...s.inventory, { ...data, id }] }));
        }
        */

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

      addTransaction: (data) => {
        const id = generateNumericId(get().transactions);
        const item: FinanceTransaction = {
          ...data,
          id,
          amount: formatRupiah(data.amountRaw),
        };
        const newTransactions = [item, ...get().transactions];

        // Auto-distribute 10/90 for income transactions
        if (data.type === "Income") {
          const branchAmount = Math.round(data.amountRaw * 0.1);
          const centralAmount = data.amountRaw - branchAmount;
          const distId = generateNumericId(get().distributions);
          const distribution: FundDistribution = {
            id: distId,
            transactionId: id,
            totalAmount: data.amountRaw,
            branchAmount,
            centralAmount,
            date: data.date,
            status: "Tercatat",
          };
          set((s) => ({
            transactions: newTransactions,
            distributions: [distribution, ...s.distributions],
          }));
        } else {
          set((s) => ({ transactions: newTransactions }));
        }

        return id;
      },

      deleteTransaction: (id) => {
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
          distributions: s.distributions.filter((d) => d.transactionId !== id),
        }));
      },

      getDistributions: () => get().distributions,

      getBookingById: (id) => get().bookings.find((b) => b.id === id),

      /** POST /kunjungan — optimistic with rollback */
      addBooking: async (data) => {
        const id = generateNumericId(get().bookings);

        // Safe date construction to avoid RangeError from invalid ISO strings
        let slot_waktu: string;
        try {
          const dateStr = data.date ? `${data.date}T${data.time || "08:00"}:00` : new Date().toISOString();
          const parsed = new Date(dateStr);
          if (isNaN(parsed.getTime())) throw new Error("Invalid date");
          slot_waktu = parsed.toISOString();
        } catch {
          slot_waktu = new Date().toISOString();
        }

        // Optimistic update
        const prev = get().bookings;
        set((s) => ({ bookings: [...prev, { ...data, id }] }));

        try {
          await createKunjungan({
            nama_tamu: data.visitor,
            no_whatsapp: data.phone || "",
            jumlah_pengunjung: 1,
            maksud: data.type,
            slot_waktu,
          });
          useNotificationStore.getState().addNotification({
            title: "Kunjungan Baru Diajukan",
            message: `${data.visitor} mengajukan kunjungan pada ${data.date}.`,
            type: "kunjungan",
            link: `/admin/kunjungan`,
          });
        } catch (error: any) {
          console.error("Gagal menambah kunjungan via API:", error);
          // Rollback on failure
          set({ error: getErrorMessage(error, "Gagal menambah kunjungan"), bookings: prev });
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

      /** POST /kunjungan/{id}/approve — optimistic with rollback */
      approveRequest: async (id) => {
        const prev = get().approvalRequests;
        set({ approvalRequests: prev.filter((r) => r.id !== id) });

        try {
          await approveKunjungan(id);
          useNotificationStore.getState().addNotification({
            title: "Kunjungan Disetujui",
            message: `Permintaan kunjungan #${id} telah disetujui.`,
            type: "kunjungan",
          });
        } catch (error: any) {
          console.error("Gagal approve kunjungan via API:", error);
          // Rollback on failure
          set({ error: getErrorMessage(error, "Gagal menyetujui kunjungan"), approvalRequests: prev });
        }
      },

      rejectRequest: (id) => {
        set((s) => ({
          approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
        }));
      },

      updateFoundationProfile: (data) => {
        set({ foundationProfile: data });
      },

      getNewsById: (id) => get().news.find((n) => n.id === id),

      addNews: (data) => {
        const id = generateId("news-");
        set((s) => ({ news: [{ ...data, id }, ...s.news] }));
        useNotificationStore.getState().addNotification({
          title: "Berita Baru Dipublikasikan",
          message: `Berita "${data.title}" berhasil dipublikasikan.`,
          type: "broadcast",
          link: `/admin/cms/berita`,
        });
        return id;
      },

      updateNews: (id, data) => {
        set((s) => ({
          news: s.news.map((n) => (n.id === id ? { ...n, ...data } : n)),
        }));
      },

      deleteNews: (id) => {
        set((s) => ({ news: s.news.filter((n) => n.id !== id) }));
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
  birthDate: string;
  kategori_bayi: boolean;
  status: OrphanStatus;
  notes?: string;
};
