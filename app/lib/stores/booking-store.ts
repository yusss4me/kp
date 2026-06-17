import { create } from "zustand";
import { persist } from "zustand/middleware";
import { approveKunjungan, createKunjungan } from "@/app/lib/api/services/kunjungan";
import type { VisitBooking, ApprovalRequest } from "@/app/lib/types/entities";
import { generateNumericId } from "@/app/lib/utils/crud-helpers";

/** Helper: extract user-friendly error message */
function getErrorMessage(error: any, fallback: string): string {
  const status = error?.response?.status;
  if (status === 401 || status === 403) return "Sesi login Anda telah berakhir. Silakan login kembali.";
  return error?.response?.data?.message || error?.message || fallback;
}

interface BookingStore {
  bookings: VisitBooking[];
  approvalRequests: ApprovalRequest[];
  error: string | null;

  getBookingById: (id: number) => VisitBooking | undefined;
  addBooking: (data: Omit<VisitBooking, "id">) => Promise<number>;
  updateBooking: (id: number, data: Partial<VisitBooking>) => void;
  deleteBooking: (id: number) => void;

  approveRequest: (id: string) => Promise<void>;
  rejectRequest: (id: string) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      approvalRequests: [],
      error: null,

      getBookingById: (id) => get().bookings.find((b) => b.id === id),

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

        // Optimistic update with rollback
        const prev = get().bookings;
        set({ bookings: [...prev, { ...data, id }] });

        try {
          await createKunjungan({
            nama_pengunjung: data.visitor,
            nomor_telepon: data.phone || "",
            tujuan_kunjungan: data.type,
            slot_waktu,
          });
        } catch (error: any) {
          console.error("Gagal menambah kunjungan via API:", error);
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

      approveRequest: async (id) => {
        const prev = get().approvalRequests;
        set({ approvalRequests: prev.filter((r) => r.id !== id) });

        try {
          await approveKunjungan(id);
        } catch (error: any) {
          console.error("Gagal approve kunjungan via API:", error);
          set({ error: getErrorMessage(error, "Gagal menyetujui kunjungan"), approvalRequests: prev });
        }
      },

      rejectRequest: (id) => {
        set((s) => ({
          approvalRequests: s.approvalRequests.filter((r) => r.id !== id),
        }));
      },
    }),
    { name: "yamuti-bookings" }
  )
);
