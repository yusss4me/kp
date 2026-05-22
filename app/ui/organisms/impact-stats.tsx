import { Txt } from "../atoms/text"

export interface ImpactStatsProps {
  jiwaterbantu: number;
  danatersalurkan: number;
  programberjalan: number;
  pengabdian: number;
  className?: string;
}

/**
 * ImpactStats
 * 
 * Komponen untuk menampilkan statistik dampak sosial yayasan secara ringkas.
 * Menampilkan data seperti jumlah jiwa terbantu, total dana tersalurkan, 
 * jumlah program, dan lama pengabdian.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ImpactStatsProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ImpactStats
 */
export const ImpactStats = ({jiwaterbantu, danatersalurkan, programberjalan, pengabdian}: ImpactStatsProps) => {
    return (
        <section className="py-8 md:py-12 bg-gray-50/50 border-y border-gray-100">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">{jiwaterbantu}</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Jiwa Terbantu</Txt>
                      </div>
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">{danatersalurkan}</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Dana Tersalurkan</Txt>
                      </div>
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">{programberjalan}</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Program Berjalan</Txt>
                      </div>
                      <div className="space-y-1 text-center">
                        <Txt variant="h3" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">{pengabdian}</Txt>
                        <Txt variant="caption" className="text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]">Pengabdian</Txt>
                      </div>
                    </div>
                  </div>
                </section>
    )
}