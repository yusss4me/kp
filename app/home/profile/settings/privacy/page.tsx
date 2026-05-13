import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Shield, ChevronLeft, Eye, EyeOff, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { Btn } from "@/app/ui/atoms/button";

export default function PrivacyPage() {
  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/home/profile/settings" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Pengaturan</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-primary">
            <Shield size={24} />
          </div>
          <Txt variant="h2" weight="bold" className="text-2xl">Privasi & Data</Txt>
        </div>

        <div className="space-y-6">
          <Container variant="white" radius="2xl" padding="xl" shadow="sm" className="border border-gray-100 space-y-6">
            <Txt variant="h4" weight="bold">Visibilitas Profil</Txt>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Txt weight="bold">Tampilkan Nama di List Donatur</Txt>
                <Txt className="text-gray-400 text-sm">Jika dinonaktifkan, Anda akan muncul sebagai 'Hamba Allah'</Txt>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-primary"></div>
              </label>
            </div>
          </Container>

          <div className="grid gap-4">
            <Container variant="white" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-red-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <Txt weight="bold">Kebijakan Privasi</Txt>
              </div>
              <ChevronLeft size={18} className="text-gray-300 rotate-180" />
            </Container>

            <Container variant="white" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-red-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                  <Trash2 size={20} />
                </div>
                <div>
                  <Txt weight="bold" className="text-red-primary">Hapus Akun</Txt>
                  <Txt className="text-gray-400 text-xs">Tindakan ini tidak dapat dibatalkan</Txt>
                </div>
              </div>
              <Btn variant="light" className="text-red-primary font-bold text-xs">Minta Hapus</Btn>
            </Container>
          </div>
        </div>
      </div>
    </Container>
  );
}
