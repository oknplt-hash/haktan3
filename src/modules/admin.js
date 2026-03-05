
// ============================================================
// ADMIN MODULE
// ============================================================
import { supabase } from './supabase.js';
import { getProducts } from './products.js';
import { getOrders } from './orders.js';

export async function isAdminLoggedIn() {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

export async function adminLogin(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
    }
}

export async function adminLogout() {
    await supabase.auth.signOut();
}

export async function updateAdminPassword(newPassword) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Password update error:', error.message);
        return { success: false, error: error.message };
    }
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
