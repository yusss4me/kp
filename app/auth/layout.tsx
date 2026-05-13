import { Header } from "../ui/organisms/header";
import HeroSlider from "../ui/organisms/hero-slider";

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
          <HeroSlider />
        </div>
      </div>
    </div>
  );
}
