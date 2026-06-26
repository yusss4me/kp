// Tipe data balasan API (Responses)

export interface ApiBaseResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export interface ApiUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  nik?: string;
  no_hp?: string;
  
}

export interface ApiLoginResponse {
  success?: boolean;
  message?: string;
  data?: {
    user: ApiUser;
    token: string;
  };
}

export interface ApiOrphanResponse {
  id: string;
  nama: string;
  tanggal_lahir: string;
  status: string;
  kategori_bayi: boolean;
  no_kk: string;
  no_akte: string;
  tempat_lahir: string;
  jenis_kelamin: "Laki-laki" | "Perempuan";
  tanggal_masuk: string;
  keterangan: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string | null;
  deleted_at: string | null;
}

export interface ApiKampanyeResponse {
  id: string | number;
  judul: string;
  deskripsi: string;
  target_donasi: number;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  thumbnail?: string;
  donasi_sum_gross_amount?: number;
  status?: string;
}

export interface ApiKunjunganResponse {
  id: string | number;
  nama_tamu: string;
  no_whatsapp: string;
  jumlah_pengunjung: number;
  maksud: string;
  slot_waktu: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
}

export interface ApiDashboardSummary {
  total_anak_asuh?: number;
  total_donasi_bulan_ini?: number;
  kunjungan_menunggu?: number;
  saldo_kas_terkini?: number;
}

// Tipe data Payload (Requests)

export interface ApiLoginPayload {
  email: string;
  password: string;
  role?: string;
}

export interface ApiRegisterPayload {
  name: string;
  email: string;
  password: string;
  no_hp: string;
  nik: string;
  role?: string;
}

export interface ApiMutasiBarangPayload {
  inventaris_id: string;
  tipe: "masuk" | "keluar" | "rusak";
  jumlah: number;
  keterangan: string;
}

export interface ApiKunjunganStatusPayload {
  status: "APPROVED" | "REJECTED" | "COMPLETED";
}

export interface ApiContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiGaleriPayload {
  judul: string;
  deskripsi: string;
  file: File | Blob;
}
