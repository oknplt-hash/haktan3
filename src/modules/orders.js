
// ============================================================
// ORDERS MODULE
// ============================================================
import { getCartItems, getCartTotal, clearCart } from './cart.js';

export function getOrders() {
    return JSON.parse(localStorage.getItem("haktan_orders")) || [];
}
export function setOrders(orders) {
    localStorage.setItem("haktan_orders", JSON.stringify(orders));
}
export function createOrder(customerInfo) {
    const orders = getOrders();
    const cartItems = getCartItems();
    if (cartItems.length === 0) return null;
    const subtotal = getCartTotal();
    const shipping = subtotal >= 500 ? 0 : 39.90;
    const order = {
        id: "HKT-" + Date.now().toString(36).toUpperCase(),
        date: new Date().toISOString(),
        customer: customerInfo,
        items: cartItems,
        subtotal: subtotal,
        shipping: shipping,
        total: subtotal + shipping,
        status: "Beklemede",
    };
    orders.unshift(order);
    setOrders(orders);
    clearCart();
    return order;
}
export function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
        order.status = status;
        setOrders(orders);
        return order;
    }
    return null;
}
export function deleteOrder(orderId) {
    const orders = getOrders().filter((o) => o.id !== orderId);
    setOrders(orders);
}
