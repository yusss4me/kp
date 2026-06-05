import { ProfileTemplate } from "@/app/ui/templates/profile";
import { Container } from "@/app/ui/atoms/container";
import { PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";
import { MOCK_PROFILE_USER } from "@/app/constants/mockData";

export default function Page() {
  return (
    <Container className="min-h-screen bg-gray-50/50 md:py-10">
      <ProfileTemplate
        user={MOCK_PROFILE_USER}
        amountProgramUser="10"
        amountVisitUser="10"
        amountDonatedUser="10"
        listMenu={PROFILE_MENU_GROUPS}
        isFlyout={false}
      />
    </Container>
  );
}
