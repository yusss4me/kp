"use client";

import { ActivityKunjungan } from "@/app/ui/organisms/activity-kunjungan";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { Txt } from "@/app/ui/atoms/text";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <DashboardHeader
      user={{ name: "Donatur Yamuti", role: "Donatur" }}
      headerTitle="Pengajuan Kunjungan"
      portalLabel="Portal Donatur"
    >
      <div className="space-y-8">
        <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-primary/10 rounded-full text-xs font-bold uppercase tracking-widest text-red-primary">
              <Calendar size={14} />
              Kunjungan
            </div>
            <Txt variant="h2" weight="bold" className="text-red-primary">
              Ajukan Jadwal Kunjungan
            </Txt>
            <Txt variant="body" className="text-gray-500 max-w-2xl">
              Silakan lengkapi form di bawah ini untuk mengajukan jadwal kunjungan Anda ke panti asuhan kami. Kami akan mengkonfirmasi jadwal Anda secepatnya.
            </Txt>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-8 shadow-sm">
          <ActivityKunjungan isUser={true} />
        </div>
      </div>
    </DashboardHeader>
  );
}
