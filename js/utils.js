// js/utils.js

// ========================================
// REKAPITULASI DATA
// ========================================

export function ringkasInventarisAir(data) {
  if (!Array.isArray(data)) {
    throw new TypeError(
      'Kesalahan: Data harus berupa Array!'
    );
  }

  if (data.length === 0) {
    throw new Error(
      'Peringatan: Data masih kosong.'
    );
  }

  return {
    totalLokasi: data.length,

    totalDebit: data.reduce(
      (acc, curr) => acc + curr.jumlah,
      0
    ),

    jumlahBaik: data.filter(
      item => item.kondisi === "Baik"
    ).length,

    jumlahPerluCek: data.filter(
      item => item.kondisi !== "Baik"
    ).length
  };
}


// WEB STORAGE - TEMA
export function inisialisasiTema() {
  const temaTersimpan =
    localStorage.getItem("theme") ?? "light";
  document.documentElement.dataset.theme =
    temaTersimpan;
}

export function gantiTema() {
  const temaSekarang =
    document.documentElement.dataset.theme;
  const temaBerikutnya =
    temaSekarang === "dark"
      ? "light"
      : "dark";

  document.documentElement.dataset.theme =
    temaBerikutnya;
  localStorage.setItem(
    "theme",
    temaBerikutnya
  );
}

// WEB STORAGE - JUMLAH ITEM
export function inisialisasiLimitItem() {
  return (
    localStorage.getItem("limit_item") ?? "5"
  );
}

export function simpanLimitItem(jumlah) {
  localStorage.setItem(
    "limit_item",
    jumlah
  );
}