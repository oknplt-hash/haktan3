
import { supabase } from './supabase.js';

export async function getBanners() {
    const { data, error } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
    return data.map(b => ({ ...b, isActive: b.is_active }));
}

export async function seedBanners() {
    const { data: existing } = await supabase.from('banners').select('id').limit(1);
    if (!existing || existing.length === 0) {
        const initial = [
            {
                title: "Yaz İndirimi",
                subtitle: "%30'a varan indirimler",
                image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop",
                link: "/product_category.html?category=drinks",
                is_active: true
            },
            {
                title: "Organik Sebzeler",
                subtitle: "Taze tarladan kapınıza",
                image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2000&auto=format&fit=crop",
                link: "/product_category.html?category=vegetables",
                is_active: true
            }
        ];
        await supabase.from('banners').insert(initial);
    }
}

export async function getBanner(id) {
    const { data, error } = await supabase.from('banners').select('*').eq('id', id).single();
    if (error) {
        console.error("Error fetching banner:", error);
        return null;
    }
    return { ...data, isActive: data.is_active };
}

export async function addBanner(banner) {
    const { data, error } = await supabase.from('banners').insert([{
        title: banner.title,
        subtitle: banner.subtitle,
        image: banner.image,
        link: banner.link,
        is_active: banner.isActive === true || banner.isActive === 'true'
    }]).select().single();

    if (error) {
        console.error("Error adding banner:", error);
        return null;
    }
    return { ...data, isActive: data.is_active };
}

export async function updateBanner(id, updates) {
    const dbUpdates = { ...updates };
    if (updates.isActive !== undefined) {
        dbUpdates.is_active = updates.isActive;
        delete dbUpdates.isActive;
    }

    const { data, error } = await supabase.from('banners').update(dbUpdates).eq('id', id).select().single();
    if (error) {
        console.error("Error updating banner:", error);
        return null;
    }
    return { ...data, isActive: data.is_active };
}

export async function deleteBanner(id) {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) {
        console.error("Error deleting banner:", error);
    }
}

export async function toggleBannerStatus(id) {
    const banner = await getBanner(id);
    if (banner) {
        await updateBanner(id, { isActive: !banner.isActive });
    }
}
