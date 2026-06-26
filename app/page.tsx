import type { Metadata } from "next";
import { LandingTemplate } from "@/app/ui/templates/landing";
import {
  LANDING_USER_AVATARS,
  LANDING_SLIDES,
  LANDING_BENEFITS,
} from "@/app/lib/constants/landing-content";
import { fetchPrograms } from "@/app/lib/api/services/programs";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Yayasan Mutiara Titipan Ilahi — Salurkan donasi Anda melalui program transparan yang berdampak nyata bagi anak yatim dan masyarakat membutuhkan.",
};

export default async function Page() {
  const programs = await fetchPrograms();

  return (
    <LandingTemplate
      usersAvatar={LANDING_USER_AVATARS}
      userContribution={12000}
      slide={LANDING_SLIDES}
      title="Membangun Masa Depan Bersama Yamuti"
      desc="Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata bagi sesama yang membutuhkan."
      impact={{ jiwaterbantu: "20+", danatersalurkan: "Rp 20 Juta+", programberjalan: "20+", pengabdian: "12 Tahun" }}
      programs={programs.map(p => ({ ...p, image: p.image || "/logo/icon.png" }))}
      benefits={LANDING_BENEFITS}
      whyUsTitle="Mengapa Menyalurkan Melalui Yamuti?"
      whyUsSubtitle="Kami memastikan setiap rupiah yang Anda berikan dikelola dengan amanah dan profesional untuk dampak maksimal."
      whyUsImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
      experience="12 Tahun"
    />
  );
}
