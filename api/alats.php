<?php
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

// 1. PENANGANAN METODE GET
if ($method === 'GET') {
    $data = [
        ['id' => 1, 'nama' => 'Router', 'jumlah' => 4],
        ['id' => 2, 'nama' => 'Multimeter', 'jumlah' => 6]
    ];
    http_response_code(200);
    echo json_encode(['data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. PENANGANAN METODE POST
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    // KONDISI 1: JSON Rusak atau Tidak Valid -> HTTP 400 Bad Request
    if ($rawInput && $payload === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Format JSON tidak valid'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Memastikan payload berformat array/object
    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['error' => 'Body JSON harus berupa objek'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Ambil dan filter data dari payload
    $nama = trim((string) ($payload['nama'] ?? ''));
    $jumlah = filter_var($payload['jumlah'] ?? null, FILTER_VALIDATE_INT);

    // KONDISI 2: Data Gagal Memenuhi Aturan Bisnis -> HTTP 422 Unprocessable Content
    if ($nama === '' || $jumlah === false || $jumlah < 0) {
        http_response_code(422);
        echo json_encode(['error' => 'Data tidak valid'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // KONDISI 3: JSON Valid & Lolos Aturan Bisnis -> HTTP 201 Created
    http_response_code(201);
    echo json_encode([
        'message' => 'Data diterima',
        'data' => compact('nama', 'jumlah')
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ==========================================
// 3. PENANGANAN METODE LAIN (Method Not Allowed)
// ==========================================
header('Allow: GET, POST');
http_response_code(405);
echo json_encode(['error' => 'Method tidak diizinkan'], JSON_UNESCAPED_UNICODE);
exit;
?>