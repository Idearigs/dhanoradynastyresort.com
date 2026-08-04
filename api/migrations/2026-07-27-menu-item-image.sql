-- Migration: per-dish photo on menu_items.
-- Fresh installs get these columns from schema.sql; run this once on a DB that
-- was created before 2026-07-27.
--
--   mysql -u <user> -p <db> < migrations/2026-07-27-menu-item-image.sql

ALTER TABLE menu_items
  ADD COLUMN image_src VARCHAR(255) NULL AFTER price,
  ADD COLUMN image_alt VARCHAR(255) NULL AFTER image_src;
