import { Txt } from "../atoms/text";

interface OwnerReportCardProps {
    reportData: {
        id: string;
        title: string;
        date: string;
        type: string;
        icon: any;
    }[];
}

export const OwnerReportCard = ({reportData}: OwnerReportCardProps) => {
    return (
        <div className="flex-grow space-y-2">
            {reportData.map((report, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-red-primary/5 transition-all cursor-pointer border border-transparent hover:border-red-primary/10">
                    <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-red-primary group-hover:bg-white transition-all shadow-sm">
                        <report.icon size={18} />
                    </div>
                    <div className="space-y-0.5">
                        <Txt variant="small" weight="bold" className="text-gray-800 group-hover:text-red-primary transition-colors">{report.title}</Txt>
                        <div className="flex items-center gap-2">
                            <Txt variant="caption" className="text-gray-400">{report.date}</Txt>
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-bold uppercase tracking-wider">{report.type}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}