import React from "react";
import { Txt } from "../atoms/text";
import { Container } from "../atoms/container";
import { Bell, Search, User } from "lucide-react";

interface DashboardTemplateProps {
  children: React.ReactNode;
  headerTitle: string;
}

export const DashboardTemplate = ({
  children,
  headerTitle,
}: DashboardTemplateProps) => {
  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Top Header Section */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 md:px-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="space-y-0.5">
            <Txt
              variant="caption"
              className="text-gray-400 font-bold uppercase tracking-widest"
            >
              Portal Manajemen
            </Txt>
            <Txt variant="h4" weight="bold" className="text-gray-900">
              {headerTitle}
            </Txt>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:flex p-2.5 rounded-2xl bg-gray-50 text-gray-400 hover:text-red-primary hover:bg-red-primary/5 transition-all">
              <Search size={20} />
            </button>
            <button className="relative p-2.5 rounded-2xl bg-gray-50 text-gray-400 hover:text-red-primary hover:bg-red-primary/5 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-8 bg-gray-100 mx-1 hidden sm:block"></div>
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="w-9 h-9 rounded-xl bg-red-primary flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <Txt variant="small" weight="bold" className="leading-none">
                  Admin Yamuti
                </Txt>
                <Txt variant="caption" className="text-gray-400">
                  Super Administrator
                </Txt>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-6 py-8 md:px-10 max-w-7xl mx-auto">{children}</div>
    </main>
  );
};
