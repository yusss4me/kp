import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Info, ChevronLeft, Heart, Users, Target, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Btn } from "@/app/ui/atoms/button";

export default function AboutPage() {
  const stats = [
    { label: "Anak Yatim", value: "1,200+", icon: <Users size={24} /> },
    { label: "Donatur Aktif", value: "5,000+", icon: <Heart size={24} /> },
    { label: "Program Terlaksana", value: "150+", icon: <Target size={24} /> },
    { label: "Penghargaan", value: "12", icon: <Award size={24} /> },
  ];

  return (
    <Container className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <Image 
            src="/images/landing-3.png" 
            alt="YAMUTI Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <Txt weight="bold" className="text-white text-4xl md:text-5xl">Tentang YAMUTI</Txt>
            <Txt className="text-white/80 text-lg mt-2">Yayasan Mutiara Ummat Indonesia - Menebar Kebaikan, Menggapai Berkah</Txt>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <Txt variant="h3" weight="bold" className="text-2xl text-red-primary">Visi Kami</Txt>
            <Txt className="text-gray-600 leading-relaxed text-lg">
              Menjadi lembaga filantropi Islam terdepan yang profesional, transparan, dan amanah dalam memberdayakan umat, khususnya anak-anak yatim dan dhuafa di seluruh penjuru Indonesia.
            </Txt>
          </div>
          <div className="space-y-6">
            <Txt variant="h3" weight="bold" className="text-2xl text-red-primary">Misi Kami</Txt>
            <ul className="space-y-4">
              {[
                "Memberikan pendidikan berkualitas bagi anak yatim.",
                "Menyalurkan donasi secara tepat sasaran dan transparan.",
                "Membangun kemandirian ekonomi umat melalui program pemberdayaan.",
                "Menginspirasi gaya hidup berbagi di masyarakat modern."
              ].map((misi, i) => (
                <li key={i} className="flex gap-3 text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-primary shrink-0" />
                  {misi}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-red-primary mb-3">{stat.icon}</div>
              <Txt weight="bold" className="text-2xl text-gray-900">{stat.value}</Txt>
              <Txt className="text-gray-500 text-sm">{stat.label}</Txt>
            </div>
          ))}
        </div>

        <div className="bg-red-50 p-8 md:p-12 rounded-3xl text-center border border-red-100">
          <Txt variant="h3" weight="bold" className="text-2xl text-red-primary mb-4">Mari Bergabung Bersama Kami</Txt>
          <Txt className="text-gray-600 max-w-2xl mx-auto mb-8">
            Setiap bantuan Anda sangat berarti bagi masa depan mereka. Mari terus menebar benih kebaikan bersama YAMUTI.
          </Txt>
          <Link href="/home/donasi">
            <Btn className="bg-red-primary text-white px-10 py-4 font-bold shadow-xl shadow-red-primary/30 rounded-xl hover:scale-105 transition-transform">
              Mulai Berdonasi
            </Btn>
          </Link>
        </div>
      </div>
    </Container>
  );
}
