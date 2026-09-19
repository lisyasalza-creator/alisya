export function ringkasInventarisAir(data) {
    // Error handling dasar: pastikan input berupa array
    if (!Array.isArray(data)) {
        throw new TypeError('Kesalahan: Data yang dimasukkan harus berupa Array of Objects!');
    }
    
    // Error handling jika data kosong
    if (data.length === 0) {
        throw new Error('Peringatan: Data inventaris masih kosong.');
    }

    const totalLokasi = data.length;
    const totalKapasitas = data.reduce((acc, curr) => acc + curr.jumlah, 0);
    const lokasiNormal = data.filter((item) => item.kondisi === "Baik").length;
    const lokasiGangguan = data.filter((item) => item.kondisi !== "Baik").length;

    return {
        totalTitikPantau: totalLokasi,
        totalDebitKeseluruhan: totalKapasitas,
        jumlahLokasiNormal: lokasiNormal,
        jumlahLokasiGangguan: lokasiGangguan
    };
}

// pencarian menggunakan method .find()
export function cariAlatDenganId(data, idCari) {
    if (!Array.isArray(data)) throw new TypeError('Data harus berupa array');
    return data.find(item => item.id === idCari);
}