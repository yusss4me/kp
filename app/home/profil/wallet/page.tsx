import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Wallet, ChevronLeft, ArrowUpRight, ArrowDownLeft, History } from "lucide-react";
import Link from "next/link";
import { Btn } from "@/app/ui/atoms/button";

export default function WalletPage() {
  const transactions = [
    { id: 1, type: "out", title: "Donasi Masjid Al-Ikhlas", amount: "Rp 100.000", date: "12 Mei 2024", status: "Selesai" },
    { id: 2, type: "in", title: "Top Up Saldo via BCA", amount: "Rp 500.000", date: "10 Mei 2024", status: "Selesai" },
    { id: 3, type: "out", title: "Donasi Anak Yatim", amount: "Rp 50.000", date: "05 Mei 2024", status: "Selesai" },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="bg-red-primary rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-red-primary/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <Txt className="text-white/70 uppercase tracking-widest text-xs font-bold">Total Dana Tersimpan</Txt>
              <Txt variant="h1" className="text-4xl md:text-5xl font-black">Rp 2.350.000</Txt>
            </div>
            <div className="flex gap-4">
              <Btn variant="light" className="bg-white text-red-primary font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                Top Up
              </Btn>
              <Btn variant="red" className="border border-white/30 px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors">
                Tarik Dana
              </Btn>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Txt variant="h3" weight="bold">Transaksi Terakhir</Txt>
            <Link href="/home/profile/history" className="text-red-primary font-bold text-sm hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="grid gap-4">
            {transactions.map((tx) => (
              <Container key={tx.id} variant="white" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-primary'}`}>
                      {tx.type === 'in' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                    </div>
                    <div>
                      <Txt weight="bold" className="text-gray-900">{tx.title}</Txt>
                      <Txt className="text-gray-400 text-xs mt-0.5">{tx.date} • {tx.status}</Txt>
                    </div>
                  </div>
                  <Txt weight="bold" className={`text-lg ${tx.type === 'in' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'in' ? '+' : '-'}{tx.amount}
                  </Txt>
                </div>
              </Container>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
