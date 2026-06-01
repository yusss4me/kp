import { ProfileTemplate } from "@/app/ui/templates/profile";
import { Container } from "@/app/ui/atoms/container";
import { PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";

export default function Page() {
    return (
        <Container className="min-h-screen bg-gray-50/50 md:py-10">
            <ProfileTemplate
                user={{
                    name: "Abdullah",
                    role: "Admin",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }}
                amountProgramUser="10"
                amountVisitUser="10"
                amountDonatedUser="10"
                listMenu={PROFILE_MENU_GROUPS}
                className=""
                isFlyout={false}
            />
        </Container>
    )
}