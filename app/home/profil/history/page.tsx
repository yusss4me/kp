import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { History, ChevronLeft, Calendar, Wallet } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const donations = [
    { id: 1, title: "Sedekah Jariyah Masjid", amount: "Rp 100.000", date: "12 Mei 2024", status: "Berhasil" },
    { id: 2, title: "Bantuan Pangan Anak Yatim", amount: "Rp 250.000", date: "05 Mei 2024", status: "Berhasil" },
    { id: 3, title: "Wakaf Al-Qur'an", amount: "Rp 500.000", date: "28 April 2024", status: "Berhasil" },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-primary shadow-sm">
            <History size={32} />
          </div>
          <div>
            <Txt variant="h2" weight="bold" className="text-3xl">Riwayat Donasi</Txt>
            <Txt className="text-gray-500">Lacak semua kontribusi kebaikan yang telah Anda lakukan</Txt>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {donations.map((donation) => (
            <Container key={donation.id} variant="white" radius="xl" padding="lg" shadow="sm" className="border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <Txt weight="bold" className="text-gray-900">{donation.title}</Txt>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-[12px] text-gray-400">
                        <Calendar size={12} />
                        {donation.date}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                        {donation.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Txt weight="bold" className="text-xl text-red-primary">{donation.amount}</Txt>
              </div>
            </Container>
          ))}
        </div>
      </div>
    </Container>
  );
}
