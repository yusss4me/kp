import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // No URL prefix — locale is stored in cookie only
  localePrefix: "never",
});
