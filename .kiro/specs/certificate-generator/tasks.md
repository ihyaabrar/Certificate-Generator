# Rencana Implementasi: Certificate Generator

## Ikhtisar

Implementasi dilakukan secara bertahap mengikuti arsitektur layered client-side: dimulai dari fondasi (tipe data, skema database, struktur proyek), kemudian modul-modul service, lalu komponen UI, dan diakhiri dengan integrasi penuh antar modul.

Semua kode ditulis dalam **TypeScript** menggunakan **Next.js App Router**, dengan pengujian menggunakan **Vitest** dan **fast-check**.

## Tasks

- [x] 1. Inisialisasi struktur proyek dan tipe data inti
  - Buat file `src/types/index.ts` yang mendefinisikan semua TypeScript interface: `Project`, `CanvasConfig`, `FieldDefinition`, `SignatureElement`, `Recipient`, `Template`, `OutputSettings`, `NumberingConfig`, dan semua tipe turunannya (`FieldType`, `PaperSize`, `Orientation`, `OutputQuality`, `ExportFormat`, `NumberingMode`)
  - Buat struktur direktori sesuai desain: `src/app/`, `src/components/canvas/`, `src/components/data/`, `src/components/preview/`, `src/components/ui/`, `src/services/`, `src/store/`, `src/lib/`
  - Buat file `src/lib/utils.ts` dengan fungsi utilitas dasar (UUID generator, sanitasi nama file, format tanggal)
  - _Persyaratan: 1.1, 4.1, 8.1, 11.1, 13.1_

- [x] 2. Implementasi Storage Layer (IndexedDB via Dexie.js)
  - [x] 2.1 Buat skema database Dexie.js di `src/store/db.ts`
    - Definisikan class `CertificateGeneratorDB extends Dexie` dengan tabel `projects`, `templates`, dan `recipients`
    - Tentukan indeks untuk setiap tabel (primary key `id`, indeks `projectId` untuk `recipients`)
    - _Persyaratan: 1.1, 1.3, 17.1_

  - [x] 2.2 Buat `src/services/projectService.ts`
    - Implementasikan fungsi CRUD: `createProject`, `getProject`, `getAllProjects`, `updateProject`, `deleteProject`
    - `deleteProject` harus menghapus proyek beserta seluruh `recipients` terkait (cascade delete)
    - Tangani exception Dexie dan lempar error yang deskriptif
    - _Persyaratan: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 2.3 Tulis property test untuk round-trip simpan/muat proyek
    - **Properti 2: Round-trip Simpan dan Muat Proyek**
    - Generator: buat `CanvasConfig` acak dengan berbagai kombinasi elemen menggunakan fast-check
    - Simpan ke IndexedDB mock (fake-indexeddb), muat ulang, bandingkan dengan deep equality
    - Jalankan minimal 100 iterasi
    - Tag: `// Feature: certificate-generator, Property 2: round-trip simpan muat proyek`
    - **Memvalidasi: Persyaratan 17.5**

- [x] 3. Implementasi Data Parser Service
  - [x] 3.1 Buat `src/services/dataParserService.ts`
    - Implementasikan `parseXLSX(file: File): Promise<ParseResult>` menggunakan SheetJS
    - Implementasikan `parseCSV(file: File): Promise<ParseResult>` menggunakan parser CSV standar
    - Implementasikan `serializeRecipients(recipients: Recipient[]): string` (ke JSON)
    - Implementasikan `deserializeRecipients(json: string): Recipient[]` (dari JSON)
    - Tangani kasus file kosong (hanya header) dengan mengembalikan peringatan, bukan error fatal
    - _Persyaratan: 9.1, 9.2, 9.5, 9.6, 17.1_

  - [ ]* 3.2 Tulis property test untuk round-trip parsing file Excel/CSV
    - **Properti 1: Round-trip Parsing File Excel/CSV**
    - Generator: buat array of records acak dengan berbagai tipe string (karakter khusus, unicode, angka) menggunakan fast-check
    - Serialisasi ke format CSV in-memory, parse ulang, bandingkan hasilnya
    - Jalankan minimal 100 iterasi
    - Tag: `// Feature: certificate-generator, Property 1: round-trip parsing file`
    - **Memvalidasi: Persyaratan 9.7**

  - [ ]* 3.3 Tulis unit test untuk Data Parser Service
    - Test parsing CSV dengan berbagai delimiter dan encoding
    - Test penanganan file kosong (hanya header)
    - Test error saat format file tidak didukung
    - _Persyaratan: 9.1, 9.2, 9.5_

- [x] 4. Implementasi logika validasi dan penomoran sertifikat
  - [x] 4.1 Tambahkan fungsi validasi penerima di `src/services/dataParserService.ts` atau file terpisah `src/services/validationService.ts`
    - Implementasikan `validateRecipients(recipients: Recipient[]): ValidationResult` yang memeriksa field nama tidak kosong/whitespace
    - Kembalikan daftar entri bermasalah beserta nomor barisnya jika ada yang tidak valid
    - _Persyaratan: 10.1, 10.2, 10.3_

  - [ ]* 4.2 Tulis property test untuk validasi nama penerima kosong
    - **Properti 4: Validasi Nama Penerima Kosong**
    - Generator: buat daftar penerima acak yang mengandung setidaknya satu nama kosong atau hanya whitespace
    - Jalankan validasi, verifikasi hasilnya selalu `invalid` dan daftar error tidak kosong
    - Jalankan minimal 100 iterasi
    - Tag: `// Feature: certificate-generator, Property 4: validasi nama penerima kosong`
    - **Memvalidasi: Persyaratan 10.1, 10.2**

  - [x] 4.3 Buat `src/services/certificateService.ts` — bagian penomoran
    - Implementasikan `generateCertificateNumber(mode, index, config): string`
    - Dukung mode `auto_increment` (dimulai dari `startIndex`) dan `custom_format` (ganti placeholder `{seq}` dengan angka berurutan)
    - _Persyaratan: 11.1, 11.2, 11.3, 11.4_

  - [ ]* 4.4 Tulis property test untuk keunikan nomor sertifikat
    - **Properti 3: Keunikan Nomor Sertifikat**
    - Generator: buat daftar penerima acak (1–500 penerima) dengan konfigurasi penomoran acak menggunakan fast-check
    - Panggil `generateCertificateNumber` untuk setiap penerima, verifikasi tidak ada duplikat
    - Jalankan minimal 100 iterasi
    - Tag: `// Feature: certificate-generator, Property 3: keunikan nomor sertifikat`
    - **Memvalidasi: Persyaratan 11.4**

  - [ ]* 4.5 Tulis unit test untuk penomoran sertifikat
    - Test mode auto-increment dengan berbagai `startIndex`
    - Test mode format kustom dengan pola seperti `SK/{seq}/IV/2026`
    - Test keunikan nomor untuk daftar penerima konkret
    - _Persyaratan: 11.1, 11.2, 11.3_

- [x] 5. Implementasi Export Service dan QR Service
  - [x] 5.1 Buat `src/services/exportService.ts`
    - Implementasikan `downloadSingle(blob: Blob, filename: string): void`
    - Implementasikan `createZip(files, onProgress): Promise<Blob>` menggunakan JSZip
    - Implementasikan `downloadBlob(blob: Blob, filename: string): void`
    - Implementasikan fungsi sanitasi nama file (hapus karakter ilegal `/ \ : * ? " < > |`)
    - _Persyaratan: 15.1, 15.2, 15.3, 16.2, 16.3, 16.4_

  - [ ]* 5.2 Tulis property test untuk konsistensi nama file ekspor
    - **Properti 5: Konsistensi Nama File Ekspor**
    - Generator: buat nama penerima acak (termasuk karakter unicode, spasi, tanda baca) menggunakan fast-check
    - Panggil fungsi pembuat nama file, verifikasi nama mengandung nama penerima dan tidak ada karakter ilegal
    - Jalankan minimal 100 iterasi
    - Tag: `// Feature: certificate-generator, Property 5: konsistensi nama file ekspor`
    - **Memvalidasi: Persyaratan 15.2, 16.3**

  - [x] 5.3 Buat `src/services/qrService.ts`
    - Implementasikan `generateQRDataURL(certificateNumber: string, size: number): Promise<string>` menggunakan library `qrcode`
    - _Persyaratan: 12.1, 12.3_

  - [ ]* 5.4 Tulis property test untuk QR code round-trip
    - **Properti 6: QR Code Dapat Dipindai dan Mengandung Nomor Sertifikat**
    - Generator: buat nomor sertifikat acak dengan berbagai format (alphanumeric, dengan slash, dengan spasi) menggunakan fast-check
    - Generate QR code sebagai data URL, decode kembali menggunakan library QR decoder, bandingkan dengan input
    - Jalankan minimal 100 iterasi
    - Tag: `// Feature: certificate-generator, Property 6: QR code round-trip`
    - **Memvalidasi: Persyaratan 12.3**

  - [ ]* 5.5 Tulis unit test untuk Export Service
    - Test sanitasi nama file untuk berbagai karakter ilegal
    - Test pembuatan ZIP dengan beberapa file (verifikasi jumlah file dan nama file di dalam ZIP)
    - _Persyaratan: 15.2, 16.2, 16.3_

- [x] 6. Checkpoint — Pastikan semua tests lulus
  - Pastikan semua unit test dan property test yang telah ditulis lulus. Tanyakan kepada pengguna jika ada pertanyaan sebelum melanjutkan.

- [x] 7. Implementasi Template Service
  - [x] 7.1 Buat `src/services/templateService.ts`
    - Implementasikan fungsi CRUD untuk template: `saveTemplate`, `getAllTemplates`, `getTemplate`, `deleteTemplate`
    - Implementasikan `generateThumbnail(canvasConfig: CanvasConfig): Promise<string>` untuk membuat thumbnail base64 PNG
    - Sertakan minimal 3 preset template bawaan dengan `isPreset: true`
    - _Persyaratan: 2.4, 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 8. Implementasi Canvas Editor — Komponen Inti
  - [x] 8.1 Buat `src/components/canvas/CanvasEditor.tsx`
    - Inisialisasi instance `fabric.Canvas` di dalam `useEffect`
    - Implementasikan serialisasi state kanvas ke `CanvasConfig` via `fabric.Canvas.toJSON()`
    - Implementasikan deserialisasi `CanvasConfig` untuk memuat ulang kanvas via `fabric.Canvas.loadFromJSON()`
    - Tangani cleanup instance Fabric.js saat komponen di-unmount
    - _Persyaratan: 17.1, 17.2, 17.3, 17.4_

  - [x] 8.2 Tambahkan fungsionalitas elemen teks dinamis ke `CanvasEditor.tsx`
    - Implementasikan penambahan `Field_Teks` dengan pilihan tipe: `recipient_name`, `certificate_number`, `date`, `event_title`, `custom`
    - Implementasikan drag-and-drop, resize proporsional, dan delete elemen
    - _Persyaratan: 4.1, 4.2, 4.5, 4.6_

  - [x] 8.3 Buat `src/components/canvas/StylePanel.tsx`
    - Implementasikan panel styling untuk `Field_Teks` yang dipilih: jenis font, ukuran font, warna teks, alignment
    - Perubahan styling diterapkan secara langsung ke elemen di kanvas tanpa simpan manual
    - _Persyaratan: 4.3, 4.4_

  - [x] 8.4 Tambahkan fungsionalitas upload logo dan latar belakang ke `CanvasEditor.tsx`
    - Implementasikan upload logo (PNG, JPG, SVG) sebagai elemen gambar di kanvas
    - Implementasikan upload gambar latar belakang dan color picker untuk latar belakang warna solid
    - Validasi format dan ukuran file sebelum membaca file (`file.type` dan `file.size`)
    - _Persyaratan: 2.1, 2.2, 2.3, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3_

  - [x] 8.5 Buat `src/components/canvas/ElementToolbar.tsx`
    - Implementasikan toolbar untuk menambah elemen (teks, logo, tanda tangan, QR code)
    - _Persyaratan: 4.1, 5.1, 7.1_

- [x] 9. Implementasi Signature Manager
  - [x] 9.1 Buat `src/components/canvas/SignatureDrawer.tsx`
    - Implementasikan area gambar interaktif menggunakan HTML Canvas atau Fabric.js free drawing
    - Simpan hasil gambar sebagai data URL base64 PNG
    - _Persyaratan: 7.3_

  - [x] 9.2 Integrasikan Signature Manager ke `CanvasEditor.tsx`
    - Implementasikan upload tanda tangan (PNG, JPG) sebagai elemen di kanvas
    - Implementasikan penyimpanan metadata tanda tangan (nama penandatangan, jabatan) sebagai atribut elemen
    - Implementasikan drag, resize, dan delete elemen tanda tangan
    - _Persyaratan: 7.1, 7.2, 7.4, 7.5, 7.6_

- [x] 10. Implementasi Data Manager — UI dan Import Wizard
  - [x] 10.1 Buat `src/components/data/RecipientForm.tsx`
    - Implementasikan form entri manual dengan field nama penerima dan field kustom dinamis sesuai `FieldDefinition` di kanvas
    - Validasi field nama tidak boleh kosong sebelum menyimpan
    - _Persyaratan: 8.1, 8.2, 8.3, 8.4_

  - [x] 10.2 Buat `src/components/data/ColumnMapper.tsx`
    - Implementasikan antarmuka pemetaan kolom: hubungkan kolom file dengan `Field_Teks` yang ada di kanvas
    - _Persyaratan: 9.3, 9.4_

  - [x] 10.3 Buat `src/components/data/ImportWizard.tsx`
    - Implementasikan wizard multi-langkah: upload file → tampilkan preview data → pemetaan kolom → konfirmasi import
    - Validasi format file (.xlsx atau .csv) dan tampilkan error jika format tidak didukung
    - Tampilkan peringatan jika file tidak memiliki baris data selain header
    - _Persyaratan: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 11. Implementasi halaman-halaman App Router
  - [x] 11.1 Buat `src/app/page.tsx` — Dashboard
    - Tampilkan daftar semua proyek dari `projectService`
    - Implementasikan tombol "Buat Proyek Baru" dengan validasi nama tidak boleh kosong
    - Implementasikan aksi hapus proyek dengan konfirmasi
    - _Persyaratan: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 11.2 Buat `src/app/projects/[id]/editor/page.tsx` — Canvas Editor Page
    - Muat proyek dari `projectService` berdasarkan `id`
    - Render `CanvasEditor` dengan konfigurasi proyek yang dimuat
    - Implementasikan tombol simpan yang memanggil `projectService.updateProject`
    - Sertakan panel pengaturan output (ukuran kertas, orientasi, kualitas, format)
    - _Persyaratan: 1.3, 2.1–2.5, 3.1–3.5, 4.1–4.6, 5.1–5.4, 6.1–6.3, 7.1–7.6, 13.1–13.5_

  - [x] 11.3 Buat `src/app/projects/[id]/data/page.tsx` — Data Manager Page
    - Render `RecipientForm` dan `ImportWizard`
    - Tampilkan daftar penerima yang sudah diimpor/dimasukkan
    - Implementasikan aksi hapus penerima dari daftar
    - _Persyaratan: 8.1–8.4, 9.1–9.6, 10.1–10.3_

  - [x] 11.4 Buat `src/app/projects/[id]/preview/page.tsx` — Preview Page
    - Render `CertificatePreview` untuk penerima pertama saat halaman dibuka
    - Implementasikan navigasi antar penerima (sebelumnya/berikutnya) dan pemilihan dari daftar
    - _Persyaratan: 14.1, 14.2, 14.3, 14.4_

  - [x] 11.5 Buat `src/app/projects/[id]/export/page.tsx` — Export Page
    - Implementasikan tombol "Generate All" dengan konfirmasi
    - Tampilkan indikator progres selama proses render dan pengemasan ZIP
    - Tampilkan ringkasan hasil (berhasil N, gagal M) setelah proses selesai
    - _Persyaratan: 15.1–15.3, 16.1–16.6_

- [x] 12. Implementasi Preview Engine dan Certificate Service — Render
  - [x] 12.1 Buat `src/components/preview/CertificatePreview.tsx`
    - Render pratinjau sertifikat menggunakan Fabric.js off-screen canvas dengan data penerima yang dipilih
    - Ganti placeholder `Field_Teks` dengan nilai aktual dari data penerima
    - _Persyaratan: 14.1, 14.2, 14.3, 14.4_

  - [x] 12.2 Lengkapi `src/services/certificateService.ts` — fungsi render
    - Implementasikan `renderCertificate(canvasConfig, recipient, options): Promise<Blob>`
    - Dukung ekspor ke PDF (via jsPDF), PNG, dan JPG
    - Integrasikan QR code ke dalam render jika `qrEnabled` aktif pada proyek
    - Tangani kegagalan render satu sertifikat: catat error, lanjutkan ke penerima berikutnya
    - _Persyaratan: 12.1, 12.2, 12.4, 13.1–13.5, 15.1, 16.1, 16.6_

- [x] 13. Checkpoint — Pastikan semua tests lulus
  - Pastikan semua unit test, property test, dan integration test lulus. Tanyakan kepada pengguna jika ada pertanyaan sebelum melanjutkan.

- [x] 14. Integrasi penuh dan wiring antar modul
  - [x] 14.1 Hubungkan alur lengkap: Data Manager → Validasi → Certificate Service → Export Service
    - Pastikan `validateRecipients` dipanggil sebelum `renderCertificate` dimulai
    - Pastikan `generateCertificateNumber` dipanggil untuk setiap penerima sebelum render
    - Pastikan `generateQRDataURL` dipanggil dan hasilnya dimasukkan ke kanvas jika QR aktif
    - _Persyaratan: 10.1–10.3, 11.1–11.4, 12.1–12.4, 16.1–16.6_

  - [x] 14.2 Hubungkan Template Library ke Canvas Editor
    - Pastikan "Simpan ke Library" menyimpan konfigurasi kanvas saat ini via `templateService`
    - Pastikan memilih template dari library memuat ulang kanvas dengan konfigurasi template tersebut
    - _Persyaratan: 3.1–3.5_

  - [ ]* 14.3 Tulis integration test untuk alur lengkap
    - Test alur: parse CSV → validasi → render sertifikat → ekspor (dengan mock Fabric.js dan jsPDF)
    - Test interaksi dengan IndexedDB menggunakan fake-indexeddb
    - Test pembuatan ZIP dengan JSZip (verifikasi jumlah file dan nama file di dalam ZIP)
    - _Persyaratan: 9.1, 10.1, 15.1, 16.2_

- [x] 15. Checkpoint akhir — Pastikan semua tests lulus
  - Pastikan semua unit test, property test, dan integration test lulus. Verifikasi bahwa semua persyaratan telah diimplementasikan. Tanyakan kepada pengguna jika ada pertanyaan.

## Catatan

- Task yang ditandai `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan persyaratan spesifik untuk keterlacakan
- Property test dijalankan minimal 100 iterasi menggunakan fast-check
- Semua kode menggunakan TypeScript dengan strict mode
- Komponen yang menggunakan Fabric.js atau API browser harus menggunakan `'use client'` directive
- Gunakan `fake-indexeddb` untuk mock IndexedDB di lingkungan test
