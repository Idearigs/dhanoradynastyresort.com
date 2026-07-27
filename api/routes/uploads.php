<?php
/**
 * /api/uploads — image upload for the admin panel (auth + CSRF).
 *
 *   POST /uploads   multipart/form-data:
 *       file : the image (jpeg | png | webp)
 *       dir  : one of "rooms" | "gallery" | "menu"   (optional, default "gallery")
 *   -> { src: "/uploads/<dir>/<filename>", filename, bytes, type }
 *
 * The file is validated by real MIME (finfo), not the client-supplied name, and
 * stored under uploads_dir/<dir>/ with a random filename to avoid collisions and
 * path tricks. Apache serves it directly from /uploads/.
 */

declare(strict_types=1);

const UPLOAD_DIRS = ['rooms', 'gallery', 'menu'];
const UPLOAD_MIME_EXT = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
];

function handle_uploads(string $method, array $rest): void
{
    if ($method !== 'POST') {
        json_error('Method not allowed.', 405);
    }
    require_auth();
    require_csrf();

    if (empty($_FILES['file']) || !is_array($_FILES['file'])) {
        json_error("No file uploaded (expected form field 'file').", 400);
    }
    $file = $_FILES['file'];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        json_error('Upload failed (code ' . ($file['error'] ?? -1) . ').', 400);
    }

    $maxBytes = (int) (config('max_upload_bytes') ?: 5 * 1024 * 1024);
    if (($file['size'] ?? 0) > $maxBytes) {
        json_error('File too large (max ' . round($maxBytes / 1048576, 1) . ' MB).', 413);
    }
    if (!is_uploaded_file($file['tmp_name'])) {
        json_error('Invalid upload.', 400);
    }

    // Trust the real content type, not the filename/extension.
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime  = $finfo->file($file['tmp_name']) ?: '';
    if (!isset(UPLOAD_MIME_EXT[$mime])) {
        json_error('Unsupported image type. Allowed: JPEG, PNG, WebP.', 415);
    }
    $ext = UPLOAD_MIME_EXT[$mime];

    $dir = $_POST['dir'] ?? 'gallery';
    if (!in_array($dir, UPLOAD_DIRS, true)) {
        json_error('Invalid dir. Allowed: ' . implode(', ', UPLOAD_DIRS) . '.', 422);
    }

    $baseDir   = rtrim((string) config('uploads_dir'), '/\\');
    $targetDir = $baseDir . '/' . $dir;
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true) && !is_dir($targetDir)) {
        json_error('Could not create upload directory.', 500);
    }

    $filename = bin2hex(random_bytes(8)) . '-' . time() . '.' . $ext;
    $target   = $targetDir . '/' . $filename;
    if (!move_uploaded_file($file['tmp_name'], $target)) {
        json_error('Could not save uploaded file.', 500);
    }
    @chmod($target, 0644);

    $urlPrefix = rtrim((string) config('uploads_url'), '/');
    json_response([
        'src'      => "$urlPrefix/$dir/$filename",
        'filename' => $filename,
        'bytes'    => (int) $file['size'],
        'type'     => $mime,
    ], 201);
}
