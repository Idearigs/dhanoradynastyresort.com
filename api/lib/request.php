<?php
/**
 * Request parsing + validation helpers. JSON bodies are decoded once; small
 * typed getters keep the endpoint code readable and defensive.
 */

declare(strict_types=1);

require_once __DIR__ . '/response.php';

/** Decoded JSON request body (cached). Returns [] for empty/non-JSON bodies. */
function request_body(): array
{
    static $body = null;
    if ($body !== null) {
        return $body;
    }
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) {
        return $body = [];
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        json_error('Request body must be a JSON object.', 400);
    }
    return $body = $decoded;
}

/** Trimmed string field; enforces required + max length. */
function field_string(array $src, string $key, bool $required = false, int $max = 255): ?string
{
    if (!array_key_exists($key, $src) || $src[$key] === null || $src[$key] === '') {
        if ($required) {
            json_error("Field '$key' is required.", 422);
        }
        return null;
    }
    if (!is_string($src[$key])) {
        json_error("Field '$key' must be a string.", 422);
    }
    $val = trim($src[$key]);
    if ($val === '' && $required) {
        json_error("Field '$key' is required.", 422);
    }
    if (mb_strlen($val) > $max) {
        json_error("Field '$key' exceeds $max characters.", 422);
    }
    return $val === '' ? null : $val;
}

/** Integer field; null when absent unless required. */
function field_int(array $src, string $key, bool $required = false, ?int $min = null, ?int $max = null): ?int
{
    if (!array_key_exists($key, $src) || $src[$key] === null || $src[$key] === '') {
        if ($required) {
            json_error("Field '$key' is required.", 422);
        }
        return null;
    }
    if (!is_numeric($src[$key]) || (int) $src[$key] != $src[$key]) {
        json_error("Field '$key' must be an integer.", 422);
    }
    $val = (int) $src[$key];
    if ($min !== null && $val < $min) {
        json_error("Field '$key' must be >= $min.", 422);
    }
    if ($max !== null && $val > $max) {
        json_error("Field '$key' must be <= $max.", 422);
    }
    return $val;
}

/** Decimal (money) field; returned as float or null. */
function field_decimal(array $src, string $key, bool $required = false): ?float
{
    if (!array_key_exists($key, $src) || $src[$key] === null || $src[$key] === '') {
        if ($required) {
            json_error("Field '$key' is required.", 422);
        }
        return null;
    }
    if (!is_numeric($src[$key])) {
        json_error("Field '$key' must be a number.", 422);
    }
    return (float) $src[$key];
}

/** Boolean field with a default. Accepts true/false, 1/0, "1"/"0". */
function field_bool(array $src, string $key, bool $default = false): bool
{
    if (!array_key_exists($key, $src) || $src[$key] === null || $src[$key] === '') {
        return $default;
    }
    return filter_var($src[$key], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? $default;
}

/** Enum field: value must be one of $allowed. */
function field_enum(array $src, string $key, array $allowed, bool $required = false): ?string
{
    $val = field_string($src, $key, $required);
    if ($val === null) {
        return null;
    }
    if (!in_array($val, $allowed, true)) {
        json_error("Field '$key' must be one of: " . implode(', ', $allowed) . '.', 422);
    }
    return $val;
}

/** URL/DOM-safe slug from a name, matching src/lib/menu.ts slug(). */
function make_slug(string $s): string
{
    $s = mb_strtolower($s, 'UTF-8');
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    return trim($s, '-');
}
