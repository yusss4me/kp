import { ProfileSettingsHubTemplate } from "@/app/ui/templates/profile-settings-hub";
import { User, Lock, Bell, Shield } from "lucide-react";
import { routes } from "@/app/lib/constants/routes";

const SETTINGS_SECTIONS = [
  { title: "Profil Pengguna", description: "Ubah nama, foto, dan informasi dasar lainnya", icon: User, href: `${routes.user.aktivitas.profile.root()}/settings/personal-info` },
  { title: "Keamanan Akun", description: "Kelola kata sandi dan autentikasi dua faktor", icon: Lock, href: `${routes.user.aktivitas.profile.root()}/settings/security` },
  { title: "Notifikasi", description: "Atur pemberitahuan aplikasi dan email", icon: Bell, href: `${routes.user.aktivitas.profile.root()}/settings/notifications` },
  { title: "Privasi & Data", description: "Kontrol bagaimana data Anda digunakan", icon: Shield, href: `${routes.user.aktivitas.profile.root()}/settings/privacy` },
];

export default function Page() {
  return <ProfileSettingsHubTemplate sections={SETTINGS_SECTIONS} />;
}
