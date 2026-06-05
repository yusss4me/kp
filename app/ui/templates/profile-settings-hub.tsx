import { ProfileSubpageTemplate } from "./profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Settings, LucideIcon } from "lucide-react";
import Link from "next/link";

export interface SettingsSection {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface ProfileSettingsHubTemplateProps {
  sections: SettingsSection[];
}

export function ProfileSettingsHubTemplate({ sections }: ProfileSettingsHubTemplateProps) {
  return (
    <ProfileSubpageTemplate
      backHref="/home/profil"
      title="Pengaturan Akun"
      description="Sesuaikan pengalaman dan keamanan akun Anda"
      icon={Settings}
      iconClassName="bg-red-50 text-red-primary"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <Link key={index} href={section.href} className="block">
            <Container variant="white" radius="xl" padding="lg" shadow="sm" className="h-full border border-gray-100 hover:border-red-primary/20 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-primary transition-colors">
                  <section.icon size={24} />
                </div>
                <div>
                  <Txt weight="bold" className="text-gray-900 group-hover:text-red-primary transition-colors text-lg">
                    {section.title}
                  </Txt>
                  <Txt className="text-gray-500 text-sm mt-1">{section.description}</Txt>
                </div>
              </div>
            </Container>
          </Link>
        ))}
      </div>

      <div className="p-8 bg-red-primary rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-primary/20">
        <div>
          <Txt weight="bold" className="text-2xl">
            Butuh Bantuan Lebih?
          </Txt>
          <Txt className="text-white/80 mt-1">Tim dukungan kami siap membantu Anda 24/7</Txt>
        </div>
        <Link href="/home/profil/contact">
          <Btn variant="light" className="px-8 py-4 text-red-primary font-bold shadow-lg hover:scale-105 transition-transform bg-white rounded-xl">
            Hubungi Support
          </Btn>
        </Link>
      </div>
    </ProfileSubpageTemplate>
  );
}
