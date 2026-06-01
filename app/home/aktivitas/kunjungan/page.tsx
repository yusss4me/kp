import { ActivityDetailTemplate } from "@/app/ui/templates/activity-detail-template";

export default async function KunjunganDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ActivityDetailTemplate type="kunjungan" id={id} />;
}
