#### Nama   = Dzaki Arif Rahman
#### Kelas  = I241D 
#### NIM    = 312410312 
#### Matkul = Pemrograman Web 2  

# Sistem Informasi Manajemen Inventaris Elektronik (E-Inventory)
Sistem Informasi Manajemen Inventaris Elektronik (E-Inventory) adalah sebuah web yang dirancang untuk mengelola data operasional gudang secara digital. Proyek ini dipilih untuk memecahkan masalah efisiensi dalam pencatatan stok, pengelompokan kategori barang, serta pemantauan nilai aset secara real-time.

WEB ini mengadopsi Decoupled Architecture, di mana bagian backend menggunakan framework CodeIgniter 4 yang berfungsi sebagai penyedia RESTful API untuk manajemen database (CRUD), sementara bagian frontend dibangun menggunakan Vue.js 3 sebagai Single Page Application (SPA). Dengan fitur pencarian, filter kategori, status stok kritis, dan dasbor statistik, sistem ini memberikan kemudahan bagi administrator dalam melakukan kontrol logistik secara akurat, aman, dan responsif dengan dukungan desain antarmuka modern dari TailwindCSS.

## 1. Arsitektur Database & Backend API
<img width="654" height="194" alt="16 06 2026_14 28 07_REC" src="https://github.com/user-attachments/assets/eea3c313-1ec1-4f12-91dd-c31f52961e5f" />
<img width="1207" height="672" alt="WhatsApp Image 2026-06-10 at 20 56 32" src="https://github.com/user-attachments/assets/474fc851-3f3b-4444-9dfc-1a13e8081c44" />

<img width="697" height="353" alt="16 06 2026_14 28 28_REC" src="https://github.com/user-attachments/assets/bf8d349d-649d-4903-8b27-b0dc5637dccf" />

### Relasi Tabel: "Saya menggunakan tiga tabel inti yaitu users (untuk otentikasi), categories (pengelompokan barang), dan products (data utama). Tabel-tabel ini berelasi one-to-many untuk memastikan integritas data barang."

### RESTful API & CRUD: "Seluruh operasi data (Create, Read, Update, Delete) menggunakan Resource Controller di CodeIgniter 4, sehingga akses data sangat terstruktur dan efisien."

### Keamanan: "Saya menerapkan CodeIgniter Filters untuk proteksi endpoint. Setiap akses ke fungsi POST, PUT, atau DELETE wajib menyertakan Bearer Token di HTTP Header. Jika token tidak valid, sistem secara otomatis menolak akses."

### CORS: "Saya mengonfigurasi Config/Filters.php untuk mengizinkan Cross-Origin Resource Sharing, memastikan aplikasi Vue di Vercel bisa berkomunikasi dengan server API tanpa terblokir browser."

## 2. Arsitektur Frontend VueJS SPA & TailwindCSS
   
<img width="289" height="204" alt="16 06 2026_14 29 05_REC" src="https://github.com/user-attachments/assets/55495b26-335a-442c-83ce-f6bc7f6d21c9" />
<img width="1392" height="747" alt="WhatsApp Image 2026-06-10 at 22 19 00" src="https://github.com/user-attachments/assets/0d52a22c-27fd-478d-8d3a-11e7e45eadcd" />
<img width="1271" height="602" alt="WhatsApp Image 2026-06-10 at 21 53 32" src="https://github.com/user-attachments/assets/0f63ee51-00e9-4d39-a663-4398f46453f6" />
<img width="1440" height="900" alt="WhatsApp Image 2026-06-10 at 21 21 14" src="https://github.com/user-attachments/assets/ecd66f22-90aa-49ca-81bf-1b2e722aa86b" />
<img width="1440" height="736" alt="WhatsApp Image 2026-06-12 at 21 55 44" src="https://github.com/user-attachments/assets/2c69d6a1-8d9b-4203-b774-845e96b7eacc" />
<img width="1440" height="829" alt="16 06 2026_14 35 56_REC" src="https://github.com/user-attachments/assets/b6666c71-d2d3-490d-a3d2-5491fda8ac5f" />

<img width="1440" height="844" alt="WhatsApp Image 2026-06-14 at 21 51 40" src="https://github.com/user-attachments/assets/9ff24ecd-5afb-4783-a0e1-3ca44a7865ce" />

### Otentikasi & Keamanan: "Sistem menggunakan localStorage untuk menyimpan token setelah login. Saya menerapkan Navigation Guards (router.beforeEach) untuk memproteksi halaman admin; pengguna yang belum login akan otomatis dilempar ke halaman login."

### Axios Interceptors: "Ini poin kunci: Saya menggunakan Request Interceptor untuk otomatis menyuntikkan token ke setiap request Axios. Saya juga memasang Response Interceptor yang memantau kode error 401 Unauthorized. Jika token kedaluwarsa, sistem otomatis menghapus sesi dan redirect ke login."

### SPA (Single Page Application): "Dengan Vue Router, navigasi antar halaman dilakukan tanpa hard-reload (memuat ulang halaman), memberikan pengalaman seperti aplikasi desktop yang cepat."

### TailwindCSS: "Seluruh antarmuka saya bangun menggunakan utility-first classes dari TailwindCSS. Tidak ada penulisan CSS tradisional, sehingga tampilan konsisten, responsif, dan mengikuti standar modern."

## 3.Link Akses

* Link Demo: https://uas-web2-312410312-dzaki-arif-rahma-iota.vercel.app/#/

* Link Video Presentasi: [Masukkan Link YouTube Kamu]
