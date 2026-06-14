<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class CategoryController extends ResourceController
{
    protected $modelName = 'App\Models\CategoryModel';
    protected $format    = 'json';

    // GET: Tampil Semua Kategori
    public function index()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('categories');
        $data = $builder->get()->getResult();

        return $this->respond($data, 200);
    }

    // POST: Tambah Kategori Baru
    public function create()
    {
        $db = \Config\Database::connect();
        $data = $this->request->getJSON(true);
        
        if ($db->table('categories')->insert($data)) {
            return $this->respondCreated(['message' => 'Kategori berhasil ditambahkan!']);
        }
        return $this->fail('Gagal menambah kategori.');
    }
}