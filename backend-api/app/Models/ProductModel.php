<?php
namespace App\Models;
use CodeIgniter\Model;

class ProductModel extends Model {
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $allowedFields = ['category_id', 'product_name', 'sku', 'stock', 'price', 'supplier_name'];
}