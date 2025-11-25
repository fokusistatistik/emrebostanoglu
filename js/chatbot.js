/**
 * Chatbot Widget
 * AI-powered chat assistant integrated with n8n webhook
 */

const Chatbot = {
    // Configuration
    config: {
        webhookUrl: 'https://n8n.fokusistatistik.com/webhook/emrebostanogluchatbot', // Will be provided by user
        botName: 'EB Assistant',
        welcomeMessage: {
            tr: 'Merhaba! Ben Emre Bostanoğlu\'nun asistanıyım. Size nasıl yardımcı olabilirim?',
            en: 'Hello! I\'m Emre Bostanoğlu\'s assistant. How can I help you?'
        },
        quickReplies: {
            tr: [
                'Veri bilimi hizmetleri',
                'Fotoğraf çekimi',
                'Kitaplar hakkında',
                'İletişim bilgileri'
            ],
            en: [
                'Data science services',
                'Photography session',
                'About books',
                'Contact information'
            ]
        }
    },

    // State
    state: {
        isOpen: false,
        messages: [],
        sessionId: null,
        isTyping: false
    },

    /**
     * Initialize chatbot
     */
    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.state.sessionId = this.generateSessionId();

        // Add welcome message
        this.addMessage(this.getWelcomeMessage(), 'bot');

        console.log('Chatbot initialized');
    },

    /**
     * Get current language
     */
    getCurrentLang() {
        return typeof I18N !== 'undefined' ? I18N.getCurrentLanguage() : 'tr';
    },

    /**
     * Get welcome message based on language
     */
    getWelcomeMessage() {
        const lang = this.getCurrentLang();
        return this.config.welcomeMessage[lang];
    },

    /**
     * Get quick replies based on language
     */
    getQuickReplies() {
        const lang = this.getCurrentLang();
        return this.config.quickReplies[lang];
    },

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Create chatbot HTML structure
     */
    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Chatbot Toggle Button -->
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat">
                <i class="fas fa-comments"></i>
                <span class="chatbot-badge">1</span>
            </button>

            <!-- Chatbot Window -->
            <div id="chatbot-window" class="chatbot-window hidden">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="flex items-center gap-3">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div>
                            <h3 class="chatbot-title">${this.config.botName}</h3>
                            <span class="chatbot-status">
                                <span class="status-dot"></span>
                                <span data-i18n="chatbot.online">Online</span>
                            </span>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close" aria-label="Close chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Messages Container -->
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be inserted here -->
                </div>

                <!-- Quick Replies -->
                <div id="chatbot-quick-replies" class="chatbot-quick-replies">
                    ${this.getQuickReplies().map(reply => `
                        <button class="quick-reply-btn" data-message="${reply}">
                            ${reply}
                        </button>
                    `).join('')}
                </div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <input
                        type="text"
                        id="chatbot-input"
                        class="chatbot-input"
                        placeholder="Mesajınızı yazın..."
                        data-i18n-placeholder="chatbot.input_placeholder"
                    />
                    <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>

                <!-- Typing Indicator -->
                <div id="chatbot-typing" class="chatbot-typing hidden">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        // Inject chatbot HTML
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.innerHTML = chatbotHTML;
        document.body.appendChild(chatbotContainer);

        // Inject chatbot styles
        this.injectStyles();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply-btn')) {
                const message = e.target.dataset.message;
                this.sendMessage(message);
            }
        });

        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.updateLanguage();
        });
    },

    /**
     * Toggle chat window
     */
    toggleChat() {
        this.state.isOpen = !this.state.isOpen;
        const window = document.getElementById('chatbot-window');
        const badge = document.querySelector('.chatbot-badge');

        if (this.state.isOpen) {
            window.classList.remove('hidden');
            window.classList.add('chatbot-window-open');
            badge.style.display = 'none';

            // Focus input
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 300);
        } else {
            window.classList.add('hidden');
            window.classList.remove('chatbot-window-open');
        }
    },

    /**
     * Add message to chat
     */
    addMessage(text, type = 'user') {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message chatbot-message-${type}`;

        const timestamp = new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-bubble">
                ${type === 'bot' ? '<i class="fas fa-robot message-icon"></i>' : ''}
                <div class="message-text">${text}</div>
            </div>
            <div class="message-time">${timestamp}</div>
        `;

        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.state.messages.push({ text, type, timestamp });
    },

    /**
     * Show typing indicator
     */
    showTyping() {
        this.state.isTyping = true;
        document.getElementById('chatbot-typing').classList.remove('hidden');
    },

    /**
     * Hide typing indicator
     */
    hideTyping() {
        this.state.isTyping = false;
        document.getElementById('chatbot-typing').classList.add('hidden');
    },

    /**
     * Send message
     */
    async sendMessage(text = null) {
        const input = document.getElementById('chatbot-input');
        const message = text || input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        try {
            // Send to webhook
            const response = await fetch(this.config.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: this.state.sessionId,
                    timestamp: new Date().toISOString(),
                    language: this.getCurrentLang(),
                    source: 'website_chatbot'
                })
            });

            if (response.ok) {
                const data = await response.json();

                // Simulate typing delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.hideTyping();

                // Add bot response
                const botMessage = data.response || data.message || 'Teşekkürler! Mesajınızı aldım.';
                this.addMessage(botMessage, 'bot');
            } else {
                throw new Error('Webhook request failed');
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTyping();

            // Fallback response
            const lang = this.getCurrentLang();
            const fallbackMessage = lang === 'tr'
                ? 'Üzgünüm, şu anda bir sorun yaşıyorum. Lütfen iletişim formunu kullanın.'
                : 'Sorry, I\'m experiencing an issue. Please use the contact form.';

            this.addMessage(fallbackMessage, 'bot');
        }
    },

    /**
     * Update language-dependent content
     */
    updateLanguage() {
        // Update quick replies
        const quickRepliesContainer = document.getElementById('chatbot-quick-replies');
        quickRepliesContainer.innerHTML = this.getQuickReplies().map(reply => `
            <button class="quick-reply-btn" data-message="${reply}">
                ${reply}
            </button>
        `).join('');
    },

    /**
     * Inject chatbot styles
     */
    injectStyles() {
        const styles = `
            <style>
                .chatbot-toggle {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    transition: all 0.3s ease;
                }

                .chatbot-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
                }

                .chatbot-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #e50914;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                }

                .chatbot-window {
                    position: fixed;
                    bottom: 6rem;
                    right: 2rem;
                    width: 380px;
                    height: 600px;
                    background: #1a1a1a;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid #333;
                    animation: slideUp 0.3s ease;
                }

                .chatbot-window.hidden {
                    display: none;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .chatbot-header {
                    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                }

                .chatbot-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                .chatbot-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                }

                .chatbot-status {
                    font-size: 12px;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #4ade80;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .chatbot-close {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0.5rem;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }

                .chatbot-close:hover {
                    opacity: 1;
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    background: #0f0f0f;
                }

                .chatbot-message {
                    margin-bottom: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .chatbot-message-user {
                    text-align: right;
                }

                .message-bubble {
                    display: inline-flex;
                    align-items: flex-start;
                    gap: 0.5rem;
                    max-width: 80%;
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .chatbot-message-bot .message-bubble {
                    background: #2c3335;
                    color: #e5e7eb;
                    border-bottom-left-radius: 4px;
                }

                .chatbot-message-user .message-bubble {
                    background: #3b82f6;
                    color: white;
                    border-bottom-right-radius: 4px;
                    flex-direction: row-reverse;
                }

                .message-icon {
                    font-size: 16px;
                    color: #3b82f6;
                }

                .message-time {
                    font-size: 10px;
                    color: #6b7280;
                    margin-top: 0.25rem;
                }

                .chatbot-quick-replies {
                    padding: 0.5rem 1rem;
                    background: #1a1a1a;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    border-top: 1px solid #333;
                }

                .quick-reply-btn {
                    background: transparent;
                    border: 1px solid #3b82f6;
                    color: #3b82f6;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .quick-reply-btn:hover {
                    background: #3b82f6;
                    color: white;
                }

                .chatbot-input-area {
                    padding: 1rem;
                    background: #1a1a1a;
                    display: flex;
                    gap: 0.5rem;
                    border-top: 1px solid #333;
                }

                .chatbot-input {
                    flex: 1;
                    background: #2c3335;
                    border: 1px solid #444;
                    color: white;
                    padding: 0.75rem;
                    border-radius: 8px;
                    font-size: 14px;
                }

                .chatbot-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                }

                .chatbot-send-btn {
                    background: #3b82f6;
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .chatbot-send-btn:hover {
                    background: #1d4ed8;
                    transform: scale(1.05);
                }

                .chatbot-typing {
                    padding: 0.5rem 1rem;
                    background: #1a1a1a;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .chatbot-typing.hidden {
                    display: none;
                }

                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #3b82f6;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }

                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-10px); }
                }

                @media (max-width: 768px) {
                    .chatbot-window {
                        width: calc(100vw - 2rem);
                        height: calc(100vh - 10rem);
                        right: 1rem;
                        bottom: 5rem;
                    }

                    .chatbot-toggle {
                        bottom: 1rem;
                        right: 1rem;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Chatbot.init());
} else {
    Chatbot.init();
}
