import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * NOTE: In serverless/edge environments, this store is per-instance and resets
 * on cold starts. For production-grade rate limiting, use a distributed store
 * like Redis or Upstash. This provides a basic protection layer against
 * brute-force and spam on auth endpoints.
 */
export function rateLimit(
  request: NextRequest,
  options: { limit?: number; windowMs?: number } = {}
): NextResponse | null {
  const { limit = 10, windowMs = 60_000 } = options; // default: 10 requests per minute

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return null; // allowed
  }

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  entry.count++;
  return null; // allowed
}
