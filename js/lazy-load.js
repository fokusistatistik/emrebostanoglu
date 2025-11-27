/**
 * Universal Lazy Loading System
 * Handles both <img> tags and background images
 * Uses IntersectionObserver for optimal performance
 */

(function() {
    'use strict';

    // Check if browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, loading all images immediately');
        loadAllImages();
        return;
    }

    // Configuration
    const config = {
        rootMargin: '50px 0px', // Start loading 50px before element enters viewport
        threshold: 0.01
    };

    // Intersection Observer for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Handle <img> tags
                if (element.tagName === 'IMG') {
                    loadImage(element);
                }
                // Handle background images
                else if (element.dataset.bgUrl) {
                    loadBackgroundImage(element);
                }

                // Stop observing this element
                observer.unobserve(element);
            }
        });
    }, config);

    /**
     * Load img element
     */
    function loadImage(img) {
        const src = img.dataset.src || img.getAttribute('data-src');
        const srcset = img.dataset.srcset || img.getAttribute('data-srcset');

        if (!src && !srcset) return;

        // Create temporary image to preload
        const tempImg = new Image();

        tempImg.onload = () => {
            if (src) img.src = src;
            if (srcset) img.srcset = srcset;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        };

        tempImg.onerror = () => {
            console.error('Failed to load image:', src);
            img.classList.add('load-error');
        };

        // Start loading
        tempImg.src = src || srcset.split(',')[0].trim().split(' ')[0];
    }

    /**
     * Load background image
     */
    function loadBackgroundImage(element) {
        const bgUrl = element.dataset.bgUrl;
        if (!bgUrl) return;

        // Create temporary image to preload
        const tempImg = new Image();

        tempImg.onload = () => {
            element.style.backgroundImage = `url('${bgUrl}')`;
            element.classList.add('bg-loaded');
            element.removeAttribute('data-bg-url');
        };

        tempImg.onerror = () => {
            console.error('Failed to load background image:', bgUrl);
            element.classList.add('bg-load-error');
        };

        // Start loading
        tempImg.src = bgUrl;
    }

    /**
     * Fallback: Load all images immediately
     */
    function loadAllImages() {
        // Load all img elements
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });

        // Load all background images
        document.querySelectorAll('[data-bg-url]').forEach(element => {
            const bgUrl = element.dataset.bgUrl;
            if (bgUrl) {
                element.style.backgroundImage = `url('${bgUrl}')`;
                element.removeAttribute('data-bg-url');
            }
        });
    }

    /**
     * Initialize lazy loading
     */
    function initLazyLoad() {
        // Observe all images with data-src
        document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
            imageObserver.observe(img);
        });

        // Observe all elements with data-bg-url
        document.querySelectorAll('[data-bg-url]').forEach(element => {
            imageObserver.observe(element);
        });

        console.log('Lazy loading initialized');
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoad);
    } else {
        initLazyLoad();
    }

    // Re-initialize on dynamic content changes (useful for SPAs)
    window.reinitLazyLoad = initLazyLoad;

    // Export for manual control
    window.lazyLoad = {
        init: initLazyLoad,
        loadImage: loadImage,
        loadBackgroundImage: loadBackgroundImage,
        observer: imageObserver
    };

})();
