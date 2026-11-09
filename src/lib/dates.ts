// Date formatting in British academic style: "11 July 2025", "15–19 June 2026",
// "29 June – 3 July 2026". Inputs are ISO strings; no time zones are involved.

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parts(iso: string): { y: number; m: number; d?: number } {
  const match = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(iso);
  if (!match) throw new Error(`Invalid ISO date: ${iso}`);
  return { y: Number(match[1]), m: match[2] ? Number(match[2]) : 1, d: match[3] ? Number(match[3]) : undefined };
}

export function formatDate(iso: string): string {
  const { y, m, d } = parts(iso);
  return d ? `${d} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1]} ${y}`;
}

export function formatDateShort(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d ?? ''} ${MONTHS_SHORT[m - 1]} ${y}`.trim();
}

export function formatMonth(iso: string): string {
  const { y, m } = parts(iso);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatDateRange(start: string, end?: string): string {
  if (!end || end === start) return formatDate(start);
  const a = parts(start);
  const b = parts(end);
  if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${MONTHS[a.m - 1]} ${a.y}`;
  if (a.y === b.y) return `${a.d} ${MONTHS[a.m - 1]} – ${b.d} ${MONTHS[b.m - 1]} ${a.y}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

const COUNTRY_SHORT: Record<string, string> = { 'United States': 'USA', 'United Kingdom': 'UK' };
export const countryShort = (country: string): string => COUNTRY_SHORT[country] ?? country;
