# System Architecture Documentation

## 📐 Modüler Sistem Mimarisi

Bu proje, bakım ve geliştirme kolaylığı için modüler bir mimari kullanır.

## 🏗️ Sistem Bileşenleri

### 1. **Konfigürasyon Katmanı**
```
js/components.js
└── SITE_CONFIG
    ├── logoUrl
    ├── colors
    └── social (sosyal medya linkleri)
```

**Amaç:** Tüm site konfigürasyonu tek bir yerden yönetilir.

### 2. **Layout Modülleri**
```
js/header.js       → Navbar (navigation bar)
js/footer.js       → Footer (sayfa altı)
js/layout.js       → Layout koordinasyonu
```

**Özellikler:**
- Bağımsız çalışabilme
- Auto-initialization
- Error handling
- Backward compatibility

### 3. **Blog Sistemi**
```
js/blog-data.js       → Blog verisi (JSON-like data)
js/blog-renderer.js   → Dinamik render motoru
```

**Özellikler:**
- Dinamik blog ekleme/çıkarma
- XSS koruması
- Image fallback
- Error handling

### 4. **Diğer Modüller**
```
js/i18n.js            → Çeviri sistemi
js/chatbot.js         → Chatbot
js/cookie-consent.js  → Cookie yönetimi
js/exit-intent.js     → Exit intent popup
```

## 🔄 Veri Akışı

```
SITE_CONFIG (components.js)
    ↓
┌───────────────────┬───────────────────┬───────────────────┐
│                   │                   │                   │
HeaderManager    FooterManager    BlogRenderer
(header.js)      (footer.js)      (blog-renderer.js)
    │                   │                   │
    └───────────────────┴───────────────────┘
                        ↓
                 LayoutManager
                  (layout.js)
                        ↓
                Tüm HTML Sayfalar
```

## 📦 Kullanım Örnekleri

### Blog Yazısı Eklemek

**1. Adım:** `js/blog-data.js` dosyasını aç

**2. Adım:** `posts` dizisine yeni blog ekle:
```javascript
{
    id: 'blog04',
    title: 'Yeni Blog Başlığı',
    description: 'Blog kısa açıklaması...',
    image: 'https://static.fokusistatistik.com/resimler/foto4.jpg',
    date: '2025',
    readTime: '5 dk okuma',
    tags: ['Blog', 'Kategori'],
    url: '/blog04.html',
    published: true
}
```

**3. Adım:** `blog04.html` dosyası oluştur (blog01.html'i kopyala)

**4. Adım:** Blog otomatik olarak `blog.html` listesinde görünür

### Navbar/Footer Değiştirmek

**Header değişikliği:**
```javascript
// js/header.js dosyasını düzenle
// Değişiklik tüm sayfalara otomatik yansır
```

**Footer değişikliği:**
```javascript
// js/footer.js dosyasını düzenle
// Değişiklik tüm sayfalara otomatik yansır
```

### Sosyal Medya Linki Eklemek

```javascript
// js/components.js → SITE_CONFIG.social
social: {
    email: 'emrebostanoglu@gmail.com',
    instagram: 'https://www.instagram.com/emre.bostanoglu/',
    // Yeni link ekle:
    tiktok: 'https://tiktok.com/@username'
}

// js/footer.js → getSocialLinksHTML() fonksiyonuna ekle:
{ url: social.tiktok, img: '/assets/img/tiktok.png', name: 'TikTok' }
```

## 🔒 Güvenlik

### XSS Koruması
```javascript
// blog-renderer.js
escapeHtml(text) // Tüm kullanıcı girdileri escape edilir
```

### External Link Güvenliği
```html
target="_blank" rel="noopener noreferrer"
```

### Image Fallback
```javascript
onerror="this.src='...'" // Resim yüklenemezse placeholder gösterilir
```

## ⚡ Performans

- **Lazy Loading:** Resimler lazy load edilir
- **Auto-initialization:** Modüller otomatik yüklenir
- **Minimal Dependencies:** Sadece gerekli modüller yüklenir
- **Code Splitting:** Her modül ayrı dosya

## 🧪 Hata Ayıklama

### Console Logs
Tarayıcı console'unda kontrol edilmesi gerekenler:
```javascript
✓ Layout initialized  // Layout başarıyla yüklendi
Blog container #blog-list not found  // Blog container bulunamadı
HeaderManager not loaded  // Header modülü yüklenemedi
```

### Yaygın Hatalar

1. **"SITE_CONFIG is not defined"**
   - `js/components.js` yüklendiğinden emin olun
   - Script yükleme sırasını kontrol edin

2. **"Blog container not found"**
   - HTML'de `<div id="blog-list">` olduğundan emin olun
   - Script'in body sonunda yüklendiğinden emin olun

3. **"Layout components may not work"**
   - `SITE_CONFIG` eksik
   - `js/components.js` önce yüklenmeliCheck script order

## 📁 Dosya Yapısı

```
/emrebostanoglu/
├── index.html
├── about.html
├── blog.html (blog listesi)
├── blog01.html, blog02.html, blog03.html (blog postları)
├── js/
│   ├── components.js      (SITE_CONFIG)
│   ├── header.js          (Navbar modülü)
│   ├── footer.js          (Footer modülü)
│   ├── layout.js          (Layout koordinasyon)
│   ├── blog-data.js       (Blog verisi)
│   ├── blog-renderer.js   (Blog render)
│   ├── i18n.js           (Çeviri)
│   └── [diğer modüller]
├── css/
│   └── style.css
└── assets/
    └── img/ (sosyal medya iconları)
```

## 🔄 Backward Compatibility

Eski sistem ile uyumluluk için:
```javascript
// Eski yöntem (hala çalışır):
function loadComponents(activePage) {
    LayoutManager.init();
}

// Yeni yöntem (otomatik):
// Sayfa yüklendiğinde otomatik çalışır
```

## 📝 Best Practices

1. **Modül Ekleme:**
   - Her modül kendi dosyasında olmalı
   - Auto-initialization kullanın
   - Error handling ekleyin

2. **Veri Yönetimi:**
   - Tüm data `*-data.js` dosyalarında
   - Render logic `*-renderer.js` dosyalarında
   - Configuration `components.js`'de

3. **HTML Yapısı:**
   - Container'lar için ID kullanın
   - Script'leri body sonunda yükleyin
   - Layout modüllerini önce yükleyin

## 🚀 Production Deployment

1. Script sırasını koruyun:
```html
<script src="js/i18n.js"></script>
<script src="js/components.js"></script>
<script src="js/header.js"></script>
<script src="js/footer.js"></script>
<script src="js/layout.js"></script>
```

2. Minification:
   - Production'da JS dosyalarını minify edin
   - CSS'i minify edin
   - Image'leri optimize edin

3. Caching:
   - Static asset'lere version number ekleyin
   - Cache headers ayarlayın

## 📊 Metrikler

- **Modül Sayısı:** 9 ana modül
- **Blog System:** Dinamik, JSON-based
- **Code Coverage:** Layout modülleri %100 modüler
- **Backward Compatibility:** %100
- **Security:** XSS korumalı, safe external links

## 👥 Geliştirici Notları

- Yeni özellik eklerken modüler yapıyı koruyun
- Her modül bağımsız test edilebilir olmalı
- Error handling'i ihmal etmeyin
- Documentation'ı güncel tutun

---

**Son Güncelleme:** 2025-12-03
**Versiyon:** 2.0 (Modüler Sistem)
**Geliştirici:** Emre Bostanoğlu
