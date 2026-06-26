"use client";

import Home from "@/app/ui/templates/home";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { usePrograms } from "@/app/lib/hooks/usePrograms";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

export default function Page() {
  const authUser = useAuthStore((s) => s.user);
  const { data: programs = [], isLoading, error, refetch } = usePrograms();

  const discover = programs.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image ?? "/logo/icon.png",
  }));

  // TODO: Use actual user donation history API when available.
  // For now, setting to 0 to prevent misleading global program total.
  const totalDonasi = 0;

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton variant="rounded" width="100%" height="200px" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Skeleton variant="rounded" width="100%" height="120px" />
          <Skeleton variant="rounded" width="100%" height="120px" />
        </div>
        <Skeleton variant="rounded" width="100%" height="400px" />
      </div>
    );
  }

  if (error) {
    const errorMsg = error instanceof Error ? error.message : "Gagal memuat data";
    return (
      <ErrorDisplay 
        title="Gagal Memuat Beranda"
        message={errorMsg}
        onRetry={() => refetch()}
        fullPage
      />
    );
  }

  return (
    <Home
      user={{
        name: authUser?.name || "Donatur Yamuti",
        role: "Donatur",
        totalDonasi,
        programDibantu: programs.length,
      }}
      discover={discover}
      headerTitle="Beranda"
    />
  );
}
