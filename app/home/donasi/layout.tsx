import { ActivityHeader } from "@/app/ui/organisms/activityHeader";
import { Container } from "@/app/ui/atoms/container";



export default function Layout({ children }: { children: React.ReactNode }) {

    return(
        <Container className="flex flex-col gap-6 pb-24">
            {/* <ActivityHeader/> */}
            <Container >
            {children}
            </Container>
        </Container>
    )
}