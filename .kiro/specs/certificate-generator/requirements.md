# Dokumen Persyaratan

## Pendahuluan

Certificate Generator adalah platform berbasis web untuk pembuatan sertifikat secara massal. Pengguna dapat mendesain template sertifikat menggunakan editor kanvas drag-and-drop, mengimpor data penerima dari file Excel/CSV, mengatur tanda tangan digital, dan mengekspor sertifikat dalam format PDF atau gambar yang dikemas dalam satu file ZIP. Platform ini dirancang untuk penggunaan personal guna mendukung efisiensi workflow dari desain hingga distribusi sertifikat kegiatan atau workshop.

## Glosarium

- **Sistem**: Aplikasi Certificate Generator secara keseluruhan.
- **Canvas_Editor**: Komponen editor visual berbasis kanvas yang mendukung interaksi drag-and-drop.
- **Template_Engine**: Modul yang mengelola template sertifikat, termasuk upload, penyimpanan, dan pemuatan ulang.
- **Template**: Desain dasar sertifikat yang terdiri dari latar belakang, elemen teks, logo, dan tanda tangan.
- **Template_Library**: Repositori penyimpanan template yang telah dibuat atau diunggah oleh pengguna.
- **Elemen**: Objek individual di atas kanvas, seperti teks, logo, atau tanda tangan.
- **Field_Teks**: Elemen teks dinamis pada kanvas yang nilainya diisi dari data penerima.
- **Data_Manager**: Modul yang mengelola input, impor, validasi, dan pemetaan data penerima.
- **Penerima**: Individu yang akan menerima sertifikat, beserta data terkaitnya.
- **Signature_Manager**: Modul yang mengelola penambahan, penggambaran, dan pengaturan posisi tanda tangan.
- **Tanda_Tangan**: Elemen visual berupa gambar tanda tangan beserta metadata nama dan jabatan penandatangan.
- **Certificate_Generator**: Modul yang memproses render sertifikat akhir berdasarkan template dan data penerima.
- **Export_Manager**: Modul yang mengelola ekspor sertifikat ke format PDF, gambar, atau ZIP.
- **QR_Generator**: Modul yang membuat kode QR unik per penerima untuk keperluan verifikasi.
- **Preview_Engine**: Modul yang menampilkan pratinjau sertifikat per penerima sebelum proses render akhir.
- **Nomor_Sertifikat**: Identifikasi unik per sertifikat, dapat berupa auto-increment atau format kustom.
- **Proyek**: Unit kerja yang mengelompokkan satu template dengan satu set data penerima.

---

## Persyaratan

### Persyaratan 1: Manajemen Proyek

**User Story:** Sebagai pengguna, saya ingin membuat dan mengelola proyek sertifikat, agar saya dapat mengorganisir setiap kegiatan secara terpisah.

#### Kriteria Penerimaan

1. THE Sistem SHALL menampilkan daftar semua proyek yang telah dibuat pada halaman dashboard.
2. WHEN pengguna memilih "Buat Proyek Baru", THE Sistem SHALL membuat proyek baru dengan nama yang dimasukkan pengguna dan mengarahkan pengguna ke tahap desain.
3. WHEN pengguna memilih proyek yang sudah ada dari daftar, THE Sistem SHALL memuat proyek tersebut beserta template dan data penerima yang tersimpan.
4. WHEN pengguna menghapus sebuah proyek, THE Sistem SHALL menghapus proyek beserta seluruh data penerima dan konfigurasi terkait secara permanen.
5. IF nama proyek yang dimasukkan pengguna kosong, THEN THE Sistem SHALL menampilkan pesan kesalahan dan mencegah pembuatan proyek.

---

### Persyaratan 2: Upload dan Manajemen Template

**User Story:** Sebagai pengguna, saya ingin mengunggah gambar atau PDF sebagai latar belakang template sertifikat, agar saya dapat menggunakan desain yang sudah saya siapkan sebelumnya.

#### Kriteria Penerimaan

1. WHEN pengguna mengunggah file dengan format PNG, JPG, atau PDF, THE Template_Engine SHALL memuat file tersebut sebagai latar belakang kanvas.
2. IF pengguna mengunggah file dengan format selain PNG, JPG, atau PDF, THEN THE Template_Engine SHALL menampilkan pesan kesalahan yang menyebutkan format yang didukung.
3. IF ukuran file yang diunggah melebihi 20 MB, THEN THE Template_Engine SHALL menampilkan pesan kesalahan dan membatalkan proses upload.
4. THE Template_Engine SHALL menyediakan minimal 3 preset template bawaan yang dapat langsung digunakan tanpa upload.
5. WHEN pengguna memilih preset template bawaan, THE Canvas_Editor SHALL memuat preset tersebut sebagai latar belakang kanvas beserta elemen default-nya.

---

### Persyaratan 3: Template Library (Simpan dan Pakai Ulang)

**User Story:** Sebagai pengguna, saya ingin menyimpan template yang sudah saya desain ke dalam library, agar saya dapat menggunakannya kembali di proyek lain tanpa mendesain ulang.

#### Kriteria Penerimaan

1. WHEN pengguna memilih "Simpan ke Library", THE Template_Library SHALL menyimpan konfigurasi kanvas saat ini termasuk semua elemen, posisi, dan styling sebagai satu entri template.
2. THE Template_Library SHALL menampilkan semua template yang tersimpan beserta nama dan pratinjau thumbnail-nya.
3. WHEN pengguna memilih template dari Template_Library, THE Canvas_Editor SHALL memuat template tersebut dan menggantikan konfigurasi kanvas yang sedang aktif.
4. WHEN pengguna menghapus template dari Template_Library, THE Template_Library SHALL menghapus entri template tersebut secara permanen.
5. IF Template_Library tidak memiliki template yang tersimpan, THE Template_Library SHALL menampilkan pesan panduan untuk menyimpan template pertama.

---

### Persyaratan 4: Canvas Editor — Elemen Teks Dinamis

**User Story:** Sebagai pengguna, saya ingin menambahkan dan mengatur elemen teks dinamis di atas kanvas, agar nama penerima dan informasi lainnya dapat terisi otomatis saat generate.

#### Kriteria Penerimaan

1. WHEN pengguna menambahkan Field_Teks ke kanvas, THE Canvas_Editor SHALL menampilkan Field_Teks tersebut dengan tipe yang dapat dipilih: nama penerima, nomor sertifikat, tanggal, judul kegiatan, atau field tambahan kustom.
2. WHILE pengguna menyeret sebuah Elemen di atas kanvas, THE Canvas_Editor SHALL memperbarui posisi Elemen tersebut secara real-time mengikuti gerakan kursor.
3. WHEN pengguna memilih sebuah Field_Teks, THE Canvas_Editor SHALL menampilkan panel styling yang memungkinkan pengguna mengubah jenis font, ukuran font, warna teks, dan alignment (kiri, tengah, kanan).
4. WHEN pengguna mengubah properti styling sebuah Field_Teks, THE Canvas_Editor SHALL menerapkan perubahan tersebut secara langsung pada Field_Teks di kanvas tanpa perlu menyimpan manual.
5. WHEN pengguna mengubah ukuran sebuah Elemen menggunakan handle resize, THE Canvas_Editor SHALL mengubah dimensi Elemen tersebut secara proporsional.
6. WHEN pengguna menghapus sebuah Elemen dari kanvas, THE Canvas_Editor SHALL menghilangkan Elemen tersebut dari kanvas dan dari daftar elemen aktif.

---

### Persyaratan 5: Canvas Editor — Logo dan Gambar

**User Story:** Sebagai pengguna, saya ingin mengunggah dan mengatur posisi logo di atas kanvas, agar sertifikat dapat mencerminkan identitas organisasi saya.

#### Kriteria Penerimaan

1. WHEN pengguna mengunggah file logo dengan format PNG, JPG, atau SVG, THE Canvas_Editor SHALL menampilkan logo tersebut sebagai Elemen gambar di atas kanvas.
2. WHEN pengguna menyeret Elemen logo, THE Canvas_Editor SHALL memperbarui posisi logo secara real-time.
3. WHEN pengguna mengubah ukuran Elemen logo menggunakan handle resize, THE Canvas_Editor SHALL mengubah dimensi logo dengan mempertahankan rasio aspek aslinya.
4. IF pengguna mengunggah file logo dengan format selain PNG, JPG, atau SVG, THEN THE Canvas_Editor SHALL menampilkan pesan kesalahan yang menyebutkan format yang didukung.

---

### Persyaratan 6: Canvas Editor — Latar Belakang

**User Story:** Sebagai pengguna, saya ingin mengatur latar belakang kanvas menggunakan warna solid atau gambar, agar tampilan sertifikat sesuai dengan kebutuhan desain saya.

#### Kriteria Penerimaan

1. WHEN pengguna memilih warna dari color picker, THE Canvas_Editor SHALL menerapkan warna tersebut sebagai latar belakang kanvas secara langsung.
2. WHEN pengguna mengunggah gambar sebagai latar belakang, THE Canvas_Editor SHALL menampilkan gambar tersebut sebagai latar belakang kanvas dengan ukuran menyesuaikan dimensi kanvas.
3. WHEN pengguna mengganti latar belakang dengan opsi baru, THE Canvas_Editor SHALL menggantikan latar belakang sebelumnya tanpa mengubah posisi atau properti Elemen lain di atas kanvas.

---

### Persyaratan 7: Sistem Multi-Tanda Tangan

**User Story:** Sebagai pengguna, saya ingin menambahkan beberapa tanda tangan dengan nama dan jabatan penandatangan, agar sertifikat dapat memiliki lebih dari satu pihak yang mengesahkan.

#### Kriteria Penerimaan

1. THE Signature_Manager SHALL memungkinkan pengguna menambahkan lebih dari satu Tanda_Tangan dalam satu proyek tanpa batasan jumlah yang ditentukan sistem.
2. WHEN pengguna menambahkan Tanda_Tangan melalui metode upload, THE Signature_Manager SHALL menerima file gambar dengan format PNG atau JPG dan menampilkannya sebagai Elemen di atas kanvas.
3. WHEN pengguna menambahkan Tanda_Tangan melalui metode digital draw, THE Signature_Manager SHALL menyediakan area gambar interaktif di browser dan menyimpan hasil gambar sebagai Elemen tanda tangan di atas kanvas.
4. WHEN pengguna mengisi metadata Tanda_Tangan, THE Signature_Manager SHALL menyimpan nama penandatangan dan jabatan penandatangan sebagai atribut dari Elemen tanda tangan tersebut.
5. WHEN pengguna menyeret atau mengubah ukuran Elemen Tanda_Tangan di kanvas, THE Canvas_Editor SHALL memperbarui posisi dan dimensi Elemen tersebut secara real-time.
6. WHEN pengguna menghapus sebuah Tanda_Tangan, THE Signature_Manager SHALL menghilangkan Elemen tanda tangan beserta metadata-nya dari kanvas dan dari daftar tanda tangan aktif.

---

### Persyaratan 8: Input Data Penerima — Manual

**User Story:** Sebagai pengguna, saya ingin memasukkan data penerima satu per satu melalui form, agar saya dapat menambahkan penerima secara individual tanpa perlu menyiapkan file Excel.

#### Kriteria Penerimaan

1. THE Data_Manager SHALL menyediakan form entri manual dengan field: nama penerima dan field tambahan kustom yang sesuai dengan Field_Teks yang telah didefinisikan di kanvas.
2. WHEN pengguna menyimpan entri manual, THE Data_Manager SHALL menambahkan data penerima tersebut ke daftar penerima proyek.
3. IF field nama penerima pada form entri manual dikosongkan, THEN THE Data_Manager SHALL menampilkan pesan kesalahan dan mencegah penyimpanan entri tersebut.
4. WHEN pengguna menghapus entri penerima dari daftar, THE Data_Manager SHALL menghilangkan data penerima tersebut dari daftar penerima proyek.

---

### Persyaratan 9: Import Data Penerima — Bulk (Excel/CSV)

**User Story:** Sebagai pengguna, saya ingin mengimpor daftar penerima dari file Excel atau CSV, agar saya dapat memproses ratusan penerima sekaligus tanpa input manual.

#### Kriteria Penerimaan

1. WHEN pengguna mengunggah file dengan format .xlsx atau .csv, THE Data_Manager SHALL mem-parsing file tersebut dan menampilkan daftar baris data yang ditemukan.
2. IF pengguna mengunggah file dengan format selain .xlsx atau .csv, THEN THE Data_Manager SHALL menampilkan pesan kesalahan yang menyebutkan format yang didukung.
3. WHEN Data_Manager berhasil mem-parsing file, THE Data_Manager SHALL menampilkan antarmuka pemetaan kolom yang memungkinkan pengguna menghubungkan setiap kolom file dengan Field_Teks yang ada di kanvas.
4. WHEN pengguna mengkonfirmasi pemetaan kolom, THE Data_Manager SHALL mengimpor seluruh baris data dari file sebagai entri penerima ke dalam daftar penerima proyek.
5. IF file yang diunggah tidak memiliki baris data selain header, THEN THE Data_Manager SHALL menampilkan pesan peringatan bahwa file tidak memiliki data penerima.
6. THE Data_Manager SHALL mem-parsing file .xlsx menggunakan library SheetJS dan file .csv menggunakan parser CSV standar, sehingga hasil parsing konsisten untuk kedua format.
7. FOR ALL file .xlsx atau .csv yang valid, proses parsing kemudian ekspor ke format internal kemudian parsing ulang SHALL menghasilkan data yang ekuivalen dengan data asli (properti round-trip).

---

### Persyaratan 10: Validasi Data Penerima

**User Story:** Sebagai pengguna, saya ingin sistem memvalidasi data penerima sebelum proses generate, agar sertifikat yang dihasilkan tidak mengandung data yang kosong atau tidak valid.

#### Kriteria Penerimaan

1. WHEN pengguna memulai proses generate, THE Data_Manager SHALL memvalidasi seluruh entri penerima dan memastikan field nama penerima tidak kosong untuk setiap entri.
2. IF terdapat entri penerima dengan field nama yang kosong, THEN THE Data_Manager SHALL menampilkan daftar entri yang bermasalah beserta nomor barisnya dan menghentikan proses generate.
3. WHEN validasi seluruh data penerima berhasil, THE Data_Manager SHALL meneruskan data ke Certificate_Generator untuk memulai proses render.

---

### Persyaratan 11: Format Nomor Sertifikat

**User Story:** Sebagai pengguna, saya ingin mengatur format penomoran sertifikat secara otomatis, agar setiap sertifikat memiliki nomor unik yang sesuai dengan konvensi organisasi saya.

#### Kriteria Penerimaan

1. THE Certificate_Generator SHALL mendukung dua mode penomoran: auto-increment dan format kustom dengan prefix.
2. WHEN mode auto-increment dipilih, THE Certificate_Generator SHALL menetapkan Nomor_Sertifikat untuk setiap penerima secara berurutan dimulai dari angka yang ditentukan pengguna.
3. WHEN mode format kustom dipilih, THE Certificate_Generator SHALL menetapkan Nomor_Sertifikat menggunakan pola yang dimasukkan pengguna, dengan placeholder urutan yang digantikan oleh angka berurutan (contoh: SK/001/IV/2026).
4. THE Certificate_Generator SHALL memastikan setiap Nomor_Sertifikat dalam satu proyek bersifat unik.

---

### Persyaratan 12: Generasi QR Code

**User Story:** Sebagai pengguna, saya ingin setiap sertifikat memiliki QR code unik, agar penerima dapat memverifikasi keaslian sertifikat mereka.

#### Kriteria Penerimaan

1. WHEN pengguna mengaktifkan fitur QR Code pada pengaturan proyek, THE QR_Generator SHALL membuat QR code unik untuk setiap penerima yang mengandung Nomor_Sertifikat penerima tersebut.
2. WHEN QR code berhasil dibuat, THE Canvas_Editor SHALL menampilkan Elemen QR code di atas kanvas pada posisi yang dapat diatur oleh pengguna.
3. THE QR_Generator SHALL memastikan setiap QR code yang dihasilkan dapat dipindai dan menghasilkan data yang sesuai dengan Nomor_Sertifikat penerima terkait.
4. WHILE fitur QR Code tidak diaktifkan, THE Certificate_Generator SHALL menghasilkan sertifikat tanpa elemen QR code.

---

### Persyaratan 13: Pengaturan Output Sertifikat

**User Story:** Sebagai pengguna, saya ingin mengatur ukuran kertas, orientasi, dan kualitas output sebelum generate, agar sertifikat yang dihasilkan sesuai dengan kebutuhan cetak atau distribusi digital.

#### Kriteria Penerimaan

1. THE Certificate_Generator SHALL mendukung pilihan ukuran kertas: A4, A5, Letter, dan Custom (dengan input lebar dan tinggi dalam satuan milimeter).
2. THE Certificate_Generator SHALL mendukung pilihan orientasi: Landscape dan Portrait.
3. THE Certificate_Generator SHALL mendukung pilihan kualitas output: Standard (96 DPI) dan High DPI (300 DPI).
4. WHEN pengguna memilih ukuran Custom, THE Certificate_Generator SHALL menggunakan nilai lebar dan tinggi yang dimasukkan pengguna sebagai dimensi output.
5. IF pengguna memilih ukuran Custom dan tidak mengisi nilai lebar atau tinggi, THEN THE Certificate_Generator SHALL menampilkan pesan kesalahan dan mencegah proses generate.

---

### Persyaratan 14: Pratinjau Sertifikat (Live Preview)

**User Story:** Sebagai pengguna, saya ingin melihat pratinjau sertifikat per penerima sebelum proses render akhir, agar saya dapat memastikan tampilan dan data sudah benar sebelum mengekspor.

#### Kriteria Penerimaan

1. WHEN pengguna membuka halaman Preview, THE Preview_Engine SHALL menampilkan pratinjau sertifikat untuk penerima pertama dalam daftar dengan data yang sudah terpetakan ke Field_Teks yang sesuai.
2. WHEN pengguna berpindah ke penerima berikutnya atau sebelumnya, THE Preview_Engine SHALL memperbarui tampilan pratinjau dengan data penerima yang dipilih dalam waktu kurang dari 2 detik.
3. THE Preview_Engine SHALL menampilkan pratinjau dengan resolusi yang cukup untuk memverifikasi keterbacaan teks dan posisi elemen.
4. WHEN pengguna memilih penerima tertentu dari daftar pada halaman Preview, THE Preview_Engine SHALL menampilkan pratinjau sertifikat penerima tersebut.

---

### Persyaratan 15: Ekspor Sertifikat — Single Download

**User Story:** Sebagai pengguna, saya ingin mengunduh sertifikat satu per satu dalam format PDF atau gambar, agar saya dapat mendistribusikan sertifikat secara individual.

#### Kriteria Penerimaan

1. WHEN pengguna memilih opsi Single Download untuk seorang penerima, THE Export_Manager SHALL menghasilkan file sertifikat dalam format yang dipilih pengguna (PDF, PNG, atau JPG).
2. THE Export_Manager SHALL memberi nama file secara otomatis menggunakan nama penerima sebagai bagian dari nama file (contoh: `Sertifikat_Budi_Santoso.pdf`).
3. WHEN file sertifikat berhasil dihasilkan, THE Export_Manager SHALL memulai proses unduhan file tersebut ke perangkat pengguna secara otomatis.

---

### Persyaratan 16: Ekspor Sertifikat — Bulk Download (ZIP)

**User Story:** Sebagai pengguna, saya ingin mengunduh semua sertifikat sekaligus dalam satu file ZIP, agar saya dapat mendistribusikan sertifikat secara efisien tanpa mengunduh satu per satu.

#### Kriteria Penerimaan

1. WHEN pengguna memilih opsi "Generate All" dan mengkonfirmasi, THE Certificate_Generator SHALL memproses render sertifikat untuk seluruh penerima dalam daftar secara berurutan.
2. WHEN seluruh sertifikat berhasil dirender, THE Export_Manager SHALL mengemas semua file sertifikat ke dalam satu file .zip.
3. THE Export_Manager SHALL memberi nama setiap file sertifikat di dalam ZIP secara otomatis menggunakan nama penerima (contoh: `Sertifikat_Budi_Santoso.pdf`).
4. WHEN file ZIP berhasil dibuat, THE Export_Manager SHALL memulai proses unduhan file ZIP tersebut ke perangkat pengguna secara otomatis.
5. WHILE proses render dan pengemasan berlangsung, THE Sistem SHALL menampilkan indikator progres yang menunjukkan jumlah sertifikat yang telah diproses dari total keseluruhan.
6. IF terjadi kesalahan pada proses render salah satu sertifikat, THEN THE Export_Manager SHALL mencatat entri penerima yang gagal, melanjutkan proses untuk penerima lainnya, dan menampilkan ringkasan kesalahan setelah proses selesai.

---

### Persyaratan 17: Parsing dan Serialisasi Data Internal

**User Story:** Sebagai pengguna, saya ingin konfigurasi proyek saya tersimpan dan dapat dimuat kembali dengan akurat, agar saya tidak kehilangan pekerjaan desain yang sudah saya buat.

#### Kriteria Penerimaan

1. WHEN pengguna menyimpan proyek, THE Sistem SHALL menyimpan seluruh konfigurasi kanvas (posisi elemen, styling, tipe field) ke dalam format JSON.
2. WHEN pengguna membuka proyek yang tersimpan, THE Sistem SHALL mem-parsing konfigurasi JSON dan memuat ulang seluruh elemen kanvas ke posisi dan properti yang tersimpan.
3. IF file konfigurasi proyek tidak dapat di-parsing karena format tidak valid, THEN THE Sistem SHALL menampilkan pesan kesalahan yang deskriptif dan mencegah pemuatan proyek yang rusak.
4. THE Sistem SHALL memformat konfigurasi kanvas kembali ke JSON yang valid setiap kali proyek disimpan.
5. FOR ALL konfigurasi proyek yang valid, proses simpan kemudian muat ulang SHALL menghasilkan konfigurasi kanvas yang identik dengan konfigurasi sebelum disimpan (properti round-trip).
