import { Txt } from "../atoms/text";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { DiscoverSection } from "../organisms/discover-section";
import Link from "next/link";
import { Btn } from "../atoms/button";
import { Container } from "../atoms/container";
import { Badge } from "../atoms/badge";


export interface ProgramsSectionProps {
  items: {
    id: string;
    title: string;
    category: string;
    image: string;
  }[];
}

/**
 * ProgramsSection
 * 
 * Bagian section pada landing page yang menampilkan daftar program 
 * kebaikan pilihan (terverifikasi).
 * Menggunakan DiscoverSection untuk menampilkan item program dalam 
 * format scroller horizontal.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ProgramsSectionProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ProgramsSection
 */
export const ProgramsSection = ({ items }: ProgramsSectionProps) => {
  return (
    <Container id="programs" className="py-16 md:py-24 flex flex-col">
      <Container padding="lg" className="  flex flex-col">
        <Container className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <Container className="flex flex-col">
            <Badge
              icon={CheckCircle2}
              color="success"

            >
              <Txt color="current">

                program terverifikasi
              </Txt>
            </Badge>
            <Txt variant="h2" weight="bold" className="text-lightdark-tertiary text-2xl md:text-3xl">Program Kebaikan Pilihan</Txt>
            <Txt variant="body" className="text-lightdark-neutral max-w-xl text-sm md:text-base">
              Pilih program yang paling menyentuh hati Anda dan jadilah bagian dari perubahan besar bagi mereka.
            </Txt>
          </Container>
          <Link href="/explore" className="w-full md:w-auto">
            <Btn variant="light" textColor="dark" shape="circle" className="w-full md:w-auto gap-2 text-sm">
              Lihat Semua Program
              <ArrowRight size={16} />
            </Btn>
          </Link>
        </Container>

        <DiscoverSection items={items} />
      </Container>
    </Container>
  )
}