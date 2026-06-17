"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Textarea } from "@/app/ui/atoms/textarea";
import { MessageCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "@/app/lib/api/services/auth";
const contactSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type ContactValues = z.infer<typeof contactSchema>;

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface ProfileContactTemplateProps {
  contact: ContactInfo;
}

export function ProfileContactTemplate({ contact }: ProfileContactTemplateProps) {
  const [submitMessage, setSubmitMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactValues) => {
    try {
      await sendContactMessage({
        fullName: data.fullName,
        email: data.email,
        message: data.message
      });
      setSubmitMessage({ type: 'success', text: 'Pesan Anda telah dikirim!' });
      reset();
    } catch (e) {
      setSubmitMessage({ type: 'error', text: 'Gagal mengirim pesan.' });
    }
  };

  return (
    <ProfileSubpageTemplate
      backHref="/home/profil"
      backLabel="Kembali ke Profil"
      title="Hubungi Kami"
      description="Kami siap mendengar pertanyaan, saran, atau masukan Anda"
      icon={MessageCircle}
      iconClassName="bg-red-50 text-red-primary"
      maxWidth="5xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Container variant="light" radius="2xl" padding="lg" shadow="sm" className="space-y-4 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <Txt className="text-gray-400 text-xs font-bold uppercase tracking-widest">Email</Txt>
                <Txt weight="bold">{contact.email}</Txt>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <Txt className="text-gray-400 text-xs font-bold uppercase tracking-widest">WhatsApp</Txt>
                <Txt weight="bold">{contact.phone}</Txt>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 text-red-primary rounded-xl flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <Txt className="text-gray-400 text-xs font-bold uppercase tracking-widest">Alamat</Txt>
                <Txt weight="bold">{contact.address}</Txt>
              </div>
            </div>
          </Container>
        </div>

        <div className="lg:col-span-2">
          <Container variant="light" radius="2xl" padding="xl" shadow="lg" className="border border-gray-100 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Nama Lengkap" placeholder="Masukkan nama Anda" {...register("fullName")} error={errors.fullName?.message} />
                <Input label="Alamat Email" placeholder="nama@email.com" {...register("email")} error={errors.email?.message} />
              </div>
              <Textarea label="Pesan Anda" placeholder="Tuliskan pesan Anda di sini..." {...register("message")} error={errors.message?.message} />
              
              {submitMessage && (
                <div className={`p-4 rounded-xl text-sm font-bold ${submitMessage.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-primary'}`}>
                  {submitMessage.text}
                </div>
              )}

              <Btn type="submit" variant="red" size="lg" isLoading={isSubmitting} className="w-full gap-3 py-6 rounded-2xl shadow-xl shadow-red-primary/20">
                Kirim Pesan <Send size={20} />
              </Btn>
            </form>
          </Container>
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
