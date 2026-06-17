import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { CreditCard, Plus, Wallet, Landmark } from "lucide-react";
import { ReactNode } from "react";

export interface PaymentMethodItem {
  id: number;
  type: string;
  provider: string;
  number: string;
  icon: ReactNode;
}

export interface ProfilePaymentTemplateProps {
  methods: PaymentMethodItem[];
}

export function ProfilePaymentTemplate({ methods }: ProfilePaymentTemplateProps) {
  return (
    <ProfileSubpageTemplate
      backHref="/home/profil"
      title="Metode Pembayaran"
      description="Kelola sumber dana untuk donasi Anda"
      icon={CreditCard}
    >
      <div className="flex justify-end">
        <Btn variant="red" className="gap-2 px-6 rounded-2xl shadow-lg shadow-red-primary/20">
          <Plus size={20} /> Tambah Metode
        </Btn>
      </div>

      <div className="grid gap-6">
        {methods.map((method) => (
          <Container key={method.id} variant="light" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-red-primary/30 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-primary transition-colors">
                {method.icon}
              </div>
              <div>
                <Txt weight="bold" className="text-lg">
                  {method.provider}
                </Txt>
                <Txt className="text-gray-400">{method.number}</Txt>
              </div>
            </div>
            <Txt className="text-red-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">Kelola</Txt>
          </Container>
        ))}
      </div>
    </ProfileSubpageTemplate>
  );
}

export function paymentMethodIcon(type: string) {
  return type === "Card" ? <Landmark size={24} /> : <Wallet size={24} />;
}
