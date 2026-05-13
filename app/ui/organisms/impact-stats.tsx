import { Txt } from "../atoms/text"

export const ImpactStats = () => {
    return (
        <section className="py-8 md:py-12 bg-gray-50/50 border-y border-gray-100">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">1.2jt+</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Jiwa Terbantu</Txt>
                      </div>
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">Rp 45M</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Dana Tersalurkan</Txt>
                      </div>
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">850+</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Program Berjalan</Txt>
                      </div>
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">12thn</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Pengabdian</Txt>
                      </div>
                    </div>
                  </div>
                </section>
    )
}