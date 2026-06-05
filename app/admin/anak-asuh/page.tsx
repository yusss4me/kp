"use client";

import { AdminOrphansTemplate } from "@/app/ui/templates/admin-orphans";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function Page() {
  const orphans = useYamutiStore((s) => s.orphans);
  const deleteOrphan = useYamutiStore((s) => s.deleteOrphan);

  return <AdminOrphansTemplate orphans={orphans} onDelete={deleteOrphan} />;
}
