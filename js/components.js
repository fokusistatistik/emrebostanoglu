/**
 * EB.com UI Components
 * Centralized Navbar and Footer management
 */

const SITE_CONFIG = {
    logoUrl: 'https://static.fokusistatistik.com/resimler/eblogonavbar.png',
    favicon: 'https://static.fokusistatistik.com/resimler/ebfavicon.png',
    colors: {
        primary: '#2c3335', // Corporate Color
        gold: '#d4af37',
        blue: '#3b82f6',
        paper: '#f5f5dc',
        red: '#e50914'
    },
    social: {
        email: 'emrebostanoglu@gmail.com',
        instagram: 'https://www.instagram.com/emre.bostanoglu/',
        facebook: 'https://www.facebook.com/emrebostanoglu',
        linkedin: 'https://www.linkedin.com/in/emrebostanoglu/',
        twitter: 'https://x.com/emrebostanoglu',
        telegram: 'https://t.me/fokusistatistikbot',
        whatsapp: 'https://wa.me/905354040712?text=merhaba%20fokusistatistik',
        youtube: 'https://www.youtube.com/@emre.bostanoglu',
        github: 'https://github.com/fokusistatistik',
        asistan: 'https://asistan.fokusistatistik.com/',
        vimeo: 'https://vimeo.com/user10162793',
        px500: 'https://500px.com/p/myth1453'
    }
};

// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                cinzel: ['Cinzel', 'serif'],
            },
            colors: {
                'art-gold': SITE_CONFIG.colors.gold,
                'data-blue': SITE_CONFIG.colors.blue,
                'writer-paper': SITE_CONFIG.colors.paper,
                'director-red': SITE_CONFIG.colors.red,
                'dark-bg': SITE_CONFIG.colors.primary,
                'card-bg': '#343a40'
            }
        }
    }
};

function getNavbarHTML(activePage) {
    const links = [
        { id: 'home', href: '/index.html', text: 'Ana Sayfa', colorClass: 'hover:text-data-blue' },
        { id: 'about', href: '/about.html', text: 'Hakkımda', colorClass: 'hover:text-white' },
        { id: 'datascience', href: '/datascience.html', text: 'Veri Bilimi', colorClass: 'hover:text-data-blue' },
        { id: 'photography', href: '/photography.html', text: 'Fotoğraf', colorClass: 'hover:text-art-gold' },
        { id: 'writer', href: '/writer.html', text: 'Yazar', colorClass: 'hover:text-writer-paper' },
        { id: 'director', href: '/director.html', text: 'Yönetmen', colorClass: 'hover:text-director-red' },
        { id: 'blog', href: '/blog.html', text: 'Blog', colorClass: 'hover:text-data-blue' }
    ];

    let desktopLinksHTML = links.map(link => {
        const isActive = link.id === activePage;
        const activeClass = isActive ? `text-white border-b-2 border-${link.colorClass.split('-')[2] || 'white'}` : 'text-gray-300';
        return `<a href="${link.href}" class="${activeClass} ${link.colorClass} px-3 py-2 rounded-md text-sm font-medium transition-colors">${link.text}</a>`;
    }).join('');

    // Add Contact Button
    desktopLinksHTML += `<a href="/contact.html" class="bg-white text-dark-bg hover:bg-data-blue hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all">İletişim</a>`;

    let mobileLinksHTML = links.map(link => {
        const isActive = link.id === activePage;
        const activeClass = isActive ? 'text-white border-b border-gray-800' : 'text-gray-300';
        return `<a href="${link.href}" class="${activeClass} block px-3 py-2 rounded-md text-base font-medium">${link.text}</a>`;
    }).join('');
    mobileLinksHTML += `<a href="/contact.html" class="text-data-blue block px-3 py-2 rounded-md text-base font-medium">İletişim</a>`;

    return `
    <nav class="fixed w-full z-50 glass-nav transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0">
                    <a href="/" class="flex items-center">
                        <img src="${SITE_CONFIG.logoUrl}" alt="Emre Bostanoğlu Logo" class="h-12 w-auto">
                    </a>
                </div>
                <!-- Desktop Menu -->
                <div class="hidden lg:block">
                    <div class="ml-10 flex items-baseline space-x-6">
                        ${desktopLinksHTML}
                    </div>
                </div>
                <!-- Mobile menu button -->
                <div class="-mr-2 flex lg:hidden">
                    <button type="button" onclick="toggleMobileMenu()"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div class="hidden lg:hidden bg-dark-bg border-b border-gray-800" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                ${mobileLinksHTML}
            </div>
        </div>
    </nav>
    `;
}

function getFooterHTML() {
    const year = new Date().getFullYear();
    const social = SITE_CONFIG.social;

    // Create social links HTML with image icons
    const whatsappMessage = encodeURIComponent('Merhaba Emre Bostanoğlu');
    const socialLinks = [
        { url: social.instagram, img: 'https://static.fokusistatistik.com/resimler/instagram.png', name: 'Instagram' },
        { url: `${social.whatsapp}?text=${whatsappMessage}`, img: 'https://static.fokusistatistik.com/resimler/whatsapp.png', name: 'WhatsApp' },
        { url: social.email, img: 'https://static.fokusistatistik.com/resimler/eposta.png', name: 'E-posta Gönder', isEmail: true },
        { url: social.facebook, img: 'https://static.fokusistatistik.com/resimler/facebook.png', name: 'Facebook' },
        { url: social.linkedin, img: 'https://static.fokusistatistik.com/resimler/ln.png', name: 'LinkedIn' },
        { url: social.twitter, img: 'https://static.fokusistatistik.com/resimler/twitter.png', name: 'Twitter' },
        { url: social.telegram, img: 'https://static.fokusistatistik.com/resimler/telegram.png', name: 'Telegram' },
        { url: social.asistan, img: 'https://static.fokusistatistik.com/resimler/asistanfokus.png', name: 'Asistanlar' },
        { url: social.youtube, img: 'https://static.fokusistatistik.com/resimler/youtube.png', name: 'YouTube' },
        { url: social.github, img: 'https://static.fokusistatistik.com/resimler/github.png', name: 'Github' }
    ].filter(link => link.url !== null)
     .map(link => `<a href="${link.isEmail ? 'mailto:' + link.url : link.url}" ${!link.isEmail ? 'target="_blank" rel="noopener noreferrer"' : ''} class="inline-flex items-center justify-center w-[28px] h-[28px] opacity-75 hover:opacity-100 transition-all transform hover:scale-110" title="${link.name}" style="padding: 0; margin: 0;"><img src="${link.img}" alt="${link.name}" class="w-[27px] h-[27px] object-contain" style="display: block;" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" /><i class="fab fa-${link.name.toLowerCase()} text-xl text-gray-400" style="display:none;"></i></a>`).join('');

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
                            ${socialLinks}
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
                        <span class="text-gray-700">•</span>
                        <a href="#" class="text-gray-500 hover:text-art-gold transition-colors">KVKK</a>
                        <span class="text-gray-700">•</span>
                        <a href="#" class="text-gray-500 hover:text-art-gold transition-colors">Gizlilik</a>
                    </div>
                </div>

                <!-- Made with Love -->
                <div class="text-center mt-6 pt-6 border-t border-gray-900">
                    <p class="text-gray-600 text-xs flex items-center justify-center space-x-2">
                        <span>Tasarım & Geliştirme:</span>
                        <a href="https://www.fokusistatistik.com/" target="_blank" class="inline-flex items-center gap-1.5 text-art-gold font-semibold hover:underline">
                            <img src="https://static.fokusistatistik.com/resimler/favicon.png" alt="FOKUS İstatistik" class="w-4 h-4 inline-block">
                            FOKUS İstatistik
                        </a>
                        <i class="fas fa-heart text-red-500 animate-pulse"></i>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Cookie Consent Banner -->
    <div id="cookie-consent" class="cookie-consent hidden">
        <div class="cookie-content">
            <div class="cookie-icon">
                <i class="fas fa-cookie-bite"></i>
            </div>
            <div class="cookie-text">
                <h3 class="cookie-title" data-i18n="cookie.title">🍪 Çerez Kullanımı</h3>
                <p class="cookie-description" data-i18n="cookie.description">
                    Bu web sitesi, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanmaktadır.
                    6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında verileriniz güvende tutulmaktadır.
                    Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.
                </p>
                <div class="cookie-links">
                    <a href="#" class="text-sm text-blue-400 hover:underline mr-4">
                        <i class="fas fa-shield-alt mr-1"></i><span data-i18n="cookie.kvkk_link">KVKK Aydınlatma Metni</span>
                    </a>
                    <a href="#" class="text-sm text-blue-400 hover:underline">
                        <i class="fas fa-lock mr-1"></i><span data-i18n="cookie.privacy_link">Gizlilik Politikası</span>
                    </a>
                </div>
            </div>
            <div class="cookie-buttons">
                <button onclick="acceptCookies()" class="cookie-btn cookie-accept">
                    <i class="fas fa-check mr-2"></i><span data-i18n="cookie.accept">Kabul Et</span>
                </button>
                <button onclick="rejectCookies()" class="cookie-btn cookie-reject">
                    <i class="fas fa-times mr-2"></i><span data-i18n="cookie.reject">Reddet</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Cookie Consent Styles -->
    <style>
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1a1a1a 0%, #2c3335 100%);
            border-top: 3px solid #d4af37;
            box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            padding: 1.5rem;
            animation: slideUp 0.5s ease;
        }

        .cookie-consent.hidden {
            display: none;
        }

        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 1.5rem;
            align-items: center;
        }

        .cookie-icon {
            font-size: 3rem;
            color: #d4af37;
            animation: bounce 2s infinite;
        }

        .cookie-text {
            color: #fff;
        }

        .cookie-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #fff;
        }

        .cookie-description {
            font-size: 0.9rem;
            color: #d1d5db;
            line-height: 1.5;
            margin-bottom: 0.75rem;
        }

        .cookie-links {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .cookie-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .cookie-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cookie-accept {
            background: linear-gradient(135deg, #d4af37 0%, #f0c84b 100%);
            color: #000;
        }

        .cookie-accept:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
        }

        .cookie-reject {
            background: transparent;
            color: #9ca3af;
            border: 1px solid #4b5563;
        }

        .cookie-reject:hover {
            background: #374151;
            color: #fff;
        }

        @keyframes slideUp {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0);
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        @media (max-width: 768px) {
            .cookie-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .cookie-icon {
                font-size: 2rem;
                margin: 0 auto;
            }

            .cookie-buttons {
                flex-direction: row;
                width: 100%;
            }

            .cookie-btn {
                flex: 1;
                padding: 0.65rem 1rem;
                font-size: 0.85rem;
            }

            .cookie-links {
                justify-content: center;
            }
        }
    </style>

    <!-- Cookie Consent Script -->
    <script>
        // Check if user has already made a choice
        function checkCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                // Show banner after 1 second
                setTimeout(() => {
                    document.getElementById('cookie-consent').classList.remove('hidden');
                }, 1000);
            }
        }

        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            document.getElementById('cookie-consent').classList.add('hidden');
            // Initialize analytics or other tracking here
            console.log('Cookies accepted');
        }

        function rejectCookies() {
            localStorage.setItem('cookieConsent', 'rejected');
            document.getElementById('cookie-consent').classList.add('hidden');
            console.log('Cookies rejected');
        }

        function showCookieConsent() {
            localStorage.removeItem('cookieConsent');
            document.getElementById('cookie-consent').classList.remove('hidden');
        }

        // Run on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkCookieConsent);
        } else {
            checkCookieConsent();
        }
    </script>
    `;
}

function loadComponents(activePage) {
    // Inject Navbar - Clear first to prevent duplicates
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = ''; // Clear any existing content
        navbarContainer.innerHTML = getNavbarHTML(activePage);
    }

    // Inject Footer - Clear first to prevent duplicates
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = ''; // Clear any existing content
        footerContainer.innerHTML = getFooterHTML();
    }

    // Translate page content after components are loaded
    if (typeof I18N !== 'undefined' && I18N.translatePage) {
        I18N.translatePage();
    }

    // Listen for language changes and reload components
    window.addEventListener('languageChanged', function() {
        loadComponents(activePage);
    });
}

// Language switcher function
function switchLanguage(lang) {
    if (typeof I18N !== 'undefined') {
        I18N.changeLanguage(lang);
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

/**
 * Share Buttons Component
 * Generates social media share buttons for content
 * @param {Object} options - Share options
 * @param {string} options.url - URL to share (defaults to current page)
 * @param {string} options.title - Title to share (defaults to page title)
 * @param {string} options.description - Description for sharing
 * @param {string} options.layout - Layout style: 'horizontal' or 'vertical' (default: 'horizontal')
 * @param {boolean} options.showLabels - Show button labels (default: false)
 * @returns {string} HTML string for share buttons
 */
function getShareButtonsHTML(options = {}) {
    const {
        url = window.location.href,
        title = document.title,
        description = '',
        layout = 'horizontal',
        showLabels = false
    } = options;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareButtons = [
        {
            name: 'Facebook',
            icon: 'fab fa-facebook-f',
            color: 'bg-blue-600 hover:bg-blue-700',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'Twitter',
            icon: 'fab fa-twitter',
            color: 'bg-blue-400 hover:bg-blue-500',
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        },
        {
            name: 'LinkedIn',
            icon: 'fab fa-linkedin-in',
            color: 'bg-blue-700 hover:bg-blue-800',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        },
        {
            name: 'WhatsApp',
            icon: 'fab fa-whatsapp',
            color: 'bg-green-500 hover:bg-green-600',
            url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        },
        {
            name: 'Telegram',
            icon: 'fab fa-telegram-plane',
            color: 'bg-blue-500 hover:bg-blue-600',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        },
        {
            name: 'Email',
            icon: 'fas fa-envelope',
            color: 'bg-gray-600 hover:bg-gray-700',
            url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
        }
    ];

    const flexDirection = layout === 'vertical' ? 'flex-col' : 'flex-row flex-wrap';
    const buttonSize = showLabels ? 'px-4 py-2' : 'w-10 h-10';
    const gapSize = layout === 'vertical' ? 'gap-2' : 'gap-3';

    const buttonsHTML = shareButtons.map(button => `
        <a href="${button.url}"
           target="_blank"
           rel="noopener noreferrer"
           class="${button.color} ${buttonSize} rounded-lg text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
           aria-label="${button.name} ile paylaş"
           title="${button.name} ile paylaş">
            <i class="${button.icon}"></i>
            ${showLabels ? `<span class="ml-2 text-sm font-semibold">${button.name}</span>` : ''}
        </a>
    `).join('');

    return `
        <div class="share-buttons-container">
            <div class="flex ${flexDirection} ${gapSize} items-center">
                ${showLabels ? '<span class="text-gray-400 text-sm font-semibold mr-2">Paylaş:</span>' : ''}
                ${buttonsHTML}
            </div>
        </div>
    `;
}

/**
 * Load share buttons into a container
 * @param {string} containerId - ID of the container element
 * @param {Object} options - Share options (same as getShareButtonsHTML)
 */
function loadShareButtons(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = getShareButtonsHTML(options);
    }
}

// Sticky contact button removed

/**
 * Back to Top Button
 * Appears when user scrolls down, smooth scroll to top on click
 */
function initBackToTop() {
    // Inject back to top button HTML
    const backToTopHTML = `
        <button id="back-to-top"
                aria-label="Yukarı Çık"
                title="Yukarı Çık"
                style="
                    position: fixed;
                    bottom: 30px;
                    left: 30px;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #d4af37 0%, #f0c84b 100%);
                    color: #000;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 9997;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
                ">
            <i class="fas fa-chevron-up"></i>
        </button>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', backToTopHTML);

    const backToTopBtn = document.getElementById('back-to-top');

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
        backToTopBtn.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.6)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1) translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.4)';
    });

    console.log('Back to Top button initialized');
}

// Initialize Back to Top on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
    initBackToTop();
}

/**
 * Reading Progress Bar
 * Shows reading progress at the top of the page
 */
function initReadingProgress() {
    // Inject progress bar HTML
    const progressHTML = `
        <div id="reading-progress"
             style="
                 position: fixed;
                 top: 0;
                 left: 0;
                 width: 0%;
                 height: 3px;
                 background: linear-gradient(90deg, #d4af37 0%, #f0c84b 100%);
                 z-index: 10000;
                 transition: width 0.1s ease-out;
                 box-shadow: 0 2px 8px rgba(212, 175, 55, 0.6);
             ">
        </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('afterbegin', progressHTML);

    const progressBar = document.getElementById('reading-progress');

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;

        progressBar.style.width = progress + '%';
    });

    console.log('Reading Progress Bar initialized');
}

// Export for manual initialization
window.initReadingProgress = initReadingProgress;
