/* ============================================================
   PYCHA CATERING — Weekly Menu Popup — Premium JS Redesign
   Wymaga: GSAP 3 (już w projekcie)
   ============================================================ */

(function () {
  /* ─── Asset paths ─────────────────────────────────────── */
  const assetBase = 'assets/menu-popup/generated/';
  const images = {
    soup:    `${assetBase}tomato-soup.jpg`,
    pasta:   `${assetBase}spaghetti-bolognese.jpg`,
    small:   `${assetBase}chicken-burger.jpg`,
    meat:    `${assetBase}pork-cutlet.jpg`,
    vegan:   `${assetBase}vegan-curry-rice.jpg`,
    wege:    `${assetBase}green-vege-noodles.jpg`,
    starch:  `${assetBase}pierogi.jpg`,
    dessert: `${assetBase}chocolate-dessert.jpg`,
    salad:   `${assetBase}greek-salad.jpg`,
    sushi:   `${assetBase}sushi-salmon.jpg`
  };

  /* ─── Days data ───────────────────────────────────────── */
  const days = [
    { key: 'Poniedziałek', short: 'Pon',  title: 'Poniedziałek', date: '08.06.2026' },
    { key: 'Wtorek',       short: 'Wt',   title: 'Wtorek',       date: '09.06.2026' },
    { key: 'Środa',        short: 'Śr',   title: 'Środa',        date: '10.06.2026' },
    { key: 'Czwartek',     short: 'Czw',  title: 'Czwartek',     date: '11.06.2026' },
    { key: 'Piątek',       short: 'Pt',   title: 'Piątek',       date: '12.06.2026' },
    { key: 'Sobota',       short: 'Sob',  title: 'Sobota',       date: '13.06.2026' },
    { key: 'Niedziela',    short: 'Nd',   title: 'Niedziela',    date: '14.06.2026' }
  ];

  /* ─── Menu data ───────────────────────────────────────── */
  const menu = {
    soups: [
      ['1.', 'Pomidorowa z makaronem (na wywarze warzywnym)', '11,00 zł'],
      ['2.', 'Serowa z kurczakiem', '12,00 zł'],
      ['3.', 'Chłodnik litewski', '12,00 zł']
    ],
    pastas: [
      ['17.', 'Spaghetti bolognese', '17,50 zł'],
      ['18.', 'Penne carbonara', '17,50 zł'],
      ['19.', 'Linguine z drobiem, szparagami i serem naciowym', '19,00 zł']
    ],
    small: [
      ['20.', 'Wątróbka drobiowa z jabłkiem cynamonowym, ziemniaki pieczone, modra kapusta', '18,00 zł'],
      ['21.', 'Tajskie Pad Kra Pao z udkiem indyczym, basmati, jajko sadzone', '19,00 zł'],
      ['22.', 'Pożarski, ziemniaki puree, marchewka', '18,00 zł'],
      ['23.', 'Tortilla z szarpaną wieprzowiną i warzywami, dip cheddar', '17,00 zł'],
      ['24.', 'Cheeseburger smoked papryka', '20,00 zł']
    ],
    meat: [
      ['4.', 'De volaille, ziemniaki puree, buraki zasmażane', '21,50 zł'],
      ['5.', 'Potrawka wołowa z kremowym sosem szpinakowym, kluski śląskie, kapusta modra', '23,50 zł'],
      ['6.', 'Wieprzowina w płatkach kukurydzianych, ziemniaki w mundurkach, surówka z marchwi i jabłka fit', '20,50 zł'],
      ['7.', 'Gołąbek domowy w sosie pomidorowym, ziemniaki puree, marchewka zasmażana', '20,50 zł', 'NOWOŚĆ'],
      ['8.', 'Thai roll z kurczakiem', '16,00 zł']
    ],
    vegan: [
      ['9.', 'Leczo z zieloną soczewicą z boczniakami, ryż biały, marchew baby', '18,50 zł', 'NOWOŚĆ']
    ],
    wege: [
      ['10.', 'Marynowany seitan na chińskich warzywach, makaron sojowy, fasolka szparagowa', '18,50 zł'],
      ['11.', 'Placek szpinakowy z sosem warzywnym po grecku', '18,50 zł']
    ],
    starch: [
      ['12.', 'Naleśniki z serem czekoladowym i bananem', '16,50 zł'],
      ['13.', 'Bazylikowe naleśniki z bakłażanikami warzywami, dip pomidorowy', '18,50 zł'],
      ['14.', 'Bao YIN YANG z szarpaną wieprzowiną z marynowanym ogórkiem i sezamem z aioli czosnkowym', '21,00 zł'],
      ['15.', 'Pierogi z mięsem, cebulka z boczkiem', '19,00 zł'],
      ['16.', 'Leniwe', '16,00 zł']
    ],
    desserts: [
      ['25.', 'Kokosowa owsianka ze śliwką i ekspandowanym amarantusem', '10,50 zł'],
      ['26.', 'Tapioka', '10,50 zł'],
      ['27.', 'Jogurt z crunchy i musem mango marakuja', '10,00 zł'],
      ['28.', 'Banao - bez cukru', '10,50 zł'],
      ['29.', 'Deser brzoskwiniowy z amaretto', '11,00 zł'],
      ['30.', 'Snickers', '11,00 zł']
    ],
    salads: [
      ['31.', 'Sałatka grecka', '14,00 zł'],
      ['32.', 'Sałatka mała: Burak z pomarańczą, Blue Pote, kurczak, winogrono', '14,50 zł'],
      ['33.', 'Sałatka premium: Szpinak, gruszka z pomarańczą, feta, łosoś z jajem', '19,50 zł'],
      ['34.', 'Bowl: Falafel bowl', '20,50 zł']
    ],
    sushi: [
      ['35.', 'Zestaw surowy łosoś', '28,00 zł'],
      ['36.', 'Zestaw pieczony łosoś', '28,00 zł'],
      ['37.', 'Zestaw mieszany', '28,00 zł'],
      ['38.', 'Zestaw z krewetką', '28,00 zł']
    ]
  };

  /* ─── Category badge icons ───────────────────────────── */
  const categoryIconBase = 'assets/menu-popup/category-icons/';
  const categoryIconPaths = {
    soup:    `${categoryIconBase}category-icon-1.png`,
    leaf:    `${categoryIconBase}category-icon-2.png`,
    fork:    `${categoryIconBase}category-icon-3.png`,
    chef:    `${categoryIconBase}category-icon-4.png`,
    cupcake: `${categoryIconBase}category-icon-5.png`
  };

  function categoryIcon(name, src) {
    return `<img class="category-icon category-icon-${name}" src="${src}" alt="" loading="lazy" />`;
  }

  /* ─── Icons ──────────────────────────────────────────── */
  const icons = {
    leaf:   categoryIcon('leaf', categoryIconPaths.leaf),
    soup:   categoryIcon('soup', categoryIconPaths.soup),
    fork:   categoryIcon('fork', categoryIconPaths.fork),
    chef:   categoryIcon('chef', categoryIconPaths.chef),
    meat:   categoryIcon('meat', categoryIconPaths.fork),
    vegan:  categoryIcon('vegan', categoryIconPaths.leaf),
    cupcake: categoryIcon('cupcake', categoryIconPaths.cupcake),
    salad:  categoryIcon('salad', categoryIconPaths.leaf),
    sushi:  categoryIcon('sushi', categoryIconPaths.fork),
    chat:   `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13h28a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H23l-10 7v-7h-3a5 5 0 0 1-5-5V18a5 5 0 0 1 5-5Z"/><path d="M16 24h.1M24 24h.1M32 24h.1"/></svg>`,
    pdf:    `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h15l9 9v29H14V5Z"/><path d="M29 5v10h9"/><path d="M20 31h2c2 0 3-1 3-3s-1-3-3-3h-2v9"/><path d="M29 34v-9h3c3 0 5 2 5 4.5S35 34 32 34h-3"/></svg>`
  };

  /* ─── HTML helpers ────────────────────────────────────── */
  function menuItems(items) {
    return items.map(([num, name, price, badge]) => `
      <div class="menu-item">
        <span class="item-num">${num}</span>
        <div class="item-main">
          <span class="item-name">${name}${badge ? `<span class="item-badge">${badge}</span>` : ''}</span>
          <span class="item-dots"></span>
          <span class="item-price">${price}</span>
        </div>
      </div>
    `).join('');
  }

  function heading(title, icon) {
    return `
      <div class="section-heading">
        ${icons[icon]}
        <h3>${title}</h3>
      </div>
    `;
  }

  function panel(options) {
    const food = options.image
      ? `<img class="panel-food ${options.imageClass}" src="${options.image}" alt="" loading="lazy" />`
      : '';
    return `
      <section class="menu-panel ${options.className || ''}">
        ${heading(options.title, options.icon)}
        <div class="menu-list">${menuItems(options.items)}</div>
        ${food}
      </section>
    `;
  }

  function subPanel(className, title, icon, items, image, imageClass) {
    return `
      <div class="sub-panel ${className}">
        <div class="sub-title">${icons[icon]}<span>${title}</span></div>
        <div class="menu-list">${menuItems(items)}</div>
        <img class="panel-food ${imageClass}" src="${image}" alt="" loading="lazy" />
      </div>
    `;
  }

  function renderBoard() {
    return `
      <div class="weekly-board">
        ${panel({ className: 'top-panel panel-soups',  title: 'ZUPY',         icon: 'soup',   items: menu.soups,   image: images.soup,    imageClass: 'image-soup' })}
        ${panel({ className: 'top-panel panel-pastas', title: 'PASTY',        icon: 'leaf',   items: menu.pastas,  image: images.pasta,   imageClass: 'image-pasta' })}
        ${panel({ className: 'top-panel panel-small',  title: 'DANIA MAŁE',   icon: 'fork',   items: menu.small,   image: images.small,   imageClass: 'image-small' })}

        <section class="menu-panel panel-main">
          ${heading('DANIA GŁÓWNE', 'chef')}
          <div class="main-layout">
            ${subPanel('meat',  'MIĘSNE', 'meat',  menu.meat,  images.meat,  'image-meat')}
            <div class="diet-column">
              ${subPanel('vegan', 'VEGAN',  'vegan', menu.vegan, images.vegan, 'image-vegan')}
              ${subPanel('wege',  'WEGE',   'vegan', menu.wege,  images.wege,  'image-wege')}
            </div>
          </div>
        </section>

        ${panel({ className: 'panel-starch', title: 'DANIA MĄCZNE', icon: 'leaf', items: menu.starch, image: images.starch, imageClass: 'image-starch' })}

        <div class="right-stack">
          ${panel({ className: 'panel-desserts tone-purple', title: 'DESERY',   icon: 'cupcake', items: menu.desserts, image: images.dessert, imageClass: 'image-dessert' })}
          <div class="right-lower-grid">
            ${panel({ className: 'panel-salads tone-soft', title: 'SAŁATKI',  icon: 'salad',   items: menu.salads,  image: images.salad,   imageClass: 'image-salad' })}
            ${panel({ className: 'panel-sushi  tone-soft', title: 'SUSHI',    icon: 'sushi',   items: menu.sushi,   image: images.sushi,   imageClass: 'image-sushi' })}
            <div class="menu-board-actions">
              <a  class="menu-action-btn" href="contact.html">${icons.chat}<span>Kontakt</span></a>
              <button class="menu-action-btn" type="button" data-print-menu>${icons.pdf}<span>Pobierz PDF</span></button>
            </div>
          </div>
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

  /* ─── Liquid-reveal animation (button morph) ─────────── */
  function createLiquidReveal(triggerEl, onComplete) {
    if (!window.gsap || !triggerEl) { onComplete(); return; }

    const rect    = triggerEl.getBoundingClientRect();
    const cx      = rect.left + rect.width  / 2;
    const cy      = rect.top  + rect.height / 2;
    const maxDim  = Math.max(window.innerWidth, window.innerHeight);
    const endSize = maxDim * 2.8;

    /* create ripple element */
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

    /* scatter food emoji particles */
    const emojis = ['🍃', '🌿', '🍴', '✨', '🌱'];
    const particles = [];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'pc-btn-particle';
      p.textContent = emojis[i % emojis.length];
      p.style.cssText = `font-size: ${12 + Math.random() * 10}px; left: ${cx}px; top: ${cy}px;`;
      document.body.appendChild(p);
      particles.push(p);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ripple, {
          opacity: 0, duration: 0.18,
          onComplete: () => { ripple.remove(); particles.forEach(p => p.remove()); }
        });
        onComplete();
      }
    });

    /* animate ripple expansion */
    tl.to(ripple, {
      scale: endSize / startSize,
      opacity: 1,
      duration: 0.55,
      ease: 'power2.inOut'
    });

    /* scatter particles */
    particles.forEach((p, i) => {
      const angle  = (i / particles.length) * 360;
      const dist   = 60 + Math.random() * 80;
      const rad    = (angle * Math.PI) / 180;
      tl.to(p, {
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: 0.9,
        duration: 0.38,
        ease: 'power2.out'
      }, 0);
      tl.to(p, {
        opacity: 0,
        y: `+=${20 + Math.random() * 30}`,
        duration: 0.28,
        ease: 'power2.in'
      }, 0.28);
    });
  }

  /* ─── Main setup ──────────────────────────────────────── */
  function setupWeeklyPopup() {
    const overlay        = document.getElementById('cateringOverlay');
    const modal          = document.getElementById('cateringModal');
    const closeBtn       = document.getElementById('cateringCloseBtn');
    const daysContainer  = document.getElementById('cateringDays');
    const bodyContainer  = document.getElementById('cateringBody');
    const headerSubEl    = document.getElementById('cateringSubtitle');

    if (!overlay || !modal || !closeBtn || !daysContainer || !bodyContainer) return;

    let activeIndex   = 1;  /* Tuesday */
    let openTimeline  = null;
    let closeTimeline = null;
    let removeTrap    = () => {};
    let isOpen        = false;

    /* ── Update header subtitle ─────────────────────────── */
    function setTitle(day) {
      if (headerSubEl) headerSubEl.textContent = `${day.title}, ${day.date}`;
    }

    /* ── Board stagger animation ─────────────────────────── */
    function animateBoard() {
      if (!window.gsap) return;
      const panels = bodyContainer.querySelectorAll('.menu-panel, .menu-board-actions');
      gsap.fromTo(
        panels,
        { y: 16, opacity: 0, scale: 0.97 },
        { y: 0,  opacity: 1, scale: 1, stagger: 0.022, duration: 0.36, ease: 'power2.out' }
      );
    }

    /* ── Render day ─────────────────────────────────────── */
    function renderDay(index, animate = true) {
      if (!window.gsap || !animate) {
        activeIndex = index;
        daysContainer.querySelectorAll('.catering-day-btn').forEach((btn, i) => {
          btn.classList.toggle('active', i === activeIndex);
        });
        setTitle(days[activeIndex]);
        bodyContainer.innerHTML = renderBoard();
        bodyContainer.scrollTop = 0;
        attachPrintBtn();
        return;
      }

      /* fade-out current content, then swap */
      gsap.to(bodyContainer, {
        opacity: 0, y: -6, duration: 0.16, ease: 'power2.in',
        onComplete: () => {
          activeIndex = index;
          daysContainer.querySelectorAll('.catering-day-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === activeIndex);
          });
          setTitle(days[activeIndex]);
          bodyContainer.innerHTML = renderBoard();
          bodyContainer.scrollTop = 0;
          attachPrintBtn();
          gsap.fromTo(bodyContainer, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' });
          animateBoard();
        }
      });
    }

    /* ── Print button ────────────────────────────────────── */
    function attachPrintBtn() {
      const printBtn = bodyContainer.querySelector('[data-print-menu]');
      if (printBtn) printBtn.addEventListener('click', () => window.print());
    }

    /* ── Build day tab buttons ───────────────────────────── */
    daysContainer.innerHTML = '';
    days.forEach((day, index) => {
      const button = document.createElement('button');
      button.type      = 'button';
      button.className = `catering-day-btn${index === activeIndex ? ' active' : ''}`;
      button.textContent = day.short;
      button.setAttribute('aria-label', `${day.key}, ${day.date}`);
      button.addEventListener('click', () => {
        if (index === activeIndex) return;
        renderDay(index, true);
      });
      daysContainer.appendChild(button);
    });

    renderDay(activeIndex, false);

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

        /* 1. Overlay fade in */
        openTimeline.fromTo(overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.24, ease: 'power2.out' }
        );

        /* 2. Modal scale + translateY spring */
        openTimeline.fromTo(modal,
          { y: 36, scale: 0.92, opacity: 0 },
          { y: 0,  scale: 1,    opacity: 1, duration: 0.52, ease: 'back.out(1.1)' },
          '-=0.12'
        );

        /* 3. Header elements stagger */
        openTimeline.fromTo(
          modal.querySelectorAll('.catering-header-icon-wrap, .catering-header-titles, .catering-close-btn'),
          { y: 10, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.28, stagger: 0.06 },
          '-=0.32'
        );

        /* 4. Day tab pills stagger */
        openTimeline.fromTo(
          modal.querySelectorAll('.catering-day-btn'),
          { y: 8, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.26, stagger: 0.04, ease: 'back.out(1.5)' },
          '-=0.22'
        );

        /* 5. Menu board panels stagger */
        openTimeline.fromTo(
          bodyContainer.querySelectorAll('.menu-panel, .menu-board-actions'),
          { y: 18, opacity: 0, scale: 0.97 },
          { y: 0,  opacity: 1, scale: 1,   duration: 0.36, stagger: 0.018, ease: 'power2.out' },
          '-=0.16'
        );
      };

      /* Liquid reveal if trigger element present */
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
        /* reset modal transform for next open */
        gsap.set(modal, { clearProps: 'all' });
      };

      if (!window.gsap) {
        overlay.style.opacity = '0';
        modal.style.opacity   = '0';
        finish();
        return;
      }

      closeTimeline = gsap.timeline({ onComplete: finish });

      /* 1. Panels fade out */
      closeTimeline.to(
        bodyContainer.querySelectorAll('.menu-panel, .menu-board-actions'),
        { y: 8, opacity: 0, scale: 0.98, duration: 0.16, stagger: 0.01, ease: 'power2.in' }
      );

      /* 2. Modal shrink */
      closeTimeline.to(modal,
        { y: 22, scale: 0.94, opacity: 0, duration: 0.22, ease: 'power3.in' },
        '-=0.08'
      );

      /* 3. Overlay fade out */
      closeTimeline.to(overlay,
        { opacity: 0, duration: 0.18, ease: 'power2.inOut' },
        '-=0.1'
      );
    }

    /* ── Event listeners ─────────────────────────────────── */

    /* Close button */
    closeBtn.addEventListener('click', closeModal);

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
    document.querySelectorAll('#openMenuModal, #openMenuModal2, #openMenuModal3').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openModal(event, trigger);
      }, { capture: true });
    });

    /* Auto-open via ?menuPopup=1 URL param (screenshot mode) */
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
