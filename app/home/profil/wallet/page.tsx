import { ProfileWalletTemplate } from "@/app/ui/templates/profile-wallet";
import { MOCK_WALLET_TRANSACTIONS } from "@/app/constants/mockData";

export default function Page() {
  return <ProfileWalletTemplate balance="Rp 2.350.000" transactions={MOCK_WALLET_TRANSACTIONS} />;
}
