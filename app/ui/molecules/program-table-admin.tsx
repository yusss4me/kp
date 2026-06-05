import { Badge } from "../atoms/badge"
import { MoreVertical } from "lucide-react"
import { Table, TBody, TD, TH, THead, TR } from "../atoms/table"
import { Txt } from "../atoms/text"
import { Btn } from "../atoms/button"

interface ProgramTableAdminProps {
    donatur: {
        name: string;
        total: string;
        lastDonation: string;
        status: string;
        
    }[];
}

export const TableAdmin = ({ donatur }: ProgramTableAdminProps) => {
    return (
        <Table>
            <THead>
                <TR>
                    <TH>
                        Nama Donatur
                    </TH>
                    <TH>
                        Total Kontribusi
                    </TH>
                    <TH>
                        Terakhir Donasi
                    </TH>
                    <TH>
                        Status
                    </TH>
                    <TH>
                        Aksi
                    </TH>
                </TR>
            </THead>
            <TBody>
                {donatur.map((donor, index) => (
                    <TR key={index} className="transition-colors hover:bg-gray-50/30">
                        <TD>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-primary/10 flex items-center justify-center text-red-primary font-bold">
                                    {donor.name.charAt(0)}
                                </div>
                                <Txt variant="body" weight="bold">
                                    {donor.name}
                                </Txt>
                            </div>
                        </TD>
                        <TD>
                            <Txt variant="body" weight="bold" className="text-green-success">
                                {donor.total}
                            </Txt>
                        </TD>
                        <TD>
                            <Txt variant="body" weight="medium" className="text-gray-600">
                                {donor.lastDonation}
                            </Txt>
                        </TD>
                        <TD>
                            <Badge color="primary" variant="outline">
                                {donor.status}
                            </Badge>
                        </TD>
                        <TD>
                            <Btn>
                                <MoreVertical size={18} />
                            </Btn>
                        </TD>
                    </TR>
                ))}
            </TBody>
        </Table>
    )
}