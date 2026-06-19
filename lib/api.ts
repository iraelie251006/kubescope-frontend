import { cookies } from 'next/headers';

export const TOKEN_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080';

export function backendUrl(): string {
  return BACKEND_URL;
}

export function parseSetCookie(setCookies: string[], name: string): string | null {
  const prefix = `${name}=`;
  for (const c of setCookies) {
    if (c.startsWith(prefix)) {
      const end = c.indexOf(';');
      return decodeURIComponent(c.slice(prefix.length, end === -1 ? undefined : end));
    }
  }
  return null;
}

export async function serverGet<T>(path: string): Promise<T> {
  const token = cookies().get(TOKEN_COOKIE)?.value;
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: token ? { Cookie: `${TOKEN_COOKIE}=${token}` } : {},
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} on GET ${path}`);
  }
  return (await res.json()) as T;
}
