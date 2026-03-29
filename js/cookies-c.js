(function () {
  'use strict';

  const KEY = 'dr_cookie_consent';
  if (localStorage.getItem(KEY)) return;

  /* ─── SVG Icons ──────────────────────────────────────────────────────── */
  const SVG = {
    shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    bar:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    zap:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    x:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    lock:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  };

  /* ─── CSS ─────────────────────────────────────────────────────────────── */
  const css = `
    #dr-root *, #dr-root *::before, #dr-root *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif;
    }

    /* ══ BANNER ══════════════════════════════════════════════════════════ */
    #dr-banner {
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(24px);
      opacity: 0;
      z-index: 99998;
      width: calc(100vw - 48px);
      max-width: 460px;
      background: #ffffff;
      border-radius: 22px;
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.06),
        0 12px 40px rgba(0, 0, 0, 0.12),
        0 32px 64px rgba(0, 0, 0, 0.08);
      padding: 36px 36px 32px;
      transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.08, 0.64, 1);
    }
    #dr-banner.dr-show { opacity: 1; transform: translateX(-50%) translateY(0); }
    #dr-banner.dr-hide { opacity: 0; transform: translateX(-50%) translateY(14px); pointer-events: none; }

    #dr-banner .dr-b-icon { display: none; }

    #dr-banner .dr-title {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.04em;
      line-height: 1.2;
      margin-bottom: 14px;
    }

    #dr-banner .dr-desc {
      font-size: 15px;
      color: #374151;
      line-height: 1.65;
      margin-bottom: 6px;
    }

    #dr-banner .dr-manage-link {
      display: inline-block;
      font-size: 15px;
      font-weight: 400;
      color: #111827;
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
      text-underline-offset: 3px;
      cursor: pointer;
      margin-bottom: 28px;
      transition: opacity 0.15s;
      background: none;
      border: none;
      padding: 0;
      font-family: inherit;
    }
    #dr-banner .dr-manage-link:hover { opacity: 0.65; }

    #dr-banner .dr-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* ══ BUTTONS ════════════════════════════════════════════════════════ */
    .dr-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      border: none;
      outline: none;
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      letter-spacing: -0.01em;
      border-radius: 9999px;
      transition: all 0.18s ease;
      white-space: nowrap;
      line-height: 1;
    }
    .dr-btn:active { transform: scale(0.975) !important; }

    .dr-btn-accept {
      background: #16a34a;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      padding: 19px 32px;
      width: 100%;
      box-shadow: 0 2px 8px rgba(22,163,74,0.25), 0 6px 20px rgba(22,163,74,0.18);
    }
    .dr-btn-accept:hover {
      background: #15803d;
      box-shadow: 0 4px 12px rgba(22,163,74,0.32), 0 8px 28px rgba(22,163,74,0.22);
    }

    .dr-btn-reject {
      background: rgba(0, 0, 0, 0.04);
      color: #374151;
      font-size: 15px;
      font-weight: 600;
      padding: 19px 32px;
      width: 100%;
      border: 1.5px solid rgba(0, 0, 0, 0.12);
    }
    .dr-btn-reject:hover { background: rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.2); color: #111827; }

    #dr-banner .dr-ghost { display: none; }

    /* ══ OVERLAY ════════════════════════════════════════════════════════ */
    #dr-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
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
    #dr-overlay.dr-show { opacity: 1; pointer-events: all; }

    /* ══ MODAL ══════════════════════════════════════════════════════════ */
    .dr-modal {
      background: linear-gradient(170deg, rgba(255,255,255,0.98) 0%, rgba(248,250,253,0.96) 100%);
      backdrop-filter: blur(80px) saturate(240%) brightness(1.01);
      -webkit-backdrop-filter: blur(80px) saturate(240%) brightness(1.01);
      border: 1px solid rgba(255, 255, 255, 0.65);
      border-bottom-color: rgba(0, 0, 0, 0.06);
      border-radius: 26px;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 1) inset,
        0 -1px 0 rgba(0, 0, 0, 0.03) inset,
        0 4px 12px rgba(0, 0, 0, 0.07),
        0 16px 48px rgba(0, 0, 0, 0.13),
        0 40px 80px rgba(0, 0, 0, 0.08),
        0 80px 120px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-width: 560px;
      max-height: calc(100dvh - 48px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(14px) scale(0.985);
      transition: transform 0.38s cubic-bezier(0.34, 1.08, 0.64, 1);
    }
    #dr-overlay.dr-show .dr-modal { transform: translateY(0) scale(1); }

    /* Modal Header — never scrolls */
    .dr-modal-head {
      flex-shrink: 0;
      padding: 34px 36px 28px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.055);
    }

    .dr-modal-head-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .dr-modal-head-icon {
      width: 46px;
      height: 46px;
      background: rgba(220, 252, 231, 0.8);
      border-radius: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #16a34a;
      flex-shrink: 0;
      margin-top: 1px;
      box-shadow: 0 0 0 6px rgba(22, 163, 74, 0.05), 0 1px 2px rgba(22,163,74,0.08) inset;
    }

    .dr-modal-head-text { flex: 1; min-width: 0; }

    .dr-modal-head h2 {
      font-size: 19px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 0;
      padding-top: 2px;
    }

    .dr-modal-head p {
      font-size: 13px;
      color: #64748b;
      line-height: 1.65;
      margin-top: 7px;
    }

    .dr-x {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.06);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      flex-shrink: 0;
      margin-top: 1px;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      outline: none;
    }
    .dr-x:hover { background: rgba(0, 0, 0, 0.08); border-color: rgba(0,0,0,0.1); color: #4b5563; }
    .dr-x:focus-visible { box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.28); }

    /* Modal Body — scrollable */
    .dr-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 24px 36px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
    }
    .dr-body::-webkit-scrollbar { width: 4px; }
    .dr-body::-webkit-scrollbar-track { background: transparent; }
    .dr-body::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 4px; }

    /* Category Row */
    .dr-cat {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      border-radius: 14px;
      border: 1.5px solid rgba(0, 0, 0, 0.065);
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 1px 2px rgba(0,0,0,0.03), 0 1px 0 rgba(255,255,255,0.8) inset;
      transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
    }
    .dr-cat.dr-on {
      border-color: rgba(22, 163, 74, 0.18);
      background: rgba(240, 253, 244, 0.6);
      box-shadow: 0 1px 2px rgba(22,163,74,0.04), 0 1px 0 rgba(255,255,255,0.8) inset;
    }
    .dr-cat:hover { border-color: rgba(0, 0, 0, 0.1); box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset; }
    .dr-cat.dr-on:hover { border-color: rgba(22, 163, 74, 0.28); box-shadow: 0 2px 8px rgba(22,163,74,0.07), 0 1px 0 rgba(255,255,255,0.8) inset; }

    .dr-cat-icon {
      width: 40px;
      height: 40px;
      border-radius: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .dr-cat-icon.ic-essential  { background: rgba(220,252,231,0.7); color: #16a34a; }
    .dr-cat-icon.ic-analytics  { background: rgba(219,234,254,0.7); color: #3b82f6; }
    .dr-cat-icon.ic-perf       { background: rgba(254,243,199,0.7); color: #d97706; }
    .dr-cat-icon.ic-marketing  { background: rgba(243,232,255,0.7); color: #9333ea; }

    .dr-cat-info {
      flex: 1;
      min-width: 0;
    }

    .dr-cat-name {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }

    .dr-cat-desc {
      font-size: 12.5px;
      color: #6b7280;
      line-height: 1.58;
    }

    .dr-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #15803d;
      background: rgba(187, 247, 208, 0.6);
      border: 1px solid rgba(22, 163, 74, 0.15);
      border-radius: 100px;
      padding: 2.5px 8px 2.5px 6px;
      white-space: nowrap;
    }

    .dr-cat-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
    }

    /* Toggle Switch */
    .dr-toggle { position: relative; width: 46px; height: 26px; flex-shrink: 0; }
    .dr-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
    .dr-track {
      position: absolute;
      inset: 0;
      background: #d1d5db;
      border-radius: 100px;
      cursor: pointer;
      transition: background 0.22s, box-shadow 0.22s;
    }
    .dr-toggle input:checked  ~ .dr-track { background: #16a34a; }
    .dr-toggle input:disabled ~ .dr-track { background: #6ee7b7; cursor: not-allowed; }
    .dr-track::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18), 0 1px 2px rgba(0,0,0,0.1);
      transition: transform 0.24s cubic-bezier(0.34, 1.3, 0.64, 1);
    }
    .dr-toggle input:checked ~ .dr-track::after { transform: translateX(20px); }
    .dr-toggle:focus-within .dr-track { box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.25); }

    /* Modal Footer — never scrolls */
    .dr-foot {
      flex-shrink: 0;
      padding: 20px 36px 36px;
      border-top: 1px solid rgba(0, 0, 0, 0.055);
      background: linear-gradient(to bottom, rgba(248,250,252,0.5), rgba(244,246,250,0.85));
    }

    .dr-foot-btns {
      display: flex;
      gap: 9px;
    }

    .dr-foot-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 14px 18px;
      border-radius: 9999px;
      font-size: 13.5px;
      font-weight: 600;
      letter-spacing: -0.015em;
      cursor: pointer;
      outline: none;
      font-family: inherit;
      white-space: nowrap;
      line-height: 1;
      transition: all 0.18s ease;
      border: none;
    }
    .dr-foot-btn:active { transform: scale(0.975); }

    .dr-foot-reject {
      background: rgba(0, 0, 0, 0.04);
      color: #4b5563;
      border: 1.5px solid rgba(0, 0, 0, 0.1);
      font-weight: 600;
    }
    .dr-foot-reject:hover { background: rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.18); color: #111827; }

    .dr-foot-save {
      background: rgba(0, 0, 0, 0.04);
      color: #334155;
      border: 1.5px solid rgba(0, 0, 0, 0.09);
      font-weight: 600;
    }
    .dr-foot-save:hover { background: rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.16); color: #111827; }

    .dr-foot-accept {
      background: #16a34a;
      color: #fff;
      border: 1.5px solid transparent;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(22,163,74,0.25), 0 6px 20px rgba(22,163,74,0.18);
    }
    .dr-foot-accept:hover {
      background: #15803d;
      box-shadow: 0 4px 12px rgba(22,163,74,0.32), 0 8px 28px rgba(22,163,74,0.22);
    }

    /* ══ MOBILE ═════════════════════════════════════════════════════════ */
    @media (max-width: 540px) {
      #dr-banner {
        bottom: 16px;
        width: calc(100vw - 28px);
        padding: 30px 26px 26px;
        border-radius: 20px;
      }
      #dr-overlay { padding: 16px; }
      .dr-modal { border-radius: 22px; max-height: calc(100dvh - 32px); }
      .dr-modal-head { padding: 28px 26px 24px; }
      .dr-body { padding: 20px 26px 16px; gap: 9px; }
      .dr-cat { padding: 16px 18px; gap: 14px; }
      .dr-cat-icon { width: 36px; height: 36px; }
      .dr-foot { padding: 18px 26px 32px; }
      .dr-foot-btns { gap: 8px; }
      .dr-foot-btn { min-height: 46px; padding: 13px 10px; font-size: 13px; }
    }

    @media (max-width: 380px) {
      .dr-foot-btns { flex-direction: column; }
      .dr-foot-btn { width: 100%; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const root = document.createElement('div');
  root.id = 'dr-root';
  document.body.appendChild(root);

  /* ─── Banner ──────────────────────────────────────────────────────── */
  const banner = document.createElement('div');
  banner.id = 'dr-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div class="dr-title">Choose your cookies</div>
    <div class="dr-desc">Cookies help us enhance your experience, tailor content to your interests, and improve our website.</div>
    <button class="dr-manage-link" id="dr-b-manage">Learn more and manage</button>
    <div class="dr-stack">
      <button class="dr-btn dr-btn-accept" id="dr-b-accept">Accept all</button>
      <button class="dr-btn dr-btn-reject" id="dr-b-reject">Reject non-essential cookies</button>
    </div>
  `;
  root.appendChild(banner);
  requestAnimationFrame(() => setTimeout(() => banner.classList.add('dr-show'), 150));

  /* ─── Modal ───────────────────────────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.id = 'dr-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Cookie preferences');
  overlay.innerHTML = `
    <div class="dr-modal">

      <div class="dr-modal-head">
        <div class="dr-modal-head-row">
          <div class="dr-modal-head-icon">${SVG.shield}</div>
          <div class="dr-modal-head-text">
            <h2>Cookie Preferences</h2>
            <p>Choose which cookies to allow. You can update this at any time from our privacy policy.</p>
          </div>
          <button class="dr-x" id="dr-m-close" aria-label="Close">${SVG.x}</button>
        </div>
      </div>

      <div class="dr-body">

        <div class="dr-cat dr-on">
          <div class="dr-cat-icon ic-essential">${SVG.shield}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-name">Essential <span class="dr-badge">${SVG.lock} Always on</span></div>
            <div class="dr-cat-desc">Required for login, security, and core site functionality. These cannot be disabled.</div>
          </div>
          <div class="dr-cat-right">
            <label class="dr-toggle" aria-label="Essential — always active">
              <input type="checkbox" checked disabled>
              <span class="dr-track"></span>
            </label>
          </div>
        </div>

        <div class="dr-cat" id="dr-row-analytics">
          <div class="dr-cat-icon ic-analytics">${SVG.bar}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-name">Analytics</div>
            <div class="dr-cat-desc">Helps us understand how visitors use the site so we can improve it.</div>
          </div>
          <div class="dr-cat-right">
            <label class="dr-toggle" aria-label="Toggle analytics">
              <input type="checkbox" id="dr-t-analytics">
              <span class="dr-track"></span>
            </label>
          </div>
        </div>

        <div class="dr-cat" id="dr-row-performance">
          <div class="dr-cat-icon ic-perf">${SVG.zap}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-name">Performance</div>
            <div class="dr-cat-desc">Monitors site speed and reliability for a faster, smoother experience.</div>
          </div>
          <div class="dr-cat-right">
            <label class="dr-toggle" aria-label="Toggle performance">
              <input type="checkbox" id="dr-t-performance">
              <span class="dr-track"></span>
            </label>
          </div>
        </div>

        <div class="dr-cat" id="dr-row-marketing">
          <div class="dr-cat-icon ic-marketing">${SVG.target}</div>
          <div class="dr-cat-info">
            <div class="dr-cat-name">Marketing</div>
            <div class="dr-cat-desc">Shows relevant ads and measures campaign effectiveness based on your visits.</div>
          </div>
          <div class="dr-cat-right">
            <label class="dr-toggle" aria-label="Toggle marketing">
              <input type="checkbox" id="dr-t-marketing">
              <span class="dr-track"></span>
            </label>
          </div>
        </div>

      </div>

      <div class="dr-foot">
        <div class="dr-foot-btns">
          <button class="dr-foot-btn dr-foot-reject" id="dr-m-reject">Reject all</button>
          <button class="dr-foot-btn dr-foot-save"   id="dr-m-save">Save preferences</button>
          <button class="dr-foot-btn dr-foot-accept" id="dr-m-accept">Accept all</button>
        </div>
      </div>

    </div>
  `;
  root.appendChild(overlay);

  /* ─── Toggle row highlights ──────────────────────────────────────── */
  ['analytics', 'performance', 'marketing'].forEach(id => {
    const t = document.getElementById(`dr-t-${id}`);
    const r = document.getElementById(`dr-row-${id}`);
    t.addEventListener('change', () => r.classList.toggle('dr-on', t.checked));
  });

  /* ─── Helpers ────────────────────────────────────────────────────── */
  const hideBanner = () => {
    banner.classList.replace('dr-show', 'dr-hide');
    setTimeout(() => banner.remove(), 450);
  };
  const openModal  = () => { overlay.classList.add('dr-show'); document.getElementById('dr-m-close').focus(); };
  const closeModal = () => overlay.classList.remove('dr-show');
  const save = prefs => { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), v: 1, ...prefs })); hideBanner(); closeModal(); };
  const acceptAll  = () => save({ essential: true, analytics: true,  performance: true,  marketing: true  });
  const rejectAll  = () => save({ essential: true, analytics: false, performance: false, marketing: false });

  /* ─── Events ─────────────────────────────────────────────────────── */
  document.getElementById('dr-b-accept').addEventListener('click', acceptAll);
  document.getElementById('dr-b-reject').addEventListener('click', rejectAll);
  document.getElementById('dr-b-manage').addEventListener('click', openModal);
  document.getElementById('dr-m-close') .addEventListener('click', closeModal);
  document.getElementById('dr-m-accept').addEventListener('click', acceptAll);
  document.getElementById('dr-m-reject').addEventListener('click', rejectAll);
  document.getElementById('dr-m-save')  .addEventListener('click', () => save({
    essential:   true,
    analytics:   document.getElementById('dr-t-analytics').checked,
    performance: document.getElementById('dr-t-performance').checked,
    marketing:   document.getElementById('dr-t-marketing').checked,
  }));

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('dr-show')) closeModal(); });

  /* Focus trap */
  overlay.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const els = [...overlay.querySelectorAll('button:not([disabled]), input:not([disabled])')];
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
  });

})();
