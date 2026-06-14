/* ============================================================
   PYCHA CATERING — Weekly Menu Popup — Premium Redesign v3
   ============================================================ */

(function () {
  /* ─── Asset paths ─────────────────────────────────────── */
  const assetBase = 'assets/menu-popup/generated/';
  const images = {
    main:    `https://i.imgur.com/rjXAw0a.jpeg`,
    soup:    `${assetBase}tomato-soup.jpg`,
    small:   `${assetBase}chicken-burger.jpg`,
    salad:   `${assetBase}greek-salad.jpg`,
    dessert: `${assetBase}chocolate-dessert.jpg`,
    drink:   `assets/menu-popup/smoothie-bowl.jpg`,
  };

  /* ─── Category icons ──────────────────────────────────── */
  const iconBase = 'assets/menu-popup/category-icons/';
  const catIcons = {
    main:    `https://i.imgur.com/mk96eYb.png`,
    soup:    `https://i.imgur.com/fQPU7Q3.png`,
    small:   `https://i.imgur.com/5dmembW.png`,
    salad:   `https://i.imgur.com/VcumTo0.png`,
    dessert: `https://i.imgur.com/hMAugNx.png`,
    drink:   `https://i.imgur.com/LLotBhS.png`,
  };

  /* ─── Chef avatar (3D friendly style) ───────────────── */
  const chefAvatar = 'assets/menu-popup/chef-avatar-cutout.png';

  /* ─── Days data ───────────────────────────────────────── */
  const days = [
    { key: 'Poniedziałek', short: 'Pon',  title: 'Poniedziałek', date: '08.06.2026' },
    { key: 'Wtorek',       short: 'Wt',   title: 'Wtorek',       date: '09.06.2026' },
    { key: 'Środa',        short: 'Śr',   title: 'Środa',        date: '10.06.2026' },
    { key: 'Czwartek',     short: 'Czw',  title: 'Czwartek',     date: '11.06.2026' },
    { key: 'Piątek',       short: 'Pt',   title: 'Piątek',       date: '12.06.2026' },
    { key: 'Sobota',       short: 'Sob',  title: 'Sobota',       date: '13.06.2026' },
    { key: 'Niedziela',    short: 'Nd',   title: 'Niedziela',    date: '14.06.2026' },
  ];

  /* ─── Categories ──────────────────────────────────────── */
  const categories = [
    { key: 'main',    label: 'Dania główne' },
    { key: 'soup',    label: 'Zupy' },
    { key: 'small',   label: 'Przystawki' },
    { key: 'salad',   label: 'Sałatki' },
    { key: 'dessert', label: 'Desery' },
    { key: 'drink',   label: 'Napoje' },
  ];

  /* ─── Menu data ───────────────────────────────────────── */
  const menu = {
    main: [
      ['1.', 'De volaille, ziemniaki puree, buraki zasmażane', '21,50 zł'],
      ['2.', 'Potrawka wołowa z kremowym puree i warzywami', '24,00 zł'],
      ['3.', 'Pierś z kurczaka z sosem śmietanowym, kluski śląskie, modra kapusta', '26,50 zł'],
      ['4.', 'Łosoś pieczony z cytryną i ziołami, kasza bulgur, brokuły', '28,50 zł'],
    ],
    soup: [
      ['1.', 'Pomidorowa z makaronem (na wywarze warzywnym)', '11,00 zł'],
      ['2.', 'Serowa z kurczakiem i grzankami', '12,00 zł'],
      ['3.', 'Chłodnik litewski z burakiem i śmietaną', '12,00 zł'],
      ['4.', 'Krem z dyni z pestkami słonecznika', '12,50 zł'],
    ],
    small: [
      ['1.', 'Wątróbka drobiowa z jabłkiem cynamonowym, ziemniaki pieczone, modra kapusta', '18,00 zł'],
      ['2.', 'Tajskie Pad Kra Pao z udkiem indyczym, basmati, jajko sadzone', '19,00 zł'],
      ['3.', 'Pożarski, ziemniaki puree, marchewka', '18,00 zł'],
      ['4.', 'Tortilla z szarpaną wieprzowiną i warzywami, dip cheddar', '17,00 zł'],
    ],
    salad: [
      ['1.', 'Sałatka grecka z fetą i oliwkami', '14,00 zł'],
      ['2.', 'Burak z pomarańczą, Blue Pote, kurczak, winogrono', '14,50 zł'],
      ['3.', 'Szpinak, gruszka z pomarańczą, feta, łosoś z jajem', '19,50 zł'],
      ['4.', 'Falafel bowl z hummusem i świeżymi warzywami', '20,50 zł'],
    ],
    dessert: [
      ['1.', 'Kokosowa owsianka ze śliwką i ekspandowanym amarantusem', '10,50 zł'],
      ['2.', 'Tapioka z mlekiem kokosowym i mango', '10,50 zł'],
      ['3.', 'Jogurt z crunchy i musem mango marakuja', '10,00 zł'],
      ['4.', 'Deser brzoskwiniowy z amaretto', '11,00 zł'],
    ],
    drink: [
      ['1.', 'Woda mineralna 0,5 l', '3,50 zł'],
      ['2.', 'Sok owocowy świeżo wyciskany', '7,00 zł'],
      ['3.', 'Smoothie bowl truskawkowe', '10,00 zł'],
      ['4.', 'Lemon ice tea z miętą', '8,00 zł'],
    ],
  };

  /* ─── SVG icons ───────────────────────────────────────── */
  const svgCalendar = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
  const svgDownload = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const svgClose = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  /* Decorative branch near photo */
  const svgBranch = `<svg class="wmp-photo-branch" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M110 10 C80 50 40 100 20 180" stroke="#3F8F35" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round"/>
    <path d="M100 30 C75 35 65 20 70 10 C75 0 95 10 100 30 Z" fill="#3F8F35" opacity="0.25"/>
    <path d="M85 60 C55 60 45 40 55 30 C65 20 85 40 85 60 Z" fill="#3F8F35" opacity="0.20"/>
    <path d="M65 100 C35 95 30 75 40 65 C50 55 70 80 65 100 Z" fill="#3F8F35" opacity="0.15"/>
    <path d="M45 140 C20 130 20 110 30 105 C40 100 55 120 45 140 Z" fill="#3F8F35" opacity="0.12"/>
  </svg>`;

  /* Laurel wreath SVG for the chef avatar */
  const svgLaurel = `<svg class="wmp-avatar-laurel" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Left laurel branch -->
    <path d="M40 190 C30 150 30 110 50 70 C60 50 75 35 95 25" stroke="#3F8F35" stroke-width="2" fill="none" opacity="0.30" stroke-linecap="round"/>
    <path d="M45 150 C30 145 25 130 35 125 C45 120 55 135 45 150 Z" fill="#3F8F35" opacity="0.15"/>
    <path d="M38 120 C25 110 25 95 35 90 C45 85 55 100 38 120 Z" fill="#3F8F35" opacity="0.15"/>
    <path d="M45 90 C35 75 40 60 50 55 C60 50 65 70 45 90 Z" fill="#3F8F35" opacity="0.12"/>
    <path d="M60 65 C55 50 65 35 75 35 C85 35 85 55 60 65 Z" fill="#3F8F35" opacity="0.10"/>
    
    <!-- Right laurel branch -->
    <path d="M180 190 C190 150 190 110 170 70 C160 50 145 35 125 25" stroke="#3F8F35" stroke-width="2" fill="none" opacity="0.30" stroke-linecap="round"/>
    <path d="M175 150 C190 145 195 130 185 125 C175 120 165 135 175 150 Z" fill="#3F8F35" opacity="0.15"/>
    <path d="M182 120 C195 110 195 95 185 90 C175 85 165 100 182 120 Z" fill="#3F8F35" opacity="0.15"/>
    <path d="M175 90 C185 75 180 60 170 55 C160 50 155 70 175 90 Z" fill="#3F8F35" opacity="0.12"/>
    <path d="M160 65 C165 50 155 35 145 35 C135 35 135 55 160 65 Z" fill="#3F8F35" opacity="0.10"/>
  </svg>`;

  /* ─── Helper: render menu items ────────────────────────── */
  function renderItems(items) {
    return items.map(([num, name, price]) => `
      <div class="wmp-menu-item">
        <span class="wmp-item-num">${num}</span>
        <div class="wmp-item-body">
          <span class="wmp-item-name">${name}</span>
          <span class="wmp-item-dots"></span>
          <span class="wmp-item-price">${price}</span>
        </div>
      </div>
    `).join('');
  }

  /* ─── Render category view — premium card ──────────────── */
  function renderCategoryView(catKey) {
    const cat = categories.find(c => c.key === catKey);
    const items = menu[catKey] || [];
    const photo = images[catKey] || images.main;
    const icon  = catIcons[catKey] || catIcons.main;

    return `
      <div class="wmp-category-view">
        <div class="wmp-content-card">
          <div class="wmp-list-col">
            <div class="wmp-cat-heading">
              <div class="wmp-cat-heading-icon">
                <img src="${icon}" alt="" loading="lazy" />
              </div>
              <div class="wmp-cat-heading-copy">
                <h2>${cat ? cat.label : catKey}</h2>
                <div class="wmp-heading-divider"></div>
              </div>
            </div>
            <div class="wmp-items-list">
              ${renderItems(items)}
            </div>
          </div>
          <div class="wmp-photo-col">
            <img class="wmp-food-photo" src="${photo}" alt="${cat ? cat.label : ''}" loading="lazy" />
          </div>
        </div>
      </div>
    `;
  }

  /* ─── Render sidebar — with laurel wreath ──────────────── */
  function renderSidebar(activeCat, onCatClick) {
    const catItems = categories.map(cat => `
      <li>
        <button class="wmp-cat-btn${cat.key === activeCat ? ' active' : ''}" data-cat="${cat.key}" type="button">
          <div class="wmp-cat-icon-wrap">
            <img src="${catIcons[cat.key]}" alt="" loading="lazy" />
          </div>
          ${cat.label}
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
  function renderMain(day, activeCat) {
    const dayTabs = days.map((d, i) => {
      const isActive = d.key === day.key;
      return `<button class="catering-day-btn${isActive ? ' active' : ''}" data-day="${d.key}" type="button" aria-label="${d.key}, ${d.date}">${d.short}</button>`;
    }).join('');

    return `
      <div class="wmp-main">
        <div class="wmp-header">
          <div class="wmp-title-group">
            <h1 class="wmp-title">Menu tygodniowe</h1>
            <div class="wmp-date-row">
              ${svgCalendar}
              <span id="cateringSubtitle">${day.title}, ${day.date}</span>
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
          ${renderCategoryView(activeCat)}
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
    const overlay  = document.getElementById('cateringOverlay');
    const modal    = document.getElementById('cateringModal');

    if (!overlay || !modal) return;

    let activeDayIndex = 0;   /* Monday */
    let activeCat      = 'main';
    let isOpen         = false;
    let openTimeline   = null;
    let closeTimeline  = null;
    let removeTrap     = () => {};

    /* ── Full re-render of the modal contents ─────────────── */
    function fullRender() {
      const day = days[activeDayIndex];
      modal.innerHTML = renderSidebar(activeCat) + renderMain(day, activeCat);

      /* Wire close button */
      const closeBtn = modal.querySelector('#cateringCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', closeModal);

      /* Wire day tabs */
      modal.querySelectorAll('.catering-day-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.day;
          const idx = days.findIndex(d => d.key === key);
          if (idx === activeDayIndex) return;
          activeDayIndex = idx;
          switchDay(idx);
        });
      });

      /* Wire category buttons */
      modal.querySelectorAll('.wmp-cat-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const cat = btn.dataset.cat;
          if (cat === activeCat) return;
          activeCat = cat;
          switchCategory(cat);
        });
      });

      /* Wire PDF button */
      const pdfBtn = modal.querySelector('[data-print-menu]');
      if (pdfBtn) pdfBtn.addEventListener('click', () => window.print());
    }

    /* ── Switch category (re-render body only) ────────────── */
    function switchCategory(cat) {
      /* update sidebar buttons */
      modal.querySelectorAll('.wmp-cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === cat);
      });

      const body = modal.querySelector('#cateringBody');
      if (!body) return;

      if (!window.gsap) {
        body.innerHTML = renderCategoryView(cat);
        return;
      }

      gsap.to(body, {
        opacity: 0, y: -6, duration: 0.14, ease: 'power2.in',
        onComplete: () => {
          body.innerHTML = renderCategoryView(cat);
          body.scrollTop = 0;
          gsap.fromTo(body, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
        }
      });
    }

    /* ── Switch day ───────────────────────────────────────── */
    function switchDay(idx) {
      const day = days[idx];

      /* update tabs */
      modal.querySelectorAll('.catering-day-btn').forEach((btn, i) => {
        btn.classList.toggle('active', btn.dataset.day === day.key);
      });

      /* update subtitle */
      const sub = modal.querySelector('#cateringSubtitle');
      if (sub) sub.textContent = `${day.title}, ${day.date}`;

      /* re-render body */
      const body = modal.querySelector('#cateringBody');
      if (!body) return;

      if (!window.gsap) {
        body.innerHTML = renderCategoryView(activeCat);
        return;
      }

      gsap.to(body, {
        opacity: 0, y: -5, duration: 0.13, ease: 'power2.in',
        onComplete: () => {
          body.innerHTML = renderCategoryView(activeCat);
          body.scrollTop = 0;
          gsap.fromTo(body, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' });
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
          modal.querySelectorAll('.wmp-sidebar, .wmp-header, .catering-tabs-container'),
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

    /* Close on backdrop click */
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    });

    /* Close on ESC */
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    /* All "NASZE MENU" triggers */
    document.querySelectorAll('#openMenuModal, #openMenuModal2, #openMenuModal3, .mobile-menu-sticky-btn').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openModal(event, trigger);
      }, { capture: true });
    });

    /* Auto-open via ?menuPopup=1 URL param */
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
