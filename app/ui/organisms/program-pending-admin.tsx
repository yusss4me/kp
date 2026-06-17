"use client";

import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { DataVerification } from "../molecules/DataVerification";
import { Clock } from "lucide-react";

interface PendingDonationAdminProps {
    donations: {
        id: string;
        nama: string;
        description: string;
        tipe: string;
        jumlah: string;
        tanggal: string;
    }[];
    onVerify?: (id: string) => void;
    onReject?: (id: string) => void;
}

export const PendingDonationAdmin = ({ donations, onVerify, onReject }: PendingDonationAdminProps) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 px-2">
                <Clock size={20} className="text-blue-600" />
                <Txt variant="h4" weight="bold">
                    Donasi Perlu Verifikasi
                </Txt>
                <Badge color="info" variant="solid" className="ml-2">
                    {donations.length} Baru
                </Badge>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {
                    donations.map((donation) => (
                        <DataVerification
                            key={donation.id}
                            isAdmin
                            status="pending"
                            title={donation.nama}
                            description={donation.description}
                            onVerify={() => onVerify?.(donation.id)}
                            onReject={() => onReject?.(donation.id)}
                            className="bg-white shadow-sm border-gray-100"
                        />
                    ))
                }
                
            </div>
        </section>
    );
}