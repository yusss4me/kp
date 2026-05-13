import { Txt } from "../atoms/text";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { DiscoverSection } from "../organisms/discoverSction";
import Link from "next/link";
import { Btn } from "../atoms/button";

export const ProgramsSection = () => {
    return (
        <section id="programs" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
                  <CheckCircle2 size={14} className="text-success" />
                  <span className="text-[10px] font-black text-success uppercase tracking-widest">Program Terverifikasi</span>
                </div>
                <Txt variant="h2" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">Program Kebaikan Pilihan</Txt>
                <Txt variant="body" className="text-lightdark-neutral max-w-xl text-sm md:text-base">
                  Pilih program yang paling menyentuh hati Anda dan jadilah bagian dari perubahan besar bagi mereka.
                </Txt>
              </div>
              <Link href="/home/donasi/program" className="w-full md:w-auto">
                <Btn variant="light" shape="circle" className="w-full md:w-auto gap-2 text-sm">
                  Lihat Semua Program
                  <ArrowRight size={16} />
                </Btn>
              </Link>
            </div>

            <DiscoverSection items={[
              { id: '1', title: 'Pembangunan Masjid Al-Ikhlas', category: 'Pembangunan', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
              { id: '2', title: 'Beasiswa Anak Yatim Piatu', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' },
              { id: '3', title: 'Bantuan Pangan Lansia', category: 'Sosial', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop' }
            ]} />
          </div>
        </section>
    )
}