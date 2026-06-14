export default {
    data() {
        return {
            products: [],
            categories: [],
            searchQuery: '',
            selectedCategory: '',
            statusFilter: '',
            currentPage: 1,
            itemsPerPage: 5,
            logs: [
                { time: new Date().toLocaleTimeString('id-ID'), type: 'info', message: 'Inisialisasi sistem...' }
            ]
        }
    },
    computed: {
        totalProducts() {
            return this.filteredProducts.length;
        },
        totalStock() {
            return this.filteredProducts.reduce((sum, item) => sum + Number(item.stock || 0), 0);
        },
        totalAsset() {
            return this.filteredProducts.reduce((sum, item) => sum + (Number(item.stock || 0) * Number(item.price || 0)), 0);
        },
        totalCategoriesCount() {
            return this.categories.length || 1;
        },
        filteredProducts() {
            return this.products.filter(product => {
                const productName = product.product_name ? product.product_name.toLowerCase() : '';
                const productSku = product.sku ? product.sku.toLowerCase() : '';
                const categoryName = product.category_name ? product.category_name : 'ELEKTRONIK';

                const matchesSearch = productName.includes(this.searchQuery.toLowerCase()) ||
                                      productSku.includes(this.searchQuery.toLowerCase());
                
                const matchesCategory = this.selectedCategory === '' || categoryName === this.selectedCategory;
                
                const matchesStatus = this.statusFilter === '' || (this.statusFilter === 'kritis' && Number(product.stock) <= 20);

                return matchesSearch && matchesCategory && matchesStatus;
            });
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredProducts.slice(start, start + this.itemsPerPage);
        }
    },
    watch: {
        searchQuery() { this.currentPage = 1; },
        selectedCategory() { this.currentPage = 1; },
        statusFilter() { this.currentPage = 1; }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            // Ganti URL ini dengan URL API backend Anda yang sudah di-deploy
            const API_ENDPOINT = 'https://api-backend-anda.vercel.app/api/products';

            try {
                const response = await fetch(API_ENDPOINT);
                
                if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
                
                const data = await response.json();
                
                this.products = Array.isArray(data) ? data : (data.products || []);
                this.categories = data.categories || ['ELEKTRONIK'];

                this.logs.unshift({
                    time: new Date().toLocaleTimeString('id-ID'),
                    type: 'info',
                    message: `Berhasil sinkronisasi ${this.products.length} data produk.`
                });
            } catch (error) {
                console.error('API Error:', error);
                this.logs.unshift({
                    time: new Date().toLocaleTimeString('id-ID'),
                    type: 'error',
                    message: 'Gagal menghubungi API. Menggunakan data statis.'
                });
                
                // Data Fallback
                this.products = [
                    { id: 1, sku: 'BRG-001', product_name: 'Data Offline (Contoh)', category_name: 'ELEKTRONIK', stock: 10, price: 500000 }
                ];
            }
        }
    },
    template: `
        <div class="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased p-6 flex flex-col justify-between w-full">
            <header class="w-full max-w-7xl mx-auto flex justify-between items-center pb-6 border-b border-gray-850">
                <div>
                    <h1 class="text-xl font-bold tracking-wider text-blue-500">SISTEM INVENTARIS ELEKTRONIK</h1>
                    <p class="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">Portal Informasi Publik & Monitoring</p>
                </div>
                <router-link to="/login" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2 rounded-lg shadow-md transition">
                    Administrator Otorisasi &rarr;
                </router-link>
            </header>

            <main class="w-full max-w-7xl mx-auto flex-1 py-8 space-y-6">
                <div class="bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
                    <div class="relative w-full md:flex-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">🔍</span>
                        <input v-model="searchQuery" type="text" placeholder="Cari berdasarkan nama atau SKU..." class="w-full bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 font-medium transition">
                    </div>
                    <div class="flex w-full md:w-auto gap-3 items-center">
                        <select v-model="selectedCategory" class="w-full md:w-48 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:border-blue-500 font-mono transition">
                            <option value="">Semua Kategori</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <span class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Total Variasi</span>
                        <span class="text-2xl font-bold text-blue-400 font-mono">{{ totalProducts }}</span>
                    </div>
                    <div class="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <span class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Total Stok</span>
                        <span class="text-2xl font-bold text-emerald-400 font-mono">{{ totalStock }}</span>
                    </div>
                    <div class="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <span class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Nilai Aset</span>
                        <span class="text-2xl font-bold text-amber-400 font-mono">Rp {{ totalAsset.toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <span class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Kategori</span>
                        <span class="text-2xl font-bold text-purple-400 font-mono">{{ totalCategoriesCount }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div class="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div class="p-4 bg-gray-850/50 border-b border-gray-800 flex justify-between items-center">
                            <h3 class="text-xs font-bold uppercase text-gray-300">Daftar Inventaris</h3>
                            <button @click="statusFilter = statusFilter === 'kritis' ? '' : 'kritis'" :class="statusFilter === 'kritis' ? 'bg-amber-600' : 'bg-gray-800'" class="text-[10px] px-2.5 py-1 rounded transition text-white">Stok Kritis</button>
                        </div>
                        <div class="overflow-x-auto text-xs">
                            <table class="w-full text-left">
                                <thead class="bg-gray-800/40 text-gray-400">
                                    <tr>
                                        <th class="p-4">SKU</th>
                                        <th class="p-4">Nama</th>
                                        <th class="p-4">Stok</th>
                                        <th class="p-4">Harga</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-800">
                                    <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-800/30">
                                        <td class="p-4 font-mono text-blue-400">{{ product.sku }}</td>
                                        <td class="p-4 font-bold">{{ product.product_name }}</td>
                                        <td class="p-4">
                                            <span :class="Number(product.stock) <= 20 ? 'text-amber-400' : 'text-white'">{{ product.stock }}</span>
                                        </td>
                                        <td class="p-4 text-emerald-400 font-mono">Rp {{ Number(product.price).toLocaleString('id-ID') }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="p-4 bg-gray-950/20 border-t border-gray-800 flex justify-between items-center text-[11px] text-gray-400">
                            <button @click="currentPage--" :disabled="currentPage === 1" class="px-2.5 py-1 bg-gray-800 rounded disabled:opacity-40">Prev</button>
                            <span>{{ currentPage }} / {{ totalPages || 1 }}</span>
                            <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-2.5 py-1 bg-gray-800 rounded disabled:opacity-40">Next</button>
                        </div>
                    </div>

                    <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <h3 class="text-xs font-bold uppercase text-gray-300 pb-3 border-b border-gray-800 mb-4">Log Sistem</h3>
                        <div class="space-y-3 font-mono text-[10px]">
                            <div v-for="(log, idx) in logs" :key="idx" class="p-2 bg-gray-950/40 border-l-2" :class="log.type === 'error' ? 'border-red-500' : 'border-blue-500'">
                                <span class="text-gray-500 block">{{ log.time }}</span>
                                <span class="text-gray-300">{{ log.message }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `
};
