// Vitest setup file
// Mock next/navigation
import { vi } from "vitest";

// Mock global fetch for cookie API routes (httpOnly cookie endpoints)
const originalFetch = globalThis.fetch;
globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

  // Mock cookie API routes
  if (url === "/api/auth/set-cookie" || url === "/api/auth/clear-cookie") {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Pass through other fetches to original (if available)
  return originalFetch(input, init);
}) as typeof globalThis.fetch;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, ...rest } = props;
    return `<img src="${src}" alt="${alt}" />`;
  },
}));
