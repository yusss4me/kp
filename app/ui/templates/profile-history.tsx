import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { History, Calendar, Wallet } from "lucide-react";

export interface DonationHistoryItem {
  id: number;
  title: string;
  amount: string;
  date: string;
  status: string;
}

export interface ProfileHistoryTemplateProps {
  donations: DonationHistoryItem[];
}

export function ProfileHistoryTemplate({ donations }: ProfileHistoryTemplateProps) {
  return (
    <ProfileSubpageTemplate
      backHref="/user/profil"
      title="Riwayat Donasi"
      description="Lacak semua kontribusi kebaikan yang telah Anda lakukan"
      icon={History}
      iconClassName="bg-red-50 text-red-primary"
    >
      <div className="flex flex-col gap-4">
        {donations.map((donation) => (
          <Container key={donation.id} variant="light" radius="xl" padding="lg" shadow="sm" className="border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Wallet size={24} />
                </div>
                <div>
                  <Txt weight="bold" className="text-gray-900">
                    {donation.title}
                  </Txt>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[12px] text-gray-400">
                      <Calendar size={12} />
                      {donation.date}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                      {donation.status}
                    </span>
                  </div>
                </div>
              </div>
              <Txt weight="bold" className="text-xl text-red-primary">
                {donation.amount}
              </Txt>
            </div>
          </Container>
        ))}
      </div>
    </ProfileSubpageTemplate>
  );
}
