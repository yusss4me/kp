import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";
import { HeroSection } from "./ui/organisms/landing-heroSection";
import { ImpactStats } from "./ui/organisms/impact-stats";
import { ProgramsSection } from "./ui/organisms/programs-section";
import { Container } from "./ui/atoms/container";
import { WhyUsSection } from "./ui/organisms/why-us-section";
import { CTASection } from "./ui/organisms/cta-section";
import { CheckCircle2, Heart, ShieldCheck, Users, LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <Container variant='light' className="h-full">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <HeroSection 
        usersAvatar={[
              { id: '1', src: 'https://i.pravatar.cc/150?u=1', alt: 'User 1' },
              { id: '2', src: 'https://i.pravatar.cc/150?u=2', alt: 'User 2' },
              { id: '3', src: 'https://i.pravatar.cc/150?u=3', alt: 'User 3' },
              { id: '4', src: 'https://i.pravatar.cc/150?u=4', alt: 'User 4' }
            ]}
            userContribution={12000}
            slide={[
              { id: '1', src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', alt: 'Modern Tech Office' },
              { id: '2', src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop', alt: 'Corporate Collaboration' },
              { id: '3', src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop', alt: 'Premium Architecture' }
            ]}
            title="Membangun Masa Depan Bersama Yamuti"
            desc='Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata bagi sesama yang membutuhkan.'
            />
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
        <WhyUsSection
        benefit= {[
          {
            id: '1',
            title: 'Transparansi',
            description: 'Laporan keuangan dan program yang transparan',
            icon: ShieldCheck
          },
          {
            id: '2',
            title: 'Aksesibilitas',
            description: 'Kemudahan akses program dan donasi',
            icon: CheckCircle2
          },
          {
            id: '3',
            title: 'Aksesibilitas',
            description: 'Kemudahan akses program dan donasi',
            icon: Users
          },
          {
            id: '4',
            title: 'Aksesibilitas',
            description: 'Kemudahan akses program dan donasi',
            icon: Heart
          }
        ]}
        title="Mengapa Menyalurkan Melalui Yamuti?"
        subtitle="Kami memastikan setiap rupiah yang Anda berikan dikelola dengan amanah dan profesional untuk dampak maksimal."
        image="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
        experience="12 Tahun"
       />
        {/* pwa Section */}
        <CTASection />
      </main>
      <LandingFooter />
    </Container>
  );
}
