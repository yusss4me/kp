import { AdminProfileHeader } from "@/app/ui/organisms/admin-profile-header";
import { AdminProfileMenuGroup } from "@/app/ui/organisms/AdminProfileMenuGroup";

export interface AdminProfileTemplateProps {
  name?: string;
  setName?: (name: string) => void;
  editing?: boolean;
  setEditing?: (editing: boolean) => void;
  isPreview?: boolean;
  setIsPreview?: (preview: boolean) => void;
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
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
        <AdminProfileHeader
          title={props.name || "Administrator"}
          subtitle="Panel Admin YAMUTI"
          image={image || ""}
          totalDonasi={props.totalDonasi ?? "-"}
          programAktif={props.programAktif ?? "-"}
          menungguVerifikasi={props.menungguVerifikasi ?? "-"}
          editing={props.editing}
          setEditing={props.setEditing}
          isPreview={props.isPreview}
          setIsPreview={props.setIsPreview}
          name={props.name}
          setName={props.setName}
          onSave={props.onSave}
          onImageUpload={props.onImageUpload}
        />
        <AdminProfileMenuGroup onLogout={onLogout} />
      </div>
    </div>
  );
}

