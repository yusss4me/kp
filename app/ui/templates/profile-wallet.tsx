import { ProfileSubpageTemplate } from "./profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Link from "next/link";

export interface WalletTransaction {
  id: number;
  type: "in" | "out";
  title: string;
  amount: string;
  date: string;
  status: string;
}

export interface ProfileWalletTemplateProps {
  balance: string;
  transactions: WalletTransaction[];
}

export function ProfileWalletTemplate({ balance, transactions }: ProfileWalletTemplateProps) {
  return (
    <ProfileSubpageTemplate
      backHref="/home/profil"
      title="Dana Tersimpan"
      description="Kelola saldo dan riwayat transaksi dompet donasi"
      icon={Wallet}
    >
      <div className="bg-red-primary rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-red-primary/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <Txt className="text-white/70 uppercase tracking-widest text-xs font-bold">Total Dana Tersimpan</Txt>
            <Txt variant="h1" className="text-4xl md:text-5xl font-black">
              {balance}
            </Txt>
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
          <Txt variant="h3" weight="bold">
            Transaksi Terakhir
          </Txt>
          <Link href="/home/profil/history" className="text-red-primary font-bold text-sm hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="grid gap-4">
          {transactions.map((tx) => (
            <Container key={tx.id} variant="white" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === "in" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-primary"}`}>
                    {tx.type === "in" ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                  </div>
                  <div>
                    <Txt weight="bold" className="text-gray-900">
                      {tx.title}
                    </Txt>
                    <Txt className="text-gray-400 text-xs mt-0.5">
                      {tx.date} • {tx.status}
                    </Txt>
                  </div>
                </div>
                <Txt weight="bold" className={`text-lg ${tx.type === "in" ? "text-green-600" : "text-gray-900"}`}>
                  {tx.type === "in" ? "+" : "-"}
                  {tx.amount}
                </Txt>
              </div>
            </Container>
          ))}
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
