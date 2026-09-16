const inventarisDenganLokasi = [
  { id: 1, nama: "IPA Rawasari", kategori: "Pengolahan Air", lokasi: "Tarakan Tengah", jumlah: 100, kondisi: "Baik" },
  { id: 2, nama: "IPA Binalatung", kategori: "Pengolahan Air", lokasi: "Tarakan Timur", jumlah: 120, kondisi: "Rusak" },
  { id: 3, nama: "IPA Persemaian", kategori: "Pengolahan Air", lokasi: "Tarakan Utara", jumlah: 80, kondisi: "Rusak" },
  { id: 4, nama: "IPA Indulung", kategori: "Pengolahan Air", lokasi: "Tarakan Barat", jumlah: 1200, kondisi: "Baik" }
];

const targetLokasi = "Tarakan Tengah";
const titikAirDiLokasi = inventarisDenganLokasi.filter(
  (item) => item.lokasi === targetLokasi
);

console.log(`\n=== LATIHAN 1: TITIK AIR DI LOKASI "${targetLokasi}" (filter) ===`);
console.log(titikAirDiLokasi);

function cariAlatDenganId(data, id) {
  return data.find((item) => item.id === id);
}

console.log("\n=== LATIHAN 2: CARI ALAT BERDASARKAN ID (find) ===");
const idCari = 4;
const hasilCari = cariAlatDenganId(inventarisDenganLokasi, idCari);

if (hasilCari) {
  console.log(`Ditemukan data ID ${idCari}:`, hasilCari);
} else {
  console.log(`Data dengan ID ${idCari} tidak ditemukan.`);
}

console.log("\n=== LATIHAN 3: RINGKASAN SETIAP ALAT (Destructuring & Template Literal) ===");
inventarisDenganLokasi.forEach((item) => {
  const { id, nama, kategori, lokasi, jumlah, kondisi } = item;
  const ringkasanText = `[ID: ${id}] ${nama} (${kategori}) - Lokasi: ${lokasi} | Debit: ${jumlah} L/dtk | Kondisi: ${kondisi}`;
  console.log(ringkasanText);
});