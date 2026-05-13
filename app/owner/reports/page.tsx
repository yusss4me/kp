import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { Txt } from '@/app/ui/atoms/text';
import { FilePieChart } from 'lucide-react';

export default function ReportsPage() {
  return (
    <DashboardTemplate headerTitle="Laporan Strategis">
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col items-center justify-center min-h-[500px] text-center gap-4">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <FilePieChart size={40} />
           </div>
           <div className="space-y-1">
              <Txt variant="h4" weight="bold" className="text-gray-900">Pusat Laporan Eksekutif</Txt>
              <Txt variant="body" className="text-gray-400">Halaman analisis laporan keuangan dan operasional sedang disiapkan.</Txt>
           </div>
        </div>
    </DashboardTemplate>
  );
}
