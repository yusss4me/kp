"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Container } from "@/app/ui/atoms/container";
import { Input } from "@/app/ui/atoms/input";
import { Badge } from "@/app/ui/atoms/badge";
import {
  ChevronLeft,
  Share2,
  Heart,
  ShieldCheck,
  Users,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DataVerification } from "@/app/ui/molecules/dataVerificarion";

const donationSchema = z.object({
  amount: z
    .number({ message: "Nominal harus angka" })
    .min(10000, "Minimal donasi Rp 10.000"),
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  message: z.string().optional(),
  isAnonymous: z.boolean().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function DonationDetailPage() {
  const params = useParams();

  // Mock data based on the ID
  const program = {
    title: "Beasiswa Anak Yatim Piatu",
    category: "Pendidikan",
    description:
      "Bantu biaya sekolah untuk 50 anak yatim di Tasikmalaya agar mereka tetap bisa mengejar cita-cita meskipun dalam keterbatasan ekonomi.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    target: 50000000,
    raised: 32500000,
    donors: 124,
    daysLeft: 12,
    details: `Program Beasiswa YAMUTI adalah inisiatif tahunan untuk memastikan anak-anak binaan kami mendapatkan akses pendidikan yang layak.

Dana yang terkumpul akan digunakan untuk:
1. SPP/Iuran bulanan sekolah
2. Seragam dan alat tulis
3. Buku pelajaran
4. Biaya transportasi sekolah

Setiap rupiah yang Anda donasikan sangat berarti bagi masa depan mereka.`,
  };

  const progress = (program.raised / program.target) * 100;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      isAnonymous: false,
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    console.log("Donation data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Terima kasih! Donasi Anda telah diterima (Simulasi)");
  };

  const setAmount = (amt: number) => {
    setValue("amount", amt, { shouldValidate: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Navigation Overlay */}
        <div className="absolute top-8 left-6 right-6 flex justify-between items-center">
          <Link
            href="/home/donasi"
            className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft size={24} />
          </Link>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all">
            <Share2 size={24} />
          </button>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-12 left-8 right-8 text-white space-y-4">
          <Badge
            variant="solid"
            color="primary"
            className="bg-red-primary border-none"
          >
            {program.category}
          </Badge>
          <Txt
            variant="h2"
            weight="bold"
            className="text-3xl md:text-5xl leading-tight max-w-3xl"
          >
            {program.title}
          </Txt>
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <Txt variant="small" weight="bold">
                {program.donors} Donatur
              </Txt>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <Txt variant="small" weight="bold">
                {program.daysLeft} Hari Lagi
              </Txt>
            </div>
          </div>
        </div>
      </div>

      <Container className="max-w-6xl mx-auto -mt-12 relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Container
              variant="white"
              radius="2xl"
              className="p-8 shadow-xl shadow-black/5 border border-gray-100"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <Txt
                      variant="caption"
                      className="text-gray-400 font-bold uppercase tracking-widest"
                    >
                      Terkumpul
                    </Txt>
                    <Txt
                      variant="h3"
                      weight="bold"
                      className="text-red-primary"
                    >
                      Rp {program.raised.toLocaleString("id-ID")}
                    </Txt>
                  </div>
                  <Txt variant="body" weight="bold" className="text-gray-400">
                    Target: Rp {program.target.toLocaleString("id-ID")}
                  </Txt>
                </div>

                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-primary rounded-full relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <Txt weight="bold" className="text-xl mb-4 block">
                    Tentang Program
                  </Txt>
                  <Txt className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {program.details}
                  </Txt>
                </div>
              </div>
            </Container>

            {/* Data Verification Status */}
            <DataVerification
              status="verified"
              title="Program Terverifikasi"
              description="Dana disalurkan langsung oleh Yayasan Amanah Multi Talenta Indonesia."
            />
          </div>

          {/* Donation Form Sidebar */}
          <div className="space-y-6">
            <Container
              variant="white"
              radius="2xl"
              className="p-8 shadow-xl shadow-black/5 border border-gray-100 sticky top-8"
            >
              <Txt variant="h4" weight="bold" className="mb-6 block">
                Donasi Sekarang
              </Txt>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Rp 50rb", value: 50000 },
                    { label: "Rp 100rb", value: 100000 },
                    { label: "Rp 200rb", value: 200000 },
                    { label: "Rp 500rb", value: 500000 },
                  ].map((amt) => (
                    <button
                      key={amt.label}
                      type="button"
                      onClick={() => setAmount(amt.value)}
                      className="py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:border-red-primary hover:text-red-primary hover:bg-red-50/50 transition-all focus:border-red-primary focus:text-red-primary focus:bg-red-50/50 outline-none"
                    >
                      {amt.label}
                    </button>
                  ))}
                </div>

                <Input
                  label="Nominal Lainnya"
                  placeholder="Masukkan nominal (Min. 10.000)"
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                  error={errors.amount?.message}
                />

                <div className="space-y-4 pt-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Contoh: Hamba Allah"
                    {...register("fullName")}
                    error={errors.fullName?.message}
                  />
                  <Input
                    label="Pesan/Doa"
                    placeholder="Tuliskan doa Anda..."
                    {...register("message")}
                    error={errors.message?.message}
                  />

                  <div className="flex items-center gap-2 px-1">
                    <input
                      type="checkbox"
                      id="anon"
                      className="w-4 h-4 rounded border-gray-300 text-red-primary focus:ring-red-primary"
                      {...register("isAnonymous")}
                    />
                    <label
                      htmlFor="anon"
                      className="text-xs text-gray-500 font-medium cursor-pointer"
                    >
                      Sembunyikan nama saya (Anonim)
                    </label>
                  </div>
                </div>

                <Btn
                  type="submit"
                  variant="red"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full gap-2 mt-4 py-4 rounded-2xl shadow-lg shadow-red-primary/20"
                >
                  <Heart size={20} />
                  Kirim Donasi
                </Btn>

                <Txt
                  variant="caption"
                  className="text-gray-400 text-center block pt-2 italic"
                >
                  "Sebaik-baik manusia adalah yang paling bermanfaat bagi
                  manusia lainnya."
                </Txt>
              </form>
            </Container>
          </div>
        </div>
      </Container>
    </div>
  );
}
