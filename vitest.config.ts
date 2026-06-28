import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "app/lib/**/*.{ts,tsx}",
        "app/ui/**/*.{ts,tsx}",
      ],
      exclude: [
        "app/lib/**/*.test.{ts,tsx}",
        "app/lib/**/__tests__/**",
        "app/lib/types/**",
        "app/lib/constants/**",
        "app/ui/providers/**",
      ],
      thresholds: {
        lines: 30,
        functions: 25,
        branches: 25,
        statements: 30,
      },
    },
    exclude: ["tests/**", "node_modules/**", "node_modules_old/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
