/* ============================================================
   PYCHA CATERING — Weekly Menu Popup — Premium Redesign v3
   ============================================================ */

(function () {
  /* ─── Asset paths ─────────────────────────────────────── */
  const scriptTag = document.querySelector('script[src*="weekly-menu-popup.js"]');
  const assetBase = scriptTag ? scriptTag.getAttribute('src').replace('weekly-menu-popup.js', 'generated/') : 'assets/menu-popup/generated/';

  const basePhotos = window.PYCHA_MENU_DATA.categoryPhotos || {};
  const categoryPhotos = {};
  for (const key in basePhotos) {
    categoryPhotos[key] = `${assetBase}${basePhotos[key]}`;
  }

  /* ─── Category icons ──────────────────────────────────── */
  const catIcons = window.PYCHA_MENU_DATA.catIcons || {};

  /* ─── Chef avatar ─────────────────────────────────────── */
  const chefAvatar = 'https://i.imgur.com/f0sl5oR.png';

  /* ─── Fixed structure ─────────────────────────────────── */
  const WEEKS       = ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4'];
  const WEEK_LABELS = window.PYCHA_MENU_DATA.weekLabels || {
    'Tydzień 1': '15.06 - 19.06',
    'Tydzień 2': '22.06 - 26.06',
    'Tydzień 3': '29.06 - 03.07',
    'Tydzień 4': '06.07 - 10.07',
  };
  const TOTAL_WEEKS = WEEKS.length;
  const DAYS_ORDER  = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const DAYS_SHORT  = { 'Poniedziałek': 'Pon', 'Wtorek': 'Wt', 'Środa': 'Śr', 'Czwartek': 'Czw', 'Piątek': 'Pt' };
  const CAT_ORDER   = ['Dania mięsne', 'Dania wege', 'Zupy', 'Mączne', 'Desery', 'Sałatki', 'Makaron', 'Stałe codziennie'];
  const SANDWICHES_KEY = 'Kanapki';

  /* ─── Menu data ───────────────────────────────────────── */
  const weeklyMenu = window.PYCHA_MENU_DATA.weeklyMenu;
  
  const sandwiches = window.PYCHA_MENU_DATA.sandwiches;
  
  /* ─── SVG icons ─────────────────────────────────────────── */
  const svgCalendar = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
  const svgDownload = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const svgClose = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const svgChevronLeft  = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
  const svgChevronRight = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

  /* ─── Price badge parser ──────────────────────────────── */
  function parseDish(text) {
    const m = String(text).match(/^(\d+\s*zł)\s+([\s\S]*)/);
    let price = null;
    let name = String(text).trim();
    
    if (m) {
      price = m[1].trim();
      name = m[2].trim();
    }
    
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    return { price, name };
  }

  /* ─── Render menu items ───────────────────────────────── */
  function renderItems(items, numbered) {
    return items.map((item, i) => {
      let price = '';
      let name = '';
      let weight = '';
      let allergens = '';
      
      // Backwards compatibility with plain strings
      if (typeof item === 'string') {
        const parsed = parseDish(item);
        price = parsed.price;
        name = parsed.name;
      } else {
        price = item.price || '';
        name = item.name || '';
        weight = item.weight || '';
        allergens = item.allergens || '';
      }
      
      const numberBadge = `<span class="wmp-item-num">${i + 1}.</span>`;
      const priceBadge = price ? `<span class="wmp-price-badge-end">${price}</span>` : '';
      
      const weightHtml = weight ? `<span class="wmp-item-weight" style="color: #88a88f; font-size: 0.85em; font-weight: 600; padding-left: 8px;">${weight}</span>` : '';
      const allergensHtml = allergens ? `<div class="wmp-item-allergens" style="font-size: 0.75em; color: #88a88f; margin-top: 2px;">Alergeny: ${allergens}</div>` : '';
      
      return `
        <div class="wmp-menu-item">
          ${numberBadge}
          <div class="wmp-item-body" style="display: flex; flex-direction: column; flex: 1; align-items: flex-start; text-align: left; justify-content: center;">
            <div style="text-align: left;"><span class="wmp-item-name">${name}</span>${weightHtml}</div>
            ${allergensHtml}
          </div>
          ${priceBadge}
        </div>
      `;
    }).join('');
  }

  /* ─── Get non-empty categories for week+day ───────────── */
  function getAvailableCats(weekName, dayName) {
    const dayData = ((weeklyMenu[weekName] || {})[dayName]) || {};
    return CAT_ORDER.filter(cat => {
      const items = dayData[cat];
      return Array.isArray(items) && items.length > 0;
    });
  }

  /* ─── Render category content area ───────────────────── */
  function renderCategoryView(weekName, dayName, catName) {
    const isSandwich = catName === SANDWICHES_KEY;
    const items  = isSandwich
      ? sandwiches
      : (((weeklyMenu[weekName] || {})[dayName] || {})[catName] || []);
    const icon   = catIcons[catName]       || catIcons['Dania mięsne'];
    const photo  = categoryPhotos[catName] || categoryPhotos['Dania mięsne'];

    return `
      <div class="wmp-category-view">
        <div class="wmp-content-card">
          <div class="wmp-list-col">
            <div class="wmp-cat-heading">
              <div class="wmp-cat-heading-icon">
                <img src="${icon}" alt="" loading="lazy" />
              </div>
              <div class="wmp-cat-heading-copy">
                <h2>${catName}</h2>
                <div class="wmp-heading-divider"></div>
              </div>
            </div>
            <div class="wmp-items-list">
              ${renderItems(items, isSandwich)}
            </div>
          </div>
          <div class="wmp-photo-col">
            <img class="wmp-food-photo" src="${photo}" alt="${catName}" loading="lazy" />
          </div>
        </div>
      </div>
    `;
  }

  /* ─── Render sidebar ──────────────────────────────────── */
  function renderSidebar(weekName, dayName, activeCat) {
    const availableCats = [...getAvailableCats(weekName, dayName)];

    const catItems = availableCats.map(cat => `
      <li>
        <button class="wmp-cat-btn${cat === activeCat ? ' active' : ''}" data-cat="${cat}" type="button">
          <div class="wmp-cat-icon-wrap">
            <img src="${catIcons[cat] || catIcons['Dania mięsne']}" alt="" loading="lazy" />
          </div>
          ${cat}
        </button>
      </li>
    `).join('');

    return `
      <aside class="wmp-sidebar">
        <div class="wmp-avatar-wrap">
          <div class="wmp-avatar">
            <img src="${chefAvatar}" alt="Kucharz Pycha Catering" loading="lazy" />
          </div>
        </div>
        <div class="wmp-cat-label">Wybierz kategorię</div>
        <ul class="wmp-cat-list">
          ${catItems}
        </ul>
        <div class="wmp-fresh-box">
          <h4>Świeże składniki</h4>
          <p>Codziennie wybieramy najlepsze produkty od lokalnych dostawców.</p>
        </div>
        <button class="wmp-pdf-btn" type="button" data-print-menu>
          ${svgDownload}
          Pobierz PDF
        </button>
      </aside>
    `;
  }

  /* ─── Render main area ────────────────────────────────── */
  function renderMain(weekIdx, dayIdx, activeCat) {
    const weekName = WEEKS[weekIdx];
    const dayName  = DAYS_ORDER[dayIdx];
    const displayWeek = WEEK_LABELS[weekName] || weekName;

    const dayTabs = DAYS_ORDER.map((d, i) =>
      `<button class="catering-day-btn${i === dayIdx ? ' active' : ''}" data-day-idx="${i}" type="button" aria-label="${d}">${DAYS_SHORT[d]}</button>`
    ).join('');

    return `
      <div class="wmp-main">
        <div class="wmp-header">
          <div class="wmp-title-group">
            <h1 class="wmp-title" style="margin-bottom: 12px;">Menu tygodniowe</h1>
            <div class="wmp-week-nav" id="wmpWeekNav" style="justify-content: flex-start; padding: 0; margin: 0; gap: 12px; transform: translateX(-4px);">
              <button class="wmp-week-arrow" id="wmpWeekPrev" type="button" aria-label="Poprzedni tydzień"${weekIdx <= 0 ? ' disabled' : ''} style="width: 32px; height: 32px; flex: 0 0 32px;">
                ${svgChevronLeft}
              </button>
              
              <div class="wmp-date-row" style="margin: 0; padding: 0; gap: 8px;">
                ${svgCalendar}
                <span id="cateringSubtitle" class="wmp-week-label" style="text-align: left; padding: 0; font-size: 15px; flex: 0 0 auto;">${displayWeek} · ${dayName}</span>
              </div>
              
              <button class="wmp-week-arrow" id="wmpWeekNext" type="button" aria-label="Następny tydzień"${weekIdx >= TOTAL_WEEKS - 1 ? ' disabled' : ''} style="width: 32px; height: 32px; flex: 0 0 32px;">
                ${svgChevronRight}
              </button>
            </div>
          </div>
          <button class="catering-close-btn" id="cateringCloseBtn" aria-label="Zamknij menu">
            ${svgClose}
          </button>
        </div>

        <div class="catering-tabs-container">
          <div class="catering-days" id="cateringDays">
            ${dayTabs}
          </div>
        </div>

        <div class="catering-body" id="cateringBody">
          ${renderCategoryView(weekName, dayName, activeCat)}
        </div>
      </div>
    `;
  }

  /* ─── Focus trap ──────────────────────────────────────── */
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    function handler(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
    modal.addEventListener('keydown', handler);
    return () => modal.removeEventListener('keydown', handler);
  }

  /* ─── Liquid-reveal animation ─────────────────────────── */
  function createLiquidReveal(triggerEl, onComplete) {
    if (!window.gsap || !triggerEl) { onComplete(); return; }

    const rect    = triggerEl.getBoundingClientRect();
    const cx      = rect.left + rect.width  / 2;
    const cy      = rect.top  + rect.height / 2;
    const maxDim  = Math.max(window.innerWidth, window.innerHeight);
    const endSize = maxDim * 2.8;

    const ripple = document.createElement('div');
    ripple.className = 'menu-btn-ripple';
    const startSize = Math.max(rect.width, rect.height);
    Object.assign(ripple.style, {
      width:  startSize + 'px',
      height: startSize + 'px',
      left:   (cx - startSize / 2) + 'px',
      top:    (cy - startSize / 2) + 'px'
    });
    document.body.appendChild(ripple);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ripple, {
          opacity: 0, duration: 0.18,
          onComplete: () => { ripple.remove(); }
        });
        onComplete();
      }
    });

    tl.to(ripple, { scale: endSize / startSize, opacity: 1, duration: 0.55, ease: 'power2.inOut' });
  }

  /* ─── Main setup ──────────────────────────────────────── */
  function setupWeeklyPopup() {
    const overlay = document.getElementById('cateringOverlay');
    const modal   = document.getElementById('cateringModal');

    if (!overlay || !modal) return;

    let activeWeekIdx = 0;
    let activeDayIdx  = 0;
    let activeCat     = CAT_ORDER[0]; /* 'Dania mięsne' */
    let isOpen        = false;
    let openTimeline  = null;
    let closeTimeline = null;
    let removeTrap    = () => {};

    /* ── Ensure activeCat is valid for current week/day ─── */
    function normalizeActiveCat() {
      const weekName  = WEEKS[activeWeekIdx];
      const dayName   = DAYS_ORDER[activeDayIdx];
      const available = [...getAvailableCats(weekName, dayName)];
      if (!available.includes(activeCat)) {
        activeCat = available[0] || CAT_ORDER[0];
      }
    }

    /* ── Full re-render of the modal contents ────────────── */
    function fullRender() {
      normalizeActiveCat();
      const weekName = WEEKS[activeWeekIdx];
      const dayName  = DAYS_ORDER[activeDayIdx];
      modal.innerHTML = renderSidebar(weekName, dayName, activeCat) + renderMain(activeWeekIdx, activeDayIdx, activeCat);
      wireEvents();
    }

    /* ── Wire all interactive elements ───────────────────── */
    function wireEvents() {
      modal.querySelector('#cateringCloseBtn')
        ?.addEventListener('click', closeModal);

      modal.querySelector('#wmpWeekPrev')
        ?.addEventListener('click', () => switchWeek(activeWeekIdx - 1));
      modal.querySelector('#wmpWeekNext')
        ?.addEventListener('click', () => switchWeek(activeWeekIdx + 1));

      modal.querySelectorAll('.catering-day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.dayIdx, 10);
          if (isNaN(idx) || idx === activeDayIdx) return;
          switchDay(idx);
        });
      });

      modal.querySelectorAll('.wmp-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const cat = btn.dataset.cat;
          if (!cat || cat === activeCat) return;
          switchCategory(cat);
        });
      });

      modal.querySelector('[data-print-menu]')
        ?.addEventListener('click', () => window.print());
    }

    /* ── Animate body, execute fn() in the middle ────────── */
    function animateBody(fn, dir) {
      const body = modal.querySelector('#cateringBody');
      if (!body || !window.gsap) { fn(); return; }
      const d = dir || 1;
      gsap.to(body, {
        opacity: 0, y: -5 * d, duration: 0.13, ease: 'power2.in',
        onComplete: () => {
          fn();
          const newBody = modal.querySelector('#cateringBody');
          if (newBody) {
            newBody.scrollTop = 0;
            gsap.fromTo(newBody,
              { opacity: 0, y: 6 * d },
              { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }
            );
          }
        }
      });
    }

    /* ── Switch category (body only, sidebar unchanged) ──── */
    function switchCategory(cat) {
      activeCat = cat;
      modal.querySelectorAll('.wmp-cat-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.cat === cat)
      );
      const weekName = WEEKS[activeWeekIdx];
      const dayName  = DAYS_ORDER[activeDayIdx];
      animateBody(() => {
        const body = modal.querySelector('#cateringBody');
        if (body) body.innerHTML = renderCategoryView(weekName, dayName, activeCat);
      });
    }

    /* ── Switch day ───────────────────────────────────────── */
    function switchDay(idx) {
      activeDayIdx = idx;
      normalizeActiveCat();
      animateBody(() => fullRender());
    }

    /* ── Switch week ──────────────────────────────────────── */
    function switchWeek(newIdx) {
      if (newIdx < 0 || newIdx >= TOTAL_WEEKS) return;
      const prevIdx    = activeWeekIdx;
      activeWeekIdx    = newIdx;
      normalizeActiveCat();
      const dir = newIdx > prevIdx ? 1 : -1;

      /* animate week-nav + body together */
      const nav  = modal.querySelector('#wmpWeekNav');
      const body = modal.querySelector('#cateringBody');
      if (!window.gsap || !body) { fullRender(); return; }

      gsap.to([nav, body].filter(Boolean), {
        opacity: 0, y: -6 * dir, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          fullRender();
          const newBody = modal.querySelector('#cateringBody');
          const newNav  = modal.querySelector('#wmpWeekNav');
          if (newBody) newBody.scrollTop = 0;
          if (newBody) gsap.fromTo(newBody, { opacity: 0, y: 8 * dir }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' });
          if (newNav)  gsap.fromTo(newNav,  { opacity: 0, y: 8 * dir }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' });
        }
      });
    }

    /* ── OPEN modal ─────────────────────────────────────── */
    function openModal(event, triggerEl) {
      if (isOpen) return;
      if (event) event.preventDefault();
      if (openTimeline)  openTimeline.kill();
      if (closeTimeline) closeTimeline.kill();

      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      isOpen = true;

      fullRender();

      const doOpen = () => {
        if (!window.gsap) {
          overlay.style.opacity = '1';
          modal.style.opacity   = '1';
          modal.style.transform = 'none';
          modal.focus();
          removeTrap = trapFocus(modal);
          return;
        }

        openTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            modal.focus();
            removeTrap = trapFocus(modal);
          }
        });

        openTimeline.fromTo(overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.22, ease: 'power2.out' }
        );

        openTimeline.fromTo(modal,
          { y: 32, scale: 0.93, opacity: 0 },
          { y: 0,  scale: 1,    opacity: 1, duration: 0.48, ease: 'back.out(1.1)' },
          '-=0.10'
        );

        openTimeline.fromTo(
          modal.querySelectorAll('.wmp-sidebar, .wmp-title-group, .catering-tabs-container'),
          { y: 10, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.28, stagger: 0.06 },
          '-=0.28'
        );

        openTimeline.fromTo(
          modal.querySelectorAll('.wmp-cat-btn'),
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, stagger: 0.04, ease: 'power2.out' },
          '-=0.20'
        );

        openTimeline.fromTo(
          modal.querySelectorAll('.catering-day-btn'),
          { y: 6, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.22, stagger: 0.035, ease: 'back.out(1.5)' },
          '-=0.18'
        );

        openTimeline.fromTo(
          modal.querySelector('#cateringBody'),
          { y: 14, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.28, ease: 'power2.out' },
          '-=0.14'
        );
      };

      if (triggerEl && window.gsap) {
        createLiquidReveal(triggerEl, doOpen);
      } else {
        doOpen();
      }
    }

    /* ── CLOSE modal ─────────────────────────────────────── */
    function closeModal() {
      if (!isOpen) return;
      if (openTimeline)  openTimeline.kill();
      if (closeTimeline) closeTimeline.kill();

      removeTrap();
      isOpen = false;

      const finish = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (window.gsap) gsap.set(modal, { clearProps: 'all' });
      };

      if (!window.gsap) {
        overlay.style.opacity = '0';
        modal.style.opacity   = '0';
        finish();
        return;
      }

      closeTimeline = gsap.timeline({ onComplete: finish });

      closeTimeline.to(modal.querySelector('#cateringBody'),
        { y: 8, opacity: 0, duration: 0.14, ease: 'power2.in' }
      );

      closeTimeline.to(modal,
        { y: 20, scale: 0.94, opacity: 0, duration: 0.20, ease: 'power3.in' },
        '-=0.06'
      );

      closeTimeline.to(overlay,
        { opacity: 0, duration: 0.16, ease: 'power2.inOut' },
        '-=0.08'
      );
    }

    /* ── Event listeners ─────────────────────────────────── */

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    document.querySelectorAll('#openMenuModal, #openMenuModal2, #openMenuModal3, .mobile-menu-sticky-btn, a[href="/menu"]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openModal(event, trigger);
      }, { capture: true });
    });

    if (new URLSearchParams(window.location.search).get('menuPopup') === '1') {
      document.documentElement.classList.add('weekly-popup-snapshot');
      window.setTimeout(() => openModal(null, null), 150);
    }
  }

  /* ─── Boot ────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWeeklyPopup);
  } else {
    setupWeeklyPopup();
  }
})();
