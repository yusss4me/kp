import type { Metadata } from "next";
import { DonationFormTemplate } from "@/app/ui/templates/donation-form";

export const metadata: Metadata = {
  title: "Form Donasi",
  description: "Isi formulir donasi Anda untuk mendukung program-program Yayasan Mutiara Titipan Ilahi.",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DonationFormTemplate activityId={id} />;
}
