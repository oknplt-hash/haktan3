
export function renderSidebar(activePage) {
    // Backdrop for mobile
    const backdrop = document.createElement('div');
    backdrop.id = 'sidebarBackdrop';
    backdrop.className = 'fixed inset-0 bg-black/50 z-40 hidden lg:hidden transition-opacity duration-300 opacity-0';
    document.body.appendChild(backdrop);

    const sidebar = document.createElement('aside');
    sidebar.id = 'adminSidebar';
    // Sidebar: Hidden on mobile (translateX), visible on desktop (static)
    sidebar.className = 'fixed lg:sticky top-0 left-0 z-50 w-[280px] lg:w-64 bg-white border-r border-border-light flex flex-col shrink-0 h-[100dvh] font-display transition-transform duration-300 -translate-x-full lg:translate-x-0 shadow-2xl lg:shadow-none';

    sidebar.innerHTML = `
        <div class="p-5 flex items-center justify-between border-b border-border-light/50 bg-gray-50/50">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span class="material-symbols-outlined">shield_person</span>
                </div>
                <div class="flex flex-col text-left">
                    <h3 class="text-sm font-black text-gray-900 leading-tight">HAKTAN Admin</h3>
                    <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Yönetici Paneli</span>
                </div>
            </div>
            <button class="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:text-gray-900 active:scale-90 transition-all" onclick="window.toggleAdminSidebar()">
                <span class="material-symbols-outlined text-xl font-bold">close</span>
            </button>
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

    // Toggle function
    window.toggleAdminSidebar = function () {
        const isOpen = !sidebar.classList.contains('-translate-x-full');
        if (isOpen) {
            sidebar.classList.add('-translate-x-full');
            backdrop.classList.add('hidden');
            backdrop.classList.remove('opacity-100');
        } else {
            sidebar.classList.remove('-translate-x-full');
            backdrop.classList.remove('hidden');
            setTimeout(() => backdrop.classList.add('opacity-100'), 10);
        }
    };

    backdrop.onclick = window.toggleAdminSidebar;

    return sidebar;
}
