export default {
    template: `
        <div class="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-gray-100 font-sans antialiased p-6">
            <div class="text-center max-w-xl bg-gray-800 border border-gray-700 p-10 rounded-2xl shadow-2xl">
                <div class="text-5xl mb-4">📦</div>
                <h1 class="text-4xl font-extrabold text-blue-500 mb-3 tracking-wide">E-Inventory System</h1>
                <p class="text-gray-400 mb-8 leading-relaxed">
                    Selamat datang di Aplikasi Manajemen Inventaris Gudang & Data Master Barang. 
                    Sistem ini terintegrasi penuh menggunakan arsitektur decoupled berbasis RESTful API.
                </p>
                <div class="flex justify-center">
                    <router-link to="/login" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5">
                        Masuk ke Dashboard Admin &rarr;
                    </router-link>
                </div>
            </div>
        </div>
    `
};
