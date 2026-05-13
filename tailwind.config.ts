/** @type {import('tailwindcss').Config} */
export default {
  // NOTE: Tailwind v4 is CSS-first. 
  // Custom theme configuration has been migrated to app/ui/globals.css using the @theme block.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
}