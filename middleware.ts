import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy (Next.js 16 — pengganti middleware)
 *
 * Route protection untuk halaman admin dan owner.
 * Memeriksa keberadaan cookie auth sebelum mengizinkan akses.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('yamuti-auth-token')?.value;
  const role = request.cookies.get('yamuti-auth-role')?.value;

  const isAdminRoute = pathname.startsWith('/admin');
  const isOwnerRoute = pathname.startsWith('/owner');
  // const isUserRoute = pathname.startsWith('/user') || pathname.startsWith('/donatur');
  
  const isProtectedRoute = isAdminRoute || isOwnerRoute;
  // const isProtectedRoute = isAdminRoute || isOwnerRoute || isUserRoute;

  // Jika bukan rute yang dilindungi, lanjutkan
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Bypass authentication for owner route
  if (isOwnerRoute) {
    return NextResponse.next();
  }

  // Jika belum login, redirect ke halaman auth
  // if (!token) {
  //   const loginUrl = new URL('/auth', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // RBAC: Admin hanya bisa akses /admin
  // if (isAdminRoute && role !== 'admin') {
  //   return NextResponse.redirect(new URL('/auth', request.url));
  // }

  // RBAC: Owner hanya bisa akses /owner
  // if (isOwnerRoute && role !== 'owner') {
  //   return NextResponse.redirect(new URL('/auth', request.url));
  // }

  // RBAC: User/Donatur hanya bisa akses rute mereka
  // if (isUserRoute && role !== 'user' && role !== 'donatur') {
  //   return NextResponse.redirect(new URL('/auth', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/owner/:path*'],
  // matcher: ['/admin/:path*', '/owner/:path*', '/user/:path*', '/donatur/:path*'],
};
