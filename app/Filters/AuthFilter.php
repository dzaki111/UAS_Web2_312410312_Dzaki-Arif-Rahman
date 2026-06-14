<?php
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class AuthFilter implements FilterInterface {
    public function before(RequestInterface $request, $arguments = null) {
        // Ambil header Authorization
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');

        // Periksa apakah token dikirimkan di header
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $response = Services::response();
            $response->setStatusCode(401);
            return $response->setJSON([
                'status'  => 401,
                'error'   => 401,
                'message' => 'Akses Ditolak! Anda harus menyertakan valid Bearer Token.'
            ]);
        }

        // Jika token ada, loloskan request ke controller
        return $request;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
        // Tidak diperlukan penanganan setelah request
    }
}