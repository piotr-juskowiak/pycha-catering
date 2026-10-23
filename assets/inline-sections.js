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

  document.querySelectorAll("[data-pycha-kcal-slider]").forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll("[data-kcal-slide]"));
    const previous = slider.querySelector("[data-kcal-prev]");
    const next = slider.querySelector("[data-kcal-next]");
    const dots = Array.from(slider.querySelectorAll("[data-kcal-dot]"));
    if (!slides.length) return;

    let index = 0;
    let timer = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
      dots.forEach((dot, dotIndex) => {
        if (dotIndex === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const go = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      render();
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    const start = () => {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(() => go(index + 1), 6500);
    };

    previous?.addEventListener("click", () => {
      go(index - 1);
      start();
    });
    next?.addEventListener("click", () => {
      go(index + 1);
      start();
    });
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        go(dotIndex);
        start();
      });
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    render();
    start();
  });

})();
