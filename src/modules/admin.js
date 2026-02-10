
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
export function getAdminStats() {
    const products = getProducts();
    const orders = getOrders();
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === "Beklemede").length;
    return {
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: pendingOrders,
        totalRevenue: totalRevenue,
    };
}
