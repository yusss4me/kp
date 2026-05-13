import { Container } from "@/app/ui/atoms/container";
import Image from "next/image";
import { Txt } from "@/app/ui/atoms/text";
/**
 * @description Komponen brandlight untuk menampilkan logo dan nama brand dengan warna terang
 * @returns {JSX.Element}
 */

export const BrandLight = () => {
  return (
    <Container className="flex items-center gap-2 w-fit h-fit ">
      <Image
        src="/logo/yamuti.png"
        alt="Logo"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
      <Txt variant="h3" weight="bold" color="white" className="flex">
        YAMUTI
      </Txt>
    </Container>
  );
};
/**
 * @description Komponen branddark untuk menampilkan logo dan nama brand dengan warna gelap
 * @returns {JSX.Element}
 */
export const BrandDark = () => {
  return (
    <Container className="flex items-center gap-2 w-fit h-fit">
      <Image
        src="/logo/yamuti.png"
        alt="Logo"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
      <Txt variant="h3" weight="bold" color="black" className="flex">
        YAMUTI
      </Txt>
    </Container>
  );
};
