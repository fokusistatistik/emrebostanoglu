# 🚀 Dağıtım (Deployment) Kılavuzu

Bu dosya, Emre Bostanoğlu web sitesinin sunucuya nasıl hatasız ve hızlı bir şekilde yükleneceğini açıklar.

## 🛠️ Hızlı Kurulum ve Güncelleme

Sunucuda root veya yetkili kullanıcı ile terminale girerek aşağıdaki tek satırlık komutu çalıştırmanız yeterlidir:

```bash
bash deploy.sh
```

## 📄 Script (deploy.sh) Ne Yapıyor?

1.  **Güvenlik Yetkilendirmesi:** Git'in `dubious ownership` hatalarını otomatik olarak aşmak için dizini güvenli (`safe.directory`) olarak işaretler.
2.  **Otomatik Bağlantı:** Eğer dizinde Git bağlantısı yoksa kurar, varsa güncel adresi (`origin`) teyit eder.
3.  **Hard Refresh:** Sunucudaki tüm yerel dosyaları Git üzerindeki dal (`emreblogekleme`) ile birebir eşitler, fazlalıkları siler.
4.  **İzinler:** Tüm klasörleri `755`, tüm dosyaları `644` yaparak web erişimini güvenli hale getirir.

## ⚠️ Dikkat Edilmesi Gerekenler

- **Branch Değişimi:** Eğer ileride farklı bir dal (örn: `main`) kullanılacaksa, `deploy.sh` içerisindeki `BRANCH` değişkenini güncellemeniz yeterlidir.
- **Cache:** Yazıların güncellenmiş hali görünmüyorsa lütfen Cloudflare veya tarayıcı önbelleğini temizleyin.

---
*Fokus İstatistik - 2026*
