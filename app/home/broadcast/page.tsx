"use client";

import { DonorBroadcastTemplate } from "@/app/ui/templates/donor-broadcast";
import { useAuthStore } from "@/app/lib/stores/auth-store";

export default function Page() {
  const authUser = useAuthStore((s) => s.user);

  // API: GET /broadcast/templates — route belum tersedia di backend (404)
  // const { data: templatePesan } = useQuery({ queryKey: ['broadcast-templates'], queryFn: fetchBroadcastTemplates });
  const templatePesan: { nama_template: string; isi: string }[] = [];

  return (
    <DonorBroadcastTemplate
      templatePesan={templatePesan}
      user={{ name: authUser?.name || "Donatur Yamuti", role: "Donatur" }}
    />
  );
}
