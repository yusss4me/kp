import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Wallet, ChevronLeft, Plus, CreditCard, Landmark } from "lucide-react";
import Link from "next/link";
import { Btn } from "@/app/ui/atoms/button";

export default function PaymentPage() {
  const methods = [
    { id: 1, type: "Card", provider: "Bank BCA", number: "**** 1234", icon: <Landmark size={24} /> },
    { id: 2, type: "E-Wallet", provider: "GoPay", number: "0812 **** 5678", icon: <Wallet size={24} /> },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-primary shadow-sm">
              <CreditCard size={32} />
            </div>
            <div>
              <Txt variant="h2" weight="bold" className="text-3xl">Metode Pembayaran</Txt>
              <Txt className="text-gray-500">Kelola sumber dana untuk donasi Anda</Txt>
            </div>
          </div>
          <Btn variant="red" className="gap-2 px-6 rounded-2xl shadow-lg shadow-red-primary/20">
            <Plus size={20} /> Tambah Metode
          </Btn>
        </div>

        <div className="grid gap-6">
          {methods.map((method) => (
            <Container key={method.id} variant="white" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-red-primary/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-primary transition-colors">
                  {method.icon}
                </div>
                <div>
                  <Txt weight="bold" className="text-lg">{method.provider}</Txt>
                  <Txt className="text-gray-400">{method.number}</Txt>
                </div>
              </div>
              <Txt className="text-red-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">Kelola</Txt>
            </Container>
          ))}
        </div>
      </div>
    </Container>
  );
}
