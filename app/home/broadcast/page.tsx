import { DonorBroadcastTemplate } from "@/app/ui/templates/donor-broadcast";
import { MOCK_BROADCAST_TEMPLATES } from "@/app/constants/mockData";

export default function Page() {
  return <DonorBroadcastTemplate templatePesan={MOCK_BROADCAST_TEMPLATES} />;
}
