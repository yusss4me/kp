import { LandingTemplate } from "@/app/ui/templates/landing";
import {
  LANDING_USER_AVATARS,
  LANDING_SLIDES,
  MOCK_CAMPAIGNS,
  LANDING_BENEFITS,
} from "@/app/constants/mockData";

export default function Page() {
  return (
    <LandingTemplate
      usersAvatar={LANDING_USER_AVATARS}
      userContribution={12000}
      slide={LANDING_SLIDES}
      title="Membangun Masa Depan Bersama Yamuti"
      desc="Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata bagi sesama yang membutuhkan."
      impact={{ jiwaterbantu: 20, danatersalurkan: 20, programberjalan: 20, pengabdian: 20 }}
      programs={MOCK_CAMPAIGNS}
      benefits={LANDING_BENEFITS}
      whyUsTitle="Mengapa Menyalurkan Melalui Yamuti?"
      whyUsSubtitle="Kami memastikan setiap rupiah yang Anda berikan dikelola dengan amanah dan profesional untuk dampak maksimal."
      whyUsImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
      experience="12 Tahun"
    />
  );
}
