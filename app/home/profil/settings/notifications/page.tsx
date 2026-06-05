import { ProfileNotificationsTemplate } from "@/app/ui/templates/profile-notifications";

const NOTIFICATION_SETTINGS = [
  { title: "Push Notifikasi", desc: "Terima pemberitahuan langsung di ponsel Anda", active: true },
  { title: "Email Notifikasi", desc: "Dapatkan update rutin melalui alamat email", active: true },
  { title: "Update Program", desc: "Info terbaru tentang program yang Anda bantu", active: false },
];

export default function Page() {
  return <ProfileNotificationsTemplate settings={NOTIFICATION_SETTINGS} />;
}
