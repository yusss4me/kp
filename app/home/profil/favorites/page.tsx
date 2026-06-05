import { ProfileFavoritesTemplate } from "@/app/ui/templates/profile-favorites";
import { MOCK_FAVORITE_ITEMS } from "@/app/constants/mockData";

export default function Page() {
  return <ProfileFavoritesTemplate items={MOCK_FAVORITE_ITEMS} />;
}
