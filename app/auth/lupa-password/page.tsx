import type { Metadata } from "next";
import ForgotPasswordForm from "@/app/ui/templates/forgot-password-form";

export const metadata: Metadata = {
  title: "Lupa Password",
  description: "Atur ulang kata sandi akun Anda di Yayasan Mutiara Titipan Ilahi.",
};

/**
 * Lupa Password Page
 * 
 * Page component yang menggunakan template ForgotPasswordForm.
 * Dibungkus secara otomatis oleh layout di /app/auth/layout.tsx.
 */
export default function LupaPasswordPage() {
  return <ForgotPasswordForm />;
}
