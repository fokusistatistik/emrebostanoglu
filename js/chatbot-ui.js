/**
 * FOKUS216 Chatbot UI - HTML & CSS Injection
 * Kurumsal Renk Teması: #2c3335
 */

(function() {
  'use strict';

  // Inject chatbot HTML structure
  function injectChatbotHTML() {
    const chatbotHTML = `
      <!-- FOKUS216 Chatbot Widget -->
      <div id="fokus216-widget" aria-label="FOKUS216 Chatbot Widget">
        <div id="fokus216-popup" role="dialog" aria-modal="true">
          <div id="fokus216-popup-header">
            <div id="fokus216-popup-header-icon"></div>
            <div id="fokus216-popup-header-title">
              <strong>FOKUS216</strong>
              Size nasıl yardımcı olabilirim?
            </div>
          </div>

          <div id="chat-messages" aria-live="polite"></div>
          <div id="typing-indicator" aria-live="polite" style="display: none;">
            Yazıyor<span></span><span></span><span></span>
          </div>

          <form id="chat-form" autocomplete="off">
            <textarea id="chat-input" placeholder="Mesajınızı yazın..." rows="1" maxlength="1000"></textarea>
            <button id="chat-submit" type="submit" aria-label="Gönder"></button>
          </form>
          <div id="char-counter">0 / 1000</div>
        </div>
      </div>

      <!-- CAPTCHA Modal -->
      <div id="captcha-modal">
        <div id="captcha-content">
          <h3>🔒 Güvenlik Doğrulaması</h3>
          <p>Lütfen aşağıdaki basit soruyu cevaplayın:</p>
          <div id="captcha-question"></div>
          <input type="text" id="captcha-input" placeholder="Cevabınızı girin">
          <div id="captcha-error">Yanlış cevap, lütfen tekrar deneyin.</div>
          <button id="captcha-submit">Doğrula</button>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = chatbotHTML;
    document.body.appendChild(container);
  }

  // Inject chatbot CSS styles
  function injectChatbotCSS() {
    const styles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        #fokus216-widget {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          z-index: 9999;
        }

        #fokus216-popup {
          background: #ffffff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          width: 400px;
          height: 600px;
          max-width: 95vw;
          max-height: 95vh;
        }

        @media (max-width: 480px) {
          #fokus216-popup {
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            max-height: 100vh;
            border-radius: 0;
          }

          #fokus216-popup-header-title {
            font-size: 15px;
          }

          #chat-input,
          #chat-submit {
            font-size: 15px;
          }
        }

        /* Header Design - Kurumsal Renk */
        #fokus216-popup-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          background: linear-gradient(135deg, #2c3335 0%, #1a1a1a 100%);
          position: relative;
        }

        #fokus216-popup-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        #fokus216-popup-header-icon {
          width: 58px;
          height: 58px;
          min-width: 58px;
          border-radius: 50%;
          background: url('https://static.fokusistatistik.com/resimler/fokus216k.png') no-repeat center/cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 3px solid rgba(212, 175, 55, 0.3);
        }

        #fokus216-popup-header-title {
          font-weight: 500;
          font-size: 16px;
          color: white;
          flex-grow: 1;
          line-height: 1.4;
        }

        #fokus216-popup-header-title strong {
          font-weight: 600;
          display: block;
          margin-bottom: 2px;
        }

        /* Message Area */
        #chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 20px;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scroll-behavior: smooth;
        }

        #chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        #chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        #chat-messages::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }

        #chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }

        /* Typing Indicator */
        #typing-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          background: #e9ecef;
          color: #495057;
          padding: 10px 12px;
          border-radius: 18px;
          max-width: fit-content;
          align-self: flex-start;
          margin-left: 12px;
        }

        #typing-indicator span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #2c3335;
          border-radius: 50%;
          opacity: 0.4;
          animation: blink 1.4s infinite ease-in-out;
        }

        #typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        #typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Message Bubbles */
        #chat-messages > div {
          font-size: 14px;
          padding: 10px 10px 10px 10px;
          border-radius: 18px;
          max-width: 75%;
          line-height: 1.5;
          word-wrap: break-word;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: pre-wrap;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        #chat-messages > div.user {
          background: linear-gradient(135deg, #2c3335 0%, #1a1a1a 100%);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 8px rgba(44, 51, 53, 0.3);
        }

        #chat-messages > div.user a {
          color: #d4af37 !important;
          text-decoration: underline;
          text-decoration-color: rgba(212, 175, 55, 0.5);
        }

        #chat-messages > div.user a:hover {
          text-decoration-color: #d4af37;
        }

        #chat-messages > div.bot {
          background: white;
          color: #212529;
          margin-right: auto;
          border-bottom-left-radius: 4px;
          border: 1px solid #e9ecef;
        }

        #chat-messages a {
          color: #2c3335;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid rgba(44, 51, 53, 0.3);
          transition: all 0.2s ease;
        }

        #chat-messages a:hover {
          color: #1a1a1a;
          border-bottom-color: #1a1a1a;
        }

        /* Form Area */
        #chat-form {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 16px 20px;
          background: white;
          border-top: 1px solid #e9ecef;
        }

        #chat-input {
          resize: none;
          overflow-y: hidden;
          height: 44px;
          max-height: 140px;
          line-height: 1.5;
          font-size: 14px;
          padding: 12px 16px;
          border-radius: 22px;
          border: 1px solid #dee2e6;
          outline: none;
          box-sizing: border-box;
          flex-grow: 1;
          font-family: inherit;
          transition: all 0.2s ease;
          background: #f8f9fa;
        }

        #chat-input:focus {
          background: white;
          border-color: #2c3335;
          box-shadow: 0 0 0 3px rgba(44, 51, 53, 0.1);
        }

        #chat-input::placeholder {
          color: #adb5bd;
        }

        #chat-submit {
          background: linear-gradient(135deg, #2c3335 0%, #1a1a1a 100%);
          color: white;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(44, 51, 53, 0.3);
          transition: all 0.2s ease;
        }

        #chat-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(44, 51, 53, 0.4);
        }

        #chat-submit:active:not(:disabled) {
          transform: scale(0.95);
        }

        #chat-submit:disabled {
          background: #ced4da;
          cursor: not-allowed;
          box-shadow: none;
          transform: scale(1);
        }

        #chat-submit::before {
          content: '➤';
        }

        /* Character Counter */
        #char-counter {
          font-size: 11px;
          color: #6c757d;
          text-align: right;
          padding: 0 20px 8px;
          font-weight: 500;
        }

        #char-counter.warning {
          color: #fd7e14;
        }

        #char-counter.error {
          color: #dc3545;
        }

        /* Quick Questions */
        .quick-questions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 8px 12px;
          align-items: flex-start;
        }

        .quick-question-btn {
          background: white;
          color: #2c3335;
          border: 1.5px solid #2c3335;
          border-radius: 20px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          max-width: 90%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .quick-question-btn:hover {
          background: linear-gradient(135deg, #2c3335 0%, #1a1a1a 100%);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 51, 53, 0.2);
        }

        .quick-question-btn:active {
          transform: translateY(0);
        }

        /* Warning Messages */
        #chat-messages > div.warning {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
          border-left: 4px solid #ffc107;
          max-width: 85%;
        }

        /* CAPTCHA Modal */
        #captcha-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        #captcha-content {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }

        #captcha-content h3 {
          color: #2c3335;
          margin-bottom: 20px;
          font-size: 20px;
        }

        #captcha-question {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          color: #212529;
        }

        #captcha-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 16px;
          text-align: center;
          margin: 15px 0;
          outline: none;
        }

        #captcha-input:focus {
          border-color: #2c3335;
        }

        #captcha-submit {
          background: linear-gradient(135deg, #2c3335 0%, #1a1a1a 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        #captcha-submit:hover {
          background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 51, 53, 0.3);
        }

        #captcha-error {
          color: #dc3545;
          font-size: 14px;
          margin-top: 10px;
          display: none;
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  // Initialize UI
  function initChatbotUI() {
    injectChatbotHTML();
    injectChatbotCSS();
    console.log('FOKUS216 Chatbot UI initialized');
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbotUI);
  } else {
    initChatbotUI();
  }

})();
