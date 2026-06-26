import type { Metadata } from "next";
import { DonationFormTemplate } from "@/app/ui/templates/donation-form";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { Txt } from "@/app/ui/atoms/text";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Form Donasi Program",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <DashboardHeader
      user={{ name: "Donatur Yamuti", role: "Donatur" }}
      headerTitle="Formulir Donasi"
      portalLabel="Portal Donatur"
    >
      <div className="space-y-8">
        <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-primary/10 rounded-full text-xs font-bold uppercase tracking-widest text-red-primary">
              <Heart size={14} />
              Donasi
            </div>
            <Txt variant="h2" weight="bold" className="text-red-primary">
              Mulai Berdonasi
            </Txt>
            <Txt variant="body" className="text-gray-500 max-w-2xl">
              Setiap rupiah yang Anda berikan akan sangat berarti bagi anak-anak asuh kami.
            </Txt>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-8 shadow-sm">
          <DonationFormTemplate activityId={id} isUser={true} />
        </div>
      </div>
    </DashboardHeader>
  );
}
