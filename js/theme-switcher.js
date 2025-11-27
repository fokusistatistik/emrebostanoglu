/**
 * Theme Switcher - Dark/Light Mode Toggle
 * Stores user preference in localStorage
 */

(function() {
    'use strict';

    const THEME_KEY = 'eb-theme-preference';
    const THEMES = {
        DARK: 'dark',
        LIGHT: 'light'
    };

    // Theme configurations
    const themeColors = {
        dark: {
            bg: '#0a0a0a',
            cardBg: '#1a1a1a',
            text: '#e5e7eb',
            textSecondary: '#9ca3af',
            border: '#333',
            navbarBg: 'rgba(10, 10, 10, 0.95)',
            footerBg: '#000000'
        },
        light: {
            bg: '#ffffff',
            cardBg: '#f9fafb',
            text: '#1f2937',
            textSecondary: '#6b7280',
            border: '#e5e7eb',
            navbarBg: 'rgba(255, 255, 255, 0.95)',
            footerBg: '#f3f4f6'
        }
    };

    /**
     * Get current theme from localStorage or system preference
     */
    function getCurrentTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);

        if (savedTheme) {
            return savedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return THEMES.LIGHT;
        }

        return THEMES.DARK; // Default to dark
    }

    /**
     * Apply theme to the document
     */
    function applyTheme(theme) {
        const root = document.documentElement;
        const colors = themeColors[theme];

        // Apply theme class
        if (theme === THEMES.LIGHT) {
            root.classList.add('light-mode');
            root.classList.remove('dark-mode');
        } else {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
        }

        // Apply CSS variables
        root.style.setProperty('--bg-color', colors.bg);
        root.style.setProperty('--card-bg-color', colors.cardBg);
        root.style.setProperty('--text-color', colors.text);
        root.style.setProperty('--text-secondary-color', colors.textSecondary);
        root.style.setProperty('--border-color', colors.border);
        root.style.setProperty('--navbar-bg-color', colors.navbarBg);
        root.style.setProperty('--footer-bg-color', colors.footerBg);

        // Update body background
        document.body.style.backgroundColor = colors.bg;
        document.body.style.color = colors.text;

        // Save to localStorage
        localStorage.setItem(THEME_KEY, theme);

        // Update toggle button icon
        updateToggleButton(theme);

        console.log(`Theme applied: ${theme}`);
    }

    /**
     * Toggle between themes
     */
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        applyTheme(newTheme);
    }

    /**
     * Update toggle button icon
     */
    function updateToggleButton(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('i');
        if (!icon) return;

        if (theme === THEMES.LIGHT) {
            icon.className = 'fas fa-moon';
            toggleBtn.setAttribute('aria-label', 'Karanlık Moda Geç');
            toggleBtn.setAttribute('title', 'Karanlık Mod');
        } else {
            icon.className = 'fas fa-sun';
            toggleBtn.setAttribute('aria-label', 'Aydınlık Moda Geç');
            toggleBtn.setAttribute('title', 'Aydınlık Mod');
        }
    }

    /**
     * Create and inject theme toggle button
     */
    function createToggleButton() {
        const currentTheme = getCurrentTheme();
        const icon = currentTheme === THEMES.LIGHT ? 'fa-moon' : 'fa-sun';
        const label = currentTheme === THEMES.LIGHT ? 'Karanlık Moda Geç' : 'Aydınlık Moda Geç';

        const buttonHTML = `
            <button id="theme-toggle"
                    aria-label="${label}"
                    title="${currentTheme === THEMES.LIGHT ? 'Karanlık Mod' : 'Aydınlık Mod'}"
                    style="
                        position: fixed;
                        bottom: 170px;
                        right: 30px;
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #2c3335 0%, #1a1a1a 100%);
                        color: #d4af37;
                        border: 2px solid #d4af37;
                        border-radius: 50%;
                        cursor: pointer;
                        z-index: 9997;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
                        transition: all 0.3s ease;
                    ">
                <i class="fas ${icon}"></i>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', buttonHTML);

        // Add event listener
        const toggleBtn = document.getElementById('theme-toggle');
        toggleBtn.addEventListener('click', toggleTheme);

        // Hover effects
        toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.transform = 'scale(1.1) rotate(15deg)';
            toggleBtn.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.6)';
        });

        toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.transform = 'scale(1) rotate(0deg)';
            toggleBtn.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.4)';
        });
    }

    /**
     * Initialize theme system
     */
    function initTheme() {
        // Apply saved or default theme immediately
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);

        // Create toggle button
        createToggleButton();

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    const newTheme = e.matches ? THEMES.LIGHT : THEMES.DARK;
                    applyTheme(newTheme);
                }
            });
        }

        console.log('Theme Switcher initialized');
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Export for manual control
    window.toggleTheme = toggleTheme;
    window.getCurrentTheme = getCurrentTheme;
    window.applyTheme = applyTheme;

})();
