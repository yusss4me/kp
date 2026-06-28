import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "@/app/ui/globals.css";
import { ToastProvider } from "@/app/ui/providers/toast-provider";
import { QueryProvider } from "@/app/ui/providers/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yamuti.or.id"),
  title: {
    default: "Yamuti Foundation — Yayasan Mutiara Titipan Ilahi",
    template: "%s | Yamuti Foundation",
  },
  description:
    "Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata bagi sesama yang membutuhkan. Yayasan Mutiara Titipan Ilahi, Tasikmalaya.",
  keywords: [
    "donasi",
    "yayasan",
    "panti asuhan",
    "yamuti",
    "tasikmalaya",
    "program sosial",
    "kunjungan",
    "charity",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Yamuti Foundation",
    title: "Yamuti Foundation — Yayasan Mutiara Titipan Ilahi",
    description:
      "Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata.",
    images: ["/images/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yamuti Foundation",
    description: "Donasi transparan, berdampak nyata.",
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-red-tertiary selection:text-white">

        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ToastProvider>
              <div id="main-content" className="flex-grow" tabIndex={-1}>
                {children}
              </div>
            </ToastProvider>
          </QueryProvider>
        </NextIntlClientProvider>
        <Script 
          src="https://app.sandbox.midtrans.com/snap/snap.js" 
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-T0E4y-123456"}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
