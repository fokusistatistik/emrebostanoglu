/**
 * Exit Intent Popup
 * Shows newsletter/subscription popup when user attempts to leave
 */

const ExitIntent = {
    // Configuration
    config: {
        webhookUrl: 'https://n8n.fokusistatistik.com/webhook/emrebostanoglunewsletter',
        showDelay: 1000, // Minimum time on page before showing (ms)
        cookieName: 'exitIntentShown',
        cookieExpiry: 7, // Days
        sensitivity: 20 // Mouse leave sensitivity (pixels from top)
    },

    // State
    state: {
        hasShown: false,
        isActive: true,
        timeOnPage: 0
    },

    /**
     * Initialize exit intent
     */
    init() {
        // Check if already shown
        if (this.getCookie(this.config.cookieName)) {
            this.state.isActive = false;
            return;
        }

        this.createPopupHTML();
        this.attachEventListeners();

        // Track time on page
        setInterval(() => {
            this.state.timeOnPage += 1000;
        }, 1000);

        console.log('Exit intent initialized');
    },

    /**
     * Create popup HTML
     */
    createPopupHTML() {
        const popupHTML = `
            <div id="exit-intent-overlay" class="exit-intent-overlay hidden">
                <div class="exit-intent-popup">
                    <button class="exit-intent-close" id="exit-intent-close" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>

                    <div class="exit-intent-content">
                        <div class="exit-intent-icon">
                            <i class="fas fa-envelope-open-text"></i>
                        </div>

                        <h2 class="exit-intent-title" data-i18n="exitIntent.title">
                            Ayrılmadan Önce...
                        </h2>

                        <p class="exit-intent-description" data-i18n="exitIntent.description">
                            En son projeler, fotoğraf sergiler, yeni kitaplar ve veri bilimi içerikleri hakkında bilgi almak ister misiniz?
                        </p>

                        <form id="exit-intent-form" class="exit-intent-form">
                            <div class="form-group">
                                <input
                                    type="text"
                                    id="exit-name"
                                    class="exit-input"
                                    placeholder="Adınız"
                                    data-i18n-placeholder="exitIntent.name"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <input
                                    type="email"
                                    id="exit-email"
                                    class="exit-input"
                                    placeholder="E-posta adresiniz"
                                    data-i18n-placeholder="exitIntent.email"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="exit-consent" required />
                                    <span data-i18n="exitIntent.consent">
                                        KVKK kapsamında bilgilerimin işlenmesini kabul ediyorum
                                    </span>
                                </label>
                            </div>

                            <button type="submit" class="exit-submit-btn">
                                <i class="fas fa-paper-plane mr-2"></i>
                                <span data-i18n="exitIntent.subscribe">Abone Ol</span>
                            </button>

                            <p class="exit-note" data-i18n="exitIntent.note">
                                Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
                            </p>
                        </form>

                        <div id="exit-success" class="exit-success hidden">
                            <i class="fas fa-check-circle"></i>
                            <h3 data-i18n="exitIntent.success_title">Teşekkürler!</h3>
                            <p data-i18n="exitIntent.success_message">
                                Başarıyla abone oldunuz. E-postanızı kontrol edin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = popupHTML;
        document.body.appendChild(container);

        this.injectStyles();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Mouse leave detection
        document.addEventListener('mouseout', (e) => {
            if (!this.state.isActive || this.state.hasShown) return;
            if (this.state.timeOnPage < this.config.showDelay) return;

            // Check if mouse left from top of viewport
            if (e.clientY < this.config.sensitivity) {
                this.showPopup();
            }
        });

        // Close button
        document.getElementById('exit-intent-close').addEventListener('click', () => {
            this.hidePopup();
        });

        // Click outside to close
        document.getElementById('exit-intent-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'exit-intent-overlay') {
                this.hidePopup();
            }
        });

        // Form submission
        document.getElementById('exit-intent-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.state.hasShown) {
                this.hidePopup();
            }
        });
    },

    /**
     * Show popup
     */
    showPopup() {
        const overlay = document.getElementById('exit-intent-overlay');
        overlay.classList.remove('hidden');
        overlay.classList.add('exit-intent-show');
        this.state.hasShown = true;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    },

    /**
     * Hide popup
     */
    hidePopup() {
        const overlay = document.getElementById('exit-intent-overlay');
        overlay.classList.add('hidden');
        overlay.classList.remove('exit-intent-show');

        // Restore body scroll
        document.body.style.overflow = '';

        // Set cookie
        this.setCookie(this.config.cookieName, 'true', this.config.cookieExpiry);
        this.state.isActive = false;
    },

    /**
     * Handle form submission
     */
    async handleSubmit() {
        const name = document.getElementById('exit-name').value;
        const email = document.getElementById('exit-email').value;
        const consent = document.getElementById('exit-consent').checked;

        if (!consent) {
            alert('Lütfen KVKK onayını kabul edin');
            return;
        }

        const submitBtn = document.querySelector('.exit-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Gönderiliyor...';

        try {
            const response = await fetch(this.config.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    consent: consent,
                    timestamp: new Date().toISOString(),
                    source: 'exit_intent_popup',
                    language: typeof I18N !== 'undefined' ? I18N.getCurrentLanguage() : 'tr'
                })
            });

            if (response.ok) {
                // Show success message
                document.getElementById('exit-intent-form').classList.add('hidden');
                document.getElementById('exit-success').classList.remove('hidden');

                // Auto close after 3 seconds
                setTimeout(() => {
                    this.hidePopup();
                }, 3000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Abone Ol';
        }
    },

    /**
     * Set cookie
     */
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },

    /**
     * Get cookie
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    /**
     * Inject styles
     */
    injectStyles() {
        const styles = `
            <style>
                .exit-intent-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(5px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                .exit-intent-overlay.hidden {
                    display: none;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .exit-intent-popup {
                    background: linear-gradient(135deg, #1a1a1a 0%, #2c3335 100%);
                    border-radius: 20px;
                    max-width: 500px;
                    width: 100%;
                    padding: 3rem 2rem;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    animation: slideDown 0.4s ease;
                    border: 1px solid #444;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .exit-intent-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    color: #9ca3af;
                    font-size: 24px;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s;
                }

                .exit-intent-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                .exit-intent-content {
                    text-align: center;
                }

                .exit-intent-icon {
                    font-size: 4rem;
                    color: #3b82f6;
                    margin-bottom: 1.5rem;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .exit-intent-title {
                    font-size: 2rem;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 1rem;
                    font-family: 'Cinzel', serif;
                }

                .exit-intent-description {
                    font-size: 1rem;
                    color: #d1d5db;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .exit-intent-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .form-group {
                    text-align: left;
                }

                .exit-input {
                    width: 100%;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #444;
                    border-radius: 10px;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.3s;
                }

                .exit-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    background: rgba(255, 255, 255, 0.08);
                }

                .checkbox-label {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    color: #d1d5db;
                    font-size: 0.875rem;
                    cursor: pointer;
                }

                .checkbox-label input[type="checkbox"] {
                    margin-top: 0.25rem;
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                .exit-submit-btn {
                    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .exit-submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
                }

                .exit-submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .exit-note {
                    font-size: 0.75rem;
                    color: #9ca3af;
                    margin-top: 0.5rem;
                }

                .exit-success {
                    text-align: center;
                    padding: 2rem 0;
                }

                .exit-success.hidden {
                    display: none;
                }

                .exit-success i {
                    font-size: 4rem;
                    color: #4ade80;
                    margin-bottom: 1rem;
                }

                .exit-success h3 {
                    font-size: 1.5rem;
                    color: white;
                    margin-bottom: 0.5rem;
                }

                .exit-success p {
                    color: #d1d5db;
                }

                @media (max-width: 768px) {
                    .exit-intent-popup {
                        padding: 2rem 1.5rem;
                    }

                    .exit-intent-title {
                        font-size: 1.5rem;
                    }

                    .exit-intent-icon {
                        font-size: 3rem;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ExitIntent.init());
} else {
    ExitIntent.init();
}
