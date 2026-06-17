"use client";

import { useEffect } from "react";
import { ExploreTemplate } from "@/app/ui/templates/explore";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";

export default function Page() {
  const programs = useYamutiStore((s) => s.programs);
  const isLoading = useYamutiStore((s) => s.isLoading);
  const error = useYamutiStore((s) => s.error);
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);

  // API: GET /programs — route belum tersedia di backend (404)
  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const campaigns = programs.map((p) => ({
    id: p.id,
    name: p.title,
    categoryTag: p.category.slice(0, 3).toUpperCase(),
    description: p.description,
    image: p.image ?? FALLBACK_IMAGE,
    target: p.targetAmount,
    raised: p.collectedAmount,
  }));

  if (isLoading) {
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

  if (error) {
    return (
      <ErrorDisplay
        title="Gagal Memuat Program"
        message={error}
        onRetry={() => fetchPrograms()}
        fullPage
      />
    );
  }

  return <ExploreTemplate campaigns={campaigns} role="visitor" />;
}
