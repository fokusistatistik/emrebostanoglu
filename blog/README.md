# 📝 Blog Sistemi Kullanım Kılavuzu

Bu klasör, **HTML tabanlı statik blog sistemi** içerir. Admin panel YOK - tüm bloglar HTML dosyaları olarak eklenir ve güncellenir.

---

## 📁 Dosya Yapısı

```
blog/
├── README.md                           # Bu dosya (kullanım kılavuzu)
├── index.html                          # Blog ana sayfası (tüm blogları listeler)
├── template.html                       # Yeni blog yazıları için şablon
└── 2025-01-yapay-zeka-ve-sanat.html   # Örnek blog yazısı
```

---

## 🚀 Hızlı Başlangıç: Yeni Blog Ekleme

### Adım 1: Template'i Kopyala

```bash
cp blog/template.html blog/2025-01-yeni-blog-basligi.html
```

**Dosya İsimlendirme Kuralı:**
- Format: `YYYY-MM-slug.html`
- Örnek: `2025-01-yapay-zeka-ve-sanat.html`
- Slug: Türkçe karakter YOK, tire ile ayrılmış

### Adım 2: İçeriği Doldur

`2025-01-yeni-blog-basligi.html` dosyasını açın ve **⚠️ işaretli** bölümleri değiştirin:

#### 2.1. Meta Bilgileri (Sayfa Başı)

```html
<!-- ⚠️ BLOG BAŞLIĞI - Değiştir -->
<title>Blog Başlığı Buraya | Emre Bostanoğlu</title>
<meta name="description" content="Blog yazısının kısa açıklaması buraya gelecek">
```

#### 2.2. Header Bilgileri

```html
<!-- ⚠️ KATEGORİ BADGE - Değiştir -->
<span class="inline-block bg-art-gold text-black px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
    Kategori
</span>

<!-- ⚠️ BAŞLIK - Değiştir -->
<h1 class="text-4xl md:text-6xl font-cinzel text-white font-bold mb-6">
    Blog Yazısı Başlığı Buraya Gelecek
</h1>

<!-- ⚠️ TARİH - Değiştir -->
<span class="blog-meta-item">
    <i class="far fa-calendar"></i>
    27 Ocak 2025
</span>

<!-- ⚠️ OKUMA SÜRESİ - Değiştir -->
<span class="blog-meta-item">
    <i class="far fa-clock"></i>
    8 dk okuma
</span>
```

#### 2.3. Kapak Görseli

```html
<!-- ⚠️ KAPAK GÖRSELİ - Değiştir -->
<img src="https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto1.jpg"
     alt="Blog Görseli"
     class="blog-hero-image">
```

#### 2.4. Blog İçeriği

⚠️⚠️⚠️ **İÇERİK BURADAN BAŞLIYOR** işaretinden sonraki HTML'i değiştirin:

```html
<h2>Giriş</h2>
<p>
    Buraya blog yazısının giriş paragrafı gelecek...
</p>

<h2>Ana Konu 1</h2>
<p>
    İlk ana konunun detaylı açıklaması...
</p>

<h3>Alt Başlık 1.1</h3>
<ul>
    <li>İlk önemli nokta</li>
    <li>İkinci önemli nokta</li>
</ul>

<h2>Sonuç</h2>
<p>
    Blog yazısının sonuç bölümü...
</p>
```

#### 2.5. Etiketler

```html
<!-- ⚠️ ETİKETLER - Değiştir -->
<div class="blog-tags">
    <span class="blog-tag">Etiket 1</span>
    <span class="blog-tag">Etiket 2</span>
    <span class="blog-tag">Etiket 3</span>
</div>
```

### Adım 3: Ana Sayfaya Ekle

`blog/index.html` dosyasını açın ve yeni blog kartını ekleyin:

```html
<!-- YENİ BLOG KARTI BURAYA -->
<a href="2025-01-yeni-blog-basligi.html" class="blog-card">
    <div class="blog-image-container">
        <img src="https://static.fokusistatistik.com/resimler/emrebostanogluweb/foto1.jpg"
             alt="Blog Başlığı"
             class="blog-image">
        <div class="blog-category-badge">Kategori</div>
    </div>
    <div class="blog-content">
        <div class="blog-meta">
            <span class="blog-meta-item">
                <i class="far fa-calendar"></i>
                27 Ocak 2025
            </span>
            <span class="blog-meta-item">
                <i class="far fa-clock"></i>
                8 dk okuma
            </span>
        </div>
        <h2 class="blog-title">Blog Başlığı Buraya</h2>
        <p class="blog-excerpt">
            Kısa özet buraya gelecek. 2-3 cümle ile blog yazısının konusunu özetleyin.
        </p>
        <span class="blog-read-more">
            Devamını Oku <i class="fas fa-arrow-right"></i>
        </span>
        <div class="blog-tags">
            <span class="blog-tag">Etiket 1</span>
            <span class="blog-tag">Etiket 2</span>
        </div>
    </div>
</a>
```

**Öne Çıkan (Featured) Yapmak İçin:**

```html
<a href="..." class="blog-card blog-card-featured">
```

Bu kart 2 kolon genişliğinde ve daha büyük görünür.

---

## 📝 Desteklenen HTML Etiketleri

Blog içeriğinde kullanabileceğiniz HTML etiketleri:

### Başlıklar

```html
<h2>Ana Başlık</h2>
<h3>Alt Başlık</h3>
<h4>Küçük Başlık</h4>
```

### Paragraflar

```html
<p>Normal paragraf metni.</p>
<p><strong>Kalın metin</strong> ve <em>italik metin</em></p>
```

### Listeler

```html
<!-- Madde işaretli -->
<ul>
    <li>Madde 1</li>
    <li>Madde 2</li>
</ul>

<!-- Numaralı -->
<ol>
    <li>Birinci madde</li>
    <li>İkinci madde</li>
</ol>
```

### Alıntılar

```html
<blockquote>
    "Buraya önemli bir alıntı veya not yazabilirsiniz."
</blockquote>
```

### Linkler

```html
<a href="https://example.com" target="_blank">Link metni</a>
```

### Görseller

```html
<img src="https://static.fokusistatistik.com/resimler/gorsel.jpg" alt="Açıklama">
```

### Kod

```html
<!-- Satır içi kod -->
<code>console.log('Merhaba')</code>

<!-- Kod bloğu -->
<pre><code>
function merhaba() {
    console.log('Merhaba Dünya');
}
</code></pre>
```

---

## 🎨 Kategori ve Renkler

Kategori badge'lerinde kullanabileceğiniz renkler:

```html
<!-- Veri Bilimi (Gold) -->
<div class="blog-category-badge">Veri Bilimi</div>

<!-- Fotoğraf (Gold) -->
<div class="blog-category-badge">Fotoğraf</div>

<!-- Edebiyat (Gold) -->
<div class="blog-category-badge">Edebiyat</div>

<!-- Sinema (Gold) -->
<div class="blog-category-badge">Sinema</div>
```

Şu anda tüm badge'ler gold renkte. İsterseniz CSS'de değiştirebilirsiniz.

---

## ✅ Checklist: Blog Yayınlama

Yeni blog yazısını yayınlamadan önce kontrol edin:

- [ ] Dosya ismi doğru formatta mı? (`YYYY-MM-slug.html`)
- [ ] Meta başlık ve açıklama güncellendi mi?
- [ ] Kategori badge doğru mu?
- [ ] Blog başlığı güncellendi mi?
- [ ] Tarih ve okuma süresi doğru mu?
- [ ] Kapak görseli var mı?
- [ ] İçerik tam ve düzgün formatlanmış mı?
- [ ] Etiketler eklendi mi?
- [ ] `blog/index.html` ana sayfasına kart eklendi mi?
- [ ] Tarayıcıda test edildi mi?

---

## 🔧 Sık Sorulan Sorular

### Blog sıralamasını nasıl değiştirim?

`blog/index.html` dosyasında blog kartlarının sırasını manuel olarak değiştirin. En üstteki ilk görünür.

### Eski blogu nasıl silerim?

1. Blog HTML dosyasını silin (örn: `2025-01-eski-blog.html`)
2. `blog/index.html` dosyasından kartını kaldırın

### Blog görsellerimi nereye yüklemeliyim?

Görselleri `https://static.fokusistatistik.com/resimler/` altına yükleyin veya başka bir CDN kullanın.

### Okuma süresini nasıl hesaplarım?

Ortalama okuma hızı: **200 kelime/dakika**

```
Toplam kelime sayısı ÷ 200 = Okuma süresi (dakika)
```

### SEO için ne yapmalıyım?

1. `<title>` etiketini doldurun (50-60 karakter)
2. `<meta name="description">` ekleyin (150-160 karakter)
3. Başlıkları (`<h2>`, `<h3>`) kullanın
4. Alt metinleri (`alt`) görsellere ekleyin
5. İç ve dış linkleri kullanın

---

## 🎯 Örnek Blog Yapısı

İyi yapılandırılmış bir blog yazısı:

```
Başlık (H1 - Otomatik)
│
├── Giriş (H2)
│   └── Paragraflar
│
├── Ana Konu 1 (H2)
│   ├── Alt Konu 1.1 (H3)
│   │   ├── Paragraflar
│   │   └── Liste/Görsel
│   └── Alt Konu 1.2 (H3)
│
├── Ana Konu 2 (H2)
│   └── Paragraflar
│
└── Sonuç (H2)
    └── Kapanış paragrafları
```

---

## 🚀 Gelişmiş Özellikler

Blog sayfalarında otomatik olarak aktif özellikler:

✅ **Reading Progress Bar** - Sayfanın en üstünde okuma ilerlemesi
✅ **Social Share Buttons** - Twitter, Facebook, LinkedIn, WhatsApp, vb.
✅ **Back to Top Button** - Sağ alt köşede yukarı çık butonu
✅ **Dark/Light Mode** - Tema değiştirme

---

## 📞 Destek

Sorularınız için:
- Email: emrebostanoglu@gmail.com
- Template örneği: `blog/template.html`
- Dolu örnek: `blog/2025-01-yapay-zeka-ve-sanat.html`

---

**Son Güncelleme:** 27 Ocak 2025
**Sistem:** HTML Tabanlı Statik Blog
**CMS:** YOK - Manuel HTML Düzenleme
