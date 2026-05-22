import { LandingHeader } from "@/app/ui/organisms/LandingHeader";
import { LandingFooter } from "@/app/ui/organisms/LandingFooter";
import { HeroSection } from "./ui/organisms/hero-section";
import { ImpactStats } from "./ui/organisms/impact-stats";
import { ProgramsSection } from "./ui/organisms/programs-section";
import { Container } from "./ui/atoms/container";
import { WhyUsSection } from "./ui/organisms/why-us-section";
import { CTASection } from "./ui/organisms/cta-section";

export default function Page() {
  return (
    <Container variant='light' display="none" className="h-full">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <HeroSection />
        {/* Impact Stats */}
        <ImpactStats
          jiwaterbantu={20}
          danatersalurkan={20}
          programberjalan={20}
          pengabdian={20}
        />

        {/* Programs Section */}
        <ProgramsSection items={[
              { id: '1', title: 'Pembangunan Masjid Al-Ikhlas', category: 'Pembangunan', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
              { id: '2', title: 'Beasiswa Anak Yatim Piatu', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' },
              { id: '3', title: 'Bantuan Pangan Lansia', category: 'Sosial', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop' }
            ]} />

        {/* Why Us Section */}
        <WhyUsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <LandingFooter />
    </Container>
  );
}
