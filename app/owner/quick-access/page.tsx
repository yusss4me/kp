"use client";

import { QuickAccessTemplate } from "@/app/ui/templates/quick-access";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { routes } from "@/app/lib/constants/routes";
import {
  ShieldCheck,
  FilePieChart,
  Globe,
  Settings,
  Activity,
  LayoutDashboard,
  PlusCircle,
  Users,
  Heart,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function OwnerQuickAccessPage() {
  const authUser = useAuthStore((s) => s.user);
  const admins = useYamutiStore((s) => s.admins);
  const orphans = useYamutiStore((s) => s.orphans);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const approvalRequests = useYamutiStore((s) => s.approvalRequests);
  const programs = useYamutiStore((s) => s.programs);

  const totalDonasi = pendingDonations.reduce(
    (sum, d) => sum + (parseInt(d.jumlah.replace(/[^0-9]/g, "")) || 0),
    0
  );

  return (
    <QuickAccessTemplate
      user={{
        name: authUser?.name || "Owner Yamuti",
        role: "Pemilik Yayasan",
      }}
      headerTitle="Akses Cepat"
      summaryStats={[
        {
          icon: Users,
          label: "Anak Asuh",
          value: String(orphans.length),
          color: "primary",
        },
        {
          icon: Heart,
          label: "Dana Masuk",
          value: `Rp ${totalDonasi.toLocaleString("id-ID")}`,
          color: "success",
        },
        {
          icon: Activity,
          label: "Program",
          value: String(programs.length),
          color: "info",
        },
        {
          icon: Clock,
          label: "Perlu Setuju",
          value: String(approvalRequests.length),
          color: approvalRequests.length > 0 ? "warning" : "success",
        },
      ]}
      sections={[
        {
          id: "supervisi",
          title: "Supervisi & Persetujuan",
          items: [
            {
              Icon: CheckCircle,
              label: "Persetujuan Donasi",
              description: "Setujui atau tolak donasi masuk",
              href: routes.owner.donations.root(),
              color: "warning",
              badge: approvalRequests.length || undefined,
            },
            {
              Icon: Activity,
              label: "Log Aktivitas & Donasi",
              description: "Pantau dana & efektivitas program",
              href: routes.owner.donations.root(),
              color: "info",
            },
          ],
        },
        {
          id: "manajemen",
          title: "Manajemen Organisasi",
          items: [
            {
              Icon: ShieldCheck,
              label: "Kelola Admin",
              description: "Atur hak akses & akun admin",
              href: routes.owner.admins.root(),
              color: "primary",
              badge: admins.length || undefined,
            },
            {
              Icon: PlusCircle,
              label: "Tambah Admin",
              description: "Buat akun admin baru",
              href: routes.owner.admins.add(),
              color: "primary",
            },
            {
              Icon: Globe,
              label: "Profil Yayasan",
              description: "Atur identitas & visi misi",
              href: routes.owner.foundation.root(),
              color: "info",
            },
          ],
        },
        {
          id: "laporan",
          title: "Laporan",
          items: [
            {
              Icon: FilePieChart,
              label: "Pusat Laporan",
              description: "Generate laporan operasional",
              href: routes.owner.reports.root(),
              color: "success",
            },
          ],
        },
        {
          id: "lainnya",
          title: "Lainnya",
          items: [
            {
              Icon: LayoutDashboard,
              label: "Dashboard Eksekutif",
              description: "Ringkasan lengkap dashboard",
              href: routes.owner.root(),
              color: "secondary",
            },
            {
              Icon: Settings,
              label: "Pengaturan",
              description: "Konfigurasi akun & sistem",
              href: routes.owner.settings.root(),
              color: "secondary",
            },
          ],
        },
      ]}
    />
  );
}
