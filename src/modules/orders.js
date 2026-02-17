
// ============================================================
// ORDERS MODULE
// ============================================================
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { supabase } from './supabase.js';

export async function getOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
    return data;
}

export async function createOrder(customerInfo) {
    const cartItems = await getCartItems();
    if (cartItems.length === 0) return null;
    const subtotal = await getCartTotal();
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

    const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

    if (error) {
        console.error("Error creating order:", error);
        return null;
    }

    clearCart();
    return data;
}

export async function updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

    if (error) {
        console.error("Error updating order status:", error);
        return null;
    }
    return data;
}

export async function deleteOrder(orderId) {
    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

    if (error) {
        console.error("Error deleting order:", error);
    }
}
