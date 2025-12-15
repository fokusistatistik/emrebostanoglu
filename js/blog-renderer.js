/**
 * Blog Renderer Module
 * Dynamic blog post rendering with XSS protection
 */

class BlogRenderer {
    /**
     * Escape HTML to prevent XSS attacks
     */
    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Render blog card for listing page
     */
    static renderBlogCard(post) {
        if (!post || !post.url) {
            console.error('Invalid post data:', post);
            return '';
        }

        const safeTitle = this.escapeHtml(post.title || 'Untitled');
        const safeDescription = this.escapeHtml(post.description || '');
        const safeUrl = this.escapeHtml(post.url);
        const safeImage = this.escapeHtml(post.image || '');

        const tagsHTML = (post.tags || []).map(tag =>
            `<span class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">${this.escapeHtml(tag)}</span>`
        ).join('');

        const podcastBadge = (post.podcast && post.podcast.available) ?
            `<div class="absolute top-4 right-4 bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                <i class="fas fa-podcast mr-1"></i> Podcast
            </div>` : '';

        return `
            <a href="${safeUrl}" class="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-[#1a1a1a] to-[#2c3335] rounded-xl overflow-hidden border border-gray-800 hover:border-art-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-art-gold/10 group">
                <div class="md:w-80 h-56 md:h-auto relative flex-shrink-0 overflow-hidden">
                    <img src="${safeImage}"
                         alt="${safeTitle}"
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22240%22%3E%3Crect fill=%22%23333%22 width=%22320%22 height=%22240%22/%3E%3C/svg%3E'">
                    <div class="absolute top-4 left-4 bg-art-gold/90 text-black px-3 py-1 rounded-full text-xs font-bold">
                        <i class="fas fa-file-alt mr-1"></i> Blog
                    </div>
                    ${podcastBadge}
                </div>
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span><i class="fas fa-calendar mr-1"></i> ${this.escapeHtml(post.date || '')}</span>
                            <span><i class="fas fa-clock mr-1"></i> ${this.escapeHtml(post.readTime || '')}</span>
                        </div>
                        <h3 class="text-2xl font-cinzel text-white mb-3 group-hover:text-art-gold transition-colors">${safeTitle}</h3>
                        <p class="text-gray-400 leading-relaxed mb-4">${safeDescription}</p>
                        <div class="flex flex-wrap gap-2">
                            ${tagsHTML}
                        </div>
                    </div>
                    <div class="mt-4 flex items-center text-art-gold text-sm font-semibold">
                        Devamını Oku <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </div>
            </a>
        `;
    }

    /**
     * Render all blog posts to container with error handling
     */
    static renderBlogList(containerId = 'blog-list') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Blog container #${containerId} not found`);
            return;
        }

        try {
            if (typeof BLOG_DATA === 'undefined') {
                throw new Error('BLOG_DATA is not loaded');
            }

            const posts = BLOG_DATA.getPublishedPosts();

            if (posts.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-16">
                        <i class="fas fa-inbox text-6xl text-gray-600 mb-4"></i>
                        <p class="text-gray-400 text-lg">Henüz blog yazısı yok.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = posts.map(post => this.renderBlogCard(post)).join('');
        } catch (error) {
            console.error('Blog render error:', error);
            container.innerHTML = `
                <div class="text-center py-16">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
                    <p class="text-gray-400 text-lg">Blog yazıları yüklenirken bir hata oluştu.</p>
                </div>
            `;
        }
    }

    /**
     * Initialize blog list on page load
     */
    static init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.renderBlogList();
            });
        } else {
            this.renderBlogList();
        }
    }
}

// Auto-initialize if blog-list container exists
if (document.getElementById('blog-list')) {
    BlogRenderer.init();
}
