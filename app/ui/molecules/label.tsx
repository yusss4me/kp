import { Txt } from "../atoms/text";
import { Container } from "../atoms/container";

interface LabelProps {
  text: string;
}

export const Label = ({ text }: LabelProps) => {
  return (
    <Container className="flex items-center gap-2">
      <Txt>{text}</Txt>
    </Container>
  );
};
