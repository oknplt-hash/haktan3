
import './style.css';
import { seedProducts } from './modules/products.js';
import { seedBanners } from './modules/banners.js';

import * as Products from './modules/products.js';
import * as Cart from './modules/cart.js';
import * as Orders from './modules/orders.js';
import * as Utils from './modules/utils.js';
import * as UI from './modules/ui.js';
import * as Admin from './modules/admin.js';
import * as Campaigns from './modules/campaigns.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { initWhatsAppButton } from './components/WhatsAppButton.js';

// Initialize
async function initApp() {
    try {
        await seedProducts();
        await seedBanners();


        // Render Layout
        if (!document.querySelector('header')) {
            renderHeader();
        }
        if (!document.querySelector('footer')) {
            renderFooter();
        }

        // WhatsApp Button
        initWhatsAppButton();

        // Expose HaktanApp to window
        window.HaktanApp = {
            ...Products,
            ...Cart,
            ...Orders,
            ...Utils,
            ...UI,
            ...Admin,
            ...Campaigns,
            CATEGORY_NAMES: Utils.CATEGORY_NAMES
        };

        // Initial badge update
        UI.updateCartBadge();

        // Remove loading state
        document.body.classList.add('loaded');
    } catch (error) {
        console.error("Failed to initialize app:", error);
        document.body.classList.add('loaded'); // Show anyway
    }
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
