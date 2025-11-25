/**
 * EB.com UI Components
 * Centralized Navbar and Footer management
 */

const SITE_CONFIG = {
    logoUrl: 'https://static.fokusistatistik.com/resimler/eblogonavbar.png',
    favicon: 'https://static.fokusistatistik.com/resimler/ebfavicon.png',
    colors: {
        primary: '#2c3335', // New Corporate Color
        gold: '#d4af37',
        blue: '#3b82f6',
        paper: '#f5f5dc',
        red: '#e50914'
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
    return `
    <footer class="bg-dark-bg border-t border-gray-800 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div class="col-span-1 md:col-span-2">
                    <a href="index.html" class="flex items-center mb-4">
                        <img src="${SITE_CONFIG.logoUrl}" alt="Emre Bostanoğlu Logo" class="h-8 w-auto">
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed max-w-md">
                        Veri ile gerçeği, ışık ile anı, kelimelerle hikayeyi, vizörle dünyayı keşfediyorum.
                        Disiplinlerarası bir yaklaşımla sanat ve bilimi buluşturuyorum.
                    </p>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Hızlı Erişim</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="about.html" class="hover:text-white transition">Hakkımda</a></li>
                        <li><a href="datascience.html" class="hover:text-data-blue transition">Veri Bilimi</a></li>
                        <li><a href="photography.html" class="hover:text-art-gold transition">Fotoğraf</a></li>
                        <li><a href="writer.html" class="hover:text-writer-paper transition">Kitaplar</a></li>
                        <li><a href="director.html" class="hover:text-director-red transition">Filmler</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">İletişim</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="mailto:info@emrebostanoglu.com" class="hover:text-white transition">info@emrebostanoglu.com</a></li>
                        <li>İstanbul, Türkiye</li>
                        <li class="flex space-x-4 mt-4">
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-instagram text-lg"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-twitter text-lg"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-linkedin text-lg"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-github text-lg"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-500 text-xs">© ${year} Emre Bostanoğlu. Tüm hakları saklıdır.</p>
                <p class="text-gray-600 text-xs mt-2 md:mt-0">Designed by <span class="text-gray-500">EB.com AI</span></p>
            </div>
        </div>
    </footer>
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
