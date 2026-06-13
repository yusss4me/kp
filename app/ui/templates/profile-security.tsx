import { ProfileSubpageTemplate } from "./profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { PasswordField } from "@/app/ui/molecules/password-field";
import { Lock, ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";

export function ProfileSecurityTemplate() {
  return (
    <ProfileSubpageTemplate
      backHref="/home/profil/settings"
      backLabel="Kembali ke Pengaturan"
      title="Keamanan Akun"
      icon={Lock}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        <Container variant="light" radius="2xl" padding="xl" shadow="sm" className="border border-gray-100 space-y-6">
          <Txt variant="h4" weight="bold">
            Ubah Kata Sandi
          </Txt>
          <div className="space-y-4">
            <PasswordField label="Kata Sandi Saat Ini" placeholder="Masukkan kata sandi lama" />
            <PasswordField label="Kata Sandi Baru" placeholder="Masukkan kata sandi baru" />
            <PasswordField label="Konfirmasi Kata Sandi Baru" placeholder="Ulangi kata sandi baru" />
          </div>
          <div className="flex justify-end pt-4">
            <Btn variant="red" className="px-8 rounded-xl shadow-lg shadow-red-primary/20">
              Perbarui Sandi
            </Btn>
          </div>
        </Container>

        <Container variant="light" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <Txt weight="bold">Autentikasi Dua Faktor (2FA)</Txt>
              <Txt className="text-gray-400 text-sm">Tambahkan lapisan keamanan ekstra pada akun Anda</Txt>
            </div>
          </div>
          <Btn variant="light" className="rounded-lg text-blue-600 font-bold">
            Aktifkan
          </Btn>
        </Container>

        <Container variant="light" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center">
              <Smartphone size={24} />
            </div>
            <div>
              <Txt weight="bold">Perangkat Terhubung</Txt>
              <Txt className="text-gray-400 text-sm">Lihat di mana saja Anda saat ini masuk</Txt>
            </div>
          </div>
          <Link href="#">
            <Txt className="text-red-primary font-bold hover:underline">Lihat Semua</Txt>
          </Link>
        </Container>
      </div>
    </ProfileSubpageTemplate>
  );
}
