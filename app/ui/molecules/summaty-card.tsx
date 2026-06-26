import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Icn } from "../atoms/Icn";
import { LucideIcon } from "lucide-react";

export interface SummaryCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
}

/**
 * SummaryCard
 * 
 * Komponen kartu ringkasan (summary) yang menampilkan icon, judul, dan nilai.
 * Sering digunakan untuk statistik cepat di dashboard.
 * 
 * @param {string} title - Judul informasi ringkasan
 * @param {string} value - Nilai atau data yang diringkas
 * @param {LucideIcon} Icon - Icon visual pendukung
 * @param {SummaryCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen SummaryCard
 */
export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  Icon,
}) => {
  return (
    <Container
      className="flex flex-col items-center gap-2 flex-1 text-center min-w-0"
      variant="light"
      padding="sm"
      radius="xl"
    >
      <div className="w-9 h-9 rounded-full bg-red-primary/10 flex items-center justify-center text-red-primary shrink-0">
        <Icn icon={Icon} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 w-full">
        <Txt variant="h4" weight="bold" color="dark" font="jakarta" className="text-xs md:text-sm leading-none truncate block">
          {title}
        </Txt>
        <Txt variant="small" color="dark" font="jakarta" className="text-[9px] md:text-[10px] opacity-60 uppercase tracking-tight truncate block">
          {value}
        </Txt>
      </div>
    </Container>
  );
};
