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
    <footer id="contact" class="bg-black py-16 border-t border-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-serif text-white mb-8">İletişime Geçin</h2>
            <div class="flex flex-wrap justify-center gap-6 mb-12">
                <a href="mailto:info@emrebostanoglu.com" class="text-lg text-gray-400 hover:text-white transition">info@emrebostanoglu.com</a>
            </div>

            <div class="flex justify-center space-x-6 mb-12">
                <a href="#" class="text-2xl text-gray-500 hover:text-art-gold transition"><i class="fab fa-instagram"></i></a>
                <a href="#" class="text-2xl text-gray-500 hover:text-data-blue transition"><i class="fab fa-linkedin"></i></a>
                <a href="#" class="text-2xl text-gray-500 hover:text-white transition"><i class="fab fa-github"></i></a>
                <a href="#" class="text-2xl text-gray-500 hover:text-director-red transition"><i class="fab fa-youtube"></i></a>
            </div>

            <p class="text-gray-600 text-sm">
                © ${year} Emre Bostanoğlu. <br>
                <span class="text-xs">Fotoğraf Sanatı • Veri Bilimi • Edebiyat • Sinema</span>
            </p>
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
