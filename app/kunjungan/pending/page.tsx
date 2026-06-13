"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ArrowLeft, CheckCircle, Clock, Calendar, Info, MapPin } from "lucide-react";
import { getKunjunganById } from "@/app/lib/api/services/kunjungan";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";

export default function VisitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!params.id) return;
      try {
        const visit = await getKunjunganById(params.id as string);
        setData(visit);
      } catch (error) {
        console.error("Failed to fetch visit detail", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <LandingHeader />
        <div className="flex-grow flex items-center justify-center">
          <Txt variant="h4" className="text-gray-400">Memuat detail kunjungan...</Txt>
        </div>
        <LandingFooter />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <LandingHeader />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <Txt variant="h4" className="text-gray-800 mb-4">Kunjungan tidak ditemukan</Txt>
          <Btn onClick={() => router.push("/")} variant="red" size="md">Kembali ke Beranda</Btn>
        </div>
        <LandingFooter />
      </main>
    );
  }

  const isPending = data.status === "pending" || data.status === "Menunggu";
  const statusColor = isPending ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700";
  const statusIcon = isPending ? <Clock size={20} className="text-amber-600" /> : <CheckCircle size={20} className="text-green-600" />;
  const statusText = isPending ? "Menunggu Persetujuan" : "Kunjungan Disetujui";
  const visitDate = new Date(data.slot_waktu);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <div className="flex-grow max-w-3xl w-full mx-auto pt-24 px-4 pb-20">
        <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-red-primary mb-6 transition-colors"
        >
            <div className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={16} /></div>
            <Txt weight="bold" className="text-sm">Kembali ke Beranda</Txt>
        </button>

        <Container className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 p-0 relative">
          
          {/* Header Status */}
          <div className="bg-gray-50 p-8 border-b border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Calendar size={120} />
            </div>
            
            <div className="flex justify-center mb-6 relative z-10">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${statusColor}`}>
                {isPending ? <Clock size={40} /> : <CheckCircle size={40} />}
              </div>
            </div>
            
            <Txt variant="h3" weight="bold" className="text-gray-800 mb-2 relative z-10">
              {statusText}
            </Txt>
            <Txt variant="body" className="text-gray-500 max-w-md mx-auto relative z-10">
              {isPending 
                ? "Pengajuan Anda telah kami terima dan sedang dalam proses peninjauan. Kami akan menghubungi Anda segera."
                : "Pengajuan kunjungan Anda telah disetujui. Kami menantikan kehadiran Anda!"}
            </Txt>
          </div>

          {/* Body Detail */}
          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Jadwal Info */}
              <div className="flex-1 bg-red-50 p-6 rounded-2xl border border-red-100/50 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-red-500">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <Txt variant="caption" className="text-gray-500 font-medium">Tanggal Kunjungan</Txt>
                    <Txt variant="h5" weight="bold" className="text-gray-800">
                      {format(visitDate, "dd MMMM yyyy", { locale: idLocale })}
                    </Txt>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-red-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <Txt variant="caption" className="text-gray-500 font-medium">Waktu Kunjungan</Txt>
                    <Txt variant="h5" weight="bold" className="text-gray-800">
                      {format(visitDate, "HH:mm")} WIB
                    </Txt>
                  </div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gray-400"><Info size={18} /></div>
                  <div>
                    <Txt variant="caption" className="text-gray-500">Nama Pengunjung</Txt>
                    <Txt variant="body" weight="bold" className="text-gray-800">{data.nama_pengunjung || "Anonim"}</Txt>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gray-400"><MapPin size={18} /></div>
                  <div>
                    <Txt variant="caption" className="text-gray-500">Tujuan Kunjungan</Txt>
                    <Txt variant="body" weight="bold" className="text-gray-800">{data.tujuan_kunjungan}</Txt>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Txt variant="caption" className="text-gray-400 text-center block">
                ID Kunjungan: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{params.id}</span>
              </Txt>
            </div>
          </div>
        </Container>
      </div>

      <LandingFooter />
    </main>
  );
}
