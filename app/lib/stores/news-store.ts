import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { News, FoundationProfile } from "@/app/lib/types/entities";
import { generateId } from "@/app/lib/utils/crud-helpers";

interface NewsStore {
  news: News[];
  foundationProfile: FoundationProfile | null;
  error: string | null;

  getNewsById: (id: string) => News | undefined;
  addNews: (data: Omit<News, "id">) => string;
  updateNews: (id: string, data: Partial<News>) => void;
  deleteNews: (id: string) => void;

  updateFoundationProfile: (data: FoundationProfile) => void;
}

export const useNewsStore = create<NewsStore>()(
  persist(
    (set, get) => ({
      news: [],
      foundationProfile: null,
      error: null,

      getNewsById: (id) => get().news.find((n) => n.id === id),

      addNews: (data) => {
        const id = generateId("news-");
        set((s) => ({ news: [{ ...data, id }, ...s.news] }));
        return id;
      },

      updateNews: (id, data) => {
        set((s) => ({
          news: s.news.map((n) => (n.id === id ? { ...n, ...data } : n)),
        }));
      },

      deleteNews: (id) => {
        set((s) => ({ news: s.news.filter((n) => n.id !== id) }));
      },

      updateFoundationProfile: (data) => {
        set({ foundationProfile: data });
      },
    }),
    { name: "yamuti-news" }
  )
);
