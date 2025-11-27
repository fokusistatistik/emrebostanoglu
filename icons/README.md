# PWA İkonları

Bu klasör, Progressive Web App (PWA) ikonlarını içermelidir.

## 📥 Gerekli İkonlar

Lütfen aşağıdaki ikonları indirip bu klasöre yerleştirin:

1. **icon-192.png** (192x192 piksel)
2. **icon-512.png** (512x512 piksel)
3. **favicon.png** (herhangi bir boyut, tercihen 192x192)

## 🔗 İkon Kaynağı

Mevcut favicon URL'niz: `https://static.fokusistatistik.com/resimler/ebfavicon.png`

### Manuel İndirme Adımları:

```bash
# Tarayıcıda aç ve kaydet:
# https://static.fokusistatistik.com/resimler/ebfavicon.png

# Veya komut satırı ile:
cd icons/
curl -o icon-192.png "https://static.fokusistatistik.com/resimler/ebfavicon.png"
curl -o icon-512.png "https://static.fokusistatistik.com/resimler/ebfavicon.png"
curl -o favicon.png "https://static.fokusistatistik.com/resimler/ebfavicon.png"
```

## ✅ İkon Boyutları

İdeal olarak farklı boyutlarda ikonlar oluşturmalısınız:

- **192x192**: Mobil cihazlar için
- **512x512**: Yüksek çözünürlüklü ekranlar için

Eğer tek bir ikon dosyanız varsa, bunu her iki dosya olarak kopyalayabilirsiniz.

## 🎨 İkon Optimizasyonu (Opsiyonel)

Daha iyi performans için ikonları optimize edebilirsiniz:

```bash
# ImageMagick ile yeniden boyutlandırma
convert ebfavicon.png -resize 192x192 icon-192.png
convert ebfavicon.png -resize 512x512 icon-512.png

# Veya online araçlar:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
```

## 📝 Not

`manifest.json` dosyası bu lokal ikonları kullanacak şekilde güncellenmiştir.
İkonları yükledikten sonra PWA offline modda düzgün çalışacaktır.
