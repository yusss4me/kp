"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Script from "next/script";



function SuccessContent({ programId }: { programId: string }) {
  const searchParams = useSearchParams();
  
  const name = searchParams.get("name") || "Donatur Hamba Allah";
  const amount = searchParams.get("amount") || "0";
  const method = searchParams.get("method") || "-";
  const token = searchParams.get("token");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (token && token !== "Simulasi-Token-123" && (window as any).snap) {
      // Trigger Midtrans Snap popup
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).snap.pay(token, {
        onSuccess: function (result: unknown) {
          console.log("Payment success:", result);
        },
        onPending: function (result: unknown) {
          console.log("Payment pending:", result);
        },
        onError: function (result: unknown) {
          console.error("Payment error:", result);
        },
        onClose: function () {
          console.log("Customer closed the popup without finishing the payment");
        },
      });
    }
  }, [token]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-2xl w-full mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-primary to-red-400" />
      
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>

      <Txt variant="h2" weight="bold" className="text-gray-900 mb-2">
        Donasi Berhasil Dibuat!
      </Txt>
      <Txt variant="body" className="text-gray-500 mb-8 max-w-md mx-auto">
        Terima kasih, <span className="font-semibold text-gray-800">{name}</span>. Niat baik Anda telah kami catat.
      </Txt>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
        <Txt variant="h4" weight="semibold" className="text-gray-800 mb-4 border-b border-gray-200 pb-3">
          Detail Transaksi
        </Txt>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Txt variant="small" className="text-gray-500">Nominal Donasi</Txt>
            <Txt variant="body" weight="bold" className="text-red-primary text-lg">
              Rp {parseInt(amount).toLocaleString('id-ID')}
            </Txt>
          </div>
          
          <div className="flex justify-between items-center">
            <Txt variant="small" className="text-gray-500">Metode Pembayaran</Txt>
            <Txt variant="body" weight="medium" className="text-gray-800 capitalize">
              {method.replace('_', ' ')}
            </Txt>
          </div>

          {token && token !== "Simulasi-Token-123" && (
             <div className="flex justify-between items-center">
               <Txt variant="small" className="text-gray-500">Kode Transaksi / Snap Token</Txt>
               <Txt variant="small" weight="medium" className="text-gray-800 break-all ml-4 text-right">
                 {token}
               </Txt>
             </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/user/aktivitas/program`} className="w-full sm:w-auto">
          <Btn variant="transparent" border="border" borderColor="dark" className="w-full px-8 py-3">
            Donasi Lainnya
          </Btn>
        </Link>
        <Link href="/user" className="w-full sm:w-auto">
          <Btn variant="red" className="w-full px-8 py-3">
            Kembali ke Beranda
          </Btn>
        </Link>
      </div>
    </div>
  );
}

export default function UserSuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-grow flex items-center justify-center pt-10 px-4 pb-24">
      <Container>
        <Suspense fallback={
          <div className="text-center p-12">
            <div className="w-12 h-12 border-4 border-red-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Txt>Memuat detail transaksi...</Txt>
          </div>
        }>
          <SuccessContent programId={params.id} />
        </Suspense>
      </Container>
      
      {/* Load Midtrans Snap Script */}
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || "https://app.sandbox.midtrans.com/snap/snap.js"}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
}
