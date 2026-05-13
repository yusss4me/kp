import HeroSlider from "./hero-slider"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart } from "lucide-react"
import { Btn } from "@/app/ui/atoms/button"
import { Txt } from "@/app/ui/atoms/text"

export const HeroSection = () => {
    return (
            <section className="relative overflow-hidden pb-16 md:pt-12 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-primary/10 rounded-full border border-red-primary/20">
                <Heart size={16} className="text-red-primary" />
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
                <Link href="/auth/daftar" className="w-full sm:w-auto">
                  <Btn variant="red" size="lg" shape="circle" className="w-full sm:w-auto gap-3 px-10 h-14 md:h-16 text-sm md:text-md">
                    Mulai Berdonasi
                    <ArrowRight size={20} />
                  </Btn>
                </Link>
                <Link href="#programs" className="w-full sm:w-auto">
                  <Btn variant="light" border="border" size="lg" shape="circle" className="w-full sm:w-auto px-10 h-14 md:h-16 text-sm md:text-md">
                    Lihat Program
                  </Btn>
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm relative">
                      <Image 
                        src={`https://i.pravatar.cc/150?u=${i}`} 
                        alt="User" 
                        fill
                        sizes="(max-width: 768px) 32px, 40px"
                        className="object-cover"
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
              <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-orange-primary/5 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 scale-100 sm:scale-105 md:scale-110">
                <HeroSlider />
              </div>
            </div>
          </div>    
        </section>
    )
}