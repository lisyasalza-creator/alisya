<?php
declare(strict_types=1);

// Middleware sederhana: Pastikan response berupa JSON
header('Content-Type: application/json; charset=utf-8');

// Hanya izinkan method GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method tidak diizinkan'], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(200);
echo json_encode([
    'status' => 'ok',
    'message' => 'API Portal Air Tarakan berjalan dengan baik menggunakan PHP 8.4'
], JSON_UNESCAPED_UNICODE);
exit;