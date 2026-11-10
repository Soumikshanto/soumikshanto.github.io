/* Presentation logic only. Edit js/content.js for publication, updates and award entries. */
(function () {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const portfolio = window.PORTFOLIO_CONTENT || { publications: [], updates: [], awards: [] };

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    })[char]);
  }
  function safeUrl(url) {
    try { const parsed = new URL(url); return parsed.protocol === 'https:' ? escapeHtml(parsed.href) : '#'; }
    catch (_) { return '#'; }
  }
  function refreshThemeButton() {
    const dark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#101c17' : '#f7f9f5');
  }
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('soumik-site-theme', root.dataset.theme); } catch (_) {}
    refreshThemeButton();
  });
  refreshThemeButton();

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 870 && !mobileNav.hidden) closeMenu();
  });

  const publicationsList = document.getElementById('publicationsList');
  function publicationMarkup(item) {
    const links = Array.isArray(item.links) ? item.links.map((link) => (
      `<a href="${safeUrl(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a>`
    )).join('') : '';
    return `<article class="publication${item.featured ? ' featured' : ''}">
      <div class="pub-date">${escapeHtml(item.year)}</div>
      <div class="pub-details">
        <div class="pub-category">${escapeHtml(item.type)}</div>
        <h3 class="pub-title">${escapeHtml(item.title)}</h3>
        <p class="pub-authors">${escapeHtml(item.authors)}</p>
        <p class="pub-venue">${escapeHtml(item.venue)}</p>
        <p class="pub-summary">${escapeHtml(item.summary)}</p>
        <div class="pub-links">${links}</div>
      </div>
    </article>`;
  }
  function renderPublications(filter) {
    const selected = (portfolio.publications || []).filter((item) => filter === 'all' || item.category === filter);
    publicationsList.innerHTML = selected.length ? selected.map(publicationMarkup).join('') : '<p>No entries yet in this category.</p>';
  }
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderPublications(button.dataset.filter);
  }));
  renderPublications('all');

  const updatesList = document.getElementById('updatesList');
  updatesList.innerHTML = (portfolio.updates || []).map((item) => `<article class="update-item">
      <span class="update-date">${escapeHtml(item.date)}</span>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></div>
    </article>`).join('');

  const awardsList = document.getElementById('awardsList');
  awardsList.innerHTML = (portfolio.awards || []).map((item) => `<article class="honor-card">
    <h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></article>`).join('');

  document.getElementById('currentYear').textContent = String(new Date().getFullYear());
})();
