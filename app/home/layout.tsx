import { Navbar } from "@/app/ui/organisms/navBar";
import { HandCoins, MessageCircleMore, Heart, User } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Navbar
                user={{ name: "M. Ardiansyah", role: "Donatur Tetap", image: "/logo/yamuti.png" }}
                amountProgramUser="5156"
                amountVisitUser="12"
                amountDonatedUser="Rp.1.123.456"
                className=""
            />
            <main className="flex-1 pb-24 md:pb-0">
                {children}
            </main>
        </div>
    )
}