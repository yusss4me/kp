import { Txt } from "../atoms/text";
import { OwnerReportCard } from "../molecules/owner-reportCard";
import { Btn } from "../atoms/button";
import { ArrowRight } from "lucide-react";

interface OwnerReportProps {
    reportData: {
        id: string;
        title: string;
        date: string;
        type: string;
        icon: any;
    }[];
}

export const OwnerReport = ({ reportData }: OwnerReportProps) => {
    return (
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col gap-8">
            <div className="space-y-1">
                <Txt variant="h4" weight="bold" className="text-gray-900">Laporan Strategis</Txt>
                <Txt variant="caption" className="text-gray-400">Arsip laporan bulanan yayasan</Txt>
            </div>

            <OwnerReportCard reportData={reportData} />
            <Btn variant="red" size="md" shape="rounded" className="w-full gap-2 py-4">
              Buka Pusat Laporan
              <ArrowRight size={16} />
            </Btn>
        </div>
    )
}