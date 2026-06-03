export function formatUsd(value: number | null | undefined, options: { fractionDigits?: number } = {}): string {
  if (value == null) return '—';
  const { fractionDigits = 2 } = options;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '—';
  return `${value.toFixed(1)}%`;
}

export function formatMillicores(m: number | null | undefined): string {
  if (m == null) return '—';
  if (m >= 1000) return `${(m / 1000).toFixed(2)} cores`;
  return `${m}m`;
}

export function formatBytes(bytes: number | null | undefined): string {
  if (bytes == null) return '—';
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export function ratio(part: number | null | undefined, total: number | null | undefined): number {
  if (!part || !total) return 0;
  return Math.min(1, part / total);
}
