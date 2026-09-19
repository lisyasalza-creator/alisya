import { ringkasInventarisAir, cariAlatDenganId } from './utils.js';

// 1. Array of Objects Inventaris Air di Tarakan
const inventarisTitikAir = [
    { id: 1, nama: "IPA Rawasari", kategori: "Pengolahan Air", lokasi: "Tarakan Tengah", jumlah: 100, kondisi: "Baik" },
    { id: 2, nama: "IPA Binalatung", kategori: "Pengolahan Air", lokasi: "Tarakan Timur", jumlah: 120, kondisi: "Rusak" },
    { id: 3, nama: "IPA Persemaian", kategori: "Pengolahan Air", lokasi: "Tarakan Utara", jumlah: 80, kondisi: "Rusak" },
    { id: 4, nama: "IPA Indulung", kategori: "Pengolahan Air", lokasi: "Tarakan Barat", jumlah: 1200, kondisi: "Baik" }
];

console.log("=== 1. DATA Keseluruhan Inventaris Titik Air ===");
console.table(inventarisTitikAir);

// 2. Menggunakan filter untuk mengambil kondisi "Baik"
const titikAirBaik = inventarisTitikAir.filter(item => item.kondisi === "Baik");
console.log("=== 2. Titik Air dengan Kondisi Baik (Filter) ===");
console.log(titikAirBaik);

// 3. Menggunakan map untuk mengambil daftar nama IPA saja
const daftarNamaIPA = inventarisTitikAir.map(item => item.nama);
console.log("=== 3. Daftar Nama IPA (Map) ===");
console.log(daftarNamaIPA);

// 4. Menggunakan reduce untuk menghitung total debit air keseluruhan
const totalDebit = inventarisTitikAir.reduce((total, item) => total + item.jumlah, 0);
console.log("=== 4. Total Debit Air (Reduce) ===");
console.log(`Total kapasitas debit air: ${totalDebit} L/detik`);

// 5. Pencarian data menggunakan .find() dari utils
console.log("=== 5. Pencarian Data Berdasarkan ID (Find) ===");
const hasilCari = cariAlatDenganId(inventarisTitikAir, 4);
if (hasilCari) {
    console.log("Data ditemukan:", hasilCari);
} else {
    console.log("Data tidak ditemukan.");
}

// 6. Destructuring & Template Literal dalam perulangan forEach
console.log("=== 6. Ringkasan Tiap Alat (Destructuring & Template Literal) ===");
inventarisTitikAir.forEach(item => {
    const { id, nama, lokasi, jumlah, kondisi } = item;
    console.log(`[ID: ${id}] ${nama} - Lokasi: ${lokasi} | Debit: ${jumlah} L/dtk | Kondisi: ${kondisi}`);
});

// 7. Implementasi Error Handling (Try...Catch) pada Fungsi Modular
console.log("=== 7. Uji Coba Error Handling (Try...Catch) ===");
try {
    // Memanggil fungsi ringkas dengan data yang valid
    const statistik = ringkasInventarisAir(inventarisTitikAir);
    console.log("Statistik Berhasil Dibuat:", statistik);

    // Sengaja memicu error dengan memasukkan data non-array (misal: string/null)
    // ringkasInventarisAir("Bukan Array"); 

} catch (error) {
    console.error("Terjadi Kesalahan:", error.message);
}