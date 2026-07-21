/* ============================================================
   PYCHA CATERING — Weekly Menu Popup — Premium Redesign v3
   ============================================================ */

(function () {
  const menuDataReady = window.PYCHA_MENU_DATA_READY || Promise.resolve(window.PYCHA_MENU_DATA);

  menuDataReady.catch(() => window.PYCHA_MENU_DATA).then(() => {
  /* ─── Asset paths ─────────────────────────────────────── */
  const scriptTag = document.querySelector('script[src*="weekly-menu-popup.js"]');
  const assetBase = scriptTag ? scriptTag.getAttribute('src').replace('weekly-menu-popup.js', 'generated/') : 'assets/menu-popup/generated/';
  const imageLoadingAttribute = document.documentElement.dataset.loadOptimization === 'disabled'
    ? ''
    : ' loading="lazy"';

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
  const SCHEDULE = {
    timeZone: 'Europe/Warsaw',
    cycleAnchorMonday: '2026-06-15',
    defaultView: 'current-week',
    ...(window.PYCHA_MENU_DATA.schedule || {}),
  };
  const DAYS_ORDER  = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const DAYS_SHORT  = { 'Poniedziałek': 'Pon', 'Wtorek': 'Wt', 'Środa': 'Śr', 'Czwartek': 'Czw', 'Piątek': 'Pt' };
  const CAT_ORDER   = ['Dania mięsne', 'Dania wege', 'Zupy', 'Mączne', 'Desery', 'Sałatki', 'Makaron', 'Stałe codziennie', 'Kanapki'];
  const SANDWICHES_KEY = 'Kanapki';

  /* ─── Menu data ───────────────────────────────────────── */
  const weeklyMenu = window.PYCHA_MENU_DATA.weeklyMenu;
  const sandwiches = Array.isArray(window.PYCHA_MENU_DATA.sandwiches)
    ? window.PYCHA_MENU_DATA.sandwiches
    : [];

  const DAY_IN_MS = 86400000;

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function parseIsoCivilDay(value) {
    const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return Math.floor(Date.UTC(2026, 5, 15) / DAY_IN_MS);
    return Math.floor(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])) / DAY_IN_MS);
  }

  function getCivilDayInTimeZone(referenceDate = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: SCHEDULE.timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(referenceDate);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return Math.floor(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)) / DAY_IN_MS);
  }

  function formatCivilDay(dayNumber) {
    return new Intl.DateTimeFormat('pl-PL', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(dayNumber * DAY_IN_MS));
  }

  function formatCivilWeek(startDay) {
    return `${formatCivilDay(startDay)} – ${formatCivilDay(startDay + 4)}`;
  }

  function getMenuWeekSelection(referenceDate = new Date()) {
    const today = getCivilDayInTimeZone(referenceDate);
    const weekday = new Date(today * DAY_IN_MS).getUTCDay();
    const currentMonday = today - positiveModulo(weekday - 1, 7);
    const targetMonday = weekday === 0 || weekday === 6
      ? currentMonday + 7
      : currentMonday;
    const anchorMonday = parseIsoCivilDay(SCHEDULE.cycleAnchorMonday);
    const weeksFromAnchor = Math.floor((targetMonday - anchorMonday) / 7);
    const index = positiveModulo(weeksFromAnchor, WEEKS.length);

    return {
      index,
      startDay: targetMonday,
      label: formatCivilWeek(targetMonday),
    };
  }

  function getFourWeekSchedule(referenceDate = new Date()) {
    const firstWeek = getMenuWeekSelection(referenceDate);
    return Array.from({ length: WEEKS.length }, (_, offset) => {
      const startDay = firstWeek.startDay + (offset * 7);
      const index = positiveModulo(firstWeek.index + offset, WEEKS.length);
      return {
        index,
        weekName: WEEKS[index],
        startDay,
        label: formatCivilWeek(startDay),
      };
    });
  }
  
  /* ─── SVG icons ─────────────────────────────────────────── */
  const svgCalendar = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
  const svgDownload = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const svgClose = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

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

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizePrintDish(item) {
    if (typeof item === 'string') {
      const parsed = parseDish(item);
      return { name: parsed.name, price: parsed.price || '', weight: '', allergens: '' };
    }

    return {
      name: item?.name || '',
      price: item?.price || '',
      weight: item?.weight || '',
      allergens: item?.allergens || '',
    };
  }

  function renderPrintCategory(categoryName, items) {
    if (!Array.isArray(items) || !items.length) return '';

    const dishes = items.map((item) => {
      const dish = normalizePrintDish(item);
      // Alergeny widoczne tylko dla admina — nie renderujemy ich dla klientów
      const details = [dish.weight]
        .filter(Boolean)
        .map((detail) => `<span>${escapeHtml(detail)}</span>`)
        .join('');

      return `
        <li class="print-item">
          <div class="print-item-copy">
            <strong>${escapeHtml(dish.name)}</strong>
            ${details ? `<small>${details}</small>` : ''}
          </div>
          ${dish.price ? `<b>${escapeHtml(dish.price)}</b>` : ''}
        </li>
      `;
    }).join('');

    return `
      <section class="print-category">
        <h3>${escapeHtml(categoryName)}</h3>
        <ol>${dishes}</ol>
      </section>
    `;
  }

  function renderPrintDay(weekName, dayName) {
    const dayData = ((weeklyMenu[weekName] || {})[dayName]) || {};
    const categories = CAT_ORDER
      .filter((categoryName) => categoryName !== SANDWICHES_KEY)
      .map((categoryName) => renderPrintCategory(categoryName, dayData[categoryName]))
      .filter(Boolean)
      .join('');

    return `
      <article class="print-day">
        <h2>${escapeHtml(dayName)}</h2>
        ${categories || '<p class="print-empty">Brak pozycji w tym dniu.</p>'}
      </article>
    `;
  }

  function renderPrintWeekSheets(scheduleEntry, weekNumber) {
    const firstHalf = DAYS_ORDER.slice(0, 3)
      .map((dayName) => renderPrintDay(scheduleEntry.weekName, dayName))
      .join('');
    const secondHalf = DAYS_ORDER.slice(3)
      .map((dayName) => renderPrintDay(scheduleEntry.weekName, dayName))
      .join('');

    const header = `
      <header class="print-header">
        <div>
          <span>Pycha Catering</span>
          <h1>Menu na 4 tygodnie</h1>
        </div>
        <p><strong>${escapeHtml(scheduleEntry.weekName)}</strong>${escapeHtml(scheduleEntry.label)}</p>
      </header>
    `;

    return `
      <section class="print-sheet">
        ${header}
        <div class="print-days print-days-three">${firstHalf}</div>
      </section>
      <section class="print-sheet">
        ${header}
        <div class="print-days print-days-two">${secondHalf}</div>
      </section>
    `;
  }

  function buildFourWeekPrintDocument(referenceDate = new Date()) {
    const schedule = getFourWeekSchedule(referenceDate);
    const sheets = schedule
      .map((entry, index) => renderPrintWeekSheets(entry, index + 1))
      .join('');
    const dailyItems = sandwiches.length
      ? `<section class="print-sheet print-daily-sheet">
          <header class="print-header">
            <div><span>Pycha Catering</span><h1>Pozycje dostępne codziennie</h1></div>
          </header>
          ${renderPrintCategory('Kanapki', sandwiches)}
        </section>`
      : '';
    const fontUrl = new URL('assets/home-fonts.css', document.baseURI).href;

    return `<!doctype html>
      <html lang="pl">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Pycha-Catering-menu-4-tygodnie</title>
          <link rel="stylesheet" href="${escapeHtml(fontUrl)}">
          <style>
            @page { size: A4 landscape; margin: 8mm; }
            * { box-sizing: border-box; }
            html, body { margin: 0; padding: 0; background: #fff; color: #173415; }
            body { font-family: "Rubik", Arial, sans-serif; font-size: 9px; line-height: 1.32; }
            .print-sheet { min-height: 190mm; break-after: page; page-break-after: always; }
            .print-sheet:last-child { break-after: auto; page-break-after: auto; }
            .print-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 5mm; padding: 0 1mm 3mm; border-bottom: 2px solid #4f7f32; }
            .print-header span { color: #4f7f32; font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
            .print-header h1 { margin: 1mm 0 0; font-family: "Baloo 2", "Rubik", sans-serif; font-size: 23px; line-height: 1; }
            .print-header p { display: grid; gap: 1mm; margin: 0; text-align: right; }
            .print-header p strong { color: #4f7f32; font-size: 11px; text-transform: uppercase; }
            .print-days { display: grid; align-items: start; gap: 4mm; }
            .print-days-three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .print-days-two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .print-day { min-width: 0; padding: 3.5mm; border: 1px solid #dce8d0; border-radius: 4mm; background: #fffdf8; break-inside: avoid; }
            .print-day > h2 { margin: 0 0 3mm; padding-bottom: 2mm; border-bottom: 1px solid #dce8d0; font-family: "Baloo 2", "Rubik", sans-serif; font-size: 17px; line-height: 1; }
            .print-category { margin-top: 2.6mm; break-inside: avoid; }
            .print-category h3 { margin: 0 0 1.2mm; color: #4f7f32; font-size: 8px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
            .print-category ol { display: grid; gap: .8mm; margin: 0; padding: 0; list-style: none; }
            .print-item { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2mm; align-items: start; padding-bottom: .8mm; border-bottom: 1px dotted #dfe6d9; }
            .print-item:last-child { border-bottom: 0; }
            .print-item-copy { min-width: 0; }
            .print-item-copy strong { display: block; color: #1c281b; font-size: 8.5px; font-weight: 600; }
            .print-item-copy small { display: flex; flex-wrap: wrap; gap: 1.5mm; margin-top: .3mm; color: #6a7565; font-size: 7px; }
            .print-item > b { white-space: nowrap; color: #173415; font-size: 8px; }
            .print-empty { color: #6a7565; }
            .print-daily-sheet .print-category { max-width: 180mm; }
            @media screen { body { padding: 12px; background: #eef3de; } .print-sheet { width: 281mm; margin: 0 auto 12px; padding: 8mm; background: #fff; box-shadow: 0 10px 30px rgba(23, 52, 21, .12); } }
          </style>
        </head>
        <body>${sheets}${dailyItems}</body>
      </html>`;
  }

  function waitForPrintAssets(printDocument) {
    const fontReady = printDocument.fonts?.ready || Promise.resolve();
    const imageReady = Array.from(printDocument.images).map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    });
    return Promise.all([fontReady.catch(() => {}), ...imageReady]);
  }

  async function printFourWeekMenu(button) {
    const previousFrame = document.getElementById('pychaFourWeekPrintFrame');
    if (previousFrame) previousFrame.remove();

    const originalContent = button.innerHTML;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = 'Przygotowuję menu…';

    const frame = document.createElement('iframe');
    frame.id = 'pychaFourWeekPrintFrame';
    frame.title = 'Menu Pycha Catering na cztery tygodnie';
    Object.assign(frame.style, {
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '1px',
      height: '1px',
      border: '0',
      opacity: '0',
      pointerEvents: 'none',
    });
    document.body.appendChild(frame);

    const restoreButton = () => {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      button.innerHTML = originalContent;
    };

    try {
      const printDocument = frame.contentDocument;
      printDocument.open();
      printDocument.write(buildFourWeekPrintDocument());
      printDocument.close();
      await waitForPrintAssets(printDocument);

      const printWindow = frame.contentWindow;
      const cleanup = () => {
        restoreButton();
        window.setTimeout(() => frame.remove(), 0);
      };
      printWindow.addEventListener('afterprint', cleanup, { once: true });
      printWindow.focus();
      printWindow.print();
      window.setTimeout(() => {
        if (!document.body.contains(frame)) return;
        restoreButton();
        frame.remove();
      }, 60000);
    } catch (error) {
      frame.remove();
      restoreButton();
      window.alert('Nie udało się przygotować menu do pobrania. Spróbuj ponownie.');
    }
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
      // Alergeny widoczne tylko dla admina — nie renderujemy ich dla klientów
      
      return `
        <div class="wmp-menu-item">
          ${numberBadge}
          <div class="wmp-item-body" style="display: flex; flex-direction: column; flex: 1; align-items: flex-start; text-align: left; justify-content: center;">
            <div style="text-align: left;"><span class="wmp-item-name">${name}</span>${weightHtml}</div>
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
      if (cat === SANDWICHES_KEY) return sandwiches.length > 0;
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
                <img src="${icon}" alt=""${imageLoadingAttribute} />
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
            <img class="wmp-food-photo" src="${photo}" alt="${catName}"${imageLoadingAttribute} />
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
            <img src="${catIcons[cat] || catIcons['Dania mięsne']}" alt=""${imageLoadingAttribute} />
          </div>
          ${cat}
        </button>
      </li>
    `).join('');

    return `
      <aside class="wmp-sidebar">
        <div class="wmp-avatar-wrap">
          <div class="wmp-avatar">
            <img src="${chefAvatar}" alt="Kucharz Pycha Catering"${imageLoadingAttribute} />
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
        <button class="wmp-pdf-btn" type="button" data-print-all-menu title="Przygotuj pełne menu i zapisz je jako PDF">
          ${svgDownload}
          Pobierz menu na 4 tygodnie
        </button>
      </aside>
    `;
  }

  /* ─── Render main area ────────────────────────────────── */
  function renderMain(weekIdx, dayIdx, activeCat, weekLabel) {
    const weekName = WEEKS[weekIdx];
    const dayName  = DAYS_ORDER[dayIdx];
    const displayWeek = weekLabel || weekName;

    const dayTabs = DAYS_ORDER.map((d, i) =>
      `<button class="catering-day-btn${i === dayIdx ? ' active' : ''}" data-day-idx="${i}" type="button" aria-label="${d}">${DAYS_SHORT[d]}</button>`
    ).join('');

    return `
      <div class="wmp-main">
        <div class="wmp-header">
          <div class="wmp-title-group">
            <h1 class="wmp-title" style="margin-bottom: 12px;">Menu tygodniowe</h1>
            <div class="wmp-week-nav" style="justify-content: flex-start; padding: 0; margin: 0; gap: 8px;">
              <div class="wmp-date-row" style="margin: 0; padding: 0; gap: 8px;">
                ${svgCalendar}
                <span id="cateringSubtitle" class="wmp-week-label" style="text-align: left; padding: 0; font-size: 15px; flex: 0 0 auto;">${displayWeek} · ${dayName}</span>
              </div>
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
    let activeWeekLabel = '';
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

    function resetToCurrentWeek() {
      const selection = getMenuWeekSelection(new Date());
      activeWeekIdx = selection.index;
      activeWeekLabel = selection.label;
      activeDayIdx = 0;
      activeCat = CAT_ORDER[0];
      normalizeActiveCat();
    }

    /* ── Full re-render of the modal contents ────────────── */
    function fullRender() {
      normalizeActiveCat();
      const weekName = WEEKS[activeWeekIdx];
      const dayName  = DAYS_ORDER[activeDayIdx];
      modal.innerHTML = renderSidebar(weekName, dayName, activeCat) + renderMain(activeWeekIdx, activeDayIdx, activeCat, activeWeekLabel);
      wireEvents();
    }

    /* ── Wire all interactive elements ───────────────────── */
    function wireEvents() {
      modal.querySelector('#cateringCloseBtn')
        ?.addEventListener('click', closeModal);

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

      const printButton = modal.querySelector('[data-print-all-menu]');
      printButton?.addEventListener('click', () => printFourWeekMenu(printButton));
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

      resetToCurrentWeek();
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
  });
})();
