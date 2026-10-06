// js/app.js

import {
  inisialisasiTema,
  gantiTema,
  inisialisasiLimitItem,
  simpanLimitItem
} from "./utils.js";


// ========================================
// ELEMEN DOM
// ========================================

const containerKartu =
  document.querySelector("#data-titik-air");

const artikelKartu =
  document.querySelectorAll(
    "#data-titik-air > article"
  );

const tombolFilter =
  document.querySelectorAll(
    "[data-filter]"
  );

const tombolTema =
  document.querySelector("#theme-button");

const inputCari =
  document.querySelector("#input-cari");

const selectLimit =
  document.querySelector("#select-limit");


// ========================================
// FILTER, PENCARIAN, DAN LIMIT
// ========================================

function terapkanFilterDanPencarian() {

  const tombolAktif =
    document.querySelector(
      "[data-filter].active"
    );

  const kategoriFilter =
    tombolAktif?.dataset.filter ?? "Semua";

  const kataKunci =
    inputCari?.value
      .toLowerCase()
      .trim() ?? "";

  const limit =
    parseInt(
      selectLimit?.value ?? "5",
      10
    );

  let jumlahTampil = 0;


  artikelKartu.forEach(card => {

    const nama =
      card.dataset.nama
        .toLowerCase();

    const status =
      card.dataset.status;


    // Pencarian berdasarkan nama
    const cocokPencarian =
      nama.includes(kataKunci);


    // Filter status
    const cocokFilter =
      kategoriFilter === "Semua" ||
      status === kategoriFilter;

    // Batasi jumlah kartu
    if (
      cocokPencarian &&
      cocokFilter &&
      jumlahTampil < limit
    ) {
      card.style.display = "block";
      jumlahTampil++;
    } else {
      card.style.display = "none";
    }
  });
}


// EVENT 1: PENCARIAN REAL-TIME
inputCari?.addEventListener(
  "input",
  () => {
    terapkanFilterDanPencarian();
  }
);

// EVENT 2: FILTER STATUS
tombolFilter.forEach(button => {
  button.addEventListener(
    "click",
    () => {
      tombolFilter.forEach(btn => {
        btn.classList.remove(
          "active"
        );
      });
      button.classList.add(
        "active"
      );
      terapkanFilterDanPencarian();
    }
  );
});

// EVENT 3: EVENT DELEGATION DETAIL
containerKartu?.addEventListener(
  "click",
  event => {
    if (
      event.target.classList.contains(
        "btn-detail"
      )
    ) {
      const tombol =
        event.target;
      const nama =
        tombol.dataset.nama;
      const kapasitas =
        tombol.dataset.kapasitas;
      const kekeruhan =
        tombol.dataset.kekeruhan;
      const ph =
        tombol.dataset.ph;

      alert(
        `DATA KUALITAS AIR

Nama Fasilitas: ${nama}
Debit / Kapasitas: ${kapasitas}
Kekeruhan Air: ${kekeruhan}
pH: ${ph}`
      );
    }
  }
);


// ========================================
// EVENT 4: GANTI TEMA
// ========================================

tombolTema?.addEventListener(
  "click",
  () => {
    gantiTema();
  }
);


// ========================================
// EVENT 5: PILIH JUMLAH ITEM
// ========================================

selectLimit?.addEventListener(
  "change",
  event => {

    simpanLimitItem(
      event.target.value
    );

    terapkanFilterDanPencarian();

  }
);


// ========================================
// VALIDASI FORM (LANGKAH PRAKTIKUM & LATIHAN 1-3)
// ========================================

const formAlat = document.querySelector('#form-alat');
const statusForm = document.querySelector('#form-status');

function validateForm(data) {
  const errors = {};

  const rawPelapor = data.get('nama_pelapor');
  const rawNama = data.get('nama');
  const kategori = data.get('kategori');
  const rawJumlah = data.get('jumlah');
  const kondisi = data.get('kondisi');
  const tanggal = data.get('tanggal');

  // LATIHAN 3: Pesan error berbeda untuk field kosong dan format tidak valid (Nama Pelapor)
  if (!rawPelapor || rawPelapor.trim() === "") {
    errors.nama_pelapor = 'Nama pelapor wajib diisi.';
  } else if (String(rawPelapor).trim().length < 3) {
    errors.nama_pelapor = 'Nama pelapor minimal 3 karakter.';
  }

  // LATIHAN 3: Pesan error berbeda untuk field kosong dan format tidak valid (Nama Alat)
  if (!rawNama || rawNama.trim() === "") {
    errors.nama = 'Nama alat wajib diisi.';
  } else {
    const nama = String(rawNama).trim();
    const regexHuruf = /^[A-Za-z\s]+$/;

    if (nama.length < 3) {
      errors.nama = 'Nama alat minimal 3 karakter.';
    } else if (!regexHuruf.test(nama)) {
      errors.nama = 'Nama alat hanya boleh berisi huruf dan spasi (tidak boleh ada angka).';
    }
  }

  // LATIHAN 2: Validasi kategori hanya boleh berasal dari pilihan yang tersedia
  const kategoriValid = ["Tarakan Tengah", "Tarakan Selatan", "Tarakan Barat", "Tarakan Utara"];
  if (!kategori || kategori === "") {
    errors.kategori = 'Kategori wilayah wajib dipilih.';
  } else if (!kategoriValid.includes(kategori)) {
    errors.kategori = 'Kategori wilayah yang dipilih tidak valid.';
  }

  // Validasi Jumlah
  if (!rawJumlah || rawJumlah === "") {
    errors.jumlah = 'Jumlah unit alat wajib diisi.';
  } else {
    const jumlah = Number(rawJumlah);
    if (!Number.isInteger(jumlah) || jumlah < 0) {
      errors.jumlah = 'Jumlah harus bilangan bulat 0 atau lebih.';
    }
  }

  // Validasi Kondisi
  if (!kondisi || kondisi === "") {
    errors.kondisi = 'Kondisi wajib dipilih.';
  }

  // LATIHAN 1: Validasi tanggal perolehan tidak boleh melebihi tanggal hari ini
  if (!tanggal || tanggal === "") {
    errors.tanggal = 'Tanggal perolehan wajib diisi.';
  } else {
    const tglInput = new Date(tanggal);
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    if (tglInput > hariIni) {
      errors.tanggal = 'Tanggal perolehan tidak boleh melebihi tanggal hari ini.';
    }
  }
  return errors;
}

formAlat?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(formAlat);
  const errors = validateForm(data);

  // Bersihkan pesan error dan atribut aria-invalid sebelumnya
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  formAlat.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

  // Tampilkan error dekat field, set aria-invalid, dan fokus ke error pertama
  if (Object.keys(errors).length) {
    for (const [field, message] of Object.entries(errors)) {
      const errorEl = document.querySelector(`#error-${field}`);
      if (errorEl) errorEl.textContent = message;
      formAlat.elements[field]?.setAttribute('aria-invalid', 'true');
    }
    const firstField = Object.keys(errors)[0];
    formAlat.elements[firstField]?.focus();
    statusForm.textContent = 'Periksa kembali data yang belum valid.';
    return;
  }

  // Jika valid, tampilkan status sukses dan kosongkan form kembali
  statusForm.textContent = 'Data valid berhasil dicatat secara lokal.';
  formAlat.reset();
});


// ========================================
// INISIALISASI
// ========================================
inisialisasiTema();
if (selectLimit) {
  selectLimit.value =
    inisialisasiLimitItem();
}
terapkanFilterDanPencarian();