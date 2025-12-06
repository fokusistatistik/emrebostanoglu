/**
 * FOKUS216 Modern Chatbot Widget with Anti-Spam Protection
 * Kurumsal Renk: #2c3335
 */

(function () {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    webhookUrl: 'https://n8n.fokusistatistik.com/webhook/fokus216clasic250001',
    botName: 'FOKUS216',
    botLogo: 'https://static.fokusistatistik.com/resimler/fokus216k.png',
    colors: {
      primary: '#2c3335',      // Kurumsal renk
      primaryDark: '#1a1a1a',  // Koyu ton
      primaryLight: '#3a4042', // Açık ton
      accent: '#d4af37',       // Altın (vurgu)
      text: '#ffffff',
      textSecondary: '#adb5bd',
      border: '#444'
    }
  };

  // ============================================
  // SPAM PREVENTION SYSTEM
  // ============================================
  const RATE_LIMITS = {
    MINUTE: { max: 3, window: 60000 },
    HOUR: { max: 30, window: 3600000 }
  };

  const SPAM_DETECTION = {
    minMessageLength: 2,
    maxSimilarity: 0.85,
    recentMessages: [],
    maxRecentMessages: 5
  };

  const BAN_DURATION = 5 * 60 * 1000;
  const CAPTCHA_THRESHOLD = 15;

  let messageTimestamps = { minute: [], hour: [] };
  let lastMessage = '';
  let banUntil = 0;
  let captchaRequired = false;
  let captchaSolved = false;
  let captchaAnswer = 0;
  let pendingMessage = null;

  // Generate fingerprint
  function generateFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);

    return canvas.toDataURL() +
           navigator.userAgent +
           navigator.language +
           screen.colorDepth +
           screen.width + 'x' + screen.height;
  }

  const fingerprint = btoa(generateFingerprint()).slice(0, 32);
  const STORAGE_KEYS = {
    timestamps: `fokus216_timestamps_${fingerprint}`,
    ban: `fokus216_ban_${fingerprint}`,
    messages: `fokus216_recent_${fingerprint}`,
    userId: `fokus216_user_id_${fingerprint}`
  };

  // Initialize userId with localStorage fallback
  let userId;
  try {
    userId = localStorage.getItem(STORAGE_KEYS.userId);
    if (!userId) {
      userId = 'web_' + Date.now() + '_' + Math.random().toString(36).slice(2, 13);
      localStorage.setItem(STORAGE_KEYS.userId, userId);
    }
  } catch (e) {
    // Fallback for private browsing or localStorage disabled
    console.warn('localStorage unavailable, using session-only userId:', e);
    userId = 'web_' + Date.now() + '_' + Math.random().toString(36).slice(2, 13);
  }

  // Load from storage
  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.timestamps);
      if (stored) {
        const data = JSON.parse(stored);
        messageTimestamps.minute = data.minute || [];
        messageTimestamps.hour = data.hour || [];
      }

      const banData = localStorage.getItem(STORAGE_KEYS.ban);
      if (banData) banUntil = parseInt(banData);

      const recentData = localStorage.getItem(STORAGE_KEYS.messages);
      if (recentData) SPAM_DETECTION.recentMessages = JSON.parse(recentData);
    } catch (e) {
      console.error('Storage yükleme hatası:', e);
    }
  }

  // Save to storage
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.timestamps, JSON.stringify(messageTimestamps));
      localStorage.setItem(STORAGE_KEYS.ban, banUntil.toString());
      localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(SPAM_DETECTION.recentMessages));
    } catch (e) {
      console.error('Storage kaydetme hatası:', e);
    }
  }

  // Clean old timestamps
  function cleanOldTimestamps() {
    const now = Date.now();
    messageTimestamps.minute = messageTimestamps.minute.filter(t => now - t < RATE_LIMITS.MINUTE.window);
    messageTimestamps.hour = messageTimestamps.hour.filter(t => now - t < RATE_LIMITS.HOUR.window);
  }

  // Check rate limit
  function checkRateLimit() {
    cleanOldTimestamps();

    if (messageTimestamps.minute.length >= RATE_LIMITS.MINUTE.max) {
      return {
        allowed: false,
        reason: 'minute',
        remaining: Math.ceil((RATE_LIMITS.MINUTE.window - (Date.now() - messageTimestamps.minute[0])) / 1000)
      };
    }

    if (messageTimestamps.hour.length >= RATE_LIMITS.HOUR.max) {
      return {
        allowed: false,
        reason: 'hour',
        remaining: Math.ceil((RATE_LIMITS.HOUR.window - (Date.now() - messageTimestamps.hour[0])) / 1000)
      };
    }

    return { allowed: true };
  }

  // Calculate similarity
  function calculateSimilarity(str1, str2) {
    str1 = str1.toLowerCase().trim();
    str2 = str2.toLowerCase().trim();

    if (str1 === str2) return 1;

    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    return 1 - (distance / maxLen);
  }

  // Detect spam
  function detectSpam(message) {
    if (message.length < SPAM_DETECTION.minMessageLength) {
      return { isSpam: true, reason: 'Mesaj çok kısa' };
    }

    if (/(.)\1{7,}/.test(message)) {
      return { isSpam: true, reason: 'Tekrarlayan karakterler tespit edildi' };
    }

    if (message === lastMessage) {
      return { isSpam: true, reason: 'Aynı mesajı tekrar gönderemezsiniz' };
    }

    for (let recentMsg of SPAM_DETECTION.recentMessages) {
      const similarity = calculateSimilarity(message, recentMsg);
      if (similarity > SPAM_DETECTION.maxSimilarity) {
        return { isSpam: true, reason: 'Çok benzer mesajlar gönderiyorsunuz' };
      }
    }

    return { isSpam: false };
  }

  // Generate CAPTCHA
  function generateCaptcha() {
    const operations = [
      { q: () => { const a = Math.floor(Math.random() * 10) + 1; const b = Math.floor(Math.random() * 10) + 1; return { text: `${a} + ${b}`, answer: a + b }; } },
      { q: () => { const a = Math.floor(Math.random() * 15) + 5; const b = Math.floor(Math.random() * 5) + 1; return { text: `${a} - ${b}`, answer: a - b }; } },
      { q: () => { const a = Math.floor(Math.random() * 10) + 1; const b = Math.floor(Math.random() * 10) + 1; return { text: `${a} × ${b}`, answer: a * b }; } }
    ];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    const result = operation.q();

    document.getElementById('captcha-question').textContent = result.text + ' = ?';
    captchaAnswer = result.answer;
  }

  // Show CAPTCHA
  function showCaptcha(message) {
    pendingMessage = message;
    captchaSolved = false;
    const captchaInput = document.getElementById('captcha-input');
    const captchaError = document.getElementById('captcha-error');
    captchaInput.value = '';
    captchaError.style.display = 'none';
    generateCaptcha();
    document.getElementById('captcha-modal').style.display = 'flex';
    captchaInput.focus();
  }

  // Verify CAPTCHA
  function verifyCaptcha() {
    const captchaInput = document.getElementById('captcha-input');
    const captchaError = document.getElementById('captcha-error');
    const userAnswer = parseInt(captchaInput.value);

    if (userAnswer === captchaAnswer) {
      captchaSolved = true;
      captchaRequired = false;
      document.getElementById('captcha-modal').style.display = 'none';

      if (pendingMessage) {
        sendMessageToServer(pendingMessage);
        pendingMessage = null;
      }
    } else {
      captchaError.style.display = 'block';
      captchaInput.value = '';
      generateCaptcha();
      captchaInput.focus();
    }
  }

  // Check ban
  function checkBan() {
    const now = Date.now();
    if (now < banUntil) {
      const remainingSeconds = Math.ceil((banUntil - now) / 1000);
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      return {
        banned: true,
        remaining: `${minutes}:${seconds.toString().padStart(2, '0')}`
      };
    }
    return { banned: false };
  }

  // Record message
  function recordMessage(message) {
    const now = Date.now();
    messageTimestamps.minute.push(now);
    messageTimestamps.hour.push(now);

    lastMessage = message;
    SPAM_DETECTION.recentMessages.push(message);

    if (SPAM_DETECTION.recentMessages.length > SPAM_DETECTION.maxRecentMessages) {
      SPAM_DETECTION.recentMessages.shift();
    }

    if (messageTimestamps.hour.length >= CAPTCHA_THRESHOLD && !captchaSolved) {
      captchaRequired = true;
    }

    saveToStorage();
  }

  // Apply ban
  function applyBan() {
    banUntil = Date.now() + BAN_DURATION;
    saveToStorage();

    addMessage('⛔ Çok fazla spam girişimi tespit edildi. 5 dakika süreyle mesaj gönderemezsiniz.', 'warning');
  }

  // ============================================
  // UI FUNCTIONS
  // ============================================
  const notificationSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjKJ0fPTgjMGHm7A7+OZTR8MTKXh8bllHAU7k9ryy3ksBSl+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU8ldvyy3YqBSh+zPLaisEGHm/A7+OZTR8MTKXh8bllHAU8ldvyy3ksBSh+zPLaizsIGWe57OibUBELTqvl8bBlGwU=');
  notificationSound.volume = 0.3;

  function addMessage(text, sender = 'bot') {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const div = document.createElement('div');

    // Clean text preprocessing
    let cleanText = text || '';
    cleanText = cleanText.replace(/\\n/g, '\n');
    cleanText = cleanText.replace(/\\t/g, ' ');
    cleanText = cleanText.replace(/\\\\/g, '\\');
    cleanText = cleanText.trim();
    cleanText = cleanText.replace(/^```[a-z]*\n?/gi, '').replace(/\n?```$/g, '');
    cleanText = cleanText.trim();
    cleanText = cleanText.replace(/\n\n+/g, '\n');
    cleanText = cleanText.split('\n').map(line => line.trim()).join('\n');

    // Convert markdown to HTML
    let htmlContent = cleanText
      .replace(/^#### (.*$)/gm, '<strong>$1</strong>')
      .replace(/^### (.*$)/gm, '<strong>$1</strong>')
      .replace(/^## (.*$)/gm, '<strong>$1</strong>')
      .replace(/^# (.*$)/gm, '<strong>$1</strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.*$)/gm, '• $1')
      .replace(/^\* (.*$)/gm, '• $1')
      .replace(/\n/g, '<br>');

    div.innerHTML = htmlContent;
    div.className = sender;

    // Set alignment
    if (sender === 'user') {
      div.style.marginLeft = 'auto';
    } else {
      div.style.marginRight = 'auto';
    }

    // Ensure all links have proper attributes
    const links = div.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (sender === 'bot' && chatMessages.children.length > 2) {
      notificationSound.play().catch(e => console.log('Ses çalınamadı:', e));
    }
  }

  function autoResizeTextarea() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;

    chatInput.style.height = 'auto';
    const newHeight = Math.min(chatInput.scrollHeight, 140);
    chatInput.style.height = newHeight + 'px';
    chatInput.style.overflowY = chatInput.scrollHeight > 140 ? 'auto' : 'hidden';
  }

  async function sendMessageToServer(message) {
    addMessage(message, 'user');

    const chatSubmit = document.getElementById('chat-submit');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatMessages = document.getElementById('chat-messages');

    if (chatSubmit) chatSubmit.disabled = true;
    if (typingIndicator) typingIndicator.style.display = 'flex';
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;

    // Timeout controller for fetch request (increased to 300 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 300 second timeout

    try {
      const res = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          kaynak: 'web',
          user_id: userId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let errorMsg = 'Sunucu hatası oluştu.';
        if (res.status === 429) {
          errorMsg = 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyip tekrar deneyin.';
        } else if (res.status === 500) {
          errorMsg = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
        } else if (res.status === 503) {
          errorMsg = 'Servis şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.';
        }
        throw new Error(errorMsg);
      }

      // Parse response
      const contentType = res.headers.get('content-type');
      let replyText = 'Cevap alınamadı.';

      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        replyText = data.reply || data.message || 'Cevap alınamadı.';
      } else {
        const textData = await res.text();
        try {
          const jsonData = JSON.parse(textData);
          replyText = jsonData.reply || jsonData.message || textData;
        } catch (e) {
          replyText = textData || 'Cevap alınamadı.';
        }
      }

      if (typingIndicator) typingIndicator.style.display = 'none';
      if (chatSubmit) chatSubmit.disabled = false;
      addMessage(replyText, 'bot');
    } catch (err) {
      clearTimeout(timeoutId);
      if (typingIndicator) typingIndicator.style.display = 'none';
      if (chatSubmit) chatSubmit.disabled = false;

      // Detailed error messages
      let errorMessage = 'Bağlantı hatası. Lütfen tekrar deneyin.';

      if (err.name === 'AbortError') {
        errorMessage = '⏱️ İstek zaman aşımına uğradı. Lütfen tekrar deneyin.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = '🌐 İnternet bağlantınızı kontrol edin ve tekrar deneyin.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      addMessage(errorMessage, 'bot');
      console.error('Chatbot error:', err);
    }
  }

  function addQuickQuestions() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const questions = [
      'Fotoğraf atölyesi hakkında bilgi almak istiyorum',
      'Veri bilimi ve yapay zeka danışmanlığı',
      'Kitaplar ve edebi eserler',
      'Film ve yönetmenlik çalışmaları'
    ];

    const container = document.createElement('div');
    container.className = 'quick-questions';

    questions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'quick-question-btn';
      btn.textContent = q;
      btn.onclick = () => {
        container.remove();
        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.value = q;
        const chatForm = document.getElementById('chat-form');
        if (chatForm) chatForm.dispatchEvent(new Event('submit'));
      };
      container.appendChild(btn);
    });

    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  function initChatbot() {
    loadFromStorage();

    const widget = document.getElementById('fokus216-widget');
    if (!widget) return;

    // Character counter
    const chatInput = document.getElementById('chat-input');
    const charCounter = document.getElementById('char-counter');
    if (chatInput && charCounter) {
      chatInput.addEventListener('input', () => {
        const length = chatInput.value.length;
        charCounter.textContent = `${length} / 1000`;

        charCounter.className = '';
        if (length > 900) charCounter.className = 'error';
        else if (length > 700) charCounter.className = 'warning';

        autoResizeTextarea();
      });

      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const chatForm = document.getElementById('chat-form');
          if (chatForm) chatForm.dispatchEvent(new Event('submit'));
        }
      });
    }

    // CAPTCHA
    const captchaSubmitBtn = document.getElementById('captcha-submit');
    const captchaInput = document.getElementById('captcha-input');
    if (captchaSubmitBtn) {
      captchaSubmitBtn.addEventListener('click', verifyCaptcha);
    }
    if (captchaInput) {
      captchaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyCaptcha();
      });
    }

    // Form submit
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const msg = chatInput ? chatInput.value.trim() : '';
        if (!msg) return;

        // Ban check
        const banCheck = checkBan();
        if (banCheck.banned) {
          addMessage(`⛔ Geçici olarak engellendiniz. Kalan süre: ${banCheck.remaining}`, 'warning');
          return;
        }

        // Rate limit check
        const rateCheck = checkRateLimit();
        if (!rateCheck.allowed) {
          if (rateCheck.reason === 'minute') {
            addMessage(`⏱️ Dakikada en fazla ${RATE_LIMITS.MINUTE.max} mesaj gönderebilirsiniz. Lütfen ${rateCheck.remaining} saniye bekleyin.`, 'warning');
          } else {
            addMessage(`⏱️ Saatte en fazla ${RATE_LIMITS.HOUR.max} mesaj gönderebilirsiniz. Lütfen ${Math.floor(rateCheck.remaining / 60)} dakika bekleyin.`, 'warning');

            if (messageTimestamps.hour.length >= RATE_LIMITS.HOUR.max + 3) {
              applyBan();
            }
          }
          return;
        }

        // Spam detection
        const spamCheck = detectSpam(msg);
        if (spamCheck.isSpam) {
          addMessage(`⚠️ ${spamCheck.reason}`, 'warning');

          const spamAttempts = parseInt(sessionStorage.getItem('spam_attempts') || '0') + 1;
          sessionStorage.setItem('spam_attempts', spamAttempts.toString());

          if (spamAttempts >= 3) {
            applyBan();
          }
          return;
        }

        // CAPTCHA check
        if (captchaRequired && !captchaSolved) {
          showCaptcha(msg);
          if (chatInput) {
            chatInput.value = '';
            chatInput.style.height = '44px';
          }
          if (charCounter) {
            charCounter.textContent = '0 / 1000';
            charCounter.className = '';
          }
          return;
        }

        // Record and send
        recordMessage(msg);

        if (chatInput) {
          chatInput.value = '';
          chatInput.style.height = '44px';
        }
        if (charCounter) {
          charCounter.textContent = '0 / 1000';
          charCounter.className = '';
        }

        sendMessageToServer(msg);
        captchaSolved = false;
      });
    }

    // Initial message
    addMessage(`Merhaba! Ben Emre Bostanoğlu'nun kişisel asistanıyım. Size nasıl yardımcı olabilirim?`, 'bot');
    addQuickQuestions();
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
