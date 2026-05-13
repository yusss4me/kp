import { Txt } from "../atoms/text";
import { CheckCircle2, Heart, ShieldCheck, Users } from "lucide-react";

export const WhyUsSection = () => {
    return (
        <section id="tentang-kami" className="py-16 md:py-24 bg-lightdark-tertiary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-red-primary/10 rounded-full blur-[80px] md:blur-[120px] -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-4 text-center lg:text-left">
                  <Txt variant="h2" weight="bold" color="white" className="text-2xl md:text-3xl">Mengapa Menyalurkan Melalui Yamuti?</Txt>
                  <Txt variant="body" className="text-white/60 text-base md:text-lg">
                    Kami memastikan setiap rupiah yang Anda berikan dikelola dengan amanah dan profesional untuk dampak maksimal.
                  </Txt>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 p-6 bg-white/5 rounded-[32px] border border-white/5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="text-red-primary" size={24} />
                    </div>
                    <Txt variant="h6" weight="bold" color="white">Transparansi Penuh</Txt>
                    <Txt variant="small" className="text-white/40">Laporan penyaluran dana secara real-time dan transparan bagi seluruh donatur.</Txt>
                  </div>
                  <div className="space-y-3 p-6 bg-white/5 rounded-[32px] border border-white/5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="text-red-primary" size={24} />
                    </div>
                    <Txt variant="h6" weight="bold" color="white">Terverifikasi</Txt>
                    <Txt variant="small" className="text-white/40">Seluruh program telah melalui proses verifikasi lapangan yang ketat.</Txt>
                  </div>
                  <div className="space-y-3 p-6 bg-white/5 rounded-[32px] border border-white/5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                      <Users className="text-red-primary" size={24} />
                    </div>
                    <Txt variant="h6" weight="bold" color="white">Komunitas Aktif</Txt>
                    <Txt variant="small" className="text-white/40">Dukungan penuh dari ribuan relawan dan donatur di seluruh Indonesia.</Txt>
                  </div>
                  <div className="space-y-3 p-6 bg-white/5 rounded-[32px] border border-white/5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                      <Heart className="text-red-primary" size={24} />
                    </div>
                    <Txt variant="h6" weight="bold" color="white">Dampak Nyata</Txt>
                    <Txt variant="small" className="text-white/40">Fokus pada keberlanjutan dampak jangka panjang bagi penerima manfaat.</Txt>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 rounded-[32px] md:rounded-[48px] border border-white/10 p-2 md:p-4">
                <div className="absolute inset-2 md:inset-4 rounded-[28px] md:rounded-[40px] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                    alt="Impact" 
                  />
                </div>
                <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-red-primary p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl">
                  <Txt variant="h4" weight="bold" color="white" className="text-xl md:text-2xl">12 Tahun</Txt>
                  <Txt variant="caption" color="white" className="opacity-60 font-bold uppercase tracking-widest text-[10px]">Pengalaman</Txt>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}