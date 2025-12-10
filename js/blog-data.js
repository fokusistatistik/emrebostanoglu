/**
 * Blog Data Module
 * Centralized blog post management
 */

const BLOG_DATA = {
    posts: [
        {
            id: 'blog09',
            title: 'Veri Bilimi: Yöneticilerin Görmezden Geldiği Stratejik Varlık',
            description: 'Kamu, özel sektör ve akademide veri bilimine yeterli önem verilmiyor. Değişken seçimi, veri yapıları, ölçeklenebilirlik sorunları ve yatırımların sadece donanım/yazılım odaklı olması kritik hataları ortaya çıkarıyor.',
            image: 'https://static.fokusistatistik.com/resimler/veribilimi09.jpg',
            date: '9 Aralık 2025',
            readTime: '18 dk okuma',
            tags: ['Veri Bilimi', 'Veri Yönetişimi', 'Dijital Dönüşüm', 'Kurumsal Strateji', 'Veri Mimarisi', 'Yönetim'],
            url: '/blog09.html',
            published: true
        },
        {
            id: 'blog01',
            title: 'Kompozisyonun Gücü: Fotoğrafta Altın Oran ve Üçte Bir Kuralı',
            description: 'Fotoğraf sanatında kompozisyon, bir görüntüyü sıradan veya olağanüstü yapan temel unsurdur. Altın oran ve üçte bir kuralının pratikte nasıl kullanılacağını, 300+ ödüllü fotoğraf deneyimimle paylaşıyorum.',
            image: 'https://static.fokusistatistik.com/resimler/blog_photo.png',
            date: '15 Ocak 2025',
            readTime: '8 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Teknik'],
            url: '/blog01.html',
            published: true
        },
        {
            id: 'blog02',
            title: 'Veri Bilimi ve Modern Araçlar: Power BI, n8n ve Python ile İş Süreçlerini Optimize Etmek',
            description: 'Modern veri bilimi araçlarının entegre kullanımı ile iş süreçlerinde verimlilik kazanmak. Power BI, n8n, Python gibi araçların birlikte kullanılması ve faydalı iş modelleri oluşturma prensipleri.',
            image: 'https://static.fokusistatistik.com/resimler/blog_photo.png',
            date: '10 Ocak 2025',
            readTime: '10 dk okuma',
            tags: ['Veri Bilimi', 'Power BI', 'Otomasyon', 'Python', 'n8n'],
            url: '/blog02.html',
            published: true
        },
        {
            id: 'blog03',
            title: 'Dünyada Bir İlk! KİM-QR & ATOM Sistemi İlk Testini Başarıyla Geçti',
            description: 'Modern istatistik ve yapay zeka tabanlı afet sağlık koordinasyonu sistemimiz KİM-QR & ATOM, kısa sürede geliştirilerek ilk saha testinde %96 üzerinde başarı oranı sağladı. Test süreci olarak devam ediyor.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/kim/kapak.jpg',
            date: '5 Ocak 2025',
            readTime: '15 dk okuma',
            tags: ['Afet Yönetimi', 'Yapay Zeka', 'KİM-QR', 'ATOM', 'Test Süreci'],
            url: '/blog03.html',
            published: true
        },
        {
            id: 'blog04',
            title: '"Dua" isimli Fotoğrafımın Yapısal İncelemesi ve Çekim Süreci',
            description: '2013 Ulusal Sille Çağrılı Fotoğraf Yarışması\'nda büyük ödül alan "Dua" fotoğrafımın tüm çekim sürecini, kompozisyon analizi ve teknik detaylarıyla anlatıyorum. Sille Mormi Camii\'nde çekilen bu fotoğrafın arka planındaki planlama ve uygulama süreci.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/dua/dua10.jpg',
            date: '28 Ağustos 2015',
            readTime: '6 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Çekim Süreci', 'Yarışma', 'Grafik Analizi'],
            url: '/blog04.html',
            published: true
        },
        {
            id: 'blog05',
            title: '"2 Teker" isimli Fotoğrafımın Çekim Süreci ve Yapısal İncelemesi',
            description: 'Atakum Fotomaratonu için Samsun sahillerinde çektiğim "2 Teker" fotoğrafının 18 dakikalık çekim sürecini, kritik anı yakalama tekniklerini ve geometrik kompozisyon analizini detaylıca anlatıyorum.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/2teker/2teker6.jpg',
            date: '15 Ağustos 2017',
            readTime: '5 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Çekim Süreci', 'Fotomaraton', 'Kritik An'],
            url: '/blog05.html',
            published: true
        },
        {
            id: 'blog06',
            title: '"Bayramda Çevre Yolu" İsimli Fotoğrafımın Yapısal İncelemesi ve Çekim Süreci',
            description: '2014 Kurban bayramında Samsun-Çankırı yolculuğu sırasında gün batımında çektiğim çevre yolu fotoğrafının 15 dakikalık çekim sürecini, grafik analizi ve ışık kullanımını detaylıca anlatıyorum.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/yol/yol6.jpg',
            date: '9 Nisan 2015',
            readTime: '4 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Çekim Süreci', 'Yol', 'Işık'],
            url: '/blog06.html',
            published: true
        },
        {
            id: 'blog07',
            title: '"Otopark" İsimli Fotoğrafımın Çekim Süreci ve Yapısal İncelemesi',
            description: 'Tuzla Marina otoparkında sarı-siyah çizgilerin oluşturduğu geometrik desenleri, altın oran noktalarını kullanarak 1 saatlik sabırlı bekleyişle fotoğrafa dönüştürme sürecimi anlatıyorum.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/otopark/otopark7.jpg',
            date: '11 Ocak 2016',
            readTime: '5 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Çekim Süreci', 'Geometri', 'Altın Oran'],
            url: '/blog07.html',
            published: true
        },
        {
            id: 'blog08',
            title: '"Sevgi" isimli Fotoğrafımın Yapısal İncelemesi ve Çekim Süreci',
            description: 'Atakum\'da Yaşam fotomaratonu için 1 haftalık gözlem, kurgu ve planlama ile çektiğim "Sevgi" fotoğrafının altın oran ve siluet tekniğiyle çekim sürecini anlatıyorum.',
            image: 'https://static.fokusistatistik.com/resimler/emrebostanogluweb/sevgi/sevgi6.jpg',
            date: '17 Mart 2015',
            readTime: '6 dk okuma',
            tags: ['Fotoğraf', 'Kompozisyon', 'Çekim Süreci', 'Fotomaraton', 'Siluet'],
            url: '/blog08.html',
            published: true
        }
    ],

    /**
     * Get all published posts sorted by date (newest first)
     */
    getPublishedPosts() {
        const parseTurkishDate = (dateStr) => {
            const months = {
                'Ocak': 0, 'Şubat': 1, 'Mart': 2, 'Nisan': 3, 'Mayıs': 4, 'Haziran': 5,
                'Temmuz': 6, 'Ağustos': 7, 'Eylül': 8, 'Ekim': 9, 'Kasım': 10, 'Aralık': 11
            };
            const parts = dateStr.split(' ');
            const day = parseInt(parts[0]);
            const month = months[parts[1]];
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
        };

        return this.posts
            .filter(post => post.published)
            .sort((a, b) => parseTurkishDate(b.date) - parseTurkishDate(a.date));
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
