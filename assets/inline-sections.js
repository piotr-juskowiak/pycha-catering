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

  // Occasions Slider (Podstrona Zamówienie)
  document.querySelectorAll("[data-order-occasions-slider]").forEach((slider) => {
    const viewport = slider.querySelector("[data-order-slider-viewport]");
    const track = slider.querySelector("[data-order-slider-track]");
    const cards = Array.from(slider.querySelectorAll("[data-order-slide]"));
    const prevBtn = slider.querySelector("[data-order-slider-prev]");
    const nextBtn = slider.querySelector("[data-order-slider-next]");
    const pagination = slider.querySelector("[data-order-slider-pagination]");
    if (!track || !cards.length) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragMoved = false;

    const getVisibleCards = () => {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    };

    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCards());

    const getStepSize = () => {
      if (!cards.length) return 0;
      const cardRect = cards[0].getBoundingClientRect();
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap) || 0;
      return cardRect.width + gap;
    };

    const buildPagination = () => {
      if (!pagination) return;
      const maxIdx = getMaxIndex();
      const totalPages = maxIdx + 1;
      pagination.innerHTML = "";
      if (totalPages <= 1) {
        pagination.style.display = "none";
        return;
      }
      pagination.style.display = "flex";
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "order-occasions__dot" + (i === currentIndex ? " is-active" : "");
        dot.setAttribute("aria-label", `Przejdź do slajdu ${i + 1}`);
        if (i === currentIndex) dot.setAttribute("aria-current", "true");
        dot.addEventListener("click", () => {
          goTo(i);
        });
        pagination.appendChild(dot);
      }
    };

    const updateControls = () => {
      const maxIdx = getMaxIndex();
      if (prevBtn) prevBtn.disabled = currentIndex <= 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIdx;

      if (pagination) {
        const dots = pagination.querySelectorAll(".order-occasions__dot");
        dots.forEach((dot, i) => {
          const isActive = i === currentIndex;
          dot.classList.toggle("is-active", isActive);
          if (isActive) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
      }
    };

    const setPositionByIndex = () => {
      const step = getStepSize();
      currentTranslate = -currentIndex * step;
      prevTranslate = currentTranslate;
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      updateControls();
    };

    const goTo = (index) => {
      const maxIdx = getMaxIndex();
      currentIndex = Math.min(Math.max(index, 0), maxIdx);
      setPositionByIndex();
    };

    prevBtn?.addEventListener("click", () => {
      goTo(currentIndex - 1);
    });

    nextBtn?.addEventListener("click", () => {
      goTo(currentIndex + 1);
    });

    // Touch & Mouse Drag Support
    let lastDragDist = 0;

    const onDragStart = (e) => {
      isDragging = true;
      dragMoved = false;
      lastDragDist = 0;
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      track.classList.add("is-dragging");
      viewport?.classList.add("is-dragging");
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      const diff = currentX - startX;
      lastDragDist = diff;
      if (Math.abs(diff) > 5) {
        dragMoved = true;
      }
      const translate = prevTranslate + diff;
      track.style.transform = `translate3d(${translate}px, 0, 0)`;
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove("is-dragging");
      viewport?.classList.remove("is-dragging");

      const threshold = 40;
      if (lastDragDist < -threshold) {
        goTo(currentIndex + 1);
      } else if (lastDragDist > threshold) {
        goTo(currentIndex - 1);
      } else {
        goTo(currentIndex);
      }
      setTimeout(() => {
        dragMoved = false;
      }, 50);
    };

    if (viewport) {
      viewport.addEventListener("touchstart", onDragStart, { passive: true });
      viewport.addEventListener("touchmove", onDragMove, { passive: true });
      viewport.addEventListener("touchend", onDragEnd);

      viewport.addEventListener("mousedown", onDragStart);
      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("mouseup", onDragEnd);
    }

    // Prevent clicking link while dragging
    cards.forEach((card) => {
      const link = card.querySelector("a");
      if (link) {
        link.addEventListener("click", (e) => {
          if (dragMoved) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }
    });

    // Keyboard navigation
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      if (e.key === "ArrowRight") goTo(currentIndex + 1);
    });

    window.addEventListener("resize", () => {
      buildPagination();
      goTo(currentIndex);
    }, { passive: true });

    buildPagination();
    setPositionByIndex();
  });

})();
