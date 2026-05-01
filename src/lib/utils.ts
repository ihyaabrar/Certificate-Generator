import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function formatDate(date?: Date): string {
  const d = date ?? new Date();
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[/\\:*?"<>|]/g, '').trim().replace(/\s+/g, '_');
}

// Pad number with leading zeros
export function padNumber(n: number, digits = 3): string {
  return String(n).padStart(digits, '0');
}
