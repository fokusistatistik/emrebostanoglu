// Legal Modal (KVKK, Gizlilik, Çerez Politikası)
// Emre Bostanoğlu Kişisel Web Sitesi

const legalContent = {
    kvkk: {
        title: 'KVKK Aydınlatma Metni',
        icon: 'fas fa-shield-alt',
        content: `
            <div class="space-y-6 text-gray-300">
                <section>
                    <h3 class="text-lg font-bold text-white mb-3">1. Veri Sorumlusu</h3>
                    <p class="leading-relaxed">
                        6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz;
                        veri sorumlusu olarak Emre Bostanoğlu tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">2. Kişisel Verilerin İşlenme Amacı</h3>
                    <p class="leading-relaxed mb-3">
                        İletişim formunuz aracılığıyla tarafımıza iletmiş olduğunuz kişisel verileriniz
                        (ad-soyad, e-posta adresi, telefon numarası, mesaj içeriği):
                    </p>
                    <ul class="list-disc list-inside space-y-2 pl-4">
                        <li>Sizlerle iletişim kurabilmek</li>
                        <li>Sorularınızı cevaplayabilmek</li>
                        <li>Talebinizi değerlendirebilmek</li>
                        <li>İletişim faaliyetlerini yürütebilmek</li>
                    </ul>
                    <p class="leading-relaxed mt-3">
                        amaçlarıyla KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları
                        ve amaçları dahilinde işlenecektir.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">3. Kişisel Verilerin Aktarılması</h3>
                    <p class="leading-relaxed">
                        Toplanan kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri
                        işleme şartları ve amaçları çerçevesinde yalnızca iletişim amacıyla kullanılmakta
                        ve üçüncü kişilerle paylaşılmamaktadır.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
                    <p class="leading-relaxed">
                        Kişisel verileriniz, web sitemizde yer alan iletişim formu aracılığıyla elektronik
                        ortamda toplanmaktadır. Kişisel verileriniz, KVKK'nın 5. maddesinde belirtilen
                        "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun
                        meşru menfaatleri için veri işlenmesinin zorunlu olması" hukuki sebebine dayanılarak
                        işlenmektedir.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">5. Kişisel Veri Sahibinin KVKK'nın 11. Maddesinde Sayılan Hakları</h3>
                    <p class="leading-relaxed mb-3">
                        Kişisel veri sahipleri olarak, KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
                    </p>
                    <ul class="list-disc list-inside space-y-2 pl-4">
                        <li>Kişisel veri işlenip işlenmediğini öğrenme</li>
                        <li>Kişisel veriler işlenmişse buna ilişkin bilgi talep etme</li>
                        <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                        <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                        <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                        <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                        <li>Düzeltme, silme ve yok edilmeye ilişkin işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
                        <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
                    </ul>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">6. İletişim</h3>
                    <p class="leading-relaxed">
                        KVKK kapsamındaki haklarınızı kullanmak için iletişim formumuz üzerinden veya
                        <a href="mailto:emrebostanoglu@gmail.com" class="text-art-gold hover:underline">emrebostanoglu@gmail.com</a>
                        e-posta adresi üzerinden tarafımıza ulaşabilirsiniz.
                    </p>
                </section>

                <p class="text-sm text-gray-400 italic mt-6 pt-6 border-t border-gray-700">
                    <i class="fas fa-info-circle mr-2"></i>
                    Son güncelleme: Aralık 2025
                </p>
            </div>
        `
    },
    privacy: {
        title: 'Gizlilik Politikası',
        icon: 'fas fa-lock',
        content: `
            <div class="space-y-6 text-gray-300">
                <section>
                    <h3 class="text-lg font-bold text-white mb-3">1. Giriş</h3>
                    <p class="leading-relaxed">
                        Bu gizlilik politikası, emrebostanoglu.com web sitesini ziyaret ettiğinizde ve
                        iletişim formunu kullandığınızda kişisel bilgilerinizin nasıl toplandığını,
                        kullanıldığını ve korunduğunu açıklar. Gizliliğinize saygı duyuyoruz ve
                        kişisel bilgilerinizi korumayı taahhüt ediyoruz.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">2. Toplanan Bilgiler</h3>
                    <p class="leading-relaxed mb-3">İletişim formumuz aracılığıyla aşağıdaki bilgileri toplarız:</p>
                    <ul class="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Ad ve Soyad:</strong> Sizinle iletişim kurmak için</li>
                        <li><strong>E-posta Adresi:</strong> Size geri dönüş yapabilmek için</li>
                        <li><strong>Telefon Numarası:</strong> (Opsiyonel) Sizi arayarak ulaşabilmek için</li>
                        <li><strong>Mesaj İçeriği:</strong> Talebinizi değerlendirebilmek için</li>
                        <li><strong>İletişim Konusu:</strong> Mesajınızı doğru departmana yönlendirmek için</li>
                    </ul>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">3. Bilgilerin Kullanımı</h3>
                    <p class="leading-relaxed mb-3">Toplanan bilgileriniz yalnızca şu amaçlarla kullanılır:</p>
                    <ul class="list-disc list-inside space-y-2 pl-4">
                        <li>Sorularınızı cevaplamak</li>
                        <li>Taleplerinizi değerlendirmek</li>
                        <li>Sizinle iletişim kurmak</li>
                        <li>Hizmet kalitemizi iyileştirmek</li>
                    </ul>
                    <p class="leading-relaxed mt-3">
                        <strong>Bilgileriniz kesinlikle üçüncü şahıslarla paylaşılmaz, satılmaz veya kiralanmaz.</strong>
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">4. Bilgi Güvenliği</h3>
                    <p class="leading-relaxed">
                        Kişisel bilgilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz.
                        Verileriniz güvenli sunucularda saklanır ve yetkisiz erişime karşı korunur.
                        Ancak, internet üzerinden yapılan hiçbir iletimin %100 güvenli olduğu garanti edilemez.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">5. Çerezler</h3>
                    <p class="leading-relaxed">
                        Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
                        Çerezler hakkında detaylı bilgi için
                        <a href="javascript:void(0)" onclick="openLegalModal('cookie')" class="text-art-gold hover:underline">Çerez Politikamızı</a>
                        inceleyebilirsiniz.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">6. Üçüncü Taraf Bağlantılar</h3>
                    <p class="leading-relaxed">
                        Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantılara
                        tıkladığınızda, o web sitelerinin gizlilik politikalarına tabi olursunuz.
                        Bu sitelerin gizlilik uygulamalarından sorumlu değiliz.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">7. Haklarınız</h3>
                    <p class="leading-relaxed mb-3">Kişisel verilerinizle ilgili olarak şu haklara sahipsiniz:</p>
                    <ul class="list-disc list-inside space-y-2 pl-4">
                        <li>Verilerinize erişim talep etme</li>
                        <li>Verilerinizi düzeltme veya güncelleme</li>
                        <li>Verilerinizi silme talebinde bulunma</li>
                        <li>Veri işleme faaliyetlerine itiraz etme</li>
                    </ul>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">8. Politika Değişiklikleri</h3>
                    <p class="leading-relaxed">
                        Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
                        yapıldığında, bu sayfada güncelleme tarihi ile birlikte duyurulacaktır.
                        Düzenli olarak bu politikayı gözden geçirmenizi öneririz.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">9. İletişim</h3>
                    <p class="leading-relaxed">
                        Gizlilik politikamız hakkında sorularınız varsa, lütfen
                        <a href="mailto:emrebostanoglu@gmail.com" class="text-art-gold hover:underline">emrebostanoglu@gmail.com</a>
                        adresi üzerinden bizimle iletişime geçin.
                    </p>
                </section>

                <p class="text-sm text-gray-400 italic mt-6 pt-6 border-t border-gray-700">
                    <i class="fas fa-info-circle mr-2"></i>
                    Son güncelleme: Aralık 2025
                </p>
            </div>
        `
    },
    cookie: {
        title: 'Çerez Politikası',
        icon: 'fas fa-cookie-bite',
        content: `
            <div class="space-y-6 text-gray-300">
                <section>
                    <h3 class="text-lg font-bold text-white mb-3">1. Çerez Nedir?</h3>
                    <p class="leading-relaxed">
                        Çerezler, ziyaret ettiğiniz web siteleri tarafından bilgisayarınıza veya mobil
                        cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitelerinin daha
                        verimli çalışmasını sağlar ve site sahiplerine bilgi sağlar.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">2. Çerezleri Nasıl Kullanıyoruz?</h3>
                    <p class="leading-relaxed mb-3">
                        Web sitemizde kullanıcı deneyimini iyileştirmek için aşağıdaki çerezleri kullanıyoruz:
                    </p>

                    <div class="space-y-4">
                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <h4 class="font-bold text-white mb-2">
                                <i class="fas fa-cog text-blue-400 mr-2"></i>Zorunlu Çerezler
                            </h4>
                            <p class="text-sm leading-relaxed">
                                Bu çerezler web sitesinin temel işlevlerini yerine getirmek için gereklidir.
                                Bu çerezler olmadan site düzgün çalışmaz. Örnek: Dil tercihinizi, çerez
                                onayınızı hatırlama.
                            </p>
                        </div>

                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <h4 class="font-bold text-white mb-2">
                                <i class="fas fa-chart-line text-green-400 mr-2"></i>Performans Çerezleri
                            </h4>
                            <p class="text-sm leading-relaxed">
                                Bu çerezler, web sitesinin nasıl kullanıldığı hakkında bilgi toplar.
                                Hangi sayfaların en çok ziyaret edildiğini ve kullanıcıların sitede
                                nasıl gezindiğini anlamamıza yardımcı olur. Tüm bilgiler anonim olarak toplanır.
                            </p>
                        </div>

                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <h4 class="font-bold text-white mb-2">
                                <i class="fas fa-sliders-h text-purple-400 mr-2"></i>İşlevsellik Çerezleri
                            </h4>
                            <p class="text-sm leading-relaxed">
                                Bu çerezler, web sitesinin tercihlerinizi hatırlamasını sağlar.
                                Örnek: Seçtiğiniz dil, konum veya metin boyutu gibi ayarlar.
                            </p>
                        </div>

                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <h4 class="font-bold text-white mb-2">
                                <i class="fas fa-bullseye text-orange-400 mr-2"></i>Hedefleme/Reklam Çerezleri
                            </h4>
                            <p class="text-sm leading-relaxed">
                                <strong class="text-yellow-400">Not:</strong> Bu web sitesinde hedefleme
                                veya reklam çerezleri kullanılmamaktadır. Kişisel verileriniz reklam
                                amaçlı kullanılmaz veya üçüncü taraflarla paylaşılmaz.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">3. Kullandığımız Çerezler</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm border border-gray-700">
                            <thead class="bg-gray-800">
                                <tr>
                                    <th class="px-4 py-3 text-left text-white border-b border-gray-700">Çerez Adı</th>
                                    <th class="px-4 py-3 text-left text-white border-b border-gray-700">Amaç</th>
                                    <th class="px-4 py-3 text-left text-white border-b border-gray-700">Süre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-700">
                                    <td class="px-4 py-3 font-mono text-xs">cookieConsent</td>
                                    <td class="px-4 py-3">Çerez tercihlerinizi saklar</td>
                                    <td class="px-4 py-3">365 gün</td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <td class="px-4 py-3 font-mono text-xs">language</td>
                                    <td class="px-4 py-3">Dil tercihinizi hatırlar</td>
                                    <td class="px-4 py-3">30 gün</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-3 font-mono text-xs">session</td>
                                    <td class="px-4 py-3">Oturum bilgilerinizi saklar</td>
                                    <td class="px-4 py-3">Tarayıcı kapanana kadar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h3>
                    <p class="leading-relaxed mb-3">
                        Çoğu web tarayıcısı, çerezleri otomatik olarak kabul eder, ancak tarayıcı
                        ayarlarınızı değiştirerek çerezleri kontrol edebilir veya reddedebilirsiniz:
                    </p>
                    <ul class="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Chrome:</strong> Ayarlar > Gizlilik ve güvenlik > Çerezler</li>
                        <li><strong>Firefox:</strong> Ayarlar > Gizlilik ve Güvenlik > Çerezler ve Site Verileri</li>
                        <li><strong>Safari:</strong> Tercihler > Gizlilik > Çerezleri Engelle</li>
                        <li><strong>Edge:</strong> Ayarlar > Çerezler ve site izinleri</li>
                    </ul>
                    <p class="leading-relaxed mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <i class="fas fa-exclamation-triangle text-yellow-400 mr-2"></i>
                        <strong>Uyarı:</strong> Çerezleri tamamen engellemeniz durumunda, web sitesinin
                        bazı özellikleri düzgün çalışmayabilir.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">5. Üçüncü Taraf Çerezleri</h3>
                    <p class="leading-relaxed">
                        Web sitemiz, performans analizi için üçüncü taraf hizmetler kullanabilir
                        (örneğin Google Analytics). Bu hizmetler kendi çerezlerini yerleştirebilir.
                        Bu çerezler hakkında daha fazla bilgi için ilgili hizmet sağlayıcının
                        gizlilik politikasını inceleyebilirsiniz.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">6. Politika Güncellemeleri</h3>
                    <p class="leading-relaxed">
                        Bu çerez politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada
                        yayınlanacaktır. Düzenli olarak bu politikayı gözden geçirmenizi öneririz.
                    </p>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-3">7. İletişim</h3>
                    <p class="leading-relaxed">
                        Çerez politikamız hakkında sorularınız varsa, lütfen
                        <a href="mailto:emrebostanoglu@gmail.com" class="text-art-gold hover:underline">emrebostanoglu@gmail.com</a>
                        adresi üzerinden bizimle iletişime geçin.
                    </p>
                </section>

                <p class="text-sm text-gray-400 italic mt-6 pt-6 border-t border-gray-700">
                    <i class="fas fa-info-circle mr-2"></i>
                    Son güncelleme: Aralık 2025
                </p>
            </div>
        `
    }
};

// Modal açma fonksiyonu
function openLegalModal(type) {
    const modalId = 'legalModal';
    let modal = document.getElementById(modalId);

    // Modal yoksa oluştur
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 z-50 hidden overflow-y-auto';
        modal.innerHTML = `
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onclick="closeLegalModal()"></div>

            <!-- Modal Container -->
            <div class="relative min-h-screen flex items-center justify-center p-4">
                <!-- Modal Content -->
                <div class="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto transform transition-all">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between p-6 border-b border-gray-800">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-art-gold/20 flex items-center justify-center">
                                <i id="modalIcon" class="text-art-gold text-xl"></i>
                            </div>
                            <h2 id="modalTitle" class="text-2xl font-bold text-white"></h2>
                        </div>
                        <button onclick="closeLegalModal()"
                                class="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                                aria-label="Kapat">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <div id="modalBody" class="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <!-- Content will be inserted here -->
                    </div>

                    <!-- Modal Footer -->
                    <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
                        <button onclick="closeLegalModal()"
                                class="px-6 py-3 bg-gradient-to-r from-art-gold to-yellow-500 hover:from-yellow-500 hover:to-art-gold text-black font-bold rounded-lg transition-all transform hover:scale-105">
                            <i class="fas fa-check mr-2"></i>Anladım
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Custom scrollbar styles ekle
        if (!document.getElementById('legal-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'legal-modal-styles';
            style.innerHTML = `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(31, 41, 55, 0.5);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.5);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.7);
                }

                /* Smooth modal animation */
                #legalModal > div:nth-child(2) > div {
                    animation: modalSlideIn 0.3s ease-out;
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Body scroll lock */
                body.modal-open {
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // İçeriği güncelle
    const content = legalContent[type];
    if (content) {
        document.getElementById('modalTitle').textContent = content.title;
        document.getElementById('modalIcon').className = `${content.icon} text-art-gold text-xl`;
        document.getElementById('modalBody').innerHTML = content.content;

        // Modal'ı göster
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');

        // Escape tuşu ile kapatma
        document.addEventListener('keydown', handleEscapeKey);
    }
}

// Modal kapatma fonksiyonu
function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

// Escape tuşu kontrolü
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeLegalModal();
    }
}

// Global scope'a ekle
window.openLegalModal = openLegalModal;
window.closeLegalModal = closeLegalModal;
