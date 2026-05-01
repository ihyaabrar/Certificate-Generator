import { v4 as uuidv4 } from 'uuid';
import type { NumberingConfig, Recipient } from '@/src/types';

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

export function padNumber(n: number, digits = 3): string {
  return String(n).padStart(digits, '0');
}

// ─── Certificate Number Generation ───────────────────────────────────────────

export function generateCertNumber(config: NumberingConfig, index: number): string {
  const seq = padNumber(config.startFrom + index, config.digits);
  if (config.mode === 'auto') {
    return seq;
  }
  // custom: prefix + seq + suffix
  const prefix = config.prefix ? `${config.prefix}/` : '';
  const suffix = config.suffix ? `/${config.suffix}` : '';
  return `${prefix}${seq}${suffix}`;
}

export function regenerateCertNumbers(
  recipients: Recipient[],
  config: NumberingConfig
): Recipient[] {
  return recipients.map((r, i) => ({
    ...r,
    certificateNumber: generateCertNumber(config, i),
  }));
}

// ─── Excel/CSV Parser ─────────────────────────────────────────────────────────

export interface ParsedRow {
  name: string;
  customFields: Record<string, string>;
}

export async function parseExcelFile(file: File): Promise<ParsedRow[]> {
  // Dynamic import SheetJS
  const XLSX = await import('xlsx');
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: 'array' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });

  return rows.map(row => {
    // Find name column (case-insensitive: nama, name, Nama, NAME)
    const nameKey = Object.keys(row).find(k =>
      /^(nama|name)$/i.test(k.trim())
    ) ?? Object.keys(row)[0];

    const name = String(row[nameKey] ?? '').trim();
    const customFields: Record<string, string> = {};
    for (const [k, v] of Object.entries(row)) {
      if (k !== nameKey) {
        customFields[k] = String(v ?? '').trim();
      }
    }
    return { name, customFields };
  }).filter(r => r.name);
}

export async function parseCSVFile(file: File): Promise<ParsedRow[]> {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const nameIdx = headers.findIndex(h => /^(nama|name)$/i.test(h));
  const nameColIdx = nameIdx >= 0 ? nameIdx : 0;

  return lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    const name = cols[nameColIdx] ?? '';
    const customFields: Record<string, string> = {};
    headers.forEach((h, i) => {
      if (i !== nameColIdx) {
        customFields[h] = cols[i] ?? '';
      }
    });
    return { name, customFields };
  }).filter(r => r.name);
}

// ─── Export helpers ───────────────────────────────────────────────────────────

export function exportRecipientsToCSV(recipients: Recipient[]): string {
  if (!recipients.length) return '';
  const extraKeys = Array.from(
    new Set(recipients.flatMap(r => Object.keys(r.customFields)))
  );
  const headers = ['No', 'Nama', 'No. Sertifikat', ...extraKeys];
  const rows = recipients.map((r, i) => [
    i + 1,
    r.name,
    r.certificateNumber,
    ...extraKeys.map(k => r.customFields[k] ?? ''),
  ]);
  return [headers, ...rows]
    .map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

export function downloadText(content: string, filename: string, mime = 'text/csv'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
