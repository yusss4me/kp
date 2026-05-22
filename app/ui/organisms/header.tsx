import { BrandLight } from "@/app/ui/molecules/brand";
import { Container } from "@/app/ui/atoms/container";
import Link from "next/link";
import { Btn } from "../atoms/button";
import { ArrowLeft } from 'lucide-react';

export interface HeaderProps {
  className?: string;
}

/**
 * Header
 * 
 * Komponen header sederhana yang berisi tombol kembali dan logo brand.
 * Digunakan pada halaman sekunder yang memerlukan navigasi balik cepat.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {HeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Header
 */
export const Header = ({}: HeaderProps) => {
  return (
    <Container
      className="flex  items-center justify-between w-full h-24  "
      variant="red"
      padding="md"
    >
      <Link href="/">
        <Btn
          variant="light"
          size="sm"
          textColor="red"
          shape="circle"
          className="w-full mt-4 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
        >
          <ArrowLeft />
        </Btn>
      </Link>

      <BrandLight />
    </Container>
  );
};
