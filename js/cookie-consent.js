/**
 * KVKK Cookie Consent Banner
 * Displays a stylish, GDPR/KVKK-compliant cookie consent banner
 */

const CookieConsent = {
    // Storage key for consent preference
    STORAGE_KEY: 'cookie-consent',

    /**
     * Initialize cookie consent system
     */
    init() {
        // Check if user has already given consent
        const consent = this.getConsent();

        if (consent === null) {
            // No consent recorded, show banner
            this.showBanner();
        }
    },

    /**
     * Get stored consent value
     * @returns {boolean|null} true if accepted, false if rejected, null if not set
     */
    getConsent() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored === 'accepted') return true;
        if (stored === 'rejected') return false;
        return null;
    },

    /**
     * Save consent preference
     * @param {boolean} accepted - Whether user accepted cookies
     */
    saveConsent(accepted) {
        localStorage.setItem(this.STORAGE_KEY, accepted ? 'accepted' : 'rejected');

        // Trigger custom event for analytics or other systems
        window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
            detail: { accepted }
        }));
    },

    /**
     * Show cookie consent banner
     */
    showBanner() {
        // Wait for i18n to be ready
        const checkI18N = setInterval(() => {
            if (typeof I18N !== 'undefined' && I18N.translations.tr) {
                clearInterval(checkI18N);
                this.createBanner();
            }
        }, 100);
    },

    /**
     * Create and inject banner HTML
     */
    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie Consent');

        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <span class="cookie-consent-icon">🍪</span>
                    <p class="cookie-consent-description" data-i18n="cookie.description"></p>
                </div>
                <div class="cookie-consent-actions">
                    <button class="cookie-consent-btn cookie-consent-btn-accept" id="cookie-accept" data-i18n="cookie.accept"></button>
                    <button class="cookie-consent-btn cookie-consent-btn-reject" id="cookie-reject" data-i18n="cookie.reject"></button>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(banner);

        // Translate content
        if (typeof I18N !== 'undefined') {
            I18N.translatePage();
        }

        // Attach event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            this.acceptCookies();
        });

        document.getElementById('cookie-reject').addEventListener('click', () => {
            this.rejectCookies();
        });

        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('cookie-consent-visible');
        }, 500);
    },

    /**
     * Handle cookie acceptance
     */
    acceptCookies() {
        this.saveConsent(true);
        this.hideBanner();
        console.log('Cookies accepted');
    },

    /**
     * Handle cookie rejection
     */
    rejectCookies() {
        this.saveConsent(false);
        this.hideBanner();
        console.log('Cookies rejected');
    },

    /**
     * Hide and remove banner
     */
    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('cookie-consent-visible');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }
};

// CSS Styles
const cookieConsentStyles = document.createElement('style');
cookieConsentStyles.textContent = `
    .cookie-consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background: linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(20, 20, 20, 0.98) 100%);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cookie-consent-visible {
        transform: translateY(0);
    }

    .cookie-consent-content {
        max-width: 1000px;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .cookie-consent-text {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .cookie-consent-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .cookie-consent-description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0;
    }

    .cookie-consent-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .cookie-consent-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
    }

    .cookie-consent-btn-accept {
        background: linear-gradient(135deg, #d4af37 0%, #f0c84b 100%);
        color: #000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }

    .cookie-consent-btn-accept:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    }

    .cookie-consent-btn-reject {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .cookie-consent-btn-reject:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .cookie-consent-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
        }

        .cookie-consent-text {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }

        .cookie-consent-actions {
            width: 100%;
            justify-content: center;
        }

        .cookie-consent-btn {
            flex: 1;
            min-width: 100px;
            padding: 0.65rem 1.25rem;
            font-size: 0.8rem;
        }

        .cookie-consent-description {
            font-size: 0.8rem;
        }
    }
`;

// Inject styles
document.head.appendChild(cookieConsentStyles);

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
} else {
    CookieConsent.init();
}
