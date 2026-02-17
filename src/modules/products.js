
// ============================================================
// PRODUCTS MODULE
// ============================================================
import { CATEGORY_NAMES } from './utils.js';
import { supabase } from './supabase.js';

const DEFAULT_PRODUCTS = [
    // ---- Kuruyemiş ----
    { name: "Lüks Antep Fıstığı", category: "kuruyemis", price: 850, oldPrice: 950, weight: "500g", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=800&auto=format&fit=crop", description: "Gaziantep'in en kaliteli fıstıkları, günlük taze kavrulmuş." },
    { name: "Saray Lüks Karışık Çerez", category: "kuruyemis", price: 420, oldPrice: 490, weight: "500g", rating: 4.5, reviews: 42, image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop", description: "Özel karışım lüks çerez, her lokmada farklı tat." },
    { name: "Kavrulmuş Kaju", category: "kuruyemis", price: 520, oldPrice: null, weight: "250g", rating: 4.7, reviews: 38, image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=800&auto=format&fit=crop", description: "Tuzlu kavrulmuş kaju fıstığı, birinci sınıf." },
    { name: "Çiğ Badem İçi", category: "kuruyemis", price: 290, oldPrice: 320, weight: "400g", rating: 4.6, reviews: 55, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=800&auto=format&fit=crop", description: "Taze ve doğal çiğ badem içi." },
    { name: "Kavrulmuş Fındık İçi", category: "kuruyemis", price: 340, oldPrice: null, weight: "500g", rating: 4.9, reviews: 92, image: "https://images.unsplash.com/photo-1615485240388-1473aa9ec827?q=80&w=800&auto=format&fit=crop", description: "Giresun'un meşhur yağlı fındığı, özel kavrulmuş." },

    // ---- Şarküteri ----
    { name: "Bergama Tulum Peyniri", category: "sarkuteri", price: 320, oldPrice: null, weight: "500g", rating: 4.9, reviews: 56, image: "https://images.unsplash.com/photo-1486297678162-ad2a5a303119?q=80&w=800&auto=format&fit=crop", description: "Ege'nin meşhur tulum peyniri, olgunlaştırılmış." },
    { name: "Pastırma (Dana)", category: "sarkuteri", price: 450, oldPrice: 520, weight: "300g", rating: 4.7, reviews: 33, image: "https://images.unsplash.com/photo-1601050638917-3606f876fd74?q=80&w=800&auto=format&fit=crop", description: "Kayseri usulü dana pastırma, el yapımı çemen." },
    { name: "Sucuk (Kangal)", category: "sarkuteri", price: 280, oldPrice: null, weight: "500g", rating: 4.5, reviews: 67, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=800&auto=format&fit=crop", description: "Geleneksel kangal sucuk, %100 dana eti." },
    { name: "Eski Kaşar Peyniri", category: "sarkuteri", price: 380, oldPrice: null, weight: "500g", rating: 4.6, reviews: 41, image: "https://images.unsplash.com/photo-1596751303335-74f35836d3bf?q=80&w=800&auto=format&fit=crop", description: "18 ay olgunlaştırılmış eski kaşar peyniri." },
    { name: "Siyah Zeytin (Gemlik)", category: "sarkuteri", price: 160, oldPrice: 190, weight: "1kg", rating: 4.8, reviews: 72, image: "https://images.unsplash.com/photo-1541533848490-bc8115cd6522?q=80&w=800&auto=format&fit=crop", description: "Gemlik'in meşhur siyah zeytini, doğal salamura." },

    // ---- Aktar ----
    { name: "Organik Çiçek Balı", category: "aktar", price: 450, oldPrice: 550, weight: "850g", rating: 4.9, reviews: 112, image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop", description: "Yüksek rakımlı yaylalardan toplanan saf çiçek balı." },
    { name: "Taze Ihlamur", category: "aktar", price: 85, oldPrice: null, weight: "100g", rating: 4.7, reviews: 45, image: "https://images.unsplash.com/photo-1594631252845-29fc45866766?q=80&w=800&auto=format&fit=crop", description: "Yeni sezon kurutulmuş yaprak ve çiçek ıhlamur." },
    { name: "Siirt Bıttım Sabunu", category: "aktar", price: 45, oldPrice: 60, weight: "1 Adet", rating: 4.4, reviews: 28, image: "https://images.unsplash.com/photo-1600857062241-99e5da7f50a9?q=80&w=800&auto=format&fit=crop", description: "Geleneksel yöntemlerle üretilen doğal bıttım sabunu." },

    // ---- Bakliyat ----
    { name: "Yerli Kırmızı Mercimek", category: "bakliyat", price: 65, oldPrice: null, weight: "1kg", rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?q=80&w=800&auto=format&fit=crop", description: "Güneydoğu Anadolu bölgesinin taze mahsul mercimeği." },
    { name: "İspir Kuru Fasulyesi", category: "bakliyat", price: 140, oldPrice: 165, weight: "1kg", rating: 4.9, reviews: 84, image: "https://images.unsplash.com/photo-1585994192701-11c59b6abc88?q=80&w=800&auto=format&fit=crop", description: "Meşhur İspir şeker fasulyesi, hızlı pişer, lezzetlidir." },

    // ---- Pestil & Köme ----
    { name: "Gümüşhane Cevizli Köme", category: "pestil-kome", price: 180, oldPrice: null, weight: "500g", rating: 4.9, reviews: 62, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800&auto=format&fit=crop", description: "Geleneksel Gümüşhane kömesi, bol cevizli." },
    { name: "Dut Pestili", category: "pestil-kome", price: 140, oldPrice: 160, weight: "500g", rating: 4.7, reviews: 49, image: "https://images.unsplash.com/photo-1534433842144-802528859a72?q=80&w=800&auto=format&fit=crop", description: "Doğal dut şırası ve nişasta ile hazırlanan ince pestil." },

    // ---- Yöresel ----
    { name: "Maraş Tarhanası", category: "yoresel", price: 110, oldPrice: null, weight: "500g", rating: 4.8, reviews: 77, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop", description: "Meşhur Kahramanmaraş çıtır tarhanası." },
    { name: "Erzincan Tulum Peyniri", category: "yoresel", price: 380, oldPrice: 420, weight: "1kg", rating: 4.9, reviews: 104, image: "https://images.unsplash.com/photo-1486297678162-ad2a5a303119?q=80&w=800&auto=format&fit=crop", description: "Erzincan yaylalarından gelen hakiki deri tulum peyniri." }
];

export async function seedProducts() {
    const { data: existing } = await supabase.from('products').select('id').limit(1);
    if (!existing || existing.length === 0) {
        console.log("Seeding products to Supabase...");
        await supabase.from('products').insert(DEFAULT_PRODUCTS.map(p => ({
            name: p.name,
            category: p.category,
            price: p.price,
            old_price: p.oldPrice,
            weight: p.weight,
            rating: p.rating,
            reviews: p.reviews,
            image: p.image,
            description: p.description
        })));
    }
}

export async function forceSeedProducts() {
    console.log("Force seeding products to Supabase...");
    await supabase.from('products').insert(DEFAULT_PRODUCTS.map(p => ({
        name: p.name,
        category: p.category,
        price: p.price,
        old_price: p.oldPrice,
        weight: p.weight,
        rating: p.rating,
        reviews: p.reviews,
        image: p.image,
        description: p.description
    })));
}

export async function getProducts() {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }
    return data.map(p => ({ ...p, oldPrice: p.old_price }));
}

export async function getProduct(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) {
        console.error("Error fetching product:", error);
        return null;
    }
    return { ...data, oldPrice: data.old_price };
}

export async function getProductsByCategory(cat) {
    if (!cat) return getProducts();
    const { data, error } = await supabase.from('products').select('*').eq('category', cat).order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
    return data.map(p => ({ ...p, oldPrice: p.old_price }));
}

export async function searchProducts(query) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) {
        console.error("Error searching products:", error);
        return [];
    }
    return data.map(p => ({ ...p, oldPrice: p.old_price }));
}

export async function addProduct(product) {
    const { data, error } = await supabase.from('products').insert([{
        name: product.name,
        category: product.category,
        price: product.price,
        old_price: product.oldPrice,
        weight: product.weight,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        image: product.image,
        description: product.description
    }]).select().single();

    if (error) {
        console.error("Error adding product:", error);
        return null;
    }
    return { ...data, oldPrice: data.old_price };
}

export async function updateProduct(id, updates) {
    const dbUpdates = { ...updates };
    if (updates.oldPrice !== undefined) {
        dbUpdates.old_price = updates.oldPrice;
        delete dbUpdates.oldPrice;
    }

    const { data, error } = await supabase.from('products').update(dbUpdates).eq('id', id).select().single();
    if (error) {
        console.error("Error updating product:", error);
        return null;
    }
    return { ...data, oldPrice: data.old_price };
}

export async function deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
        console.error("Error deleting product:", error);
    }
}

export async function getBestSellers(limit = 8) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('reviews', { ascending: false })
        .order('rating', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching best sellers:", error);
        return [];
    }
    return data.map(p => ({ ...p, oldPrice: p.old_price }));
}
