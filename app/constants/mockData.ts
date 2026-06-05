import {
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Inbox,
  AlertTriangle,
  Calendar,
  Users,
  Share2,
  Globe,
  MessageCircle,
  Heart,
  ShieldCheck,
  AlertCircle,
  FilePieChart,
  Settings,
  Shield,
} from "lucide-react";
import { CheckCircle2, LucideIcon } from "lucide-react";

// ——— Landing ———
export const LANDING_USER_AVATARS = [
  { id: "1", src: "https://i.pravatar.cc/150?u=1", alt: "User 1" },
  { id: "2", src: "https://i.pravatar.cc/150?u=2", alt: "User 2" },
  { id: "3", src: "https://i.pravatar.cc/150?u=3", alt: "User 3" },
  { id: "4", src: "https://i.pravatar.cc/150?u=4", alt: "User 4" },
];

export const LANDING_SLIDES = [
  { id: "1", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", alt: "Modern Tech Office" },
  { id: "2", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop", alt: "Corporate Collaboration" },
  { id: "3", src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop", alt: "Premium Architecture" },
];

export const LANDING_PROGRAMS = [
  { id: "1", title: "Pembangunan Masjid Al-Ikhlas", category: "Pembangunan", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", title: "Beasiswa Anak Yatim Piatu", category: "Pendidikan", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" },
  { id: "3", title: "Bantuan Pangan Lansia", category: "Sosial", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" },
];

export const LANDING_BENEFITS: { id: string; title: string; description: string; icon: LucideIcon }[] = [
  { id: "1", title: "Transparansi", description: "Laporan keuangan dan program yang transparan", icon: ShieldCheck },
  { id: "2", title: "Aksesibilitas", description: "Kemudahan akses program dan donasi", icon: CheckCircle2 },
  { id: "3", title: "Komunitas", description: "Jaringan donatur dan relawan yang solid", icon: Users },
  { id: "4", title: "Dampak Nyata", description: "Program terukur untuk penerima manfaat", icon: Heart },
];

// ——— Donatur / Home ———
export const MOCK_DONOR_USER = {
  name: "M. Ardiansyah",
  totalDonasi: 2450000,
  programDibantu: 12,
};

export const MOCK_DISCOVER_ITEMS = LANDING_PROGRAMS;

export const MOCK_CAMPAIGNS = [
  { name: "Beasiswa Anak Yatim Piatu", description: "Bantu biaya sekolah untuk 50 anak yatim di Tasikmalaya.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop", target: 50000000, raised: 32500000 },
  { name: "Sembako Jum'at Berkah", description: "Program berbagi pangan untuk lansia dhuafa setiap pekan.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop", target: 10000000, raised: 7800000 },
  { name: "Pembangunan Masjid Al-Ikhlas", description: "Renovasi atap dan tempat wudhu masjid di pelosok desa.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", target: 150000000, raised: 45000000 },
];

export const MOCK_BROADCAST_TEMPLATES = [
  { nama_template: "Pemberitahuan Donasi", isi: "terkait kegiatan donasi" },
  { nama_template: "Pembayaran Tagihan", isi: "terkait pembayaran tagihan" },
  { nama_template: "Informasi Kegiatan", isi: "terkait informasi kegiatan" },
];

export const MOCK_PROFILE_USER = {
  name: "Abdullah",
  role: "Donatur",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export const MOCK_FAVORITE_ITEMS = MOCK_DISCOVER_ITEMS.slice(0, 2);

export const MOCK_WALLET_TRANSACTIONS = [
  { id: 1, type: "out" as const, title: "Donasi Masjid Al-Ikhlas", amount: "Rp 100.000", date: "12 Mei 2024", status: "Selesai" },
  { id: 2, type: "in" as const, title: "Top Up Saldo via BCA", amount: "Rp 500.000", date: "10 Mei 2024", status: "Selesai" },
  { id: 3, type: "out" as const, title: "Donasi Anak Yatim", amount: "Rp 50.000", date: "05 Mei 2024", status: "Selesai" },
];

export const MOCK_DONATION_HISTORY = [
  { id: 1, title: "Sedekah Jariyah Masjid", amount: "Rp 100.000", date: "12 Mei 2024", status: "Berhasil" },
  { id: 2, title: "Bantuan Pangan Anak Yatim", amount: "Rp 250.000", date: "05 Mei 2024", status: "Berhasil" },
  { id: 3, title: "Wakaf Al-Qur'an", amount: "Rp 500.000", date: "28 April 2024", status: "Berhasil" },
];

export const MOCK_PAYMENT_METHODS = [
  { id: 1, type: "Card", provider: "Bank BCA", number: "**** 1234" },
  { id: 2, type: "E-Wallet", provider: "GoPay", number: "0812 **** 5678" },
];

export const MOCK_FAQS = [
  { q: "Bagaimana cara melakukan donasi?", a: "Anda dapat memilih program di halaman Discover, klik 'Donasi Sekarang', dan pilih metode pembayaran." },
  { q: "Apakah donasi saya terverifikasi?", a: "Ya, Yamuti memastikan setiap program telah melalui verifikasi ketat dan laporan penyaluran dikirimkan secara berkala." },
  { q: "Bagaimana cara mencairkan saldo dana?", a: "Anda dapat mengajukan penarikan dana melalui menu Wallet, yang akan diproses dalam 1-3 hari kerja." },
  { q: "Lupa kata sandi akun?", a: "Gunakan fitur 'Lupa Kata Sandi' di halaman masuk untuk mengatur ulang akses akun Anda." },
];

export const MOCK_DONATION_DETAIL = {
  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  location: "Tasikmalaya, Jawa Barat",
  title: "Pembangunan Masjid Al-Ikhlas",
  currentAmount: 45000000,
  targetAmount: 150000000,
  author: { name: "Yayasan Yamuti", avatar: "https://i.pravatar.cc/150?u=yamuti" },
  donorsCount: 1240,
  daysRemaining: 45,
  description: "Renovasi atap dan tempat wudhu masjid di pelosok desa untuk kenyamanan jamaah.",
  gallery: [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800",
  ],
};

// ——— Admin ———
export const MOCK_ADMIN_USER = { name: "Admin Yamuti", role: "Super Administrator" };

export const MOCK_ADMIN_ANAK = [
  { id: "1", nama: "Ahmad Fauzi", jenisKelamin: "Laki-laki" as const, umur: 11, status: "Baru" as const, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?auto=format&fit=crop&w=1170&q=80" },
  { id: "2", nama: "Siti Aminah", jenisKelamin: "Perempuan" as const, umur: 10, status: "Aktif" as const, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?auto=format&fit=crop&w=1170&q=80" },
  { id: "3", nama: "Budi Santoso", jenisKelamin: "Laki-laki" as const, umur: 12, status: "Aktif" as const, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?auto=format&fit=crop&w=1170&q=80" },
  { id: "4", nama: "Laila Sari", jenisKelamin: "Perempuan" as const, umur: 9, status: "Baru" as const, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?auto=format&fit=crop&w=1170&q=80" },
];

export const MOCK_ADMIN_DONASI_SUMMARY = [
  { id: "1", jumlah: 1000000 },
  { id: "2", jumlah: 2000000 },
  { id: "3", jumlah: 3000000 },
  { id: "4", jumlah: 4000000 },
];

export const MOCK_ADMIN_PROGRAM_IDS = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];

export const MOCK_ADMIN_STOK = [
  { id: "1", jumlah: 10 },
  { id: "2", jumlah: 2000 },
  { id: "3", jumlah: 3000 },
  { id: "4", jumlah: 4000 },
];

export const MOCK_ADMIN_ORPHANS = [
  { id: 1, name: "Ahmad Fauzi", age: 10, gender: "Laki-laki" as const, status: "Baru" as const },
  { id: 2, name: "Siti Aminah", age: 8, gender: "Perempuan" as const, status: "Aktif" as const },
  { id: 3, name: "Budi Santoso", age: 12, gender: "Laki-laki" as const, status: "Aktif" as const },
  { id: 4, name: "Laila Sari", age: 9, gender: "Perempuan" as const, status: "Aktif" as const },
  { id: 5, name: "Hafiz Ramadhan", age: 11, gender: "Laki-laki" as const, status: "Alumni" as const },
];

export const MOCK_ADMIN_PROGRAMS = [
  { id: "1", title: "Bantuan Bencana Alam Gempa Bumi Cianjur", target: "Rp 500.000.000", collected: "Rp 325.000.000", progress: 65 },
  { id: "2", title: "Beasiswa Cerdas untuk Anak Bangsa 2025", target: "Rp 150.000.000", collected: "Rp 142.500.000", progress: 95 },
  { id: "3", title: "Rumah Singgah Gratis Yayasan Hati Mulia", target: "Rp 200.000.000", collected: "Rp 75.000.000", progress: 37 },
];

export const MOCK_ADMIN_DONATIONS = [
  { id: "d01", nama: "Bantuan Bencana Alam Gempa Bumi Cianjur", description: "Bantuan untuk korban gempa bumi di Cianjur", tipe: "Transfer Bank", jumlah: "Rp 5.000.000", tanggal: "2024-03-10, 14:30" },
  { id: "d02", nama: "Beasiswa Cerdas untuk Anak Bangsa 2025", description: "Beasiswa untuk anak bangsa", tipe: "Kartu Kredit", jumlah: "Rp 2.500.000", tanggal: "2024-03-10, 14:15" },
];

export const MOCK_ADMIN_DONATUR = [
  { name: "Budi Santoso", total: "Rp 15.000.000", lastDonation: "10 Mar 2024", status: "Aktif" },
  { name: "Rina Wijaya", total: "Rp 12.500.000", lastDonation: "8 Mar 2024", status: "Aktif" },
];

export const MOCK_ADMIN_BROADCAST_STATS = [
  { label: "Pesan Terkirim (Bulan Ini)", value: "1.240", icon: CheckCircle, color: "success" as const },
  { label: "Sisa Kuota Blast", value: "8.760", icon: MessageSquare, color: "primary" as const },
  { label: "Pesan Terjadwal", value: "2", icon: Clock, color: "secondary" as const },
];

export const MOCK_ADMIN_BROADCAST_TEMPLATES = [
  { nama_template: "Pemberitahuan Donasi", isi: "Informasi donasi terbaru" },
  { nama_template: "Jadwal Kunjungan", isi: "Konfirmasi jadwal kunjungan" },
];

export const MOCK_ADMIN_FINANCE_STATS = [
  { label: "Total Pemasukan (Bulan Ini)", value: "Rp 24.500.000", icon: TrendingUp, color: "success" as const, trend: { value: 8, isUp: true } },
  { label: "Total Pengeluaran (Bulan Ini)", value: "Rp 12.850.000", icon: TrendingDown, color: "danger" as const, trend: { value: 3, isUp: false } },
  { label: "Saldo Kas Saat Ini", value: "Rp 85.200.000", icon: DollarSign, color: "primary" as const },
];

export const MOCK_ADMIN_INVENTORY_STATS = [
  { label: "Total Jenis Barang", value: "152 Item", icon: Package, color: "primary" as const },
  { label: "Barang Keluar (Minggu Ini)", value: "42 Item", icon: Inbox, color: "info" as const },
  { label: "Stok Menipis", value: "5 Item", icon: AlertTriangle, color: "danger" as const },
];

export const MOCK_ADMIN_KUNJUNGAN_STATS = [
  { label: "Kunjungan Bulan Ini", value: "24", icon: Calendar, color: "primary" as const },
  { label: "Menunggu Konfirmasi", value: "5", icon: Users, color: "secondary" as const },
  { label: "Kunjungan Selesai", value: "18", icon: CheckCircle, color: "success" as const },
];

export const MOCK_ADMIN_SOCIAL_STATS = [
  { label: "Total Postingan", value: "256", icon: Share2, color: "primary" as const },
  { label: "Jangkauan Luas", value: "12.4K", icon: Globe, color: "secondary" as const },
  { label: "Pesan Masuk", value: "+42", icon: MessageCircle, color: "success" as const },
];

export const MOCK_ADMIN_SOCIAL_PLATFORMS = [
  { name: "WhatsApp Channel", icon: MessageCircle, status: "Connected", color: "text-green-600" },
  { name: "Website Resmi", icon: Globe, status: "Connected", color: "text-blue-600" },
  { name: "Portal Berita", icon: Share2, status: "Connected", color: "text-red-primary" },
];

export const MOCK_ADMIN_PROGRAM_EDIT = {
  title: "Pembangunan Asrama Baru",
  category: "Pembangunan",
  location: "Tasikmalaya",
  targetAmount: 50000000,
  deadline: "2026-12-31",
  description: "Kami berencana membangun asrama baru untuk menampung lebih banyak anak yatim.",
  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
};

// ——— Owner ———
export const MOCK_OWNER_USER = { name: "Bpk. Owner Yamuti", role: "Pemilik Yayasan" };

export const MOCK_OWNER_DASHBOARD = {
  donasi: [
    { id: "1", jumlah: 10000000, tgl_donasi: new Date() },
    { id: "2", jumlah: 5000000, tgl_donasi: new Date() },
  ],
  adminData: [
    { id: "1", name: "Ahmad Budi", role: "Admin Keuangan", task: "Laporan Keuangan", color: "bg-red-primary", status: "Aktif" },
    { id: "2", name: "Siti Rahayu", role: "Admin Program", task: "Manajemen Donasi", color: "bg-red-primary", status: "Aktif" },
  ],
  reportData: [
    { id: "1", title: "Laporan Keuangan", date: "2026-01-01", type: "Bulanan", icon: FilePieChart },
    { id: "2", title: "Laporan Operasional", date: "2026-02-01", type: "Bulanan", icon: FilePieChart },
  ],
  anak: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
  asset: [{ id: "1" }, { id: "2" }],
};

export const MOCK_OWNER_OVERSIGHT_STATS = [
  { label: "Efektivitas Dana", value: "94%", icon: TrendingUp, color: "success" as const, trend: { value: 2, isUp: true } },
  { label: "Menunggu Persetujuan", value: "3", icon: AlertCircle, color: "warning" as const },
  { label: "Program Berjalan", value: "12", icon: Heart, color: "primary" as const },
  { label: "Dana Tersalurkan", value: "Rp 850jt", icon: ShieldCheck, color: "info" as const },
];

export const MOCK_OWNER_APPROVAL_REQUESTS = [
  { title: "Program Qurban 1447 H", requester: "Admin Faisal", date: "2 Jam lalu", amount: "Rp 250jt" },
  { title: "Beasiswa Tahfidz Quran", requester: "Admin Siti", date: "5 Jam lalu", amount: "Rp 45jt" },
];

export const MOCK_OWNER_PROGRAM_PERFORMANCE = [
  { name: "Pembangunan Asrama", progress: "70%", status: "Active", trend: "+12%" },
  { name: "Biaya Pendidikan", progress: "90%", status: "Active", trend: "+5%" },
  { name: "Sembako Yatim", progress: "40%", status: "Critical", trend: "-2%" },
];

export const OWNER_PLACEHOLDER_PAGES = {
  reports: { title: "Pusat Laporan Eksekutif", description: "Halaman analisis laporan keuangan dan operasional sedang disiapkan.", icon: FilePieChart },
  admins: { title: "Daftar Administrator", description: "Kelola hak akses dan akun tim yayasan.", icon: ShieldCheck, emptyTitle: "Belum Ada Data Admin Terperinci", emptyDescription: "Daftar admin sedang dalam proses pengembangan." },
  settings: { title: "Pengaturan Dashboard Owner", description: "Konfigurasi akun dan preferensi sistem owner.", icon: Settings },
  foundation: { title: "Konfigurasi Profil Yayasan", description: "Pengaturan identitas institusi, visi, dan misi yayasan.", icon: Globe },
};
