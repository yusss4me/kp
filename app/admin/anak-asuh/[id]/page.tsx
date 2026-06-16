import type { Metadata } from "next";
import { ActivityDetailTemplate } from "@/app/ui/templates/activity-detail-template";
import { routes } from "@/app/lib/constants/routes";

export const metadata: Metadata = {
  title: "Detail Anak Asuh",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ActivityDetailTemplate type="anak" id={id} url={routes.admin.anakAsuh.root()} />;
}