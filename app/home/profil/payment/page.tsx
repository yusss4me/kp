"use client";

import { ProfilePaymentTemplate, paymentMethodIcon } from "@/app/ui/templates/profile-payment";

export default function Page() {
  // API: GET /donatur/payment-methods — route belum tersedia di backend (404)
  // const { data: methods } = useQuery({ queryKey: ['payment-methods'], queryFn: fetchPaymentMethods });
  const methods: { id: number; type: string; provider: string; number: string; icon: ReturnType<typeof paymentMethodIcon> }[] = [];

  return (
    <ProfilePaymentTemplate
      methods={methods.map((m) => ({
        ...m,
        icon: paymentMethodIcon(m.type),
      }))}
    />
  );
}
