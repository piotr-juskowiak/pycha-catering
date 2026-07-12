(function () {
  const root = document.querySelector('[data-static-menu-page]');
  if (!root) return;

  const cards = Array.from(root.querySelectorAll('.menu-dish-card'));
  const grid = root.querySelector('#weeklyMenuGrid');
  const search = root.querySelector('#weeklyMenuSearch');
  const searchClear = root.querySelector('#weeklyMenuSearchClear');
  const sort = root.querySelector('#weeklyMenuSort');
  const resultCount = root.querySelector('#weeklyMenuResultCount');
  const activeFilters = root.querySelector('#weeklyMenuActiveFilters');
  const activeCount = root.querySelector('#weeklyMenuActiveCount');
  const mobileFilterCount = root.querySelector('#weeklyMenuMobileFilterCount');
  const emptyState = root.querySelector('#weeklyMenuEmpty');
  const pagination = root.querySelector('#weeklyMenuPagination');
  const paginationPages = root.querySelector('#weeklyMenuPaginationPages');
  const paginationStatus = root.querySelector('#weeklyMenuPaginationStatus');
  const drawer = root.querySelector('#weeklyMenuFilterDrawer');
  const drawerPanel = root.querySelector('.menu-drawer-panel');
  const showResults = root.querySelector('#weeklyMenuShowResults');
  const modal = root.querySelector('#weeklyMenuDishModal');
  const modalPanel = root.querySelector('.menu-dish-modal-panel');
  const modalMedia = root.querySelector('#weeklyMenuDishMedia');
  const modalKicker = root.querySelector('#weeklyMenuDishKicker');
  const modalTitle = root.querySelector('#weeklyMenuDishTitle');
  const modalDescription = root.querySelector('#weeklyMenuDishDescription');
  const modalDetails = root.querySelector('#weeklyMenuDishDetails');

  const labels = { week: 'Tydzień', day: 'Dzień', category: 'Typ dania', diet: 'Dieta', price: 'Cena', popularity: 'Popularność' };
  const priceLabels = { all: 'Każda cena', 'to-15': 'do 15 zł', '16-20': '16–20 zł', '21-plus': '21 zł+', quote: 'Do ustalenia' };
  const popularityLabels = { all: '', bestseller: 'Bestsellery', new: 'Nowości' };
  const PAGE_SIZE = 30;
  const state = { week: 'all', day: 'all', category: 'all', diet: 'all', price: 'all', popularity: 'all', search: '', sort: 'default', page: 1, lastDrawerTrigger: null, lastModalTrigger: null };

  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  }

  function filterLabel(type, value) {
    if (type === 'price') return priceLabels[value] || value;
    if (type === 'popularity') return popularityLabels[value] || value;
    if (value === 'all') return '';
    return value;
  }

  function activeFilterCount() {
    return ['week', 'day', 'category', 'diet', 'price', 'popularity'].filter((type) => state[type] !== 'all').length + (state.search ? 1 : 0);
  }

  function matches(card) {
    if (state.week !== 'all' && card.dataset.week !== state.week) return false;
    if (state.day !== 'all' && card.dataset.day !== state.day) return false;
    if (state.category !== 'all' && card.dataset.category !== state.category) return false;
    if (state.diet !== 'all' && card.dataset.diet !== state.diet) return false;
    if (state.price !== 'all' && card.dataset.priceBand !== state.price) return false;
    if (state.popularity === 'bestseller' && cards.indexOf(card) >= 120) return false;
    if (state.popularity === 'new' && cards.indexOf(card) >= 32) return false;
    if (state.search && !card.dataset.search.includes(normalize(state.search))) return false;
    return true;
  }

  function sortedCards(visible) {
    const list = visible.slice();
    if (state.sort === 'price-asc' || state.sort === 'price-desc') {
      const direction = state.sort === 'price-asc' ? 1 : -1;
      list.sort((a, b) => {
        const aPrice = Number(a.dataset.price);
        const bPrice = Number(b.dataset.price);
        const aMissing = Number.isNaN(aPrice);
        const bMissing = Number.isNaN(bPrice);
        if (aMissing && bMissing) return 0;
        if (aMissing) return 1;
        if (bMissing) return -1;
        return (aPrice - bPrice) * direction;
      });
    } else if (state.sort === 'name-asc') {
      list.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title, 'pl'));
    } else {
      list.sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
    }
    return list;
  }

  function syncButtons() {
    root.querySelectorAll('[data-filter-type]').forEach((button) => {
      const active = state[button.dataset.filterType] === button.dataset.filterValue;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    root.querySelectorAll('.menu-quick-filter[data-filter-type]').forEach((button) => {
      const active = state[button.dataset.filterType] === button.dataset.filterValue;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    root.querySelectorAll('[data-filter-current]').forEach((current) => {
      const type = current.dataset.filterCurrent;
      const activeButton = root.querySelector(`[data-filter-type="${type}"][data-filter-value="${state[type]}"]`);
      current.textContent = activeButton?.querySelector('span')?.textContent || filterLabel(type, state[type]);
    });
  }

  function renderActiveFilters() {
    activeFilters.textContent = '';
    const items = [];
    ['week', 'day', 'category', 'diet', 'price', 'popularity'].forEach((type) => {
      if (state[type] !== 'all') items.push({ type, value: state[type], label: labels[type] + ': ' + filterLabel(type, state[type]) });
    });
    if (state.search) items.push({ type: 'search', value: state.search, label: 'Szukasz: ' + state.search });

    items.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-active-chip';
      button.setAttribute('aria-label', 'Usuń filtr: ' + item.label);
      const text = document.createElement('span');
      text.textContent = item.label;
      const icon = document.createElement('strong');
      icon.textContent = '×';
      icon.setAttribute('aria-hidden', 'true');
      button.append(text, icon);
      button.addEventListener('click', () => {
        if (item.type === 'search') { state.search = ''; search.value = ''; } else { state[item.type] = 'all'; }
        state.page = 1;
        render();
      });
      activeFilters.appendChild(button);
    });

    if (items.length) {
      const clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'menu-active-chip menu-active-chip-clear';
      clear.textContent = 'Wyczyść wszystkie';
      clear.addEventListener('click', clearFilters);
      activeFilters.appendChild(clear);
    }
  }

  function renderPagination(totalItems, totalPages) {
    pagination.hidden = totalPages <= 1;
    paginationPages.textContent = '';
    if (totalPages <= 1) return;

    const pageNumbers = [];
    for (let page = 1; page <= totalPages; page += 1) {
      if (page === 1 || page === totalPages || Math.abs(page - state.page) <= 2) pageNumbers.push(page);
    }

    let previousPage = 0;
    pageNumbers.forEach((page) => {
      if (previousPage && page - previousPage > 1) {
        const separator = document.createElement('span');
        separator.className = 'menu-pagination-ellipsis';
        separator.textContent = '…';
        separator.setAttribute('aria-hidden', 'true');
        paginationPages.appendChild(separator);
      }

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-pagination-page';
      button.dataset.menuPage = String(page);
      button.textContent = String(page);
      button.setAttribute('aria-label', 'Strona ' + page);
      if (page === state.page) {
        button.classList.add('is-active');
        button.setAttribute('aria-current', 'page');
      }
      paginationPages.appendChild(button);
      previousPage = page;
    });

    pagination.querySelector('[data-menu-page="prev"]').disabled = state.page === 1;
    pagination.querySelector('[data-menu-page="next"]').disabled = state.page === totalPages;
    const firstItem = ((state.page - 1) * PAGE_SIZE) + 1;
    const lastItem = Math.min(state.page * PAGE_SIZE, totalItems);
    paginationStatus.textContent = firstItem + '–' + lastItem + ' z ' + totalItems;
  }

  function render() {
    try {
      const visible = sortedCards(cards.filter(matches));
      const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
      state.page = Math.min(Math.max(1, state.page), totalPages);
      const pageStart = (state.page - 1) * PAGE_SIZE;
      const pageCards = visible.slice(pageStart, pageStart + PAGE_SIZE);
      const visibleSet = new Set(pageCards);

      pageCards.forEach((card, index) => {
        card.hidden = false;
        card.style.setProperty('--card-index', String(index % 18));
        grid.appendChild(card);
      });
      cards.forEach((card) => {
        if (!visibleSet.has(card)) card.hidden = true;
      });

      const countLabel = visible.length === 1 ? '1 potrawa' : visible.length + ' potraw';
      resultCount.textContent = countLabel;
      emptyState.hidden = visible.length > 0;
      grid.hidden = visible.length === 0;
      renderPagination(visible.length, totalPages);
      const active = activeFilterCount();
      activeCount.textContent = active === 1 ? '1 aktywny filtr' : active + ' aktywnych filtrów';
      mobileFilterCount.textContent = String(active);
      showResults.textContent = 'Pokaż ' + countLabel;
      searchClear.hidden = !state.search;
      syncButtons();
      renderActiveFilters();
      root.classList.add('is-ready');
    } catch (error) {
      console.error('Nie udało się przefiltrować statycznego menu.', error);
      cards.forEach((card) => { card.hidden = false; });
      grid.hidden = false;
      emptyState.hidden = true;
      root.classList.add('is-ready');
    }
  }

  function clearFilters() {
    state.week = 'all';
    state.day = 'all';
    state.category = 'all';
    state.diet = 'all';
    state.price = 'all';
    state.popularity = 'all';
    state.search = '';
    state.sort = 'default';
    state.page = 1;
    search.value = '';
    sort.value = 'default';
    render();
  }

  function focusable(container) {
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((element) => element.offsetParent !== null || element === document.activeElement);
  }

  function trapFocus(event, panel, close) {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const items = focusable(panel);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function openDrawer() {
    state.lastDrawerTrigger = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-overlay-open');
    requestAnimationFrame(() => drawerPanel.focus());
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (!modal.classList.contains('is-open')) document.body.classList.remove('menu-overlay-open');
    if (state.lastDrawerTrigger && state.lastDrawerTrigger.focus) state.lastDrawerTrigger.focus();
  }

  function openModal(card, trigger) {
    state.lastModalTrigger = trigger || document.activeElement;
    modalMedia.textContent = '';
    const sourceImage = card.querySelector('.menu-dish-media img');
    if (sourceImage) {
      const image = sourceImage.cloneNode();
      image.loading = 'eager';
      modalMedia.appendChild(image);
    }
    modalKicker.textContent = card.dataset.meta || '';
    modalTitle.textContent = card.dataset.title || '';
    modalDescription.textContent = card.dataset.description || '';
    modalDetails.textContent = '';
    [['Kategoria', card.dataset.category], ['Dieta', card.dataset.diet === 'none' ? '' : card.dataset.diet]].forEach(([name, value]) => {
      if (!value) return;
      const dt = document.createElement('dt'); dt.textContent = name;
      const dd = document.createElement('dd'); dd.textContent = value;
      modalDetails.append(dt, dd);
    });
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-overlay-open');
    requestAnimationFrame(() => modalPanel.focus());
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!drawer.classList.contains('is-open')) document.body.classList.remove('menu-overlay-open');
    if (state.lastModalTrigger && state.lastModalTrigger.focus) state.lastModalTrigger.focus();
  }

  root.addEventListener('click', (event) => {
    const filterButton = event.target.closest('[data-filter-type]');
    if (filterButton) {
      state[filterButton.dataset.filterType] = filterButton.dataset.filterValue;
      state.page = 1;
      render();
      return;
    }
    const pageButton = event.target.closest('[data-menu-page]');
    if (pageButton && pagination.contains(pageButton)) {
      const totalPages = Math.max(1, Math.ceil(sortedCards(cards.filter(matches)).length / PAGE_SIZE));
      if (pageButton.dataset.menuPage === 'prev') state.page = Math.max(1, state.page - 1);
      else if (pageButton.dataset.menuPage === 'next') state.page = Math.min(totalPages, state.page + 1);
      else state.page = Math.min(totalPages, Math.max(1, Number(pageButton.dataset.menuPage) || 1));
      render();
      root.querySelector('.menu-controls-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (event.target.closest('[data-menu-clear]')) { clearFilters(); return; }
    if (event.target.closest('[data-menu-drawer-close]')) { closeDrawer(); return; }
    if (event.target.closest('[data-menu-modal-close]')) { closeModal(); return; }
    const detailButton = event.target.closest('.menu-dish-details');
    if (detailButton) { openModal(detailButton.closest('.menu-dish-card'), detailButton); return; }
    const card = event.target.closest('.menu-dish-card');
    if (card) openModal(card, card);
  });

  root.addEventListener('keydown', (event) => {
    const card = event.target.closest('.menu-dish-card');
    if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openModal(card, card); }
  });

  root.querySelector('#weeklyMenuOpenFilters').addEventListener('click', openDrawer);
  root.querySelectorAll('.menu-filter-dropdown').forEach((dropdown) => {
    dropdown.open = ['week', 'day', 'category'].includes(dropdown.dataset.filterDropdown);
  });
  drawerPanel.addEventListener('keydown', (event) => trapFocus(event, drawerPanel, closeDrawer));
  modalPanel.addEventListener('keydown', (event) => trapFocus(event, modalPanel, closeModal));
  search.addEventListener('input', () => { state.search = search.value.trim(); state.page = 1; render(); });
  searchClear.addEventListener('click', () => { state.search = ''; state.page = 1; search.value = ''; search.focus(); render(); });
  sort.addEventListener('change', () => { state.sort = sort.value; state.page = 1; render(); });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (modal.classList.contains('is-open')) closeModal();
    if (drawer.classList.contains('is-open')) closeDrawer();
  });

  render();
})();
