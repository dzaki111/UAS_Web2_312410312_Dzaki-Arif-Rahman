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
                { time: new Date().toLocaleTimeString('id-ID'), type: 'info', message: 'Memulai sinkronisasi data...' }
            ]
        }
    },
    computed: {
        totalProducts() { return this.filteredProducts.length; },
        totalStock() { return this.filteredProducts.reduce((sum, item) => sum + Number(item.stock || 0), 0); },
        totalAsset() { return this.filteredProducts.reduce((sum, item) => sum + (Number(item.stock || 0) * Number(item.price || 0)), 0); },
        totalCategoriesCount() { return this.categories.length || 1; },
        filteredProducts() {
            return this.products.filter(product => {
                const productName = product.product_name ? product.product_name.toLowerCase() : '';
                const productSku = product.sku ? product.sku.toLowerCase() : '';
                const categoryName = product.category_name ? product.category_name : 'ELEKTRONIK';
                const matchesSearch = productName.includes(this.searchQuery.toLowerCase()) || productSku.includes(this.searchQuery.toLowerCase());
                const matchesCategory = this.selectedCategory === '' || categoryName === this.selectedCategory;
                const matchesStatus = this.statusFilter === '' || (this.statusFilter === 'kritis' && Number(product.stock) <= 20);
                return matchesSearch && matchesCategory && matchesStatus;
            });
        },
        totalPages() { return Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1; },
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
            try {
                // PENTING: Ganti URL localhost ini dengan URL API yang sudah online di InfinityFree/Hosting
                // Contoh: 'https://inventaris-elektronik-zaki.rf.gd/api/products'
                const response = await fetch('https://GANTI_DENGAN_DOMAIN_INFINITYFREE_KAMU/api/products');

                if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

                const data = await response.json();
                this.products = Array.isArray(data) ? data : (data.products || []);
                this.categories = Array.isArray(data.categories) ? data.categories : ['ELEKTRONIK'];
                this.logs.unshift({ time: new Date().toLocaleTimeString('id-ID'), type: 'info', message: 'Data berhasil disinkronisasi.' });
            } catch (error) {
                console.error('API Error:', error);
                this.logs.unshift({ time: new Date().toLocaleTimeString('id-ID'), type: 'warn', message: 'Gagal memuat API, menggunakan data cadangan.' });
                
                // Data fallback agar layar tetap muncul meskipun API gagal
                this.products = [
                    { id: 2, sku: 'BRG-002', product_name: 'Mouse Wireless Logi M220', category_name: 'ELEKTRONIK', stock: 45, price: 195000 },
                    { id: 5, sku: 'BRG-005', product_name: 'iPhone', category_name: 'ELEKTRONIK', stock: 100, price: 15000000 }
                ];
                this.categories = ['ELEKTRONIK'];
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
                </main>
        </div>
    `
};
