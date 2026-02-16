
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
    `;

    // Create mobile menu as a separate element outside header
    const mobileMenuEl = document.createElement('div');
    mobileMenuEl.id = 'mobileMenu';
    mobileMenuEl.style.cssText = 'display:none; position:fixed; inset:0; z-index:9999;';
    mobileMenuEl.innerHTML = `
        <!-- Backdrop -->
        <div id="mobileMenuBackdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);"></div>
        <!-- Drawer -->
        <div style="position:absolute;left:0;top:0;bottom:0;width:300px;max-width:85vw;background:#fff;box-shadow:4px 0 30px rgba(0,0,0,0.15);overflow-y:auto;-webkit-overflow-scrolling:touch;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #f3f4f6;background:#fff;position:sticky;top:0;z-index:10;">
                <a href="index.html" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
                    <div style="background:linear-gradient(135deg,#ec9213,#d68311);padding:6px;border-radius:8px;">
                        <span class="material-symbols-outlined" style="color:white;font-size:20px;">nutrition</span>
                    </div>
                    <span style="font-size:20px;font-weight:900;color:#111827;">HAKTAN</span>
                </a>
                <button id="closeMobileMenu" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;border:none;background:transparent;cursor:pointer;color:#6b7280;">
                    <span class="material-symbols-outlined" style="font-size:24px;">close</span>
                </button>
            </div>
            <div style="padding:16px;">
                <div style="position:relative;margin-bottom:20px;">
                    <span class="material-symbols-outlined" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#9ca3af;font-size:20px;">search</span>
                    <input id="mobileSearchInput" type="text" placeholder="Ürün ara..." style="width:100%;padding:12px 12px 12px 42px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;font-size:14px;outline:none;box-sizing:border-box;">
                </div>
                <ul style="list-style:none;padding:0;margin:0;">
                    <li>
                        <a href="index.html" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span class="material-symbols-outlined" style="color:#ec9213;font-size:22px;">home</span>
                            Ana Sayfa
                        </a>
                    </li>
                    <li>
                        <a href="product_category.html?cat=kuruyemis" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#fff7ed;">
                                <span class="material-symbols-outlined" style="color:#ea580c;font-size:20px;">spa</span>
                            </span>
                            Kuruyemiş
                        </a>
                    </li>
                    <li>
                        <a href="product_category.html?cat=sarkuteri" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#fef2f2;">
                                <span class="material-symbols-outlined" style="color:#dc2626;font-size:20px;">restaurant</span>
                            </span>
                            Şarküteri
                        </a>
                    </li>
                    <li>
                        <a href="product_category.html?cat=aktar" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#f0fdf4;">
                                <span class="material-symbols-outlined" style="color:#16a34a;font-size:20px;">eco</span>
                            </span>
                            Aktar
                        </a>
                    </li>
                    <li>
                        <a href="product_category.html?cat=bakliyat" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#fefce8;">
                                <span class="material-symbols-outlined" style="color:#ca8a04;font-size:20px;">grain</span>
                            </span>
                            Bakliyat
                        </a>
                    </li>
                    <li>
                        <a href="product_category.html?cat=pestil-kome" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#faf5ff;">
                                <span class="material-symbols-outlined" style="color:#9333ea;font-size:20px;">star</span>
                            </span>
                            Pestil & Köme
                        </a>
                    </li>
                    <li>
                        <a href="product_category.html?cat=yoresel" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#374151;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:4px;">
                            <span style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#fffbeb;">
                                <span class="material-symbols-outlined" style="color:#d97706;font-size:20px;">landscape</span>
                            </span>
                            Yöresel Ürünler
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;

    if (headers.length > 0) {
        headers.forEach(h => document.body.prepend(h));
        document.body.prepend(header);
    } else {
        document.body.prepend(header);
    }

    // Append mobile menu directly to body (outside header)
    document.body.appendChild(mobileMenuEl);

    // Attach Event Listeners
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeMobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');

    const openMenu = () => {
        menu.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menu.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (btn) btn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

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
