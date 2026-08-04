<?php
/**
 * Front controller for the Dhanora Dynasty Resort admin API.
 *
 * All /api/* requests land here (see .htaccess). We derive the path relative to
 * wherever the api/ folder is mounted, then dispatch on the first segment to a
 * resource handler in routes/. Handlers speak JSON via lib/response.php.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib/config.php';
require_once __DIR__ . '/lib/response.php';
require_once __DIR__ . '/lib/request.php';
require_once __DIR__ . '/lib/auth.php';

send_cors_headers();
auth_start_session();

// CORS preflight — answer and stop before touching the DB.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Resolve the request path relative to the api/ mount point ---------------
// SCRIPT_NAME is like "/api/index.php"; its dirname ("/api") is our base.
$base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')), '/');
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
if ($base !== '' && strpos($path, $base) === 0) {
    $path = substr($path, strlen($base));
}
$path = trim($path, '/');
$segments = $path === '' ? [] : explode('/', $path);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$resource = $segments[0] ?? '';
$rest = array_slice($segments, 1);

try {
    switch ($resource) {
        case '':
            json_response([
                'name'    => 'Dhanora Dynasty Resort API',
                'status'  => 'ok',
                'version' => 1,
                'resources' => ['menu', 'gallery', 'rooms', 'auth', 'uploads'],
            ]);
            break;

        case 'menu':
            require __DIR__ . '/routes/menu.php';
            handle_menu($method, $rest);
            break;

        case 'gallery':
            require __DIR__ . '/routes/gallery.php';
            handle_gallery($method, $rest);
            break;

        case 'rooms':
            require __DIR__ . '/routes/rooms.php';
            handle_rooms($method, $rest);
            break;

        case 'auth':
            require __DIR__ . '/routes/auth.php';
            handle_auth($method, $rest);
            break;

        case 'uploads':
            require __DIR__ . '/routes/uploads.php';
            handle_uploads($method, $rest);
            break;

        default:
            json_error('Not found.', 404);
    }
} catch (PDOException $e) {
    error_log('[DDR API] DB error: ' . $e->getMessage());
    json_error('Database error.', 500, $e->getMessage());
} catch (Throwable $e) {
    error_log('[DDR API] ' . $e->getMessage());
    json_error('Internal server error.', 500, $e->getMessage());
}
