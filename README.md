# Emre Bostanoğlu - Kişisel Web Sitesi

Modern, profesyonel ve çok yönlü kişisel web sitesi. Veri bilimi, fotoğraf, yazarlık ve yönetmenlik alanlarındaki çalışmaları sergileyen statik web sitesi.

## 🎨 Özellikler

- **Modern Tasarım**: Glassmorphism efektleri ve smooth animasyonlar
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Vanilla JS**: Framework bağımlılığı olmadan saf JavaScript
- **Tailwind CSS**: Hızlı ve özelleştirilebilir tasarım sistemi
- **Modüler Yapı**: Tekrar kullanılabilir bileşenler (navbar, footer)
- **SEO Uyumlu**: Arama motorları için optimize edilmiş
- **Performanslı**: Lazy loading ve optimize edilmiş görseller

## 📁 Proje Yapısı

```
emrebostanoglu/
├── index.html              # Ana sayfa
├── css/
│   └── style.css          # Özel stiller ve animasyonlar
├── js/
│   ├── components.js      # Navbar ve Footer bileşenleri
│   └── app.js            # Ana uygulama mantığı
└── README.md             # Proje dokümantasyonu
```

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/fokusistatistik/emrebostanoglu.git
cd emrebostanoglu
```

2. Herhangi bir web sunucusu ile çalıştırın:
```bash
# Python ile
python -m http.server 8000

# Node.js http-server ile
npx http-server

# VS Code Live Server eklentisi ile
# Sağ tıklayıp "Open with Live Server" seçeneğini kullanın
```

3. Tarayıcınızda açın:
```
http://localhost:8000
```

## 🎯 Bölümler

### Ana Sayfa (index.html)
- **Hero Section**: Dinamik typing animasyonu ile giriş bölümü
- **Veri Bilimi**: Projeler ve yetenekler
- **Fotoğraf**: Galeri önizlemesi ve kategoriler
- **Yazar**: Kitaplar ve yayınlar (horizontal slider)
- **Yönetmen**: Filmografi (horizontal slider)

### Gelecek Sayfalar
- `about.html` - Hakkımda
- `datascience.html` - Veri Bilimi Projeleri
- `photography.html` - Fotoğraf Galerisi
- `writer.html` - Kitaplar ve Yazılar
- `director.html` - Filmler ve Senaryolar
- `contact.html` - İletişim Formu

## 🎨 Renk Paleti

```css
Primary (Koyu Gri): #2c3335
Data Blue: #3b82f6
Art Gold: #d4af37
Writer Paper: #f5f5dc
Director Red: #e50914
Card Background: #343a40
```

## 🛠️ Teknolojiler

- **HTML5**: Semantik yapı
- **CSS3**: Custom animations, glassmorphism
- **JavaScript (Vanilla)**: ES6+ özellikleri
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: İkonlar
- **Google Fonts**: Inter, Playfair Display, Cinzel

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performans Optimizasyonları

- Lazy loading görseller
- Minimize edilmiş CSS/JS
- CDN kullanımı
- Smooth scroll ve animasyonlar
- Intersection Observer API

## 🎭 Animasyonlar

- Fade in/out efektleri
- Slide animasyonlar
- Typing animasyonu
- Parallax efektler
- Hover transitions
- Book card 3D rotasyon
- Slider smooth scroll

## 📝 Özelleştirme

### Logo ve Favicon Değiştirme
`js/components.js` dosyasında `SITE_CONFIG` nesnesini güncelleyin:

```javascript
const SITE_CONFIG = {
    logoUrl: 'yeni-logo-url',
    favicon: 'yeni-favicon-url',
    // ...
};
```

### Renk Temasını Değiştirme
`js/components.js` içinde renk değerlerini güncelleyin:

```javascript
colors: {
    primary: '#yeni-renk',
    // ...
}
```

### Navbar Linkleri Ekleme/Çıkarma
`js/components.js` içinde `getNavbarHTML` fonksiyonundaki `links` dizisini düzenleyin.

## 🌐 Tarayıcı Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## 📄 Lisans

© 2024 Emre Bostanoğlu. Tüm hakları saklıdır.

## 📧 İletişim

- **Email**: info@emrebostanoglu.com
- **Konum**: Kocaeli, Türkiye

---

**Designed by EB.com AI** | Vanilla JavaScript ile geliştirilmiştir.
