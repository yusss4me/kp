import { Txt } from "../atoms/text";
import { Img } from "../atoms/image";
import { Statuscard } from "../molecules/landing-iconCard";
import { Container } from "../atoms/container";
import { LucideIcon } from "lucide-react";
import { ImpactStats, ImpactStatsProps } from "./impact-stats";

export interface WhyUsSectionProps {
  benefit: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  title:string;
  subtitle:string;
  image:string;
  experience: string;
  impact: ImpactStatsProps;
  className?: string;
}

/**
 * WhyUsSection
 * 
 * Bagian section yang menjelaskan keunggulan dan nilai-nilai yayasan (Tentang Kami).
 * Menampilkan poin-poin transparansi, verifikasi, komunitas, dan dampak nyata 
 * yang didukung oleh elemen visual dan statistik pengalaman.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {WhyUsSectionProps} props - Properti komponen
 * @returns {JSX.Element} Komponen WhyUsSection
 */
export const WhyUsSection = ({ benefit, title, subtitle, image, experience, impact }: WhyUsSectionProps) => {
  return (
    <section id="tentang-kami" className="py-16 md:py-24 bg-lightdark-tertiary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-red-primary/10 rounded-full blur-[80px] md:blur-[120px] -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4 text-center lg:text-left">
              <Txt variant="h2" weight="bold" color="light" className="text-2xl md:text-3xl">{title}
              </Txt>
              <Txt variant="body" className="text-white/60 text-base md:text-lg">
                {subtitle}
              </Txt>
            </div>

            <div className="bg-white/5 rounded-[24px] md:rounded-[32px] border border-white/10 p-6 md:p-8">
              <ImpactStats {...impact} variant="dark" className="bg-transparent py-0" />
            </div>
          </div>

          <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 rounded-[32px] md:rounded-[48px] border border-white/10 p-2 md:p-4">
            <div className="absolute inset-2 md:inset-4 rounded-[28px] md:rounded-[40px] overflow-hidden">
              <Img
                src={image}
                alt="Impact"
                w={800}
                h={600}
                aspect="video"
                className="w-full h-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-red-primary p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl">
              <Txt variant="h4" weight="bold" color="light" className="text-xl md:text-2xl">{experience}</Txt>
              <Txt variant="caption" color="light" className="opacity-60 font-bold uppercase tracking-widest text-[10px]">Pengalaman</Txt>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}