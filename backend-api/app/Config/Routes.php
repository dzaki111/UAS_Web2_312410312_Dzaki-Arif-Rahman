<?php

namespace Config;

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');

// ==========================================
// AUTH
// ==========================================

$routes->post('api/login', 'AuthController::login');

// ==========================================
// PRODUCTS (Manajemen Inventaris Barang)
// ==========================================

// GET semua barang
$routes->get('api/products', 'ProductController::index');

// GET detail barang
$routes->get('api/products/(:num)', 'ProductController::show/$1');

// POST tambah barang baru + upload gambar
$routes->post('api/products', 'ProductController::create', [
    'filter' => 'authFilter'
]);

// PUT edit barang (Jalur default routing resource)
$routes->put('api/products/(:num)', 'ProductController::update/$1', [
    'filter' => 'authFilter'
]);

// POST edit barang (WAJIB ADA agar FormData + spoofing _method=PUT dari Vue tidak diblokir routing)
$routes->post('api/products/(:num)', 'ProductController::update/$1', [
    'filter' => 'authFilter'
]);

// DELETE barang beserta berkas fisiknya
$routes->delete('api/products/(:num)', 'ProductController::delete/$1', [
    'filter' => 'authFilter'
]);

// ==========================================
// CATEGORIES (Manajemen Sektor Kategori)
// ==========================================

// GET semua kategori
$routes->get('api/categories', 'CategoryController::index');

// GET detail kategori
$routes->get('api/categories/(:num)', 'CategoryController::show/$1');

// POST kategori
$routes->post('api/categories', 'CategoryController::create', [
    'filter' => 'authFilter'
]);

// PUT kategori
$routes->put('api/categories/(:num)', 'CategoryController::update/$1', [
    'filter' => 'authFilter'
]);

// DELETE kategori
$routes->delete('api/categories/(:num)', 'CategoryController::delete/$1', [
    'filter' => 'authFilter'
]);

// ==========================================
// DEBUG & TESTING UTILITY
// ==========================================

$routes->get('hash-cek', function () {
    echo password_hash("admin123", PASSWORD_DEFAULT);
});

$routes->get('cek-admin', function () {
    $userModel = new \App\Models\UserModel();
    $user = $userModel->where('username', 'admin')->first();

    echo '<pre>';
    print_r($user);
    echo '</pre>';
});