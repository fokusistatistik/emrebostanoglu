/**
 * Content Management System
 * Manages blog, articles, news, and media content
 */

const ContentManager = {
    // Data
    data: {
        articles: [],
        categories: {},
        featured: []
    },

    // State
    state: {
        currentCategory: 'all',
        currentLang: 'tr'
    },

    /**
     * Initialize content manager
     */
    async init() {
        await this.loadContent();
        this.state.currentLang = typeof I18N !== 'undefined' ? I18N.getCurrentLanguage() : 'tr';

        // Listen for language changes
        window.addEventListener('languageChanged', (e) => {
            this.state.currentLang = e.detail.lang;
            this.renderContent();
        });

        console.log('Content Manager initialized');
    },

    /**
     * Load content from JSON
     */
    async loadContent() {
        try {
            const response = await fetch('/content/articles.json');
            const data = await response.json();

            this.data.articles = data.articles;
            this.data.categories = data.categories;
            this.data.featured = data.featured;
        } catch (error) {
            console.error('Error loading content:', error);
        }
    },

    /**
     * Get localized text
     */
    t(obj) {
        return obj[this.state.currentLang] || obj['tr'];
    },

    /**
     * Get articles by category
     */
    getArticlesByCategory(category = 'all') {
        if (category === 'all') {
            return this.data.articles;
        }
        return this.data.articles.filter(article => article.category === category);
    },

    /**
     * Get featured articles
     */
    getFeaturedArticles() {
        return this.data.articles.filter(article =>
            this.data.featured.includes(article.id)
        );
    },

    /**
     * Get article by ID
     */
    getArticleById(id) {
        return this.data.articles.find(article => article.id === parseInt(id));
    },

    /**
     * Format date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const lang = this.state.currentLang;

        return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Get article type icon
     */
    getTypeIcon(type) {
        const icons = {
            'article': 'fas fa-file-alt',
            'video': 'fas fa-video',
            'news': 'fas fa-newspaper',
            'audio': 'fas fa-podcast'
        };
        return icons[type] || icons['article'];
    },

    /**
     * Render article card
     */
    renderArticleCard(article, featured = false) {
        const lang = this.state.currentLang;
        const category = this.data.categories[article.category];
        const typeIcon = this.getTypeIcon(article.type);

        const cardClass = featured
            ? 'article-card article-card-featured'
            : 'article-card';

        return `
            <div class="${cardClass}" data-id="${article.id}" data-category="${article.category}">
                <div class="article-image-container">
                    ${article.type === 'video' ? `
                        <div class="video-overlay">
                            <i class="fas fa-play-circle"></i>
                        </div>
                    ` : ''}
                    <img
                        src="${article.image || article.thumbnail}"
                        alt="${this.t(article.title)}"
                        class="article-image"
                        loading="lazy"
                    />
                    <div class="article-type-badge">
                        <i class="${typeIcon}"></i>
                    </div>
                </div>

                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-category" style="color: ${category.color}">
                            ${this.t(category)}
                        </span>
                        <span class="article-date">
                            ${this.formatDate(article.date)}
                        </span>
                    </div>

                    <h3 class="article-title">${this.t(article.title)}</h3>
                    <p class="article-excerpt">${this.t(article.excerpt)}</p>

                    <div class="article-footer">
                        <div class="article-author">
                            <i class="fas fa-user-circle"></i>
                            <span>${article.author}</span>
                        </div>
                        ${article.readTime ? `
                            <div class="article-read-time">
                                <i class="fas fa-clock"></i>
                                <span>${article.readTime}</span>
                            </div>
                        ` : ''}
                        ${article.duration ? `
                            <div class="article-duration">
                                <i class="fas fa-clock"></i>
                                <span>${article.duration}</span>
                            </div>
                        ` : ''}
                    </div>

                    ${article.tags && article.tags.length > 0 ? `
                        <div class="article-tags">
                            ${article.tags.slice(0, 3).map(tag => `
                                <span class="article-tag">#${tag}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    /**
     * Render content grid
     */
    renderContent(containerId = 'content-grid', category = 'all') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const articles = this.getArticlesByCategory(category);

        if (articles.length === 0) {
            container.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-inbox text-6xl text-gray-600 mb-4"></i>
                    <p class="text-gray-400">İçerik bulunamadı</p>
                </div>
            `;
            return;
        }

        container.innerHTML = articles.map(article =>
            this.renderArticleCard(article)
        ).join('');
    },

    /**
     * Render featured content
     */
    renderFeatured(containerId = 'featured-content') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const featured = this.getFeaturedArticles();

        container.innerHTML = featured.map(article =>
            this.renderArticleCard(article, true)
        ).join('');
    },

    /**
     * Render category filter
     */
    renderCategoryFilter(containerId = 'category-filter') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const allText = this.state.currentLang === 'tr' ? 'Tümü' : 'All';

        const categoriesHTML = `
            <button class="category-btn active" data-category="all">
                ${allText}
            </button>
            ${Object.keys(this.data.categories).map(key => {
                const category = this.data.categories[key];
                return `
                    <button class="category-btn" data-category="${key}" style="--category-color: ${category.color}">
                        ${this.t(category)}
                    </button>
                `;
            }).join('')}
        `;

        container.innerHTML = categoriesHTML;

        // Attach event listeners
        container.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterByCategory(category);

                // Update active state
                container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    },

    /**
     * Filter by category
     */
    filterByCategory(category) {
        this.state.currentCategory = category;
        this.renderContent('content-grid', category);
    },

    /**
     * Initialize blog page
     */
    initBlogPage() {
        this.renderCategoryFilter();
        this.renderContent();
    },

    /**
     * Initialize homepage announcements
     */
    initHomepageAnnouncements() {
        this.renderFeatured();
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ContentManager.init());
} else {
    ContentManager.init();
}
