// Tipe data balasan API
export interface ApiOrphanResponse {
  id: string | number;
  // Backend actual fields (api-collection)
  nama_lengkap?: string;
  nama?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: string;
  status_yatim_piatu?: string;
  tanggal_masuk?: string;
  status?: "Baru" | "Aktif" | "Alumni";
  kategori_bayi?: boolean;
  // Alternative/extended fields (if backend is updated)
  name?: string;
  gender?: string;
  birth_date?: string;
  birth_place?: string;
  education_level?: string;
  guardian_name?: string;
  address?: string;
  photo?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiLoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ProgramFormInput {
  title: string;
  description: string;
  target_amount: number;
  category: string;
  end_date: string;
  thumbnail_url?: string;
}

export interface ApiGaleriPayload {
  judul: string;
  deskripsi: string;
  file: File;
}

export interface ApiMutasiBarangPayload {
  inventaris_id: string;
  tipe: "masuk" | "keluar";
  jumlah: number;
  tanggal_mutasi?: string;
  keterangan?: string;
}

export interface ApiLoginPayload {
  email: string;
  password: string;
}

export interface ApiRegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  no_whatsapp: string;
  nik: string;
  alamat: string;
}

export interface ApiBroadcastPayload {
  pesan: string;
  target_penerima: "donatur" | "umum" | "semua";
}

export interface ApiTransaksiKeuanganPayload {
  jenis: "pemasukan" | "pengeluaran";
  kategori?: string;
  nominal: number;
  keterangan?: string;
  tanggal?: string;
}

export interface ApiKunjunganStatusPayload {
  status: "APPROVED" | "REJECTED" | "COMPLETED";
}

export interface ApiDashboardSummary {
  total_anak_asuh?: number;
  total_donasi_bulan_ini?: number;
  kunjungan_menunggu?: number;
  saldo_kas_terkini?: number;
}

export interface ApiKasSaldo {
  saldo: number;
  total_pemasukan?: number;
  total_pengeluaran?: number;
}
