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

  const runWhenReady = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  /** Mounts animated scalloped string lights beneath the fixed site header. */
  const initHolidayLights = () => {
    const header = document.querySelector(".header-section");
    if (!header || header.querySelector(".pycha-holiday-lights")) return;

    header.classList.add("has-holiday-lights");

    const lightsRoot = document.createElement("div");
    lightsRoot.className = "pycha-holiday-lights";
    lightsRoot.setAttribute("aria-hidden", "true");

    const track = document.createElement("div");
    track.className = "pycha-holiday-lights__track";
    lightsRoot.appendChild(track);

    const bulbPalette = ["gold", "red", "warm", "green"];
    const swayDurations = [3.3, 4.1, 3.7, 4.5, 3.5];
    const twinkleDurations = [2.2, 2.9, 2.5, 3.2];
    const bulbSlots = [
      { left: "12.5%", curveRatio: 0.225, cordOffset: 0 },
      { left: "37.5%", curveRatio: 0.41, cordOffset: 1.5 },
      { left: "62.5%", curveRatio: 0.41, cordOffset: 1 },
      { left: "87.5%", curveRatio: 0.225, cordOffset: 0 },
    ];

    let globalBulbIndex = 0;

    const createSwag = () => {
      const swag = document.createElement("div");
      swag.className = "pycha-holiday-lights__swag";
      swag.innerHTML = `
        <svg class="pycha-holiday-lights__wire" viewBox="0 0 168 16" preserveAspectRatio="none" focusable="false">
          <path d="M 0,1 Q 84,13 168,1" fill="none" stroke="#1b3b1e" stroke-width="2" stroke-linecap="round" />
          <path d="M 0,1.6 Q 84,13.6 168,1.6" fill="none" stroke="rgba(120, 164, 79, 0.38)" stroke-width="0.9" stroke-linecap="round" />
          <circle cx="0" cy="1.5" r="2" fill="#234826" />
          <circle cx="168" cy="1.5" r="2" fill="#234826" />
        </svg>
      `;

      bulbSlots.forEach((slot) => {
        const idx = globalBulbIndex++;
        const color = bulbPalette[idx % bulbPalette.length];
        const bulb = document.createElement("span");
        bulb.className = `pycha-light-bulb pycha-light-bulb--${color}`;
        bulb.style.left = slot.left;
        bulb.style.top = `calc(var(--wire-h, 12px) * ${slot.curveRatio})`;
        bulb.style.setProperty("--bulb-sway-duration", `${swayDurations[idx % swayDurations.length]}s`);
        bulb.style.setProperty("--bulb-twinkle-duration", `${twinkleDurations[(idx + 1) % twinkleDurations.length]}s`);
        bulb.style.setProperty("--bulb-delay", `-${((idx * 0.43) % 4.2).toFixed(2)}s`);

        const cordStyle = slot.cordOffset ? ` style="height: ${2 + slot.cordOffset}px"` : "";
        bulb.innerHTML =
          `<span class="pycha-light-bulb__cord"${cordStyle}></span>` +
          `<span class="pycha-light-bulb__socket"></span>` +
          `<span class="pycha-light-bulb__halo"></span>` +
          `<span class="pycha-light-bulb__glass"></span>`;

        swag.appendChild(bulb);
      });

      return swag;
    };

    const syncSwagCount = () => {
      const swagWidth = window.innerWidth <= 640 ? 132 : 168;
      const needed = Math.ceil(window.innerWidth / swagWidth) + 1;
      while (track.children.length < needed) {
        track.appendChild(createSwag());
      }
    };

    syncSwagCount();
    header.appendChild(lightsRoot);
    window.addEventListener("resize", syncSwagCount, { passive: true });
  };

  /** Adds a festive snow drift cap along the top edge of the "Nasze menu" header button. */
  const initMenuButtonSnowCap = () => {
    const menuButtons = document.querySelectorAll(".header-section .nav-btn-wrap #openMenuModal");
    if (!menuButtons.length) return;

    menuButtons.forEach((button, index) => {
      const wrap = button.parentElement;
      if (!wrap || wrap.querySelector(".pycha-btn-snow-cap")) return;

      const gradId = `pychaSnowCapGrad-${index}`;
      const cap = document.createElement("span");
      cap.className = "pycha-btn-snow-cap";
      cap.setAttribute("aria-hidden", "true");
      cap.innerHTML = `
        <svg viewBox="0 0 180 22" preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="68%" stop-color="#f7fbff" />
              <stop offset="100%" stop-color="#e5f1fb" />
            </linearGradient>
          </defs>
          <path
            d="M 3,8.5 C 2.2,3.8 9,1.8 25,1.6 C 55,1.2 84,0.8 114,1.3 C 142,1.7 166,2.2 174,4.2 C 178,5.4 178.4,8 176.5,9.3 C 174,10.3 169.5,10 166.8,11.9 C 164.4,13.6 163.2,15.6 160.2,15.6 C 157.2,15.6 155.8,13.2 153.2,11.5 C 148,9.8 110,9.6 92,10 C 86.2,10.2 82.4,12.8 80.8,15.6 C 79.4,17.8 76.4,18.2 74.2,17.2 C 72,16.1 70.6,12.6 66.8,10.3 C 58,9.6 38,9.7 30.2,10.3 C 26.8,10.6 25.4,14.8 22.2,15 C 19,15.1 17.6,11.8 14.2,10.1 C 10.2,9.5 4.5,10 3,8.5 Z"
            fill="url(#${gradId})"
            stroke="#bfd8eb"
            stroke-width="1.25"
            stroke-linejoin="round"
          />
          <path
            d="M 16,3.5 Q 88,2.1 158,3.8"
            fill="none"
            stroke="rgba(255, 255, 255, 0.92)"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
      `;

      button.insertAdjacentElement("afterend", cap);
    });
  };

  /** Generates SVG pine needles along a quadratic curve using deterministic offsets. */
  const buildFirTwigMarkup = (x0, y0, cx, cy, x1, y1, needleCount, maxLen, seedOffset) => {
    const colors = ["#123b1f", "#1e552c", "#2d6d3b", "#458449"];
    const parts = [
      `<path d="M ${x0},${y0} Q ${cx},${cy} ${x1},${y1}" fill="none" stroke="#4f3624" stroke-width="2.6" stroke-linecap="round" />`,
    ];

    for (let i = 1; i <= needleCount; i++) {
      const t = i / (needleCount + 1);
      const omt = 1 - t;
      const px = omt * omt * x0 + 2 * omt * t * cx + t * t * x1;
      const py = omt * omt * y0 + 2 * omt * t * cy + t * t * y1;
      const tx = 2 * omt * (cx - x0) + 2 * t * (x1 - cx);
      const ty = 2 * omt * (cy - y0) + 2 * t * (y1 - cy);
      const baseAngle = Math.atan2(ty, tx);
      const taper = 0.55 + Math.sin(t * Math.PI) * 0.55;

      [-1, 1].forEach((side, sIdx) => {
        const wave = Math.sin(i * 1.9 + seedOffset + sIdx * 2.1);
        const spread = side * (0.58 + wave * 0.16);
        const len = maxLen * taper * (0.84 + Math.abs(wave) * 0.28);
        const angle = baseAngle + spread;
        const nx = (px + Math.cos(angle) * len).toFixed(1);
        const ny = (py + Math.sin(angle) * len).toFixed(1);
        const ctrlX = (px + Math.cos(angle - side * 0.12) * len * 0.55).toFixed(1);
        const ctrlY = (py + Math.sin(angle - side * 0.12) * len * 0.55).toFixed(1);
        const color = colors[(i + sIdx) % colors.length];
        parts.push(
          `<path d="M ${px.toFixed(1)},${py.toFixed(1)} Q ${ctrlX},${ctrlY} ${nx},${ny}" fill="none" stroke="${color}" stroke-width="1.55" stroke-linecap="round" />`
        );
      });
    }

    return parts.join("");
  };

  /** Builds an animated hanging Christmas ornament (sphere or teardrop) in SVG. */
  const buildBaubleMarkup = (opts) => {
    const {
      x,
      anchorY,
      cordLen,
      kind,
      theme,
      radius,
      gradId,
      swayDuration,
      delay,
    } = opts;
    const capY = anchorY + cordLen;
    const bodyTopY = capY + 4;

    const ornamentBody =
      kind === "teardrop"
        ? `
          <path d="M ${x},${bodyTopY}
                   C ${x + radius * 0.95},${bodyTopY + radius * 0.45} ${x + radius * 1.05},${bodyTopY + radius * 1.45} ${x},${bodyTopY + radius * 2.1}
                   C ${x - radius * 1.05},${bodyTopY + radius * 1.45} ${x - radius * 0.95},${bodyTopY + radius * 0.45} ${x},${bodyTopY} Z"
                fill="url(#${gradId})" stroke="rgba(11, 37, 12, 0.14)" stroke-width="0.7" />
          <path d="M ${x - radius * 0.46},${bodyTopY + radius * 1.02} Q ${x},${bodyTopY + radius * 1.24} ${x + radius * 0.46},${bodyTopY + radius * 1.02}"
                fill="none" stroke="rgba(255, 245, 200, 0.65)" stroke-width="1.15" stroke-linecap="round" />
          <ellipse cx="${x - radius * 0.28}" cy="${bodyTopY + radius * 0.78}" rx="${(radius * 0.2).toFixed(1)}" ry="${(radius * 0.34).toFixed(1)}"
                   fill="rgba(255, 255, 255, 0.68)" transform="rotate(-18 ${x - radius * 0.28} ${bodyTopY + radius * 0.78})" />
        `
        : `
          <circle cx="${x}" cy="${bodyTopY + radius}" r="${radius}"
                  fill="url(#${gradId})" stroke="rgba(11, 37, 12, 0.14)" stroke-width="0.7" />
          <path d="M ${x - radius * 0.86},${bodyTopY + radius * 0.96} Q ${x},${bodyTopY + radius * 1.28} ${x + radius * 0.86},${bodyTopY + radius * 0.96}"
                fill="none" stroke="rgba(255, 248, 214, 0.62)" stroke-width="1.2" stroke-linecap="round" />
          <circle cx="${x}" cy="${bodyTopY + radius * 1.38}" r="1.35" fill="rgba(255, 248, 214, 0.78)" />
          <circle cx="${x - radius * 0.36}" cy="${bodyTopY + radius * 1.25}" r="1" fill="rgba(255, 248, 214, 0.72)" />
          <circle cx="${x + radius * 0.36}" cy="${bodyTopY + radius * 1.25}" r="1" fill="rgba(255, 248, 214, 0.72)" />
          <ellipse cx="${x - radius * 0.32}" cy="${bodyTopY + radius * 0.56}" rx="${(radius * 0.24).toFixed(1)}" ry="${(radius * 0.34).toFixed(1)}"
                   fill="rgba(255, 255, 255, 0.72)" transform="rotate(-24 ${x - radius * 0.32} ${bodyTopY + radius * 0.56})" />
        `;

    return `
      <g class="pycha-footer-bauble" style="--bauble-sway:${swayDuration}s;--bauble-delay:${delay}s;">
        <line x1="${x}" y1="${anchorY}" x2="${x}" y2="${capY}" stroke="#caa14a" stroke-width="1.2" />
        <circle cx="${x}" cy="${capY}" r="2.2" fill="none" stroke="#d8b25c" stroke-width="1.2" />
        <rect x="${x - 3.6}" y="${capY + 1}" width="7.2" height="4.2" rx="1.2" fill="url(#pychaCapGold-${theme})" />
        ${ornamentBody}
      </g>
    `;
  };

  /** Builds a small twinkling 4-point gold star ornament. */
  const buildStarMarkup = (x, y, size, dur, delay) => `
    <path class="pycha-footer-star" style="--star-dur:${dur}s;--star-delay:${delay}s;"
          d="M ${x},${y - size} Q ${x},${y} ${x + size},${y} Q ${x},${y} ${x},${y + size} Q ${x},${y} ${x - size},${y} Q ${x},${y} ${x},${y - size} Z"
          fill="#ecc258" />
  `;

  /** Mounts fir tree branches and gently swaying hanging baubles across the footer top edge. */
  const initFooterFestiveDecor = () => {
    const footers = document.querySelectorAll(".pycha-site-footer");
    if (!footers.length) return;

    const sharedDefs = (suffix) => `
      <defs>
        <linearGradient id="pychaCapGold-${suffix}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#a87c24" />
          <stop offset="45%" stop-color="#f5db84" />
          <stop offset="100%" stop-color="#9e7220" />
        </linearGradient>
        <radialGradient id="pychaOrbRed-${suffix}" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ffb4b4" />
          <stop offset="28%" stop-color="#e53935" />
          <stop offset="78%" stop-color="#9e171b" />
          <stop offset="100%" stop-color="#6e0d12" />
        </radialGradient>
        <radialGradient id="pychaOrbGold-${suffix}" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#fff8d6" />
          <stop offset="32%" stop-color="#f2b830" />
          <stop offset="80%" stop-color="#b5710e" />
          <stop offset="100%" stop-color="#875007" />
        </radialGradient>
        <radialGradient id="pychaOrbGreen-${suffix}" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#dcf7c8" />
          <stop offset="30%" stop-color="#5da135" />
          <stop offset="80%" stop-color="#1d5123" />
          <stop offset="100%" stop-color="#0f3214" />
        </radialGradient>
        <radialGradient id="pychaOrbPearl-${suffix}" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="45%" stop-color="#f7ecd0" />
          <stop offset="88%" stop-color="#d2b676" />
          <stop offset="100%" stop-color="#b3924f" />
        </radialGradient>
      </defs>
    `;

    footers.forEach((footer, fIdx) => {
      if (footer.querySelector(".pycha-footer-festive")) return;

      footer.classList.add("has-festive-decor");

      const layer = document.createElement("div");
      layer.className = "pycha-footer-festive";
      layer.setAttribute("aria-hidden", "true");

      // Left corner fir bough cluster + 3 hanging baubles
      const leftSvg = `
        <svg viewBox="0 0 360 140" preserveAspectRatio="xMinYMin meet" focusable="false">
          ${sharedDefs(`L${fIdx}`)}
          ${buildBaubleMarkup({ x: 66, anchorY: 22, cordLen: 22, kind: "sphere", theme: `L${fIdx}`, radius: 13.5, gradId: `pychaOrbRed-L${fIdx}`, swayDuration: 4.3, delay: -0.6 })}
          ${buildBaubleMarkup({ x: 146, anchorY: 28, cordLen: 26, kind: "teardrop", theme: `L${fIdx}`, radius: 10.5, gradId: `pychaOrbGold-L${fIdx}`, swayDuration: 5.1, delay: -1.9 })}
          ${buildBaubleMarkup({ x: 234, anchorY: 20, cordLen: 18, kind: "sphere", theme: `L${fIdx}`, radius: 11.5, gradId: `pychaOrbGreen-L${fIdx}`, swayDuration: 4.7, delay: -1.1 })}
          ${buildFirTwigMarkup(0, 8, 120, 34, 298, 22, 26, 17, 0.3)}
          ${buildFirTwigMarkup(0, 20, 74, 52, 186, 54, 18, 15, 1.4)}
          ${buildFirTwigMarkup(24, 6, 156, 20, 344, 10, 22, 13, 2.2)}
          <circle cx="46" cy="24" r="3.4" fill="#d32f2f" /><circle cx="52" cy="28" r="2.9" fill="#b71c1c" /><circle cx="44" cy="30" r="2.7" fill="#e53935" />
          <circle cx="164" cy="38" r="3" fill="#d32f2f" /><circle cx="170" cy="41" r="2.6" fill="#b71c1c" />
          <circle cx="45" cy="23" r="1" fill="#ffcdd2" /><circle cx="163" cy="37" r="0.9" fill="#ffcdd2" />
          ${buildStarMarkup(110, 56, 4.5, 2.8, -0.4)}
          ${buildStarMarkup(202, 46, 3.8, 3.4, -1.5)}
        </svg>
      `;

      // Right corner fir bough cluster + 3 hanging baubles
      const rightSvg = `
        <svg viewBox="0 0 360 140" preserveAspectRatio="xMaxYMin meet" focusable="false">
          ${sharedDefs(`R${fIdx}`)}
          ${buildBaubleMarkup({ x: 294, anchorY: 22, cordLen: 22, kind: "sphere", theme: `R${fIdx}`, radius: 13.5, gradId: `pychaOrbGold-R${fIdx}`, swayDuration: 4.6, delay: -1.3 })}
          ${buildBaubleMarkup({ x: 214, anchorY: 28, cordLen: 26, kind: "teardrop", theme: `R${fIdx}`, radius: 10.5, gradId: `pychaOrbRed-R${fIdx}`, swayDuration: 4.9, delay: -0.4 })}
          ${buildBaubleMarkup({ x: 126, anchorY: 20, cordLen: 18, kind: "sphere", theme: `R${fIdx}`, radius: 11.5, gradId: `pychaOrbPearl-R${fIdx}`, swayDuration: 4.2, delay: -2.2 })}
          ${buildFirTwigMarkup(360, 8, 240, 34, 62, 22, 26, 17, 0.8)}
          ${buildFirTwigMarkup(360, 20, 286, 52, 174, 54, 18, 15, 1.9)}
          ${buildFirTwigMarkup(336, 6, 204, 20, 16, 10, 22, 13, 2.7)}
          <circle cx="314" cy="24" r="3.4" fill="#d32f2f" /><circle cx="308" cy="28" r="2.9" fill="#b71c1c" /><circle cx="316" cy="30" r="2.7" fill="#e53935" />
          <circle cx="196" cy="38" r="3" fill="#d32f2f" /><circle cx="190" cy="41" r="2.6" fill="#b71c1c" />
          <circle cx="313" cy="23" r="1" fill="#ffcdd2" /><circle cx="195" cy="37" r="0.9" fill="#ffcdd2" />
          ${buildStarMarkup(250, 56, 4.5, 3.1, -1.1)}
          ${buildStarMarkup(158, 46, 3.8, 2.7, -2.0)}
        </svg>
      `;

      // Center top fir garland swag + 4 staggered hanging baubles
      const centerSvg = `
        <svg viewBox="0 0 460 118" preserveAspectRatio="xMidYMin meet" focusable="false">
          ${sharedDefs(`C${fIdx}`)}
          ${buildBaubleMarkup({ x: 102, anchorY: 12, cordLen: 18, kind: "sphere", theme: `C${fIdx}`, radius: 9.5, gradId: `pychaOrbGreen-C${fIdx}`, swayDuration: 4.4, delay: -0.9 })}
          ${buildBaubleMarkup({ x: 186, anchorY: 18, cordLen: 32, kind: "teardrop", theme: `C${fIdx}`, radius: 10, gradId: `pychaOrbRed-C${fIdx}`, swayDuration: 5.0, delay: -2.1 })}
          ${buildBaubleMarkup({ x: 274, anchorY: 18, cordLen: 26, kind: "sphere", theme: `C${fIdx}`, radius: 11.5, gradId: `pychaOrbGold-C${fIdx}`, swayDuration: 4.7, delay: -1.4 })}
          ${buildBaubleMarkup({ x: 358, anchorY: 12, cordLen: 20, kind: "sphere", theme: `C${fIdx}`, radius: 9.5, gradId: `pychaOrbRed-C${fIdx}`, swayDuration: 4.1, delay: -0.2 })}
          ${buildFirTwigMarkup(36, 4, 230, 26, 424, 4, 30, 13, 1.1)}
          ${buildFirTwigMarkup(140, 8, 230, 24, 320, 8, 16, 12, 2.4)}
          <circle cx="230" cy="18" r="3.2" fill="#d32f2f" /><circle cx="224" cy="21" r="2.6" fill="#b71c1c" /><circle cx="236" cy="21" r="2.6" fill="#e53935" />
          <circle cx="229" cy="17" r="1" fill="#ffcdd2" />
          ${buildStarMarkup(144, 42, 4.0, 3.0, -0.7)}
          ${buildStarMarkup(230, 50, 4.4, 2.6, -1.8)}
          ${buildStarMarkup(316, 42, 4.0, 3.3, -0.3)}
        </svg>
      `;

      layer.innerHTML = `
        <div class="pycha-footer-festive__cluster pycha-footer-festive__cluster--left">${leftSvg}</div>
        <div class="pycha-footer-festive__cluster pycha-footer-festive__cluster--center">${centerSvg}</div>
        <div class="pycha-footer-festive__cluster pycha-footer-festive__cluster--right">${rightSvg}</div>
      `;

      footer.prepend(layer);
    });
  };

  /** Creates cached offscreen snowflake sprites so canvas rendering stays light on CPU/GPU. */
  const createSnowSprites = () => {
    const softSprite = document.createElement("canvas");
    softSprite.width = 44;
    softSprite.height = 44;
    const softCtx = softSprite.getContext("2d");
    if (softCtx) {
      const grad = softCtx.createRadialGradient(22, 22, 1.5, 22, 22, 20);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.45, "rgba(240, 248, 255, 0.96)");
      grad.addColorStop(0.68, "rgba(138, 186, 226, 0.54)");
      grad.addColorStop(0.86, "rgba(96, 150, 198, 0.2)");
      grad.addColorStop(1, "rgba(96, 150, 198, 0)");
      softCtx.fillStyle = grad;
      softCtx.beginPath();
      softCtx.arc(22, 22, 20, 0, Math.PI * 2);
      softCtx.fill();
    }

    const crystalSprite = document.createElement("canvas");
    crystalSprite.width = 64;
    crystalSprite.height = 64;
    const crystalCtx = crystalSprite.getContext("2d");
    if (crystalCtx) {
      const drawBranches = (strokeStyle, lineWidth) => {
        crystalCtx.save();
        crystalCtx.translate(32, 32);
        crystalCtx.strokeStyle = strokeStyle;
        crystalCtx.lineWidth = lineWidth;
        crystalCtx.lineCap = "round";
        crystalCtx.lineJoin = "round";

        for (let arm = 0; arm < 6; arm++) {
          crystalCtx.save();
          crystalCtx.rotate((arm * Math.PI) / 3);
          crystalCtx.beginPath();
          crystalCtx.moveTo(0, 0);
          crystalCtx.lineTo(0, -23);
          crystalCtx.moveTo(0, -10.5);
          crystalCtx.lineTo(-4.8, -15.2);
          crystalCtx.moveTo(0, -10.5);
          crystalCtx.lineTo(4.8, -15.2);
          crystalCtx.moveTo(0, -17);
          crystalCtx.lineTo(-3.4, -20.4);
          crystalCtx.moveTo(0, -17);
          crystalCtx.lineTo(3.4, -20.4);
          crystalCtx.stroke();
          crystalCtx.restore();
        }
        crystalCtx.restore();
      };

      // Pale frost outline keeps crystals crisp on warm cream (#fff8e4) and white cards.
      drawBranches("rgba(76, 132, 184, 0.56)", 4.4);
      drawBranches("rgba(255, 255, 255, 0.99)", 2.1);
    }

    return { softSprite, crystalSprite };
  };

  /** Runs a gentle full-viewport snow overlay with visibility and reduced-motion guards. */
  const initFallingSnow = () => {
    if (!document.body || document.querySelector(".pycha-snow-canvas")) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = document.createElement("canvas");
    canvas.className = "pycha-snow-canvas";
    canvas.setAttribute("aria-hidden", "true");

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.body.appendChild(canvas);
    const { softSprite, crystalSprite } = createSnowSprites();

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let flakes = [];
    let rafId = 0;
    let lastTime = 0;

    const getTargetCount = () => {
      const areaCount = Math.round((width * height) / 14500);
      return clamp(areaCount, 42, 92);
    };

    const createFlake = (randomY) => {
      const roll = Math.random();
      const tier = roll < 0.36 ? 0 : roll < 0.70 ? 1 : 2;
      const size =
        tier === 0
          ? 7 + Math.random() * 3.5
          : tier === 1
            ? 10.5 + Math.random() * 5.2
            : 15 + Math.random() * 7;
      const vy =
        tier === 0
          ? 22 + Math.random() * 14
          : tier === 1
            ? 36 + Math.random() * 18
            : 48 + Math.random() * 20;

      return {
        tier,
        x: Math.random() * (width + 40) - 20,
        y: randomY ? Math.random() * (height + 40) - 20 : -24 - Math.random() * 36,
        size,
        vy,
        vx: -5 + Math.random() * 13,
        swayAmp: 10 + Math.random() * 18,
        swayFreq: 0.55 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.1,
        alpha: tier === 0 ? 0.68 + Math.random() * 0.2 : 0.82 + Math.random() * 0.16,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = getTargetCount();
      while (flakes.length < target) {
        flakes.push(createFlake(true));
      }
      if (flakes.length > target) {
        flakes.length = target;
      }
    };

    const step = (timestamp) => {
      if (reduceMotionQuery.matches || document.hidden) {
        rafId = 0;
        return;
      }

      if (!lastTime) lastTime = timestamp;
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      const elapsed = timestamp * 0.001;
      const breeze = Math.sin(elapsed * 0.22) * 8;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        flake.y += flake.vy * dt;
        flake.x += (flake.vx + breeze + Math.sin(elapsed * flake.swayFreq + flake.phase) * flake.swayAmp) * dt;
        flake.angle += flake.spin * dt;

        if (flake.y > height + 24) {
          flakes[i] = createFlake(false);
          continue;
        }
        if (flake.x > width + 24) flake.x = -24;
        else if (flake.x < -24) flake.x = width + 24;

        ctx.globalAlpha = flake.alpha;
        const half = flake.size * 0.5;
        if (flake.tier === 2) {
          ctx.save();
          ctx.translate(flake.x, flake.y);
          ctx.rotate(flake.angle);
          ctx.drawImage(crystalSprite, -half, -half, flake.size, flake.size);
          ctx.restore();
        } else {
          ctx.drawImage(softSprite, flake.x - half, flake.y - half, flake.size, flake.size);
        }
      }

      ctx.globalAlpha = 1;
      rafId = window.requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (reduceMotionQuery.matches || document.hidden || rafId) return;
      lastTime = 0;
      rafId = window.requestAnimationFrame(step);
    };

    const stopLoop = () => {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    resize();
    startLoop();

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopLoop();
      else startLoop();
    });

    const onMotionChange = () => {
      if (reduceMotionQuery.matches) {
        stopLoop();
        ctx.clearRect(0, 0, width, height);
      } else {
        startLoop();
      }
    };
    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", onMotionChange);
    }
  };

  runWhenReady(() => {
    initHolidayLights();
    initMenuButtonSnowCap();
    initFooterFestiveDecor();
    initFallingSnow();
  });

})();
