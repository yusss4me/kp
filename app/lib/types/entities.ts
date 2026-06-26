export type OrphanStatus = "Baru" | "Aktif" | "Alumni";
export type OrphanGender = "Laki-laki" | "Perempuan";

export interface Orphan {
  id: number;
  name: string;
  // age: number;
  birthDate: string;
  kategori_bayi: boolean;
  // gender: OrphanGender;
  status: OrphanStatus;
  nik?: string;
  // notes?: string;
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
  /** Optional: nama barang untuk donasi barang */
  nama_barang?: string;
  /** Optional: ID kampanye jika donasi ditujukan ke kampanye tertentu */
  kampanye_id?: string;
  /** Optional: nomor handphone donatur */
  no_hp?: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: string;
  status: "Cukup" | "Menipis" | "Habis";
}

export interface FinanceTransaction {
  id: number | string;
  type: "Income" | "Expense";
  category: string;
  amount: string;
  amountRaw: number;
  date: string;
  status: string;
}

export interface VisitBooking {
  id: number | string;
  visitor: string;
  phone: string;
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

export interface FoundationProfile {
  name: string;
  vision: string;
  mission: string;
  aboutUs: string;
  address: string;
  phone: string;
  email: string;
  logoUrl?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface GalleryPhoto {
  id: string;
  judul: string;
  deskripsi: string;
  file: File;
}

export interface FundDistribution {
  id: number;
  transactionId: number;
  totalAmount: number;
  branchAmount: number;
  centralAmount: number;
  date: string;
  status: "Tercatat" | "Terkirim";
}

export interface MutasiBarang {
  inventaris_id: string;
  tipe: "masuk" | "keluar";
  jumlah: number;
  keterangan: string;
}
