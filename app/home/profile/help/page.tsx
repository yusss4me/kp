import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { HelpCircle, ChevronLeft, Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/app/ui/atoms/input";

export default function HelpPage() {
  const faqs = [
    { q: "Bagaimana cara melakukan donasi?", a: "Anda dapat memilih program di halaman Discover, klik 'Donasi Sekarang', dan pilih metode pembayaran." },
    { q: "Apakah donasi saya terverifikasi?", a: "Ya, Yamuti memastikan setiap program telah melalui verifikasi ketat dan laporan penyaluran dikirimkan secara berkala." },
    { q: "Bagaimana cara mencairkan saldo dana?", a: "Anda dapat mengajukan penarikan dana melalui menu Wallet, yang akan diproses dalam 1-3 hari kerja." },
    { q: "Lupa kata sandi akun?", a: "Gunakan fitur 'Lupa Kata Sandi' di halaman masuk untuk mengatur ulang akses akun Anda." },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm mx-auto">
            <HelpCircle size={32} />
          </div>
          <div className="space-y-2">
            <Txt variant="h2" weight="bold" className="text-3xl">Pusat Bantuan</Txt>
            <Txt className="text-gray-500">Cari solusi atau pelajari lebih lanjut tentang Yamuti</Txt>
          </div>
          <div className="relative max-w-xl mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Cari bantuan..." 
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-red-primary/50 focus:ring-4 focus:ring-red-primary/5 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Txt variant="h4" weight="bold" className="px-1">Pertanyaan Populer</Txt>
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <Container key={i} variant="white" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 cursor-pointer group hover:border-red-primary/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Txt weight="bold" className="text-gray-900 group-hover:text-red-primary transition-colors">{faq.q}</Txt>
                    <Txt className="text-gray-500 text-sm line-clamp-1">{faq.a}</Txt>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-red-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Container>
            ))}
          </div>
        </div>

        <Container variant="red" radius="2xl" padding="xl" className="text-center text-white space-y-4 shadow-xl shadow-red-primary/20">
          <Txt variant="h4" weight="bold">Masih butuh bantuan?</Txt>
          <Txt className="text-white/80">Tim kami siap membantu Anda secara langsung via chat atau email.</Txt>
          <Link href="/home/profile/contact" className="inline-block px-8 py-4 bg-white text-red-primary font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform mt-2">
            Hubungi Tim Support
          </Link>
        </Container>
      </div>
    </Container>
  );
}
