/**
 * i18n (Internationalization) System
 * Multi-language support for Emre Bostanoğlu Website
 * Supports: Turkish (tr), English (en)
 */

const I18N = {
    // Current language
    currentLang: 'tr',

    // Available languages
    languages: {
        tr: 'Türkçe',
        en: 'English'
    },

    // Translation data
    translations: {},

    /**
     * Initialize i18n system
     */
    async init() {
        // Get saved language preference or detect browser language
        this.currentLang = this.getSavedLanguage() || this.detectBrowserLanguage();

        // Load translation files
        await this.loadTranslations();

        // Apply translations to the page
        this.translatePage();

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        console.log(`i18n initialized: ${this.currentLang}`);
    },

    /**
     * Get saved language from localStorage
     */
    getSavedLanguage() {
        return localStorage.getItem('preferredLanguage');
    },

    /**
     * Detect browser language
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // Get 'tr' from 'tr-TR'

        // Return Turkish or English based on browser language
        return this.languages[langCode] ? langCode : 'tr';
    },

    /**
     * Load translation files
     */
    async loadTranslations() {
        try {
            // Load both language files
            const [trResponse, enResponse] = await Promise.all([
                fetch('/translations/tr.json'),
                fetch('/translations/en.json')
            ]);

            this.translations.tr = await trResponse.json();
            this.translations.en = await enResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to inline translations if files not found
            this.loadFallbackTranslations();
        }
    },

    /**
     * Fallback translations (embedded in JS)
     */
    loadFallbackTranslations() {
        this.translations.tr = {
            nav: {
                home: 'Ana Sayfa',
                about: 'Hakkımda',
                datascience: 'Veri Bilimi',
                photography: 'Fotoğraf',
                writer: 'Yazar',
                director: 'Yönetmen',
                contact: 'İletişim'
            }
        };

        this.translations.en = {
            nav: {
                home: 'Home',
                about: 'About',
                datascience: 'Data Science',
                photography: 'Photography',
                writer: 'Writer',
                director: 'Director',
                contact: 'Contact'
            }
        };
    },

    /**
     * Get translation for a key
     * @param {string} key - Translation key in dot notation (e.g., 'nav.home')
     * @param {object} params - Parameters for string interpolation
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];

        // Navigate through nested object
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation not found: ${key} (${this.currentLang})`);
                return key;
            }
        }

        // Replace parameters in translation string
        if (typeof translation === 'string' && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                translation = translation.replace(`{${param}}`, params[param]);
            });
        }

        return translation;
    },

    /**
     * Change language
     * @param {string} lang - Language code ('tr' or 'en')
     */
    async changeLanguage(lang) {
        if (!this.languages[lang]) {
            console.error(`Language not supported: ${lang}`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;

        // Reload translations and update page
        await this.loadTranslations();
        this.translatePage();

        // Trigger custom event for components to update
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

        console.log(`Language changed to: ${lang}`);
    },

    /**
     * Translate all elements on the page with data-i18n attribute
     */
    translatePage() {
        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Translate elements with data-i18n-html attribute (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.t(key);
        });

        // Translate title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // Translate placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Update page title
        const titleKey = document.querySelector('meta[name="i18n-title"]');
        if (titleKey) {
            document.title = this.t(titleKey.getAttribute('content'));
        }
    },

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLang;
    },

    /**
     * Get language name
     */
    getLanguageName(lang) {
        return this.languages[lang] || lang;
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18N.init());
} else {
    I18N.init();
}
