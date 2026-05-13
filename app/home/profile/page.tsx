import { ProfileTemplate } from "@/app/ui/templates/profile";
import { Container } from "@/app/ui/atoms/container";

export default function Page() {
    return (
        <Container className="min-h-screen bg-gray-50/50 md:py-10">
            <ProfileTemplate />
        </Container>
    )
}