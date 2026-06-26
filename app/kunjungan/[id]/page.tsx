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
import { DetailKunjungan } from "@/app/ui/organisms/activity-detail-kunjungan";

export default function VisitDetailPage() {
  const params = useParams();
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <div className="flex-grow max-w-3xl w-full mx-auto pb-20">
        <DetailKunjungan id={params.id as string} url="/" />
      </div>

      <LandingFooter />
    </main>
  );
}
