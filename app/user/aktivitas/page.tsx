"use client";

import { ActivityClientTemplate } from "@/app/ui/templates/activity-client-template";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { routes } from "@/app/lib/constants/routes";


export default function Page() {
  const authUser = useAuthStore((s) => s.user);

  return (
    <ActivityClientTemplate
      campaigns={[]}
      detailUrl={(id: string) => routes.user.aktivitas.program.detail(id)}
      donasiUrl={(id: string) => routes.user.aktivitas.program.donation(id)}
      user={{ name: authUser?.name || "Donatur Yamuti", role: "Donatur" }}
    />
  );
}
