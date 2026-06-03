import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, TOKEN_COOKIE } from '@/lib/api';

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get('range') ?? '24h';
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }
  const upstream = await fetch(`${backendUrl()}/api/v1/metrics/history?range=${encodeURIComponent(range)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!upstream.ok) {
    return NextResponse.json({ error: 'Upstream error' }, { status: upstream.status });
  }
  return NextResponse.json(await upstream.json());
}
