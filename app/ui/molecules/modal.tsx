import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";

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
