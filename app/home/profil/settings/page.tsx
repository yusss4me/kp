import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Settings, ChevronLeft, User, Lock, Bell, Shield } from "lucide-react";
import Link from "next/link";
import { Btn } from "@/app/ui/atoms/button";

export default function SettingsPage() {
  const sections = [
    { title: "Profil Pengguna", description: "Ubah nama, foto, dan informasi dasar lainnya", icon: <User size={24} />, href: "/home/profile/settings/personal-info" },
    { title: "Keamanan Akun", description: "Kelola kata sandi dan autentikasi dua faktor", icon: <Lock size={24} />, href: "/home/profile/settings/security" },
    { title: "Notifikasi", description: "Atur pemberitahuan aplikasi dan email", icon: <Bell size={24} />, href: "/home/profile/settings/notifications" },
    { title: "Privasi & Data", description: "Kontrol bagaimana data Anda digunakan", icon: <Shield size={24} />, href: "/home/profile/settings/privacy" },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors mb-8 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="flex items-center gap-4 mb-10 animate-in slide-in-from-left-4 duration-500">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-primary shadow-sm">
            <Settings size={32} />
          </div>
          <div>
            <Txt variant="h2" weight="bold" className="text-3xl">Pengaturan Akun</Txt>
            <Txt className="text-gray-500">Sesuaikan pengalaman dan keamanan akun Anda</Txt>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <Link key={index} href={section.href} className="block animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: 'both' }}>
              <Container variant="white" radius="xl" padding="lg" shadow="sm" className="h-full border border-gray-100 hover:border-red-primary/20 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-primary transition-colors">
                    {section.icon}
                  </div>
                  <div>
                    <Txt weight="bold" className="text-gray-900 group-hover:text-red-primary transition-colors text-lg">{section.title}</Txt>
                    <Txt className="text-gray-500 text-sm mt-1">{section.description}</Txt>
                  </div>
                </div>
              </Container>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 bg-red-primary rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-primary/20 animate-in zoom-in-95 duration-700 delay-500">
          <div>
            <Txt weight="bold" className="text-2xl">Butuh Bantuan Lebih?</Txt>
            <Txt className="text-white/80 mt-1">Tim dukungan kami siap membantu Anda 24/7</Txt>
          </div>
          <Link href="/home/profile/contact">
            <Btn variant="light" className="px-8 py-4 text-red-primary font-bold shadow-lg hover:scale-105 transition-transform bg-white rounded-xl">
              Hubungi Support
            </Btn>
          </Link>
        </div>
      </div>
    </Container>
  );
}

