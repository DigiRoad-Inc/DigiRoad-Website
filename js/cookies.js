(function () {
  'use strict';

  const KEY = 'dr_cookie_consent';
  if (localStorage.getItem(KEY)) return;

  /* ── SVG icons ────────────────────────────────────────────────────────── */
  const SVG = {
    shield: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    bar:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    zap:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    target: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    x:      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  };

  /* ── Styles ───────────────────────────────────────────────────────────── */
  const css = `
    #dr-root *, #dr-root *::before, #dr-root *::after {
      box-sizing: border-box; margin: 0; padding: 0;
      -webkit-font-smoothing: antialiased;
      font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* ════════════════════════════════
       BANNER
    ════════════════════════════════ */
    #dr-banner {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
      z-index: 99998;
      width: calc(100vw - 48px);
      max-width: 480px;
      background: #ffffff;
      border: 1px solid #e8ecf0;
      border-top: 3px solid #10b981;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 16px 40px -8px rgba(0,0,0,0.12);
      overflow: hidden;
      transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34,1.15,0.64,1);
      will-change: transform, opacity;
    }
    #dr-banner.dr-show { opacity:1; transform:translateX(-50%) translateY(0); }
    #dr-banner.dr-hide { opacity:0; transform:translateX(-50%) translateY(12px); pointer-events:none; }

    .dr-banner-body {
      padding: 20px 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .dr-banner-text {}
    .dr-banner-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-bottom: 5px;
    }
    .dr-banner-desc {
      font-size: 12.5px;
      color: #64748b;
      line-height: 1.6;
    }
    .dr-banner-desc a {
      color: #10b981;
      text-decoration: underline;
      text-underline-offset: 2px;
      font-weight: 500;
    }

    .dr-banner-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* ════════════════════════════════
       BUTTONS
    ════════════════════════════════ */
    .dr-btn {
      font-size: 12.5px;
      font-weight: 600;
      border-radius: 7px;
      padding: 8px 16px;
      cursor: pointer;
      border: 1.5px solid transparent;
      line-height: 1;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
      outline: none;
      letter-spacing: -0.01em;
      text-decoration: none;
    }
    .dr-btn:focus-visible { box-shadow: 0 0 0 3px rgba(16,185,129,0.3); }
    .dr-btn:active { transform: scale(0.97); }

    /* Ghost — Reject */
    .dr-btn-ghost {
      background: transparent;
      color: #94a3b8;
      border-color: transparent;
    }
    .dr-btn-ghost:hover { color: #475569; background: #f8fafc; }

    /* Outline — Manage */
    .dr-btn-outline {
      background: #fff;
      color: #475569;
      border-color: #d1d5db;
    }
    .dr-btn-outline:hover { border-color: #9ca3af; color: #1e293b; background: #f9fafb; }

    /* Primary — Accept */
    .dr-btn-primary {
      background: #10b981;
      color: #fff;
      border-color: #10b981;
      box-shadow: 0 1px 3px rgba(16,185,129,0.3);
      margin-left: auto;
    }
    .dr-btn-primary:hover {
      background: #059669;
      border-color: #059669;
      box-shadow: 0 4px 12px rgba(16,185,129,0.4);
      transform: translateY(-1px);
    }

    /* Dark — Save */
    .dr-btn-dark {
      background: #0f172a;
      color: #fff;
      border-color: #0f172a;
    }
    .dr-btn-dark:hover { background: #1e293b; border-color: #1e293b; }

    /* ════════════════════════════════
       OVERLAY
    ════════════════════════════════ */
    #dr-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15,23,42,0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    #dr-overlay.dr-show { opacity:1; pointer-events:all; }

    /* ════════════════════════════════
       MODAL
    ════════════════════════════════ */
    .dr-modal {
      background: #fff;
      border: 1px solid #e8ecf0;
      border-radius: 16px;
      box-shadow: 0 8px 16px -4px rgba(0,0,0,0.1), 0 32px 64px -16px rgba(0,0,0,0.15);
      width: 100%;
      max-width: 440px;
      max-height: 88vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      transform: translateY(16px) scale(0.98);
      transition: transform 0.35s cubic-bezier(0.34,1.15,0.64,1);
      scrollbar-width: thin;
      scrollbar-color: #e2e8f0 transparent;
    }
    #dr-overlay.dr-show .dr-modal { transform: translateY(0) scale(1); }

    /* Modal header */
    .dr-modal-header {
      padding: 20px 20px 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 16px;
    }
    .dr-modal-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-bottom: 3px;
    }
    .dr-modal-sub {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
    }
    .dr-modal-close {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #94a3b8;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.15s;
    }
    .dr-modal-close:hover { background: #e2e8f0; color: #475569; }
    .dr-modal-close:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(16,185,129,0.3); }

    /* Category list */
    .dr-cats { padding: 12px 16px 8px; display: flex; flex-direction: column; gap: 6px; }

    .dr-cat {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #f1f5f9;
      background: #fafafa;
      transition: border-color 0.2s, background 0.2s;
    }
    .dr-cat.dr-on {
      border-color: #bbf7d0;
      background: #f0fdf9;
    }

    .dr-cat-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #94a3b8;
      background: #f1f5f9;
      border: 1px solid #e8ecf0;
      transition: color 0.2s, background 0.2s, border-color 0.2s;
    }
    .dr-cat.dr-on .dr-cat-icon {
      color: #10b981;
      background: #ecfdf5;
      border-color: #a7f3d0;
    }

    .dr-cat-info { flex: 1; min-width: 0; }
    .dr-cat-label {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .dr-cat-desc { font-size: 11.5px; color: #94a3b8; line-height: 1.5; }

    .dr-badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #10b981;
      background: #dcfce7;
      border-radius: 4px;
      padding: 2px 5px;
    }

    /* Toggle */
    .dr-toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; }
    .dr-toggle input { position: absolute; opacity:0; width:0; height:0; }
    .dr-track {
      position: absolute; inset: 0;
      background: #e2e8f0;
      border-radius: 99px;
      transition: background 0.2s;
      cursor: pointer;
    }
    .dr-toggle input:checked ~ .dr-track   { background: #10b981; }
    .dr-toggle input:disabled ~ .dr-track  { background: #86efac; cursor: not-allowed; }
    .dr-track::after {
      content: '';
      position: absolute;
      top: 2px; left: 2px;
      width: 16px; height: 16px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.18);
      transition: transform 0.22s cubic-bezier(0.34,1.3,0.64,1);
    }
    .dr-toggle input:checked ~ .dr-track::after { transform: translateX(16px); }
    .dr-toggle:focus-within .dr-track { box-shadow: 0 0 0 3px rgba(16,185,129,0.25); }

    /* Modal footer */
    .dr-modal-footer {
      padding: 12px 16px 16px;
      display: flex;
      gap: 7px;
      border-top: 1px solid #f1f5f9;
    }
    .dr-modal-footer .dr-btn { flex:1; padding: 9px 14px; font-size:13px; }
    .dr-modal-footer .dr-btn-primary { margin-left: 0; }

    /* Mobile */
    @media (max-width: 480px) {
      #dr-banner { bottom:12px; width:calc(100vw - 24px); }
      .dr-banner-actions { flex-wrap: wrap; }
      .dr-btn-primary { margin-left: 0; width: 100%; }
    }
  `;

  const el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);

  /* ── Root ─────────────────────────────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'dr-root';
  document.body.appendChild(root);

  /* ── Banner ───────────────────────────────────────────────────────────── */
  const banner = document.createElement('div');
  banner.id = 'dr-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="dr-banner-body">
      <div class="dr-banner-text">
        <div class="dr-banner-title">We use cookies</div>
        <div class="dr-banner-desc">We use cookies to improve your experience and understand how you use our site. <a href="privacy.html">Privacy Policy</a>.</div>
      </div>
      <div class="dr-banner-actions">
        <button class="dr-btn dr-btn-ghost"   id="dr-b-reject">Reject All</button>
        <button class="dr-btn dr-btn-outline"  id="dr-b-manage">Manage</button>
        <button class="dr-btn dr-btn-primary"  id="dr-b-accept">Accept All</button>
      </div>
    </div>
  `;
  root.appendChild(banner);
  requestAnimationFrame(() => setTimeout(() => banner.classList.add('dr-show'), 200));

  /* ── Modal ────────────────────────────────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.id = 'dr-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Cookie preferences');
  overlay.innerHTML = `
    <div class="dr-modal">
      <div class="dr-modal-header">
        <div>
          <div class="dr-modal-title">Cookie Preferences</div>
          <div class="dr-modal-sub">Control what data we collect. You can change this at any time.</div>
        </div>
        <button class="dr-modal-close" id="dr-m-close" aria-label="Close">${SVG.x}</button>
      </div>

      <div class="dr-cats">

        <div class="dr-cat dr-on">
          <div class="dr-cat-icon">${SVG.shield}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-label">Essential <span class="dr-badge">Always on</span></div>
            <div class="dr-cat-desc">Required for login, security, and core features. Cannot be disabled.</div>
          </div>
          <label class="dr-toggle" aria-label="Essential — always active">
            <input type="checkbox" checked disabled>
            <span class="dr-track"></span>
          </label>
        </div>

        <div class="dr-cat" id="dr-row-analytics">
          <div class="dr-cat-icon">${SVG.bar}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-label">Analytics</div>
            <div class="dr-cat-desc">Helps us understand how visitors use the site so we can improve it.</div>
          </div>
          <label class="dr-toggle" aria-label="Toggle analytics">
            <input type="checkbox" id="dr-t-analytics">
            <span class="dr-track"></span>
          </label>
        </div>

        <div class="dr-cat" id="dr-row-performance">
          <div class="dr-cat-icon">${SVG.zap}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-label">Performance</div>
            <div class="dr-cat-desc">Monitors site speed and reliability to deliver a faster experience.</div>
          </div>
          <label class="dr-toggle" aria-label="Toggle performance">
            <input type="checkbox" id="dr-t-performance">
            <span class="dr-track"></span>
          </label>
        </div>

        <div class="dr-cat" id="dr-row-marketing">
          <div class="dr-cat-icon">${SVG.target}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-label">Marketing</div>
            <div class="dr-cat-desc">Shows relevant content and measures campaign effectiveness.</div>
          </div>
          <label class="dr-toggle" aria-label="Toggle marketing">
            <input type="checkbox" id="dr-t-marketing">
            <span class="dr-track"></span>
          </label>
        </div>

      </div>

      <div class="dr-modal-footer">
        <button class="dr-btn dr-btn-ghost"   id="dr-m-reject">Reject All</button>
        <button class="dr-btn dr-btn-dark"    id="dr-m-save">Save Preferences</button>
        <button class="dr-btn dr-btn-primary" id="dr-m-accept">Accept All</button>
      </div>
    </div>
  `;
  root.appendChild(overlay);

  /* ── Toggle → row highlight ───────────────────────────────────────────── */
  ['analytics', 'performance', 'marketing'].forEach(id => {
    const t = document.getElementById(`dr-t-${id}`);
    const r = document.getElementById(`dr-row-${id}`);
    t.addEventListener('change', () => r.classList.toggle('dr-on', t.checked));
  });

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const hideBanner = () => {
    banner.classList.replace('dr-show', 'dr-hide');
    setTimeout(() => banner.remove(), 400);
  };
  const openModal  = () => { overlay.classList.add('dr-show'); document.getElementById('dr-m-close').focus(); };
  const closeModal = () => overlay.classList.remove('dr-show');
  const save = prefs => {
    localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), v: 1, ...prefs }));
    hideBanner(); closeModal();
  };
  const acceptAll = () => save({ essential:true, analytics:true, performance:true, marketing:true });
  const rejectAll = () => save({ essential:true, analytics:false, performance:false, marketing:false });

  /* ── Events ───────────────────────────────────────────────────────────── */
  document.getElementById('dr-b-accept').addEventListener('click', acceptAll);
  document.getElementById('dr-b-reject').addEventListener('click', rejectAll);
  document.getElementById('dr-b-manage').addEventListener('click', openModal);
  document.getElementById('dr-m-close') .addEventListener('click', closeModal);
  document.getElementById('dr-m-accept').addEventListener('click', acceptAll);
  document.getElementById('dr-m-reject').addEventListener('click', rejectAll);
  document.getElementById('dr-m-save')  .addEventListener('click', () => save({
    essential: true,
    analytics:   document.getElementById('dr-t-analytics').checked,
    performance: document.getElementById('dr-t-performance').checked,
    marketing:   document.getElementById('dr-t-marketing').checked,
  }));

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('dr-show')) closeModal();
  });

  // Focus trap
  overlay.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const els = [...overlay.querySelectorAll('button:not([disabled]),input:not([disabled])')];
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

})();
