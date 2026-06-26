import { DetailProgram } from "@/app/ui/organisms/activity-detail-program";
import { DetailKunjungan } from "@/app/ui/organisms/activity-detail-kunjungan";
import { DetailAnak } from "@/app/ui/organisms/activity-detail-anak";

export interface ActivityDetailTemplateProps {
    type: 'program' | 'kunjungan' | 'anak';
    id?: string;
    url: string;
    /** Context-aware donate URL for program CTA (only used when type='program') */
    donateUrl?: string;
    isAdmin?: boolean;
}

export const ActivityDetailTemplate = ({ type, url, id, donateUrl, isAdmin }: ActivityDetailTemplateProps) => {
    switch (type) {
        case 'program':
            return <DetailProgram url={url} id={id} donateUrl={donateUrl} />;
        case 'kunjungan':
            return <DetailKunjungan url={url} id={id} isAdmin={isAdmin} />;
        case 'anak':
            return <DetailAnak url={url} id={id} />;
        default:
            return null;
    }
}