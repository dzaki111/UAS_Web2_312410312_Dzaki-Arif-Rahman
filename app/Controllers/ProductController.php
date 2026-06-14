<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ProductModel;

class ProductController extends ResourceController {
    protected $modelName = 'App\Models\ProductModel';
    protected $format    = 'json';

    // 1. GET ALL PRODUCTS (Tampil Semua Barang + Join Kategori)
    public function index() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

        $db = \Config\Database::connect();
        $builder = $db->table('products');
        
        $builder->select('products.*, categories.category_name');
        $builder->join('categories', 'categories.id = products.category_id');
        $data = $builder->get()->getResult();

        return $this->respond($data, 200);
    }

    // 2. POST CREATE (Tambah Barang Baru - Murni Data Teks)
    public function create() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");

        $data = [
            'category_id'   => $this->request->getVar('category_id'),
            'sku'           => $this->request->getVar('sku'),
            'product_name'  => $this->request->getVar('product_name'),
            'stock'         => (int)$this->request->getVar('stock'),
            'price'         => (float)$this->request->getVar('price'),
            'supplier_name' => $this->request->getVar('supplier_name')
        ];

        if ($this->model->insert($data)) {
            return $this->respondCreated([
                'status'  => 201,
                'message' => 'Barang berhasil ditambahkan!'
            ]);
        }
        return $this->fail('Gagal menambah barang.');
    }

    // 3. PUT UPDATE (Edit Data Barang Murni JSON)
    public function update($id = null) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");

        $product = $this->model->find($id);
        if (!$product) {
            return $this->failNotFound('Data barang tidak ditemukan.');
        }

        $data = [
            'category_id'   => $this->request->getVar('category_id'),
            'sku'           => $this->request->getVar('sku'),
            'product_name'  => $this->request->getVar('product_name'),
            'stock'         => (int)$this->request->getVar('stock'),
            'price'         => (float)$this->request->getVar('price'),
            'supplier_name' => $this->request->getVar('supplier_name')
        ];

        if ($this->model->update($id, $data)) {
            return $this->respond([
                'status'  => 200,
                'message' => 'Data barang berhasil diubah!'
            ]);
        }
        return $this->fail('Gagal mengubah barang.');
    }

    // 4. DELETE (Hapus Barang)
    public function delete($id = null) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: DELETE");

        if (!$this->model->find($id)) {
            return $this->failNotFound('Data tidak ditemukan.');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted([
                'status'  => 200,
                'message' => 'Barang berhasil dihapus!'
            ]);
        }
        return $this->fail('Gagal menghapus barang.');
    }

    // Handle Preflight Request CORS
    public function options() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        return $this->response->setStatusCode(200);
    }
}