import { ActivityDetailTemplate } from "@/app/ui/templates/activity-detail-template";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ActivityDetailTemplate type="program" id={id} />;
}
