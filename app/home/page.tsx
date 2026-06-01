import Home from "@/app/ui/templates/home";

export default function Page() {


    return <Home
        user={{
            name: "M. Ardiansyah",
            totalDonasi: 2450000,
            programDibantu: 12,
        }}
        discover={[
            { id: '1', title: 'Pembangunan Masjid Al-Ikhlas', category: 'Pembangunan', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
            { id: '2', title: 'Beasiswa Anak Yatim Piatu', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' },
            { id: '3', title: 'Bantuan Pangan Lansia', category: 'Sosial', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop' }
        ]}
    />;
}