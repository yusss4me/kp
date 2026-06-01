import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "@/app/ui/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  
  title: "Yamuti Foundation",
  description: "Membangun masa depan yang lebih baik melalui pemberdayaan masyarakat, pendidikan, dan aksi sosial yang berkelanjutan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-red-tertiary selection:text-white">
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
