import { ProfilePaymentTemplate, paymentMethodIcon } from "@/app/ui/templates/profile-payment";
import { MOCK_PAYMENT_METHODS } from "@/app/constants/mockData";

export default function Page() {
  return (
    <ProfilePaymentTemplate
      methods={MOCK_PAYMENT_METHODS.map((m) => ({
        ...m,
        icon: paymentMethodIcon(m.type),
      }))}
    />
  );
}
