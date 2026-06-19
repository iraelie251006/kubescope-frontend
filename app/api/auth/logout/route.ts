import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, REFRESH_COOKIE, TOKEN_COOKIE } from '@/lib/api';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  if (token) {
    // Revoke the refresh-token family on the backend; ignore failures so the
    // browser still drops its cookies and the user is signed out locally.
    try {
      await fetch(`${backendUrl()}/api/v1/auth/logout`, {
        method: 'POST',
        headers: { Cookie: `${TOKEN_COOKIE}=${token}` },
      });
    } catch {
      // intentional
    }
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(TOKEN_COOKIE);
  res.cookies.delete(REFRESH_COOKIE);
  return res;
}
