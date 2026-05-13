import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { Txt } from '@/app/ui/atoms/text';
import { Globe } from 'lucide-react';

export default function FoundationPage() {
  return (
    <DashboardTemplate headerTitle="Profil Yayasan">
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col items-center justify-center min-h-[500px] text-center gap-4">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <Globe size={40} />
           </div>
           <div className="space-y-1">
              <Txt variant="h4" weight="bold" className="text-gray-900">Konfigurasi Profil Yayasan</Txt>
              <Txt variant="body" className="text-gray-400">Pengaturan identitas institusi, visi, dan misi yayasan.</Txt>
           </div>
        </div>
    </DashboardTemplate>
  );
}
