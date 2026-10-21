<?php
/**
 * File: api/health.php
 * Keterangan: Endpoint GET untuk pengecekan status kesehatan/keaktifan API[cite: 4, 8].
 */

declare(strict_types=1);

// Mengatur header agar respons dikenali sebagai JSON dengan encoding UTF-8
header('Content-Type: application/json; charset=utf-8');

// Mengatur kode status HTTP 200 OK
http_response_code(200);

// Mengembalikan respons berformat JSON dengan status "ok"[cite: 8]
echo json_encode([
    'status' => 'ok'
], JSON_UNESCAPED_UNICODE);
exit;