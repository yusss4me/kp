import { Header } from "../ui/organisms/header";
import HeroSlider from "../ui/organisms/landing-heroSlider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-100px)] px-6 py-8 md:py-12 gap-12 md:gap-24 lg:gap-32">
        <div className="w-full max-w-md">
          {children}
        </div>
        <div className="relative w-full max-w-[320px] md:max-w-md lg:max-w-lg aspect-square hidden md:block">
          <HeroSlider
          slide={[
            {
              id: '1',
              src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop', alt: 'Modern Tech Office'
            },
            {
              id: '2',
              src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop', alt: 'Team Working Together'
            },
            {
              id: '3',
              src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop', alt: 'Startup Brainstorming'
            }
          ]}
           />
        </div>
      </div>
    </div>
  );
}
