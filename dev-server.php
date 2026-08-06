<?php
/**
 * Local single-origin dev server (matches production Apache layout):
 *   - Static frontend served from dist/client  (built by `bun run build`)
 *   - /api/*      → api/index.php  (the PHP admin API)
 *   - /uploads/*  → ./uploads      (files written by the API, outside the build)
 *
 * Run from the repo root:
 *   /c/xampp/php/php.exe -S localhost:8000 -t dist/client dev-server.php
 *
 * Everything is one origin (http://localhost:8000), so the session cookie is
 * first-party and CSRF works exactly like it will on the live host.
 */

$root = __DIR__ . '/dist/client';
$uri  = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');

// --- API -------------------------------------------------------------------
if ($uri === '/api' || strncmp($uri, '/api/', 5) === 0) {
    // Make the front controller believe it's mounted at /api/index.php so its
    // dirname(SCRIPT_NAME) base-path math resolves the same as under Apache.
    $_SERVER['SCRIPT_NAME']     = '/api/index.php';
    $_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/api/index.php';
    require __DIR__ . '/api/index.php';
    return true;
}

// --- Uploaded files (live outside the build output) ------------------------
if (strncmp($uri, '/uploads/', 9) === 0) {
    $file = __DIR__ . $uri;
    if (is_file($file)) {
        return serve_file($file);
    }
    http_response_code(404);
    return true;
}

// --- Static build ----------------------------------------------------------
$path = $root . $uri;

// A real asset (js/css/image/…): let the built-in server stream it with the
// right MIME by returning false (docroot is dist/client via -t).
if ($uri !== '/' && is_file($path)) {
    return false;
}

// A prerendered route is a directory holding index.html.
$indexHtml = rtrim($path, '/') . '/index.html';
if ($uri === '/') {
    return send_html($root . '/index.html');
}
if (is_dir($path) && is_file($indexHtml)) {
    return send_html($indexHtml);
}

// Unknown path → the prerendered 404 page.
http_response_code(404);
return send_html($root . '/404.html');


function send_html(string $file): bool
{
    if (!is_file($file)) {
        http_response_code(404);
        echo 'Not found';
        return true;
    }
    header('Content-Type: text/html; charset=utf-8');
    readfile($file);
    return true;
}

function serve_file(string $file): bool
{
    static $mimes = [
        'webp' => 'image/webp', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg',
        'png' => 'image/png', 'gif' => 'image/gif', 'svg' => 'image/svg+xml',
        'avif' => 'image/avif', 'webm' => 'video/webm', 'mp4' => 'video/mp4',
    ];
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    header('Content-Type: ' . ($mimes[$ext] ?? 'application/octet-stream'));
    readfile($file);
    return true;
}
