
// ============================================================
// CAMPAIGNS & ANNOUNCEMENTS MODULE
// ============================================================
import { supabase } from './supabase.js';

const DEFAULT_SLIDERS = [
    {
        image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=1600&auto=format&fit=crop",
        title: "Taze Kavrulmuş Kuruyemiş",
        subtitle: "Antep fıstığından kaju cevizine, bademden fındığa… Taze kavrulmuş, birinci sınıf kuruyemişlerin en seçkinleri.",
        button_text: "Keşfet",
        button_link: "product_category.html?cat=kuruyemis",
        start_date: new Date().toISOString().split('T')[0],
        end_date: "2026-12-31",
        clicks: 0,
        active: true,
        type: "banner",
        tag: "En Çok Tercih Edilen",
        icon: "local_fire_department"
    },
    {
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
        title: "Premium Şarküteri",
        subtitle: "Sucuk, pastırma, kaşar peyniri ve daha fazlası… Geleneksel tariflerle hazırlanan şarküteri lezzetleri sofranızda.",
        button_text: "Keşfet",
        button_link: "product_category.html?cat=sarkuteri",
        start_date: new Date().toISOString().split('T')[0],
        end_date: "2026-12-31",
        clicks: 0,
        active: true,
        type: "banner",
        tag: "Gurme Seçim",
        icon: "restaurant"
    }
];

const DEFAULT_ANNOUNCEMENTS = [
    {
        text: "🎉 Açılışa özel tüm ürünlerde %10 indirim! Kod: HAKTAN10",
        active: true,
        type: "info"
    }
];

export async function getSliders() {
    const { data, error } = await supabase.from('sliders').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching sliders:", error);
        return [];
    }
    if (data.length === 0) {
        console.log("Seeding sliders...");
        await supabase.from('sliders').insert(DEFAULT_SLIDERS);
        return getSliders();
    }
    return data.map(s => ({
        ...s,
        buttonText: s.button_text,
        buttonLink: s.button_link,
        startDate: s.start_date,
        endDate: s.end_date
    }));
}

export async function addSlider(slider) {
    const { data, error } = await supabase.from('sliders').insert([{
        image: slider.image,
        title: slider.title,
        subtitle: slider.subtitle !== undefined ? slider.subtitle : "Haktan'ın taze ve doğal lezzetlerini keşfedin.",
        button_text: slider.buttonText || "Keşfet",
        button_link: slider.buttonLink || "/shoping_page.html",
        start_date: slider.startDate || new Date().toISOString().split('T')[0],
        end_date: slider.endDate || "2026-12-31",
        active: slider.active !== undefined ? slider.active : true,
        type: slider.type || "banner",
        tag: slider.tag || "Yeni",
        icon: slider.icon || "star",
        clicks: 0
    }]).select().single();

    if (error) console.error("Error adding slider:", error);
    return data;
}

export async function updateSlider(id, updates) {
    const dbUpdates = { ...updates };
    if (updates.buttonText) dbUpdates.button_text = updates.buttonText;
    if (updates.buttonLink) dbUpdates.button_link = updates.buttonLink;
    if (updates.startDate) dbUpdates.start_date = updates.startDate;
    if (updates.endDate) dbUpdates.end_date = updates.endDate;
    if (updates.subtitle !== undefined) dbUpdates.subtitle = updates.subtitle;

    delete dbUpdates.buttonText;
    delete dbUpdates.buttonLink;
    delete dbUpdates.startDate;
    delete dbUpdates.endDate;

    const { error } = await supabase.from('sliders').update(dbUpdates).eq('id', id);
    if (error) console.error("Error updating slider:", error);
}

export async function deleteSlider(id) {
    const { error } = await supabase.from('sliders').delete().eq('id', id);
    if (error) console.error("Error deleting slider:", error);
}

// ---- Announcements ----

export async function getAnnouncements() {
    const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }
    if (data.length === 0) {
        console.log("Seeding announcements...");
        await supabase.from('announcements').insert(DEFAULT_ANNOUNCEMENTS);
        return getAnnouncements();
    }
    return data;
}

export async function addAnnouncement(item) {
    const { data, error } = await supabase.from('announcements').insert([item]).select().single();
    if (error) console.error("Error adding announcement:", error);
    return data;
}

export async function updateAnnouncement(id, updates) {
    const { error } = await supabase.from('announcements').update(updates).eq('id', id);
    if (error) console.error("Error updating announcement:", error);
}

export async function deleteAnnouncement(id) {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) console.error("Error deleting announcement:", error);
}

export async function getActiveAnnouncement() {
    const list = await getAnnouncements();
    return list.find(a => a.active);
}

// ---- Weekly Campaign Products ----

export async function getCampaignProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('id')
        .eq('is_campaign', true);

    if (error) {
        console.error("Error fetching campaign products:", error);
        return [];
    }
    return data.map(p => p.id);
}

export async function addCampaignProduct(productId) {
    const { error } = await supabase
        .from('products')
        .update({ is_campaign: true })
        .eq('id', productId);

    if (error) console.error("Error adding campaign product:", error);
}

export async function removeCampaignProduct(productId) {
    const { error } = await supabase
        .from('products')
        .update({ is_campaign: false })
        .eq('id', productId);

    if (error) console.error("Error removing campaign product:", error);
}
