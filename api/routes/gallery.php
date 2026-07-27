<?php
/**
 * /api/gallery/* — public gallery read + admin CRUD.
 *
 * Public:
 *   GET    /gallery                -> published images (flat, ordered)
 * Admin (auth + CSRF on writes):
 *   GET    /gallery?all=1          -> all images incl. unpublished
 *   POST   /gallery                -> create image
 *   PUT    /gallery/{id}           -> update image
 *   DELETE /gallery/{id}           -> delete image
 */

declare(strict_types=1);

const GALLERY_CATEGORIES = ['Rooms', 'Dining', 'Grounds', 'Wellness'];

function handle_gallery(string $method, array $rest): void
{
    $id = isset($rest[0]) ? (int) $rest[0] : null;

    switch ($method) {
        case 'GET':
            if (!empty($_GET['all'])) {
                require_auth();
                json_response(['images' => gallery_list(false)]);
            }
            json_response(['images' => gallery_list(true)]);
            return;

        case 'POST':
            require_auth();
            require_csrf();
            gallery_create();
            return;

        case 'PUT':
        case 'PATCH':
            require_auth();
            require_csrf();
            if (!$id) json_error('Image id required.', 400);
            gallery_update($id);
            return;

        case 'DELETE':
            require_auth();
            require_csrf();
            if (!$id) json_error('Image id required.', 400);
            $stmt = db()->prepare('DELETE FROM gallery_images WHERE id = ?');
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) json_error('Image not found.', 404);
            json_response(['ok' => true]);
            return;
    }
    json_error('Method not allowed.', 405);
}

function gallery_list(bool $publishedOnly): array
{
    $sql = 'SELECT id, category, caption, src, alt, sort_order, is_published
              FROM gallery_images';
    if ($publishedOnly) {
        $sql .= ' WHERE is_published = 1';
    }
    $sql .= ' ORDER BY sort_order, id';
    $rows = db()->query($sql)->fetchAll();

    return array_map(static function ($g) {
        return [
            'id'          => (int) $g['id'],
            'category'    => $g['category'],
            'caption'     => $g['caption'],
            'src'         => $g['src'],
            'alt'         => $g['alt'],
            'sortOrder'   => (int) $g['sort_order'],
            'isPublished' => (bool) $g['is_published'],
        ];
    }, $rows);
}

function gallery_create(): void
{
    $b = request_body();
    $stmt = db()->prepare(
        'INSERT INTO gallery_images (category, caption, src, alt, sort_order, is_published)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        field_enum($b, 'category', GALLERY_CATEGORIES, true),
        field_string($b, 'caption', false, 190),
        field_string($b, 'src', true, 255),
        field_string($b, 'alt', false, 255),
        field_int($b, 'sortOrder') ?? 0,
        field_bool($b, 'isPublished', true) ? 1 : 0,
    ]);
    json_response(['id' => (int) db()->lastInsertId()], 201);
}

function gallery_update(int $id): void
{
    $b = request_body();
    $stmt = db()->prepare(
        'UPDATE gallery_images
            SET category = ?, caption = ?, src = ?, alt = ?, sort_order = ?, is_published = ?
          WHERE id = ?'
    );
    $stmt->execute([
        field_enum($b, 'category', GALLERY_CATEGORIES, true),
        field_string($b, 'caption', false, 190),
        field_string($b, 'src', true, 255),
        field_string($b, 'alt', false, 255),
        field_int($b, 'sortOrder') ?? 0,
        field_bool($b, 'isPublished', true) ? 1 : 0,
        $id,
    ]);
    if ($stmt->rowCount() === 0) {
        $chk = db()->prepare('SELECT 1 FROM gallery_images WHERE id = ?');
        $chk->execute([$id]);
        if (!$chk->fetchColumn()) json_error('Image not found.', 404);
    }
    json_response(['ok' => true]);
}
