<?php
/**
 * Session auth (argon2id) + CSRF.
 *
 * - Login verifies the password against the argon2id hash and, on success,
 *   regenerates the session id (prevents fixation) and stores the user id.
 * - Mutating requests (POST/PUT/PATCH/DELETE) must carry a valid CSRF token in
 *   the X-CSRF-Token header, matched against the per-session token. The token is
 *   handed to the client via GET /api/auth/csrf.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/response.php';

function auth_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $cfg = config();
    session_name($cfg['session_name'] ?? 'ddr_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,
        'secure'   => (bool) ($cfg['cookie_secure'] ?? false),
        'samesite' => 'Lax',
    ]);
    session_start();
}

/** Hash a plaintext password with argon2id (falls back to bcrypt if unavailable). */
function auth_hash_password(string $plain): string
{
    if (defined('PASSWORD_ARGON2ID')) {
        return password_hash($plain, PASSWORD_ARGON2ID);
    }
    return password_hash($plain, PASSWORD_DEFAULT);
}

/** Verify a login. Returns the user row on success, or null. */
function auth_attempt(string $email, string $password): ?array
{
    $stmt = db()->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) {
        return null;
    }

    // Transparently upgrade an out-of-date hash on successful login.
    if (password_needs_rehash($user['password_hash'], defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT)) {
        $up = db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
        $up->execute([auth_hash_password($password), $user['id']]);
    }

    session_regenerate_id(true);
    $_SESSION['uid']  = (int) $user['id'];
    $_SESSION['role'] = $user['role'];

    $touch = db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?');
    $touch->execute([$user['id']]);

    return $user;
}

function auth_logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}

/** Current logged-in user row, or null. */
function auth_user(): ?array
{
    if (empty($_SESSION['uid'])) {
        return null;
    }
    $stmt = db()->prepare('SELECT id, email, role, last_login_at, created_at FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$_SESSION['uid']]);
    $user = $stmt->fetch();
    return $user ?: null;
}

/** Stop with 401 unless a session is authenticated. Returns the user row. */
function require_auth(): array
{
    $user = auth_user();
    if ($user === null) {
        json_error('Authentication required.', 401);
    }
    return $user;
}

// --- CSRF -------------------------------------------------------------------

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

/** Constant-time check of the X-CSRF-Token header against the session token. */
function require_csrf(): void
{
    $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $have = $_SESSION['csrf'] ?? '';
    if ($have === '' || $sent === '' || !hash_equals($have, $sent)) {
        json_error('Invalid or missing CSRF token.', 403);
    }
}
