"use client";

import { ActivityClientTemplate } from "@/app/ui/templates/activity-client-template";
import { useAuthStore } from "@/app/lib/stores/auth-store";

export default function Page() {
  const authUser = useAuthStore((s) => s.user);

  return (
    <ActivityClientTemplate
      campaigns={[]}
      user={{ name: authUser?.name || "Donatur Yamuti", role: "Donatur" }}
    />
  );
}
