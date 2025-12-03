/**
 * Layout Manager
 * Coordinates header, footer, and page layout initialization
 */

class LayoutManager {
    /**
     * Initialize all layout components
     */
    static init() {
        // Initialize header
        if (typeof HeaderManager !== 'undefined') {
            HeaderManager.init();
        }

        // Initialize footer
        if (typeof FooterManager !== 'undefined') {
            FooterManager.init();
        }

        // Initialize i18n if available
        if (typeof I18N !== 'undefined') {
            I18N.init();
        }

        console.log('✓ Layout initialized');
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
