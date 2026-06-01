import { Txt } from "../atoms/text";

interface OwnerAdminCardProps {
    admin: {
        name: string;
        role: string;
        task: string;
        color: string;
        status: string;
    }[];
}

export const OwnerAdminCard = ({admin}: OwnerAdminCardProps) => {
    return (
        <div className="space-y-4">
            {admin.map((admin, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-red-primary/20 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${admin.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                            {admin.name.split(' ')[2]?.[0] || admin.name[0]}
                        </div>
                        <div>
                            <Txt variant="small" weight="bold" className="text-gray-900">{admin.name}</Txt>
                            <div className="flex items-center gap-2">
                                <Txt variant="caption" className="text-gray-400">{admin.role}</Txt>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <Txt variant="caption" className={admin.status === 'Aktif' ? 'text-success font-medium' : 'text-gray-400'}>{admin.status}</Txt>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <Txt variant="small" weight="bold" className="text-red-primary">{admin.task}</Txt>
                        <Txt variant="caption" className="text-gray-400">Log Aktivitas</Txt>
                    </div>
                </div>
            ))}
        </div>
    )
}