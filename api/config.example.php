<?php
/**
 * Copy this file to `config.php` and fill in your cPanel MySQL credentials.
 * `config.php` is gitignored — real secrets never get committed.
 *
 * On cPanel the DB name and user are usually prefixed with your account name,
 * e.g. "cpaneluser_dhanora" and "cpaneluser_admin".
 */

return [
    // --- Database (cPanel → MySQL Databases) ---------------------------------
    'db' => [
        'host'    => 'localhost',
        'name'    => 'REPLACE_db_name',
        'user'    => 'REPLACE_db_user',
        'pass'    => 'REPLACE_db_password',
        'charset' => 'utf8mb4',
    ],

    // --- Uploads --------------------------------------------------------------
    // Absolute path to the web-served uploads directory (siblings the api/ dir
    // in public_html). Images are written here and served by Apache.
    'uploads_dir' => dirname(__DIR__) . '/uploads',
    // Public URL prefix the frontend uses to reference an uploaded file.
    'uploads_url' => '/uploads',
    // Max upload size in bytes (also enforce in php.ini / .htaccess).
    'max_upload_bytes' => 5 * 1024 * 1024, // 5 MB

    // --- CORS -----------------------------------------------------------------
    // In production the static site and /api are the SAME origin, so leave this
    // empty. During local dev the Vite app runs on http://localhost:8080 while
    // the API runs elsewhere — list dev origins here to allow cookies cross-site.
    'cors_allowed_origins' => [
        // 'http://localhost:8080',
    ],

    // --- Session / cookies ----------------------------------------------------
    'session_name' => 'ddr_admin',
    // Set true ONLY when the site is served over HTTPS (after SSL is live).
    'cookie_secure' => false,

    // --- Environment ----------------------------------------------------------
    // 'dev' shows error detail in responses; 'prod' hides it. Use 'prod' live.
    'env' => 'prod',
];
