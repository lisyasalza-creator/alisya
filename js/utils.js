/**
 * @param {Array} data - Array objek inventaris titik air
 * @returns {Object} Objek ringkasan statistik
 */
export function ringkasInventaris(data) {
  const totalLokasi = data.length;
  const totalKapasitas = data.reduce((acc, curr) => acc + curr.jumlah, 0);
  const lokasiNormal = data.filter((item) => item.kondisi === "Baik").length;
  const lokasiGangguan = data.filter((item) => item.kondisi === "Rusak").length;

  return {
    totalTitikPantau: totalLokasi,
    totalDebitKeseluruhan: totalKapasitas,
    jumlahLokasiNormal: lokasiNormal,
    jumlahLokasiGangguan: lokasiGangguan
  };
}