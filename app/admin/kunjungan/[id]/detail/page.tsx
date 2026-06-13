import { ActivityDetailTemplate } from "@/app/ui/templates/activity-detail-template";
import { routes } from "@/app/lib/constants/routes";

export default function Page() {
  return <ActivityDetailTemplate type="kunjungan" id="1" url={routes.admin.kunjungan.root()} />;
}
