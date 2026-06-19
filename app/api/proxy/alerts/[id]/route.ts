import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, TOKEN_COOKIE } from '@/lib/api';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const upstream = await fetch(`${backendUrl()}/api/v1/alerts/${encodeURIComponent(params.id)}`, {
    method: 'DELETE',
    headers: { Cookie: `${TOKEN_COOKIE}=${token}` },
  });
  return new NextResponse(null, { status: upstream.status });
}
