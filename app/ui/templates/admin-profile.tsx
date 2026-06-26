import { AdminProfileHeader } from "@/app/ui/organisms/admin-profile-header";
import { AdminProfileMenuGroup } from "@/app/ui/organisms/AdminProfileMenuGroup";

export interface AdminProfileTemplateProps {
  name?: string;
  setName?: (name: string) => void;
  editing?: boolean;
  setEditing?: (editing: boolean) => void;
  onSave?: () => void;
  onLogout?: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  onImageUpload?: () => void;
  /** Statistik admin — diambil dari API dashboard/summary */
  totalDonasi?: string;
  programAktif?: string;
  menungguVerifikasi?: string;
  /** Profile Image URL */
  image?: string;
}

export function AdminProfileTemplate({ onLogout, image, ...props }: AdminProfileTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Pembatas lebar agar konten tidak melar di layar widescreen */}
      <div className="w-full max-w-3xl mx-auto">
        <AdminProfileHeader
          title={props.name || "Administrator"}
          subtitle="Panel Admin YAMUTI"
          image={image || ""}
          totalDonasi={props.totalDonasi ?? "-"}
          programAktif={props.programAktif ?? "-"}
          menungguVerifikasi={props.menungguVerifikasi ?? "-"}
        />
        <AdminProfileMenuGroup onLogout={onLogout} />
      </div>
    </div>
  );
}

