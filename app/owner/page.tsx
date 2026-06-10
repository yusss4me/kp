"use client";

import { useEffect } from "react";
import { OwnerDashboard } from "@/app/ui/templates/owner-dashboardTemplate";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { FilePieChart } from "lucide-react";

export default function Page() {
  const authUser = useAuthStore((s) => s.user);
  const orphans = useYamutiStore((s) => s.orphans);
  const admins = useYamutiStore((s) => s.admins);
  const programs = useYamutiStore((s) => s.programs);
  const inventory = useYamutiStore((s) => s.inventory);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const fetchOrphans = useYamutiStore((s) => s.fetchOrphans);

  // API: GET /anak-asuh
  useEffect(() => {
    fetchOrphans();
  }, [fetchOrphans]);

  const donasi = pendingDonations.map((d) => ({
    id: d.id,
    jumlah: parseInt(d.jumlah.replace(/[^0-9]/g, "")) || 0,
    tgl_donasi: new Date(),
  }));

  const adminData = admins.map((a) => ({
    id: a.id,
    name: a.name,
    role: a.role,
    task: a.role,
    color: "bg-red-primary",
    status: a.status,
  }));

  return (
    <OwnerDashboard
      user={{
        name: authUser?.name || "Owner Yamuti",
        role: "Pemilik Yayasan",
      }}
      headerTitle="Dashboard Eksekutif"
      donasi={donasi}
      adminData={adminData}
      reportData={[
        { id: "1", title: "Laporan Keuangan", date: new Date().toISOString().slice(0, 10), type: "Bulanan", icon: FilePieChart },
      ]}
      anak={orphans.map((o) => ({ id: String(o.id) }))}
      asset={inventory.map((i) => ({ id: String(i.id) }))}
    />
  );
}
