/**
 * Blog Data Module
 * Centralized blog post management
 */

const BLOG_DATA = {
    posts: [
        {
            id: 'blog01',
            title: 'Kompozisyonun Gücü: Fotoğrafta Altın Oran ve Üçte Bir Kuralı',
            description: 'Fotoğraf sanatında kompozisyon, bir görüntüyü sıradan veya olağanüstü yapan temel unsurdur. Altın oran ve üçte bir kuralının pratikte nasıl kullanılacağını, 300+ ödüllü fotoğraf deneyimimle paylaşıyorum.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto1.jpg',
            date: '15 Ocak 2025',
            readTime: '8 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Teknik'],
            url: '/blog01.html',
            published: true
        },
        {
            id: 'blog02',
            title: 'Makine Öğrenmesi ile Sağlık Verilerinde Tahminleme: SAHA Projesi Deneyimleri',
            description: 'Acil sağlık hizmetlerinde 9 modüllük SAHA projesi ile yıllık milyonlarca veriyi nasıl analiz edip karar destek sistemleri geliştirdiğimizi anlatıyorum. Python, Power BI ve makine öğrenmesi teknikleri.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto2.jpg',
            date: '10 Ocak 2025',
            readTime: '12 dk okuma',
            tags: ['Veri Bilimi', 'Machine Learning', 'Sağlık', 'Python'],
            url: '/blog02.html',
            published: true
        },
        {
            id: 'blog03',
            title: 'Afet Yönetiminde Yapay Zeka: KİM-QR & ATOM Sisteminin Teknik Altyapısı',
            description: 'Dünyada bir ilk olan KİM-QR ve ATOM afet sağlık koordinasyon sisteminin teknik mimarisini, QR tabanlı kimliklendirme ve yapay zeka destekli karar mekanizmalarını detaylıca inceliyoruz. İlk saha testi: %96 başarı!',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto3.jpg',
            date: '5 Ocak 2025',
            readTime: '15 dk okuma',
            tags: ['Veri Bilimi', 'Yapay Zeka', 'Afet Yönetimi', 'QR Teknoloji'],
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
