import { ProfileContactTemplate } from "@/app/ui/templates/profile-contact";

export default function Page() {
  return (
    <ProfileContactTemplate
      contact={{
        email: "halo@yamuti.org",
        phone: "+62 812 3456 7890",
        address: "Jakarta, Indonesia",
      }}
    />
  );
}
