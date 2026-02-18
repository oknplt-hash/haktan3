import { getSettings } from '../modules/settings.js';

export function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'bg-gray-900 text-gray-300 mt-auto';
    footer.innerHTML = `
        <div class="container mx-auto px-6 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                 <div>
                     <h3 class="text-white text-lg font-bold mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">diamond</span> HAKTAN
                    </h3>
                    <p class="text-sm text-gray-400">Kuruyemiş ve şarküteri sarayına hoş geldiniz. 2025'ten beri en taze ürünleri sunuyoruz.</p>
                </div>
                <div>
                     <h4 class="text-white font-bold mb-4">Hızlı Erişim</h4>
                     <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="index.html" class="hover:text-primary transition-colors">Ana Sayfa</a></li>
                        <li><a href="product_category.html" class="hover:text-primary transition-colors">Tüm Ürünler</a></li>
                        <li><a href="shoping_page.html" class="hover:text-primary transition-colors">Sepetim</a></li>
                        <li><a href="admin.html" class="hover:text-primary transition-colors">Admin Girişi</a></li>
                     </ul>
                </div>
                <div>
                     <h4 class="text-white font-bold mb-4">Ürünler</h4>
                     <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="product_category.html?cat=kuruyemis" class="hover:text-primary transition-colors">Kuruyemiş</a></li>
                        <li><a href="product_category.html?cat=sarkuteri" class="hover:text-primary transition-colors">Şarküteri</a></li>
                        <li><a href="product_category.html?cat=pestil-kome" class="hover:text-primary transition-colors">Pestil & Köme</a></li>
                        <li><a href="product_category.html?cat=aktar" class="hover:text-primary transition-colors">Aktar</a></li>
                        <li><a href="product_category.html?cat=bakliyat" class="hover:text-primary transition-colors">Bakliyat</a></li>
                        <li><a href="product_category.html?cat=yoresel" class="hover:text-primary transition-colors">Yöresel</a></li>
                     </ul>
                </div>
                <div>
                     <h4 class="text-white font-bold mb-4">İletişim</h4>
                     <p class="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm text-primary">location_on</span>
                        <span id="footerAddress">İstanbul, Türkiye</span>
                     </p>
                     <p class="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm text-primary">call</span>
                        <span id="footerPhone">0850 123 45 67</span>
                     </p>
                     <p class="text-sm text-gray-400 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm text-primary">mail</span>
                        <a href="mailto:bilgi@haktan.com.tr" id="footerEmail" class="hover:text-primary transition-colors">bilgi@haktan.com.tr</a>
                     </p>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© 2025 HAKTAN Kuruyemiş Şarküteri Sarayı. Tüm hakları saklıdır.</p>
                <div class="flex gap-4">
                    <span class="font-bold text-lg italic text-gray-700 opacity-50">Visa</span>
                    <span class="font-bold text-lg italic text-gray-700 opacity-50">Mastercard</span>
                    <span class="font-bold text-lg italic text-gray-700 opacity-50">Troy</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(footer);

    // Update with dynamic settings
    async function updateFooterSettings() {
        const settings = await getSettings();
        if (settings) {
            const addr = document.getElementById('footerAddress');
            const phone = document.getElementById('footerPhone');
            const email = document.getElementById('footerEmail');

            if (addr && settings.address) addr.textContent = settings.address;
            if (phone && settings.whatsapp_number) {
                phone.textContent = '+' + settings.whatsapp_number;
            }
            if (email && settings.contact_email) {
                email.textContent = settings.contact_email;
                email.href = `mailto:${settings.contact_email}`;
            }
        }
    }

    updateFooterSettings();
}
