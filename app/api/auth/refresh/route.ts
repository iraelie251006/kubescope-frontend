import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, parseSetCookie, REFRESH_COOKIE, TOKEN_COOKIE } from '@/lib/api';

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${backendUrl()}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { Cookie: `${REFRESH_COOKIE}=${refreshToken}` },
    });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }

  if (!upstream.ok) {
    const res = NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
    res.cookies.delete(TOKEN_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    return res;
  }

  const setCookies = upstream.headers.getSetCookie();
  const newAccess = parseSetCookie(setCookies, TOKEN_COOKIE);
  const newRefresh = parseSetCookie(setCookies, REFRESH_COOKIE);

  if (!newAccess || !newRefresh) {
    return NextResponse.json({ error: 'Backend returned no tokens' }, { status: 502 });
  }

  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === 'production';
  res.cookies.set(TOKEN_COOKIE, newAccess, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_TTL_SECONDS,
  });
  res.cookies.set(REFRESH_COOKIE, newRefresh, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: REFRESH_TOKEN_TTL_SECONDS,
  });
  return res;
}
