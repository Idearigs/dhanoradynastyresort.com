-- Dhanora Dynasty Resort — admin API schema (MySQL 5.7+ / MariaDB 10.3+)
--
-- Shared hosting (cPanel). Import once via phpMyAdmin or:
--   mysql -u <user> -p <db> < schema.sql
--
-- Charset: utf8mb4 so menu descriptions and captions keep full Unicode.
-- Mirrors the data contract in docs/PROJECT-PLAN.md (now in MySQL, not Postgres).

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ---------------------------------------------------------------------------
-- Admin users. Passwords are argon2id hashes (PHP password_hash). Never plain.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin','editor') NOT NULL DEFAULT 'admin',
  last_login_at DATETIME NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Menu — categories hold the banner image + ordering; items belong to a category.
-- `group_name` is the optional sub-heading within a category (e.g. "Sri Lankan"
-- under Breakfast). Price is optional and NOT published on the public site
-- (owner's instruction) — it exists for the admin panel only.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS menu_categories (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name         VARCHAR(120) NOT NULL,
  slug         VARCHAR(140) NOT NULL,
  image_src    VARCHAR(255) NULL,
  image_alt    VARCHAR(255) NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_menu_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS menu_items (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id  INT UNSIGNED NOT NULL,
  group_name   VARCHAR(120) NULL,
  name         VARCHAR(190) NOT NULL,
  slug         VARCHAR(210) NOT NULL,
  description  TEXT NULL,
  price        DECIMAL(10,2) NULL,           -- LKR; NULL = unpriced. Not shown publicly.
  image_src    VARCHAR(255) NULL,            -- per-dish photo; NULL falls back to the category banner
  image_alt    VARCHAR(255) NULL,
  is_available TINYINT(1) NOT NULL DEFAULT 1,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_menu_items_category (category_id, sort_order),
  UNIQUE KEY uq_menu_items_cat_slug (category_id, slug),
  CONSTRAINT fk_menu_items_category FOREIGN KEY (category_id)
    REFERENCES menu_categories (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Rooms — one row per room; photos in room_images. `price_lkr` is the nightly
-- rate the resort charges (USD is derived on the frontend from a single rate).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rooms (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  room_no      VARCHAR(20) NOT NULL,
  slug         VARCHAR(160) NOT NULL,
  tag          VARCHAR(80) NULL,             -- e.g. "VIP", "Deluxe"
  name         VARCHAR(190) NOT NULL,
  description  TEXT NULL,
  beds         VARCHAR(120) NULL,
  view_name    VARCHAR(120) NULL,            -- `view` is reserved-ish; use view_name
  price_lkr    INT UNSIGNED NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_rooms_no (room_no),
  UNIQUE KEY uq_rooms_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS room_images (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  room_id    INT UNSIGNED NOT NULL,
  src        VARCHAR(255) NOT NULL,          -- /images/rooms/... (committed) or /uploads/rooms/... (uploaded)
  alt        VARCHAR(255) NULL,
  is_cover   TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_room_images_room (room_id, sort_order),
  CONSTRAINT fk_room_images_room FOREIGN KEY (room_id)
    REFERENCES rooms (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Gallery — flat list of images with a category filter + caption.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery_images (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category     ENUM('Rooms','Dining','Grounds','Wellness') NOT NULL,
  caption      VARCHAR(190) NULL,
  src          VARCHAR(255) NOT NULL,        -- /images/... (committed) or /uploads/gallery/... (uploaded)
  alt          VARCHAR(255) NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_gallery_category (category, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
