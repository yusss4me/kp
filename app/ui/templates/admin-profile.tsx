import { AdminProfileHeader } from "@/app/ui/organisms/AdminProfileHeader";
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
}

export function AdminProfileTemplate({ onLogout, ...props }: AdminProfileTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminProfileHeader
        title={props.name || "Administrator"}
        subtitle="Panel Admin YAMUTI"
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
        totalDonasi="Rp 12.5jt"
        programAktif="8"
        menungguVerifikasi="3"
      />
      <AdminProfileMenuGroup onLogout={onLogout} />
    </div>
  );
}
