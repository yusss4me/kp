import Home from "@/app/ui/templates/home";

export default function Page() {


    return <Home
        user={{
            name: "M. Ardiansyah",
            totalDonasi: 2450000,
            programDibantu: 12,
        }}
    />;
}