"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OwnerDashboard } from "@/app/ui/templates/owner-dashboardTemplate";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { FilePieChart } from "lucide-react";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

export default function Page() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const orphans = useYamutiStore((s) => s.orphans);
  const admins = useYamutiStore((s) => s.admins);
  const programs = useYamutiStore((s) => s.programs);
  const inventory = useYamutiStore((s) => s.inventory);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const isLoading = useYamutiStore((s) => s.isLoading);
  const error = useYamutiStore((s) => s.error);
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

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton variant="rounded" width="100%" height="150px" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton variant="rounded" width="100%" height="100px" />
          <Skeleton variant="rounded" width="100%" height="100px" />
          <Skeleton variant="rounded" width="100%" height="100px" />
          <Skeleton variant="rounded" width="100%" height="100px" />
        </div>
        <Skeleton variant="rounded" width="100%" height="300px" />
      </div>
    );
  }

  if (error) {
    const isSessionExpired = error.includes("Sesi login");
    return (
      <ErrorDisplay 
        title={isSessionExpired ? "Sesi Berakhir" : "Gagal Memuat Dashboard Owner"}
        message={error}
        onRetry={() => {
          fetchOrphans();
        }}
        actionLabel="Login Kembali"
        onAction={isSessionExpired ? () => router.push('/auth') : undefined}
        fullPage
      />
    );
  }

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
