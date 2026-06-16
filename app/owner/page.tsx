"use client";

import { useRouter } from "next/navigation";
import { OwnerDashboard } from "@/app/ui/templates/owner-dashboardTemplate";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useAdminStore } from "@/app/lib/stores/admin-store";
import { useInventoryStore } from "@/app/lib/stores/inventory-store";
import { useOrphans } from "@/app/lib/hooks/useOrphans";
import { usePrograms } from "@/app/lib/hooks/usePrograms";
import { FilePieChart } from "lucide-react";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

export default function Page() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const admins = useAdminStore((s) => s.admins);
  const inventory = useInventoryStore((s) => s.inventory);
  const { data: orphans = [], isLoading: orphansLoading, error: orphansError, refetch: refetchOrphans } = useOrphans();
  const { data: programs = [], isLoading: programsLoading } = usePrograms();

  const isLoading = orphansLoading || programsLoading;
  const error = orphansError;

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
    const errorMsg = error instanceof Error ? error.message : "Gagal memuat data";
    const isSessionExpired = errorMsg.includes("Sesi login");
    return (
      <ErrorDisplay 
        title={isSessionExpired ? "Sesi Berakhir" : "Gagal Memuat Dashboard Owner"}
        message={errorMsg}
        onRetry={() => refetchOrphans()}
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
      donasi={[]}
      adminData={adminData}
      reportData={[
        { id: "1", title: "Laporan Keuangan", date: new Date().toISOString().slice(0, 10), type: "Bulanan", icon: FilePieChart },
      ]}
      anak={orphans.map((o) => ({ id: String(o.id) }))}
      asset={inventory.map((i) => ({ id: String(i.id) }))}
    />
  );
}
