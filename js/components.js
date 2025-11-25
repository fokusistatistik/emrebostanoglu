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
        instagram: 'http://instagram.com/emre.bostanoglu',
        vimeo: 'https://vimeo.com/user10162793',
        px500: 'https://500px.com/p/myth1453',
        twitter: 'https://twitter.com/emrebostanoglu',
        facebook: 'https://www.facebook.com/emrebostanoglufotografatolyesi',
        spotify: null, // Will be provided by user
        linkedin: null,
        github: null,
        telegram: null,
        youtube: null
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
        { id: 'home', href: 'index.html', text: 'Ana Sayfa', colorClass: 'hover:text-data-blue' },
        { id: 'about', href: 'about.html', text: 'Hakkımda', colorClass: 'hover:text-white' },
        { id: 'datascience', href: 'datascience.html', text: 'Veri Bilimi', colorClass: 'hover:text-data-blue' },
        { id: 'photography', href: 'photography.html', text: 'Fotoğraf', colorClass: 'hover:text-art-gold' },
        { id: 'writer', href: 'writer.html', text: 'Yazar', colorClass: 'hover:text-writer-paper' },
        { id: 'director', href: 'director.html', text: 'Yönetmen', colorClass: 'hover:text-director-red' }
    ];

    let desktopLinksHTML = links.map(link => {
        const isActive = link.id === activePage;
        const activeClass = isActive ? `text-white border-b-2 border-${link.colorClass.split('-')[2] || 'white'}` : 'text-gray-300';
        return `<a href="${link.href}" class="${activeClass} ${link.colorClass} px-3 py-2 rounded-md text-sm font-medium transition-colors">${link.text}</a>`;
    }).join('');

    // Add Contact Button
    desktopLinksHTML += `<a href="contact.html" class="bg-white text-dark-bg hover:bg-data-blue hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all">İletişim</a>`;

    let mobileLinksHTML = links.map(link => {
        const isActive = link.id === activePage;
        const activeClass = isActive ? 'text-white border-b border-gray-800' : 'text-gray-300';
        return `<a href="${link.href}" class="${activeClass} block px-3 py-2 rounded-md text-base font-medium">${link.text}</a>`;
    }).join('');
    mobileLinksHTML += `<a href="contact.html" class="text-data-blue block px-3 py-2 rounded-md text-base font-medium">İletişim</a>`;

    return `
    <nav class="fixed w-full z-50 glass-nav transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0">
                    <a href="index.html" class="flex items-center">
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

    // Create social links HTML
    const socialLinks = [
        { url: social.instagram, icon: 'fab fa-instagram', color: 'hover:text-pink-500', name: 'Instagram' },
        { url: social.twitter, icon: 'fab fa-twitter', color: 'hover:text-blue-400', name: 'Twitter' },
        { url: social.facebook, icon: 'fab fa-facebook', color: 'hover:text-blue-600', name: 'Facebook' },
        { url: social.vimeo, icon: 'fab fa-vimeo', color: 'hover:text-blue-500', name: 'Vimeo' },
        { url: social.px500, icon: 'fas fa-camera', color: 'hover:text-art-gold', name: '500px' },
        { url: social.spotify, icon: 'fab fa-spotify', color: 'hover:text-green-500', name: 'Spotify' },
        { url: social.linkedin, icon: 'fab fa-linkedin', color: 'hover:text-blue-700', name: 'LinkedIn' },
        { url: social.youtube, icon: 'fab fa-youtube', color: 'hover:text-red-600', name: 'YouTube' },
        { url: social.github, icon: 'fab fa-github', color: 'hover:text-white', name: 'GitHub' },
        { url: social.telegram, icon: 'fab fa-telegram', color: 'hover:text-blue-400', name: 'Telegram' }
    ].filter(link => link.url !== null)
     .map(link => `
        <a href="${link.url}"
           target="_blank"
           rel="noopener noreferrer"
           class="text-2xl text-gray-500 ${link.color} transition transform hover:scale-110"
           aria-label="${link.name}">
            <i class="${link.icon}"></i>
        </a>
     `).join('');

    return `
    <footer id="contact" class="bg-black py-16 border-t border-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Contact Section -->
            <div class="text-center mb-12">
                <h2 class="text-3xl font-serif text-white mb-6">İletişime Geçin</h2>
                <a href="mailto:${social.email}"
                   class="inline-flex items-center text-lg text-gray-400 hover:text-white transition">
                    <i class="fas fa-envelope mr-2"></i>
                    ${social.email}
                </a>
            </div>

            <!-- Social Media Icons -->
            <div class="flex flex-wrap justify-center gap-6 mb-12">
                ${socialLinks}
            </div>

            <!-- Footer Links & Legal -->
            <div class="border-t border-gray-800 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p class="mb-4 md:mb-0">
                        © ${year} Emre Bostanoğlu. Tüm hakları saklıdır.
                    </p>
                    <div class="flex flex-wrap justify-center gap-4">
                        <button onclick="showCookieConsent()" class="hover:text-white transition">
                            <i class="fas fa-cookie-bite mr-1"></i>
                            Çerez Ayarları
                        </button>
                        <span class="text-gray-700">•</span>
                        <a href="#" class="hover:text-white transition">KVKK</a>
                        <span class="text-gray-700">•</span>
                        <a href="#" class="hover:text-white transition">Gizlilik Politikası</a>
                    </div>
                </div>
                <p class="text-center text-xs text-gray-700 mt-4">
                    Fotoğraf Sanatı • Veri Bilimi • Edebiyat • Sinema
                </p>
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
                <h3 class="cookie-title">🍪 Çerez Kullanımı</h3>
                <p class="cookie-description">
                    Bu web sitesi, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanmaktadır.
                    6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında verileriniz güvende tutulmaktadır.
                    Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.
                </p>
                <div class="cookie-links">
                    <a href="#" class="text-sm text-blue-400 hover:underline mr-4">
                        <i class="fas fa-shield-alt mr-1"></i>KVKK Aydınlatma Metni
                    </a>
                    <a href="#" class="text-sm text-blue-400 hover:underline">
                        <i class="fas fa-lock mr-1"></i>Gizlilik Politikası
                    </a>
                </div>
            </div>
            <div class="cookie-buttons">
                <button onclick="acceptCookies()" class="cookie-btn cookie-accept">
                    <i class="fas fa-check mr-2"></i>Kabul Et
                </button>
                <button onclick="rejectCookies()" class="cookie-btn cookie-reject">
                    <i class="fas fa-times mr-2"></i>Reddet
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
    // Inject Navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = getNavbarHTML(activePage);
    }

    // Inject Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = getFooterHTML();
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
