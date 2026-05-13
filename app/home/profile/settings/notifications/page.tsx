import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Bell, ChevronLeft, Mail, Smartphone, Zap } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  const settings = [
    { title: "Push Notifikasi", desc: "Terima pemberitahuan langsung di ponsel Anda", icon: <Smartphone size={20} />, active: true },
    { title: "Email Notifikasi", desc: "Dapatkan update rutin melalui alamat email", icon: <Mail size={20} />, active: true },
    { title: "Update Program", desc: "Info terbaru tentang program yang Anda bantu", icon: <Zap size={20} />, active: false },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/home/profile/settings" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Pengaturan</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-primary">
            <Bell size={24} />
          </div>
          <Txt variant="h2" weight="bold" className="text-2xl">Notifikasi</Txt>
        </div>

        <Container variant="white" radius="2xl" padding="none" shadow="sm" className="border border-gray-100 overflow-hidden">
          {settings.map((s, i) => (
            <div key={i} className={`flex items-center justify-between p-6 ${i !== settings.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <Txt weight="bold">{s.title}</Txt>
                  <Txt className="text-gray-400 text-sm">{s.desc}</Txt>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={s.active} className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-primary"></div>
              </label>
            </div>
          ))}
        </Container>
      </div>
    </Container>
  );
}
