import { NextResponse } from 'next/server';
import { REFRESH_COOKIE, TOKEN_COOKIE } from '@/lib/api';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(TOKEN_COOKIE);
  res.cookies.delete(REFRESH_COOKIE);
  return res;
}
