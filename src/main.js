
import './style.css';
import { seedProducts } from './modules/products.js';
import * as Products from './modules/products.js';
import * as Cart from './modules/cart.js';
import * as Orders from './modules/orders.js';
import * as Utils from './modules/utils.js';
import * as UI from './modules/ui.js';
import * as Admin from './modules/admin.js';
import * as Campaigns from './modules/campaigns.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';

// Initialize
seedProducts();

// Render Layout
// We only render header/footer if they don't exist (in case of transition state)
// But for Vite migration, we are removing them from HTML, so we always render.
if (!document.querySelector('header')) {
    renderHeader();
}
// Footer is appended to end of body
if (!document.querySelector('footer')) {
    renderFooter();
}

// Expose HaktanApp to window for backward compatibility with inline scripts
// and for event handlers in HTML attributes (onclick="HaktanApp.addToCart(...)")
window.HaktanApp = {
    ...Products,
    ...Cart,
    ...Orders,
    ...Utils,
    ...UI,
    ...Admin,
    ...Campaigns,
    CATEGORY_NAMES: Utils.CATEGORY_NAMES // Explicitly expose constant
};

// Remove loading state
// Remove loading state
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});

// Initial badge update
// Wait for DOM to be ready just in case
document.addEventListener('DOMContentLoaded', () => {
    UI.updateCartBadge();
});
