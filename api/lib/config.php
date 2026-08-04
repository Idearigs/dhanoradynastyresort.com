<?php
/**
 * Loads api/config.php once and caches it. Fails loudly (500) if it's missing
 * so a fresh deploy that forgot to copy config.example.php is obvious.
 */

declare(strict_types=1);

function config(?string $key = null)
{
    static $cfg = null;
    if ($cfg === null) {
        $path = dirname(__DIR__) . '/config.php';
        if (!is_file($path)) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Server not configured (missing config.php).']);
            exit;
        }
        $cfg = require $path;
    }
    if ($key === null) {
        return $cfg;
    }
    return $cfg[$key] ?? null;
}
