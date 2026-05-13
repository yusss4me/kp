import { LandingHeader } from "@/app/ui/organisms/LandingHeader";
import { LandingFooter } from "@/app/ui/organisms/LandingFooter";
import { HeroSection } from "./ui/organisms/hero-section";
import { ImpactStats } from "./ui/organisms/impact-stats";
import { ProgramsSection } from "./ui/organisms/programs-section";
import { WhyUsSection } from "./ui/organisms/why-us-section";
import { CTASection } from "./ui/organisms/cta-section";

export default function Page() {
  return (
    <div className="bg-white h-full">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <HeroSection />
        {/* Impact Stats */}
        <ImpactStats />

        {/* Programs Section */}
        <ProgramsSection />

        {/* Why Us Section */}
        <WhyUsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
}
