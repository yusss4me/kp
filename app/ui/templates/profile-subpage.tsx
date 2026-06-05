import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { ChevronLeft, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export interface ProfileSubpageTemplateProps {
  backHref: string;
  backLabel?: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  children: ReactNode;
  maxWidth?: "3xl" | "4xl" | "5xl";
}

export function ProfileSubpageTemplate({
  backHref,
  backLabel = "Kembali ke Profil",
  title,
  description,
  icon: Icon,
  iconClassName = "bg-red-secondary text-red-primary",
  children,
  maxWidth = "4xl",
}: ProfileSubpageTemplateProps) {
  const maxW = { "3xl": "max-w-3xl", "4xl": "max-w-4xl", "5xl": "max-w-5xl" }[maxWidth];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className={`${maxW} mx-auto space-y-8`}>
        <Link
          href={backHref}
          className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{backLabel}</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${iconClassName}`}>
            <Icon size={32} />
          </div>
          <div>
            <Txt variant="h2" weight="bold" className="text-3xl">
              {title}
            </Txt>
            {description && <Txt className="text-gray-500">{description}</Txt>}
          </div>
        </div>

        {children}
      </div>
    </Container>
  );
}
