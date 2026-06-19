(() => {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  document.querySelectorAll("[data-pycha-catering-slider]").forEach((slider) => {
    const track = slider.querySelector(".pycha-catering-types__track");
    const cards = Array.from(slider.querySelectorAll(".pycha-catering-card"));
    const previous = slider.querySelector("[data-slider-previous]");
    const next = slider.querySelector("[data-slider-next]");
    if (!track || !cards.length || !previous || !next) return;

    let index = 0;

    const visibleCards = () => {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    };

    const render = () => {
      const visible = visibleCards();
      const lastIndex = Math.max(0, cards.length - visible);
      index = clamp(index, 0, lastIndex);
      const firstCard = cards[0];
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
      previous.disabled = index === 0;
      next.disabled = index === lastIndex;
    };

    previous.addEventListener("click", () => {
      index -= visibleCards();
      render();
    });

    next.addEventListener("click", () => {
      index += visibleCards();
      render();
    });

    window.addEventListener("resize", render, { passive: true });
    render();
  });

  const footerPhoto = document.querySelector(".pycha-footer-photo");
  if (!footerPhoto) return;

  let ticking = false;
  const updateFooterPhoto = () => {
    const rect = footerPhoto.getBoundingClientRect();
    const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
    footerPhoto.style.setProperty("--pycha-footer-parallax", `${(-95 + progress * 150).toFixed(2)}px`);
    ticking = false;
  };

  const queueFooterPhoto = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateFooterPhoto);
  };

  window.addEventListener("scroll", queueFooterPhoto, { passive: true });
  window.addEventListener("resize", queueFooterPhoto, { passive: true });
  queueFooterPhoto();
})();
