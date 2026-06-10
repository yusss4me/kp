import { FilePieChart, Globe, Settings, ShieldCheck } from "lucide-react";

/** Konfigurasi halaman placeholder owner (bukan data API) */
export const OWNER_PLACEHOLDER_PAGES = {
  reports: {
    title: "Pusat Laporan Eksekutif",
    description: "Halaman analisis laporan keuangan dan operasional sedang disiapkan.",
    icon: FilePieChart,
  },
  admins: {
    title: "Daftar Administrator",
    description: "Kelola hak akses dan akun tim yayasan.",
    icon: ShieldCheck,
    emptyTitle: "Belum Ada Data Admin Terperinci",
    emptyDescription: "Daftar admin sedang dalam proses pengembangan.",
  },
  settings: {
    title: "Pengaturan Dashboard Owner",
    description: "Konfigurasi akun dan preferensi sistem owner.",
    icon: Settings,
  },
  foundation: {
    title: "Konfigurasi Profil Yayasan",
    description: "Pengaturan identitas institusi, visi, dan misi yayasan.",
    icon: Globe,
  },
};
