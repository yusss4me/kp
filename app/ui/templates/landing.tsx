import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";
import { HeroSection } from "@/app/ui/organisms/landing-heroSection";
import { ImpactStats } from "@/app/ui/organisms/impact-stats";
import { ProgramsSection } from "@/app/ui/organisms/programs-section";
import { Container } from "@/app/ui/atoms/container";
import { WhyUsSection } from "@/app/ui/organisms/why-us-section";
import { CTASection } from "@/app/ui/organisms/cta-section";
import { LandingFoundationProfile } from "@/app/ui/organisms/landing-foundation-profile";
import { LandingNewsSection } from "@/app/ui/organisms/landing-news";
import { LucideIcon } from "lucide-react";

export interface LandingTemplateProps {
  usersAvatar: { id: string; src: string; alt: string }[];
  userContribution: number;
  slide: { id: string; src: string; alt: string }[];
  title: string;
  desc: string;
  impact: { jiwaterbantu: number; danatersalurkan: number; programberjalan: number; pengabdian: number };
  // programs: { id: string; title: string; category: string; image: string }[];
  benefits: { id: string; title: string; description: string; icon: LucideIcon }[];
  whyUsTitle: string;
  whyUsSubtitle: string;
  whyUsImage: string;
  experience: string;
}

export function LandingTemplate({
  usersAvatar,
  userContribution,
  slide,
  title,
  desc,
  impact,
  // programs,
  benefits,
  whyUsTitle,
  whyUsSubtitle,
  whyUsImage,
  experience,
}: LandingTemplateProps) {
  return (
    <Container variant="light" className="h-full">
      <LandingHeader />
      <main>
        <HeroSection
          usersAvatar={usersAvatar}
          userContribution={userContribution}
          slide={slide}
          title={title}
          desc={desc}
        />
        <LandingFoundationProfile />
        <ImpactStats {...impact} />
        <LandingNewsSection />
        {/* <ProgramsSection items={programs} /> */}
        <WhyUsSection
          benefit={benefits}
          title={whyUsTitle}
          subtitle={whyUsSubtitle}
          image={whyUsImage}
          experience={experience}
        />
        <CTASection />
      </main>
      <LandingFooter />
    </Container>
  );
}
