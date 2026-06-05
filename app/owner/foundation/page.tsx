import { OwnerPagePlaceholder } from "@/app/ui/templates/owner-page-placeholder";
import { OWNER_PLACEHOLDER_PAGES } from "@/app/constants/mockData";

export default function Page() {
  const config = OWNER_PLACEHOLDER_PAGES.foundation;
  return (
    <OwnerPagePlaceholder
      headerTitle="Profil Yayasan"
      pageTitle={config.title}
      pageDescription={config.description}
      icon={config.icon}
    />
  );
}
