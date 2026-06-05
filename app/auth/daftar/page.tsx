import RegisForm from "@/app/ui/templates/regis-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun Pengguna | Yamuti Foundation",
  description: "Daftarkan diri Anda sebagai relawan atau donatur Yamuti Foundation.",
};

export default function Page() {
  return (
    <RegisForm />
  );
}