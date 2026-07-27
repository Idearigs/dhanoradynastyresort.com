<?php
/**
 * JSON response helpers + CORS. Every endpoint returns JSON; these set the
 * right status code and stop execution.
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

/**
 * Emit CORS headers. In production the site and API share an origin so the
 * allow-list is empty and nothing is sent. During dev, listed origins are
 * echoed back with credentials allowed (needed for the session cookie).
 */
function send_cors_headers(): void
{
    $allowed = config('cors_allowed_origins') ?: [];
    $origin  = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
        header('Access-Control-Max-Age: 86400');
    }
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Error payload. In dev, an optional $detail is included to aid debugging. */
function json_error(string $message, int $status = 400, ?string $detail = null): void
{
    $body = ['error' => $message];
    if ($detail !== null && config('env') === 'dev') {
        $body['detail'] = $detail;
    }
    json_response($body, $status);
}
