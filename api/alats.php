<?php
declare(strict_types=1);

// Middleware: Header JSON dan Header CORS dasar
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tangani preflight request OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// 1. Tangani Request GET
if ($method === 'GET') {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => [
            ['id' => 1, 'nama' => 'IPA Rawasari', 'jumlah' => 50, 'kondisi' => 'Baik', 'wilayah' => 'Tarakan Tengah'],
            ['id' => 2, 'nama' => 'IPA Binalatung', 'jumlah' => 30, 'kondisi' => 'Baik', 'wilayah' => 'Tarakan Selatan'],
            ['id' => 3, 'nama' => 'IPA Persemaian', 'jumlah' => 25, 'kondisi' => 'Perlu Cek', 'wilayah' => 'Tarakan Barat'],
            ['id' => 4, 'nama' => 'IPA Indulung', 'jumlah' => 40, 'kondisi' => 'Baik', 'wilayah' => 'Tarakan Utara']
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Tangani Request POST
if ($method === 'POST') {
    try {
        // Ambil raw input JSON
        $rawInput = file_get_contents('php://input');
        
        // Decoding JSON dengan pengecualian error PHP 8.4 (JSON_THROW_ON_ERROR)
        $payload = json_decode($rawInput, true, 512, JSON_THROW_ON_ERROR);
        
    } catch (JsonException $e) {
        // HTTP 400 Bad Request jika format JSON rusak/salah sintaks[cite: 3, 4]
        http_response_code(400);
        echo json_encode(['error' => 'Format JSON tidak valid atau rusak'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Pastikan payload berupa array/object
    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['error' => 'Body JSON harus berupa object'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Sanitasi dan validasi data input
    $nama_pelapor = trim((string) ($payload['nama_pelapor'] ?? ''));
    $nama = trim((string) ($payload['nama'] ?? ''));
    $kategori = trim((string) ($payload['kategori'] ?? ''));
    $jumlah = filter_var($payload['jumlah'] ?? null, FILTER_VALIDATE_INT);
    $kondisi = trim((string) ($payload['kondisi'] ?? ''));
    $tanggal = trim((string) ($payload['tanggal'] ?? ''));

    // Validasi Aturan Bisnis & Batasan Panjang Karakter (Maksimal nama 100 karakter sesuai Latihan Modul)
    if (
        $nama_pelapor === '' || mb_strlen($nama_pelapor) < 3 ||
        $nama === '' || mb_strlen($nama) < 3 || mb_strlen($nama) > 100 ||
        $kategori === '' ||
        $jumlah === false || $jumlah < 0 ||
        $kondisi === '' ||
        $tanggal === ''
    ) {
        // HTTP 422 Unprocessable Content jika gagal aturan bisnis / validasi[cite: 3, 4]
        http_response_code(422);
        echo json_encode([
            'error' => 'Data tidak valid. Pastikan semua field terisi benar, nama alat maksimal 100 karakter, dan jumlah warga berupa angka >= 0.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Jika lolos validasi, kembalikan status 201 Created
    http_response_code(201);
    echo json_encode([
        'message' => 'Data pengaduan/fasilitas air berhasil diterima',
        'data' => [
            'nama_pelapor' => $nama_pelapor,
            'nama' => $nama,
            'kategori' => $kategori,
            'jumlah' => $jumlah,
            'kondisi' => $kondisi,
            'tanggal' => $tanggal
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Jika Method selain GET atau POST (misal: DELETE sesuai latihan)
header('Allow: GET, POST');
http_response_code(405);
echo json_encode(['error' => 'Method tidak diizinkan'], JSON_UNESCAPED_UNICODE);
exit;