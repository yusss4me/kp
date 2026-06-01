"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { MessageCircle, ChevronLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Textarea } from "@/app/ui/atoms/textarea";

const contactSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactValues) => {
    console.log("Contact message data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Pesan Anda telah dikirim! Kami akan segera menghubungi Anda. (Simulasi)");
  };

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-red-50 text-red-primary rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <MessageCircle size={40} />
          </div>
          <Txt variant="h1" weight="bold" className="text-4xl">Hubungi Kami</Txt>
          <Txt className="text-gray-500 max-w-xl mx-auto">Kami siap mendengar pertanyaan, saran, atau masukan Anda untuk pelayanan yang lebih baik.</Txt>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Container variant="white" radius="2xl" padding="lg" shadow="sm" className="space-y-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <Txt className="text-gray-400 text-xs font-bold uppercase tracking-widest">Email</Txt>
                  <Txt weight="bold">halo@yamuti.org</Txt>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <Txt className="text-gray-400 text-xs font-bold uppercase tracking-widest">WhatsApp</Txt>
                  <Txt weight="bold">+62 812 3456 7890</Txt>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <Txt className="text-gray-400 text-xs font-bold uppercase tracking-widest">Alamat</Txt>
                  <Txt weight="bold">Jakarta, Indonesia</Txt>
                </div>
              </div>
            </Container>
          </div>

          <div className="lg:col-span-2">
            <Container variant="white" radius="2xl" padding="xl" shadow="lg" className="border border-gray-100 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input 
                    label="Nama Lengkap" 
                    placeholder="Masukkan nama Anda" 
                    {...register("fullName")}
                    error={errors.fullName?.message}
                  />
                  <Input 
                    label="Alamat Email" 
                    placeholder="nama@email.com" 
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>
                <Textarea
                  label="Pesan Anda"
                  placeholder="Tuliskan pesan Anda di sini..."
                  {...register("message")}
                  error={errors.message?.message}
                />
                <Btn 
                  type="submit"
                  variant="red" 
                  size="lg" 
                  isLoading={isSubmitting}
                  className="w-full gap-3 py-6 rounded-2xl shadow-xl shadow-red-primary/20"
                >
                  Kirim Pesan <Send size={20} />
                </Btn>
              </form>
            </Container>
          </div>
        </div>
      </div>
    </Container>
  );
}
