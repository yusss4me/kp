import { ProgramSectionAdmin } from "../organisms/program-section-admin"
import { DashboardHeader } from "../organisms/DashboardHeader"
import { Txt } from "../atoms/text"
import { Btn } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { StatCard } from "../molecules/StatCard"
import { Filter, Plus, Search, DollarSign, Clock, Link, MoreVertical } from "lucide-react"
import { Lnk } from "@/app/ui/atoms/link"
import { DataVerification } from "../molecules/dataVerification"
import { Heart, Users } from "lucide-react"
import { PendingDonationAdmin } from "../organisms/program-pending-admin"
import { ProgramsSection } from "../organisms/programs-section"
import { ProgramTableAdmin } from "../organisms/program-table-admin"

interface AdminProgramTemplateProps {
    programs: {
        id: string;
        title: string;
        target: string;
        collected: string;
        progress: number;
    }[];
    donations: {
        id: string;
        nama: string;
        description: string;
        tipe: string;
        jumlah: string;
        tanggal: string;
    }[];
    donatur: {
        name: string;
        total: string;
        lastDonation: string;
        status: string;
    }[];
}

interface AdminProgramTemplateExtendedProps extends AdminProgramTemplateProps {
    onVerifyDonation?: (id: string) => void;
    onRejectDonation?: (id: string) => void;
    onDeleteProgram?: (id: string) => void;
}

export const AdminProgramTemplate = ({
    programs,
    donations,
    donatur,
    onVerifyDonation,
    onRejectDonation,
    onDeleteProgram,
}: AdminProgramTemplateExtendedProps) => {
    return (
        <DashboardHeader headerTitle="Manajemen Donasi">
              <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                  <div className="space-y-1">
                    <Txt
                      variant="h3"
                      weight="bold"
                      className="text-gray-900 tracking-tight"
                    >
                      Portal Donasi & Donatur
                    </Txt>
                    <Txt variant="body" className="text-gray-500">
                      Kelola program donasi dan pantau kontribusi dari para donatur
                      setia.
                    </Txt>
                  </div>
                  <Lnk href="/admin/donasi/tambah-donasi">
                    <Btn
                      variant="red"
                      shape="circle"
                      className="gap-2 px-8 shadow-lg shadow-red-primary/20"
                    >
                      <Plus size={20} />
                      Program Baru
                    </Btn>
                  </Lnk>
                </div>
        
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    label="Total Donasi"
                    value="Rp 150M"
                    icon={Heart}
                    color="primary"
                    trend={{ value: 8, isUp: true }}
                  />
                  <StatCard
                    label="Donatur Aktif"
                    value="342"
                    icon={Users}
                    color="info"
                    trend={{ value: 12, isUp: true }}
                  />
                  <StatCard
                    label="Bulan Ini"
                    value="Rp 12.5M"
                    icon={DollarSign}
                    color="success"
                    trend={{ value: 5, isUp: true }}
                  />
                  <StatCard
                    label="Target Program"
                    value="85%"
                    icon={Filter}
                    color="secondary"
                  />
                </div>
        
                {/* Pending Verification Section */}
                <PendingDonationAdmin
                  donations={donations}
                  onVerify={onVerifyDonation}
                  onReject={onRejectDonation}
                />
        
                {/* Programs Section */}
                <ProgramSectionAdmin programs={programs} onDeleteProgram={onDeleteProgram} />
        
                {/* Donors List Table */}
                <ProgramTableAdmin donatur={donatur} />
              </div>
            </DashboardHeader>
    )
}

