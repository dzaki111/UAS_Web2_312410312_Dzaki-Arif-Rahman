<?php
namespace App\Controllers;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController {
    protected $format = 'json';

    public function login()
    {
        $userModel = new UserModel();

        $json = $this->request->getJSON();

        $username = trim($json->username ?? '');
        $password = trim($json->password ?? '');

        $user = $userModel->where('username', $username)->first();

        if (!$user) {
            return $this->respond([
                'debug' => 'USER TIDAK DITEMUKAN',
                'username_input' => $username
            ]);
        }

        if (!password_verify($password, $user['password'])) {
            return $this->respond([
                'debug' => 'PASSWORD TIDAK COCOK',
                'password_input' => $password,
                'hash_db' => $user['password']
            ]);
        }

        $token = base64_encode($username . '_secret_key_' . time());

        return $this->respond([
            'status' => 200,
            'messages' => 'Login Berhasil!',
            'token' => $token
        ]);
    }
}