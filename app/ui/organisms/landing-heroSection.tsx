import HeroSlider from "./landing-heroSlider"
import { UsersAvatar } from "@/app/ui/molecules/landing-usersAvatar"
import { UserContribution } from "@/app/ui/molecules/landing-userContribution"
import { ArrowRight, Heart, Home, MapPin } from "lucide-react"
import { Btn } from "@/app/ui/atoms/button"
import { Txt } from "@/app/ui/atoms/text"
import { Icn } from "@/app/ui/atoms/Icn"
import { Lnk } from "@/app/ui/atoms/link"
import { Badge } from "@/app/ui/atoms/badge";
import {routes } from "@/app/lib/constants/routes"

export interface HeroSectionProps {
  usersAvatar: {
    id: string,
    src: string,
    alt: string
  }[];
  userContribution: number;
  slide: {
    id: string,
    src: string,
    alt: string
  }[];
  title:string;
  
  desc:string;
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
export const HeroSection = ({usersAvatar, userContribution, slide, title, desc }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden pb-16 md:pt-12 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
          <Badge icon={Heart} variant="soft" color="primary" className="inline-flex items-center gap-2 px-4 py-2">
            Berbagi Kebaikan Hari Ini
          </Badge>
          <div className="space-y-4">
            <Txt variant="h1" weight="bold" className="text-lightdark-tertiary leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </Txt>
            <Txt variant="body" className="text-lightdark-tertiary text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              {desc}
            </Txt>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Lnk href={routes.visitor.explore()} className="w-full sm:w-auto">
              <Btn variant="red" size="lg" shape="circle" className="w-full sm:w-auto gap-3 px-10 h-14 md:h-16 text-sm md:text-md">
                Mulai Berdonasi
                <Icn icon={ArrowRight} size={20} color="current" />
              </Btn>
            </Lnk>
            <Lnk href={routes.visitor.kunjungan()} className="w-full sm:w-auto">
              <Btn variant="red" size="lg" shape="circle" className="w-full sm:w-auto gap-3 px-10 h-14 md:h-16 text-sm md:text-md">
                Ingin Berkunjung
                <Icn icon={MapPin} size={20} color="current" />
              </Btn>
            </Lnk>
            <Lnk href="#programs" className="w-full sm:w-auto">
              <Btn variant="light" textColor="red" border="border" size="lg" shape="circle" className="w-full sm:w-auto px-10 h-14 md:h-16 text-sm md:text-md">
                Lihat Program
              </Btn>
            </Lnk>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
            <UsersAvatar listImage={usersAvatar} />
            <UserContribution count={userContribution} />
          </div>
        </div>

        <div className="relative order-1 lg:order-2 px-4 md:px-0">
          <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-red-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-red-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10 scale-100 sm:scale-105 md:scale-110">
            <HeroSlider slide={slide} />
          </div>
        </div>
      </div>
    </section>
  )
}