
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
                        <li><a href="index.html" class="hover:text-primary">Ana Sayfa</a></li>
                        <li><a href="product_category.html" class="hover:text-primary">Tüm Ürünler</a></li>
                        <li><a href="shoping_page.html" class="hover:text-primary">Sepetim</a></li>
                        <li><a href="admin.html" class="hover:text-primary">Admin Girişi</a></li>
                     </ul>
                </div>
                <div>
                     <h4 class="text-white font-bold mb-4">Ürünler</h4>
                     <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="product_category.html?cat=kuruyemis" class="hover:text-primary">Kuruyemiş</a></li>
                        <li><a href="product_category.html?cat=sarkuteri" class="hover:text-primary">Şarküteri</a></li>
                        <li><a href="product_category.html?cat=pestil-kome" class="hover:text-primary">Pestil & Köme</a></li>
                     </ul>
                </div>
                <div>
                     <h4 class="text-white font-bold mb-4">İletişim</h4>
                     <p class="text-sm text-gray-400 mb-2">📍 İstanbul, Türkiye</p>
                     <p class="text-sm text-gray-400 mb-2">📞 0850 123 45 67</p>
                     <p class="text-sm text-gray-400">✉️ bilgi@haktan.com.tr</p>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© 2025 HAKTAN Kuruyemiş Şarküteri Sarayı. Tüm hakları saklıdır.</p>
                <div class="flex gap-4">
                    <span class="font-bold text-lg italic text-gray-600">Visa</span>
                    <span class="font-bold text-lg italic text-gray-600">Mastercard</span>
                    <span class="font-bold text-lg italic text-gray-600">Troy</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}
