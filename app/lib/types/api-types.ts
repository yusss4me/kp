// Tipe data balasan API
export interface ApiOrphanResponse {
  id: string | number;
  // Backend actual fields
  nama?: string;
  tanggal_lahir?: string;
  status: "Baru" | "Aktif" | "Alumni";
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
  keterangan: string;
}

export interface ApiLoginPayload {
  email: string;
  password: string;
}
