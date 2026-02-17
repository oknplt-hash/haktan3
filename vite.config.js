import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        open: true
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin.html'),
                admin_banners: resolve(__dirname, 'admin_banners.html'),
                admin_campaigns: resolve(__dirname, 'admin_campaigns.html'),
                admin_orders: resolve(__dirname, 'admin_orders.html'),
                admin_products: resolve(__dirname, 'admin_products.html'),
                checkout_payment: resolve(__dirname, 'checkout_payment.html'),
                product_category: resolve(__dirname, 'product_category.html'),
                product_detail: resolve(__dirname, 'product_detail.html'),
                shoping_page: resolve(__dirname, 'shoping_page.html')
            }
        }
    }
});
