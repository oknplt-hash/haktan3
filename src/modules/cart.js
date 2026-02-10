
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
export function getCartTotal() {
    const cart = getCart();
    let subtotal = 0;
    cart.forEach((item) => {
        const product = getProduct(item.productId);
        if (product) subtotal += product.price * item.qty;
    });
    return subtotal;
}
export function getCartItems() {
    const cart = getCart();
    return cart
        .map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return { ...product, qty: item.qty, total: product.price * item.qty };
        })
        .filter(Boolean);
}
