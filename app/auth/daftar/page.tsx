import RegisForm from "@/app/ui/templates/regis-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description: "Daftarkan diri Anda sebagai donatur Yayasan Mutiara Titipan Ilahi.",
};

export default function Page() {
  return (
    <RegisForm />
  );
}