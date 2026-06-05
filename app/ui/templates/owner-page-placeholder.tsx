import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { LucideIcon, Plus } from "lucide-react";

export interface OwnerPagePlaceholderProps {
  headerTitle: string;
  pageTitle: string;
  pageDescription: string;
  icon: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
}

export function OwnerPagePlaceholder({
  headerTitle,
  pageTitle,
  pageDescription,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  showAddButton = false,
  addButtonLabel = "Tambah",
}: OwnerPagePlaceholderProps) {
  return (
    <DashboardHeader headerTitle={headerTitle}>
      <div className="space-y-6">
        {showAddButton && (
          <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-primary/10 text-red-primary rounded-2xl">
                <Icon size={24} />
              </div>
              <div>
                <Txt variant="h4" weight="bold">
                  {pageTitle}
                </Txt>
                <Txt variant="caption" className="text-gray-400">
                  {pageDescription}
                </Txt>
              </div>
            </div>
            <Btn variant="red" size="md" shape="rounded" className="gap-2">
              <Plus size={18} />
              {addButtonLabel}
            </Btn>
          </div>
        )}

        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
            <Icon size={40} />
          </div>
          <div className="space-y-1">
            <Txt variant="h4" weight="bold" className="text-gray-900">
              {emptyTitle ?? pageTitle}
            </Txt>
            <Txt variant="body" className="text-gray-400">
              {emptyDescription ?? pageDescription}
            </Txt>
          </div>
        </div>
      </div>
    </DashboardHeader>
  );
}
