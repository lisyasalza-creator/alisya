# Portal Informasi & Monitoring Air Kota Tarakan

Portal layanan terpadu untuk memantau ketersediaan air bersih, spesifikasi kualitas air baku, dan fasilitas pelaporan gangguan bagi warga Kota Tarakan.

## Informasi Pengembang
* **Nama:** Alisya Salza Nabilla
* **NIM:** 2440304011
* **Mata Kuliah:** Pemrograman Web

---

## Sitemap / Arsitektur Halaman
* **Header:** Navigation Menu & Skip Link Access
* **Main Content (`#main`)**
  * **Section 1 (`#beranda`):** Deskripsi Layanan & Ringkasan Status Air
  * **Section 2 (`#data-titik-air`):** Status Sumber Daya Air & Tabel Kualitas Air (IPA Kampung Satu, IPA Binalatung, Embung Juata Permai)
  * **Section 3 (`#pengaduan-warga`):** Form Pelaporan Gangguan Air Warga
  * **Section 4 (`#login-admin`):** Form Login Operator & Administrator
* **Footer:** Hak Cipta & Identitas Pembuat

---

## Wireframe Sederhana (Layout Struktur HTML5)
```text
+-----------------------------------------------------------------------+
|  [Logo] PORTAL AIR TARAKAN        [Beranda] [Titik Air] [Pengaduan]   | <header> / <nav>
+-----------------------------------------------------------------------+
|  # BERANDA                                                            |
|  Portal Informasi & Monitoring Air Kota Tarakan                       | <section id="beranda">
|  - Ringkasan Status Air (Total Titik Pantau, Status Normal, Laporan)  |
+-----------------------------------------------------------------------+
|  ## DATA TITIK AIR                                                    |
|  +-----------------------------------------------------------------+  |
|  | IPA Kampung Satu / IPA Binalatung / Embung Juata Permai         |  | <section id="data-titik-air">
|  | [Tabel Parameter Kualitas Air: Debit, Kekeruhan, pH, status]    |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
|  ## FORM PENGADUAN WARGA                                              |
|  [ Input Nama Pelapor     ]                                           | <section id="pengaduan-warga">
|  [ Input No. WhatsApp     ]                                           |
|  [ Select Lokasi Sumber   ]                                           |
|  [ Textarea Detail        ]                                           |
|  [ Tombol Kirim           ]                                           |
+-----------------------------------------------------------------------+
|  ## LOGIN ADMIN / OPERATOR                                            |
|  [ Input Username Admin   ]                                           | <section id="login-admin">
|  [ Input Password         ]                                           |
|  [ Tombol Masuk           ]                                           |
+-----------------------------------------------------------------------+
|  (c) 2026 Portal Sumber Daya Air Tarakan - Alisya Salza Nabilla      | <footer>
+-----------------------------------------------------------------------+
+-----------------------------------------------------------------------+
+-----------------------------------------------------------------------+
