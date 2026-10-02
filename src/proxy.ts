import { NextRequest, NextResponse } from 'next/server';

export const proxy = (request: NextRequest) => {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const currentPath = request.nextUrl.pathname;

  const isAuthPage = currentPath.startsWith('/login') || currentPath.startsWith('/registration');

  if (!refreshToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (refreshToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
