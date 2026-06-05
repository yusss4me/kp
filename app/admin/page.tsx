import { Metadata } from "next";
import { AdminDashboard } from "@/app/ui/templates/admin-dashboardTemplate";

export const metadata: Metadata = {
  title: "Admin Dashboard | Yamuti Foundation",
  description: "Manajemen program, donasi, anak asuh, dan operasional Yayasan Mutiara Titipan Illahi.",
};
import {
  MOCK_ADMIN_USER,
  MOCK_ADMIN_ANAK,
  MOCK_ADMIN_DONASI_SUMMARY,
  MOCK_ADMIN_PROGRAM_IDS,
  MOCK_ADMIN_STOK,
} from "@/app/constants/mockData";

export default function Page() {
  return (
    <AdminDashboard
      user={MOCK_ADMIN_USER}
      headerTitle="Dashboard Utama"
      anak={MOCK_ADMIN_ANAK}
      donasi={MOCK_ADMIN_DONASI_SUMMARY}
      program={MOCK_ADMIN_PROGRAM_IDS}
      stokBarang={MOCK_ADMIN_STOK}
    />
  );
}
