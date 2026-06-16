import Link from "next/link";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Container } from "@/app/ui/atoms/container";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <Container className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <Txt
        variant="h1"
        weight="bold"
        className="text-8xl md:text-9xl text-red-primary tracking-tight"
      >
        404
      </Txt>
      <Txt variant="h2" weight="bold" className="mt-4 text-lightdark-tertiary">
        {t("notFound")}
      </Txt>
      <Txt variant="body" className="mt-3 text-lightdark-neutral max-w-md">
        {t("notFoundDescription")}
      </Txt>
      <Link href="/" className="mt-8">
        <Btn variant="red" size="lg" shape="rounded" className="px-10 shadow-lg shadow-red-primary/20">
          {t("backToHome")}
        </Btn>
      </Link>
    </Container>
  );
}
