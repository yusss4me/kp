"use client";

import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { Txt } from "@/app/ui/atoms/text";
import { Newspaper } from "lucide-react";
import { useAuthStore } from "@/app/lib/stores/auth-store";

export default function Page() {
  const authUser = useAuthStore((s) => s.user);

  // API: GET /artikel — route belum tersedia di backend
  // const { data: artikelList, isLoading } = useQuery({
  //   queryKey: ['artikel'],
  //   queryFn: fetchArtikelList,
  // });
  const artikelList: unknown[] = [];

  return (
    <DashboardHeader
      user={{ name: authUser?.name || "Donatur Yamuti", role: "Donatur" }}
      headerTitle="Kabar Yamuti"
      portalLabel="Portal Donatur"
    >
      <div className="space-y-8">
        <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-primary/10 rounded-full text-xs font-bold uppercase tracking-widest text-red-primary">
              <Newspaper size={14} />
              Kabar Terbaru
            </div>
            <Txt variant="h2" weight="bold" className="text-red-primary">
              Berita & Update Yayasan
            </Txt>
            <Txt variant="body" className="text-gray-500 max-w-xl">
              Ikuti perkembangan terbaru kegiatan, program, dan dampak positif dari Yayasan Yamuti.
            </Txt>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 text-center shadow-sm">
          <Txt variant="body" className="text-gray-400">
            {artikelList.length === 0
              ? "Belum ada berita yang dipublikasikan. Nantikan update terbaru dari kami."
              : null}
          </Txt>
        </div>
      </div>
    </DashboardHeader>
  );
}
