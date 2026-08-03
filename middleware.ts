import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TOKEN_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';

/**
 * A single navigation fans out into several middleware invocations: the request
 * for the page itself, plus a speculative prefetch for every link the router
 * decides to warm up. The prefetches are what made refreshing dangerous — a
 * handful fire at once, and if each tried to renew an expired session they
 * would all present the same refresh token. The backend reads the repeats as
 * token reuse, revokes the whole family, and the user gets logged out by the
 * very mechanism meant to keep them signed in.
 *
 * Only a real navigation may spend the refresh token. That leaves exactly one
 * refresh in flight per navigation, because the router issues either a document
 * request or an RSC request for the destination — never both at once.
 */
function isPrefetch(req: NextRequest): boolean {
  const h = req.headers;
  return (
    h.get('next-router-prefetch') !== null ||
    h.get('purpose') === 'prefetch' ||
    h.get('x-purpose') === 'prefetch' ||
    (h.get('sec-purpose') ?? '').includes('prefetch')
  );
}

function redirectToLogin(req: NextRequest, clearSession: boolean) {
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = '';
  const res = NextResponse.redirect(url);
  if (clearSession) {
    res.cookies.delete(TOKEN_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
  }
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get(TOKEN_COOKIE);
  const refreshToken = req.cookies.get(REFRESH_COOKIE);

  if (pathname === '/' || pathname === '/login') {
    if (accessToken && pathname === '/login') {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (accessToken) {
    return NextResponse.next();
  }

  // Never spend the refresh token on a guess about where the user might click.
  // Failing a prefetch closed costs nothing: the router discards the result and
  // the navigation that follows performs the one real refresh.
  if (isPrefetch(req)) {
    return new NextResponse(null, { status: 401 });
  }

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

      // Only a 401 means the token itself was rejected — already rotated,
      // expired, or revoked. Drop it then, rather than let the next request
      // present it again: a dead token replayed on every navigation is what
      // turns one bad refresh into a wedged session.
      //
      // Anything else (notably the 502 this route returns when the backend is
      // down) is infrastructure, not credentials. Keep the cookies — discarding
      // a good session over a transient outage is the worse failure.
      return redirectToLogin(req, refreshRes.status === 401);
    } catch {
      // Never reached today, since the refresh route catches its own fetch
      // failures, but a genuine edge-runtime error shouldn't cost the session.
      return redirectToLogin(req, false);
    }
  }

  return redirectToLogin(req, false);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
