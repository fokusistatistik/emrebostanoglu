/**
 * Blog Data Module
 * Centralized blog post management
 */

const BLOG_DATA = {
    posts: [
        {
            id: 'blog01',
            title: 'Blog Başlığı 1',
            description: 'Blog yazısı kısa açıklaması buraya gelecek. Bu alana blog özetinizi ekleyin...',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto1.jpg',
            date: '2025',
            readTime: '5 dk okuma',
            tags: ['Blog', 'Genel'],
            url: '/blog01.html',
            published: true
        },
        {
            id: 'blog02',
            title: 'Blog Başlığı 2',
            description: 'Blog yazısı kısa açıklaması buraya gelecek. Bu alana blog özetinizi ekleyin...',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto2.jpg',
            date: '2025',
            readTime: '5 dk okuma',
            tags: ['Blog', 'Genel'],
            url: '/blog02.html',
            published: true
        },
        {
            id: 'blog03',
            title: 'Blog Başlığı 3',
            description: 'Blog yazısı kısa açıklaması buraya gelecek. Bu alana blog özetinizi ekleyin...',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto3.jpg',
            date: '2025',
            readTime: '5 dk okuma',
            tags: ['Blog', 'Genel'],
            url: '/blog03.html',
            published: true
        }
    ],

    /**
     * Get all published posts
     */
    getPublishedPosts() {
        return this.posts.filter(post => post.published);
    },

    /**
     * Get post by ID
     */
    getPostById(id) {
        return this.posts.find(post => post.id === id);
    },

    /**
     * Get posts by tag
     */
    getPostsByTag(tag) {
        return this.posts.filter(post =>
            post.published && post.tags.includes(tag)
        );
    },

    /**
     * Get recent posts
     */
    getRecentPosts(limit = 3) {
        return this.getPublishedPosts().slice(0, limit);
    }
};
