import { Txt } from "../atoms/text"

export interface ImpactStatsProps {
  jiwaterbantu: number | string;
  danatersalurkan: number | string;
  programberjalan: number | string;
  pengabdian: number | string;
  className?: string;
  variant?: 'default' | 'dark';
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
export const ImpactStats = ({
  jiwaterbantu,
  danatersalurkan,
  programberjalan,
  pengabdian,
  className,
  variant = 'default'
}: ImpactStatsProps) => {
    const isDark = variant === 'dark';
    const sectionClass = className !== undefined ? className : (isDark ? "py-8" : "py-8 md:py-12 bg-gray-50/50 border-y border-gray-100");
    const containerClass = isDark ? "w-full" : "max-w-7xl mx-auto px-6";
    const numberClass = isDark ? "text-white text-3xl md:text-4xl" : "text-lightdark-tertiary text-2xl md:text-3xl";
    const labelClass = isDark ? "text-white/60 font-bold uppercase tracking-widest text-[10px]" : "text-lightdark-neutral font-bold uppercase tracking-widest text-[10px]";

    return (
        <section className={sectionClass}>
                  <div className={containerClass}>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-1 text-left">
                        <Txt variant="h3" weight="bold" className={numberClass}>{jiwaterbantu}</Txt>
                        <Txt variant="caption" className={labelClass}>Jiwa Terbantu</Txt>
                      </div>
                      <div className="space-y-1 text-left">
                        <Txt variant="h3" weight="bold" className={numberClass}>{danatersalurkan}</Txt>
                        <Txt variant="caption" className={labelClass}>Dana Tersalurkan</Txt>
                      </div>
                      <div className="space-y-1 text-left">
                        <Txt variant="h3" weight="bold" className={numberClass}>{programberjalan}</Txt>
                        <Txt variant="caption" className={labelClass}>Program Berjalan</Txt>
                      </div>
                      <div className="space-y-1 text-left">
                        <Txt variant="h3" weight="bold" className={numberClass}>{pengabdian}</Txt>
                        <Txt variant="caption" className={labelClass}>Pengabdian</Txt>
                      </div>
                    </div>
                  </div>
                </section>
    )
}