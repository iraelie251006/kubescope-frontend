import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, parseSetCookie, REFRESH_COOKIE, TOKEN_COOKIE } from '@/lib/api';

// Match backend defaults (ACCESS_EXPIRATION_MS=900000, REFRESH_EXPIRATION_MS=604800000).
// Keep in sync if backend timings change.
const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${backendUrl()}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const setCookies = upstream.headers.getSetCookie();
  const accessToken = parseSetCookie(setCookies, TOKEN_COOKIE);
  const refreshToken = parseSetCookie(setCookies, REFRESH_COOKIE);

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: 'Backend returned no tokens' }, { status: 502 });
  }

  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === 'production';
  res.cookies.set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_TTL_SECONDS,
  });
  res.cookies.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_TOKEN_TTL_SECONDS,
  });
  return res;
}
