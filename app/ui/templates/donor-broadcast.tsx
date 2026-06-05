import { BroadcastEditor } from "@/app/ui/organisms/BroadcastEditor";

export interface DonorBroadcastTemplateProps {
  templatePesan: { nama_template: string; isi: string }[];
}

export function DonorBroadcastTemplate({ templatePesan }: DonorBroadcastTemplateProps) {
  return (
    <div className="mx-auto">
      <BroadcastEditor templatePesan={templatePesan} />
    </div>
  );
}
