/**
 * Footer Module
 * Centralized footer management
 */

class FooterManager {
    /**
     * Generate social media links HTML
     */
    static getSocialLinksHTML() {
        const social = SITE_CONFIG.social;
        const whatsappMessage = encodeURIComponent('Merhaba Emre Bostanoğlu');
        const socialLinks = [
            { url: social.instagram, img: '/assets/img/instagram.png', name: 'Instagram' },
            { url: `${social.whatsapp}?text=${whatsappMessage}`, img: '/assets/img/whatsapp.png', name: 'WhatsApp' },
            { url: social.email, img: 'https://static.fokusistatistik.com/resimler/eposta.png', name: 'E-posta Gönder', isEmail: true },
            { url: social.facebook, img: '/assets/img/facebook.png', name: 'Facebook' },
            { url: social.linkedin, img: '/assets/img/ln.png', name: 'LinkedIn' },
            { url: social.twitter, img: '/assets/img/twitter.png', name: 'Twitter' },
            { url: social.telegram, img: '/assets/img/telegram.png', name: 'Telegram' },
            { url: social.asistan, img: 'https://static.fokusistatistik.com/resimler/asistanfokus.png', name: 'Asistanlar' },
            { url: social.youtube, img: '/assets/img/youtube.png', name: 'YouTube' },
            { url: social.github, img: '/assets/img/github.png', name: 'Github' }
        ];

        return socialLinks
            .filter(link => link.url !== null)
            .map(link => `
                <a href="${link.isEmail ? 'mailto:' + link.url : link.url}"
                   ${!link.isEmail ? 'target="_blank" rel="noopener noreferrer"' : ''}
                   class="inline-flex items-center justify-center w-[28px] h-[28px] transition-all transform hover:scale-110 hover:opacity-80"
                   title="${link.name}"
                   style="padding: 0; margin: 0;">
                    <img src="${link.img}"
                         alt="${link.name}"
                         class="w-[27px] h-[27px] object-contain"
                         style="display: block;"
                         onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
                    <i class="fab fa-${link.name.toLowerCase()} text-xl text-gray-400" style="display:none;"></i>
                </a>
            `).join('');
    }

    /**
     * Render complete footer HTML
     */
    static render() {
        const year = new Date().getFullYear();
        const social = SITE_CONFIG.social;
        const socialLinksHTML = this.getSocialLinksHTML();

        return `
        <footer id="contact" class="relative bg-gradient-to-b from-black via-[#0a0a0a] to-[#0f0f0f] border-t border-gray-800">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5" style="background-image: url('https://www.transparenttextures.com/patterns/cubes.png');"></div>

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Main Footer Content -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-16 border-b border-gray-800">

                    <!-- Column 1: About -->
                    <div class="space-y-4">
                        <div class="mb-6">
                            <img src="${SITE_CONFIG.logoUrl}" alt="Emre Bostanoğlu" class="h-14 w-auto mb-4">
                            <p class="text-gray-400 text-sm leading-relaxed">
                                Fotoğraf sanatı, veri bilimi, edebiyat ve sinema alanlarında çalışmalar yürüten çok yönlü bir sanatçı ve veri bilimci.
                            </p>
                        </div>
                        <div class="text-gray-500 text-xs leading-relaxed space-y-1">
                            <p class="text-data-blue font-medium">Data Scientist | Statistician, MSc</p>
                            <p>Founder of <a href="https://www.fokusistatistik.com/" target="_blank" class="text-art-gold hover:underline">@fokusistatistik</a></p>
                            <p>Novelist | <span class="text-director-red">🎥</span> Director</p>
                            <p class="text-art-gold font-medium">EFIAP Photographer</p>
                        </div>
                    </div>

                    <!-- Column 2: Quick Links -->
                    <div class="space-y-4">
                        <h3 class="text-white font-bold text-lg mb-6 border-b border-gray-800 pb-3">
                            Hızlı Erişim
                        </h3>
                        <nav class="flex flex-col space-y-3">
                            <a href="/" class="text-gray-400 hover:text-art-gold transition-colors text-sm flex items-center group">
                                <i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                                Ana Sayfa
                            </a>
                            <a href="/photography.html" class="text-gray-400 hover:text-art-gold transition-colors text-sm flex items-center group">
                                <i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                                Fotoğraf Portfolyosu
                            </a>
                            <a href="/datascience.html" class="text-gray-400 hover:text-data-blue transition-colors text-sm flex items-center group">
                                <i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                                Veri Bilimi Projeleri
                            </a>
                            <a href="/writer.html" class="text-gray-400 hover:text-writer-paper transition-colors text-sm flex items-center group">
                                <i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                                Yayınlar & Kitaplar
                            </a>
                            <a href="/director.html" class="text-gray-400 hover:text-director-red transition-colors text-sm flex items-center group">
                                <i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                                Filmografi
                            </a>
                            <a href="/blog.html" class="text-gray-400 hover:text-data-blue transition-colors text-sm flex items-center group">
                                <i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                                Blog
                            </a>
                        </nav>
                    </div>

                    <!-- Column 3: Contact Info & Social Media -->
                    <div class="space-y-4">
                        <h3 class="text-white font-bold text-lg mb-6 border-b border-gray-800 pb-3">
                            İletişim
                        </h3>
                        <div class="space-y-4">
                            <a href="mailto:${social.email}" class="flex items-start space-x-3 text-gray-400 hover:text-art-gold transition-colors group">
                                <i class="fas fa-envelope text-art-gold mt-1 group-hover:scale-110 transition-transform"></i>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Email</p>
                                    <p class="text-sm">${social.email}</p>
                                </div>
                            </a>
                            <div class="flex items-start space-x-3 text-gray-400">
                                <i class="fas fa-map-marker-alt text-art-gold mt-1"></i>
                                <div>
                                    <p class="text-xs text-gray-500 mb-1">Konum</p>
                                    <p class="text-sm">Türkiye</p>
                                </div>
                            </div>
                            <a href="/contact.html" class="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-art-gold to-[#f0c84b] text-black font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-art-gold/50 transition-all transform hover:scale-105">
                                İletişime Geç
                            </a>
                        </div>

                        <!-- Sosyal Medya İkonları -->
                        <div class="mt-8 pt-6 border-t border-gray-800">
                            <p class="text-gray-500 text-xs mb-4 font-semibold">Sosyal Medya</p>
                            <div class="flex flex-wrap items-center justify-start gap-[3px]">
                                ${socialLinksHTML}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Bottom -->
                <div class="py-8">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <!-- Copyright -->
                        <div class="text-center md:text-left">
                            <p class="text-gray-500 text-sm">
                                © ${year} <span class="text-art-gold font-semibold">Emre BOSTANOĞLU</span>. Tüm hakları saklıdır.
                            </p>
                            <p class="text-gray-600 text-xs mt-1">
                                Emre BOSTANOĞLU'nun resmi kişisel sayfası
                            </p>
                            <p class="text-gray-600 text-xs mt-1">
                                Fotoğraf Sanatı • Veri Bilimi • Edebiyat • Sinema
                            </p>
                        </div>

                        <!-- Legal Links -->
                        <div class="flex flex-wrap items-center justify-center gap-4 text-xs">
                            <button onclick="showCookieConsent()" class="text-gray-500 hover:text-art-gold transition-colors flex items-center">
                                <i class="fas fa-cookie-bite mr-1"></i>
                                Çerez Ayarları
                            </button>
                            <a href="/privacy.html" class="text-gray-500 hover:text-art-gold transition-colors">
                                Gizlilik Politikası
                            </a>
                            <a href="/kvkk.html" class="text-gray-500 hover:text-art-gold transition-colors">
                                KVKK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }

    /**
     * Initialize and inject footer into page
     */
    static init(containerId = 'footer-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Footer container #${containerId} not found`);
            return;
        }

        container.innerHTML = this.render();
    }
}

// Auto-initialize if container exists
if (document.getElementById('footer-container')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FooterManager.init());
    } else {
        FooterManager.init();
    }
}
