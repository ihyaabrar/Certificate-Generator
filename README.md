# 🎓 CertGen — Certificate Generator

Generator sertifikat massal berbasis web. Buat, kustomisasi, dan download ratusan sertifikat sekaligus langsung dari browser — tanpa backend, tanpa server.

![CertGen](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Fitur Utama

### 🎨 60+ Template Sertifikat
Template dikategorikan dalam 10 kategori dengan layout yang benar-benar berbeda:

| Kategori | Contoh Template |
|---|---|
| **Formal** | Klasik Formal, Elegan Emas, Navy Gold, Royal Blue |
| **Akademik** | Diploma, Graduation, Scholar, University Seal |
| **Korporat** | Modern Indigo, Corporate Gray, Tech Dark, Startup |
| **Kreatif** | Gradient Vivid, Watercolor, Geometric, Neon Pop |
| **Gelap** | Dark Neon, Dark Gold, Dark Blue |
| **Ornamental** | Ornate Frame, Floral, Baroque, Islamic Geometric |
| **Vintage** | Vintage Brown, Sepia, Antique, Retro 70s |
| **Sport** | Champion, Trophy, Achievement |
| **Pelatihan** | Workshop, Seminar, Bootcamp |
| **Layout Unik** | Diagonal Split, Wave, Circle Seal, Typography First |

### 📋 Manajemen Proyek
- Buat, edit, duplikasi, dan hapus proyek
- Backup semua proyek ke file JSON
- Restore dari file backup

### 📝 Info Kegiatan
- Nama kegiatan, jenis sertifikat, penyelenggara, tanggal, lokasi
- Upload logo organisasi
- Upload gambar tanda tangan (maks. 2 penandatangan)

### ⚙️ Pengaturan Sertifikat
- **Nomor Sertifikat** — mode otomatis atau kustom (prefix/suffix/digit)
  - Contoh: `SK/WORKSHOP/001/2026`
- **QR Code** — toggle on/off per proyek
- **Watermark** — teks diagonal kustom (misal: "DRAFT")

### 👥 Manajemen Penerima
- Input manual satu per satu (tekan Enter)
- Import massal dari teks (satu nama per baris)
- **Import Excel (.xlsx) / CSV** dengan preview & konfirmasi
- **Export CSV** daftar penerima
- Search/filter nama penerima
- Bulk delete dengan checkbox
- Undo hapus (5 detik)
- Kolom extra dari Excel otomatis tampil di tabel

### 👁️ Preview & Download
- Preview sertifikat per penerima sebelum cetak
- Navigasi antar penerima dengan dropdown
- **Print / Save as PDF** — format tetap konsisten
- Semua sertifikat dalam satu halaman print

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn

### Instalasi

```bash
# Clone repo
git clone https://github.com/ihyaabrar/Certificate-Generator.git
cd Certificate-Generator

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Storage | localStorage (client-side only) |
| Excel Parser | SheetJS (xlsx) |
| Icons | Custom SVG components |
| Font | Poppins (Google Fonts) |

**Tidak ada backend.** Semua data tersimpan di browser (localStorage). Cocok untuk deploy ke Vercel sebagai static site.

---

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── page.tsx                    # Dashboard
│   └── projects/
│       └── [id]/
│           ├── page.tsx            # Editor proyek (5 tab)
│           └── print/page.tsx      # Halaman cetak
├── components/
│   ├── templates/                  # 60+ template sertifikat
│   │   ├── CertificateRenderer.tsx # Router template
│   │   ├── TemplateBase.tsx        # Shared helpers
│   │   └── *.tsx                   # Individual templates
│   └── ui/
│       └── Icons.tsx               # SVG icon components
├── lib/
│   ├── storage.ts                  # localStorage CRUD
│   ├── templates.ts                # Definisi & kategori template
│   └── utils.ts                    # Helpers (numbering, CSV, Excel)
└── types/
    └── index.ts                    # TypeScript interfaces
```

---

## 📖 Cara Penggunaan

### 1. Buat Proyek Baru
Klik **"Proyek Baru"** di dashboard, masukkan nama proyek.

### 2. Pilih Template
Browse 60+ template, klik thumbnail untuk preview penuh, pilih yang sesuai.

### 3. Isi Info Kegiatan
- Nama kegiatan, jenis sertifikat, penyelenggara, tanggal
- Upload logo organisasi (PNG/JPG/SVG)
- Upload gambar tanda tangan

### 4. Pengaturan
- Atur format nomor sertifikat (otomatis atau kustom)
- Aktifkan QR code atau watermark jika diperlukan

### 5. Tambah Penerima
- Input manual atau import dari Excel/CSV
- Kolom "Nama" atau "Name" otomatis terdeteksi

### 6. Preview & Cetak
- Preview sertifikat per penerima
- Klik **"Generate & Download"**
- Di dialog print, pilih **"Save as PDF"** untuk download

---

## 💾 Backup & Restore

Data tersimpan di localStorage browser. Untuk backup:
1. Klik ikon **Download** di navbar dashboard
2. File JSON akan terdownload

Untuk restore:
1. Klik ikon **Upload** di navbar dashboard
2. Pilih file JSON backup

---

## 🌐 Deploy ke Vercel

1. Fork repo ini
2. Buka [vercel.com](https://vercel.com) → **Add New Project**
3. Import dari GitHub
4. Framework: **Next.js** (auto-detected)
5. Klik **Deploy**

Tidak perlu konfigurasi environment variables.

---

## 📄 License

MIT License — bebas digunakan untuk keperluan personal maupun komersial.

---

## 🤝 Kontribusi

Pull request dan issue sangat disambut! Untuk perubahan besar, buka issue terlebih dahulu.

---

Made with ❤️ by [ihyaabrar](https://github.com/ihyaabrar)
