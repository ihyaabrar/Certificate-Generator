# Dokumen Desain: Certificate Generator

## Ikhtisar

Certificate Generator adalah aplikasi web berbasis Next.js (App Router) yang berjalan sepenuhnya di sisi klien (*client-side only*). Tidak ada backend atau API server — seluruh logika pemrosesan, penyimpanan data, dan ekspor dilakukan di browser pengguna.

Alur kerja utama aplikasi:

```
[Dashboard / Manajemen Proyek]
        ↓
[Canvas Editor — Desain Template]
        ↓
[Data Manager — Input / Import Penerima]
        ↓
[Preview Engine — Pratinjau per Penerima]
        ↓
[Certificate Generator + Export Manager — Render & Unduh]
```

### Keputusan Arsitektur Utama

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Rendering kanvas | Fabric.js | API tingkat tinggi untuk drag-drop, resize, dan serialisasi JSON bawaan |
| Parsing Excel/CSV | SheetJS (xlsx) + parser CSV | Standar industri, berjalan di browser tanpa server |
| PDF Engine | jsPDF + jspdf-autotable | Ringan, berjalan di browser, mendukung gambar dan teks |
| Penyimpanan | IndexedDB via Dexie.js | Kapasitas besar (>50MB), mendukung blob gambar, API Promise-based |
| ZIP | JSZip | Berjalan di browser, mendukung streaming download |
| QR Code | qrcode (npm) | Menghasilkan QR sebagai canvas/data URL, tanpa server |
| Deploy | Vercel (static export) | Gratis, CDN global, cocok untuk Next.js App Router |

---

## Arsitektur

### Arsitektur Keseluruhan

Aplikasi menggunakan arsitektur **layered client-side** dengan pemisahan yang jelas antara lapisan UI, logika bisnis, dan persistensi data.

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │Dashboard │  │  Editor  │  │ Preview  │  │Export  │  │
│  │  Page    │  │  Page    │  │  Page    │  │ Page   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       │              │              │             │       │
│  ┌────▼──────────────▼──────────────▼─────────────▼────┐ │
│  │                  React Components                    │ │
│  │  CanvasEditor │ DataManager │ PreviewEngine │ Export │ │
│  └────────────────────────┬─────────────────────────────┘ │
│                           │                               │
│  ┌────────────────────────▼─────────────────────────────┐ │
│  │                  Service Layer                        │ │
│  │  ProjectService │ TemplateService │ ExportService     │ │
│  │  DataParserService │ QRService │ CertificateService   │ │
│  └────────────────────────┬─────────────────────────────┘ │
│                           │                               │
│  ┌────────────────────────▼─────────────────────────────┐ │
│  │              Storage Layer (IndexedDB via Dexie.js)   │ │
│  │  ProjectStore │ TemplateStore │ RecipientStore        │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Struktur Direktori Proyek

```
src/
├── app/
│   ├── page.tsx                    # Dashboard (daftar proyek)
│   ├── projects/
│   │   └── [id]/
│   │       ├── editor/page.tsx     # Canvas Editor
│   │       ├── data/page.tsx       # Data Manager
│   │       ├── preview/page.tsx    # Preview Engine
│   │       └── export/page.tsx     # Export Manager
│   └── layout.tsx
├── components/
│   ├── canvas/
│   │   ├── CanvasEditor.tsx
│   │   ├── ElementToolbar.tsx
│   │   ├── StylePanel.tsx
│   │   └── SignatureDrawer.tsx
│   ├── data/
│   │   ├── RecipientForm.tsx
│   │   ├── ImportWizard.tsx
│   │   └── ColumnMapper.tsx
│   ├── preview/
│   │   └── CertificatePreview.tsx
│   └── ui/                         # Komponen UI generik
├── services/
│   ├── projectService.ts
│   ├── templateService.ts
│   ├── dataParserService.ts
│   ├── certificateService.ts
│   ├── exportService.ts
│   └── qrService.ts
├── store/
│   └── db.ts                       # Dexie.js database schema
├── types/
│   └── index.ts                    # TypeScript interfaces
└── lib/
    └── utils.ts
```

---

## Komponen dan Antarmuka

### 1. Canvas Editor (`CanvasEditor.tsx`)

Komponen inti yang membungkus instance Fabric.js. Bertanggung jawab atas semua interaksi visual di kanvas.

**Props:**
```typescript
interface CanvasEditorProps {
  projectId: string;
  onSave: (canvasJSON: CanvasConfig) => void;
}
```

**Tanggung Jawab:**
- Inisialisasi dan manajemen instance `fabric.Canvas`
- Menambah, memindah, mengubah ukuran, dan menghapus elemen
- Serialisasi state kanvas ke `CanvasConfig` (JSON)
- Deserialisasi `CanvasConfig` untuk memuat ulang kanvas
- Menangani upload latar belakang dan logo
- Mengintegrasikan `SignatureDrawer` untuk tanda tangan digital

### 2. Data Parser Service (`dataParserService.ts`)

Modul murni (*pure module*) tanpa side effect yang menangani parsing file Excel dan CSV.

**Antarmuka:**
```typescript
interface ParseResult {
  headers: string[];
  rows: Record<string, string>[];
  rowCount: number;
}

function parseXLSX(file: File): Promise<ParseResult>
function parseCSV(file: File): Promise<ParseResult>
function serializeRecipients(recipients: Recipient[]): string  // ke JSON
function deserializeRecipients(json: string): Recipient[]      // dari JSON
```

### 3. Certificate Service (`certificateService.ts`)

Modul yang mengatur proses render sertifikat akhir menggunakan Fabric.js off-screen canvas dan jsPDF.

**Antarmuka:**
```typescript
interface RenderOptions {
  paperSize: PaperSize;
  orientation: Orientation;
  quality: OutputQuality;
  format: ExportFormat;
}

function renderCertificate(
  canvasConfig: CanvasConfig,
  recipient: Recipient,
  options: RenderOptions
): Promise<Blob>

function generateCertificateNumber(
  mode: NumberingMode,
  index: number,
  config: NumberingConfig
): string
```

### 4. Export Service (`exportService.ts`)

Mengelola unduhan file tunggal dan pembuatan ZIP.

**Antarmuka:**
```typescript
function downloadSingle(blob: Blob, filename: string): void
function createZip(
  files: Array<{ name: string; blob: Blob }>,
  onProgress: (current: number, total: number) => void
): Promise<Blob>
function downloadBlob(blob: Blob, filename: string): void
```

### 5. QR Service (`qrService.ts`)

Menghasilkan QR code sebagai data URL.

**Antarmuka:**
```typescript
function generateQRDataURL(
  certificateNumber: string,
  size: number
): Promise<string>
```

### 6. Storage Layer — Dexie.js (`store/db.ts`)

```typescript
class CertificateGeneratorDB extends Dexie {
  projects!: Table<Project>;
  templates!: Table<Template>;
  recipients!: Table<Recipient>;
}
```

---

## Model Data

### `Project`

```typescript
interface Project {
  id: string;                    // UUID
  name: string;
  createdAt: number;             // timestamp ms
  updatedAt: number;
  canvasConfig: CanvasConfig | null;
  outputSettings: OutputSettings;
  numberingConfig: NumberingConfig;
  qrEnabled: boolean;
}
```

### `CanvasConfig`

Representasi JSON dari state Fabric.js canvas, diperluas dengan metadata aplikasi.

```typescript
interface CanvasConfig {
  version: string;               // versi schema, untuk migrasi
  fabricJSON: object;            // output fabric.Canvas.toJSON()
  canvasWidth: number;
  canvasHeight: number;
  fields: FieldDefinition[];     // daftar field dinamis yang terdefinisi
  signatures: SignatureElement[];
}
```

### `FieldDefinition`

```typescript
type FieldType =
  | 'recipient_name'
  | 'certificate_number'
  | 'date'
  | 'event_title'
  | 'custom';

interface FieldDefinition {
  id: string;                    // UUID, cocok dengan fabricObjectId
  type: FieldType;
  label: string;                 // nama tampilan
  customKey?: string;            // untuk tipe 'custom'
}
```

### `SignatureElement`

```typescript
interface SignatureElement {
  id: string;
  fabricObjectId: string;
  signerName: string;
  signerTitle: string;
  imageDataURL: string;          // base64 PNG
}
```

### `Recipient`

```typescript
interface Recipient {
  id: string;                    // UUID
  projectId: string;
  rowIndex: number;              // urutan dalam daftar
  name: string;                  // wajib diisi
  customFields: Record<string, string>;  // key = customKey dari FieldDefinition
  certificateNumber?: string;    // diisi saat generate
}
```

### `Template`

```typescript
interface Template {
  id: string;
  name: string;
  thumbnailDataURL: string;      // base64 PNG preview kecil
  canvasConfig: CanvasConfig;
  createdAt: number;
  isPreset: boolean;             // true untuk template bawaan
}
```

### `OutputSettings`

```typescript
type PaperSize = 'A4' | 'A5' | 'Letter' | 'Custom';
type Orientation = 'landscape' | 'portrait';
type OutputQuality = 'standard' | 'high';
type ExportFormat = 'pdf' | 'png' | 'jpg';

interface OutputSettings {
  paperSize: PaperSize;
  orientation: Orientation;
  quality: OutputQuality;
  format: ExportFormat;
  customWidth?: number;          // mm, hanya jika paperSize === 'Custom'
  customHeight?: number;         // mm, hanya jika paperSize === 'Custom'
}
```

### `NumberingConfig`

```typescript
type NumberingMode = 'auto_increment' | 'custom_format';

interface NumberingConfig {
  mode: NumberingMode;
  startIndex: number;            // untuk auto_increment
  customPattern?: string;        // contoh: "SK/{seq}/IV/2026"
  sequencePlaceholder?: string;  // default: "{seq}"
}
```

---

## Properti Kebenaran (Correctness Properties)

*Sebuah properti adalah karakteristik atau perilaku yang harus berlaku di semua eksekusi sistem yang valid — pada dasarnya, pernyataan formal tentang apa yang seharusnya dilakukan sistem. Properti berfungsi sebagai jembatan antara spesifikasi yang dapat dibaca manusia dan jaminan kebenaran yang dapat diverifikasi mesin.*

### Properti 1: Round-trip Parsing File Excel/CSV

*Untuk semua* file `.xlsx` atau `.csv` yang valid, proses parsing ke format internal kemudian serialisasi kembali ke format yang sama kemudian parsing ulang SHALL menghasilkan data yang ekuivalen dengan data hasil parsing pertama (jumlah baris sama, nilai setiap sel sama).

**Memvalidasi: Persyaratan 9.7**

---

### Properti 2: Round-trip Simpan dan Muat Proyek

*Untuk semua* konfigurasi proyek yang valid (termasuk semua tipe elemen: teks, logo, tanda tangan, latar belakang), proses simpan ke IndexedDB kemudian muat ulang SHALL menghasilkan konfigurasi kanvas yang identik dengan konfigurasi sebelum disimpan — posisi, ukuran, styling, dan tipe field semua elemen harus sama.

**Memvalidasi: Persyaratan 17.5**

---

### Properti 3: Keunikan Nomor Sertifikat

*Untuk semua* daftar penerima dengan jumlah berapa pun dan konfigurasi penomoran apa pun (auto-increment maupun format kustom), fungsi `generateCertificateNumber` yang dipanggil untuk setiap penerima SHALL menghasilkan kumpulan nomor sertifikat yang seluruhnya unik — tidak ada dua penerima yang mendapat nomor yang sama dalam satu proyek.

**Memvalidasi: Persyaratan 11.4**

---

### Properti 4: Validasi Nama Penerima Kosong

*Untuk semua* daftar penerima yang mengandung setidaknya satu entri dengan field nama kosong (string kosong atau hanya whitespace), proses validasi SHALL menolak daftar tersebut dan mengembalikan daftar entri bermasalah yang tidak kosong — proses generate tidak boleh dilanjutkan.

**Memvalidasi: Persyaratan 10.1, 10.2**

---

### Properti 5: Konsistensi Nama File Ekspor

*Untuk semua* penerima dengan nama apa pun dan format ekspor apa pun (PDF, PNG, JPG), nama file yang dihasilkan oleh `Export_Manager` SHALL mengandung nama penerima sebagai bagian dari nama file, dan nama file tersebut SHALL valid sebagai nama file sistem operasi (tidak mengandung karakter ilegal seperti `/ \ : * ? " < > |`).

**Memvalidasi: Persyaratan 15.2, 16.3**

---

### Properti 6: QR Code Dapat Dipindai dan Mengandung Nomor Sertifikat

*Untuk semua* nomor sertifikat yang valid, QR code yang dihasilkan oleh `QR_Generator` SHALL dapat di-decode kembali dan menghasilkan string yang identik dengan nomor sertifikat yang digunakan sebagai input.

**Memvalidasi: Persyaratan 12.3**

---

## Penanganan Kesalahan

### Strategi Umum

Semua kesalahan dikategorikan ke dalam tiga level:

| Level | Deskripsi | Penanganan UI |
|---|---|---|
| **Validation Error** | Input pengguna tidak valid (file salah format, nama kosong) | Toast/alert inline, tidak memblokir UI lain |
| **Processing Error** | Kegagalan saat render/parsing (file korup, memori penuh) | Modal error dengan detail, opsi retry |
| **Fatal Error** | Kegagalan IndexedDB atau state tidak konsisten | Halaman error dengan opsi reload |

### Penanganan per Modul

**Template Engine (Upload File):**
- Format tidak didukung → tampilkan pesan: *"Format tidak didukung. Gunakan PNG, JPG, atau PDF."*
- Ukuran > 20MB → tampilkan pesan: *"Ukuran file melebihi batas 20 MB."*
- Implementasi: validasi dilakukan sebelum membaca file (`file.type` dan `file.size`)

**Data Parser Service:**
- Format file tidak didukung → error dengan daftar format yang valid
- File kosong (hanya header) → peringatan, bukan error fatal; pengguna tetap dapat melanjutkan
- Baris dengan nama kosong → dicatat, dilaporkan saat validasi pre-generate

**Certificate Service (Render):**
- Kegagalan render satu sertifikat → catat error, lanjutkan ke penerima berikutnya
- Setelah semua selesai → tampilkan ringkasan: berhasil N, gagal M, dengan daftar yang gagal

**IndexedDB / Dexie.js:**
- Kegagalan baca/tulis → tangkap exception Dexie, tampilkan pesan error yang deskriptif
- Konfigurasi JSON tidak valid saat muat proyek → tampilkan pesan: *"File proyek rusak atau tidak dapat dibaca."*

**Custom Paper Size:**
- Lebar atau tinggi tidak diisi → validasi form, tampilkan pesan error inline sebelum generate

---

## Strategi Pengujian

### Pendekatan Dual Testing

Pengujian menggunakan dua pendekatan yang saling melengkapi:

1. **Unit Tests** — untuk contoh spesifik, edge case, dan kondisi error
2. **Property-Based Tests** — untuk properti universal yang harus berlaku di semua input

### Library yang Digunakan

| Tujuan | Library |
|---|---|
| Test runner | Vitest |
| Property-based testing | fast-check |
| React component testing | React Testing Library |
| Mocking | Vitest built-in mocks |

### Unit Tests

Fokus pada:
- Validasi format file (format didukung vs tidak didukung)
- Validasi ukuran file (tepat di batas 20MB, di atas batas)
- Parsing CSV dengan berbagai delimiter dan encoding
- Generasi nomor sertifikat dengan pola kustom (contoh konkret)
- Sanitasi nama file untuk karakter ilegal
- Logika pemetaan kolom (column mapping)
- Penanganan error saat konfigurasi JSON tidak valid

### Property-Based Tests

Setiap property test dikonfigurasi untuk berjalan minimal **100 iterasi** menggunakan fast-check.

Setiap test diberi tag komentar dengan format:
`// Feature: certificate-generator, Property {N}: {deskripsi singkat}`

**Property 1 — Round-trip Parsing Excel/CSV:**
- Generator: buat array of records acak dengan berbagai tipe string (termasuk karakter khusus, unicode, angka)
- Serialisasi ke format CSV/XLSX in-memory, parse ulang, bandingkan hasilnya
- Tag: `// Feature: certificate-generator, Property 1: round-trip parsing file`

**Property 2 — Round-trip Simpan/Muat Proyek:**
- Generator: buat `CanvasConfig` acak dengan berbagai kombinasi elemen (teks, gambar, tanda tangan)
- Simpan ke IndexedDB mock, muat ulang, bandingkan dengan deep equality
- Tag: `// Feature: certificate-generator, Property 2: round-trip simpan muat proyek`

**Property 3 — Keunikan Nomor Sertifikat:**
- Generator: buat daftar penerima acak (1–500 penerima) dengan konfigurasi penomoran acak
- Panggil `generateCertificateNumber` untuk setiap penerima, verifikasi tidak ada duplikat
- Tag: `// Feature: certificate-generator, Property 3: keunikan nomor sertifikat`

**Property 4 — Validasi Nama Kosong:**
- Generator: buat daftar penerima acak yang mengandung setidaknya satu nama kosong/whitespace
- Jalankan validasi, verifikasi hasilnya selalu `invalid` dan daftar error tidak kosong
- Tag: `// Feature: certificate-generator, Property 4: validasi nama penerima kosong`

**Property 5 — Konsistensi Nama File:**
- Generator: buat nama penerima acak (termasuk karakter unicode, spasi, tanda baca)
- Panggil fungsi pembuat nama file, verifikasi nama mengandung nama penerima dan tidak ada karakter ilegal
- Tag: `// Feature: certificate-generator, Property 5: konsistensi nama file ekspor`

**Property 6 — QR Code Round-trip:**
- Generator: buat nomor sertifikat acak dengan berbagai format (alphanumeric, dengan slash, dengan spasi)
- Generate QR code sebagai data URL, decode kembali menggunakan library QR decoder, bandingkan dengan input
- Tag: `// Feature: certificate-generator, Property 6: QR code round-trip`

### Integration Tests

Fokus pada integrasi antar modul:
- Alur lengkap: parse CSV → validasi → render sertifikat → ekspor (dengan mock Fabric.js dan jsPDF)
- Interaksi dengan IndexedDB (menggunakan fake-indexeddb)
- Pembuatan ZIP dengan JSZip (verifikasi jumlah file dan nama file di dalam ZIP)
