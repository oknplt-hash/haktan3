
// ============================================================
// ADMIN MODULE
// ============================================================
import { getProducts } from './products.js';
import { getOrders } from './orders.js';

const ADMIN_PASSWORD = "haktan2025";

export function isAdminLoggedIn() {
    return sessionStorage.getItem("haktan_admin") === "true";
}
export function adminLogin(password) {
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("haktan_admin", "true");
        return true;
    }
    return false;
}
export function adminLogout() {
    sessionStorage.removeItem("haktan_admin");
}
export async function getAdminStats() {
    const products = await getProducts();
    const orders = await getOrders();
    // Default to empty array if null/undefined to prevent reduce errors
    const safeOrders = Array.isArray(orders) ? orders : [];
    const safeProducts = Array.isArray(products) ? products : [];

    const totalRevenue = safeOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const pendingOrders = safeOrders.filter((o) => o.status === "Beklemede").length;
    return {
        totalProducts: safeProducts.length,
        totalOrders: safeOrders.length,
        pendingOrders: pendingOrders,
        totalRevenue: totalRevenue,
    };
}
