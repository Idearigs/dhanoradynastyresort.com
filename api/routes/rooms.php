<?php
/**
 * /api/rooms/* — public rooms read + admin CRUD (incl. per-room images).
 *
 * Public:
 *   GET    /rooms                       -> published rooms with nested images
 * Admin (auth + CSRF on writes):
 *   GET    /rooms?all=1                 -> all rooms incl. unpublished
 *   POST   /rooms                       -> create room
 *   PUT    /rooms/{id}                  -> update room
 *   DELETE /rooms/{id}                  -> delete room (cascades images)
 *   POST   /rooms/{id}/images           -> attach an image { src, alt, isCover, sortOrder }
 *   DELETE /rooms/{id}/images/{imageId} -> detach an image
 */

declare(strict_types=1);

function handle_rooms(string $method, array $rest): void
{
    $id  = isset($rest[0]) ? (int) $rest[0] : null;
    $sub = $rest[1] ?? '';
    $imageId = isset($rest[2]) ? (int) $rest[2] : null;

    // Per-room images: /rooms/{id}/images[/{imageId}]
    if ($id && $sub === 'images') {
        require_auth();
        require_csrf();
        if ($method === 'POST') {
            rooms_add_image($id);
            return;
        }
        if ($method === 'DELETE' && $imageId) {
            $stmt = db()->prepare('DELETE FROM room_images WHERE id = ? AND room_id = ?');
            $stmt->execute([$imageId, $id]);
            if ($stmt->rowCount() === 0) json_error('Room image not found.', 404);
            json_response(['ok' => true]);
            return;
        }
        json_error('Method not allowed.', 405);
    }

    switch ($method) {
        case 'GET':
            if (!empty($_GET['all'])) {
                require_auth();
                json_response(['rooms' => rooms_list(false)]);
            }
            json_response(['rooms' => rooms_list(true)]);
            return;

        case 'POST':
            require_auth();
            require_csrf();
            rooms_create();
            return;

        case 'PUT':
        case 'PATCH':
            require_auth();
            require_csrf();
            if (!$id) json_error('Room id required.', 400);
            rooms_update($id);
            return;

        case 'DELETE':
            require_auth();
            require_csrf();
            if (!$id) json_error('Room id required.', 400);
            $stmt = db()->prepare('DELETE FROM rooms WHERE id = ?');
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) json_error('Room not found.', 404);
            json_response(['ok' => true]);
            return;
    }
    json_error('Method not allowed.', 405);
}

function rooms_list(bool $publishedOnly): array
{
    $sql = 'SELECT * FROM rooms';
    if ($publishedOnly) {
        $sql .= ' WHERE is_published = 1';
    }
    $sql .= ' ORDER BY sort_order, room_no';
    $rooms = db()->query($sql)->fetchAll();

    $imgStmt = db()->prepare(
        'SELECT id, src, alt, is_cover, sort_order
           FROM room_images WHERE room_id = ? ORDER BY is_cover DESC, sort_order, id'
    );

    return array_map(static function ($r) use ($imgStmt) {
        $imgStmt->execute([$r['id']]);
        $images = array_map(static function ($im) {
            return [
                'id'        => (int) $im['id'],
                'src'       => $im['src'],
                'alt'       => $im['alt'],
                'isCover'   => (bool) $im['is_cover'],
                'sortOrder' => (int) $im['sort_order'],
            ];
        }, $imgStmt->fetchAll());

        return [
            'id'          => (int) $r['id'],
            'no'          => $r['room_no'],
            'slug'        => $r['slug'],
            'tag'         => $r['tag'],
            'name'        => $r['name'],
            'description' => $r['description'],
            'beds'        => $r['beds'],
            'view'        => $r['view_name'],
            'price'       => $r['price_lkr'] !== null ? (int) $r['price_lkr'] : null,
            'sortOrder'   => (int) $r['sort_order'],
            'isPublished' => (bool) $r['is_published'],
            'images'      => $images,
        ];
    }, $rooms);
}

function rooms_create(): void
{
    $b   = request_body();
    $no  = field_string($b, 'no', true, 20);
    $name = field_string($b, 'name', true, 190);

    $stmt = db()->prepare(
        'INSERT INTO rooms (room_no, slug, tag, name, description, beds, view_name, price_lkr, sort_order, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $no,
        field_string($b, 'slug') ?? make_slug($name),
        field_string($b, 'tag', false, 80),
        $name,
        field_string($b, 'description', false, 2000),
        field_string($b, 'beds', false, 120),
        field_string($b, 'view', false, 120),
        field_int($b, 'price', false, 0),
        field_int($b, 'sortOrder') ?? 0,
        field_bool($b, 'isPublished', true) ? 1 : 0,
    ]);
    json_response(['id' => (int) db()->lastInsertId()], 201);
}

function rooms_update(int $id): void
{
    $b   = request_body();
    $no  = field_string($b, 'no', true, 20);
    $name = field_string($b, 'name', true, 190);

    $stmt = db()->prepare(
        'UPDATE rooms
            SET room_no = ?, slug = ?, tag = ?, name = ?, description = ?, beds = ?,
                view_name = ?, price_lkr = ?, sort_order = ?, is_published = ?
          WHERE id = ?'
    );
    $stmt->execute([
        $no,
        field_string($b, 'slug') ?? make_slug($name),
        field_string($b, 'tag', false, 80),
        $name,
        field_string($b, 'description', false, 2000),
        field_string($b, 'beds', false, 120),
        field_string($b, 'view', false, 120),
        field_int($b, 'price', false, 0),
        field_int($b, 'sortOrder') ?? 0,
        field_bool($b, 'isPublished', true) ? 1 : 0,
        $id,
    ]);
    if ($stmt->rowCount() === 0) {
        $chk = db()->prepare('SELECT 1 FROM rooms WHERE id = ?');
        $chk->execute([$id]);
        if (!$chk->fetchColumn()) json_error('Room not found.', 404);
    }
    json_response(['ok' => true]);
}

function rooms_add_image(int $roomId): void
{
    $chk = db()->prepare('SELECT 1 FROM rooms WHERE id = ?');
    $chk->execute([$roomId]);
    if (!$chk->fetchColumn()) json_error('Room not found.', 404);

    $b = request_body();
    $stmt = db()->prepare(
        'INSERT INTO room_images (room_id, src, alt, is_cover, sort_order)
         VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $roomId,
        field_string($b, 'src', true, 255),
        field_string($b, 'alt', false, 255),
        field_bool($b, 'isCover', false) ? 1 : 0,
        field_int($b, 'sortOrder') ?? 0,
    ]);
    json_response(['id' => (int) db()->lastInsertId()], 201);
}
