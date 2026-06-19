import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, TOKEN_COOKIE } from '@/lib/api';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const body = await req.text();
  const upstream = await fetch(`${backendUrl()}/api/v1/alerts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${TOKEN_COOKIE}=${token}`,
    },
    body,
  });
  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') ?? 'application/json' },
  });
}
