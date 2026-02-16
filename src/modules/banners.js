// src/modules/banners.js

const BANNERS_KEY = 'haktan_banners';

export function getBanners() {
    const data = localStorage.getItem(BANNERS_KEY);
    if (data) return JSON.parse(data);
    // Seed initial banners if empty
    const initial = [
        {
            id: 1,
            title: "Yaz İndirimi",
            subtitle: "%30'a varan indirimler",
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop",
            link: "/product_category.html?category=drinks",
            isActive: true
        },
        {
            id: 2,
            title: "Organik Sebzeler",
            description: "Taze tarladan kapınıza",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2000&auto=format&fit=crop",
            link: "/product_category.html?category=vegetables",
            isActive: true
        }
    ];
    saveBanners(initial);
    return initial;
}

function saveBanners(banners) {
    localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
}

export function getBanner(id) {
    const banners = getBanners();
    return banners.find(b => b.id == id);
}

export function addBanner(banner) {
    const banners = getBanners();
    const newId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
    banner.id = newId;
    banner.isActive = banner.isActive === true || banner.isActive === 'true'; // Ensure boolean
    banners.push(banner);
    saveBanners(banners);
    return banner;
}

export function updateBanner(id, data) {
    const banners = getBanners();
    const index = banners.findIndex(b => b.id == id);
    if (index !== -1) {
        banners[index] = { ...banners[index], ...data, id: parseInt(id) };
        saveBanners(banners);
    }
}

export function deleteBanner(id) {
    const banners = getBanners();
    const filtered = banners.filter(b => b.id != id);
    saveBanners(filtered);
}

export function toggleBannerStatus(id) {
    const banners = getBanners();
    const banner = banners.find(b => b.id == id);
    if (banner) {
        banner.isActive = !banner.isActive;
        saveBanners(banners);
    }
}
