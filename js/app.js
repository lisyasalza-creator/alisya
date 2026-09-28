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

const formPengaduan =
  document.querySelector("#form-pengaduan");

const pesanPengaduan =
  document.querySelector("#pesan-pengaduan");


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


// ========================================
// EVENT 3: EVENT DELEGATION DETAIL
// ========================================

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
// EVENT TAMBAHAN: FORM PENGADUAN
// ========================================

formPengaduan?.addEventListener(
  "submit",
  event => {
    event.preventDefault();
    pesanPengaduan.textContent =
      "Laporan berhasil dicatat secara lokal. Terima kasih.";

    formPengaduan.reset();

  }
);


// ========================================
// INISIALISASI
// ========================================

inisialisasiTema();


if (selectLimit) {

  selectLimit.value =
    inisialisasiLimitItem();

}


terapkanFilterDanPencarian();