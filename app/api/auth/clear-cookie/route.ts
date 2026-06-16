import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/utils/rate-limit";

/**
 * POST /api/auth/clear-cookie
 *
 * Clears httpOnly auth cookies server-side.
 * Called by the client on logout.
 */
export async function POST(request: NextRequest) {
  // Rate limit: max 20 requests per minute per IP
  const limited = rateLimit(request, { limit: 20, windowMs: 60_000 });
  if (limited) return limited;

  const isSecure = request.nextUrl.protocol === "https:";
  const response = NextResponse.json({ success: true });

  response.cookies.set("yamuti-auth-token", "", {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  response.cookies.set("yamuti-auth-role", "", {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
