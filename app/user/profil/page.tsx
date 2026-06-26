"use client";

import { ProfileTemplate } from "@/app/ui/templates/profile";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/app/lib/utils/image";

export default function Page() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const programs = useYamutiStore((s) => s.programs);
  const bookings = useYamutiStore((s) => s.bookings);

  // API: GET /donatur/profile — route belum tersedia; gunakan auth store
  const user = {
    name: authUser?.name || "Donatur Yamuti",
    role: "Donatur",
    image: authUser?.image ? getImageUrl(authUser.image) : "/logo/yamuti.png",
  };

  return (
    <DashboardHeader
      user={{ name: user.name, role: user.role }}
      headerTitle="Profil Saya"
      portalLabel="Portal Donatur"
    >
      <ProfileTemplate
        user={user}
        amountProgramUser={String(programs.length)}
        amountVisitUser={String(bookings.length)}
        amountDonatedUser="—"
        listMenu={PROFILE_MENU_GROUPS}
        isFlyout={false}
        embedded
        onLogout={async () => {
          await useAuthStore.getState().logout();
          router.push("/auth/donatur");
        }}
      />
    </DashboardHeader>
  );
}
