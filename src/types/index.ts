// ─── Template Types ───────────────────────────────────────────────────────────

export type TemplateId =
  // Formal
  | 'formal' | 'elegant' | 'navy' | 'certificate_gold' | 'royal_blue'
  | 'formal_red' | 'formal_green' | 'formal_purple' | 'formal_teal'
  // Akademik
  | 'academic' | 'ribbon' | 'diploma' | 'graduation' | 'scholar'
  | 'university_seal' | 'academic_blue' | 'academic_maroon'
  // Korporat
  | 'modern' | 'minimalist' | 'green' | 'corporate_gray' | 'corporate_blue'
  | 'corporate_orange' | 'tech_dark' | 'startup' | 'professional'
  // Kreatif
  | 'gradient' | 'watercolor' | 'geometric' | 'pastel' | 'colorful'
  | 'retro' | 'neon_pop' | 'artistic' | 'bohemian'
  // Gelap
  | 'dark' | 'dark_gold' | 'dark_blue' | 'dark_green' | 'dark_red'
  // Ornamental
  | 'ornate_gold' | 'ornate_blue' | 'ornate_green' | 'floral' | 'baroque'
  | 'victorian' | 'celtic' | 'mandala'
  // Vintage
  | 'vintage_brown' | 'vintage_sepia' | 'vintage_red' | 'antique' | 'retro_70s'
  // Sport & Achievement
  | 'sport_blue' | 'sport_red' | 'champion' | 'trophy' | 'achievement'
  // Pelatihan
  | 'training_blue' | 'training_green' | 'workshop' | 'seminar' | 'bootcamp'
  // Layout Unik
  | 'diagonal_split' | 'full_bg' | 'horizontal_band' | 'ornate_frame'
  | 'split_color' | 'circle_seal' | 'triangle_accent' | 'wave'
  | 'typography' | 'islamic';

export type TemplateCategory =
  | 'Semua' | 'Formal' | 'Akademik' | 'Korporat' | 'Kreatif'
  | 'Gelap' | 'Ornamental' | 'Vintage' | 'Sport' | 'Pelatihan';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  category: TemplateCategory;
  previewBg: string;
  accentColor: string;
  fontTitle: string;
  fontBody: string;
  tags: string[];
}

// ─── Certificate Data ─────────────────────────────────────────────────────────

export interface CertificateData {
  eventTitle: string;
  eventType: string;
  organizer: string;
  date: string;
  location?: string;
  recipientName: string;
  certificateNumber?: string;
  logoDataURL?: string;
  signer1Name?: string;
  signer1Title?: string;
  signer1SignatureURL?: string;
  signer2Name?: string;
  signer2Title?: string;
  signer2SignatureURL?: string;
}

// ─── Numbering Config ─────────────────────────────────────────────────────────

export type NumberingMode = 'auto' | 'custom';

export interface NumberingConfig {
  mode: NumberingMode;
  prefix: string;       // e.g. "SK/WORKSHOP"
  suffix: string;       // e.g. "/2026"
  startFrom: number;    // e.g. 1
  digits: number;       // e.g. 3 → "001"
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  templateId: TemplateId;
  eventTitle: string;
  eventType: string;
  organizer: string;
  date: string;
  location: string;
  logoDataURL: string;
  signer1Name: string;
  signer1Title: string;
  signer1SignatureURL: string;
  signer2Name: string;
  signer2Title: string;
  signer2SignatureURL: string;
  numberingConfig: NumberingConfig;
  qrEnabled?: boolean;
  watermarkText?: string;
  recipients: Recipient[];
  createdAt: number;
  updatedAt: number;
}

export interface Recipient {
  id: string;
  name: string;
  customFields: Record<string, string>; // extra data from Excel columns
  certificateNumber: string;
}
