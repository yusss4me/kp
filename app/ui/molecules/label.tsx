import { Txt } from "../atoms/text";
import { Container } from "../atoms/container";

export interface LabelProps {
  text: string;
  className?: string;
}

/**
 * Label
 * 
 * Komponen label sederhana yang dibungkus dalam Container.
 * 
 * @param {string} text - Teks label yang ditampilkan
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {LabelProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Label
 */
export const Label = ({ text, className }: LabelProps) => {
  return (
    <Container className="flex items-center gap-2">
      <Txt className={className}>{text}</Txt>
    </Container>
  );
};
