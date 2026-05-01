import type { TemplateDefinition, TemplateId, TemplateCategory } from '@/src/types';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'Semua', 'Formal', 'Akademik', 'Korporat', 'Kreatif',
  'Gelap', 'Ornamental', 'Vintage', 'Sport', 'Pelatihan',
];

export const TEMPLATES: TemplateDefinition[] = [
  // ── FORMAL (9) ──────────────────────────────────────────────────────────────
  { id: 'formal', name: 'Klasik Formal', description: 'Border ganda, serif elegan', category: 'Formal', previewBg: 'bg-slate-50', accentColor: '#1e3a5f', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['resmi', 'klasik'] },
  { id: 'elegant', name: 'Elegan Emas', description: 'Ornamen sudut, aksen emas', category: 'Formal', previewBg: 'bg-amber-50', accentColor: '#92400e', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['mewah', 'emas'] },
  { id: 'navy', name: 'Navy Gold', description: 'Latar biru tua, aksen emas', category: 'Formal', previewBg: 'bg-slate-900', accentColor: '#f59e0b', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['navy', 'premium'] },
  { id: 'certificate_gold', name: 'Sertifikat Emas', description: 'Border emas klasik', category: 'Formal', previewBg: 'bg-yellow-50', accentColor: '#b45309', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['emas', 'klasik'] },
  { id: 'royal_blue', name: 'Royal Blue', description: 'Biru kerajaan dengan aksen silver', category: 'Formal', previewBg: 'bg-blue-900', accentColor: '#93c5fd', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['biru', 'royal'] },
  { id: 'formal_red', name: 'Formal Merah', description: 'Merah elegan dengan border emas', category: 'Formal', previewBg: 'bg-red-50', accentColor: '#991b1b', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['merah', 'formal'] },
  { id: 'formal_green', name: 'Formal Hijau', description: 'Hijau tua profesional', category: 'Formal', previewBg: 'bg-green-900', accentColor: '#d1fae5', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['hijau', 'formal'] },
  { id: 'formal_purple', name: 'Formal Ungu', description: 'Ungu kerajaan dengan ornamen', category: 'Formal', previewBg: 'bg-purple-900', accentColor: '#e9d5ff', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['ungu', 'formal'] },
  { id: 'formal_teal', name: 'Formal Teal', description: 'Teal elegan dengan border tipis', category: 'Formal', previewBg: 'bg-teal-50', accentColor: '#0f766e', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['teal', 'formal'] },

  // ── AKADEMIK (8) ─────────────────────────────────────────────────────────────
  { id: 'academic', name: 'Akademik', description: 'Gaya universitas dengan seal', category: 'Akademik', previewBg: 'bg-blue-50', accentColor: '#1d4ed8', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['universitas', 'diploma'] },
  { id: 'ribbon', name: 'Ribbon Award', description: 'Ribbon dekoratif, penghargaan', category: 'Akademik', previewBg: 'bg-red-50', accentColor: '#dc2626', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['penghargaan', 'ribbon'] },
  { id: 'diploma', name: 'Diploma', description: 'Gaya diploma resmi', category: 'Akademik', previewBg: 'bg-amber-50', accentColor: '#78350f', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['diploma', 'kelulusan'] },
  { id: 'graduation', name: 'Graduation', description: 'Wisuda dengan toga dan topi', category: 'Akademik', previewBg: 'bg-indigo-900', accentColor: '#fbbf24', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['wisuda', 'kelulusan'] },
  { id: 'scholar', name: 'Scholar', description: 'Beasiswa dan prestasi akademik', category: 'Akademik', previewBg: 'bg-sky-50', accentColor: '#0369a1', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['beasiswa', 'prestasi'] },
  { id: 'university_seal', name: 'University Seal', description: 'Seal universitas di tengah', category: 'Akademik', previewBg: 'bg-stone-50', accentColor: '#44403c', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['universitas', 'seal'] },
  { id: 'academic_blue', name: 'Academic Blue', description: 'Biru akademik modern', category: 'Akademik', previewBg: 'bg-blue-800', accentColor: '#bfdbfe', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['akademik', 'biru'] },
  { id: 'academic_maroon', name: 'Academic Maroon', description: 'Maroon klasik universitas', category: 'Akademik', previewBg: 'bg-rose-900', accentColor: '#fecdd3', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['maroon', 'universitas'] },

  // ── KORPORAT (9) ─────────────────────────────────────────────────────────────
  { id: 'modern', name: 'Modern Indigo', description: 'Sidebar aksen, bold modern', category: 'Korporat', previewBg: 'bg-indigo-50', accentColor: '#4f46e5', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['modern', 'korporat'] },
  { id: 'minimalist', name: 'Minimalis', description: 'Clean, fokus konten', category: 'Korporat', previewBg: 'bg-gray-50', accentColor: '#374151', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['minimalis', 'bersih'] },
  { id: 'green', name: 'Emerald Pro', description: 'Hijau segar, pelatihan', category: 'Korporat', previewBg: 'bg-emerald-50', accentColor: '#059669', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['hijau', 'pelatihan'] },
  { id: 'corporate_gray', name: 'Corporate Gray', description: 'Abu-abu profesional', category: 'Korporat', previewBg: 'bg-gray-100', accentColor: '#1f2937', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['abu', 'profesional'] },
  { id: 'corporate_blue', name: 'Corporate Blue', description: 'Biru korporat terpercaya', category: 'Korporat', previewBg: 'bg-blue-50', accentColor: '#1e40af', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['biru', 'korporat'] },
  { id: 'corporate_orange', name: 'Corporate Orange', description: 'Oranye energik korporat', category: 'Korporat', previewBg: 'bg-orange-50', accentColor: '#c2410c', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['oranye', 'energik'] },
  { id: 'tech_dark', name: 'Tech Dark', description: 'Teknologi modern gelap', category: 'Korporat', previewBg: 'bg-zinc-900', accentColor: '#22d3ee', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['teknologi', 'gelap'] },
  { id: 'startup', name: 'Startup', description: 'Startup modern dengan gradien', category: 'Korporat', previewBg: 'bg-violet-50', accentColor: '#7c3aed', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['startup', 'modern'] },
  { id: 'professional', name: 'Professional', description: 'Profesional bersih dua kolom', category: 'Korporat', previewBg: 'bg-slate-100', accentColor: '#334155', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['profesional', 'bersih'] },

  // ── KREATIF (9) ──────────────────────────────────────────────────────────────
  { id: 'gradient', name: 'Gradient Vivid', description: 'Gradien ungu-biru', category: 'Kreatif', previewBg: 'bg-purple-100', accentColor: '#7c3aed', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['gradien', 'colorful'] },
  { id: 'watercolor', name: 'Watercolor', description: 'Efek cat air pastel', category: 'Kreatif', previewBg: 'bg-pink-50', accentColor: '#db2777', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['cat air', 'pastel'] },
  { id: 'geometric', name: 'Geometric', description: 'Pola geometris modern', category: 'Kreatif', previewBg: 'bg-cyan-50', accentColor: '#0891b2', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['geometris', 'modern'] },
  { id: 'pastel', name: 'Pastel Dream', description: 'Warna pastel lembut', category: 'Kreatif', previewBg: 'bg-rose-50', accentColor: '#f43f5e', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['pastel', 'lembut'] },
  { id: 'colorful', name: 'Colorful', description: 'Penuh warna dan ceria', category: 'Kreatif', previewBg: 'bg-yellow-50', accentColor: '#d97706', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['warna', 'ceria'] },
  { id: 'retro', name: 'Retro', description: 'Gaya retro 80an', category: 'Kreatif', previewBg: 'bg-orange-100', accentColor: '#ea580c', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['retro', '80an'] },
  { id: 'neon_pop', name: 'Neon Pop', description: 'Neon cerah pop art', category: 'Kreatif', previewBg: 'bg-black', accentColor: '#f0abfc', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['neon', 'pop'] },
  { id: 'artistic', name: 'Artistic', description: 'Seni abstrak modern', category: 'Kreatif', previewBg: 'bg-fuchsia-50', accentColor: '#a21caf', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['seni', 'abstrak'] },
  { id: 'bohemian', name: 'Bohemian', description: 'Boho chic dengan elemen alam', category: 'Kreatif', previewBg: 'bg-lime-50', accentColor: '#4d7c0f', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['boho', 'alam'] },

  // ── GELAP (5) ────────────────────────────────────────────────────────────────
  { id: 'dark', name: 'Dark Neon', description: 'Gelap dengan neon ungu-biru', category: 'Gelap', previewBg: 'bg-gray-900', accentColor: '#a855f7', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['gelap', 'neon'] },
  { id: 'dark_gold', name: 'Dark Gold', description: 'Hitam mewah dengan emas', category: 'Gelap', previewBg: 'bg-stone-900', accentColor: '#fbbf24', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['hitam', 'emas'] },
  { id: 'dark_blue', name: 'Dark Blue', description: 'Biru gelap elegan', category: 'Gelap', previewBg: 'bg-blue-950', accentColor: '#60a5fa', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['biru', 'gelap'] },
  { id: 'dark_green', name: 'Dark Green', description: 'Hijau gelap premium', category: 'Gelap', previewBg: 'bg-green-950', accentColor: '#4ade80', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['hijau', 'gelap'] },
  { id: 'dark_red', name: 'Dark Red', description: 'Merah gelap dramatis', category: 'Gelap', previewBg: 'bg-red-950', accentColor: '#fca5a5', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['merah', 'gelap'] },

  // ── ORNAMENTAL (8) ───────────────────────────────────────────────────────────
  { id: 'ornate_gold', name: 'Ornate Gold', description: 'Ornamen emas penuh dekorasi', category: 'Ornamental', previewBg: 'bg-yellow-50', accentColor: '#d97706', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['ornamen', 'emas'] },
  { id: 'ornate_blue', name: 'Ornate Blue', description: 'Ornamen biru kerajaan', category: 'Ornamental', previewBg: 'bg-blue-50', accentColor: '#1e40af', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['ornamen', 'biru'] },
  { id: 'ornate_green', name: 'Ornate Green', description: 'Ornamen hijau elegan', category: 'Ornamental', previewBg: 'bg-emerald-50', accentColor: '#065f46', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['ornamen', 'hijau'] },
  { id: 'floral', name: 'Floral', description: 'Motif bunga dekoratif', category: 'Ornamental', previewBg: 'bg-pink-50', accentColor: '#be185d', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['bunga', 'dekoratif'] },
  { id: 'baroque', name: 'Baroque', description: 'Gaya baroque mewah', category: 'Ornamental', previewBg: 'bg-amber-100', accentColor: '#92400e', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['baroque', 'mewah'] },
  { id: 'victorian', name: 'Victorian', description: 'Era Victoria klasik', category: 'Ornamental', previewBg: 'bg-stone-100', accentColor: '#44403c', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['victorian', 'klasik'] },
  { id: 'celtic', name: 'Celtic', description: 'Motif Celtic dengan knot', category: 'Ornamental', previewBg: 'bg-green-50', accentColor: '#166534', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['celtic', 'knot'] },
  { id: 'mandala', name: 'Mandala', description: 'Pola mandala simetris', category: 'Ornamental', previewBg: 'bg-violet-50', accentColor: '#6d28d9', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['mandala', 'simetris'] },

  // ── VINTAGE (5) ──────────────────────────────────────────────────────────────
  { id: 'vintage_brown', name: 'Vintage Brown', description: 'Coklat tua vintage klasik', category: 'Vintage', previewBg: 'bg-amber-100', accentColor: '#78350f', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['vintage', 'coklat'] },
  { id: 'vintage_sepia', name: 'Vintage Sepia', description: 'Efek sepia foto lama', category: 'Vintage', previewBg: 'bg-yellow-100', accentColor: '#92400e', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['sepia', 'antik'] },
  { id: 'vintage_red', name: 'Vintage Red', description: 'Merah vintage retro', category: 'Vintage', previewBg: 'bg-red-100', accentColor: '#991b1b', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['vintage', 'merah'] },
  { id: 'antique', name: 'Antique', description: 'Kertas antik dengan tekstur', category: 'Vintage', previewBg: 'bg-stone-200', accentColor: '#57534e', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['antik', 'tekstur'] },
  { id: 'retro_70s', name: 'Retro 70s', description: 'Warna dan gaya tahun 70an', category: 'Vintage', previewBg: 'bg-orange-100', accentColor: '#c2410c', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['retro', '70an'] },

  // ── SPORT (5) ────────────────────────────────────────────────────────────────
  { id: 'sport_blue', name: 'Sport Blue', description: 'Dinamis biru untuk olahraga', category: 'Sport', previewBg: 'bg-blue-600', accentColor: '#ffffff', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['sport', 'biru'] },
  { id: 'sport_red', name: 'Sport Red', description: 'Merah energik olahraga', category: 'Sport', previewBg: 'bg-red-600', accentColor: '#ffffff', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['sport', 'merah'] },
  { id: 'champion', name: 'Champion', description: 'Juara dengan trofi emas', category: 'Sport', previewBg: 'bg-yellow-400', accentColor: '#1c1917', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['juara', 'trofi'] },
  { id: 'trophy', name: 'Trophy', description: 'Penghargaan trofi bergengsi', category: 'Sport', previewBg: 'bg-amber-500', accentColor: '#1c1917', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['trofi', 'penghargaan'] },
  { id: 'achievement', name: 'Achievement', description: 'Pencapaian dengan bintang', category: 'Sport', previewBg: 'bg-indigo-600', accentColor: '#fbbf24', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['pencapaian', 'bintang'] },

  // ── PELATIHAN (5) ────────────────────────────────────────────────────────────
  { id: 'training_blue', name: 'Training Blue', description: 'Pelatihan profesional biru', category: 'Pelatihan', previewBg: 'bg-sky-50', accentColor: '#0284c7', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['pelatihan', 'biru'] },
  { id: 'training_green', name: 'Training Green', description: 'Pelatihan hijau segar', category: 'Pelatihan', previewBg: 'bg-teal-50', accentColor: '#0f766e', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['pelatihan', 'hijau'] },
  { id: 'workshop', name: 'Workshop', description: 'Workshop kreatif modern', category: 'Pelatihan', previewBg: 'bg-violet-50', accentColor: '#6d28d9', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['workshop', 'kreatif'] },
  { id: 'seminar', name: 'Seminar', description: 'Seminar formal profesional', category: 'Pelatihan', previewBg: 'bg-slate-50', accentColor: '#1e293b', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['seminar', 'formal'] },
  { id: 'bootcamp', name: 'Bootcamp', description: 'Bootcamp intensif modern', category: 'Pelatihan', previewBg: 'bg-zinc-900', accentColor: '#10b981', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['bootcamp', 'intensif'] },

  // ── LAYOUT UNIK (10) ─────────────────────────────────────────────────────────
  { id: 'diagonal_split', name: 'Diagonal Split', description: 'Latar terpotong diagonal, nama besar di kanan', category: 'Kreatif', previewBg: 'bg-blue-900', accentColor: '#f59e0b', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['diagonal', 'split', 'unik'] },
  { id: 'full_bg', name: 'Full Background', description: 'Latar gradien penuh, card transparan melayang', category: 'Gelap', previewBg: 'bg-purple-950', accentColor: '#a78bfa', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['full bg', 'transparan', 'gelap'] },
  { id: 'horizontal_band', name: 'Horizontal Band', description: 'Band hitam atas-bawah, nama raksasa di tengah', category: 'Korporat', previewBg: 'bg-gray-900', accentColor: '#f59e0b', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['band', 'bold', 'modern'] },
  { id: 'ornate_frame', name: 'Ornate Frame', description: 'Frame ornamen SVG elaborate di semua sisi', category: 'Ornamental', previewBg: 'bg-amber-50', accentColor: '#b45309', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['ornamen', 'frame', 'elaborate'] },
  { id: 'split_color', name: 'Split Color', description: 'Dua warna kiri-kanan, nama melintasi keduanya', category: 'Korporat', previewBg: 'bg-sky-900', accentColor: '#0ea5e9', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['split', 'dua warna', 'modern'] },
  { id: 'circle_seal', name: 'Circle Seal', description: 'Seal lingkaran besar di kiri, konten di kanan', category: 'Formal', previewBg: 'bg-slate-50', accentColor: '#1e3a8a', fontTitle: 'Georgia, serif', fontBody: 'Arial, sans-serif', tags: ['seal', 'lingkaran', 'formal'] },
  { id: 'triangle_accent', name: 'Triangle Accent', description: 'Segitiga besar di sudut sebagai focal point', category: 'Kreatif', previewBg: 'bg-violet-50', accentColor: '#7c3aed', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['segitiga', 'geometris', 'modern'] },
  { id: 'wave', name: 'Wave', description: 'Gelombang SVG atas-bawah, nama besar di tengah', category: 'Kreatif', previewBg: 'bg-teal-50', accentColor: '#0f766e', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['gelombang', 'wave', 'dinamis'] },
  { id: 'typography', name: 'Typography First', description: 'Nama sebagai elemen desain utama, sangat besar', category: 'Kreatif', previewBg: 'bg-gray-50', accentColor: '#dc2626', fontTitle: 'Arial, sans-serif', fontBody: 'Arial, sans-serif', tags: ['tipografi', 'bold', 'modern'] },
  { id: 'islamic', name: 'Islamic Geometric', description: 'Pola geometris islami dengan ornamen arabesque', category: 'Ornamental', previewBg: 'bg-amber-50', accentColor: '#b45309', fontTitle: 'Georgia, serif', fontBody: 'Georgia, serif', tags: ['islami', 'geometris', 'arabesque'] },
];

export function getTemplate(id: TemplateId): TemplateDefinition {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}

export function getTemplatesByCategory(category: TemplateCategory): TemplateDefinition[] {
  if (category === 'Semua') return TEMPLATES;
  return TEMPLATES.filter(t => t.category === category);
}

export const EVENT_TYPES = [
  'Peserta', 'Pembicara', 'Panitia', 'Instruktur',
  'Narasumber', 'Volunteer', 'Penghargaan', 'Kelulusan', 'Lainnya',
];
