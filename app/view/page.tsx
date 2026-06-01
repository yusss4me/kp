import { ActivityDetailTemplate } from "../ui/templates/activity-detail-template";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen gap-4 p-10">
      <ActivityDetailTemplate type="kunjungan" />
    </div>
  );
}
