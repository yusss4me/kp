import { Metadata } from "next";
import LoginForm from "@/app/ui/templates/login-form";

export const metadata: Metadata = {
  title: "Login Donatur",
  description: "Masuk ke akun donatur Yayasan Mutiara Titipan Ilahi.",
};

export default function Page() {
  return <LoginForm variant="donatur" />;
}
