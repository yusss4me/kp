import { ProfileHistoryTemplate } from "@/app/ui/templates/profile-history";
import { MOCK_DONATION_HISTORY } from "@/app/constants/mockData";

export default function Page() {
  return <ProfileHistoryTemplate donations={MOCK_DONATION_HISTORY} />;
}
