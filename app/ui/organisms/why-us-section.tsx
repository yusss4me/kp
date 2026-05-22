import { Txt } from "../atoms/text";
import { Icn } from "../atoms/icon";
import { Img } from "../atoms/image";
import { Statuscard } from "../molecules/statusCard";
import { Container } from "../atoms/container";
import { CheckCircle2, Heart, ShieldCheck, Users } from "lucide-react";

export interface WhyUsSectionProps {
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
export const WhyUsSection = ({ }: WhyUsSectionProps) => {
  return (
    <section id="tentang-kami" className="py-16 md:py-24 bg-lightdark-tertiary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-red-primary/10 rounded-full blur-[80px] md:blur-[120px] -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Container display='grid' className=" grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4 text-center lg:text-left">
              <Txt variant="h2" weight="bold" color="light" className="text-2xl md:text-3xl">Mengapa Menyalurkan Melalui Yamuti?</Txt>
              <Txt variant="body" className="text-white/60 text-base md:text-lg">
                Kami memastikan setiap rupiah yang Anda berikan dikelola dengan amanah dan profesional untuk dampak maksimal.
              </Txt>
            </div>

            <Container display="grid" className=" grid-cols-1 md:grid-cols-2 gap-8">
             <Statuscard 
             statusIcon={ShieldCheck} 
             title="Transparansi Penuh" 
             description="Laporan penyaluran dana secara real-time dan transparan bagi seluruh donatur." />
              <Statuscard 
             statusIcon={CheckCircle2} 
             title="Terverifikasi" 
             description="Seluruh program telah melalui proses verifikasi lapangan yang ketat." />
              <Statuscard 
             statusIcon={Users} 
             title="Terverifikasi" 
             description="Seluruh program telah melalui proses verifikasi lapangan yang ketat." />
              <Statuscard 
             statusIcon={Heart} 
             title="Dampak Nyata" 
             description="Fokus pada keberlanjutan dampak jangka panjang bagi penerima manfaat." />
            </Container>
          </div>

          <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 rounded-[32px] md:rounded-[48px] border border-white/10 p-2 md:p-4">
            <div className="absolute inset-2 md:inset-4 rounded-[28px] md:rounded-[40px] overflow-hidden">
              <Img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                alt="Impact"
                w={800}
                h={600}
                aspect="video"
                className="w-full h-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-red-primary p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl">
              <Txt variant="h4" weight="bold" color="light" className="text-xl md:text-2xl">12 Tahun</Txt>
              <Txt variant="caption" color="light" className="opacity-60 font-bold uppercase tracking-widest text-[10px]">Pengalaman</Txt>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}