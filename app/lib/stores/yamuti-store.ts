import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/app/lib/api/client";
import {
  MOCK_ADMIN_PROGRAMS,
  MOCK_ADMIN_DONATIONS,
  MOCK_ADMIN_DONATUR,
  MOCK_ADMIN_ORPHANS,
  MOCK_OWNER_APPROVAL_REQUESTS,
} from "@/app/constants/mockData";
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

const SEED_PROGRAMS: Program[] = MOCK_ADMIN_PROGRAMS.map((p, i) => ({
  id: p.id,
  title: p.title,
  category: i === 0 ? "Bencana" : i === 1 ? "Pendidikan" : "Sosial",
  location: "Tasikmalaya, Jawa Barat",
  description: `Deskripsi program ${p.title}`,
  targetAmount: [500_000_000, 150_000_000, 200_000_000][i] ?? 100_000_000,
  collectedAmount: [325_000_000, 142_500_000, 75_000_000][i] ?? 0,
  deadline: "2026-12-31",
  image:
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  ...programToListItem({
    title: p.title,
    targetAmount: [500_000_000, 150_000_000, 200_000_000][i] ?? 100_000_000,
    collectedAmount: [325_000_000, 142_500_000, 75_000_000][i] ?? 0,
  }),
}));

const SEED_INVENTORY: InventoryItem[] = [
  { id: 1, name: "Beras Medium", category: "Logistik Pangan", stock: "250 Kg", status: "Cukup" },
  { id: 2, name: "Minyak Goreng", category: "Logistik Pangan", stock: "12 Liter", status: "Menipis" },
  { id: 3, name: "Seragam Sekolah SMA", category: "Pakaian", stock: "15 Stel", status: "Cukup" },
  { id: 4, name: "Buku Tulis A5", category: "Alat Tulis", stock: "5 Pack", status: "Menipis" },
];

const SEED_BOOKINGS: VisitBooking[] = [
  { id: 1, visitor: "Bpk. Ahmad Fauzi", date: "28 Apr 2026", time: "10:00", type: "Personal", status: "Dikonfirmasi" },
  { id: 2, visitor: "Komunitas Berbagi", date: "30 Apr 2026", time: "14:00", type: "Grup", status: "Menunggu" },
  { id: 3, visitor: "Ibu Ratnasari", date: "02 Mei 2026", time: "09:00", type: "Personal", status: "Dikonfirmasi" },
];

const SEED_TRANSACTIONS: FinanceTransaction[] = [
  { id: 1, type: "Income", category: "Donasi Umum", amount: "Rp 2.500.000", amountRaw: 2_500_000, date: "25 Apr 2026", status: "Selesai" },
  { id: 2, type: "Expense", category: "Listrik & Air", amount: "Rp 850.000", amountRaw: 850_000, date: "24 Apr 2026", status: "Selesai" },
  { id: 3, type: "Income", category: "Donasi Pendidikan", amount: "Rp 5.000.000", amountRaw: 5_000_000, date: "22 Apr 2026", status: "Selesai" },
];

const SEED_ADMINS: OwnerAdmin[] = [
  { id: "1", name: "Ahmad Budi", role: "Admin Keuangan", email: "ahmad@yamuti.org", status: "Aktif" },
  { id: "2", name: "Siti Rahayu", role: "Admin Program", email: "siti@yamuti.org", status: "Aktif" },
];

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
      programs: SEED_PROGRAMS,
      pendingDonations: [...MOCK_ADMIN_DONATIONS],
      donatur: [...MOCK_ADMIN_DONATUR],
      orphans: [...MOCK_ADMIN_ORPHANS],
      inventory: SEED_INVENTORY,
      transactions: SEED_TRANSACTIONS,
      bookings: SEED_BOOKINGS,
      admins: SEED_ADMINS,
      approvalRequests: MOCK_OWNER_APPROVAL_REQUESTS.map((r, i) => ({
        id: `req-${i + 1}`,
        ...r,
      })),

      fetchOrphans: async () => {
        try {
          const res = await apiClient.get("/anak-asuh");
          if (res.data && Array.isArray(res.data.data)) {
            // Mapping dari API ke format entitas lokal
            const apiOrphans = res.data.data.map((item: import('@/app/lib/types/api-types').ApiOrphanResponse) => {
              const birthYear = item.birth_date ? new Date(item.birth_date).getFullYear() : new Date().getFullYear() - 10;
              const currentYear = new Date().getFullYear();
              
              return {
                id: item.id,
                name: item.name || (item as any).nama,
                age: currentYear - birthYear,
                gender: item.gender || "Laki-laki", 
                status: item.status,
                notes: item.address || "Di-fetch dari backend"
              };
            });
            if (apiOrphans.length > 0) {
              set({ orphans: apiOrphans });
            } else {
              set({ orphans: [...MOCK_ADMIN_ORPHANS] });
            }
          }
        } catch (error) {
          console.error("Gagal mengambil data anak asuh dari API, menggunakan data mock", error);
          set({ orphans: [...MOCK_ADMIN_ORPHANS] });
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

      addPendingDonation: async (donation) => {
        try {
          // Note: parse string "Rp 150.000" to number for gross_amount
          const cleanAmount = parseInt(donation.jumlah.replace(/[^0-9]/g, "")) || 0;
          await apiClient.post("/donasi", {
            nama_donatur: donation.nama,
            no_whatsapp: "081234567890", // Mock if not in UI
            gross_amount: cleanAmount,
            payment_type: donation.tipe.toLowerCase()
          });
          
          set((s) => ({
            pendingDonations: [
              { ...donation, id: generateId("don-") },
              ...s.pendingDonations,
            ],
          }));
        } catch (error) {
          console.error("Gagal menambah donasi via API:", error);
          set((s) => ({
            pendingDonations: [
              { ...donation, id: generateId("don-") },
              ...s.pendingDonations,
            ],
          }));
        }
      },

      getOrphanById: (id) => get().orphans.find((o) => o.id === id),

      addOrphan: async (data) => {
        const id = generateNumericId(get().orphans);
        
        try {
          await apiClient.post("/anak-asuh", {
            nama: data.name,
            tanggal_lahir: "2015-01-01", // Placeholder
            status: data.status,
            kategori_bayi: data.age <= 2
          });
          // Jika sukses, tambahkan ke state lokal
          set((s) => ({ orphans: [{ ...data, id }, ...s.orphans] }));
        } catch (error) {
          console.error("Gagal menambah anak asuh via API, menyimpan ke lokal (fallback):", error);
          // Fallback lokal
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

      addInventory: async (data) => {
        const id = generateNumericId(get().inventory);
        
        try {
          await apiClient.post("/mutasi-barang", {
            inventaris_id: id.toString(),
            tipe: "masuk", // Assuming adding inventory is always "masuk" based on swagger enum [masuk, keluar]
            jumlah: parseInt(data.stock) || 1,
            keterangan: "Penambahan inventory"
          });
          set((s) => ({ inventory: [...s.inventory, { ...data, id }] }));
        } catch (error) {
          console.error("Gagal menambah inventory:", error);
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

      addBooking: async (data) => {
        const id = generateNumericId(get().bookings);
        
        try {
          await apiClient.post("/kunjungan", {
            nama_pengunjung: data.visitor,
            nomor_telepon: "08123456789", // Mock
            tujuan_kunjungan: data.type,
            slot_waktu: new Date(data.date).toISOString() // Mock format
          });
          set((s) => ({ bookings: [...s.bookings, { ...data, id }] }));
        } catch (error) {
          console.error("Gagal menambah kunjungan:", error);
          // Fallback lokal
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

      approveRequest: async (id) => {
        try {
          await apiClient.post(`/kunjungan/${id}/approve`);
          set((s) => ({
            approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
          }));
        } catch (error) {
          console.error("Gagal approve kunjungan:", error);
          // Fallback lokal jika error
          set((s) => ({
            approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
          }));
        }
      },

      rejectRequest: (id) => {
        set((s) => ({
          approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
        }));
      },
    }),
    { name: "yamuti-mock-crud" }
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
