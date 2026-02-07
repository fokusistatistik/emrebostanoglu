#!/bin/bash
# ==============================================================================
# PROJE: Emre Bostanoğlu Web Deployment (v1.2)
# AMAC: Hatasız, güvenli ve tam otomatik statik site dağıtımı.
# ==============================================================================

# --- AYARLAR ---
TARGET_DIR="/var/www/emrebostanoglu.com/html"
REPO_URL="https://github.com/fokusistatistik/emrebostanoglu.git"
BRANCH="emreblogekleme" # Proje ana dalı 'main' veya 'master' ise burayı güncelleyin

# Renkler
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}>>> Dağıtım İşlemi Başlatılıyor: $BRANCH${NC}"

# 1. Klasör Hazırlığı
if [ ! -d "$TARGET_DIR" ]; then
    echo "--- Hedef dizin oluşturuluyor..."
    mkdir -p "$TARGET_DIR"
fi
cd "$TARGET_DIR" || exit 1

# 2. Git Güvenlik Ayarı (Ownership hatalarını önlemek için)
echo "--- Git güvenlik yetkilendirmesi yapılıyor..."
git config --global --add safe.directory "$TARGET_DIR"

# 3. Git Yapılandırması ve Güncelleme
if [ ! -d ".git" ]; then
    echo -e "${BLUE}--- İlk kurulum yapılıyor (Fresh Clone)...${NC}"
    git clone -b "$BRANCH" "$REPO_URL" .
else
    echo "--- Mevcut bağlantı kontrol ediliyor..."
    # Remote varsa güncelle, yoksa ekle
    if git remote | grep -q 'origin'; then
        git remote set-url origin "$REPO_URL"
    else
        git remote add origin "$REPO_URL"
    fi
    
    echo -e "${BLUE}--- Güncellemeler çekiliyor (Hard Refresh)...${NC}"
    git fetch origin "$BRANCH"
    
    # Tüm yerel değişiklikleri ez ve repodaki ile birebir yap
    git reset --hard "origin/$BRANCH"
    
    # Gereksiz dosyaları (Git dışı) temizle
    git clean -fd
fi

# 4. Dosya İzinleri (Güvenlik ve Web Standartları)
echo "--- Dosya izinleri ayarlanıyor (644/755)..."
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# 5. Başarı Mesajı
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}✔ İŞLEM TAMAMLANDI: Site başarıyla güncellendi.${NC}"
echo -e "${GREEN}====================================================${NC}"
