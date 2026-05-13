import { Navbar } from "@/app/ui/organisms/navBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Navbar />
            <main className="flex-1 pb-24 md:pb-0">
                {children}
            </main>
        </div>
    )
}