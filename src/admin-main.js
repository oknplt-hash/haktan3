import './style.css';
import * as Products from './modules/products.js';
import * as Orders from './modules/orders.js';
import * as Utils from './modules/utils.js';
import * as Admin from './modules/admin.js';
import * as Campaigns from './modules/campaigns.js';
import { renderSidebar } from './components/AdminSidebar.js';

// Expose HaktanApp globally for Admin pages
window.HaktanApp = {
    ...Products,
    ...Orders,
    ...Utils,
    ...Admin,
    ...Campaigns,
    CATEGORY_NAMES: Utils.CATEGORY_NAMES
};

// Remove loading state
// Remove loading state
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});

// Admin Entry Point Logic
// We can expose a render function or auto-render based on URL
// But simpler to just expose renderSidebar and let page call it, or automate it.

window.renderAdminSidebar = function (activePage) {
    const dashboard = document.getElementById('dashboard') || document.body; // Falback
    // Ensure styles for dashboard container if it's main body
    if (dashboard === document.body) {
        dashboard.classList.add('flex', 'h-screen', 'overflow-hidden');
    }

    // Find if sidebar exists, if not prepend
    // But we are removing it from HTML, so just prepend.
    const sidebar = renderSidebar(activePage);

    // For admin.html, it has #dashboard div.
    // For others, they have body.
    // We need to insert before the main content.
    const main = dashboard.querySelector('main');
    if (main) {
        dashboard.insertBefore(sidebar, main);
    } else {
        dashboard.prepend(sidebar);
    }

    // Attach Logout Listener
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const btnHtml = logoutBtn.innerHTML;
            logoutBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span> Çıkış Yapılıyor...';
            logoutBtn.style.pointerEvents = 'none';
            try {
                await HaktanApp.adminLogout();
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
                logoutBtn.innerHTML = btnHtml;
                logoutBtn.style.pointerEvents = 'auto';
            }
        });
    }

    // Update Pending Count
    updatePendingCount();
};

async function updatePendingCount() {
    try {
        const stats = await Admin.getAdminStats();
        const badges = document.querySelectorAll('#navPendingCount');
        badges.forEach(badge => {
            if (stats.pendingOrders > 0) {
                badge.textContent = stats.pendingOrders;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    } catch (e) {
        console.error("Error updating pending count:", e);
    }
}
