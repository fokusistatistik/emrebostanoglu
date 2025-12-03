/**
 * Header (Navbar) Module
 * Centralized navigation management
 */

class HeaderManager {
    constructor() {
        this.activePage = this.detectActivePage();
    }

    /**
     * Detect current active page from URL
     */
    detectActivePage() {
        const path = window.location.pathname;
        if (path === '/' || path.includes('index.html')) return 'home';
        if (path.includes('about.html')) return 'about';
        if (path.includes('datascience.html')) return 'datascience';
        if (path.includes('photography.html')) return 'photography';
        if (path.includes('writer.html')) return 'writer';
        if (path.includes('director.html')) return 'director';
        if (path.includes('blog')) return 'blog';
        if (path.includes('contact.html')) return 'contact';
        return 'home';
    }

    /**
     * Generate navigation links
     */
    getNavigationLinks() {
        return [
            { id: 'home', href: '/index.html', i18nKey: 'nav.home', colorClass: 'hover:text-data-blue' },
            { id: 'about', href: '/about.html', i18nKey: 'nav.about', colorClass: 'hover:text-white' },
            { id: 'datascience', href: '/datascience.html', i18nKey: 'nav.datascience', colorClass: 'hover:text-data-blue' },
            { id: 'photography', href: '/photography.html', i18nKey: 'nav.photography', colorClass: 'hover:text-art-gold' },
            { id: 'writer', href: '/writer.html', i18nKey: 'nav.writer', colorClass: 'hover:text-writer-paper' },
            { id: 'director', href: '/director.html', i18nKey: 'nav.director', colorClass: 'hover:text-director-red' },
            { id: 'blog', href: '/blog.html', i18nKey: 'nav.blog', colorClass: 'hover:text-data-blue' }
        ];
    }

    /**
     * Render desktop navigation links
     */
    renderDesktopLinks() {
        const links = this.getNavigationLinks();
        const linksHTML = links.map(link => {
            const isActive = link.id === this.activePage;
            const activeClass = isActive ? `text-white border-b-2 border-${link.colorClass.split('-')[2] || 'white'}` : 'text-gray-300';
            return `<a href="${link.href}" class="${activeClass} ${link.colorClass} px-3 py-2 rounded-md text-sm font-medium transition-colors" data-i18n="${link.i18nKey}"></a>`;
        }).join('');

        return linksHTML + `<a href="/contact.html" class="bg-white text-dark-bg hover:bg-data-blue hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all" data-i18n="nav.contact"></a>`;
    }

    /**
     * Render mobile navigation links
     */
    renderMobileLinks() {
        const links = this.getNavigationLinks();
        const linksHTML = links.map(link => {
            const isActive = link.id === this.activePage;
            const activeClass = isActive ? 'text-white border-b border-gray-800' : 'text-gray-300';
            return `<a href="${link.href}" class="${activeClass} block px-3 py-2 rounded-md text-base font-medium" data-i18n="${link.i18nKey}"></a>`;
        }).join('');

        return linksHTML + `<a href="/contact.html" class="text-data-blue block px-3 py-2 rounded-md text-base font-medium" data-i18n="nav.contact"></a>`;
    }

    /**
     * Render complete navbar HTML
     */
    render() {
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
                            ${this.renderDesktopLinks()}
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
                    ${this.renderMobileLinks()}
                </div>
            </div>
        </nav>
        `;
    }

    /**
     * Initialize and inject navbar into page
     */
    static init(containerId = 'navbar-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Navbar container #${containerId} not found`);
            return;
        }

        const header = new HeaderManager();
        container.innerHTML = header.render();
    }
}

// Auto-initialize if container exists
if (document.getElementById('navbar-container')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => HeaderManager.init());
    } else {
        HeaderManager.init();
    }
}
