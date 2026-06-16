import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createDonasi } from "@/app/lib/api/services/donasi";
import type { PendingDonation } from "@/app/lib/types/entities";
import { generateId } from "@/app/lib/utils/crud-helpers";

/** Helper: extract user-friendly error message */
function getErrorMessage(error: any, fallback: string): string {
  const status = error?.response?.status;
  if (status === 401 || status === 403) return "Sesi login Anda telah berakhir. Silakan login kembali.";
  return error?.response?.data?.message || error?.message || fallback;
}

interface DonationStore {
  pendingDonations: PendingDonation[];
  error: string | null;

  verifyDonation: (id: string) => void;
  rejectDonation: (id: string) => void;
  addPendingDonation: (donation: Omit<PendingDonation, "id">) => Promise<void>;
}

export const useDonationStore = create<DonationStore>()(
  persist(
    (set, get) => ({
      pendingDonations: [],
      error: null,

      verifyDonation: (id) => {
        set((s) => ({ pendingDonations: s.pendingDonations.filter((d) => d.id !== id) }));
      },

      rejectDonation: (id) => {
        set((s) => ({ pendingDonations: s.pendingDonations.filter((d) => d.id !== id) }));
      },

      addPendingDonation: async (donation) => {
        const cleanAmount = parseInt(donation.jumlah.replace(/[^0-9]/g, "")) || 0;
        const newDonation = { ...donation, id: generateId("don-") };

        // Optimistic update with rollback
        const prev = get().pendingDonations;
        set({ pendingDonations: [newDonation, ...prev] });

        try {
          await createDonasi({
            nama_donatur: donation.nama,
            no_whatsapp: "081234567890",
            gross_amount: cleanAmount,
            payment_type: donation.tipe.toLowerCase(),
          });
        } catch (error: any) {
          console.error("Gagal menambah donasi via API:", error);
          set({ error: getErrorMessage(error, "Gagal menambah donasi"), pendingDonations: prev });
        }
      },
    }),
    { name: "yamuti-donations" }
  )
);
