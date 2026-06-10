import { ProfileHelpTemplate } from "@/app/ui/templates/profile-help";

export default function Page() {
  // API: GET /faq — route belum tersedia di backend (404)
  // const faqs = await fetchFaqs();
  const faqs: { q: string; a: string }[] = [];

  return <ProfileHelpTemplate faqs={faqs} />;
}
