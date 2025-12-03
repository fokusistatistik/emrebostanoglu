/**
 * Layout Manager
 * Coordinates header, footer, and page layout initialization
 */

class LayoutManager {
    /**
     * Initialize all layout components with dependency checks
     */
    static init() {
        try {
            // Check dependencies
            if (typeof SITE_CONFIG === 'undefined') {
                console.warn('⚠ SITE_CONFIG not loaded, layout components may not work correctly');
            }

            // Initialize header
            if (typeof HeaderManager !== 'undefined') {
                HeaderManager.init();
            } else {
                console.warn('⚠ HeaderManager not loaded');
            }

            // Initialize footer
            if (typeof FooterManager !== 'undefined') {
                FooterManager.init();
            } else {
                console.warn('⚠ FooterManager not loaded');
            }

            // Initialize i18n if available
            if (typeof I18N !== 'undefined') {
                I18N.init();
            }
        } catch (error) {
            console.error('❌ Layout initialization error:', error);
        }
    }

    /**
     * Refresh layout components
     */
    static refresh() {
        HeaderManager.init();
        FooterManager.init();
        if (typeof I18N !== 'undefined') {
            I18N.applyTranslations();
        }
    }
}

// Global function for backward compatibility
function loadComponents(activePage) {
    LayoutManager.init();
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LayoutManager.init());
} else {
    LayoutManager.init();
}
