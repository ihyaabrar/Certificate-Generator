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

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  previewBg: string;       // Tailwind bg class for card preview
  accentColor: string;     // hex color for accents
  fontTitle: string;       // font family for title
  fontBody: string;        // font family for body
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
  logoDataURL: string;       // base64 logo organisasi
  signer1Name: string;
  signer1Title: string;
  signer1SignatureURL: string; // base64 gambar TTD 1
  signer2Name: string;
  signer2Title: string;
  signer2SignatureURL: string; // base64 gambar TTD 2
  recipients: Recipient[];
  createdAt: number;
  updatedAt: number;
}

export interface Recipient {
  id: string;
  name: string;
  certificateNumber: string;
}
