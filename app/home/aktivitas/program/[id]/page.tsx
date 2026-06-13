import { ActivityDetailTemplate } from "@/app/ui/templates/activity-detail-template";
import { routes } from "@/app/lib/constants/routes";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ActivityDetailTemplate type="program" url={routes.user.aktivitas.program.donation(id)} id={id} />;
}
