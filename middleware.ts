import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('authToken');

  // Protected routes
  const protectedPaths = ['/profile', '/contribute'];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // If not logged in and accessing a protected route, redirect with redirectTo param
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/contribute/:path*'],
};
