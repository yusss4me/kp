import {OwnerAdminCard} from "../molecules/owner-adminCard"
import { Btn } from "../atoms/button"
import { Txt } from "../atoms/text"

interface OwnerAdminPerformProps {
    admin: {
        name: string;
        role: string;
        task: string;
        color: string;
        status: string;
    }[];
}

export const OwnerAdminPerform = ({admin}: OwnerAdminPerformProps) => {
    return (
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <Txt variant="h4" weight="bold" className="text-gray-900">Performa Administrator</Txt>
                    <Txt variant="caption" className="text-gray-400">Ringkasan aktivitas admin dalam 30 hari terakhir</Txt>
                </div>
                <Btn variant="light" size="sm" shape="rounded" className="text-red-primary font-bold">Kelola Admin</Btn>
            </div>

            <OwnerAdminCard admin={admin} />
        </div>
    )
}