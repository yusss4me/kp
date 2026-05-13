import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import Image from "next/image";
import { Btn } from "@/app/ui/atoms/button";
import { ReactNode } from "react";

interface CardProps {
  childern: ReactNode;
  src: string;
  width: number;
  height: number;
  alt: string;
}
export const Card = ({ childern, src, width, height, alt }: CardProps) => {
  return (
    <Container>
      <Image src={src} alt={alt} width={width} height={height}></Image>
      <Container>{childern}</Container>
    </Container>
  );
};
