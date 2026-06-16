import type { Metadata } from "next";
import ResetPasswordForm from "@/app/ui/templates/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Atur ulang kata sandi akun Anda di Yayasan Mutiara Titipan Ilahi.",
};

/**
 * Reset Password Page
 *
 * Page component yang menggunakan template ResetPasswordForm.
 * Dibungkus secara otomatis oleh layout di /app/auth/layout.tsx.
 *
 * URL format: /auth/reset-password?token=xxx&email=xxx
 */
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
