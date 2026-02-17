
// ============================================================
// CART MODULE
// ============================================================
import { getProduct } from './products.js';
import { updateCartBadge } from './ui.js';

export function getCart() {
    return JSON.parse(localStorage.getItem("haktan_cart")) || [];
}
export function setCart(cart) {
    localStorage.setItem("haktan_cart", JSON.stringify(cart));
}
export function addToCart(productId, qty) {
    qty = qty || 1;
    const cart = getCart();
    const existing = cart.find((item) => item.productId === Number(productId));
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ productId: Number(productId), qty: qty });
    }
    setCart(cart);
    updateCartBadge();
}
export function removeFromCart(productId) {
    const cart = getCart().filter((item) => item.productId !== Number(productId));
    setCart(cart);
    updateCartBadge();
}
export function updateCartQty(productId, qty) {
    const cart = getCart();
    const item = cart.find((i) => i.productId === Number(productId));
    if (item) {
        item.qty = Math.max(1, qty);
        setCart(cart);
    }
    updateCartBadge();
}
export function clearCart() {
    setCart([]);
    updateCartBadge();
}
export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
}
export async function getCartTotal() {
    const items = await getCartItems();
    return items.reduce((sum, item) => sum + item.total, 0);
}

export async function getCartItems() {
    const cart = getCart();
    if (cart.length === 0) return [];

    const productIds = cart.map((item) => item.productId);

    // Import supabase dynamically to avoid circular dependency issues if any,
    // though here it is imported at top in other files.
    // Better to use getProducts logic or direct supabase call.
    // Since we can't change imports easily here, let's assume getProduct can be optimized or we do manual fetch.
    // Actually, let's just use supabase directly here if possible or add a bulk fetch in products.js.
    // But to keep it simple and contained in cart.js for now without changing products.js signature too much:

    // We need to fetch products. Let's rely on the imported supabase client if available, 
    // BUT cart.js imports getProduct from products.js, which imports supabase.
    // Let's use getProduct but in parallel with Promise.all for now, or better:
    // Update products.js to have getProductsByIds? No, let's just do Promise.all(cart.map(...))
    // It's not the most efficient but it's correct and easy to implement right now.

    const products = await Promise.all(cart.map(item => getProduct(item.productId)));

    return cart.map((item, index) => {
        const product = products[index];
        if (!product) return null;
        return { ...product, qty: item.qty, total: product.price * item.qty };
    }).filter(Boolean);
}
