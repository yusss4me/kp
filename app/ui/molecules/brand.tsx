import { Container } from "@/app/ui/atoms/container";
import { Img } from "@/app/ui/atoms/image";
import { Txt } from "@/app/ui/atoms/text";
/**
 * BrandLight
 * 
 * Komponen untuk menampilkan identitas brand (logo dan nama) 
 * dengan skema warna terang (teks putih). Cocok untuk background gelap.
 * 
 * @returns {JSX.Element} Komponen BrandLight
 */

export const BrandLight = () => {
  return (
    <Container className="flex items-center gap-2 w-fit h-fit ">
      <Img
        src="/logo/yamuti.png"
        alt="Logo"
        rounded="full"
        w={60}
        h={60}
        className="object-cover"
      />
      <Txt variant="h3" weight="bold" color="light" className="flex">
        YAMUTI
      </Txt>
    </Container>
  );
};
/**
 * BrandDark
 * 
 * Komponen untuk menampilkan identitas brand (logo dan nama) 
 * dengan skema warna gelap (teks default). Cocok untuk background terang.
 * 
 * @returns {JSX.Element} Komponen BrandDark
 */
export const BrandDark = () => {
  return (
    <Container className="flex items-center gap-2 w-fit h-fit">
      <Img
        src="/logo/yamuti.png"
        alt="Logo"
        rounded="full"
        w={60}
        h={60}
        className=" object-cover"
      />
      <Txt variant="h3" weight="bold" color="default" className="flex">
        YAMUTI
      </Txt>
    </Container>
  );
};
