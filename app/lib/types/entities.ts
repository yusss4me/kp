export type OrphanStatus = "Baru" | "Aktif" | "Alumni";
export type OrphanGender = "Laki-laki" | "Perempuan";

export interface Orphan {
  id: number;
  name: string;
  age: number;
  gender: OrphanGender;
  status: OrphanStatus;
  notes?: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  targetAmount: number;
  collectedAmount: number;
  deadline: string;
  image?: string;
  target: string;
  collected: string;
  progress: number;
}

export interface PendingDonation {
  id: string;
  nama: string;
  description: string;
  tipe: string;
  jumlah: string;
  tanggal: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: string;
  status: "Cukup" | "Menipis" | "Habis";
}

export interface FinanceTransaction {
  id: number;
  type: "Income" | "Expense";
  category: string;
  amount: string;
  amountRaw: number;
  date: string;
  status: string;
}

export interface VisitBooking {
  id: number;
  visitor: string;
  date: string;
  time: string;
  type: string;
  status: "Menunggu" | "Dikonfirmasi" | "Selesai" | "Dibatalkan";
}

export interface OwnerAdmin {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "Aktif" | "Nonaktif";
}

export interface ApprovalRequest {
  id: string;
  title: string;
  requester: string;
  date: string;
  amount: string;
}

export interface DonaturSummary {
  name: string;
  total: string;
  lastDonation: string;
  status: string;
}
