# Portal Informasi & Monitoring Air Kota Tarakan

Portal layanan untuk memantau ketersediaan air bersih, informasi fasilitas
air, serta menyediakan fasilitas pelaporan gangguan air bagi warga Kota Tarakan.

## Informasi Pengembang

- **Nama:** Alisya Salza Nabilla
- **NIM:** 2440304011
- **Mata Kuliah:** Pemrograman Web
- **Program Studi:** Teknik Komputer
- **Universitas:** Universitas Borneo Tarakan

---

## Deskripsi Proyek

Portal Informasi & Monitoring Air Kota Tarakan merupakan website yang
digunakan untuk memberikan informasi mengenai titik/fasilitas air yang
tersedia di Kota Tarakan.

Website menyediakan beberapa bagian utama, yaitu:

- Beranda
- Data Titik Air
- Pengaduan Warga
- Login Admin

Pada bagian Data Titik Air, pengguna dapat melihat informasi fasilitas air,
status, wilayah, serta detail seperti kapasitas, kekeruhan, dan pH.

Pada bagian Pengaduan Warga, pengguna dapat memasukkan data pelapor dan
informasi fasilitas yang ingin dilaporkan.

---

## Sitemap / Arsitektur Halaman

Struktur utama halaman website terdiri dari:

- **Header**
  - Logo Portal Air Tarakan
  - Beranda
  - Data Titik Air
  - Pengaduan Warga
  - Login Admin

- **Main Content**
  - **Beranda**
    - Deskripsi layanan
    - Ringkasan status air
    - Total titik pantau
    - Status air

  - **Data Titik Air**
    - IPA Rawasari
    - IPA Binalatung
    - IPA Persemaian
    - IPA Indulung
    - Informasi status
    - Wilayah
    - Detail kapasitas, kekeruhan, dan pH

  - **Pengaduan Warga**
    - Nama pelapor
    - Nama alat/fasilitas
    - Kategori wilayah
    - Jumlah warga terdampak
    - Kondisi
    - Tanggal
    - Tombol Kirim Laporan

  - **Login Admin**
    - Username
    - Password
    - Tombol Masuk

- **Footer**
  - Hak cipta
  - Nama pembuat

---

## Fitur Interaksi Website

Website memiliki beberapa interaksi menggunakan JavaScript, yaitu:

1. **Pencarian fasilitas air**
   - Pengguna dapat mencari fasilitas berdasarkan nama.

2. **Filter status**
   - Pengguna dapat menampilkan fasilitas berdasarkan status
     seperti Baik dan Perlu Cek.

3. **Detail fasilitas**
   - Pengguna dapat melihat informasi detail fasilitas air.

4. **Ganti tema**
   - Pengguna dapat mengubah tema tampilan website.

5. **Pilih jumlah item**
   - Pengguna dapat menentukan jumlah data fasilitas yang ditampilkan.

---

## Form Pengaduan Warga

Form utama yang digunakan pada proyek adalah:

**Form Pendataan & Pengaduan Fasilitas Air**

Form digunakan untuk memasukkan data:

- Nama pelapor
- Nama alat/fasilitas
- Kategori wilayah
- Jumlah warga terdampak
- Kondisi
- Tanggal

Form menggunakan label pada setiap input agar pengguna dapat mengetahui
fungsi dari masing-masing field.

---

## Validasi Form

Validasi form dilakukan menggunakan HTML dan JavaScript.

### HTML Validation

Beberapa aturan validasi HTML yang digunakan yaitu:

- `required` untuk field yang wajib diisi.
- `minlength` untuk menentukan panjang minimal teks.
- `min` untuk menentukan nilai minimal jumlah.
- `type="number"` untuk input jumlah.
- `type="date"` untuk input tanggal.

Validasi HTML digunakan untuk melakukan pemeriksaan dasar terhadap data
yang dimasukkan pengguna.

### JavaScript Business Validation

JavaScript digunakan untuk melakukan validasi aturan yang lebih khusus.

Aturan validasi yang diterapkan:

1. Nama pelapor wajib diisi.
2. Nama pelapor minimal 3 karakter.
3. Nama alat wajib diisi.
4. Nama alat minimal 3 karakter.
5. Nama alat hanya boleh menggunakan huruf dan spasi.
6. Kategori wilayah wajib dipilih.
7. Kategori harus berasal dari pilihan wilayah yang tersedia.
8. Jumlah harus berupa bilangan bulat 0 atau lebih.
9. Kondisi wajib dipilih.
10. Tanggal wajib diisi.
11. Tanggal perolehan tidak boleh melebihi tanggal hari ini.

---

## Pesan Error dan Accessibility

Pesan error ditampilkan pada bagian yang dekat dengan field yang mengalami
kesalahan agar pengguna lebih mudah mengetahui bagian yang harus diperbaiki.

Contoh pesan error:

- "Nama pelapor wajib diisi."
- "Nama pelapor minimal 3 karakter."
- "Nama alat wajib diisi."
- "Nama alat minimal 3 karakter."
- "Nama alat hanya boleh berisi huruf dan spasi (tidak boleh ada angka)."
- "Kategori wilayah wajib dipilih."
- "Kategori wilayah yang dipilih tidak valid."
- "Jumlah harus bilangan bulat 0 atau lebih."
- "Kondisi wajib dipilih."
- "Tanggal perolehan wajib diisi."
- "Tanggal perolehan tidak boleh melebihi tanggal hari ini."

Untuk membantu aksesibilitas, field yang mengalami kesalahan diberikan
atribut `aria-invalid="true"`. Setelah validasi gagal, fokus juga diarahkan
ke field pertama yang mengalami kesalahan.

---

## Hasil Pengujian Form

Pengujian dilakukan menggunakan beberapa skenario data valid dan tidak valid.

### Skenario Data Valid

Data diisi dengan nilai yang sesuai dengan aturan validasi.

Contoh:

- Nama Pelapor: Alisya Salza
- Nama Alat/Fasilitas: Pompa Rawasari
- Kategori: Tarakan Tengah
- Jumlah: 50
- Kondisi: Baik
- Tanggal: tanggal yang tidak melebihi hari ini

Hasil:

> Data valid berhasil dicatat secara lokal.

### Skenario Data Tidak Valid

#### 1. Nama pelapor kosong

Hasil:

> Nama pelapor wajib diisi.

#### 2. Nama pelapor kurang dari 3 karakter

Hasil:

> Nama pelapor minimal 3 karakter.

#### 3. Nama alat menggunakan angka

Contoh:

> Pompa123

Hasil:

> Nama alat hanya boleh berisi huruf dan spasi (tidak boleh ada angka).

#### 4. Kategori belum dipilih

Hasil:

> Kategori wilayah wajib dipilih.

#### 5. Jumlah tidak valid

Contoh memasukkan nilai negatif.

Hasil:

> Jumlah harus bilangan bulat 0 atau lebih.

#### 6. Kondisi belum dipilih

Hasil:

> Kondisi wajib dipilih.

#### 7. Tanggal melebihi tanggal hari ini

Hasil:

> Tanggal perolehan tidak boleh melebihi tanggal hari ini.

---

## Tugas OBE 6 - Form Aksesibel dan Validasi

Tugas OBE 6 menggunakan form utama yang benar-benar digunakan dalam
proyek individu, yaitu Form Pendataan & Pengaduan Fasilitas Air.

Pengerjaan Tugas OBE mencakup HTML validation, JavaScript business
validation, pesan error yang mudah dipahami, accessibility, peer/code review,
perbaikan form, dan dokumentasi commit.

### Form Utama

Form digunakan sebagai bagian dari fitur Pengaduan Warga pada Portal
Informasi & Monitoring Air Kota Tarakan.

Form memiliki beberapa field untuk menerima informasi dari pengguna,
yaitu nama pelapor, fasilitas yang dilaporkan, wilayah, jumlah warga
terdampak, kondisi, dan tanggal.

### Aturan Validasi

Validasi HTML digunakan untuk pemeriksaan dasar seperti field wajib diisi,
panjang input, nilai minimal, serta tipe data.

JavaScript digunakan untuk aturan bisnis seperti pemeriksaan nama,
kategori, jumlah, kondisi, dan tanggal.

### Pesan Error

Pesan error dibuat lebih spesifik agar pengguna dapat mengetahui kesalahan
yang terjadi dan dapat memperbaiki input yang diberikan.

### Accessibility

Field yang mengalami kesalahan diberikan `aria-invalid="true"` dan fokus
diarahkan ke field error pertama agar pengguna dapat mengetahui bagian yang
harus diperbaiki.

---

## Peer / Code Review

Review dilakukan untuk memeriksa bagian form, validasi, pesan error, dan
aksesibilitas.

### Temuan Review

Beberapa bagian yang diperiksa meliputi:

- Ketepatan penggunaan tipe input.
- Kelengkapan validasi.
- Kejelasan pesan error.
- Validasi kategori.
- Validasi tanggal.
- Penanganan field yang mengalami kesalahan.
- Penggunaan `aria-invalid`.
- Fokus pada field error pertama.

### Hasil Perbaikan

Setelah review, bagian validasi diperiksa kembali dan diperbaiki agar
pesan error lebih jelas serta setiap kesalahan dapat diketahui oleh
pengguna.

Perbaikan juga mencakup validasi kategori, validasi tanggal, dan
penanganan accessibility pada field yang tidak valid.

---

## Commit History Modul 6

Perubahan pada Modul 6 disimpan menggunakan Git sebagai bagian dari
proses pengerjaan proyek.

Commit yang berkaitan dengan Modul 6 dicatat pada repository.

### Daftar Commit

- **[Isi dengan nama/hash commit pertama]**
  - Menambahkan atau memperbaiki form pengaduan.

- **[Isi dengan nama/hash commit kedua]**
  - Menambahkan validasi form dan pesan error.

- **[Isi dengan nama/hash commit ketiga]**
  - Melakukan perbaikan validasi dan accessibility setelah review.

> Catatan: nama atau hash commit di atas diganti dengan commit yang benar-benar
> terdapat pada repository.

---

## Refleksi Client-side dan Server-side Validation

Client-side validation adalah validasi yang dilakukan pada sisi pengguna,
yaitu browser. Pada proyek ini, client-side validation dilakukan menggunakan
HTML dan JavaScript.

Client-side validation berguna untuk memberikan feedback secara langsung
ketika pengguna memasukkan data yang tidak sesuai. Dengan begitu, pengguna
dapat mengetahui kesalahan sebelum data diproses lebih lanjut.

Namun, client-side validation tidak dapat menggantikan server-side
validation. Data yang berada pada sisi client masih dapat dimanipulasi oleh
pengguna.

Jika website nantinya sudah terhubung dengan server atau database, data
tetap harus divalidasi kembali pada sisi server sebelum disimpan.

---

## Wireframe Sederhana

Struktur sederhana halaman website:

```text
+----------------------------------------------------------+
| [Logo] PORTAL AIR TARAKAN                                |
| Beranda | Data Titik Air | Pengaduan Warga | Login Admin|
+----------------------------------------------------------+

| BERANDA                                                  |
| Portal Informasi & Monitoring Air Kota Tarakan           |
| Layanan untuk memantau ketersediaan air bersih           |
|                                                          |
| [Cari Titik Air]       [Buat Laporan]                    |
|                                                          |
| Ringkasan Status Air Kota Tarakan                        |
| Total Titik Pantau : 4 Lokasi                            |
| Status Air         : Aktif & Terpantau                   |
+----------------------------------------------------------+

| KONTROL DATA AIR                                         |
|                                                          |
| Cari fasilitas air: [____________________]               |
|                                                          |
| [Semua] [Baik] [Perlu Cek]                               |
|                                                          |
| Tampilkan: [5 Item v]                                    |
|                                                          |
| [Ganti Tema]                                              |
+----------------------------------------------------------+

| DATA TITIK AIR                                           |
|                                                          |
| [IPA Rawasari]                                           |
| Foto                                                     |
| Status: Normal / Lancar                                  |
| Wilayah: Tarakan Tengah                                  |
| [Detail]                                                 |
|                                                          |
| [IPA Binalatung]                                         |
| Foto                                                     |
| Status: Normal / Lancar                                  |
| Wilayah: Tarakan Selatan                                 |
| [Detail]                                                 |
|                                                          |
| [IPA Persemaian]                                         |
| Foto                                                     |
| Status: Perlu Cek                                        |
| Wilayah: Tarakan Barat                                   |
| [Detail]                                                 |
|                                                          |
| [IPA Indulung]                                           |
| Foto                                                     |
| Status: Normal / Lancar                                  |
| Wilayah: Tarakan Utara                                   |
| [Detail]                                                 |
+----------------------------------------------------------+

| FORM PENDATAAN & PENGADUAN FASILITAS AIR                 |
|                                                          |
| Nama Pelapor       : [____________________]              |
| Nama Alat/Fasilitas: [____________________]              |
| Kategori           : [Pilih Kategori v]                  |
| Jumlah Warga       : [____________________]              |
| Kondisi            : [Pilih Kondisi v]                   |
| Tanggal            : [____________________]              |
|                                                          |
|                     [Kirim Laporan]                      |
+----------------------------------------------------------+

| LOGIN ADMIN                                              |
|                                                          |
| Username : [____________________]                        |
| Password : [____________________]                        |
|                                                          |
|                     [Masuk]                              |
+----------------------------------------------------------+

| Footer - Portal Sumber Daya Air Kota Tarakan             |
| Alisya Salza Nabilla                                     |
+----------------------------------------------------------+