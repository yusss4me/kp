"use client";

import { AdminBroadcastTemplate } from "@/app/ui/templates/admin-broadcast";
import { buildBroadcastStats } from "@/app/lib/utils/dashboard-stats";

export default function Page() {
  // API: GET /broadcast/templates — route belum tersedia di backend (404)
  // const { data: templates } = useQuery({ queryKey: ['broadcast-templates'], queryFn: fetchBroadcastTemplates });
  const templates: { nama_template: string; isi: string }[] = [];

  const stats = buildBroadcastStats();

  return <AdminBroadcastTemplate stats={stats} templates={templates} />;
}
