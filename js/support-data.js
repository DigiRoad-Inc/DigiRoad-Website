/**
 * support-data.js — DigiRoad Support Content Registry
 *
 * This file is the single source of truth for all support content.
 * Add articles, categories, and product topics here; the renderer
 * below hydrates support.html using the established design system.
 *
 * ─────────────────────────────────────────────────────────────────
 *
 * DATA STRUCTURES
 * ───────────────
 *
 * CATEGORY  (shown in "Browse by category" grid)
 * {
 *   id:       string   — unique slug, matches explore page filename
 *   title:    string
 *   desc:     string
 *   href:     string   — link to explore page (e.g. "support-ecampus.html")
 *   iconSvg:  string   — raw SVG string for the card icon (20×20, stroke="#10b981")
 * }
 *
 * POPULAR ARTICLE  (shown in "Popular help topics" grid)
 * {
 *   title:  string
 *   href:   string   — link to the article page or anchor
 * }
 *
 * PRODUCT  (shown in "Help by product" tabs)
 * {
 *   id:     string   — tab slug (e.g. "ecampus")
 *   label:  string   — tab button text
 *   topics: TOPIC[]
 * }
 *
 * TOPIC  (card inside a product tab pane)
 * {
 *   label:   string
 *   iconSvg: string   — raw SVG string (16×16, stroke="#10b981")
 * }
 *
 * ─────────────────────────────────────────────────────────────────
 *
 * TO SHOW A SECTION: set its `enabled` flag to true once content is ready.
 * TO ADD CONTENT:    push items into the arrays below.
 */

/* ── Arrow SVG reused in article links ───────────────────────────── */
var ARROW_SVG = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ════════════════════════════════════════════════════════════════════
   §2  CATEGORIES
════════════════════════════════════════════════════════════════════ */

/* Set each section to true when its content is ready */
var SUPPORT_ENABLED = {
  categories: false,
  popular:    false,
  products:   false
};

var SUPPORT_CATEGORIES = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    desc: 'Set up your institution, onboard your team, and configure your first DigiRoad integration.',
    href: 'support-getting-started.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2Z" stroke="#10b981" stroke-width="1.3" stroke-linejoin="round"/><path d="M10 2v12M3 6l7 4 7-4" stroke="#10b981" stroke-width="1.1" stroke-linecap="round"/></svg>'
  },
  {
    id: 'ecampus',
    title: 'eCampus',
    desc: 'Student digital experience, campus services, communication channels, and admin configuration.',
    href: 'support-ecampus.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#10b981" stroke-width="1.2"/><path d="M4 8h8M4 5.5h5M4 10.5h6" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>'
  },
  {
    id: 'unipay',
    title: 'UniPay',
    desc: 'Cross-border payments, wallets, fee collection, settlement, and transaction reconciliation.',
    href: 'support-unipay.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="12" height="8" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M5 6V5a3 3 0 016 0v1" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="10" r="1.5" fill="#10b981" fill-opacity="0.5"/></svg>'
  },
  {
    id: 'connect',
    title: 'DigiRoad Connect',
    desc: 'API infrastructure, data exchange, webhooks, integrations, and third-party connectors.',
    href: 'support-connect.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6" stroke="#10b981" stroke-width="1.2"/><path d="M7 10h6M10 7v6" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/><circle cx="10" cy="10" r="1.5" fill="#10b981" fill-opacity="0.3"/></svg>'
  },
  {
    id: 'account',
    title: 'Account & Access',
    desc: 'User roles, permissions, SSO configuration, team management, and billing settings.',
    href: 'support-account.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7.5" r="3.5" stroke="#10b981" stroke-width="1.3"/><path d="M3 17c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#10b981" stroke-width="1.3" stroke-linecap="round"/></svg>'
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    desc: 'Data protection, access auditing, regulatory compliance, and incident reporting.',
    href: 'support-security.html',
    iconSvg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.5L3 5V9C3 13 5.7 16.5 10 17.5C14.3 16.5 17 13 17 9V5L10 1.5Z" stroke="#10b981" stroke-width="1.3" stroke-linejoin="round"/><path d="M7 10L9 12L13 8" stroke="#10b981" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  }
];

/* ════════════════════════════════════════════════════════════════════
   §3  POPULAR ARTICLES
════════════════════════════════════════════════════════════════════ */


var SUPPORT_POPULAR_ARTICLES = [
  { title: 'Setting up your institution',        href: '#' },
  { title: 'How UniPay transactions work',       href: '#' },
  { title: 'Managing student identity',          href: '#' },
  { title: 'Access permissions and roles',       href: '#' },
  { title: 'Integration basics',                 href: '#' },
  { title: 'Troubleshooting payment failures',   href: '#' },
  { title: 'Connecting your SIS via API',        href: '#' },
  { title: 'Compliance documentation requests',  href: '#' }
];

/* ════════════════════════════════════════════════════════════════════
   §4  HELP BY PRODUCT
════════════════════════════════════════════════════════════════════ */


var SUPPORT_PRODUCTS = [
  {
    id: 'ecampus',
    label: 'eCampus',
    topics: [
      { label: 'Managing students',        iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="#10b981" stroke-width="1.2"/><path d="M2.5 13.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Communication channels',  iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M2 8l6 3 6-3" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Events & services',       iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M5 8h6M5 5.5h3M5 10.5h4" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Access control & SSO',    iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4V8C2 11.5 4.7 14.5 8 15.5C11.3 14.5 14 11.5 14 8V4L8 1.5Z" stroke="#10b981" stroke-width="1.2" stroke-linejoin="round"/></svg>' },
      { label: 'Notifications & alerts',  iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#10b981" stroke-width="1.2"/><circle cx="8" cy="8" r="2.5" stroke="#10b981" stroke-width="1.1"/></svg>' },
      { label: 'Reporting & analytics',   iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h7M3 12h9" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' }
    ]
  },
  {
    id: 'unipay',
    label: 'UniPay',
    topics: [
      { label: 'Payment processing',           iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="8" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M2 9h12" stroke="#10b981" stroke-width="1.2"/></svg>' },
      { label: 'Wallets & balances',           iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#10b981" stroke-width="1.2"/><path d="M8 5v3.5l2 2" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Transactions & history',       iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 3l5 5-5 5" stroke="#10b981" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { label: 'Settlement & reconciliation',  iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M5 7.5h6M5 10h4" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Cross-border transfers',       iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 10c0-3.87 2.69-7 6-7s6 3.13 6 7" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/><path d="M2 10h12" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Compliance & KYC',             iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4V8C2 11.5 4.7 14.5 8 15.5C11.3 14.5 14 11.5 14 8V4L8 1.5Z" stroke="#10b981" stroke-width="1.2"/><path d="M5.5 8L7 9.5L10.5 6" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' }
    ]
  },
  {
    id: 'connect',
    label: 'Connect',
    topics: [
      { label: 'API reference',              iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Data exchange',              iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2" stroke="#10b981" stroke-width="1.2"/><circle cx="12" cy="4" r="2" stroke="#10b981" stroke-width="1.2"/><circle cx="12" cy="12" r="2" stroke="#10b981" stroke-width="1.2"/><path d="M6 8h2.5M9.5 5l1 1.5M9.5 11l1-1.5" stroke="#10b981" stroke-width="1.1" stroke-linecap="round"/></svg>' },
      { label: 'Webhooks',                   iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5.5l6 3 6-3M8 2v11" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Third-party integrations',   iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="4.5" width="6" height="7" rx="1.5" stroke="#10b981" stroke-width="1.2"/><rect x="8.5" y="4.5" width="6" height="7" rx="1.5" stroke="#10b981" stroke-width="1.2"/><path d="M7.5 8h1" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Authentication & tokens',    iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="6" width="10" height="7" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M6 6V5a2 2 0 014 0v1" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' },
      { label: 'Rate limits & quotas',       iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h7M3 12h9" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg>' }
    ]
  }
];

/* ════════════════════════════════════════════════════════════════════
   RENDERERS  — do not edit below unless changing design
════════════════════════════════════════════════════════════════════ */

(function () {

  /* ── §2 Categories ─────────────────────────────────────────────── */
  if (SUPPORT_ENABLED.categories) {
    var catGrid = document.getElementById('sp-cat-grid');
    if (catGrid) {
      var catHtml = '';
      SUPPORT_CATEGORIES.forEach(function (cat, i) {
        catHtml +=
          '<a href="' + cat.href + '" class="sp-cat-card" data-anim data-d="' + (i + 1) + '">' +
            '<div class="sp-cat-icon">' + cat.iconSvg + '</div>' +
            '<h3>' + cat.title + '</h3>' +
            '<p>' + cat.desc + '</p>' +
            '<div class="sp-cat-arrow">Explore ' + ARROW_SVG + '</div>' +
          '</a>';
      });
      catGrid.innerHTML = catHtml;
      document.getElementById('sp-categories-wrap').style.display = '';
    }
  }

  /* ── §3 Popular articles ────────────────────────────────────────── */
  if (SUPPORT_ENABLED.popular) {
    var popularGrid = document.getElementById('sp-popular-grid');
    if (popularGrid) {
      var popularHtml = '';
      SUPPORT_POPULAR_ARTICLES.forEach(function (article) {
        popularHtml +=
          '<a href="' + article.href + '" class="sp-article-link">' +
            '<span class="sp-article-dot"></span>' +
            article.title +
            ARROW_SVG +
          '</a>';
      });
      popularGrid.innerHTML = popularHtml;
      document.getElementById('sp-popular-wrap').style.display = '';
    }
  }

  /* ── §4 Help by product ─────────────────────────────────────────── */
  if (SUPPORT_ENABLED.products) {
    var tabsEl  = document.getElementById('sp-product-tabs');
    var panesEl = document.getElementById('sp-product-panes');

    if (tabsEl && panesEl) {
      var tabsHtml  = '';
      var panesHtml = '';
      SUPPORT_PRODUCTS.forEach(function (product, pi) {
        var isFirst = pi === 0;
        tabsHtml +=
          '<button class="sp-tab-btn' + (isFirst ? ' active' : '') + '" data-tab="' + product.id + '">' +
            product.label +
          '</button>';

        var topicsHtml = '';
        product.topics.forEach(function (topic, ti) {
          topicsHtml +=
            '<div class="sp-topic-card" data-anim data-d="' + (ti + 1) + '">' +
              '<div class="sp-topic-icon">' + topic.iconSvg + '</div>' +
              topic.label +
            '</div>';
        });
        panesHtml +=
          '<div class="sp-tab-pane' + (isFirst ? ' active' : '') + '" id="tab-' + product.id + '">' +
            topicsHtml +
          '</div>';
      });
      tabsEl.innerHTML  = tabsHtml;
      panesEl.innerHTML = panesHtml;

      /* Re-attach tab click logic */
      tabsEl.querySelectorAll('.sp-tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          tabsEl.querySelectorAll('.sp-tab-btn').forEach(function (b) { b.classList.remove('active'); });
          panesEl.querySelectorAll('.sp-tab-pane').forEach(function (p) { p.classList.remove('active'); });
          btn.classList.add('active');
          var pane = document.getElementById('tab-' + btn.dataset.tab);
          if (pane) {
            pane.classList.add('active');
            pane.querySelectorAll('[data-anim]').forEach(function (el) {
              el.classList.remove('visible');
              setTimeout(function () { el.classList.add('visible'); }, 20);
            });
          }
        });
      });

      document.getElementById('sp-products-wrap').style.display = '';
    }
  }

})();
