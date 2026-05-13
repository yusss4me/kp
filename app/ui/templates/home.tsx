import { Txt } from "../atoms/text"
import { CategoryList } from "../organisms/categoryList"
import { DiscoverSection } from "../organisms/discoverSction"

export default function Home() {
    return (
        <div className="flex flex-col gap-10">
            {/* Hero Section */}
            <section className="bg-red-primary  p-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-40 -left-20 w-48 h-48 bg-orange-primary/10 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-8">
                    <div className="space-y-1">
                        <Txt variant="caption" className="text-white/60 uppercase tracking-[0.2em] font-bold">
                            Selamat Datang
                        </Txt>
                        <Txt variant="h4" weight="bold" color="white">
                            Halo, M. Ardiansyah
                        </Txt>
                    </div>

                    {/* Impact Stats Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[32px] flex items-center justify-between shadow-xl">
                        <div className="flex flex-col gap-1">
                            <Txt className="text-white/60 text-md font-medium">Total Donasi</Txt>
                            <Txt color="white" className="text-xl tracking-tight">
                                Rp 2.450.000
                            </Txt>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex flex-col gap-1 text-right">
                            <Txt className="text-white/60 text-xs font-medium">Program Dibantu</Txt>
                            <Txt color="white" className="text-xl tracking-tight">
                                12
                            </Txt>
                        </div>
                    </div>
                </div>
            </section>
        
            {/* Content Section */}
            <div className="p-4 md:p-6 -mt-10 relative z-20 space-y-8">
                <CategoryList />
                <DiscoverSection items={[
                    { id: '1', title: 'Pembangunan Masjid Al-Ikhlas', category: 'Pembangunan', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
                    { id: '2', title: 'Beasiswa Anak Yatim Piatu', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' },
                    { id: '3', title: 'Bantuan Pangan Lansia', category: 'Sosial', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop' }
                ]} />
            </div>
        </div>
    )
}