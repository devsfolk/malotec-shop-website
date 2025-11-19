import { NextResponse, type NextRequest } from 'next/server';
import { getAdminPassword } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const passwordCookie = request.cookies.get('malotec-admin-password')?.value;
  const adminPassword = getAdminPassword();

  const isAuthenticated = passwordCookie === adminPassword;

  const isDashboardPath = pathname.startsWith('/dmalo/dashboard');
  const isLoginPage = pathname === '/dmalo';

  // If trying to access the dashboard without being authenticated, redirect to login
  if (isDashboardPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/dmalo', request.url));
  }

  // If trying to access the login page while already authenticated, redirect to dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dmalo/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dmalo/:path*'],
};
