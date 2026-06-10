import { BroadcastEditor } from "@/app/ui/organisms/BroadcastEditor";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";

export interface DonorBroadcastTemplateProps {
  templatePesan: { nama_template: string; isi: string }[];
  user?: {
    name: string;
    role: string;
  };
}

export function DonorBroadcastTemplate({
  templatePesan,
  user = { name: "Donatur Yamuti", role: "Donatur" },
}: DonorBroadcastTemplateProps) {
  return (
    <DashboardHeader
      user={user}
      headerTitle="Broadcast Pesan"
      portalLabel="Portal Donatur"
    >
      <BroadcastEditor templatePesan={templatePesan} />
    </DashboardHeader>
  );
}
