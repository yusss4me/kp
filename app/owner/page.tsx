import { Metadata } from "next";
import { OwnerDashboard } from "@/app/ui/templates/owner-dashboardTemplate";

export const metadata: Metadata = {
  title: "Owner Dashboard | Yamuti Foundation",
  description: "Pengawasan, analitik, dan persetujuan operasional Yayasan Mutiara Titipan Illahi.",
};
import { MOCK_OWNER_USER, MOCK_OWNER_DASHBOARD } from "@/app/constants/mockData";

export default function Page() {
  return (
    <OwnerDashboard
      user={MOCK_OWNER_USER}
      headerTitle="Dashboard Eksekutif"
      {...MOCK_OWNER_DASHBOARD}
    />
  );
}
