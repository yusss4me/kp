import { DetailAnak } from "../organisms/activity-detail-anak";
import { DetailProgram } from "../organisms/activity-detail-program";
import { DetailBarang } from "../organisms/activity-detail-barang";
import { DetailKunjungan } from "../organisms/activity-detail-kunjungan";

export interface ActivityDetailTemplateProps {
    type: 'anak' | 'program' | 'barang' | 'kunjungan';
    id?: string;
}

export const ActivityDetailTemplate = ({ type, id }: ActivityDetailTemplateProps) => {
    switch (type) {
        case 'anak':
            return <DetailAnak id={id} />;
        case 'program':
            return <DetailProgram id={id} />;
        case 'barang':
            return <DetailBarang id={id} />;
        case 'kunjungan':
            return <DetailKunjungan id={id} />;
        default:
            return null;
    }
}