import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/utils/rate-limit";

/**
 * Validate that the token is a non-empty string with reasonable constraints.
 * Accepts both JWT tokens (header.payload.signature) and Laravel Sanctum
 * plain-text tokens (e.g. "1|a3kR9xLm...").
 *
 * This does NOT verify the token cryptographically — that is the backend's
 * responsibility. It only prevents obviously invalid values from being
 * persisted as cookies.
 */
function isValidTokenFormat(token: string): boolean {
  if (typeof token !== "string") return false;

  const trimmed = token.trim();
  // Must be non-empty and within reasonable length bounds
  if (trimmed.length < 10 || trimmed.length > 4096) return false;

  // Must only contain URL-safe / base64 / Sanctum characters
  // Allowed: alphanumeric, dots, hyphens, underscores, pipes, slashes, plus, equals
  if (!/^[A-Za-z0-9._\-|/+=]+$/.test(trimmed)) return false;

  return true;
}

/**
 * Attempt to extract `exp` from a JWT payload.
 * Returns the expiration timestamp in seconds, or null if the token
 * is not a JWT or has no exp claim.
 */
function tryParseJwtExp(token: string): number | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad === 2) base64 += "==";
    else if (pad === 3) base64 += "=";

    const payload = JSON.parse(atob(base64));
    if (typeof payload?.exp === "number") return payload.exp;
  } catch {
    // Not a JWT or unparseable — that's fine
  }

  return null;
}

/**
 * POST /api/auth/set-cookie
 *
 * Sets httpOnly cookies for auth token and role server-side.
 * Called by the client after successful login.
 * Supports both JWT and Laravel Sanctum plain-text tokens.
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

    // Validate token is a well-formed string (JWT or Sanctum)
    if (!isValidTokenFormat(token)) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 400 });
    }

    // Whitelist allowed roles
    const ALLOWED_ROLES = ["admin", "owner", "donatur"];
    const safeRole = ALLOWED_ROLES.includes(role) ? role : "donatur";

    const isSecure = request.nextUrl.protocol === "https:";

    // Calculate cookie maxAge:
    // - If the token is a JWT with an exp claim, derive from that (capped at 7 days)
    // - Otherwise, default to 1 day
    const DEFAULT_MAX_AGE = 24 * 60 * 60; // 1 day
    const MAX_AGE_CAP = 7 * 24 * 60 * 60; // 7 days
    const exp = tryParseJwtExp(token);
    const nowSec = Math.floor(Date.now() / 1000);
    const maxAge = exp !== null
      ? Math.max(0, Math.min(exp - nowSec, MAX_AGE_CAP))
      : DEFAULT_MAX_AGE;

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

