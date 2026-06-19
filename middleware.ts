import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TOKEN_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get(TOKEN_COOKIE);
  const refreshToken = req.cookies.get(REFRESH_COOKIE);

  if (pathname === '/login') {
    if (accessToken) {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (accessToken) {
    return NextResponse.next();
  }

  // Access token expired or missing — try silent refresh before bouncing to login.
  //
  // Known race: concurrent expired requests will each attempt to refresh, and
  // the backend's refresh-token family treats subsequent attempts as reuse and
  // revokes the family. Mostly hits after a long idle with multiple tabs. A
  // single-flight lock would fix it but needs shared state across edge invocations.
  if (refreshToken) {
    const refreshUrl = req.nextUrl.clone();
    refreshUrl.pathname = '/api/auth/refresh';
    refreshUrl.search = '';

    try {
      const refreshRes = await fetch(refreshUrl, {
        method: 'POST',
        headers: { Cookie: `${REFRESH_COOKIE}=${refreshToken.value}` },
      });
      if (refreshRes.ok) {
        const response = NextResponse.next();
        for (const header of refreshRes.headers.getSetCookie()) {
          response.headers.append('Set-Cookie', header);
        }
        return response;
      }
    } catch {
      // fall through to login redirect
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
