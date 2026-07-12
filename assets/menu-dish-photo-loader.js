(() => {
  const photoMap = window.PYCHA_DISH_PHOTOS || {};

  const normalize = (value) => String(value || '')
    .replace(/[łŁ]/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pl-PL')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  document.querySelectorAll('[data-static-menu-page] .menu-dish-card').forEach((card) => {
    const image = card.querySelector('.menu-dish-media img');
    const source = photoMap[normalize(card.dataset.title)];
    if (!image || !source) return;

    const fallbackSource = image.getAttribute('src');
    image.dataset.fallbackSource = fallbackSource;
    image.addEventListener('error', () => {
      if (image.getAttribute('src') === fallbackSource) return;
      image.setAttribute('src', fallbackSource);
    }, { once: true });
    image.removeAttribute('srcset');
    image.setAttribute('src', source);
  });
})();
