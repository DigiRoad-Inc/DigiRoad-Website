(function () {
  const STORAGE_KEY = 'dr_cookie_consent';

  // Already consented — do nothing
  if (localStorage.getItem(STORAGE_KEY)) return;

  /* ── Styles ──────────────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    #dr-cookie-banner *,#dr-cookie-modal * { box-sizing: border-box; margin: 0; padding: 0; }

    /* Banner */
    #dr-cookie-banner {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(120px);
      width: calc(100% - 48px);
      max-width: 760px;
      background: #0b2e26;
      border: 1px solid rgba(209,250,229,0.12);
      border-radius: 16px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      z-index: 99999;
      box-shadow: 0 8px 40px rgba(0,0,0,0.45);
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease;
      opacity: 0;
      font-family: Inter, sans-serif;
    }
    #dr-cookie-banner.dr-visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    #dr-cookie-banner p {
      flex: 1;
      font-size: 13.5px;
      line-height: 1.55;
      color: rgba(209,250,229,0.75);
      min-width: 200px;
    }
    #dr-cookie-banner p a {
      color: #10b981;
      text-decoration: none;
    }
    #dr-cookie-banner p a:hover { text-decoration: underline; }
    .dr-cookie-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      flex-shrink: 0;
    }
    .dr-btn {
      font-family: Inter, sans-serif;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      padding: 9px 16px;
      cursor: pointer;
      border: none;
      white-space: nowrap;
      transition: opacity 0.15s, background 0.15s;
    }
    .dr-btn-primary   { background: #10b981; color: #fff; }
    .dr-btn-primary:hover { background: #059669; }
    .dr-btn-secondary { background: rgba(209,250,229,0.08); color: #d1fae5; }
    .dr-btn-secondary:hover { background: rgba(209,250,229,0.14); }
    .dr-btn-ghost     { background: transparent; color: rgba(209,250,229,0.5); border: 1px solid rgba(209,250,229,0.15); }
    .dr-btn-ghost:hover { color: #d1fae5; border-color: rgba(209,250,229,0.35); }

    /* Modal overlay */
    #dr-cookie-modal {
      position: fixed;
      inset: 0;
      background: rgba(1,13,10,0.75);
      backdrop-filter: blur(4px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: Inter, sans-serif;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    #dr-cookie-modal.dr-visible { opacity: 1; }

    /* Modal card */
    .dr-modal-card {
      background: #0b2e26;
      border: 1px solid rgba(209,250,229,0.12);
      border-radius: 20px;
      width: 100%;
      max-width: 520px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }
    #dr-cookie-modal.dr-visible .dr-modal-card { transform: translateY(0); }
    .dr-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dr-modal-header h2 {
      font-size: 18px;
      font-weight: 700;
      color: #d1fae5;
      letter-spacing: -0.02em;
    }
    .dr-modal-close {
      background: none;
      border: none;
      color: rgba(209,250,229,0.4);
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      padding: 4px;
      transition: color 0.15s;
    }
    .dr-modal-close:hover { color: #d1fae5; }
    .dr-modal-desc {
      font-size: 13.5px;
      color: rgba(209,250,229,0.6);
      line-height: 1.6;
    }

    /* Category rows */
    .dr-categories { display: flex; flex-direction: column; gap: 12px; }
    .dr-category {
      background: rgba(209,250,229,0.04);
      border: 1px solid rgba(209,250,229,0.08);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .dr-category-text { flex: 1; }
    .dr-category-text h3 {
      font-size: 13.5px;
      font-weight: 600;
      color: #d1fae5;
      margin-bottom: 4px;
    }
    .dr-category-text p {
      font-size: 12.5px;
      color: rgba(209,250,229,0.5);
      line-height: 1.5;
    }

    /* Toggle */
    .dr-toggle {
      position: relative;
      width: 40px;
      height: 22px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .dr-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
    .dr-toggle-track {
      position: absolute;
      inset: 0;
      background: rgba(209,250,229,0.12);
      border-radius: 99px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .dr-toggle input:checked + .dr-toggle-track { background: #10b981; }
    .dr-toggle input:disabled + .dr-toggle-track { cursor: not-allowed; opacity: 0.5; }
    .dr-toggle-track::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }
    .dr-toggle input:checked + .dr-toggle-track::after { transform: translateX(18px); }

    /* Modal footer */
    .dr-modal-footer {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .dr-modal-footer .dr-btn { flex: 1; min-width: 120px; text-align: center; }

    @media (max-width: 500px) {
      #dr-cookie-banner { bottom: 16px; padding: 16px; gap: 14px; }
      .dr-cookie-actions { width: 100%; }
      .dr-btn { flex: 1; text-align: center; }
      .dr-modal-card { padding: 24px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Banner HTML ─────────────────────────────────────────────────────── */
  const banner = document.createElement('div');
  banner.id = 'dr-cookie-banner';
  banner.innerHTML = `
    <p>We use cookies to improve your experience and analyse site usage. See our <a href="privacy.html">Privacy Policy</a> for details.</p>
    <div class="dr-cookie-actions">
      <button class="dr-btn dr-btn-ghost" id="dr-reject-all">Reject All</button>
      <button class="dr-btn dr-btn-secondary" id="dr-manage">Manage Preferences</button>
      <button class="dr-btn dr-btn-primary" id="dr-accept-all">Accept All</button>
    </div>
  `;
  document.body.appendChild(banner);

  // Slide in after a short delay
  requestAnimationFrame(() => setTimeout(() => banner.classList.add('dr-visible'), 100));

  /* ── Modal HTML ──────────────────────────────────────────────────────── */
  const modal = document.createElement('div');
  modal.id = 'dr-cookie-modal';
  modal.innerHTML = `
    <div class="dr-modal-card">
      <div class="dr-modal-header">
        <h2>Cookie Preferences</h2>
        <button class="dr-modal-close" id="dr-modal-close" aria-label="Close">&#x2715;</button>
      </div>
      <p class="dr-modal-desc">Choose which cookies you allow. Necessary cookies are always active as they are required for the site to function.</p>
      <div class="dr-categories">

        <div class="dr-category">
          <div class="dr-category-text">
            <h3>Necessary</h3>
            <p>Essential for the site to function. Cannot be disabled.</p>
          </div>
          <label class="dr-toggle">
            <input type="checkbox" checked disabled>
            <span class="dr-toggle-track"></span>
          </label>
        </div>

        <div class="dr-category">
          <div class="dr-category-text">
            <h3>Analytics</h3>
            <p>Help us understand how visitors interact with our site so we can improve it.</p>
          </div>
          <label class="dr-toggle">
            <input type="checkbox" id="dr-toggle-analytics">
            <span class="dr-toggle-track"></span>
          </label>
        </div>

        <div class="dr-category">
          <div class="dr-category-text">
            <h3>Marketing</h3>
            <p>Used to show relevant ads and track campaign performance across sites.</p>
          </div>
          <label class="dr-toggle">
            <input type="checkbox" id="dr-toggle-marketing">
            <span class="dr-toggle-track"></span>
          </label>
        </div>

      </div>
      <div class="dr-modal-footer">
        <button class="dr-btn dr-btn-ghost" id="dr-reject-modal">Reject All</button>
        <button class="dr-btn dr-btn-primary" id="dr-save-prefs">Save Preferences</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  function hideBanner() {
    banner.classList.remove('dr-visible');
    setTimeout(() => banner.remove(), 400);
  }

  function hideModal() {
    modal.classList.remove('dr-visible');
    setTimeout(() => modal.remove(), 250);
  }

  function saveConsent(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), ...prefs }));
    hideBanner();
    hideModal();
  }

  function openModal() {
    modal.classList.add('dr-visible');
  }

  /* ── Event listeners ─────────────────────────────────────────────────── */
  document.getElementById('dr-accept-all').addEventListener('click', () =>
    saveConsent({ necessary: true, analytics: true, marketing: true })
  );

  document.getElementById('dr-reject-all').addEventListener('click', () =>
    saveConsent({ necessary: true, analytics: false, marketing: false })
  );

  document.getElementById('dr-manage').addEventListener('click', openModal);

  document.getElementById('dr-modal-close').addEventListener('click', hideModal);

  document.getElementById('dr-reject-modal').addEventListener('click', () =>
    saveConsent({ necessary: true, analytics: false, marketing: false })
  );

  document.getElementById('dr-save-prefs').addEventListener('click', () => {
    saveConsent({
      necessary: true,
      analytics: document.getElementById('dr-toggle-analytics').checked,
      marketing: document.getElementById('dr-toggle-marketing').checked,
    });
  });

  // Close modal on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
})();
