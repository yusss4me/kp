import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/utils/rate-limit";

/**
 * Validate JWT format (header.payload.signature).
 * Does NOT verify the signature — that is the backend's responsibility.
 * Only ensures the token is structurally valid before setting it as a cookie.
 */
function isValidJwtFormat(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Verify each part is valid base64url
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(payload);
    const parsed = JSON.parse(decoded);
    // Must have exp claim
    return typeof parsed === "object" && parsed !== null && typeof parsed.exp === "number";
  } catch {
    return false;
  }
}

/**
 * POST /api/auth/set-cookie
 *
 * Sets httpOnly cookies for auth token and role server-side.
 * Called by the client after successful login.
 */
export async function POST(request: NextRequest) {
  // Rate limit: max 20 cookie-set requests per minute per IP
  const limited = rateLimit(request, { limit: 20, windowMs: 60_000 });
  if (limited) return limited;

  try {
    const body = await request.json();
    const { token, role } = body as { token: string; role: string };

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Validate JWT structure before persisting
    if (!isValidJwtFormat(token)) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 400 });
    }

    // Whitelist allowed roles
    const ALLOWED_ROLES = ["admin", "owner", "donatur"];
    const safeRole = ALLOWED_ROLES.includes(role) ? role : "donatur";

    const isSecure = request.nextUrl.protocol === "https:";

    // Parse JWT exp to calculate accurate maxAge
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    const nowSec = Math.floor(Date.now() / 1000);
    const maxAge = Math.max(0, Math.min(payload.exp - nowSec, 7 * 24 * 60 * 60)); // cap at 7 days

    const response = NextResponse.json({ success: true });

    response.cookies.set("yamuti-auth-token", token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    response.cookies.set("yamuti-auth-role", safeRole, {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
