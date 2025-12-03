/**
 * Blog Renderer Module
 * Dynamic blog post rendering
 */

class BlogRenderer {
    /**
     * Render blog card for listing page
     */
    static renderBlogCard(post) {
        const tagsHTML = post.tags.map(tag =>
            `<span class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">${tag}</span>`
        ).join('');

        return `
            <a href="${post.url}" class="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-[#1a1a1a] to-[#2c3335] rounded-xl overflow-hidden border border-gray-800 hover:border-art-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-art-gold/10 group">
                <div class="md:w-80 h-56 md:h-auto relative flex-shrink-0 overflow-hidden">
                    <img src="${post.image}"
                         alt="${post.title}"
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         loading="lazy">
                    <div class="absolute top-4 left-4 bg-art-gold/90 text-black px-3 py-1 rounded-full text-xs font-bold">
                        <i class="fas fa-file-alt mr-1"></i> Blog
                    </div>
                </div>
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span><i class="fas fa-calendar mr-1"></i> ${post.date}</span>
                            <span><i class="fas fa-clock mr-1"></i> ${post.readTime}</span>
                        </div>
                        <h3 class="text-2xl font-cinzel text-white mb-3 group-hover:text-art-gold transition-colors">${post.title}</h3>
                        <p class="text-gray-400 leading-relaxed mb-4">${post.description}</p>
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
     * Render all blog posts to container
     */
    static renderBlogList(containerId = 'blog-list') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Blog container #${containerId} not found`);
            return;
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
