import { OwnerPagePlaceholder } from "@/app/ui/templates/owner-page-placeholder";
import { OWNER_PLACEHOLDER_PAGES } from "@/app/lib/constants/placeholder-pages";

export default function Page() {
  const config = OWNER_PLACEHOLDER_PAGES.foundation;

  return (
    <OwnerPagePlaceholder
      headerTitle={config.title}
      pageTitle={config.title}
      pageDescription={config.description}
      icon={config.icon}
    />
  );
}
