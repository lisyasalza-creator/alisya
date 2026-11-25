<?php
declare(strict_types=1);

$baseUrl = getenv('APP_TEST_URL') ?: 'http://localhost/water-resources-tarakan';

$testCases = [
    [
        'id' => 'TP-01',
        'name' => 'GET /api/get_titik_air.php (ambil daftar titik air)',
        'method' => 'GET',
        'url' => $baseUrl . '/api/get_titik_air.php',
        'body' => null,
        'expected_codes' => [200],
    ],
    [
        'id' => 'TP-02',
        'name' => 'POST /api/login.php (kredensial salah ditolak)',
        'method' => 'POST',
        'url' => $baseUrl . '/api/login.php',
        'body' => json_encode(['email' => 'salah@example.com', 'password' => 'salah123']),
        'expected_codes' => [400, 401],
    ],
    [
        'id' => 'TP-03',
        'name' => 'POST /api/create_pengaduan.php (input kosong/negatif ditolak)',
        'method' => 'POST',
        'url' => $baseUrl . '/api/create_pengaduan.php',
        'body' => json_encode(['judul' => '', 'jumlah_warga' => -5]),
        'expected_codes' => [400, 401, 422],
    ],
    [
        'id' => 'TP-04',
        'name' => 'DELETE /api/delete_pengaduan.php?id=abc (ID non-angka ditolak)',
        'method' => 'DELETE',
        'url' => $baseUrl . '/api/delete_pengaduan.php?id=abc',
        'body' => null,
        'expected_codes' => [400, 401, 405],
    ],
    [
        'id' => 'TP-05',
        'name' => 'GET /api/me.php (akses tanpa sesi/login ditolak)',
        'method' => 'GET',
        'url' => $baseUrl . '/api/me.php',
        'body' => null,
        'expected_codes' => [401, 403],
    ],
];

function sendRequest(string $method, string $url, ?string $body): array
{
    $headers = ['Content-Type: application/json', 'Accept: application/json'];

    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => implode("\r\n", $headers),
            'content' => $body ?? '',
            'ignore_errors' => true,
            'timeout' => 10,
        ],
    ]);

    $rawResponse = @file_get_contents($url, false, $context);
    $statusLine = $http_response_header[0] ?? 'HTTP/1.1 000';
    preg_match('/\s(\d{3})\s/', $statusLine, $matches);
    $statusCode = isset($matches[1]) ? (int) $matches[1] : 0;

    return [
        'code' => $statusCode,
        'status_line' => $statusLine,
        'body' => $rawResponse === false ? '' : $rawResponse,
    ];
}

echo "=== TEST PLAN: WATER RESOURCES TARAKAN ===\n\n";
$passed = 0;

foreach ($testCases as $tc) {
    $res = sendRequest($tc['method'], $tc['url'], $tc['body']);
    $ok = in_array($res['code'], $tc['expected_codes'], true);
    if ($ok) {
        $passed++;
    }

    $label = $ok ? 'PASS' : 'FAIL';
    $expectedStr = implode('/', $tc['expected_codes']);
    echo "[{$label}] {$tc['id']} - {$tc['name']}\n";
    echo "       Expected HTTP: {$expectedStr} | Actual HTTP: {$res['code']}\n";
}

echo "\nRingkasan: {$passed}/" . count($testCases) . " test lulus.\n";