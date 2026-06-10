"use client";

import { ProfileWalletTemplate } from "@/app/ui/templates/profile-wallet";

export default function Page() {
  // API: GET /donatur/wallet — route belum tersedia di backend (404)
  // const { data } = useQuery({ queryKey: ['wallet'], queryFn: fetchWallet });
  const balance = "Rp 0";
  const transactions: { id: number; type: "in" | "out"; title: string; amount: string; date: string; status: string }[] = [];

  return <ProfileWalletTemplate balance={balance} transactions={transactions} />;
}
