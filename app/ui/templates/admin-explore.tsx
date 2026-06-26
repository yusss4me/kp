"use client";

import { useState, useMemo } from "react";
import { Txt } from "@/app/ui/atoms/text";
import { SearchGroup } from "@/app/ui/molecules/search-group";
import { routes } from "@/app/lib/constants/routes";
import { useRouter } from "next/navigation";
import { Btn } from "@/app/ui/atoms/button";

import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useOrphanStore } from "@/app/lib/stores/orphan-store";
import { useInventoryStore } from "@/app/lib/stores/inventory-store";
import { useFinanceStore } from "@/app/lib/stores/finance-store";
import { useNewsStore } from "@/app/lib/stores/news-store";

export type AdminExploreRole = "admin" | "super_admin";

export interface AdminExploreTemplateProps {
  className?: string;
  role: AdminExploreRole;
}

type TabType = "all" | "program" | "anak" | "inventaris" | "keuangan" | "cms";

export function AdminExploreTemplate({ className = "", role }: AdminExploreTemplateProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const programs = useYamutiStore((s) => s.programs);
  const orphans = useOrphanStore((s) => s.orphans);
  const inventory = useInventoryStore((s) => s.inventory);
  const transactions = useFinanceStore((s) => s.transactions);
  const news = useNewsStore((s) => s.news);

  const q = searchQuery.trim().toLowerCase();

  const filteredPrograms = useMemo(() => {
    if (!q) return programs;
    return programs.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [programs, q]);

  const filteredOrphans = useMemo(() => {
    if (!q) return orphans;
    return orphans.filter((o) => o.name.toLowerCase().includes(q) || o.status.toLowerCase().includes(q));
  }, [orphans, q]);

  const filteredInventory = useMemo(() => {
    if (!q) return inventory;
    return inventory.filter((i) => i.name.toLowerCase().includes(q) || i.status.toLowerCase().includes(q));
  }, [inventory, q]);

  const filteredFinance = useMemo(() => {
    if (!q) return transactions;
    return transactions.filter((t) => t.type.toLowerCase().includes(q) || t.amount.toLowerCase().includes(q) || (t.category && t.category.toLowerCase().includes(q)));
  }, [transactions, q]);

  const filteredNews = useMemo(() => {
    if (!q) return news;
    return news.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [news, q]);

  // Routing helper
  const basePath = role === "super_admin" ? routes.super_admin : routes.admin;

  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "Semua" },
    { id: "program", label: "Program" },
    { id: "anak", label: "Anak Asuh" },
    { id: "inventaris", label: "Inventaris" },
    { id: "keuangan", label: "Keuangan" },
    { id: "cms", label: "Berita/CMS" },
  ];

  return (
    <div className={`flex flex-col gap-8 pb-24 ${className}`}>
      {/* Search Header */}
      <div className="bg-red-primary p-8 rounded-b-[40px] shadow-xl">
        <Txt variant="h4" weight="bold" color="light" className="mb-6">
          Pencarian Global
        </Txt>
        <SearchGroup
          placeholder="Cari data program, anak asuh, inventaris, keuangan, dll..."
          onSearch={(val) => setSearchQuery(val)}
        />
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-red-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="px-6 space-y-8">
        {!q && (
          <Txt variant="body" className="text-gray-500 italic">
            Ketik kata kunci di atas untuk mencari data. Menampilkan semua data secara default.
          </Txt>
        )}

        {/* PROGRAM */}
        {(activeTab === "all" || activeTab === "program") && filteredPrograms.length > 0 && (
          <section>
            <Txt variant="h5" weight="bold" className="mb-4">Program ({filteredPrograms.length})</Txt>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPrograms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    if (role === "admin") {
                      router.push(routes.admin.program.edit(p.id));
                    }
                  }}
                  className="p-4 border rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow bg-white"
                >
                  <Txt weight="bold">{p.title}</Txt>
                  <Txt variant="body" weight="bold" className="text-lightdark-tertiary">{p.category}</Txt>
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">Program</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ANAK ASUH */}
        {(activeTab === "all" || activeTab === "anak") && filteredOrphans.length > 0 && (
          <section>
            <Txt variant="h5" weight="bold" className="mb-4">Anak Asuh ({filteredOrphans.length})</Txt>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredOrphans.map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    if (role === "admin") {
                      router.push(routes.admin.anakAsuh.edit(o.id));
                    }
                  }}
                  className="p-4 border rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow bg-white"
                >
                  <Txt weight="bold">{o.name}</Txt>
                  <Txt variant="small" className="text-gray-500">Status: {o.status}</Txt>
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Anak Asuh</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INVENTARIS */}
        {(activeTab === "all" || activeTab === "inventaris") && filteredInventory.length > 0 && (
          <section>
            <Txt variant="h5" weight="bold" className="mb-4">Inventaris ({filteredInventory.length})</Txt>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredInventory.map((i) => (
                <div
                  key={i.id}
                  onClick={() => {
                    if (role === "admin") {
                      router.push(routes.admin.inventaris.edit(i.id));
                    }
                  }}
                  className="p-4 border rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow bg-white"
                >
                  <Txt variant="body" weight="bold">{i.name}</Txt>
                  <Txt variant="small" className="text-lightdark-neutral">Kondisi: {i.status}</Txt>
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full">Inventaris</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* KEUANGAN */}
        {(activeTab === "all" || activeTab === "keuangan") && filteredFinance.length > 0 && (
          <section>
            <Txt variant="h5" weight="bold" className="mb-4">Keuangan ({filteredFinance.length})</Txt>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredFinance.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    if (role === "admin") {
                      router.push(routes.admin.keuangan.root());
                    }
                  }}
                  className="p-4 border rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow bg-white"
                >
                  <Txt weight="bold">{t.type} - {t.amount}</Txt>
                  <Txt variant="small" className="text-gray-500 truncate">{t.category || "Tanpa deskripsi"}</Txt>
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Keuangan</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CMS / BERITA */}
        {(activeTab === "all" || activeTab === "cms") && filteredNews.length > 0 && (
          <section>
            <Txt variant="h5" weight="bold" className="mb-4">Berita/CMS ({filteredNews.length})</Txt>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredNews.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (role === "admin") {
                      router.push(routes.admin.cms.berita());
                    }
                  }}
                  className="p-4 border rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow bg-white"
                >
                  <Txt weight="bold" className="truncate">{n.title}</Txt>
                  <Txt variant="small" className="text-gray-500 line-clamp-2">{n.content}</Txt>
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">Berita/CMS</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NO RESULTS */}
        {filteredPrograms.length === 0 &&
          filteredOrphans.length === 0 &&
          filteredInventory.length === 0 &&
          filteredFinance.length === 0 &&
          filteredNews.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <Txt variant="body">Tidak ada data yang cocok dengan pencarian Anda.</Txt>
            </div>
          )}
      </div>
    </div>
  );
}
