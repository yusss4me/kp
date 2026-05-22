import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";

export interface ModalProps {
  // Add props as needed
}

/**
 * Modal
 * 
 * Komponen dialog overlay untuk menampilkan konten penting yang memerlukan 
 * atensi atau interaksi pengguna.
 * 
 * @returns {JSX.Element} Komponen Modal
 */
export const Modal = () => {
  return (
    <Container>
      <Txt variant="h2">test</Txt>
      <Txt variant="body">test</Txt>
      <Btn variant="red" size="lg" shape="square">
        {" "}
        test
      </Btn>
    </Container>
  );
};
