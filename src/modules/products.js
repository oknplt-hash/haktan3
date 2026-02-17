
// ============================================================
// PRODUCTS MODULE
// ============================================================
import { CATEGORY_NAMES } from './utils.js';
import { supabase } from './supabase.js';

const DEFAULT_PRODUCTS = [
    // ---- Kuruyemiş ----
    { name: "Lüks Antep Fıstığı", category: "kuruyemis", price: 850, oldPrice: 950, weight: "500g", rating: 4.8, reviews: 124, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnZQnXvUqHtBPbKLTHR_cB97TxWBN3KJ2qNzHxHqGCFiB5p5nqeeEuWMlJzJw2_k0qJBjASMR80mKpI-7osDDlC6tN-ZO1Gkxmx0cGrv3_x5tVuBNpKzCWG0oeGFYAc2XWzlUQ5BzC-b2ZHQfQfXLqV3gU2WlKS42F_8iLaW8LNH5z-lHTnXcH__P_UlcJSKwocpTmT8u_2yJJ5kh9k3xT-7xDSd4d9N_zl5BKDQ_0fIKZxVtqZZOHh5KJsxb8CcRQzCDRPkqno", description: "Gaziantep'in en kaliteli fıstıkları, günlük taze kavrulmuş." },
    { name: "Saray Lüks Karışık Çerez", category: "kuruyemis", price: 420, oldPrice: 490, weight: "500g", rating: 4.5, reviews: 42, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc3irhx7nvPaeQsyLzFVwZQGlDzClUU3doMMTp2E6c152FZpKH_QtA_SNflYtfVwL9-HcGG9mjUjbyg-VP5sstgn2qLhvNkcEJ6xdPJedpMQto2OTy-fUavdd0a02mkdynmwL_vANJbIk8kB79yhDPZn4wdtmdteRl9V5zDJ5hZNzp3MzGXdRjp-zuO_kB89Gz0DqE53YWyZTJY2aM9Bes6CR0KYipsw5SD-Zdc52Hj3tuBfpA6GnEfK1qt-5vYmndf6JjfjEJPVg", description: "Özel karışım lüks çerez, her lokmada farklı tat." },
    { name: "Kavrulmuş Kaju", category: "kuruyemis", price: 520, oldPrice: null, weight: "250g", rating: 4.7, reviews: 38, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeNPGn5ZKpT5u0ZMpP2iA8-sKnN_wT3qr1Rx7Vg01dFABezIlXgWmlI9EmM1UJGUclszCSP4YWPXWcKEWo59nAg4wt2uwiHt3alE4PtcCu0isSobI54dgh3Uw3r3Ugba_WYp6zfm1kwi1kSJYWJtDOAclFpoXSFBCGmepTM4qbBjZ93uljAG5W7cbNhwryg3-GQ59iAr3KVZrKb3D8mHJw2-PaorfHr5mvI2w_tR2QrJUzqUTMLmkvAMgFFY6HAzPe4Mbc005ED7M", description: "Tuzlu kavrulmuş kaju fıstığı, atıştırmalık." },
    { name: "Tuzlu Yer Fıstığı", category: "kuruyemis", price: 120, oldPrice: 150, weight: "500g", rating: 4.3, reviews: 89, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH8VArVN6n-tDprj6IDSnMMJenTyMsneYlONbSgyLLQtLVqg2Zu1iToepDwvvJ-HvRMC0ZRgNQyvwduy48jJY9jFYknpURMheNX8BL63p1TSNsw7CvC4aDIBB04Y2zmmwNhjT9rSaBtbx2A2-VOO7gDHyJ8Pp4Ti4OrPfhRTQhnUATQXg7mnAKxhDz6_G2dzXLQJkO7QgSomHSgKs5KWuLreEVMmx1WJ8vRm7q-xa8PT1-rtgRUkI8IpJbvWgYpN9t9vTacy5xZZI", description: "Klasik tuzlu kavrulmuş yer fıstığı." },
    { name: "Brezilya Cevizi", category: "kuruyemis", price: 680, oldPrice: null, weight: "250g", rating: 4.6, reviews: 17, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQJC22B122cg_g0zbJ1XGhfxg0JsvL3V9ksOAUBP-4e2pjSbwpBqV7vtayhkVTFco4-FSlsinxkCuzjShevJs3-FHc5MW1abKoPFLNhkBc_Zbz6sOOIQJM7HYygoiaoUGfeGeU7-LnMmD2hd8mvgbWTa62Q7TS5ese8KUDLyJYvY6jwIjg6n9HKAI4p_vyEPoTMQOpvMFVKNe_4G5VXBTMrt3ZJURgGGAflv5O89IW8JUBdeloUXWbMd4B9ytdlc251FAfXvx7HzM", description: "İthal Brezilya cevizi, zengin mineral kaynağı." },
    { name: "Bergama Tulum Peyniri", category: "sarkuteri", price: 320, oldPrice: null, weight: "500g", rating: 4.9, reviews: 56, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH8VArVN6n-tDprj6IDSnMMJenTyMsneYlONbSgyLLQtLVqg2Zu1iToepDwvvJ-HvRMC0ZRgNQyvwduy48jJY9jFYknpURMheNX8BL63p1TSNsw7CvC4aDIBB04Y2zmmwNhjT9rSaBtbx2A2-VOO7gDHyJ8Pp4Ti4OrPfhRTQhnUATQXg7mnAKxhDz6_G2dzXLQJkO7QgSomHSgKs5KWuLreEVMmx1WJ8vRm7q-xa8PT1-rtgRUkI8IpJbvWgYpN9t9vTacy5xZZI", description: "Ege'nin meşhur tulum peyniri, olgunlaştırılmış." },
    { name: "Pastırma (Dana)", category: "sarkuteri", price: 450, oldPrice: 520, weight: "300g", rating: 4.7, reviews: 33, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6m1tdDjAHhOL1Tpr6wvGwFXSpNywWaPFtFgTu98gE4SpEEMVzMx2Xqm0anmiApLIJeSySQJmP33MZvrIklseHNuz4uekhy6DX2Dmb4MKx5WFRZkvWizD-cy5da1ZkHK_J6p1mJaBMxxzQ9CtSRRVLV0oWW3UyDxeDi_l8lV-4QpbO58ULjtNqVlvaI53q4etqgciE-F6SP562DPXy_rMKOigbHM3eEJRmr_M9M_MW6BwLr3owf-nhmYDXXGCBHSK3RVHJMOR_i6I", description: "Kayseri usulü dana pastırma, el yapımı çemen." },
    { name: "Sucuk (Kangal)", category: "sarkuteri", price: 280, oldPrice: null, weight: "500g", rating: 4.5, reviews: 67, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt-YxHF40-Aeqw-mNnpZ3nobA0ab7lxLlX5gBUoWV009o5SES1l7ikcy4JkekuzKWZ7HAsOYnUDaP5U2KFwzijMzZtgWQLoiesFhLk3EdL4Onw8bflfD72Xo5NG8iJXvlWt_wQBuD8OyaSvaB3-7xX3CgNm4dgDT3r_Amct86Fkq7VzuUpJHXAaR_1NfCPjruxkqRJLkcxy7d32VftlFVZPv_rkD9w77mo6tU3XxlzojauHoNaz6rnHNdAkxDBCIOHsjeEGPCjI7U", description: "Geleneksel kangal sucuk, %100 dana eti." },
    { name: "Kaşar Peyniri (Eski)", category: "sarkuteri", price: 380, oldPrice: null, weight: "500g", rating: 4.6, reviews: 41, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnZQnXvUqHtBPbKLTHR_cB97TxWBN3KJ2qNzHxHqGCFiB5p5nqeeEuWMlJzJw2_k0qJBjASMR80mKpI-7osDDlC6tN-ZO1Gkxmx0cGrv3_x5tVuBNpKzCWG0oeGFYAc2XWzlUQ5BzC-b2ZHQfQfXLqV3gU2WlKS42F_8iLaW8LNH5z-lHTnXcH__P_UlcJSKwocpTmT8u_2yJJ5kh9k3xT-7xDSd4d9N_zl5BKDQ_0fIKZxVtqZZOHh5KJsxb8CcRQzCDRPkqno", description: "18 ay olgunlaştırılmış eski kaşar peyniri." },
    { name: "Zeytin (Gemlik Siyah)", category: "sarkuteri", price: 160, oldPrice: 190, weight: "1kg", rating: 4.8, reviews: 72, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc3irhx7nvPaeQsyLzFVwZQGlDzClUU3doMMTp2E6c152FZpKH_QtA_SNflYtfVwL9-HcGG9mjUjbyg-VP5sstgn2qLhvNkcEJ6xdPJedpMQto2OTy-fUavdd0a02mkdynmwL_vANJbIk8kB79yhDPZn4wdtmdteRl9V5zDJ5hZNzp3MzGXdRjp-zuO_kB89Gz0DqE53YWyZTJY2aM9Bes6CR0KYipsw5SD-Zdc52Hj3tuBfpA6GnEfK1qt-5vYmndf6JjfjEJPVg", description: "Gemlik'in meşhur siyah zeytini, doğal salamura." },
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
