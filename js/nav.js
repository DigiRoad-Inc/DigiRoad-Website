(function () {

  /* ─── Global nav HTML ────────────────────────────────────────────────────
     Single source of truth — edit here, reflects on every page.
  ──────────────────────────────────────────────────────────────────────── */
  var NAV_HTML = '\
<nav class="nav-float">\
  <a href="index.html" class="nav-float-logo">DigiRoad</a>\
  <ul class="nav-float-links">\
\
    <li class="nav-float-item has-dd" id="solutionsItem">\
      <button class="nav-float-link" id="solutionsBtn">Solutions\
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="nav-chevron"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\
      </button>\
      <div class="nav-dropdown" id="solutionsDropdown">\
        <div class="dd-left dd-full dd-grid-3">\
          <a href="ecampus.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#10b981" stroke-width="1.2"/><path d="M4 8h8M4 5.5h5M4 10.5h6" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">eCampus</span><span class="dd-item-desc">Student digital experience platform</span></div>\
          </a>\
          <a href="connect.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#10b981" stroke-width="1.2"/><path d="M5 8h6M8 5v6" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="8" r="1.5" fill="#10b981" fill-opacity="0.3"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Connect</span><span class="dd-item-desc">API infrastructure for institutions</span></div>\
          </a>\
          <a href="unipay.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M5 6V5a3 3 0 016 0v1" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="10" r="1.5" fill="#10b981" fill-opacity="0.5"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">UniPay</span><span class="dd-item-desc">Cross-border student payment rails</span></div>\
          </a>\
        </div>\
      </div>\
    </li>\
\
    <li class="nav-float-item has-dd" id="resourcesItem">\
      <button class="nav-float-link" id="resourcesBtn">Resources\
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="nav-chevron"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\
      </button>\
      <div class="nav-dropdown" id="resourcesDropdown">\
        <div class="dd-left dd-full dd-grid-2">\
          <a href="docs.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#10b981" stroke-width="1.2"/><path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Documentation</span><span class="dd-item-desc">API references and integration guides</span></div>\
          </a>\
          <a href="security.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4V8C2 11.5 4.7 14.7 8 15.5C11.3 14.7 14 11.5 14 8V4L8 1.5Z" stroke="#10b981" stroke-width="1.2" stroke-linejoin="round"/><path d="M5.5 8L7 9.5L10.5 6" stroke="#10b981" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Security</span><span class="dd-item-desc">Institutional-grade protection</span></div>\
          </a>\
          <a href="support.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#10b981" stroke-width="1.2"/><path d="M8 5v3.5l2 2" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Get Support</span><span class="dd-item-desc">Help centre and tickets</span></div>\
          </a>\
          <a href="partner.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6 11.5L13 4.5" stroke="#10b981" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Become a Partner</span><span class="dd-item-desc">Join the DigiRoad partner programme</span></div>\
          </a>\
        </div>\
      </div>\
    </li>\
\
    <li class="nav-float-item has-dd" id="companyItem">\
      <button class="nav-float-link" id="companyBtn">Company\
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="nav-chevron"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\
      </button>\
      <div class="nav-dropdown" id="companyDropdown">\
        <div class="dd-left dd-full dd-grid-2">\
          <a href="about.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v11h14V7L10 2Z" stroke="#10b981" stroke-width="1.3" stroke-linejoin="round"/><rect x="7.5" y="12" width="5" height="6" rx="1" stroke="#10b981" stroke-width="1.3"/><rect x="7" y="9" width="2.5" height="2" rx="0.5" fill="#10b981" fill-opacity="0.4"/><rect x="10.5" y="9" width="2.5" height="2" rx="0.5" fill="#10b981" fill-opacity="0.4"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">About Us</span><span class="dd-item-desc">Our story, mission and values</span></div>\
          </a>\
          <a href="jobs.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="8" width="14" height="10" rx="2" stroke="#10b981" stroke-width="1.3"/><path d="M7 8V6a3 3 0 016 0v2" stroke="#10b981" stroke-width="1.3" stroke-linecap="round"/><path d="M3 13h14" stroke="#10b981" stroke-width="1.3"/><circle cx="10" cy="15.5" r="1.5" fill="#10b981" fill-opacity="0.5"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Jobs</span><span class="dd-item-desc">Join the DigiRoad team</span></div>\
          </a>\
          <a href="newsroom.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="13" height="13" rx="2" stroke="#10b981" stroke-width="1.3"/><rect x="15" y="6" width="3" height="9" rx="1.5" stroke="#10b981" stroke-width="1.3"/><path d="M5 9h7M5 12h7M5 15h4" stroke="#10b981" stroke-width="1.3" stroke-linecap="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Newsroom</span><span class="dd-item-desc">Latest news and announcements</span></div>\
          </a>\
          <a href="contact.html" class="dd-item">\
            <div class="dd-item-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="11" rx="2" stroke="#10b981" stroke-width="1.3"/><path d="M2 10l8 4 8-4" stroke="#10b981" stroke-width="1.3" stroke-linecap="round"/></svg></div>\
            <div class="dd-item-text"><span class="dd-item-name">Contact Us</span><span class="dd-item-desc">Let\'s build something together</span></div>\
          </a>\
        </div>\
      </div>\
    </li>\
\
    <li class="nav-float-item">\
      <a href="pricing.html" class="nav-float-link">Pricing</a>\
    </li>\
\
  </ul>\
  <div class="nav-float-actions">\
    <a href="demo.html" class="nav-float-cta">Request a Demo</a>\
  </div>\
  <button class="nav-hamburger" id="navHamburger" aria-label="Open menu">\
    <span></span><span></span><span></span>\
  </button>\
</nav>\
<div class="nav-mobile-menu" id="navMobileMenu">\
  <div class="mobile-section">\
    <div class="mobile-section-title">Solutions</div>\
    <a href="ecampus.html" class="mobile-item">eCampus</a>\
    <a href="connect.html" class="mobile-item">Connect</a>\
    <a href="unipay.html" class="mobile-item">UniPay</a>\
  </div>\
  <div class="mobile-section">\
    <div class="mobile-section-title">Resources</div>\
    <a href="docs.html" class="mobile-item">Documentation</a>\
    <a href="security.html" class="mobile-item">Security</a>\
    <a href="support.html" class="mobile-item">Get Support</a>\
    <a href="partner.html" class="mobile-item">Become a Partner</a>\
  </div>\
  <div class="mobile-section">\
    <div class="mobile-section-title">Company</div>\
    <a href="about.html" class="mobile-item">About Us</a>\
    <a href="jobs.html" class="mobile-item">Jobs</a>\
    <a href="newsroom.html" class="mobile-item">Newsroom</a>\
    <a href="contact.html" class="mobile-item">Contact Us</a>\
  </div>\
  <div class="mobile-section">\
    <a href="pricing.html" class="mobile-item">Pricing</a>\
  </div>\
  <a href="demo.html" class="nav-float-cta mobile-cta">Request a Demo</a>\
</div>';

  /* ─── Inject into placeholder ────────────────────────────────────────── */
  var wrap = document.getElementById('navFloat');
  if (wrap) {
    wrap.innerHTML = NAV_HTML;
  }

  /* ─── Scroll — increase blur on scroll ───────────────────────────────── */
  var nav = document.querySelector('.nav-float');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ─── Mobile hamburger ───────────────────────────────────────────────── */
  var burger = document.getElementById('navHamburger');
  var mMenu  = document.getElementById('navMobileMenu');
  if (burger && mMenu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mMenu.classList.toggle('open');
    });
  }

  /* ─── Close mobile menu on outside click ────────────────────────────── */
  document.addEventListener('click', function (e) {
    var navWrap = document.getElementById('navFloat');
    if (navWrap && !navWrap.contains(e.target)) {
      if (burger) burger.classList.remove('open');
      if (mMenu)  mMenu.classList.remove('open');
    }
  });

})();
