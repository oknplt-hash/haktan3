
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

export function addToCart(productId, qty, variantIndex) {
    qty = qty || 1;
    variantIndex = variantIndex !== undefined ? Number(variantIndex) : null;
    const cart = getCart();

    // Find existing item with same productId AND same variantIndex
    const existing = cart.find(
        (item) => item.productId === Number(productId) && item.variantIndex === variantIndex
    );

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ productId: Number(productId), qty: qty, variantIndex: variantIndex });
    }
    setCart(cart);
    updateCartBadge();
}

export function removeFromCart(productId, variantIndex) {
    variantIndex = variantIndex !== undefined ? Number(variantIndex) : null;
    const cart = getCart().filter(
        (item) => !(item.productId === Number(productId) && item.variantIndex === variantIndex)
    );
    setCart(cart);
    updateCartBadge();
}

export function updateCartQty(productId, qty, variantIndex) {
    variantIndex = variantIndex !== undefined ? Number(variantIndex) : null;
    const cart = getCart();
    const item = cart.find(
        (i) => i.productId === Number(productId) && i.variantIndex === variantIndex
    );
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

    // Get unique product IDs to avoid duplicate fetches
    const uniqueIds = [...new Set(cart.map(item => item.productId))];
    const productMap = {};
    const products = await Promise.all(uniqueIds.map(id => getProduct(id)));
    products.forEach(p => { if (p) productMap[p.id] = p; });

    return cart.map((item) => {
        const product = productMap[item.productId];
        if (!product) return null;

        let price = product.price;
        let weight = product.weight;
        let variantInfo = null;

        // If this cart item has a variant selected
        if (item.variantIndex !== null && product.variants && product.variants[item.variantIndex]) {
            const variant = product.variants[item.variantIndex];
            price = variant.price;
            weight = variant.weight;
            variantInfo = variant;
        }

        return {
            ...product,
            price: price,
            weight: weight,
            variantIndex: item.variantIndex,
            variantInfo: variantInfo,
            qty: item.qty,
            total: price * item.qty
        };
    }).filter(Boolean);
}
