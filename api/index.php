<?php
/**
 * File: api/index.php
 * Keterangan: Entry point utama untuk backend REST API Pemrograman Web
 */

declare(strict_types=1);

// Atur header agar respons selalu berformat JSON
header('Content-Type: application/json; charset=utf-8');

// Ambil jalur URI atau method untuk routing sederhana
$method = $_SERVER['REQUEST_METHOD'];

http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Selamat datang di Backend REST API Pemrograman Web UBT',
    'method_used' => $method,
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE);
exit;