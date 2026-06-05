import { Txt } from "../atoms/text"
import { Search } from "lucide-react"
import { Badge } from "../atoms/badge"
import { MoreVertical } from "lucide-react"
import { Table, TBody, TD, TH, THead, TR } from "../atoms/table"
import { TableAdmin } from "../molecules/program-table-admin"

export interface ProgramTableAdminProps {
    donatur: {
        name: string;
        total: string;
        lastDonation: string;
        status: string;
    }[];
}   

export const ProgramTableAdmin = ({ donatur }: ProgramTableAdminProps) => {
    return (
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Txt variant="h4" weight="bold">
                      Program Donatur Teratas
                    </Txt>
                    <div className="relative w-full md:w-80">
                      <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Cari donatur..."
                        className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-primary/20 text-sm font-medium transition-all"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <TableAdmin donatur={donatur} />
                  </div>
                </div>
    );
}