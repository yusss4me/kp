import { DetailProgram } from "../organisms/activity-detail-program";
import { DetailKunjungan } from "../organisms/activity-detail-kunjungan";
import { DetailAnak } from "../organisms/activity-detail-anak";

export interface ActivityDetailTemplateProps {
    type: 'program' | 'kunjungan' | 'anak';
    id?: string;
    url: string;
}

export const ActivityDetailTemplate = ({ type, url, id }: ActivityDetailTemplateProps) => {
    switch (type) {
        case 'program':
            return <DetailProgram url={url} id={id} />;
        case 'kunjungan':
            return <DetailKunjungan url={url} id={id} />;
        case 'anak':
            return <DetailAnak url={url} id={id} />;
        default:
            return null;
    }
}