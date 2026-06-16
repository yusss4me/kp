import type { Metadata } from "next";
import { ActivityDetailTemplate } from "@/app/ui/templates/activity-detail-template";

export const metadata: Metadata = {
  title: "UI Showcase",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ActivityDetailTemplate type="kunjungan" id="1" url="/kunjungan" />
    </div>
  );
}
