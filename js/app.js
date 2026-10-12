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
    const tombol = event.target.closest(".btn-detail");
    if (tombol) {
      const nama = tombol.dataset.nama;
      const kapasitas = tombol.dataset.kapasitas;
      const kekeruhan = tombol.dataset.kekeruhan;
      const ph = tombol.dataset.ph;

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

  if (!rawPelapor || rawPelapor.trim() === "") {
    errors.nama_pelapor = 'Nama pelapor wajib diisi.';
  } else if (String(rawPelapor).trim().length < 3) {
    errors.nama_pelapor = 'Nama pelapor minimal 3 karakter.';
  }

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

  const kategoriValid = ["Tarakan Tengah", "Tarakan Selatan", "Tarakan Barat", "Tarakan Utara"];
  if (!kategori || kategori === "") {
    errors.kategori = 'Kategori wilayah wajib dipilih.';
  } else if (!kategoriValid.includes(kategori)) {
    errors.kategori = 'Kategori wilayah yang dipilih tidak valid.';
  }

  if (!rawJumlah || rawJumlah === "") {
    errors.jumlah = 'Jumlah unit alat wajib diisi.';
  } else {
    const jumlah = Number(rawJumlah);
    if (!Number.isInteger(jumlah) || jumlah < 0) {
      errors.jumlah = 'Jumlah harus bilangan bulat 0 atau lebih.';
    }
  }

  if (!kondisi || kondisi === "") {
    errors.kondisi = 'Kondisi wajib dipilih.';
  }

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

  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  formAlat.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

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



// MODUL 07 - FETCH API (CONTOH PRAKTIKUM)


async function loadUsers() {
  try {
    console.log("Memulai request API...");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const users = await response.json();
    console.log(`Berhasil memuat ${users.length} data pengguna dari API.`);
  } catch (error) {
    console.error("Gagal memuat API:", error);
  }
}


// KODE LANGKAH 4 & 5: RENDER DATA KE DOM


// ========================================
// MODUL 07 - FETCH API DENGAN OPSI FALLBACK LOKAL
// ========================================

const apiOutput = document.querySelector("#api-output");
const apiMessage = document.querySelector("#api-message");
const btnRetry = document.querySelector("#btn-retry");

// 1. Letakkan konfigurasi switch data lokal di sini
const USE_LOCAL_DATA = false; // Ubah ke true jika ingin menggunakan file lokal ./data/users.json

async function loadUsersPraktikum() {
  if (apiMessage) {
    apiMessage.textContent = "Memuat data...";
  }
  if (btnRetry) {
    btnRetry.style.display = "none";
  }

  try {
    // 2. Tentukan endpoint berdasarkan status USE_LOCAL_DATA
    const endpoint = USE_LOCAL_DATA
      ? './data/users.json'
      : 'https://jsonplaceholder.typicode.com/users';

    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = await response.json();

    if (apiOutput) {
      apiOutput.replaceChildren();
      
      users.slice(0, 5).forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        apiOutput.append(li);
      });
    }

    if (apiMessage) {
      apiMessage.textContent = `Berhasil memuat ${users.length} data pengguna.`;
    }

  } catch (error) {
    console.error("Gagal memuat:", error);
    if (apiMessage) {
      apiMessage.textContent = "Data belum dapat dimuat. Coba kembali.";
    }
    if (btnRetry) {
      btnRetry.style.display = "inline-block";
    }
  }
}

btnRetry?.addEventListener("click", () => {
  loadUsersPraktikum();
});

loadUsersPraktikum();


const inputLoginAdmin = document.querySelector("#username");

inputLoginAdmin?.addEventListener("input", () => {
  const keyword = inputLoginAdmin.value.toLowerCase().trim();
  const listItems = apiOutput?.querySelectorAll("li");

  listItems?.forEach(li => {
    const text = li.textContent.toLowerCase();
    if (text.includes(keyword)) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
});

async function tambahDataBaru() {
  const dataBaru = {
    title: "Laporan Air Baru",
    body: "Kondisi air aman.",
    userId: 1
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(dataBaru)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const hasil = await response.json();
    console.log("Hasil POST Berhasil:", hasil);
  } catch (error) {
    console.error("Gagal POST:", error);
  }
}


// Jalankan fungsinya
loadUsersPraktikum();
