import { DashboardTemplate } from '@/app/ui/organisms/DashboardHeader';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Plus, ShieldCheck } from 'lucide-react';

export default function AdminsPage() {
   return (
      <DashboardTemplate headerTitle="Manajemen Administrator">
         <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-primary/10 text-red-primary rounded-2xl">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <Txt variant="h4" weight="bold">Daftar Administrator</Txt>
                     <Txt variant="caption" className="text-gray-400">Kelola hak akses dan akun tim yayasan</Txt>
                  </div>
               </div>
               <Btn variant="red" size="md" shape="rounded" className="gap-2">
                  <Plus size={18} />
                  Tambah Admin
               </Btn>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <ShieldCheck size={40} />
               </div>
               <div className="space-y-1">
                  <Txt variant="h4" weight="bold" className="text-gray-900">Belum Ada Data Admin Terperinci</Txt>
                  <Txt variant="body" className="text-gray-400">Daftar admin sedang dalam proses pengembangan.</Txt>
               </div>
            </div>
         </div>
      </DashboardTemplate>
   );
}
