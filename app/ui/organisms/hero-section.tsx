import HeroSlider from "./hero-slider"
import { ArrowRight, Heart } from "lucide-react"
import { Btn } from "@/app/ui/atoms/button"
import { Txt } from "@/app/ui/atoms/text"
import { Icn } from "@/app/ui/atoms/icon"
import { Img } from "@/app/ui/atoms/image"
import { Lnk } from "@/app/ui/atoms/link"

export interface HeroSectionProps {
  
  className?: string;
}

/**
 * HeroSection
 * 
 * Bagian hero utama pada halaman landing.
 * Menampilkan judul besar, deskripsi misi yayasan, tombol aksi utama, 
 * ringkasan donatur aktif, dan slider gambar (HeroSlider).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {HeroSectionProps} props - Properti komponen
 * @returns {JSX.Element} Komponen HeroSection
 */
export const HeroSection = ({}: HeroSectionProps) => {
    return (
            <section className="relative overflow-hidden pb-16 md:pt-12 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-primary/10 rounded-full border border-red-primary/20">
                <Icn icon={Heart} size={16} color="current" className="text-red-primary" />
                <span className="text-[10px] md:text-xs font-black text-red-primary uppercase tracking-widest">Berbagi Kebaikan Hari Ini</span>
              </div>
              <div className="space-y-4">
                <Txt variant="h1" weight="bold" className="text-lightdark-tertiary leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Membangun Masa Depan Bersama <span className="text-red-primary">Yamuti</span>
                </Txt>
                <Txt variant="body" className="text-lightdark-tertiary text-base md:text-lg max-w-xl mx-auto lg:mx-0">
                  Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata bagi sesama yang membutuhkan.
                </Txt>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Lnk href="/auth/daftar" className="w-full sm:w-auto">
                  <Btn variant="red" size="lg" shape="circle" className="w-full sm:w-auto gap-3 px-10 h-14 md:h-16 text-sm md:text-md">
                    Mulai Berdonasi
                    <Icn icon={ArrowRight} size={20} color="current" />
                  </Btn>
                </Lnk>
                <Lnk href="#programs" className="w-full sm:w-auto">
                  <Btn variant="light" textColor="red" border="border" size="lg" shape="circle" className="w-full sm:w-auto px-10 h-14 md:h-16 text-sm md:text-md">
                    Lihat Program
                  </Btn>
                </Lnk>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      <Img
                        src={`https://i.pravatar.cc/150?u=${i}`}
                        alt="User"
                        w={40}
                        h={40}
                        rounded="full"
                        aspect="square"
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                <Txt variant="small" className="text-lightdark-neutral text-xs md:text-sm">
                  Bergabung bersama <span className="text-lightdark-tertiary font-bold">12,000+</span> donatur aktif
                </Txt>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 px-4 md:px-0">
              <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-red-primary/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-red-primary/5 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 scale-100 sm:scale-105 md:scale-110">
                <HeroSlider />
              </div>
            </div>
          </div>    
        </section>
    )
}