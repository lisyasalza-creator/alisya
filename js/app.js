// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const formAlat = document.getElementById('form-alat');
    const formStatus = document.getElementById('form-status');

    // 1. Fungsi Load List Data (GET) - Menampilkan daftar pengaduan ke halaman web
    async function loadPengaduan() {
        try {
            const response = await fetch('/water-resources-tarakan/api/get_pengaduan.php', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error('Gagal memuat data dari server.');
            const result = await response.json();
            console.log("Daftar Pengaduan Loaded:", result.data);
            
            // Jika di HTML ada kontainer tabel/list, render datanya di sini
            // (Sesuaikan dengan elemen tabel di index.html milikmu)
        } catch (error) {
            console.error("Error Load:", error.message);
        }
    }

    // 2. Fungsi Submit Form (POST / Create) - Mengirim data baru dari form web
    if (formAlat) {
        formAlat.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Mengirim data...';
            formStatus.style.color = 'blue';

            const payload = {
                nama_pelapor: document.getElementById('nama_pelapor').value.trim(),
                nama: document.getElementById('nama').value.trim(),
                kategori: document.getElementById('kategori').value,
                jumlah: document.getElementById('jumlah').value,
                kondisi: document.getElementById('kondisi').value,
                tanggal: document.getElementById('tanggal').value
            };

            try {
                const response = await fetch('/water-resources-tarakan/api/create_pengaduan.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error?.message || 'Gagal menyimpan data.');

                formStatus.textContent = 'Berhasil! Laporan terkirim.';
                formStatus.style.color = 'green';
                formAlat.reset();
                loadPengaduan(); // Muat ulang daftar data
            } catch (error) {
                formStatus.textContent = `Gagal: ${error.message}`;
                formStatus.style.color = 'red';
            }
        });
    }

    // 3. Fungsi Edit / Update Data (PATCH) - Memperbarui status data
    window.editPengaduan = async function(id, statusBaru) {
        try {
            const response = await fetch(`/water-resources-tarakan/api/update_pengaduan.php?id=${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ status: statusBaru })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error?.message || 'Gagal memperbarui data.');
            alert('Status berhasil diperbarui!');
            loadPengaduan();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    // 4. Fungsi Delete dengan Konfirmasi (DELETE) - Menghapus data dengan dialog konfirmasi
    window.hapusPengaduan = async function(id) {
        // Memunculkan kotak dialog konfirmasi browser sebelum menghapus
        if (!confirm('Apakah Anda yakin ingin menghapus data pengaduan ini?')) return;

        try {
            const response = await fetch(`/water-resources-tarakan/api/delete_pengaduan.php?id=${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error?.message || 'Gagal menghapus data.');
            alert('Data berhasil dihapus.');
            loadPengaduan(); // Muat ulang daftar data setelah dihapus
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    // Panggil fungsi load saat halaman pertama kali dibuka
    loadPengaduan();
});