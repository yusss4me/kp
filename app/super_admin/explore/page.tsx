"use client";

import { useEffect } from "react";
import { AdminExploreTemplate } from "@/app/ui/templates/admin-explore";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useOrphanStore } from "@/app/lib/stores/orphan-store";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

export default function Page() {
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);
  const fetchOrphans = useOrphanStore((s) => s.fetchOrphans);
  
  const isLoadingPrograms = useYamutiStore((s) => s.isLoading);
  const errorPrograms = useYamutiStore((s) => s.error);

  useEffect(() => {
    fetchPrograms();
    fetchOrphans();
  }, [fetchPrograms, fetchOrphans]);

  if (isLoadingPrograms) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton variant="rounded" width="100%" height="300px" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton variant="rounded" width="100%" height="250px" />
          <Skeleton variant="rounded" width="100%" height="250px" />
          <Skeleton variant="rounded" width="100%" height="250px" />
        </div>
      </div>
    );
  }

  if (errorPrograms) {
    return (
      <ErrorDisplay
        title="Gagal Memuat Data"
        message={errorPrograms}
        onRetry={() => {
          fetchPrograms();
          fetchOrphans();
        }}
        fullPage
      />
    );
  }

  return <AdminExploreTemplate role="super_admin" />;
}
