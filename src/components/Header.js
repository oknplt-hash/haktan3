
import { getActiveAnnouncement } from '../modules/campaigns.js';

export function renderHeader() {
    const activeAnnouncement = getActiveAnnouncement();
    const headers = [];

    const header = document.createElement('header');
    header.className = 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300';
    header.innerHTML = `
        <style>
            .nav-link {
                position: relative;
                padding-bottom: 4px;
            }
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 2px;
                background: #ec9213;
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }
            .nav-link:hover::after {
                width: 100%;
            }
            .nav-link.active::after {
                width: 100%;
            }
        </style>
        <div class="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20 flex items-center justify-between py-4 gap-4">
            <!-- Elegant Logo -->
            <a href="index.html" class="flex items-center gap-3 group shrink-0">
                <div class="relative">
                    <div class="bg-gradient-to-br from-primary to-[#d68311] p-2.5 rounded-xl shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all group-hover:scale-105">
                        <span class="material-symbols-outlined text-white text-2xl">nutrition</span>
                    </div>
                    <div class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="flex flex-col">
                    <h2 class="text-2xl font-black leading-none tracking-tight text-gray-900">HAKTAN</h2>
                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Gurme Market</span>
                </div>
            </a>
            
            <!-- Mobile Menu Button -->
            <button id="mobileMenuBtn" class="md:hidden text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <span class="material-symbols-outlined text-3xl">menu</span>
            </button>

            <!-- Compact & Styled Search -->
            <div class="flex-1 max-w-lg mx-8 hidden md:block">
                <div class="relative group">
                    <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                    <input id="searchInput" type="text" placeholder="Tatlı bir şeyler mi arıyorsun?..."
                        class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/80 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all placeholder:text-gray-400" />
                </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center gap-4">
                <a href="shoping_page.html" class="group flex items-center gap-2 text-gray-700 hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/5">
                    <div class="relative">
                        <span class="material-symbols-outlined text-[28px]">shopping_bag</span>
                        <span class="cart-count absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg ring-2 ring-white group-hover:scale-110 transition-transform" style="display:none">0</span>
                    </div>
                </a>
            </div>
        </div>
        
        <!-- Refined Desktop Nav -->
        <nav class="hidden md:flex w-full bg-white border-t border-gray-100/50 justify-center">
            <div class="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                <ul class="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-gray-600">
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="index.html">Ana Sayfa</a></li>
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="product_category.html?cat=kuruyemis">Kuruyemiş</a></li>
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="product_category.html?cat=sarkuteri">Şarküteri</a></li>
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="product_category.html?cat=aktar">Aktar</a></li>
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="product_category.html?cat=bakliyat">Bakliyat</a></li>
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="product_category.html?cat=pestil-kome">Pestil & Köme</a></li>
                    <li><a class="nav-link hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5" href="product_category.html?cat=yoresel">Yöresel</a></li>
                </ul>
            </div>
        </nav>

        <!-- Mobile Menu (Hidden default) -->
        <div id="mobileMenu" class="hidden fixed inset-0 bg-white z-[60] overflow-y-auto">
            <div class="flex flex-col min-h-screen">
                <div class="flex justify-between items-center px-4 py-4 border-b border-gray-100 bg-white">
                    <a href="index.html" class="flex items-center gap-2">
                        <div class="bg-gradient-to-br from-primary to-[#d68311] p-1.5 rounded-lg">
                            <span class="material-symbols-outlined text-white text-xl">nutrition</span>
                        </div>
                        <h2 class="text-xl font-black text-gray-900">HAKTAN</h2>
                    </a>
                    <button id="closeMobileMenu" class="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-gray-100">
                        <span class="material-symbols-outlined text-3xl">close</span>
                    </button>
                </div>
                <div class="p-4">
                    <div class="mb-6">
                        <input id="mobileSearchInput" type="text" placeholder="Ürün ara..." class="w-full p-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    </div>
                    <ul class="space-y-2 text-base font-medium">
                        <li><a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                            <span class="material-symbols-outlined text-primary">home</span>
                            Ana Sayfa
                        </a></li>
                        <li><a href="product_category.html?cat=kuruyemis" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-700 transition-colors">
                            <span class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><span class="material-symbols-outlined text-orange-600">spa</span></span>
                            Kuruyemiş
                        </a></li>
                        <li><a href="product_category.html?cat=sarkuteri" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 transition-colors">
                            <span class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><span class="material-symbols-outlined text-red-600">restaurant</span></span>
                            Şarküteri
                        </a></li>
                        <li><a href="product_category.html?cat=aktar" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 transition-colors">
                            <span class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><span class="material-symbols-outlined text-green-600">eco</span></span>
                            Aktar
                        </a></li>
                        <li><a href="product_category.html?cat=bakliyat" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-yellow-50 text-gray-700 transition-colors">
                            <span class="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center"><span class="material-symbols-outlined text-yellow-600">grain</span></span>
                            Bakliyat
                        </a></li>
                        <li><a href="product_category.html?cat=pestil-kome" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 text-gray-700 transition-colors">
                            <span class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><span class="material-symbols-outlined text-purple-600">star</span></span>
                            Pestil & Köme
                        </a></li>
                        <li><a href="product_category.html?cat=yoresel" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-gray-700 transition-colors">
                            <span class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><span class="material-symbols-outlined text-amber-600">landscape</span></span>
                            Yöresel Ürünler
                        </a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    if (headers.length > 0) {
        headers.forEach(h => document.body.prepend(h));
        document.body.prepend(header);
    } else {
        document.body.prepend(header);
    }

    // Attach Event Listeners
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const close = document.getElementById('closeMobileMenu');

    if (btn && menu && close) {
        btn.addEventListener('click', () => menu.classList.remove('hidden'));
        close.addEventListener('click', () => menu.classList.add('hidden'));
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            window.location.href = 'product_category.html?q=' + encodeURIComponent(e.target.value.trim());
        }
    };

    const sInput = document.getElementById('searchInput');
    const mSortedInput = document.getElementById('mobileSearchInput');

    if (sInput) sInput.addEventListener('keydown', handleSearch);
    if (mSortedInput) mSortedInput.addEventListener('keydown', handleSearch);
}
