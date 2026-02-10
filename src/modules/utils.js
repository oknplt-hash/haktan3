
// ============================================================
// UTILS MODULE
// ============================================================

export const CATEGORY_NAMES = {
    kuruyemis: "Kuruyemiş",
    sarkuteri: "Şarküteri",
    aktar: "Aktar",
    bakliyat: "Bakliyat",
    "pestil-kome": "Pestil & Köme",
    yoresel: "Yöresel Ürünler",
};

export function formatPrice(price) {
    return Number(price).toFixed(2).replace(".", ",") + "₺";
}

export function getCategoryName(slug) {
    return CATEGORY_NAMES[slug] || slug || "Tüm Ürünler";
}

export function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

export function renderStars(rating) {
    let html = "";
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    for (let i = 0; i < full; i++)
        html += '<span class="material-symbols-outlined text-yellow-500 text-[18px]" style="font-variation-settings:\'FILL\' 1">star</span>';
    if (half)
        html += '<span class="material-symbols-outlined text-yellow-500 text-[18px]" style="font-variation-settings:\'FILL\' 1">star_half</span>';
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < empty; i++)
        html += '<span class="material-symbols-outlined text-gray-300 text-[18px]">star</span>';
    return html;
}
