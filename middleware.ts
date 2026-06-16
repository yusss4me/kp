import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Decode JWT payload without verification (edge-compatible).
 * Only decodes the payload to check expiry — actual signature
 * verification happens on the backend.
 */
function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64url decode the payload
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token has expired based on its `exp` claim.
 * Returns true if expired or if the token cannot be decoded.
 */
function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return true;

  // Add 30-second buffer for clock skew
  return Date.now() >= (payload.exp - 30) * 1000;
}

/**
 * Middleware (Next.js)
 *
 * Route protection untuk halaman admin, owner, dan home (donatur).
 * - /admin dan /owner: redirect ke /auth (login admin) jika belum login atau role salah.
 * - /home: redirect ke /auth/donatur (login donatur) jika belum login atau role salah.
 * Memeriksa keberadaan dan validitas cookie auth sebelum mengizinkan akses.
 * Now validates JWT expiry instead of just checking cookie existence.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('yamuti-auth-token')?.value;
  const role = request.cookies.get('yamuti-auth-role')?.value;

  const isAdminRoute = pathname.startsWith('/admin');
  const isOwnerRoute = pathname.startsWith('/owner');
  const isHomeRoute = pathname.startsWith('/home');

  // ── HOME (Donatur) Routes ──────────────────────────────────────────
  if (isHomeRoute) {
    // Belum login → redirect ke login donatur
    if (!token) {
      const loginUrl = new URL('/auth/donatur', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token expired → clear cookies, redirect ke login donatur
    if (isTokenExpired(token)) {
      const loginUrl = new URL('/auth/donatur', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'session_expired');

      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('yamuti-auth-token', '', { maxAge: 0, path: '/' });
      response.cookies.set('yamuti-auth-role', '', { maxAge: 0, path: '/' });
      return response;
    }

    // RBAC: Hanya role donatur yang boleh akses /home
    if (role !== 'donatur') {
      // Admin/owner yang mencoba akses /home → redirect ke dashboard mereka
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      if (role === 'owner') {
        return NextResponse.redirect(new URL('/owner', request.url));
      }
      // Role tidak dikenali → paksa login ulang donatur
      const loginUrl = new URL('/auth/donatur', request.url);
      loginUrl.searchParams.set('reason', 'invalid_role');
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ── ADMIN / OWNER Routes ───────────────────────────────────────────
  const isAdminOrOwnerRoute = isAdminRoute || isOwnerRoute;

  if (isAdminOrOwnerRoute) {
    // Belum login → redirect ke login admin
    if (!token) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token expired → clear cookies, redirect ke login admin
    if (isTokenExpired(token)) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'session_expired');

      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('yamuti-auth-token', '', { maxAge: 0, path: '/' });
      response.cookies.set('yamuti-auth-role', '', { maxAge: 0, path: '/' });
      return response;
    }

    // RBAC: Admin hanya bisa akses /admin
    if (isAdminRoute && role !== 'admin') {
      if (role === 'owner') {
        return NextResponse.redirect(new URL('/owner', request.url));
      }
      if (role === 'donatur') {
        return NextResponse.redirect(new URL('/home', request.url));
      }
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // RBAC: Owner hanya bisa akses /owner
    if (isOwnerRoute && role !== 'owner') {
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      if (role === 'donatur') {
        return NextResponse.redirect(new URL('/home', request.url));
      }
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
  }

  // Bukan rute yang dilindungi → lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/owner/:path*', '/home/:path*'],
};
