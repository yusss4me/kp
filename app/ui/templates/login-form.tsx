"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Input } from "@/app/ui/atoms/input";
import { Btn } from "@/app/ui/atoms/button";
import { Checkbox } from "@/app/ui/atoms/checkbox";
import { PasswordField } from "@/app/ui/molecules/password-field";

import { apiClient } from "@/app/lib/api/client";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useRouter } from "next/navigation";
import { routes } from "@/app/lib/constants/routes";

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  className?: string;
  /** Which auth flow this form serves: admin/owner (no register) or donatur (with register) */
  variant?: "admin" | "donatur";
}

/**
 * LoginForm
 * 
 * Template untuk halaman masuk (login).
 * Menyediakan form input nama pengguna dan kata sandi dengan 
 * validasi keamanan dasar.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {LoginFormProps} props - Properti komponen
 * @returns {JSX.Element} Komponen LoginForm
 */
export default function LoginForm({ variant = "admin" }: LoginFormProps) {
  const isDonatur = variant === "donatur";
  const t = useTranslations(isDonatur ? "auth.donaturLogin" : "auth.login");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    },
  });

  // Load saved email if remember me was used previously
  const [savedEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("yamuti-saved-email") || "";
    }
    return "";
  });

  useEffect(() => {
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberMe", true);
    }
  }, [savedEmail, setValue]);

  const onSubmit = async (data: LoginFormValues) => {
    const store = useAuthStore.getState();
    const rememberMe = data.rememberMe ?? true;

    // Save email for next visit if remember me is checked
    if (rememberMe) {
      localStorage.setItem("yamuti-saved-email", data.email);
    } else {
      localStorage.removeItem("yamuti-saved-email");
    }

    const { success, error } = isDonatur
      ? await store.loginDonaturApi(data.email, data.password, rememberMe)
      : await store.loginApi(data.email, data.password, rememberMe);
    if (success) {
      // If middleware provided a redirect URL, use it
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get('redirect');
      if (redirectUrl) {
        router.push(redirectUrl);
        return;
      }
      const role = useAuthStore.getState().user?.role || "admin";
      if (role === "owner") {
        router.push(routes.owner.root());
      } else if(role == "admin"){
        router.push(routes.admin.root());
      } else if(role == "donatur"){
        router.push(routes.user.root());
      }
    } else {
      setError("root", { message: error || t("invalidCredentials") });
    }
  };

  return (
    <Container
      className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white"
    >
      <Container className="flex flex-col items-center gap-2">
        <Txt
          variant="h2"
          weight="bold"
          align="center"
          font="jakarta"
          className="tracking-tight text-lightdark-tertiary"
        >
          {t("title")}
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral text-center">
          {t("subtitle")}
        </Txt>
      </Container>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {errors.root && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {errors.root.message}
          </div>
        )}
        <Input
          label={t("emailLabel")}
          type="email"
          placeholder={t("emailPlaceholder")}
          className="transition-all focus:ring-2 focus:ring-red-primary/10"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordField 
          label={t("passwordLabel")} 
          placeholder={t("passwordPlaceholder")} 
          {...register("password")}
          error={errors.password?.message}
        />

        <Container className="flex items-center justify-between -mt-2">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                label={t("rememberMe")}
                checked={field.value ?? true}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <Link href="/auth/lupa-password">
            <Txt
              variant="small"
              className="text-red-primary hover:text-red-tertiary transition-colors cursor-pointer font-semibold"
            >
              {t("forgotPassword")}
            </Txt>
          </Link>
        </Container>
        
        <Btn
          type="submit"
          variant="red"
          size="lg"
          shape="rounded"
          isLoading={isSubmitting}
          className="w-full mt-2 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
        >
          {t("submit")}
        </Btn>
      </form>

      {isDonatur && (
        <Container className="text-center border-t border-lightdark-secondary pt-6">
          <Txt variant="body" className="text-lightdark-neutral">
            {t("noAccount")}{" "}
            <Link
              href="/auth/daftar"
              className="text-red-primary font-bold hover:text-red-tertiary transition-colors hover:underline"
            >
              {t("register")}
            </Link>
          </Txt>
        </Container>
      )}
    </Container>
  );
}
