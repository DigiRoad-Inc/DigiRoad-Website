(function () {
  'use strict';

  const STORAGE_KEY = 'dr_cookie_consent';
  if (localStorage.getItem(STORAGE_KEY)) return;

  /* ─────────────────────────────────────────────────────────────────────────
     STYLES
  ───────────────────────────────────────────────────────────────────────── */
  const css = `
    :root {
      --dr-green:        #10b981;
      --dr-green-hover:  #0ea570;
      --dr-glass-bg:     rgba(5, 22, 16, 0.82);
      --dr-glass-border: rgba(16, 185, 129, 0.18);
      --dr-glass-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(16,185,129,0.08), inset 0 1px 0 rgba(209,250,229,0.06);
      --dr-text:         #d1fae5;
      --dr-text-muted:   rgba(209,250,229,0.55);
      --dr-text-faint:   rgba(209,250,229,0.35);
      --dr-surface:      rgba(209,250,229,0.04);
      --dr-surface-hover:rgba(209,250,229,0.07);
      --dr-divider:      rgba(209,250,229,0.07);
      --dr-radius:       14px;
      --dr-radius-sm:    7px;
      --dr-font:         Inter, -apple-system, BlinkMacSystemFont, sans-serif;
      --dr-ease:         cubic-bezier(0.34, 1.2, 0.64, 1);
    }

    #dr-root * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Banner ─────────────────────────────────────────────────────────── */
    #dr-banner {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
      width: calc(100vw - 48px);
      max-width: 720px;
      background: var(--dr-glass-bg);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid var(--dr-glass-border);
      border-radius: var(--dr-radius);
      box-shadow: var(--dr-glass-shadow);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      z-index: 99998;
      font-family: var(--dr-font);
      transition: opacity 0.4s ease, transform 0.5s var(--dr-ease);
      will-change: transform, opacity;
    }
    #dr-banner.dr-in {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    #dr-banner.dr-out {
      opacity: 0;
      transform: translateX(-50%) translateY(16px);
      pointer-events: none;
    }

    .dr-banner-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }
    .dr-banner-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--dr-text);
      letter-spacing: -0.01em;
    }
    .dr-banner-desc {
      font-size: 12.5px;
      color: var(--dr-text-muted);
      line-height: 1.5;
    }
    .dr-banner-desc a {
      color: var(--dr-green);
      text-decoration: none;
    }
    .dr-banner-desc a:hover { text-decoration: underline; }

    .dr-banner-actions {
      display: flex;
      gap: 7px;
      flex-shrink: 0;
      align-items: center;
    }

    /* ── Buttons ────────────────────────────────────────────────────────── */
    .dr-btn {
      font-family: var(--dr-font);
      font-size: 12.5px;
      font-weight: 600;
      border-radius: var(--dr-radius-sm);
      padding: 8px 15px;
      cursor: pointer;
      border: none;
      white-space: nowrap;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease, opacity 0.18s ease, border-color 0.18s ease;
      outline: none;
      position: relative;
    }
    .dr-btn:focus-visible {
      box-shadow: 0 0 0 2px rgba(16,185,129,0.5);
    }
    .dr-btn:active { transform: scale(0.96); }

    /* Accept — solid green */
    .dr-btn-accept {
      background: var(--dr-green);
      color: #fff;
      box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 2px 8px rgba(16,185,129,0.25);
    }
    .dr-btn-accept:hover {
      background: var(--dr-green-hover);
      box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(16,185,129,0.4);
    }

    /* Reject — ghost outline */
    .dr-btn-reject {
      background: transparent;
      color: var(--dr-text-muted);
      border: 1px solid rgba(209,250,229,0.15);
    }
    .dr-btn-reject:hover {
      color: var(--dr-text);
      border-color: rgba(209,250,229,0.3);
      background: var(--dr-surface);
    }

    /* Manage — text/ghost */
    .dr-btn-manage {
      background: var(--dr-surface);
      color: var(--dr-text-muted);
      border: 1px solid transparent;
    }
    .dr-btn-manage:hover {
      background: var(--dr-surface-hover);
      color: var(--dr-text);
    }

    /* Save (inside modal) */
    .dr-btn-save {
      background: var(--dr-green);
      color: #fff;
      flex: 1;
      padding: 10px 16px;
      font-size: 13px;
      box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 2px 8px rgba(16,185,129,0.25);
    }
    .dr-btn-save:hover {
      background: var(--dr-green-hover);
      box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(16,185,129,0.4);
    }

    /* Modal reject */
    .dr-btn-modal-reject {
      background: transparent;
      color: var(--dr-text-faint);
      border: 1px solid rgba(209,250,229,0.1);
      padding: 10px 16px;
      font-size: 13px;
    }
    .dr-btn-modal-reject:hover {
      color: var(--dr-text-muted);
      border-color: rgba(209,250,229,0.22);
      background: var(--dr-surface);
    }

    /* ── Overlay ────────────────────────────────────────────────────────── */
    #dr-overlay {
      position: fixed;
      inset: 0;
      background: rgba(1, 12, 9, 0.6);
      backdrop-filter: blur(8px) saturate(120%);
      -webkit-backdrop-filter: blur(8px) saturate(120%);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: var(--dr-font);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.28s ease;
    }
    #dr-overlay.dr-in {
      opacity: 1;
      pointer-events: all;
    }

    /* ── Modal card ─────────────────────────────────────────────────────── */
    .dr-modal {
      background: var(--dr-glass-bg);
      backdrop-filter: blur(32px) saturate(200%);
      -webkit-backdrop-filter: blur(32px) saturate(200%);
      border: 1px solid var(--dr-glass-border);
      border-radius: 18px;
      box-shadow: var(--dr-glass-shadow);
      width: 100%;
      max-width: 480px;
      max-height: 88vh;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      transform: translateY(20px) scale(0.97);
      transition: transform 0.35s var(--dr-ease);
      scrollbar-width: thin;
      scrollbar-color: rgba(16,185,129,0.2) transparent;
    }
    #dr-overlay.dr-in .dr-modal {
      transform: translateY(0) scale(1);
    }
    .dr-modal::-webkit-scrollbar { width: 4px; }
    .dr-modal::-webkit-scrollbar-track { background: transparent; }
    .dr-modal::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.2); border-radius: 4px; }

    /* Modal header */
    .dr-modal-head {
      padding: 22px 22px 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .dr-modal-head-text h2 {
      font-size: 16px;
      font-weight: 700;
      color: var(--dr-text);
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }
    .dr-modal-head-text p {
      font-size: 12px;
      color: var(--dr-text-muted);
      line-height: 1.55;
    }
    .dr-modal-x {
      background: var(--dr-surface);
      border: 1px solid rgba(209,250,229,0.08);
      color: var(--dr-text-faint);
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 7px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .dr-modal-x:hover { background: var(--dr-surface-hover); color: var(--dr-text); }
    .dr-modal-x:focus-visible { box-shadow: 0 0 0 2px rgba(16,185,129,0.5); outline: none; }

    /* Divider */
    .dr-divider { height: 1px; background: var(--dr-divider); margin: 16px 22px; }

    /* Categories */
    .dr-cats { padding: 0 14px 14px; display: flex; flex-direction: column; gap: 6px; }

    .dr-cat {
      border-radius: 10px;
      border: 1px solid rgba(209,250,229,0.06);
      padding: 13px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--dr-surface);
      transition: border-color 0.2s ease, background 0.2s ease;
    }
    .dr-cat.dr-active {
      border-color: rgba(16,185,129,0.22);
      background: rgba(16,185,129,0.06);
    }

    .dr-cat-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 14px;
    }
    .dr-cat-body { flex: 1; min-width: 0; }
    .dr-cat-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--dr-text);
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 2px;
    }
    .dr-cat-desc {
      font-size: 11.5px;
      color: var(--dr-text-muted);
      line-height: 1.5;
    }
    .dr-badge {
      font-size: 9.5px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(16,185,129,0.7);
      background: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.18);
      border-radius: 4px;
      padding: 1.5px 5px;
    }

    /* Toggle */
    .dr-toggle {
      flex-shrink: 0;
      width: 36px;
      height: 20px;
      position: relative;
      cursor: pointer;
    }
    .dr-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }
    .dr-track {
      position: absolute;
      inset: 0;
      background: rgba(209,250,229,0.1);
      border-radius: 99px;
      border: 1px solid rgba(209,250,229,0.12);
      transition: background 0.22s ease, border-color 0.22s ease;
      cursor: pointer;
    }
    .dr-toggle input:checked ~ .dr-track {
      background: var(--dr-green);
      border-color: var(--dr-green);
    }
    .dr-toggle input:disabled ~ .dr-track {
      cursor: not-allowed;
      background: rgba(16,185,129,0.35);
      border-color: transparent;
    }
    .dr-track::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      transition: transform 0.22s var(--dr-ease);
    }
    .dr-toggle input:checked ~ .dr-track::after {
      transform: translateX(16px);
    }
    .dr-toggle:focus-within .dr-track {
      box-shadow: 0 0 0 2px rgba(16,185,129,0.4);
    }

    /* Modal footer */
    .dr-modal-foot {
      padding: 12px 14px 16px;
      display: flex;
      gap: 7px;
      border-top: 1px solid var(--dr-divider);
    }

    /* ── Responsive ─────────────────────────────────────────────────────── */
    @media (max-width: 600px) {
      #dr-banner {
        bottom: 12px;
        width: calc(100vw - 24px);
        flex-direction: column;
        align-items: flex-start;
        padding: 14px 16px;
        gap: 12px;
      }
      .dr-banner-actions {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      }
      .dr-btn-accept {
        grid-column: 1 / -1;
      }
      .dr-modal { border-radius: 16px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─────────────────────────────────────────────────────────────────────────
     ROOT CONTAINER
  ───────────────────────────────────────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'dr-root';
  document.body.appendChild(root);

  /* ─────────────────────────────────────────────────────────────────────────
     BANNER
  ───────────────────────────────────────────────────────────────────────── */
  const banner = document.createElement('div');
  banner.id = 'dr-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="dr-banner-left">
      <span class="dr-banner-title">We use cookies</span>
      <span class="dr-banner-desc">
        We use cookies to improve your experience and understand site usage.
        Read our <a href="privacy.html">Privacy Policy</a>.
      </span>
    </div>
    <div class="dr-banner-actions">
      <button class="dr-btn dr-btn-reject"  id="dr-b-reject"  aria-label="Reject all cookies">Reject All</button>
      <button class="dr-btn dr-btn-manage"  id="dr-b-manage"  aria-label="Manage cookie preferences">Manage</button>
      <button class="dr-btn dr-btn-accept"  id="dr-b-accept"  aria-label="Accept all cookies">Accept All</button>
    </div>
  `;
  root.appendChild(banner);
  requestAnimationFrame(() => setTimeout(() => banner.classList.add('dr-in'), 150));

  /* ─────────────────────────────────────────────────────────────────────────
     OVERLAY + MODAL
  ───────────────────────────────────────────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.id = 'dr-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Cookie preferences');
  overlay.innerHTML = `
    <div class="dr-modal" id="dr-modal">

      <div class="dr-modal-head">
        <div class="dr-modal-head-text">
          <h2>Cookie Preferences</h2>
          <p>Choose what you allow. You can change your mind at any time.</p>
        </div>
        <button class="dr-modal-x" id="dr-m-close" aria-label="Close preferences">&#x2715;</button>
      </div>

      <div class="dr-divider"></div>

      <div class="dr-cats">

        <div class="dr-cat dr-active" id="dr-cat-essential">
          <div class="dr-cat-icon">🔒</div>
          <div class="dr-cat-body">
            <div class="dr-cat-title">
              Essential
              <span class="dr-badge">Required</span>
            </div>
            <div class="dr-cat-desc">Enable core functions like security and login sessions. The site cannot function without these.</div>
          </div>
          <label class="dr-toggle" aria-label="Essential cookies, always active">
            <input type="checkbox" checked disabled>
            <span class="dr-track"></span>
          </label>
        </div>

        <div class="dr-cat" id="dr-cat-analytics">
          <div class="dr-cat-icon">📊</div>
          <div class="dr-cat-body">
            <div class="dr-cat-title">Analytics</div>
            <div class="dr-cat-desc">Help us understand how visitors interact with our site so we can improve it.</div>
          </div>
          <label class="dr-toggle" aria-label="Analytics cookies">
            <input type="checkbox" id="dr-t-analytics">
            <span class="dr-track"></span>
          </label>
        </div>

        <div class="dr-cat" id="dr-cat-performance">
          <div class="dr-cat-icon">⚡</div>
          <div class="dr-cat-body">
            <div class="dr-cat-title">Performance</div>
            <div class="dr-cat-desc">Allow us to monitor and optimise site speed and reliability for a better experience.</div>
          </div>
          <label class="dr-toggle" aria-label="Performance cookies">
            <input type="checkbox" id="dr-t-performance">
            <span class="dr-track"></span>
          </label>
        </div>

        <div class="dr-cat" id="dr-cat-marketing">
          <div class="dr-cat-icon">🎯</div>
          <div class="dr-cat-body">
            <div class="dr-cat-title">Marketing</div>
            <div class="dr-cat-desc">Used to show relevant content and measure the effectiveness of campaigns across channels.</div>
          </div>
          <label class="dr-toggle" aria-label="Marketing cookies">
            <input type="checkbox" id="dr-t-marketing">
            <span class="dr-track"></span>
          </label>
        </div>

      </div>

      <div class="dr-modal-foot">
        <button class="dr-btn dr-btn-modal-reject" id="dr-m-reject" aria-label="Reject all non-essential cookies">Reject All</button>
        <button class="dr-btn dr-btn-save"          id="dr-m-save"   aria-label="Save cookie preferences">Save Preferences</button>
        <button class="dr-btn dr-btn-accept"        id="dr-m-accept" aria-label="Accept all cookies" style="flex:1;padding:10px 16px;font-size:13px;">Accept All</button>
      </div>

    </div>
  `;
  root.appendChild(overlay);

  /* ─────────────────────────────────────────────────────────────────────────
     TOGGLE → active state on category row
  ───────────────────────────────────────────────────────────────────────── */
  ['analytics', 'performance', 'marketing'].forEach(id => {
    const toggle = document.getElementById(`dr-t-${id}`);
    const cat    = document.getElementById(`dr-cat-${id}`);
    toggle.addEventListener('change', () => cat.classList.toggle('dr-active', toggle.checked));
  });

  /* ─────────────────────────────────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────────────────────────────────── */
  function hideBanner() {
    banner.classList.replace('dr-in', 'dr-out');
    setTimeout(() => banner.remove(), 420);
  }

  function openModal() {
    overlay.classList.add('dr-in');
    document.getElementById('dr-m-close').focus();
  }

  function closeModal() {
    overlay.classList.remove('dr-in');
  }

  function save(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), v: 1, ...prefs }));
    hideBanner();
    closeModal();
  }

  function acceptAll() {
    save({ essential: true, analytics: true, performance: true, marketing: true });
  }

  function rejectAll() {
    save({ essential: true, analytics: false, performance: false, marketing: false });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     EVENTS
  ───────────────────────────────────────────────────────────────────────── */
  document.getElementById('dr-b-accept').addEventListener('click', acceptAll);
  document.getElementById('dr-b-reject').addEventListener('click', rejectAll);
  document.getElementById('dr-b-manage').addEventListener('click', openModal);

  document.getElementById('dr-m-close').addEventListener('click', closeModal);
  document.getElementById('dr-m-accept').addEventListener('click', acceptAll);
  document.getElementById('dr-m-reject').addEventListener('click', rejectAll);

  document.getElementById('dr-m-save').addEventListener('click', () => {
    save({
      essential:   true,
      analytics:   document.getElementById('dr-t-analytics').checked,
      performance: document.getElementById('dr-t-performance').checked,
      marketing:   document.getElementById('dr-t-marketing').checked,
    });
  });

  // Close on backdrop click
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('dr-in')) closeModal();
  });

  // Trap focus inside modal
  overlay.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll('button, input:not([disabled]), [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  });

})();
