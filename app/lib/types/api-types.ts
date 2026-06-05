// Tipe data balasan API
export interface ApiOrphanResponse {
  id: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  birth_date: string;
  birth_place: string;
  education_level: string;
  status: string;
  guardian_name: string;
  address: string;
  photo?: string;
  created_at: string;
  updated_at: string;
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
