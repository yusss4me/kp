import { ProfileHelpTemplate } from "@/app/ui/templates/profile-help";
import { MOCK_FAQS } from "@/app/constants/mockData";

export default function Page() {
  return <ProfileHelpTemplate faqs={MOCK_FAQS} />;
}
