import { cookies } from 'next/headers';

export const TOKEN_COOKIE = 'kubescope_token';
export const REFRESH_COOKIE = 'kubescope_refresh';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080';

export function backendUrl(): string {
  return BACKEND_URL;
}

export async function serverGet<T>(path: string): Promise<T> {
  const token = cookies().get(TOKEN_COOKIE)?.value;
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} on GET ${path}`);
  }
  return (await res.json()) as T;
}
