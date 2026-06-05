"use client";

import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";
import { ActivityKunjungan } from "@/app/ui/organisms/activity-kunjungan";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <div className="flex-grow max-w-4xl w-full mx-auto pt-24 px-4">
        <Container className="text-center mb-10">
          <Txt variant="h2" weight="bold" className="text-red-primary mb-4">
            Pengajuan Kunjungan
          </Txt>
          <Txt variant="body" className="text-gray-600 max-w-2xl mx-auto">
            Silakan lengkapi form di bawah ini untuk mengajukan jadwal kunjungan Anda ke panti asuhan kami. Kami akan mengkonfirmasi jadwal Anda secepatnya.
          </Txt>
        </Container>
        
        <ActivityKunjungan isUser={false} />
      </div>

      <LandingFooter />
    </main>
  );
}
