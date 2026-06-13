"use client";

import { QuickAccessTemplate } from "@/app/ui/templates/quick-access";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { routes } from "@/app/lib/constants/routes";
import {
  Users,
  Plus,
  Heart,
  Wallet,
  Package,
  Calendar,
  MessageSquareText,
  Share2,
  LayoutDashboard,
  ArrowRightLeft,
  PlusCircle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

export default function AdminQuickAccessPage() {
  const authUser = useAuthStore((s) => s.user);
  const orphans = useYamutiStore((s) => s.orphans);
  const programs = useYamutiStore((s) => s.programs);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const inventory = useYamutiStore((s) => s.inventory);
  const bookings = useYamutiStore((s) => s.bookings);
  const transactions = useYamutiStore((s) => s.transactions);

  const waitingBookings = bookings.filter((b) => b.status === "Menunggu").length;
  const lowStockItems = inventory.filter(
    (i) => i.status === "Menipis" || i.status === "Habis"
  ).length;
  const totalDonasi = pendingDonations.reduce(
    (sum, d) => sum + (parseInt(d.jumlah.replace(/[^0-9]/g, "")) || 0),
    0
  );

  return (
    <QuickAccessTemplate
      user={{
        name: authUser?.name || "Admin Yamuti",
        role: authUser?.role === "admin" ? "Administrator" : "Super Administrator",
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
          label: "Donasi Masuk",
          value: `Rp ${totalDonasi.toLocaleString("id-ID")}`,
          color: "success",
        },
        {
          icon: Calendar,
          label: "Kunjungan",
          value: String(waitingBookings),
          color: "info",
        },
        {
          icon: Package,
          label: "Stok Rendah",
          value: String(lowStockItems),
          color: lowStockItems > 0 ? "danger" : "success",
        },
      ]}
      sections={[
        {
          id: "kelola-data",
          title: "Kelola Data",
          items: [
            {
              Icon: Users,
              label: "Data Anak Asuh",
              description: "Lihat & kelola data anak asuh",
              href: routes.admin.anakAsuh.root(),
              color: "primary",
              badge: orphans.length || undefined,
            },
            {
              Icon: PlusCircle,
              label: "Tambah Anak Asuh",
              description: "Registrasi anak asuh baru",
              href: routes.admin.anakAsuh.add(),
              color: "primary",
            },
            {
              Icon: Heart,
              label: "Kelola Donasi",
              description: "Verifikasi & kelola program donasi",
              href: routes.admin.donasi.root(),
              color: "success",
              badge: pendingDonations.length || undefined,
            },
            {
              Icon: PlusCircle,
              label: "Buat Program Donasi",
              description: "Buat kampanye donasi baru",
              href: routes.admin.donasi.add(),
              color: "success",
            },
            {
              Icon: Package,
              label: "Inventaris",
              description: "Stok barang & logistik",
              href: routes.admin.inventaris.root(),
              color: "info",
              badge: lowStockItems > 0 ? `${lowStockItems}!` : undefined,
            },
            {
              Icon: PlusCircle,
              label: "Tambah Inventaris",
              description: "Catat barang masuk",
              href: routes.admin.inventaris.add(),
              color: "info",
            },
          ],
        },
        {
          id: "keuangan",
          title: "Keuangan",
          items: [
            {
              Icon: Wallet,
              label: "Keuangan",
              description: "Catat pemasukan & pengeluaran",
              href: routes.admin.keuangan.root(),
              color: "success",
            },
            {
              Icon: PlusCircle,
              label: "Tambah Transaksi",
              description: "Catat transaksi keuangan baru",
              href: routes.admin.keuangan.add(),
              color: "success",
            },
          ],
        },
        {
          id: "kunjungan",
          title: "Kunjungan",
          items: [
            {
              Icon: Calendar,
              label: "Jadwal Kunjungan",
              description: "Kelola jadwal & persetujuan",
              href: routes.admin.kunjungan.root(),
              color: "info",
              badge: waitingBookings > 0 ? waitingBookings : undefined,
            },
            {
              Icon: PlusCircle,
              label: "Tambah Kunjungan",
              description: "Catat kunjungan baru",
              href: routes.admin.kunjungan.add(),
              color: "info",
            },
          ],
        },
        {
          id: "komunikasi",
          title: "Komunikasi & Konten",
          items: [
            {
              Icon: MessageSquareText,
              label: "Broadcast",
              description: "Kirim pesan ke donatur",
              href: routes.admin.broadcast.root(),
              color: "warning",
            },
            {
              Icon: Share2,
              label: "CMS & Media Sosial",
              description: "Kelola konten & artikel",
              href: routes.admin.cms.root(),
              color: "secondary",
            },
          ],
        },
        {
          id: "lainnya",
          title: "Lainnya",
          items: [
            {
              Icon: LayoutDashboard,
              label: "Dashboard Utama",
              description: "Ringkasan lengkap operasional",
              href: routes.admin.root(),
              color: "secondary",
            },
            {
              Icon: FileText,
              label: "Profil Saya",
              description: "Pengaturan akun admin",
              href: routes.admin.profile.root(),
              color: "secondary",
            },
          ],
        },
      ]}
    />
  );
}
