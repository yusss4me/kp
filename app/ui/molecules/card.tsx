import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Img } from "@/app/ui/atoms/image";
import { Btn } from "@/app/ui/atoms/button";
import { ReactNode } from "react";

export interface CardProps {
  childern: ReactNode;
  src: string;
  width: number;
  height: number;
  alt: string;
}
/**
 * Card
 * 
 * Komponen kartu dasar yang menggabungkan gambar dan konten teks/elemen.
 * 
 * @param {ReactNode} childern - Konten yang akan ditampilkan di dalam kartu
 * @param {string} src - URL sumber gambar kartu
 * @param {number} width - Lebar gambar
 * @param {number} height - Tinggi gambar
 * @param {string} alt - Deskripsi alternatif gambar
 * @param {CardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Card
 */
export const Card = ({ childern, src, width, height, alt, ...props }: CardProps) => {
  return (
    <Container {...props}>
      <Img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
      />
      <Container
      {...props}
      >
        {childern}
        </Container>
    </Container>
  );
};
