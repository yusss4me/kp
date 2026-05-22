import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

/**
 * SummaryCard
 * 
 * Komponen kartu ringkasan (summary) yang menampilkan icon, judul, dan nilai.
 * Sering digunakan untuk statistik cepat di dashboard.
 * 
 * @param {string} title - Judul informasi ringkasan
 * @param {string} value - Nilai atau data yang diringkas
 * @param {React.ReactNode} icon - Icon visual pendukung
 * @param {SummaryCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen SummaryCard
 */
export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <Container
      className="flex flex-col items-center gap-2 flex-1 text-center group transition-all hover:scale-105"
      variant="white"
      padding="sm"
      radius="xl"
    >
      <div className="w-10 h-10 rounded-full bg-red-primary/10 flex items-center justify-center text-red-primary transition-colors group-hover:bg-red-primary group-hover:text-white">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <Txt variant="h4" weight="bold" color="black" font="jakarta" className="text-sm md:text-base leading-none">
          {title}
        </Txt>
        <Txt variant="small" color="black" font="jakarta" className="text-[10px] opacity-60 uppercase tracking-tight">
          {value}
        </Txt>
      </div>
    </Container>
  );
};
