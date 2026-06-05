import { AdminBroadcastTemplate } from "@/app/ui/templates/admin-broadcast";
import { MOCK_ADMIN_BROADCAST_STATS, MOCK_ADMIN_BROADCAST_TEMPLATES } from "@/app/constants/mockData";

export default function Page() {
  return <AdminBroadcastTemplate stats={MOCK_ADMIN_BROADCAST_STATS} templates={MOCK_ADMIN_BROADCAST_TEMPLATES} />;
}
