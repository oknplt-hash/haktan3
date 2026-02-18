
export function renderSidebar(activePage) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'w-64 bg-white border-r border-border-light flex flex-col shrink-0 h-screen sticky top-0 font-display';
    sidebar.innerHTML = `
        <div class="p-6 flex items-center gap-3 border-b border-border-light/50">
            <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <img src="https://ui-avatars.com/api/?name=Haktan+Admin&background=random" alt="Admin" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-col">
                <h3 class="text-sm font-bold text-gray-900 leading-tight">HAKTAN Admin</h3>
                <span class="text-[10px] text-gray-500 font-medium">Mağaza Müdürü</span>
            </div>
        </div>
        
        <nav class="flex-1 p-4 space-y-1">
            <a href="admin.html"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}">
                <span class="material-symbols-outlined text-[20px]">grid_view</span> Panel
            </a>
            <a href="admin_products.html"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'products' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}">
                <span class="material-symbols-outlined text-[20px]">inventory_2</span> Ürünler
            </a>
            <a href="admin_orders.html"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'orders' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}">
                <span class="material-symbols-outlined text-[20px]">shopping_bag</span> Siparişler
            </a>
            <a href="admin_campaigns.html"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'campaigns' ? 'bg-[#fff4e5] text-[#f59e0b]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}">
                <span class="material-symbols-outlined text-[20px]">campaign</span> Pazarlama
            </a>
            <a href="admin_banners.html"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage === 'banners' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}">
                <span class="material-symbols-outlined text-[20px]">image</span> Bannerlar
            </a>
            <div class="pt-4 mt-2 border-t border-border-light/50">
                 <a href="#"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    <span class="material-symbols-outlined text-[20px]">analytics</span> Analitik
                </a>
                <a href="admin_settings.html"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${activePage === 'settings' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'} transition-colors">
                    <span class="material-symbols-outlined text-[20px]">settings</span> Ayarlar
                </a>
            </div>
        </nav>

        <div class="p-4 border-t border-border-light/50">
             <button id="adminLogoutBtn"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 w-full transition-colors text-left group">
                <span class="material-symbols-outlined text-[20px] group-hover:text-red-500 transition-colors">logout</span> Çıkış
            </button>
        </div>
    `;
    return sidebar;
}
