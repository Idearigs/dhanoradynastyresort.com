<?php
/**
 * /api/auth/* — session login/logout, current user, CSRF token.
 *
 *   POST /auth/login   { email, password }      -> { user }
 *   POST /auth/logout                            -> { ok: true }   (auth + CSRF)
 *   GET  /auth/me                                -> { user } | 401
 *   GET  /auth/csrf                              -> { csrfToken }
 */

declare(strict_types=1);

function handle_auth(string $method, array $rest): void
{
    $action = $rest[0] ?? '';

    switch ("$method $action") {
        case 'POST login':
            $body     = request_body();
            $email    = field_string($body, 'email', true, 190);
            $password = field_string($body, 'password', true, 255);

            $user = auth_attempt($email, $password);
            if ($user === null) {
                json_error('Invalid email or password.', 401);
            }
            json_response([
                'user' => [
                    'id'    => (int) $user['id'],
                    'email' => $user['email'],
                    'role'  => $user['role'],
                ],
                'csrfToken' => csrf_token(),
            ]);
            break;

        case 'POST logout':
            require_auth();
            require_csrf();
            auth_logout();
            json_response(['ok' => true]);
            break;

        case 'GET me':
            $user = auth_user();
            if ($user === null) {
                json_error('Not authenticated.', 401);
            }
            json_response([
                'user' => [
                    'id'          => (int) $user['id'],
                    'email'       => $user['email'],
                    'role'        => $user['role'],
                    'lastLoginAt' => $user['last_login_at'],
                ],
                'csrfToken' => csrf_token(),
            ]);
            break;

        case 'GET csrf':
            json_response(['csrfToken' => csrf_token()]);
            break;

        default:
            json_error('Unknown auth action.', 404);
    }
}
